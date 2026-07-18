import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

import { parseCloseArtifact, sessionDigest } from "../src/close.ts";
import { validateSessionState } from "../src/project.ts";

test("the committed dogfood snapshot contains a complete, internally bound close", async () => {
  const project = path.resolve("docs/dogfood/project");
  const session = path.join(project, "docs", "sessions", "2026-07-18-01");
  const state = validateSessionState(JSON.parse(await readFile(path.join(session, "state.json"), "utf8")), "2026-07-18-01");
  const close = parseCloseArtifact(await readFile(path.join(session, "close.md"), "utf8"));
  assert(close);
  assert.equal(state.currentPhaseIndex, state.phases.length);
  assert.equal(state.advances.length, state.phases.length);
  assert.equal(close.finalReviewId, state.advances.at(-1)!.reviewId);
  assert.equal(close.finalReceipt, state.advances.at(-1)!.receipt);
  assert.equal(close.sessionSha256, await sessionDigest(session));

  const transcript = await readFile("docs/dogfood/TRANSCRIPT.md", "utf8");
  assert.match(transcript, /GATE CLOSED — BRIEF/);
  assert.match(transcript, /GATE OPEN — BRIEF/);
  assert.match(transcript, /CLOSE PREPARED .* NOT CLOSED/);
  assert.match(transcript, /SESSION NOT CLOSED[\s\S]*no pushed upstream branch/);
  assert.match(transcript, /SESSION CLOSED[\s\S]*immutable close committed/);
});
