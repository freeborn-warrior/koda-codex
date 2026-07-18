import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
import test from "node:test";

import { artifactPath } from "../src/project.ts";
import { createFreshReview, recordApproval, reviewSha256 } from "../src/receipt.ts";
import { readyGate } from "./helpers.ts";

test("a current review cannot be replaced before its receipt is recorded", async (t) => {
  const h = await readyGate(t, { verdict: "REVISE", approval: false });
  await assert.rejects(
    () => createFreshReview(h.session.directory, h.phase, 0),
    /Record the current review's exact receipt/,
  );
});

test("a revised artifact receives a fresh review, fresh receipt, and archived prior review", async (t) => {
  const h = await readyGate(t, { verdict: "REVISE" });
  await writeFile(artifactPath(h.session.directory, h.phase, 0), `${h.artifact}\nA checked revision.\n`, "utf8");
  const fresh = await createFreshReview(h.session.directory, h.phase, 0);
  assert(fresh.archivedPath);
  assert.notEqual(fresh.metadata.id, h.review.metadata.id);
  assert.notEqual(fresh.metadata.receipt, h.review.metadata.receipt);
});

test("DISCUSS requires the owner's ruling before a fresh definitive review", async (t) => {
  const blocked = await readyGate(t, { verdict: "DISCUSS" });
  await assert.rejects(
    () => createFreshReview(blocked.session.directory, blocked.phase, 0),
    /owner's DISCUSS ruling/,
  );

  const ruled = await readyGate(t, { verdict: "DISCUSS", approval: false });
  await recordApproval(ruled.session.directory, {
    version: 1,
    phase: ruled.phase.name,
    reviewId: ruled.review.metadata.id,
    reviewSha256: await reviewSha256(ruled.session.directory, ruled.phase, 0),
    verdict: "DISCUSS",
    receipt: ruled.review.metadata.receipt,
    approver: "Kristian",
    comments: null,
    ruling: "Keep the scope domain-general.",
    recordedAt: new Date().toISOString(),
  });
  const fresh = await createFreshReview(ruled.session.directory, ruled.phase, 0);
  assert(fresh.archivedPath);
  assert.notEqual(fresh.metadata.receipt, ruled.review.metadata.receipt);
});
