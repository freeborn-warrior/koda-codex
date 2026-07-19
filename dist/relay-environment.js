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
]         ;

const DEFAULT_PATH = "/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin";

function copySafe(source                   )                    {
  const clean                    = {};
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
  codexExecutable        ,
  source                    = process.env,
)                    {
  return {
    ...copySafe(source),
    KODA_CODEX_BIN: codexExecutable,
  };
}

/** Environment given to a Producer or Reviewer Codex child. */
export function relayCodexEnvironment(
  source                    = process.env,
  sessionId         ,
)                    {
  const clean                    = {
    ...copySafe(source),
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


//# sourceURL=/Users/freeborn/Dev/koda-codex/src/relay-environment.ts