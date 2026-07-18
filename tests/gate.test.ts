import assert from "node:assert/strict";
import { copyFile, mkdir, readFile, rm, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

import { evaluateGate } from "../src/gate.ts";
import { artifactPath, ledgerPath, reviewPath } from "../src/project.ts";
import { recordApproval } from "../src/receipt.ts";
import { readyGate } from "./helpers.ts";

async function codes(harness: Awaited<ReturnType<typeof readyGate>>): Promise<string[]> {
  const result = await evaluateGate(harness.session.directory, harness.phase, 0);
  return result.issues.map((item) => item.code);
}

test("a complete artifact, review, allowed verdict, unique receipt, and ledger proof open the gate", async (t) => {
  const harness = await readyGate(t);
  const result = await evaluateGate(harness.session.directory, harness.phase, 0);
  assert.equal(result.open, true);
  assert.deepEqual(result.issues, []);
});

test("outer receipt whitespace is ignored but inner bytes remain literal", async (t) => {
  const whitespace = await readyGate(t, { approval: false });
  await recordApproval(whitespace.session.directory, {
    version: 1,
    phase: whitespace.phase.name,
    reviewId: whitespace.review.metadata.id,
    verdict: "APPROVE",
    receipt: `  ${whitespace.review.metadata.receipt}\t`,
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
    verdict: "APPROVE",
    receipt: changed.review.metadata.receipt.replace("Review read", "Review  read"),
    approver: "Kristian",
    comments: null,
    ruling: null,
    recordedAt: new Date().toISOString(),
  });
  assert((await codes(changed)).includes("approval_missing"));
});

test("every gate condition fails closed when deliberately broken", async (t) => {
  await t.test("artifact missing", async (t) => {
    const h = await readyGate(t);
    await unlink(artifactPath(h.session.directory, h.phase, 0));
    assert((await codes(h)).includes("artifact_missing"));
  });

  await t.test("artifact empty", async (t) => {
    const h = await readyGate(t);
    await writeFile(artifactPath(h.session.directory, h.phase, 0), " \n", "utf8");
    assert((await codes(h)).includes("artifact_empty"));
  });

  await t.test("review missing", async (t) => {
    const h = await readyGate(t);
    await unlink(reviewPath(h.session.directory, h.phase, 0));
    assert((await codes(h)).includes("review_missing"));
  });

  await t.test("verdict line missing", async (t) => {
    const h = await readyGate(t);
    const file = reviewPath(h.session.directory, h.phase, 0);
    await writeFile(file, (await readFile(file, "utf8")).replace("VERDICT: APPROVE", "# No verdict"));
    assert((await codes(h)).includes("verdict_missing"));
  });

  await t.test("verdict unknown", async (t) => {
    const h = await readyGate(t);
    const file = reviewPath(h.session.directory, h.phase, 0);
    await writeFile(file, (await readFile(file, "utf8")).replace("VERDICT: APPROVE", "VERDICT: MAYBE"));
    assert((await codes(h)).includes("verdict_invalid"));
  });

  await t.test("receipt missing from last line", async (t) => {
    const h = await readyGate(t);
    const file = reviewPath(h.session.directory, h.phase, 0);
    await writeFile(file, (await readFile(file, "utf8")).replace(/RECEIPT: Review read — .+\n$/, "No receipt\n"));
    assert((await codes(h)).includes("receipt_missing"));
  });

  await t.test("generated review metadata missing", async (t) => {
    const h = await readyGate(t);
    const file = reviewPath(h.session.directory, h.phase, 0);
    await writeFile(file, (await readFile(file, "utf8")).replace(/<!-- KODA_REVIEW .+ -->\n/, ""));
    assert((await codes(h)).includes("review_metadata_missing"));
  });

  await t.test("artifact changed after review", async (t) => {
    const h = await readyGate(t);
    await writeFile(artifactPath(h.session.directory, h.phase, 0), `${h.artifact}\nChanged after review.\n`);
    assert((await codes(h)).includes("artifact_changed"));
  });

  await t.test("final receipt differs from generated receipt", async (t) => {
    const h = await readyGate(t);
    const file = reviewPath(h.session.directory, h.phase, 0);
    await writeFile(file, (await readFile(file, "utf8")).replace(/RECEIPT: Review read — .+\n$/, "RECEIPT: altered\n"));
    assert((await codes(h)).includes("receipt_mismatch"));
  });

  await t.test("receipt reused by another review", async (t) => {
    const h = await readyGate(t);
    const history = path.join(h.session.directory, "reviews", "history");
    await mkdir(history, { recursive: true });
    await copyFile(reviewPath(h.session.directory, h.phase, 0), path.join(history, "duplicate.md"));
    assert((await codes(h)).includes("receipt_not_unique"));
  });

  await t.test("approval ledger missing", async (t) => {
    const h = await readyGate(t);
    await unlink(ledgerPath(h.session.directory));
    assert((await codes(h)).includes("ledger_missing"));
  });

  await t.test("exact receipt absent from ledger", async (t) => {
    const h = await readyGate(t, { approval: false });
    await recordApproval(h.session.directory, {
      version: 1,
      phase: h.phase.name,
      reviewId: h.review.metadata.id,
      verdict: "APPROVE",
      receipt: "RECEIPT: a different review",
      approver: "Kristian",
      comments: null,
      ruling: null,
      recordedAt: new Date().toISOString(),
    });
    assert((await codes(h)).includes("approval_missing"));
  });

  await t.test("approver missing", async (t) => {
    const h = await readyGate(t, { approver: "" });
    assert((await codes(h)).includes("approval_approver_missing"));
  });

  await t.test("APPROVE WITH COMMENTS has no ledger comments", async (t) => {
    const h = await readyGate(t, { verdict: "APPROVE WITH COMMENTS", comments: null });
    assert((await codes(h)).includes("approval_comments_missing"));
  });

  for (const verdict of ["REVISE", "REJECT"] as const) {
    await t.test(`${verdict} blocks even with receipt proof`, async (t) => {
      const h = await readyGate(t, { verdict });
      assert((await codes(h)).includes(verdict === "REVISE" ? "verdict_revise" : "verdict_reject"));
    });
  }

  await t.test("DISCUSS blocks without an owner ruling", async (t) => {
    const h = await readyGate(t, { verdict: "DISCUSS" });
    const result = await evaluateGate(h.session.directory, h.phase, 0);
    assert(result.issues.some((item) => item.code === "verdict_discuss" && item.message.includes("requires an owner ruling")));
  });

  await t.test("DISCUSS still blocks after the ruling until a fresh review", async (t) => {
    const h = await readyGate(t, { verdict: "DISCUSS", ruling: "Keep the brief domain-general." });
    const result = await evaluateGate(h.session.directory, h.phase, 0);
    assert(result.issues.some((item) => item.code === "verdict_discuss" && item.message.includes("fresh definitive review")));
  });
});
