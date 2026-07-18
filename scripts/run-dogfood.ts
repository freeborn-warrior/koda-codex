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
  config.phases = [{ name: "brief", description: "Define one tiny checkable outcome" }];
  await writeFile(configPath, `${JSON.stringify(config, null, 2)}\n`, "utf8");
  note("Configured one phase (`brief`) to keep the proof tiny while exercising the complete session lifecycle.");

  const promptPath = path.join(project, "owner-prompt.md");
  await writeFile(promptPath, [
    "# Session prompt",
    "",
    "Create a one-sentence brief for a neighborhood seed-library name.",
    "Keep the proof small enough to inspect in under a minute.",
    "",
  ].join("\n"), "utf8");
  note("Wrote the owner's opening contract to owner-prompt.md.");
  koda(["session", "new", "owner-prompt.md"]);

  const sessionsDir = path.join(project, "docs", "sessions");
  const sessionId = (await readdir(sessionsDir)).sort().at(-1)!;
  const sessionDir = path.join(sessionsDir, sessionId);
  const artifactPath = path.join(sessionDir, "phases", "01-brief.md");
  await writeFile(artifactPath, [
    "# Brief",
    "",
    "## Source contract",
    "- [Session prompt](../session-prompt.md)",
    "",
    "## Outcome",
    "Choose one welcoming seed-library name and explain it in one sentence.",
    "",
    "## Review handover",
    "- Immediate receiver: `koda-c-review`",
    "- Evidence to inspect: this brief and `../session-prompt.md`",
    "- Unresolved items: none",
    "",
  ].join("\n"), "utf8");
  note("The producer wrote the brief artifact and stopped without creating its review.");

  koda(["advance"], 2);
  koda(["review", "new", "brief"]);

  const reviewPath = path.join(sessionDir, "reviews", "01-brief-review.md");
  const generatedReview = await readFile(reviewPath, "utf8");
  const metadata = generatedReview.split("\n").find((line) => line.startsWith("<!-- KODA_REVIEW "))!;
  const receipt = generatedReview.trimEnd().split("\n").at(-1)!;
  await writeFile(reviewPath, [
    "VERDICT: APPROVE",
    "",
    metadata,
    "",
    "# Peer review — brief",
    "",
    "## Evidence checked",
    "- `phases/01-brief.md` against `session-prompt.md`.",
    "",
    "## Findings",
    "- The brief preserves the requested one-sentence scope and supplies a clear review handover.",
    "",
    receipt,
    "",
  ].join("\n"), "utf8");
  note("A separate reviewer step wrote an APPROVE review while preserving generated metadata and receipt. No model was invoked in this deterministic proof.");

  koda(["advance"], 2);
  koda(["approve", "brief", receipt, "--approver", "Dogfood Owner"]);
  koda(["advance"]);
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
    "# Tiny end-to-end dogfood transcript",
    "",
    "- **Date:** 2026-07-18",
    "- **Model variant / effort:** Not applicable; this is a deterministic CLI lifecycle proof.",
    "- **Project:** Disposable one-phase Koda project, preserved below without its temporary `.git` directory.",
    "- **Git proof:** A local bare remote proves the required commit/push boundary without relying on network state.",
    `- **Pushed close commit:** \`${commit}\``,
    "- **Verdict:** PASS if the final commands report both `SESSION CLOSED` and a derived closed status.",
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
