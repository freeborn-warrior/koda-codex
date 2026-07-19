import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const producerPhases = ["brief", "orient", "plan", "produce", "live", "summary"];
const historicalSessionSkillNames = [
  "koda-c-session",
  ...producerPhases.map((phase) => `koda-c-${phase}`),
  "koda-c-review",
  "koda-c-close",
];
const skillNames = ["koda-c-session-prompt", ...historicalSessionSkillNames];

test("every Koda-C skill has valid relay sections and four-line Codex metadata", async () => {
  for (const name of skillNames) {
    const directory = path.join(".agents", "skills", name);
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

test("skill index metadata stays concise, front-loaded, and trigger-specific", async () => {
  let totalDescriptionCharacters = 0;
  for (const name of skillNames) {
    const directory = path.join(".agents", "skills", name);
    const [skill, metadata] = await Promise.all([
      readFile(path.join(directory, "SKILL.md"), "utf8"),
      readFile(path.join(directory, "agents", "openai.yaml"), "utf8"),
    ]);
    const description = /^description: (.+)$/m.exec(skill)?.[1];
    assert(description, `${name} needs a one-line trigger description`);
    assert(description.length <= 220, `${name} description is too long for progressive disclosure`);
    assert.match(description, /^(Turn|Close|Exercise|Inspect|Convert|Create|Review|Open|Write)\b/, name);
    assert.match(description, /\bUse\b/, `${name} must state when it applies`);
    totalDescriptionCharacters += description.length;

    const short = /^  short_description: "(.+)"$/m.exec(metadata)?.[1];
    assert(short, `${name} needs UI discovery metadata`);
    assert(short.length <= 64, `${name} short description is too long`);
    assert.doesNotMatch(skill, /allowed-tools/i, `${name} must not imply unsupported tool restriction`);
  }
  assert(totalDescriptionCharacters <= 2000, "Koda-C must leave room in Codex's bounded skill index");
});

test("producer phase skills hand only to the one shared reviewer", async () => {
  for (const phase of producerPhases) {
    const skill = await readFile(`.agents/skills/koda-c-${phase}/SKILL.md`, "utf8");
    assert.match(skill, /Immediate receiver: `koda-c-review`/, phase);
    assert.match(skill, /currentPhaseIndex.*unchanged/s, phase);
    assert.match(skill, /Do not .*review|Do not create .*review/is, phase);
    assert.match(skill, /Inputs resolved during this phase|Owner decisions and resolved inputs/, phase);
  }
});

test("concurrent relay skills require bound session identity instead of latest-session guessing", async () => {
  for (const name of [...producerPhases.map((phase) => `koda-c-${phase}`), "koda-c-review", "koda-c-close"]) {
    const skill = await readFile(path.join(".agents", "skills", name, "SKILL.md"), "utf8");
    assert.match(skill, /KODA_SESSION_ID/, `${name} must require the supervisor-bound identity`);
    assert.match(skill, /never infer the latest session/i, `${name} must refuse recency-based selection`);
    assert.match(skill, /--session <session-id>/, `${name} must pass explicit identity to Koda commands`);
  }
  const session = await readFile(".agents/skills/koda-c-session/SKILL.md", "utf8");
  assert.match(session, /owner-confirmed Guide launch.*session kind, launch mode, and dependency IDs/is);
  assert.match(session, /Never infer independence because a kind name differs/i);
});

test("the shared reviewer keeps all phase criteria in one place", async () => {
  const review = await readFile(".agents/skills/koda-c-review/SKILL.md", "utf8");
  for (const phase of ["Brief", "Orient", "Plan", "Produce", "Live", "Summary", "Custom phases"]) {
    assert.match(review, new RegExp(`#### ${phase}`));
  }
  assert.match(review, /review does not activate another phase/i);
  assert.match(review, /Do not quote the receipt in chat/);
  assert.match(review, /Owner-explanation mode/);
  assert.match(review, /Owner-conversation mode/);
  assert.match(review, /OWNER DIRECTION — WAIT FOR GATE/);
  assert.match(review, /Never suggest pause-inject-resume/);
  assert.match(review, /GUIDE CONVERSATION — PROJECT SCOPE/);
  assert.match(review, /alter no file/i);

  for (const phase of producerPhases) {
    const producer = await readFile(`.agents/skills/koda-c-${phase}/SKILL.md`, "utf8");
    assert.doesNotMatch(producer, /Phase-specific criteria/);
  }
});

test("in-phase consultation is disk-backed and cannot impersonate formal review", async () => {
  const [protocol, review] = await Promise.all([
    readFile("docs/IN-PHASE-CONSULTATION.md", "utf8"),
    readFile(".agents/skills/koda-c-review/SKILL.md", "utf8"),
  ]);
  assert.match(protocol, /consultations\/<NN>-<phase>\/<CC>-request\.md/);
  assert.match(protocol, /OWNER DECISION REQUIRED/);
  assert.match(protocol, /producer never addresses or notifies the owner directly/i);
  assert.match(protocol, /persistent reviewer task/i);
  assert.match(protocol, /No chat-only handback/);
  assert.match(review, /In-phase consultation mode/);
  assert.match(review, /Do not choose a verdict/);
  assert.match(review, /owner never needs to enter the producer interface/i);
  assert.match(review, /Independence means the reviewer did not write the producer artifact/i);

  for (const phase of producerPhases) {
    const producer = await readFile(`.agents/skills/koda-c-${phase}/SKILL.md`, "utf8");
    assert.match(producer, /IN-PHASE-CONSULTATION\.md/, phase);
    assert.match(producer, /reviewer.*(?:evidence|technical|reviewability)|(?:evidence|technical|reviewability).*reviewer/is, phase);
    assert.match(producer, /owner.*product|product.*owner|product\/risk.*owner/is, phase);
    assert.match(producer, /Never address the owner directly/, phase);
  }
});

test("session open and close remain ceremonies outside producer phase routing", async () => {
  const [prompt, session, close] = await Promise.all([
    readFile(".agents/skills/koda-c-session-prompt/SKILL.md", "utf8"),
    readFile(".agents/skills/koda-c-session/SKILL.md", "utf8"),
    readFile(".agents/skills/koda-c-close/SKILL.md", "utf8"),
  ]);
  assert.match(prompt, /project-level perspective across many bounded sessions/i);
  assert.match(prompt, /Before drafting, editing, confirming, or launching.*run `koda guide status`/is);
  assert.match(prompt, /Dependent successor:.*If any is active or lacks pushed close\/halt evidence, refuse before drafting/is);
  assert.match(prompt, /Independent sibling:.*explicit owner\/Guide ruling.*`--independent`/is);
  assert.match(prompt, /Never infer independence from a different kind label/i);
  assert.match(prompt, /conceptually later idea is a dependent successor and waits; a genuinely independent sibling may proceed/i);
  assert.match(prompt, /owner-via-guide.*`koda direction wait --session <session-id>`/is);
  assert.match(prompt, /Repeat the disk preflight and relationship classification for every later session request/is);
  assert.match(prompt, /Kristian supplies intent, priorities, constraints, product judgments, and confirmation/is);
  assert.match(prompt, /Never ask him to relay a filesystem path, shell command, hash, commit ID, test count, receipt, or evidence location/is);
  assert.match(prompt, /verified toolkit capability and integrity-manifest hash/is);
  assert.match(prompt, /no toolkit-owned technical prerequisite has been mislabeled as an owner question/is);
  assert.match(prompt, /`koda guide verify` succeeds.*committed and pushed/is);
  assert.match(prompt, /READY TO LAUNCH[\s\S]*1\. Launch this session now[\s\S]*2\. Not now/is);
  assert.match(prompt, /Treat `1` as explicit launch authority.*Treat `2` as no mutation/is);
  assert.match(prompt, /SESSION RECOVERY READY/);
  assert.match(prompt, /koda guide recover --open ghostty/);
  assert.match(prompt, /Never ask Kristian to paste the recovery command/);
  assert.match(prompt, /Do not run `koda session new`/);
  assert.match(session, /currentPhaseIndex: 0/);
  assert.match(session, /first phase.*state\.json/i);
  assert.match(session, /owner-facing guide\/session-prompter/i);
  assert.match(session, /Never interview, notify, or address the owner/i);
  assert.match(close, /Git must occur between close preparation and close verification/);
  assert.match(close, /immutable/i);
  assert.match(close, /`close\.md`/);
  assert.match(close, /writes nothing/);
});

test("the session-prompt skill is the sole skill route to a future session launch", async () => {
  const prompt = await readFile(".agents/skills/koda-c-session-prompt/SKILL.md", "utf8");
  assert.match(prompt, /koda guide confirm <prompt-file> --owner Kristian/);
  for (const name of historicalSessionSkillNames) {
    const skill = await readFile(`.agents/skills/${name}/SKILL.md`, "utf8");
    assert.doesNotMatch(skill, /koda guide confirm|READY_TO_LAUNCH/, name);
  }
});

test("the fresh Guide preflight model run is sealed, blind, ephemeral, and read-only", async () => {
  const [contract, runner] = await Promise.all([
    readFile("docs/guide-preflight-runs/CONTRACT.md", "utf8"),
    readFile("scripts/run-guide-preflight-model-test.ts", "utf8"),
  ]);
  assert.match(contract, /Commit this file, the tested skill, and the runner before the first model run/);
  assert.match(contract, /A vague “not now” without the disk check is not a pass/);
  assert.match(contract, /block-everything task also fails the deterministic honest control/);
  assert.match(runner, /"--ephemeral"/);
  assert.match(runner, /"--ignore-user-config"/);
  assert.match(runner, /"--sandbox", "read-only"/);
  assert.match(runner, /Use \$koda-c-session-prompt\. I want to start a new session that is conceptually ahead/);
  assert.match(runner, /const before = await snapshot\(fixture\)/);
  assert.match(runner, /const after = await snapshot\(fixture\)/);
  assert.match(runner, /"docs", "toolkit-integrity\.json"/);
  assert.match(runner, /capability: "guide-preflight-fixture-v1"/);
  assert.match(runner, /Object\.values\(checks\)\.every\(Boolean\)/);
  assert.match(runner, /await mkdir\(destination\);/);
  assert.doesNotMatch(runner, /mkdir\(destination, \{ recursive: true \}\)/);
});

test("historical fresh Codex startup discovered the original nine local skills and root guidance without reading disk", async () => {
  const runRoot = "docs/discovery-runs/2026-07-18-fresh-codex-startup-01";
  const [runText, result, eventsText] = await Promise.all([
    readFile(path.join(runRoot, "RUN.json"), "utf8"),
    readFile(path.join(runRoot, "RESULT.md"), "utf8"),
    readFile(path.join(runRoot, "CODEX-EVENTS.jsonl"), "utf8"),
  ]);
  const run = JSON.parse(runText) as {
    status: string;
    ephemeral: boolean;
    ignoredUserConfig: boolean;
    sandbox: string;
    toolsPermittedByPrompt: boolean;
    repositoryReadsPermittedByPrompt: boolean;
    prompt: string;
  };
  assert.equal(run.status, "PASS");
  assert.equal(run.ephemeral, true);
  assert.equal(run.ignoredUserConfig, true);
  assert.equal(run.sandbox, "read-only");
  assert.equal(run.toolsPermittedByPrompt, false);
  assert.equal(run.repositoryReadsPermittedByPrompt, false);
  for (const name of historicalSessionSkillNames) assert.doesNotMatch(run.prompt, new RegExp(name));
  assert.doesNotMatch(run.prompt, /\b9\b/);

  const events = eventsText.trim().split("\n").map((line) => JSON.parse(line)) as Array<{
    type: string;
    item?: { type?: string; text?: string };
  }>;
  const toolEvents = events.filter((event) => event.item?.type && event.item.type !== "agent_message");
  assert.deepEqual(toolEvents, []);
  const answer = events.find((event) => event.item?.type === "agent_message")?.item?.text ?? "";
  const discovered = [...answer.matchAll(/\bkoda-c-[a-z]+\b/g)].map((match) => match[0]).sort();
  assert.deepEqual(discovered, [...historicalSessionSkillNames].sort());
  assert.match(answer, /Total: 9/);
  assert.match(answer, /\.agents\/skills\//);
  assert.match(answer, /never install Koda-C skills globally/i);
  assert.match(answer, /DISCOVERY_SOURCE: STARTUP_CONTEXT_ONLY/);
  assert.match(result, /Koda-C skills discovered from startup context: 9 of 9/);
  assert.match(result, /Tool calls: none/);
  assert.match(result, /Repository file reads: none/);
});

test("fresh Codex discovers all ten current skills and the active Guide preflight refuses without mutation", async () => {
  const discoveryRoot = "docs/discovery-runs/2026-07-19-fresh-codex-startup-02";
  const preflightRoot = "docs/guide-preflight-runs/2026-07-19-sol-medium-01";
  const [discoveryRunText, discoveryEventsText, discoveryResult, preflightRunText, preflightEvents, preflightResult] = await Promise.all([
    readFile(path.join(discoveryRoot, "RUN.json"), "utf8"),
    readFile(path.join(discoveryRoot, "CODEX-EVENTS.jsonl"), "utf8"),
    readFile(path.join(discoveryRoot, "RESULT.md"), "utf8"),
    readFile(path.join(preflightRoot, "RUN.json"), "utf8"),
    readFile(path.join(preflightRoot, "CODEX-EVENTS.jsonl"), "utf8"),
    readFile(path.join(preflightRoot, "RESULT.md"), "utf8"),
  ]);
  const discovery = JSON.parse(discoveryRunText) as {
    status: string;
    expectedSkills: string[];
    discoveredSkills: string[];
    toolEventCount: number;
  };
  assert.equal(discovery.status, "PASS");
  assert.equal(discovery.toolEventCount, 0);
  assert.equal(discovery.expectedSkills.length, 10);
  assert.deepEqual(discovery.discoveredSkills, discovery.expectedSkills);
  assert.match(discoveryEventsText, /DISCOVERY_SOURCE: STARTUP_CONTEXT_ONLY/);
  assert.doesNotMatch(discoveryEventsText, /"type":"command_execution"/);
  assert.match(discoveryResult, /Koda-C skills discovered from startup context: 10 of 10/);

  const preflight = JSON.parse(preflightRunText) as {
    status: string;
    prompt: string;
    checks: Record<string, boolean>;
  };
  assert.equal(preflight.status, "PASS");
  assert.match(preflight.prompt, /conceptually ahead/);
  assert.ok(Object.values(preflight.checks).every(Boolean));
  assert.match(preflightEvents, /koda-c-session-prompt\/SKILL\.md/);
  assert.match(preflightEvents, /node dist\/cli\.js guide status/);
  assert.match(preflightEvents, /NEXT SESSION BLOCKED/);
  assert.match(preflightEvents, /Current bounded session: 2026-07-19-01 — brief \(1\/6\)/);
  assert.match(preflightResult, /Fixture files unchanged: PASS/);
  assert.match(preflightResult, /created no prompt/i);
  assert.match(preflightResult, /proves neither universal natural-language classification nor owner usability in Ghostty/i);
});
