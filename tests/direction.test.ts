import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdir, readFile, readdir, rename, rm, symlink, writeFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

import { prepareCloseArtifact } from "../src/close.ts";
import { DEFAULT_CONFIG } from "../src/config.ts";
import {
  carryDirectionsForNextSession,
  createWaitingDirection,
  readWaitingDirections,
  WAITING_DIRECTION_PREFIX,
} from "../src/direction.ts";
import { evaluateGate } from "../src/gate.ts";
import { artifactPath, createSession, loadSessionState, saveSessionState, writeJsonAtomic } from "../src/project.ts";
import { createFreshReview, recordApproval, reviewSha256 } from "../src/receipt.ts";
import type { PhaseConfig } from "../src/types.ts";
import { projectHarness, temporaryRoot } from "./helpers.ts";

const cli = path.resolve("src/cli.ts");

async function approveArtifact(sessionDir: string, phase: PhaseConfig, index: number) {
  const review = await createFreshReview(sessionDir, phase, index, {
    verdict: "APPROVE",
    body: `# Peer review — ${phase.name}\n\nThe artifact follows its frozen entry inputs.`,
  });
  await recordApproval(sessionDir, {
    version: 1,
    phase: phase.name,
    reviewId: review.metadata.id,
    reviewSha256: await reviewSha256(sessionDir, phase, index),
    verdict: "APPROVE",
    receipt: review.metadata.receipt,
    approver: "Kristian",
    comments: null,
    ruling: null,
    recordedAt: new Date().toISOString(),
  });
  return review;
}

test("WAIT DIRECTION: record now, keep current contract frozen, and release only through advance", async (t) => {
  const h = await projectHarness(t, 2);
  const brief = h.session.state.phases[0];
  const direction = await createWaitingDirection({
    sessionDir: h.session.directory,
    state: h.session.state,
    source: "owner-via-reviewer",
    ownerStatement: "Use a second output format after this phase.",
    classification: `${WAITING_DIRECTION_PREFIX}\nApply this only after Brief passes its gate.`,
  });
  assert.equal(direction.metadata.artifactState, "ABSENT");
  assert.equal((await readWaitingDirections(h.session.directory)).length, 1);

  await writeFile(artifactPath(h.session.directory, brief, 0), "# Brief\n\nKeep the original frozen contract.\n", "utf8");
  await approveArtifact(h.session.directory, brief, 0);
  assert.equal((await evaluateGate(h.session.directory, brief, 0)).open, true);

  const advanced = spawnSync(process.execPath, [cli, "advance"], { cwd: h.root, encoding: "utf8" });
  assert.equal(advanced.status, 0, advanced.stderr);
  assert.match(advanced.stdout, /Released 1 waiting direction/);
  const state = await loadSessionState(h.session.directory, h.session.id);
  assert.deepEqual(state.advances[0].directions, [direction.metadata.id]);

  const orient = state.phases[1];
  const orientPath = artifactPath(h.session.directory, orient, 1);
  await writeFile(orientPath, "# Orientation\n\nNo direction citation yet.\n", "utf8");
  await approveArtifact(h.session.directory, orient, 1);
  const missing = await evaluateGate(h.session.directory, orient, 1);
  assert.equal(missing.open, false);
  assert.match(missing.issues.find((issue) => issue.code === "direction_input_missing")?.message ?? "", new RegExp(direction.metadata.id));

  await writeFile(orientPath, `# Orientation\n\nApplied waiting direction ${direction.metadata.id}.\n`, "utf8");
  await approveArtifact(h.session.directory, orient, 1);
  assert.equal((await evaluateGate(h.session.directory, orient, 1)).open, true);
});

test("WAIT DIRECTION MUTATION: citing a queued direction before its gate refuses split provenance", async (t) => {
  const h = await projectHarness(t, 2);
  const brief = h.session.state.phases[0];
  const direction = await createWaitingDirection({
    sessionDir: h.session.directory,
    state: h.session.state,
    source: "owner-via-guide",
    ownerStatement: "Change the next phase's scope.",
    classification: `${WAITING_DIRECTION_PREFIX}\nThe current Brief must not consume this.`,
  });
  await writeFile(
    artifactPath(h.session.directory, brief, 0),
    `# Brief\n\nIllegally used ${direction.metadata.id} before the gate.\n`,
    "utf8",
  );
  await approveArtifact(h.session.directory, brief, 0);
  const result = await evaluateGate(h.session.directory, brief, 0);
  assert.equal(result.open, false);
  assert.match(result.issues.find((issue) => issue.code === "direction_used_before_gate")?.message ?? "", /cannot be used before the next gate/);
});

test("WAIT DIRECTION CARRY: final-boundary direction becomes a hashed next-session Brief input", async (t) => {
  const h = await projectHarness(t, 1);
  const brief = h.session.state.phases[0];
  const direction = await createWaitingDirection({
    sessionDir: h.session.directory,
    state: h.session.state,
    source: "owner-via-guide",
    ownerStatement: "Carry this into the next session Brief.",
    classification: `${WAITING_DIRECTION_PREFIX}\nRelease at the session boundary.`,
  });
  await writeFile(artifactPath(h.session.directory, brief, 0), "# Brief\n\nFinish the frozen session.\n", "utf8");
  const review = await approveArtifact(h.session.directory, brief, 0);
  h.session.state.advances.push({
    phase: brief.name,
    receipt: review.metadata.receipt,
    reviewId: review.metadata.id,
    advancedAt: new Date().toISOString(),
    directions: [direction.metadata.id],
  });
  h.session.state.currentPhaseIndex = 1;
  await writeFile(path.join(h.session.directory, "state.json"), `${JSON.stringify(h.session.state, null, 2)}\n`, "utf8");

  const carried = await carryDirectionsForNextSession(h.session.directory, h.session.state);
  assert.equal(carried.length, 1);
  assert.equal(carried[0].id, direction.metadata.id);
  const next = await createSession(h.root, h.config, "# Next prompt\n", { entryDirections: carried });
  await writeFile(artifactPath(next.directory, next.state.phases[0], 0), "# Brief\n\nMissing carry citation.\n", "utf8");
  await approveArtifact(next.directory, next.state.phases[0], 0);
  const missing = await evaluateGate(next.directory, next.state.phases[0], 0);
  assert.equal(missing.open, false);
  assert.equal(missing.issues.some((issue) => issue.code === "direction_input_missing"), true);

  const source = (await readWaitingDirections(h.session.directory))[0];
  assert.equal(carried[0].sha256.length, 64);
  assert.match(await readFile(source.path, "utf8"), new RegExp(direction.metadata.id));
});

test("WAIT DIRECTION MUTATION: changed prose and symbolic-link evidence refuse by name", async (t) => {
  const h = await projectHarness(t, 1);
  const direction = await createWaitingDirection({
    sessionDir: h.session.directory,
    state: h.session.state,
    source: "owner-via-reviewer",
    ownerStatement: "Keep the exact recorded words.",
    classification: `${WAITING_DIRECTION_PREFIX}\nRelease only at the next gate.`,
  });
  const original = await readFile(direction.path, "utf8");
  await writeFile(direction.path, original.replace("> Keep the exact recorded words.", "> Change the recorded words."), "utf8");
  await assert.rejects(readWaitingDirections(h.session.directory), /Waiting direction is incomplete/);

  await rm(direction.path);
  await symlink(path.join(h.session.directory, "session-prompt.md"), direction.path);
  await assert.rejects(readWaitingDirections(h.session.directory), /must be a regular file/);
});

test("WAIT DIRECTION ATOMIC READ: Koda retries its transient file but persistent or unknown entries still refuse", async (t) => {
  const h = await projectHarness(t, 1);
  const direction = await createWaitingDirection({
    sessionDir: h.session.directory,
    state: h.session.state,
    source: "owner-via-reviewer",
    ownerStatement: "Preserve this direction across the atomic read.",
    classification: `${WAITING_DIRECTION_PREFIX}\nRelease only at the next gate.`,
  });
  const temporary = `${direction.path}.tmp-99999-deadbeef`;
  await rename(direction.path, temporary);
  const restoration = new Promise<void>((resolve, reject) => {
    setTimeout(() => { rename(temporary, direction.path).then(() => resolve(), reject); }, 20);
  });
  assert.equal((await readWaitingDirections(h.session.directory)).length, 1);
  await restoration;

  await writeFile(temporary, direction.content, "utf8");
  await assert.rejects(
    readWaitingDirections(h.session.directory),
    /Atomic waiting direction write did not settle: 01-wait\.md\.tmp-99999-deadbeef/,
  );
  await rm(temporary);
  await writeFile(path.join(h.session.directory, "directions", "unexpected.txt"), "not Koda evidence\n", "utf8");
  await assert.rejects(readWaitingDirections(h.session.directory), /Unexpected waiting direction entry: unexpected\.txt/);
});

test("WAIT DIRECTION CONTAINMENT: a linked direction directory cannot redirect writes", async (t) => {
  const h = await projectHarness(t, 1);
  const outside = path.join(h.root, "outside-directions");
  await mkdir(outside);
  await symlink(outside, path.join(h.session.directory, "directions"));
  await assert.rejects(createWaitingDirection({
    sessionDir: h.session.directory,
    state: h.session.state,
    source: "owner-via-guide",
    ownerStatement: "This must stay inside the session.",
    classification: `${WAITING_DIRECTION_PREFIX}\nRelease only at the next gate.`,
  }), /Waiting direction root must be a real directory inside the active session/);
  assert.deepEqual(await readdir(outside), []);
});

test("WAIT FINAL BOUNDARY: a new session prompt must cite direction released by the final gate", async (t) => {
  const parent = await temporaryRoot(t, "koda-direction-boundary-");
  const root = path.join(parent, "project");
  const remote = path.join(parent, "remote.git");
  await mkdir(path.join(root, "docs", "sessions"), { recursive: true });
  const config = { ...DEFAULT_CONFIG, phases: DEFAULT_CONFIG.phases.slice(0, 1) };
  await writeJsonAtomic(path.join(root, "koda.config.json"), config);
  const session = await createSession(root, config, "# First prompt\n");
  const phase = session.state.phases[0];
  const direction = await createWaitingDirection({
    sessionDir: session.directory,
    state: session.state,
    source: "owner-via-guide",
    ownerStatement: "Carry this across the session boundary.",
    classification: `${WAITING_DIRECTION_PREFIX}\nThe next receiver is a fresh Brief.`,
  });
  await writeFile(artifactPath(session.directory, phase, 0), "# Brief\n\nComplete the frozen session.\n", "utf8");
  const review = await approveArtifact(session.directory, phase, 0);
  session.state.currentPhaseIndex = 1;
  session.state.advances.push({
    phase: phase.name,
    receipt: review.metadata.receipt,
    reviewId: review.metadata.id,
    advancedAt: new Date().toISOString(),
    directions: [direction.metadata.id],
  });
  await saveSessionState(session.directory, session.state);
  await prepareCloseArtifact(session.directory, session.state);
  execFileSync("git", ["init", "--bare", remote]);
  execFileSync("git", ["init", "-b", "main"], { cwd: root });
  execFileSync("git", ["config", "user.name", "Koda Test"], { cwd: root });
  execFileSync("git", ["config", "user.email", "koda@example.invalid"], { cwd: root });
  execFileSync("git", ["remote", "add", "origin", remote], { cwd: root });
  execFileSync("git", ["add", "-A"], { cwd: root });
  execFileSync("git", ["commit", "-m", "close first session"], { cwd: root });
  execFileSync("git", ["push", "-u", "origin", "main"], { cwd: root });

  const nextPrompt = path.join(parent, "next.md");
  await writeFile(nextPrompt, "# Next prompt without boundary direction\n", "utf8");
  const missing = spawnSync(process.execPath, [cli, "session", "new", nextPrompt], { cwd: root, encoding: "utf8" });
  assert.equal(missing.status, 1);
  assert.match(missing.stderr, /must cite every direction released at the prior session boundary/);
  assert.match(missing.stderr, new RegExp(direction.metadata.id));

  await writeFile(nextPrompt, `# Next prompt\n\nCarry direction ${direction.metadata.id}.\n`, "utf8");
  const opened = spawnSync(process.execPath, [cli, "session", "new", nextPrompt], { cwd: root, encoding: "utf8" });
  assert.equal(opened.status, 0, opened.stderr);
  assert.match(opened.stdout, /Waiting directions entering Brief: 1/);
});
