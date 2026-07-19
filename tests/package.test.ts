import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { cp, readFile, stat } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

import { temporaryRoot } from "./helpers.ts";

async function binarySnapshot(root: string) {
  const binary = path.join(root, "dist", "cli.js");
  const metadata = await stat(binary);
  return {
    content: await readFile(binary, "utf8"),
    executable: metadata.mode & 0o111,
  };
}

test("PACKAGED NPX SUITE: the source-controlled binary is executable before npm touches it", async () => {
  const snapshot = await binarySnapshot(path.resolve("."));
  assert.notEqual(snapshot.executable, 0, "dist/cli.js must be committed with its executable bit set");
});

test("PACKAGED NPX SUITE: the documented local npx command does not mutate its checkout", async (t) => {
  const temporary = await temporaryRoot(t, "koda-local-npx-test-");
  const project = path.join(temporary, "repo");
  const cache = path.join(temporary, "npm-cache");
  await cp(path.resolve("."), project, {
    recursive: true,
    filter: (source) => !source.includes(`${path.sep}.git${path.sep}`)
      && !source.endsWith(`${path.sep}.git`)
      && !source.includes(`${path.sep}node_modules${path.sep}`)
      && !source.endsWith(`${path.sep}node_modules`),
  });

  const before = await binarySnapshot(project);
  const executed = spawnSync("npx", ["--yes", ".", "--help"], {
    cwd: project,
    encoding: "utf8",
    env: { ...process.env, npm_config_cache: cache },
  });
  assert.equal(executed.status, 0, executed.stderr);
  assert.match(executed.stdout, /Koda — a disk-backed workflow where review proof controls advancement/);
  assert.deepEqual(await binarySnapshot(project), before,
    "npx changed the content or executable state of the checked-out binary");
});

test("PACKAGED NPX SUITE: a real tarball installs and runs the plain-JavaScript koda binary", async (t) => {
  const temporary = await temporaryRoot(t, "koda-package-test-");
  const project = path.join(temporary, "repo");
  const cache = path.join(temporary, "npm-cache");
  const environment = { ...process.env, npm_config_cache: cache };
  await cp(path.resolve("."), project, {
    recursive: true,
    filter: (source) => !source.includes(`${path.sep}.git${path.sep}`)
      && !source.endsWith(`${path.sep}.git`)
      && !source.includes(`${path.sep}node_modules${path.sep}`)
      && !source.endsWith(`${path.sep}node_modules`),
  });
  const packed = spawnSync("npm", ["pack", "--silent", "--pack-destination", temporary], {
    cwd: project,
    encoding: "utf8",
    env: environment,
  });
  assert.equal(packed.status, 0, packed.stderr);
  const filename = packed.stdout.trim().split("\n").at(-1);
  assert(filename, "npm pack did not report a tarball filename");

  const tarball = path.join(temporary, filename);
  const executed = spawnSync("npm", [
    "exec",
    "--yes",
    `--package=${tarball}`,
    "--",
    "koda",
    "--help",
  ], {
    cwd: temporary,
    encoding: "utf8",
    env: environment,
  });
  assert.equal(executed.status, 0, executed.stderr);
  assert.match(executed.stdout, /Koda — a disk-backed workflow where review proof controls advancement/);
  assert.match(executed.stdout, /koda advance/);

  const guideHelp = spawnSync("npm", [
    "exec",
    "--yes",
    `--package=${tarball}`,
    "--",
    "koda",
    "guide",
    "--help",
  ], {
    cwd: temporary,
    encoding: "utf8",
    env: environment,
  });
  assert.equal(guideHelp.status, 0, guideHelp.stderr);
  assert.match(guideHelp.stdout, /Koda Guide — disk-backed continuity between Koda sessions/);

  const demo = path.join(temporary, "demo-project");
  const initialized = spawnSync("npm", [
    "exec",
    "--yes",
    `--package=${tarball}`,
    "--",
    "koda",
    "init",
    demo,
    "--demo",
  ], {
    cwd: temporary,
    encoding: "utf8",
    env: environment,
  });
  assert.equal(initialized.status, 0, initialized.stderr);
  const printedAdvance = initialized.stdout.split("\n").map((line) => line.trim()).find((line) =>
    line.includes("dist/cli.js") && line.endsWith("'advance'")
  );
  assert(printedAdvance, `Installed package did not print a dist/cli.js recovery command:\n${initialized.stdout}`);
  const refused = spawnSync(printedAdvance, {
    cwd: demo,
    encoding: "utf8",
    shell: true,
    env: environment,
  });
  assert.equal(refused.status, 2, refused.stderr);
  assert.match(refused.stdout, /GATE CLOSED — BRIEF/);
  assert.match(refused.stdout, /Nothing advanced/);
});
