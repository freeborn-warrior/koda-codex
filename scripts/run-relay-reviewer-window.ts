#!/usr/bin/env node

import { createHash } from "node:crypto";
import { spawn, spawnSync } from "node:child_process";
import { lstat, mkdir, readFile, readdir, realpath } from "node:fs/promises";
import path from "node:path";
import { createInterface } from "node:readline";
import { createInterface as createPrompt } from "node:readline/promises";
import { fileURLToPath } from "node:url";

import { pathExists, readProjectConfig } from "../src/config.ts";
import { verifiedCodexRolePermissionArgs } from "../src/codex-role-permissions.ts";
import { createWaitingDirection, WAITING_DIRECTION_PREFIX } from "../src/direction.ts";
import { acquireGitOperationLock } from "../src/git-operation-lock.ts";
import { pushCommandArgs } from "../src/git.ts";
import { evaluateSessionHalt, prepareHaltArtifact } from "../src/halt.ts";
import { relayOwnerName } from "../src/owner.ts";
import { currentPhase, displayPath, loadSession, writeTextAtomic } from "../src/project.ts";
import { parseReview } from "../src/receipt.ts";
import {
  relayCodexEnvironment,
  relayGitToolchainReadRoots,
  relayNodeToolchainReadRoots,
  resolveRelayCodexExecutable,
  resolveRelayGitExecutable,
} from "../src/relay-environment.ts";
import { stagedProjectPaths } from "../src/workset.ts";
import { sanitizeTerminalText, TERMINAL_DIVIDER, terminalBlock, terminalPanel } from "../src/terminal-ui.ts";
import { formatRelayCommand, resolveRelayRunPaths } from "./relay-run-location.ts";
import {
  acquireReviewerWindow,
  readReviewerJob,
  readReviewerWindowState,
  redactRelayOutput,
  renderCodexEvent,
  reviewerWindowState,
  writeReviewerJob,
  writeReviewerWindowState,
  type ReviewerJob,
  type ReviewerWindowState,
} from "./relay-window-protocol.ts";

type RunRecord = {
  version: number;
  owner?: string;
  mode?: "fixture-copy" | "guide-project";
  status: string;
  project: string;
  runtime: string;
  cli: string;
  sessionId?: string;
  reviewer: { model: string; effort: string; threadId: string | null; turns: number };
};

class OwnerPaused extends Error {}
class ReviewerTurnInterrupted extends Error {}

type RelaySignal = "SIGINT" | "SIGTERM";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const runsRoot = await realpath(process.env.KODA_RELAY_RUNS_ROOT
  ? path.resolve(process.env.KODA_RELAY_RUNS_ROOT)
  : path.join(root, "docs", "relay-runs"));
const recoverStaleLock = process.argv.includes("--recover-stale-lock");
const requested = process.argv.slice(2).find((argument) => argument !== "--recover-stale-lock");
let stopping = false;
let stopSignal: RelaySignal | null = null;
let activeModelChild: ReturnType<typeof spawn> | null = null;
let testDiscussionConsumed = false;
let boundOwnerName: string | null = null;

function reviewCode(receipt: string): string {
  return createHash("sha256").update(receipt).digest("hex").slice(0, 8).toUpperCase();
}

function ownerVisibleReview(content: string): string {
  return sanitizeTerminalText(content
    .split(/\r?\n/)
    .filter((line) => !line.startsWith("<!-- KODA_REVIEW "))
    .join("\n")
    .trim());
}

function beginScreen(title: string): void {
  console.log(`\n${TERMINAL_DIVIDER}`);
  console.log(title);
  console.log(TERMINAL_DIVIDER);
}

function endScreen(): void {
  console.log(TERMINAL_DIVIDER);
}

function requestStop(signal: RelaySignal): void {
  const repeated = stopping;
  stopping = true;
  stopSignal ??= signal;
  if (activeModelChild) {
    const child = activeModelChild;
    child.kill(repeated ? "SIGKILL" : "SIGTERM");
    if (!repeated) {
      const force = setTimeout(() => {
        if (activeModelChild === child) child.kill("SIGKILL");
      }, 2_000);
      force.unref();
    }
  }
}

process.on("SIGINT", () => { requestStop("SIGINT"); });
process.on("SIGTERM", () => { requestStop("SIGTERM"); });

function refuse(message: string): never {
  console.error(terminalPanel("REVIEWER WINDOW REFUSED", [
    message,
    "Nothing changed on disk.",
  ]));
  process.exit(1);
}

async function discoverRun(): Promise<string> {
  const candidates: string[] = [];
  for (const entry of await readdir(runsRoot, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const candidate = path.join(runsRoot, entry.name);
    const record = await readFile(path.join(candidate, "RUN.json"), "utf8")
      .then((content) => JSON.parse(content) as RunRecord)
      .catch(() => null);
    if (
      record &&
      (record.version === 1 || record.version === 2) &&
      record.status !== "COMPLETE" &&
      record.status !== "HALTED"
    ) candidates.push(candidate);
  }
  if (candidates.length === 0) refuse("No prepared or active relay run exists. Start Window A first.");
  if (candidates.length > 1) refuse("More than one relay run is active. Koda-C will not guess which session you mean.");
  return candidates[0];
}

const runRoot = requested ? await realpath(path.resolve(root, requested)) : await discoverRun();
const runPath = path.join(runRoot, "RUN.json");
if (!(await lstat(runPath)).isFile()) refuse("RUN.json must be a regular file.");

async function readRun(): Promise<RunRecord> {
  const value = JSON.parse(await readFile(runPath, "utf8")) as RunRecord;
  if (
    (value.version !== 1 && value.version !== 2) ||
    typeof value.status !== "string" ||
    typeof value.project !== "string" ||
    typeof value.runtime !== "string" ||
    typeof value.cli !== "string" ||
    !(value.sessionId === undefined || typeof value.sessionId === "string") ||
    !value.reviewer ||
    typeof value.reviewer.model !== "string" ||
    typeof value.reviewer.effort !== "string" ||
    !(value.reviewer.threadId === null || typeof value.reviewer.threadId === "string") ||
    !Number.isInteger(value.reviewer.turns) || value.reviewer.turns < 0
  ) refuse("RUN.json has invalid reviewer-window fields.");
  let ownerName: string;
  try {
    ownerName = relayOwnerName(value);
  } catch (error) {
    refuse(error instanceof Error ? error.message : String(error));
  }
  if (boundOwnerName !== null && ownerName !== boundOwnerName) {
    refuse("RUN.json owner identity changed after the Reviewer window opened.");
  }
  return value;
}

const initialRun = await readRun();
const ownerName = relayOwnerName(initialRun);
boundOwnerName = ownerName;
const resolved = await resolveRelayRunPaths({ packageRoot: root, configuredRunsRoot: runsRoot, runRoot, run: {
  mode: initialRun.mode,
  project: initialRun.project,
  runtime: initialRun.runtime,
  cli: initialRun.cli,
} }).catch((error) => refuse(error instanceof Error ? error.message : String(error)));
const { project, runtime, cli } = resolved;
const reviewerResumeCommand = resolved.mode === "guide-project"
  ? formatRelayCommand(path.join(root, "scripts", "run-relay-reviewer-window.ts"), runRoot)
  : "npm run relay:reviewer";

async function activeSession() {
  const run = await readRun();
  if (!run.sessionId) throw new Error("The relay has not bound a session ID yet.");
  const config = await readProjectConfig(project);
  return loadSession(project, config, run.sessionId);
}

const releaseLock = await acquireReviewerWindow(runRoot, { recoverStale: recoverStaleLock })
  .catch((error) => {
    const message = error instanceof Error ? error.message : String(error);
    if (resolved.mode === "guide-project") {
      refuse(message.includes("already owns this run")
        ? "The Reviewer is already open for this session. Return to that window; no duplicate was created."
        : "The Reviewer could not safely open. Return to Guide and say: Recover this session.");
    }
    refuse(message);
  });
let state = await readReviewerWindowState(runRoot) ?? reviewerWindowState({
  status: initialRun.sessionId ? "READY" : "STARTING",
  sessionId: initialRun.sessionId ?? null,
  model: initialRun.reviewer.model,
  effort: initialRun.reviewer.effort,
  threadId: initialRun.reviewer.threadId,
  turns: initialRun.reviewer.turns,
  currentJobId: null,
  lastError: null,
});
if (state.model !== initialRun.reviewer.model || state.effort !== initialRun.reviewer.effort) {
  await releaseLock();
  refuse("Reviewer model or effort changed after this session was prepared.");
}
if (state.sessionId && initialRun.sessionId && state.sessionId !== initialRun.sessionId) {
  await releaseLock();
  refuse("Reviewer state is bound to a different session than RUN.json.");
}
if (state.sessionId && !initialRun.sessionId) {
  await releaseLock();
  refuse("Reviewer state claims a session before RUN.json binds one.");
}
state = reviewerWindowState({
  ...state,
  status: !initialRun.sessionId && state.status === "READY" ? "STARTING" : state.status,
  sessionId: state.sessionId ?? initialRun.sessionId ?? null,
});
await writeReviewerWindowState(runRoot, state);

const ownerConversationQueue: string[] = [];
let ownerPromptWaiter: ((line: string) => void) | null = null;
const ownerConsole = process.stdin.isTTY
  ? createInterface({ input: process.stdin, output: process.stdout, terminal: true })
  : null;
ownerConsole?.on("line", (line) => {
  if (ownerPromptWaiter) {
    const resolve = ownerPromptWaiter;
    ownerPromptWaiter = null;
    resolve(line);
  } else {
    ownerConversationQueue.push(line);
  }
});

function threadIdFromEvents(output: string): string | null {
  for (const line of output.split(/\r?\n/)) {
    if (!line.trim()) continue;
    try {
      const event = JSON.parse(line) as { type?: string; thread_id?: string };
      if (event.type === "thread.started" && typeof event.thread_id === "string") return event.thread_id;
    } catch {
      // Raw output is preserved below; diagnostics never become inferred state.
    }
  }
  return null;
}

async function modelTurn(
  purpose: string,
  prompt: string,
  ownerMessage: string | null = null,
  presentation: "work" | "conversation" = "work",
  requestedStage?: string,
): Promise<string> {
  const turn = state.turns + 1;
  state = reviewerWindowState({ ...state, status: "WORKING", turns: turn, lastError: null });
  await writeReviewerWindowState(runRoot, state);

  const base = ["--ask-for-approval", "never", "exec"];
  const activeRun = await readRun();
  const codexExecutable = resolveRelayCodexExecutable();
  const gitExecutable = resolveRelayGitExecutable();
  const xdgConfigHome = path.join(runtime, ".xdg");
  await mkdir(xdgConfigHome, { recursive: true });
  const common = [
    "--ignore-user-config",
    "--ignore-rules",
    "--json",
    "-m", state.model,
    "-c", `model_reasoning_effort=\"${state.effort}\"`,
    ...await verifiedCodexRolePermissionArgs(
      activeRun.cli,
      codexExecutable,
      [...relayNodeToolchainReadRoots(), ...relayGitToolchainReadRoots(gitExecutable)],
    ),
  ];
  const args = state.threadId
    ? [...base, "resume", ...common, state.threadId, prompt]
    : [...base, ...common, "--color", "never", prompt];

  const current = await activeSession().catch(() => null);
  const stage = requestedStage ?? (current ? currentPhase(current.state)?.phase.name : undefined);
  console.log(presentation === "conversation"
    ? terminalPanel(`REVIEWER ${stage?.toUpperCase() ?? "SESSION"} — THINKING`)
    : terminalPanel(`REVIEWER ${turn} — ${purpose}`));
  const child = spawn(codexExecutable, args, {
    cwd: project,
    env: relayCodexEnvironment(process.env, activeRun.sessionId, gitExecutable, xdgConfigHome),
    stdio: ["ignore", "pipe", "pipe"],
  });
  activeModelChild = child;
  let stdout = "";
  let stderr = "";
  let lastAgentMessage = "";
  let completedChecks = 0;
  let failedChecks = 0;
  const lines = createInterface({ input: child.stdout });
  lines.on("line", (line) => {
    stdout += `${line}\n`;
    try {
      const event = JSON.parse(line) as { type?: string; item?: { type?: string; text?: string } };
      if (event.type === "item.completed" && event.item?.type === "agent_message" && typeof event.item.text === "string") {
        lastAgentMessage = event.item.text;
      }
    } catch {
      // The raw event remains saved; malformed diagnostics never become conversation state.
    }
    try {
      const event = JSON.parse(line) as { type?: string; item?: { type?: string; exit_code?: number } };
      if (event.type === "item.completed" && event.item?.type === "command_execution") {
        completedChecks += 1;
        if (event.item.exit_code !== 0) failedChecks += 1;
      }
    } catch {
      // The raw event remains saved; diagnostics never become inferred check state.
    }
    if (presentation === "work") {
      const rendered = renderCodexEvent(line, "REVIEWER", {
        stage,
        showSuccessfulChecks: false,
        showCommandText: false,
      });
      if (rendered) console.log(terminalBlock(rendered));
    }
  });
  child.stderr.on("data", (chunk) => { stderr += String(chunk); });
  const exit = await new Promise<number>((resolve, reject) => {
    child.once("error", reject);
    child.once("close", (code) => resolve(code ?? -1));
  }).finally(() => {
    if (activeModelChild === child) activeModelChild = null;
  });

  const prefix = `REVIEWER-WINDOW-${String(turn).padStart(2, "0")}`;
  await Promise.all([
    writeTextAtomic(path.join(runRoot, `${prefix}-EVENTS.jsonl`), stdout),
    writeTextAtomic(path.join(runRoot, `${prefix}-STDERR.txt`), stderr),
  ]);
  if (presentation === "work" && completedChecks > 0) {
    console.log(terminalBlock([
      `REVIEWER${stage ? ` ${stage.toUpperCase()}` : ""} CHECK — ${completedChecks - failedChecks} passed${failedChecks > 0 ? `, ${failedChecks} failed` : ""}`,
      `Detailed commands: ${prefix}-EVENTS.jsonl`,
    ].join("\n")));
  }
  const observed = threadIdFromEvents(stdout);
  if (!state.threadId && observed) state.threadId = observed;
  if (observed && observed !== state.threadId) throw new Error(`Reviewer context changed from ${state.threadId} to ${observed}.`);
  if (stopping) {
    const signal = stopSignal ?? "SIGTERM";
    state = reviewerWindowState({
      ...state,
      status: state.threadId ? "READY" : "FAILED",
      lastError: state.threadId
        ? `Reviewer turn ${turn} was interrupted by ${signal}; partial output is untrusted until this context reconciles it.`
        : `Reviewer turn ${turn} was interrupted by ${signal} before a persistent context identifier was observed.`,
      interruption: {
        version: 1,
        purpose,
        ownerMessage,
        jobId: state.currentJobId,
        turn,
        signal,
        interruptedAt: new Date().toISOString(),
        eventFile: `${prefix}-EVENTS.jsonl`,
        stderrFile: `${prefix}-STDERR.txt`,
        threadId: state.threadId,
      },
    });
    await writeReviewerWindowState(runRoot, state);
    if (!state.threadId) {
      throw new Error(`${state.lastError} Koda-C will not replace the reviewer context automatically.`);
    }
    throw new ReviewerTurnInterrupted(state.lastError ?? "Reviewer turn interrupted.");
  }
  if (!state.threadId) throw new Error("The reviewer turn emitted no persistent context identifier.");
  if (exit !== 0) throw new Error(`Reviewer turn ${turn} exited ${exit}. See ${prefix}-STDERR.txt.`);
  if (presentation === "conversation" && !lastAgentMessage.trim()) {
    throw new Error(`Reviewer conversation turn ${turn} emitted no final answer.`);
  }
  state = reviewerWindowState({ ...state, status: "READY", lastError: null });
  await writeReviewerWindowState(runRoot, state);
  if (presentation === "conversation" && lastAgentMessage.trim()) {
    console.log(terminalBlock(`REVIEWER ${stage?.toUpperCase() ?? "SESSION"} RESPONSE\n${sanitizeTerminalText(redactRelayOutput(lastAgentMessage).trim())}`));
  }
  return lastAgentMessage;
}

async function promptOwner(message: string): Promise<string> {
  if (ownerConsole) {
    if (ownerPromptWaiter) throw new Error("The reviewer console already has an owner prompt open.");
    process.stdout.write(message);
    return new Promise((resolve) => { ownerPromptWaiter = resolve; });
  }
  const terminal = createPrompt({ input: process.stdin, output: process.stdout });
  try {
    return await terminal.question(message);
  } finally {
    terminal.close();
  }
}

function withOwnerConsolePaused<T>(operation: () => T): T {
  ownerConsole?.pause();
  try {
    return operation();
  } finally {
    ownerConsole?.resume();
  }
}

async function expectedFile(job: ReviewerJob): Promise<string> {
  const candidate = path.resolve(project, job.expectedPath);
  if (!candidate.startsWith(`${project}${path.sep}`)) throw new Error("Reviewer job expected path escapes the project.");
  const resolved = await realpath(candidate);
  if (!resolved.startsWith(`${project}${path.sep}`) || !(await lstat(candidate)).isFile()) {
    throw new Error("Reviewer job output must be a regular file inside the project.");
  }
  return resolved;
}

async function ownerAcknowledge(job: ReviewerJob, review: string): Promise<void> {
  const before = await readFile(review, "utf8");
  const parsed = parseReview(before);
  if (!parsed.verdict || !parsed.receipt || !parsed.metadata) throw new Error("The reviewer did not leave a valid definitive review.");
  const progressSession = await activeSession();
  const active = currentPhase(progressSession.state);

  job.status = "AWAITING_OWNER";
  await writeReviewerJob(runRoot, job);
  state = reviewerWindowState({ ...state, status: "AWAITING_OWNER", currentJobId: job.id, lastError: null });
  await writeReviewerWindowState(runRoot, state);

  const testMode = Boolean(process.env.KODA_RELAY_RUNS_ROOT && process.env.KODA_RELAY_TEST_CONFIRM_READ === "1");
  let waitingDirectionPath: string | null = null;
  const beforeHash = createHash("sha256").update(before).digest("hex");
  const acknowledgementCode = reviewCode(parsed.receipt);
  const requireUnchangedReview = async () => {
    const current = await readFile(review, "utf8");
    if (createHash("sha256").update(current).digest("hex") !== beforeHash) {
      throw new Error("The review changed during owner reading or discussion. Nothing was acknowledged.");
    }
  };
  const openReview = async (): Promise<void> => {
    beginScreen(`COMPLETE REVIEW — ${job.phase.toUpperCase()} — ${parsed.verdict}`);
    process.stdout.write(`${ownerVisibleReview(before)}\n`);
    console.log("");
    console.log(`REVIEW CODE: ${acknowledgementCode}`);
    console.log("You will type this short code only if you choose to acknowledge the review.");
    endScreen();
    await requireUnchangedReview();
  };
  const haltSession = async (ownerDirectionInput: string) => {
    const ownerDirection = ownerDirectionInput.trim();
    if (!ownerDirection) throw new Error("A halt needs the owner's exact direction for the fresh Brief.");
    const session = await activeSession();
    const pushArgs = pushCommandArgs(project);
    if (!pushArgs) throw new Error("Configure a Git remote and named branch before halting this session.");
    const gitEnvironment = { ...process.env, GIT_OPTIONAL_LOCKS: "0" };
    const prepared = await prepareHaltArtifact(session.directory, session.state, ownerDirection);
    const relativeSession = displayPath(project, session.directory);
    const lease = await acquireGitOperationLock(project, session.id, "immutable halt exact-path commit and push", {
      stagedPaths: () => stagedProjectPaths(project),
      waitMs: 30_000,
    });
    try {
      if (stagedProjectPaths(project).length > 0) throw new Error("Halt refused because unrelated staged changes already exist.");
      const aheadBefore = spawnSync("git", ["rev-list", "--count", "@{u}..HEAD"], { cwd: project, encoding: "utf8", env: gitEnvironment });
      if (aheadBefore.status !== 0 || aheadBefore.stdout.trim() !== "0") {
        throw new Error("Halt refused because the current branch already has unpushed commits.");
      }
      const addResult = withOwnerConsolePaused(() => spawnSync("git", ["add", "--", relativeSession], { cwd: project, encoding: "utf8", env: gitEnvironment }));
      if (addResult.status !== 0) throw new Error(`Halt Git step failed: git add -- ${relativeSession}\n${addResult.stderr}`);
      const stagedPaths = stagedProjectPaths(project);
      if (stagedPaths.length === 0 || stagedPaths.some((file) => file !== relativeSession && !file.startsWith(`${relativeSession}/`))) {
        throw new Error("Halt refused because Git staging contains missing or unrelated paths.");
      }
      for (const args of [["commit", "-m", `halt session ${session.id}`], pushArgs]) {
        const result = withOwnerConsolePaused(() => spawnSync("git", args, { cwd: project, encoding: "utf8", env: gitEnvironment }));
        if (result.status !== 0) throw new Error(`Halt Git step failed: git ${args.join(" ")}\n${result.stderr}`);
      }
    } finally {
      await lease.release();
    }
    const halt = await evaluateSessionHalt(project, session.directory, session.state);
    if (!halt.halted) throw new Error(`Halt verification failed: ${halt.reasons.join("; ")}`);
    job.completion = "HALTED";
    console.log(terminalPanel(`SESSION HALTED — ${session.id}`, [
      `Disk evidence: ${displayPath(project, prepared)}`,
      `Halt ID: ${halt.metadata?.id}`,
      "The in-flight phase is void. Producer will stop; later work must begin through a fresh Brief.",
    ]));
  };
  const discuss = async (question: string) => {
    const response = await modelTurn(`explain ${job.phase} review`, [
      `Read ${path.join(project, ".agents", "skills", "koda-c-review", "SKILL.md")} completely and explicitly use koda-c-review in owner-explanation mode.`,
      `The active review is ${review}.`,
      `The owner's exact question is ${JSON.stringify(question)}.`,
      "Lead with a direct, natural answer. Do not narrate skill selection, file inspection, entry checks, or commands.",
      "Explain only from the review and evidence it cites. Do not edit any file, run Koda-C, approve, advance, or quote the receipt.",
      "If this introduces new product direction, follow the skill's exact WAIT FOR GATE marker. Direction must be recorded now but cannot enter the current phase contract.",
    ].join(" "), question, "conversation", job.phase);
    await requireUnchangedReview();
    state = reviewerWindowState({ ...state, status: "AWAITING_OWNER", currentJobId: job.id, lastError: null });
    await writeReviewerWindowState(runRoot, state);
    if (response.trimStart().startsWith(WAITING_DIRECTION_PREFIX)) {
      const session = await activeSession();
      const created = await createWaitingDirection({
        sessionDir: session.directory,
        state: session.state,
        source: "owner-via-reviewer",
        ownerStatement: question,
        classification: response,
      });
      waitingDirectionPath = displayPath(project, created.path);
      console.log(terminalPanel("DIRECTION RECORDED — WAITING FOR GATE", [
        `Disk evidence: ${waitingDirectionPath}`,
        "The reviewed artifact keeps its frozen contract.",
        "Producer receives this direction only after advancement.",
      ]));
    } else if (response.trimStart().startsWith("OWNER DIRECTION — DISK HANDOFF REQUIRED")) {
      throw new Error("Reviewer used the superseded DISK HANDOFF REQUIRED marker. Re-run the explanation under the wait-or-halt contract.");
    }
  };

  beginScreen(`REVIEW READY — ${job.phase.toUpperCase()} — ${parsed.verdict}`);
  if (active?.phase.name === job.phase) {
    console.log(`Phase ${active.index + 1} of ${progressSession.state.phases.length}`);
  }
  console.log("The Producer is waiting. Nothing has advanced.");
  console.log("The complete review appears next in this same window.");
  console.log(`Disk record: ${path.relative(project, review)}`);
  endScreen();
  await openReview();

  const configuredTestQuestion = testMode ? process.env.KODA_RELAY_TEST_DISCUSSION_QUESTION?.trim() : undefined;
  const testQuestion = configuredTestQuestion && (
    process.env.KODA_RELAY_TEST_DISCUSSION_ONCE !== "1" || !testDiscussionConsumed
  ) ? configuredTestQuestion : undefined;
  if (testQuestion) {
    testDiscussionConsumed = true;
    await discuss(testQuestion);
  }
  const testHaltDirection = testMode ? process.env.KODA_RELAY_TEST_HALT_DIRECTION?.trim() : undefined;
  if (testHaltDirection) {
    await haltSession(testHaltDirection);
    return;
  }
  let acknowledgementSelected = testMode;
  for (;;) {
    if (!testMode && !acknowledgementSelected) {
      const permitted = parsed.verdict === "APPROVE" || parsed.verdict === "APPROVE WITH COMMENTS";
      const followUp = parsed.verdict === "APPROVE WITH COMMENTS"
        ? " You will then preserve your comments."
        : parsed.verdict === "DISCUSS"
          ? " You will then record your product ruling."
          : "";
      beginScreen("WHAT WOULD YOU LIKE TO DO?");
      console.log("1. ACKNOWLEDGE");
      console.log(`   Type the 8-character REVIEW CODE.${followUp} ${permitted ? "Koda-C then rechecks every gate condition." : `${parsed.verdict} keeps the gate closed and returns the work.`}`);
      console.log("");
      console.log("2. DISCUSS");
      console.log("   Ask the Reviewer a question. Nothing advances.");
      console.log("");
      console.log("3. READ AGAIN");
      console.log("   Show the complete review again. Nothing advances.");
      console.log("");
      console.log("4. STOP SAFELY");
      console.log("   Close the windows and resume later.");
      console.log("");
      console.log("5. HALT PERMANENTLY");
      console.log("   End this attempt and require a fresh Brief.");
      console.log("");
      const choice = (await promptOwner("Choose 1, 2, 3, 4, or 5: ")).trim();
      endScreen();
      if (choice === "2") {
        const question = (await promptOwner("Type your question for the Reviewer, then press Return: ")).trim();
        if (!question) {
          console.log(terminalPanel("NOTHING CHANGED", ["No question was entered."]));
          continue;
        }
        await discuss(question);
        continue;
      }
      if (choice === "3") {
        await openReview();
        continue;
      }
      if (choice === "4") throw new OwnerPaused(`${ownerName} chose to stop for now; the review remains ready and unacknowledged.`);
      if (choice === "5") {
        beginScreen("PERMANENT HALT — FIRST CONFIRMATION");
        console.log("Halt ends this session attempt. No phase from it will count.");
        console.log("Later work must start from a fresh Brief.");
        console.log("");
        console.log("1. Continue toward a permanent halt.");
        console.log("");
        console.log("2. Go back — nothing changes.");
        console.log("");
        const haltChoice = (await promptOwner("Choose 1 or 2: ")).trim();
        endScreen();
        if (haltChoice !== "1") {
          console.log(terminalPanel("NOTHING CHANGED", ["Halt was not prepared."]));
          continue;
        }
        const ownerDirection = await promptOwner("Type the direction the fresh Brief must carry, or press Return to go back: ");
        if (!ownerDirection.trim()) {
          console.log(terminalPanel("NOTHING CHANGED", ["Halt was not prepared because no direction was entered."]));
          continue;
        }
        beginScreen("PERMANENT HALT — FINAL CONFIRMATION");
        console.log("1. Permanently halt this session attempt.");
        console.log("");
        console.log("2. Go back — nothing changes.");
        console.log("");
        const confirmation = (await promptOwner("Choose 1 or 2: ")).trim();
        endScreen();
        if (confirmation !== "1") {
          console.log(terminalPanel("NOTHING CHANGED", ["Halt was not confirmed."]));
          continue;
        }
        await haltSession(ownerDirection);
        return;
      }
      if (choice !== "1") {
        console.log(terminalPanel("NOTHING CHANGED", ["Choose one of the numbered options."]));
        continue;
      }
      acknowledgementSelected = true;
    }

    if (!testMode) {
      beginScreen("FINAL ACKNOWLEDGEMENT");
      console.log("Type the 8-character REVIEW CODE shown beneath the complete review.");
      console.log("Koda-C will translate that code to this review's exact receipt, then recheck the gate from disk.");
      console.log("Type 0 to go back. A wrong code changes nothing.");
      console.log("");
    }
    const testReceiptInput = testMode
      ? (process.env.KODA_RELAY_TEST_RECEIPT_INPUT_FILE
          ? await readFile(process.env.KODA_RELAY_TEST_RECEIPT_INPUT_FILE, "utf8")
          : process.env.KODA_RELAY_TEST_RECEIPT_INPUT ?? "")
      : "";
    const codeInput = testMode
      ? (testReceiptInput.trim() === parsed.receipt.trim() ? acknowledgementCode : testReceiptInput)
      : await promptOwner("Review code: ");
    if (!testMode) endScreen();
    if (!testMode && codeInput.trim() === "0") {
      acknowledgementSelected = false;
      continue;
    }
    if (codeInput.trim().toUpperCase() !== acknowledgementCode) {
      beginScreen("NOT ACKNOWLEDGED");
      console.log("That code does not match this review.");
      console.log("Nothing changed and the gate is still closed.");
      if (testMode) {
        endScreen();
        throw new OwnerPaused("The review code did not match; the review remains ready for another owner attempt.");
      }
      console.log("");
      console.log("1. Try entering the review code again.");
      console.log("");
      console.log("2. Return to the full review choices.");
      console.log("");
      console.log("3. Stop for now and preserve this decision point.");
      console.log("");
      const retryChoice = (await promptOwner("Choose 1, 2, or 3: ")).trim();
      endScreen();
      if (retryChoice === "1") continue;
      if (retryChoice === "2") {
        acknowledgementSelected = false;
        continue;
      }
      if (retryChoice === "3") throw new OwnerPaused(`${ownerName} chose to stop after an unmatched review code; the review remains ready and unacknowledged.`);
      console.log(terminalPanel("NOTHING CHANGED", ["Returning to the full review choices."]));
      acknowledgementSelected = false;
      continue;
    }

    const approvalArgs = [cli, "approve", job.phase, "--approver", ownerName, "--session", progressSession.id];
    const approvalInput = [parsed.receipt.trim()];
    if (parsed.verdict === "APPROVE WITH COMMENTS") {
      const comments = testMode
        ? process.env.KODA_RELAY_TEST_APPROVAL_COMMENTS ?? "Owner acknowledged the review comments."
        : (await promptOwner("Type the comments to preserve in the ledger, then press Return: ")).trim();
      if (!comments) {
        console.log(terminalPanel("NOT ACKNOWLEDGED", [
          "Comments are required for APPROVE WITH COMMENTS.",
          "Nothing changed.",
        ]));
        if (testMode) throw new OwnerPaused("Approval comments were empty; the review remains ready for another owner attempt.");
        continue;
      }
      approvalInput.push(comments);
    }
    if (parsed.verdict === "DISCUSS") {
      const ruling = testMode
        ? process.env.KODA_RELAY_TEST_OWNER_RULING ?? "Owner requests a fresh review after this discussion."
        : (await promptOwner("Type your product ruling for the ledger, then press Return: ")).trim();
      if (!ruling) {
        console.log(terminalPanel("NOT ACKNOWLEDGED", [
          "DISCUSS requires your product ruling.",
          "Nothing changed.",
        ]));
        if (testMode) throw new OwnerPaused("The owner ruling was empty; the review remains ready for another owner attempt.");
        continue;
      }
      approvalInput.push(ruling);
    }
    const approved = withOwnerConsolePaused(() => spawnSync(
      process.execPath,
      approvalArgs,
      {
        cwd: project,
        encoding: "utf8",
        input: `${approvalInput.join("\n")}\n`,
        env: { ...process.env, KODA_COMMAND: `${process.execPath} ${cli}`, KODA_SESSION_ID: progressSession.id },
      },
    ));
    if (approved.status !== 0) {
      throw new Error(`Koda-C refused owner acknowledgement after the exact receipt matched: ${(approved.stderr || approved.stdout || `exit ${approved.status ?? -1}`).trim()}`);
    }
    break;
  }
  job.completion = "ACKNOWLEDGED";
  console.log(terminalPanel(`REVIEWER HANDOVER — ${job.phase.toUpperCase()} — ${job.completion}`, [
    "ACKNOWLEDGED — Window A will now derive the route from disk.",
    `Disk evidence: ${waitingDirectionPath ?? path.relative(project, review)}`,
    "",
    "Control: returned to Window A; the gate, not this message, determines the next action.",
  ]));
}

async function completeConsultation(job: ReviewerJob, response: string): Promise<void> {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const content = await readFile(response, "utf8");
    if (!/^- Disposition: AWAITING OWNER$/m.test(content)) return;
    job.status = "AWAITING_OWNER";
    await writeReviewerJob(runRoot, job);
    state = reviewerWindowState({ ...state, status: "AWAITING_OWNER", currentJobId: job.id, lastError: null });
    await writeReviewerWindowState(runRoot, state);
    console.log(terminalPanel(`OWNER DECISION REQUIRED — ${job.phase.toUpperCase()}`, [content]));
    const ruling = (await promptOwner("Your answer to the reviewer: ")).trim();
    if (!ruling) throw new Error("An empty owner ruling cannot unblock the producer.");
    await modelTurn(`record owner ruling for ${job.phase}`, [
      `The owner replied verbatim: ${JSON.stringify(ruling)}.`,
      `Resume koda-c-review consultation mode for ${response}.`,
      "Record the owner's response verbatim, change the disposition to ANSWERED, preserve the request link and evidence, and state the consequence for the active phase.",
      "Do not create a formal review, verdict, receipt, approval, or advancement.",
    ].join(" "), null, "work", job.phase);
  }
  throw new Error("The consultation still awaits owner input after five reviewer handbacks.");
}

async function processJob(job: ReviewerJob): Promise<void> {
  if (job.status === "RUNNING") throw new Error("A prior reviewer process stopped mid-turn. The job is preserved; explicit recovery is required.");
  if (job.status === "FAILED") {
    if (job.error === "Owner acknowledgement exited 1." && job.completion === null) {
      console.log(terminalPanel("REVIEWER RECOVERY", [
        "The earlier acknowledgement attempt changed nothing.",
        `Reopening the same bound review for ${ownerName}.`,
      ]));
      job.status = "AWAITING_OWNER";
      job.error = null;
      await writeReviewerJob(runRoot, job);
      state = reviewerWindowState({ ...state, status: "AWAITING_OWNER", currentJobId: job.id, lastError: null });
      await writeReviewerWindowState(runRoot, state);
    } else {
      throw new Error(job.error ?? "The reviewer job previously failed.");
    }
  }

  if (job.status === "PENDING" && job.kind !== "acknowledge") {
    job.status = "RUNNING";
    await writeReviewerJob(runRoot, job);
    state = reviewerWindowState({ ...state, status: "WORKING", currentJobId: job.id, lastError: null });
    await writeReviewerWindowState(runRoot, state);
    const interrupted = state.interruption;
    if (interrupted && interrupted.jobId !== job.id) {
      throw new Error(`Reviewer interruption belongs to job ${interrupted.jobId ?? "none"}, not ${job.id}.`);
    }
    await modelTurn(
      interrupted ? `reconcile interrupted turn ${interrupted.turn}: ${job.purpose}` : job.purpose,
      interrupted ? [
        job.prompt,
        "The previous attempt was interrupted by the owner.",
        "Treat any expected output file as incomplete and untrusted; inspect and replace or complete it from the original evidence before handing it back.",
        "Resume this exact job in the same reviewer context. Do not approve, advance, or quote a receipt.",
      ].join(" ") : job.prompt,
      null,
      "work",
      job.phase,
    );
    if (interrupted) {
      state = reviewerWindowState({ ...state, status: "READY", lastError: null, interruption: null });
      await writeReviewerWindowState(runRoot, state);
    }
  }

  const output = await expectedFile(job);
  if (job.kind === "consultation") {
    await completeConsultation(job, output);
    job.completion = "CONSULTATION_ANSWERED";
    console.log(terminalPanel(`REVIEWER HANDOVER — ${job.phase.toUpperCase()} — CONSULTATION ANSWERED`, [
      `Disk response: ${path.relative(project, output)}`,
      "Control: returned to Producer; Producer may use only the recorded response.",
    ]));
  } else {
    await ownerAcknowledge(job, output);
  }

  job.status = "COMPLETE";
  job.error = null;
  await writeReviewerJob(runRoot, job);
  state = reviewerWindowState({ ...state, status: "READY", currentJobId: null, lastError: null });
  await writeReviewerWindowState(runRoot, state);
}

async function recordOwnerConversationResponse(question: string, response: string): Promise<void> {
  if (response.trimStart().startsWith(WAITING_DIRECTION_PREFIX)) {
    const session = await activeSession();
    const created = await createWaitingDirection({
      sessionDir: session.directory,
      state: session.state,
      source: "owner-via-reviewer",
      ownerStatement: question,
      classification: response,
    });
    console.log(terminalPanel("DIRECTION RECORDED — WAITING FOR GATE", [
      `Disk evidence: ${displayPath(project, created.path)}`,
      `Direction ID: ${created.metadata.id}`,
      "The active phase inputs remain frozen.",
      "Producer receives this only after the next successful gate.",
    ]));
  } else if (response.trimStart().startsWith("OWNER DIRECTION — ACTIVE SESSION TRANSFER REQUIRED")) {
    throw new Error("Reviewer used the superseded ACTIVE SESSION TRANSFER REQUIRED marker. Re-run the conversation under the wait-or-halt contract.");
  } else if (response.trimStart().startsWith("GUIDE CONVERSATION — PROJECT SCOPE")) {
    console.log(terminalPanel("GUIDE SCOPE", [
      "Continue this project-level thought in the Guide conversation.",
      "Nothing from this Reviewer conversation changed the active session.",
    ]));
  } else {
    console.log(terminalBlock("KODA NOTE\nThis conversation did not change the Producer's inputs."));
  }
}

async function holdOwnerConversation(question: string): Promise<void> {
  const session = await activeSession();
  const stage = currentPhase(session.state)?.phase.name;
  const response = await modelTurn("owner conversation while Producer works", ownerConversationPrompt(question), question, "conversation", stage);
  await recordOwnerConversationResponse(question, response);
}

function ownerConversationPrompt(question: string): string {
  return [
    `Read ${path.join(project, ".agents", "skills", "koda-c-review", "SKILL.md")} completely and explicitly use koda-c-review in owner-conversation mode.`,
    `The owner's exact message is ${JSON.stringify(question)}.`,
    "Answer at the owner's altitude from the active session files and cited evidence. Distinguish disk fact from inference.",
    "Lead with the answer and speak as an ongoing conversation partner. Do not narrate skill selection, entry checks, file inspection, or commands.",
    "Do not edit any file, create a review or handback, run Koda-C, approve, advance, quote a receipt, or claim the Producer received this conversation.",
    "Use the skill's exact boundary marker if the message is project-level Guide scope or actionable direction for the active session.",
  ].join(" ");
}

async function recoverInterruptedOwnerConversation(): Promise<void> {
  const interrupted = state.interruption;
  if (!interrupted || interrupted.jobId !== null) return;
  if (!interrupted.threadId || !state.threadId) {
    throw new Error("The interrupted reviewer conversation has no persistent context identifier; automatic context replacement is refused.");
  }
  if (!interrupted.ownerMessage) {
    throw new Error("The interrupted reviewer conversation has no bound owner message; Koda-C cannot reconstruct it safely.");
  }
  console.log(terminalPanel("REVIEWER RECOVERY", [
    `Resuming interrupted conversation turn ${interrupted.turn} in the same context.`,
  ]));
  const response = await modelTurn(
    `reconcile interrupted turn ${interrupted.turn}: ${interrupted.purpose}`,
    [
      ownerConversationPrompt(interrupted.ownerMessage),
      "The previous attempt was interrupted by the owner. Resume this exact owner conversation in the same reviewer context.",
      "Re-read current disk state before answering. Do not infer that any partial response or file handback completed.",
    ].join(" "),
    interrupted.ownerMessage,
    "conversation",
    currentPhase((await activeSession()).state)?.phase.name,
  );
  state = reviewerWindowState({ ...state, status: "READY", lastError: null, interruption: null });
  await writeReviewerWindowState(runRoot, state);
  await recordOwnerConversationResponse(interrupted.ownerMessage, response);
}

console.log(terminalPanel("KODA-C REVIEWER — STARTING SESSION", [
  `Reviewer: ${state.model} / ${state.effort}`,
  `Relay: ${path.basename(runRoot)}`,
  "",
  "Owner input: NOT OPEN YET",
  "Producer is creating and binding the session identity.",
  "Any line typed early is held safely until that binding exists.",
  "NO ACTION NEEDED — this window will announce when conversation is ready.",
]));

try {
  const recoveredConfiguredConversation = state.interruption?.jobId === null;
  let recoveredOwnerConversation = false;
  let boundSessionId: string | null = null;
  let announcedWaiting = false;
  let testIdleConversationConsumed = recoveredConfiguredConversation;
  while (!stopping) {
    const run = await readRun();
    if (run.status === "COMPLETE" || run.status === "HALTED") {
      console.log(run.status === "COMPLETE"
        ? terminalPanel("SESSION CLOSED", ["Reviewer window complete."])
        : terminalPanel("SESSION HALTED", ["Reviewer window complete. Return to Guide for a fresh Brief."]));
      break;
    }
    if (!run.sessionId) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      continue;
    }
    if (boundSessionId !== run.sessionId) {
      await activeSession();
      if (state.sessionId && state.sessionId !== run.sessionId) {
        throw new Error("Reviewer state changed to a different session during startup.");
      }
      state = reviewerWindowState({
        ...state,
        status: state.status === "STARTING" ? "READY" : state.status,
        sessionId: run.sessionId,
        lastError: state.status === "STARTING" ? null : state.lastError,
      });
      await writeReviewerWindowState(runRoot, state);
      boundSessionId = run.sessionId;
      console.log(terminalPanel("KODA-C REVIEWER — SESSION READY", [
        `Session: ${run.sessionId}`,
        "Owner input: OPEN — active-session conversation belongs here.",
        "This context remains the Reviewer for the complete session. Leave it open.",
        "",
        "You may type while Producer works. New direction is recorded now and waits for the next gate.",
      ]));
      if (ownerConsole) process.stdout.write("reviewer> ");
      announcedWaiting = true;
    }
    if (!recoveredOwnerConversation) {
      await recoverInterruptedOwnerConversation();
      recoveredOwnerConversation = true;
    }
    const job = await readReviewerJob(runRoot);
    if (!job || job.status === "COMPLETE") {
      const configuredTestQuestion = !testIdleConversationConsumed
        ? process.env.KODA_RELAY_TEST_IDLE_CONVERSATION?.trim()
        : undefined;
      const ownerQuestion = configuredTestQuestion || ownerConversationQueue.shift();
      if (ownerQuestion) {
        testIdleConversationConsumed = Boolean(configuredTestQuestion) || testIdleConversationConsumed;
        announcedWaiting = false;
        await holdOwnerConversation(ownerQuestion);
        if (process.env.KODA_RELAY_REVIEWER_ONCE === "1") break;
        console.log(terminalPanel("REVIEWER READY", ["Waiting for the next Producer handover."]));
        if (ownerConsole) process.stdout.write("reviewer> ");
        announcedWaiting = true;
        continue;
      }
      if (!announcedWaiting) {
        console.log(terminalPanel("REVIEWER READY", ["Waiting for the next Producer handover."]));
        if (ownerConsole) process.stdout.write("reviewer> ");
        announcedWaiting = true;
      }
      await new Promise((resolve) => setTimeout(resolve, 350));
      continue;
    }
    if (announcedWaiting && ownerConsole) process.stdout.write("\n");
    announcedWaiting = false;
    try {
      await processJob(job);
      if (process.env.KODA_RELAY_REVIEWER_ONCE === "1") break;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (error instanceof ReviewerTurnInterrupted) {
        job.status = "PENDING";
        job.error = message;
        job.completion = null;
        await writeReviewerJob(runRoot, job);
        state = reviewerWindowState({ ...state, status: "READY", currentJobId: job.id, lastError: message });
        await writeReviewerWindowState(runRoot, state);
        console.error(terminalPanel("REVIEWER INTERRUPTED SAFELY", [
          message,
          "The job returned to PENDING; its partial handback is untrusted.",
          "",
          resolved.mode === "guide-project"
            ? "Return to Guide and say: Recover this session. This Reviewer window may be closed."
            : `Resume the same reviewer context with: ${reviewerResumeCommand}`,
        ]));
        process.exitCode = 2;
        break;
      }
      if (error instanceof OwnerPaused) {
        job.status = "AWAITING_OWNER";
        await writeReviewerJob(runRoot, job);
        state = reviewerWindowState({ ...state, status: "AWAITING_OWNER", currentJobId: job.id, lastError: message });
        await writeReviewerWindowState(runRoot, state);
        console.error(terminalPanel("REVIEWER PAUSED SAFELY", [
          message,
          "",
          resolved.mode === "guide-project"
            ? "Return to Guide when you are ready and say: Recover this session. This Reviewer window may be closed."
            : `Resume with: ${reviewerResumeCommand}`,
        ]));
        process.exitCode = 2;
        break;
      }
      job.status = "FAILED";
      job.error = message;
      await writeReviewerJob(runRoot, job);
      state = reviewerWindowState({ ...state, status: "FAILED", currentJobId: job.id, lastError: message });
      await writeReviewerWindowState(runRoot, state);
      console.error(terminalPanel("REVIEWER PAUSED SAFELY", [
        message,
        `Evidence remains in ${path.join(runRoot, "REVIEWER-JOB.json")}`,
        "Nothing was acknowledged or advanced.",
      ]));
      process.exitCode = 1;
      break;
    }
  }
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  state = reviewerWindowState({
    ...state,
    status: error instanceof ReviewerTurnInterrupted ? "READY" : "FAILED",
    currentJobId: null,
    lastError: message,
  });
  await writeReviewerWindowState(runRoot, state);
  console.error(terminalPanel(
    error instanceof ReviewerTurnInterrupted ? "REVIEWER INTERRUPTED SAFELY" : "REVIEWER PAUSED SAFELY",
    [
      message,
      "",
      resolved.mode === "guide-project"
        ? "Return to Guide and say: Recover this session. This Reviewer window may be closed."
        : `Resume with: ${reviewerResumeCommand}`,
    ],
  ));
  process.exitCode = error instanceof ReviewerTurnInterrupted ? 2 : 1;
} finally {
  ownerConsole?.close();
  await releaseLock();
}

if (stopping) console.log(terminalPanel("REVIEWER WINDOW STOPPED", ["Disk state was preserved."]));
