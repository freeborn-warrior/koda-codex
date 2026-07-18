import { createHash, randomUUID } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

import { pathExists } from "./config.js";
import { checkGitClosure } from "./git.js";
import { validateAdvancedHistory } from "./history.js";
import { nowIso, writeTextAtomic } from "./project.js";
                                                              

const CLOSE_MARKER = "KODA_CLOSE";

export function closePath(sessionDir        )         {
  return path.join(sessionDir, "close.md");
}

async function durableSessionFiles(directory        , sessionDir        )                    {
  const files           = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const candidate = path.join(directory, entry.name);
    const relative = path.relative(sessionDir, candidate);
    if (relative === "close.md" || entry.name.includes(".tmp-")) continue;
    if (entry.isDirectory()) files.push(...await durableSessionFiles(candidate, sessionDir));
    if (entry.isFile()) files.push(candidate);
  }
  return files;
}

export async function sessionDigest(sessionDir        )                  {
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

export function parseCloseArtifact(content        )                       {
  const prefix = `<!-- ${CLOSE_MARKER} `;
  const line = content.replace(/\r\n/g, "\n").split("\n")
    .find((candidate) => candidate.startsWith(prefix) && candidate.endsWith(" -->"));
  if (!line) return null;
  try {
    const candidate = JSON.parse(line.slice(prefix.length, -" -->".length))                          ;
    if (
      candidate.version === 1 &&
      typeof candidate.id === "string" &&
      typeof candidate.sessionId === "string" &&
      typeof candidate.sessionSha256 === "string" &&
      typeof candidate.finalPhase === "string" &&
      typeof candidate.finalReviewId === "string" &&
      typeof candidate.finalReceipt === "string" &&
      typeof candidate.preparedAt === "string"
    ) return candidate                 ;
  } catch {
    return null;
  }
  return null;
}

export async function prepareCloseArtifact(sessionDir        , state              )                  {
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
  const finalAdvance = state.advances.at(-1) ;
  const metadata                = {
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
  projectRoot        ,
  sessionDir        ,
  state              ,
)                                                  {
  const reasons           = [];
  const complete = state.currentPhaseIndex === state.phases.length && state.advances.length === state.phases.length;
  if (!complete) return { closed: false, reasons: ["Every declared phase has not advanced."] };

  const historyIssues = await validateAdvancedHistory(sessionDir, state);
  reasons.push(...historyIssues.map((item) => `${item.phase}: ${item.message}`));

  const file = closePath(sessionDir);
  if (!(await pathExists(file))) {
    reasons.push("The immutable close.md artifact has not been prepared.");
    return { closed: false, reasons };
  }
  const metadata = parseCloseArtifact(await readFile(file, "utf8"));
  if (!metadata) {
    reasons.push("close.md has missing or invalid generated metadata.");
  } else {
    const finalAdvance = state.advances.at(-1) ;
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


//# sourceURL=/Users/freeborn/Dev/koda-codex/src/close.ts