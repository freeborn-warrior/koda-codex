import { randomUUID } from "node:crypto";
import { lstat, mkdir, readFile, readdir, realpath } from "node:fs/promises";
import path from "node:path";

import { pathExists } from "./config.ts";
import {
  artifactPath,
  currentPhase,
  phasePrefix,
  readRegularText,
  reviewPath,
  writeTextAtomic,
} from "./project.ts";
import { sha256 } from "./receipt.ts";
import type { DirectionReference, SessionState } from "./types.ts";

export const WAITING_DIRECTION_MARKER = "KODA_WAITING_DIRECTION";
export const WAITING_DIRECTION_PREFIX = "OWNER DIRECTION — WAIT FOR GATE";

export type DirectionSource = "owner-via-reviewer" | "owner-via-guide";

export type WaitingDirectionMetadata = {
  version: 1;
  id: string;
  verb: "wait";
  source: DirectionSource;
  sessionId: string;
  phase: string;
  phaseIndex: number;
  phaseEnteredAt: string;
  phaseEntrySha256: string;
  artifactState: "ABSENT" | "PRESENT";
  artifactSha256: string | null;
  reviewSha256: string | null;
  ownerStatement: string;
  ownerStatementSha256: string;
  classification: string;
  classificationSha256: string;
  createdAt: string;
};

export type WaitingDirection = {
  path: string;
  content: string;
  metadata: WaitingDirectionMetadata;
};

const UUID = /^[0-9a-f-]{36}$/;
const SHA256 = /^[0-9a-f]{64}$/;
const PHASE = /^[a-z0-9][a-z0-9-]*$/;
const SESSION = /^\d{4}-\d{2}-\d{2}-\d{2}$/;
const FILE = /^\d{2}-wait\.md$/;
const MARKER = /<!-- KODA_WAITING_DIRECTION (\{[^\r\n]*\}) -->/g;

function quoted(value: string): string {
  return value.split(/\r?\n/).map((line) => `> ${line}`).join("\n");
}

async function phaseEntrySha256(sessionDir: string, state: SessionState, index: number): Promise<string> {
  const prompt = await readRegularText(path.join(sessionDir, "session-prompt.md"), "The session prompt");
  const prior = index === 0 ? null : state.advances[index - 1];
  return sha256(JSON.stringify({
    sessionId: state.id,
    phase: state.phases[index]?.name,
    phaseIndex: index,
    phaseEnteredAt: prior?.advancedAt ?? state.createdAt,
    sessionPromptSha256: sha256(prompt),
    priorReviewId: prior?.reviewId ?? null,
    priorReceipt: prior?.receipt ?? null,
    directionIds: index === 0
      ? (state.entryDirections ?? []).map((direction) => direction.id)
      : (prior?.directions ?? []),
  }));
}

function validateMetadata(value: unknown): WaitingDirectionMetadata {
  if (!value || typeof value !== "object") throw new Error("Waiting direction metadata must be a JSON object.");
  const metadata = value as Partial<WaitingDirectionMetadata>;
  if (
    metadata.version !== 1 ||
    typeof metadata.id !== "string" || !UUID.test(metadata.id) ||
    metadata.verb !== "wait" ||
    (metadata.source !== "owner-via-reviewer" && metadata.source !== "owner-via-guide") ||
    typeof metadata.sessionId !== "string" || !SESSION.test(metadata.sessionId) ||
    typeof metadata.phase !== "string" || !PHASE.test(metadata.phase) ||
    !Number.isInteger(metadata.phaseIndex) || metadata.phaseIndex! < 0 ||
    typeof metadata.phaseEnteredAt !== "string" || Number.isNaN(Date.parse(metadata.phaseEnteredAt)) ||
    typeof metadata.phaseEntrySha256 !== "string" || !SHA256.test(metadata.phaseEntrySha256) ||
    (metadata.artifactState !== "ABSENT" && metadata.artifactState !== "PRESENT") ||
    !(
      (metadata.artifactState === "ABSENT" && metadata.artifactSha256 === null) ||
      (metadata.artifactState === "PRESENT" && typeof metadata.artifactSha256 === "string" && SHA256.test(metadata.artifactSha256))
    ) ||
    !(metadata.reviewSha256 === null || (typeof metadata.reviewSha256 === "string" && SHA256.test(metadata.reviewSha256))) ||
    typeof metadata.ownerStatement !== "string" || metadata.ownerStatement.trim() === "" ||
    typeof metadata.ownerStatementSha256 !== "string" || metadata.ownerStatementSha256 !== sha256(metadata.ownerStatement) ||
    typeof metadata.classification !== "string" || !metadata.classification.startsWith(WAITING_DIRECTION_PREFIX) ||
    typeof metadata.classificationSha256 !== "string" || metadata.classificationSha256 !== sha256(metadata.classification) ||
    typeof metadata.createdAt !== "string" || Number.isNaN(Date.parse(metadata.createdAt))
  ) {
    throw new Error("Waiting direction metadata has invalid or inconsistent fields.");
  }
  return metadata as WaitingDirectionMetadata;
}

export function parseWaitingDirection(content: string): WaitingDirectionMetadata {
  const markers = [...content.matchAll(MARKER)];
  if (markers.length !== 1) throw new Error("Waiting direction must contain exactly one generated KODA_WAITING_DIRECTION marker.");
  let value: unknown;
  try {
    value = JSON.parse(markers[0][1]);
  } catch {
    throw new Error("Waiting direction metadata is not valid JSON.");
  }
  const metadata = validateMetadata(value);
  const expected = [
    "## Owner direction (verbatim)",
    "",
    quoted(metadata.ownerStatement),
    "",
    "## Classification",
    "",
    metadata.classification,
    "",
    "## Boundary obligation",
  ].join("\n");
  if (!content.includes("# Waiting direction\n") || !content.includes(expected)) {
    throw new Error("Waiting direction is incomplete.");
  }
  return metadata;
}

async function ensureDirectionDirectory(sessionDir: string): Promise<string> {
  const directory = path.join(sessionDir, "directions");
  const resolvedSession = await realpath(sessionDir);
  if (await pathExists(directory)) {
    if (!(await lstat(directory)).isDirectory()) throw new Error("Waiting direction root must be a real directory inside the active session.");
  } else {
    await mkdir(directory);
  }
  const resolved = await realpath(directory);
  if (!resolved.startsWith(`${resolvedSession}${path.sep}`)) {
    throw new Error("Waiting direction root resolves outside the active session.");
  }
  return directory;
}

export async function createWaitingDirection(input: {
  sessionDir: string;
  state: SessionState;
  source: DirectionSource;
  ownerStatement: string;
  classification: string;
}): Promise<WaitingDirection> {
  const active = currentPhase(input.state);
  if (!active) throw new Error("No active phase can receive a waiting direction.");
  const ownerStatement = input.ownerStatement.trim();
  const classification = input.classification.trim();
  if (!ownerStatement) throw new Error("An empty owner statement cannot become waiting direction.");
  if (!classification.startsWith(WAITING_DIRECTION_PREFIX)) {
    throw new Error("The conversation was not classified as direction that must wait for the gate.");
  }

  const artifact = artifactPath(input.sessionDir, active.phase, active.index);
  const review = reviewPath(input.sessionDir, active.phase, active.index);
  let artifactContent: string | null = null;
  let reviewContent: string | null = null;
  if (await pathExists(artifact)) artifactContent = await readRegularText(artifact, "The current phase artifact");
  if (await pathExists(review)) reviewContent = await readRegularText(review, "The current peer review");

  const directory = await ensureDirectionDirectory(input.sessionDir);
  const existing = (await readdir(directory)).filter((name) => FILE.test(name)).sort();
  if ((await readdir(directory)).some((name) => !FILE.test(name))) {
    throw new Error("Waiting direction root contains an unexpected entry.");
  }
  const sequence = Number(existing.at(-1)?.slice(0, 2) ?? "0") + 1;
  if (sequence > 99) throw new Error("No waiting direction numbers remain in this session.");

  const prior = active.index === 0 ? null : input.state.advances[active.index - 1];
  const metadata: WaitingDirectionMetadata = {
    version: 1,
    id: randomUUID(),
    verb: "wait",
    source: input.source,
    sessionId: input.state.id,
    phase: active.phase.name,
    phaseIndex: active.index,
    phaseEnteredAt: prior?.advancedAt ?? input.state.createdAt,
    phaseEntrySha256: await phaseEntrySha256(input.sessionDir, input.state, active.index),
    artifactState: artifactContent === null ? "ABSENT" : "PRESENT",
    artifactSha256: artifactContent === null ? null : sha256(artifactContent),
    reviewSha256: reviewContent === null ? null : sha256(reviewContent),
    ownerStatement,
    ownerStatementSha256: sha256(ownerStatement),
    classification,
    classificationSha256: sha256(classification),
    createdAt: new Date().toISOString(),
  };
  const file = path.join(directory, `${String(sequence).padStart(2, "0")}-wait.md`);
  const content = [
    `<!-- ${WAITING_DIRECTION_MARKER} ${JSON.stringify(metadata)} -->`,
    "",
    "# Waiting direction",
    "",
    `- Direction ID: \`${metadata.id}\``,
    `- Source: ${metadata.source}`,
    `- Recorded during: ${phasePrefix(active.index)}-${active.phase.name}`,
    `- Frozen phase-entry SHA-256: \`${metadata.phaseEntrySha256}\``,
    `- Artifact at receipt: ${metadata.artifactState}${metadata.artifactSha256 ? ` — \`${metadata.artifactSha256}\`` : ""}`,
    `- Review at receipt: ${metadata.reviewSha256 ? `\`${metadata.reviewSha256}\`` : "ABSENT"}`,
    "- Release: next successful gate only",
    "",
    "## Owner direction (verbatim)",
    "",
    quoted(ownerStatement),
    "",
    "## Classification",
    "",
    classification,
    "",
    "## Boundary obligation",
    "",
    "Do not use this direction in the active phase. Koda releases its ID through the next successful advancement record; the receiving phase must read and cite this file.",
    "",
  ].join("\n");
  await writeTextAtomic(file, content);
  return { path: file, content, metadata };
}

export async function readWaitingDirections(sessionDir: string): Promise<WaitingDirection[]> {
  const directory = path.join(sessionDir, "directions");
  if (!(await pathExists(directory))) return [];
  if (!(await lstat(directory)).isDirectory()) throw new Error("Waiting direction root must be a real directory.");
  const [resolvedSession, resolvedDirectory] = await Promise.all([realpath(sessionDir), realpath(directory)]);
  if (!resolvedDirectory.startsWith(`${resolvedSession}${path.sep}`)) {
    throw new Error("Waiting direction root resolves outside the active session.");
  }
  const results: WaitingDirection[] = [];
  for (const name of (await readdir(directory)).sort()) {
    if (!FILE.test(name)) throw new Error(`Unexpected waiting direction entry: ${name}.`);
    const file = path.join(directory, name);
    if (!(await lstat(file)).isFile()) throw new Error(`Waiting direction must be a regular file: ${file}.`);
    const content = await readFile(file, "utf8");
    const metadata = parseWaitingDirection(content);
    results.push({ path: file, content, metadata });
  }
  return results;
}

function appliedDirectionIds(state: SessionState): Set<string> {
  return new Set(state.advances.flatMap((advance) => advance.directions ?? []));
}

export async function pendingDirectionsForActivePhase(
  sessionDir: string,
  state: SessionState,
): Promise<WaitingDirection[]> {
  const active = currentPhase(state);
  if (!active) return [];
  const entryHash = await phaseEntrySha256(sessionDir, state, active.index);
  const applied = appliedDirectionIds(state);
  return (await readWaitingDirections(sessionDir)).filter((direction) => {
    const metadata = direction.metadata;
    return metadata.sessionId === state.id &&
      metadata.phase === active.phase.name &&
      metadata.phaseIndex === active.index &&
      metadata.phaseEntrySha256 === entryHash &&
      !applied.has(metadata.id);
  });
}

async function directionByReference(
  sessionsRoot: string,
  reference: DirectionReference,
): Promise<WaitingDirection> {
  const sourceSession = path.join(sessionsRoot, reference.sessionId);
  const directions = await readWaitingDirections(sourceSession);
  const direction = directions.find((candidate) => candidate.metadata.id === reference.id);
  if (!direction) throw new Error(`Required waiting direction ${reference.id} is missing.`);
  if (sha256(direction.content) !== reference.sha256) throw new Error(`Required waiting direction ${reference.id} changed after release.`);
  return direction;
}

export async function requiredDirectionsForPhase(
  sessionDir: string,
  state: SessionState,
  index: number,
): Promise<WaitingDirection[]> {
  if (index === 0) {
    const sessionsRoot = path.dirname(sessionDir);
    return Promise.all((state.entryDirections ?? []).map((reference) => directionByReference(sessionsRoot, reference)));
  }
  const ids = state.advances[index - 1]?.directions ?? [];
  if (ids.length === 0) return [];
  const directions = await readWaitingDirections(sessionDir);
  return ids.map((id) => {
    const direction = directions.find((candidate) => candidate.metadata.id === id);
    if (!direction) throw new Error(`Required waiting direction ${id} is missing.`);
    return direction;
  });
}

export async function carryDirectionsForNextSession(
  sessionDir: string,
  state: SessionState,
): Promise<DirectionReference[]> {
  const ids = state.advances.at(-1)?.directions ?? [];
  if (ids.length === 0) return [];
  const directions = await readWaitingDirections(sessionDir);
  return ids.map((id) => {
    const direction = directions.find((candidate) => candidate.metadata.id === id);
    if (!direction) throw new Error(`Final waiting direction ${id} is missing before the next session.`);
    return { id, sessionId: state.id, sha256: sha256(direction.content) };
  });
}

export async function carryPendingDirectionsAfterHalt(
  sessionDir: string,
  state: SessionState,
): Promise<DirectionReference[]> {
  const directions = await pendingDirectionsForActivePhase(sessionDir, state);
  return directions.map((direction) => ({
    id: direction.metadata.id,
    sessionId: state.id,
    sha256: sha256(direction.content),
  }));
}
