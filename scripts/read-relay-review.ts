#!/usr/bin/env node

import { createHash } from "node:crypto";
import { lstat, readFile, readdir, realpath } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { terminalPanel } from "../src/terminal-ui.ts";

type RunRecord = {
  status: string;
  project: string;
  sessionId?: string;
};

type SessionState = {
  currentPhaseIndex: number;
  phases: Array<{ name: string }>;
};

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const requested = process.argv[2];
const runsRoot = await realpath(process.env.KODA_RELAY_RUNS_ROOT
  ? path.resolve(process.env.KODA_RELAY_RUNS_ROOT)
  : path.join(root, "docs", "relay-runs"));

function refuse(message: string): never {
  console.error(terminalPanel("REVIEW NOT READY", [
    message,
    "Nothing changed on disk.",
  ]));
  process.exit(1);
}

async function discoverWaitingRun(): Promise<string> {
  const candidates: string[] = [];
  for (const entry of await readdir(runsRoot, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const candidate = path.join(runsRoot, entry.name);
    const record = await readFile(path.join(candidate, "RUN.json"), "utf8")
      .then((content) => JSON.parse(content) as RunRecord)
      .catch(() => null);
    if (record?.status === "AWAITING_OWNER_RECEIPT") candidates.push(candidate);
  }
  if (candidates.length === 0) refuse("No relay run is waiting for your review. Look at Window A first.");
  if (candidates.length > 1) refuse("More than one relay run is waiting. Koda will not guess which one you mean.");
  return candidates[0];
}

const runRoot = requested
  ? await realpath(path.resolve(root, requested))
  : await discoverWaitingRun();
if (path.dirname(runRoot) !== runsRoot) {
  refuse(`The run must be one direct child of ${runsRoot}.`);
}

const run = JSON.parse(await readFile(path.join(runRoot, "RUN.json"), "utf8")) as RunRecord;
if (run.status !== "AWAITING_OWNER_RECEIPT") {
  refuse(`Window A is currently ${run.status}, not waiting for an owner receipt.`);
}
if (!run.sessionId || !/^\d{4}-\d{2}-\d{2}-\d{2}$/.test(run.sessionId)) refuse("RUN.json names no valid active session.");
if (typeof run.project !== "string") refuse("RUN.json names no valid project path.");

const projectCandidate = path.resolve(runRoot, run.project);
if (!projectCandidate.startsWith(`${runRoot}${path.sep}`)) refuse("The project path escapes the relay run.");
const project = await realpath(projectCandidate);
if (!project.startsWith(`${runRoot}${path.sep}`)) refuse("The project path resolves outside the relay run.");
const session = await realpath(path.join(project, "docs", "sessions", run.sessionId));
if (!session.startsWith(`${project}${path.sep}`)) refuse("The active session resolves outside the relay project.");
const stateCandidate = path.join(session, "state.json");
if (!(await lstat(stateCandidate)).isFile()) refuse("The active state must be a regular file.");
const state = JSON.parse(await readFile(stateCandidate, "utf8")) as SessionState;
if (!Number.isInteger(state.currentPhaseIndex) || state.currentPhaseIndex < 0) refuse("The session has an invalid current phase index.");
const phase = state.phases[state.currentPhaseIndex];
if (!phase || !/^[a-z0-9][a-z0-9-]*$/.test(phase.name)) refuse("The session has no valid current phase awaiting review.");
const reviewCandidate = path.join(
  session,
  "reviews",
  `${String(state.currentPhaseIndex + 1).padStart(2, "0")}-${phase.name}-review.md`,
);
const review = await realpath(reviewCandidate).catch(() => refuse(`The expected review does not exist: ${reviewCandidate}`));
if (!review.startsWith(`${session}${path.sep}`) || !(await lstat(reviewCandidate)).isFile()) {
  refuse("The expected review must be a regular file inside the active session.");
}

async function reviewSnapshot(): Promise<{ content: string; receipt: string; hash: string }> {
  const content = await readFile(review, "utf8").catch(() => refuse(`The expected review does not exist: ${review}`));
  const nonEmpty = content.split(/\r?\n/).filter((line) => line.trim().length > 0);
  const receipt = nonEmpty.at(-1)?.trim() ?? "";
  if (!receipt.startsWith("RECEIPT: ")) refuse(`The review's final non-empty line is not a receipt: ${review}`);
  return {
    content,
    receipt,
    hash: createHash("sha256").update(content).digest("hex"),
  };
}

const before = await reviewSnapshot();
const visible = before.content
  .split(/\r?\n/)
  .filter((line) => !line.startsWith("<!-- KODA_REVIEW "))
  .join("\n")
  .trim();
const code = createHash("sha256").update(before.receipt).digest("hex").slice(0, 8).toUpperCase();
console.log(terminalPanel(`COMPLETE REVIEW — ${phase.name.toUpperCase()}`, [
  visible,
  "",
  `REVIEW CODE: ${code}`,
  "",
  "This historical helper is read-only. Current sessions acknowledge inside the persistent Reviewer window.",
]));

const after = await reviewSnapshot();
if (after.hash !== before.hash) refuse("The review changed while it was open. Run the same command again and read the current review.");
