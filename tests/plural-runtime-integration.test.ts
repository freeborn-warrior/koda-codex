import assert from "node:assert/strict";
import { spawn, spawnSync } from "node:child_process";
import { chmod, cp, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { runCli } from "../src/commands.ts";
import { DEFAULT_CONFIG } from "../src/config.ts";
import { confirmGuideLaunch } from "../src/guide.ts";
import { listGuideRuntimes, prepareGuideRuntime } from "../src/guide-runtime.ts";
import { writeJsonAtomic } from "../src/project.ts";

function git(root: string, args: string[]): string {
  const result = spawnSync("git", args, { cwd: root, encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr);
  return result.stdout.trim();
}

function prompt(label: string): string {
  return [
    `# ${label} session prompt`,
    "",
    "## Owner intent",
    `Complete the independent ${label} proof through pushed close.`,
    "",
    "## In scope",
    `- One bounded ${label} Brief artifact.`,
    "",
    "## Out of scope",
    "- Any other session's files.",
    "",
    "## Success evidence",
    "- A distinct Producer and Reviewer context complete the gate and pushed close.",
    "",
    "## Constraints and owner rulings",
    "- Keep the phase independent from every active sibling.",
    "- Preserve all durable evidence in this project.",
    "",
    "## Prior session carry-forward",
    "- None; this workstream is explicitly independent.",
    "",
    "## Relay handover",
    "- Producer writes one Brief; Reviewer independently judges it; immutable close returns evidence to Guide.",
    "",
  ].join("\n");
}

test("PLURAL LIVE RUNTIME: two independent Producer/Reviewer pairs complete without crossed sessions", async (t) => {
  const temporary = await mkdtemp(path.join(tmpdir(), "koda-plural-live-"));
  t.after(() => rm(temporary, { recursive: true, force: true }));
  const project = path.join(temporary, "project");
  const remote = path.join(temporary, "remote.git");
  await mkdir(path.join(project, "docs", "guide", "prompts"), { recursive: true });
  await mkdir(path.join(project, DEFAULT_CONFIG.sessionsDir), { recursive: true });
  await mkdir(path.join(project, ".agents", "skills"), { recursive: true });
  await writeJsonAtomic(path.join(project, "koda.config.json"), {
    ...DEFAULT_CONFIG,
    phases: DEFAULT_CONFIG.phases.slice(0, 1),
  });
  await writeFile(path.join(project, ".gitignore"), ".koda/\n.DS_Store\n", "utf8");
  await writeFile(path.join(project, "AGENTS.md"), "# Plural runtime fixture\n\nUse exact Koda session identity.\n", "utf8");
  await writeFile(path.join(project, "docs", "PROJECT.md"), "# Project\n\nProve two live independent session relays.\n", "utf8");
  await writeJsonAtomic(path.join(project, "docs", "guide", "project.json"), {
    version: 1,
    project: "Plural runtime fixture",
    continuityFiles: ["docs/PROJECT.md"],
  });
  const promptA = path.join(project, "docs", "guide", "prompts", "session-a.md");
  const promptB = path.join(project, "docs", "guide", "prompts", "session-b.md");
  await writeFile(promptA, prompt("Alpha"), "utf8");
  await writeFile(promptB, prompt("Beta"), "utf8");
  for (const skill of ["koda-c-session", "koda-c-brief", "koda-c-review", "koda-c-close"]) {
    await cp(path.join(process.cwd(), ".agents", "skills", skill), path.join(project, ".agents", "skills", skill), { recursive: true });
  }

  git(project, ["init", "-b", "main"]);
  git(project, ["config", "user.name", "Koda Plural Integration"]);
  git(project, ["config", "user.email", "plural@example.invalid"]);
  git(temporary, ["init", "--bare", remote]);
  git(project, ["remote", "add", "origin", remote]);
  git(project, ["add", "-A"]);
  git(project, ["commit", "-m", "chore: prepare plural runtime fixture"]);
  git(project, ["push", "-u", "origin", "main"]);

  const config = { ...DEFAULT_CONFIG, phases: DEFAULT_CONFIG.phases.slice(0, 1) };
  const launchA = await confirmGuideLaunch(project, config, promptA, "Kristian", { kind: "produce", independent: true });
  git(project, ["add", "--", path.relative(project, launchA.file)]);
  git(project, ["commit", "-m", "guide: confirm Alpha session"]);
  git(project, ["push"]);
  const runtimeA = await prepareGuideRuntime(project, config, {
    producerModel: "gpt-5.6-sol",
    producerEffort: "medium",
    reviewerModel: "gpt-5.6-terra",
    reviewerEffort: "medium",
  });

  const openOutput: string[] = [];
  await runCli(
    ["session", "new", promptA, "--kind", "produce", "--independent"],
    project,
    { out: (message) => openOutput.push(message), error: () => undefined, prompt: async () => "" },
  );
  const sessionA = /Opened session (\d{4}-\d{2}-\d{2}-\d{2})/.exec(openOutput.join("\n"))?.[1];
  assert(sessionA);

  const launchB = await confirmGuideLaunch(project, config, promptB, "Kristian", { kind: "explore", independent: true });
  git(project, ["add", "--", path.relative(project, launchB.file)]);
  git(project, ["commit", "-m", "guide: confirm Beta session"]);
  git(project, ["push"]);
  const runtimeB = await prepareGuideRuntime(project, config, {
    producerModel: "gpt-5.6-sol",
    producerEffort: "medium",
    reviewerModel: "gpt-5.6-terra",
    reviewerEffort: "medium",
  });
  assert.equal((await listGuideRuntimes(project)).filter(({ run }) => run.status === "PREPARED").length, 2);

  const fakeCodex = path.join(temporary, "fake-plural-codex.mjs");
  await writeFile(fakeCodex, [
    "#!/usr/bin/env node",
    "import { spawnSync } from 'node:child_process';",
    "import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';",
    "import path from 'node:path';",
    "const prompt = process.argv.at(-1) ?? '';",
    "const cli = process.env.KODA_TEST_CLI;",
    "const session = process.env.KODA_SESSION_ID;",
    "const slot = process.env.KODA_TEST_RUN_SLOT;",
    "const call = (args, accepted = [0]) => { const result = spawnSync(process.execPath, [cli, ...args], { cwd: process.cwd(), encoding: 'utf8', env: process.env }); if (!accepted.includes(result.status ?? -1)) { process.stderr.write(result.stdout + result.stderr); process.exit(result.status ?? 1); } };",
    "let role = 'producer';",
    "if (prompt.includes('explicitly use koda-c-session')) {",
    "  const kind = /\\\"--kind\\\" \\\"([^\\\"]+)\\\"/.exec(prompt)?.[1] ?? 'produce';",
    "  const open = ['session', 'new', process.env.KODA_TEST_PROMPT, '--kind', kind];",
    "  if (prompt.includes('\\\"--independent\\\"')) open.push('--independent');",
    "  call(open);",
    "}",
    "else if (prompt.includes('formal-review mode')) {",
    "  role = 'reviewer';",
    "  if (!session) process.exit(31);",
    "  call(['review', 'new', 'brief', '--session', session]);",
    "  const review = path.join(process.cwd(), 'docs', 'sessions', session, 'reviews', '01-brief-review.md');",
    "  const template = readFileSync(review, 'utf8');",
    "  const metadata = template.split(/\\r?\\n/).find((line) => line.startsWith('<!-- KODA_REVIEW '));",
    "  const receipt = template.trimEnd().split(/\\r?\\n/).at(-1);",
    "  writeFileSync(review, ['VERDICT: APPROVE', '', metadata, '', '# Peer review — brief', '', '## Findings', '', `- ${slot} is bounded to session ${session}.`, '', receipt, ''].join('\\n'));",
    "  writeFileSync(process.env.KODA_TEST_RECEIPT_FILE, receipt);",
    "}",
    "else if (prompt.includes('current phase named brief')) {",
    "  if (!session) process.exit(32);",
    "  const phaseDir = path.join(process.cwd(), 'docs', 'sessions', session, 'phases');",
    "  mkdirSync(phaseDir, { recursive: true });",
    "  writeFileSync(path.join(phaseDir, '01-brief.md'), `# Brief\\n\\n## Purpose\\nComplete ${slot} only in session ${session}.\\n`);",
    "}",
    "else if (prompt.includes('Prepare and validate immutable close.md')) { if (!session) process.exit(33); call(['session', 'close', '--session', session], [2]); }",
    "else if (prompt.includes('supervised verification mode')) { if (!session) process.exit(34); call(['session', 'close', '--session', session]); call(['status', '--session', session]); }",
    "else { process.stderr.write(`Unknown fake turn: ${prompt}`); process.exit(1); }",
    "const suffix = slot === 'A' ? (role === 'reviewer' ? '12' : '11') : (role === 'reviewer' ? '22' : '21');",
    "const thread = `019f0000-0000-7000-8000-0000000000${suffix}`;",
    "console.log(JSON.stringify({ type: 'thread.started', thread_id: thread }));",
    "console.log(JSON.stringify({ type: 'item.completed', item: { type: 'agent_message', text: `${slot} ${role} handover complete.` } }));",
    "console.log(JSON.stringify({ type: 'turn.completed' }));",
  ].join("\n"), "utf8");
  await chmod(fakeCodex, 0o755);

  const children: ReturnType<typeof spawn>[] = [];
  t.after(() => { for (const child of children) child.kill("SIGTERM"); });
  const execute = (script: string, args: string[], env: NodeJS.ProcessEnv) => new Promise<{ status: number; stdout: string; stderr: string }>((resolve, reject) => {
    const child = spawn(process.execPath, [script, ...args], { cwd: process.cwd(), env, stdio: ["ignore", "pipe", "pipe"] });
    children.push(child);
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => { stdout += String(chunk); });
    child.stderr.on("data", (chunk) => { stderr += String(chunk); });
    let timedOut = false;
    const timeout = setTimeout(() => {
      timedOut = true;
      child.kill("SIGTERM");
    }, 45_000);
    child.once("error", reject);
    child.once("close", (status) => {
      clearTimeout(timeout);
      resolve({
        status: timedOut ? -2 : (status ?? -1),
        stdout,
        stderr: timedOut ? `${stderr}\n${path.basename(script)} timed out after 45 seconds.` : stderr,
      });
    });
  });
  const envFor = (slot: "A" | "B", promptFile: string, receiptFile: string): NodeJS.ProcessEnv => ({
    ...process.env,
    KODA_RELAY_RUNS_ROOT: path.join(project, ".koda", "runs"),
    KODA_RELAY_REVIEW_PAGER: "/usr/bin/true",
    KODA_RELAY_TEST_CLIPBOARD_FILE: `${receiptFile}.clipboard`,
    KODA_RELAY_TEST_CONFIRM_READ: "1",
    KODA_RELAY_TEST_RECEIPT_INPUT_FILE: receiptFile,
    KODA_CODEX_BIN: fakeCodex,
    KODA_TEST_CLI: path.join(process.cwd(), "src", "cli.ts"),
    KODA_TEST_PROMPT: promptFile,
    KODA_TEST_RECEIPT_FILE: receiptFile,
    KODA_TEST_RUN_SLOT: slot,
  });
  const receiptA = path.join(temporary, "receipt-a.txt");
  const receiptB = path.join(temporary, "receipt-b.txt");
  const envA = envFor("A", promptA, receiptA);
  const envB = envFor("B", promptB, receiptB);

  const reviewerA = execute("scripts/run-relay-reviewer-window.ts", [runtimeA.runRoot], envA);
  const reviewerB = execute("scripts/run-relay-reviewer-window.ts", [runtimeB.runRoot], envB);
  await new Promise((resolve) => setTimeout(resolve, 300));
  const producerA = execute("scripts/execute-relay-run.ts", ["--reviewer-window", runtimeA.runRoot], envA);
  const producerB = execute("scripts/execute-relay-run.ts", ["--reviewer-window", runtimeB.runRoot], envB);
  const [producerAResult, producerBResult, reviewerAResult, reviewerBResult] = await Promise.all([
    producerA,
    producerB,
    reviewerA,
    reviewerB,
  ]);
  for (const [label, result] of [
    ["Producer A", producerAResult],
    ["Producer B", producerBResult],
    ["Reviewer A", reviewerAResult],
    ["Reviewer B", reviewerBResult],
  ] as const) {
    assert.equal(result.status, 0, `${label} failed.\nSTDOUT:\n${result.stdout}\nSTDERR:\n${result.stderr}`);
  }

  const completedA = JSON.parse(await readFile(path.join(runtimeA.runRoot, "RUN.json"), "utf8"));
  const completedB = JSON.parse(await readFile(path.join(runtimeB.runRoot, "RUN.json"), "utf8"));
  assert.equal(completedA.status, "COMPLETE");
  assert.equal(completedB.status, "COMPLETE");
  assert.equal(completedA.sessionId, sessionA);
  assert.notEqual(completedA.sessionId, completedB.sessionId);
  assert.equal(new Set([
    completedA.producer.threadId,
    completedA.reviewer.threadId,
    completedB.producer.threadId,
    completedB.reviewer.threadId,
  ]).size, 4);
  assert.match(await readFile(path.join(project, "docs", "sessions", completedA.sessionId, "phases", "01-brief.md"), "utf8"), /Complete A only/);
  assert.match(await readFile(path.join(project, "docs", "sessions", completedB.sessionId, "phases", "01-brief.md"), "utf8"), /Complete B only/);
  for (const completed of [completedA, completedB]) {
    const returned = JSON.parse(await readFile(path.join(project, completed.guideReturn), "utf8"));
    assert.equal(returned.closeCommit, git(project, ["log", "-1", "--format=%H", "--", `docs/sessions/${completed.sessionId}`]));
    assert.equal(completed.archiveCommit, git(project, ["log", "-1", "--format=%H", "--", completed.archive, completed.guideReturn]));
  }
  assert.equal(git(project, ["status", "--porcelain", "--untracked-files=all"]), "");
  assert.equal(git(project, ["rev-list", "--count", "@{u}..HEAD"]), "0");
});
