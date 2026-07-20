import { spawn } from "node:child_process";
import { lstat, mkdir, readFile, rm } from "node:fs/promises";
import path from "node:path";
import { createInterface } from "node:readline/promises";
import { fileURLToPath } from "node:url";

import { codexGuidePermissionArgs } from "./codex-role-permissions.ts";
import { findProjectRoot, pathExists, readProjectConfig } from "./config.ts";
import { currentGuideRuntime, listGuideRuntimes } from "./guide-runtime.ts";
import { guideRoot, hasGuideManifest, loadGuideManifest } from "./guide.ts";
import { partialRecoveryRoles, requestGhosttyRecoveryWindows, type GhosttyWindowRequest } from "./ghostty.ts";
import { relayNodeToolchainReadRoots, relayCodexEnvironment, resolveRelayCodexExecutable } from "./relay-environment.ts";
import { sanitizeTerminalText, terminalBlock, terminalPanel } from "./terminal-ui.ts";
import { writeJsonAtomic, writeTextAtomic } from "./project.ts";
import { verifiedToolkitReadPaths, verifyToolkitIntegrity } from "./toolkit-integrity.ts";
import { loadGuideWorkSet } from "./workset.ts";

const GUIDE_AREA = path.join(".koda", "guide");
const GUIDE_STATE = "STATE.json";
const GUIDE_LOCK = ".window.lock";
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

export type GuideConsoleState = {
  version: 1;
  status: "READY" | "WORKING" | "FAILED";
  model: string | null;
  effort: string | null;
  threadId: string | null;
  turns: number;
  updatedAt: string;
  lastError: string | null;
};

export type GuideConsoleOptions = {
  model?: string | null;
  effort?: string | null;
};

type GuideRecoveryDependencies = {
  recoverGhostty: typeof requestGhosttyRecoveryWindows;
};

const defaultRecoveryDependencies: GuideRecoveryDependencies = {
  recoverGhostty: requestGhosttyRecoveryWindows,
};

function now(): string {
  return new Date().toISOString();
}

function processIsAlive(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return (error as NodeJS.ErrnoException).code === "EPERM";
  }
}

function validateAssignment(value: string | null | undefined, label: string): string | null {
  if (value === undefined || value === null) return null;
  const normalized = value.trim();
  if (!normalized || normalized.length > 120 || /[\u0000-\u001f\u007f-\u009f]/.test(normalized)) {
    throw new Error(`${label} must be a non-empty value without terminal control characters.`);
  }
  return normalized;
}

export function validateGuideConsoleState(value: unknown): GuideConsoleState {
  if (!value || typeof value !== "object") throw new Error("Guide console state must be a JSON object.");
  const state = value as Partial<GuideConsoleState>;
  if (
    state.version !== 1 ||
    !["READY", "WORKING", "FAILED"].includes(String(state.status)) ||
    !(state.model === null || typeof state.model === "string") ||
    !(state.effort === null || typeof state.effort === "string") ||
    !(state.threadId === null || (typeof state.threadId === "string" && UUID.test(state.threadId))) ||
    !Number.isInteger(state.turns) || state.turns! < 0 ||
    typeof state.updatedAt !== "string" ||
    !(state.lastError === null || typeof state.lastError === "string")
  ) {
    throw new Error("Guide console state has invalid fields.");
  }
  validateAssignment(state.model, "Guide model");
  validateAssignment(state.effort, "Guide effort");
  return state as GuideConsoleState;
}

async function realDirectory(directory: string, label: string): Promise<void> {
  if (!(await pathExists(directory))) return;
  const metadata = await lstat(directory);
  if (!metadata.isDirectory() || metadata.isSymbolicLink()) throw new Error(`${label} must be a real directory: ${directory}`);
}

export async function guideConsoleArea(root: string): Promise<string> {
  const koda = path.join(root, ".koda");
  await realDirectory(koda, ".koda");
  await mkdir(koda, { recursive: true });
  const area = path.join(root, GUIDE_AREA);
  await realDirectory(area, "Guide runtime area");
  await mkdir(area, { recursive: true });
  return area;
}

export async function readGuideConsoleState(root: string): Promise<GuideConsoleState | null> {
  const file = path.join(await guideConsoleArea(root), GUIDE_STATE);
  if (!(await pathExists(file))) return null;
  if (!(await lstat(file)).isFile()) throw new Error("Guide STATE.json must be a regular file.");
  try {
    return validateGuideConsoleState(JSON.parse(await readFile(file, "utf8")));
  } catch (error) {
    if (error instanceof SyntaxError) throw new Error("Guide STATE.json is not valid JSON.");
    throw error;
  }
}

async function saveGuideConsoleState(root: string, state: GuideConsoleState): Promise<void> {
  validateGuideConsoleState(state);
  await writeJsonAtomic(path.join(await guideConsoleArea(root), GUIDE_STATE), { ...state, updatedAt: now() });
}

export async function acquireGuideConsole(root: string): Promise<() => Promise<void>> {
  const area = await guideConsoleArea(root);
  const lock = path.join(area, GUIDE_LOCK);
  try {
    await mkdir(lock);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
    const metadata = await lstat(lock);
    if (!metadata.isDirectory() || metadata.isSymbolicLink()) throw new Error("Guide console lock must be a real directory.");
    const ownerFile = path.join(lock, "OWNER.json");
    if (!(await lstat(ownerFile)).isFile()) throw new Error("Guide console lock owner must be a regular file.");
    let owner: { version?: number; pid?: number; startedAt?: string };
    try {
      owner = JSON.parse(await readFile(ownerFile, "utf8")) as typeof owner;
    } catch {
      throw new Error("Guide console lock owner is not valid JSON.");
    }
    if (owner.version !== 1 || !Number.isInteger(owner.pid) || owner.pid! < 1 || typeof owner.startedAt !== "string") {
      throw new Error("Guide console lock owner is invalid.");
    }
    if (processIsAlive(owner.pid!)) throw new Error("A persistent Guide console is already open for this project.");
    await rm(lock, { recursive: true, force: true });
    try {
      await mkdir(lock);
    } catch (recoveryError) {
      if ((recoveryError as NodeJS.ErrnoException).code === "EEXIST") {
        throw new Error("Another Guide console opened during stale-lock recovery.");
      }
      throw recoveryError;
    }
  }
  await writeJsonAtomic(path.join(lock, "OWNER.json"), { version: 1, pid: process.pid, startedAt: now() });
  return async () => rm(lock, { recursive: true, force: true });
}

export function guideTurnArguments(input: {
  cli: string;
  codex: string;
  prompt: string;
  threadId: string | null;
  model: string | null;
  effort: string | null;
  guideWritePaths?: string[];
  toolkitVerificationPaths?: string[];
}): string[] {
  const model = validateAssignment(input.model, "Guide model");
  const effort = validateAssignment(input.effort, "Guide effort");
  // `--color` belongs to `codex exec`, not its `resume` subcommand. Keep it
  // before `resume` so a persisted Guide context works against the real CLI.
  const base = ["--ask-for-approval", "never", "exec", "--color", "never"];
  const common = [
    "--ignore-user-config",
    "--ignore-rules",
    "--json",
    ...(model ? ["--model", model] : []),
    ...(effort ? ["-c", `model_reasoning_effort=${JSON.stringify(effort)}`] : []),
    ...codexGuidePermissionArgs(
      input.cli,
      input.codex,
      relayNodeToolchainReadRoots(),
      input.guideWritePaths,
      input.toolkitVerificationPaths,
    ),
  ];
  return input.threadId
    ? [...base, "resume", ...common, input.threadId, input.prompt]
    : [...base, ...common, input.prompt];
}

function threadIdFromEvents(output: string): string | null {
  for (const line of output.split(/\r?\n/)) {
    if (!line.trim()) continue;
    try {
      const event = JSON.parse(line) as { type?: string; thread_id?: string };
      if (event.type === "thread.started" && typeof event.thread_id === "string" && UUID.test(event.thread_id)) return event.thread_id;
    } catch {
      // The raw event remains preserved in the project-local runtime area.
    }
  }
  return null;
}

export function sanitizeGuideTerminalText(value: string): string {
  return sanitizeTerminalText(value);
}

function renderGuideEvent(line: string): string | null {
  try {
    const event = JSON.parse(line) as { type?: string; thread_id?: string; item?: { type?: string; text?: string; command?: string } };
    if (event.type === "thread.started") return UUID.test(event.thread_id ?? "")
      ? `GUIDE CONTEXT — ${event.thread_id}`
      : "GUIDE CONTEXT — invalid identity refused";
    if (event.type === "turn.completed") return "GUIDE TURN COMPLETE";
    if (event.type === "item.completed" && event.item?.type === "agent_message" && event.item.text?.trim()) {
      return `GUIDE UPDATE\n${sanitizeGuideTerminalText(event.item.text.trim())}`;
    }
    if (event.type === "item.started" && event.item?.type === "command_execution") {
      return "GUIDE CHECK — inspecting disk-backed project state";
    }
  } catch {
    return null;
  }
  return null;
}

export async function guideConsoleWritePaths(root: string): Promise<string[]> {
  const config = await readProjectConfig(root);
  if (!(await hasGuideManifest(root, config))) {
    throw new Error("The project has no Guide manifest. Create its disk-backed Guide continuity before opening the persistent Guide.");
  }
  const [manifest, workSet] = await Promise.all([
    loadGuideManifest(root, config),
    loadGuideWorkSet(root, config),
  ]);
  const guideDirectory = path.relative(root, guideRoot(root, config)).split(path.sep).join("/");
  const sessionDirectory = path.normalize(config.sessionsDir).split(path.sep).join("/");
  const writable = [...new Set([
    guideDirectory,
    ...manifest.continuityFiles,
    ...workSet.claims.map((claim) => claim.path),
  ])].sort();
  for (const relative of writable) {
    const normalized = path.normalize(relative).split(path.sep).join("/");
    if (normalized === sessionDirectory || normalized.startsWith(`${sessionDirectory}/`)) {
      throw new Error(`Guide write path overlaps configured session evidence and is refused: ${relative}.`);
    }
  }
  return writable;
}

async function guideTurn(root: string, state: GuideConsoleState, prompt: string): Promise<GuideConsoleState> {
  const codex = resolveRelayCodexExecutable();
  const cli = fileURLToPath(new URL("./cli.ts", import.meta.url));
  const turn = state.turns + 1;
  const args = guideTurnArguments({
    cli,
    codex,
    prompt,
    threadId: state.threadId,
    model: state.model,
    effort: state.effort,
    guideWritePaths: await guideConsoleWritePaths(root),
    toolkitVerificationPaths: await verifiedToolkitReadPaths(),
  });
  const working = validateGuideConsoleState({ ...state, status: "WORKING", turns: turn, lastError: null, updatedAt: now() });
  await saveGuideConsoleState(root, working);
  const child = spawn(codex, args, {
    cwd: root,
    env: relayCodexEnvironment(process.env),
    stdio: ["ignore", "pipe", "pipe"],
  });
  let stdout = "";
  let stderr = "";
  const lines = createInterface({ input: child.stdout });
  lines.on("line", (line) => {
    stdout += `${line}\n`;
    const rendered = renderGuideEvent(line);
    if (rendered) console.log(terminalBlock(rendered));
  });
  child.stderr.on("data", (chunk) => { stderr += String(chunk); });
  let exit: number;
  try {
    exit = await new Promise<number>((resolve, reject) => {
      child.once("error", reject);
      child.once("close", (code) => resolve(code ?? -1));
    });
  } catch (error) {
    const failed = validateGuideConsoleState({
      ...working,
      status: "FAILED",
      lastError: `Guide turn ${turn} could not start: ${error instanceof Error ? error.message : String(error)}`,
      updatedAt: now(),
    });
    await saveGuideConsoleState(root, failed);
    throw new Error(failed.lastError!);
  }
  const area = await guideConsoleArea(root);
  const prefix = `GUIDE-${String(turn).padStart(3, "0")}`;
  await Promise.all([
    writeTextAtomic(path.join(area, `${prefix}-EVENTS.jsonl`), stdout),
    writeTextAtomic(path.join(area, `${prefix}-STDERR.txt`), stderr),
  ]);
  const observed = threadIdFromEvents(stdout);
  const threadId = state.threadId ?? observed;
  if (observed && state.threadId && observed !== state.threadId) {
    const failed = validateGuideConsoleState({ ...working, status: "FAILED", lastError: `Guide context changed from ${state.threadId} to ${observed}.`, updatedAt: now() });
    await saveGuideConsoleState(root, failed);
    throw new Error(failed.lastError!);
  }
  if (!threadId) {
    const failed = validateGuideConsoleState({ ...working, status: "FAILED", lastError: "The Guide turn emitted no persistent context identifier.", updatedAt: now() });
    await saveGuideConsoleState(root, failed);
    throw new Error(failed.lastError!);
  }
  if (exit !== 0) {
    const failed = validateGuideConsoleState({ ...working, threadId, status: "FAILED", lastError: `Guide turn ${turn} exited ${exit}.`, updatedAt: now() });
    await saveGuideConsoleState(root, failed);
    throw new Error(`${failed.lastError} See ${prefix}-STDERR.txt.`);
  }
  const ready = validateGuideConsoleState({ ...working, threadId, status: "READY", lastError: null, updatedAt: now() });
  await saveGuideConsoleState(root, ready);
  return ready;
}

export async function performGuideRecoveryChoice(
  root: string,
  choice: string,
  dependencies: GuideRecoveryDependencies = defaultRecoveryDependencies,
): Promise<{ handled: boolean; message?: string; requests?: GhosttyWindowRequest[] }> {
  const recoverable: Array<NonNullable<Awaited<ReturnType<typeof currentGuideRuntime>>>> = [];
  for (const runtime of await listGuideRuntimes(root)) {
    if (runtime.run.status === "COMPLETE" || runtime.run.status === "HALTED") continue;
    if (await partialRecoveryRoles(runtime)) recoverable.push(runtime);
  }
  if (recoverable.length === 0) return { handled: false };
  if (recoverable.length > 1 && (choice === "1" || choice === "2")) {
    return {
      handled: true,
      message: `Koda found ${recoverable.length} recoverable sessions (${recoverable.map(({ run }) => run.launchId).join(", ")}). A bare number is ambiguous, so nothing changed. Ask Guide which exact session to recover.`,
    };
  }
  const runtime = recoverable[0]!;
  if (choice === "2") return { handled: true, message: "Nothing changed. The saved session remains safely paused." };
  if (choice !== "1") return { handled: false };
  let requests: GhosttyWindowRequest[];
  try {
    const toolkit = await verifyToolkitIntegrity();
    requests = await dependencies.recoverGhostty(root, runtime, toolkit);
  } catch (error) {
    const reason = sanitizeGuideTerminalText(error instanceof Error ? error.message : String(error));
    return {
      handled: true,
      message: `RECOVERY PAUSED SAFELY — ${reason}\nNothing was acknowledged or advanced. This Guide remains open. Type 1 to retry after the cause is corrected, or 2 to leave the session paused.`,
    };
  }
  return {
    handled: true,
    message: requests.length === 1
      ? `Recovery requested for the missing ${requests[0]!.role}. Nothing was acknowledged or advanced.`
      : "Recovery requested in Reviewer-first order. Nothing was acknowledged or advanced.",
    requests,
  };
}

function initialPrompt(cli: string): string {
  return [
    "Act as this project's persistent Guide.",
    "Read the repository guidance and explicitly use koda-c-session-prompt.",
    `Reconstruct truth from disk and run ${JSON.stringify(process.execPath)} ${JSON.stringify(cli)} guide status.`,
    "Explain the exact current project/session state in ordinary language, preserve every numbered owner choice, and then wait.",
    "Do not ask the owner to relay a command, path, hash, receipt, commit, or test result.",
    "Do not launch, recover, confirm, cancel, or mutate a frozen session without the owner's explicit choice in this Guide console.",
  ].join(" ");
}

export async function runGuideConsole(options: GuideConsoleOptions = {}): Promise<void> {
  const root = await findProjectRoot(process.cwd());
  await readProjectConfig(root);
  await verifyToolkitIntegrity();
  const release = await acquireGuideConsole(root);
  const ownerInput = createInterface({ input: process.stdin, output: process.stdout });
  try {
    const requestedModel = validateAssignment(options.model, "Guide model");
    const requestedEffort = validateAssignment(options.effort, "Guide effort");
    const existing = await readGuideConsoleState(root);
    if (existing?.model && requestedModel && existing.model !== requestedModel) {
      throw new Error(`The persistent Guide is already bound to model ${existing.model}; refusing ${requestedModel}.`);
    }
    if (existing?.effort && requestedEffort && existing.effort !== requestedEffort) {
      throw new Error(`The persistent Guide is already bound to effort ${existing.effort}; refusing ${requestedEffort}.`);
    }
    if (existing?.status === "WORKING" && !existing.threadId) {
      throw new Error("The prior Guide turn stopped before a context identifier was saved; Koda will not invent a replacement.");
    }
    let state = existing
      ? validateGuideConsoleState({ ...existing, status: "READY", lastError: existing.status === "WORKING" ? "The prior turn stopped mid-flight; the same context must reconcile it." : existing.lastError, updatedAt: now() })
      : validateGuideConsoleState({
        version: 1,
        status: "READY",
        model: requestedModel,
        effort: requestedEffort,
        threadId: null,
        turns: 0,
        updatedAt: now(),
        lastError: null,
      });
    await saveGuideConsoleState(root, state);
    console.log(terminalPanel("KODA-C SECURE GUIDE", [
      "Owner input: OPEN — project conversation belongs here.",
      "Boundary: project data only; no network, ambient rules, user config, or approval escape.",
      "",
      "Type normally to talk. Type q to close only this Guide console.",
    ]));
    const cli = fileURLToPath(new URL("./cli.ts", import.meta.url));
    state = await guideTurn(root, state, state.threadId
      ? `${initialPrompt(cli)} This is a resumed Guide context; reconcile any saved interruption before giving advice.`
      : initialPrompt(cli));
    while (true) {
      const input = (await ownerInput.question("guide> ")).trim();
      if (input.toLowerCase() === "q") {
        console.log(terminalPanel("GUIDE CLOSED SAFELY", ["Project and session evidence remain on disk."]));
        break;
      }
      if (!input) {
        console.log(terminalPanel("NOTHING CHANGED", ["Type a message, a displayed number, or q to close the Guide console."]));
        continue;
      }
      let action: Awaited<ReturnType<typeof performGuideRecoveryChoice>>;
      try {
        action = await performGuideRecoveryChoice(root, input);
      } catch (error) {
        console.log(terminalPanel("GUIDE STATE CHECK REFUSED", [
          sanitizeGuideTerminalText(error instanceof Error ? error.message : String(error)),
          "",
          "Nothing changed. Correct the named disk evidence or type q to close only this Guide console.",
        ]));
        continue;
      }
      if (action.handled) {
        console.log(terminalBlock(action.message ?? "Guide action completed."));
        if (action.requests) {
          state = await guideTurn(root, state, "The owner selected the displayed recovery choice and Koda's trusted controller performed it. Run Koda Guide status, explain the exact observed result, and wait. Do not infer success from a window request alone.");
        }
        continue;
      }
      state = await guideTurn(root, state, `Owner message in Guide:\n\n${input}\n\nRespond at project scope. Reconstruct any material state from disk; never inject an active phase.`);
    }
  } finally {
    ownerInput.close();
    await release();
  }
}
