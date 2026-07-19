import { lstat, mkdir, readdir, readFile, rename, unlink, writeFile } from "node:fs/promises";
import path from "node:path";


import { assertSafeSessionsDirectory, pathExists, validatePhaseChain } from "./config.js";

const SESSION_PATTERN = /^(\d{4}-\d{2}-\d{2})-(\d{2})$/;

export function now()       {
  const override = process.env.KODA_NOW;
  if (!override) return new Date();

  const parsed = new Date(override);
  if (Number.isNaN(parsed.valueOf())) {
    throw new Error("KODA_NOW must be an ISO-8601 date when set.");
  }
  return parsed;
}

export function nowIso()         {
  return now().toISOString();
}

export function localDateStamp(date = now())         {
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function phasePrefix(index        )         {
  return String(index + 1).padStart(2, "0");
}

export function sessionRoot(root        , config               , id        )         {
  return path.join(root, config.sessionsDir, id);
}

export function statePath(sessionDir        )         {
  return path.join(sessionDir, "state.json");
}

export function ledgerPath(sessionDir        )         {
  return path.join(sessionDir, "approvals.md");
}

export function artifactPath(sessionDir        , phase             , index        )         {
  return path.join(sessionDir, "phases", `${phasePrefix(index)}-${phase.name}.md`);
}

export function reviewPath(sessionDir        , phase             , index        )         {
  return path.join(sessionDir, "reviews", `${phasePrefix(index)}-${phase.name}-review.md`);
}

export async function writeTextAtomic(filePath        , content        )                {
  const temporary = `${filePath}.tmp-${process.pid}-${Math.random().toString(16).slice(2)}`;
  try {
    await writeFile(temporary, content, { encoding: "utf8", flag: "wx" });
    await rename(temporary, filePath);
  } finally {
    await unlink(temporary).catch((error) => {
      if ((error                         ).code !== "ENOENT") throw error;
    });
  }
}

export async function writeJsonAtomic(filePath        , value         )                {
  await writeTextAtomic(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

export async function listSessionIds(root        , config               )                    {
  const sessionsPath = path.join(root, config.sessionsDir);
  if (!(await pathExists(sessionsPath))) return [];

  const entries = await readdir(sessionsPath, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory() && SESSION_PATTERN.test(entry.name))
    .map((entry) => entry.name)
    .sort();
}

export async function latestSessionId(root        , config               )                         {
  const sessions = await listSessionIds(root, config);
  return sessions.at(-1) ?? null;
}

export async function nextSessionId(root        , config               )                  {
  const date = localDateStamp();
  const sessions = await listSessionIds(root, config);
  const sequence = sessions
    .map((id) => SESSION_PATTERN.exec(id))
    .filter((match)                           => match !== null && match[1] === date)
    .reduce((highest, match) => Math.max(highest, Number(match[2])), 0) + 1;

  if (sequence > 99) {
    throw new Error(`No session numbers remain for ${date}.`);
  }
  return `${date}-${String(sequence).padStart(2, "0")}`;
}

export async function createSession(
  root        ,
  config               ,
  prompt        ,
  options                                             = {},
)                                                                  {
  if (prompt.trim() === "") {
    throw new Error("The session prompt must exist and be non-empty.");
  }
  validatePhaseChain(config.phases);
  await assertSafeSessionsDirectory(root, config);

  const id = await nextSessionId(root, config);
  const directory = sessionRoot(root, config, id);
  await mkdir(path.join(directory, "phases"), { recursive: true });
  await mkdir(path.join(directory, "reviews", "history"), { recursive: true });

  const state               = {
    version: 1,
    id,
    createdAt: nowIso(),
    phases: config.phases.map((phase) => ({ ...phase })),
    currentPhaseIndex: 0,
    advances: [],
    ...(options.entryDirections?.length
      ? { entryDirections: options.entryDirections.map((direction) => ({ ...direction })) }
      : {}),
  };

  await writeTextAtomic(path.join(directory, "session-prompt.md"), prompt.endsWith("\n") ? prompt : `${prompt}\n`);
  await writeTextAtomic(
    ledgerPath(directory),
    `# Approval ledger — ${id}\n\nEntries are appended by Koda after the approver quotes a review receipt.\n`,
  );
  await writeJsonAtomic(statePath(directory), state);

  return { id, directory, state };
}

export function validateSessionState(value         , expectedId         )               {
  if (!value || typeof value !== "object") {
    throw new Error("state.json must contain a JSON object.");
  }
  const state = value                         ;
  if (
    state.version !== 1 ||
    typeof state.id !== "string" ||
    !SESSION_PATTERN.test(state.id) ||
    typeof state.createdAt !== "string" ||
    (expectedId && state.id !== expectedId)
  ) {
    throw new Error("state.json has invalid session identity or version.");
  }
  if (!Array.isArray(state.phases) || state.phases.length === 0) {
    throw new Error("state.json has no phase chain.");
  }
  validatePhaseChain(state.phases, "state.json");
  if (!Number.isInteger(state.currentPhaseIndex) || state.currentPhaseIndex  < 0 || state.currentPhaseIndex  > state.phases.length) {
    throw new Error("state.json has an invalid currentPhaseIndex.");
  }
  if (!Array.isArray(state.advances)) {
    throw new Error("state.json has no advancement history.");
  }
  if (state.advances.length !== state.currentPhaseIndex) {
    throw new Error("state.json advancement history does not match the current phase.");
  }
  const directionIds = new Set        ();
  if (state.entryDirections !== undefined) {
    if (!Array.isArray(state.entryDirections)) throw new Error("state.json entryDirections must be an array.");
    for (const direction of state.entryDirections) {
      if (
        !direction ||
        typeof direction.id !== "string" || !/^[0-9a-f-]{36}$/.test(direction.id) ||
        typeof direction.sessionId !== "string" || !SESSION_PATTERN.test(direction.sessionId) ||
        typeof direction.sha256 !== "string" || !/^[0-9a-f]{64}$/.test(direction.sha256) ||
        directionIds.has(direction.id)
      ) {
        throw new Error("state.json has an invalid or duplicate entry direction.");
      }
      directionIds.add(direction.id);
    }
  }
  for (let index = 0; index < state.advances.length; index += 1) {
    const advance = state.advances[index];
    if (
      !advance ||
      advance.phase !== state.phases[index]?.name ||
      typeof advance.receipt !== "string" ||
      typeof advance.reviewId !== "string" ||
      typeof advance.advancedAt !== "string" ||
      (advance.directions !== undefined && !Array.isArray(advance.directions))
    ) {
      throw new Error(`state.json has an invalid advancement record at index ${index}.`);
    }
    for (const directionId of advance.directions ?? []) {
      if (typeof directionId !== "string" || !/^[0-9a-f-]{36}$/.test(directionId) || directionIds.has(directionId)) {
        throw new Error(`state.json has an invalid or reused direction at advancement ${index}.`);
      }
      directionIds.add(directionId);
    }
  }
  return state                ;
}

export async function loadSessionState(directory        , expectedId         )                        {
  let parsed         ;
  try {
    parsed = JSON.parse(await readRegularText(statePath(directory), "state.json"));
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error("state.json is not valid JSON.");
    }
    throw error;
  }
  return validateSessionState(parsed, expectedId);
}

export async function saveSessionState(directory        , state              )                {
  await writeJsonAtomic(statePath(directory), state);
}

export async function loadLatestSession(
  root        ,
  config               ,
)                                                                  {
  const id = await latestSessionId(root, config);
  if (!id) {
    throw new Error("No session exists. Start one with `koda session new <prompt-file>`." );
  }
  const directory = sessionRoot(root, config, id);
  return { id, directory, state: await loadSessionState(directory, id) };
}

export function currentPhase(state              )                                               {
  if (state.currentPhaseIndex >= state.phases.length) return null;
  return { phase: state.phases[state.currentPhaseIndex], index: state.currentPhaseIndex };
}

export function displayPath(root        , filePath        )         {
  const relative = path.relative(root, filePath);
  return relative === "" ? "." : relative;
}

export async function readNonEmpty(filePath        )                         {
  if (!(await pathExists(filePath))) return null;
  const content = await readRegularText(filePath, path.basename(filePath));
  return content.trim() === "" ? null : content;
}

export async function readRegularText(filePath        , label = "Evidence file")                  {
  const metadata = await lstat(filePath);
  if (!metadata.isFile()) {
    throw new Error(`${label} must be a regular file; symbolic links and special files are refused.`);
  }
  return readFile(filePath, "utf8");
}


//# sourceURL=/Users/freeborn/Dev/koda-codex/src/project.ts