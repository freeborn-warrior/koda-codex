import { spawnSync } from "node:child_process";
import { cp, lstat, mkdir, readdir, readFile, realpath } from "node:fs/promises";
import path from "node:path";
import { createInterface } from "node:readline/promises";
import { fileURLToPath } from "node:url";

const packageRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const templateRoot = path.join(packageRoot, "demo", "full-session-project");
const cli = path.join(packageRoot, "dist", "cli.js");
const promptRelative = path.join("docs", "guide", "prompts", "first-session.md");
const skillNames = [
  "koda-c-session-prompt",
  "koda-c-session",
  "koda-c-brief",
  "koda-c-orient",
  "koda-c-plan",
  "koda-c-produce",
  "koda-c-live",
  "koda-c-summary",
  "koda-c-review",
  "koda-c-close",
];

function option(args: string[], name: string): string | null {
  const index = args.indexOf(name);
  if (index === -1) return null;
  const value = args[index + 1];
  if (!value || value.startsWith("--")) throw new Error(`${name} needs a value.`);
  args.splice(index, 2);
  return value;
}

function flag(args: string[], name: string): boolean {
  const index = args.indexOf(name);
  if (index === -1) return false;
  args.splice(index, 1);
  return true;
}

function run(executable: string, args: string[], cwd: string): string {
  const result = spawnSync(executable, args, { cwd, encoding: "utf8", env: process.env });
  if (result.status !== 0) {
    const detail = [result.stdout, result.stderr].filter(Boolean).join("\n").trim();
    throw new Error(detail || `${path.basename(executable)} exited ${result.status ?? "without a status"}.`);
  }
  return (result.stdout ?? "").trim();
}

function shellQuote(value: string): string {
  return `'${value.replaceAll("'", `'"'"'`)}'`;
}

function timestamp(): string {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

async function requireSafeTree(root: string, label: string): Promise<void> {
  const metadata = await lstat(root);
  if (!metadata.isDirectory() || metadata.isSymbolicLink()) throw new Error(`${label} must be a real directory.`);
  for (const entry of await readdir(root, { withFileTypes: true })) {
    const candidate = path.join(root, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`${label} contains a symbolic link and is refused: ${entry.name}.`);
    if (entry.isDirectory()) await requireSafeTree(candidate, label);
    else if (!entry.isFile()) throw new Error(`${label} contains a non-regular entry and is refused: ${entry.name}.`);
  }
}

async function requireEmptyTarget(target: string): Promise<void> {
  const root = path.parse(target).root;
  if (path.resolve(target) === root) throw new Error("The full-session demo target cannot be a filesystem root.");
  try {
    const metadata = await lstat(target);
    if (!metadata.isDirectory() || metadata.isSymbolicLink()) throw new Error("The demo target must be a real directory.");
    if ((await readdir(target)).length > 0) throw new Error(`The demo target is not empty: ${target}`);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    await mkdir(target, { recursive: true });
  }
}

async function prepare(target: string, owner: string): Promise<void> {
  await requireEmptyTarget(target);
  await requireSafeTree(templateRoot, "The bundled full-session template");
  await cp(templateRoot, target, { recursive: true, errorOnExist: true, force: false });

  const skillTarget = path.join(target, ".agents", "skills");
  await mkdir(skillTarget, { recursive: true });
  for (const name of skillNames) {
    const source = path.join(packageRoot, ".agents", "skills", name);
    await requireSafeTree(source, `Skill ${name}`);
    await cp(source, path.join(skillTarget, name), { recursive: true, errorOnExist: true, force: false });
  }

  run("git", ["init", "-b", "main"], target);
  run("git", ["config", "user.name", "Koda-C Demo"], target);
  run("git", ["config", "user.email", "koda-c-demo@example.invalid"], target);
  run("git", ["add", "--all"], target);
  run("git", ["commit", "-m", "chore: initialize Koda-C full-session demo"], target);

  const remote = path.join(target, ".runtime", "remote.git");
  await mkdir(path.dirname(remote), { recursive: true });
  run("git", ["init", "--bare", "--initial-branch=main", remote], target);
  run("git", ["remote", "add", "origin", ".runtime/remote.git"], target);
  run("git", ["push", "--set-upstream", "origin", "main"], target);

  run(process.execPath, [cli, "guide", "confirm", promptRelative, "--owner", owner, "--kind", "produce"], target);
  run("git", ["add", "--", "docs/guide/launches"], target);
  run("git", ["commit", "-m", "guide: confirm full-session demo"], target);
  run("git", ["push", "origin", "main"], target);
  run(process.execPath, [cli, "guide", "verify"], target);
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const shouldOpen = flag(args, "--open");
  const confirmed = flag(args, "--confirm");
  const requestedOwner = option(args, "--owner");
  const requestedDirectory = option(args, "--directory");
  if (args.length) throw new Error(`Unknown option: ${args[0]}`);

  const target = path.resolve(requestedDirectory ?? path.join(
    packageRoot,
    ".koda",
    "full-session-demos",
    timestamp(),
    "project",
  ));
  const prompt = await readFile(path.join(templateRoot, promptRelative), "utf8");
  const terminal = createInterface({ input: process.stdin, output: process.stdout });
  try {
    console.log("────────────────────────────────────────────────────────");
    console.log("KODA-C FULL-SESSION QUICK START");
    console.log("");
    console.log("This creates a disposable project inside the Koda-C folder.");
    console.log("It uses its own local Git remote. It cannot push into Koda-C.");
    console.log("────────────────────────────────────────────────────────");
    console.log("");
    console.log(prompt.trim());
    console.log("");

    const owner = (requestedOwner ?? await terminal.question("Name to use in review and approval records: ")).trim();
    if (!owner || /[\u0000-\u001f\u007f-\u009f]/.test(owner)) throw new Error("The owner name must be visible non-control text.");
    let choice = confirmed ? "1" : "";
    if (!confirmed) {
      console.log("────────────────────────────────────────────────────────");
      console.log("1. CONFIRM — prepare this exact session and its isolated Git evidence.");
      console.log("2. CANCEL — create nothing.");
      choice = (await terminal.question("Choose 1 or 2: ")).trim();
    }
    if (choice === "2") {
      console.log("CANCELLED — nothing was created.");
      return;
    }
    if (choice !== "1") throw new Error("Choose exactly 1 or 2. Nothing was created.");

    await prepare(target, owner);
    console.log("────────────────────────────────────────────────────────");
    console.log("READY — FULL SESSION");
    console.log("");
    console.log(`Project: ${target}`);
    console.log("The prompt is confirmed, committed, pushed, and mechanically verified.");
    console.log("Guide will show the launch choice. Choose 1 there to open Reviewer and Producer.");
    console.log("────────────────────────────────────────────────────────");
    console.log("");

    if (!shouldOpen) {
      console.log("Open Guide later with:");
      console.log(`cd ${shellQuote(target)}`);
      console.log(`${shellQuote(process.execPath)} ${shellQuote(cli)} guide open --model gpt-5.6-sol --effort medium --producer-model gpt-5.6-sol --producer-effort medium --reviewer-model gpt-5.6-terra --reviewer-effort medium`);
      return;
    }
    terminal.close();
    const status = spawnSync(process.execPath, [
      cli,
      "guide", "open",
      "--model", "gpt-5.6-sol",
      "--effort", "medium",
      "--producer-model", "gpt-5.6-sol",
      "--producer-effort", "medium",
      "--reviewer-model", "gpt-5.6-terra",
      "--reviewer-effort", "medium",
    ], { cwd: target, stdio: "inherit", env: process.env }).status;
    if (status !== 0) throw new Error("Guide did not close cleanly. The prepared project remains on disk for recovery.");
  } finally {
    terminal.close();
  }
}

main().catch((error) => {
  console.error(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
});
