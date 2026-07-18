#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { cp, mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { DEFAULT_CONFIG } from "../src/config.ts";
import { writeJsonAtomic } from "../src/project.ts";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const runsRoot = process.env.KODA_RELAY_RUNS_ROOT
  ? path.resolve(process.env.KODA_RELAY_RUNS_ROOT)
  : path.join(root, "docs", "relay-runs");
const models = new Set(["gpt-5.6-sol", "gpt-5.6-terra", "gpt-5.6-luna"]);
const efforts = new Set(["low", "medium", "high", "xhigh"]);
const skillNames = [
  "koda-c-brief",
  "koda-c-close",
  "koda-c-live",
  "koda-c-orient",
  "koda-c-plan",
  "koda-c-produce",
  "koda-c-review",
  "koda-c-session",
  "koda-c-summary",
];
const [scenario = "software-clean", producerModel, producerEffort, reviewerModel, reviewerEffort] = process.argv.slice(2);

if (
  scenario !== "software-clean" ||
  !producerModel || !models.has(producerModel) ||
  !producerEffort || !efforts.has(producerEffort) ||
  !reviewerModel || !models.has(reviewerModel) ||
  !reviewerEffort || !efforts.has(reviewerEffort)
) {
  console.error("Usage: npm run relay:prepare -- software-clean <producer-model> <effort> <reviewer-model> <effort>");
  process.exit(1);
}

const date = new Date().toISOString().slice(0, 10);
await mkdir(runsRoot, { recursive: true });
const prefix = `${date}-${scenario}-${producerModel.replace("gpt-5.6-", "")}-${producerEffort}-${reviewerModel.replace("gpt-5.6-", "")}-${reviewerEffort}`;
const existing = (await readdir(runsRoot, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory() && entry.name.startsWith(`${prefix}-`))
  .map((entry) => Number(entry.name.slice(prefix.length + 1)))
  .filter(Number.isFinite);
const sequence = String(Math.max(0, ...existing) + 1).padStart(2, "0");
const runRoot = path.join(runsRoot, `${prefix}-${sequence}`);
const project = path.join(runRoot, "project");
const runtime = path.join(project, ".runtime");
const remote = path.join(runtime, "remote.git");
await mkdir(runRoot, { recursive: false });
await mkdir(project, { recursive: true });
await mkdir(runtime, { recursive: true });

function git(cwd: string, args: string[]): void {
  const result = spawnSync("git", args, { cwd, encoding: "utf8" });
  if (result.status !== 0) throw new Error(`git ${args.join(" ")} failed: ${result.stderr}`);
}

git(project, ["init", "-b", "main"]);
git(project, ["config", "user.name", "Koda Relay Test"]);
git(project, ["config", "user.email", "relay@example.invalid"]);
git(runtime, ["init", "--bare", remote]);
git(project, ["remote", "add", "origin", remote]);

await writeFile(path.join(project, ".gitignore"), ".runtime/\n.DS_Store\n", "utf8");

await writeJsonAtomic(path.join(project, "koda.config.json"), DEFAULT_CONFIG);
await mkdir(path.join(project, DEFAULT_CONFIG.sessionsDir), { recursive: true });
const projectSkills = path.join(project, ".agents", "skills");
await mkdir(projectSkills, { recursive: true });
for (const name of skillNames) {
  await cp(path.join(root, ".agents", "skills", name), path.join(projectSkills, name), {
    recursive: true,
    filter: (source) => path.basename(source) !== ".DS_Store",
  });
}
await mkdir(path.join(project, "docs"), { recursive: true });
await cp(path.join(root, "docs", "IN-PHASE-CONSULTATION.md"), path.join(project, "docs", "IN-PHASE-CONSULTATION.md"));

await writeFile(path.join(project, "AGENTS.md"), [
  "# Word-count relay project",
  "",
  "This is a bounded software-project fixture executed through Koda-C.",
  "",
  "- Treat the active Koda session and cited files as truth.",
  "- Use dependency-free Node.js and keep the deliverable inside this project.",
  "- The command must stay offline and never modify its input.",
  "- Producer and reviewer responsibilities remain separate.",
  "- Never approve, advance, or quote a review receipt from a producer or reviewer model turn.",
  "- Every durable output remains in this project.",
  "- The relay supervisor owns gate advancement, owner acknowledgement, and pre-close output commits.",
  "",
].join("\n"), "utf8");

await writeFile(path.join(project, "owner-prompt.md"), [
  "# Session prompt",
  "",
  "## Owner intent",
  "Create a tiny dependency-free Node.js command that reports the word count of one local UTF-8 text file as JSON, so the full software relay can be inspected end to end.",
  "",
  "## In scope",
  "- One command accepting one local text-file path.",
  "- JSON output with the source path and integer word count.",
  "- Saved deterministic checks for ordinary text, an empty file, and a missing path.",
  "",
  "## Out of scope",
  "- Network access, recursive directories, binary formats, package dependencies, publishing, or performance promises.",
  "",
  "## Success evidence",
  "- The real command reports the expected count for a saved sample.",
  "- The real command reports zero for an empty file.",
  "- The real command refuses a missing path with a nonzero exit and clear error.",
  "- Tests and raw live output are saved on disk.",
  "",
  "## Constraints and owner rulings",
  "- Use the Node.js runtime already required by Koda-C and no dependencies.",
  "- Preserve every input file unchanged.",
  "- Keep this fixture deliberately small; correctness and inspectability matter more than features.",
  "- Keep produced source, checks, and saved live evidence inside this project so the supervisor can commit and push them before immutable close.",
  "",
  "## Prior session carry-forward",
  "- Previous close: none for this first session",
  "- Previous summary: none",
  "- Carried forward by owner: none",
  "- Deliberately not carried: none",
  "",
  "## Relay handover",
  "- Configured receiver: brief",
  "- Ground prepared: this owner prompt and project-local guidance",
  "- Open items: none",
  "",
].join("\n"), "utf8");

git(project, ["add", "-A"]);
git(project, ["commit", "-m", "chore: prepare relay fixture"]);
git(project, ["push", "-u", "origin", "main"]);
const initialCommit = spawnSync("git", ["rev-parse", "HEAD"], { cwd: project, encoding: "utf8" });
if (initialCommit.status !== 0) throw new Error(`Unable to record initial relay commit: ${initialCommit.stderr}`);

const run = {
  version: 1,
  scenario,
  status: "PREPARED",
  preparedAt: new Date().toISOString(),
  producer: { model: producerModel, effort: producerEffort, threadId: null, turns: 0 },
  reviewer: { model: reviewerModel, effort: reviewerEffort, threadId: null, turns: 0 },
  project: "project",
  runtime: "project/.runtime",
  cli: path.join(root, "src", "cli.ts"),
  initialCommit: initialCommit.stdout.trim(),
  maxTurns: 40,
};
await writeFile(path.join(runRoot, "RUN.json"), `${JSON.stringify(run, null, 2)}\n`, "utf8");
await writeFile(path.join(runRoot, "RESULT.md"), [
  `# Full relay result — ${path.basename(runRoot)}`,
  "",
  "- Status: PREPARED — NOT RUN",
  `- Scenario: ${scenario}`,
  `- Producer: ${producerModel} / ${producerEffort}`,
  `- Reviewer: ${reviewerModel} / ${reviewerEffort}`,
  "- Producer thread: pending",
  "- Reviewer thread: pending",
  "- Completed phases: 0/6",
  "- Close: pending",
  "",
].join("\n"), "utf8");
await writeFile(path.join(runRoot, "TRANSCRIPT.md"), `# Relay transcript — ${path.basename(runRoot)}\n\n`, "utf8");

const relativeRun = path.relative(root, runRoot);
console.log(`Prepared full relay run: ${process.env.KODA_RELAY_RUNS_ROOT ? runRoot : relativeRun}`);
console.log("This is a persistent two-context run. It will pause at every review for Kristian's exact receipt quote.");
if (process.env.KODA_RELAY_RUNS_ROOT) {
  console.log("Test preparation complete; execution is intentionally disabled outside docs/relay-runs.");
} else {
  console.log("Run from the repository root:");
  console.log(`  npm run relay:execute -- ${JSON.stringify(relativeRun)}`);
}
