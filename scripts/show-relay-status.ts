#!/usr/bin/env node

import { lstat, readFile, readdir, realpath } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { pathExists, readProjectConfig } from "../src/config.ts";
import { pendingDirectionsForActivePhase, readWaitingDirections } from "../src/direction.ts";
import { currentPhase, loadSessionState, sessionRoot } from "../src/project.ts";
import { relayOwnerName } from "../src/owner.ts";
import { formatRelayCommand, resolveRelayRunPaths } from "./relay-run-location.ts";
import { validateModelTurnInterruption, type ModelTurnInterruption } from "./relay-interruption.ts";
import {
  producerWindowLockStatus,
  readReviewerJob,
  readReviewerWindowState,
  reviewerWindowLockStatus,
} from "./relay-window-protocol.ts";

type RunRecord = {
  version: number;
  owner?: string;
  mode?: "fixture-copy" | "guide-project";
  status: string;
  scenario: string;
  project: string;
  runtime: string;
  cli: string;
  sessionId?: string;
  lastAction?: string;
  lastError?: string;
  ownerAcknowledgements?: number;
  interruption?: ModelTurnInterruption;
  producer: { model: string; effort: string; threadId: string | null; turns: number };
  reviewer: { model: string; effort: string; threadId: string | null; turns: number };
};

function validInterruption(run: RunRecord): boolean {
  const value = run.interruption;
  if (value === undefined) return true;
  try {
    validateModelTurnInterruption(value);
    return true;
  } catch {
    return false;
  }
}

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const runsRoot = await realpath(process.env.KODA_RELAY_RUNS_ROOT
  ? path.resolve(process.env.KODA_RELAY_RUNS_ROOT)
  : path.join(root, "docs", "relay-runs"));
const requested = process.argv[2];

function refuse(message: string): never {
  console.error(`RELAY STATUS REFUSED — ${message}`);
  process.exit(1);
}

async function readRun(candidate: string): Promise<RunRecord | null> {
  const file = path.join(candidate, "RUN.json");
  if (!(await pathExists(file)) || !(await lstat(file)).isFile()) return null;
  try {
    const run = JSON.parse(await readFile(file, "utf8")) as RunRecord;
    const validRole = (role: RunRecord["producer"] | undefined) => Boolean(
      role && typeof role.model === "string" && role.model.trim() &&
      typeof role.effort === "string" && role.effort.trim() &&
      (role.threadId === null || typeof role.threadId === "string") &&
      Number.isInteger(role.turns) && role.turns >= 0,
    );
    if (
      (run.version !== 1 && run.version !== 2) || typeof run.status !== "string" || typeof run.scenario !== "string" ||
      typeof run.project !== "string" || typeof run.runtime !== "string" || typeof run.cli !== "string" ||
      !validRole(run.producer) || !validRole(run.reviewer) ||
      !validInterruption(run) ||
      !(run.sessionId === undefined || /^\d{4}-\d{2}-\d{2}-\d{2}$/.test(run.sessionId))
    ) return null;
    relayOwnerName(run);
    return run;
  } catch {
    return null;
  }
}

async function discoverRun(): Promise<string> {
  const all: Array<{ root: string; run: RunRecord }> = [];
  const unsafe: string[] = [];
  for (const entry of await readdir(runsRoot, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const candidate = path.join(runsRoot, entry.name);
    const run = await readRun(candidate);
    if (run) all.push({ root: candidate, run });
    else unsafe.push(`${entry.name}/RUN.json`);
  }
  if (unsafe.length > 0) refuse(`Corrupt or unsafe relay state exists at ${unsafe.join(", ")}. Koda-C will not treat it as absent.`);
  const active = all.filter((item) => item.run.status !== "COMPLETE" && item.run.status !== "HALTED");
  if (active.length > 1) refuse("More than one unfinished run exists. Name the run path explicitly.");
  if (active.length === 1) return active[0].root;
  if (all.length === 0) refuse("No relay run exists. Prepare one first.");
  return all.sort((left, right) => left.root.localeCompare(right.root)).at(-1)!.root;
}

const runRoot = requested
  ? await realpath(path.resolve(root, requested)).catch(() => refuse(`Run not found: ${requested}`))
  : await discoverRun();
const run = await readRun(runRoot);
if (!run) refuse("RUN.json is missing, corrupt, or unsafe.");
const ownerName = relayOwnerName(run);
const resolved = await resolveRelayRunPaths({ packageRoot: root, configuredRunsRoot: runsRoot, runRoot, run })
  .catch((error) => refuse(error instanceof Error ? error.message : String(error)));
const { project } = resolved;
const reviewerCommand = resolved.mode === "guide-project"
  ? formatRelayCommand(path.join(root, "scripts", "run-relay-reviewer-window.ts"), runRoot)
  : "npm run relay:reviewer";
const reviewerRecoveryCommand = resolved.mode === "guide-project"
  ? formatRelayCommand(path.join(root, "scripts", "run-relay-reviewer-window.ts"), runRoot, ["--recover-stale-lock"])
  : "npm run relay:reviewer -- --recover-stale-lock";
const producerCommand = resolved.mode === "guide-project"
  ? formatRelayCommand(path.join(root, "scripts", "execute-relay-run.ts"), runRoot, ["--reviewer-window"])
  : "npm run relay:producer";

const reviewerState = await readReviewerWindowState(runRoot);
const job = await readReviewerJob(runRoot);
const lock = await reviewerWindowLockStatus(runRoot);
const producerLock = await producerWindowLockStatus(runRoot);
const retryableReceiptAttempt = job?.status === "FAILED" &&
  job.error === "Owner acknowledgement exited 1." &&
  job.completion === null;

let phase = "Session not opened";
let directionCount = 0;
let waitingDirectionCount = 0;
if (run.sessionId) {
  const config = await readProjectConfig(project);
  const directory = sessionRoot(project, config, run.sessionId);
  const state = await loadSessionState(directory, run.sessionId);
  const active = currentPhase(state);
  phase = active
    ? `${active.index + 1}/${state.phases.length} — ${active.phase.name}`
    : `${state.phases.length}/${state.phases.length} — phases complete`;
  if (active) {
    try {
      directionCount = (await readWaitingDirections(directory)).length;
      waitingDirectionCount = (await pendingDirectionsForActivePhase(directory, state)).length;
    } catch (error) {
      refuse(`Waiting direction state is corrupt: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

console.log(`KODA-C RELAY — ${path.basename(runRoot)}`);
console.log(`Run state: ${run.status}`);
console.log(`Scenario: ${run.scenario}`);
console.log(`Owner: ${ownerName}`);
console.log(`Session: ${run.sessionId ?? "not opened"}`);
console.log(`Phase: ${phase}`);
console.log(`Owner acknowledgements: ${run.ownerAcknowledgements ?? 0}`);
if (run.lastAction) console.log(`Last action: ${run.lastAction}`);
if (run.lastError) console.log(`Last error: ${run.lastError}`);

console.log("\nGUIDE — PROJECT / OWNER");
console.log("Owner input: OPEN in the existing Guide conversation");
console.log("Scope: project path and later sessions; the active phase remains frozen");

console.log("\nWINDOW A — PRODUCER");
console.log(`Model: ${run.producer.model} / ${run.producer.effort}`);
console.log(`Context: ${run.producer.threadId ?? "not started"}`);
console.log(`Turns: ${run.producer.turns}`);
console.log("Owner input: CLOSED — watch only; speak in Window B");
if (!producerLock) console.log("Console process: not running");
else if (producerLock.alive) console.log(`Console process: running as ${producerLock.pid}`);
else console.log(`Console process: stopped; stale lock belongs to ${producerLock.pid}`);

console.log("\nWINDOW B — REVIEWER / OWNER");
console.log(`Model: ${reviewerState?.model ?? run.reviewer.model} / ${reviewerState?.effort ?? run.reviewer.effort}`);
console.log(`Context: ${reviewerState?.threadId ?? run.reviewer.threadId ?? "not started"}`);
console.log(`Turns: ${reviewerState?.turns ?? run.reviewer.turns}`);
console.log("Owner input: OPEN — active-session conversation belongs here");
if (!lock) console.log("Console process: not running");
else if (lock.alive) console.log(`Console process: running as ${lock.pid}`);
else console.log(`Console process: stopped; stale lock belongs to ${lock.pid}`);
console.log(`Console state: ${reviewerState?.status ?? "not started"}`);

console.log("\nDISK HANDOVER");
console.log(`Waiting directions recorded in session: ${directionCount}`);
console.log(`Directions waiting for the next gate: ${waitingDirectionCount}`);
if (!job) console.log("No reviewer job is waiting.");
else {
  console.log(`Job: ${job.kind} / ${job.phase}`);
  console.log(`Status: ${job.status}`);
  console.log(`Expected artifact: ${job.expectedPath}`);
  if (job.completion) console.log(`Completion: ${job.completion}`);
  if (job.error) console.log(`Error: ${job.error}`);
}

console.log("\nNEXT SAFE ACTION");
if (run.status === "COMPLETE" || run.status === "HALTED") {
  console.log(run.status === "COMPLETE"
    ? "None. This relay session is complete."
    : "Return to Guide and start a new session from the pushed halt through a fresh Brief.");
} else if (run.status === "PAUSED_INTERRUPTED_CONTEXT_MISSING" || run.status === "PAUSED_INTERRUPTED_STATE_MISSING") {
  console.log("No automatic resume is safe. The interrupted worker or its bound session identity is missing; Koda-C refuses to replace it by guessing.");
} else if (retryableReceiptAttempt) {
  console.log("The last receipt entry did not match. Nothing advanced and no ledger entry was written.");
  console.log("Return to Guide and say: Recover this session.");
  console.log("Guide will verify and reopen the same review; do not paste a technical command.");
} else if (job?.status === "FAILED") {
  console.log("Read the named reviewer job error. Do not delete or retry it by guessing.");
} else if (lock && !lock.alive) {
  console.log("Recover the stopped reviewer window explicitly:");
  console.log(`  ${reviewerRecoveryCommand}`);
} else if (!lock) {
  console.log("First, start or resume Window B. Then run status again:");
  console.log(`  ${reviewerCommand}`);
  if (run.status !== "PREPARED" && !run.status.startsWith("PAUSED")) {
    console.log(`Window A is recorded as ${run.status}. Check that pane; do not start a second producer blindly.`);
  }
} else if (job?.status === "AWAITING_OWNER") {
  console.log(`Return to Window B. The reviewer is waiting for ${ownerName}.`);
} else if (run.status === "FINALIZING_GUIDE_RETURN" && run.lastError) {
  console.log("Window B is preserving the closed session. Resume Window A to finish the Guide return:");
  console.log(`  ${producerCommand}`);
} else if (run.status === "FINALIZING_GUIDE_RETURN") {
  console.log("Window A is returning the closed session to Guide. Do not start another producer.");
} else if (run.status === "PREPARED" || run.status.startsWith("PAUSED")) {
  console.log("Window B is ready. Start or resume Window A:");
  console.log(`  ${producerCommand}`);
} else {
  console.log("Leave both windows open. The current handover is automatic.");
}
