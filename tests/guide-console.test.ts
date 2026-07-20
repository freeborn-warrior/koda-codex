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
  guideTurnArguments,
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
  assert.match(rendered, /permissions\.koda_guide\.network\.enabled=false/);
  assert.match(rendered, /":workspace_roots"=\{"\."="read","\.git"="read","\.agents"="read","\.codex"="read","\*\*\/\*\.env"="deny"\}/);
  assert.doesNotMatch(rendered, /workspace-write|danger-full-access|on-request/);

  const resumed = guideTurnArguments({
    cli: "/trusted/koda/dist/cli.js",
    codex: "/trusted/codex/bin/codex",
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
  assert.match(rendered, /"\/trusted\/koda\/dist"="read"/);
  assert.match(rendered, /"\/trusted\/koda\/package\.json"="read"/);
  assert.match(rendered, /"\/trusted\/codex\/bin\/codex"="read"/);
  assert.match(rendered, /"\/trusted\/toolchain"="read"/);
  assert.match(rendered, /"\/trusted\/koda\/docs\/toolkit-integrity\.json"="read"/);
  assert.match(rendered, /"\/trusted\/koda\/docs\/test-results\/proof\.md"="read"/);
  assert.match(rendered, /"\."="read"/);
  assert.match(rendered, /"docs\/guide"="write"/);
  assert.match(rendered, /"docs\/PROJECT\.md"="write"/);
  assert.doesNotMatch(rendered, /"docs\/sessions"="write"/);
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
  let opened: { project: string; model: string | null; effort: string | null } | null = null;
  await runGuideCli(["open", "--model", "gpt-5.6-sol", "--effort", "medium"], root, {
    out(message) { output.push(message); },
  }, {
    async openGhostty() { throw new Error("Guide open must not open Producer or Reviewer."); },
    async openGuide(project, options) {
      opened = { project, ...options };
      return 0;
    },
  });
  assert.deepEqual(opened, { project: root, model: "gpt-5.6-sol", effort: "medium" });
  assert.match(output.join("\n"), /OPENING SECURE GUIDE/);
  assert.match(output.join("\n"), /opens neither one/);
  assert.doesNotMatch(output.join("\n"), /Guide console closed/);
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
  assert.doesNotMatch(first.output, /GUIDE CHECK|inspecting disk-backed project state/);
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
