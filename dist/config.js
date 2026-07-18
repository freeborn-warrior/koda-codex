import { access, readFile, realpath, stat } from "node:fs/promises";
import path from "node:path";

                                                             

export const CONFIG_FILE = "koda.config.json";

export const DEFAULT_PHASES                = [
  { name: "brief", description: "What we are doing, why, and the limits" },
  { name: "orient", description: "Read and record the actual ground before planning" },
  { name: "plan", description: "Set out the work in checkable steps" },
  { name: "produce", description: "Create the session's real output" },
  { name: "live", description: "Exercise the real output and record what happened" },
  { name: "summary", description: "Verify and record what was completed" },
];

export const DEFAULT_CONFIG                = {
  version: 1,
  sessionsDir: "docs/sessions",
  phases: DEFAULT_PHASES,
};

export async function pathExists(candidate        )                   {
  try {
    await access(candidate);
    return true;
  } catch (error) {
    if ((error                         ).code === "ENOENT" || (error                         ).code === "ENOTDIR") {
      return false;
    }
    throw error;
  }
}

export async function findProjectRoot(start = process.cwd())                  {
  let current = path.resolve(start);

  while (true) {
    if (await pathExists(path.join(current, CONFIG_FILE))) {
      return current;
    }

    const parent = path.dirname(current);
    if (parent === current) {
      throw new Error(`No ${CONFIG_FILE} found. Run \`koda init\` first.`);
    }
    current = parent;
  }
}

export function validatePhaseChain(value         , source = CONFIG_FILE)                {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`${source} must declare at least one phase.`);
  }
  const names = new Set        ();
  for (const phase of value) {
    if (!phase || typeof phase.name !== "string" || !/^[a-z0-9][a-z0-9-]*$/.test(phase.name)) {
      throw new Error(`${source}: every phase name must use lowercase letters, numbers, or hyphens.`);
    }
    if (names.has(phase.name)) {
      throw new Error(`Duplicate phase name: ${phase.name}`);
    }
    if (typeof phase.description !== "string" || phase.description.trim() === "") {
      throw new Error(`Phase ${phase.name} needs a description.`);
    }
    names.add(phase.name);
  }
  return value                 ;
}

export function validateConfig(value         )                {
  if (!value || typeof value !== "object") {
    throw new Error(`${CONFIG_FILE} must contain a JSON object.`);
  }

  const candidate = value                          ;
  if (candidate.version !== 1) {
    throw new Error(`${CONFIG_FILE} has an unsupported version.`);
  }
  if (
    typeof candidate.sessionsDir !== "string" ||
    candidate.sessionsDir.trim() === "" ||
    path.isAbsolute(candidate.sessionsDir) ||
    candidate.sessionsDir.split(/[\\/]/).includes("..")
  ) {
    throw new Error(`${CONFIG_FILE} sessionsDir must be a non-empty relative path.`);
  }
  validatePhaseChain(candidate.phases);

  return candidate                 ;
}

export async function assertSafeSessionsDirectory(root        , config               )                  {
  const resolvedRoot = await realpath(root);
  const candidate = path.resolve(root, config.sessionsDir);
  const resolved = await realpath(candidate).catch((error) => {
    if ((error                         ).code === "ENOENT") {
      throw new Error(`${CONFIG_FILE} sessionsDir does not exist: ${candidate}`);
    }
    throw error;
  });
  const relative = path.relative(resolvedRoot, resolved);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error(`${CONFIG_FILE} sessionsDir resolves outside the project root.`);
  }
  if (!(await stat(resolved)).isDirectory()) {
    throw new Error(`${CONFIG_FILE} sessionsDir must resolve to a directory.`);
  }
  return resolved;
}

export async function readProjectConfig(root        )                         {
  const configPath = path.join(root, CONFIG_FILE);
  let parsed         ;
  try {
    parsed = JSON.parse(await readFile(configPath, "utf8"));
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error(`${CONFIG_FILE} is not valid JSON.`);
    }
    throw error;
  }
  const config = validateConfig(parsed);
  await assertSafeSessionsDirectory(root, config);
  return config;
}


//# sourceURL=/Users/freeborn/Dev/koda-codex/src/config.ts