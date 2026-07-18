import { randomUUID } from "node:crypto";
import { lstat, mkdir, readFile, readdir, realpath } from "node:fs/promises";
import path from "node:path";

import { pathExists } from "../src/config.ts";
import { phasePrefix, writeTextAtomic } from "../src/project.ts";
import { parseReview, readApprovalEntries, sha256 } from "../src/receipt.ts";

export const OWNER_HANDBACK_MARKER = "KODA_OWNER_HANDBACK";

export type OwnerHandbackMetadata = {
  version: 1;
  id: string;
  phase: string;
  artifactSha256: string;
  reviewId: string;
  reviewSha256: string;
  ownerStatement: string;
  ownerStatementSha256: string;
  reviewerRelay: string;
  reviewerRelaySha256: string;
  createdAt: string;
};

export type OwnerHandback = {
  path: string;
  content: string;
  metadata: OwnerHandbackMetadata;
};

const UUID = /^[0-9a-f-]{36}$/;
const SHA256 = /^[0-9a-f]{64}$/;
const PHASE = /^[a-z0-9][a-z0-9-]*$/;
const MARKER = /<!-- KODA_OWNER_HANDBACK (\{[^\r\n]*\}) -->/g;

function validateMetadata(value: unknown): OwnerHandbackMetadata {
  if (!value || typeof value !== "object") throw new Error("Owner handback metadata must be a JSON object.");
  const metadata = value as Partial<OwnerHandbackMetadata>;
  if (
    metadata.version !== 1 ||
    typeof metadata.id !== "string" || !UUID.test(metadata.id) ||
    typeof metadata.phase !== "string" || !PHASE.test(metadata.phase) ||
    typeof metadata.artifactSha256 !== "string" || !SHA256.test(metadata.artifactSha256) ||
    typeof metadata.reviewId !== "string" || !UUID.test(metadata.reviewId) ||
    typeof metadata.reviewSha256 !== "string" || !SHA256.test(metadata.reviewSha256) ||
    typeof metadata.ownerStatement !== "string" || metadata.ownerStatement.trim() === "" ||
    typeof metadata.ownerStatementSha256 !== "string" || !SHA256.test(metadata.ownerStatementSha256) ||
    metadata.ownerStatementSha256 !== sha256(metadata.ownerStatement) ||
    typeof metadata.reviewerRelay !== "string" || !metadata.reviewerRelay.startsWith("OWNER DIRECTION — DISK HANDOFF REQUIRED") ||
    typeof metadata.reviewerRelaySha256 !== "string" || !SHA256.test(metadata.reviewerRelaySha256) ||
    metadata.reviewerRelaySha256 !== sha256(metadata.reviewerRelay) ||
    typeof metadata.createdAt !== "string" || Number.isNaN(Date.parse(metadata.createdAt))
  ) {
    throw new Error("Owner handback metadata has invalid or inconsistent fields.");
  }
  return metadata as OwnerHandbackMetadata;
}

export function parseOwnerHandback(content: string): OwnerHandbackMetadata {
  const markers = [...content.matchAll(MARKER)];
  if (markers.length !== 1) throw new Error("Owner handback must contain exactly one generated KODA_OWNER_HANDBACK marker.");
  let value: unknown;
  try {
    value = JSON.parse(markers[0][1]);
  } catch {
    throw new Error("Owner handback metadata is not valid JSON.");
  }
  const metadata = validateMetadata(value);
  const exactRelay = [
    "## Owner direction (verbatim)",
    "",
    quoted(metadata.ownerStatement),
    "",
    "## Reviewer relay",
    "",
    metadata.reviewerRelay,
    "",
    "## Producer obligation",
  ].join("\n");
  if (
    !content.includes(`# Owner direction handback\n`) ||
    !content.includes(exactRelay) ||
    [...content.matchAll(/^## Owner direction \(verbatim\)$/gm)].length !== 1 ||
    [...content.matchAll(/^## Reviewer relay$/gm)].length !== 1 ||
    [...content.matchAll(/^## Producer obligation$/gm)].length !== 1
  ) {
    throw new Error("Owner handback is incomplete.");
  }
  return metadata;
}

function quoted(value: string): string {
  return value.split(/\r?\n/).map((line) => `> ${line}`).join("\n");
}

export async function createOwnerHandback(input: {
  sessionDir: string;
  phase: string;
  phaseIndex: number;
  artifactPath: string;
  reviewPath: string;
  ownerStatement: string;
  reviewerRelay: string;
}): Promise<OwnerHandback> {
  const ownerStatement = input.ownerStatement.trim();
  const reviewerRelay = input.reviewerRelay.trim();
  if (!ownerStatement) throw new Error("An empty owner statement cannot become a producer handback.");
  if (!reviewerRelay.startsWith("OWNER DIRECTION — DISK HANDOFF REQUIRED")) {
    throw new Error("The reviewer did not classify this conversation as owner direction.");
  }
  if (!(await lstat(input.artifactPath)).isFile()) throw new Error("Owner handback artifact binding requires a regular file.");
  if (!(await lstat(input.reviewPath)).isFile()) throw new Error("Owner handback review binding requires a regular file.");
  const [artifact, review] = await Promise.all([
    readFile(input.artifactPath, "utf8"),
    readFile(input.reviewPath, "utf8"),
  ]);
  const parsed = parseReview(review);
  if (!parsed.metadata || parsed.metadata.phase !== input.phase) {
    throw new Error("The active review cannot bind an owner handback for this phase.");
  }
  if (parsed.metadata.artifactSha256 !== sha256(artifact)) {
    throw new Error("The active review is stale; owner direction must be bound after re-review.");
  }

  const handbacksRoot = path.join(input.sessionDir, "owner-handbacks");
  const directory = path.join(handbacksRoot, `${phasePrefix(input.phaseIndex)}-${input.phase}`);
  const resolvedSession = await realpath(input.sessionDir);
  if (await pathExists(handbacksRoot)) {
    if (!(await lstat(handbacksRoot)).isDirectory()) {
      throw new Error("Owner handback root must be a real directory inside the active session.");
    }
  } else {
    await mkdir(handbacksRoot);
  }
  const resolvedRoot = await realpath(handbacksRoot);
  if (!resolvedRoot.startsWith(`${resolvedSession}${path.sep}`)) {
    throw new Error("Owner handback root resolves outside the active session.");
  }
  if (await pathExists(directory)) {
    if (!(await lstat(directory)).isDirectory()) throw new Error("Owner handback phase location must be a real directory.");
  } else {
    await mkdir(directory);
  }
  const resolvedDirectory = await realpath(directory);
  if (!resolvedDirectory.startsWith(`${resolvedSession}${path.sep}`)) {
    throw new Error("Owner handback directory resolves outside the active session.");
  }
  const existing = (await readdir(directory)).filter((name) => /^\d{2}-direction\.md$/.test(name)).sort();
  const sequence = Number(existing.at(-1)?.slice(0, 2) ?? "0") + 1;
  if (sequence > 99) throw new Error(`No owner handback numbers remain for phase ${input.phase}.`);

  const metadata: OwnerHandbackMetadata = {
    version: 1,
    id: randomUUID(),
    phase: input.phase,
    artifactSha256: sha256(artifact),
    reviewId: parsed.metadata.id,
    reviewSha256: sha256(review),
    ownerStatement,
    ownerStatementSha256: sha256(ownerStatement),
    reviewerRelay,
    reviewerRelaySha256: sha256(reviewerRelay),
    createdAt: new Date().toISOString(),
  };
  const file = path.join(directory, `${String(sequence).padStart(2, "0")}-direction.md`);
  const reviewRelative = path.relative(directory, input.reviewPath);
  const content = [
    `<!-- ${OWNER_HANDBACK_MARKER} ${JSON.stringify(metadata)} -->`,
    "",
    "# Owner direction handback",
    "",
    `- Phase: ${input.phase}`,
    `- Active review: [${path.basename(input.reviewPath)}](${reviewRelative})`,
    `- Bound review ID: \`${parsed.metadata.id}\``,
    `- Bound artifact SHA-256: \`${metadata.artifactSha256}\``,
    "- Authority: owner-via-reviewer",
    "",
    "## Owner direction (verbatim)",
    "",
    quoted(ownerStatement),
    "",
    "## Reviewer relay",
    "",
    metadata.reviewerRelay,
    "",
    "## Producer obligation",
    "",
    "Revise the active phase artifact from this direction, cite this handback in that artifact, and stop for a fresh formal review. This handback does not approve or advance the phase.",
    "",
  ].join("\n");
  await writeTextAtomic(file, content);
  return { path: file, content, metadata };
}

export async function readOwnerHandbacks(
  sessionDir: string,
  phase: string,
  phaseIndex: number,
): Promise<OwnerHandback[]> {
  const directory = path.join(sessionDir, "owner-handbacks", `${phasePrefix(phaseIndex)}-${phase}`);
  if (!(await pathExists(directory))) return [];
  const root = path.join(sessionDir, "owner-handbacks");
  if (!(await lstat(root)).isDirectory()) throw new Error("Owner handback root must be a real directory inside the active session.");
  if (!(await lstat(directory)).isDirectory()) throw new Error("Owner handback location must be a directory.");
  const [resolvedSession, resolvedRoot, resolvedDirectory] = await Promise.all([realpath(sessionDir), realpath(root), realpath(directory)]);
  if (!resolvedRoot.startsWith(`${resolvedSession}${path.sep}`)) {
    throw new Error("Owner handback root resolves outside the active session.");
  }
  if (!resolvedDirectory.startsWith(`${resolvedSession}${path.sep}`)) {
    throw new Error("Owner handback directory resolves outside the active session.");
  }
  const results: OwnerHandback[] = [];
  for (const name of (await readdir(directory)).sort()) {
    if (!/^\d{2}-direction\.md$/.test(name)) {
      throw new Error(`Unexpected owner handback entry: ${name}.`);
    }
    const file = path.join(directory, name);
    if (!(await lstat(file)).isFile()) throw new Error(`Owner handback must be a regular file: ${file}.`);
    const content = await readFile(file, "utf8");
    const metadata = parseOwnerHandback(content);
    if (metadata.phase !== phase) throw new Error(`Owner handback ${name} names a different phase.`);
    results.push({ path: file, content, metadata });
  }
  return results;
}

export async function pendingOwnerHandbacks(input: {
  sessionDir: string;
  phase: string;
  phaseIndex: number;
  artifactPath: string;
  reviewPath: string;
}): Promise<OwnerHandback[]> {
  if (!(await lstat(input.artifactPath)).isFile()) throw new Error("Current artifact must be a regular file before owner handbacks can be read.");
  const artifact = await readFile(input.artifactPath, "utf8");
  const artifactHash = sha256(artifact);
  const handbacks = await readOwnerHandbacks(input.sessionDir, input.phase, input.phaseIndex);
  const matching = handbacks.filter((handback) => handback.metadata.artifactSha256 === artifactHash);
  if (matching.length === 0) return [];
  if (!(await lstat(input.reviewPath)).isFile()) throw new Error("Current review must be a regular file before owner handbacks can be read.");
  const review = await readFile(input.reviewPath, "utf8");
  const parsed = parseReview(review);
  const approvals = await readApprovalEntries(input.sessionDir);
  for (const handback of matching) {
    if (
      sha256(review) !== handback.metadata.reviewSha256 ||
      parsed.metadata?.id !== handback.metadata.reviewId
    ) {
      throw new Error(`Owner handback ${path.basename(handback.path)} does not match the current review.`);
    }
  }
  return matching.filter((handback) => approvals.some((approval) =>
    approval.phase === input.phase &&
    approval.reviewId === handback.metadata.reviewId &&
    approval.reviewSha256 === handback.metadata.reviewSha256
  ));
}
