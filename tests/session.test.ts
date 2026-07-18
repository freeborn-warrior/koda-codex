import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { mkdtemp } from "node:fs/promises";
import test from "node:test";

import { checkSessionClosed } from "../src/git.ts";
import { createSession, saveSessionState, writeJsonAtomic } from "../src/project.ts";
import { DEFAULT_CONFIG } from "../src/config.ts";
import { projectHarness } from "./helpers.ts";

test("session creation requires a prompt and numbers dated folders", async (t) => {
  const h = await projectHarness(t);
  await assert.rejects(() => createSession(h.root, h.config, " \n"), /non-empty/);
  const second = await createSession(h.root, h.config, "# Another session purpose\n");
  assert.match(h.session.id, /^\d{4}-\d{2}-\d{2}-01$/);
  assert.match(second.id, /^\d{4}-\d{2}-\d{2}-02$/);
  assert.equal(second.state.currentPhaseIndex, 0);
});

test("a completed session is closed only after its state is committed and pushed", async (t) => {
  const parent = await mkdtemp(path.join(tmpdir(), "koda-close-test-"));
  t.after(async () => rm(parent, { recursive: true, force: true }));
  const root = path.join(parent, "project");
  const remote = path.join(parent, "remote.git");
  await mkdir(root);
  await writeJsonAtomic(path.join(root, "koda.config.json"), { ...DEFAULT_CONFIG, phases: DEFAULT_CONFIG.phases.slice(0, 1) });
  await mkdir(path.join(root, DEFAULT_CONFIG.sessionsDir), { recursive: true });
  const session = await createSession(root, { ...DEFAULT_CONFIG, phases: DEFAULT_CONFIG.phases.slice(0, 1) }, "# Prompt\n");
  session.state.currentPhaseIndex = session.state.phases.length;
  await saveSessionState(session.directory, session.state);

  execFileSync("git", ["init", "--bare", remote]);
  execFileSync("git", ["init", "-b", "main"], { cwd: root });
  execFileSync("git", ["config", "user.name", "Koda Test"], { cwd: root });
  execFileSync("git", ["config", "user.email", "koda@example.invalid"], { cwd: root });
  execFileSync("git", ["add", "."], { cwd: root });
  execFileSync("git", ["commit", "-m", "complete session"], { cwd: root });
  execFileSync("git", ["remote", "add", "origin", remote], { cwd: root });
  execFileSync("git", ["push", "-u", "origin", "main"], { cwd: root });

  assert.deepEqual(checkSessionClosed(root, session.directory, true), { closed: true, reasons: [] });
  await writeFile(path.join(session.directory, "state.json"), "{}\n", "utf8");
  const changed = checkSessionClosed(root, session.directory, true);
  assert.equal(changed.closed, false);
  assert(changed.reasons.includes("The session has uncommitted changes."));
});
