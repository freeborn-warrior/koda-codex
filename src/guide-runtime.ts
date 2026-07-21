import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { lstat, mkdir, readFile, readdir, realpath } from "node:fs/promises";
import path from "node:path";

import { pathExists, readProjectConfig } from "./config.ts";
import { evaluateSessionClosure } from "./close.ts";
import { guideReturnsDir, guideRunsDir, verifyGuideLaunch, type GuideLaunchRequest } from "./guide.ts";
import { evaluateSessionHalt } from "./halt.ts";
import { normalizeOwnerName, relayOwnerName } from "./owner.ts";
import { loadSessionState, nowIso, sessionRoot, writeJsonAtomic, writeTextAtomic } from "./project.ts";
import type { ProjectConfig } from "./types.ts";

export const GUIDE_RUNTIME_DIR = ".koda";
export const GUIDE_RUNS_DIR = "runs";

const EFFORTS = new Set(["low", "medium", "high", "xhigh"]);
const SAFE_ROLE_VALUE = /^[A-Za-z0-9][A-Za-z0-9._-]*$/;

export interface GuideRuntimeRole {
  model: string;
  effort: string;
  threadId: string | null;
  turns: number;
}

export interface GuideTerminalLaunch {
  adapter: "ghostty-macos";
  requestedAt: string;
}

export interface GuideRuntimeRecord {
  version: 1 | 2;
  mode: "guide-project";
  scenario: "guide-confirmed";
  status: string;
  preparedAt: string;
  launchId: string;
  owner?: string;
  producer: GuideRuntimeRole;
  reviewer: GuideRuntimeRole;
  project: "../../..";
  runtime: ".";
  cli: string;
  prompt: string;
  sessionKind?: string;
  launchMode?: "independent" | "dependent" | "continuation";
  dependencySessionIds?: string[];
  sessionId?: string;
  archive: string;
  guideReturn: string;
  initialCommit: string;
  maxTurns: number;
  terminalLaunch?: GuideTerminalLaunch;
  lastAction?: string;
  lastError?: string;
}

export interface PrepareGuideRuntimeOptions {
  producerModel: string;
  producerEffort: string;
  reviewerModel: string;
  reviewerEffort: string;
  maxTurns?: number;
}

export interface PreparedGuideRuntime {
  launch: GuideLaunchRequest;
  run: GuideRuntimeRecord;
  runRoot: string;
  producerCommand: string;
  reviewerCommand: string;
  statusCommand: string;
  reused: boolean;
}

export type GuideRuntimeView = Omit<PreparedGuideRuntime, "launch" | "reused">;

export interface GuideRuntimeTruth {
  savedStatus: string;
  effectiveStatus: string;
  terminalFromDisk: boolean;
}

export async function guideRuntimeTruth(root: string, runtime: GuideRuntimeView): Promise<GuideRuntimeTruth> {
  const savedStatus = runtime.run.status;
  if (!runtime.run.sessionId) {
    if (savedStatus === "COMPLETE" || savedStatus === "HALTED") {
      throw new Error(`Guide runtime ${runtime.run.launchId} claims ${savedStatus} but no bound session exists.`);
    }
    return { savedStatus, effectiveStatus: savedStatus, terminalFromDisk: false };
  }
  const config = await readProjectConfig(root);
  const directory = sessionRoot(root, config, runtime.run.sessionId);
  const state = await loadSessionState(directory, runtime.run.sessionId);
  const closure = await evaluateSessionClosure(root, directory, state);
  const halt = await evaluateSessionHalt(root, directory, state);
  if (halt.halted) {
    return { savedStatus, effectiveStatus: "HALTED", terminalFromDisk: true };
  }
  if (savedStatus === "COMPLETE" && !closure.closed) {
    throw new Error(`Guide runtime ${runtime.run.launchId} claims COMPLETE without pushed close evidence:\n- ${closure.reasons.join("\n- ")}`);
  }
  if (savedStatus === "HALTED") {
    throw new Error(`Guide runtime ${runtime.run.launchId} claims HALTED without pushed halt evidence:\n- ${halt.reasons.join("\n- ")}`);
  }
  return { savedStatus, effectiveStatus: savedStatus, terminalFromDisk: savedStatus === "COMPLETE" };
}

function git(root: string, args: string[]): { ok: boolean; stdout: string; stderr: string } {
  const result = spawnSync("git", args, { cwd: root, encoding: "utf8", env: { ...process.env, GIT_OPTIONAL_LOCKS: "0" } });
  return {
    ok: result.status === 0,
    stdout: (result.stdout ?? "").trim(),
    stderr: (result.stderr ?? "").trim(),
  };
}

function validateRole(label: string, model: string, effort: string): void {
  if (!SAFE_ROLE_VALUE.test(model)) {
    throw new Error(`${label} model must use only letters, numbers, dots, underscores, or hyphens.`);
  }
  if (!EFFORTS.has(effort)) {
    throw new Error(`${label} effort must be one of: ${[...EFFORTS].join(", ")}.`);
  }
}

function validateMaxTurns(value: number): void {
  if (!Number.isInteger(value) || value < 1 || value > 100) {
    throw new Error("Guide runtime max turns must be an integer from 1 through 100.");
  }
}

function packageRoot(): string {
  return path.dirname(path.dirname(fileURLToPath(import.meta.url)));
}

async function trustedCli(): Promise<string> {
  const extension = path.extname(fileURLToPath(import.meta.url));
  const candidate = path.join(path.dirname(fileURLToPath(import.meta.url)), `cli${extension}`);
  return realpath(candidate);
}

function shellQuote(value: string): string {
  return `'${value.replaceAll("'", `'\"'\"'`)}'`;
}

function command(script: string, runRoot: string, extra: string[] = []): string {
  return [process.execPath, script, ...extra, runRoot].map(shellQuote).join(" ");
}

function runtimeCommands(runRoot: string): Pick<GuideRuntimeView, "producerCommand" | "reviewerCommand" | "statusCommand"> {
  const scripts = path.join(packageRoot(), "scripts");
  return {
    producerCommand: command(path.join(scripts, "execute-relay-run.ts"), runRoot, ["--reviewer-window"]),
    reviewerCommand: command(path.join(scripts, "run-relay-reviewer-window.ts"), runRoot),
    statusCommand: command(path.join(scripts, "show-relay-status.ts"), runRoot),
  };
}

async function ensureRealDirectory(root: string, candidate: string, label: string): Promise<void> {
  if (await pathExists(candidate)) {
    const metadata = await lstat(candidate);
    if (!metadata.isDirectory()) throw new Error(`${label} must be a real directory; symbolic links are refused.`);
    const [resolvedRoot, resolvedCandidate] = await Promise.all([realpath(root), realpath(candidate)]);
    const relative = path.relative(resolvedRoot, resolvedCandidate);
    if (relative.startsWith("..") || path.isAbsolute(relative)) throw new Error(`${label} resolves outside the project.`);
    return;
  }
  const parent = path.dirname(candidate);
  if (!(await pathExists(parent))) throw new Error(`${label} parent does not exist.`);
  const [resolvedRoot, resolvedParent] = await Promise.all([realpath(root), realpath(parent)]);
  const relative = path.relative(resolvedRoot, resolvedParent);
  if (relative.startsWith("..") || path.isAbsolute(relative)) throw new Error(`${label} parent resolves outside the project.`);
  await mkdir(candidate);
}

function runtimeRecord(value: unknown, source: string): GuideRuntimeRecord {
  if (!value || typeof value !== "object") throw new Error(`${source} must contain a JSON object.`);
  const item = value as Partial<GuideRuntimeRecord>;
  const validRole = (role: Partial<GuideRuntimeRole> | undefined) => Boolean(
    role && typeof role.model === "string" && SAFE_ROLE_VALUE.test(role.model) &&
    typeof role.effort === "string" && EFFORTS.has(role.effort) &&
    (role.threadId === null || typeof role.threadId === "string") &&
    Number.isInteger(role.turns) && (role.turns ?? -1) >= 0,
  );
  const validTerminalLaunch = item.terminalLaunch === undefined || (
    item.terminalLaunch.adapter === "ghostty-macos" &&
    typeof item.terminalLaunch.requestedAt === "string" &&
    item.terminalLaunch.requestedAt.trim() !== ""
  );
  relayOwnerName(item, source);
  if (
    (item.version !== 1 && item.version !== 2) || item.mode !== "guide-project" || item.scenario !== "guide-confirmed" ||
    typeof item.status !== "string" || typeof item.preparedAt !== "string" ||
    typeof item.launchId !== "string" || !/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(item.launchId) ||
    !validRole(item.producer) || !validRole(item.reviewer) ||
    item.project !== "../../.." || item.runtime !== "." ||
    typeof item.cli !== "string" || typeof item.prompt !== "string" ||
    !(item.sessionKind === undefined || (typeof item.sessionKind === "string" && /^[a-z][a-z0-9-]{0,31}$/.test(item.sessionKind))) ||
    !(item.launchMode === undefined || item.launchMode === "independent" || item.launchMode === "dependent" || item.launchMode === "continuation") ||
    !(item.dependencySessionIds === undefined || (Array.isArray(item.dependencySessionIds) && item.dependencySessionIds.every((id) => typeof id === "string"))) ||
    !(item.sessionId === undefined || /^\d{4}-\d{2}-\d{2}-\d{2}$/.test(item.sessionId)) ||
    typeof item.archive !== "string" || typeof item.guideReturn !== "string" ||
    typeof item.initialCommit !== "string" || !/^[a-f0-9]{40,64}$/.test(item.initialCommit) ||
    !validTerminalLaunch ||
    !(item.lastAction === undefined || typeof item.lastAction === "string") ||
    !(item.lastError === undefined || typeof item.lastError === "string") ||
    !Number.isInteger(item.maxTurns) || (item.maxTurns ?? 0) < 1 || (item.maxTurns ?? 0) > 100
  ) throw new Error(`${source} has invalid guide-project runtime data.`);
  return item as GuideRuntimeRecord;
}

async function assertRuntimeAreaSafe(root: string): Promise<string> {
  const top = git(root, ["rev-parse", "--show-toplevel"]);
  if (!top.ok || await realpath(top.stdout) !== await realpath(root)) {
    throw new Error("Guide runtime requires the Koda-C project root to be the Git repository root.");
  }
  const ignored = git(root, ["check-ignore", "-q", "--", `${GUIDE_RUNTIME_DIR}/.ignore-proof`]);
  if (!ignored.ok) {
    throw new Error(`Guide runtime refuses until ${GUIDE_RUNTIME_DIR}/ is ignored by Git.`);
  }
  const staged = git(root, ["diff", "--cached", "--name-only"]);
  if (!staged.ok) throw new Error(`Unable to inspect the shared Git index: ${staged.stderr}`);
  if (staged.stdout !== "") {
    throw new Error(`Guide runtime requires an empty shared Git index; finish the active Git operation first: ${staged.stdout}.`);
  }
  const upstream = git(root, ["rev-parse", "--abbrev-ref", "--symbolic-full-name", "@{u}"]);
  if (!upstream.ok) throw new Error("Guide runtime requires a pushed upstream branch.");
  const ahead = git(root, ["rev-list", "--count", "@{u}..HEAD"]);
  if (!ahead.ok || ahead.stdout !== "0") throw new Error("Guide runtime requires the current project commit to be pushed.");

  const runtimeRoot = path.join(root, GUIDE_RUNTIME_DIR);
  if (!(await pathExists(runtimeRoot))) await mkdir(runtimeRoot);
  await ensureRealDirectory(root, runtimeRoot, "Guide runtime directory");
  const runs = path.join(runtimeRoot, GUIDE_RUNS_DIR);
  if (!(await pathExists(runs))) await mkdir(runs);
  await ensureRealDirectory(root, runs, "Guide runs directory");
  return runs;
}

async function readRuntimeRecords(runsRoot: string): Promise<Array<{ run: GuideRuntimeRecord; runRoot: string }>> {
  const records: Array<{ run: GuideRuntimeRecord; runRoot: string }> = [];
  for (const entry of await readdir(runsRoot, { withFileTypes: true })) {
    if (!entry.isDirectory()) throw new Error(`Guide runtime state is unsafe: ${entry.name} is not a real run directory.`);
    const runFile = path.join(runsRoot, entry.name, "RUN.json");
    if (!(await pathExists(runFile)) || !(await lstat(runFile)).isFile()) {
      throw new Error(`Guide runtime state is corrupt: ${entry.name}/RUN.json is missing or not a regular file.`);
    }
    let parsed: unknown;
    try {
      parsed = JSON.parse(await readFile(runFile, "utf8"));
    } catch {
      throw new Error(`Guide runtime state is corrupt: ${entry.name}/RUN.json is not valid JSON.`);
    }
    const existing = runtimeRecord(parsed, `${entry.name}/RUN.json`);
    if (existing.launchId !== entry.name) throw new Error(`Guide runtime state is corrupt: ${entry.name} does not match its launch ID.`);
    records.push({ run: existing, runRoot: path.join(runsRoot, entry.name) });
  }
  return records.sort((left, right) =>
    left.run.preparedAt.localeCompare(right.run.preparedAt) || left.run.launchId.localeCompare(right.run.launchId));
}

export async function listGuideRuntimes(root: string): Promise<GuideRuntimeView[]> {
  const runtimeRoot = path.join(root, GUIDE_RUNTIME_DIR);
  const runsRoot = path.join(runtimeRoot, GUIDE_RUNS_DIR);
  if (!(await pathExists(runtimeRoot))) return [];
  const runtimeMetadata = await lstat(runtimeRoot);
  if (!runtimeMetadata.isDirectory()) throw new Error("Guide runtime directory must be a real directory; symbolic links are refused.");
  if (!(await pathExists(runsRoot))) return [];
  const runsMetadata = await lstat(runsRoot);
  if (!runsMetadata.isDirectory()) throw new Error("Guide runs directory must be a real directory; symbolic links are refused.");
  const records = await readRuntimeRecords(runsRoot);
  return records.map((selected) => ({ run: selected.run, runRoot: selected.runRoot, ...runtimeCommands(selected.runRoot) }));
}

export async function currentGuideRuntime(root: string, launchId?: string): Promise<GuideRuntimeView | null> {
  const records = await listGuideRuntimes(root);
  const withTruth = await Promise.all(records.map(async (runtime) => {
    const truth = await guideRuntimeTruth(root, runtime);
    return truth.effectiveStatus === runtime.run.status
      ? runtime
      : { ...runtime, run: { ...runtime.run, status: truth.effectiveStatus } };
  }));
  if (launchId) return withTruth.find(({ run }) => run.launchId === launchId) ?? null;
  const active = withTruth.filter(({ run }) => run.status !== "COMPLETE" && run.status !== "HALTED");
  if (active.length > 1) throw new Error("More than one Guide runtime is unfinished; select one by launch ID instead of guessing.");
  return active[0] ?? withTruth.at(-1) ?? null;
}

export async function prepareGuideRuntime(
  root: string,
  config: ProjectConfig,
  options: PrepareGuideRuntimeOptions,
): Promise<PreparedGuideRuntime> {
  validateRole("Producer", options.producerModel, options.producerEffort);
  validateRole("Reviewer", options.reviewerModel, options.reviewerEffort);
  const maxTurns = options.maxTurns ?? 60;
  validateMaxTurns(maxTurns);
  const launch = await verifyGuideLaunch(root, config);
  const runsRoot = await assertRuntimeAreaSafe(root);
  await readRuntimeRecords(runsRoot);
  const runRoot = path.join(runsRoot, launch.id);
  const runFile = path.join(runRoot, "RUN.json");

  const { producerCommand, reviewerCommand, statusCommand } = runtimeCommands(runRoot);

  if (await pathExists(runRoot)) {
    const metadata = await lstat(runRoot);
    if (!metadata.isDirectory()) throw new Error("The existing Guide run path is not a real directory.");
    if (!(await pathExists(runFile)) || !(await lstat(runFile)).isFile()) {
      throw new Error("The existing Guide runtime cannot be resumed: RUN.json is missing or not a regular file.");
    }
    let existing: GuideRuntimeRecord;
    try {
      existing = runtimeRecord(JSON.parse(await readFile(runFile, "utf8")), "RUN.json");
    } catch (error) {
      throw new Error(`The existing Guide runtime cannot be resumed: ${error instanceof Error ? error.message : String(error)}`);
    }
    if (
      existing.launchId !== launch.id || existing.prompt !== launch.prompt ||
      relayOwnerName(existing) !== normalizeOwnerName(launch.confirmedBy, "Confirmed owner") ||
      existing.producer.model !== options.producerModel || existing.producer.effort !== options.producerEffort ||
      existing.reviewer.model !== options.reviewerModel || existing.reviewer.effort !== options.reviewerEffort ||
      existing.maxTurns !== maxTurns
    ) throw new Error("The existing Guide runtime configuration does not match this launch request.");
    return { launch, run: existing, runRoot, producerCommand, reviewerCommand, statusCommand, reused: true };
  }

  await mkdir(runRoot);
  const head = git(root, ["rev-parse", "HEAD"]);
  if (!head.ok) throw new Error(`Unable to bind the Guide runtime to the current commit: ${head.stderr}`);
  const cli = await trustedCli();
  const run: GuideRuntimeRecord = {
    version: 2,
    mode: "guide-project",
    scenario: "guide-confirmed",
    status: "PREPARED",
    preparedAt: nowIso(),
    launchId: launch.id,
    owner: normalizeOwnerName(launch.confirmedBy, "Confirmed owner"),
    producer: { model: options.producerModel, effort: options.producerEffort, threadId: null, turns: 0 },
    reviewer: { model: options.reviewerModel, effort: options.reviewerEffort, threadId: null, turns: 0 },
    project: "../../..",
    runtime: ".",
    cli,
    prompt: launch.prompt,
    sessionKind: launch.sessionKind,
    launchMode: launch.launchMode,
    dependencySessionIds: launch.dependencies.map((item) => item.sessionId),
    archive: path.relative(root, path.join(guideRunsDir(root, config), launch.id)).split(path.sep).join("/"),
    guideReturn: path.relative(root, path.join(guideReturnsDir(root, config), `${launch.id}.json`)).split(path.sep).join("/"),
    initialCommit: head.stdout,
    maxTurns,
  };
  await Promise.all([
    writeJsonAtomic(runFile, run),
    writeTextAtomic(path.join(runRoot, "TRANSCRIPT.md"), `# Guide relay transcript — ${launch.id}\n\n`),
    writeTextAtomic(path.join(runRoot, "RESULT.md"), [
      `# Guide relay result — ${launch.id}`,
      "",
      "- Status: PREPARED — NOT RUN",
      `- Prompt: ${launch.prompt}`,
      `- Owner: ${normalizeOwnerName(launch.confirmedBy, "Confirmed owner")}`,
      `- Producer: ${options.producerModel} / ${options.producerEffort}`,
      `- Reviewer: ${options.reviewerModel} / ${options.reviewerEffort}`,
      "",
    ].join("\n")),
  ]);
  return { launch, run, runRoot, producerCommand, reviewerCommand, statusCommand, reused: false };
}
