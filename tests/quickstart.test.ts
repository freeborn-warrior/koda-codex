import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { chmod, lstat, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

import { performGuideLaunchChoice } from "../src/guide-console.ts";
import { runGuideCli } from "../src/guide-commands.ts";
import type { GhosttyWindowRequest } from "../src/ghostty.ts";
import { temporaryRoot } from "./helpers.ts";

test("FULL-SESSION QUICK START: one command creates a pushed project and numbered Guide launch", async (t) => {
  const parent = await temporaryRoot(t, "koda-full-session-quickstart-");
  const project = path.join(parent, "project");
  const hostileGitDirectory = path.join(parent, "ambient-git-dir");
  const hostileGitIndex = path.join(parent, "ambient-git-index");
  const permissionLog = path.join(parent, "permission-preflight.log");
  const fakeCodex = path.join(parent, "codex");
  await writeFile(fakeCodex, [
    "#!/bin/sh",
    "for argument do if [ ${#argument} -ge 2000 ]; then echo 'permission argument exceeded safe installed-client ceiling' >&2; exit 40; fi; done",
    "case \" $* \" in *'filesystem.\":workspace_roots\"'*) echo 'quoted dotted profile refused' >&2; exit 41 ;; esac",
    "case \" $* \" in *'filesystem={ \"'*' = \"read\"'*' sandbox -P '*' -- /usr/bin/true'*) ;; *) echo 'profile was not instantiated offline' >&2; exit 42 ;; esac",
    `printf '%s\\n' \"$*\" >> ${JSON.stringify(permissionLog)}`,
    "printf '%s\\n' 'codex-cli fixture'",
  ].join("\n"), "utf8");
  await chmod(fakeCodex, 0o700);
  const result = spawnSync(process.execPath, [
    path.resolve("scripts/prepare-full-session-demo.ts"),
    "--confirm",
    "--owner", "Fixture Owner",
    "--directory", project,
  ], {
    cwd: path.resolve("."),
    encoding: "utf8",
    env: {
      ...process.env,
      GIT_DIR: hostileGitDirectory,
      GIT_INDEX_FILE: hostileGitIndex,
      KODA_CODEX_BIN: fakeCodex,
    },
  });
  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  assert.match(result.stdout, /READY — FULL SESSION/);
  assert.match(result.stdout, /confirmed, committed, pushed, and mechanically verified/);
  const permissionCalls = await readFile(permissionLog, "utf8");
  assert.match(permissionCalls, /default_permissions="koda_guide"/);
  assert.match(permissionCalls, /default_permissions="koda_project"/);
  assert.match(permissionCalls, /default_permissions="koda_guide"[\s\S]*sandbox -P koda_guide -- \/usr\/bin\/true/);
  assert.match(permissionCalls, /default_permissions="koda_project"[\s\S]*sandbox -P koda_project -- \/usr\/bin\/true/);
  assert.match(permissionCalls, /":workspace_roots" = \{ "\." = "read"/);
  assert.match(permissionCalls, /":workspace_roots" = \{ "\." = "write"/);
  assert.doesNotMatch(permissionCalls, /filesystem\.":workspace_roots"/);

  assert.equal(execFileSync("git", ["status", "--porcelain"], { cwd: project, encoding: "utf8" }), "");
  assert.equal(execFileSync("git", ["rev-list", "--left-right", "--count", "main...origin/main"], {
    cwd: project,
    encoding: "utf8",
  }).trim(), "0\t0");
  assert.equal(execFileSync("git", ["remote", "get-url", "origin"], { cwd: project, encoding: "utf8" }).trim(), ".runtime/remote.git");
  await assert.rejects(lstat(hostileGitDirectory), /ENOENT/);
  await assert.rejects(lstat(hostileGitIndex), /ENOENT/);
  assert.deepEqual(await readdir(path.join(project, "docs", "sessions")), [".gitkeep"]);
  assert.equal((await readdir(path.join(project, ".agents", "skills"))).filter((name) => name.startsWith("koda-c-")).length, 10);

  const verification: string[] = [];
  await runGuideCli(["verify"], project, { out(message) { verification.push(message); } });
  assert.match(verification.join("\n"), /READY TO LAUNCH/);

  const staffing = {
    producerModel: "gpt-5.6-sol",
    producerEffort: "medium",
    reviewerModel: "gpt-5.6-terra",
    reviewerEffort: "medium",
  };
  let requested: GhosttyWindowRequest[] = [];
  const choice = await performGuideLaunchChoice(project, "1", staffing, {
    async launch(root, assignments) {
      const output: string[] = [];
      await runGuideCli([
        "launch",
        "--producer-model", assignments.producerModel,
        "--producer-effort", assignments.producerEffort,
        "--reviewer-model", assignments.reviewerModel,
        "--reviewer-effort", assignments.reviewerEffort,
        "--open", "ghostty",
      ], root, { out(message) { output.push(message); } }, {
        async openGhostty(_project, prepared) {
          requested = [
            { role: "reviewer", title: "Koda-C Reviewer", args: [prepared.reviewerCommand] },
            { role: "producer", title: "Koda-C Producer", args: [prepared.producerCommand] },
          ];
          return requested;
        },
      });
      return { message: output.join("\n"), requests: requested };
    },
  });
  assert.equal(choice.handled, true);
  assert.deepEqual(choice.requests?.map((item) => item.role), ["reviewer", "producer"]);
  assert.match(choice.message!, /THREE-CONTEXT START REQUESTED/);
});
