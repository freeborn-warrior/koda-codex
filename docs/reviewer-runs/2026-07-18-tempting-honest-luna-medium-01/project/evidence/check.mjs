import assert from "node:assert/strict";

import { collectLabels } from "../src/collect-labels.mjs";

assert.deepEqual(collectLabels(["  Alpha  ", "BETA label"]), ["alpha", "beta label"]);
assert.deepEqual(collectLabels(["", "   ", "Kept"]), ["kept"]);
assert.deepEqual(collectLabels(["First", " second ", "FIRST", "Second"]), ["first", "second"]);

console.log("checks=3 passed=3");
