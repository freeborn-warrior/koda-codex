import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { mkdtemp } from "node:fs/promises";
import test from "node:test";

import { evaluateSessionClosure, prepareCloseArtifact } from "../src/close.ts";
import { artifactPath, createSession, saveSessionState, writeJsonAtomic } from "../src/project.ts";
import { createFreshReview, recordApproval, reviewSha256 } from "../src/receipt.ts";
import { DEFAULT_CONFIG } from "../src/config.ts";
import { projectHarness } from "./helpers.ts";

test("session creation requires a prompt and numbers dated folders", async (t) => {
  const h = await projectHarness(t);
  await assert.rejects(() => createSession(h.root, h.config, " \n"), /non-empty/);
  const second = await createSession(h.root, h.config, "# Another session purpose\n");
  assert.match(h.session.id, /^\d{4}-\d{2}-\d{2}-01$/);
  assert.match(second.id, /^\d{4}-\d{2}-\d{2}-02$/);
  assert.equal(second.state.currentPhaseIndex, 0);
});

test("a completed session is closed only after its state is committed and pushed", async (t) => {
  const parent = await mkdtemp(path.join(tmpdir(), "koda-close-test-"));
  t.after(async () => rm(parent, { recursive: true, force: true }));
  const root = path.join(parent, "project");
  const remote = path.join(parent, "remote.git");
  await mkdir(root);
  await writeJsonAtomic(path.join(root, "koda.config.json"), { ...DEFAULT_CONFIG, phases: DEFAULT_CONFIG.phases.slice(0, 1) });
  await mkdir(path.join(root, DEFAULT_CONFIG.sessionsDir), { recursive: true });
  const session = await createSession(root, { ...DEFAULT_CONFIG, phases: DEFAULT_CONFIG.phases.slice(0, 1) }, "# Prompt\n");
  const phase = session.state.phases[0];
  await writeFile(artifactPath(session.directory, phase, 0), "# Completed artifact\n", "utf8");
  const review = await createFreshReview(session.directory, phase, 0, {
    verdict: "APPROVE",
    body: "# Peer review\n\nThe artifact is complete.",
  });
  await recordApproval(session.directory, {
    version: 1,
    phase: phase.name,
    reviewId: review.metadata.id,
    reviewSha256: await reviewSha256(session.directory, phase, 0),
    verdict: "APPROVE",
    receipt: review.metadata.receipt,
    approver: "Kristian",
    comments: null,
    ruling: null,
    recordedAt: new Date().toISOString(),
  });
  session.state.currentPhaseIndex = session.state.phases.length;
  session.state.advances.push({
    phase: phase.name,
    receipt: review.metadata.receipt,
    reviewId: review.metadata.id,
    advancedAt: new Date().toISOString(),
  });
  await saveSessionState(session.directory, session.state);

  execFileSync("git", ["init", "--bare", remote]);
  execFileSync("git", ["init", "-b", "main"], { cwd: root });
  execFileSync("git", ["config", "user.name", "Koda Test"], { cwd: root });
  execFileSync("git", ["config", "user.email", "koda@example.invalid"], { cwd: root });
  execFileSync("git", ["remote", "add", "origin", remote], { cwd: root });

  assert.deepEqual(await evaluateSessionClosure(root, session.directory, session.state), {
    closed: false,
    reasons: ["The immutable close.md artifact has not been prepared."],
  });
  await prepareCloseArtifact(session.directory, session.state);
  const nextPrompt = path.join(root, "next-prompt.md");
  await writeFile(nextPrompt, "# Next owner prompt\n", "utf8");
  const prepared = await evaluateSessionClosure(root, session.directory, session.state);
  assert.equal(prepared.closed, false);
  assert(prepared.reasons.includes("The session has uncommitted changes."));
  const cli = path.resolve("src/cli.ts");
  const beforeCommit = spawnSync(process.execPath, [cli, "session", "new", nextPrompt], { cwd: root, encoding: "utf8" });
  assert.equal(beforeCommit.status, 1);
  assert.match(beforeCommit.stderr, /is not closed/);

  execFileSync("git", ["add", "."], { cwd: root });
  execFileSync("git", ["commit", "-m", "complete and close session"], { cwd: root });
  const localOnly = await evaluateSessionClosure(root, session.directory, session.state);
  assert.equal(localOnly.closed, false);
  assert(localOnly.reasons.includes("The current branch has no pushed upstream branch."));
  const beforePush = spawnSync(process.execPath, [cli, "session", "new", nextPrompt], { cwd: root, encoding: "utf8" });
  assert.equal(beforePush.status, 1);
  assert.match(beforePush.stderr, /no pushed upstream branch/);
  execFileSync("git", ["push", "-u", "origin", "main"], { cwd: root });

  assert.deepEqual(await evaluateSessionClosure(root, session.directory, session.state), { closed: true, reasons: [] });
  const afterPush = spawnSync(process.execPath, [cli, "session", "new", nextPrompt], { cwd: root, encoding: "utf8" });
  assert.equal(afterPush.status, 0, afterPush.stderr);
  assert.match(afterPush.stdout, /Opened session .*\-02/);
  await writeFile(path.join(session.directory, "late-change.md"), "This should invalidate closure.\n", "utf8");
  const changed = await evaluateSessionClosure(root, session.directory, session.state);
  assert.equal(changed.closed, false);
  assert(changed.reasons.includes("Session files changed after close.md was prepared."));
  assert(changed.reasons.includes("The session has uncommitted changes."));
});
