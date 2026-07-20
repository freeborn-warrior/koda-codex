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
  assert.match(landing, /250-check post-push integrated Producer-role transcript/);
  assert.match(landing, /How Codex and GPT-5\.6 built it/);
  assert.match(landing, /does \*\*not\*\* prove comprehension/);
  assert.match(readme, /## Judge path/);
  assert.match(readme, /node dist\/cli\.js --help/);
  assert.match(
    readme,
    /\[bound 250-check post-push transcript\]\(test-results\/2026-07-20-integrated-role-preflight-pushed\.md\)/,
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
  assert.match(video, /GATE CLOSED — BRIEF/);
  assert.match(video, /Nothing advanced\./);
  assert.match(video, /GATE OPEN — BRIEF/);
  assert.match(video, /node dist\/cli\.js init/);
  assert.match(video, /Codex and GPT-5\.6 explicitly/);
  assert.match(video, /Do not play music/);
  assert.match(checklist, /2026-07-21 at 5:00 pm Pacific/);
  assert.match(checklist, /\*\*Developer Tools\*\*/);
  assert.match(checklist, /\/feedback/);
  assert.match(checklist, /publicly to YouTube/);
  assert.match(checklist, /testing@devpost\.com/);
  assert.match(checklist, /build-week-event@openai\.com/);
  assert.match(checklist, /https:\/\/openai\.devpost\.com\/rules/);
  assert.match(checklist, /passes 250\/250 unchanged after push/);
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
