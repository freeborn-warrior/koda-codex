export const VERDICTS = [
  "APPROVE",
  "APPROVE WITH COMMENTS",
  "REVISE",
  "REJECT",
  "DISCUSS",
] as const;

export type Verdict = (typeof VERDICTS)[number];

export interface PhaseConfig {
  name: string;
  description: string;
}

export interface ProjectConfig {
  version: 1;
  sessionsDir: string;
  phases: PhaseConfig[];
}

export interface AdvanceRecord {
  phase: string;
  receipt: string;
  reviewId: string;
  advancedAt: string;
  directions?: string[];
}

export interface DirectionReference {
  id: string;
  sessionId: string;
  sha256: string;
}

export type SessionLaunchMode = "independent" | "dependent" | "continuation";

export interface SessionDependency {
  sessionId: string;
  terminal: "close" | "halt";
  evidenceSha256: string;
}

export interface SessionState {
  version: 1;
  id: string;
  createdAt: string;
  phases: PhaseConfig[];
  currentPhaseIndex: number;
  advances: AdvanceRecord[];
  entryDirections?: DirectionReference[];
  kind?: string;
  launchMode?: SessionLaunchMode;
  dependencies?: SessionDependency[];
}

export interface CloseMetadata {
  version: 1;
  id: string;
  sessionId: string;
  sessionSha256: string;
  finalPhase: string;
  finalReviewId: string;
  finalReceipt: string;
  preparedAt: string;
}

export interface HaltMetadata {
  version: 1;
  id: string;
  sessionId: string;
  sessionSha256: string;
  phase: string;
  phaseIndex: number;
  ownerDirection: string;
  ownerDirectionSha256: string;
  preparedAt: string;
}

export interface ReviewMetadata {
  version: 1;
  id: string;
  phase: string;
  artifactSha256: string;
  receipt: string;
  createdAt: string;
}

export interface ParsedReview {
  verdict: Verdict | null;
  verdictText: string | null;
  receipt: string | null;
  metadata: ReviewMetadata | null;
}

export interface ApprovalEntry {
  version: 1;
  phase: string;
  reviewId: string;
  reviewSha256: string;
  verdict: Verdict;
  receipt: string;
  approver: string;
  comments: string | null;
  ruling: string | null;
  recordedAt: string;
}

export interface GateIssue {
  code: string;
  message: string;
}

export interface GateResult {
  open: boolean;
  phase: PhaseConfig;
  artifactPath: string;
  reviewPath: string;
  issues: GateIssue[];
  review: ParsedReview | null;
  approval: ApprovalEntry | null;
}
