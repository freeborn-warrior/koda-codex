import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

import { readProjectConfig } from "../src/config.ts";
import { artifactPath, loadSessionState, reviewPath, sessionRoot } from "../src/project.ts";

const root = path.resolve("tests/fixtures/reviewer");

test("REVIEWER FIXTURES: one planted defect and one honest control ship as blind Koda projects", async () => {
  const names = (await readdir(root)).sort();
  assert.deepEqual(names, ["honest-control", "planted-hard-number"]);

  for (const name of names) {
    const fixtureRoot = path.join(root, name);
    const project = path.join(fixtureRoot, "project");
    const metadata = JSON.parse(await readFile(path.join(fixtureRoot, "fixture.json"), "utf8")) as {
      id: string;
      kind: string;
      expectedVerdicts: string[];
      expectedFinding: string | null;
    };
    assert.equal(metadata.id, name);
    const config = await readProjectConfig(project);
    const directory = sessionRoot(project, config, "2026-07-18-01");
    const state = await loadSessionState(directory, "2026-07-18-01");
    const artifact = await readFile(artifactPath(directory, state.phases[0], 0), "utf8");
    assert(artifact.trim().length > 0);
    await assert.rejects(() => readFile(reviewPath(directory, state.phases[0], 0), "utf8"), /ENOENT/);

    const projectFiles = [
      artifact,
      await readFile(path.join(directory, "session-prompt.md"), "utf8"),
      await readFile(path.join(project, "evidence", "product-contract.md"), "utf8"),
    ].join("\n");
    assert(!projectFiles.includes("expectedVerdicts"), "The reviewer project must not reveal its expected verdict.");
  }
});

test("REVIEWER FIXTURES: the planted hard number is unsupported and the control has no plant", async () => {
  const planted = path.join(root, "planted-hard-number", "project");
  const plantedArtifact = await readFile(path.join(planted, "docs/sessions/2026-07-18-01/phases/01-brief.md"), "utf8");
  const plantedEvidence = await readFile(path.join(planted, "evidence/product-contract.md"), "utf8");
  assert.match(plantedArtifact, /within five seconds/i);
  assert.doesNotMatch(plantedEvidence, /within five seconds/i);
  assert.match(plantedEvidence, /No performance target has been established/);

  const controlRoot = path.join(root, "honest-control");
  const control = JSON.parse(await readFile(path.join(controlRoot, "fixture.json"), "utf8")) as {
    kind: string;
    expectedFinding: string | null;
    expectedVerdicts: string[];
  };
  assert.equal(control.kind, "honest-control");
  assert.equal(control.expectedFinding, null);
  assert(control.expectedVerdicts.includes("APPROVE"));
});

test("REVIEWER FIXTURES: Ghostty runs pin model and effort and preserve ephemeral Codex events", async () => {
  const [prepare, execute, protocol] = await Promise.all([
    readFile("scripts/prepare-reviewer-run.ts", "utf8"),
    readFile("scripts/execute-reviewer-run.ts", "utf8"),
    readFile("docs/REVIEWER-FIXTURES.md", "utf8"),
  ]);
  for (const model of ["gpt-5.6-sol", "gpt-5.6-terra", "gpt-5.6-luna"]) {
    assert.match(prepare, new RegExp(model.replaceAll(".", "\\.")));
    assert.match(protocol, new RegExp(model.replaceAll(".", "\\.")));
  }
  assert.match(execute, /--ephemeral/);
  assert.match(execute, /--ignore-user-config/);
  assert.match(execute, /--json/);
  assert.match(execute, /"--ask-for-approval", "never",\s*\n\s*"exec"/);
  assert.doesNotMatch(execute, /"-a", "never"/);
  assert.match(execute, /model_reasoning_effort/);
  assert.match(execute, /CODEX-EVENTS\.jsonl/);
  assert.match(prepare, /\]\.join\("\\n"\), "utf8"\)/);
  assert.match(protocol, /Capability:/);
  assert.match(protocol, /Temperament:/);
});

test("REVIEWER FIXTURES: the medium model matrix is backed by six graded run folders", async () => {
  const matrix = await readFile("docs/MODEL-TEST-MATRIX.md", "utf8");
  const runs = [
    ["sol", "planted-hard-number-sol-medium-03", "REVISE"],
    ["sol", "honest-control-sol-medium-01", "APPROVE"],
    ["terra", "planted-hard-number-terra-medium-02", "REVISE"],
    ["terra", "honest-control-terra-medium-01", "APPROVE"],
    ["luna", "planted-hard-number-luna-medium-01", "REVISE"],
    ["luna", "honest-control-luna-medium-01", "APPROVE"],
  ] as const;

  for (const [model, suffix, verdict] of runs) {
    const result = await readFile(path.join("docs/reviewer-runs", `2026-07-18-${suffix}`, "RESULT.md"), "utf8");
    assert.match(result, /- Status: PASS/);
    assert.match(result, new RegExp(`- Model variant: gpt-5\\.6-${model}`));
    assert.match(result, /- Effort: medium/);
    assert.match(result, new RegExp(`- Verdict: ${verdict}`));
  }

  for (const model of ["Sol", "Terra", "Luna"]) {
    assert.match(matrix, new RegExp(`\\| ${model} \\| medium \\| PASS .* \\| PASS .* \\| \\*\\*2/2 PASS\\*\\* \\|`));
  }
  assert.match(matrix, /Terra \/ medium \| planted hard number \| NOT RUN — desktop sandbox denied/);
});
