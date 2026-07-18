#!/usr/bin/env node

import { createHash } from "node:crypto";
import { spawn, spawnSync } from "node:child_process";
import { lstat, readFile, readdir, realpath, writeFile } from "node:fs/promises";
import path from "node:path";
import { createInterface } from "node:readline";
import { createInterface as createPrompt } from "node:readline/promises";
import { fileURLToPath } from "node:url";

import { pathExists } from "../src/config.ts";
import { writeTextAtomic } from "../src/project.ts";
import { parseReview } from "../src/receipt.ts";
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
  status: string;
  project: string;
  cli: string;
  reviewer: { model: string; effort: string; threadId: string | null; turns: number };
};

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const runsRoot = await realpath(process.env.KODA_RELAY_RUNS_ROOT
  ? path.resolve(process.env.KODA_RELAY_RUNS_ROOT)
  : path.join(root, "docs", "relay-runs"));
const recoverStaleLock = process.argv.includes("--recover-stale-lock");
const requested = process.argv.slice(2).find((argument) => argument !== "--recover-stale-lock");
let stopping = false;
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
    if (record && record.version === 1 && record.status !== "COMPLETE") candidates.push(candidate);
  }
  if (candidates.length === 0) refuse("No prepared or active relay run exists. Start Window A first.");
  if (candidates.length > 1) refuse("More than one relay run is active. Koda will not guess which session you mean.");
  return candidates[0];
}

const runRoot = requested ? await realpath(path.resolve(root, requested)) : await discoverRun();
if (path.dirname(runRoot) !== runsRoot) refuse(`The run must be one direct child of ${runsRoot}.`);
const runPath = path.join(runRoot, "RUN.json");
if (!(await lstat(runPath)).isFile()) refuse("RUN.json must be a regular file.");

async function readRun(): Promise<RunRecord> {
  const value = JSON.parse(await readFile(runPath, "utf8")) as RunRecord;
  if (
    value.version !== 1 ||
    typeof value.status !== "string" ||
    typeof value.project !== "string" ||
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
const projectCandidate = path.resolve(runRoot, initialRun.project);
if (!projectCandidate.startsWith(`${runRoot}${path.sep}`)) refuse("The project path escapes the relay run.");
const project = await realpath(projectCandidate);
if (!project.startsWith(`${runRoot}${path.sep}`)) refuse("The project path resolves outside the relay run.");
const expectedCli = await realpath(path.join(root, "src", "cli.ts"));
const cli = await realpath(initialRun.cli);
if (cli !== expectedCli) refuse("RUN.json does not name this checkout's trusted Koda CLI.");

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

async function modelTurn(purpose: string, prompt: string): Promise<void> {
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
  const lines = createInterface({ input: child.stdout });
  lines.on("line", (line) => {
    stdout += `${line}\n`;
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
}

async function promptOwner(message: string): Promise<string> {
  const terminal = createPrompt({ input: process.stdin, output: process.stdout });
  try {
    return await terminal.question(message);
  } finally {
    terminal.close();
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

  job.status = "AWAITING_OWNER";
  await writeReviewerJob(runRoot, job);
  state = reviewerWindowState({ ...state, status: "AWAITING_OWNER", currentJobId: job.id, lastError: null });
  await writeReviewerWindowState(runRoot, state);

  console.log(`\nREVIEW READY — ${job.phase.toUpperCase()} — ${parsed.verdict}`);
  console.log("This is your decision point in Window B. The producer is waiting in Window A.");
  const testMode = Boolean(process.env.KODA_RELAY_RUNS_ROOT && process.env.KODA_RELAY_TEST_CONFIRM_READ === "1");
  if (!testMode) await promptOwner("Press Return to open the complete review. ");
  const pager = spawnSync(process.env.KODA_RELAY_REVIEW_PAGER ?? "less", [review], { stdio: "inherit" });
  if (pager.status !== 0) throw new Error(`The review reader exited ${pager.status ?? -1}; nothing was acknowledged.`);
  const after = await readFile(review, "utf8");
  if (createHash("sha256").update(after).digest("hex") !== createHash("sha256").update(before).digest("hex")) {
    throw new Error("The review changed while it was open. Read the current review again.");
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
  const approved = spawnSync(process.execPath, [cli, "approve", job.phase, "--approver", "Kristian"], {
    cwd: project,
    ...(testReceiptInput === undefined
      ? { stdio: "inherit" as const }
      : { input: `${testReceiptInput}\n`, encoding: "utf8" as const }),
    env: { ...process.env, KODA_COMMAND: `${process.execPath} ${cli}` },
  });
  if (approved.status !== 0) throw new Error(`Owner acknowledgement exited ${approved.status ?? -1}.`);
  console.log("ACKNOWLEDGED — Window A will now derive the route from disk.");
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
  if (job.kind === "consultation") await completeConsultation(job, output);
  else await ownerAcknowledge(job, output);

  job.status = "COMPLETE";
  job.error = null;
  await writeReviewerJob(runRoot, job);
  state = reviewerWindowState({ ...state, status: "READY", currentJobId: null, lastError: null });
  await writeReviewerWindowState(runRoot, state);
}

console.log("KODA-C REVIEWER WINDOW");
console.log(`Reviewer: ${state.model} / ${state.effort}`);
console.log("This window owns the reviewer context and all owner interaction. Leave it open.");
console.log("Waiting for the producer in Window A…");

try {
  let announcedWaiting = true;
  while (!stopping) {
    const run = await readRun();
    if (run.status === "COMPLETE") {
      console.log("\nSESSION CLOSED — reviewer window complete.");
      break;
    }
    const job = await readReviewerJob(runRoot);
    if (!job || job.status === "COMPLETE") {
      if (!announcedWaiting) {
        console.log("\nWaiting for the next producer handover…");
        announcedWaiting = true;
      }
      await new Promise((resolve) => setTimeout(resolve, 350));
      continue;
    }
    announcedWaiting = false;
    try {
      await processJob(job);
      if (process.env.KODA_RELAY_REVIEWER_ONCE === "1") break;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
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
  await releaseLock();
}

if (stopping) console.log("\nREVIEWER WINDOW STOPPED — disk state was preserved.");
