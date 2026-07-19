export type RelayRole = "producer" | "reviewer";
export type RelaySignal = "SIGINT" | "SIGTERM";

export type ModelTurnInterruption = {
  version: 1;
  role: RelayRole;
  purpose: string;
  turn: number;
  signal: RelaySignal;
  interruptedAt: string;
  eventFile: string;
  stderrFile: string;
  threadId: string | null;
};

export function baseTurnPurpose(purpose: string): string {
  let value = purpose;
  while (/^reconcile interrupted turn \d+: /.test(value)) {
    value = value.replace(/^reconcile interrupted turn \d+: /, "");
  }
  return value;
}

export function validTurnPurpose(role: RelayRole, purpose: string): boolean {
  const base = baseTurnPurpose(purpose);
  if (role === "producer") {
    return base === "open the Koda session" ||
      base === "prepare immutable session close" ||
      base === "verify immutable session close" ||
      /^(produce|revise) [a-z0-9][a-z0-9-]*$/.test(base);
  }
  return /^(formal|repair|fresh) review of [a-z0-9][a-z0-9-]*$/.test(base) ||
    /^answer consultation [a-z0-9][a-z0-9.-]*\.md$/.test(base);
}

function validIsoTimestamp(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const parsed = new Date(value);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString() === value;
}

export function validateModelTurnInterruption(value: unknown): ModelTurnInterruption {
  if (!value || typeof value !== "object") throw new Error("Interruption evidence must be a JSON object.");
  const item = value as Partial<ModelTurnInterruption>;
  if (item.role !== "producer" && item.role !== "reviewer") {
    throw new Error("Interruption evidence names an invalid role.");
  }
  const prefix = item.role === "producer" ? "PRODUCER" : "REVIEWER";
  if (
    item.version !== 1 ||
    typeof item.purpose !== "string" || !validTurnPurpose(item.role, item.purpose) ||
    !Number.isInteger(item.turn) || item.turn! < 1 ||
    (item.signal !== "SIGINT" && item.signal !== "SIGTERM") ||
    !validIsoTimestamp(item.interruptedAt) ||
    typeof item.eventFile !== "string" || !new RegExp(`^${prefix}-\\d{2,}-EVENTS\\.jsonl$`).test(item.eventFile) ||
    typeof item.stderrFile !== "string" || !new RegExp(`^${prefix}-\\d{2,}-STDERR\\.txt$`).test(item.stderrFile) ||
    !(item.threadId === null || (typeof item.threadId === "string" && item.threadId.trim() !== ""))
  ) {
    throw new Error("Interruption evidence has invalid or unsafe fields.");
  }
  return item as ModelTurnInterruption;
}
