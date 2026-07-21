import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { chmod, lstat, readFile, realpath, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

import type { PreparedGuideRuntime } from "./guide-runtime.ts";
import { nowIso, writeJsonAtomic, writeTextAtomic } from "./project.ts";
import { relayRoleEnvironment } from "./relay-environment.ts";

export interface RoleLauncherPaths {
  reviewer: string;
  producer: string;
}

export interface RoleLauncherDependencies {
  codexExecutable?: string;
}

function packageRoot(): string {
  return path.dirname(path.dirname(fileURLToPath(import.meta.url)));
}

async function codexExecutable(override?: string): Promise<string> {
  const configured = override ?? process.env.KODA_CODEX_BIN ?? "codex";
  if (path.isAbsolute(configured)) return realpath(configured);
  const found = spawnSync("/usr/bin/which", [configured], { encoding: "utf8" });
  if (found.status !== 0 || !(found.stdout ?? "").trim()) {
    throw new Error(`Role launch cannot find the Codex executable named ${configured}.`);
  }
  return realpath((found.stdout ?? "").trim());
}

export function roleLauncherSource(options: {
  executable: string;
  project: string;
  script: string;
  scriptArgs: string[];
  environmentSource?: NodeJS.ProcessEnv;
}): string {
  const environment = relayRoleEnvironment(options.executable, options.environmentSource);
  const shellWord = (value: string): string => `'${value.replaceAll("'", `'"'"'`)}'`;
  const environmentArguments = Object.entries(environment).map(([key, value]) => {
    if (value === undefined) throw new Error(`Role environment is missing ${key}.`);
    return `${key}=${value}`;
  });
  const command = [
    "/usr/bin/env",
    "-i",
    ...environmentArguments,
    process.execPath,
    options.script,
    ...options.scriptArgs,
  ].map(shellWord);
  return [
    "#!/bin/sh",
    "set -eu",
    `cd ${shellWord(options.project)}`,
    `exec ${command.join(" \\\n  ")}`,
    "",
  ].join("\n");
}

const LEGACY_ROLE_ENVIRONMENT_ORDER = [
  "HOME", "USER", "LOGNAME", "TMPDIR", "LANG", "LC_ALL", "LC_CTYPE",
  "TERM", "COLORTERM", "NO_COLOR", "PATH", "KODA_CODEX_BIN",
] as const;

type LauncherOptions = Parameters<typeof roleLauncherSource>[0];
type LauncherResult = { status: "created" | "current" | "migrated"; priorSha256?: string; sha256: string };
type LauncherPlan = LauncherResult & { observedSha256?: string };

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function shellWord(value: string): string {
  return `'${value.replaceAll("'", `'"'"'`)}'`;
}

function decodeGeneratedShellWord(value: string): string | null {
  if (!value.startsWith("'") || !value.endsWith("'")) return null;
  const decoded = value.slice(1, -1).replaceAll(`'"'"'`, "'");
  return shellWord(decoded) === value ? decoded : null;
}

/**
 * A prior Koda-C launcher may differ in terminal-derived environment values after
 * an upgrade. It is safe to replace only when its complete shell structure,
 * allowlisted environment keys, and executable/script/argument tail still match
 * this exact runtime. The legacy file is never executed during validation.
 */
export function compatibleRoleLauncherSource(content: string, options: LauncherOptions): boolean {
  const lines = content.split("\n");
  if (lines.at(-1) !== "") return false;
  lines.pop();
  if (
    lines[0] !== "#!/bin/sh" ||
    lines[1] !== "set -eu" ||
    lines[2] !== `cd ${shellWord(options.project)}` ||
    lines[3] !== `exec ${shellWord("/usr/bin/env")} \\`
  ) return false;
  const tokenLines = lines.slice(4);
  if (tokenLines.length < 5) return false;
  const words: string[] = [];
  for (let index = 0; index < tokenLines.length; index += 1) {
    const continued = index < tokenLines.length - 1;
    const line = tokenLines[index]!;
    const suffix = continued ? " \\" : "";
    if (!line.startsWith("  ") || !line.endsWith(suffix)) return false;
    const token = line.slice(2, suffix ? -suffix.length : undefined);
    const decoded = decodeGeneratedShellWord(token);
    if (decoded === null) return false;
    words.push(decoded);
  }
  if (words.shift() !== "-i") return false;
  const expectedTail = [process.execPath, options.script, ...options.scriptArgs];
  if (words.length < expectedTail.length + 2) return false;
  const actualTail = words.slice(-expectedTail.length);
  if (actualTail.some((word, index) => word !== expectedTail[index])) return false;
  const environmentWords = words.slice(0, -expectedTail.length);
  const seen = new Set<string>();
  let priorOrder = -1;
  const environment = new Map<string, string>();
  for (const word of environmentWords) {
    const separator = word.indexOf("=");
    if (separator < 1) return false;
    const key = word.slice(0, separator);
    const value = word.slice(separator + 1);
    const order = LEGACY_ROLE_ENVIRONMENT_ORDER.indexOf(key as typeof LEGACY_ROLE_ENVIRONMENT_ORDER[number]);
    if (order < 0 || order <= priorOrder || seen.has(key) || /[\u0000-\u001f\u007f]/u.test(value)) return false;
    seen.add(key);
    environment.set(key, value);
    priorOrder = order;
  }
  const expected = relayRoleEnvironment(options.executable, options.environmentSource);
  return environment.get("PATH") === expected.PATH &&
    environment.get("KODA_CODEX_BIN") === options.executable;
}

async function inspectLauncher(file: string, content: string, options: LauncherOptions): Promise<LauncherPlan> {
  const currentSha256 = sha256(content);
  let metadata;
  try {
    metadata = await lstat(file);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return { status: "created", sha256: currentSha256 };
    throw error;
  }
  if (!metadata.isFile() || metadata.isSymbolicLink()) {
    throw new Error(`Existing Koda-C role launcher is unsafe or changed: ${file}`);
  }
  const existing = await readFile(file, "utf8");
  const observedSha256 = sha256(existing);
  if (existing === content) return { status: "current", sha256: currentSha256, observedSha256 };
  if (!compatibleRoleLauncherSource(existing, options)) {
    throw new Error(`Existing Koda-C role launcher is unsafe or changed: ${file}`);
  }
  return { status: "migrated", priorSha256: observedSha256, sha256: currentSha256, observedSha256 };
}

async function applyLauncherPlan(file: string, content: string, plan: LauncherPlan): Promise<LauncherResult> {
  if (plan.status === "created") {
    await writeFile(file, content, { encoding: "utf8", mode: 0o700, flag: "wx" });
  } else {
    const metadata = await lstat(file);
    const existing = metadata.isFile() && !metadata.isSymbolicLink() ? await readFile(file, "utf8") : null;
    if (existing === null || sha256(existing) !== plan.observedSha256) {
      throw new Error(`Koda-C role launcher changed during verification: ${file}`);
    }
    if (plan.status === "migrated") await writeTextAtomic(file, content);
  }
  await chmod(file, 0o700);
  const { observedSha256: _observed, ...result } = plan;
  return result;
}

export async function prepareRoleLaunchers(
  project: string,
  prepared: PreparedGuideRuntime,
  dependencies: RoleLauncherDependencies = {},
): Promise<RoleLauncherPaths> {
  const executable = await codexExecutable(dependencies.codexExecutable);
  const scripts = path.join(packageRoot(), "scripts");
  const reviewerLauncher = path.join(prepared.runRoot, "launch-reviewer.sh");
  const producerLauncher = path.join(prepared.runRoot, "launch-producer.sh");
  const reviewerOptions: LauncherOptions = {
    executable,
    project,
    script: path.join(scripts, "run-relay-reviewer-window.ts"),
    scriptArgs: [prepared.runRoot],
  };
  const producerOptions: LauncherOptions = {
    executable,
    project,
    script: path.join(scripts, "execute-relay-run.ts"),
    scriptArgs: ["--reviewer-window", prepared.runRoot],
  };
  const reviewerContent = roleLauncherSource(reviewerOptions);
  const producerContent = roleLauncherSource(producerOptions);
  const [reviewerPlan, producerPlan] = await Promise.all([
    inspectLauncher(reviewerLauncher, reviewerContent, reviewerOptions),
    inspectLauncher(producerLauncher, producerContent, producerOptions),
  ]);
  const [reviewerResult, producerResult] = await Promise.all([
    applyLauncherPlan(reviewerLauncher, reviewerContent, reviewerPlan),
    applyLauncherPlan(producerLauncher, producerContent, producerPlan),
  ]);
  const migrated = [
    { role: "reviewer", ...reviewerResult },
    { role: "producer", ...producerResult },
  ].filter((result) => result.status === "migrated");
  if (migrated.length > 0) {
    await writeJsonAtomic(path.join(prepared.runRoot, "LAUNCHER-MIGRATION.json"), {
      version: 1,
      migratedAt: nowIso(),
      launchId: prepared.launch.id,
      launchers: migrated,
    });
  }
  return { reviewer: reviewerLauncher, producer: producerLauncher };
}
