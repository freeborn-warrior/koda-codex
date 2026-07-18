import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("the reviewer skill ships with one shared rule set and Codex metadata", async () => {
  const [skill, metadata] = await Promise.all([
    readFile("skills/peer-reviewer/SKILL.md", "utf8"),
    readFile("skills/peer-reviewer/agents/openai.yaml", "utf8"),
  ]);

  assert.match(skill, /^---\nname: peer-reviewer\ndescription: .+\n---/);
  for (const phase of ["Brief", "Orient", "Plan", "Produce", "Live", "Summary", "Custom phases"]) {
    assert.match(skill, new RegExp(`### ${phase}`));
  }
  assert.match(skill, /review is saved on disk/i);
  assert.match(skill, /Never place text after the receipt/);
  assert.equal(metadata.trimEnd().split("\n").length, 4);
  assert.match(metadata, /\$peer-reviewer/);
});
