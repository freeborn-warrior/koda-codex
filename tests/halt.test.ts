import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { prepareCloseArtifact } from "../src/close.ts";
import { DEFAULT_CONFIG } from "../src/config.ts";
import { createWaitingDirection, WAITING_DIRECTION_PREFIX } from "../src/direction.ts";
import { evaluateSessionHalt, haltPath, parseHaltArtifact, prepareHaltArtifact } from "../src/halt.ts";
import { artifactPath, createSession, loadSessionState, writeJsonAtomic } from "../src/project.ts";
import { projectHarness } from "./helpers.ts";

const cli = path.resolve("src/cli.ts");

function git(cwd: string, args: string[]): void {
  execFileSync("git", args, { cwd, stdio: "pipe" });
}

function runPrintedCommand(cwd: string, command: string) {
  return spawnSync(command, { cwd, encoding: "utf8", shell: true });
}

test("HALT CEREMONY: void the in-flight phase, require pushed evidence, then return through a fresh Brief", async (t) => {
  const parent = await mkdtemp(path.join(tmpdir(), "koda-halt-test-"));
  t.after(async () => rm(parent, { recursive: true, force: true }));
  const root = path.join(parent, "project");
  const remote = path.join(parent, "remote.git");
  await mkdir(root);
  const config = { ...DEFAULT_CONFIG, phases: DEFAULT_CONFIG.phases.slice(0, 2) };
  await writeJsonAtomic(path.join(root, "koda.config.json"), config);
  await mkdir(path.join(root, config.sessionsDir), { recursive: true });
  const session = await createSession(root, config, "# Original owner prompt\n\nCreate the original product.\n");
  const phase = session.state.phases[0];
  const partialArtifact = "# Partial Brief\n\nThis in-flight work must never count.\n";
  await writeFile(artifactPath(session.directory, phase, 0), partialArtifact, "utf8");
  const waiting = await createWaitingDirection({
    sessionDir: session.directory,
    state: session.state,
    source: "owner-via-reviewer",
    ownerStatement: "Replace the original product direction in a fresh Brief.",
    classification: `${WAITING_DIRECTION_PREFIX}\nThe owner requires a complete phase halt.`,
  });

  git(parent, ["init", "--bare", remote]);
  git(root, ["init", "-b", "main"]);
  git(root, ["config", "user.name", "Koda Test"]);
  git(root, ["config", "user.email", "koda@example.invalid"]);
  git(root, ["remote", "add", "origin", remote]);
  git(root, ["add", "-A"]);
  git(root, ["commit", "-m", "start active session"]);
  git(root, ["push", "-u", "origin", "main"]);

  const ownerDirectionFile = path.join(parent, "halt-direction.md");
  await writeFile(ownerDirectionFile, "Stop this phase. Restart from the waiting product direction.\n", "utf8");
  const prepared = spawnSync(process.execPath, [cli, "session", "halt", ownerDirectionFile], {
    cwd: root,
    encoding: "utf8",
  });
  assert.equal(prepared.status, 2, prepared.stderr);
  assert.match(prepared.stdout, /HALT PREPARED .* NOT HALTED/);
  assert.match(prepared.stdout, /active phase is void and cannot resume/);

  const haltContent = await readFile(haltPath(session.directory), "utf8");
  const metadata = parseHaltArtifact(haltContent);
  assert(metadata);
  assert.equal(metadata.phase, "brief");
  assert.equal(metadata.phaseIndex, 0);
  assert.equal(metadata.ownerDirection, "Stop this phase. Restart from the waiting product direction.");
  assert.equal(session.state.currentPhaseIndex, 0);
  assert.equal(session.state.advances.length, 0);

  const blockedCommands = [
    ["direction", "wait", ownerDirectionFile, ownerDirectionFile],
    ["review", "new", "brief"],
    ["advance"],
    ["session", "close"],
  ];
  for (const args of blockedCommands) {
    const blocked = spawnSync(process.execPath, [cli, ...args], { cwd: root, encoding: "utf8" });
    assert.notEqual(blocked.status, 0, `${args.join(" ")} unexpectedly succeeded`);
    assert.match(blocked.stderr, /halt|halted/i);
  }

  const prematurePrompt = path.join(parent, "premature-prompt.md");
  await writeFile(prematurePrompt, "# Fresh prompt\n", "utf8");
  const beforePush = spawnSync(process.execPath, [cli, "session", "new", prematurePrompt], { cwd: root, encoding: "utf8" });
  assert.equal(beforePush.status, 1);
  assert.match(beforePush.stderr, /neither closed nor pushed-halted/);

  await writeFile(artifactPath(session.directory, phase, 0), `${partialArtifact}\nlate mutation\n`, "utf8");
  const stale = await evaluateSessionHalt(root, session.directory, session.state);
  assert.equal(stale.halted, false);
  assert(stale.reasons.includes("Session files changed after halt.md was prepared."));
  await writeFile(artifactPath(session.directory, phase, 0), partialArtifact, "utf8");

  const printed = prepared.stdout.split("\n")
    .filter((line) => line.startsWith("  "))
    .map((line) => line.trim());
  assert.equal(printed.length, 4, prepared.stdout);
  for (const command of printed) {
    const result = runPrintedCommand(root, command);
    assert.equal(result.status, 0, `${command}\n${result.stdout}\n${result.stderr}`);
  }
  assert.equal((await evaluateSessionHalt(root, session.directory, session.state)).halted, true);

  const missingIds = spawnSync(process.execPath, [cli, "session", "new", prematurePrompt], { cwd: root, encoding: "utf8" });
  assert.equal(missingIds.status, 1);
  assert.match(missingIds.stderr, /must cite the pushed halt and every waiting direction ID/);
  assert.match(missingIds.stderr, new RegExp(metadata.id));
  assert.match(missingIds.stderr, new RegExp(waiting.metadata.id));

  const freshPrompt = path.join(parent, "fresh-prompt.md");
  await writeFile(
    freshPrompt,
    `# Fresh owner prompt\n\nRestart after halt ${metadata.id}. Apply waiting direction ${waiting.metadata.id}.\n`,
    "utf8",
  );
  const restarted = spawnSync(process.execPath, [cli, "session", "new", freshPrompt], { cwd: root, encoding: "utf8" });
  assert.equal(restarted.status, 0, restarted.stderr);
  assert.match(restarted.stdout, /Fresh Brief after pushed halt/);
  assert.match(restarted.stdout, /Waiting directions entering Brief: 1/);
  const nextDir = path.join(root, config.sessionsDir, session.id.replace(/-01$/, "-02"));
  const nextState = await loadSessionState(nextDir);
  assert.equal(nextState.currentPhaseIndex, 0);
  assert.deepEqual(nextState.entryDirections?.map((entry) => entry.id), [waiting.metadata.id]);
});

test("HALT STATUS TRUTH: corrupt halt evidence is named and never treated as terminal", async (t) => {
  const parent = await mkdtemp(path.join(tmpdir(), "koda-halt-corrupt-"));
  t.after(async () => rm(parent, { recursive: true, force: true }));
  const root = path.join(parent, "project");
  await mkdir(root);
  const config = { ...DEFAULT_CONFIG, phases: DEFAULT_CONFIG.phases.slice(0, 1) };
  await writeJsonAtomic(path.join(root, "koda.config.json"), config);
  await mkdir(path.join(root, config.sessionsDir), { recursive: true });
  const session = await createSession(root, config, "# Prompt\n");
  await writeFile(haltPath(session.directory), "# Session halt\n\ncorrupt marker\n", "utf8");

  const status = spawnSync(process.execPath, [cli, "status"], { cwd: root, encoding: "utf8" });
  assert.equal(status.status, 0, status.stderr);
  assert.match(status.stdout, /HALT PREPARED — SESSION NOT YET HALTED/);
  assert.match(status.stdout, /halt\.md has missing or invalid generated metadata/);
  const nextPrompt = path.join(parent, "next.md");
  await writeFile(nextPrompt, "# Next prompt\n", "utf8");
  const next = spawnSync(process.execPath, [cli, "session", "new", nextPrompt], { cwd: root, encoding: "utf8" });
  assert.equal(next.status, 1);
  assert.match(next.stderr, /neither closed nor pushed-halted/);
  assert.match(next.stderr, /halt\.md has missing or invalid generated metadata/);
});

test("HALT TERMINAL MUTATION: halt and close evidence can never coexist", async (t) => {
  const h = await projectHarness(t, 1);
  await prepareHaltArtifact(h.session.directory, h.session.state, "Restart through a fresh Brief.");
  await assert.rejects(prepareCloseArtifact(h.session.directory, h.session.state), /session with halt\.md cannot be closed/);
  await writeFile(path.join(h.session.directory, "close.md"), "# forged close\n", "utf8");
  const halt = await evaluateSessionHalt(h.root, h.session.directory, h.session.state);
  assert.equal(halt.halted, false);
  assert(halt.reasons.includes("halt.md and close.md cannot coexist; session terminal state is ambiguous."));
});
