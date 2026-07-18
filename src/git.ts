import { spawnSync } from "node:child_process";
import { realpathSync } from "node:fs";
import path from "node:path";

export interface ClosureCheck {
  closed: boolean;
  reasons: string[];
}

export function pushCommandArgs(projectRoot: string): string[] | null {
  const upstream = git(projectRoot, ["rev-parse", "--abbrev-ref", "--symbolic-full-name", "@{u}"]);
  if (upstream.ok) return ["push"];

  const branch = git(projectRoot, ["branch", "--show-current"]);
  const remotes = git(projectRoot, ["remote"]);
  if (!branch.ok || branch.stdout === "" || !remotes.ok || remotes.stdout === "") return null;
  const names = remotes.stdout.split("\n").filter(Boolean);
  const remote = names.includes("origin") ? "origin" : names[0];
  return ["push", "-u", remote, branch.stdout];
}

function git(cwd: string, args: string[]): { ok: boolean; stdout: string; stderr: string } {
  const result = spawnSync("git", args, { cwd, encoding: "utf8" });
  return {
    ok: result.status === 0,
    stdout: (result.stdout ?? "").trim(),
    stderr: (result.stderr ?? "").trim(),
  };
}

export function checkGitClosure(projectRoot: string, sessionDir: string, phasesComplete: boolean): ClosureCheck {
  const reasons: string[] = [];
  if (!phasesComplete) {
    reasons.push("The summary phase has not advanced.");
    return { closed: false, reasons };
  }

  const top = git(projectRoot, ["rev-parse", "--show-toplevel"]);
  if (!top.ok) {
    return { closed: false, reasons: ["The project is not inside a Git repository."] };
  }

  const relativeSession = path.relative(realpathSync(top.stdout), realpathSync(sessionDir));
  if (relativeSession.startsWith("..") || path.isAbsolute(relativeSession)) {
    return { closed: false, reasons: ["The session folder is outside the Git repository."] };
  }

  const trackedState = git(projectRoot, ["ls-files", "--error-unmatch", "--", path.join(relativeSession, "state.json")]);
  if (!trackedState.ok) reasons.push("The completed session has not been committed.");

  const dirty = git(projectRoot, ["status", "--porcelain", "--untracked-files=all", "--", relativeSession]);
  if (!dirty.ok || dirty.stdout !== "") reasons.push("The session has uncommitted changes.");

  const upstream = git(projectRoot, ["rev-parse", "--abbrev-ref", "--symbolic-full-name", "@{u}"]);
  if (!upstream.ok) {
    reasons.push("The current branch has no pushed upstream branch.");
  } else {
    const ahead = git(projectRoot, ["rev-list", "--count", "@{u}..HEAD"]);
    if (!ahead.ok || ahead.stdout !== "0") reasons.push("The session commit has not been pushed.");
  }

  return { closed: reasons.length === 0, reasons };
}
