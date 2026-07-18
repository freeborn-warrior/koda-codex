import { pathExists } from "./config.ts";
import { artifactPath, ledgerPath, readRegularText, reviewPath } from "./project.ts";
import {
  parseReview,
  readApprovalLedger,
  receiptOccurrenceCount,
  sha256,
} from "./receipt.ts";
import type { GateIssue, GateResult, PhaseConfig } from "./types.ts";

function issue(code: string, message: string): GateIssue {
  return { code, message };
}

async function regularEvidence(filePath: string, label: string): Promise<{ missing: boolean; unsafe: boolean; content: string | null }> {
  if (!(await pathExists(filePath))) return { missing: true, unsafe: false, content: null };
  try {
    return { missing: false, unsafe: false, content: await readRegularText(filePath, label) };
  } catch (error) {
    if (error instanceof Error && error.message.includes("must be a regular file")) {
      return { missing: false, unsafe: true, content: null };
    }
    throw error;
  }
}

export async function evaluateGate(
  sessionDir: string,
  phase: PhaseConfig,
  index: number,
): Promise<GateResult> {
  const issues: GateIssue[] = [];
  const phaseArtifact = artifactPath(sessionDir, phase, index);
  const phaseReview = reviewPath(sessionDir, phase, index);

  let artifact: string | null = null;
  const artifactEvidence = await regularEvidence(phaseArtifact, "The phase artifact");
  if (artifactEvidence.missing) {
    issues.push(issue("artifact_missing", "The phase artifact does not exist."));
  } else if (artifactEvidence.unsafe) {
    issues.push(issue("artifact_not_regular", "The phase artifact must be a regular file; symbolic links and special files are refused."));
  } else {
    artifact = artifactEvidence.content;
    if (artifact.trim() === "") issues.push(issue("artifact_empty", "The phase artifact is empty."));
  }

  let review = null;
  let reviewContent: string | null = null;
  const reviewEvidence = await regularEvidence(phaseReview, "The peer-review file");
  if (reviewEvidence.missing) {
    issues.push(issue("review_missing", "The peer-review file does not exist."));
  } else if (reviewEvidence.unsafe) {
    issues.push(issue("review_not_regular", "The peer-review file must be a regular file; symbolic links and special files are refused."));
  } else {
    reviewContent = reviewEvidence.content;
    review = parseReview(reviewContent);
    if (!review.verdictText) {
      issues.push(issue("verdict_missing", "The review must open with a VERDICT line."));
    } else if (!review.verdict) {
      issues.push(issue("verdict_invalid", `Unknown verdict: ${review.verdictText}.`));
    }
    if (!review.receipt) {
      issues.push(issue("receipt_missing", "The review's last line must be a marked RECEIPT phrase."));
    }
    if (!review.metadata) {
      issues.push(issue("review_metadata_missing", "The generated review metadata is missing or invalid."));
    }
    if (
      reviewContent.includes("Verify the artifact against the files it cites. Replace this guidance with findings.") ||
      reviewContent.includes("- Record what the files prove.")
    ) {
      issues.push(issue("review_incomplete", "The review still contains untouched template guidance."));
    }
  }

  if (review?.metadata) {
    if (review.metadata.phase !== phase.name) {
      issues.push(issue("review_phase_mismatch", "The review was generated for a different phase."));
    }
    if (artifact !== null && artifact.trim() !== "" && review.metadata.artifactSha256 !== sha256(artifact)) {
      issues.push(issue("artifact_changed", "The review is stale; the artifact changed after review. Re-review the current artifact."));
    }
    if (review.receipt && review.metadata.receipt !== review.receipt) {
      issues.push(issue("receipt_mismatch", "The final receipt does not match this review's generated receipt."));
    }
    if (review.receipt && await receiptOccurrenceCount(sessionDir, review.receipt) !== 1) {
      issues.push(issue("receipt_not_unique", "This receipt appears in more than one review."));
    }
  }

  let approval = null;
  if (!(await pathExists(ledgerPath(sessionDir)))) {
    issues.push(issue("ledger_missing", "The approval ledger does not exist."));
  } else if (review?.metadata && review.receipt) {
    let ledger;
    try {
      ledger = await readApprovalLedger(sessionDir);
    } catch (error) {
      if (error instanceof Error && error.message.includes("must be a regular file")) {
        issues.push(issue("ledger_not_regular", "The approval ledger must be a regular file; symbolic links and special files are refused."));
        ledger = null;
      } else {
        throw error;
      }
    }
    if (!ledger) {
      return {
        open: false,
        phase,
        artifactPath: phaseArtifact,
        reviewPath: phaseReview,
        issues,
        review,
        approval,
      };
    }
    if (ledger.invalidMarkers > 0) {
      issues.push(issue("ledger_corrupt", "The approval ledger contains malformed KODA_APPROVAL metadata."));
    }
    const approvals = ledger.entries;
    approval = approvals.findLast((entry) =>
      entry.phase === phase.name &&
      entry.reviewId === review!.metadata!.id &&
      entry.receipt.trim() === review!.receipt!.trim()
    ) ?? null;
    if (!approval) {
      issues.push(issue("approval_missing", "The current review receipt has not been quoted into the approval ledger."));
    } else {
      if (approval.receipt.trim() !== review.receipt.trim()) {
        issues.push(issue("approval_receipt_mismatch", "The ledger receipt is not an exact match."));
      }
      if (reviewContent !== null && approval.reviewSha256 !== sha256(reviewContent)) {
        issues.push(issue("approval_review_changed", "The review changed after its receipt was acknowledged. Create a fresh review and receipt."));
      }
      if (review.verdict && approval.verdict !== review.verdict) {
        issues.push(issue("approval_verdict_mismatch", "The ledger entry records a different verdict."));
      }
      if (!approval.approver.trim()) {
        issues.push(issue("approval_approver_missing", "The ledger entry has no approver."));
      }
      if (review.verdict === "APPROVE WITH COMMENTS" && !approval.comments?.trim()) {
        issues.push(issue("approval_comments_missing", "APPROVE WITH COMMENTS requires the comments in the ledger."));
      }
    }
  }

  if (review?.verdict === "REVISE") {
    issues.push(issue("verdict_revise", "REVISE returns the artifact to the producer and requires a fresh review."));
  } else if (review?.verdict === "REJECT") {
    issues.push(issue("verdict_reject", "REJECT returns the artifact to the producer and requires a fresh review."));
  } else if (review?.verdict === "DISCUSS") {
    const message = approval?.ruling?.trim()
      ? "The owner's ruling is recorded; DISCUSS still requires a fresh definitive review."
      : "DISCUSS requires an owner ruling in the ledger, then a fresh definitive review.";
    issues.push(issue("verdict_discuss", message));
  }

  return {
    open: issues.length === 0,
    phase,
    artifactPath: phaseArtifact,
    reviewPath: phaseReview,
    issues,
    review,
    approval,
  };
}
