import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import path from "node:path";
import test from "node:test";

import { temporaryRoot } from "./helpers.ts";

test("PACKAGED NPX SUITE: a real tarball installs and runs the plain-JavaScript koda binary", async (t) => {
  const temporary = await temporaryRoot(t, "koda-package-test-");
  const cache = path.join(temporary, "npm-cache");
  const environment = { ...process.env, npm_config_cache: cache };
  const packed = spawnSync("npm", ["pack", "--silent", "--pack-destination", temporary], {
    cwd: path.resolve("."),
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
  assert.match(executed.stdout, /Koda — phase gates with proof the review was read/);
  assert.match(executed.stdout, /koda advance/);

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
