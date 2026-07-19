import { createHash, randomUUID } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

import { pathExists } from "./config.ts";
import { checkGitClosure } from "./git.ts";
import { validateAdvancedHistory } from "./history.ts";
import { nowIso, readRegularText, writeTextAtomic } from "./project.ts";
import type { CloseMetadata, SessionState } from "./types.ts";

const CLOSE_MARKER = "KODA_CLOSE";

export function closePath(sessionDir: string): string {
  return path.join(sessionDir, "close.md");
}

async function durableSessionFiles(directory: string, sessionDir: string): Promise<string[]> {
  const files: string[] = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const candidate = path.join(directory, entry.name);
    const relative = path.relative(sessionDir, candidate);
    if (relative === "close.md" || relative === "halt.md") continue;
    if (entry.isDirectory()) files.push(...await durableSessionFiles(candidate, sessionDir));
    if (entry.isFile()) files.push(candidate);
    if (!entry.isDirectory() && !entry.isFile()) {
      throw new Error(`Session evidence must use regular files and directories; refused ${relative}.`);
    }
  }
  return files;
}

export async function sessionDigest(sessionDir: string): Promise<string> {
  const hash = createHash("sha256");
  const files = (await durableSessionFiles(sessionDir, sessionDir))
    .sort((left, right) => path.relative(sessionDir, left).localeCompare(path.relative(sessionDir, right)));
  for (const file of files) {
    const relative = path.relative(sessionDir, file).split(path.sep).join("/");
    const content = await readFile(file);
    hash.update(relative, "utf8");
    hash.update("\0");
    hash.update(content);
    hash.update("\0");
  }
  return hash.digest("hex");
}

export function parseCloseArtifact(content: string): CloseMetadata | null {
  const prefix = `<!-- ${CLOSE_MARKER} `;
  const markerLines = content.replace(/\r\n/g, "\n").split("\n")
    .filter((candidate) => candidate.startsWith(`<!-- ${CLOSE_MARKER}`));
  if (markerLines.length !== 1) return null;
  const line = markerLines[0];
  if (!line.startsWith(prefix) || !line.endsWith(" -->")) return null;
  try {
    const candidate = JSON.parse(line.slice(prefix.length, -" -->".length)) as Partial<CloseMetadata>;
    if (
      candidate.version === 1 &&
      typeof candidate.id === "string" &&
      typeof candidate.sessionId === "string" &&
      typeof candidate.sessionSha256 === "string" &&
      typeof candidate.finalPhase === "string" &&
      typeof candidate.finalReviewId === "string" &&
      typeof candidate.finalReceipt === "string" &&
      typeof candidate.preparedAt === "string"
    ) return candidate as CloseMetadata;
  } catch {
    return null;
  }
  return null;
}

export async function prepareCloseArtifact(sessionDir: string, state: SessionState): Promise<string> {
  if (await pathExists(path.join(sessionDir, "halt.md"))) {
    throw new Error("A session with halt.md cannot be closed.");
  }
  if (state.currentPhaseIndex !== state.phases.length || state.advances.length !== state.phases.length) {
    throw new Error("Every declared phase must advance before close can be prepared.");
  }
  const historyIssues = await validateAdvancedHistory(sessionDir, state);
  if (historyIssues.length) {
    throw new Error(`Advanced phase evidence is invalid:\n- ${historyIssues.map((item) => `${item.phase}: ${item.message}`).join("\n- ")}`);
  }
  const target = closePath(sessionDir);
  if (await pathExists(target)) {
    throw new Error("close.md already exists and is immutable. Revert session changes instead of replacing it.");
  }
  const finalAdvance = state.advances.at(-1)!;
  const metadata: CloseMetadata = {
    version: 1,
    id: randomUUID(),
    sessionId: state.id,
    sessionSha256: await sessionDigest(sessionDir),
    finalPhase: finalAdvance.phase,
    finalReviewId: finalAdvance.reviewId,
    finalReceipt: finalAdvance.receipt,
    preparedAt: nowIso(),
  };
  const content = [
    `# Session close — ${state.id}`,
    "",
    `<!-- ${CLOSE_MARKER} ${JSON.stringify(metadata)} -->`,
    "",
    "This immutable artifact binds the completed session files to the final gated review.",
    "The session becomes closed only when this artifact and the bound files are committed and pushed.",
    "",
    `- Final declared phase: ${metadata.finalPhase}`,
    `- Final review: ${metadata.finalReviewId}`,
    `- Final receipt: ${metadata.finalReceipt}`,
    `- Bound session SHA-256: ${metadata.sessionSha256}`,
    `- Prepared at: ${metadata.preparedAt}`,
    "",
  ].join("\n");
  await writeTextAtomic(target, content);
  return target;
}

export async function evaluateSessionClosure(
  projectRoot: string,
  sessionDir: string,
  state: SessionState,
): Promise<{ closed: boolean; reasons: string[] }> {
  const reasons: string[] = [];
  if (await pathExists(path.join(sessionDir, "halt.md"))) {
    return { closed: false, reasons: ["halt.md and close.md cannot coexist; session terminal state is ambiguous."] };
  }
  const complete = state.currentPhaseIndex === state.phases.length && state.advances.length === state.phases.length;
  if (!complete) return { closed: false, reasons: ["Every declared phase has not advanced."] };

  const historyIssues = await validateAdvancedHistory(sessionDir, state);
  reasons.push(...historyIssues.map((item) => `${item.phase}: ${item.message}`));

  const file = closePath(sessionDir);
  if (!(await pathExists(file))) {
    reasons.push("The immutable close.md artifact has not been prepared.");
    return { closed: false, reasons };
  }
  let closeContent: string;
  try {
    closeContent = await readRegularText(file, "close.md");
  } catch (error) {
    reasons.push(error instanceof Error ? error.message : String(error));
    return { closed: false, reasons };
  }
  const metadata = parseCloseArtifact(closeContent);
  if (!metadata) {
    reasons.push("close.md has missing or invalid generated metadata.");
  } else {
    const finalAdvance = state.advances.at(-1)!;
    if (
      metadata.sessionId !== state.id ||
      metadata.finalPhase !== finalAdvance.phase ||
      metadata.finalReviewId !== finalAdvance.reviewId ||
      metadata.finalReceipt !== finalAdvance.receipt
    ) reasons.push("close.md does not match the completed phase state.");
    if (metadata.sessionSha256 !== await sessionDigest(sessionDir)) {
      reasons.push("Session files changed after close.md was prepared.");
    }
  }

  const git = checkGitClosure(projectRoot, sessionDir, true);
  reasons.push(...git.reasons);
  return { closed: reasons.length === 0, reasons };
}
