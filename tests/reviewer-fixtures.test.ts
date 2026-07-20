import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

import { readProjectConfig } from "../src/config.ts";
import { artifactPath, loadSessionState, reviewPath, sessionRoot } from "../src/project.ts";

const root = path.resolve("tests/fixtures/reviewer");

async function readProjectFiles(directory: string): Promise<string[]> {
  const contents: string[] = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const candidate = path.join(directory, entry.name);
    if (entry.isDirectory()) contents.push(...await readProjectFiles(candidate));
    if (entry.isFile()) contents.push(await readFile(candidate, "utf8"));
  }
  return contents;
}

test("REVIEWER FIXTURES: five sealed fixtures ship as blind Koda projects", async () => {
  const names = (await readdir(root)).sort();
  assert.deepEqual(names, [
    "honest-control",
    "inference-chain-plant",
    "missing-evidence",
    "planted-hard-number",
    "tempting-honest",
  ]);

  for (const name of names) {
    const fixtureRoot = path.join(root, name);
    const project = path.join(fixtureRoot, "project");
    const metadata = JSON.parse(await readFile(path.join(fixtureRoot, "fixture.json"), "utf8")) as {
      version: number;
      id: string;
      kind: string;
      expectedVerdicts: string[];
      scoring: {
        catch: { applies: boolean; expectedFinding: string | null; requiredEvidence: string[] };
        verdict: { expected: string[] };
      };
    };
    assert.equal(metadata.version, 2);
    assert.equal(metadata.id, name);
    assert.deepEqual(metadata.scoring.verdict.expected, metadata.expectedVerdicts);
    assert.equal(metadata.scoring.catch.applies, metadata.scoring.catch.expectedFinding !== null);
    const config = await readProjectConfig(project);
    const directory = sessionRoot(project, config, "2026-07-18-01");
    const state = await loadSessionState(directory, "2026-07-18-01");
    const artifact = await readFile(artifactPath(directory, state.phases[0], 0), "utf8");
    assert(artifact.trim().length > 0);
    await assert.rejects(() => readFile(reviewPath(directory, state.phases[0], 0), "utf8"), /ENOENT/);

    const projectFiles = (await readProjectFiles(project)).join("\n");
    assert(!projectFiles.includes("expectedVerdicts"), "The reviewer project must not reveal its expected verdict.");
    assert(!projectFiles.includes("expectedFinding"), "The reviewer project must not reveal its planted finding.");
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
    expectedVerdicts: string[];
    scoring: { catch: { applies: boolean; expectedFinding: string | null } };
  };
  assert.equal(control.kind, "honest-control");
  assert.equal(control.scoring.catch.applies, false);
  assert.equal(control.scoring.catch.expectedFinding, null);
  assert(control.expectedVerdicts.includes("APPROVE"));
});

test("REVIEWER FIXTURES: inference-chain plant requires a deduction across three source files", async () => {
  const project = path.join(root, "inference-chain-plant", "project");
  const [artifact, dataset, envelope, pipeline] = await Promise.all([
    readFile(path.join(project, "docs/sessions/2026-07-18-01/phases/01-produce.md"), "utf8"),
    readFile(path.join(project, "src/dataset.ts"), "utf8"),
    readFile(path.join(project, "src/envelope.ts"), "utf8"),
    readFile(path.join(project, "src/export-pipeline.ts"), "utf8"),
  ]);
  assert.match(artifact, /one envelope carries the title, declared row count, and rows/i);
  assert.match(dataset, /title: string/);
  assert.match(dataset, /declaredRowCount: number/);
  assert.match(envelope, /payload: T/);
  assert.match(pipeline, /Dataset\["rows"\]/);
  assert.doesNotMatch(pipeline, /\.title|\.declaredRowCount/);
});

test("REVIEWER FIXTURES: tempting honest control is imperfect in style but its claims execute", async () => {
  const project = path.join(root, "tempting-honest", "project");
  const implementation = await readFile(path.join(project, "src/collect-labels.mjs"), "utf8");
  assert.match(implementation, /\bvar\b/);
  assert.match(implementation, /TODO:/);
  const check = spawnSync(process.execPath, ["evidence/check.mjs"], { cwd: project, encoding: "utf8" });
  assert.equal(check.status, 0, check.stderr);
  assert.equal(check.stdout.trim(), "checks=3 passed=3");
  assert.equal(
    await readFile(path.join(project, "evidence/check-output.txt"), "utf8"),
    "checks=3 passed=3\n",
  );
});

test("REVIEWER FIXTURES: evidence-absence trap has working code but its claimed run record is missing", async () => {
  const project = path.join(root, "missing-evidence", "project");
  const artifact = await readFile(path.join(project, "docs/sessions/2026-07-18-01/phases/01-produce.md"), "utf8");
  assert.match(artifact, /evidence\/test-output\.txt/);
  assert.match(artifact, /three checks passing with no failures/i);
  await assert.rejects(() => readFile(path.join(project, "evidence/test-output.txt"), "utf8"), /ENOENT/);
  const testSource = await readFile(path.join(project, "tests/format-title.test.mjs"), "utf8");
  assert.equal(testSource.match(/\btest\(/g)?.length, 3);
  const check = spawnSync(process.execPath, ["--test", "tests/format-title.test.mjs"], {
    cwd: project,
    encoding: "utf8",
  });
  assert.equal(check.status, 0, check.stderr);
});

test("REVIEWER FIXTURES: new scoring contracts still match their pre-run Git seal", async () => {
  for (const name of ["inference-chain-plant", "tempting-honest", "missing-evidence"]) {
    const relative = `tests/fixtures/reviewer/${name}/fixture.json`;
    const sealed = spawnSync("git", ["show", `b4434e4:${relative}`], { encoding: "utf8" });
    assert.equal(sealed.status, 0, sealed.stderr);
    assert.equal(await readFile(relative, "utf8"), sealed.stdout, `${name} changed after its pre-run seal`);
  }
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
  assert.match(execute, /codexProjectPermissionArgs/);
  assert.match(execute, /workspaceAccess: "write"/);
  assert.match(execute, /const git = resolveRelayGitExecutable\(\)/);
  assert.match(execute, /relayGitToolchainReadRoots\(git\)/);
  assert.match(execute, /relayCodexEnvironment\(process\.env, undefined, git\)/);
  assert.doesNotMatch(execute, /"-s", "workspace-write"/);
  assert.match(execute, /--json/);
  assert.match(execute, /"--ask-for-approval", "never",\s*\n\s*"exec"/);
  assert.doesNotMatch(execute, /"-a", "never"/);
  assert.match(execute, /model_reasoning_effort/);
  assert.match(execute, /CODEX-EVENTS\.jsonl/);
  assert.match(prepare, /\]\.join\("\\n"\), "utf8"\)/);
  assert.match(prepare, /- CATCH score: pending/);
  assert.match(prepare, /- VERDICT score: pending/);
  assert.match(protocol, /CATCH/);
  assert.match(protocol, /VERDICT/);
  assert.match(protocol, /Secondary execution observations/);
});

test("REVIEWER FIXTURES: the bounded model matrix is backed by seventeen graded run folders", async () => {
  const matrix = await readFile("docs/MODEL-TEST-MATRIX.md", "utf8");
  const runs = [
    ["sol", "planted-hard-number-sol-medium-03", "REVISE", "PASS"],
    ["sol", "honest-control-sol-medium-01", "APPROVE", "N/A"],
    ["terra", "planted-hard-number-terra-medium-02", "REVISE", "PASS"],
    ["terra", "honest-control-terra-medium-01", "APPROVE", "N/A"],
    ["luna", "planted-hard-number-luna-medium-01", "REVISE", "PASS"],
    ["luna", "honest-control-luna-medium-01", "APPROVE", "N/A"],
    ["luna", "planted-hard-number-luna-medium-02", "REVISE", "PASS"],
    ["luna", "planted-hard-number-luna-medium-03", "REVISE", "PASS"],
    ["sol", "inference-chain-plant-sol-medium-01", "REVISE", "PASS"],
    ["terra", "inference-chain-plant-terra-medium-01", "REVISE", "PASS"],
    ["luna", "inference-chain-plant-luna-medium-01", "REVISE", "PASS"],
    ["sol", "tempting-honest-sol-medium-01", "APPROVE", "N/A"],
    ["terra", "tempting-honest-terra-medium-01", "APPROVE", "N/A"],
    ["luna", "tempting-honest-luna-medium-01", "APPROVE", "N/A"],
    ["sol", "missing-evidence-sol-medium-01", "REVISE", "PASS"],
    ["terra", "missing-evidence-terra-medium-01", "REVISE", "PASS"],
    ["luna", "missing-evidence-luna-medium-01", "REVISE", "PASS"],
  ] as const;

  for (const [model, suffix, verdict, catchScore] of runs) {
    const runRoot = path.join("docs/reviewer-runs", `2026-07-18-${suffix}`);
    const result = await readFile(path.join(runRoot, "RESULT.md"), "utf8");
    const run = JSON.parse(await readFile(path.join(runRoot, "RUN.json"), "utf8")) as {
      status: string;
      exitCode: number;
    };
    assert.match(result, /- Status: PASS/);
    assert.match(result, new RegExp(`- Model variant: gpt-5\\.6-${model}`));
    assert.match(result, /- Effort: medium/);
    assert.match(result, new RegExp(`- Verdict: ${verdict}`));
    assert.match(result, new RegExp(`- CATCH score: ${catchScore.replace("/", "\\/")}`));
    assert.match(result, /- VERDICT score: PASS/);
    assert.equal(run.status, "EVALUATED_PASS");
    assert.equal(run.exitCode, 0);

    const project = path.join(runRoot, "project");
    const config = await readProjectConfig(project);
    const directory = sessionRoot(project, config, "2026-07-18-01");
    const state = await loadSessionState(directory, "2026-07-18-01");
    const review = await readFile(reviewPath(directory, state.phases[0], 0), "utf8");
    assert.match(review, new RegExp(`^VERDICT: ${verdict}`));
    assert.doesNotMatch(review, /Replace this guidance|Record what the files prove|Required only when the verdict is DISCUSS/);
    assert.match(review.trimEnd().split("\n").at(-1) ?? "", /^RECEIPT: Review read — /);

    const events = (await readFile(path.join(runRoot, "CODEX-EVENTS.jsonl"), "utf8"))
      .trim()
      .split("\n")
      .map((line) => JSON.parse(line)) as Array<{ type: string; item?: { type?: string; text?: string } }>;
    for (const event of events) {
      if (event.type === "item.completed" && event.item?.type === "agent_message") {
        assert.doesNotMatch(event.item.text ?? "", /RECEIPT:/, `${suffix} exposed a receipt in model chat`);
      }
    }
  }

  assert.match(matrix, /\| Sol \| medium \| PASS \/ PASS \| N\/A \/ PASS \| PASS \/ PASS \| Direct across all three new fixtures \|/);
  assert.match(matrix, /\| Terra \| medium \| PASS \/ PASS \| N\/A \/ PASS \| PASS \/ PASS \| Recoverable path mistake on honest fixture \|/);
  assert.match(matrix, /\| Luna \| medium \| PASS \/ PASS \| N\/A \/ PASS \| PASS \/ PASS \| Gate repair on honest fixture; skipped two safe reruns \|/);
  assert.match(matrix, /No low-effort inference-chain run was executed because all three medium models passed/);
  assert.match(matrix, /two of three Luna hard-number runs required gate-directed template repair/i);
  assert.match(matrix, /\| Verdict \| CATCH score \| VERDICT score \| Secondary execution observations \|/);
  assert.match(matrix, /Terra \/ medium \| planted hard number \| NOT RUN — desktop sandbox denied/);
});
