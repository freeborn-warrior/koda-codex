import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

test("JUDGE JOURNEY SUITE: the committed binary runs without rebuilding", () => {
  const result = spawnSync(process.execPath, ["dist/cli.js", "--help"], { encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Koda — a disk-backed workflow where review proof controls advancement/);
  assert.match(result.stdout, /koda session close/);
  assert.match(result.stdout, /--open ghostty/);
});

test("JUDGE JOURNEY SUITE: video and submission documents preserve every live rule", async () => {
  const [landing, readme, video, checklist] = await Promise.all([
    readFile("README.md", "utf8"),
    readFile("docs/README.md", "utf8"),
    readFile("docs/VIDEO-SCRIPT.md", "utf8"),
    readFile("docs/SUBMISSION-CHECKLIST.md", "utf8"),
  ]);
  assert.match(landing, /## Try the refusal in one minute/);
  assert.match(landing, /git clone https:\/\/github\.com\/freeborn-warrior\/koda-codex\.git/);
  assert.match(landing, /No `npm install` or build is required/);
  assert.match(landing, /node dist\/cli\.js init/);
  assert.match(landing, /252-check post-push Reviewer\/session-binding transcript/);
  assert.match(landing, /How Codex and GPT-5\.6 built it/);
  assert.match(landing, /does \*\*not\*\* prove comprehension/);
  assert.match(readme, /## Judge path/);
  assert.match(readme, /node dist\/cli\.js --help/);
  assert.match(
    readme,
    /\[bound 252-check post-push transcript\]\(test-results\/2026-07-20-reviewer-session-binding-pushed\.md\)/,
  );
  assert.match(
    readme,
    /\[Reviewer\/session-binding APPROVE review\]\(quality-runs\/2026-07-20-reviewer-session-binding-19\/REVIEW\.md\)/,
  );
  assert.match(
    readme,
    /\[project-boundary security probe\]\(security-runs\/2026-07-19-project-boundary-probe-13\/RESULT\.md\)/,
  );
  assert.match(
    readme,
    /\[fresh plural-session Guide preflight\]\(guide-preflight-runs\/2026-07-19-sol-medium-05\/RESULT\.md\)/,
  );
  assert.match(video, /Hard maximum:\*\* under 3:00/);
  assert.match(video, /one real 30:39 Koda-C session/);
  assert.match(video, /## Official-rule coverage/);
  assert.match(video, /Entry command:[\s\S]*npm run demo:session/);
  assert.match(video, /unplanned Orient[\s\S]*`REVISE`/);
  assert.match(video, /No approval, no receipt, no\s+(?:>\s*)?advance\./);
  assert.match(video, /corrected work[\s\S]*eight-character code/);
  assert.match(video, /receipt[\s\S]*before the gate opens/);
  assert.match(video, /source-session time/);
  assert.match(video, /Sol \/ medium/);
  assert.match(video, /Terra \/ medium/);
  assert.match(video, /You're watching Koda-C actually run/);
  assert.match(video, /over two hundred and fifty checks/);
  assert.match(video, /used GPT-5\.6 Codex as the engineer for the CLI/);
  assert.match(video, /Sol, Terra, and Luna as reviewers against sealed fixtures/);
  assert.match(video, /contains no music/);
  assert.match(video, /No third-party trademarks or unlicensed copyrighted material/);
  assert.match(video, /SIL Open Font License 1\.1/);
  assert.match(video, /Functions as depicted/);
  assert.match(video, /checkbox remains open until the audio is recorded, muxed, and verified/);
  assert.match(checklist, /2026-07-21 at 5:00 pm Pacific/);
  assert.match(checklist, /## Owner handoff order/);
  assert.match(checklist, /Record one fresh complete source run[\s\S]*npm run demo:session/);
  assert.match(checklist, /GitHub is[\s\S]*`PRIVATE`/);
  assert.match(checklist, /\*\*Developer Tools\*\*/);
  assert.match(checklist, /\/feedback/);
  assert.match(checklist, /publicly to YouTube/);
  assert.match(checklist, /testing@devpost\.com/);
  assert.match(checklist, /build-week-event@openai\.com/);
  assert.match(checklist, /https:\/\/openai\.devpost\.com\/rules/);
  assert.match(checklist, /passes 250\/250 unchanged after push/);
  assert.match(checklist, /unchanged pushed commit passes a second[\s\S]*252\/252/);
  assert.match(checklist, /Fresh Terra\/medium independently ran the full suite[\s\S]*APPROVE/);
  assert.match(checklist, /branded picture lock v04/);
  assert.match(checklist, /official-rule picture audit/);
});

test("JUDGE JOURNEY SUITE: local links in the judge documents resolve", async () => {
  const documents = [
    "README.md",
    "docs/README.md",
    "docs/DEMO.md",
    "docs/VIDEO-SCRIPT.md",
    "docs/SUBMISSION-CHECKLIST.md",
  ];
  const missing: string[] = [];
  for (const document of documents) {
    const content = await readFile(document, "utf8");
    for (const match of content.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
      const target = match[1];
      if (/^(?:https?:|mailto:|#)/.test(target)) continue;
      const file = target.split("#", 1)[0];
      if (!file) continue;
      await access(path.resolve(path.dirname(document), file)).catch(() => {
        missing.push(`${document} -> ${target}`);
      });
    }
  }
  assert.deepEqual(missing, [], `Broken local judge links:\n${missing.join("\n")}`);
});
