import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

import { DEFAULT_CONFIG } from "../src/config.ts";
import { artifactPath, latestSessionId, loadSessionState, reviewPath, sessionRoot } from "../src/project.ts";
import { temporaryRoot } from "./helpers.ts";

const cli = path.resolve("src/cli.ts");
const printedPrefix = `${process.execPath} ${cli}`;

function run(args: string[], cwd: string, input?: string) {
  return spawnSync(process.execPath, [cli, ...args], {
    cwd,
    encoding: "utf8",
    input,
    env: { ...process.env, KODA_COMMAND: printedPrefix },
  });
}

function printedCommand(output: string, required: string[]): string {
  const line = output.split("\n").map((item) => item.trim()).find((item) =>
    item.startsWith(printedPrefix) && required.every((part) => item.includes(`'${part}'`))
  );
  assert(line, `Expected printed command containing ${required.join(", ")} in:\n${output}`);
  return line;
}

function runPrinted(command: string, cwd: string, input?: string) {
  return spawnSync(command, {
    cwd,
    encoding: "utf8",
    input,
    shell: true,
    env: { ...process.env, KODA_COMMAND: printedPrefix },
  });
}

test("the approval and advancement recovery commands run exactly as printed", async (t) => {
  const root = await temporaryRoot(t, "koda-hint-demo-");
  const initialized = run(["init", root, "--demo"], path.dirname(root));
  assert.equal(initialized.status, 0, initialized.stderr);

  const refused = run(["advance"], root);
  assert.equal(refused.status, 2);
  assert.match(refused.stdout, /GATE CLOSED — BRIEF/);
  assert.match(refused.stdout, /Nothing advanced/);
  const approve = printedCommand(refused.stdout, ["approve", "brief"]);

  const id = await latestSessionId(root, DEFAULT_CONFIG);
  assert(id);
  const directory = sessionRoot(root, DEFAULT_CONFIG, id);
  const receipt = (await readFile(reviewPath(directory, DEFAULT_CONFIG.phases[0], 0), "utf8"))
    .trimEnd().split("\n").at(-1)!;
  const approved = runPrinted(approve, root, `${receipt}\n`);
  assert.equal(approved.status, 0, approved.stderr);
  const advance = printedCommand(approved.stdout, ["advance"]);

  const advanced = runPrinted(advance, root);
  assert.equal(advanced.status, 0, advanced.stderr);
  assert.match(advanced.stdout, /GATE OPEN — BRIEF/);
  assert.equal((await loadSessionState(directory, id)).currentPhaseIndex, 1);
});

test("the missing-review recovery command runs exactly as printed", async (t) => {
  const root = await temporaryRoot(t, "koda-hint-review-");
  assert.equal(run(["init", root], path.dirname(root)).status, 0);
  const prompt = path.join(root, "owner-prompt.md");
  await writeFile(prompt, "# Owner prompt\n\nMake a tiny artifact.\n", "utf8");
  assert.equal(run(["session", "new", prompt], root).status, 0);

  const id = await latestSessionId(root, DEFAULT_CONFIG);
  assert(id);
  const directory = sessionRoot(root, DEFAULT_CONFIG, id);
  await writeFile(artifactPath(directory, DEFAULT_CONFIG.phases[0], 0), "# Brief\n\nMake one thing.\n", "utf8");

  const refused = run(["advance"], root);
  assert.equal(refused.status, 2);
  const createReview = printedCommand(refused.stdout, ["review", "new", "brief"]);
  const created = runPrinted(createReview, root);
  assert.equal(created.status, 0, created.stderr);
  assert.match(created.stdout, /Created fresh review/);
});
