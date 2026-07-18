import assert from "node:assert/strict";
import test from "node:test";

import { DEFAULT_CONFIG, validateConfig } from "../src/config.ts";

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
