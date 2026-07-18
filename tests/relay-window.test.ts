import assert from "node:assert/strict";
import { spawn, spawnSync } from "node:child_process";
import { chmod, mkdir, mkdtemp, readFile, readdir, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { readProjectConfig } from "../src/config.ts";
import { artifactPath, createSession, reviewPath, writeJsonAtomic } from "../src/project.ts";
import { createFreshReview, readApprovalEntries } from "../src/receipt.ts";
import {
  acquireReviewerWindow,
  newReviewerJob,
  REVIEWER_JOB_FILE,
  REVIEWER_LOCK_DIR,
  readReviewerJob,
  readReviewerWindowState,
  redactRelayOutput,
  renderCodexEvent,
  validateReviewerJob,
  writeReviewerJob,
} from "../scripts/relay-window-protocol.ts";

async function preparedAcknowledgementRun(
  receiptInput: "correct" | "wrong",
  options: { discussionResponse?: string } = {},
) {
  const temporary = await mkdtemp(path.join(tmpdir(), "koda-reviewer-window-"));
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
    env: { ...process.env, KODA_RELAY_RUNS_ROOT: temporary },
  });
  assert.equal(prepared.status, 0, prepared.stderr);
  const runRoot = path.join(temporary, (await readdir(temporary))[0]);
  const project = path.join(runRoot, "project");
  const config = await readProjectConfig(project);
  const prompt = await readFile(path.join(project, "owner-prompt.md"), "utf8");
  const session = await createSession(project, config, prompt);
  const phase = session.state.phases[0];
  await writeFile(artifactPath(session.directory, phase, 0), "# Brief\n\nOne bounded, cited outcome.\n", "utf8");
  const review = await createFreshReview(session.directory, phase, 0, {
    verdict: "APPROVE",
    body: "# Peer review — brief\n\n## Findings\n\n- The artifact is bounded and supported.",
  });
  const runPath = path.join(runRoot, "RUN.json");
  const run = JSON.parse(await readFile(runPath, "utf8"));
  run.status = "AWAITING_REVIEWER_WINDOW";
  run.sessionId = session.id;
  run.reviewer.threadId = "019f0000-0000-7000-8000-000000000001";
  await writeJsonAtomic(runPath, run);
  const job = newReviewerJob({
    kind: "acknowledge",
    phase: phase.name,
    purpose: "owner acknowledgement of brief",
    prompt: "No model turn is permitted for this owner-only acknowledgement job.",
    expectedPath: path.relative(project, reviewPath(session.directory, phase, 0)),
  });
  await writeReviewerJob(runRoot, job);
  const clipboard = path.join(temporary, "clipboard.txt");
  let fakeCodex: string | undefined;
  if (options.discussionResponse) {
    fakeCodex = path.join(temporary, "fake-explainer.mjs");
    await writeFile(fakeCodex, [
      "#!/usr/bin/env node",
      "console.log(JSON.stringify({ type: 'thread.started', thread_id: '019f0000-0000-7000-8000-000000000001' }));",
      `console.log(JSON.stringify({ type: 'item.completed', item: { type: 'agent_message', text: ${JSON.stringify(options.discussionResponse)} } }));`,
      "console.log(JSON.stringify({ type: 'turn.completed' }));",
    ].join("\n"), "utf8");
    await chmod(fakeCodex, 0o755);
  }
  const executed = spawnSync(process.execPath, ["scripts/run-relay-reviewer-window.ts"], {
    cwd: process.cwd(),
    encoding: "utf8",
    env: {
      ...process.env,
      KODA_RELAY_RUNS_ROOT: temporary,
      KODA_RELAY_REVIEWER_ONCE: "1",
      KODA_RELAY_REVIEW_PAGER: "/usr/bin/true",
      KODA_RELAY_TEST_CLIPBOARD_FILE: clipboard,
      KODA_RELAY_TEST_CONFIRM_READ: "1",
      KODA_RELAY_TEST_RECEIPT_INPUT: receiptInput === "correct" ? review.metadata.receipt : "RECEIPT: Review read — wrong",
      ...(fakeCodex
        ? {
            KODA_CODEX_BIN: fakeCodex,
            KODA_RELAY_TEST_DISCUSSION_QUESTION: "Please add a new product requirement.",
          }
        : {}),
    },
  });
  return { temporary, runRoot, session, review, executed, clipboard };
}

test("TWO-WINDOW PROTOCOL: reviewer jobs are bounded and duplicate reviewer windows refuse", async (t) => {
  const temporary = await mkdtemp(path.join(tmpdir(), "koda-window-protocol-"));
  t.after(() => rm(temporary, { recursive: true, force: true }));
  const job = newReviewerJob({
    kind: "formal",
    phase: "brief",
    purpose: "formal review of brief",
    prompt: "Use the shared reviewer skill and write the review.",
    expectedPath: "docs/sessions/2026-07-18-01/reviews/01-brief-review.md",
  });
  assert.equal(validateReviewerJob(job), job);
  assert.throws(() => validateReviewerJob({ ...job, expectedPath: "../escape.md" }), /invalid or unsafe/);
  await writeReviewerJob(temporary, job);
  assert.equal((await readReviewerJob(temporary))?.id, job.id);

  const linked = path.join(temporary, "linked-job.json");
  await writeFile(linked, `${JSON.stringify(job)}\n`, "utf8");
  await rm(path.join(temporary, REVIEWER_JOB_FILE));
  await symlink(linked, path.join(temporary, REVIEWER_JOB_FILE));
  await assert.rejects(readReviewerJob(temporary), /must be a regular file/);

  const release = await acquireReviewerWindow(temporary);
  await assert.rejects(acquireReviewerWindow(temporary), /already owns this run/);
  await release();

  const staleLock = path.join(temporary, REVIEWER_LOCK_DIR);
  await mkdir(staleLock);
  await writeJsonAtomic(path.join(staleLock, "OWNER.json"), {
    version: 1,
    pid: 2_147_483_647,
    startedAt: new Date(0).toISOString(),
  });
  await assert.rejects(acquireReviewerWindow(temporary), /stopped process.*recover-stale-lock/);
  const releaseRecovered = await acquireReviewerWindow(temporary, { recoverStale: true });
  await releaseRecovered();
});

test("TWO-WINDOW VISIBILITY: progress is readable without exposing review receipts", () => {
  const receipt = "RECEIPT: Review read — 11111111-1111-1111-1111-111111111111";
  assert.equal(redactRelayOutput(`Checked evidence.\n${receipt}\nDone.`), "Checked evidence.\nDone.");
  const rendered = renderCodexEvent(JSON.stringify({
    type: "item.completed",
    item: { type: "agent_message", text: `Review complete.\n${receipt}` },
  }), "REVIEWER");
  assert.equal(rendered, "REVIEWER UPDATE\nReview complete.");
  assert.equal(redactRelayOutput(`Review complete; ${receipt}`), "Review complete; [receipt redacted]");
  assert.equal(renderCodexEvent(JSON.stringify({ type: "turn.completed" }), "PRODUCER"), "PRODUCER TURN COMPLETE");
});

test("TWO-WINDOW RECEIPT: exact owner quote is recorded from Window B", async (t) => {
  const result = await preparedAcknowledgementRun("correct");
  t.after(() => rm(result.temporary, { recursive: true, force: true }));
  assert.equal(result.executed.status, 0, result.executed.stderr);
  assert.match(result.executed.stdout, /ACKNOWLEDGED — Window A will now derive the route from disk/);
  assert.doesNotMatch(result.executed.stdout, /RECEIPT: Review read/);
  assert.equal((await readReviewerJob(result.runRoot))?.status, "COMPLETE");
  assert.equal((await readReviewerWindowState(result.runRoot))?.threadId, "019f0000-0000-7000-8000-000000000001");
  assert.equal(await readFile(result.clipboard, "utf8"), result.review.metadata.receipt);
  const approvals = await readApprovalEntries(result.session.directory);
  assert.equal(approvals.length, 1);
  assert.equal(approvals[0].receipt, result.review.metadata.receipt);
  assert.equal(approvals[0].approver, "Kristian");
});

test("TWO-WINDOW RECEIPT MUTATION: a wrong quote refuses and names the preserved failed job", async (t) => {
  const result = await preparedAcknowledgementRun("wrong");
  t.after(() => rm(result.temporary, { recursive: true, force: true }));
  assert.equal(result.executed.status, 1, result.executed.stderr);
  assert.match(result.executed.stderr, /REVIEWER PAUSED — Owner acknowledgement exited 1/);
  const job = await readReviewerJob(result.runRoot);
  assert.equal(job?.status, "FAILED");
  assert.match(job?.error ?? "", /Owner acknowledgement exited 1/);
  assert.equal((await readApprovalEntries(result.session.directory)).length, 0);
});

test("OWNER DISCUSSION SAFETY: a new product direction stays paused without a disk handback", async (t) => {
  const result = await preparedAcknowledgementRun("correct", {
    discussionResponse: "OWNER DIRECTION — DISK HANDOFF REQUIRED\nAdd a second output format.",
  });
  t.after(() => rm(result.temporary, { recursive: true, force: true }));
  assert.equal(result.executed.status, 2, result.executed.stderr);
  assert.match(result.executed.stdout, /ACKNOWLEDGEMENT PAUSED — this is new owner direction/);
  assert.match(result.executed.stderr, /REVIEWER PAUSED SAFELY/);
  const job = await readReviewerJob(result.runRoot);
  assert.equal(job?.status, "AWAITING_OWNER");
  assert.equal(job?.error, "OWNER_DIRECTION_HANDOFF_REQUIRED");
  assert.equal((await readApprovalEntries(result.session.directory)).length, 0);
});

test("TWO-WINDOW RELAY: a pending formal-review job wakes one persistent reviewer and returns acknowledged disk evidence", async (t) => {
  const temporary = await mkdtemp(path.join(tmpdir(), "koda-reviewer-wake-"));
  t.after(() => rm(temporary, { recursive: true, force: true }));
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
    env: { ...process.env, KODA_RELAY_RUNS_ROOT: temporary },
  });
  assert.equal(prepared.status, 0, prepared.stderr);
  const runRoot = path.join(temporary, (await readdir(temporary))[0]);
  const project = path.join(runRoot, "project");
  const config = await readProjectConfig(project);
  const session = await createSession(project, config, await readFile(path.join(project, "owner-prompt.md"), "utf8"));
  const phase = session.state.phases[0];
  await writeFile(artifactPath(session.directory, phase, 0), "# Brief\n\nOne bounded, cited outcome.\n", "utf8");

  const runPath = path.join(runRoot, "RUN.json");
  const run = JSON.parse(await readFile(runPath, "utf8"));
  run.status = "AWAITING_REVIEWER_WINDOW";
  run.sessionId = session.id;
  await writeJsonAtomic(runPath, run);
  const job = newReviewerJob({
    kind: "formal",
    phase: phase.name,
    purpose: "formal review of brief",
    prompt: "Use the one shared reviewer skill in formal-review mode.",
    expectedPath: path.relative(project, reviewPath(session.directory, phase, 0)),
  });
  await writeReviewerJob(runRoot, job);

  const generatedReceipt = path.join(temporary, "generated-receipt.txt");
  const clipboard = path.join(temporary, "clipboard.txt");
  const fakeCodex = path.join(temporary, "fake-codex.mjs");
  await writeFile(fakeCodex, [
    "#!/usr/bin/env node",
    "import { spawnSync } from 'node:child_process';",
    "import { readFileSync, readdirSync, writeFileSync } from 'node:fs';",
    "import path from 'node:path';",
    "const opened = spawnSync(process.execPath, [process.env.KODA_TEST_CLI, 'review', 'new', 'brief'], { cwd: process.cwd(), encoding: 'utf8' });",
    "if (opened.status !== 0) { process.stderr.write(opened.stderr); process.exit(opened.status ?? 1); }",
    "const sessions = path.join(process.cwd(), 'docs', 'sessions');",
    "const session = readdirSync(sessions).sort().at(-1);",
    "const review = path.join(sessions, session, 'reviews', '01-brief-review.md');",
    "const template = readFileSync(review, 'utf8');",
    "const metadata = template.split(/\\r?\\n/).find((line) => line.startsWith('<!-- KODA_REVIEW '));",
    "const receipt = template.trimEnd().split(/\\r?\\n/).at(-1);",
    "writeFileSync(review, ['VERDICT: APPROVE', '', metadata, '', '# Peer review — brief', '', '## Findings', '', '- The bounded artifact is supported by its cited source.', '', receipt, ''].join('\\n'));",
    "writeFileSync(process.env.KODA_TEST_RECEIPT_FILE, receipt);",
    "console.log(JSON.stringify({ type: 'thread.started', thread_id: '019f0000-0000-7000-8000-000000000002' }));",
    "console.log(JSON.stringify({ type: 'item.completed', item: { type: 'agent_message', text: `Review written.\\n${receipt}` } }));",
    "console.log(JSON.stringify({ type: 'turn.completed' }));",
  ].join("\n"), "utf8");
  await chmod(fakeCodex, 0o755);

  const executed = spawnSync(process.execPath, ["scripts/run-relay-reviewer-window.ts"], {
    cwd: process.cwd(),
    encoding: "utf8",
    env: {
      ...process.env,
      KODA_RELAY_RUNS_ROOT: temporary,
      KODA_RELAY_REVIEWER_ONCE: "1",
      KODA_RELAY_REVIEW_PAGER: "/usr/bin/true",
      KODA_RELAY_TEST_CLIPBOARD_FILE: clipboard,
      KODA_RELAY_TEST_CONFIRM_READ: "1",
      KODA_RELAY_TEST_RECEIPT_INPUT_FILE: generatedReceipt,
      KODA_CODEX_BIN: fakeCodex,
      KODA_TEST_CLI: path.join(process.cwd(), "src", "cli.ts"),
      KODA_TEST_RECEIPT_FILE: generatedReceipt,
    },
  });
  assert.equal(executed.status, 0, executed.stderr);
  assert.match(executed.stdout, /REVIEWER 1 — formal review of brief/);
  assert.match(executed.stdout, /REVIEWER UPDATE\nReview written/);
  assert.doesNotMatch(executed.stdout, /RECEIPT: Review read/);
  assert.equal((await readReviewerJob(runRoot))?.status, "COMPLETE");
  const state = await readReviewerWindowState(runRoot);
  assert.equal(state?.threadId, "019f0000-0000-7000-8000-000000000002");
  assert.equal(state?.turns, 1);
  const approvals = await readApprovalEntries(session.directory);
  assert.equal(approvals.length, 1);
  assert.equal(approvals[0].receipt, await readFile(generatedReceipt, "utf8"));
  assert.equal(await readFile(clipboard, "utf8"), approvals[0].receipt);
});

test("TWO-WINDOW SESSION: separate producer and reviewer processes rendezvous through pushed close", async (t) => {
  const temporary = await mkdtemp(path.join(tmpdir(), "koda-two-window-session-"));
  t.after(() => rm(temporary, { recursive: true, force: true }));
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
    env: { ...process.env, KODA_RELAY_RUNS_ROOT: temporary },
  });
  assert.equal(prepared.status, 0, prepared.stderr);
  const runRoot = path.join(temporary, (await readdir(temporary))[0]);
  const project = path.join(runRoot, "project");
  const config = await readProjectConfig(project);
  config.phases = config.phases.slice(0, 1);
  await writeJsonAtomic(path.join(project, "koda.config.json"), config);
  const git = (args: string[]) => spawnSync("git", args, { cwd: project, encoding: "utf8" });
  assert.equal(git(["add", "koda.config.json"]).status, 0);
  assert.equal(git(["commit", "-m", "test: use one phase for two-window rendezvous"]).status, 0);
  assert.equal(git(["push"]).status, 0);
  const head = git(["rev-parse", "HEAD"]);
  assert.equal(head.status, 0, head.stderr);
  const runPath = path.join(runRoot, "RUN.json");
  const run = JSON.parse(await readFile(runPath, "utf8"));
  run.initialCommit = head.stdout.trim();
  await writeJsonAtomic(runPath, run);

  const generatedReceipt = path.join(temporary, "session-receipt.txt");
  const clipboard = path.join(temporary, "session-clipboard.txt");
  const fakeCodex = path.join(temporary, "fake-session-codex.mjs");
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
    "if (prompt.includes('explicitly use koda-c-session')) { call(['session', 'new', path.join(process.cwd(), 'owner-prompt.md')]); }",
    "else if (prompt.includes('owner-explanation mode')) { role = 'reviewer'; }",
    "else if (prompt.includes('formal-review mode')) {",
    "  role = 'reviewer';",
    "  call(['review', 'new', 'brief']);",
    "  const review = path.join(sessionsRoot, latest(), 'reviews', '01-brief-review.md');",
    "  const template = readFileSync(review, 'utf8');",
    "  const metadata = template.split(/\\r?\\n/).find((line) => line.startsWith('<!-- KODA_REVIEW '));",
    "  const receipt = template.trimEnd().split(/\\r?\\n/).at(-1);",
    "  writeFileSync(review, ['VERDICT: APPROVE', '', metadata, '', '# Peer review — brief', '', '## Findings', '', '- The artifact states one bounded outcome and is supported by the session prompt.', '', receipt, ''].join('\\n'));",
    "  writeFileSync(process.env.KODA_TEST_RECEIPT_FILE, receipt);",
    "}",
    "else if (prompt.includes('current phase named brief')) {",
    "  const phaseDir = path.join(sessionsRoot, latest(), 'phases');",
    "  mkdirSync(phaseDir, { recursive: true });",
    "  writeFileSync(path.join(phaseDir, '01-brief.md'), '# Brief\\n\\n## Purpose\\nOne bounded outcome supported by the session prompt.\\n');",
    "}",
    "else if (prompt.includes('Prepare and validate immutable close.md')) { call(['session', 'close'], [2]); }",
    "else if (prompt.includes('supervised verification mode')) { call(['session', 'close']); call(['status']); }",
    "else { process.stderr.write(`Unknown fake turn: ${prompt}`); process.exit(1); }",
    "const thread = role === 'reviewer' ? '019f0000-0000-7000-8000-000000000004' : '019f0000-0000-7000-8000-000000000003';",
    "console.log(JSON.stringify({ type: 'thread.started', thread_id: thread }));",
    "const message = prompt.includes('owner-explanation mode') ? 'The finding means the bounded claim matches the cited prompt; it adds no new direction.' : `${role} handover complete.`;",
    "console.log(JSON.stringify({ type: 'item.completed', item: { type: 'agent_message', text: message } }));",
    "console.log(JSON.stringify({ type: 'turn.completed' }));",
  ].join("\n"), "utf8");
  await chmod(fakeCodex, 0o755);

  const environment = {
    ...process.env,
    KODA_RELAY_RUNS_ROOT: temporary,
    KODA_RELAY_REVIEW_PAGER: "/usr/bin/true",
    KODA_RELAY_TEST_CLIPBOARD_FILE: clipboard,
    KODA_RELAY_TEST_CONFIRM_READ: "1",
    KODA_RELAY_TEST_RECEIPT_INPUT_FILE: generatedReceipt,
    KODA_RELAY_TEST_DISCUSSION_QUESTION: "What does this finding mean?",
    KODA_CODEX_BIN: fakeCodex,
    KODA_TEST_CLI: path.join(process.cwd(), "src", "cli.ts"),
    KODA_TEST_RECEIPT_FILE: generatedReceipt,
  };
  const children: ReturnType<typeof spawn>[] = [];
  t.after(() => { for (const child of children) child.kill("SIGTERM"); });
  const execute = (script: string, args: string[] = []) => new Promise<{ status: number; stdout: string; stderr: string }>((resolve, reject) => {
    const child = spawn(process.execPath, [script, ...args], { cwd: process.cwd(), env: environment, stdio: ["ignore", "pipe", "pipe"] });
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

  const reviewer = execute("scripts/run-relay-reviewer-window.ts");
  await new Promise((resolve) => setTimeout(resolve, 75));
  const producer = execute("scripts/execute-relay-run.ts", ["--reviewer-window"]);
  const producerResult = await producer;
  const firstProducerStderr = await readFile(path.join(runRoot, "PRODUCER-01-STDERR.txt"), "utf8").catch(() => "no producer stderr file");
  assert.equal(producerResult.status, 0, `${producerResult.stderr}\n${firstProducerStderr}`);
  const reviewerResult = await reviewer;
  assert.equal(reviewerResult.status, 0, reviewerResult.stderr);
  assert.match(producerResult.stdout, /HANDOVER TO WINDOW B — formal review of brief/);
  assert.match(producerResult.stdout, /WINDOW B HANDOVER COMPLETE/);
  assert.match(producerResult.stdout, /RELAY COMPLETE/);
  assert.match(reviewerResult.stdout, /REVIEWER 1 — formal review of brief/);
  assert.match(reviewerResult.stdout, /REVIEWER 2 — explain brief review/);
  assert.match(reviewerResult.stdout, /ACKNOWLEDGED — Window A will now derive the route from disk/);
  assert.match(reviewerResult.stdout, /SESSION CLOSED — reviewer window complete/);

  const completed = JSON.parse(await readFile(runPath, "utf8"));
  assert.equal(completed.status, "COMPLETE");
  assert.notEqual(completed.producer.threadId, completed.reviewer.threadId);
  assert.equal(completed.ownerAcknowledgements, 1);
  assert.equal(completed.reviewer.turns, 2);
  assert.match(await readFile(path.join(runRoot, "RESULT.md"), "utf8"), /Completed phases: 1\/1/);
  assert.match(await readFile(path.join(runRoot, "TRANSCRIPT.md"), "utf8"), /Window B completed formal review of brief/);
});
