import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdir, readFile, rename, rm, symlink, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

import { DEFAULT_CONFIG } from "../src/config.ts";
import { runCli } from "../src/commands.ts";
import { acquireGitOperationLock, GIT_OPERATION_LOCK } from "../src/git-operation-lock.ts";
import { createSession, writeJsonAtomic } from "../src/project.ts";
import { changedProjectPaths, claimGuidePaths, claimSessionPaths, ownedSessionPaths, reconcileSessionWorkSet, stagedProjectPaths, validateSessionWorktree, verifySessionWorkSetObservations, verifyStagedSessionClaims } from "../src/workset.ts";
import { temporaryRoot } from "./helpers.ts";

function git(root: string, args: string[]): string {
  const result = spawnSync("git", args, { cwd: root, encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr);
  return result.stdout.trim();
}

async function harness(t: Parameters<typeof temporaryRoot>[0]) {
  const root = await temporaryRoot(t, "koda-workset-");
  await mkdir(path.join(root, "docs", "sessions"), { recursive: true });
  await mkdir(path.join(root, "docs", "guide"), { recursive: true });
  await writeJsonAtomic(path.join(root, "koda.config.json"), DEFAULT_CONFIG);
  await writeFile(path.join(root, ".gitignore"), ".koda/\n", "utf8");
  await writeFile(path.join(root, "docs", "PROJECT.md"), "# Project\n", "utf8");
  await writeJsonAtomic(path.join(root, "docs", "guide", "project.json"), {
    version: 1,
    project: "Work-set test",
    continuityFiles: ["docs/PROJECT.md"],
  });
  git(root, ["init", "-b", "main"]);
  git(root, ["config", "user.name", "Koda Tests"]);
  git(root, ["config", "user.email", "tests@example.invalid"]);
  git(root, ["add", "-A"]);
  git(root, ["commit", "-m", "initial"]);
  const first = await createSession(root, DEFAULT_CONFIG, "# First\n", { kind: "produce" });
  const second = await createSession(root, DEFAULT_CONFIG, "# Second\n", { kind: "explore" });
  return { root, first, second };
}

test("WRITE SET: claims exact clean paths and refuses Guide or sibling overlap", async (t) => {
  const h = await harness(t);
  await claimSessionPaths(h.root, DEFAULT_CONFIG, h.first.id, ["src/output.js"]);
  await assert.rejects(
    claimSessionPaths(h.root, DEFAULT_CONFIG, h.second.id, ["src/output.js"]),
    /overlaps active session/,
  );
  await assert.rejects(
    claimSessionPaths(h.root, DEFAULT_CONFIG, h.first.id, ["docs/PROJECT.md"]),
    /overlaps Guide continuity/,
  );
  await writeFile(path.join(h.root, "src-output.tmp"), "dirty", "utf8");
  await assert.rejects(
    claimSessionPaths(h.root, DEFAULT_CONFIG, h.first.id, ["src-output.tmp"]),
    /provenance is ambiguous/,
  );
});

test("WRITE SET CONCURRENCY: simultaneous same-path claims cannot both succeed", async (t) => {
  const h = await harness(t);
  const attempts = await Promise.allSettled([
    claimSessionPaths(h.root, DEFAULT_CONFIG, h.first.id, ["src/shared.js"]),
    claimSessionPaths(h.root, DEFAULT_CONFIG, h.second.id, ["src/shared.js"]),
  ]);
  assert.equal(attempts.filter((item) => item.status === "fulfilled").length, 1);
  assert.equal(attempts.filter((item) => item.status === "rejected").length, 1);
  assert.match(String((attempts.find((item) => item.status === "rejected") as PromiseRejectedResult).reason), /Git operation is locked by claim:/);
  const winner = attempts[0]!.status === "fulfilled" ? h.first.id : h.second.id;
  const loser = winner === h.first.id ? h.second.id : h.first.id;
  await assert.rejects(
    claimSessionPaths(h.root, DEFAULT_CONFIG, loser, ["src/shared.js"]),
    new RegExp(`overlaps active session ${winner}`),
  );
});

test("WRITE SET CONTAINMENT: a linked parent cannot alias a claimed output path", async (t) => {
  const h = await harness(t);
  await mkdir(path.join(h.root, "real-src"));
  await symlink(path.join(h.root, "real-src"), path.join(h.root, "linked-src"));
  await assert.rejects(
    claimSessionPaths(h.root, DEFAULT_CONFIG, h.first.id, ["linked-src/output.js"]),
    /symbolic link.*linked-src\/output\.js/,
  );
  assert.deepEqual(await readFile(path.join(h.first.directory, "session-prompt.md"), "utf8"), "# First\n");
});

test("WRITE SET CLI: explicit session identity records project-relative output ownership", async (t) => {
  const h = await harness(t);
  const output: string[] = [];
  await runCli(
    ["work", "claim", "src/one.js", "src/two.js", "--session", h.first.id],
    h.root,
    { out: (line) => output.push(line), error: () => undefined, prompt: async () => "" },
  );
  assert.match(output.join("\n"), new RegExp(`WRITE SET — ${h.first.id}`));
  const workSet = JSON.parse(await readFile(path.join(h.first.directory, "write-set.json"), "utf8"));
  assert.deepEqual(workSet.claims.map((item: { path: string }) => item.path), ["src/one.js", "src/two.js"]);
});

test("WRITE SET STATUS TRUTH: corrupt disk evidence refuses instead of inferring state", async (t) => {
  const h = await harness(t);
  await claimSessionPaths(h.root, DEFAULT_CONFIG, h.first.id, ["src/output.js"]);
  const evidence = path.join(h.first.directory, "write-set.json");
  const workSet = JSON.parse(await readFile(evidence, "utf8"));
  workSet.updatedAt = "not-a-timestamp";
  await writeFile(evidence, `${JSON.stringify(workSet, null, 2)}\n`, "utf8");

  await assert.rejects(
    runCli(
      ["status", "--session", h.first.id],
      h.root,
      { out: () => undefined, error: () => undefined, prompt: async () => "" },
    ),
    new RegExp(`Session ${h.first.id} has invalid write-set evidence`),
  );
});

test("GUIDE WRITE SET: new Guide files are explicit and active-session overlap refuses", async (t) => {
  const h = await harness(t);
  await claimGuidePaths(h.root, DEFAULT_CONFIG, ["docs/DECISIONS.md", "src/future.js"]);
  await writeFile(path.join(h.root, "docs", "DECISIONS.md"), "# Decisions\n", "utf8");
  await validateSessionWorktree(h.root, DEFAULT_CONFIG, h.first.id);
  await assert.rejects(
    claimSessionPaths(h.root, DEFAULT_CONFIG, h.first.id, ["docs/DECISIONS.md"]),
    /overlaps Guide continuity/,
  );
  await assert.rejects(
    claimSessionPaths(h.root, DEFAULT_CONFIG, h.first.id, ["src/future.js/child.js"]),
    /overlaps Guide continuity or explicit write-set path src\/future\.js/,
  );
  await claimSessionPaths(h.root, DEFAULT_CONFIG, h.first.id, ["src/session.js"]);
  await assert.rejects(
    claimGuidePaths(h.root, DEFAULT_CONFIG, ["src/session.js"]),
    /overlaps active session/,
  );
});

test("WRITE SET: unrelated Guide and sibling dirt may coexist; unclaimed dirt refuses", async (t) => {
  const h = await harness(t);
  await claimSessionPaths(h.root, DEFAULT_CONFIG, h.first.id, ["src/output.js"]);
  await writeFile(path.join(h.root, "docs", "PROJECT.md"), "# Guide changed\n", "utf8");
  await writeFile(path.join(h.second.directory, "phases", "01-brief.md"), "# Sibling\n", "utf8");
  await mkdir(path.join(h.root, "src"), { recursive: true });
  await writeFile(path.join(h.root, "src", "output.js"), "export {};\n", "utf8");
  await validateSessionWorktree(h.root, DEFAULT_CONFIG, h.first.id);
  await writeFile(path.join(h.root, "README.tmp"), "ambiguous\n", "utf8");
  await assert.rejects(validateSessionWorktree(h.root, DEFAULT_CONFIG, h.first.id), /Unclaimed project mutation.*README\.tmp/);
  const owned = await ownedSessionPaths(h.root, DEFAULT_CONFIG, h.first.id);
  assert.ok(owned.includes("src/output.js"));
  assert.ok(owned.every((item) => item !== "docs/PROJECT.md"));
});

test("WRITE SET MUTATION: rename and delete are exact owned changes, including both rename sides", async (t) => {
  const h = await harness(t);
  await mkdir(path.join(h.root, "src"), { recursive: true });
  await writeFile(path.join(h.root, "src", "old.js"), "export const old = true;\n", "utf8");
  await writeFile(path.join(h.root, "src", "delete.js"), "export const gone = true;\n", "utf8");
  git(h.root, ["add", "-A"]);
  git(h.root, ["commit", "-m", "seed rename and delete paths"]);
  await claimSessionPaths(h.root, DEFAULT_CONFIG, h.first.id, ["src/old.js", "src/new.js", "src/delete.js"]);
  await rename(path.join(h.root, "src", "old.js"), path.join(h.root, "src", "new.js"));
  await unlink(path.join(h.root, "src", "delete.js"));
  const observed = await reconcileSessionWorkSet(h.root, DEFAULT_CONFIG, h.first.id);
  assert.ok(observed.claims.every((claim) => claim.observedAt && claim.afterSha256 !== undefined));
  await verifySessionWorkSetObservations(h.root, DEFAULT_CONFIG, h.first.id);
  const changed = changedProjectPaths(h.root);
  for (const expected of ["src/old.js", "src/new.js", "src/delete.js"]) assert.ok(changed.includes(expected), `${expected} was not detected`);
  git(h.root, ["add", "--", ...await ownedSessionPaths(h.root, DEFAULT_CONFIG, h.first.id)]);
  await verifyStagedSessionClaims(h.root, DEFAULT_CONFIG, h.first.id);
  const staged = stagedProjectPaths(h.root);
  for (const expected of ["src/old.js", "src/new.js", "src/delete.js"]) assert.ok(staged.includes(expected), `${expected} was not staged`);
  assert.equal(staged.includes("docs/PROJECT.md"), false);
});

test("WRITE SET MUTATION: staged bytes must match the recorded post-work hash", async (t) => {
  const h = await harness(t);
  await mkdir(path.join(h.root, "src"), { recursive: true });
  await claimSessionPaths(h.root, DEFAULT_CONFIG, h.first.id, ["src/output.js"]);
  await writeFile(path.join(h.root, "src", "output.js"), "export const value = 1;\n", "utf8");
  await reconcileSessionWorkSet(h.root, DEFAULT_CONFIG, h.first.id);
  await writeFile(path.join(h.root, "src", "output.js"), "export const value = 2;\n", "utf8");
  git(h.root, ["add", "--", ...await ownedSessionPaths(h.root, DEFAULT_CONFIG, h.first.id)]);
  await assert.rejects(
    verifyStagedSessionClaims(h.root, DEFAULT_CONFIG, h.first.id),
    new RegExp(`Staged-byte conflict: src/output\\.js does not match session ${h.first.id}`),
  );
});

test("WRITE SET MUTATION: a claimed path changed after post-work observation refuses by name", async (t) => {
  const h = await harness(t);
  await mkdir(path.join(h.root, "src"), { recursive: true });
  await claimSessionPaths(h.root, DEFAULT_CONFIG, h.first.id, ["src/output.js"]);
  await writeFile(path.join(h.root, "src", "output.js"), "export const value = 1;\n", "utf8");
  await reconcileSessionWorkSet(h.root, DEFAULT_CONFIG, h.first.id);
  await writeFile(path.join(h.root, "src", "output.js"), "export const value = 2;\n", "utf8");
  await assert.rejects(
    verifySessionWorkSetObservations(h.root, DEFAULT_CONFIG, h.first.id),
    new RegExp(`Same-path conflict: src/output\\.js changed after session ${h.first.id}`),
  );
});

test("GIT LOCK: live owner refuses, stale lock recovers only with an empty index", async (t) => {
  const h = await harness(t);
  const first = await acquireGitOperationLock(h.root, "session-a", "commit", { stagedPaths: () => stagedProjectPaths(h.root) });
  await assert.rejects(
    acquireGitOperationLock(h.root, "session-b", "commit", { stagedPaths: () => stagedProjectPaths(h.root) }),
    /locked by session-a/,
  );
  await first.release();

  const lock = path.join(h.root, GIT_OPERATION_LOCK);
  await mkdir(lock, { recursive: true });
  await writeFile(path.join(lock, "LOCK.json"), `${JSON.stringify({
    version: 1,
    token: "stale",
    pid: 99999999,
    owner: "crashed-session",
    operation: "commit",
    acquiredAt: new Date().toISOString(),
  })}\n`, "utf8");
  const recovered = await acquireGitOperationLock(h.root, "session-b", "commit", { stagedPaths: () => stagedProjectPaths(h.root) });
  await recovered.release();

  await mkdir(lock, { recursive: true });
  await writeFile(path.join(lock, "LOCK.json"), `${JSON.stringify({
    version: 1,
    token: "stale-2",
    pid: 99999999,
    owner: "crashed-session",
    operation: "commit",
    acquiredAt: new Date().toISOString(),
  })}\n`, "utf8");
  git(h.root, ["add", "koda.config.json"]);
  assert.deepEqual(stagedProjectPaths(h.root), []);
  await writeFile(path.join(h.root, "koda.config.json"), `${await readFile(path.join(h.root, "koda.config.json"), "utf8")} `, "utf8");
  git(h.root, ["add", "koda.config.json"]);
  await assert.rejects(
    acquireGitOperationLock(h.root, "session-b", "commit", { stagedPaths: () => stagedProjectPaths(h.root) }),
    /shared index contains staged paths: koda\.config\.json/,
  );
});

test("GIT LOCK CONTAINMENT: linked .koda cannot redirect lock evidence", async (t) => {
  const h = await harness(t);
  const area = path.join(h.root, ".koda");
  await rm(area, { recursive: true, force: true });
  const redirect = path.join(h.root, "redirected-lock-area");
  await mkdir(redirect);
  await symlink(redirect, area);
  await assert.rejects(
    acquireGitOperationLock(h.root, "session-a", "commit", { stagedPaths: () => stagedProjectPaths(h.root) }),
    /lock parent must be a real project-local directory.*symbolic links are refused/,
  );
  assert.deepEqual(await import("node:fs/promises").then(({ readdir }) => readdir(redirect)), []);
});
