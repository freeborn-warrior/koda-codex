import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
import test from "node:test";

import { validateAdvancedHistory } from "../src/history.ts";
import { artifactPath, saveSessionState } from "../src/project.ts";
import { createFreshReview, recordApproval, reviewSha256 } from "../src/receipt.ts";
import { projectHarness } from "./helpers.ts";

test("a phase entry remains valid only while every prior gate proof still exists on disk", async (t) => {
  const h = await projectHarness(t, 2);
  const first = h.session.state.phases[0];
  const file = artifactPath(h.session.directory, first, 0);
  await writeFile(file, "# Brief\n\nA checkable first leg.\n", "utf8");
  const review = await createFreshReview(h.session.directory, first, 0, {
    verdict: "APPROVE",
    body: "# Peer review\n\nThe first leg is supported.",
  });
  await recordApproval(h.session.directory, {
    version: 1,
    phase: first.name,
    reviewId: review.metadata.id,
    reviewSha256: await reviewSha256(h.session.directory, first, 0),
    verdict: "APPROVE",
    receipt: review.metadata.receipt,
    approver: "Kristian",
    comments: null,
    ruling: null,
    recordedAt: new Date().toISOString(),
  });
  h.session.state.advances.push({
    phase: first.name,
    receipt: review.metadata.receipt,
    reviewId: review.metadata.id,
    advancedAt: new Date().toISOString(),
  });
  h.session.state.currentPhaseIndex = 1;
  await saveSessionState(h.session.directory, h.session.state);

  assert.deepEqual(await validateAdvancedHistory(h.session.directory, h.session.state), []);
  await writeFile(file, "# Brief\n\nChanged after its gate.\n", "utf8");
  const broken = await validateAdvancedHistory(h.session.directory, h.session.state);
  assert(broken.some((item) => item.phase === "brief" && /review is stale.*re-review/i.test(item.message)));
});
