import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import test, { type TestContext } from "node:test";

import { evaluateSessionClosure, parseCloseArtifact, prepareCloseArtifact } from "../src/close.ts";
import { DEFAULT_CONFIG } from "../src/config.ts";
import { evaluateGate } from "../src/gate.ts";
import {
  artifactPath,
  createSession,
  saveSessionState,
  writeJsonAtomic,
} from "../src/project.ts";
import {
  createFreshReview,
  recordApproval,
  reviewSha256,
} from "../src/receipt.ts";
import type { SessionState, Verdict } from "../src/types.ts";
import { temporaryRoot } from "./helpers.ts";

type Scenario = "clean" | "revise" | "discuss";

function git(root: string, args: string[]): string {
  const result = spawnSync("git", args, { cwd: root, encoding: "utf8" });
  assert.equal(result.status, 0, `git ${args.join(" ")} failed:\n${result.stderr}`);
  return String(result.stdout).trim();
}

async function approve(
  sessionDir: string,
  state: SessionState,
  index: number,
  verdict: Verdict,
  options: { ruling?: string | null; body?: string } = {},
) {
  const phase = state.phases[index];
  const review = await createFreshReview(sessionDir, phase, index, {
    verdict,
    body: options.body ?? `# Peer review — ${phase.name}\n\nThe current artifact is checked against the scenario contract.`,
  });
  await recordApproval(sessionDir, {
    version: 1,
    phase: phase.name,
    reviewId: review.metadata.id,
    reviewSha256: await reviewSha256(sessionDir, phase, index),
    verdict,
    receipt: review.metadata.receipt,
    approver: "Scenario Owner",
    comments: null,
    ruling: options.ruling ?? null,
    recordedAt: new Date().toISOString(),
  });
  return review;
}

async function advanceOpenGate(sessionDir: string, state: SessionState, index: number): Promise<void> {
  const phase = state.phases[index];
  const gate = await evaluateGate(sessionDir, phase, index);
  assert.equal(gate.open, true, `${phase.name} did not open: ${gate.issues.map((item) => item.code).join(", ")}`);
  assert(gate.review?.metadata && gate.review.receipt);
  state.advances.push({
    phase: phase.name,
    reviewId: gate.review.metadata.id,
    receipt: gate.review.receipt,
    advancedAt: new Date().toISOString(),
  });
  state.currentPhaseIndex += 1;
  await saveSessionState(sessionDir, state);
}

async function runFullScenario(t: TestContext, scenario: Scenario) {
  const root = await temporaryRoot(t, `koda-full-${scenario}-`);
  const remote = path.join(root, "remote.git");
  git(root, ["init", "-b", "main"]);
  git(root, ["config", "user.name", "Koda Scenario"]);
  git(root, ["config", "user.email", "scenario@example.invalid"]);
  git(root, ["init", "--bare", remote]);
  git(root, ["remote", "add", "origin", remote]);

  await writeJsonAtomic(path.join(root, "koda.config.json"), DEFAULT_CONFIG);
  await mkdir(path.join(root, DEFAULT_CONFIG.sessionsDir), { recursive: true });
  const session = await createSession(root, DEFAULT_CONFIG, `# ${scenario} full-session scenario\n`);
  const { directory, state } = session;

  for (const [index, phase] of state.phases.entries()) {
    await writeFile(artifactPath(directory, phase, index), `# ${phase.name}\n\nScenario: ${scenario}.\nVersion: 1.\n`, "utf8");

    if (scenario === "revise" && phase.name === "plan") {
      await approve(directory, state, index, "REVISE", { body: "# Peer review — plan\n\nThe first plan is missing its negative check." });
      const blocked = await evaluateGate(directory, phase, index);
      assert.equal(blocked.open, false);
      assert(blocked.issues.some((item) => item.code === "verdict_revise"));

      await writeFile(artifactPath(directory, phase, index), "# plan\n\nScenario: revise.\nVersion: 2.\nNegative check: refuse work outside the brief.\n", "utf8");
      await approve(directory, state, index, "APPROVE");
    } else if (scenario === "discuss" && phase.name === "live") {
      await approve(directory, state, index, "DISCUSS", {
        body: "# Peer review — live\n\nOnly the owner can decide whether the observed result is sufficient.",
        ruling: "The observed local result is sufficient for this bounded scenario.",
      });
      const blocked = await evaluateGate(directory, phase, index);
      assert.equal(blocked.open, false);
      assert(blocked.issues.some((item) => item.code === "verdict_discuss" && /ruling is recorded/i.test(item.message)));
      await approve(directory, state, index, "APPROVE");
    } else {
      await approve(directory, state, index, "APPROVE");
    }

    await advanceOpenGate(directory, state, index);
  }

  assert.equal(state.currentPhaseIndex, DEFAULT_CONFIG.phases.length);
  assert.equal(state.advances.length, DEFAULT_CONFIG.phases.length);
  const closeFile = await prepareCloseArtifact(directory, state);
  const close = parseCloseArtifact(await readFile(closeFile, "utf8"));
  assert.equal(close?.finalPhase, "summary");

  git(root, ["add", path.relative(root, directory)]);
  git(root, ["commit", "-m", `close ${scenario} full session`]);
  git(root, ["push", "-u", "origin", "main"]);
  const closure = await evaluateSessionClosure(root, directory, state);
  assert.deepEqual(closure, { closed: true, reasons: [] });
}

test("FULL LIFECYCLE SCENARIO: clean approvals traverse all six phases and pushed close", async (t) => {
  await runFullScenario(t, "clean");
});

test("FULL LIFECYCLE SCENARIO: a REVISE loop recovers in plan before completing and closing", async (t) => {
  await runFullScenario(t, "revise");
});

test("FULL LIFECYCLE SCENARIO: DISCUSS records an owner ruling and requires a fresh live review", async (t) => {
  await runFullScenario(t, "discuss");
});
