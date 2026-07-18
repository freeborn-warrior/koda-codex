import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
import test from "node:test";

import { evaluateGate } from "../src/gate.ts";
import { artifactPath } from "../src/project.ts";
import { createFreshReview, recordApproval, reviewSha256 } from "../src/receipt.ts";
import { readyGate } from "./helpers.ts";

test("STALE-REVIEW BINDING: editing the artifact after review refuses with a named re-review reason", async (t) => {
  const h = await readyGate(t);
  await writeFile(artifactPath(h.session.directory, h.phase, 0), `${h.artifact}\nEdited after review.\n`, "utf8");

  const result = await evaluateGate(h.session.directory, h.phase, 0);
  assert.equal(result.open, false);
  const stale = result.issues.find((item) => item.code === "artifact_changed");
  assert(stale);
  assert.match(stale.message, /review is stale.*re-review/i);
});

test("STALE-REVIEW BINDING: reviewing after an edit binds the new artifact and opens", async (t) => {
  const h = await readyGate(t);
  const file = artifactPath(h.session.directory, h.phase, 0);
  await writeFile(file, `${h.artifact}\nEdited before the fresh review.\n`, "utf8");
  const fresh = await createFreshReview(h.session.directory, h.phase, 0, {
    verdict: "APPROVE",
    body: "# Peer review\n\nThe edited artifact is supported.",
  });
  await recordApproval(h.session.directory, {
    version: 1,
    phase: h.phase.name,
    reviewId: fresh.metadata.id,
    reviewSha256: await reviewSha256(h.session.directory, h.phase, 0),
    verdict: "APPROVE",
    receipt: fresh.metadata.receipt,
    approver: "Kristian",
    comments: null,
    ruling: null,
    recordedAt: new Date().toISOString(),
  });

  const result = await evaluateGate(h.session.directory, h.phase, 0);
  assert.equal(result.open, true);
  assert.deepEqual(result.issues, []);
});
