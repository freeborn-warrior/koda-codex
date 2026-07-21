import { spawnSync } from "node:child_process";
import { realpathSync } from "node:fs";
import { lstat, readdir } from "node:fs/promises";
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
    throw new Error(`Koda-C cannot find the Codex executable named ${configured}.`);
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

export function resolveRelayGitExecutable(
  configured = process.env.KODA_GIT_BIN?.trim() || "git",
  source: NodeJS.ProcessEnv = process.env,
): string {
  if (path.isAbsolute(configured)) return realpathSync(configured);
  if (configured.includes("/") || configured.includes("\\")) {
    throw new Error("KODA_GIT_BIN must be an absolute path or one executable name.");
  }
  if (configured === "git") {
    const xcrun = spawnSync("/usr/bin/xcrun", ["--find", "git"], {
      encoding: "utf8",
      env: { PATH: source.PATH || DEFAULT_PATH },
    });
    const developerGit = (xcrun.stdout ?? "").trim();
    if (xcrun.status === 0 && developerGit) return realpathSync(developerGit);
  }
  const found = spawnSync("/usr/bin/which", [configured], {
    encoding: "utf8",
    env: { PATH: source.PATH || DEFAULT_PATH },
  });
  const candidate = (found.stdout ?? "").trim();
  if (found.status !== 0 || !candidate) {
    throw new Error(`Koda-C cannot find the Git executable named ${configured}.`);
  }
  return realpathSync(candidate);
}

export function relayGitToolchainReadRoots(gitExecutable: string): string[] {
  if (!path.isAbsolute(gitExecutable)) throw new Error("The Git executable path must be absolute.");
  return [path.dirname(path.dirname(path.resolve(gitExecutable)))];
}

export async function validateEmptyRelayXdgScratch(runRoot: string): Promise<void> {
  if (!path.isAbsolute(runRoot)) throw new Error("The relay runtime path must be absolute.");
  const scratch = path.join(runRoot, ".xdg");
  const metadata = await lstat(scratch);
  if (!metadata.isDirectory() || metadata.isSymbolicLink()) {
    throw new Error("Guide runtime XDG scratch path is not a real directory; evidence archival refuses.");
  }
  if ((await readdir(scratch)).length > 0) {
    throw new Error("Guide runtime XDG scratch directory is not empty; evidence archival refuses.");
  }
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
  // Launcher bytes must not depend on whether Guide was opened from Ghostty,
  // Codex Desktop, Finder, or another terminal. Identity and temporary-storage
  // paths remain explicit; display/locale values are fixed for reproducibility.
  return {
    ...(source.HOME ? { HOME: source.HOME } : {}),
    ...(source.USER ? { USER: source.USER } : {}),
    ...(source.LOGNAME ? { LOGNAME: source.LOGNAME } : {}),
    ...(source.TMPDIR ? { TMPDIR: source.TMPDIR } : {}),
    LANG: "C.UTF-8",
    LC_ALL: "C.UTF-8",
    LC_CTYPE: "C.UTF-8",
    TERM: "xterm-256color",
    NO_COLOR: "1",
    PATH: DEFAULT_PATH,
    KODA_CODEX_BIN: codexExecutable,
  };
}

/** Environment given to a Producer or Reviewer Codex child. */
export function relayCodexEnvironment(
  source: NodeJS.ProcessEnv = process.env,
  sessionId?: string,
  gitExecutable?: string,
  xdgConfigHome?: string,
): NodeJS.ProcessEnv {
  if (gitExecutable && !path.isAbsolute(gitExecutable)) {
    throw new Error("The trusted Git executable path must be absolute.");
  }
  if (xdgConfigHome && !path.isAbsolute(xdgConfigHome)) {
    throw new Error("The isolated XDG configuration path must be absolute.");
  }
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
    ...(xdgConfigHome ? { XDG_CONFIG_HOME: path.resolve(xdgConfigHome) } : {}),
  };
  if (gitExecutable) clean.PATH = `${path.dirname(path.resolve(gitExecutable))}:${DEFAULT_PATH}`;
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
