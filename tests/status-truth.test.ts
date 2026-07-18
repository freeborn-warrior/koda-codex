import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

import { artifactPath, ledgerPath, reviewPath, statePath } from "../src/project.ts";
import { readyGate } from "./helpers.ts";

const cli = path.resolve("src/cli.ts");

function status(cwd: string) {
  return spawnSync(process.execPath, [cli, "status"], { cwd, encoding: "utf8" });
}

test("STATUS TRUTH SUITE: deleting a review is reflected immediately", async (t) => {
  const h = await readyGate(t);
  assert.match(status(h.root).stdout, /GATE OPEN/);
  await unlink(reviewPath(h.session.directory, h.phase, 0));

  const result = status(h.root);
  assert.match(result.stdout, /GATE CLOSED/);
  assert.match(result.stdout, /peer-review file does not exist/i);
});

test("STATUS TRUTH SUITE: blanking an artifact is reflected immediately", async (t) => {
  const h = await readyGate(t);
  assert.match(status(h.root).stdout, /GATE OPEN/);
  await writeFile(artifactPath(h.session.directory, h.phase, 0), " \n", "utf8");

  const result = status(h.root);
  assert.match(result.stdout, /GATE CLOSED/);
  assert.match(result.stdout, /artifact is empty/i);
});

test("STATUS TRUTH SUITE: corrupt ledger metadata refuses with a named corruption reason", async (t) => {
  const h = await readyGate(t);
  const file = ledgerPath(h.session.directory);
  const ledger = await readFile(file, "utf8");
  await writeFile(file, ledger.replace(/<!-- KODA_APPROVAL .+ -->/, "<!-- KODA_APPROVAL {broken} -->"), "utf8");

  const result = status(h.root);
  assert.match(result.stdout, /GATE CLOSED/);
  assert.match(result.stdout, /approval ledger contains malformed KODA_APPROVAL metadata/i);
});

test("STATUS TRUTH SUITE: editing an acknowledged review is reflected immediately", async (t) => {
  const h = await readyGate(t);
  const file = reviewPath(h.session.directory, h.phase, 0);
  const review = await readFile(file, "utf8");
  await writeFile(file, review.replace("specific and checkable", "specific, checkable, and later edited"), "utf8");

  const result = status(h.root);
  assert.match(result.stdout, /GATE CLOSED/);
  assert.match(result.stdout, /review changed after its receipt was acknowledged/i);
});

test("STATUS TRUTH SUITE: invalid state JSON refuses instead of guessing", async (t) => {
  const h = await readyGate(t);
  await writeFile(statePath(h.session.directory), "{not-json}\n", "utf8");

  const result = status(h.root);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /ERROR: state\.json is not valid JSON/);
  assert.doesNotMatch(result.stdout, /GATE OPEN/);
});
