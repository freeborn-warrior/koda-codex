import { spawnSync } from "node:child_process";
import { realpathSync } from "node:fs";
import path from "node:path";

const SAFE_ROLE_KEYS = [
  "HOME",
  "USER",
  "LOGNAME",
  "TMPDIR",
  "LANG",
  "LC_ALL",
  "LC_CTYPE",
  "TERM",
  "COLORTERM",
  "NO_COLOR",
] as const;

const DEFAULT_PATH = "/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin";

export function resolveRelayCodexExecutable(
  configured = process.env.KODA_CODEX_BIN?.trim() || "codex",
  source: NodeJS.ProcessEnv = process.env,
): string {
  if (path.isAbsolute(configured)) return realpathSync(configured);
  if (configured.includes("/") || configured.includes("\\")) {
    throw new Error("KODA_CODEX_BIN must be an absolute path or one executable name.");
  }
  const found = spawnSync("/usr/bin/which", [configured], {
    encoding: "utf8",
    env: { PATH: source.PATH || DEFAULT_PATH },
  });
  const candidate = (found.stdout ?? "").trim();
  if (found.status !== 0 || !candidate) {
    throw new Error(`Koda cannot find the Codex executable named ${configured}.`);
  }
  return realpathSync(candidate);
}

export function relayNodeToolchainReadRoots(nodeExecutable = process.execPath): string[] {
  if (!path.isAbsolute(nodeExecutable)) throw new Error("The Node executable path must be absolute.");
  const actual = path.resolve(nodeExecutable);
  const segments = actual.split(path.sep);
  const cellarIndex = segments.indexOf("Cellar");
  if (cellarIndex > 0) {
    return [segments.slice(0, cellarIndex).join(path.sep) || path.sep];
  }
  return [path.dirname(path.dirname(actual))];
}

function copySafe(source: NodeJS.ProcessEnv): NodeJS.ProcessEnv {
  const clean: NodeJS.ProcessEnv = {};
  for (const key of SAFE_ROLE_KEYS) {
    const value = source[key];
    if (value) clean[key] = value;
  }
  clean.PATH = DEFAULT_PATH;
  return clean;
}

/**
 * Environment given to the trusted relay console process.
 *
 * Ambient credentials, parent Codex identity, and unrelated project variables
 * are deliberately excluded. The absolute Codex executable is the only
 * role-specific capability added here.
 */
export function relayRoleEnvironment(
  codexExecutable: string,
  source: NodeJS.ProcessEnv = process.env,
): NodeJS.ProcessEnv {
  return {
    ...copySafe(source),
    KODA_CODEX_BIN: codexExecutable,
  };
}

/** Environment given to a Producer or Reviewer Codex child. */
export function relayCodexEnvironment(
  source: NodeJS.ProcessEnv = process.env,
  sessionId?: string,
): NodeJS.ProcessEnv {
  const clean: NodeJS.ProcessEnv = {
    ...copySafe(source),
    // Model-generated Git reads must use only the active repository's local
    // config. Otherwise Git probes the blocked home directory before it can
    // report project truth. Trusted relay commit/push processes do not use this
    // child environment.
    GIT_CONFIG_GLOBAL: "/dev/null",
    GIT_CONFIG_SYSTEM: "/dev/null",
    GIT_OPTIONAL_LOCKS: "0",
    GIT_TERMINAL_PROMPT: "0",
    ...(sessionId ? { KODA_SESSION_ID: sessionId } : {}),
  };
  // Deterministic relay fixtures use explicit KODA_TEST_* channels for fake
  // children. A real Guide-launched role never receives KODA_RELAY_RUNS_ROOT,
  // so ambient variables cannot opt themselves into this test-only path.
  if (source.KODA_RELAY_RUNS_ROOT) {
    for (const [key, value] of Object.entries(source)) {
      if (key.startsWith("KODA_TEST_") && value) clean[key] = value;
    }
  }
  return clean;
}
