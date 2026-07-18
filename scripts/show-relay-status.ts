#!/usr/bin/env node

import { lstat, readFile, readdir, realpath } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { pathExists, readProjectConfig } from "../src/config.ts";
import { artifactPath, currentPhase, loadSessionState, reviewPath, sessionRoot } from "../src/project.ts";
import { pendingOwnerHandbacks, readOwnerHandbacks } from "./owner-handback.ts";
import {
  readReviewerJob,
  readReviewerWindowState,
  reviewerWindowLockStatus,
} from "./relay-window-protocol.ts";

type RunRecord = {
  version: number;
  status: string;
  scenario: string;
  project: string;
  sessionId?: string;
  lastAction?: string;
  lastError?: string;
  ownerAcknowledgements?: number;
  producer: { model: string; effort: string; threadId: string | null; turns: number };
  reviewer: { model: string; effort: string; threadId: string | null; turns: number };
};

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
      run.version !== 1 || typeof run.status !== "string" || typeof run.scenario !== "string" ||
      typeof run.project !== "string" || !validRole(run.producer) || !validRole(run.reviewer) ||
      !(run.sessionId === undefined || /^\d{4}-\d{2}-\d{2}-\d{2}$/.test(run.sessionId))
    ) return null;
    return run;
  } catch {
    return null;
  }
}

async function discoverRun(): Promise<string> {
  const all: Array<{ root: string; run: RunRecord }> = [];
  for (const entry of await readdir(runsRoot, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const candidate = path.join(runsRoot, entry.name);
    const run = await readRun(candidate);
    if (run) all.push({ root: candidate, run });
  }
  const active = all.filter((item) => item.run.status !== "COMPLETE");
  if (active.length > 1) refuse("More than one unfinished run exists. Name the run path explicitly.");
  if (active.length === 1) return active[0].root;
  if (all.length === 0) refuse("No relay run exists. Prepare one first.");
  return all.sort((left, right) => left.root.localeCompare(right.root)).at(-1)!.root;
}

const runRoot = requested
  ? await realpath(path.resolve(root, requested)).catch(() => refuse(`Run not found: ${requested}`))
  : await discoverRun();
if (path.dirname(runRoot) !== runsRoot) refuse(`The run must be one direct child of ${runsRoot}.`);
const run = await readRun(runRoot);
if (!run) refuse("RUN.json is missing, corrupt, or unsafe.");

const projectCandidate = path.resolve(runRoot, run.project);
if (!projectCandidate.startsWith(`${runRoot}${path.sep}`)) refuse("The project path escapes the relay run.");
const project = await realpath(projectCandidate).catch(() => refuse("The relay project does not exist."));
if (!project.startsWith(`${runRoot}${path.sep}`)) refuse("The project path resolves outside the relay run.");

const reviewerState = await readReviewerWindowState(runRoot);
const job = await readReviewerJob(runRoot);
const lock = await reviewerWindowLockStatus(runRoot);

let phase = "Session not opened";
let ownerHandbackCount = 0;
let pendingOwnerHandbackCount = 0;
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
      const handbacks = await readOwnerHandbacks(directory, active.phase.name, active.index);
      ownerHandbackCount = handbacks.length;
      const artifact = artifactPath(directory, active.phase, active.index);
      const review = reviewPath(directory, active.phase, active.index);
      if (handbacks.length > 0 && await pathExists(artifact) && await pathExists(review)) {
        pendingOwnerHandbackCount = (await pendingOwnerHandbacks({
          sessionDir: directory,
          phase: active.phase.name,
          phaseIndex: active.index,
          artifactPath: artifact,
          reviewPath: review,
        })).length;
      }
    } catch (error) {
      refuse(`Owner handback state is corrupt: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

console.log(`KODA-C RELAY — ${path.basename(runRoot)}`);
console.log(`Run state: ${run.status}`);
console.log(`Scenario: ${run.scenario}`);
console.log(`Session: ${run.sessionId ?? "not opened"}`);
console.log(`Phase: ${phase}`);
console.log(`Owner acknowledgements: ${run.ownerAcknowledgements ?? 0}`);
if (run.lastAction) console.log(`Last action: ${run.lastAction}`);
if (run.lastError) console.log(`Last error: ${run.lastError}`);

console.log("\nWINDOW A — PRODUCER");
console.log(`Model: ${run.producer.model} / ${run.producer.effort}`);
console.log(`Context: ${run.producer.threadId ?? "not started"}`);
console.log(`Turns: ${run.producer.turns}`);
console.log("Input: closed by the supervisor");

console.log("\nWINDOW B — REVIEWER / OWNER");
console.log(`Model: ${reviewerState?.model ?? run.reviewer.model} / ${reviewerState?.effort ?? run.reviewer.effort}`);
console.log(`Context: ${reviewerState?.threadId ?? run.reviewer.threadId ?? "not started"}`);
console.log(`Turns: ${reviewerState?.turns ?? run.reviewer.turns}`);
if (!lock) console.log("Console process: not running");
else if (lock.alive) console.log(`Console process: running as ${lock.pid}`);
else console.log(`Console process: stopped; stale lock belongs to ${lock.pid}`);
console.log(`Console state: ${reviewerState?.status ?? "not started"}`);

console.log("\nDISK HANDOVER");
console.log(`Owner handbacks in active phase: ${ownerHandbackCount}`);
console.log(`Acknowledged handbacks pending producer use: ${pendingOwnerHandbackCount}`);
if (!job) console.log("No reviewer job is waiting.");
else {
  console.log(`Job: ${job.kind} / ${job.phase}`);
  console.log(`Status: ${job.status}`);
  console.log(`Expected artifact: ${job.expectedPath}`);
  if (job.handbackPath) console.log(`Owner handback: ${job.handbackPath}`);
  if (job.completion) console.log(`Completion: ${job.completion}`);
  if (job.error) console.log(`Error: ${job.error}`);
}

console.log("\nNEXT SAFE ACTION");
if (run.status === "COMPLETE") {
  console.log("None. This relay session is complete.");
} else if (job?.status === "FAILED") {
  console.log("Read the named reviewer job error. Do not delete or retry it by guessing.");
} else if (lock && !lock.alive) {
  console.log("Recover the stopped reviewer window explicitly:");
  console.log("  npm run relay:reviewer -- --recover-stale-lock");
} else if (!lock) {
  console.log("Start or resume Window B:");
  console.log("  npm run relay:reviewer");
  if (run.status === "PREPARED" || run.status.startsWith("PAUSED")) {
    console.log("Start or resume Window A in the other pane:");
    console.log("  npm run relay:producer");
  } else {
    console.log(`Window A is recorded as ${run.status}. Check that pane; do not start a second producer blindly.`);
  }
} else if (job?.status === "AWAITING_OWNER") {
  console.log("Return to Window B. The reviewer is waiting for Kristian.");
} else if (run.status === "PREPARED" || run.status.startsWith("PAUSED")) {
  console.log("Window B is ready. Start or resume Window A:");
  console.log("  npm run relay:producer");
} else {
  console.log("Leave both windows open. The current handover is automatic.");
}
