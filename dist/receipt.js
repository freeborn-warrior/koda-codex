import { createHash, randomUUID } from "node:crypto";
import { mkdir, readdir, rename } from "node:fs/promises";
import path from "node:path";

import { pathExists } from "./config.js";
import { artifactPath, ledgerPath, nowIso, readRegularText, reviewPath, writeTextAtomic } from "./project.js";
import { VERDICTS } from "./types.js";








const REVIEW_MARKER = "KODA_REVIEW";
const APPROVAL_MARKER = "KODA_APPROVAL";

export function sha256(content                                 )         {
  return typeof content === "string"
    ? createHash("sha256").update(content, "utf8").digest("hex")
    : createHash("sha256").update(content).digest("hex");
}

export function generateReceipt()                                  {
  const id = randomUUID();
  return { id, receipt: `RECEIPT: Review read — ${id}` };
}

export function parseReview(content        )               {
  const normalized = content.replace(/\r\n/g, "\n");
  const lines = normalized.split("\n");
  const first = lines[0] ?? "";
  const verdictMatch = /^VERDICT: (.+)$/.exec(first);
  const verdictText = verdictMatch?.[1] ?? null;
  const verdict = verdictText && (VERDICTS                     ).includes(verdictText)
    ? verdictText
    : null;

  const withoutTrailingWhitespace = normalized.trimEnd();
  const lastLine = withoutTrailingWhitespace.split("\n").at(-1)?.trim() ?? "";
  const receipt = /^RECEIPT: .+/.test(lastLine) ? lastLine : null;

  let metadata                        = null;
  const markerLines = lines.filter((line) => line.startsWith(`<!-- ${REVIEW_MARKER}`));
  const markerLine = markerLines.length === 1 ? markerLines[0] : null;
  if (markerLine?.startsWith(`<!-- ${REVIEW_MARKER} `) && markerLine.endsWith(" -->")) {
    try {
      const raw = markerLine.slice(`<!-- ${REVIEW_MARKER} `.length, -" -->".length);
      const candidate = JSON.parse(raw)                           ;
      if (
        candidate.version === 1 &&
        typeof candidate.id === "string" &&
        typeof candidate.phase === "string" &&
        typeof candidate.artifactSha256 === "string" &&
        typeof candidate.receipt === "string" &&
        typeof candidate.createdAt === "string"
      ) {
        metadata = candidate                  ;
      }
    } catch {
      metadata = null;
    }
  }

  return { verdict, verdictText, receipt, metadata };
}






export async function createFreshReview(
  sessionDir        ,
  phase             ,
  index        ,
  options                      = {},
)                                                                                       {
  const phaseArtifact = artifactPath(sessionDir, phase, index);
  if (!(await pathExists(phaseArtifact))) {
    throw new Error(`Artifact missing: ${phaseArtifact}`);
  }
  const artifact = await readRegularText(phaseArtifact, "Phase artifact");
  if (artifact.trim() === "") {
    throw new Error(`Artifact is empty: ${phaseArtifact}`);
  }

  const target = reviewPath(sessionDir, phase, index);
  let archivedPath                = null;
  if (await pathExists(target)) {
    const existing = parseReview(await readRegularText(target, "Current review"));
    if (!existing.verdict || !existing.receipt || !existing.metadata) {
      throw new Error("The current review is incomplete or damaged. Repair it before requesting a fresh review.");
    }
    const approvals = await readApprovalEntries(sessionDir);
    const acknowledgement = approvals.findLast((entry) =>
      entry.phase === phase.name &&
      entry.reviewId === existing.metadata .id &&
      entry.receipt.trim() === existing.receipt .trim()
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
  const metadata                 = {
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

async function reviewFiles(directory        )                    {
  if (!(await pathExists(directory))) return [];
  const found           = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const candidate = path.join(directory, entry.name);
    if (entry.isDirectory()) found.push(...await reviewFiles(candidate));
    if (entry.isFile() && entry.name.endsWith(".md")) found.push(candidate);
  }
  return found;
}

export async function receiptOccurrenceCount(sessionDir        , receipt        )                  {
  let count = 0;
  for (const file of await reviewFiles(path.join(sessionDir, "reviews"))) {
    const parsed = parseReview(await readRegularText(file, "Review evidence"));
    if (parsed.receipt === receipt || parsed.metadata?.receipt === receipt) count += 1;
  }
  return count;
}

export async function reviewSha256(sessionDir        , phase             , index        )                  {
  return sha256(await readRegularText(reviewPath(sessionDir, phase, index), "Current review"));
}

export function parseApprovalEntries(content        )                  {
  return parseApprovalLedger(content).entries;
}






export function parseApprovalLedger(content        )                       {
  const entries                  = [];
  let invalidMarkers = 0;
  const prefix = `<!-- ${APPROVAL_MARKER} `;
  for (const line of content.replace(/\r\n/g, "\n").split("\n")) {
    if (!line.startsWith(`<!-- ${APPROVAL_MARKER}`)) continue;
    if (!line.startsWith(prefix) || !line.endsWith(" -->")) {
      invalidMarkers += 1;
      continue;
    }
    try {
      const candidate = JSON.parse(line.slice(prefix.length, -" -->".length))                          ;
      if (
        candidate.version === 1 &&
        typeof candidate.phase === "string" &&
        typeof candidate.reviewId === "string" &&
        typeof candidate.reviewSha256 === "string" &&
        typeof candidate.receipt === "string" &&
        typeof candidate.approver === "string" &&
        typeof candidate.recordedAt === "string" &&
        typeof candidate.verdict === "string" &&
        (VERDICTS                     ).includes(candidate.verdict)
      ) {
        entries.push(candidate                 );
      } else {
        invalidMarkers += 1;
      }
    } catch {
      invalidMarkers += 1;
    }
  }
  return { entries, invalidMarkers };
}

export async function readApprovalEntries(sessionDir        )                           {
  return (await readApprovalLedger(sessionDir)).entries;
}

export async function readApprovalLedger(sessionDir        )                                {
  const file = ledgerPath(sessionDir);
  if (!(await pathExists(file))) return { entries: [], invalidMarkers: 0 };
  return parseApprovalLedger(await readRegularText(file, "Approval ledger"));
}

function humanLine(value               )         {
  return value ? value.replace(/\s+/g, " ").trim() : "—";
}

export async function recordApproval(sessionDir        , entry               )                {
  const file = ledgerPath(sessionDir);
  const ledger = await readRegularText(file, "Approval ledger");
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


//# sourceURL=/Users/freeborn/Dev/koda-codex/src/receipt.ts