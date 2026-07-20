import { randomUUID } from "node:crypto";
import { link, lstat, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import { pathExists } from "../src/config.ts";
import { writeJsonAtomic } from "../src/project.ts";

export const REVIEWER_JOB_FILE = "REVIEWER-JOB.json";
export const REVIEWER_STATE_FILE = "REVIEWER-STATE.json";
export const REVIEWER_LOCK_DIR = ".reviewer-window.lock";
export const PRODUCER_LOCK_DIR = ".producer-window.lock";

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
type RoleLockSnapshot = ReviewerLockOwner & {
  kind: "file" | "legacy-directory";
  device: number;
  inode: number;
};

function validateRoleLockOwner(value: unknown, file: string, role: "Reviewer" | "Producer"): ReviewerLockOwner {
  const owner = value as Partial<ReviewerLockOwner>;
  if (owner.version !== 1 || !Number.isInteger(owner.pid) || owner.pid! < 1 || typeof owner.startedAt !== "string") {
    throw new Error(`${role} lock owner is invalid: ${file}`);
  }
  return owner as ReviewerLockOwner;
}

async function readRoleLock(lock: string, role: "Reviewer" | "Producer"): Promise<RoleLockSnapshot> {
  const metadata = await lstat(lock);
  if (metadata.isSymbolicLink() || (!metadata.isFile() && !metadata.isDirectory())) {
    throw new Error(`${role} lock must be a real file or legacy directory: ${lock}`);
  }
  const kind = metadata.isFile() ? "file" : "legacy-directory";
  const file = kind === "file" ? lock : path.join(lock, "OWNER.json");
  const ownerMetadata = await lstat(file);
  if (!ownerMetadata.isFile() || ownerMetadata.isSymbolicLink()) {
    throw new Error(`${role} lock owner must be a regular file: ${file}`);
  }
  let value: unknown;
  try {
    value = JSON.parse(await readFile(file, "utf8"));
  } catch (error) {
    if (error instanceof SyntaxError) throw new Error(`${role} lock owner is not valid JSON: ${file}`);
    throw error;
  }
  return {
    ...validateRoleLockOwner(value, file, role),
    kind,
    device: metadata.dev,
    inode: metadata.ino,
  };
}

function sameRoleLock(left: RoleLockSnapshot, right: RoleLockSnapshot): boolean {
  return left.kind === right.kind && left.device === right.device && left.inode === right.inode &&
    left.pid === right.pid && left.startedAt === right.startedAt;
}

async function publishRoleLock(lock: string, owner: ReviewerLockOwner): Promise<void> {
  const temporary = path.join(path.dirname(lock), `.${path.basename(lock)}.${randomUUID()}.tmp`);
  await writeFile(temporary, `${JSON.stringify(owner, null, 2)}\n`, { encoding: "utf8", mode: 0o600, flag: "wx" });
  try {
    // A hard-link publish is no-clobber and makes the complete owner bytes visible
    // in the same filesystem operation that makes the lock name visible.
    await link(temporary, lock);
  } finally {
    await rm(temporary, { force: true });
  }
}

async function roleLockStatus(
  lock: string,
  role: "Reviewer" | "Producer",
): Promise<{ pid: number; startedAt: string; alive: boolean } | null> {
  for (let attempt = 0; attempt < 4; attempt += 1) {
    if (!(await pathExists(lock))) return null;
    try {
      const owner = await readRoleLock(lock, role);
      return { pid: owner.pid, startedAt: owner.startedAt, alive: processIsAlive(owner.pid) };
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
      if (!(await pathExists(lock))) return null;
      if (attempt < 3) {
        // Legacy directory removal deletes OWNER.json just before the directory.
        await new Promise<void>((resolve) => setImmediate(resolve));
        continue;
      }
      throw new Error(`${role} lock owner is missing from a persistent lock: ${lock}`);
    }
  }
  return null;
}

async function acquireRoleLock(
  lock: string,
  role: "Reviewer" | "Producer",
  options: { recoverStale?: boolean },
): Promise<() => Promise<void>> {
  const owner: ReviewerLockOwner = { version: 1, pid: process.pid, startedAt: now() };
  try {
    await publishRoleLock(lock, owner);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
    const existing = await readRoleLock(lock, role);
    const lower = role.toLowerCase();
    if (processIsAlive(existing.pid)) {
      throw new Error(`A ${lower} window already owns this run as process ${existing.pid}. Lock: ${lock}`);
    }
    if (!options.recoverStale) {
      const recovery = role === "Reviewer"
        ? "Recover explicitly with: npm run relay:reviewer -- --recover-stale-lock"
        : "Explicit recovery is required.";
      throw new Error(`The ${lower}-window lock belongs to stopped process ${existing.pid}. ${recovery}`);
    }
    const confirmed = await readRoleLock(lock, role);
    if (!sameRoleLock(existing, confirmed)) {
      throw new Error(`Another ${lower} window changed the lock during stale-lock recovery. Lock: ${lock}`);
    }
    await rm(lock, { recursive: confirmed.kind === "legacy-directory", force: true });
    try {
      await publishRoleLock(lock, owner);
    } catch (recoveryError) {
      if ((recoveryError as NodeJS.ErrnoException).code === "EEXIST") {
        throw new Error(`Another ${lower} window claimed the run during stale-lock recovery. Lock: ${lock}`);
      }
      throw recoveryError;
    }
  }
  return async () => {
    let current: RoleLockSnapshot;
    try {
      current = await readRoleLock(lock, role);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") return;
      throw error;
    }
    if (current.kind === "file" && current.pid === owner.pid && current.startedAt === owner.startedAt) {
      await rm(lock, { force: true });
    }
  };
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
  return roleLockStatus(path.join(runRoot, REVIEWER_LOCK_DIR), "Reviewer");
}

export async function acquireReviewerWindow(
  runRoot: string,
  options: { recoverStale?: boolean } = {},
): Promise<() => Promise<void>> {
  return acquireRoleLock(path.join(runRoot, REVIEWER_LOCK_DIR), "Reviewer", options);
}

export async function producerWindowLockStatus(
  runRoot: string,
): Promise<{ pid: number; startedAt: string; alive: boolean } | null> {
  return roleLockStatus(path.join(runRoot, PRODUCER_LOCK_DIR), "Producer");
}

export async function acquireProducerWindow(
  runRoot: string,
  options: { recoverStale?: boolean } = {},
): Promise<() => Promise<void>> {
  return acquireRoleLock(path.join(runRoot, PRODUCER_LOCK_DIR), "Producer", options);
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
