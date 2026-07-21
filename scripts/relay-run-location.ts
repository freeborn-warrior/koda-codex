import { realpath } from "node:fs/promises";
import path from "node:path";

import { pathExists } from "../src/config.ts";

export type RelayRunPathRecord = {
  mode?: "fixture-copy" | "guide-project";
  project: string;
  runtime: string;
  cli: string;
};

export type RelayRunPaths = {
  mode: "fixture-copy" | "guide-project";
  project: string;
  runtime: string;
  cli: string;
};

function shellQuote(value: string): string {
  return `'${value.replaceAll("'", `'\"'\"'`)}'`;
}

export function formatRelayCommand(script: string, runRoot: string, extra: string[] = []): string {
  return [process.execPath, script, ...extra, runRoot].map(shellQuote).join(" ");
}

function within(parent: string, candidate: string): boolean {
  const relative = path.relative(parent, candidate);
  return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
}

async function resolveTrustedCli(packageRoot: string, recorded: string): Promise<string> {
  const actual = await realpath(recorded);
  const candidates = [path.join(packageRoot, "src", "cli.ts"), path.join(packageRoot, "dist", "cli.js")];
  const trusted: string[] = [];
  for (const candidate of candidates) {
    if (await pathExists(candidate)) trusted.push(await realpath(candidate));
  }
  if (!trusted.includes(actual)) throw new Error("Relay RUN.json does not name this checkout's trusted Koda-C CLI.");
  return actual;
}

export async function resolveRelayRunPaths(options: {
  packageRoot: string;
  configuredRunsRoot: string;
  runRoot: string;
  run: RelayRunPathRecord;
}): Promise<RelayRunPaths> {
  const { packageRoot, configuredRunsRoot, runRoot, run } = options;
  const mode = run.mode ?? "fixture-copy";
  const cli = await resolveTrustedCli(packageRoot, run.cli);
  if (mode === "fixture-copy") {
    if (path.dirname(runRoot) !== configuredRunsRoot) {
      throw new Error(`Relay run must be one direct child of ${configuredRunsRoot}.`);
    }
    const projectCandidate = path.resolve(runRoot, run.project);
    const runtimeCandidate = path.resolve(runRoot, run.runtime);
    if (!within(runRoot, projectCandidate) || projectCandidate === runRoot || !within(projectCandidate, runtimeCandidate) || runtimeCandidate === projectCandidate) {
      throw new Error("Relay run paths escape their prepared run folder.");
    }
    const [project, runtime] = await Promise.all([realpath(projectCandidate), realpath(runtimeCandidate)]);
    if (!within(runRoot, project) || project === runRoot || !within(project, runtime) || runtime === project) {
      throw new Error("Relay run paths resolve outside their prepared run folder.");
    }
    return { mode, project, runtime, cli };
  }

  if (mode !== "guide-project") throw new Error(`Relay RUN.json names unsupported mode ${String(mode)}.`);
  if (path.basename(path.dirname(runRoot)) !== "runs" || path.basename(path.dirname(path.dirname(runRoot))) !== ".koda") {
    throw new Error("Guide run must be one direct child of the project's .koda/runs directory.");
  }
  const derivedProject = path.dirname(path.dirname(path.dirname(runRoot)));
  const projectCandidate = path.resolve(runRoot, run.project);
  const runtimeCandidate = path.resolve(runRoot, run.runtime);
  if (projectCandidate !== derivedProject || runtimeCandidate !== runRoot) {
    throw new Error("Guide run paths do not resolve to their containing Koda-C project and runtime.");
  }
  const [project, runtime] = await Promise.all([realpath(projectCandidate), realpath(runtimeCandidate)]);
  if (project !== derivedProject || runtime !== runRoot) {
    throw new Error("Guide run paths resolve through a symbolic link or outside their containing project.");
  }
  return { mode, project, runtime, cli };
}
