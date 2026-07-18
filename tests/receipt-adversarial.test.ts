import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
import test from "node:test";

import { evaluateGate } from "../src/gate.ts";
import { artifactPath } from "../src/project.ts";
import { createFreshReview, recordApproval, reviewSha256 } from "../src/receipt.ts";
import { projectHarness, readyGate } from "./helpers.ts";

test("RECEIPT ADVERSARIAL SUITE: an earlier review's receipt cannot approve a fresh review", async (t) => {
  const h = await readyGate(t);
  const earlierReceipt = h.review.metadata.receipt;
  const fresh = await createFreshReview(h.session.directory, h.phase, 0, {
    verdict: "APPROVE",
    body: "# Peer review\n\nFresh review of the still-current artifact.",
  });

  assert.notEqual(fresh.metadata.receipt, earlierReceipt);
  const result = await evaluateGate(h.session.directory, h.phase, 0);
  assert.equal(result.open, false);
  assert(result.issues.some((item) =>
    item.code === "approval_missing" && item.message.includes("current review receipt")
  ));
});

test("RECEIPT ADVERSARIAL SUITE: phase N receipt cannot approve phase N+1", async (t) => {
  const h = await projectHarness(t, 2);
  const first = h.session.state.phases[0];
  const second = h.session.state.phases[1];
  await writeFile(artifactPath(h.session.directory, first, 0), "# Brief\n\nFirst phase.\n", "utf8");
  const firstReview = await createFreshReview(h.session.directory, first, 0, { verdict: "APPROVE" });

  await writeFile(artifactPath(h.session.directory, second, 1), "# Orient\n\nSecond phase.\n", "utf8");
  const secondReview = await createFreshReview(h.session.directory, second, 1, { verdict: "APPROVE" });
  await recordApproval(h.session.directory, {
    version: 1,
    phase: second.name,
    reviewId: secondReview.metadata.id,
    reviewSha256: await reviewSha256(h.session.directory, second, 1),
    verdict: "APPROVE",
    receipt: firstReview.metadata.receipt,
    approver: "Kristian",
    comments: null,
    ruling: null,
    recordedAt: new Date().toISOString(),
  });

  const result = await evaluateGate(h.session.directory, second, 1);
  assert.equal(result.open, false);
  assert(result.issues.some((item) =>
    item.code === "approval_missing" && item.message.includes("current review receipt")
  ));
});

test("RECEIPT ADVERSARIAL SUITE: outer whitespace is accepted and any inner word change refuses", async (t) => {
  const whitespace = await readyGate(t, { approval: false });
  await recordApproval(whitespace.session.directory, {
    version: 1,
    phase: whitespace.phase.name,
    reviewId: whitespace.review.metadata.id,
    reviewSha256: await reviewSha256(whitespace.session.directory, whitespace.phase, 0),
    verdict: "APPROVE",
    receipt: ` \t${whitespace.review.metadata.receipt}  `,
    approver: "Kristian",
    comments: null,
    ruling: null,
    recordedAt: new Date().toISOString(),
  });
  assert.equal((await evaluateGate(whitespace.session.directory, whitespace.phase, 0)).open, true);

  const changed = await readyGate(t, { approval: false });
  await recordApproval(changed.session.directory, {
    version: 1,
    phase: changed.phase.name,
    reviewId: changed.review.metadata.id,
    reviewSha256: await reviewSha256(changed.session.directory, changed.phase, 0),
    verdict: "APPROVE",
    receipt: changed.review.metadata.receipt.replace("Review", "Reviews"),
    approver: "Kristian",
    comments: null,
    ruling: null,
    recordedAt: new Date().toISOString(),
  });
  const refused = await evaluateGate(changed.session.directory, changed.phase, 0);
  assert.equal(refused.open, false);
  assert(refused.issues.some((item) => item.code === "approval_missing"));
});

for (const verdict of ["REVISE", "REJECT", "DISCUSS"] as const) {
  test(`RECEIPT ADVERSARIAL SUITE: exact receipt cannot override ${verdict}`, async (t) => {
    const h = await readyGate(t, {
      verdict,
      ruling: verdict === "DISCUSS" ? "Owner ruling is recorded." : null,
    });
    const result = await evaluateGate(h.session.directory, h.phase, 0);
    assert.equal(result.open, false);
    assert(result.issues.some((item) => item.code === `verdict_${verdict.toLowerCase()}`));
  });
}
