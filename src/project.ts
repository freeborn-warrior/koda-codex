import { lstat, mkdir, readdir, readFile, rename, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

import type { PhaseConfig, ProjectConfig, SessionState } from "./types.ts";
import { assertSafeSessionsDirectory, pathExists, validatePhaseChain } from "./config.ts";

const SESSION_PATTERN = /^(\d{4}-\d{2}-\d{2})-(\d{2})$/;

export function now(): Date {
  const override = process.env.KODA_NOW;
  if (!override) return new Date();

  const parsed = new Date(override);
  if (Number.isNaN(parsed.valueOf())) {
    throw new Error("KODA_NOW must be an ISO-8601 date when set.");
  }
  return parsed;
}

export function nowIso(): string {
  return now().toISOString();
}

export function localDateStamp(date = now()): string {
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function phasePrefix(index: number): string {
  return String(index + 1).padStart(2, "0");
}

export function sessionRoot(root: string, config: ProjectConfig, id: string): string {
  return path.join(root, config.sessionsDir, id);
}

export function statePath(sessionDir: string): string {
  return path.join(sessionDir, "state.json");
}

export function ledgerPath(sessionDir: string): string {
  return path.join(sessionDir, "approvals.md");
}

export function artifactPath(sessionDir: string, phase: PhaseConfig, index: number): string {
  return path.join(sessionDir, "phases", `${phasePrefix(index)}-${phase.name}.md`);
}

export function reviewPath(sessionDir: string, phase: PhaseConfig, index: number): string {
  return path.join(sessionDir, "reviews", `${phasePrefix(index)}-${phase.name}-review.md`);
}

export async function writeTextAtomic(filePath: string, content: string): Promise<void> {
  const temporary = `${filePath}.tmp-${process.pid}-${Math.random().toString(16).slice(2)}`;
  try {
    await writeFile(temporary, content, { encoding: "utf8", flag: "wx" });
    await rename(temporary, filePath);
  } finally {
    await unlink(temporary).catch((error) => {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    });
  }
}

export async function writeJsonAtomic(filePath: string, value: unknown): Promise<void> {
  await writeTextAtomic(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

export async function listSessionIds(root: string, config: ProjectConfig): Promise<string[]> {
  const sessionsPath = path.join(root, config.sessionsDir);
  if (!(await pathExists(sessionsPath))) return [];

  const entries = await readdir(sessionsPath, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory() && SESSION_PATTERN.test(entry.name))
    .map((entry) => entry.name)
    .sort();
}

export async function latestSessionId(root: string, config: ProjectConfig): Promise<string | null> {
  const sessions = await listSessionIds(root, config);
  return sessions.at(-1) ?? null;
}

export async function nextSessionId(root: string, config: ProjectConfig): Promise<string> {
  const date = localDateStamp();
  const sessions = await listSessionIds(root, config);
  const sequence = sessions
    .map((id) => SESSION_PATTERN.exec(id))
    .filter((match): match is RegExpExecArray => match !== null && match[1] === date)
    .reduce((highest, match) => Math.max(highest, Number(match[2])), 0) + 1;

  if (sequence > 99) {
    throw new Error(`No session numbers remain for ${date}.`);
  }
  return `${date}-${String(sequence).padStart(2, "0")}`;
}

export async function createSession(
  root: string,
  config: ProjectConfig,
  prompt: string,
): Promise<{ id: string; directory: string; state: SessionState }> {
  if (prompt.trim() === "") {
    throw new Error("The session prompt must exist and be non-empty.");
  }
  validatePhaseChain(config.phases);
  await assertSafeSessionsDirectory(root, config);

  const id = await nextSessionId(root, config);
  const directory = sessionRoot(root, config, id);
  await mkdir(path.join(directory, "phases"), { recursive: true });
  await mkdir(path.join(directory, "reviews", "history"), { recursive: true });

  const state: SessionState = {
    version: 1,
    id,
    createdAt: nowIso(),
    phases: config.phases.map((phase) => ({ ...phase })),
    currentPhaseIndex: 0,
    advances: [],
  };

  await writeTextAtomic(path.join(directory, "session-prompt.md"), prompt.endsWith("\n") ? prompt : `${prompt}\n`);
  await writeTextAtomic(
    ledgerPath(directory),
    `# Approval ledger — ${id}\n\nEntries are appended by Koda after the approver quotes a review receipt.\n`,
  );
  await writeJsonAtomic(statePath(directory), state);

  return { id, directory, state };
}

export function validateSessionState(value: unknown, expectedId?: string): SessionState {
  if (!value || typeof value !== "object") {
    throw new Error("state.json must contain a JSON object.");
  }
  const state = value as Partial<SessionState>;
  if (
    state.version !== 1 ||
    typeof state.id !== "string" ||
    !SESSION_PATTERN.test(state.id) ||
    typeof state.createdAt !== "string" ||
    (expectedId && state.id !== expectedId)
  ) {
    throw new Error("state.json has invalid session identity or version.");
  }
  if (!Array.isArray(state.phases) || state.phases.length === 0) {
    throw new Error("state.json has no phase chain.");
  }
  validatePhaseChain(state.phases, "state.json");
  if (!Number.isInteger(state.currentPhaseIndex) || state.currentPhaseIndex! < 0 || state.currentPhaseIndex! > state.phases.length) {
    throw new Error("state.json has an invalid currentPhaseIndex.");
  }
  if (!Array.isArray(state.advances)) {
    throw new Error("state.json has no advancement history.");
  }
  if (state.advances.length !== state.currentPhaseIndex) {
    throw new Error("state.json advancement history does not match the current phase.");
  }
  for (let index = 0; index < state.advances.length; index += 1) {
    const advance = state.advances[index];
    if (
      !advance ||
      advance.phase !== state.phases[index]?.name ||
      typeof advance.receipt !== "string" ||
      typeof advance.reviewId !== "string" ||
      typeof advance.advancedAt !== "string"
    ) {
      throw new Error(`state.json has an invalid advancement record at index ${index}.`);
    }
  }
  return state as SessionState;
}

export async function loadSessionState(directory: string, expectedId?: string): Promise<SessionState> {
  let parsed: unknown;
  try {
    parsed = JSON.parse(await readRegularText(statePath(directory), "state.json"));
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error("state.json is not valid JSON.");
    }
    throw error;
  }
  return validateSessionState(parsed, expectedId);
}

export async function saveSessionState(directory: string, state: SessionState): Promise<void> {
  await writeJsonAtomic(statePath(directory), state);
}

export async function loadLatestSession(
  root: string,
  config: ProjectConfig,
): Promise<{ id: string; directory: string; state: SessionState }> {
  const id = await latestSessionId(root, config);
  if (!id) {
    throw new Error("No session exists. Start one with `koda session new <prompt-file>`." );
  }
  const directory = sessionRoot(root, config, id);
  return { id, directory, state: await loadSessionState(directory, id) };
}

export function currentPhase(state: SessionState): { phase: PhaseConfig; index: number } | null {
  if (state.currentPhaseIndex >= state.phases.length) return null;
  return { phase: state.phases[state.currentPhaseIndex], index: state.currentPhaseIndex };
}

export function displayPath(root: string, filePath: string): string {
  const relative = path.relative(root, filePath);
  return relative === "" ? "." : relative;
}

export async function readNonEmpty(filePath: string): Promise<string | null> {
  if (!(await pathExists(filePath))) return null;
  const content = await readRegularText(filePath, path.basename(filePath));
  return content.trim() === "" ? null : content;
}

export async function readRegularText(filePath: string, label = "Evidence file"): Promise<string> {
  const metadata = await lstat(filePath);
  if (!metadata.isFile()) {
    throw new Error(`${label} must be a regular file; symbolic links and special files are refused.`);
  }
  return readFile(filePath, "utf8");
}
