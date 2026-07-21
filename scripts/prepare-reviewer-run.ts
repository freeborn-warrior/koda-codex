import { cp, mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const fixture = process.argv[2];
const model = process.argv[3];
const effort = process.argv[4];
const validModels = new Set(["gpt-5.6-sol", "gpt-5.6-terra", "gpt-5.6-luna"]);
const validEfforts = new Set(["low", "medium", "high", "xhigh"]);

if (!fixture || !/^[a-z0-9-]+$/.test(fixture) || !validModels.has(model) || !validEfforts.has(effort)) {
  console.error("Usage: npm run reviewer:prepare -- <fixture-name> <gpt-5.6-sol|gpt-5.6-terra|gpt-5.6-luna> <low|medium|high|xhigh>");
  process.exit(1);
}

const root = process.cwd();
const source = path.join(root, "tests", "fixtures", "reviewer", fixture, "project");
try {
  await readdir(source);
} catch {
  throw new Error(`Unknown reviewer fixture: ${fixture}`);
}

const now = new Date();
const preparedAt = now.toISOString();
const date = [now.getFullYear(), String(now.getMonth() + 1).padStart(2, "0"), String(now.getDate()).padStart(2, "0")].join("-");
const runsRoot = path.join(root, "docs", "reviewer-runs");
await mkdir(runsRoot, { recursive: true });
const modelSlug = model.replace("gpt-5.6-", "");
const prefix = `${date}-${fixture}-${modelSlug}-${effort}-`;
const existing = (await readdir(runsRoot)).filter((name) => name.startsWith(prefix));
const sequence = String(existing.length + 1).padStart(2, "0");
const runRoot = path.join(runsRoot, `${prefix}${sequence}`);
const project = path.join(runRoot, "project");
await mkdir(runRoot, { recursive: false });
await cp(source, project, { recursive: true });

const prompt = `Read ${path.join(root, ".agents/skills/koda-c-review/SKILL.md")} completely. Use its formal-review mode to independently review the current Koda-C phase in ${project}, using only that skill, the phase artifact, and files the artifact cites. Use node ${path.join(root, "src/cli.ts")} wherever the skill says koda. Write the complete review artifact to disk before reporting. Do not read outside the project except the named skill and CLI, do not inspect fixture metadata or this run folder, and do not quote the receipt in chat.`;

await writeFile(path.join(runRoot, "RUN.json"), `${JSON.stringify({
  version: 1,
  fixture,
  model,
  effort,
  preparedAt,
  status: "PREPARED",
  prompt,
}, null, 2)}\n`, "utf8");

await writeFile(path.join(runRoot, "RESULT.md"), [
  `# Reviewer fixture result — ${date} — ${fixture} — ${modelSlug} — ${effort} — ${sequence}`,
  "",
  "- Status: PREPARED — NOT RUN",
  `- Date: ${date}`,
  `- Fixture: ${fixture}`,
  `- Model variant: ${model}`,
  `- Effort: ${effort}`,
  "- Verdict: pending",
  "- Expected behavior: sealed in the source fixture metadata; evaluate only after review",
  "- CATCH score: pending — score only a specific plant named and refuted from project files; use N/A for an honest control",
  "- VERDICT score: pending — evaluate independently against the sealed verdict contract",
  "- False positive: pending",
  "- Secondary execution observations: pending — never include these in CATCH or VERDICT scoring",
  "- Review path: pending",
  "- Codex event log: `CODEX-EVENTS.jsonl` after execution",
  "",
].join("\n"), "utf8");

const relativeRun = path.relative(root, runRoot);
console.log(`Prepared blind reviewer project: ${project}`);
console.log(`Pinned model: ${model}`);
console.log(`Pinned effort: ${effort}`);
console.log("Run this exact command in Ghostty from the repository root:");
console.log(`  npm run reviewer:execute -- ${JSON.stringify(relativeRun)}`);
