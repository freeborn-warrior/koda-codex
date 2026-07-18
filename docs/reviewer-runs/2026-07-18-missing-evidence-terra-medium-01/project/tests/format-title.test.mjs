import assert from "node:assert/strict";
import test from "node:test";

import { formatTitle } from "../src/format-title.mjs";

test("trims surrounding whitespace", () => assert.equal(formatTitle("  Alpha  "), "Alpha"));
test("collapses repeated internal whitespace", () => assert.equal(formatTitle("Alpha   Beta"), "Alpha Beta"));
test("preserves already formatted text", () => assert.equal(formatTitle("Alpha Beta"), "Alpha Beta"));
