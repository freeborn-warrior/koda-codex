import { spawnSync } from "node:child_process";
import { mkdirSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const label = process.argv[2];
const coverage = process.argv.slice(3).includes("--coverage");
if (!label || !/^\d{4}-\d{2}-\d{2}-[a-z0-9-]+$/.test(label)) {
  console.error("Usage: npm run test:record -- YYYY-MM-DD-descriptive-label [--coverage]");
  process.exit(1);
}

const root = process.cwd();
const testFiles = readdirSync(path.join(root, "tests"))
  .filter((name) => name.endsWith(".test.ts"))
  .sort()
  .map((name) => path.join("tests", name));
const commandArgs = [
  ...(coverage ? ["--experimental-test-coverage"] : []),
  "--test",
  "--test-reporter=spec",
  ...testFiles,
];
const result = spawnSync(process.execPath, commandArgs, {
  cwd: root,
  encoding: "utf8",
  env: process.env,
});
const output = `${result.stdout ?? ""}${result.stderr ?? ""}`.trimEnd();
const git = spawnSync("git", ["rev-parse", "--short", "HEAD"], { cwd: root, encoding: "utf8" });
const baseCommit = git.status === 0 ? git.stdout.trim() : "unavailable";
const status = result.status === 0 ? "PASS" : "FAIL";
const destination = path.join(root, "docs", "test-results", `${label}.md`);

mkdirSync(path.dirname(destination), { recursive: true });
writeFileSync(destination, [
  `# Per-test result — ${label}`,
  "",
  `- Result: **${status}**`,
  `- Recorded at: ${new Date().toISOString()}`,
  `- Node: ${process.version}`,
  `- Platform: ${process.platform} ${process.arch}`,
  `- Base commit: \`${baseCommit}\``,
  `- Command: \`${process.execPath} ${commandArgs.join(" ")}\``,
  "",
  "Every discovered test and subtest is named below. No result is aggregated away.",
  "",
  "```text",
  output,
  "```",
  "",
].join("\n"), "utf8");

console.log(`Recorded ${status}: ${path.relative(root, destination)}`);
if (output) console.log(output);
process.exit(result.status ?? 1);
