import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { realpathSync } from "node:fs";
import { cp, mkdir, mkdtemp, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { DEFAULT_CONFIG } from "../src/config.ts";
import { codexProjectPermissionArgs } from "../src/codex-role-permissions.ts";
import { createSession, writeJsonAtomic } from "../src/project.ts";
import {
  relayCodexEnvironment,
  relayGitToolchainReadRoots,
  relayNodeToolchainReadRoots,
  resolveRelayGitExecutable,
} from "../src/relay-environment.ts";

const root = process.cwd();
const date = "2026-07-19";
const model = "gpt-5.6-sol";

function resolveExecutable(configured: string): string {
  if (path.isAbsolute(configured)) return realpathSync(configured);
  const found = spawnSync("/usr/bin/which", [configured], { encoding: "utf8" });
  if (found.status !== 0 || !(found.stdout ?? "").trim()) {
    throw new Error(`Fresh-model runner cannot find the Codex executable named ${configured}.`);
  }
  return realpathSync((found.stdout ?? "").trim());
}

// Resolve with the parent shell's PATH before the child receives the strict
// allowlisted environment. The child gets no ambient credentials or parent ID.
const codex = resolveExecutable(process.env.KODA_CODEX_BIN?.trim() || "codex");
const git = resolveRelayGitExecutable();

function runCodex(cwd: string, effort: "low" | "medium", prompt: string, skipGit: boolean) {
  const args = [
    "exec",
    "--ephemeral",
    "--ignore-user-config",
    "--ignore-rules",
    "--json",
    "--color", "never",
    "--model", model,
    "-c", `model_reasoning_effort=\"${effort}\"`,
    ...codexProjectPermissionArgs({
      workspaceAccess: "read",
      trustedReadRoots: [codex, ...relayNodeToolchainReadRoots(), ...relayGitToolchainReadRoots(git)],
    }),
    ...(skipGit ? ["--skip-git-repo-check"] : []),
    prompt,
  ];
  const result = spawnSync(codex, args, {
    cwd,
    encoding: "utf8",
    env: relayCodexEnvironment(process.env, undefined, git),
    maxBuffer: 32 * 1024 * 1024,
  });
  return {
    args,
    status: result.status ?? -1,
    stdout: result.stdout ?? "",
    stderr: result.stderr ?? String(result.error ?? ""),
  };
}

function events(text: string): Array<Record<string, unknown>> {
  return text.trim().split(/\r?\n/).filter(Boolean).map((line) => JSON.parse(line));
}

function agentText(items: Array<Record<string, unknown>>): string {
  return items.flatMap((event) => {
    const item = event.item as { type?: string; text?: string } | undefined;
    return item?.type === "agent_message" && typeof item.text === "string" ? [item.text] : [];
  }).join("\n\n");
}

function threadId(items: Array<Record<string, unknown>>): string | null {
  const started = items.find((event) => event.type === "thread.started");
  return typeof started?.thread_id === "string" ? started.thread_id : null;
}

function commandEvidence(items: Array<Record<string, unknown>>): string {
  return items.flatMap((event) => {
    const item = event.item as { type?: string; command?: string; aggregated_output?: string } | undefined;
    if (item?.type !== "command_execution") return [];
    return [`${item.command ?? ""}\n${item.aggregated_output ?? ""}`];
  }).join("\n");
}

async function snapshot(directory: string): Promise<Record<string, string>> {
  const result: Record<string, string> = {};
  async function visit(current: string): Promise<void> {
    for (const entry of (await readdir(current, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
      const absolute = path.join(current, entry.name);
      const relative = path.relative(directory, absolute).split(path.sep).join("/");
      if (entry.isDirectory()) await visit(absolute);
      else if (entry.isFile()) {
        const content = await readFile(absolute);
        result[relative] = createHash("sha256").update(content).digest("hex");
      } else result[relative] = `SPECIAL:${(await stat(absolute)).mode}`;
    }
  }
  await visit(directory);
  return result;
}

async function writeRunFiles(
  destination: string,
  run: ReturnType<typeof runCodex>,
  metadata: Record<string, unknown>,
  result: string,
): Promise<void> {
  await mkdir(destination);
  await Promise.all([
    writeFile(path.join(destination, "CODEX-EVENTS.jsonl"), run.stdout, "utf8"),
    writeFile(path.join(destination, "CODEX-STDERR.txt"), run.stderr, "utf8"),
    writeJsonAtomic(path.join(destination, "RUN.json"), {
      version: 1,
      date,
      model,
      ephemeral: true,
      ignoredUserConfig: true,
      sandbox: "project-read-only",
      exitStatus: run.status,
      commandArgs: run.args,
      ...metadata,
    }),
    writeFile(path.join(destination, "RESULT.md"), result, "utf8"),
  ]);
}

async function discoveryRun(): Promise<void> {
  const prompt = "Do not call any tool and do not read any repository file. From startup context already supplied to this fresh task only, report: (1) every available skill whose name starts with koda-c-, exactly as listed; (2) the total number; (3) one repository guidance rule about where project skills must live. If startup context lacks an item, say unavailable instead of searching. Finish with DISCOVERY_SOURCE: STARTUP_CONTEXT_ONLY.";
  const run = runCodex(root, "low", prompt, false);
  const parsed = events(run.stdout);
  const answer = agentText(parsed);
  const expected = (await readdir(path.join(root, ".agents", "skills"), { withFileTypes: true }))
    .filter((entry) => entry.isDirectory() && entry.name.startsWith("koda-c-"))
    .map((entry) => entry.name)
    .sort();
  const discovered = [...answer.matchAll(/\bkoda-c-[a-z-]+\b/g)].map((match) => match[0]).sort();
  const toolEvents = parsed.filter((event) => {
    const item = event.item as { type?: string } | undefined;
    return item?.type && item.type !== "agent_message";
  });
  const pass = run.status === 0 && toolEvents.length === 0 &&
    JSON.stringify(discovered) === JSON.stringify(expected) &&
    answer.includes(`Total: ${expected.length}`) &&
    answer.includes(".agents/skills/") &&
    answer.includes("DISCOVERY_SOURCE: STARTUP_CONTEXT_ONLY");
  const destination = path.join(root, "docs", "discovery-runs", `${date}-fresh-codex-startup-07`);
  await writeRunFiles(destination, run, {
    effort: "low",
    threadId: threadId(parsed),
    prompt,
    expectedSkills: expected,
    discoveredSkills: discovered,
    toolEventCount: toolEvents.length,
    status: pass ? "PASS" : "FAIL",
  }, [
    `# Fresh Codex startup discovery — ${date} — Sol low — 07`,
    "",
    `- Status: **${pass ? "PASS" : "FAIL"}**`,
    `- Model: \`${model}\``,
    "- Effort: low",
    "- Context: fresh ephemeral Codex task with user configuration ignored",
    "- Sandbox: strict project read-only permission profile",
    `- Koda-C skills discovered from startup context: ${discovered.length} of ${expected.length}`,
    `- Tool calls or repository reads: ${toolEvents.length}`,
    "- Raw events: [`CODEX-EVENTS.jsonl`](CODEX-EVENTS.jsonl)",
    "- Stderr: [`CODEX-STDERR.txt`](CODEX-STDERR.txt)",
    "",
    "## Model answer",
    "",
    answer,
    "",
  ].join("\n"));
  if (!pass) throw new Error("Fresh startup discovery did not satisfy its sealed contract.");
}

async function activePreflightRun(): Promise<void> {
  const fixture = await mkdtemp(path.join(tmpdir(), "koda-guide-preflight-"));
  try {
    await Promise.all([
      mkdir(path.join(fixture, ".agents", "skills"), { recursive: true }),
      mkdir(path.join(fixture, "docs", "sessions"), { recursive: true }),
      mkdir(path.join(fixture, "docs", "guide", "prompts"), { recursive: true }),
    ]);
    await Promise.all([
      cp(path.join(root, "dist"), path.join(fixture, "dist"), { recursive: true }),
      cp(
        path.join(root, ".agents", "skills", "koda-c-session-prompt"),
        path.join(fixture, ".agents", "skills", "koda-c-session-prompt"),
        { recursive: true },
      ),
    ]);
    await Promise.all([
      writeJsonAtomic(path.join(fixture, "koda.config.json"), DEFAULT_CONFIG),
      writeFile(path.join(fixture, "docs", "PROJECT.md"), "# Project\n\nBuild one path at a time.\n", "utf8"),
      writeFile(path.join(fixture, "docs", "BACKLOG.md"), "# Backlog\n\n- [ ] Finish the active session.\n", "utf8"),
      writeFile(path.join(fixture, "docs", "WORKING-PLAN.md"), "# Working plan\n\n1. Complete the active Brief.\n", "utf8"),
      writeFile(path.join(fixture, "AGENTS.md"), [
        "# Guide preflight fixture",
        "",
        "- Use repository-local skills from `.agents/skills/`.",
        "- Invoke this fixture's Koda CLI as `node dist/cli.js`.",
        "- Derive session truth from disk and never invent a terminal state.",
        "",
      ].join("\n"), "utf8"),
    ]);
    const fixtureVerifiedAt = "2026-07-19T00:00:00.000Z";
    const fixtureTestedCommit = "1".repeat(40);
    const fixtureEvidencePath = "docs/toolkit-preflight-proof.md";
    const fixtureCriticalPath = ".agents/skills/koda-c-session-prompt/SKILL.md";
    const fixtureEvidence = [
      "# Fixture toolkit proof",
      "",
      "- Result: **PASS**",
      `- Recorded at: ${fixtureVerifiedAt}`,
      `- Base commit: \`${fixtureTestedCommit.slice(0, 7)}\``,
      "",
      "ℹ tests 1",
      "ℹ pass 1",
      "ℹ fail 0",
      "",
    ].join("\n");
    await writeFile(path.join(fixture, fixtureEvidencePath), fixtureEvidence, "utf8");
    const [fixtureEvidenceBytes, fixtureCriticalBytes] = await Promise.all([
      readFile(path.join(fixture, fixtureEvidencePath)),
      readFile(path.join(fixture, fixtureCriticalPath)),
    ]);
    await writeJsonAtomic(path.join(fixture, "docs", "toolkit-integrity.json"), {
      version: 1,
      capability: "guide-preflight-fixture-v1",
      verifiedAt: fixtureVerifiedAt,
      repairCommit: fixtureTestedCommit,
      testedCommit: fixtureTestedCommit,
      testCount: 1,
      evidence: {
        path: fixtureEvidencePath,
        sha256: createHash("sha256").update(fixtureEvidenceBytes).digest("hex"),
      },
      files: [{
        path: fixtureCriticalPath,
        sha256: createHash("sha256").update(fixtureCriticalBytes).digest("hex"),
      }],
    });
    const active = await createSession(fixture, DEFAULT_CONFIG, "# Active owner prompt\n\nComplete the current bounded path first.\n");
    await writeJsonAtomic(path.join(fixture, "docs", "guide", "project.json"), {
      version: 1,
      project: "Blind Guide preflight fixture",
      continuityFiles: ["docs/PROJECT.md", "docs/BACKLOG.md", "docs/WORKING-PLAN.md"],
    });
    const before = await snapshot(fixture);
    const prompt = "Use $koda-c-session-prompt. I want to start a new session that is conceptually ahead of the session already running. Do what the skill requires and tell me what happens.";
    const run = runCodex(fixture, "medium", prompt, true);
    const after = await snapshot(fixture);
    const parsed = events(run.stdout);
    const answer = agentText(parsed);
    const commands = commandEvidence(parsed);
    const unchanged = JSON.stringify(before) === JSON.stringify(after);
    const contractPath = "docs/guide-preflight-runs/CONTRACT-02.md";
    const contractSha256 = createHash("sha256")
      .update(await readFile(path.join(root, contractPath)))
      .digest("hex");
    const checks = {
      statusPreflight: /guide status/.test(commands),
      namedBlockedState: /ACTIVE PROJECT WORK/.test(commands) && /dependent successor is blocked/i.test(commands),
      namedActiveSession: commands.includes(active.id),
      namedBrief: /brief/i.test(commands),
      ownerFacingRefusal: /(?:start(?:ing)?|draft(?:ing)?|confirm(?:ing)?|launch(?:ing)?|session).*?(?:cannot|can't|blocked|won't|must wait)|(?:cannot|can't|blocked|won't|must wait).*?(?:start(?:ing)?|draft(?:ing)?|confirm(?:ing)?|launch(?:ing)?|session)/is.test(answer),
      distinguishesDiscussion: /discuss|explore|preserve|idea/i.test(answer),
      namesWaitAndHalt: /wait|close/i.test(answer) && /halt/i.test(answer),
      filesUnchanged: unchanged,
    };
    const pass = run.status === 0 && Object.values(checks).every(Boolean);
    const destination = path.join(root, "docs", "guide-preflight-runs", `${date}-sol-medium-05`);
    await writeRunFiles(destination, run, {
      effort: "medium",
      threadId: threadId(parsed),
      prompt,
      contractPath,
      contractSha256,
      fixtureSessionId: active.id,
      checks,
      status: pass ? "PASS" : "FAIL",
    }, [
      `# Fresh Guide active-session preflight — ${date} — Sol medium — 05`,
      "",
      `- Status: **${pass ? "PASS" : "FAIL"}**`,
      `- Model: \`${model}\``,
      "- Effort: medium",
      `- Active fixture session: \`${active.id}\` at Brief`,
      `- Disk status preflight observed: ${checks.statusPreflight ? "PASS" : "FAIL"}`,
      `- Named blocked state/session/phase: ${checks.namedBlockedState && checks.namedActiveSession && checks.namedBrief ? "PASS" : "FAIL"}`,
      `- Owner-facing refusal: ${checks.ownerFacingRefusal ? "PASS" : "FAIL"}`,
      `- Future discussion distinguished from start: ${checks.distinguishesDiscussion ? "PASS" : "FAIL"}`,
      `- Wait and halt routes named: ${checks.namesWaitAndHalt ? "PASS" : "FAIL"}`,
      `- Fixture files unchanged: ${checks.filesUnchanged ? "PASS" : "FAIL"}`,
      "- Raw events: [`CODEX-EVENTS.jsonl`](CODEX-EVENTS.jsonl)",
      "- Stderr: [`CODEX-STDERR.txt`](CODEX-STDERR.txt)",
      "",
      "## Model answer",
      "",
      answer,
      "",
      "## Boundary",
      "",
      "This run tests one fresh Sol/medium response to one phrasing. It proves neither universal natural-language classification nor owner usability in Ghostty.",
      "",
    ].join("\n"));
    if (!pass) throw new Error("Fresh Guide preflight did not satisfy its sealed contract.");
  } finally {
    await rm(fixture, { recursive: true, force: true });
  }
}

const mode = process.argv[2] ?? "all";
if (!["all", "discovery-only", "active-only"].includes(mode)) {
  throw new Error("Usage: run-guide-preflight-model-test.ts [all|discovery-only|active-only]");
}
if (mode !== "active-only") await discoveryRun();
if (mode !== "discovery-only") await activePreflightRun();
console.log(mode === "active-only"
  ? "Fresh active-session Guide preflight passed its sealed contract."
  : mode === "discovery-only"
    ? "Fresh startup discovery passed its sealed contract."
    : "Fresh startup discovery and active-session Guide preflight both passed their sealed contracts.");
