import { spawnSync } from "node:child_process";
import { chmod, lstat, readFile, realpath, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

import type { GuideRuntimeView, PreparedGuideRuntime } from "./guide-runtime.ts";
import { nowIso, writeJsonAtomic } from "./project.ts";
import { relayRoleEnvironment } from "./relay-environment.ts";
import type { ToolkitIntegritySnapshot } from "./toolkit-integrity.ts";

export interface GhosttyWindowRequest {
  role: "reviewer" | "producer";
  title: string;
  args: string[];
}

export interface GhosttyOpenResult {
  status: number | null;
  stderr: string;
}

export interface GhosttyLaunchDependencies {
  platform?: string;
  codexExecutable?: string;
  open?: (args: string[], cwd: string) => GhosttyOpenResult;
  waitForRecoveredReviewer?: (runRoot: string) => Promise<boolean>;
}

function packageRoot(): string {
  return path.dirname(path.dirname(fileURLToPath(import.meta.url)));
}

async function codexExecutable(override?: string): Promise<string> {
  const configured = override ?? process.env.KODA_CODEX_BIN ?? "codex";
  if (path.isAbsolute(configured)) return realpath(configured);
  const found = spawnSync("/usr/bin/which", [configured], { encoding: "utf8" });
  if (found.status !== 0 || !(found.stdout ?? "").trim()) {
    throw new Error(`Ghostty launch cannot find the Codex executable named ${configured}.`);
  }
  return realpath((found.stdout ?? "").trim());
}

function windowRequest(options: {
  role: GhosttyWindowRequest["role"];
  title: string;
  project: string;
  launcher: string;
}): GhosttyWindowRequest {
  const relativeLauncher = path.relative(options.project, options.launcher).split(path.sep).join("/");
  if (!relativeLauncher.startsWith(".koda/runs/") || /\s/.test(relativeLauncher)) {
    throw new Error("Ghostty role launcher must be a space-free path inside the project runtime.");
  }
  return {
    role: options.role,
    title: options.title,
    args: [
      "-na",
      "Ghostty.app",
      "--args",
      `--title=${options.title}`,
      `--working-directory=${options.project}`,
      "--wait-after-command=true",
      "--shell-integration=none",
      "-e",
      `./${relativeLauncher}`,
    ],
  };
}

export function ghosttyRoleLauncherSource(options: {
  executable: string;
  project: string;
  script: string;
  scriptArgs: string[];
  environmentSource?: NodeJS.ProcessEnv;
}): string {
  const environment = relayRoleEnvironment(options.executable, options.environmentSource);
  const shellWord = (value: string): string => `'${value.replaceAll("'", `'"'"'`)}'`;
  const environmentArguments = Object.entries(environment).map(([key, value]) => {
    if (value === undefined) throw new Error(`Ghostty role environment is missing ${key}.`);
    return `${key}=${value}`;
  });
  const command = [
    "/usr/bin/env",
    "-i",
    ...environmentArguments,
    process.execPath,
    options.script,
    ...options.scriptArgs,
  ].map(shellWord);
  return [
    "#!/bin/sh",
    "set -eu",
    `cd ${shellWord(options.project)}`,
    `exec ${command.join(" \\\n  ")}`,
    "",
  ].join("\n");
}

async function ensureLauncher(file: string, content: string): Promise<void> {
  try {
    await writeFile(file, content, { encoding: "utf8", mode: 0o700, flag: "wx" });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
    const metadata = await lstat(file);
    if (!metadata.isFile() || metadata.isSymbolicLink() || await readFile(file, "utf8") !== content) {
      throw new Error(`Existing Ghostty role launcher is unsafe or changed: ${file}`);
    }
  }
  await chmod(file, 0o700);
}

export async function ghosttyWindowRequests(
  project: string,
  prepared: PreparedGuideRuntime,
  dependencies: GhosttyLaunchDependencies = {},
): Promise<GhosttyWindowRequest[]> {
  if ((dependencies.platform ?? process.platform) !== "darwin") {
    throw new Error("The Ghostty automatic launcher is currently supported only on macOS.");
  }
  const executable = await codexExecutable(dependencies.codexExecutable);
  const scripts = path.join(packageRoot(), "scripts");
  const shortId = prepared.launch.id.slice(0, 8);
  const reviewerLauncher = path.join(prepared.runRoot, "launch-reviewer.sh");
  const producerLauncher = path.join(prepared.runRoot, "launch-producer.sh");
  await ensureLauncher(reviewerLauncher, ghosttyRoleLauncherSource({
    executable,
    project,
    script: path.join(scripts, "run-relay-reviewer-window.ts"),
    scriptArgs: [prepared.runRoot],
  }));
  await ensureLauncher(producerLauncher, ghosttyRoleLauncherSource({
    executable,
    project,
    script: path.join(scripts, "execute-relay-run.ts"),
    scriptArgs: ["--reviewer-window", prepared.runRoot],
  }));
  return [
    windowRequest({
      role: "reviewer",
      title: `Koda-C Reviewer — ${shortId}`,
      project,
      launcher: reviewerLauncher,
    }),
    windowRequest({
      role: "producer",
      title: `Koda-C Producer — ${shortId}`,
      project,
      launcher: producerLauncher,
    }),
  ];
}

type ReceiptRecoveryJob = {
  version: 1;
  status: "FAILED" | "AWAITING_OWNER";
  error: string | null;
  completion: null;
};

async function receiptRecoveryJob(runRoot: string): Promise<ReceiptRecoveryJob> {
  const file = path.join(runRoot, "REVIEWER-JOB.json");
  const metadata = await lstat(file).catch(() => null);
  if (!metadata || !metadata.isFile() || metadata.isSymbolicLink()) {
    throw new Error("Receipt recovery requires a real REVIEWER-JOB.json file.");
  }
  let value: unknown;
  try {
    value = JSON.parse(await readFile(file, "utf8"));
  } catch {
    throw new Error("Receipt recovery requires valid reviewer-job JSON.");
  }
  if (!value || typeof value !== "object") throw new Error("Receipt recovery found invalid reviewer-job data.");
  const job = value as Partial<ReceiptRecoveryJob>;
  const retryableLegacyFailure = job.status === "FAILED" && job.error === "Owner acknowledgement exited 1.";
  const retryableCurrentState = job.status === "AWAITING_OWNER" && job.error === null;
  if (job.version !== 1 || job.completion !== null || (!retryableLegacyFailure && !retryableCurrentState)) {
    throw new Error("This Reviewer state is not a retryable owner-receipt attempt. Koda refuses to guess.");
  }
  return job as ReceiptRecoveryJob;
}

function processAlive(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return (error as NodeJS.ErrnoException).code === "EPERM";
  }
}

async function reviewerLockAlive(runRoot: string): Promise<boolean> {
  const lock = path.join(runRoot, ".reviewer-window.lock");
  const metadata = await lstat(lock).catch(() => null);
  if (!metadata) return false;
  if (!metadata.isDirectory() || metadata.isSymbolicLink()) throw new Error("Reviewer recovery lock is unsafe.");
  const ownerFile = path.join(lock, "OWNER.json");
  const ownerMetadata = await lstat(ownerFile).catch(() => null);
  if (!ownerMetadata || !ownerMetadata.isFile() || ownerMetadata.isSymbolicLink()) {
    throw new Error("Reviewer recovery lock owner is unsafe.");
  }
  const owner = JSON.parse(await readFile(ownerFile, "utf8")) as { version?: number; pid?: number };
  if (owner.version !== 1 || !Number.isInteger(owner.pid) || owner.pid! < 1) {
    throw new Error("Reviewer recovery lock owner is invalid.");
  }
  return processAlive(owner.pid!);
}

async function waitForRecoveredReviewer(runRoot: string): Promise<boolean> {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    if (await reviewerLockAlive(runRoot)) {
      const job = await receiptRecoveryJob(runRoot).catch(() => null);
      if (job?.status === "AWAITING_OWNER") return true;
    }
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  return false;
}

export async function requestGhosttyRecoveryWindows(
  project: string,
  runtime: GuideRuntimeView,
  toolkit: ToolkitIntegritySnapshot,
  dependencies: GhosttyLaunchDependencies = {},
): Promise<GhosttyWindowRequest[]> {
  const recoveryFile = path.join(runtime.runRoot, "RECOVERY.json");
  if (await lstat(recoveryFile).then(() => true).catch(() => false)) {
    throw new Error("A visible recovery was already requested. Run koda guide status instead of opening duplicate windows.");
  }
  if (runtime.run.status !== "PAUSED_REVIEWER_FAILURE" || runtime.run.lastError !== "Owner acknowledgement exited 1.") {
    throw new Error("Automatic recovery is limited to the named owner-receipt failure. Run koda guide status for other states.");
  }
  if (!runtime.run.terminalLaunch) throw new Error("No prior visible launch exists to recover.");
  if (await reviewerLockAlive(runtime.runRoot)) {
    throw new Error("The Reviewer window is already running; automatic recovery refuses a duplicate.");
  }
  await receiptRecoveryJob(runtime.runRoot);

  const prepared = {
    ...runtime,
    launch: { id: runtime.run.launchId },
  } as PreparedGuideRuntime;
  const requests = await ghosttyWindowRequests(project, prepared, dependencies);
  await writeJsonAtomic(recoveryFile, {
    version: 1,
    reason: "owner-receipt-input-retry",
    priorError: runtime.run.lastError,
    requestedAt: nowIso(),
    toolkit,
  });
  runtime.run.lastAction = "recover visible Reviewer and Producer after retryable owner receipt input";
  runtime.run.lastError = undefined;
  await writeJsonAtomic(path.join(runtime.runRoot, "RUN.json"), runtime.run);

  const open = dependencies.open ?? defaultOpen;
  const reviewer = open(requests[0]!.args, project);
  if (reviewer.status !== 0) {
    runtime.run.lastError = `Ghostty refused the recovered Reviewer window${reviewer.stderr ? `: ${reviewer.stderr}` : "."}`;
    await writeJsonAtomic(path.join(runtime.runRoot, "RUN.json"), runtime.run);
    throw new Error(`${runtime.run.lastError} The Producer was not opened.`);
  }
  const reviewerReady = await (dependencies.waitForRecoveredReviewer ?? waitForRecoveredReviewer)(runtime.runRoot);
  if (!reviewerReady) {
    runtime.run.lastError = "Recovered Reviewer did not reach its owner decision point; the Producer was not opened.";
    await writeJsonAtomic(path.join(runtime.runRoot, "RUN.json"), runtime.run);
    throw new Error(runtime.run.lastError);
  }
  const producer = open(requests[1]!.args, project);
  if (producer.status !== 0) {
    runtime.run.lastError = `Ghostty refused the recovered Producer window${producer.stderr ? `: ${producer.stderr}` : "."}`;
    await writeJsonAtomic(path.join(runtime.runRoot, "RUN.json"), runtime.run);
    throw new Error(runtime.run.lastError);
  }
  return requests;
}

function defaultOpen(args: string[], cwd: string): GhosttyOpenResult {
  const result = spawnSync("/usr/bin/open", args, { cwd, encoding: "utf8" });
  return { status: result.status, stderr: (result.stderr ?? "").trim() };
}

export async function requestGhosttyWindows(
  project: string,
  prepared: PreparedGuideRuntime,
  dependencies: GhosttyLaunchDependencies = {},
): Promise<GhosttyWindowRequest[]> {
  if (prepared.reused || prepared.run.terminalLaunch) {
    throw new Error("This Guide runtime already exists; automatic Ghostty opening refuses to create duplicate Producer or Reviewer processes. Use koda guide status for exact recovery commands.");
  }
  const requests = await ghosttyWindowRequests(project, prepared, dependencies);
  prepared.run.terminalLaunch = { adapter: "ghostty-macos", requestedAt: nowIso() };
  prepared.run.lastAction = "request visible Ghostty Reviewer and Producer windows";
  prepared.run.lastError = undefined;
  await writeJsonAtomic(path.join(prepared.runRoot, "RUN.json"), prepared.run);

  const open = dependencies.open ?? defaultOpen;
  for (const request of requests) {
    const result = open(request.args, project);
    if (result.status !== 0) {
      prepared.run.lastError = `Ghostty refused the ${request.role} window request${result.stderr ? `: ${result.stderr}` : "."}`;
      await writeJsonAtomic(path.join(prepared.runRoot, "RUN.json"), prepared.run);
      throw new Error(`${prepared.run.lastError} The runtime remains recoverable through koda guide status.`);
    }
  }
  return requests;
}
