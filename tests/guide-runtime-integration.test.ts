import assert from "node:assert/strict";
import { spawn, spawnSync } from "node:child_process";
import { chmod, cp, mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { DEFAULT_CONFIG } from "../src/config.ts";
import { runGuideCli } from "../src/guide-commands.ts";
import { confirmGuideLaunch } from "../src/guide.ts";
import { prepareGuideRuntime } from "../src/guide-runtime.ts";
import { createSession, loadSessionState, writeJsonAtomic } from "../src/project.ts";
import { readApprovalEntries } from "../src/receipt.ts";

const sessionPrompt = [
  "# Session prompt",
  "",
  "## Owner intent",
  "Create one bounded artifact so the Guide-launched relay can prove its real-project close and return path.",
  "",
  "## In scope",
  "- One Brief artifact.",
  "",
  "## Out of scope",
  "- Product implementation beyond the relay proof.",
  "",
  "## Success evidence",
  "- Separate producer and reviewer contexts complete the phase and pushed close.",
  "- Pushed evidence returns to the Guide without replacing the project repository.",
  "",
  "## Constraints and owner rulings",
  "- Keep the producer input closed and route owner acknowledgement through the reviewer.",
  "",
  "## Prior session carry-forward",
  "- Previous close: none for this first session",
  "- Previous summary: none",
  "- Carried forward by owner: none",
  "- Deliberately not carried: none",
  "",
  "## Relay handover",
  "- Session kind: explore",
  "- Launch relationship: independent sibling",
  "- Dependencies: none",
  "- Configured receiver: brief",
  "- Ground prepared: project continuity and this confirmed prompt",
  "- Open items: none",
  "",
].join("\n");

function git(cwd: string, args: string[]): string {
  const result = spawnSync("git", args, { cwd, encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr);
  return result.stdout.trim();
}

test("GUIDE REAL-PROJECT RELAY: an independent sibling uses two bound contexts and returns pushed close", async (t) => {
  const temporary = await mkdtemp(path.join(tmpdir(), "koda-guide-real-relay-"));
  t.after(() => rm(temporary, { recursive: true, force: true }));
  const project = path.join(temporary, "project");
  const remote = path.join(temporary, "remote.git");
  await mkdir(path.join(project, "docs", "sessions"), { recursive: true });
  await mkdir(path.join(project, "docs", "guide", "prompts"), { recursive: true });
  await mkdir(path.join(project, ".agents", "skills"), { recursive: true });
  await writeJsonAtomic(path.join(project, "koda.config.json"), {
    ...DEFAULT_CONFIG,
    phases: DEFAULT_CONFIG.phases.slice(0, 1),
  });
  await writeFile(path.join(project, ".gitignore"), ".koda/\n.DS_Store\n", "utf8");
  await writeFile(path.join(project, "AGENTS.md"), [
    "# Guide relay fixture",
    "",
    "- Use the active Koda session as disk truth.",
    "- Producer and reviewer responsibilities remain separate.",
    "- Never automate owner acknowledgement from a model turn.",
    "",
  ].join("\n"), "utf8");
  await writeFile(path.join(project, "docs", "PROJECT.md"), "# Project\n\nProve a real-project Guide relay.\n", "utf8");
  await writeFile(path.join(project, "docs", "BACKLOG.md"), "# Backlog\n\n- [ ] Complete the bounded Guide relay.\n", "utf8");
  await writeFile(path.join(project, "docs", "WORKING-PLAN.md"), "# Working plan\n\n1. Run one phase and return its close.\n", "utf8");
  await writeJsonAtomic(path.join(project, "docs", "guide", "project.json"), {
    version: 1,
    project: "Real-project Guide relay fixture",
    continuityFiles: ["docs/PROJECT.md", "docs/BACKLOG.md", "docs/WORKING-PLAN.md"],
  });
  const promptFile = path.join(project, "docs", "guide", "prompts", "next-session.md");
  await writeFile(promptFile, sessionPrompt, "utf8");
  for (const skill of ["koda-c-session", "koda-c-brief", "koda-c-review", "koda-c-close"]) {
    await cp(path.join(process.cwd(), ".agents", "skills", skill), path.join(project, ".agents", "skills", skill), { recursive: true });
  }

  git(project, ["init", "-b", "main"]);
  git(project, ["config", "user.name", "Koda Guide Integration"]);
  git(project, ["config", "user.email", "guide-integration@example.invalid"]);
  git(temporary, ["init", "--bare", remote]);
  git(project, ["remote", "add", "origin", remote]);
  git(project, ["add", "-A"]);
  git(project, ["commit", "-m", "chore: prepare real Guide relay project"]);
  git(project, ["push", "-u", "origin", "main"]);

  const relayConfig = { ...DEFAULT_CONFIG, phases: DEFAULT_CONFIG.phases.slice(0, 1) };
  const existing = await createSession(project, relayConfig, sessionPrompt, { kind: "produce" });
  git(project, ["add", "-A"]);
  git(project, ["commit", "-m", "session: preserve active Produce sibling"]);
  git(project, ["push"]);
  const confirmed = await confirmGuideLaunch(project, relayConfig, promptFile, "Ada Owner", {
    kind: "explore",
    independent: true,
  });
  git(project, ["add", "-A"]);
  git(project, ["commit", "-m", "guide: confirm one-phase real-project session"]);
  git(project, ["push"]);
  const prepared = await prepareGuideRuntime(project, relayConfig, {
    producerModel: "gpt-5.6-sol",
    producerEffort: "medium",
    reviewerModel: "gpt-5.6-terra",
    reviewerEffort: "medium",
  });

  const generatedReceipt = path.join(temporary, "receipt.txt");
  const clipboard = path.join(temporary, "clipboard.txt");
  const fakeCodex = path.join(temporary, "fake-guide-codex.mjs");
  await writeFile(fakeCodex, [
    "#!/usr/bin/env node",
    "import { spawnSync } from 'node:child_process';",
    "import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';",
    "import path from 'node:path';",
    "const prompt = process.argv.at(-1) ?? '';",
    "const cli = process.env.KODA_TEST_CLI;",
    "const call = (args, accepted = [0]) => { const result = spawnSync(process.execPath, [cli, ...args], { cwd: process.cwd(), encoding: 'utf8' }); if (!accepted.includes(result.status ?? -1)) { process.stderr.write(result.stdout + result.stderr); process.exit(result.status ?? 1); } };",
    "const sessionsRoot = path.join(process.cwd(), 'docs', 'sessions');",
    "const latest = () => readdirSync(sessionsRoot).sort().at(-1);",
    "let role = 'producer';",
    "if (prompt.includes('explicitly use koda-c-session')) {",
    "  const kind = /\\\"--kind\\\" \\\"([^\\\"]+)\\\"/.exec(prompt)?.[1] ?? 'produce';",
    "  const open = ['session', 'new', process.env.KODA_TEST_PROMPT, '--kind', kind];",
    "  if (prompt.includes('\\\"--independent\\\"')) open.push('--independent');",
    "  for (const match of prompt.matchAll(/\\\"--depends-on\\\" \\\"([^\\\"]+)\\\"/g)) open.push('--depends-on', match[1]);",
    "  call(open);",
    "}",
    "else if (prompt.includes('formal-review mode')) {",
    "  role = 'reviewer';",
    "  call(['review', 'new', 'brief']);",
    "  const review = path.join(sessionsRoot, latest(), 'reviews', '01-brief-review.md');",
    "  const template = readFileSync(review, 'utf8');",
    "  const metadata = template.split(/\\r?\\n/).find((line) => line.startsWith('<!-- KODA_REVIEW '));",
    "  const receipt = template.trimEnd().split(/\\r?\\n/).at(-1);",
    "  writeFileSync(review, ['VERDICT: APPROVE', '', metadata, '', '# Peer review — brief', '', '## Findings', '', '- The bounded Brief is supported by the owner-confirmed session prompt.', '', receipt, ''].join('\\n'));",
    "  writeFileSync(process.env.KODA_TEST_RECEIPT_FILE, receipt);",
    "}",
    "else if (prompt.includes('current phase named brief')) {",
    "  const phaseDir = path.join(sessionsRoot, latest(), 'phases');",
    "  mkdirSync(phaseDir, { recursive: true });",
    "  writeFileSync(path.join(phaseDir, '01-brief.md'), '# Brief\\n\\n## Purpose\\nProve one owner-confirmed, Guide-launched real-project relay.\\n');",
    "}",
    "else if (prompt.includes('Prepare and validate immutable close.md')) { call(['session', 'close'], [2]); }",
    "else if (prompt.includes('supervised verification mode')) { call(['session', 'close']); call(['status']); }",
    "else { process.stderr.write(`Unknown fake turn: ${prompt}`); process.exit(1); }",
    "const thread = role === 'reviewer' ? '019f0000-0000-7000-8000-000000000012' : '019f0000-0000-7000-8000-000000000011';",
    "console.log(JSON.stringify({ type: 'thread.started', thread_id: thread }));",
    "console.log(JSON.stringify({ type: 'item.completed', item: { type: 'agent_message', text: `${role} handover complete.` } }));",
    "console.log(JSON.stringify({ type: 'turn.completed' }));",
  ].join("\n"), "utf8");
  await chmod(fakeCodex, 0o755);

  const environment = {
    ...process.env,
    KODA_RELAY_RUNS_ROOT: path.join(project, ".koda", "runs"),
    KODA_RELAY_REVIEW_PAGER: "/usr/bin/true",
    KODA_RELAY_TEST_CLIPBOARD_FILE: clipboard,
    KODA_RELAY_TEST_CONFIRM_READ: "1",
    KODA_RELAY_TEST_RECEIPT_INPUT_FILE: generatedReceipt,
    KODA_CODEX_BIN: fakeCodex,
    KODA_TEST_CLI: path.join(process.cwd(), "src", "cli.ts"),
    KODA_TEST_PROMPT: promptFile,
    KODA_TEST_RECEIPT_FILE: generatedReceipt,
  };
  const children: ReturnType<typeof spawn>[] = [];
  t.after(() => { for (const child of children) child.kill("SIGTERM"); });
  const execute = (script: string, args: string[], env = environment) => new Promise<{ status: number; stdout: string; stderr: string }>((resolve, reject) => {
    const child = spawn(process.execPath, [script, ...args], { cwd: process.cwd(), env, stdio: ["ignore", "pipe", "pipe"] });
    children.push(child);
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => { stdout += String(chunk); });
    child.stderr.on("data", (chunk) => { stderr += String(chunk); });
    const timeout = setTimeout(() => {
      child.kill("SIGTERM");
      reject(new Error(`${script} timed out.\n${stdout}\n${stderr}`));
    }, 20_000);
    child.once("error", reject);
    child.once("close", (status) => {
      clearTimeout(timeout);
      resolve({ status: status ?? -1, stdout, stderr });
    });
  });

  const reviewer = execute("scripts/run-relay-reviewer-window.ts", [prepared.runRoot]);
  const earlyReviewer = await Promise.race([
    reviewer,
    new Promise<null>((resolve) => setTimeout(() => resolve(null), 250)),
  ]);
  assert.equal(earlyReviewer, null, earlyReviewer ? `${earlyReviewer.stdout}\n${earlyReviewer.stderr}` : "");
  const interruptedProducer = await execute(
    "scripts/execute-relay-run.ts",
    ["--reviewer-window", prepared.runRoot],
    { ...environment, KODA_RELAY_TEST_PAUSE_AFTER_GUIDE_STAGE: "1" },
  );
  assert.equal(interruptedProducer.status, 2, interruptedProducer.stderr);
  assert.match(interruptedProducer.stderr, /Injected interruption after Guide return staging and before project mutation/);
  const interruptedRun = JSON.parse(await readFile(path.join(prepared.runRoot, "RUN.json"), "utf8"));
  assert.equal(interruptedRun.status, "FINALIZING_GUIDE_RETURN");
  assert.equal(git(project, ["status", "--porcelain", "--untracked-files=all"]), "");
  assert.ok((await readdir(path.join(project, ".git"))).length > 0, "Git disappeared during interrupted return staging");
  const interruptedStatus = await execute("scripts/show-relay-status.ts", [prepared.runRoot]);
  assert.equal(interruptedStatus.status, 0, interruptedStatus.stderr);
  assert.match(interruptedStatus.stdout, /Run state: FINALIZING_GUIDE_RETURN/);
  assert.match(interruptedStatus.stdout, /Resume Window A to finish the Guide return/);
  assert.match(interruptedStatus.stdout, /execute-relay-run\.ts.*--reviewer-window/);

  await writeFile(path.join(prepared.runRoot, "RUN.json"), `${JSON.stringify({
    ...interruptedRun,
    finalCommit: "0".repeat(40),
  }, null, 2)}\n`, "utf8");
  const wrongCommitRecovery = await execute("scripts/execute-relay-run.ts", ["--reviewer-window", prepared.runRoot]);
  assert.equal(wrongCommitRecovery.status, 1, wrongCommitRecovery.stderr);
  assert.match(wrongCommitRecovery.stderr, /project commit changed after return staging/);
  await writeFile(path.join(prepared.runRoot, "RUN.json"), `${JSON.stringify(interruptedRun, null, 2)}\n`, "utf8");

  const producer = execute("scripts/execute-relay-run.ts", ["--reviewer-window", prepared.runRoot]);
  let producerResult: Awaited<typeof producer>;
  try {
    producerResult = await producer;
  } catch (error) {
    for (const child of children) child.kill("SIGTERM");
    const reviewerFailure = await reviewer;
    throw new Error(`${error instanceof Error ? error.message : String(error)}\nREVIEWER STDOUT:\n${reviewerFailure.stdout}\nREVIEWER STDERR:\n${reviewerFailure.stderr}`);
  }
  const reviewerResult = await reviewer;
  assert.equal(producerResult.status, 0, producerResult.stderr);
  assert.equal(reviewerResult.status, 0, reviewerResult.stderr);
  assert.match(producerResult.stdout, /RELAY COMPLETE/);
  assert.match(producerResult.stdout, /Guide return:/);
  assert.match(reviewerResult.stdout, /SESSION CLOSED — reviewer window complete/);

  const run = JSON.parse(await readFile(path.join(prepared.runRoot, "RUN.json"), "utf8"));
  assert.equal(run.status, "COMPLETE");
  assert.equal(run.launchId, confirmed.launch.id);
  assert.notEqual(run.producer.threadId, run.reviewer.threadId);
  assert.notEqual(run.finalCommit, run.archiveCommit);
  assert.notEqual(run.sessionId, existing.id);
  assert.equal(run.owner, "Ada Owner");
  const existingState = await loadSessionState(existing.directory, existing.id);
  assert.equal(existingState.currentPhaseIndex, 0);
  const completedState = await loadSessionState(path.join(project, "docs", "sessions", run.sessionId), run.sessionId);
  const approvals = await readApprovalEntries(path.join(project, "docs", "sessions", run.sessionId));
  assert.equal(approvals.length, 1);
  assert.equal(approvals[0]?.approver, "Ada Owner");
  assert.equal(completedState.kind, "explore");
  assert.equal(completedState.launchMode, "independent");
  const guideReturnFile = path.join(project, run.guideReturn);
  const guideReturn = JSON.parse(await readFile(guideReturnFile, "utf8"));
  assert.equal(guideReturn.status, "CLOSED_SESSION_RETURNED");
  assert.equal(guideReturn.launchId, confirmed.launch.id);
  assert.equal(guideReturn.closeCommit, run.finalCommit);
  assert.equal(git(project, ["rev-list", "--count", "@{u}..HEAD"]), "0");
  assert.equal(git(project, ["status", "--porcelain", "--untracked-files=all"]), "");
  assert.equal(git(project, ["ls-files", ".koda"]), "");
  assert.match(git(project, ["ls-files", run.archive]), /RESULT\.md/);
  assert.equal(git(project, ["ls-files", run.guideReturn]), run.guideReturn);
  assert.ok((await readdir(path.join(project, ".git"))).length > 0, "the real project's Git repository was removed");
  assert.match(await readFile(path.join(project, run.archive, "RESULT.md"), "utf8"), /Status: COMPLETE/);
  const guideStatus: string[] = [];
  await runGuideCli(["status"], project, { out(message) { guideStatus.push(message); } });
  assert.match(guideStatus.join("\n"), new RegExp(`LAST SESSION RUNTIME — ${confirmed.launch.id}`));
  assert.match(guideStatus.join("\n"), new RegExp(`Guide return: ${run.guideReturn}`));
});
