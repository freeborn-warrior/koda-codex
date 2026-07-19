import { spawnSync } from "node:child_process";
import { realpath } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

import type { PreparedGuideRuntime } from "./guide-runtime.ts";
import { nowIso, writeJsonAtomic } from "./project.ts";

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
  executable: string;
  script: string;
  scriptArgs: string[];
}): GhosttyWindowRequest {
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
      "-e",
      "/usr/bin/env",
      `PATH=${process.env.PATH ?? "/usr/bin:/bin:/usr/sbin:/sbin"}`,
      `KODA_CODEX_BIN=${options.executable}`,
      process.execPath,
      options.script,
      ...options.scriptArgs,
    ],
  };
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
  return [
    windowRequest({
      role: "reviewer",
      title: `Koda-C Reviewer — ${shortId}`,
      project,
      executable,
      script: path.join(scripts, "run-relay-reviewer-window.ts"),
      scriptArgs: [prepared.runRoot],
    }),
    windowRequest({
      role: "producer",
      title: `Koda-C Producer — ${shortId}`,
      project,
      executable,
      script: path.join(scripts, "execute-relay-run.ts"),
      scriptArgs: ["--reviewer-window", prepared.runRoot],
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
