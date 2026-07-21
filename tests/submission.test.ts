import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

test("JUDGE JOURNEY SUITE: the committed binary runs without rebuilding", () => {
  const result = spawnSync(process.execPath, ["dist/cli.js", "--help"], { encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Koda-C — a disk-backed workflow where review proof controls advancement/);
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

test("PUBLIC GUIDE CONTRACT: current entry docs use the product name and describe the shipped workflow", async () => {
  const paths = [
    "README.md",
    "docs/README.md",
    "docs/QUICKSTART.md",
    "docs/COMMAND-MANUAL.md",
    "docs/PROCESS.md",
    "docs/SECURITY.md",
    "docs/DEMO.md",
    "docs/GHOSTTY-TEST-GUIDE.md",
  ];
  const documents = await Promise.all(paths.map(async (document) => ({
    document,
    content: await readFile(document, "utf8"),
  })));
  const bareProductName = /(^|[^A-Za-z0-9-])Koda(?![-A-Za-z0-9])/m;
  for (const { document, content } of documents) {
    assert.doesNotMatch(content, bareProductName, `${document} uses bare Koda as the product name`);
  }

  const landing = documents.find(({ document }) => document === "README.md")!.content;
  const quickStart = documents.find(({ document }) => document === "docs/QUICKSTART.md")!.content;
  const process = documents.find(({ document }) => document === "docs/PROCESS.md")!.content;
  const security = documents.find(({ document }) => document === "docs/SECURITY.md")!.content;
  const demo = documents.find(({ document }) => document === "docs/DEMO.md")!.content;
  const ghostty = documents.find(({ document }) => document === "docs/GHOSTTY-TEST-GUIDE.md")!.content;
  const packageManifest = JSON.parse(await readFile("package.json", "utf8"));

  assert.match(landing, /\[Quick Start\]\(docs\/QUICKSTART\.md\).*\[Process\]\(docs\/PROCESS\.md\).*\[Commands\]\(docs\/COMMAND-MANUAL\.md\).*\[Security\]\(docs\/SECURITY\.md\).*\[License\]\(LICENSE\)/);
  assert.match(landing, /The reference process—and what belongs to each project/);
  assert.match(quickStart, /npm run demo:session/);
  assert.equal(packageManifest.scripts["demo:session"], "node scripts/prepare-full-session-demo.ts --open");
  assert.match(quickStart, /macOS is required here only because this packaged demonstration uses the optional[\s\S]*Ghostty window adapter/);
  assert.match(quickStart, /not a requirement of Koda-C's files, gate, or[\s\S]*core CLI/);
  assert.match(process, /The gates are the product/);
  assert.match(process, /the \*\*project method\*\* that should change/);
  assert.match(process, /Phase order belongs in `koda\.config\.json`/);
  assert.match(process, /Creating tailored writing, research, design, or other project profiles remains a[\s\S]*future adoption layer/);
  assert.match(security, /one human owner working with Codex, not a[\s\S]*company or security team/);
  assert.match(security, /not designed[\s\S]*around a macOS-only format/);
  assert.match(demo, /owner-visible result.*2026-07-20-owner-full-session-05/s);
  assert.doesNotMatch(demo, /still needs its final owner-observed completion/);
  assert.match(ghostty, /## Current supported path/);
  assert.match(ghostty, /It is not the current onboarding guide/);
  assert.match(ghostty, /a first-time user or judge should not follow it instead of[\s\S]*the Quick Start/);
});

test("JUDGE JOURNEY SUITE: local links in the judge documents resolve", async () => {
  const documents = [
    "README.md",
    "docs/README.md",
    "docs/QUICKSTART.md",
    "docs/COMMAND-MANUAL.md",
    "docs/PROCESS.md",
    "docs/SECURITY.md",
    "docs/DEMO.md",
    "docs/GHOSTTY-TEST-GUIDE.md",
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
