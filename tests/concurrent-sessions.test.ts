import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

import { prepareCloseArtifact } from "../src/close.ts";
import { DEFAULT_CONFIG } from "../src/config.ts";
import { artifactPath, createSession, loadSessionState, saveSessionState, writeJsonAtomic } from "../src/project.ts";
import { createFreshReview, recordApproval, reviewSha256 } from "../src/receipt.ts";
import { temporaryRoot } from "./helpers.ts";

const cli = path.resolve("src/cli.ts");

function run(root: string, args: string[]) {
  return spawnSync(process.execPath, [cli, ...args], { cwd: root, encoding: "utf8" });
}

test("CONCURRENT SESSION MUTATION: independence is explicit and ambiguous mutation refuses", async (t) => {
  const root = await temporaryRoot(t, "koda-concurrent-");
  await writeJsonAtomic(path.join(root, "koda.config.json"), { ...DEFAULT_CONFIG, phases: DEFAULT_CONFIG.phases.slice(0, 1) });
  await mkdir(path.join(root, DEFAULT_CONFIG.sessionsDir), { recursive: true });
  const firstPrompt = path.join(root, "first.md");
  const secondPrompt = path.join(root, "second.md");
  await writeFile(firstPrompt, "# First workstream\n", "utf8");
  await writeFile(secondPrompt, "# Independent sibling\n", "utf8");

  const first = run(root, ["session", "new", firstPrompt, "--kind", "produce"]);
  assert.equal(first.status, 0, first.stderr);
  const implicit = run(root, ["session", "new", secondPrompt, "--kind", "explore"]);
  assert.equal(implicit.status, 1);
  assert.match(implicit.stderr, /neither closed nor pushed-halted/);
  assert.match(implicit.stderr, /Use --independent for a sibling workstream/);

  const sibling = run(root, ["session", "new", secondPrompt, "--kind", "explore", "--independent"]);
  assert.equal(sibling.status, 0, sibling.stderr);
  assert.match(sibling.stdout, /Kind: explore/);
  assert.match(sibling.stdout, /Launch: independent/);

  const ambiguous = run(root, ["review", "new", "brief"]);
  assert.equal(ambiguous.status, 1);
  assert.match(ambiguous.stderr, /More than one session is active; session identity is required/);
  assert.match(ambiguous.stderr, /--session <session-id>/);

  const projectStatus = run(root, ["status"]);
  assert.equal(projectStatus.status, 0, projectStatus.stderr);
  assert.match(projectStatus.stdout, /KODA PROJECT — 2 ACTIVE SESSIONS/);
  assert.match(projectStatus.stdout, /produce/);
  assert.match(projectStatus.stdout, /explore/);

  const firstId = /Opened session (\d{4}-\d{2}-\d{2}-\d{2})/.exec(first.stdout)?.[1];
  const secondId = /Opened session (\d{4}-\d{2}-\d{2}-\d{2})/.exec(sibling.stdout)?.[1];
  assert(firstId && secondId);
  const firstState = await loadSessionState(path.join(root, DEFAULT_CONFIG.sessionsDir, firstId), firstId);
  await writeFile(artifactPath(path.join(root, DEFAULT_CONFIG.sessionsDir, firstId), firstState.phases[0]!, 0), "# First brief\n", "utf8");
  const targeted = run(root, ["review", "new", "brief", "--session", firstId]);
  assert.equal(targeted.status, 0, targeted.stderr);
  assert.match(targeted.stdout, new RegExp(`${firstId}/reviews/01-brief-review\\.md`));
  assert.equal(
    await readFile(path.join(root, DEFAULT_CONFIG.sessionsDir, secondId, "state.json"), "utf8")
      .then((content) => JSON.parse(content).kind),
    "explore",
  );
});

test("DEPENDENCY MUTATION: an active predecessor refuses and pushed terminal evidence is hash-bound", async (t) => {
  const root = await temporaryRoot(t, "koda-dependency-");
  const remote = path.join(root, "remote.git");
  execFileSync("git", ["init", "-b", "main"], { cwd: root });
  execFileSync("git", ["config", "user.name", "Koda Test"], { cwd: root });
  execFileSync("git", ["config", "user.email", "koda@example.invalid"], { cwd: root });
  execFileSync("git", ["init", "--bare", remote], { cwd: root });
  execFileSync("git", ["remote", "add", "origin", remote], { cwd: root });
  const config = { ...DEFAULT_CONFIG, phases: DEFAULT_CONFIG.phases.slice(0, 1) };
  await writeJsonAtomic(path.join(root, "koda.config.json"), config);
  await mkdir(path.join(root, config.sessionsDir), { recursive: true });
  const source = await createSession(root, config, "# Source\n");
  const dependentPrompt = path.join(root, "dependent.md");
  await writeFile(dependentPrompt, "# Dependent\n", "utf8");

  const tooEarly = run(root, ["session", "new", dependentPrompt, "--depends-on", source.id, "--independent"]);
  assert.equal(tooEarly.status, 1);
  assert.match(tooEarly.stderr, /cannot start until every named dependency has a pushed close or pushed halt/);
  assert.match(tooEarly.stderr, new RegExp(source.id));

  const phase = source.state.phases[0]!;
  await writeFile(artifactPath(source.directory, phase, 0), "# Complete source\n", "utf8");
  const review = await createFreshReview(source.directory, phase, 0, {
    verdict: "APPROVE",
    body: "# Peer review\n\nThe source is complete.",
  });
  await recordApproval(source.directory, {
    version: 1,
    phase: phase.name,
    reviewId: review.metadata.id,
    reviewSha256: await reviewSha256(source.directory, phase, 0),
    verdict: "APPROVE",
    receipt: review.metadata.receipt,
    approver: "Kristian",
    comments: null,
    ruling: null,
    recordedAt: new Date().toISOString(),
  });
  source.state.advances.push({
    phase: phase.name,
    reviewId: review.metadata.id,
    receipt: review.metadata.receipt,
    advancedAt: new Date().toISOString(),
  });
  source.state.currentPhaseIndex = 1;
  await saveSessionState(source.directory, source.state);
  await prepareCloseArtifact(source.directory, source.state);
  execFileSync("git", ["add", "koda.config.json", path.relative(root, source.directory)], { cwd: root });
  execFileSync("git", ["commit", "-m", "close source session"], { cwd: root });
  execFileSync("git", ["push", "-u", "origin", "main"], { cwd: root });

  const opened = run(root, ["session", "new", dependentPrompt, "--kind", "research", "--depends-on", source.id]);
  assert.equal(opened.status, 0, opened.stderr);
  assert.match(opened.stdout, new RegExp(`Dependencies: ${source.id}`));
  const dependentId = /Opened session (\d{4}-\d{2}-\d{2}-\d{2})/.exec(opened.stdout)?.[1];
  assert(dependentId);
  const state = await loadSessionState(path.join(root, config.sessionsDir, dependentId), dependentId);
  assert.equal(state.launchMode, "dependent");
  assert.equal(state.dependencies?.[0]?.sessionId, source.id);
  assert.match(state.dependencies?.[0]?.evidenceSha256 ?? "", /^[0-9a-f]{64}$/);

  await writeFile(path.join(source.directory, "close.md"), `${await readFile(path.join(source.directory, "close.md"), "utf8")}changed\n`, "utf8");
  const stale = run(root, ["status", "--session", dependentId]);
  assert.equal(stale.status, 1);
  assert.match(stale.stderr, new RegExp(`dependency ${source.id} is no longer pushed-terminal`));
  const aggregateStale = run(root, ["status"]);
  assert.equal(aggregateStale.status, 1);
  assert.match(aggregateStale.stderr, new RegExp(`dependency ${source.id} is no longer pushed-terminal`));
});
