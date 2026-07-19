import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { REVIEWER_LOCK_DIR } from "../scripts/relay-window-protocol.ts";
import { readProjectConfig } from "../src/config.ts";
import { artifactPath, createSession, writeJsonAtomic } from "../src/project.ts";

async function prepareRun(root: string): Promise<string> {
  const prepared = spawnSync(process.execPath, [
    "scripts/prepare-relay-run.ts",
    "software-clean",
    "gpt-5.6-sol",
    "medium",
    "gpt-5.6-terra",
    "medium",
  ], {
    cwd: process.cwd(),
    encoding: "utf8",
    env: { ...process.env, KODA_RELAY_RUNS_ROOT: root },
  });
  assert.equal(prepared.status, 0, prepared.stderr);
  return path.join(root, (await readdir(root)).sort().at(-1)!);
}

function status(root: string) {
  return spawnSync(process.execPath, ["scripts/show-relay-status.ts"], {
    cwd: process.cwd(),
    encoding: "utf8",
    env: { ...process.env, KODA_RELAY_RUNS_ROOT: root },
  });
}

test("RELAY STATUS TRUTH: a prepared run names all roles and prints only the first safe action", async (t) => {
  const temporary = await mkdtemp(path.join(tmpdir(), "koda-relay-status-"));
  t.after(() => rm(temporary, { recursive: true, force: true }));
  await prepareRun(temporary);
  const result = status(temporary);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Run state: PREPARED/);
  assert.match(result.stdout, /Session: not opened/);
  assert.match(result.stdout, /GUIDE — PROJECT \/ OWNER/);
  assert.match(result.stdout, /Owner input: OPEN in the existing Guide conversation/);
  assert.match(result.stdout, /WINDOW A — PRODUCER/);
  assert.match(result.stdout, /Owner input: CLOSED — watch only; speak in Window B/);
  assert.match(result.stdout, /WINDOW B — REVIEWER \/ OWNER/);
  assert.match(result.stdout, /Owner input: OPEN — active-session conversation belongs here/);
  assert.match(result.stdout, /Console process: not running/);
  assert.match(result.stdout, /First, start or resume Window B\. Then run status again/);
  assert.match(result.stdout, /npm run relay:reviewer/);
  assert.doesNotMatch(result.stdout, /npm run relay:producer/);
});

test("RELAY STATUS TRUTH: after Reviewer is alive, Producer becomes the one safe next action", async (t) => {
  const temporary = await mkdtemp(path.join(tmpdir(), "koda-relay-status-sequence-"));
  t.after(() => rm(temporary, { recursive: true, force: true }));
  const runRoot = await prepareRun(temporary);
  const lock = path.join(runRoot, REVIEWER_LOCK_DIR);
  await mkdir(lock);
  await writeJsonAtomic(path.join(lock, "OWNER.json"), {
    version: 1,
    pid: process.pid,
    startedAt: new Date().toISOString(),
  });
  const result = status(temporary);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, new RegExp(`Console process: running as ${process.pid}`));
  assert.match(result.stdout, /Window B is ready\. Start or resume Window A/);
  assert.match(result.stdout, /npm run relay:producer/);
  assert.doesNotMatch(result.stdout, /npm run relay:reviewer/);
});

test("RELAY STATUS TRUTH: a stopped reviewer process names explicit stale-lock recovery", async (t) => {
  const temporary = await mkdtemp(path.join(tmpdir(), "koda-relay-stale-"));
  t.after(() => rm(temporary, { recursive: true, force: true }));
  const runRoot = await prepareRun(temporary);
  const lock = path.join(runRoot, REVIEWER_LOCK_DIR);
  await mkdir(lock);
  await writeJsonAtomic(path.join(lock, "OWNER.json"), {
    version: 1,
    pid: 2_147_483_647,
    startedAt: new Date(0).toISOString(),
  });
  const result = status(temporary);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Console process: stopped; stale lock belongs to 2147483647/);
  assert.match(result.stdout, /npm run relay:reviewer -- --recover-stale-lock/);
});

test("RELAY STATUS TRUTH: an active recorded producer is never duplicated by a blind hint", async (t) => {
  const temporary = await mkdtemp(path.join(tmpdir(), "koda-relay-active-hint-"));
  t.after(() => rm(temporary, { recursive: true, force: true }));
  const runRoot = await prepareRun(temporary);
  const runPath = path.join(runRoot, "RUN.json");
  const run = JSON.parse(await readFile(runPath, "utf8"));
  run.status = "AWAITING_REVIEWER_WINDOW";
  await writeJsonAtomic(runPath, run);
  const result = status(temporary);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /First, start or resume Window B\. Then run status again/);
  assert.match(result.stdout, /do not start a second producer blindly/);
  assert.doesNotMatch(result.stdout, /Start or resume Window A in the other pane/);
});

test("RELAY STATUS TRUTH: corrupt or ambiguous run state refuses instead of guessing", async (t) => {
  const temporary = await mkdtemp(path.join(tmpdir(), "koda-relay-status-refuse-"));
  t.after(() => rm(temporary, { recursive: true, force: true }));
  const first = await prepareRun(temporary);
  const runPath = path.join(first, "RUN.json");
  const run = JSON.parse(await readFile(runPath, "utf8"));
  run.producer.turns = "unknown";
  await writeJsonAtomic(runPath, run);
  const corrupt = status(temporary);
  assert.equal(corrupt.status, 1);
  assert.match(corrupt.stderr, /Corrupt or unsafe relay state exists/);
  assert.doesNotMatch(corrupt.stderr, /No relay run exists/);

  await rm(first, { recursive: true, force: true });
  await prepareRun(temporary);
  await prepareRun(temporary);
  const ambiguous = status(temporary);
  assert.equal(ambiguous.status, 1);
  assert.match(ambiguous.stderr, /More than one unfinished run exists/);
});

test("RELAY STATUS TRUTH: a corrupt waiting direction refuses immediately by name", async (t) => {
  const temporary = await mkdtemp(path.join(tmpdir(), "koda-relay-status-direction-"));
  t.after(() => rm(temporary, { recursive: true, force: true }));
  const runRoot = await prepareRun(temporary);
  const project = path.join(runRoot, "project");
  const config = await readProjectConfig(project);
  const prompt = await readFile(path.join(project, "owner-prompt.md"), "utf8");
  const session = await createSession(project, config, prompt);
  const phase = session.state.phases[0];
  await writeFile(artifactPath(session.directory, phase, 0), "# Brief\n\nCurrent artifact.\n", "utf8");
  const directory = path.join(session.directory, "directions");
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, "01-wait.md"), "# forged waiting direction\n", "utf8");
  const runPath = path.join(runRoot, "RUN.json");
  const run = JSON.parse(await readFile(runPath, "utf8"));
  run.status = "RUNNING";
  run.sessionId = session.id;
  await writeJsonAtomic(runPath, run);

  const result = status(temporary);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /RELAY STATUS REFUSED — Waiting direction state is corrupt/);
  assert.match(result.stderr, /exactly one generated KODA_WAITING_DIRECTION marker/);
});
