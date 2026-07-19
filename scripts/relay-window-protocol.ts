import { randomUUID } from "node:crypto";
import { lstat, mkdir, readFile, rm } from "node:fs/promises";
import path from "node:path";

import { pathExists } from "../src/config.ts";
import { writeJsonAtomic } from "../src/project.ts";

export const REVIEWER_JOB_FILE = "REVIEWER-JOB.json";
export const REVIEWER_STATE_FILE = "REVIEWER-STATE.json";
export const REVIEWER_LOCK_DIR = ".reviewer-window.lock";

export type ReviewerJobKind = "formal" | "repair" | "fresh" | "consultation" | "acknowledge";
export type ReviewerJobStatus = "PENDING" | "RUNNING" | "AWAITING_OWNER" | "COMPLETE" | "FAILED";
export type ReviewerJobCompletion = "ACKNOWLEDGED" | "CONSULTATION_ANSWERED" | "HALTED";

export type ReviewerTurnInterruption = {
  version: 1;
  purpose: string;
  ownerMessage: string | null;
  jobId: string | null;
  turn: number;
  signal: "SIGINT" | "SIGTERM";
  interruptedAt: string;
  eventFile: string;
  stderrFile: string;
  threadId: string | null;
};

export type ReviewerJob = {
  version: 1;
  id: string;
  kind: ReviewerJobKind;
  phase: string;
  purpose: string;
  prompt: string;
  expectedPath: string;
  status: ReviewerJobStatus;
  createdAt: string;
  updatedAt: string;
  error: string | null;
  completion: ReviewerJobCompletion | null;
};

export type ReviewerWindowState = {
  version: 1;
  status: "READY" | "WORKING" | "AWAITING_OWNER" | "FAILED";
  model: string;
  effort: string;
  threadId: string | null;
  turns: number;
  currentJobId: string | null;
  updatedAt: string;
  lastError: string | null;
  interruption?: ReviewerTurnInterruption | null;
};

const PHASE = /^[a-z0-9][a-z0-9-]*$/;
const JOB_ID = /^[0-9a-f-]{36}$/;
const KINDS = new Set<ReviewerJobKind>(["formal", "repair", "fresh", "consultation", "acknowledge"]);
const STATUSES = new Set<ReviewerJobStatus>(["PENDING", "RUNNING", "AWAITING_OWNER", "COMPLETE", "FAILED"]);
const COMPLETIONS = new Set<ReviewerJobCompletion>(["ACKNOWLEDGED", "CONSULTATION_ANSWERED", "HALTED"]);

function now(): string {
  return new Date().toISOString();
}

export function newReviewerJob(input: Omit<ReviewerJob, "version" | "id" | "status" | "createdAt" | "updatedAt" | "error" | "completion">): ReviewerJob {
  const createdAt = now();
  return {
    version: 1,
    id: randomUUID(),
    ...input,
    status: "PENDING",
    createdAt,
    updatedAt: createdAt,
    error: null,
    completion: null,
  };
}

export function validateReviewerJob(value: unknown): ReviewerJob {
  if (!value || typeof value !== "object") throw new Error("Reviewer job must be a JSON object.");
  const job = value as Partial<ReviewerJob>;
  if (
    job.version !== 1 ||
    typeof job.id !== "string" || !JOB_ID.test(job.id) ||
    typeof job.kind !== "string" || !KINDS.has(job.kind as ReviewerJobKind) ||
    typeof job.phase !== "string" || !PHASE.test(job.phase) ||
    typeof job.purpose !== "string" || job.purpose.trim() === "" ||
    typeof job.prompt !== "string" || job.prompt.trim() === "" ||
    typeof job.expectedPath !== "string" || path.isAbsolute(job.expectedPath) || job.expectedPath.split(path.sep).includes("..") ||
    typeof job.status !== "string" || !STATUSES.has(job.status as ReviewerJobStatus) ||
    typeof job.createdAt !== "string" ||
    typeof job.updatedAt !== "string" ||
    !(job.error === null || typeof job.error === "string") ||
    !(job.completion === null || (typeof job.completion === "string" && COMPLETIONS.has(job.completion as ReviewerJobCompletion)))
  ) {
    throw new Error("Reviewer job has invalid or unsafe fields.");
  }
  return job as ReviewerJob;
}

export async function readReviewerJob(runRoot: string): Promise<ReviewerJob | null> {
  const file = path.join(runRoot, REVIEWER_JOB_FILE);
  if (!(await pathExists(file))) return null;
  if (!(await lstat(file)).isFile()) throw new Error("REVIEWER-JOB.json must be a regular file.");
  let value: unknown;
  try {
    value = JSON.parse(await readFile(file, "utf8"));
  } catch (error) {
    if (error instanceof SyntaxError) throw new Error("REVIEWER-JOB.json is not valid JSON.");
    throw error;
  }
  return validateReviewerJob(value);
}

export async function writeReviewerJob(runRoot: string, job: ReviewerJob): Promise<void> {
  validateReviewerJob(job);
  await writeJsonAtomic(path.join(runRoot, REVIEWER_JOB_FILE), { ...job, updatedAt: now() });
}

export async function removeReviewerJob(runRoot: string): Promise<void> {
  await rm(path.join(runRoot, REVIEWER_JOB_FILE), { force: true });
}

type ReviewerLockOwner = { version: 1; pid: number; startedAt: string };

async function reviewerLockOwner(lock: string): Promise<ReviewerLockOwner> {
  const file = path.join(lock, "OWNER.json");
  if (!(await lstat(file)).isFile()) throw new Error(`Reviewer lock owner must be a regular file: ${file}`);
  const owner = JSON.parse(await readFile(file, "utf8")) as Partial<ReviewerLockOwner>;
  if (owner.version !== 1 || !Number.isInteger(owner.pid) || owner.pid! < 1 || typeof owner.startedAt !== "string") {
    throw new Error(`Reviewer lock owner is invalid: ${file}`);
  }
  return owner as ReviewerLockOwner;
}

export function processIsAlive(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return (error as NodeJS.ErrnoException).code === "EPERM";
  }
}

export async function reviewerWindowLockStatus(
  runRoot: string,
): Promise<{ pid: number; startedAt: string; alive: boolean } | null> {
  const lock = path.join(runRoot, REVIEWER_LOCK_DIR);
  if (!(await pathExists(lock))) return null;
  if (!(await lstat(lock)).isDirectory()) throw new Error(`Reviewer lock must be a directory: ${lock}`);
  const owner = await reviewerLockOwner(lock);
  return { pid: owner.pid, startedAt: owner.startedAt, alive: processIsAlive(owner.pid) };
}

export async function acquireReviewerWindow(
  runRoot: string,
  options: { recoverStale?: boolean } = {},
): Promise<() => Promise<void>> {
  const lock = path.join(runRoot, REVIEWER_LOCK_DIR);
  try {
    await mkdir(lock, { recursive: false });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "EEXIST") {
      const owner = await reviewerLockOwner(lock);
      if (processIsAlive(owner.pid)) {
        throw new Error(`A reviewer window already owns this run as process ${owner.pid}. Lock: ${lock}`);
      }
      if (!options.recoverStale) {
        throw new Error(`The reviewer-window lock belongs to stopped process ${owner.pid}. Recover explicitly with: npm run relay:reviewer -- --recover-stale-lock`);
      }
      await rm(lock, { recursive: true, force: true });
      try {
        await mkdir(lock, { recursive: false });
      } catch (recoveryError) {
        if ((recoveryError as NodeJS.ErrnoException).code === "EEXIST") {
          throw new Error(`Another reviewer window claimed the run during stale-lock recovery. Lock: ${lock}`);
        }
        throw recoveryError;
      }
    } else {
      throw error;
    }
  }
  await writeJsonAtomic(path.join(lock, "OWNER.json"), {
    version: 1,
    pid: process.pid,
    startedAt: now(),
  });
  return async () => rm(lock, { recursive: true, force: true });
}

export function reviewerWindowState(input: Omit<ReviewerWindowState, "version" | "updatedAt">): ReviewerWindowState {
  return { version: 1, ...input, updatedAt: now() };
}

export function validateReviewerWindowState(value: unknown): ReviewerWindowState {
  if (!value || typeof value !== "object") throw new Error("Reviewer window state must be a JSON object.");
  const state = value as Partial<ReviewerWindowState>;
  const interruption = state.interruption;
  const validInterruption = interruption === undefined || interruption === null || (
    interruption.version === 1 &&
    typeof interruption.purpose === "string" && interruption.purpose.trim() !== "" &&
    (interruption.ownerMessage === null || typeof interruption.ownerMessage === "string") &&
    (interruption.jobId === null || (typeof interruption.jobId === "string" && JOB_ID.test(interruption.jobId))) &&
    Number.isInteger(interruption.turn) && interruption.turn > 0 &&
    ["SIGINT", "SIGTERM"].includes(interruption.signal) &&
    typeof interruption.interruptedAt === "string" &&
    /^REVIEWER-WINDOW-\d{2,}-EVENTS\.jsonl$/.test(interruption.eventFile) &&
    /^REVIEWER-WINDOW-\d{2,}-STDERR\.txt$/.test(interruption.stderrFile) &&
    (interruption.threadId === null || typeof interruption.threadId === "string")
  );
  if (
    state.version !== 1 ||
    !["READY", "WORKING", "AWAITING_OWNER", "FAILED"].includes(String(state.status)) ||
    typeof state.model !== "string" || state.model.trim() === "" ||
    typeof state.effort !== "string" || state.effort.trim() === "" ||
    !(state.threadId === null || typeof state.threadId === "string") ||
    !Number.isInteger(state.turns) || state.turns! < 0 ||
    !(state.currentJobId === null || typeof state.currentJobId === "string") ||
    typeof state.updatedAt !== "string" ||
    !(state.lastError === null || typeof state.lastError === "string") ||
    !validInterruption
  ) {
    throw new Error("Reviewer window state has invalid fields.");
  }
  return state as ReviewerWindowState;
}

export async function readReviewerWindowState(runRoot: string): Promise<ReviewerWindowState | null> {
  const file = path.join(runRoot, REVIEWER_STATE_FILE);
  if (!(await pathExists(file))) return null;
  if (!(await lstat(file)).isFile()) throw new Error("REVIEWER-STATE.json must be a regular file.");
  return validateReviewerWindowState(JSON.parse(await readFile(file, "utf8")));
}

export async function writeReviewerWindowState(runRoot: string, state: ReviewerWindowState): Promise<void> {
  validateReviewerWindowState(state);
  await writeJsonAtomic(path.join(runRoot, REVIEWER_STATE_FILE), { ...state, updatedAt: now() });
}

export function redactRelayOutput(value: string): string {
  return value
    .split(/\r?\n/)
    .filter((line) => !line.includes("<!-- KODA_REVIEW ") && !line.trimStart().startsWith("RECEIPT: "))
    .map((line) => line.replace(/RECEIPT: [^\r\n]*/g, "[receipt redacted]"))
    .join("\n");
}

export function renderCodexEvent(line: string, role: "PRODUCER" | "REVIEWER"): string | null {
  let event: Record<string, unknown>;
  try {
    event = JSON.parse(line) as Record<string, unknown>;
  } catch {
    return null;
  }
  if (event.type === "thread.started") return `${role} CONTEXT — ${String(event.thread_id)}`;
  if (event.type === "turn.completed") return `${role} TURN COMPLETE`;
  const item = event.item as Record<string, unknown> | undefined;
  if (!item) return null;
  if (event.type === "item.completed" && item.type === "agent_message" && typeof item.text === "string") {
    const text = redactRelayOutput(item.text).trim();
    return text ? `${role} UPDATE\n${text}` : null;
  }
  if (event.type === "item.completed" && item.type === "file_change" && Array.isArray(item.changes)) {
    const files = item.changes
      .map((change) => change && typeof change === "object" ? String((change as Record<string, unknown>).path ?? "") : "")
      .filter(Boolean);
    return files.length ? `${role} FILE — ${files.join(", ")}` : null;
  }
  if (event.type === "item.completed" && item.type === "command_execution") {
    const status = item.exit_code === 0 ? "passed" : `exit ${String(item.exit_code)}`;
    const command = typeof item.command === "string"
      ? redactRelayOutput(item.command.split(/\r?\n/, 1)[0]).slice(0, 140)
      : "check";
    return `${role} CHECK — ${status}: ${command}`;
  }
  return null;
}
