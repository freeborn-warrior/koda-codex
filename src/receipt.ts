import { createHash, randomUUID } from "node:crypto";
import { mkdir, readFile, readdir, rename } from "node:fs/promises";
import path from "node:path";

import { pathExists } from "./config.ts";
import { artifactPath, ledgerPath, nowIso, reviewPath, writeTextAtomic } from "./project.ts";
import { VERDICTS } from "./types.ts";
import type {
  ApprovalEntry,
  ParsedReview,
  PhaseConfig,
  ReviewMetadata,
  Verdict,
} from "./types.ts";

const REVIEW_MARKER = "KODA_REVIEW";
const APPROVAL_MARKER = "KODA_APPROVAL";

export function sha256(content: string): string {
  return createHash("sha256").update(content, "utf8").digest("hex");
}

export function generateReceipt(): { id: string; receipt: string } {
  const id = randomUUID();
  return { id, receipt: `RECEIPT: Review read — ${id}` };
}

export function parseReview(content: string): ParsedReview {
  const normalized = content.replace(/\r\n/g, "\n");
  const lines = normalized.split("\n");
  const first = lines[0] ?? "";
  const verdictMatch = /^VERDICT: (.+)$/.exec(first);
  const verdictText = verdictMatch?.[1] ?? null;
  const verdict = verdictText && (VERDICTS as readonly string[]).includes(verdictText)
    ? verdictText as Verdict
    : null;

  const withoutTrailingWhitespace = normalized.trimEnd();
  const lastLine = withoutTrailingWhitespace.split("\n").at(-1)?.trim() ?? "";
  const receipt = /^RECEIPT: .+/.test(lastLine) ? lastLine : null;

  let metadata: ReviewMetadata | null = null;
  const markerLine = lines.find((line) => line.startsWith(`<!-- ${REVIEW_MARKER} `) && line.endsWith(" -->"));
  if (markerLine) {
    try {
      const raw = markerLine.slice(`<!-- ${REVIEW_MARKER} `.length, -" -->".length);
      const candidate = JSON.parse(raw) as Partial<ReviewMetadata>;
      if (
        candidate.version === 1 &&
        typeof candidate.id === "string" &&
        typeof candidate.phase === "string" &&
        typeof candidate.artifactSha256 === "string" &&
        typeof candidate.receipt === "string" &&
        typeof candidate.createdAt === "string"
      ) {
        metadata = candidate as ReviewMetadata;
      }
    } catch {
      metadata = null;
    }
  }

  return { verdict, verdictText, receipt, metadata };
}

export interface CreateReviewOptions {
  verdict?: Verdict;
  body?: string;
}

export async function createFreshReview(
  sessionDir: string,
  phase: PhaseConfig,
  index: number,
  options: CreateReviewOptions = {},
): Promise<{ filePath: string; archivedPath: string | null; metadata: ReviewMetadata }> {
  const phaseArtifact = artifactPath(sessionDir, phase, index);
  if (!(await pathExists(phaseArtifact))) {
    throw new Error(`Artifact missing: ${phaseArtifact}`);
  }
  const artifact = await readFile(phaseArtifact, "utf8");
  if (artifact.trim() === "") {
    throw new Error(`Artifact is empty: ${phaseArtifact}`);
  }

  const target = reviewPath(sessionDir, phase, index);
  let archivedPath: string | null = null;
  if (await pathExists(target)) {
    const existing = parseReview(await readFile(target, "utf8"));
    if (!existing.verdict || !existing.receipt || !existing.metadata) {
      throw new Error("The current review is incomplete or damaged. Repair it before requesting a fresh review.");
    }
    const approvals = await readApprovalEntries(sessionDir);
    const acknowledgement = approvals.findLast((entry) =>
      entry.phase === phase.name &&
      entry.reviewId === existing.metadata!.id &&
      entry.receipt.trim() === existing.receipt!.trim()
    );
    if (!acknowledgement) {
      throw new Error("Record the current review's exact receipt before requesting a fresh review.");
    }
    if (existing.verdict === "DISCUSS" && !acknowledgement.ruling?.trim()) {
      throw new Error("Record the owner's DISCUSS ruling before requesting a fresh review.");
    }
    const archiveId = existing.metadata?.id ?? randomUUID();
    const historyDir = path.join(sessionDir, "reviews", "history");
    await mkdir(historyDir, { recursive: true });
    archivedPath = path.join(historyDir, `${path.basename(target, ".md")}-${archiveId}.md`);
    await rename(target, archivedPath);
  }

  const generated = generateReceipt();
  const metadata: ReviewMetadata = {
    version: 1,
    id: generated.id,
    phase: phase.name,
    artifactSha256: sha256(artifact),
    receipt: generated.receipt,
    createdAt: nowIso(),
  };
  const body = options.body?.trim() || [
    `# Peer review — ${phase.name}`,
    "",
    "Verify the artifact against the files it cites. Replace this guidance with findings.",
    "",
    "## Findings",
    "",
    "- Record what the files prove.",
    "",
    "## Owner question(s)",
    "",
    "- Required only when the verdict is DISCUSS.",
  ].join("\n");
  const content = [
    `VERDICT: ${options.verdict ?? "DISCUSS"}`,
    "",
    `<!-- ${REVIEW_MARKER} ${JSON.stringify(metadata)} -->`,
    "",
    body,
    "",
    generated.receipt,
    "",
  ].join("\n");
  await writeTextAtomic(target, content);

  return { filePath: target, archivedPath, metadata };
}

async function reviewFiles(directory: string): Promise<string[]> {
  if (!(await pathExists(directory))) return [];
  const found: string[] = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const candidate = path.join(directory, entry.name);
    if (entry.isDirectory()) found.push(...await reviewFiles(candidate));
    if (entry.isFile() && entry.name.endsWith(".md")) found.push(candidate);
  }
  return found;
}

export async function receiptOccurrenceCount(sessionDir: string, receipt: string): Promise<number> {
  let count = 0;
  for (const file of await reviewFiles(path.join(sessionDir, "reviews"))) {
    const parsed = parseReview(await readFile(file, "utf8"));
    if (parsed.receipt === receipt || parsed.metadata?.receipt === receipt) count += 1;
  }
  return count;
}

export async function reviewSha256(sessionDir: string, phase: PhaseConfig, index: number): Promise<string> {
  return sha256(await readFile(reviewPath(sessionDir, phase, index), "utf8"));
}

export function parseApprovalEntries(content: string): ApprovalEntry[] {
  return parseApprovalLedger(content).entries;
}

export interface ParsedApprovalLedger {
  entries: ApprovalEntry[];
  invalidMarkers: number;
}

export function parseApprovalLedger(content: string): ParsedApprovalLedger {
  const entries: ApprovalEntry[] = [];
  let invalidMarkers = 0;
  const prefix = `<!-- ${APPROVAL_MARKER} `;
  for (const line of content.replace(/\r\n/g, "\n").split("\n")) {
    if (!line.startsWith(`<!-- ${APPROVAL_MARKER}`)) continue;
    if (!line.startsWith(prefix) || !line.endsWith(" -->")) {
      invalidMarkers += 1;
      continue;
    }
    try {
      const candidate = JSON.parse(line.slice(prefix.length, -" -->".length)) as Partial<ApprovalEntry>;
      if (
        candidate.version === 1 &&
        typeof candidate.phase === "string" &&
        typeof candidate.reviewId === "string" &&
        typeof candidate.reviewSha256 === "string" &&
        typeof candidate.receipt === "string" &&
        typeof candidate.approver === "string" &&
        typeof candidate.recordedAt === "string" &&
        typeof candidate.verdict === "string" &&
        (VERDICTS as readonly string[]).includes(candidate.verdict)
      ) {
        entries.push(candidate as ApprovalEntry);
      } else {
        invalidMarkers += 1;
      }
    } catch {
      invalidMarkers += 1;
    }
  }
  return { entries, invalidMarkers };
}

export async function readApprovalEntries(sessionDir: string): Promise<ApprovalEntry[]> {
  return (await readApprovalLedger(sessionDir)).entries;
}

export async function readApprovalLedger(sessionDir: string): Promise<ParsedApprovalLedger> {
  const file = ledgerPath(sessionDir);
  if (!(await pathExists(file))) return { entries: [], invalidMarkers: 0 };
  return parseApprovalLedger(await readFile(file, "utf8"));
}

function humanLine(value: string | null): string {
  return value ? value.replace(/\s+/g, " ").trim() : "—";
}

export async function recordApproval(sessionDir: string, entry: ApprovalEntry): Promise<void> {
  const file = ledgerPath(sessionDir);
  const ledger = await readFile(file, "utf8");
  const existing = parseApprovalEntries(ledger);
  const duplicate = existing.find((item) => item.reviewId === entry.reviewId && item.receipt === entry.receipt);
  if (duplicate && duplicate.reviewSha256 !== entry.reviewSha256) {
    throw new Error("The review changed after this receipt was recorded. Create a fresh review and receipt.");
  }
  if (duplicate) {
    return;
  }

  const block = [
    "",
    `## ${entry.phase} — ${entry.recordedAt}`,
    "",
    `- Verdict: ${entry.verdict}`,
    `- Approver: ${humanLine(entry.approver)}`,
    `- Receipt: ${entry.receipt}`,
    `- Review SHA-256: ${entry.reviewSha256}`,
    `- Comments: ${humanLine(entry.comments)}`,
    `- Owner ruling: ${humanLine(entry.ruling)}`,
    "",
    `<!-- ${APPROVAL_MARKER} ${JSON.stringify(entry)} -->`,
    "",
  ].join("\n");
  await writeTextAtomic(file, `${ledger.trimEnd()}${block}`);
}
