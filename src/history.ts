import { evaluateGate } from "./gate.ts";
import type { SessionState } from "./types.ts";

export interface HistoryIssue {
  phase: string;
  message: string;
}

export async function validateAdvancedHistory(sessionDir: string, state: SessionState): Promise<HistoryIssue[]> {
  const issues: HistoryIssue[] = [];
  for (let index = 0; index < state.currentPhaseIndex; index += 1) {
    const phase = state.phases[index];
    const record = state.advances[index];
    const gate = await evaluateGate(sessionDir, phase, index);
    for (const finding of gate.issues) {
      issues.push({ phase: phase.name, message: finding.message });
    }
    if (
      gate.review?.metadata &&
      gate.review.receipt &&
      (record.reviewId !== gate.review.metadata.id || record.receipt !== gate.review.receipt)
    ) {
      issues.push({ phase: phase.name, message: "The advancement record does not match the active review and receipt." });
    }
  }
  return issues;
}

export async function requireAdvancedHistory(sessionDir: string, state: SessionState): Promise<void> {
  const issues = await validateAdvancedHistory(sessionDir, state);
  if (issues.length) {
    throw new Error([
      "Previously advanced phase evidence is missing or changed:",
      ...issues.map((item) => `- ${item.phase}: ${item.message}`),
    ].join("\n"));
  }
}
