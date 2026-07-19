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

export interface VisibleRoleHealth {
  reviewerRunning: boolean;
  producerRunning: boolean;
}

export interface GhosttyLaunchDependencies {
  platform?: string;
  codexExecutable?: string;
  open?: (args: string[], cwd: string) => GhosttyOpenResult;
  waitForStartedReviewer?: (runRoot: string) => Promise<boolean>;
  waitForStartedProducer?: (runRoot: string) => Promise<boolean>;
  waitForRecoveredReviewer?: (runRoot: string) => Promise<boolean>;
  waitForRecoveredProducer?: (runRoot: string) => Promise<boolean>;
}

const ROLE_START_ATTEMPTS = 900;

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
  id: string;
  kind: "formal" | "repair" | "fresh";
  phase: string;
  purpose: string;
  prompt: string;
  expectedPath: string;
  status: "FAILED" | "AWAITING_OWNER";
  createdAt: string;
  updatedAt: string;
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
  if (
    job.version !== 1 ||
    typeof job.id !== "string" || !/^[0-9a-f-]{36}$/.test(job.id) ||
    !["formal", "repair", "fresh"].includes(String(job.kind)) ||
    typeof job.phase !== "string" || !/^[a-z0-9][a-z0-9-]*$/.test(job.phase) ||
    typeof job.purpose !== "string" || job.purpose.trim() === "" ||
    typeof job.prompt !== "string" || job.prompt.trim() === "" ||
    typeof job.expectedPath !== "string" || job.expectedPath.trim() === "" || path.isAbsolute(job.expectedPath) || job.expectedPath.split(/[\\/]/).includes("..") ||
    typeof job.createdAt !== "string" ||
    typeof job.updatedAt !== "string" ||
    job.completion !== null ||
    (!retryableLegacyFailure && !retryableCurrentState)
  ) {
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

async function roleLockAlive(runRoot: string, role: "Reviewer" | "Producer"): Promise<boolean> {
  const lock = path.join(runRoot, `.${role.toLowerCase()}-window.lock`);
  const metadata = await lstat(lock).catch(() => null);
  if (!metadata) return false;
  if (!metadata.isDirectory() || metadata.isSymbolicLink()) throw new Error(`${role} recovery lock is unsafe.`);
  const ownerFile = path.join(lock, "OWNER.json");
  let ownerMetadata;
  try {
    ownerMetadata = await lstat(ownerFile);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      const lockStillExists = await lstat(lock).then(() => true).catch(() => false);
      if (!lockStillExists) return false;
      throw new Error(`${role} recovery lock owner is unsafe.`);
    }
    throw error;
  }
  if (!ownerMetadata || !ownerMetadata.isFile() || ownerMetadata.isSymbolicLink()) {
    throw new Error(`${role} recovery lock owner is unsafe.`);
  }
  let owner: { version?: number; pid?: number };
  try {
    owner = JSON.parse(await readFile(ownerFile, "utf8")) as { version?: number; pid?: number };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      const lockStillExists = await lstat(lock).then(() => true).catch(() => false);
      if (!lockStillExists) return false;
      throw new Error(`${role} recovery lock owner is unsafe.`);
    }
    throw new Error(`${role} recovery lock owner is invalid.`, { cause: error });
  }
  if (owner.version !== 1 || !Number.isInteger(owner.pid) || owner.pid! < 1) {
    throw new Error(`${role} recovery lock owner is invalid.`);
  }
  return processAlive(owner.pid!);
}

async function reviewerLockAlive(runRoot: string): Promise<boolean> {
  return roleLockAlive(runRoot, "Reviewer");
}

async function producerLockAlive(runRoot: string): Promise<boolean> {
  return roleLockAlive(runRoot, "Producer");
}

export async function visibleRoleHealth(runRoot: string): Promise<VisibleRoleHealth> {
  const [reviewerRunning, producerRunning] = await Promise.all([
    reviewerLockAlive(runRoot),
    producerLockAlive(runRoot),
  ]);
  return { reviewerRunning, producerRunning };
}

async function waitForRecoveredReviewer(runRoot: string): Promise<boolean> {
  for (let attempt = 0; attempt < ROLE_START_ATTEMPTS; attempt += 1) {
    if (await reviewerLockAlive(runRoot)) {
      const job = await receiptRecoveryJob(runRoot).catch(() => null);
      if (job?.status === "AWAITING_OWNER") return true;
    }
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  return false;
}

async function recoveredRunState(runRoot: string): Promise<{ status?: string; lastError?: string } | null> {
  const file = path.join(runRoot, "RUN.json");
  const metadata = await lstat(file).catch(() => null);
  if (!metadata || !metadata.isFile() || metadata.isSymbolicLink()) {
    throw new Error("Recovery requires a real RUN.json file.");
  }
  try {
    return JSON.parse(await readFile(file, "utf8")) as { status?: string; lastError?: string };
  } catch {
    throw new Error("Recovery requires valid RUN.json data.");
  }
}

async function waitForRecoveredProducer(runRoot: string): Promise<boolean> {
  for (let attempt = 0; attempt < ROLE_START_ATTEMPTS; attempt += 1) {
    const state = await recoveredRunState(runRoot);
    if (state?.status === "AWAITING_REVIEWER_WINDOW" && !state.lastError && await producerLockAlive(runRoot)) return true;
    if (["PAUSED_ERROR", "PAUSED_REVIEWER_FAILURE"].includes(String(state?.status))) return false;
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  return false;
}

async function waitForStartedReviewer(runRoot: string): Promise<boolean> {
  for (let attempt = 0; attempt < ROLE_START_ATTEMPTS; attempt += 1) {
    if (await reviewerLockAlive(runRoot)) {
      const state = path.join(runRoot, "REVIEWER-STATE.json");
      const metadata = await lstat(state).catch(() => null);
      if (metadata?.isFile() && !metadata.isSymbolicLink()) return true;
    }
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  return false;
}

async function waitForStartedProducer(runRoot: string): Promise<boolean> {
  for (let attempt = 0; attempt < ROLE_START_ATTEMPTS; attempt += 1) {
    const state = await recoveredRunState(runRoot);
    if (
      await producerLockAlive(runRoot) &&
      !["PREPARED", "PAUSED_ERROR", "PAUSED_REVIEWER_FAILURE"].includes(String(state?.status)) &&
      !state?.lastError
    ) return true;
    if (["PAUSED_ERROR", "PAUSED_REVIEWER_FAILURE"].includes(String(state?.status))) return false;
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  return false;
}

async function readRecoveryRecord(file: string): Promise<Record<string, unknown>> {
  const metadata = await lstat(file).catch(() => null);
  if (!metadata || !metadata.isFile() || metadata.isSymbolicLink()) {
    throw new Error("Visible recovery evidence must be a real RECOVERY.json file.");
  }
  let value: unknown;
  try {
    value = JSON.parse(await readFile(file, "utf8"));
  } catch {
    throw new Error("Visible recovery evidence must contain valid JSON.");
  }
  if (!value || typeof value !== "object") throw new Error("Visible recovery evidence is invalid.");
  const record = value as Record<string, unknown>;
  if (
    record.version !== 1 ||
    !["owner-receipt-input-retry", "stable-owner-handover-role-recovery"].includes(String(record.reason)) ||
    typeof record.requestedAt !== "string"
  ) {
    throw new Error("Visible recovery evidence does not match the session-recovery contract.");
  }
  const reviewerJob = record.reviewerJob as Record<string, unknown> | undefined;
  if (record.reason === "stable-owner-handover-role-recovery" && (
    !reviewerJob ||
    typeof reviewerJob.id !== "string" || !/^[0-9a-f-]{36}$/.test(reviewerJob.id) ||
    !["formal", "repair", "fresh"].includes(String(reviewerJob.kind)) ||
    typeof reviewerJob.phase !== "string" || !/^[a-z0-9][a-z0-9-]*$/.test(reviewerJob.phase) ||
    typeof reviewerJob.expectedPath !== "string" || reviewerJob.expectedPath.trim() === "" ||
    path.isAbsolute(reviewerJob.expectedPath) || reviewerJob.expectedPath.split(/[\\/]/).includes("..")
  )) {
    throw new Error("Visible recovery evidence has an invalid reviewer-job binding.");
  }
  if (record.attempts !== undefined && !Array.isArray(record.attempts)) {
    throw new Error("Visible recovery evidence has an invalid attempt history.");
  }
  return record;
}

export async function producerOnlyRecoveryReady(runtime: GuideRuntimeView): Promise<boolean> {
  const roles = await partialRecoveryRoles(runtime);
  return roles?.length === 1 && roles[0] === "producer";
}

export async function partialRecoveryRoles(
  runtime: GuideRuntimeView,
): Promise<Array<GhosttyWindowRequest["role"]> | null> {
  const recoveryFile = path.join(runtime.runRoot, "RECOVERY.json");
  const recoveryExists = await lstat(recoveryFile).then(() => true).catch(() => false);
  const recovery = recoveryExists ? await readRecoveryRecord(recoveryFile) : null;
  const stableOwnerHandover = runtime.run.status === "AWAITING_REVIEWER_WINDOW" && runtime.run.lastError === undefined;
  const possibleFailedRejoin = recoveryExists &&
    runtime.run.status === "PAUSED_ERROR" &&
    runtime.run.lastError?.startsWith("A different reviewer job is already active:") === true;
  const possibleFailedRecovery = recoveryExists &&
    (runtime.run.lastAction === "recover visible Reviewer and Producer after retryable owner receipt input" ||
      runtime.run.lastAction?.startsWith("reopen missing ") === true) &&
    (runtime.run.lastError === "Recovered Reviewer did not reach its owner decision point; the Producer was not opened." ||
      runtime.run.lastError === "Recovered Reviewer did not reach the existing owner decision point; the Producer was not opened." ||
      runtime.run.lastError === "Recovered Producer did not rejoin the existing Reviewer decision point." ||
      runtime.run.lastError?.startsWith("Ghostty refused the recovered Reviewer window") === true ||
      runtime.run.lastError?.startsWith("Ghostty refused the recovered Producer window") === true);
  if (!stableOwnerHandover && !possibleFailedRejoin && !possibleFailedRecovery) return null;
  const job = await receiptRecoveryJob(runtime.runRoot);
  const boundJob = recovery?.reviewerJob as Record<string, unknown> | undefined;
  if (boundJob && (
    boundJob.id !== job.id || boundJob.kind !== job.kind ||
    boundJob.phase !== job.phase || boundJob.expectedPath !== job.expectedPath
  )) {
    throw new Error("Visible recovery evidence is bound to a different Reviewer job. Koda refuses to guess.");
  }
  const expectedError = `A different reviewer job is already active: ${job.kind} ${job.phase} (${job.status}).`;
  const failedRejoin = possibleFailedRejoin && runtime.run.lastError === expectedError;
  const exactPartialState = ((failedRejoin || stableOwnerHandover) && job.status === "AWAITING_OWNER") ||
    (possibleFailedRecovery && ["FAILED", "AWAITING_OWNER"].includes(job.status));
  if (!exactPartialState) return null;
  const health = await visibleRoleHealth(runtime.runRoot);
  const missing: Array<GhosttyWindowRequest["role"]> = [];
  if (!health.reviewerRunning) missing.push("reviewer");
  if (!health.producerRunning) missing.push("producer");
  return missing.length > 0 ? missing : null;
}

export async function requestGhosttyRecoveryWindows(
  project: string,
  runtime: GuideRuntimeView,
  toolkit: ToolkitIntegritySnapshot,
  dependencies: GhosttyLaunchDependencies = {},
): Promise<GhosttyWindowRequest[]> {
  const recoveryFile = path.join(runtime.runRoot, "RECOVERY.json");
  const priorRecovery = await lstat(recoveryFile).then(() => true).catch(() => false);
  const partialRoles = await partialRecoveryRoles(runtime);
  if (partialRoles) {
    const job = await receiptRecoveryJob(runtime.runRoot);
    const recovery = priorRecovery
      ? await readRecoveryRecord(recoveryFile)
      : {
          version: 1,
          reason: "stable-owner-handover-role-recovery",
          requestedAt: nowIso(),
          toolkit,
          reviewerJob: { id: job.id, kind: job.kind, phase: job.phase, expectedPath: job.expectedPath },
        };
    if (!priorRecovery) await writeJsonAtomic(recoveryFile, recovery);
    const retryRequestedAt = nowIso();
    const prepared = {
      ...runtime,
      launch: { id: runtime.run.launchId },
    } as PreparedGuideRuntime;
    const allRequests = await ghosttyWindowRequests(project, prepared, dependencies);
    const requests = allRequests.filter((request) => partialRoles.includes(request.role));
    runtime.run.lastAction = `reopen missing ${partialRoles.join(" and ")} after partial recovery`;
    runtime.run.lastError = undefined;
    await writeJsonAtomic(path.join(runtime.runRoot, "RUN.json"), runtime.run);
    const open = dependencies.open ?? defaultOpen;
    for (const request of requests) {
      const result = open(request.args, project);
      if (result.status !== 0) {
        runtime.run.lastError = `Ghostty refused the recovered ${request.role === "reviewer" ? "Reviewer" : "Producer"} window${result.stderr ? `: ${result.stderr}` : "."}`;
        await writeJsonAtomic(path.join(runtime.runRoot, "RUN.json"), runtime.run);
        throw new Error(runtime.run.lastError);
      }
      const ready = request.role === "reviewer"
        ? await (dependencies.waitForRecoveredReviewer ?? waitForRecoveredReviewer)(runtime.runRoot)
        : await (dependencies.waitForRecoveredProducer ?? waitForRecoveredProducer)(runtime.runRoot);
      if (!ready) {
        const current = await recoveredRunState(runtime.runRoot);
        runtime.run.status = current?.status ?? "PAUSED_ERROR";
        runtime.run.lastError = current?.lastError ?? (request.role === "reviewer"
          ? "Recovered Reviewer did not reach the existing owner decision point; the Producer was not opened."
          : "Recovered Producer did not rejoin the existing Reviewer decision point.");
        await writeJsonAtomic(path.join(runtime.runRoot, "RUN.json"), runtime.run);
        throw new Error(runtime.run.lastError);
      }
    }
    const completedAt = nowIso();
    await writeJsonAtomic(recoveryFile, {
      ...recovery,
      rolesRetried: partialRoles,
      completedAt,
      attempts: [
        ...(Array.isArray(recovery.attempts) ? recovery.attempts : []),
        { roles: partialRoles, requestedAt: retryRequestedAt, completedAt },
      ],
      ...(partialRoles.includes("producer") ? { producerRetryAt: completedAt } : {}),
    });
    return requests;
  }
  if (priorRecovery) {
    throw new Error("A visible recovery was already requested. Return to the Guide conversation; do not open duplicate windows.");
  }
  if (runtime.run.status !== "PAUSED_REVIEWER_FAILURE" || runtime.run.lastError !== "Owner acknowledgement exited 1.") {
    throw new Error("Automatic recovery is limited to the named owner-receipt failure. Return to Guide for an exact diagnosis; do not run a role command.");
  }
  if (!runtime.run.terminalLaunch) throw new Error("No prior visible launch exists to recover.");
  if (await reviewerLockAlive(runtime.runRoot)) {
    throw new Error("The Reviewer window is already running; automatic recovery refuses a duplicate.");
  }
  const job = await receiptRecoveryJob(runtime.runRoot);

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
    reviewerJob: { id: job.id, kind: job.kind, phase: job.phase, expectedPath: job.expectedPath },
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
  const producerReady = await (dependencies.waitForRecoveredProducer ?? waitForRecoveredProducer)(runtime.runRoot);
  if (!producerReady) {
    const current = await recoveredRunState(runtime.runRoot);
    runtime.run.status = current?.status ?? "PAUSED_ERROR";
    runtime.run.lastError = current?.lastError ?? "Recovered Producer did not rejoin the existing Reviewer decision point.";
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
    throw new Error("This Guide runtime already exists; automatic Ghostty opening refuses to create duplicate Producer or Reviewer processes. Return to Guide for the exact next choice.");
  }
  const requests = await ghosttyWindowRequests(project, prepared, dependencies);
  prepared.run.terminalLaunch = { adapter: "ghostty-macos", requestedAt: nowIso() };
  prepared.run.lastAction = "request visible Ghostty Reviewer and Producer windows";
  prepared.run.lastError = undefined;
  await writeJsonAtomic(path.join(prepared.runRoot, "RUN.json"), prepared.run);

  const open = dependencies.open ?? defaultOpen;
  const reviewer = open(requests[0]!.args, project);
  if (reviewer.status !== 0) {
    prepared.run.lastError = `Ghostty refused the reviewer window request${reviewer.stderr ? `: ${reviewer.stderr}` : "."}`;
    await writeJsonAtomic(path.join(prepared.runRoot, "RUN.json"), prepared.run);
    throw new Error(`${prepared.run.lastError} The Producer was not opened.`);
  }
  const reviewerReady = await (dependencies.waitForStartedReviewer ?? waitForStartedReviewer)(prepared.runRoot);
  if (!reviewerReady) {
    prepared.run.lastError = "The Reviewer window request returned, but Reviewer did not become ready; the Producer was not opened.";
    await writeJsonAtomic(path.join(prepared.runRoot, "RUN.json"), prepared.run);
    throw new Error(prepared.run.lastError);
  }
  const producer = open(requests[1]!.args, project);
  if (producer.status !== 0) {
    prepared.run.lastError = `Ghostty refused the producer window request${producer.stderr ? `: ${producer.stderr}` : "."}`;
    await writeJsonAtomic(path.join(prepared.runRoot, "RUN.json"), prepared.run);
    throw new Error(`${prepared.run.lastError} The Reviewer remains open. The runtime remains recoverable through Guide.`);
  }
  const producerReady = await (dependencies.waitForStartedProducer ?? waitForStartedProducer)(prepared.runRoot);
  if (!producerReady) {
    const current = await recoveredRunState(prepared.runRoot);
    prepared.run.status = current?.status ?? prepared.run.status;
    prepared.run.lastError = current?.lastError ?? "The Producer window request returned, but Producer did not become ready. The Reviewer remains open.";
    await writeJsonAtomic(path.join(prepared.runRoot, "RUN.json"), prepared.run);
    throw new Error(prepared.run.lastError);
  }
  return requests;
}
