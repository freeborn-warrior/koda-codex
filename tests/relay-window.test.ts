import assert from "node:assert/strict";
import { spawn, spawnSync } from "node:child_process";
import { chmod, mkdir, mkdtemp, readFile, readdir, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { pathExists, readProjectConfig } from "../src/config.ts";
import { pendingDirectionsForActivePhase, readWaitingDirections } from "../src/direction.ts";
import { evaluateSessionHalt } from "../src/halt.ts";
import { artifactPath, createSession, loadSessionState, reviewPath, writeJsonAtomic } from "../src/project.ts";
import { createFreshReview, readApprovalEntries, sha256 } from "../src/receipt.ts";
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
  options: { discussionResponse?: string; haltDirection?: string } = {},
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
      ...(options.haltDirection ? { KODA_RELAY_TEST_HALT_DIRECTION: options.haltDirection } : {}),
      ...(fakeCodex
        ? {
            KODA_CODEX_BIN: fakeCodex,
            KODA_RELAY_TEST_DISCUSSION_QUESTION: "Please add a new product requirement.",
          }
        : {}),
    },
  });
  return { temporary, runRoot, project, phase, session, review, executed, clipboard };
}

async function preparedIdleConversationRun(response: string, options: { throughTty?: boolean; question?: string } = {}) {
  const reviewerThreadId = "019f0000-0000-7000-8000-000000000099";
  const question = options.question ?? "What should I understand about the active Brief?";
  const temporary = await mkdtemp(path.join(tmpdir(), "koda-reviewer-conversation-"));
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
  const runPath = path.join(runRoot, "RUN.json");
  const run = JSON.parse(await readFile(runPath, "utf8"));
  run.status = "RUNNING";
  run.sessionId = session.id;
  run.reviewer.threadId = reviewerThreadId;
  run.reviewer.turns = 2;
  await writeJsonAtomic(runPath, run);
  const projectStatusBefore = spawnSync("git", ["status", "--porcelain", "--untracked-files=all"], {
    cwd: project,
    encoding: "utf8",
  }).stdout;
  const fakeCodex = path.join(temporary, "fake-idle-reviewer.mjs");
  await writeFile(fakeCodex, [
    "#!/usr/bin/env node",
    "const prompt = process.argv.at(-1) ?? '';",
    "if (!prompt.includes('owner-conversation mode')) { process.stderr.write('missing owner-conversation mode'); process.exit(1); }",
    `if (!process.argv.includes('resume') || !process.argv.includes(${JSON.stringify(reviewerThreadId)})) { process.stderr.write('existing reviewer context was not resumed'); process.exit(1); }`,
    `console.log(JSON.stringify({ type: 'thread.started', thread_id: ${JSON.stringify(reviewerThreadId)} }));`,
    `console.log(JSON.stringify({ type: 'item.completed', item: { type: 'agent_message', text: ${JSON.stringify(response)} } }));`,
    "console.log(JSON.stringify({ type: 'turn.completed' }));",
  ].join("\n"), "utf8");
  await chmod(fakeCodex, 0o755);
  const environment = {
    ...process.env,
    KODA_RELAY_RUNS_ROOT: temporary,
    KODA_RELAY_REVIEWER_ONCE: "1",
    ...(!options.throughTty
      ? { KODA_RELAY_TEST_IDLE_CONVERSATION: question }
      : {}),
    KODA_CODEX_BIN: fakeCodex,
    ...(options.throughTty
      ? {
          KODA_TEST_NODE: process.execPath,
          KODA_TEST_REVIEWER_SCRIPT: path.join(process.cwd(), "scripts", "run-relay-reviewer-window.ts"),
          KODA_TEST_QUESTION: question,
        }
      : {}),
  };
  const expectProgram = [
    "set timeout 10",
    "spawn $env(KODA_TEST_NODE) $env(KODA_TEST_REVIEWER_SCRIPT)",
    "expect \"reviewer> \"",
    "send -- \"$env(KODA_TEST_QUESTION)\\r\"",
    "expect eof",
    "set result [wait]",
    "exit [lindex $result 3]",
  ].join("\n");
  const executed = spawnSync(options.throughTty ? "/usr/bin/expect" : process.execPath, options.throughTty
    ? ["-c", expectProgram]
    : ["scripts/run-relay-reviewer-window.ts"], {
    cwd: process.cwd(),
    encoding: "utf8",
    timeout: 10_000,
    env: environment,
  });
  const projectStatusAfter = spawnSync("git", ["status", "--porcelain", "--untracked-files=all"], {
    cwd: project,
    encoding: "utf8",
  }).stdout;
  return { temporary, runRoot, project, session, executed, projectStatusBefore, projectStatusAfter };
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

test("REVIEWER OPEN CONVERSATION: an idle owner question resumes the Reviewer but changes no project file", async (t) => {
  const result = await preparedIdleConversationRun("The current disk evidence proves only that Brief is active; Producer has not handed it over yet.");
  t.after(() => rm(result.temporary, { recursive: true, force: true }));
  assert.equal(result.executed.status, 0, result.executed.stderr);
  assert.match(result.executed.stdout, /owner conversation while Producer works/);
  assert.match(result.executed.stdout, /REVIEWER CONVERSATION COMPLETE — no producer handback was created/);
  assert.equal(result.projectStatusAfter, result.projectStatusBefore);
  const state = await readReviewerWindowState(result.runRoot);
  assert.equal(state?.threadId, "019f0000-0000-7000-8000-000000000099");
  assert.equal(state?.turns, 3);
  assert.equal(await pathExists(path.join(result.session.directory, "owner-handbacks")), false);
});

test("REVIEWER OPEN CONVERSATION SCOPE: project-level thought returns to Guide without mutation", async (t) => {
  const result = await preparedIdleConversationRun("GUIDE CONVERSATION — PROJECT SCOPE\nThis belongs in the project path, not the active session.");
  t.after(() => rm(result.temporary, { recursive: true, force: true }));
  assert.equal(result.executed.status, 0, result.executed.stderr);
  assert.match(result.executed.stdout, /GUIDE SCOPE — continue this project-level thought in the Guide conversation/);
  assert.match(result.executed.stdout, /Nothing from this Reviewer conversation changed the active session/);
  assert.equal(result.projectStatusAfter, result.projectStatusBefore);
  assert.equal(await pathExists(path.join(result.session.directory, "owner-handbacks")), false);
});

test("REVIEWER OPEN CONVERSATION WAIT: active direction is recorded but cannot become a current-phase handback", async (t) => {
  const result = await preparedIdleConversationRun(
    "OWNER DIRECTION — WAIT FOR GATE\nChange the output format at the next boundary.",
    { question: "Change the output format at the next boundary." },
  );
  t.after(() => rm(result.temporary, { recursive: true, force: true }));
  assert.equal(result.executed.status, 0, result.executed.stderr);
  assert.match(result.executed.stdout, /DIRECTION RECORDED — WAITING FOR GATE/);
  assert.match(result.executed.stdout, /active phase inputs remain frozen/);
  assert.notEqual(result.projectStatusAfter, result.projectStatusBefore);
  const directions = await readWaitingDirections(result.session.directory);
  assert.equal(directions.length, 1);
  assert.equal(directions[0].metadata.artifactState, "ABSENT");
  assert.equal(directions[0].metadata.ownerStatement, "Change the output format at the next boundary.");
  assert.equal(await pathExists(path.join(result.session.directory, "owner-handbacks")), false);
});

test("REVIEWER OPEN CONVERSATION TTY: a real terminal line reaches the idle Reviewer prompt", {
  skip: process.platform !== "darwin",
}, async (t) => {
  const result = await preparedIdleConversationRun("The Reviewer received the terminal question and changed no file.", { throughTty: true });
  t.after(() => rm(result.temporary, { recursive: true, force: true }));
  assert.equal(result.executed.status, 0, result.executed.stderr);
  assert.match(result.executed.stdout, /reviewer> /);
  assert.match(result.executed.stdout, /owner conversation while Producer works/);
  assert.match(result.executed.stdout, /REVIEWER CONVERSATION COMPLETE — no producer handback was created/);
  assert.equal(result.projectStatusAfter, result.projectStatusBefore);
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

test("WAIT AT FORMAL REVIEW: new direction is recorded immediately but does not revise the reviewed artifact", async (t) => {
  const result = await preparedAcknowledgementRun("correct", {
    discussionResponse: "OWNER DIRECTION — WAIT FOR GATE\nAdd a second output format after this Brief boundary.",
  });
  t.after(() => rm(result.temporary, { recursive: true, force: true }));
  assert.equal(result.executed.status, 0, result.executed.stderr);
  assert.match(result.executed.stdout, /DIRECTION RECORDED — WAITING FOR GATE/);
  assert.match(result.executed.stdout, /reviewed artifact keeps its frozen contract/);
  const job = await readReviewerJob(result.runRoot);
  assert.equal(job?.status, "COMPLETE");
  assert.equal(job?.completion, "ACKNOWLEDGED");
  const directions = await readWaitingDirections(result.session.directory);
  assert.equal(directions.length, 1);
  assert.equal(directions[0].metadata.ownerStatement, "Please add a new product requirement.");
  assert.equal(directions[0].metadata.artifactState, "PRESENT");
  assert.equal(directions[0].metadata.reviewSha256, sha256(await readFile(reviewPath(result.session.directory, result.phase, 0), "utf8")));
  assert.equal((await readApprovalEntries(result.session.directory)).length, 1);
  assert.doesNotMatch(await readFile(artifactPath(result.session.directory, result.phase, 0), "utf8"), new RegExp(directions[0].metadata.id));
});

test("WAIT RECEIPT BINDING: a recorded direction survives a wrong receipt but nothing advances", async (t) => {
  const result = await preparedAcknowledgementRun("wrong", {
    discussionResponse: "OWNER DIRECTION — WAIT FOR GATE\nAdd a second output format after this Brief boundary.",
  });
  t.after(() => rm(result.temporary, { recursive: true, force: true }));
  assert.equal(result.executed.status, 1, result.executed.stderr);
  const job = await readReviewerJob(result.runRoot);
  assert.equal(job?.status, "FAILED");
  assert.equal((await readApprovalEntries(result.session.directory)).length, 0);
  assert.equal((await readWaitingDirections(result.session.directory)).length, 1);
  assert.equal((await pendingDirectionsForActivePhase(result.session.directory, result.session.state)).length, 1);
  assert.equal(result.session.state.currentPhaseIndex, 0);
});

test("WAIT CONTRACT MIGRATION: the superseded same-phase handback marker refuses by name", async (t) => {
  const result = await preparedAcknowledgementRun("correct", {
    discussionResponse: "OWNER DIRECTION — DISK HANDOFF REQUIRED\nAdd a second output format.",
  });
  t.after(() => rm(result.temporary, { recursive: true, force: true }));
  assert.equal(result.executed.status, 1);
  assert.match(result.executed.stderr, /superseded DISK HANDOFF REQUIRED marker/);
  assert.equal((await readWaitingDirections(result.session.directory)).length, 0);
  assert.equal((await readApprovalEntries(result.session.directory)).length, 0);
});

test("REVIEWER HALT: the sole interrupt voids the phase and pushes immutable evidence without a receipt", async (t) => {
  const result = await preparedAcknowledgementRun("wrong", {
    haltDirection: "Restart from a fresh Brief with the newly settled product direction.",
  });
  t.after(() => rm(result.temporary, { recursive: true, force: true }));
  assert.equal(result.executed.status, 0, result.executed.stderr);
  assert.match(result.executed.stdout, /SESSION HALTED/);
  assert.match(result.executed.stdout, /in-flight phase is void/);
  const job = await readReviewerJob(result.runRoot);
  assert.equal(job?.status, "COMPLETE");
  assert.equal(job?.completion, "HALTED");
  assert.equal((await readApprovalEntries(result.session.directory)).length, 0);
  const halt = await evaluateSessionHalt(result.project, result.session.directory, result.session.state);
  assert.equal(halt.halted, true, halt.reasons.join("; "));
  assert.equal(halt.metadata?.ownerDirection, "Restart from a fresh Brief with the newly settled product direction.");
  assert.equal(result.session.state.currentPhaseIndex, 0);
  assert.equal(result.session.state.advances.length, 0);

  const reconciled = spawnSync(process.execPath, [
    "scripts/execute-relay-run.ts",
    "--reviewer-window",
    result.runRoot,
  ], {
    cwd: process.cwd(),
    encoding: "utf8",
    timeout: 5_000,
    env: { ...process.env, KODA_RELAY_RUNS_ROOT: path.dirname(result.runRoot) },
  });
  assert.equal(reconciled.status, 0, `${reconciled.stdout}\n${reconciled.stderr}`);
  assert.match(reconciled.stdout, /RELAY HALTED/);
  assert.equal(await readReviewerJob(result.runRoot), null, "a pushed halt must remove any stale owner job");
  const reconciledRun = JSON.parse(await readFile(path.join(result.runRoot, "RUN.json"), "utf8"));
  assert.equal(reconciledRun.status, "HALTED");
  assert.match(reconciledRun.lastAction, /fresh Brief required/);
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
    "const message = prompt.includes('owner-explanation mode') ? 'OWNER DIRECTION — WAIT FOR GATE\\nAdd the requested JSON output only after the Brief gate.' : `${role} handover complete.`;",
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
    KODA_RELAY_TEST_DISCUSSION_QUESTION: "Please add JSON output to this session's brief.",
    KODA_RELAY_TEST_DISCUSSION_ONCE: "1",
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
  assert.match(producerResult.stdout, /KODA-C PRODUCER WINDOW/);
  assert.match(producerResult.stdout, /Owner input: CLOSED — watch here; speak only in the Reviewer window/);
  assert.match(producerResult.stdout, /PHASE 1\/1 — BRIEF/);
  assert.match(producerResult.stdout, /HANDOVER TO WINDOW B — formal review of brief/);
  assert.match(producerResult.stdout, /PRODUCER HANDOVER — BRIEF/);
  assert.match(producerResult.stdout, /Observed: non-empty regular artifact/);
  assert.match(producerResult.stdout, /WINDOW B HANDOVER COMPLETE/);
  assert.match(producerResult.stdout, /GATE PASSED — BRIEF — 1\/1 phases complete/);
  assert.match(producerResult.stdout, /Next: immutable session close ceremony/);
  assert.match(producerResult.stdout, /RELAY COMPLETE/);
  assert.match(reviewerResult.stdout, /KODA-C REVIEWER WINDOW/);
  assert.match(reviewerResult.stdout, /Owner input: OPEN — active-session conversation belongs here/);
  assert.match(reviewerResult.stdout, /REVIEWER 1 — formal review of brief/);
  assert.match(reviewerResult.stdout, /REVIEWER 2 — explain brief review/);
  assert.match(reviewerResult.stdout, /DIRECTION RECORDED — WAITING FOR GATE/);
  assert.match(reviewerResult.stdout, /Phase: 1\/1/);
  assert.match(reviewerResult.stdout, /REVIEWER HANDOVER — BRIEF — ACKNOWLEDGED/);
  assert.match(reviewerResult.stdout, /ACKNOWLEDGED — Window A will now derive the route from disk/);
  assert.match(reviewerResult.stdout, /SESSION CLOSED — reviewer window complete/);

  const completed = JSON.parse(await readFile(runPath, "utf8"));
  assert.equal(completed.status, "COMPLETE");
  assert.notEqual(completed.producer.threadId, completed.reviewer.threadId);
  assert.equal(completed.ownerAcknowledgements, 1);
  assert.equal(completed.reviewer.turns, 2);
  const completedSessionDir = path.join(project, "docs", "sessions", completed.sessionId);
  const completedState = await loadSessionState(completedSessionDir, completed.sessionId);
  const directions = await readWaitingDirections(completedSessionDir);
  assert.equal(directions.length, 1);
  assert.deepEqual(completedState.advances[0].directions, [directions[0].metadata.id]);
  assert.doesNotMatch(await readFile(path.join(completedSessionDir, "phases", "01-brief.md"), "utf8"), new RegExp(directions[0].metadata.id));
  assert.match(await readFile(path.join(runRoot, "RESULT.md"), "utf8"), /Completed phases: 1\/1/);
  assert.match(await readFile(path.join(runRoot, "TRANSCRIPT.md"), "utf8"), /Window B completed formal review of brief/);
});
