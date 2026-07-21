import { lstat, readFile, realpath } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import path from "node:path";

import { readProjectConfig } from "./config.js";
import { evaluateGate } from "./gate.js";
import { currentPhase, loadSessionState, reviewPath, sessionRoot } from "./project.js";







































const CONTEXT_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

export function legacyMultiPartOwnerAcknowledgementError(packageRoot        )         {
  return `Koda-C refused owner acknowledgement after the exact receipt matched: Warning: Detected unsettled top-level await at ${path.join(packageRoot, "src", "cli.ts")}:5\nawait main();\n^`;
}

export function isLegacyMultiPartOwnerAcknowledgementError(error                           , packageRoot        )          {
  if (!error) return false;
  const expected = legacyMultiPartOwnerAcknowledgementError(packageRoot);
  const fileUrlExpected = expected.replace(
    path.join(packageRoot, "src", "cli.ts"),
    pathToFileURL(path.join(packageRoot, "src", "cli.ts")).href,
  );
  return error === expected || error === fileUrlExpected;
}

async function readReviewerState(runRoot        )                                          {
  const file = path.join(runRoot, "REVIEWER-STATE.json");
  const metadata = await lstat(file).catch(() => null);
  if (!metadata || !metadata.isFile() || metadata.isSymbolicLink()) {
    throw new Error("Multi-part acknowledgement recovery refused: Reviewer state is missing or unsafe.");
  }
  try {
    return JSON.parse(await readFile(file, "utf8"))                                  ;
  } catch {
    throw new Error("Multi-part acknowledgement recovery refused: Reviewer state is corrupt.");
  }
}

export async function assertLegacyMultiPartOwnerAcknowledgementRecovery(input






 )                {
  const { packageRoot, runRoot, run, job } = input;
  const project = await realpath(input.project);
  if (
    run.status !== "PAUSED_REVIEWER_FAILURE" ||
    !isLegacyMultiPartOwnerAcknowledgementError(run.lastError, packageRoot) ||
    job.status !== "FAILED" ||
    job.error !== run.lastError ||
    job.completion !== null
  ) {
    throw new Error("Multi-part acknowledgement recovery refused: the saved failure signature or zero-write state changed.");
  }
  if (!run.sessionId) {
    throw new Error("Multi-part acknowledgement recovery refused: the saved runtime has no session identity.");
  }
  if (!CONTEXT_ID.test(run.producer.threadId ?? "") || !CONTEXT_ID.test(run.reviewer.threadId ?? "")) {
    throw new Error("Multi-part acknowledgement recovery refused: both original role context identities are required.");
  }
  if (!["formal", "repair", "fresh"].includes(job.kind)) {
    throw new Error("Multi-part acknowledgement recovery refused: the failed job is not a formal review handover.");
  }
  if (run.lastAction !== `${job.purpose} in Window B`) {
    throw new Error("Multi-part acknowledgement recovery refused: the runtime action no longer matches the Reviewer job.");
  }

  const reviewerState = input.reviewerState ?? await readReviewerState(runRoot);
  if (reviewerState.currentJobId !== job.id) {
    throw new Error("Multi-part acknowledgement recovery refused: Reviewer job identity no longer matches Reviewer state.");
  }
  if (reviewerState.threadId !== run.reviewer.threadId) {
    throw new Error("Multi-part acknowledgement recovery refused: Reviewer context identity changed.");
  }
  if (
    reviewerState.status !== "FAILED" || reviewerState.sessionId !== run.sessionId ||
    reviewerState.model !== run.reviewer.model || reviewerState.effort !== run.reviewer.effort ||
    reviewerState.lastError !== run.lastError
  ) {
    throw new Error("Multi-part acknowledgement recovery refused: Reviewer state no longer matches the failed runtime.");
  }

  const config = await readProjectConfig(project);
  const directory = sessionRoot(project, config, run.sessionId);
  const state = await loadSessionState(directory, run.sessionId);
  const active = currentPhase(state);
  if (!active || active.phase.name !== job.phase) {
    throw new Error("Multi-part acknowledgement recovery refused: the saved session is no longer at the failed phase.");
  }
  if (state.advances.length !== active.index || run.ownerAcknowledgements !== active.index) {
    throw new Error("Multi-part acknowledgement recovery refused: prior gate history no longer matches the failed phase.");
  }
  const expectedReview = path.relative(project, reviewPath(directory, active.phase, active.index));
  if (job.expectedPath !== expectedReview) {
    throw new Error("Multi-part acknowledgement recovery refused: the Reviewer job is bound to a different review path.");
  }

  const bindingFile = path.join(directory, "guide-launch.json");
  const bindingMetadata = await lstat(bindingFile).catch(() => null);
  if (!bindingMetadata || !bindingMetadata.isFile() || bindingMetadata.isSymbolicLink()) {
    throw new Error("Multi-part acknowledgement recovery refused: the session-to-Guide launch binding is missing or unsafe.");
  }
  let binding                                                             ;
  try {
    binding = JSON.parse(await readFile(bindingFile, "utf8"));
  } catch {
    throw new Error("Multi-part acknowledgement recovery refused: the session-to-Guide launch binding is corrupt.");
  }
  if (binding.version !== 1 || binding.launchId !== run.launchId || binding.sessionId !== run.sessionId) {
    throw new Error("Multi-part acknowledgement recovery refused: the session-to-Guide launch binding changed.");
  }

  const gate = await evaluateGate(directory, active.phase, active.index);
  const verdict = gate.review?.verdict;
  if (verdict !== "APPROVE WITH COMMENTS" && verdict !== "DISCUSS") {
    throw new Error("Multi-part acknowledgement recovery refused: the current review does not require multi-part owner input.");
  }
  const expectedIssues = verdict === "DISCUSS"
    ? new Set(["approval_missing", "verdict_discuss"])
    : new Set(["approval_missing"]);
  const unexpected = gate.issues.filter((issue) => !expectedIssues.has(issue.code));
  const missing = [...expectedIssues].filter((code) => !gate.issues.some((issue) => issue.code === code));
  if (unexpected.length > 0) {
    const artifactChanged = unexpected.find((issue) => issue.code === "artifact_changed");
    throw new Error(artifactChanged
      ? "Multi-part acknowledgement recovery refused: the artifact changed after review."
      : `Multi-part acknowledgement recovery refused: current gate evidence changed (${unexpected.map((issue) => issue.code).join(", ")}).`);
  }
  if (missing.length > 0 || gate.approval) {
    throw new Error("Multi-part acknowledgement recovery refused: this receipt is no longer unacknowledged.");
  }
}


//# sourceURL=/Users/freeborn/Dev/koda-codex/src/owner-ack-recovery.ts