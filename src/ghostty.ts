import { spawnSync } from "node:child_process";
import { chmod, lstat, readFile, realpath, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

import type { PreparedGuideRuntime } from "./guide-runtime.ts";
import { nowIso, writeJsonAtomic } from "./project.ts";
import { relayRoleEnvironment } from "./relay-environment.ts";

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
