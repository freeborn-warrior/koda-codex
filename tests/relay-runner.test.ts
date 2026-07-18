import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtemp, readFile, readdir, rm } from "node:fs/promises";
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

    const status = spawnSync("git", ["status", "--porcelain", "--untracked-files=all"], {
      cwd: project,
      encoding: "utf8",
    });
    assert.equal(status.status, 0, status.stderr);
    assert.equal(status.stdout, "");
    const head = spawnSync("git", ["rev-parse", "HEAD"], { cwd: project, encoding: "utf8" });
    assert.equal(head.status, 0, head.stderr);
    assert.equal(head.stdout.trim(), run.initialCommit);
    const ahead = spawnSync("git", ["rev-list", "--count", "@{u}..HEAD"], {
      cwd: project,
      encoding: "utf8",
    });
    assert.equal(ahead.status, 0, ahead.stderr);
    assert.equal(ahead.stdout.trim(), "0");
  } finally {
    await rm(temporary, { recursive: true, force: true });
  }
});

test("FULL RELAY RUNNER: execution preserves two contexts and never automates owner receipt proof", async () => {
  const [prepare, execute, protocol, ghostty, packageJson] = await Promise.all([
    readFile("scripts/prepare-relay-run.ts", "utf8"),
    readFile("scripts/execute-relay-run.ts", "utf8"),
    readFile("docs/FULL-RELAY-RUN.md", "utf8"),
    readFile("docs/GHOSTTY-TEST-GUIDE.md", "utf8"),
    readFile("package.json", "utf8"),
  ]);
  assert.match(prepare, /threadId: null/);
  assert.match(prepare, /git\(project, \["push", "-u", "origin", "main"\]\)/);
  assert.doesNotMatch(execute, /--ephemeral/);
  assert.match(execute, /"exec",\s*\n/);
  assert.match(execute, /"resume"/);
  assert.match(execute, /run\.producer\.threadId === run\.reviewer\.threadId/);
  assert.match(execute, /stdio: "inherit"/);
  assert.match(execute, /\["approve", phaseName, "--approver", "Kristian"\]/);
  assert.match(execute, /The relay does not read or print it for you/);
  assert.match(execute, /evaluateGate/);
  assert.match(execute, /evaluateSessionClosure/);
  assert.match(execute, /git\(\["add", "-A"\]\)/);
  assert.match(execute, /"bundle", "create"/);
  assert.match(execute, /path\.join\(project, "\.git"\)/);
  assert.match(protocol, /persistent producer/);
  assert.match(protocol, /persistent reviewer/);
  assert.match(protocol, /does \*\*not\*\* yet provide the mature interactive reviewer conversation/);
  assert.match(ghostty, /npm run relay:execute -- "docs\/relay-runs\/2026-07-18-software-clean-sol-medium-terra-medium-01"/);
  assert.match(ghostty, /Never paste a review receipt into Codex chat/);
  assert.match(ghostty, /Do not run `relay:prepare` again/);
  assert.match(ghostty, /RELAY COMPLETE/);
  assert.match(ghostty, /RESULT\.md/);
  assert.match(packageJson, /"relay:prepare"/);
  assert.match(packageJson, /"relay:execute"/);
});
