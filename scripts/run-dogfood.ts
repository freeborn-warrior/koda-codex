#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { cp, mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const cli = path.join(repoRoot, "src", "cli.ts");
const evidenceRoot = path.join(repoRoot, "docs", "dogfood");
const temporary = await mkdtemp(path.join(tmpdir(), "koda-dogfood-"));
const project = path.join(temporary, "project");
const remote = path.join(temporary, "remote.git");
const transcript: string[] = [];

function normalize(value: string): string {
  return value
    .replaceAll(`/private${project}`, "<dogfood-project>")
    .replaceAll(`/private${remote}`, "<local-bare-remote>")
    .replaceAll(project, "<dogfood-project>")
    .replaceAll(remote, "<local-bare-remote>")
    .replaceAll(repoRoot, "<koda-c-repo>");
}

function record(command: string, result: ReturnType<typeof spawnSync>, expected: number | number[]): void {
  transcript.push(`$ ${normalize(command)}`);
  if (result.stdout) transcript.push(normalize(String(result.stdout).trimEnd()));
  if (result.stderr) transcript.push(normalize(String(result.stderr).trimEnd()));
  transcript.push(`[exit ${result.status}]`, "");
  const allowed = Array.isArray(expected) ? expected : [expected];
  if (result.status === null || !allowed.includes(result.status)) {
    throw new Error(`Unexpected exit ${result.status} for ${command}`);
  }
}

function git(args: string[], cwd: string, expected: number | number[] = 0) {
  const result = spawnSync("git", args, { cwd, encoding: "utf8" });
  record(`git ${args.map((item) => JSON.stringify(item)).join(" ")}`, result, expected);
  return result;
}

function koda(args: string[], expected: number | number[] = 0) {
  const result = spawnSync(process.execPath, [cli, ...args], {
    cwd: project,
    encoding: "utf8",
    env: { ...process.env, KODA_COMMAND: "koda" },
  });
  record(`koda ${args.map((item) => JSON.stringify(item)).join(" ")}`, result, expected);
  return result;
}

function shell(command: string, cwd: string, expected: number | number[] = 0) {
  const result = spawnSync(command, { cwd, encoding: "utf8", shell: true });
  record(command, result, expected);
  return result;
}

function note(message: string): void {
  transcript.push(`[evidence step] ${message}`, "");
}

try {
  await mkdir(project, { recursive: true });
  git(["init", "--bare", remote], temporary);
  git(["init", "-b", "main"], project);
  git(["config", "user.name", "Koda Dogfood"], project);
  git(["config", "user.email", "dogfood@example.invalid"], project);
  git(["remote", "add", "origin", remote], project);

  koda(["init", "."]);
  const configPath = path.join(project, "koda.config.json");
  const config = JSON.parse(await readFile(configPath, "utf8"));
  const phaseNames = config.phases.map((phase: { name: string }) => phase.name);
  if (phaseNames.join(",") !== "brief,orient,plan,produce,live,summary") {
    throw new Error(`Unexpected native phase chain: ${phaseNames.join(",")}`);
  }
  note("Kept the complete native chain: brief → orient → plan → produce → live → summary.");

  const promptPath = path.join(project, "owner-prompt.md");
  await writeFile(promptPath, [
    "# Session prompt",
    "",
    "Create and verify a one-line concept for a neighborhood seed library.",
    "The deliverable must contain one welcoming name and one sentence explaining it.",
    "Keep the complete session small enough for every phase artifact to remain inspectable.",
    "",
  ].join("\n"), "utf8");
  note("Wrote the owner's opening contract to owner-prompt.md.");
  koda(["session", "new", "owner-prompt.md"]);

  const sessionsDir = path.join(project, "docs", "sessions");
  const sessionId = (await readdir(sessionsDir)).sort().at(-1)!;
  const sessionDir = path.join(sessionsDir, sessionId);
  const deliverablePath = path.join(project, "deliverable", "seed-library-concept.txt");
  const artifacts: Record<string, string[]> = {
    brief: [
      "# Brief",
      "",
      "## Evidence basis",
      "- [Session prompt](../session-prompt.md)",
      "",
      "## Outcome",
      "Create one welcoming seed-library name and explain it in one sentence.",
      "",
      "## Limits",
      "One plain-text deliverable; no branding system, website, or implementation.",
      "",
      "## Success evidence",
      "Inspect the saved line and confirm it contains one name plus one explanatory sentence.",
      "",
      "## Review handover",
      "- Immediate receiver: `koda-c-review`",
      "- Unresolved items: none",
      "",
    ],
    orient: [
      "# Orient",
      "",
      "## Evidence inspected",
      "- [Session prompt](../session-prompt.md)",
      "- [Approved brief](01-brief.md)",
      "",
      "## Ground",
      "The requested output is a single local text line containing a welcoming name and explanation.",
      "",
      "## Constraints and unknowns",
      "No visual identity, implementation, audience research, or publishing is requested. No blocking unknown remains.",
      "",
      "## Review handover",
      "- Immediate receiver: `koda-c-review`",
      "",
    ],
    plan: [
      "# Plan",
      "",
      "## Approved inputs",
      "- [Brief](01-brief.md)",
      "- [Orientation](02-orient.md)",
      "",
      "## Ordered work",
      "1. Choose one welcoming name.",
      "2. Write one sentence explaining its neighborhood seed-sharing purpose.",
      "3. Save exactly one non-empty line.",
      "4. Inspect the saved file and reject extra lines or unrelated scope.",
      "",
      "## Review handover",
      "- Immediate receiver: `koda-c-review`",
      "",
    ],
    produce: [
      "# Produce",
      "",
      "## Approved inputs",
      "- [Plan](03-plan.md)",
      "",
      "## Produced file",
      "- [`deliverable/seed-library-concept.txt`](../../../../deliverable/seed-library-concept.txt)",
      "",
      "## Requirement mapping",
      "The file contains one welcoming name followed by one explanatory sentence on the same line.",
      "",
      "## Review handover",
      "- Immediate receiver: `koda-c-review`",
      "",
    ],
    live: [
      "# Live",
      "",
      "## Real output exercised",
      "Read `deliverable/seed-library-concept.txt` from disk after production.",
      "",
      "## Observed result",
      "The file was non-empty and contained exactly one line: “Common Ground Seeds — A neighborhood library where shared seeds grow shared abundance.”",
      "",
      "## Review handover",
      "- Immediate receiver: `koda-c-review`",
      "",
    ],
    summary: [
      "# Summary",
      "",
      "## Evidence checked",
      "- [Brief](01-brief.md)",
      "- [Orient](02-orient.md)",
      "- [Plan](03-plan.md)",
      "- [Produce](04-produce.md)",
      "- [Live](05-live.md)",
      "",
      "## Completed",
      "One local text deliverable was produced and inspected against the bounded session prompt.",
      "",
      "## Carry-forward",
      "None.",
      "",
      "## Closure state",
      "Session closure remains pending until the separate immutable close, commit, and push ceremony succeeds.",
      "",
      "## Review handover",
      "- Immediate receiver: `koda-c-review`",
      "",
    ],
  };

  for (const [index, phase] of phaseNames.entries()) {
    if (phase === "produce") {
      await mkdir(path.dirname(deliverablePath), { recursive: true });
      await writeFile(deliverablePath, "Common Ground Seeds — A neighborhood library where shared seeds grow shared abundance.\n", "utf8");
      note("The produce leg wrote the declared real output before writing its evidence manifest.");
    }

    const prefix = String(index + 1).padStart(2, "0");
    const artifactPath = path.join(sessionDir, "phases", `${prefix}-${phase}.md`);
    await writeFile(artifactPath, artifacts[phase].join("\n"), "utf8");
    note(`The ${phase} producer leg wrote ${prefix}-${phase}.md and stopped without creating its review.`);

    koda(["advance"], 2);
    koda(["review", "new", phase]);

    const reviewPath = path.join(sessionDir, "reviews", `${prefix}-${phase}-review.md`);
    const generatedReview = await readFile(reviewPath, "utf8");
    const metadata = generatedReview.split("\n").find((line) => line.startsWith("<!-- KODA_REVIEW "))!;
    const receipt = generatedReview.trimEnd().split("\n").at(-1)!;
    await writeFile(reviewPath, [
      "VERDICT: APPROVE",
      "",
      metadata,
      "",
      `# Peer review — ${phase}`,
      "",
      "## Evidence checked",
      `- \`phases/${prefix}-${phase}.md\` and every file it cites.`,
      "",
      "## Findings",
      `- The ${phase} artifact stays within the session prompt, distinguishes current evidence from future ceremony, and provides a checkable handover.`,
      "",
      receipt,
      "",
    ].join("\n"), "utf8");
    note(`A separate deterministic reviewer step wrote APPROVE for ${phase}, preserving protected metadata and receipt. No model was invoked.`);

    koda(["advance"], 2);
    koda(["approve", phase, receipt, "--approver", "Dogfood Owner"]);
    koda(["advance"]);
  }
  const closePrepared = koda(["session", "close"], 2);
  const printedGit = String(closePrepared.stdout).split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("git "));
  if (printedGit.length !== 3) throw new Error("Close did not print exactly three Git commands.");

  git(["status", "--short"], project);
  shell(printedGit[0], project);
  shell(printedGit[1], project);
  koda(["session", "close"], 2);
  shell(printedGit[2], project);
  koda(["session", "close"]);
  koda(["status"]);
  const commit = git(["rev-parse", "HEAD"], project).stdout?.toString().trim() ?? "unknown";

  if (path.resolve(evidenceRoot) !== path.resolve(repoRoot, "docs", "dogfood")) {
    throw new Error("Refusing to write dogfood evidence outside docs/dogfood.");
  }
  await rm(evidenceRoot, { recursive: true, force: true });
  await mkdir(evidenceRoot, { recursive: true });
  await cp(project, path.join(evidenceRoot, "project"), {
    recursive: true,
    filter: (source) => path.basename(source) !== ".git",
  });
  const document = [
    "# Full native-chain deterministic dogfood transcript",
    "",
    "- **Date:** 2026-07-18",
    "- **Model variant / effort:** Not applicable; this is a deterministic CLI lifecycle proof.",
    "- **Project:** Disposable six-phase Koda-C project, preserved below without its temporary `.git` directory.",
    "- **Git proof:** A local bare remote proves the required commit/push boundary without relying on network state.",
    `- **Pushed close commit:** \`${commit}\``,
    "- **Scenario:** Clean approval through brief → orient → plan → produce → live → summary.",
    "- **Verdict:** PASS if every phase first refuses without review and receipt, every gate later opens, and the final commands report both `SESSION CLOSED` and a derived closed status.",
    "",
    "Commands are displayed as `koda`; the harness executed this repository's `src/cli.ts` through Node.",
    "",
    "```text",
    ...transcript,
    "```",
    "",
  ].join("\n");
  await writeFile(path.join(evidenceRoot, "TRANSCRIPT.md"), document, "utf8");
  console.log(`Dogfood evidence written to ${path.relative(repoRoot, evidenceRoot)}`);
} finally {
  await rm(temporary, { recursive: true, force: true });
}
