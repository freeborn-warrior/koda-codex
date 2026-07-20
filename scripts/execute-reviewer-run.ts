import { spawnSync } from "node:child_process";
import { readFile, realpath, writeFile } from "node:fs/promises";
import path from "node:path";

import { codexProjectPermissionArgs } from "../src/codex-role-permissions.ts";
import {
  relayCodexEnvironment,
  relayNodeToolchainReadRoots,
  resolveRelayCodexExecutable,
} from "../src/relay-environment.ts";

type RunRecord = {
  version: number;
  fixture: string;
  model: string;
  effort: string;
  preparedAt: string;
  status: string;
  prompt: string;
  startedAt?: string;
  finishedAt?: string;
  exitCode?: number;
};

const requested = process.argv[2];
if (!requested) {
  console.error("Usage: npm run reviewer:execute -- docs/reviewer-runs/<prepared-run>");
  process.exit(1);
}

const root = await realpath(process.cwd());
const runsRoot = path.join(root, "docs", "reviewer-runs");
const runRoot = path.resolve(root, requested);
if (path.dirname(runRoot) !== runsRoot) {
  throw new Error(`Reviewer run must be one direct child of ${runsRoot}`);
}

const runPath = path.join(runRoot, "RUN.json");
const run = JSON.parse(await readFile(runPath, "utf8")) as RunRecord;
const validModels = new Set(["gpt-5.6-sol", "gpt-5.6-terra", "gpt-5.6-luna"]);
const validEfforts = new Set(["low", "medium", "high", "xhigh"]);
if (
  run.version !== 1 ||
  run.status !== "PREPARED" ||
  !validModels.has(run.model) ||
  !validEfforts.has(run.effort) ||
  typeof run.prompt !== "string" ||
  run.prompt.trim() === ""
) {
  throw new Error(`Reviewer run is not a prepared version-1 run: ${run.status}`);
}

run.status = "RUNNING";
run.startedAt = new Date().toISOString();
await writeFile(runPath, `${JSON.stringify(run, null, 2)}\n`, "utf8");

const project = await realpath(path.join(runRoot, "project"));
if (!project.startsWith(`${runRoot}${path.sep}`)) {
  throw new Error("Reviewer project resolves outside its prepared run folder.");
}
const codex = resolveRelayCodexExecutable();
const args = [
  "--ask-for-approval", "never",
  "exec",
  "--ephemeral",
  "--ignore-user-config",
  "--ignore-rules",
  "--json",
  "--color", "never",
  "-C", project,
  "-m", run.model,
  "-c", `model_reasoning_effort=\"${run.effort}\"`,
  ...codexProjectPermissionArgs({
    workspaceAccess: "write",
    trustedReadRoots: [
      path.join(root, ".agents", "skills", "koda-c-review"),
      path.join(root, "src"),
      path.join(root, "package.json"),
      codex,
      ...relayNodeToolchainReadRoots(),
    ],
  }),
  run.prompt,
];
const executed = spawnSync(codex, args, {
  cwd: root,
  encoding: "utf8",
  env: relayCodexEnvironment(process.env),
  maxBuffer: 50 * 1024 * 1024,
});

const stdout = executed.stdout ?? "";
const stderr = executed.stderr ?? String(executed.error ?? "");
await Promise.all([
  writeFile(path.join(runRoot, "CODEX-EVENTS.jsonl"), stdout, "utf8"),
  writeFile(path.join(runRoot, "CODEX-STDERR.txt"), stderr, "utf8"),
]);
process.stdout.write(stdout);
process.stderr.write(stderr);

run.status = executed.status === 0 ? "RUN_COMPLETE_AWAITING_EVALUATION" : "RUN_FAILED";
run.finishedAt = new Date().toISOString();
run.exitCode = executed.status ?? -1;
await writeFile(runPath, `${JSON.stringify(run, null, 2)}\n`, "utf8");

const resultPath = path.join(runRoot, "RESULT.md");
const result = await readFile(resultPath, "utf8");
await writeFile(resultPath, result
  .replace("- Status: PREPARED — NOT RUN", `- Status: ${run.status}`)
  .replace("- Codex event log: `CODEX-EVENTS.jsonl` after execution", "- Codex event log: [`CODEX-EVENTS.jsonl`](CODEX-EVENTS.jsonl)"), "utf8");

console.log(`\nDurable run evidence: ${runRoot}`);
console.log("The blind run is complete but not graded. Compare its review with sealed fixture metadata and finish RESULT.md.");
process.exitCode = executed.status ?? 1;
