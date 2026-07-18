import assert from "node:assert/strict";
import { copyFile, mkdir, readFile, rm, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

import { evaluateGate } from "../src/gate.ts";
import { artifactPath, ledgerPath, reviewPath } from "../src/project.ts";
import { recordApproval, reviewSha256 } from "../src/receipt.ts";
import { readyGate } from "./helpers.ts";

async function codes(harness: Awaited<ReturnType<typeof readyGate>>): Promise<string[]> {
  const result = await evaluateGate(harness.session.directory, harness.phase, 0);
  return result.issues.map((item) => item.code);
}

async function assertNamedRefusal(
  harness: Awaited<ReturnType<typeof readyGate>>,
  code: string,
  message: RegExp,
): Promise<void> {
  const result = await evaluateGate(harness.session.directory, harness.phase, 0);
  assert.equal(result.open, false);
  const named = result.issues.find((item) => item.code === code);
  assert(named, `Expected named gate condition ${code}; got ${result.issues.map((item) => item.code).join(", ")}`);
  assert.match(named.message, message);
}

test("a complete artifact, review, allowed verdict, unique receipt, and ledger proof open the gate", async (t) => {
  const harness = await readyGate(t);
  const result = await evaluateGate(harness.session.directory, harness.phase, 0);
  assert.equal(result.open, true);
  assert.deepEqual(result.issues, []);
});

test("GATE MUTATION SUITE: each core condition refuses and names itself", async (t) => {
  await t.test("artifact exists", async (t) => {
    const h = await readyGate(t);
    await unlink(artifactPath(h.session.directory, h.phase, 0));
    await assertNamedRefusal(h, "artifact_missing", /artifact does not exist/i);
  });

  await t.test("artifact is non-empty", async (t) => {
    const h = await readyGate(t);
    await writeFile(artifactPath(h.session.directory, h.phase, 0), " \n", "utf8");
    await assertNamedRefusal(h, "artifact_empty", /artifact is empty/i);
  });

  await t.test("review exists", async (t) => {
    const h = await readyGate(t);
    await unlink(reviewPath(h.session.directory, h.phase, 0));
    await assertNamedRefusal(h, "review_missing", /review file does not exist/i);
  });

  for (const verdict of ["REVISE", "REJECT", "DISCUSS"] as const) {
    await t.test(`verdict ${verdict} is blocking`, async (t) => {
      const h = await readyGate(t, {
        verdict,
        ruling: verdict === "DISCUSS" ? "Re-review after this ruling." : null,
      });
      await assertNamedRefusal(h, `verdict_${verdict.toLowerCase()}`, new RegExp(verdict));
    });
  }

  await t.test("current receipt is quoted verbatim in the ledger", async (t) => {
    const h = await readyGate(t, { approval: false });
    await assertNamedRefusal(h, "approval_missing", /current review receipt has not been quoted/i);
  });
});

test("outer receipt whitespace is ignored but inner bytes remain literal", async (t) => {
  const whitespace = await readyGate(t, { approval: false });
  await recordApproval(whitespace.session.directory, {
    version: 1,
    phase: whitespace.phase.name,
    reviewId: whitespace.review.metadata.id,
    reviewSha256: await reviewSha256(whitespace.session.directory, whitespace.phase, 0),
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
    reviewSha256: await reviewSha256(changed.session.directory, changed.phase, 0),
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

  await t.test("review metadata names a different phase", async (t) => {
    const h = await readyGate(t);
    const file = reviewPath(h.session.directory, h.phase, 0);
    await writeFile(file, (await readFile(file, "utf8")).replace(`"phase":"${h.phase.name}"`, '"phase":"wrong-phase"'));
    await assertNamedRefusal(h, "review_phase_mismatch", /generated for a different phase/i);
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
      reviewSha256: await reviewSha256(h.session.directory, h.phase, 0),
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
