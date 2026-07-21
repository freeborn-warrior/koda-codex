import { randomUUID } from "node:crypto";
import path from "node:path";

import { sessionDigest } from "./close.ts";
import { pathExists } from "./config.ts";
import { checkGitClosure } from "./git.ts";
import { currentPhase, nowIso, readRegularText, writeTextAtomic } from "./project.ts";
import { sha256 } from "./receipt.ts";
import type { HaltMetadata, SessionState } from "./types.ts";

const HALT_MARKER = "KODA_HALT";
export const HALT_REQUEST_PREFIX = "OWNER DIRECTION — HALT REQUESTED";

export function isExplicitOwnerHaltRequest(input: string): boolean {
  const value = input.trim();
  return /^\/halt(?:\s|$)/i.test(value) || /^halt this session(?:[.!?:]|\s|$)/i.test(value);
}

export function haltPath(sessionDir: string): string {
  return path.join(sessionDir, "halt.md");
}

function quoted(value: string): string {
  return value.split(/\r?\n/).map((line) => `> ${line}`).join("\n");
}

export function parseHaltArtifact(content: string): HaltMetadata | null {
  const prefix = `<!-- ${HALT_MARKER} `;
  const markerLines = content.replace(/\r\n/g, "\n").split("\n")
    .filter((candidate) => candidate.startsWith(`<!-- ${HALT_MARKER}`));
  if (markerLines.length !== 1) return null;
  const line = markerLines[0];
  if (!line.startsWith(prefix) || !line.endsWith(" -->")) return null;
  try {
    const candidate = JSON.parse(line.slice(prefix.length, -" -->".length)) as Partial<HaltMetadata>;
    if (
      candidate.version === 1 &&
      typeof candidate.id === "string" && /^[0-9a-f-]{36}$/.test(candidate.id) &&
      typeof candidate.sessionId === "string" &&
      typeof candidate.sessionSha256 === "string" && /^[0-9a-f]{64}$/.test(candidate.sessionSha256) &&
      typeof candidate.phase === "string" &&
      Number.isInteger(candidate.phaseIndex) && candidate.phaseIndex! >= 0 &&
      typeof candidate.ownerDirection === "string" && candidate.ownerDirection.trim() !== "" &&
      typeof candidate.ownerDirectionSha256 === "string" && candidate.ownerDirectionSha256 === sha256(candidate.ownerDirection) &&
      typeof candidate.preparedAt === "string" && !Number.isNaN(Date.parse(candidate.preparedAt))
    ) return candidate as HaltMetadata;
  } catch {
    return null;
  }
  return null;
}

export async function prepareHaltArtifact(
  sessionDir: string,
  state: SessionState,
  ownerDirectionInput: string,
): Promise<string> {
  const active = currentPhase(state);
  if (!active) throw new Error("A completed phase chain cannot be halted; use the close ceremony.");
  const ownerDirection = ownerDirectionInput.trim();
  if (!ownerDirection) throw new Error("Session halt requires non-empty owner direction for the fresh Brief.");
  const target = haltPath(sessionDir);
  if (await pathExists(target)) throw new Error("halt.md already exists and is immutable.");
  if (await pathExists(path.join(sessionDir, "close.md"))) throw new Error("A session with close.md cannot be halted.");
  const metadata: HaltMetadata = {
    version: 1,
    id: randomUUID(),
    sessionId: state.id,
    sessionSha256: await sessionDigest(sessionDir),
    phase: active.phase.name,
    phaseIndex: active.index,
    ownerDirection,
    ownerDirectionSha256: sha256(ownerDirection),
    preparedAt: nowIso(),
  };
  const content = [
    `# Session halt — ${state.id}`,
    "",
    `<!-- ${HALT_MARKER} ${JSON.stringify(metadata)} -->`,
    "",
    "This immutable artifact terminates the active session attempt without advancing its in-flight phase.",
    "No partial artifact, review, or approval from that phase counts as gated work.",
    "The halt becomes official only when this file and every bound session file are committed and pushed.",
    "A later session must start from a fresh Brief whose owner prompt cites this halt ID and direction.",
    "",
    `- Halt ID: \`${metadata.id}\``,
    `- Voided phase: ${metadata.phase} (${metadata.phaseIndex + 1})`,
    `- Bound session SHA-256: \`${metadata.sessionSha256}\``,
    `- Prepared at: ${metadata.preparedAt}`,
    "",
    "## Owner direction for the fresh Brief",
    "",
    quoted(ownerDirection),
    "",
  ].join("\n");
  await writeTextAtomic(target, content);
  return target;
}

export async function evaluateSessionHalt(
  projectRoot: string,
  sessionDir: string,
  state: SessionState,
): Promise<{ exists: boolean; halted: boolean; reasons: string[]; metadata: HaltMetadata | null }> {
  const file = haltPath(sessionDir);
  if (!(await pathExists(file))) return { exists: false, halted: false, reasons: [], metadata: null };
  const reasons: string[] = [];
  let content: string;
  try {
    content = await readRegularText(file, "halt.md");
  } catch (error) {
    return { exists: true, halted: false, reasons: [error instanceof Error ? error.message : String(error)], metadata: null };
  }
  const metadata = parseHaltArtifact(content);
  const active = currentPhase(state);
  if (await pathExists(path.join(sessionDir, "close.md"))) {
    reasons.push("halt.md and close.md cannot coexist; session terminal state is ambiguous.");
  }
  if (!metadata) {
    reasons.push("halt.md has missing or invalid generated metadata.");
  } else {
    if (!active || metadata.sessionId !== state.id || metadata.phase !== active.phase.name || metadata.phaseIndex !== active.index) {
      reasons.push("halt.md does not match the active session phase.");
    }
    if (metadata.sessionSha256 !== await sessionDigest(sessionDir)) {
      reasons.push("Session files changed after halt.md was prepared.");
    }
    if (!content.includes(quoted(metadata.ownerDirection))) {
      reasons.push("halt.md does not preserve the exact owner direction.");
    }
  }
  reasons.push(...checkGitClosure(projectRoot, sessionDir, true).reasons);
  return { exists: true, halted: reasons.length === 0, reasons, metadata };
}
