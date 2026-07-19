import { spawnSync } from "node:child_process";
import { lstat, readFile, readdir, realpath } from "node:fs/promises";
import path from "node:path";

import { pathExists } from "./config.ts";
import { acquireGitOperationLock } from "./git-operation-lock.ts";
import {
  guideManifestPath,
  guideReturnsDir,
  guideRoot,
  guideRunsDir,
  hasGuideManifest,
  loadGuideManifest,
} from "./guide.ts";
import { listSessionIds, loadSession, nowIso, sessionRoot, writeJsonAtomic } from "./project.ts";
import { sha256 } from "./receipt.ts";
import type { ProjectConfig } from "./types.ts";

export const WORK_SET_FILE = "write-set.json";
export const GUIDE_WORK_SET_FILE = "write-set.json";
const ISO_UTC = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

export interface WorkClaim {
  path: string;
  beforeSha256: string | null;
  afterSha256?: string | null;
  claimedAt: string;
  observedAt?: string;
}

export interface SessionWorkSet {
  version: 1;
  sessionId: string;
  claims: WorkClaim[];
  updatedAt: string;
}

function git(root: string, args: string[], accepted = [0]): string {
  const result = spawnSync("git", args, { cwd: root, encoding: "utf8", env: { ...process.env, GIT_OPTIONAL_LOCKS: "0" } });
  const status = result.status ?? -1;
  if (!accepted.includes(status)) throw new Error(`git ${args.join(" ")} failed: ${(result.stderr ?? "").trim()}`);
  return result.stdout ?? "";
}

function nulList(value: string): string[] {
  return value.split("\0").filter(Boolean).map((item) => item.split(path.sep).join("/"));
}

export function changedProjectPaths(root: string): string[] {
  const tracked = nulList(git(root, ["diff", "--name-only", "--no-renames", "-z", "HEAD"]));
  const staged = nulList(git(root, ["diff", "--cached", "--name-only", "--no-renames", "-z"]));
  const untracked = nulList(git(root, ["ls-files", "--others", "--exclude-standard", "-z"]));
  return [...new Set([...tracked, ...staged, ...untracked])].sort();
}

export function stagedProjectPaths(root: string): string[] {
  return nulList(git(root, ["diff", "--cached", "--name-only", "--no-renames", "-z"])).sort();
}

function normalizeProjectPath(value: string): string {
  const normalized = value.split(path.sep).join("/").replace(/^\.\//, "");
  if (
    normalized.trim() === "" || path.posix.isAbsolute(normalized) ||
    normalized.split("/").includes("..") || normalized === ".git" || normalized.startsWith(".git/") ||
    normalized === ".koda" || normalized.startsWith(".koda/")
  ) throw new Error(`Write claim path is unsafe: ${value}.`);
  return normalized;
}

async function pathEntryExists(candidate: string): Promise<boolean> {
  try {
    await lstat(candidate);
    return true;
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code === "ENOENT" || code === "ENOTDIR") return false;
    throw error;
  }
}

async function assertContainedRegularOrMissing(root: string, relative: string): Promise<string | null> {
  const absolute = path.join(root, relative);
  const resolvedRoot = await realpath(root);
  const parts = relative.split("/");
  let current = root;
  for (let index = 0; index < parts.length; index += 1) {
    current = path.join(current, parts[index]!);
    if (!(await pathEntryExists(current))) break;
    const metadata = await lstat(current);
    const final = index === parts.length - 1;
    if (metadata.isSymbolicLink() || (final ? !metadata.isFile() : !metadata.isDirectory())) {
      throw new Error(`Write claim path contains a symbolic link or non-${final ? "file" : "directory"} component: ${relative}.`);
    }
    const canonical = path.relative(resolvedRoot, await realpath(current)).split(path.sep).join("/");
    const requested = parts.slice(0, index + 1).join("/");
    if (canonical !== requested) throw new Error(`Write claim path must use its canonical project spelling: ${relative}.`);
  }
  if (await pathEntryExists(absolute)) {
    const resolved = await realpath(absolute);
    const resolvedRelative = path.relative(resolvedRoot, resolved);
    if (resolvedRelative.startsWith("..") || path.isAbsolute(resolvedRelative)) throw new Error(`Write claim resolves outside the project: ${relative}.`);
    return sha256(await readFile(absolute));
  }
  return null;
}

export function workSetPath(sessionDirectory: string): string {
  return path.join(sessionDirectory, WORK_SET_FILE);
}

function parseWorkSet(value: unknown, expectedSessionId: string): SessionWorkSet {
  const item = value as Partial<SessionWorkSet>;
  if (
    !item || item.version !== 1 || item.sessionId !== expectedSessionId ||
    !Array.isArray(item.claims) || typeof item.updatedAt !== "string" || !ISO_UTC.test(item.updatedAt)
  ) throw new Error(`Session ${expectedSessionId} has invalid write-set evidence.`);
  const seen = new Set<string>();
  for (const claim of item.claims) {
    if (
      !claim || typeof claim.path !== "string" || normalizeProjectPath(claim.path) !== claim.path ||
      !(claim.beforeSha256 === null || (typeof claim.beforeSha256 === "string" && /^[0-9a-f]{64}$/.test(claim.beforeSha256))) ||
      !(claim.afterSha256 === undefined || claim.afterSha256 === null || (typeof claim.afterSha256 === "string" && /^[0-9a-f]{64}$/.test(claim.afterSha256))) ||
      typeof claim.claimedAt !== "string" || !ISO_UTC.test(claim.claimedAt) ||
      !(claim.observedAt === undefined || (typeof claim.observedAt === "string" && ISO_UTC.test(claim.observedAt))) || seen.has(claim.path)
    ) throw new Error(`Session ${expectedSessionId} has invalid or duplicate write claims.`);
    seen.add(claim.path);
  }
  return item as SessionWorkSet;
}

export async function loadSessionWorkSet(sessionDirectory: string, sessionId: string): Promise<SessionWorkSet> {
  const file = workSetPath(sessionDirectory);
  if (!(await pathExists(file))) return { version: 1, sessionId, claims: [], updatedAt: nowIso() };
  const metadata = await lstat(file);
  if (!metadata.isFile()) throw new Error(`Session ${sessionId} write-set evidence is not a regular file.`);
  let parsed: unknown;
  try {
    parsed = JSON.parse(await readFile(file, "utf8"));
  } catch {
    throw new Error(`Session ${sessionId} write-set evidence is not valid JSON.`);
  }
  return parseWorkSet(parsed, sessionId);
}

export function guideWorkSetPath(root: string, config: ProjectConfig): string {
  return path.join(guideRoot(root, config), GUIDE_WORK_SET_FILE);
}

export async function loadGuideWorkSet(root: string, config: ProjectConfig): Promise<SessionWorkSet> {
  const file = guideWorkSetPath(root, config);
  if (!(await pathExists(file))) return { version: 1, sessionId: "guide", claims: [], updatedAt: nowIso() };
  const metadata = await lstat(file);
  if (!metadata.isFile()) throw new Error("Guide write-set evidence is not a regular file.");
  let parsed: unknown;
  try {
    parsed = JSON.parse(await readFile(file, "utf8"));
  } catch {
    throw new Error("Guide write-set evidence is not valid JSON.");
  }
  return parseWorkSet(parsed, "guide");
}

async function guideOwnedPaths(root: string, config: ProjectConfig): Promise<Set<string>> {
  if (!(await hasGuideManifest(root, config))) return new Set();
  const [manifest, workSet] = await Promise.all([loadGuideManifest(root, config), loadGuideWorkSet(root, config)]);
  for (const claim of workSet.claims) await assertContainedRegularOrMissing(root, claim.path);
  return new Set([
    path.relative(root, guideManifestPath(root, config)).split(path.sep).join("/"),
    path.relative(root, guideWorkSetPath(root, config)).split(path.sep).join("/"),
    path.relative(root, guideRunsDir(root, config)).split(path.sep).join("/"),
    path.relative(root, guideReturnsDir(root, config)).split(path.sep).join("/"),
    ...manifest.continuityFiles.map((item) => normalizeProjectPath(item)),
    ...workSet.claims.map((item) => item.path),
  ]);
}

async function activeSessionClaims(root: string, config: ProjectConfig, except: string): Promise<Map<string, string>> {
  // These imports stay deferred so close verification can independently verify
  // external work claims without creating an eager close <-> work-set cycle.
  const [{ evaluateSessionClosure }, { evaluateSessionHalt }] = await Promise.all([
    import("./close.ts"),
    import("./halt.ts"),
  ]);
  const claims = new Map<string, string>();
  for (const id of await listSessionIds(root, config)) {
    if (id === except) continue;
    const session = await loadSession(root, config, id);
    const [closure, halt] = await Promise.all([
      evaluateSessionClosure(root, session.directory, session.state),
      evaluateSessionHalt(root, session.directory, session.state),
    ]);
    if (closure.closed || halt.halted) continue;
    const prefix = path.relative(root, session.directory).split(path.sep).join("/");
    claims.set(prefix, id);
    const workSet = await loadSessionWorkSet(session.directory, id);
    for (const claim of workSet.claims) {
      await assertContainedRegularOrMissing(root, claim.path);
      claims.set(claim.path, id);
    }
  }
  return claims;
}

async function claimSessionPathsUnlocked(
  root: string,
  config: ProjectConfig,
  sessionId: string,
  values: string[],
): Promise<SessionWorkSet> {
  if (values.length === 0) throw new Error("At least one project-relative write path is required.");
  const session = await loadSession(root, config, sessionId);
  const ownPrefix = path.relative(root, session.directory).split(path.sep).join("/");
  const guide = await guideOwnedPaths(root, config);
  const other = await activeSessionClaims(root, config, sessionId);
  const workSet = await loadSessionWorkSet(session.directory, sessionId);
  const existing = new Set(workSet.claims.map((item) => item.path));
  const additions: WorkClaim[] = [];

  for (const raw of values) {
    const relative = normalizeProjectPath(raw);
    if (relative === ownPrefix || relative.startsWith(`${ownPrefix}/`)) continue;
    for (const claimed of guide) {
      if (relative === claimed || relative.startsWith(`${claimed}/`) || claimed.startsWith(`${relative}/`)) {
        throw new Error(`Write claim conflict: ${relative} overlaps Guide continuity or explicit write-set path ${claimed}.`);
      }
    }
    for (const [claimed, owner] of other) {
      if (relative === claimed || relative.startsWith(`${claimed}/`) || claimed.startsWith(`${relative}/`)) {
        throw new Error(`Write claim conflict: ${relative} overlaps active session ${owner} path ${claimed}.`);
      }
    }
    if (existing.has(relative)) continue;
    const beforeSha256 = await assertContainedRegularOrMissing(root, relative);
    const ignored = spawnSync("git", ["check-ignore", "-q", "--", relative], { cwd: root, encoding: "utf8", env: { ...process.env, GIT_OPTIONAL_LOCKS: "0" } });
    if (ignored.status === 0) {
      throw new Error(`Write claim is ignored by Git and cannot become durable evidence: ${relative}.`);
    }
    if (ignored.status !== 1) throw new Error(`Unable to inspect Git ignore rules for write claim ${relative}.`);
    const dirty = git(root, ["status", "--porcelain", "--untracked-files=all", "--", relative]);
    if (dirty.trim() !== "") throw new Error(`Write claim starts from an uncommitted path and provenance is ambiguous: ${relative}.`);
    const claimedAt = nowIso();
    additions.push({ path: relative, beforeSha256, afterSha256: beforeSha256, claimedAt, observedAt: claimedAt });
    existing.add(relative);
  }
  if (additions.length > 0 || !(await pathExists(workSetPath(session.directory)))) {
    workSet.claims.push(...additions);
    workSet.claims.sort((a, b) => a.path.localeCompare(b.path));
    workSet.updatedAt = nowIso();
    await writeJsonAtomic(workSetPath(session.directory), workSet);
  }
  return workSet;
}

export async function claimSessionPaths(
  root: string,
  config: ProjectConfig,
  sessionId: string,
  values: string[],
): Promise<SessionWorkSet> {
  const lease = await acquireGitOperationLock(root, `claim:${sessionId}`, "atomic session write-claim acquisition", {
    stagedPaths: () => stagedProjectPaths(root),
    waitMs: 5_000,
  });
  try {
    return await claimSessionPathsUnlocked(root, config, sessionId, values);
  } finally {
    await lease.release();
  }
}

async function claimGuidePathsUnlocked(
  root: string,
  config: ProjectConfig,
  values: string[],
): Promise<SessionWorkSet> {
  if (values.length === 0) throw new Error("At least one project-relative Guide write path is required.");
  const implicit = await guideOwnedPaths(root, config);
  const other = await activeSessionClaims(root, config, "guide");
  const workSet = await loadGuideWorkSet(root, config);
  const existing = new Set(workSet.claims.map((item) => item.path));
  const additions: WorkClaim[] = [];
  const ownEvidence = path.relative(root, guideWorkSetPath(root, config)).split(path.sep).join("/");

  for (const raw of values) {
    const relative = normalizeProjectPath(raw);
    if (implicit.has(relative)) continue;
    for (const [claimed, owner] of other) {
      if (relative === claimed || relative.startsWith(`${claimed}/`) || claimed.startsWith(`${relative}/`)) {
        throw new Error(`Guide write claim conflict: ${relative} overlaps active session ${owner} path ${claimed}.`);
      }
    }
    if (existing.has(relative)) continue;
    const beforeSha256 = await assertContainedRegularOrMissing(root, relative);
    const ignored = spawnSync("git", ["check-ignore", "-q", "--", relative], { cwd: root, encoding: "utf8", env: { ...process.env, GIT_OPTIONAL_LOCKS: "0" } });
    if (ignored.status === 0) throw new Error(`Guide write claim is ignored by Git and cannot become durable evidence: ${relative}.`);
    if (ignored.status !== 1) throw new Error(`Unable to inspect Git ignore rules for Guide write claim ${relative}.`);
    const dirty = git(root, ["status", "--porcelain", "--untracked-files=all", "--", relative]);
    if (dirty.trim() !== "") throw new Error(`Guide write claim starts from an uncommitted path and provenance is ambiguous: ${relative}.`);
    const claimedAt = nowIso();
    additions.push({ path: relative, beforeSha256, afterSha256: beforeSha256, claimedAt, observedAt: claimedAt });
    existing.add(relative);
  }
  if (additions.length > 0 || !(await pathExists(guideWorkSetPath(root, config)))) {
    workSet.claims.push(...additions);
    workSet.claims.sort((a, b) => a.path.localeCompare(b.path));
    workSet.updatedAt = nowIso();
    await writeJsonAtomic(path.join(root, ownEvidence), workSet);
  }
  return workSet;
}

export async function claimGuidePaths(
  root: string,
  config: ProjectConfig,
  values: string[],
): Promise<SessionWorkSet> {
  const lease = await acquireGitOperationLock(root, "claim:guide", "atomic Guide write-claim acquisition", {
    stagedPaths: () => stagedProjectPaths(root),
    waitMs: 5_000,
  });
  try {
    return await claimGuidePathsUnlocked(root, config, values);
  } finally {
    await lease.release();
  }
}

async function collectSessionFiles(directory: string, root: string): Promise<string[]> {
  const result: string[] = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const candidate = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...await collectSessionFiles(candidate, root));
    else if (entry.isFile()) result.push(path.relative(root, candidate).split(path.sep).join("/"));
    else throw new Error(`Session evidence contains a symbolic link or special file: ${path.relative(root, candidate)}.`);
  }
  return result;
}

export async function ownedSessionPaths(root: string, config: ProjectConfig, sessionId: string): Promise<string[]> {
  const session = await loadSession(root, config, sessionId);
  const workSet = await loadSessionWorkSet(session.directory, sessionId);
  return [...new Set([...await collectSessionFiles(session.directory, root), ...workSet.claims.map((item) => item.path)])].sort();
}

export async function validateSessionWorktree(root: string, config: ProjectConfig, sessionId: string): Promise<void> {
  const session = await loadSession(root, config, sessionId);
  const ownPrefix = path.relative(root, session.directory).split(path.sep).join("/");
  const own = new Set((await loadSessionWorkSet(session.directory, sessionId)).claims.map((item) => item.path));
  const guide = await guideOwnedPaths(root, config);
  const siblings = await activeSessionClaims(root, config, sessionId);
  const ambiguous: string[] = [];
  for (const changed of changedProjectPaths(root)) {
    if (changed === ownPrefix || changed.startsWith(`${ownPrefix}/`) || own.has(changed)) continue;
    let guideOwned = false;
    for (const claimed of guide) {
      if (changed === claimed || changed.startsWith(`${claimed}/`)) { guideOwned = true; break; }
    }
    if (guideOwned) continue;
    let siblingOwned = false;
    for (const claimed of siblings.keys()) {
      if (changed === claimed || changed.startsWith(`${claimed}/`)) { siblingOwned = true; break; }
    }
    if (!siblingOwned) ambiguous.push(changed);
  }
  if (ambiguous.length > 0) {
    throw new Error(`Unclaimed project mutation has ambiguous provenance; declare it before writing: ${ambiguous.join(", ")}.`);
  }
}

export async function reconcileSessionWorkSet(root: string, config: ProjectConfig, sessionId: string): Promise<SessionWorkSet> {
  await validateSessionWorktree(root, config, sessionId);
  const session = await loadSession(root, config, sessionId);
  const workSet = await loadSessionWorkSet(session.directory, sessionId);
  let changed = false;
  for (const claim of workSet.claims) {
    const current = await assertContainedRegularOrMissing(root, claim.path);
    if (claim.afterSha256 !== current || claim.observedAt === undefined) {
      claim.afterSha256 = current;
      claim.observedAt = nowIso();
      changed = true;
    }
  }
  if (changed) {
    workSet.updatedAt = nowIso();
    await writeJsonAtomic(workSetPath(session.directory), workSet);
  }
  return workSet;
}

export async function verifySessionWorkSetObservations(root: string, config: ProjectConfig, sessionId: string): Promise<void> {
  const session = await loadSession(root, config, sessionId);
  const workSet = await loadSessionWorkSet(session.directory, sessionId);
  for (const claim of workSet.claims) {
    if (claim.afterSha256 === undefined || claim.observedAt === undefined) {
      throw new Error(`Session ${sessionId} write claim has no post-work observation: ${claim.path}.`);
    }
    const current = await assertContainedRegularOrMissing(root, claim.path);
    if (current !== claim.afterSha256) {
      throw new Error(`Same-path conflict: ${claim.path} changed after session ${sessionId} recorded its post-work hash.`);
    }
  }
}

/**
 * Revalidates every externally claimed output from disk and Git at immutable
 * close time. The session folder's own files are checked by checkGitClosure;
 * these paths sit outside that folder and therefore require their own proof.
 */
export async function checkSessionClaimClosure(
  root: string,
  sessionDirectory: string,
  sessionId: string,
): Promise<string[]> {
  const reasons: string[] = [];
  let workSet: SessionWorkSet;
  try {
    workSet = await loadSessionWorkSet(sessionDirectory, sessionId);
  } catch (error) {
    return [error instanceof Error ? error.message : String(error)];
  }

  for (const claim of workSet.claims) {
    if (claim.afterSha256 === undefined || claim.observedAt === undefined) {
      reasons.push(`Claimed session output has no post-work observation: ${claim.path}.`);
      continue;
    }

    let current: string | null;
    try {
      current = await assertContainedRegularOrMissing(root, claim.path);
    } catch (error) {
      reasons.push(error instanceof Error ? error.message : String(error));
      continue;
    }
    if (current !== claim.afterSha256) {
      reasons.push(`Claimed session output changed after its recorded post-work hash: ${claim.path}.`);
      continue;
    }

    const dirty = git(root, ["status", "--porcelain", "--untracked-files=all", "--", claim.path]);
    if (dirty !== "") {
      reasons.push(`Claimed session output has uncommitted changes: ${claim.path}.`);
      continue;
    }

    const tracked = spawnSync("git", ["ls-files", "--error-unmatch", "--", claim.path], {
      cwd: root,
      encoding: "utf8",
      env: { ...process.env, GIT_OPTIONAL_LOCKS: "0" },
    }).status === 0;
    if (claim.afterSha256 === null) {
      if (tracked) reasons.push(`Claimed session deletion has not been committed: ${claim.path}.`);
    } else if (!tracked) {
      reasons.push(`Claimed session output is not committed: ${claim.path}.`);
      continue;
    }

    const pushed = spawnSync("git", ["diff", "--quiet", "@{u}", "--", claim.path], {
      cwd: root,
      encoding: "utf8",
      env: { ...process.env, GIT_OPTIONAL_LOCKS: "0" },
    });
    if (pushed.status !== 0) {
      reasons.push(`Claimed session output has not been pushed: ${claim.path}.`);
    }
  }
  return reasons;
}

async function indexPathSha256(root: string, relative: string): Promise<string | null> {
  const listed = spawnSync("git", ["ls-files", "--stage", "-z", "--", relative], {
    cwd: root,
    encoding: "utf8",
    maxBuffer: 20 * 1024 * 1024,
    env: { ...process.env, GIT_OPTIONAL_LOCKS: "0" },
  });
  if (listed.status !== 0) throw new Error(`Unable to inspect staged Git identity for ${relative}.`);
  const entries = listed.stdout.split("\0").filter(Boolean);
  if (entries.length === 0) return null;
  if (entries.length !== 1) throw new Error(`Staged Git identity is ambiguous for ${relative}.`);
  const match = /^[0-7]{6} ([0-9a-f]{40,64}) 0\t/.exec(entries[0]!);
  if (!match) throw new Error(`Staged Git identity has a nonzero stage or invalid blob for ${relative}.`);
  const blob = spawnSync("git", ["cat-file", "blob", match[1]!], {
    cwd: root,
    encoding: "buffer",
    maxBuffer: 20 * 1024 * 1024,
    env: { ...process.env, GIT_OPTIONAL_LOCKS: "0" },
  });
  if (blob.status !== 0) throw new Error(`Unable to read staged Git bytes for ${relative}.`);
  return sha256(blob.stdout);
}

export async function verifyStagedSessionClaims(root: string, config: ProjectConfig, sessionId: string): Promise<void> {
  const session = await loadSession(root, config, sessionId);
  const workSet = await loadSessionWorkSet(session.directory, sessionId);
  for (const claim of workSet.claims) {
    if (claim.afterSha256 === undefined) throw new Error(`Session ${sessionId} write claim has no post-work hash: ${claim.path}.`);
    const staged = await indexPathSha256(root, claim.path);
    if (staged !== claim.afterSha256) {
      throw new Error(`Staged-byte conflict: ${claim.path} does not match session ${sessionId}'s recorded post-work hash.`);
    }
  }
}
