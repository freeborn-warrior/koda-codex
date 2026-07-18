import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import test from "node:test";

import { evaluateGate } from "../src/gate.ts";
import { artifactPath, reviewPath } from "../src/project.ts";
import { createFreshReview, recordApproval, reviewSha256 } from "../src/receipt.ts";
import { projectHarness, readyGate } from "./helpers.ts";

test("REVIEW BINDING SUITE: changing review findings after owner acknowledgement refuses", async (t) => {
  const h = await readyGate(t);
  const file = reviewPath(h.session.directory, h.phase, 0);
  const acknowledged = await readFile(file, "utf8");
  await writeFile(file, acknowledged.replace(
    "The artifact is specific and checkable.",
    "The artifact is specific and checkable. Findings were changed later.",
  ), "utf8");

  const result = await evaluateGate(h.session.directory, h.phase, 0);
  assert.equal(result.open, false);
  const changed = result.issues.find((item) => item.code === "approval_review_changed");
  assert(changed);
  assert.match(changed.message, /review changed after its receipt was acknowledged/i);
});

test("REVIEW BINDING SUITE: an untouched generated template cannot become an approved review", async (t) => {
  const h = await projectHarness(t);
  const phase = h.session.state.phases[0];
  await writeFile(artifactPath(h.session.directory, phase, 0), "# Brief\n\nA checkable artifact.\n", "utf8");
  const review = await createFreshReview(h.session.directory, phase, 0);
  const file = reviewPath(h.session.directory, phase, 0);
  await writeFile(file, (await readFile(file, "utf8")).replace("VERDICT: DISCUSS", "VERDICT: APPROVE"), "utf8");
  await recordApproval(h.session.directory, {
    version: 1,
    phase: phase.name,
    reviewId: review.metadata.id,
    reviewSha256: await reviewSha256(h.session.directory, phase, 0),
    verdict: "APPROVE",
    receipt: review.metadata.receipt,
    approver: "Kristian",
    comments: null,
    ruling: null,
    recordedAt: new Date().toISOString(),
  });

  const result = await evaluateGate(h.session.directory, phase, 0);
  assert.equal(result.open, false);
  const incomplete = result.issues.find((item) => item.code === "review_incomplete");
  assert(incomplete);
  assert.match(incomplete.message, /untouched template guidance/i);
});
