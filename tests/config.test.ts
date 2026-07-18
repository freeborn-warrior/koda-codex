import assert from "node:assert/strict";
import { mkdir, symlink } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

import { DEFAULT_CONFIG, readProjectConfig, validateConfig } from "../src/config.ts";
import { writeJsonAtomic } from "../src/project.ts";
import { temporaryRoot } from "./helpers.ts";

test("the default phase chain is configurable data in the required order", () => {
  assert.deepEqual(DEFAULT_CONFIG.phases.map((phase) => phase.name), [
    "brief",
    "orient",
    "plan",
    "produce",
    "live",
    "summary",
  ]);
  assert.equal(validateConfig(DEFAULT_CONFIG), DEFAULT_CONFIG);
});

test("config validation rejects unsafe session paths and drifting phase names", () => {
  assert.throws(() => validateConfig({ ...DEFAULT_CONFIG, sessionsDir: "../outside" }), /relative path/);
  assert.throws(() => validateConfig({
    ...DEFAULT_CONFIG,
    phases: [{ name: "Brief Phase", description: "invalid" }],
  }), /phase name/);
  assert.throws(() => validateConfig({
    ...DEFAULT_CONFIG,
    phases: [DEFAULT_CONFIG.phases[0], DEFAULT_CONFIG.phases[0]],
  }), /Duplicate/);
});

test("config validation refuses a sessions directory that resolves outside the project", async (t) => {
  const parent = await temporaryRoot(t, "koda-config-symlink-");
  const root = path.join(parent, "project");
  const outside = path.join(parent, "outside-sessions");
  await mkdir(root);
  await mkdir(outside);
  await writeJsonAtomic(path.join(root, "koda.config.json"), DEFAULT_CONFIG);
  await mkdir(path.join(root, "docs"));
  await symlink(outside, path.join(root, "docs", "sessions"));

  await assert.rejects(() => readProjectConfig(root), /sessionsDir resolves outside the project root/);
});
