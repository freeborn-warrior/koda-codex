import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const producerPhases = ["brief", "orient", "plan", "produce", "live", "summary"];
const skillNames = [
  "koda-c-session",
  ...producerPhases.map((phase) => `koda-c-${phase}`),
  "koda-c-review",
  "koda-c-close",
];

test("every Koda-C skill has valid relay sections and four-line Codex metadata", async () => {
  for (const name of skillNames) {
    const directory = path.join("skills", name);
    const [skill, metadata] = await Promise.all([
      readFile(path.join(directory, "SKILL.md"), "utf8"),
      readFile(path.join(directory, "agents", "openai.yaml"), "utf8"),
    ]);
    assert.match(skill, new RegExp(`^---\\nname: ${name}\\ndescription: .+\\n---`), name);
    assert.match(skill, /## ENTRY CHECK/, name);
    assert.match(skill, /## ITS OWN JOB/, name);
    assert.match(skill, /## HANDOVER OBLIGATION/, name);
    assert.doesNotMatch(skill, /TODO/, name);
    assert.equal(metadata.trimEnd().split("\n").length, 4, name);
    assert.match(metadata, new RegExp(`\\$${name}`), name);
  }
});

test("producer phase skills hand only to the one shared reviewer", async () => {
  for (const phase of producerPhases) {
    const skill = await readFile(`skills/koda-c-${phase}/SKILL.md`, "utf8");
    assert.match(skill, /Immediate receiver: `koda-c-review`/, phase);
    assert.match(skill, /currentPhaseIndex.*unchanged/s, phase);
    assert.match(skill, /Do not .*review|Do not create .*review/is, phase);
    assert.match(skill, /Inputs resolved during this phase|Owner decisions and resolved inputs/, phase);
  }
});

test("the shared reviewer keeps all phase criteria in one place", async () => {
  const review = await readFile("skills/koda-c-review/SKILL.md", "utf8");
  for (const phase of ["Brief", "Orient", "Plan", "Produce", "Live", "Summary", "Custom phases"]) {
    assert.match(review, new RegExp(`#### ${phase}`));
  }
  assert.match(review, /review does not activate another phase/i);
  assert.match(review, /Do not quote the receipt in chat/);

  for (const phase of producerPhases) {
    const producer = await readFile(`skills/koda-c-${phase}/SKILL.md`, "utf8");
    assert.doesNotMatch(producer, /Phase-specific criteria/);
  }
});

test("session open and close remain ceremonies outside producer phase routing", async () => {
  const [session, close] = await Promise.all([
    readFile("skills/koda-c-session/SKILL.md", "utf8"),
    readFile("skills/koda-c-close/SKILL.md", "utf8"),
  ]);
  assert.match(session, /currentPhaseIndex: 0/);
  assert.match(session, /first phase.*state\.json/i);
  assert.match(close, /Git must occur between close preparation and close verification/);
  assert.match(close, /immutable/i);
  assert.match(close, /`close\.md`/);
  assert.match(close, /writes nothing/);
});
