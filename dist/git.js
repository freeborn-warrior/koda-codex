import { spawnSync } from "node:child_process";
import { readdirSync, realpathSync } from "node:fs";
import path from "node:path";






export function checkGitFilesPushed(projectRoot        , projectRelativeFiles          )               {
  const reasons           = [];
  const top = git(projectRoot, ["rev-parse", "--show-toplevel"]);
  if (!top.ok) return { closed: false, reasons: ["The project is not inside a Git repository."] };

  const resolvedTop = realpathSync(top.stdout);
  for (const file of projectRelativeFiles) {
    if (path.isAbsolute(file) || file.split(/[\\/]/).includes("..")) {
      reasons.push(`Guide launch evidence path is unsafe: ${file}.`);
      continue;
    }
    const absolute = realpathSync(path.resolve(projectRoot, file));
    const relative = path.relative(resolvedTop, absolute);
    if (relative.startsWith("..") || path.isAbsolute(relative)) {
      reasons.push(`Guide launch evidence is outside the Git repository: ${file}.`);
      continue;
    }
    if (!git(projectRoot, ["ls-files", "--error-unmatch", "--", relative]).ok) {
      reasons.push(`Guide launch evidence is not committed: ${file}.`);
      continue;
    }
    const dirty = git(projectRoot, ["status", "--porcelain", "--untracked-files=all", "--", relative]);
    if (!dirty.ok || dirty.stdout !== "") reasons.push(`Guide launch evidence has uncommitted changes: ${file}.`);
  }

  const upstream = git(projectRoot, ["rev-parse", "--abbrev-ref", "--symbolic-full-name", "@{u}"]);
  if (!upstream.ok) reasons.push("The current branch has no pushed upstream branch.");
  else {
    const ahead = git(projectRoot, ["rev-list", "--count", "@{u}..HEAD"]);
    if (!ahead.ok || ahead.stdout !== "0") reasons.push("The Guide launch commit has not been pushed.");
  }
  return { closed: reasons.length === 0, reasons };
}

export function pushCommandArgs(projectRoot        )                  {
  const upstream = git(projectRoot, ["rev-parse", "--abbrev-ref", "--symbolic-full-name", "@{u}"]);
  if (upstream.ok) return ["push"];

  const branch = git(projectRoot, ["branch", "--show-current"]);
  const remotes = git(projectRoot, ["remote"]);
  if (!branch.ok || branch.stdout === "" || !remotes.ok || remotes.stdout === "") return null;
  const names = remotes.stdout.split("\n").filter(Boolean);
  const remote = names.includes("origin") ? "origin" : names[0];
  return ["push", "-u", remote, branch.stdout];
}

function git(cwd        , args          )                                                  {
  const result = spawnSync("git", args, { cwd, encoding: "utf8" });
  return {
    ok: result.status === 0,
    stdout: (result.stdout ?? "").trim(),
    stderr: (result.stderr ?? "").trim(),
  };
}

function regularSessionFiles(directory        , root = directory)                                        {
  const files           = [];
  const unsafe           = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const candidate = path.join(directory, entry.name);
    const relative = path.relative(root, candidate);
    if (entry.isDirectory()) {
      const nested = regularSessionFiles(candidate, root);
      files.push(...nested.files);
      unsafe.push(...nested.unsafe);
    } else if (entry.isFile()) {
      files.push(candidate);
    } else {
      unsafe.push(relative);
    }
  }
  return { files, unsafe };
}

export function checkGitClosure(projectRoot        , sessionDir        , phasesComplete         )               {
  const reasons           = [];
  if (!phasesComplete) {
    reasons.push("The summary phase has not advanced.");
    return { closed: false, reasons };
  }

  const top = git(projectRoot, ["rev-parse", "--show-toplevel"]);
  if (!top.ok) {
    return { closed: false, reasons: ["The project is not inside a Git repository."] };
  }

  const resolvedTop = realpathSync(top.stdout);
  const resolvedSession = realpathSync(sessionDir);
  const relativeSession = path.relative(resolvedTop, resolvedSession);
  if (relativeSession.startsWith("..") || path.isAbsolute(relativeSession)) {
    return { closed: false, reasons: ["The session folder is outside the Git repository."] };
  }

  const entries = regularSessionFiles(resolvedSession);
  if (entries.unsafe.length > 0) {
    reasons.push(`Session evidence contains symbolic links or special files: ${entries.unsafe.join(", ")}.`);
  }
  const untracked = entries.files
    .map((file) => path.relative(resolvedTop, file))
    .filter((file) => !git(projectRoot, ["ls-files", "--error-unmatch", "--", file]).ok);
  const trackedState = !untracked.includes(path.join(relativeSession, "state.json"));
  if (!trackedState) reasons.push("The completed session has not been committed.");
  const otherUntracked = untracked.filter((file) => file !== path.join(relativeSession, "state.json"));
  if (otherUntracked.length > 0) {
    reasons.push(`Every session file must be committed; untracked or ignored: ${otherUntracked.join(", ")}.`);
  }

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


//# sourceURL=/Users/freeborn/Dev/koda-codex/src/git.ts