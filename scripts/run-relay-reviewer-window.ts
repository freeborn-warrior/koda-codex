#!/usr/bin/env node

import { createHash } from "node:crypto";
import { spawn, spawnSync } from "node:child_process";
import { lstat, readFile, readdir, realpath, writeFile } from "node:fs/promises";
import path from "node:path";
import { createInterface } from "node:readline";
import { createInterface as createPrompt } from "node:readline/promises";
import { fileURLToPath } from "node:url";

import { pathExists, readProjectConfig } from "../src/config.ts";
import { createWaitingDirection, WAITING_DIRECTION_PREFIX } from "../src/direction.ts";
import { pushCommandArgs } from "../src/git.ts";
import { evaluateSessionHalt, prepareHaltArtifact } from "../src/halt.ts";
import { currentPhase, displayPath, loadLatestSession, writeTextAtomic } from "../src/project.ts";
import { parseReview } from "../src/receipt.ts";
import { formatRelayCommand, resolveRelayRunPaths } from "./relay-run-location.ts";
import {
  acquireReviewerWindow,
  readReviewerJob,
  readReviewerWindowState,
  renderCodexEvent,
  reviewerWindowState,
  writeReviewerJob,
  writeReviewerWindowState,
  type ReviewerJob,
  type ReviewerWindowState,
} from "./relay-window-protocol.ts";

type RunRecord = {
  version: number;
  mode?: "fixture-copy" | "guide-project";
  status: string;
  project: string;
  runtime: string;
  cli: string;
  reviewer: { model: string; effort: string; threadId: string | null; turns: number };
};

class OwnerPaused extends Error {}

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const runsRoot = await realpath(process.env.KODA_RELAY_RUNS_ROOT
  ? path.resolve(process.env.KODA_RELAY_RUNS_ROOT)
  : path.join(root, "docs", "relay-runs"));
const recoverStaleLock = process.argv.includes("--recover-stale-lock");
const requested = process.argv.slice(2).find((argument) => argument !== "--recover-stale-lock");
let stopping = false;
let testDiscussionConsumed = false;
process.once("SIGINT", () => { stopping = true; });
process.once("SIGTERM", () => { stopping = true; });

function refuse(message: string): never {
  console.error(`REVIEWER WINDOW REFUSED — ${message}`);
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
      record.version === 1 &&
      record.status !== "COMPLETE" &&
      record.status !== "HALTED"
    ) candidates.push(candidate);
  }
  if (candidates.length === 0) refuse("No prepared or active relay run exists. Start Window A first.");
  if (candidates.length > 1) refuse("More than one relay run is active. Koda will not guess which session you mean.");
  return candidates[0];
}

const runRoot = requested ? await realpath(path.resolve(root, requested)) : await discoverRun();
const runPath = path.join(runRoot, "RUN.json");
if (!(await lstat(runPath)).isFile()) refuse("RUN.json must be a regular file.");

async function readRun(): Promise<RunRecord> {
  const value = JSON.parse(await readFile(runPath, "utf8")) as RunRecord;
  if (
    value.version !== 1 ||
    typeof value.status !== "string" ||
    typeof value.project !== "string" ||
    typeof value.runtime !== "string" ||
    typeof value.cli !== "string" ||
    !value.reviewer ||
    typeof value.reviewer.model !== "string" ||
    typeof value.reviewer.effort !== "string" ||
    !(value.reviewer.threadId === null || typeof value.reviewer.threadId === "string") ||
    !Number.isInteger(value.reviewer.turns) || value.reviewer.turns < 0
  ) refuse("RUN.json has invalid reviewer-window fields.");
  return value;
}

const initialRun = await readRun();
const resolved = await resolveRelayRunPaths({ packageRoot: root, configuredRunsRoot: runsRoot, runRoot, run: {
  mode: initialRun.mode,
  project: initialRun.project,
  runtime: initialRun.runtime,
  cli: initialRun.cli,
} }).catch((error) => refuse(error instanceof Error ? error.message : String(error)));
const { project, cli } = resolved;
const reviewerResumeCommand = resolved.mode === "guide-project"
  ? formatRelayCommand(path.join(root, "scripts", "run-relay-reviewer-window.ts"), runRoot)
  : "npm run relay:reviewer";

const releaseLock = await acquireReviewerWindow(runRoot, { recoverStale: recoverStaleLock })
  .catch((error) => refuse(error instanceof Error ? error.message : String(error)));
let state = await readReviewerWindowState(runRoot) ?? reviewerWindowState({
  status: "READY",
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

async function modelTurn(purpose: string, prompt: string): Promise<string> {
  const turn = state.turns + 1;
  state = reviewerWindowState({ ...state, status: "WORKING", turns: turn, lastError: null });
  await writeReviewerWindowState(runRoot, state);

  const base = ["--ask-for-approval", "never", "exec"];
  const common = [
    "--ignore-user-config",
    "--json",
    "-m", state.model,
    "-c", `model_reasoning_effort=\"${state.effort}\"`,
    "-c", 'sandbox_mode="workspace-write"',
  ];
  const args = state.threadId
    ? [...base, "resume", ...common, state.threadId, prompt]
    : [...base, ...common, "--color", "never", "-s", "workspace-write", prompt];

  console.log(`\nREVIEWER ${turn} — ${purpose}`);
  const child = spawn(process.env.KODA_CODEX_BIN ?? "codex", args, {
    cwd: project,
    env: process.env,
    stdio: ["ignore", "pipe", "pipe"],
  });
  let stdout = "";
  let stderr = "";
  let lastAgentMessage = "";
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
    const rendered = renderCodexEvent(line, "REVIEWER");
    if (rendered) console.log(rendered);
  });
  child.stderr.on("data", (chunk) => { stderr += String(chunk); });
  const exit = await new Promise<number>((resolve, reject) => {
    child.once("error", reject);
    child.once("close", (code) => resolve(code ?? -1));
  });

  const prefix = `REVIEWER-WINDOW-${String(turn).padStart(2, "0")}`;
  await Promise.all([
    writeTextAtomic(path.join(runRoot, `${prefix}-EVENTS.jsonl`), stdout),
    writeTextAtomic(path.join(runRoot, `${prefix}-STDERR.txt`), stderr),
  ]);
  const observed = threadIdFromEvents(stdout);
  if (!state.threadId && observed) state.threadId = observed;
  if (!state.threadId) throw new Error("The reviewer turn emitted no persistent context identifier.");
  if (observed && observed !== state.threadId) throw new Error(`Reviewer context changed from ${state.threadId} to ${observed}.`);
  if (exit !== 0) throw new Error(`Reviewer turn ${turn} exited ${exit}. See ${prefix}-STDERR.txt.`);
  state = reviewerWindowState({ ...state, status: "READY", lastError: null });
  await writeReviewerWindowState(runRoot, state);
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
  const progressConfig = await readProjectConfig(project);
  const progressSession = await loadLatestSession(project, progressConfig);
  const active = currentPhase(progressSession.state);

  job.status = "AWAITING_OWNER";
  await writeReviewerJob(runRoot, job);
  state = reviewerWindowState({ ...state, status: "AWAITING_OWNER", currentJobId: job.id, lastError: null });
  await writeReviewerWindowState(runRoot, state);

  const testMode = Boolean(process.env.KODA_RELAY_RUNS_ROOT && process.env.KODA_RELAY_TEST_CONFIRM_READ === "1");
  let waitingDirectionPath: string | null = null;
  const beforeHash = createHash("sha256").update(before).digest("hex");
  const requireUnchangedReview = async () => {
    const current = await readFile(review, "utf8");
    if (createHash("sha256").update(current).digest("hex") !== beforeHash) {
      throw new Error("The review changed during owner reading or discussion. Nothing was acknowledged.");
    }
  };
  const openReview = async () => {
    if (!testMode) await promptOwner("Press Return to open the complete review. ");
    const pager = withOwnerConsolePaused(() => spawnSync(
      process.env.KODA_RELAY_REVIEW_PAGER ?? "less",
      [review],
      { stdio: "inherit" },
    ));
    if (pager.status !== 0) throw new Error(`The review reader exited ${pager.status ?? -1}; nothing was acknowledged.`);
    await requireUnchangedReview();
  };
  const haltSession = async (ownerDirectionInput: string) => {
    const ownerDirection = ownerDirectionInput.trim();
    if (!ownerDirection) throw new Error("A halt needs the owner's exact direction for the fresh Brief.");
    const config = await readProjectConfig(project);
    const session = await loadLatestSession(project, config);
    const pushArgs = pushCommandArgs(project);
    if (!pushArgs) throw new Error("Configure a Git remote and named branch before halting this session.");
    const stagedBefore = spawnSync("git", ["diff", "--cached", "--name-only"], { cwd: project, encoding: "utf8" });
    if (stagedBefore.status !== 0 || stagedBefore.stdout.trim() !== "") {
      throw new Error("Halt refused because unrelated staged changes already exist.");
    }
    const aheadBefore = spawnSync("git", ["rev-list", "--count", "@{u}..HEAD"], { cwd: project, encoding: "utf8" });
    if (aheadBefore.status !== 0 || aheadBefore.stdout.trim() !== "0") {
      throw new Error("Halt refused because the current branch already has unpushed commits.");
    }
    const prepared = await prepareHaltArtifact(session.directory, session.state, ownerDirection);
    const relativeSession = displayPath(project, session.directory);
    const addResult = withOwnerConsolePaused(() => spawnSync("git", ["add", "--", relativeSession], { cwd: project, encoding: "utf8" }));
    if (addResult.status !== 0) throw new Error(`Halt Git step failed: git add -- ${relativeSession}\n${addResult.stderr}`);
    const stagedAfter = spawnSync("git", ["diff", "--cached", "--name-only"], { cwd: project, encoding: "utf8" });
    const stagedPaths = stagedAfter.stdout.trim().split(/\r?\n/).filter(Boolean);
    if (stagedAfter.status !== 0 || stagedPaths.length === 0 || stagedPaths.some((file) => file !== relativeSession && !file.startsWith(`${relativeSession}/`))) {
      throw new Error("Halt refused because Git staging contains missing or unrelated paths.");
    }
    for (const args of [["commit", "-m", `halt session ${session.id}`], pushArgs]) {
      const result = withOwnerConsolePaused(() => spawnSync("git", args, { cwd: project, encoding: "utf8" }));
      if (result.status !== 0) throw new Error(`Halt Git step failed: git ${args.join(" ")}\n${result.stderr}`);
    }
    const halt = await evaluateSessionHalt(project, session.directory, session.state);
    if (!halt.halted) throw new Error(`Halt verification failed: ${halt.reasons.join("; ")}`);
    job.completion = "HALTED";
    console.log(`\nSESSION HALTED — ${session.id}`);
    console.log(`Disk evidence: ${displayPath(project, prepared)}`);
    console.log(`Halt ID: ${halt.metadata?.id}`);
    console.log("The in-flight phase is void. Window A will stop; later work must begin through a fresh Brief.");
  };
  const discuss = async (question: string) => {
    const response = await modelTurn(`explain ${job.phase} review`, [
      `Read ${path.join(project, ".agents", "skills", "koda-c-review", "SKILL.md")} completely and explicitly use koda-c-review in owner-explanation mode.`,
      `The active review is ${review}.`,
      `The owner's exact question is ${JSON.stringify(question)}.`,
      "Explain only from the review and evidence it cites. Do not edit any file, run Koda, approve, advance, or quote the receipt.",
      "If this introduces new product direction, follow the skill's exact WAIT FOR GATE marker. Direction must be recorded now but cannot enter the current phase contract.",
    ].join(" "));
    await requireUnchangedReview();
    state = reviewerWindowState({ ...state, status: "AWAITING_OWNER", currentJobId: job.id, lastError: null });
    await writeReviewerWindowState(runRoot, state);
    if (response.trimStart().startsWith(WAITING_DIRECTION_PREFIX)) {
      const config = await readProjectConfig(project);
      const session = await loadLatestSession(project, config);
      const created = await createWaitingDirection({
        sessionDir: session.directory,
        state: session.state,
        source: "owner-via-reviewer",
        ownerStatement: question,
        classification: response,
      });
      waitingDirectionPath = displayPath(project, created.path);
      console.log("\nDIRECTION RECORDED — WAITING FOR GATE");
      console.log(`Disk evidence: ${waitingDirectionPath}`);
      console.log("The reviewed artifact keeps its frozen contract. Producer receives this direction only after advancement.");
    } else if (response.trimStart().startsWith("OWNER DIRECTION — DISK HANDOFF REQUIRED")) {
      throw new Error("Reviewer used the superseded DISK HANDOFF REQUIRED marker. Re-run the explanation under the wait-or-halt contract.");
    }
  };

  console.log(`\nREVIEW READY — ${job.phase.toUpperCase()} — ${parsed.verdict}`);
  if (active?.phase.name === job.phase) {
    console.log(`Phase: ${active.index + 1}/${progressSession.state.phases.length}`);
  }
  console.log("This is your decision point in Window B. The producer is waiting in Window A.");
  console.log(`Review: ${path.relative(project, review)}`);
  console.log(`Binding: artifact SHA-256 ${parsed.metadata.artifactSha256.slice(0, 12)}…; review ID ${parsed.metadata.id}`);
  console.log("Control: Kristian may read, discuss, reread, halt, stop, or acknowledge. Nothing has advanced.");
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
  if (!testMode) {
    for (;;) {
      const choice = (await promptOwner("Press Return to acknowledge, d to discuss, r to reread, h to halt, or p to stop the relay: ")).trim().toLowerCase();
      if (choice === "" || choice === "a") break;
      if (choice === "r") {
        await openReview();
        continue;
      }
      if (choice === "d") {
        const question = (await promptOwner("Your question for the reviewer: ")).trim();
        if (!question) {
          console.log("No question entered; the producer remains paused.");
          continue;
        }
        await discuss(question);
        continue;
      }
      if (choice === "h") {
        const ownerDirection = await promptOwner("Direction that the fresh Brief must carry: ");
        if (!ownerDirection.trim()) {
          console.log("No direction entered; halt was not prepared.");
          continue;
        }
        await haltSession(ownerDirection);
        return;
      }
      if (choice === "p") throw new OwnerPaused("Kristian paused at the reviewer decision point.");
      console.log("Choose Return, d, r, h, or p.");
    }
  }

  const testClipboard = process.env.KODA_RELAY_RUNS_ROOT && process.env.KODA_RELAY_TEST_CLIPBOARD_FILE;
  if (testClipboard) {
    await writeFile(testClipboard, parsed.receipt, "utf8");
  } else {
    const copied = spawnSync("pbcopy", [], { input: parsed.receipt, encoding: "utf8" });
    if (copied.status !== 0) throw new Error("macOS could not copy the receipt; nothing was acknowledged.");
  }
  console.log("The exact receipt is copied. Koda will ask for it here in Window B.");
  console.log("Press Command-V, then Return. For DISCUSS or APPROVE WITH COMMENTS, answer Koda's next question too.");
  const testReceiptInput = testMode
    ? (process.env.KODA_RELAY_TEST_RECEIPT_INPUT_FILE
        ? await readFile(process.env.KODA_RELAY_TEST_RECEIPT_INPUT_FILE, "utf8")
        : process.env.KODA_RELAY_TEST_RECEIPT_INPUT)
    : undefined;
  const approved = withOwnerConsolePaused(() => spawnSync(
    process.execPath,
    [cli, "approve", job.phase, "--approver", "Kristian"],
    {
      cwd: project,
      ...(testReceiptInput === undefined
        ? { stdio: "inherit" as const }
        : { input: `${testReceiptInput}\n`, encoding: "utf8" as const }),
      env: { ...process.env, KODA_COMMAND: `${process.execPath} ${cli}` },
    },
  ));
  if (approved.status !== 0) throw new Error(`Owner acknowledgement exited ${approved.status ?? -1}.`);
  job.completion = "ACKNOWLEDGED";
  console.log("ACKNOWLEDGED — Window A will now derive the route from disk.");
  console.log(`REVIEWER HANDOVER — ${job.phase.toUpperCase()} — ${job.completion}`);
  console.log(`Disk evidence: ${waitingDirectionPath ?? path.relative(project, review)}`);
  console.log("Control: returned to Window A; the gate, not this message, determines the next action.");
}

async function completeConsultation(job: ReviewerJob, response: string): Promise<void> {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const content = await readFile(response, "utf8");
    if (!/^- Disposition: AWAITING OWNER$/m.test(content)) return;
    job.status = "AWAITING_OWNER";
    await writeReviewerJob(runRoot, job);
    state = reviewerWindowState({ ...state, status: "AWAITING_OWNER", currentJobId: job.id, lastError: null });
    await writeReviewerWindowState(runRoot, state);
    console.log(`\nOWNER DECISION REQUIRED — ${job.phase.toUpperCase()}`);
    console.log(content);
    const ruling = (await promptOwner("Your answer to the reviewer: ")).trim();
    if (!ruling) throw new Error("An empty owner ruling cannot unblock the producer.");
    await modelTurn(`record owner ruling for ${job.phase}`, [
      `The owner replied verbatim: ${JSON.stringify(ruling)}.`,
      `Resume koda-c-review consultation mode for ${response}.`,
      "Record the owner's response verbatim, change the disposition to ANSWERED, preserve the request link and evidence, and state the consequence for the active phase.",
      "Do not create a formal review, verdict, receipt, approval, or advancement.",
    ].join(" "));
  }
  throw new Error("The consultation still awaits owner input after five reviewer handbacks.");
}

async function processJob(job: ReviewerJob): Promise<void> {
  if (job.status === "RUNNING") throw new Error("A prior reviewer process stopped mid-turn. The job is preserved; explicit recovery is required.");
  if (job.status === "FAILED") throw new Error(job.error ?? "The reviewer job previously failed.");

  if (job.status === "PENDING" && job.kind !== "acknowledge") {
    job.status = "RUNNING";
    await writeReviewerJob(runRoot, job);
    state = reviewerWindowState({ ...state, status: "WORKING", currentJobId: job.id, lastError: null });
    await writeReviewerWindowState(runRoot, state);
    await modelTurn(job.purpose, job.prompt);
  }

  const output = await expectedFile(job);
  if (job.kind === "consultation") {
    await completeConsultation(job, output);
    job.completion = "CONSULTATION_ANSWERED";
    console.log(`\nREVIEWER HANDOVER — ${job.phase.toUpperCase()} — CONSULTATION ANSWERED`);
    console.log(`Disk response: ${path.relative(project, output)}`);
    console.log("Control: returned to Window A; producer may use only the recorded response.");
  } else {
    await ownerAcknowledge(job, output);
  }

  job.status = "COMPLETE";
  job.error = null;
  await writeReviewerJob(runRoot, job);
  state = reviewerWindowState({ ...state, status: "READY", currentJobId: null, lastError: null });
  await writeReviewerWindowState(runRoot, state);
}

async function holdOwnerConversation(question: string): Promise<void> {
  const response = await modelTurn("owner conversation while Producer works", [
    `Read ${path.join(project, ".agents", "skills", "koda-c-review", "SKILL.md")} completely and explicitly use koda-c-review in owner-conversation mode.`,
    `The owner's exact message is ${JSON.stringify(question)}.`,
    "Answer at the owner's altitude from the active session files and cited evidence. Distinguish disk fact from inference.",
    "Do not edit any file, create a review or handback, run Koda, approve, advance, quote a receipt, or claim the Producer received this conversation.",
    "Use the skill's exact boundary marker if the message is project-level Guide scope or actionable direction for the active session.",
  ].join(" "));
  if (response.trimStart().startsWith(WAITING_DIRECTION_PREFIX)) {
    const config = await readProjectConfig(project);
    const session = await loadLatestSession(project, config);
    const created = await createWaitingDirection({
      sessionDir: session.directory,
      state: session.state,
      source: "owner-via-reviewer",
      ownerStatement: question,
      classification: response,
    });
    console.log("\nDIRECTION RECORDED — WAITING FOR GATE");
    console.log(`Disk evidence: ${displayPath(project, created.path)}`);
    console.log(`Direction ID: ${created.metadata.id}`);
    console.log("The active phase inputs remain frozen. Producer receives this only after the next successful gate.");
  } else if (response.trimStart().startsWith("OWNER DIRECTION — ACTIVE SESSION TRANSFER REQUIRED")) {
    throw new Error("Reviewer used the superseded ACTIVE SESSION TRANSFER REQUIRED marker. Re-run the conversation under the wait-or-halt contract.");
  } else if (response.trimStart().startsWith("GUIDE CONVERSATION — PROJECT SCOPE")) {
    console.log("\nGUIDE SCOPE — continue this project-level thought in the Guide conversation.");
    console.log("Nothing from this Reviewer conversation changed the active session.");
  } else {
    console.log("\nREVIEWER CONVERSATION COMPLETE — no producer handback was created.");
  }
}

console.log("KODA-C REVIEWER WINDOW");
console.log(`Reviewer: ${state.model} / ${state.effort}`);
console.log(`Relay: ${path.basename(runRoot)}`);
console.log("Owner input: OPEN — active-session conversation belongs here");
console.log("This context remains the Reviewer for the complete session. Leave it open.");
console.log("You may type an active-session question while Producer works; direction is recorded now and waits for the next gate.");
console.log("Waiting for the producer in Window A…");
if (ownerConsole) process.stdout.write("reviewer> ");

try {
  let announcedWaiting = true;
  let testIdleConversationConsumed = false;
  while (!stopping) {
    const run = await readRun();
    if (run.status === "COMPLETE" || run.status === "HALTED") {
      console.log(run.status === "COMPLETE"
        ? "\nSESSION CLOSED — reviewer window complete."
        : "\nSESSION HALTED — reviewer window complete; return to Guide for a fresh Brief.");
      break;
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
        console.log("\nWaiting for the next producer handover…");
        if (ownerConsole) process.stdout.write("reviewer> ");
        announcedWaiting = true;
        continue;
      }
      if (!announcedWaiting) {
        console.log("\nWaiting for the next producer handover…");
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
      if (error instanceof OwnerPaused) {
        job.status = "AWAITING_OWNER";
        await writeReviewerJob(runRoot, job);
        state = reviewerWindowState({ ...state, status: "AWAITING_OWNER", currentJobId: job.id, lastError: message });
        await writeReviewerWindowState(runRoot, state);
        console.error(`\nREVIEWER PAUSED SAFELY — ${message}`);
        console.error(`Resume with: ${reviewerResumeCommand}`);
        process.exitCode = 2;
        break;
      }
      job.status = "FAILED";
      job.error = message;
      await writeReviewerJob(runRoot, job);
      state = reviewerWindowState({ ...state, status: "FAILED", currentJobId: job.id, lastError: message });
      await writeReviewerWindowState(runRoot, state);
      console.error(`\nREVIEWER PAUSED — ${message}`);
      console.error(`Evidence remains in ${path.join(runRoot, "REVIEWER-JOB.json")}`);
      process.exitCode = 1;
      break;
    }
  }
} finally {
  ownerConsole?.close();
  await releaseLock();
}

if (stopping) console.log("\nREVIEWER WINDOW STOPPED — disk state was preserved.");
