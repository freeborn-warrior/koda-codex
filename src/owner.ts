const OWNER_CONTROL_CHARACTERS = /[\u0000-\u001f\u007f-\u009f]/u;
const MAX_OWNER_NAME_LENGTH = 120;

// Version-1 runtimes predate owner binding. The only shipped version-1 relay
// recorded Kristian, so this fallback preserves paused and historical sessions.
export const LEGACY_RELAY_OWNER = "Kristian";

export function normalizeOwnerName(value: unknown, label = "Owner name"): string {
  if (typeof value !== "string") throw new Error(`${label} must be text.`);
  const normalized = value.trim();
  if (normalized === "") throw new Error(`${label} must not be empty.`);
  if (normalized.length > MAX_OWNER_NAME_LENGTH) {
    throw new Error(`${label} must be ${MAX_OWNER_NAME_LENGTH} characters or fewer.`);
  }
  if (OWNER_CONTROL_CHARACTERS.test(normalized)) {
    throw new Error(`${label} must not contain control characters.`);
  }
  return normalized;
}

export function relayOwnerName(
  run: { version?: unknown; owner?: unknown },
  source = "RUN.json",
): string {
  if (run.version !== 1 && run.version !== 2) {
    throw new Error(`${source} has an unsupported relay version.`);
  }
  if (run.owner === undefined) {
    if (run.version === 1) return LEGACY_RELAY_OWNER;
    throw new Error(`${source} is missing its owner identity binding.`);
  }
  return normalizeOwnerName(run.owner, `${source} owner identity`);
}
