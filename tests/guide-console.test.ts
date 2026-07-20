import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { chmod, mkdir, readFile, symlink, writeFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

import { codexGuidePermissionArgs } from "../src/codex-role-permissions.ts";
import { DEFAULT_CONFIG } from "../src/config.ts";
import {
  acquireGuideConsole,
  guideConsoleWritePaths,
  guideStartupPrompt,
  guideTurnArguments,
  performGuideLaunchChoice,
  renderGuideEvent,
  sanitizeGuideTerminalText,
  validateGuideConsoleState,
} from "../src/guide-console.ts";
import { runGuideCli } from "../src/guide-commands.ts";
import { writeJsonAtomic } from "../src/project.ts";
import { temporaryRoot } from "./helpers.ts";

test("GUIDE CONSOLE SECURITY: every turn ignores ambient config and rules under the project profile", () => {
  const args = guideTurnArguments({
    cli: "/trusted/koda/dist/cli.js",
    codex: "/trusted/codex/bin/codex",
    git: "/trusted/git/bin/git",
    prompt: "Reconstruct truth from disk.",
    threadId: null,
    model: "gpt-5.6-sol",
    effort: "medium",
  });
  const rendered = args.join("\n");
  assert.deepEqual(args.slice(0, 5), ["--ask-for-approval", "never", "exec", "--color", "never"]);
  assert.match(rendered, /--ignore-user-config/);
  assert.match(rendered, /--ignore-rules/);
  assert.match(rendered, /default_permissions="koda_guide"/);
  assert.match(rendered, /"\/trusted\/git" = "read"/);
  assert.match(rendered, /permissions\.koda_guide\.network\.enabled=false/);
  assert.match(rendered, /filesystem=\{ ":minimal" = "read",/);
  assert.match(rendered, /":workspace_roots" = \{ "\." = "read"/);
  assert.match(rendered, /"\.git" = "read"/);
  assert.doesNotMatch(rendered, /filesystem\.":workspace_roots"/);
  assert.doesNotMatch(rendered, /workspace-write|danger-full-access|on-request/);

  const resumed = guideTurnArguments({
    cli: "/trusted/koda/dist/cli.js",
    codex: "/trusted/codex/bin/codex",
    git: "/trusted/git/bin/git",
    prompt: "Continue from disk.",
    threadId: "11111111-1111-4111-8111-111111111111",
    model: null,
    effort: null,
  });
  assert.deepEqual(resumed.slice(0, 6), ["--ask-for-approval", "never", "exec", "--color", "never", "resume"]);
  assert.match(resumed.join("\n"), /11111111-1111-4111-8111-111111111111/);
});

test("GUIDE CONSOLE SECURITY: the Guide profile retains only named read-only runtime capabilities", () => {
  const rendered = codexGuidePermissionArgs(
    "/trusted/koda/dist/cli.js",
    "/trusted/codex/bin/codex",
    ["/trusted/toolchain"],
    ["docs/guide", "docs/PROJECT.md"],
    ["/trusted/koda/docs/toolkit-integrity.json", "/trusted/koda/docs/test-results/proof.md"],
  ).join("\n");
  assert.match(rendered, /"\/trusted\/koda\/dist" = "read"/);
  assert.match(rendered, /"\/trusted\/koda\/package\.json" = "read"/);
  assert.match(rendered, /"\/trusted\/codex\/bin\/codex" = "read"/);
  assert.match(rendered, /"\/trusted\/toolchain" = "read"/);
  assert.match(rendered, /"\/trusted\/koda\/docs\/toolkit-integrity\.json" = "read"/);
  assert.match(rendered, /"\/trusted\/koda\/docs\/test-results\/proof\.md" = "read"/);
  assert.match(rendered, /"\." = "read"/);
  assert.match(rendered, /"docs\/guide" = "write"/);
  assert.match(rendered, /"docs\/PROJECT\.md" = "write"/);
  assert.doesNotMatch(rendered, /"docs\/sessions" = "write"/);
  assert.throws(
    () => codexGuidePermissionArgs("relative/cli.js", "/trusted/codex", []),
    /must be absolute/,
  );
  assert.throws(
    () => codexGuidePermissionArgs("/trusted/cli.js", "/trusted/codex", [], [".git/config"]),
    /override is unsafe/,
  );
});

test("GUIDE CONSOLE STATE: invalid or ambiguous persistent identity refuses", () => {
  assert.throws(() => validateGuideConsoleState({}), /invalid fields/);
  assert.throws(() => validateGuideConsoleState({
    version: 1,
    status: "READY",
    model: "sol\u001b[31m",
    effort: "medium",
    threadId: null,
    turns: 0,
    updatedAt: new Date(0).toISOString(),
    lastError: null,
  }), /control characters/);
  assert.equal(validateGuideConsoleState({
    version: 1,
    status: "READY",
    model: null,
    effort: null,
    threadId: "11111111-1111-4111-8111-111111111111",
    turns: 4,
    updatedAt: new Date(0).toISOString(),
    lastError: null,
  }).turns, 4);
});

test("GUIDE CONSOLE TERMINAL SAFETY: model output cannot inject terminal or bidi controls", () => {
  assert.equal(
    sanitizeGuideTerminalText("ordinary\u001b[31m red\u0007 \u202ereversed"),
    "ordinary[31m red reversed",
  );
});

test("GUIDE CONSOLE VISIBILITY: low-level inspection commands stay in evidence instead of flooding the screen", () => {
  assert.equal(renderGuideEvent(JSON.stringify({
    type: "item.started",
    item: { type: "command_execution", command: "inspect project" },
  })), null);
  assert.equal(renderGuideEvent(JSON.stringify({
    type: "item.completed",
    item: { type: "agent_message", text: "The project is ready." },
  })), "GUIDE UPDATE\nThe project is ready.");
});

test("GUIDE CONSOLE STARTUP: reconstruction is explicitly bounded to compact continuity evidence", () => {
  const prompt = guideStartupPrompt("KODA GUIDE — fixture\nBETWEEN SESSIONS", true);
  assert.match(prompt, /startup status turn/i);
  assert.match(prompt, /named continuity files/i);
  assert.match(prompt, /Guide return/i);
  assert.match(prompt, /Do not enumerate or read archived run files/i);
  assert.match(prompt, /Do not read raw event logs/i);
  assert.match(prompt, /Do not draft a session prompt/i);
  assert.match(prompt, /resumed Guide context/i);
  assert.match(prompt, /trusted Koda controller ran `koda guide status`/i);
  assert.match(prompt, /KODA GUIDE — fixture\\nBETWEEN SESSIONS/);
  assert.match(prompt, /do not rerun the command/i);
});

test("GUIDE CONSOLE LOCK: a live duplicate refuses and a released console can reopen", async (t) => {
  const root = await temporaryRoot(t, "koda-guide-console-lock-");
  const release = await acquireGuideConsole(root);
  await assert.rejects(acquireGuideConsole(root), /persistent Guide console is already open/);
  await release();
  const releaseAgain = await acquireGuideConsole(root);
  await releaseAgain();
});

test("GUIDE CONSOLE CONTAINMENT: a linked runtime parent refuses before lock creation", async (t) => {
  const parent = await temporaryRoot(t, "koda-guide-console-link-");
  const root = path.join(parent, "project");
  const outside = path.join(parent, "outside");
  await mkdir(root);
  await mkdir(outside);
  await symlink(outside, path.join(root, ".koda"));
  await assert.rejects(acquireGuideConsole(root), /\.koda must be a real directory/);
});

test("GUIDE CONSOLE CONTAINMENT: Guide continuity cannot grant writes inside session evidence", async (t) => {
  const root = await temporaryRoot(t, "koda-guide-session-write-");
  await writeJsonAtomic(path.join(root, "koda.config.json"), DEFAULT_CONFIG);
  await mkdir(path.join(root, "docs", "guide"), { recursive: true });
  await mkdir(path.join(root, DEFAULT_CONFIG.sessionsDir), { recursive: true });
  await writeFile(path.join(root, DEFAULT_CONFIG.sessionsDir, "history.md"), "# Evidence\n", "utf8");
  await writeJsonAtomic(path.join(root, "docs", "guide", "project.json"), {
    version: 1,
    project: "Unsafe continuity fixture",
    continuityFiles: [`${DEFAULT_CONFIG.sessionsDir}/history.md`],
  });
  await assert.rejects(
    guideConsoleWritePaths(root),
    /overlaps configured session evidence and is refused/,
  );
});

test("GUIDE OPEN UX: one command enters the persistent console without opening session roles", async (t) => {
  const root = await temporaryRoot(t, "koda-guide-open-");
  await writeJsonAtomic(path.join(root, "koda.config.json"), DEFAULT_CONFIG);
  await mkdir(path.join(root, DEFAULT_CONFIG.sessionsDir), { recursive: true });
  const output: string[] = [];
  let opened: {
    project: string;
    model: string | null;
    effort: string | null;
    producerModel: string | null;
    producerEffort: string | null;
    reviewerModel: string | null;
    reviewerEffort: string | null;
  } | null = null;
  await runGuideCli([
    "open",
    "--model", "gpt-5.6-sol",
    "--effort", "medium",
    "--producer-model", "gpt-5.6-sol",
    "--producer-effort", "medium",
    "--reviewer-model", "gpt-5.6-terra",
    "--reviewer-effort", "medium",
  ], root, {
    out(message) { output.push(message); },
  }, {
    async openGhostty() { throw new Error("Guide open must not open Producer or Reviewer."); },
    async openGuide(project, options) {
      opened = { project, ...options };
      return 0;
    },
  });
  assert.deepEqual(opened, {
    project: root,
    model: "gpt-5.6-sol",
    effort: "medium",
    producerModel: "gpt-5.6-sol",
    producerEffort: "medium",
    reviewerModel: "gpt-5.6-terra",
    reviewerEffort: "medium",
  });
  assert.match(output.join("\n"), /OPENING SECURE GUIDE/);
  assert.match(output.join("\n"), /numbered Guide choice may open them later/);
  assert.doesNotMatch(output.join("\n"), /Guide console closed/);
});

test("GUIDE OPEN UX: partial launch staffing refuses before the Guide opens", async (t) => {
  const root = await temporaryRoot(t, "koda-guide-open-partial-staffing-");
  await writeJsonAtomic(path.join(root, "koda.config.json"), DEFAULT_CONFIG);
  await mkdir(path.join(root, DEFAULT_CONFIG.sessionsDir), { recursive: true });
  let opened = false;
  await assert.rejects(runGuideCli([
    "open",
    "--producer-model", "gpt-5.6-sol",
  ], root, { out() {} }, {
    async openGhostty() { throw new Error("not used"); },
    async openGuide() { opened = true; return 0; },
  }), /needs Producer and Reviewer model plus effort together/);
  assert.equal(opened, false);
});

test("GUIDE NUMBERED LAUNCH: 2 preserves a pushed launch and 1 opens the two staffed roles", async (t) => {
  const root = await temporaryRoot(t, "koda-guide-numbered-launch-");
  await writeJsonAtomic(path.join(root, "koda.config.json"), DEFAULT_CONFIG);
  await mkdir(path.join(root, DEFAULT_CONFIG.sessionsDir), { recursive: true });
  await mkdir(path.join(root, "docs", "guide", "launches"), { recursive: true });
  await writeJsonAtomic(path.join(root, "docs", "guide", "launches", "11111111-1111-4111-8111-111111111111.json"), {
    version: 1,
    id: "11111111-1111-4111-8111-111111111111",
    status: "READY_TO_LAUNCH",
    prompt: "docs/guide/prompts/session.md",
    promptSha256: "a".repeat(64),
    manifest: { path: "docs/guide/project.json", sha256: "b".repeat(64) },
    continuity: [],
    previousSessionId: null,
    previousCloseSha256: null,
    previousCarryForward: null,
    sessionKind: "produce",
    launchMode: "independent",
    dependencies: [],
    confirmedBy: "Fixture Owner",
    confirmedAt: new Date(0).toISOString(),
  });

  const staffing = {
    producerModel: "gpt-5.6-sol",
    producerEffort: "medium",
    reviewerModel: "gpt-5.6-terra",
    reviewerEffort: "medium",
  };
  let opened = 0;
  const later = await performGuideLaunchChoice(root, "2", staffing, {
    async launch() { opened += 1; return { message: "should not run", requests: [] }; },
  });
  assert.equal(later.handled, true);
  assert.match(later.message!, /remains ready for later/);
  assert.equal(opened, 0);

  const launched = await performGuideLaunchChoice(root, "1", staffing, {
    async launch() {
      opened += 1;
      return {
        message: "THREE-CONTEXT START REQUESTED",
        requests: [
          { role: "reviewer", title: "Reviewer", args: ["reviewer"] },
          { role: "producer", title: "Producer", args: ["producer"] },
        ],
      };
    },
  });
  assert.equal(launched.handled, true);
  assert.equal(opened, 1);
  assert.equal(launched.requests?.map((item) => item.role).join(","), "reviewer,producer");
  assert.match(launched.message!, /THREE-CONTEXT START REQUESTED/);
});

async function runConsoleProcess(root: string, fakeCodex: string): Promise<{ status: number; output: string }> {
  const child = spawn(process.execPath, [path.resolve("dist/guide-console-cli.js"), "--model", "fixture-guide", "--effort", "low"], {
    cwd: root,
    env: { ...process.env, KODA_CODEX_BIN: fakeCodex },
    stdio: ["pipe", "pipe", "pipe"],
  });
  let output = "";
  let answered = false;
  const deadline = setTimeout(() => {
    if (!answered) child.stdin.end("q\n");
  }, 5_000);
  child.stdout.on("data", (chunk) => {
    output += String(chunk);
    if (!answered && output.includes("guide> ")) {
      answered = true;
      clearTimeout(deadline);
      child.stdin.end("q\n");
    }
  });
  child.stderr.on("data", (chunk) => { output += String(chunk); });
  const status = await new Promise<number>((resolve, reject) => {
    child.once("error", reject);
    child.once("close", (code) => resolve(code ?? -1));
  });
  clearTimeout(deadline);
  return { status, output };
}

test("GUIDE CONSOLE PERSISTENCE: a closed console resumes the same independent Guide context", async (t) => {
  const root = await temporaryRoot(t, "koda-guide-persistent-");
  await writeJsonAtomic(path.join(root, "koda.config.json"), DEFAULT_CONFIG);
  await mkdir(path.join(root, DEFAULT_CONFIG.sessionsDir), { recursive: true });
  await mkdir(path.join(root, "docs", "guide"), { recursive: true });
  await writeFile(path.join(root, "docs", "PROJECT.md"), "# Fixture project\n", "utf8");
  await writeJsonAtomic(path.join(root, "docs", "guide", "project.json"), {
    version: 1,
    project: "Persistent Guide fixture",
    continuityFiles: ["docs/PROJECT.md"],
  });
  const fakeCodex = path.join(root, "fake-codex");
  await writeFile(fakeCodex, [
    "#!/bin/sh",
    "thread=11111111-1111-4111-8111-111111111111",
    "printf '%s\\n' '{\"type\":\"thread.started\",\"thread_id\":\"'\"$thread\"'\"}'",
    "printf '%s\\n' '{\"type\":\"item.started\",\"item\":{\"type\":\"command_execution\",\"command\":\"inspect project\"}}'",
    "printf '%s\\n' '{\"type\":\"item.completed\",\"item\":{\"type\":\"agent_message\",\"text\":\"Fixture Guide reconstructed disk state.\"}}'",
    "printf '%s\\n' '{\"type\":\"turn.completed\"}'",
  ].join("\n"), "utf8");
  await chmod(fakeCodex, 0o700);

  const first = await runConsoleProcess(root, fakeCodex);
  assert.equal(first.status, 0, first.output);
  assert.match(first.output, /KODA-C SECURE GUIDE/);
  assert.match(first.output, /─{20}/);
  assert.match(first.output, /Fixture Guide reconstructed disk state/);
  assert.doesNotMatch(first.output, /command_execution|--ignore-user-config/);
  assert.match(first.output, /GUIDE CHECK — STARTED/);
  assert.match(first.output, /Compact project continuity and current status only/);
  assert.doesNotMatch(first.output, /inspect project|inspecting disk-backed project state/);
  const firstState = JSON.parse(await readFile(path.join(root, ".koda", "guide", "STATE.json"), "utf8"));
  assert.equal(firstState.threadId, "11111111-1111-4111-8111-111111111111");
  assert.equal(firstState.turns, 1);

  const second = await runConsoleProcess(root, fakeCodex);
  assert.equal(second.status, 0, second.output);
  const secondState = JSON.parse(await readFile(path.join(root, ".koda", "guide", "STATE.json"), "utf8"));
  assert.equal(secondState.threadId, firstState.threadId);
  assert.equal(secondState.turns, 2);
  assert.equal(secondState.status, "READY");
});

test("GUIDE CONSOLE STARTUP REFUSAL: the primary Codex error is shown before a missing context symptom", async (t) => {
  const root = await temporaryRoot(t, "koda-guide-primary-error-");
  await writeJsonAtomic(path.join(root, "koda.config.json"), DEFAULT_CONFIG);
  await mkdir(path.join(root, DEFAULT_CONFIG.sessionsDir), { recursive: true });
  await mkdir(path.join(root, "docs", "guide"), { recursive: true });
  await writeFile(path.join(root, "docs", "PROJECT.md"), "# Fixture project\n", "utf8");
  await writeJsonAtomic(path.join(root, "docs", "guide", "project.json"), {
    version: 1,
    project: "Primary startup error fixture",
    continuityFiles: ["docs/PROJECT.md"],
  });
  const fakeCodex = path.join(root, "fake-codex");
  await writeFile(fakeCodex, [
    "#!/bin/sh",
    "printf '%s\\n' 'Error loading config.toml: invalid permission profile' >&2",
    "exit 1",
  ].join("\n"), "utf8");
  await chmod(fakeCodex, 0o700);

  const result = await runConsoleProcess(root, fakeCodex);
  assert.equal(result.status, 1);
  assert.match(result.output, /Guide could not start or continue: Error loading config\.toml: invalid permission profile/);
  assert.doesNotMatch(result.output, /emitted no persistent context identifier/);
  const state = JSON.parse(await readFile(path.join(root, ".koda", "guide", "STATE.json"), "utf8"));
  assert.match(state.lastError, /invalid permission profile/);
});

test("GUIDE CONSOLE INPUT RECOVERY: input closing during a long startup exits cleanly after preserving the turn", async (t) => {
  const root = await temporaryRoot(t, "koda-guide-closed-input-");
  await writeJsonAtomic(path.join(root, "koda.config.json"), DEFAULT_CONFIG);
  await mkdir(path.join(root, DEFAULT_CONFIG.sessionsDir), { recursive: true });
  await mkdir(path.join(root, "docs", "guide"), { recursive: true });
  await writeFile(path.join(root, "docs", "PROJECT.md"), "# Fixture project\n", "utf8");
  await writeJsonAtomic(path.join(root, "docs", "guide", "project.json"), {
    version: 1,
    project: "Closed input fixture",
    continuityFiles: ["docs/PROJECT.md"],
  });
  const fakeCodex = path.join(root, "fake-codex");
  await writeFile(fakeCodex, [
    "#!/bin/sh",
    "printf '%s\\n' '{\"type\":\"thread.started\",\"thread_id\":\"11111111-1111-4111-8111-111111111111\"}'",
    "sleep 0.2",
    "printf '%s\\n' '{\"type\":\"item.completed\",\"item\":{\"type\":\"agent_message\",\"text\":\"Long startup completed.\"}}'",
    "printf '%s\\n' '{\"type\":\"turn.completed\"}'",
  ].join("\n"), "utf8");
  await chmod(fakeCodex, 0o700);

  const child = spawn(process.execPath, [path.resolve("dist/guide-console-cli.js"), "--model", "fixture-guide", "--effort", "low"], {
    cwd: root,
    env: { ...process.env, KODA_CODEX_BIN: fakeCodex },
    stdio: ["pipe", "pipe", "pipe"],
  });
  let output = "";
  child.stdout.on("data", (chunk) => { output += String(chunk); });
  child.stderr.on("data", (chunk) => { output += String(chunk); });
  child.stdin.end();
  const status = await new Promise<number>((resolve, reject) => {
    child.once("error", reject);
    child.once("close", (code) => resolve(code ?? -1));
  });

  assert.equal(status, 0, output);
  assert.match(output, /GUIDE INPUT CLOSED SAFELY/);
  assert.doesNotMatch(output, /ERROR|readline was closed/);
  const state = JSON.parse(await readFile(path.join(root, ".koda", "guide", "STATE.json"), "utf8"));
  assert.equal(state.status, "READY");
  assert.equal(state.threadId, "11111111-1111-4111-8111-111111111111");
  await assert.rejects(readFile(path.join(root, ".koda", "guide", ".window.lock", "OWNER.json"), "utf8"), /ENOENT/);
});

test("GUIDE CONSOLE CRASH EVIDENCE: raw events are durable while a model turn is still running", async (t) => {
  const root = await temporaryRoot(t, "koda-guide-live-events-");
  await writeJsonAtomic(path.join(root, "koda.config.json"), DEFAULT_CONFIG);
  await mkdir(path.join(root, DEFAULT_CONFIG.sessionsDir), { recursive: true });
  await mkdir(path.join(root, "docs", "guide"), { recursive: true });
  await writeFile(path.join(root, "docs", "PROJECT.md"), "# Fixture project\n", "utf8");
  await writeJsonAtomic(path.join(root, "docs", "guide", "project.json"), {
    version: 1,
    project: "Live event fixture",
    continuityFiles: ["docs/PROJECT.md"],
  });
  const fakeCodex = path.join(root, "fake-codex");
  await writeFile(fakeCodex, [
    "#!/bin/sh",
    "printf '%s\\n' '{\"type\":\"thread.started\",\"thread_id\":\"11111111-1111-4111-8111-111111111111\"}'",
    "sleep 1",
    "printf '%s\\n' '{\"type\":\"item.completed\",\"item\":{\"type\":\"agent_message\",\"text\":\"Finished.\"}}'",
    "printf '%s\\n' '{\"type\":\"turn.completed\"}'",
  ].join("\n"), "utf8");
  await chmod(fakeCodex, 0o700);

  const child = spawn(process.execPath, [path.resolve("dist/guide-console-cli.js"), "--model", "fixture-guide", "--effort", "low"], {
    cwd: root,
    env: { ...process.env, KODA_CODEX_BIN: fakeCodex },
    stdio: ["pipe", "pipe", "pipe"],
  });
  let output = "";
  let answered = false;
  child.stdout.on("data", (chunk) => {
    output += String(chunk);
    if (!answered && output.includes("guide> ")) {
      answered = true;
      child.stdin.end("q\n");
    }
  });
  child.stderr.on("data", (chunk) => { output += String(chunk); });

  const partial = path.join(root, ".koda", "guide", "GUIDE-001-EVENTS.partial.jsonl");
  let observed = "";
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      observed = await readFile(partial, "utf8");
      if (observed.includes("thread.started")) break;
    } catch {
      // The model process may not have emitted its first line yet.
    }
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
  assert.match(observed, /thread\.started/);

  const status = await new Promise<number>((resolve, reject) => {
    child.once("error", reject);
    child.once("close", (code) => resolve(code ?? -1));
  });
  assert.equal(status, 0, output);
  const final = await readFile(path.join(root, ".koda", "guide", "GUIDE-001-EVENTS.jsonl"), "utf8");
  assert.match(final, /turn\.completed/);
  await assert.rejects(readFile(partial, "utf8"), /ENOENT/);
});

test("GUIDE CONSOLE CRASH EVIDENCE MUTATION: existing or linked evidence refuses before the model runs", async (t) => {
  const root = await temporaryRoot(t, "koda-guide-linked-events-");
  await writeJsonAtomic(path.join(root, "koda.config.json"), DEFAULT_CONFIG);
  await mkdir(path.join(root, DEFAULT_CONFIG.sessionsDir), { recursive: true });
  await mkdir(path.join(root, "docs", "guide"), { recursive: true });
  await writeFile(path.join(root, "docs", "PROJECT.md"), "# Fixture project\n", "utf8");
  await writeJsonAtomic(path.join(root, "docs", "guide", "project.json"), {
    version: 1,
    project: "Linked evidence fixture",
    continuityFiles: ["docs/PROJECT.md"],
  });
  const outside = path.join(root, "outside.txt");
  await writeFile(outside, "unchanged\n", "utf8");
  const area = path.join(root, ".koda", "guide");
  await mkdir(area, { recursive: true });
  await symlink(outside, path.join(area, "GUIDE-001-EVENTS.partial.jsonl"));
  const fakeCodex = path.join(root, "fake-codex");
  await writeFile(fakeCodex, "#!/bin/sh\nprintf 'MODEL RAN\\n'\n", "utf8");
  await chmod(fakeCodex, 0o700);

  const child = spawn(process.execPath, [path.resolve("dist/guide-console-cli.js"), "--model", "fixture-guide", "--effort", "low"], {
    cwd: root,
    env: { ...process.env, KODA_CODEX_BIN: fakeCodex },
    stdio: ["ignore", "pipe", "pipe"],
  });
  let output = "";
  child.stdout.on("data", (chunk) => { output += String(chunk); });
  child.stderr.on("data", (chunk) => { output += String(chunk); });
  const status = await new Promise<number>((resolve, reject) => {
    child.once("error", reject);
    child.once("close", (code) => resolve(code ?? -1));
  });

  assert.equal(status, 1, output);
  assert.match(output, /Guide event evidence already exists/);
  assert.match(output, /will not overwrite or follow existing Guide turn evidence/);
  assert.doesNotMatch(output, /MODEL RAN/);
  assert.equal(await readFile(outside, "utf8"), "unchanged\n");
});
