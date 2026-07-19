import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdir, readFile, readdir, rm, stat, symlink, writeFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

import { runCli } from "../src/commands.ts";
import { DEFAULT_CONFIG } from "../src/config.ts";
import { createWaitingDirection, WAITING_DIRECTION_PREFIX } from "../src/direction.ts";
import { runGuideCli } from "../src/guide-commands.ts";
import {
  cancelGuideLaunch,
  confirmGuideLaunch,
  guideLaunchesDir,
  verifyGuideLaunch,
} from "../src/guide.ts";
import { currentGuideRuntime, listGuideRuntimes, prepareGuideRuntime } from "../src/guide-runtime.ts";
import { ghosttyWindowRequests, requestGhosttyRecoveryWindows, requestGhosttyWindows } from "../src/ghostty.ts";
import { prepareHaltArtifact } from "../src/halt.ts";
import { createSession, loadSessionState, writeJsonAtomic } from "../src/project.ts";
import { temporaryRoot } from "./helpers.ts";
import { verifyToolkitIntegrity } from "../src/toolkit-integrity.ts";

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
  await writeFile(path.join(root, ".gitignore"), ".koda/\n.DS_Store\n", "utf8");
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
    /Session .* is neither closed nor pushed-halted:\n- Every declared phase has not advanced/,
  );
});

test("GUIDE PREFLIGHT: active work distinguishes blocked successors from explicit independent siblings", async (t) => {
  const h = await guideHarness(t);
  const active = await createSession(h.root, DEFAULT_CONFIG, prompt);
  const output: string[] = [];
  await runGuideCli(["status"], h.root, { out(message) { output.push(message); } });
  const status = output.join("\n");
  assert.match(status, /ACTIVE PROJECT WORK — 1 bounded session/);
  assert.match(status, new RegExp(`Current bounded session: ${active.id} — produce — brief \\(1/6\\)`));
  assert.match(status, /Named condition: Every declared phase has not advanced/);
  assert.match(status, /dependent successor is blocked until every named predecessor has pushed close or halt evidence/);
  assert.match(status, /Guide may discuss or preserve a future idea now/);
  assert.match(status, /Starting a dependent successor still waits for pushed close or halt/);
  assert.match(status, /independent sibling may be confirmed only with an explicit --independent classification/);
  assert.match(status, /different kind name alone proves nothing/);
  assert.doesNotMatch(status, /NEXT SESSION BLOCKED — the current project path is still in flight/);
  assert.doesNotMatch(status, /one next-session draft may continue/);
  const toolkit = await verifyToolkitIntegrity();
  assert.match(status, new RegExp(`TOOLKIT READY — ${toolkit.capability} — ${toolkit.testCount}/${toolkit.testCount} post-push checks`));
  assert.match(status, /The owner must never relay commands, paths, hashes, commits, test counts, receipts, or evidence locations/);
});

test("GUIDE TOOLKIT BINDING: confirmation carries machine-discovered launch integrity", async (t) => {
  const h = await guideHarness(t);
  const toolkit = await verifyToolkitIntegrity();
  const confirmed = await confirmGuideLaunch(h.root, DEFAULT_CONFIG, h.promptFile, "Kristian");
  assert.equal(confirmed.launch.toolkit?.capability, toolkit.capability);
  assert.equal(confirmed.launch.toolkit?.testCount, toolkit.testCount);
  assert.match(confirmed.launch.toolkit?.manifestSha256 ?? "", /^[a-f0-9]{64}$/);
  assert.equal(
    confirmed.launch.toolkit?.evidence.path,
    toolkit.evidence.path,
  );
});

test("GUIDE TOOLKIT MUTATION: changed bound toolkit proof makes the launch stale", async (t) => {
  const h = await guideHarness(t);
  const confirmed = await confirmGuideLaunch(h.root, DEFAULT_CONFIG, h.promptFile, "Kristian");
  const file = path.join(guideLaunchesDir(h.root, DEFAULT_CONFIG), `${confirmed.launch.id}.json`);
  await writeJsonAtomic(file, {
    ...confirmed.launch,
    toolkit: { ...confirmed.launch.toolkit, manifestSha256: "0".repeat(64) },
  });
  await assert.rejects(
    verifyGuideLaunch(h.root, DEFAULT_CONFIG),
    /verified toolkit changed after owner confirmation.*stale/,
  );
});

test("GUIDE INDEPENDENT CONTROL: an active Produce session permits an owner-classified Explore sibling", async (t) => {
  const h = await guideHarness(t);
  await createSession(h.root, DEFAULT_CONFIG, prompt, { kind: "produce" });
  const confirmed = await confirmGuideLaunch(h.root, DEFAULT_CONFIG, h.promptFile, "Kristian", {
    kind: "explore",
    independent: true,
  });
  assert.equal(confirmed.launch.sessionKind, "explore");
  assert.equal(confirmed.launch.launchMode, "independent");
  assert.deepEqual(confirmed.launch.dependencies, []);
  assert.equal(confirmed.launch.previousSessionId, null);
});

test("GUIDE INDEPENDENT BINDING: confirmed kind and independence open exactly one matching sibling", async (t) => {
  const h = await guideHarness(t, true);
  const first = await createSession(h.root, DEFAULT_CONFIG, prompt, { kind: "produce" });
  const confirmed = await confirmGuideLaunch(h.root, DEFAULT_CONFIG, h.promptFile, "Kristian", {
    kind: "explore",
    independent: true,
  });
  h.git(h.root, ["add", "-A"]);
  h.git(h.root, ["commit", "-m", "guide: confirm independent Explore sibling"]);
  h.git(h.root, ["push"]);

  await assert.rejects(
    runCli(["session", "new", h.promptFile, "--kind", "produce", "--independent"], h.root, {
      out() {}, error() {}, async prompt() { return ""; },
    }),
    /do not match the owner-confirmed Guide launch/,
  );
  assert.deepEqual((await readdir(path.join(h.root, "docs", "sessions"))).sort(), [first.id]);

  const output: string[] = [];
  await runCli(["session", "new", h.promptFile, "--kind", "explore", "--independent"], h.root, {
    out(message) { output.push(message); }, error() {}, async prompt() { return ""; },
  });
  assert.match(output.join("\n"), /Kind: explore/);
  assert.match(output.join("\n"), /Launch: independent/);
  const ids = (await readdir(path.join(h.root, "docs", "sessions"))).sort();
  assert.equal(ids.length, 2);
  const state = await loadSessionState(path.join(h.root, "docs", "sessions", ids[1]!), ids[1]);
  assert.equal(state.kind, "explore");
  assert.equal(state.launchMode, "independent");
  const binding = JSON.parse(await readFile(path.join(h.root, "docs", "sessions", ids[1]!, "guide-launch.json"), "utf8"));
  assert.equal(binding.launchId, confirmed.launch.id);
});

test("GUIDE PREFLIGHT CONTROL: a project with no active session permits exactly one draft", async (t) => {
  const h = await guideHarness(t);
  const output: string[] = [];
  await runGuideCli(["status"], h.root, { out(message) { output.push(message); } });
  const status = output.join("\n");
  assert.match(status, /BETWEEN SESSIONS — Guide discussion or one next-session draft may continue/);
  assert.doesNotMatch(status, /NEXT SESSION BLOCKED/);
});

test("GUIDE HALT RETURN: a pushed halt and every waiting direction must enter a fresh confirmed Brief", async (t) => {
  const h = await guideHarness(t, true);
  const first = await createSession(h.root, DEFAULT_CONFIG, prompt);
  const direction = await createWaitingDirection({
    sessionDir: first.directory,
    state: first.state,
    source: "owner-via-guide",
    ownerStatement: "Carry the changed product direction into a fresh Brief.",
    classification: `${WAITING_DIRECTION_PREFIX}\nDo not inject this into the active phase.`,
  });
  await prepareHaltArtifact(first.directory, first.state, "End this attempt and restart from Guide.");
  h.git(h.root, ["add", "-A"]);
  h.git(h.root, ["commit", "-m", "halt first guided session"]);
  h.git(h.root, ["push"]);

  const status: string[] = [];
  await runGuideCli(["status"], h.root, { out(message) { status.push(message); } });
  assert.match(status.join("\n"), /BETWEEN SESSIONS — Guide discussion or one next-session draft may continue/);
  assert.doesNotMatch(status.join("\n"), /NEXT SESSION BLOCKED/);

  await assert.rejects(
    confirmGuideLaunch(h.root, DEFAULT_CONFIG, h.promptFile, "Kristian"),
    /Guide prompt must cite every direction released at the prior session boundary/,
  );
  const haltContent = await readFile(path.join(first.directory, "halt.md"), "utf8");
  const haltId = haltContent.match(/- Halt ID: `([^`]+)`/)?.[1];
  assert(haltId);
  const freshPrompt = prompt
    .replace("- Previous close: none for the first session", `- Previous terminal evidence: halt ${haltId}`)
    .replace("- Carried forward by owner: none", `- Carried forward by owner: waiting direction ${direction.metadata.id}`);
  await writeFile(h.promptFile, freshPrompt, "utf8");
  const confirmed = await confirmGuideLaunch(h.root, DEFAULT_CONFIG, h.promptFile, "Kristian");
  assert.equal(confirmed.launch.previousSessionId, first.id);
  h.git(h.root, ["add", "-A"]);
  h.git(h.root, ["commit", "-m", "guide: confirm fresh Brief after halt"]);
  h.git(h.root, ["push"]);

  const output: string[] = [];
  await runCli(["session", "new", h.promptFile], h.root, {
    out(message) { output.push(message); },
    error() {},
    async prompt() { return ""; },
  });
  assert.match(output.join("\n"), /Fresh Brief after pushed halt/);
  const sessions = (await readdir(path.join(h.root, "docs", "sessions"))).sort();
  assert.equal(sessions.length, 2);
  const next = await loadSessionState(path.join(h.root, "docs", "sessions", sessions[1]!));
  assert.deepEqual(next.entryDirections?.map((entry) => entry.id), [direction.metadata.id]);
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

test("GUIDE VERIFIED HANDOVER: the owner receives a complete numbered launch choice", async (t) => {
  const h = await guideHarness(t, true);
  await confirmGuideLaunch(h.root, DEFAULT_CONFIG, h.promptFile, "Kristian");
  h.git(h.root, ["add", "-A"]);
  h.git(h.root, ["commit", "-m", "guide: confirm numbered launch fixture"]);
  h.git(h.root, ["push"]);
  const output: string[] = [];
  await runGuideCli(["verify"], h.root, { out(message) { output.push(message); } });
  const rendered = output.join("\n");
  assert.match(rendered, /READY TO LAUNCH — OWNER CHOICE/);
  assert.match(rendered, /1\. Launch this session now.*one local launcher command.*one Reviewer and one Producer window/);
  assert.match(rendered, /2\. Not now — keep this launch ready without opening windows/);
  assert.match(rendered, /do not paste or reconstruct a technical command/);
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

test("GUIDE RUNTIME: one command binds a pushed launch and prints executable session-context commands", async (t) => {
  const h = await guideHarness(t, true);
  const confirmed = await confirmGuideLaunch(h.root, DEFAULT_CONFIG, h.promptFile, "Kristian");
  h.git(h.root, ["add", "-A"]);
  h.git(h.root, ["commit", "-m", "guide: confirm runtime route"]);
  h.git(h.root, ["push"]);

  const output: string[] = [];
  await runGuideCli([
    "launch",
    "--producer-model", "gpt-5.6-sol",
    "--producer-effort", "medium",
    "--reviewer-model", "gpt-5.6-terra",
    "--reviewer-effort", "medium",
  ], h.root, { out(message) { output.push(message); } });
  assert.match(output.join("\n"), new RegExp(`GUIDE SESSION PREPARED — ${confirmed.launch.id}`));
  assert.match(output.join("\n"), /WINDOW B — REVIEWER \/ OWNER \(start this first\)/);
  assert.match(output.join("\n"), /WINDOW A — PRODUCER \(then start this\)/);
  const runRoot = path.join(h.root, ".koda", "runs", confirmed.launch.id);
  const run = JSON.parse(await readFile(path.join(runRoot, "RUN.json"), "utf8"));
  assert.equal(run.mode, "guide-project");
  assert.equal(run.prompt, "docs/guide/prompts/next-session.md");
  assert.equal(run.initialCommit, spawnSync("git", ["rev-parse", "HEAD"], { cwd: h.root, encoding: "utf8" }).stdout.trim());
  assert.equal(spawnSync("git", ["status", "--porcelain", "--untracked-files=all"], { cwd: h.root, encoding: "utf8" }).stdout, "");

  const statusLine = output.at(-1)!;
  const status = spawnSync("/bin/zsh", ["-c", statusLine], { cwd: h.root, encoding: "utf8" });
  assert.equal(status.status, 0, status.stderr);
  assert.match(status.stdout, /Run state: PREPARED/);
  assert.match(status.stdout, new RegExp(confirmed.launch.id));

  const again = await prepareGuideRuntime(h.root, DEFAULT_CONFIG, {
    producerModel: "gpt-5.6-sol",
    producerEffort: "medium",
    reviewerModel: "gpt-5.6-terra",
    reviewerEffort: "medium",
  });
  assert.equal(again.reused, true);
  assert.equal(again.runRoot, runRoot);

  await writeJsonAtomic(path.join(runRoot, "RUN.json"), { ...run, status: "PAUSED_BY_OWNER" });
  const guideStatus: string[] = [];
  await runGuideCli(["status"], h.root, { out(message) { guideStatus.push(message); } });
  assert.match(guideStatus.join("\n"), /Owner input: OPEN — project-level conversation belongs in this Guide context/);
  assert.match(guideStatus.join("\n"), /Guide direction cannot inject the active phase/);
  assert.match(guideStatus.join("\n"), /ACTIVE PROJECT WORK — 0 bounded session/);
  assert.match(guideStatus.join("\n"), /Current bound launch: .* — PAUSED_BY_OWNER/);
  assert.match(guideStatus.join("\n"), /current READY_TO_LAUNCH request must bind or be cancelled before another confirmation/);
  assert.match(guideStatus.join("\n"), new RegExp(`ACTIVE SESSION RUNTIME — ${confirmed.launch.id}`));
  assert.match(guideStatus.join("\n"), /State: PAUSED_BY_OWNER/);
  assert.match(guideStatus.join("\n"), /SESSION IS PAUSED SAFELY/);
  assert.match(guideStatus.join("\n"), /1\. Ask Guide to inspect this exact pause/);
  assert.doesNotMatch(guideStatus.join("\n"), /run-relay-reviewer-window|execute-relay-run/);
});

test("GUIDE RUNTIME MUTATION: an unignored runtime refuses by name", async (t) => {
  const h = await guideHarness(t, true);
  await confirmGuideLaunch(h.root, DEFAULT_CONFIG, h.promptFile, "Kristian");
  h.git(h.root, ["add", "-A"]);
  h.git(h.root, ["commit", "-m", "guide: confirm ignored runtime route"]);
  h.git(h.root, ["push"]);
  await writeFile(path.join(h.root, ".gitignore"), ".DS_Store\n", "utf8");
  await assert.rejects(prepareGuideRuntime(h.root, DEFAULT_CONFIG, {
    producerModel: "gpt-5.6-sol",
    producerEffort: "medium",
    reviewerModel: "gpt-5.6-terra",
    reviewerEffort: "medium",
  }), /refuses until \.koda\/ is ignored by Git/);
});

test("GUIDE RUNTIME PLURALITY: unfinished runtimes coexist and status names each one", async (t) => {
  const h = await guideHarness(t, true);
  await confirmGuideLaunch(h.root, DEFAULT_CONFIG, h.promptFile, "Kristian");
  h.git(h.root, ["add", "-A"]);
  h.git(h.root, ["commit", "-m", "guide: confirm single runtime route"]);
  h.git(h.root, ["push"]);
  const prepared = await prepareGuideRuntime(h.root, DEFAULT_CONFIG, {
    producerModel: "gpt-5.6-sol",
    producerEffort: "medium",
    reviewerModel: "gpt-5.6-terra",
    reviewerEffort: "medium",
  });
  const otherId = "00000000-0000-4000-8000-000000000001";
  const otherRoot = path.join(h.root, ".koda", "runs", otherId);
  await mkdir(otherRoot);
  await writeJsonAtomic(path.join(otherRoot, "RUN.json"), { ...prepared.run, launchId: otherId });
  const reused = await prepareGuideRuntime(h.root, DEFAULT_CONFIG, {
    producerModel: "gpt-5.6-sol",
    producerEffort: "medium",
    reviewerModel: "gpt-5.6-terra",
    reviewerEffort: "medium",
  });
  assert.equal(reused.reused, true);
  const runtimes = await listGuideRuntimes(h.root);
  assert.deepEqual(runtimes.map(({ run }) => run.launchId).sort(), [prepared.run.launchId, otherId].sort());
  await assert.rejects(currentGuideRuntime(h.root), /select one by launch ID instead of guessing/);
  assert.equal((await currentGuideRuntime(h.root, otherId))?.run.launchId, otherId);
  const status: string[] = [];
  await runGuideCli(["status"], h.root, { out(message) { status.push(message); } });
  assert.match(status.join("\n"), new RegExp(`ACTIVE SESSION RUNTIME — ${prepared.run.launchId}`));
  assert.match(status.join("\n"), new RegExp(`ACTIVE SESSION RUNTIME — ${otherId}`));
  assert.match(status.join("\n"), /session not opened/i);
});

test("GUIDE RUNTIME MUTATION: a linked RUN.json refuses as unsafe state", async (t) => {
  const h = await guideHarness(t, true);
  const confirmed = await confirmGuideLaunch(h.root, DEFAULT_CONFIG, h.promptFile, "Kristian");
  h.git(h.root, ["add", "-A"]);
  h.git(h.root, ["commit", "-m", "guide: confirm linked-runtime refusal"]);
  h.git(h.root, ["push"]);
  const runs = path.join(h.root, ".koda", "runs");
  const runRoot = path.join(runs, confirmed.launch.id);
  await mkdir(runRoot, { recursive: true });
  const target = path.join(h.root, ".koda", "outside-run.json");
  await writeJsonAtomic(target, {
    version: 1,
    mode: "guide-project",
    scenario: "guide-confirmed",
    status: "PREPARED",
    preparedAt: new Date().toISOString(),
    launchId: confirmed.launch.id,
    producer: { model: "gpt-5.6-sol", effort: "medium", threadId: null, turns: 0 },
    reviewer: { model: "gpt-5.6-terra", effort: "medium", threadId: null, turns: 0 },
    project: "../../..",
    runtime: ".",
    cli: path.join(process.cwd(), "src", "cli.ts"),
    prompt: "docs/guide/prompts/next-session.md",
    archive: `docs/guide/runs/${confirmed.launch.id}`,
    guideReturn: `docs/guide/returns/${confirmed.launch.id}.json`,
    initialCommit: h.git(h.root, ["rev-parse", "HEAD"]),
    maxTurns: 60,
  });
  await symlink(target, path.join(runRoot, "RUN.json"));
  await assert.rejects(prepareGuideRuntime(h.root, DEFAULT_CONFIG, {
    producerModel: "gpt-5.6-sol",
    producerEffort: "medium",
    reviewerModel: "gpt-5.6-terra",
    reviewerEffort: "medium",
  }), /RUN\.json is missing or not a regular file/);
});

test("GUIDE RUNTIME STATUS TRUTH: corrupt live state refuses instead of hiding behind launch state", async (t) => {
  const h = await guideHarness(t, true);
  await confirmGuideLaunch(h.root, DEFAULT_CONFIG, h.promptFile, "Kristian");
  h.git(h.root, ["add", "-A"]);
  h.git(h.root, ["commit", "-m", "guide: confirm status-truth route"]);
  h.git(h.root, ["push"]);
  const prepared = await prepareGuideRuntime(h.root, DEFAULT_CONFIG, {
    producerModel: "gpt-5.6-sol",
    producerEffort: "medium",
    reviewerModel: "gpt-5.6-terra",
    reviewerEffort: "medium",
  });
  await writeFile(path.join(prepared.runRoot, "RUN.json"), "{ corrupt runtime\n", "utf8");
  await assert.rejects(
    runGuideCli(["status"], h.root, { out() {} }),
    /Guide runtime state is corrupt: .*RUN\.json is not valid JSON/,
  );
});

test("GUIDE RUNTIME STATUS TRUTH: a forged HALTED label refuses without pushed halt evidence", async (t) => {
  const h = await guideHarness(t, true);
  await confirmGuideLaunch(h.root, DEFAULT_CONFIG, h.promptFile, "Kristian");
  h.git(h.root, ["add", "-A"]);
  h.git(h.root, ["commit", "-m", "guide: confirm forged halt fixture"]);
  h.git(h.root, ["push"]);
  const prepared = await prepareGuideRuntime(h.root, DEFAULT_CONFIG, {
    producerModel: "gpt-5.6-sol",
    producerEffort: "medium",
    reviewerModel: "gpt-5.6-terra",
    reviewerEffort: "medium",
  });
  await writeJsonAtomic(path.join(prepared.runRoot, "RUN.json"), { ...prepared.run, status: "HALTED" });
  await assert.rejects(
    runGuideCli(["status"], h.root, { out() {} }),
    /claims HALTED but no bound session exists/,
  );
});

test("GUIDE GHOSTTY START: one explicit action requests exactly one clean Reviewer and Producer launcher", async (t) => {
  const h = await guideHarness(t, true);
  const confirmed = await confirmGuideLaunch(h.root, DEFAULT_CONFIG, h.promptFile, "Kristian");
  h.git(h.root, ["add", "-A"]);
  h.git(h.root, ["commit", "-m", "guide: confirm visible Ghostty route"]);
  h.git(h.root, ["push"]);
  const opened: Array<{ args: string[]; cwd: string }> = [];
  const output: string[] = [];
  const args = [
    "launch",
    "--producer-model", "gpt-5.6-sol",
    "--producer-effort", "medium",
    "--reviewer-model", "gpt-5.6-terra",
    "--reviewer-effort", "medium",
    "--open", "ghostty",
  ];
  const dependencies = {
    async openGhostty(project: string, prepared: Awaited<ReturnType<typeof prepareGuideRuntime>>) {
      return requestGhosttyWindows(project, prepared, {
        platform: "darwin",
        codexExecutable: process.execPath,
        open(openArgs, cwd) {
          opened.push({ args: openArgs, cwd });
          return { status: 0, stderr: "" };
        },
        async waitForStartedReviewer() {
          assert.equal(opened.length, 1, "Producer must not open before Reviewer is ready");
          return true;
        },
        async waitForStartedProducer() {
          assert.equal(opened.length, 2, "Launch must verify Producer after its window is requested");
          return true;
        },
      });
    },
  };
  await runGuideCli(args, h.root, { out(message) { output.push(message); } }, dependencies);
  assert.equal(opened.length, 2);
  assert.match(opened[0]!.args.join("\n"), /Koda-C Reviewer/);
  assert.match(opened[1]!.args.join("\n"), /Koda-C Producer/);
  for (const request of opened) {
    assert.equal(request.cwd, h.root);
    assert.equal(request.args[0], "-na");
    assert.equal(request.args[1], "Ghostty.app");
    assert.ok(request.args.includes("--wait-after-command=true"));
    assert.ok(request.args.includes("--shell-integration=none"));
    const executeIndex = request.args.indexOf("-e");
    assert.notEqual(executeIndex, -1);
    assert.equal(request.args.length, executeIndex + 2, "Ghostty must receive exactly one command token after -e");
    assert.match(request.args[executeIndex + 1]!, /^\.\/\.koda\/runs\/[0-9a-f-]+\/launch-(reviewer|producer)\.sh$/);
    assert.ok(!request.args.includes("/usr/bin/env"));
    assert.ok(!request.args.some((item) => item.startsWith("PATH=")));
    assert.ok(!request.args.some((item) => item.startsWith("KODA_CODEX_BIN=")));
    assert.ok(!request.args.includes("/bin/zsh"));
    assert.ok(!request.args.includes("-lc"));
  }
  const runRoot = path.join(h.root, ".koda", "runs", confirmed.launch.id);
  const reviewerLauncher = await readFile(path.join(runRoot, "launch-reviewer.sh"), "utf8");
  const producerLauncher = await readFile(path.join(runRoot, "launch-producer.sh"), "utf8");
  assert.match(reviewerLauncher, /run-relay-reviewer-window\.ts/);
  assert.match(producerLauncher, /execute-relay-run\.ts/);
  assert.doesNotMatch(reviewerLauncher + producerLauncher, /FIREWORKS_API_KEY|OPENAI_API_KEY|CODEX_THREAD_ID/);
  assert.equal((await stat(path.join(runRoot, "launch-reviewer.sh"))).mode & 0o777, 0o700);
  assert.equal((await stat(path.join(runRoot, "launch-producer.sh"))).mode & 0o777, 0o700);
  assert.match(output.join("\n"), /THREE-CONTEXT START REQUESTED/);
  assert.match(output.join("\n"), /This Guide conversation stays open/);
  assert.doesNotMatch(output.join("\n"), /run-relay-reviewer-window|execute-relay-run/);
  const runFile = path.join(runRoot, "RUN.json");
  const run = JSON.parse(await readFile(runFile, "utf8"));
  assert.equal(run.terminalLaunch.adapter, "ghostty-macos");

  await assert.rejects(
    runGuideCli([...args], h.root, { out() {} }, dependencies),
    (error: unknown) => {
      assert.ok(error instanceof Error);
      assert.match(error.message, /automatic Ghostty opening refuses to create duplicate Producer or Reviewer processes/);
      assert.match(error.message, /Return to Guide/);
      assert.doesNotMatch(error.message, /koda guide status|recovery commands/);
      return true;
    },
  );
  assert.equal(opened.length, 2);

  await writeFile(path.join(runRoot, "launch-reviewer.sh"), "tampered launcher\n", "utf8");
  const reused = await prepareGuideRuntime(h.root, DEFAULT_CONFIG, {
    producerModel: "gpt-5.6-sol",
    producerEffort: "medium",
    reviewerModel: "gpt-5.6-terra",
    reviewerEffort: "medium",
  });
  await assert.rejects(
    ghosttyWindowRequests(h.root, reused, { platform: "darwin", codexExecutable: process.execPath }),
    /Existing Ghostty role launcher is unsafe or changed/,
  );
});

test("GUIDE GHOSTTY MUTATION: a failed Producer request refuses duplicate automatic recovery", async (t) => {
  const h = await guideHarness(t, true);
  await confirmGuideLaunch(h.root, DEFAULT_CONFIG, h.promptFile, "Kristian");
  h.git(h.root, ["add", "-A"]);
  h.git(h.root, ["commit", "-m", "guide: confirm partial Ghostty refusal"]);
  h.git(h.root, ["push"]);
  const prepared = await prepareGuideRuntime(h.root, DEFAULT_CONFIG, {
    producerModel: "gpt-5.6-sol",
    producerEffort: "medium",
    reviewerModel: "gpt-5.6-terra",
    reviewerEffort: "medium",
  });
  const opened: string[] = [];
  await assert.rejects(requestGhosttyWindows(h.root, prepared, {
    platform: "darwin",
    codexExecutable: process.execPath,
    open(args) {
      const title = args.find((item) => item.startsWith("--title="))!;
      opened.push(title);
      return opened.length === 1
        ? { status: 0, stderr: "" }
        : { status: 1, stderr: "injected Producer open failure" };
    },
    async waitForStartedReviewer() { return true; },
  }), /Ghostty refused the producer window request: injected Producer open failure.*runtime remains recoverable/);
  assert.equal(opened.length, 2);
  const run = JSON.parse(await readFile(path.join(prepared.runRoot, "RUN.json"), "utf8"));
  assert.equal(run.status, "PREPARED");
  assert.equal(run.terminalLaunch.adapter, "ghostty-macos");
  assert.match(run.lastError, /producer window request/);

  const status: string[] = [];
  await runGuideCli(["status"], h.root, { out(message) { status.push(message); } });
  assert.match(status.join("\n"), /Visible launch: ghostty-macos requested/);
  assert.match(status.join("\n"), /Last error: Ghostty refused the producer window request/);
  assert.match(status.join("\n"), /SESSION NEEDS GUIDE ATTENTION/);
  assert.match(status.join("\n"), /1\. Ask Guide to diagnose this exact saved session/);
  assert.doesNotMatch(status.join("\n"), /run-relay-reviewer-window|execute-relay-run/);
  await assert.rejects(requestGhosttyWindows(h.root, { ...prepared, reused: true }), (error: unknown) => {
    assert.ok(error instanceof Error);
    assert.match(error.message, /refuses to create duplicate Producer or Reviewer processes/);
    assert.match(error.message, /Return to Guide/);
    assert.doesNotMatch(error.message, /koda guide status|recovery commands/);
    return true;
  });
  assert.equal(opened.length, 2);
});

test("GUIDE GHOSTTY REVIEWER READINESS MUTATION: a window request without a live Reviewer never opens Producer", async (t) => {
  const h = await guideHarness(t, true);
  await confirmGuideLaunch(h.root, DEFAULT_CONFIG, h.promptFile, "Kristian");
  h.git(h.root, ["add", "-A"]);
  h.git(h.root, ["commit", "-m", "guide: confirm Reviewer readiness mutation"]);
  h.git(h.root, ["push"]);
  const prepared = await prepareGuideRuntime(h.root, DEFAULT_CONFIG, {
    producerModel: "gpt-5.6-sol",
    producerEffort: "medium",
    reviewerModel: "gpt-5.6-terra",
    reviewerEffort: "medium",
  });
  const opened: string[] = [];
  await assert.rejects(requestGhosttyWindows(h.root, prepared, {
    platform: "darwin",
    codexExecutable: process.execPath,
    open(args) {
      opened.push(args.find((item) => item.startsWith("--title=")) ?? "missing title");
      return { status: 0, stderr: "" };
    },
    async waitForStartedReviewer() { return false; },
    async waitForStartedProducer() { throw new Error("Producer readiness must not run"); },
  }), /Reviewer window request returned, but Reviewer did not become ready; the Producer was not opened/);
  assert.equal(opened.length, 1);
  assert.match(opened[0]!, /Reviewer/);
  const run = JSON.parse(await readFile(path.join(prepared.runRoot, "RUN.json"), "utf8"));
  assert.match(run.lastError, /Reviewer did not become ready/);
});

test("GUIDE GHOSTTY PRODUCER READINESS MUTATION: a window request without a live Producer refuses success", async (t) => {
  const h = await guideHarness(t, true);
  await confirmGuideLaunch(h.root, DEFAULT_CONFIG, h.promptFile, "Kristian");
  h.git(h.root, ["add", "-A"]);
  h.git(h.root, ["commit", "-m", "guide: confirm Producer readiness mutation"]);
  h.git(h.root, ["push"]);
  const prepared = await prepareGuideRuntime(h.root, DEFAULT_CONFIG, {
    producerModel: "gpt-5.6-sol",
    producerEffort: "medium",
    reviewerModel: "gpt-5.6-terra",
    reviewerEffort: "medium",
  });
  const opened: string[] = [];
  await assert.rejects(requestGhosttyWindows(h.root, prepared, {
    platform: "darwin",
    codexExecutable: process.execPath,
    open(args) {
      opened.push(args.find((item) => item.startsWith("--title=")) ?? "missing title");
      return { status: 0, stderr: "" };
    },
    async waitForStartedReviewer() { return true; },
    async waitForStartedProducer() { return false; },
  }), /Producer window request returned, but Producer did not become ready/);
  assert.equal(opened.length, 2);
  assert.match(opened[0]!, /Reviewer/);
  assert.match(opened[1]!, /Producer/);
  const run = JSON.parse(await readFile(path.join(prepared.runRoot, "RUN.json"), "utf8"));
  assert.match(run.lastError, /Producer did not become ready/);
});

test("GUIDE VISIBLE ROLE STATUS: disk liveness reports a missing Producer instead of pretending the session is active", async (t) => {
  const h = await guideHarness(t, true);
  await confirmGuideLaunch(h.root, DEFAULT_CONFIG, h.promptFile, "Kristian");
  h.git(h.root, ["add", "-A"]);
  h.git(h.root, ["commit", "-m", "guide: confirm visible role status"]);
  h.git(h.root, ["push"]);
  const prepared = await prepareGuideRuntime(h.root, DEFAULT_CONFIG, {
    producerModel: "gpt-5.6-sol",
    producerEffort: "medium",
    reviewerModel: "gpt-5.6-terra",
    reviewerEffort: "medium",
  });
  prepared.run.status = "AWAITING_REVIEWER_WINDOW";
  prepared.run.terminalLaunch = { adapter: "ghostty-macos", requestedAt: new Date().toISOString() };
  await writeJsonAtomic(path.join(prepared.runRoot, "RUN.json"), prepared.run);
  for (const lock of [".reviewer-window.lock", ".producer-window.lock"]) {
    await mkdir(path.join(prepared.runRoot, lock));
    await writeJsonAtomic(path.join(prepared.runRoot, lock, "OWNER.json"), {
      version: 1,
      pid: process.pid,
      startedAt: new Date().toISOString(),
    });
  }

  const healthy: string[] = [];
  await runGuideCli(["status"], h.root, { out(message) { healthy.push(message); } });
  assert.match(healthy.join("\n"), /Visible roles: Reviewer running; Producer running/);
  assert.match(healthy.join("\n"), /SESSION IS ACTIVE/);

  await rm(path.join(prepared.runRoot, ".producer-window.lock"), { recursive: true });
  const missing: string[] = [];
  await runGuideCli(["status"], h.root, { out(message) { missing.push(message); } });
  const ownerView = missing.join("\n");
  assert.match(ownerView, /Visible roles: Reviewer running; Producer not running/);
  assert.match(ownerView, /SESSION WINDOW RECOVERY NEEDED/);
  assert.match(ownerView, /1\. Ask Guide to inspect this exact state and reopen only the missing role or roles when safe/);
  assert.doesNotMatch(ownerView, /run-relay-reviewer-window|execute-relay-run/);
});

test("GUIDE GHOSTTY OWNER-ERROR RECOVERY: one action reopens Reviewer first and Producer only after it is ready", async (t) => {
  const h = await guideHarness(t, true);
  await confirmGuideLaunch(h.root, DEFAULT_CONFIG, h.promptFile, "Kristian");
  h.git(h.root, ["add", "-A"]);
  h.git(h.root, ["commit", "-m", "guide: confirm receipt recovery fixture"]);
  h.git(h.root, ["push"]);
  const prepared = await prepareGuideRuntime(h.root, DEFAULT_CONFIG, {
    producerModel: "gpt-5.6-sol",
    producerEffort: "medium",
    reviewerModel: "gpt-5.6-terra",
    reviewerEffort: "medium",
  });
  await requestGhosttyWindows(h.root, prepared, {
    platform: "darwin",
    codexExecutable: process.execPath,
    open() { return { status: 0, stderr: "" }; },
    async waitForStartedReviewer() { return true; },
    async waitForStartedProducer() { return true; },
  });
  prepared.run.status = "PAUSED_REVIEWER_FAILURE";
  prepared.run.lastError = "Owner acknowledgement exited 1.";
  await writeJsonAtomic(path.join(prepared.runRoot, "RUN.json"), prepared.run);
  await writeJsonAtomic(path.join(prepared.runRoot, "REVIEWER-JOB.json"), {
    version: 1,
    id: "11111111-1111-4111-8111-111111111111",
    kind: "formal",
    phase: "brief",
    purpose: "formal review of brief",
    prompt: "Use the shared reviewer skill.",
    expectedPath: "docs/sessions/2026-07-19-01/reviews/01-brief-review.md",
    status: "FAILED",
    createdAt: new Date(0).toISOString(),
    updatedAt: new Date(0).toISOString(),
    error: "Owner acknowledgement exited 1.",
    completion: null,
  });

  const recoveryStatus: string[] = [];
  await runGuideCli(["status"], h.root, { out(message) { recoveryStatus.push(message); } });
  const ownerView = recoveryStatus.join("\n");
  assert.match(ownerView, /SESSION RECOVERY READY/);
  assert.match(ownerView, /1\. Reopen this session.*same Reviewer and Producer contexts/);
  assert.match(ownerView, /2\. Not now — keep the session safely paused/);
  assert.match(ownerView, /Do not paste or reconstruct a technical command/);
  assert.doesNotMatch(ownerView, /run-relay-reviewer-window|execute-relay-run/);

  const opened: string[] = [];
  const output: string[] = [];
  await runGuideCli(["recover", "--open", "ghostty"], h.root, { out(message) { output.push(message); } }, {
    async openGhostty() { throw new Error("ordinary launch must not run during recovery"); },
    async recoverGhostty(project, runtime, toolkit) {
      return requestGhosttyRecoveryWindows(project, runtime, toolkit, {
        platform: "darwin",
        codexExecutable: process.execPath,
        open(args) {
          opened.push(args.find((item) => item.startsWith("--title=")) ?? "missing title");
          return { status: 0, stderr: "" };
        },
        async waitForRecoveredReviewer() {
          assert.equal(opened.length, 1, "Producer must wait until the recovered Reviewer is ready");
          return true;
        },
        async waitForRecoveredProducer() {
          assert.equal(opened.length, 2, "Recovery must verify Producer after its window is requested");
          return true;
        },
      });
    },
  });
  assert.equal(opened.length, 2);
  assert.match(opened[0]!, /Reviewer/);
  assert.match(opened[1]!, /Producer/);
  assert.match(output.join("\n"), /SESSION RECOVERY REQUESTED/);
  assert.match(output.join("\n"), /same Reviewer context reopened at the unacknowledged review/);
  const recovery = JSON.parse(await readFile(path.join(prepared.runRoot, "RECOVERY.json"), "utf8"));
  assert.equal(recovery.reason, "owner-receipt-input-retry");
  assert.equal(recovery.toolkit.version, 1);
  assert.equal(recovery.toolkit.testCount, (await verifyToolkitIntegrity()).testCount);

  await assert.rejects(
    runGuideCli(["recover", "--open", "ghostty"], h.root, { out() {} }),
    (error: unknown) => {
      assert.ok(error instanceof Error);
      assert.match(error.message, /visible recovery was already requested/);
      assert.match(error.message, /Return to the Guide conversation/);
      assert.doesNotMatch(error.message, /koda guide status|recovery commands/);
      return true;
    },
  );
});

test("GUIDE GHOSTTY PARTIAL RECOVERY: an existing Reviewer permits exactly one missing Producer retry", async (t) => {
  const h = await guideHarness(t, true);
  await confirmGuideLaunch(h.root, DEFAULT_CONFIG, h.promptFile, "Kristian");
  h.git(h.root, ["add", "-A"]);
  h.git(h.root, ["commit", "-m", "guide: confirm partial recovery fixture"]);
  h.git(h.root, ["push"]);
  const prepared = await prepareGuideRuntime(h.root, DEFAULT_CONFIG, {
    producerModel: "gpt-5.6-sol",
    producerEffort: "medium",
    reviewerModel: "gpt-5.6-terra",
    reviewerEffort: "medium",
  });
  await requestGhosttyWindows(h.root, prepared, {
    platform: "darwin",
    codexExecutable: process.execPath,
    open() { return { status: 0, stderr: "" }; },
    async waitForStartedReviewer() { return true; },
    async waitForStartedProducer() { return true; },
  });
  prepared.run.status = "PAUSED_REVIEWER_FAILURE";
  prepared.run.lastError = "Owner acknowledgement exited 1.";
  await writeJsonAtomic(path.join(prepared.runRoot, "RUN.json"), prepared.run);
  const job = {
    version: 1,
    id: "22222222-2222-4222-8222-222222222222",
    kind: "formal",
    phase: "brief",
    purpose: "formal review of brief",
    prompt: "Use the shared reviewer skill.",
    expectedPath: "docs/sessions/2026-07-19-01/reviews/01-brief-review.md",
    status: "FAILED",
    createdAt: new Date(0).toISOString(),
    updatedAt: new Date(0).toISOString(),
    error: "Owner acknowledgement exited 1.",
    completion: null,
  };
  await writeJsonAtomic(path.join(prepared.runRoot, "REVIEWER-JOB.json"), job);
  await requestGhosttyRecoveryWindows(h.root, (await currentGuideRuntime(h.root))!, await verifyToolkitIntegrity(), {
    platform: "darwin",
    codexExecutable: process.execPath,
    open() { return { status: 0, stderr: "" }; },
    async waitForRecoveredReviewer() { return true; },
    async waitForRecoveredProducer() { return true; },
  });

  job.status = "AWAITING_OWNER";
  job.error = null;
  await writeJsonAtomic(path.join(prepared.runRoot, "REVIEWER-JOB.json"), job);
  prepared.run.status = "PAUSED_ERROR";
  prepared.run.lastError = "A different reviewer job is already active: formal brief (AWAITING_OWNER).";
  await writeJsonAtomic(path.join(prepared.runRoot, "RUN.json"), prepared.run);
  await mkdir(path.join(prepared.runRoot, ".reviewer-window.lock"));
  await writeJsonAtomic(path.join(prepared.runRoot, ".reviewer-window.lock", "OWNER.json"), {
    version: 1,
    pid: process.pid,
    startedAt: new Date().toISOString(),
  });

  const status: string[] = [];
  await runGuideCli(["status"], h.root, { out(message) { status.push(message); } });
  assert.match(status.join("\n"), /REVIEWER RECOVERED/);
  assert.match(status.join("\n"), /1\. Reopen only the missing Producer/);
  assert.doesNotMatch(status.join("\n"), /execute-relay-run\.ts/);

  const opened: string[] = [];
  const output: string[] = [];
  await runGuideCli(["recover", "--open", "ghostty"], h.root, { out(message) { output.push(message); } }, {
    async openGhostty() { throw new Error("ordinary launch must not run during partial recovery"); },
    async recoverGhostty(project, runtime, toolkit) {
      return requestGhosttyRecoveryWindows(project, runtime, toolkit, {
        platform: "darwin",
        codexExecutable: process.execPath,
        open(args) {
          opened.push(args.find((item) => item.startsWith("--title=")) ?? "missing title");
          return { status: 0, stderr: "" };
        },
        async waitForRecoveredProducer() {
          await mkdir(path.join(prepared.runRoot, ".producer-window.lock"));
          await writeJsonAtomic(path.join(prepared.runRoot, ".producer-window.lock", "OWNER.json"), {
            version: 1,
            pid: process.pid,
            startedAt: new Date().toISOString(),
          });
          return true;
        },
      });
    },
  });
  assert.equal(opened.length, 1);
  assert.match(opened[0]!, /Producer/);
  assert.match(output.join("\n"), /rejoined that existing decision/);
  const recovery = JSON.parse(await readFile(path.join(prepared.runRoot, "RECOVERY.json"), "utf8"));
  assert.equal(typeof recovery.producerRetryAt, "string");
  await assert.rejects(
    requestGhosttyRecoveryWindows(h.root, (await currentGuideRuntime(h.root))!, await verifyToolkitIntegrity(), {
      platform: "darwin",
      codexExecutable: process.execPath,
      open() { return { status: 0, stderr: "" }; },
    }),
    /visible recovery was already requested/,
  );
});

async function bothWindowsMissingAfterPartialRecovery(t: Parameters<typeof guideHarness>[0]) {
  const h = await guideHarness(t, true);
  await confirmGuideLaunch(h.root, DEFAULT_CONFIG, h.promptFile, "Kristian");
  h.git(h.root, ["add", "-A"]);
  h.git(h.root, ["commit", "-m", "guide: confirm both-window recovery fixture"]);
  h.git(h.root, ["push"]);
  const prepared = await prepareGuideRuntime(h.root, DEFAULT_CONFIG, {
    producerModel: "gpt-5.6-sol",
    producerEffort: "medium",
    reviewerModel: "gpt-5.6-terra",
    reviewerEffort: "medium",
  });
  await requestGhosttyWindows(h.root, prepared, {
    platform: "darwin",
    codexExecutable: process.execPath,
    open() { return { status: 0, stderr: "" }; },
    async waitForStartedReviewer() { return true; },
    async waitForStartedProducer() { return true; },
  });
  prepared.run.status = "PAUSED_REVIEWER_FAILURE";
  prepared.run.lastError = "Owner acknowledgement exited 1.";
  await writeJsonAtomic(path.join(prepared.runRoot, "RUN.json"), prepared.run);
  const job = {
    version: 1,
    id: "33333333-3333-4333-8333-333333333333",
    kind: "formal",
    phase: "brief",
    purpose: "formal review of brief",
    prompt: "Use the shared reviewer skill.",
    expectedPath: "docs/sessions/2026-07-19-01/reviews/01-brief-review.md",
    status: "FAILED",
    createdAt: new Date(0).toISOString(),
    updatedAt: new Date(0).toISOString(),
    error: "Owner acknowledgement exited 1.",
    completion: null,
  };
  await writeJsonAtomic(path.join(prepared.runRoot, "REVIEWER-JOB.json"), job);
  await requestGhosttyRecoveryWindows(h.root, (await currentGuideRuntime(h.root))!, await verifyToolkitIntegrity(), {
    platform: "darwin",
    codexExecutable: process.execPath,
    open() { return { status: 0, stderr: "" }; },
    async waitForRecoveredReviewer() { return true; },
    async waitForRecoveredProducer() { return true; },
  });

  job.status = "AWAITING_OWNER";
  job.error = null;
  await writeJsonAtomic(path.join(prepared.runRoot, "REVIEWER-JOB.json"), job);
  prepared.run.status = "PAUSED_ERROR";
  prepared.run.lastError = "A different reviewer job is already active: formal brief (AWAITING_OWNER).";
  await writeJsonAtomic(path.join(prepared.runRoot, "RUN.json"), prepared.run);
  return { h, prepared };
}

test("GUIDE GHOSTTY BOTH-WINDOW RECOVERY: a saved owner decision restores Reviewer before Producer when both disappeared", async (t) => {
  const { h, prepared } = await bothWindowsMissingAfterPartialRecovery(t);

  const status: string[] = [];
  await runGuideCli(["status"], h.root, { out(message) { status.push(message); } });
  const ownerView = status.join("\n");
  assert.match(ownerView, /SESSION WINDOWS CLOSED/);
  assert.match(ownerView, /same disk state/);
  assert.match(ownerView, /1\. Reopen this session.*Reviewer first.*Producer only after/);
  assert.match(ownerView, /2\. Not now/);
  assert.doesNotMatch(ownerView, /execute-relay-run\.ts|run-relay-reviewer-window\.ts/);

  const opened: string[] = [];
  const output: string[] = [];
  await runGuideCli(["recover", "--open", "ghostty"], h.root, { out(message) { output.push(message); } }, {
    async openGhostty() { throw new Error("ordinary launch must not run during both-window recovery"); },
    async recoverGhostty(project, runtime, toolkit) {
      return requestGhosttyRecoveryWindows(project, runtime, toolkit, {
        platform: "darwin",
        codexExecutable: process.execPath,
        open(args) {
          opened.push(args.find((item) => item.startsWith("--title=")) ?? "missing title");
          return { status: 0, stderr: "" };
        },
        async waitForRecoveredReviewer() {
          assert.equal(opened.length, 1, "Producer must remain unopened until Reviewer is ready");
          await mkdir(path.join(prepared.runRoot, ".reviewer-window.lock"));
          await writeJsonAtomic(path.join(prepared.runRoot, ".reviewer-window.lock", "OWNER.json"), {
            version: 1,
            pid: process.pid,
            startedAt: new Date().toISOString(),
          });
          return true;
        },
        async waitForRecoveredProducer() {
          assert.equal(opened.length, 2, "Producer readiness is verified only after Reviewer readiness");
          await mkdir(path.join(prepared.runRoot, ".producer-window.lock"));
          await writeJsonAtomic(path.join(prepared.runRoot, ".producer-window.lock", "OWNER.json"), {
            version: 1,
            pid: process.pid,
            startedAt: new Date().toISOString(),
          });
          return true;
        },
      });
    },
  });
  assert.equal(opened.length, 2);
  assert.match(opened[0]!, /Reviewer/);
  assert.match(opened[1]!, /Producer/);
  assert.match(output.join("\n"), /same Reviewer context reopened/);
  assert.match(output.join("\n"), /Producer opened only after Reviewer reached/);
  const recovery = JSON.parse(await readFile(path.join(prepared.runRoot, "RECOVERY.json"), "utf8"));
  assert.deepEqual(recovery.rolesRetried, ["reviewer", "producer"]);
  assert.equal(typeof recovery.completedAt, "string");
  assert.equal(typeof recovery.producerRetryAt, "string");
  assert.equal(recovery.attempts.length, 1);

  const waitingRun = JSON.parse(await readFile(path.join(prepared.runRoot, "RUN.json"), "utf8"));
  waitingRun.status = "AWAITING_REVIEWER_WINDOW";
  delete waitingRun.lastError;
  await writeJsonAtomic(path.join(prepared.runRoot, "RUN.json"), waitingRun);
  await rm(path.join(prepared.runRoot, ".producer-window.lock"), { recursive: true });
  const repeatedStatus: string[] = [];
  await runGuideCli(["status"], h.root, { out(message) { repeatedStatus.push(message); } });
  assert.match(repeatedStatus.join("\n"), /REVIEWER RECOVERED/);
  assert.match(repeatedStatus.join("\n"), /1\. Reopen only the missing Producer/);

  const reopened: string[] = [];
  await requestGhosttyRecoveryWindows(h.root, (await currentGuideRuntime(h.root))!, await verifyToolkitIntegrity(), {
    platform: "darwin",
    codexExecutable: process.execPath,
    open(args) {
      reopened.push(args.find((item) => item.startsWith("--title=")) ?? "missing title");
      return { status: 0, stderr: "" };
    },
    async waitForRecoveredProducer() { return true; },
  });
  assert.equal(reopened.length, 1);
  assert.match(reopened[0]!, /Producer/);
  const repeatedRecovery = JSON.parse(await readFile(path.join(prepared.runRoot, "RECOVERY.json"), "utf8"));
  assert.equal(repeatedRecovery.attempts.length, 2);
});

test("GUIDE GHOSTTY BOTH-WINDOW RECOVERY MUTATION: Producer stays closed when restored Reviewer is not ready", async (t) => {
  const { h, prepared } = await bothWindowsMissingAfterPartialRecovery(t);
  const opened: string[] = [];
  await assert.rejects(
    requestGhosttyRecoveryWindows(h.root, (await currentGuideRuntime(h.root))!, await verifyToolkitIntegrity(), {
      platform: "darwin",
      codexExecutable: process.execPath,
      open(args) {
        opened.push(args.find((item) => item.startsWith("--title=")) ?? "missing title");
        return { status: 0, stderr: "" };
      },
      async waitForRecoveredReviewer() { return false; },
      async waitForRecoveredProducer() { throw new Error("Producer readiness must never run"); },
    }),
    /Recovered Reviewer did not reach the existing owner decision point; the Producer was not opened/,
  );
  assert.equal(opened.length, 1);
  assert.match(opened[0]!, /Reviewer/);
  const run = JSON.parse(await readFile(path.join(prepared.runRoot, "RUN.json"), "utf8"));
  assert.match(run.lastError, /Producer was not opened/);
});
