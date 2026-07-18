import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

test("FULL RELAY RUNNER: preparation creates a clean pushed project with local skills", async () => {
  const temporary = await mkdtemp(path.join(tmpdir(), "koda-relay-prepare-"));
  try {
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
    assert.match(prepared.stdout, /Test preparation complete; execution is intentionally disabled/);

    const folders = await readdir(temporary);
    assert.equal(folders.length, 1);
    const runRoot = path.join(temporary, folders[0]);
    const project = path.join(runRoot, "project");
    const run = JSON.parse(await readFile(path.join(runRoot, "RUN.json"), "utf8")) as {
      status: string;
      initialCommit: string;
      runtime: string;
      producer: { threadId: string | null };
      reviewer: { threadId: string | null };
    };
    assert.equal(run.status, "PREPARED");
    assert.equal(run.runtime, "project/.runtime");
    assert.equal(run.producer.threadId, null);
    assert.equal(run.reviewer.threadId, null);

    const skills = (await readdir(path.join(project, ".agents", "skills"))).sort();
    assert.deepEqual(skills, [
      "koda-c-brief",
      "koda-c-close",
      "koda-c-live",
      "koda-c-orient",
      "koda-c-plan",
      "koda-c-produce",
      "koda-c-review",
      "koda-c-session",
      "koda-c-summary",
    ]);
    for (const name of skills) {
      const files = await readdir(path.join(project, ".agents", "skills", name), { recursive: true });
      assert.equal(files.includes(".DS_Store"), false, `${name} copied macOS metadata`);
    }

    const status = spawnSync("git", ["status", "--porcelain", "--untracked-files=all"], {
      cwd: project,
      encoding: "utf8",
    });
    assert.equal(status.status, 0, status.stderr);
    assert.equal(status.stdout, "");
    assert.match(await readFile(path.join(project, ".gitignore"), "utf8"), /^\.DS_Store$/m);
    const head = spawnSync("git", ["rev-parse", "HEAD"], { cwd: project, encoding: "utf8" });
    assert.equal(head.status, 0, head.stderr);
    assert.equal(head.stdout.trim(), run.initialCommit);
    const ahead = spawnSync("git", ["rev-list", "--count", "@{u}..HEAD"], {
      cwd: project,
      encoding: "utf8",
    });
    assert.equal(ahead.status, 0, ahead.stderr);
    assert.equal(ahead.stdout.trim(), "0");

    const sessionId = "2026-07-18-01";
    const session = path.join(project, "docs", "sessions", sessionId);
    await mkdir(path.join(session, "reviews"), { recursive: true });
    await writeFile(path.join(session, "state.json"), `${JSON.stringify({
      currentPhaseIndex: 0,
      phases: [{ name: "brief" }],
    }, null, 2)}\n`, "utf8");
    const receipt = "RECEIPT: Review read — sealed-test-id";
    await writeFile(path.join(session, "reviews", "01-brief-review.md"), [
      "VERDICT: APPROVE",
      "",
      "# Peer review — brief",
      "",
      "## Findings",
      "",
      "- The bounded artifact is supported by its cited evidence.",
      "",
      receipt,
      "",
    ].join("\n"), "utf8");
    await writeFile(path.join(runRoot, "RUN.json"), `${JSON.stringify({
      ...run,
      status: "AWAITING_OWNER_RECEIPT",
      sessionId,
    }, null, 2)}\n`, "utf8");
    const clipboard = path.join(temporary, "clipboard.txt");
    const reviewed = spawnSync(process.execPath, ["scripts/read-relay-review.ts"], {
      cwd: process.cwd(),
      encoding: "utf8",
      env: {
        ...process.env,
        KODA_RELAY_RUNS_ROOT: temporary,
        KODA_RELAY_REVIEW_PAGER: "/usr/bin/true",
        KODA_RELAY_TEST_CLIPBOARD_FILE: clipboard,
      },
    });
    assert.equal(reviewed.status, 0, reviewed.stderr);
    assert.doesNotMatch(reviewed.stdout, /RECEIPT:/);
    assert.match(reviewed.stdout, /Receipt copied/);
    assert.equal(await readFile(clipboard, "utf8"), receipt);
  } finally {
    await rm(temporary, { recursive: true, force: true });
  }
});

test("FULL RELAY RUNNER: execution preserves two contexts and never automates owner receipt proof", async () => {
  const [prepare, execute, reviewerWindow, reviewHelper, reviewerExecute, protocol, ghostty, packageJson] = await Promise.all([
    readFile("scripts/prepare-relay-run.ts", "utf8"),
    readFile("scripts/execute-relay-run.ts", "utf8"),
    readFile("scripts/run-relay-reviewer-window.ts", "utf8"),
    readFile("scripts/read-relay-review.ts", "utf8"),
    readFile("scripts/execute-reviewer-run.ts", "utf8"),
    readFile("docs/FULL-RELAY-RUN.md", "utf8"),
    readFile("docs/GHOSTTY-TEST-GUIDE.md", "utf8"),
    readFile("package.json", "utf8"),
  ]);
  assert.match(prepare, /threadId: null/);
  assert.match(prepare, /git\(project, \["push", "-u", "origin", "main"\]\)/);
  assert.match(prepare, /mkdir\(runRoot, \{ recursive: false \}\)/);
  assert.doesNotMatch(execute, /--ephemeral/);
  assert.match(execute, /"exec",\s*\n/);
  assert.match(execute, /"resume"/);
  assert.match(execute, /'sandbox_mode="workspace-write"'/);
  assert.match(execute, /\? \[\.\.\.base, "resume", \.\.\.common/);
  assert.match(execute, /run\.producer\.threadId === run\.reviewer\.threadId/);
  assert.match(execute, /stdio: "inherit"/);
  assert.match(execute, /\["approve", phaseName, "--approver", "Kristian"\]/);
  assert.match(execute, /The relay does not read or print it for you/);
  assert.match(execute, /evaluateGate/);
  assert.match(execute, /evaluateSessionClosure/);
  assert.match(execute, /dispatchReviewerWindowJob/);
  assert.match(execute, /AWAITING_REVIEWER_WINDOW/);
  assert.match(execute, /renderCodexEvent/);
  assert.match(execute, /recoverCompletedReviewerJob/);
  assert.match(execute, /readApprovalEntries\(session\.directory\)/);
  assert.match(execute, /git\(\["add", "-A"\]\)/);
  assert.match(execute, /git\(\["add", relativeSession\]\)/);
  assert.match(execute, /`close session \$\{session\.id\}`/);
  assert.match(execute, /workspace-write intentionally protects `\.git`/);
  assert.match(execute, /verify immutable session close/);
  assert.match(execute, /"bundle", "create"/);
  assert.match(execute, /path\.join\(project, "\.git"\)/);
  assert.match(execute, /const project = await realpath\(projectCandidate\)/);
  assert.match(execute, /trusted Koda CLI/);
  assert.match(reviewHelper, /run\.status !== "AWAITING_OWNER_RECEIPT"/);
  assert.match(reviewHelper, /candidates\.length > 1/);
  assert.match(reviewHelper, /after\.hash !== before\.hash/);
  assert.match(reviewHelper, /spawnSync\("pbcopy"/);
  assert.doesNotMatch(reviewHelper, /console\.log\(after\.receipt/);
  assert.match(reviewHelper, /project path resolves outside the relay run/);
  assert.match(reviewHelper, /must be a regular file inside the active session/);
  assert.match(reviewerExecute, /Reviewer project resolves outside its prepared run folder/);
  assert.match(reviewerWindow, /acquireReviewerWindow/);
  assert.match(reviewerWindow, /stdio: \["ignore", "pipe", "pipe"\]/);
  assert.match(reviewerWindow, /parseReview\(before\)/);
  assert.match(reviewerWindow, /"approve", job\.phase, "--approver", "Kristian"/);
  assert.match(reviewerWindow, /The exact receipt is copied/);
  assert.match(reviewerWindow, /owner-explanation mode/);
  assert.match(reviewerWindow, /OWNER_DIRECTION_HANDOFF_REQUIRED/);
  assert.match(protocol, /persistent producer/);
  assert.match(protocol, /persistent reviewer/);
  assert.match(protocol, /first owner-facing slice/);
  assert.match(protocol, /not yet conversational while the producer is working/);
  assert.match(protocol, /explicitly send new direction as a bound owner handback/);
  assert.match(ghostty, /npm run relay:producer\n/);
  assert.match(ghostty, /npm run relay:reviewer\n/);
  assert.match(ghostty, /Never paste a review receipt into Codex chat/);
  assert.match(ghostty, /RELAY COMPLETE/);
  assert.match(ghostty, /RESULT\.md/);
  assert.match(packageJson, /"relay:prepare"/);
  assert.match(packageJson, /"relay:execute"/);
  assert.match(packageJson, /"relay:producer"/);
  assert.match(packageJson, /"relay:reviewer"/);
  assert.match(packageJson, /"relay:status"/);
  assert.match(packageJson, /"relay:review"/);
});

test("GENUINE FULL RELAY EVIDENCE: six phases, revision recovery, distinct contexts, and pushed close", async () => {
  const runRoot = path.join(
    process.cwd(),
    "docs",
    "relay-runs",
    "2026-07-18-software-clean-sol-medium-terra-medium-01",
  );
  const session = path.join(runRoot, "project", "docs", "sessions", "2026-07-18-01");
  const [runText, result, gitText, stateText, approvals, transcript, close, blockingReview] = await Promise.all([
    readFile(path.join(runRoot, "RUN.json"), "utf8"),
    readFile(path.join(runRoot, "RESULT.md"), "utf8"),
    readFile(path.join(runRoot, "GIT-EVIDENCE.json"), "utf8"),
    readFile(path.join(session, "state.json"), "utf8"),
    readFile(path.join(session, "approvals.md"), "utf8"),
    readFile(path.join(runRoot, "TRANSCRIPT.md"), "utf8"),
    readFile(path.join(session, "close.md"), "utf8"),
    readFile(
      path.join(session, "reviews", "history", "06-summary-review-1ffa6120-fb4e-4c21-89de-1a6359223ed8.md"),
      "utf8",
    ),
  ]);
  const run = JSON.parse(runText) as {
    status: string;
    sessionId: string;
    ownerAcknowledgements: number;
    finalCommit: string;
    producer: { threadId: string; turns: number };
    reviewer: { threadId: string; turns: number };
  };
  const gitEvidence = JSON.parse(gitText) as {
    head: string;
    remoteHead: string;
    aheadCount: number;
    projectStatus: string;
    kodaStatus: string;
  };
  const state = JSON.parse(stateText) as { currentPhaseIndex: number; phases: unknown[]; advances: unknown[] };

  assert.equal(run.status, "COMPLETE");
  assert.equal(run.sessionId, "2026-07-18-01");
  assert.notEqual(run.producer.threadId, run.reviewer.threadId);
  assert.equal(run.producer.turns, 11);
  assert.equal(run.reviewer.turns, 7);
  assert.equal(run.ownerAcknowledgements, 7);
  assert.equal(state.currentPhaseIndex, 6);
  assert.equal(state.phases.length, 6);
  assert.equal(state.advances.length, 6);
  assert.equal((approvals.match(/<!-- KODA_APPROVAL /g) ?? []).length, 7);
  assert.match(blockingReview, /^VERDICT: REVISE$/m);
  assert.match(close, /<!-- KODA_CLOSE /);
  assert.match(result, /Status: COMPLETE/);
  assert.match(result, /Completed phases: 6\/6/);
  assert.match(result, /Owner acknowledgements: 7/);
  assert.equal(gitEvidence.head, run.finalCommit);
  assert.equal(gitEvidence.remoteHead, run.finalCommit);
  assert.equal(gitEvidence.aheadCount, 0);
  assert.equal(gitEvidence.projectStatus, "");
  assert.match(gitEvidence.kodaStatus, /SESSION CLOSED/);
  assert.match(transcript, /producer turn 9: revise summary/);
  assert.match(transcript, /supervisor close commit and push/);
  assert.match(transcript, /Producer \/ reviewer threads remained distinct: true/);

  await assert.rejects(readdir(path.join(runRoot, "project", ".git")), { code: "ENOENT" });
  await assert.rejects(readdir(path.join(runRoot, "project", ".runtime")), { code: "ENOENT" });
  const verified = spawnSync("git", ["bundle", "verify", path.join(runRoot, "PROJECT-HISTORY.bundle")], {
    cwd: process.cwd(),
    encoding: "utf8",
  });
  assert.equal(verified.status, 0, verified.stderr);
  assert.match(`${verified.stdout}${verified.stderr}`, /complete history/);
});
