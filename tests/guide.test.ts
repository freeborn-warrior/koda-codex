import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

import { runCli } from "../src/commands.ts";
import { DEFAULT_CONFIG } from "../src/config.ts";
import { runGuideCli } from "../src/guide-commands.ts";
import {
  cancelGuideLaunch,
  confirmGuideLaunch,
  guideLaunchesDir,
  verifyGuideLaunch,
} from "../src/guide.ts";
import { createSession, writeJsonAtomic } from "../src/project.ts";
import { temporaryRoot } from "./helpers.ts";

const prompt = [
  "# Session prompt",
  "",
  "## Owner intent",
  "Advance one bounded part of the project.",
  "",
  "## In scope",
  "- One checkable outcome.",
  "",
  "## Out of scope",
  "- Unrelated work.",
  "",
  "## Success evidence",
  "- A stranger can inspect the saved result.",
  "",
  "## Constraints and owner rulings",
  "- Preserve the disk-backed relay.",
  "",
  "## Prior session carry-forward",
  "- Previous close: none for the first session",
  "- Previous summary: none",
  "- Carried forward by owner: none",
  "- Deliberately not carried: none",
  "",
  "## Relay handover",
  "- Configured receiver: brief",
  "- Ground prepared: project steering files",
  "- Open items: none",
  "",
].join("\n");

async function guideHarness(t: Parameters<typeof temporaryRoot>[0], withGit = false) {
  const parent = await temporaryRoot(t, "koda-guide-test-");
  const root = path.join(parent, "project");
  const remote = path.join(parent, "remote.git");
  await mkdir(path.join(root, "docs", "sessions"), { recursive: true });
  await mkdir(path.join(root, "docs", "guide", "prompts"), { recursive: true });
  await writeJsonAtomic(path.join(root, "koda.config.json"), DEFAULT_CONFIG);
  await writeFile(path.join(root, "docs", "PROJECT.md"), "# Project\n\nBuild the right thing.\n", "utf8");
  await writeFile(path.join(root, "docs", "BACKLOG.md"), "# Backlog\n\n- [ ] Next bounded step.\n", "utf8");
  await writeFile(path.join(root, "docs", "WORKING-PLAN.md"), "# Working plan\n\n1. Prove the next step.\n", "utf8");
  await writeJsonAtomic(path.join(root, "docs", "guide", "project.json"), {
    version: 1,
    project: "Guide fixture",
    continuityFiles: ["docs/PROJECT.md", "docs/BACKLOG.md", "docs/WORKING-PLAN.md"],
  });
  const promptFile = path.join(root, "docs", "guide", "prompts", "next-session.md");
  await writeFile(promptFile, prompt, "utf8");

  const git = (cwd: string, args: string[]) => {
    const result = spawnSync("git", args, { cwd, encoding: "utf8" });
    assert.equal(result.status, 0, result.stderr);
  };
  if (withGit) {
    git(root, ["init", "-b", "main"]);
    git(root, ["config", "user.name", "Koda Guide Test"]);
    git(root, ["config", "user.email", "guide@example.invalid"]);
    git(parent, ["init", "--bare", remote]);
    git(root, ["remote", "add", "origin", remote]);
    git(root, ["add", "-A"]);
    git(root, ["commit", "-m", "chore: prepare Guide project"]);
    git(root, ["push", "-u", "origin", "main"]);
  }
  return { root, promptFile, git };
}

test("GUIDE ENTRY: an active prior session refuses a new launch request and names it", async (t) => {
  const h = await guideHarness(t);
  await createSession(h.root, DEFAULT_CONFIG, prompt);
  await assert.rejects(
    confirmGuideLaunch(h.root, DEFAULT_CONFIG, h.promptFile, "Kristian"),
    /Session .* is not closed:\n- Every declared phase has not advanced/,
  );
});

test("GUIDE CONFIRMATION: one request binds prompt, manifest, continuity, and owner", async (t) => {
  const h = await guideHarness(t);
  const result = await confirmGuideLaunch(h.root, DEFAULT_CONFIG, h.promptFile, "Kristian");
  assert.equal(result.launch.status, "READY_TO_LAUNCH");
  assert.equal(result.launch.confirmedBy, "Kristian");
  assert.equal(result.launch.continuity.length, 3);
  assert.equal(result.launch.previousSessionId, null);
  assert.equal(result.launch.prompt, "docs/guide/prompts/next-session.md");
  assert.equal(result.launch.manifest.path, "docs/guide/project.json");
  assert.deepEqual((await readdir(guideLaunchesDir(h.root, DEFAULT_CONFIG))).sort(), [`${result.launch.id}.json`]);
});

test("GUIDE MUTATION: changing only a continuity file makes confirmation stale", async (t) => {
  const h = await guideHarness(t);
  await confirmGuideLaunch(h.root, DEFAULT_CONFIG, h.promptFile, "Kristian");
  await writeFile(path.join(h.root, "docs", "BACKLOG.md"), "# Backlog\n\n- [x] Changed afterward.\n", "utf8");
  await assert.rejects(
    verifyGuideLaunch(h.root, DEFAULT_CONFIG),
    /project continuity files changed after owner confirmation; the launch is stale/,
  );
});

test("GUIDE MUTATION: changing only the prompt makes confirmation stale", async (t) => {
  const h = await guideHarness(t);
  await confirmGuideLaunch(h.root, DEFAULT_CONFIG, h.promptFile, "Kristian");
  await writeFile(h.promptFile, prompt.replace("one bounded part", "two unconfirmed parts"), "utf8");
  await assert.rejects(
    verifyGuideLaunch(h.root, DEFAULT_CONFIG),
    /session prompt changed after owner confirmation; the launch is stale/,
  );
});

test("GUIDE MUTATION: changing only the project manifest makes confirmation stale", async (t) => {
  const h = await guideHarness(t);
  await confirmGuideLaunch(h.root, DEFAULT_CONFIG, h.promptFile, "Kristian");
  await writeJsonAtomic(path.join(h.root, "docs", "guide", "project.json"), {
    version: 1,
    project: "Renamed after confirmation",
    continuityFiles: ["docs/PROJECT.md", "docs/BACKLOG.md", "docs/WORKING-PLAN.md"],
  });
  await assert.rejects(
    verifyGuideLaunch(h.root, DEFAULT_CONFIG),
    /project manifest changed after owner confirmation; the launch is stale/,
  );
});

test("GUIDE GIT HANDOVER: a confirmed but uncommitted request refuses launch", async (t) => {
  const h = await guideHarness(t, true);
  await confirmGuideLaunch(h.root, DEFAULT_CONFIG, h.promptFile, "Kristian");
  await assert.rejects(
    verifyGuideLaunch(h.root, DEFAULT_CONFIG),
    /confirmed Guide handover is not committed and pushed:[\s\S]*Guide launch evidence is not committed/,
  );
});

test("GUIDE RECOVERY: stale confirmation requires a pushed cancellation before reconfirming", async (t) => {
  const h = await guideHarness(t, true);
  const first = await confirmGuideLaunch(h.root, DEFAULT_CONFIG, h.promptFile, "Kristian");
  h.git(h.root, ["add", "-A"]);
  h.git(h.root, ["commit", "-m", "guide: confirm first route"]);
  h.git(h.root, ["push"]);

  await writeFile(h.promptFile, prompt.replace("one bounded part", "one revised bounded part"), "utf8");
  await assert.rejects(verifyGuideLaunch(h.root, DEFAULT_CONFIG), /session prompt changed.*stale/);
  await cancelGuideLaunch(h.root, DEFAULT_CONFIG, first.launch.id, "Kristian", "The project path changed.");
  await assert.rejects(
    confirmGuideLaunch(h.root, DEFAULT_CONFIG, h.promptFile, "Kristian"),
    /Guide cancellation is not committed and pushed/,
  );

  h.git(h.root, ["add", "-A"]);
  h.git(h.root, ["commit", "-m", "guide: cancel stale route"]);
  h.git(h.root, ["push"]);
  const revised = await confirmGuideLaunch(h.root, DEFAULT_CONFIG, h.promptFile, "Kristian");
  assert.notEqual(revised.launch.id, first.launch.id);
  assert.equal(revised.launch.status, "READY_TO_LAUNCH");
});

test("GUIDE GATE: a project with a Guide manifest refuses an unconfirmed session prompt", async (t) => {
  const h = await guideHarness(t);
  await assert.rejects(
    runCli(["session", "new", h.promptFile], h.root, { out() {}, error() {}, async prompt() { return ""; } }),
    /No Guide prompt is READY_TO_LAUNCH/,
  );
});

test("GUIDE RELAY: pushed confirmation opens the exact session and records its binding", async (t) => {
  const h = await guideHarness(t, true);
  const confirmed = await confirmGuideLaunch(h.root, DEFAULT_CONFIG, h.promptFile, "Kristian");
  h.git(h.root, ["add", "-A"]);
  h.git(h.root, ["commit", "-m", "guide: confirm next bounded session"]);
  h.git(h.root, ["push"]);

  const output: string[] = [];
  await runCli(["session", "new", h.promptFile], h.root, {
    out(message) { output.push(message); },
    error() {},
    async prompt() { return ""; },
  });
  assert.match(output.join("\n"), /Opened session \d{4}-\d{2}-\d{2}-01/);
  const sessions = await readdir(path.join(h.root, "docs", "sessions"));
  assert.equal(sessions.length, 1);
  const bindingPath = path.join(h.root, "docs", "sessions", sessions[0]!, "guide-launch.json");
  const binding = JSON.parse(await readFile(bindingPath, "utf8"));
  assert.equal(binding.launchId, confirmed.launch.id);
  assert.match(binding.sessionId, /^\d{4}-\d{2}-\d{2}-01$/);
  await assert.rejects(verifyGuideLaunch(h.root, DEFAULT_CONFIG), /No Guide prompt is READY_TO_LAUNCH/);
});

test("GUIDE BINDING STATUS: the session-local binding is close-bound and corruption refuses", async (t) => {
  const h = await guideHarness(t, true);
  const confirmed = await confirmGuideLaunch(h.root, DEFAULT_CONFIG, h.promptFile, "Kristian");
  h.git(h.root, ["add", "-A"]);
  h.git(h.root, ["commit", "-m", "guide: confirm bound route"]);
  h.git(h.root, ["push"]);
  await runCli(["session", "new", h.promptFile], h.root, { out() {}, error() {}, async prompt() { return ""; } });
  const sessions = await readdir(path.join(h.root, "docs", "sessions"));
  const file = path.join(h.root, "docs", "sessions", sessions[0]!, "guide-launch.json");
  const binding = JSON.parse(await readFile(file, "utf8"));
  assert.equal(binding.launchId, confirmed.launch.id);
  await writeJsonAtomic(file, { ...binding, sessionId: "2026-07-18-99" });
  await assert.rejects(runGuideCli(["status"], h.root, { out() {} }), /guide-launch\.json is invalid/);
});

test("GUIDE BINDING RECOVERY: an interrupted open can bind only the matching latest session", async (t) => {
  const h = await guideHarness(t, true);
  const confirmed = await confirmGuideLaunch(h.root, DEFAULT_CONFIG, h.promptFile, "Kristian");
  h.git(h.root, ["add", "-A"]);
  h.git(h.root, ["commit", "-m", "guide: confirm recoverable route"]);
  h.git(h.root, ["push"]);
  const interrupted = await createSession(h.root, DEFAULT_CONFIG, prompt);
  const output: string[] = [];
  await runGuideCli(["bind", confirmed.launch.id, interrupted.id], h.root, {
    out(message) { output.push(message); },
  });
  assert.match(output.join("\n"), new RegExp(`LAUNCH BOUND — ${confirmed.launch.id} → ${interrupted.id}`));
  const binding = JSON.parse(await readFile(path.join(interrupted.directory, "guide-launch.json"), "utf8"));
  assert.equal(binding.launchId, confirmed.launch.id);
  await assert.rejects(verifyGuideLaunch(h.root, DEFAULT_CONFIG), /No Guide prompt is READY_TO_LAUNCH/);
});

test("GUIDE STATUS TRUTH: corrupt launch evidence refuses instead of guessing", async (t) => {
  const h = await guideHarness(t);
  const confirmed = await confirmGuideLaunch(h.root, DEFAULT_CONFIG, h.promptFile, "Kristian");
  await writeFile(
    path.join(guideLaunchesDir(h.root, DEFAULT_CONFIG), `${confirmed.launch.id}.json`),
    "{ not-json\n",
    "utf8",
  );
  await assert.rejects(
    runGuideCli(["status"], h.root, { out() {} }),
    /is not valid JSON/,
  );
});
