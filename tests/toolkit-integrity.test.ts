import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdir, readFile, symlink, writeFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

import { verifiedToolkitReadPathsAt, verifyToolkitIntegrityAt } from "../src/toolkit-integrity.ts";
import { writeJsonAtomic } from "../src/project.ts";
import { temporaryRoot } from "./helpers.ts";

function sha256(content: string | Buffer): string {
  return createHash("sha256").update(content).digest("hex");
}

async function integrityHarness(t: Parameters<typeof temporaryRoot>[0]) {
  const root = await temporaryRoot(t, "koda-toolkit-integrity-");
  await mkdir(path.join(root, "docs"), { recursive: true });
  await mkdir(path.join(root, "src"), { recursive: true });
  const evidencePath = "docs/post-push.md";
  const criticalPath = "src/critical.ts";
  const evidenceContent = [
    "# Post-push proof",
    "",
    "- Result: **PASS**",
    "- Recorded at: 2026-07-19T19:40:50.560Z",
    `- Base commit: \`${"2".repeat(7)}\``,
    "",
    "ℹ tests 181",
    "ℹ pass 181",
    "ℹ fail 0",
    "",
  ].join("\n");
  await writeFile(path.join(root, evidencePath), evidenceContent, "utf8");
  await writeFile(path.join(root, criticalPath), "export const safe = true;\n", "utf8");
  const evidence = await readFile(path.join(root, evidencePath));
  const critical = await readFile(path.join(root, criticalPath));
  await writeJsonAtomic(path.join(root, "docs", "toolkit-integrity.json"), {
    version: 1,
    capability: "clean-launch-v1",
    verifiedAt: "2026-07-19T19:40:50.560Z",
    repairCommit: "1".repeat(40),
    testedCommit: "2".repeat(40),
    testCount: 181,
    evidence: { path: evidencePath, sha256: sha256(evidence) },
    files: [{ path: criticalPath, sha256: sha256(critical) }],
  });
  return { root, evidencePath, criticalPath };
}

test("TOOLKIT INTEGRITY: a complete manifest proves the installed launch surface", async (t) => {
  const h = await integrityHarness(t);
  const result = await verifyToolkitIntegrityAt(h.root);
  assert.equal(result.capability, "clean-launch-v1");
  assert.equal(result.testCount, 181);
  assert.match(result.manifestSha256, /^[a-f0-9]{64}$/);
});

test("TOOLKIT INTEGRITY CAPABILITY: a sandbox receives only exact verified read paths", async (t) => {
  const h = await integrityHarness(t);
  assert.deepEqual(await verifiedToolkitReadPathsAt(h.root), [
    path.join(h.root, "docs", "post-push.md"),
    path.join(h.root, "docs", "toolkit-integrity.json"),
    path.join(h.root, "src", "critical.ts"),
  ]);
});

test("TOOLKIT INTEGRITY MUTATION: changed launch code refuses and names the file", async (t) => {
  const h = await integrityHarness(t);
  await writeFile(path.join(h.root, h.criticalPath), "export const safe = false;\n", "utf8");
  await assert.rejects(
    verifyToolkitIntegrityAt(h.root),
    new RegExp(`Toolkit integrity file changed after verification: ${h.criticalPath.replace(".", "\\.")}`),
  );
});

test("TOOLKIT INTEGRITY MUTATION: linked evidence refuses instead of following it", async (t) => {
  const h = await integrityHarness(t);
  const real = path.join(h.root, "docs", "real-evidence.md");
  await writeFile(real, "# Replacement\n", "utf8");
  await writeFile(path.join(h.root, h.evidencePath), "", "utf8");
  await symlink(real, path.join(h.root, "docs", "linked-evidence.md"));
  const manifestPath = path.join(h.root, "docs", "toolkit-integrity.json");
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  manifest.evidence = { path: "docs/linked-evidence.md", sha256: sha256(await readFile(real)) };
  await writeJsonAtomic(manifestPath, manifest);
  await assert.rejects(
    verifyToolkitIntegrityAt(h.root),
    /Toolkit verification evidence must be a real regular file: docs\/linked-evidence\.md/,
  );
});

test("TOOLKIT INTEGRITY MUTATION: a manifest cannot overstate its hashed test evidence", async (t) => {
  const h = await integrityHarness(t);
  const manifestPath = path.join(h.root, "docs", "toolkit-integrity.json");
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  manifest.testCount = 999;
  await writeJsonAtomic(manifestPath, manifest);
  await assert.rejects(
    verifyToolkitIntegrityAt(h.root),
    /Toolkit verification evidence contradicts the integrity manifest: missing ℹ tests 999/,
  );
});
