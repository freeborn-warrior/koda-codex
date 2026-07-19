import { randomUUID } from "node:crypto";
import { lstat, mkdir, readdir, realpath } from "node:fs/promises";
import path from "node:path";

import { closePath, evaluateSessionClosure } from "./close.js";
import { pathExists } from "./config.js";
import { carryDirectionsForNextSession, carryPendingDirectionsAfterHalt } from "./direction.js";
import { checkGitFilesPushed } from "./git.js";
import { evaluateSessionHalt, haltPath } from "./halt.js";
import {
  displayPath,
  latestSessionId,
  listSessionIds,
  loadSessionState,
  nowIso,
  readRegularText,
  sessionRoot,
  SESSION_PATTERN,
  writeJsonAtomic,
} from "./project.js";
import { sha256 } from "./receipt.js";


const MANIFEST_FILE = "project.json";
const REQUIRED_PROMPT_HEADINGS = [
  "## Owner intent",
  "## In scope",
  "## Out of scope",
  "## Success evidence",
  "## Constraints and owner rulings",
  "## Prior session carry-forward",
  "## Relay handover",
];



























































function assertRelativeProjectPath(value        , label        )       {
  if (
    value.trim() === "" ||
    path.isAbsolute(value) ||
    value.split(/[\\/]/).includes("..")
  ) {
    throw new Error(`${label} must be a non-empty project-relative path without '..'.`);
  }
}

function within(parent        , candidate        )          {
  const relative = path.relative(parent, candidate);
  return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
}

async function readContainedRegularText(root        , candidate        , label        )                  {
  const [resolvedRoot, resolvedCandidate] = await Promise.all([realpath(root), realpath(candidate)]);
  if (!within(resolvedRoot, resolvedCandidate)) {
    throw new Error(`${label} resolves outside the project root.`);
  }
  return readRegularText(candidate, label);
}

async function ensureRealDirectory(root        , candidate        , label        )                {
  const resolvedRoot = await realpath(root);
  if (await pathExists(candidate)) {
    const metadata = await lstat(candidate);
    if (!metadata.isDirectory()) throw new Error(`${label} must be a real directory; symbolic links are refused.`);
    const resolved = await realpath(candidate);
    if (!within(resolvedRoot, resolved)) throw new Error(`${label} resolves outside the project root.`);
    return;
  }
  const parent = path.dirname(candidate);
  const resolvedParent = await realpath(parent);
  if (!within(resolvedRoot, resolvedParent)) throw new Error(`${label} parent resolves outside the project root.`);
  await mkdir(candidate);
}

export function guideRoot(root        , config               )         {
  return path.join(root, path.dirname(config.sessionsDir), "guide");
}

export function guideManifestPath(root        , config               )         {
  return path.join(guideRoot(root, config), MANIFEST_FILE);
}

export function guidePromptsDir(root        , config               )         {
  return path.join(guideRoot(root, config), "prompts");
}

export function guideLaunchesDir(root        , config               )         {
  return path.join(guideRoot(root, config), "launches");
}

export function guideCancellationsDir(root        , config               )         {
  return path.join(guideRoot(root, config), "cancellations");
}

function validateManifest(value         )                       {
  if (!value || typeof value !== "object") throw new Error(`${MANIFEST_FILE} must contain a JSON object.`);
  const candidate = value                                 ;
  if (
    candidate.version !== 1 ||
    typeof candidate.project !== "string" ||
    candidate.project.trim() === "" ||
    !Array.isArray(candidate.continuityFiles) ||
    candidate.continuityFiles.length === 0
  ) {
    throw new Error(`${MANIFEST_FILE} must name the project and at least one continuity file.`);
  }
  const seen = new Set        ();
  for (const file of candidate.continuityFiles) {
    if (typeof file !== "string") throw new Error(`${MANIFEST_FILE} continuity files must be strings.`);
    assertRelativeProjectPath(file, `${MANIFEST_FILE} continuity file`);
    if (seen.has(file)) throw new Error(`${MANIFEST_FILE} lists a continuity file more than once: ${file}.`);
    seen.add(file);
  }
  return candidate                        ;
}

export async function hasGuideManifest(root        , config               )                   {
  return pathExists(guideManifestPath(root, config));
}

export async function loadGuideManifest(root        , config               )                                {
  const file = guideManifestPath(root, config);
  let parsed         ;
  try {
    parsed = JSON.parse(await readContainedRegularText(root, file, "Guide project manifest"));
  } catch (error) {
    if (error instanceof SyntaxError) throw new Error(`${MANIFEST_FILE} is not valid JSON.`);
    throw error;
  }
  return validateManifest(parsed);
}

async function hashProjectFile(root        , relative        , label        )                             {
  assertRelativeProjectPath(relative, label);
  const file = path.resolve(root, relative);
  const content = await readContainedRegularText(root, file, label);
  if (content.trim() === "") throw new Error(`${label} is empty: ${relative}.`);
  return { path: relative.split(path.sep).join("/"), sha256: sha256(content) };
}

export async function snapshotContinuity(
  root        ,
  manifest                      ,
)                               {
  const result                      = [];
  for (const file of manifest.continuityFiles) {
    result.push(await hashProjectFile(root, file, "Guide continuity file"));
  }
  return result;
}

function parseLaunch(value         , source        )                     {
  if (!value || typeof value !== "object") throw new Error(`${source} must contain a JSON object.`);
  const item = value                               ;
  if (
    item.version !== 1 ||
    typeof item.id !== "string" ||
    item.status !== "READY_TO_LAUNCH" ||
    typeof item.prompt !== "string" ||
    typeof item.promptSha256 !== "string" ||
    !item.manifest || typeof item.manifest.path !== "string" || typeof item.manifest.sha256 !== "string" ||
    !Array.isArray(item.continuity) ||
    !(item.previousSessionId === null || typeof item.previousSessionId === "string") ||
    !(item.previousCloseSha256 === null || typeof item.previousCloseSha256 === "string") ||
    !(item.previousCarryForward === null || typeof item.previousCarryForward === "object") ||
    typeof item.confirmedBy !== "string" ||
    item.confirmedBy.trim() === "" ||
    typeof item.confirmedAt !== "string" ||
    (item.sessionKind !== undefined && (typeof item.sessionKind !== "string" || !/^[a-z][a-z0-9-]{0,31}$/.test(item.sessionKind))) ||
    (item.launchMode !== undefined && item.launchMode !== "independent" && item.launchMode !== "dependent" && item.launchMode !== "continuation") ||
    (item.dependencies !== undefined && !Array.isArray(item.dependencies))
  ) throw new Error(`${source} has invalid READY_TO_LAUNCH data.`);
  assertRelativeProjectPath(item.prompt, `${source} prompt`);
  assertRelativeProjectPath(item.manifest.path, `${source} manifest`);
  const hashPattern = /^[a-f0-9]{64}$/;
  if (!hashPattern.test(item.promptSha256) || !hashPattern.test(item.manifest.sha256)) {
    throw new Error(`${source} has invalid SHA-256 evidence.`);
  }
  if (item.previousSessionId === null) {
    if (item.previousCloseSha256 !== null || item.previousCarryForward !== null) {
      throw new Error(`${source} has prior-session evidence without a prior session.`);
    }
  } else {
    if (
      !item.previousCloseSha256 ||
      !hashPattern.test(item.previousCloseSha256) ||
      !item.previousCarryForward ||
      typeof item.previousCarryForward.path !== "string" ||
      typeof item.previousCarryForward.sha256 !== "string" ||
      !hashPattern.test(item.previousCarryForward.sha256)
    ) throw new Error(`${source} has incomplete prior-session evidence.`);
    assertRelativeProjectPath(item.previousCarryForward.path, `${source} prior carry-forward`);
  }
  for (const evidence of item.continuity) {
    if (!evidence || typeof evidence.path !== "string" || typeof evidence.sha256 !== "string") {
      throw new Error(`${source} has invalid continuity evidence.`);
    }
    assertRelativeProjectPath(evidence.path, `${source} continuity evidence`);
    if (!hashPattern.test(evidence.sha256)) throw new Error(`${source} has invalid continuity SHA-256 evidence.`);
  }
  const dependencies = item.dependencies ?? [];
  const dependencyIds = new Set        ();
  for (const dependency of dependencies) {
    if (
      !dependency || typeof dependency.sessionId !== "string" || !SESSION_PATTERN.test(dependency.sessionId) ||
      (dependency.terminal !== "close" && dependency.terminal !== "halt") ||
      !dependency.evidence || typeof dependency.evidence.path !== "string" || typeof dependency.evidence.sha256 !== "string" ||
      !dependency.carryForward || typeof dependency.carryForward.path !== "string" || typeof dependency.carryForward.sha256 !== "string" ||
      dependencyIds.has(dependency.sessionId) ||
      !hashPattern.test(dependency.evidence.sha256) || !hashPattern.test(dependency.carryForward.sha256)
    ) throw new Error(`${source} has invalid or duplicate dependency evidence.`);
    assertRelativeProjectPath(dependency.evidence.path, `${source} dependency terminal evidence`);
    assertRelativeProjectPath(dependency.carryForward.path, `${source} dependency carry-forward evidence`);
    dependencyIds.add(dependency.sessionId);
  }
  const launchMode = item.launchMode ?? (item.previousSessionId ? "continuation" : "independent");
  if (launchMode === "dependent" && dependencies.length === 0) {
    throw new Error(`${source} declares a dependent launch without dependencies.`);
  }
  item.sessionKind ??= "produce";
  item.launchMode = launchMode;
  item.dependencies = dependencies;
  return item                      ;
}

async function listLaunches(root        , config               )                                {
  const directory = guideLaunchesDir(root, config);
  if (!(await pathExists(directory))) return [];
  const metadata = await lstat(directory);
  if (!metadata.isDirectory()) throw new Error("Guide launches must be a real directory; symbolic links are refused.");
  const launches                       = [];
  for (const entry of (await readdir(directory, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
    if (!entry.name.endsWith(".json")) continue;
    if (!entry.isFile()) throw new Error(`Guide launch evidence must be regular files; refused ${entry.name}.`);
    const content = await readContainedRegularText(root, path.join(directory, entry.name), "Guide launch request");
    try {
      const launch = parseLaunch(JSON.parse(content), entry.name);
      if (entry.name !== `${launch.id}.json`) throw new Error(`${entry.name} does not match its Guide launch ID.`);
      launches.push(launch);
    } catch (error) {
      if (error instanceof SyntaxError) throw new Error(`${entry.name} is not valid JSON.`);
      throw error;
    }
  }
  return launches;
}

async function validBindingExists(root        , config               , launch                    )                   {
  let matched = false;
  for (const sessionId of await listSessionIds(root, config)) {
    const directory = sessionRoot(root, config, sessionId);
    const file = path.join(directory, "guide-launch.json");
    if (!(await pathExists(file))) continue;
    let value         ;
    try {
      value = JSON.parse(await readContainedRegularText(root, file, "Guide launch binding"));
    } catch (error) {
      if (error instanceof SyntaxError) throw new Error(`Session ${sessionId} guide-launch.json is not valid JSON.`);
      throw error;
    }
    const binding = value                               ;
    if (
      !binding ||
      binding.version !== 1 ||
      typeof binding.launchId !== "string" ||
      binding.sessionId !== sessionId ||
      typeof binding.boundAt !== "string"
    ) throw new Error(`Session ${sessionId} guide-launch.json is invalid.`);
    if (binding.launchId !== launch.id) continue;
    if (matched) throw new Error(`Guide launch ${launch.id} is bound to more than one session.`);
    try {
      await loadSessionState(directory, sessionId);
      const promptContent = await readContainedRegularText(root, path.join(directory, "session-prompt.md"), "Bound session prompt");
      if (sha256(promptContent) !== launch.promptSha256) {
        throw new Error("bound session prompt does not match the confirmed prompt hash");
      }
    } catch (error) {
      throw new Error(`Session ${sessionId} guide-launch.json refers to invalid session evidence: ${error instanceof Error ? error.message : String(error)}.`);
    }
    matched = true;
  }
  return matched;
}

async function validCancellationExists(root        , config               , launchId        )                   {
  const file = path.join(guideCancellationsDir(root, config), `${launchId}.json`);
  if (!(await pathExists(file))) return false;
  let value         ;
  try {
    value = JSON.parse(await readContainedRegularText(root, file, "Guide launch cancellation"));
  } catch (error) {
    if (error instanceof SyntaxError) throw new Error(`Guide cancellation ${launchId}.json is not valid JSON.`);
    throw error;
  }
  const cancellation = value                                    ;
  if (
    !cancellation ||
    cancellation.version !== 1 ||
    cancellation.launchId !== launchId ||
    cancellation.status !== "CANCELLED" ||
    typeof cancellation.cancelledBy !== "string" ||
    cancellation.cancelledBy.trim() === "" ||
    typeof cancellation.reason !== "string" ||
    cancellation.reason.trim() === "" ||
    typeof cancellation.cancelledAt !== "string"
  ) throw new Error(`Guide cancellation ${launchId}.json is invalid.`);
  return true;
}

export async function pendingGuideLaunches(root        , config               )                                {
  const result                       = [];
  for (const launch of await listLaunches(root, config)) {
    const [bound, cancelled] = await Promise.all([
      validBindingExists(root, config, launch),
      validCancellationExists(root, config, launch.id),
    ]);
    if (bound && cancelled) throw new Error(`Guide launch ${launch.id} is both bound and cancelled; state is corrupt.`);
    if (!bound && !cancelled) result.push(launch);
  }
  return result;
}

export async function requireGuideCancellationsPushed(root        , config               )                {
  const directory = guideCancellationsDir(root, config);
  if (!(await pathExists(directory))) return;
  const files           = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (!entry.name.endsWith(".json")) continue;
    if (!entry.isFile()) throw new Error(`Guide cancellation evidence must be regular files; refused ${entry.name}.`);
    const launchId = entry.name.slice(0, -".json".length);
    await validCancellationExists(root, config, launchId);
    files.push(path.relative(root, path.join(directory, entry.name)).split(path.sep).join("/"));
  }
  if (!files.length) return;
  const git = checkGitFilesPushed(root, files);
  if (!git.closed) throw new Error(`Guide cancellation is not committed and pushed:\n- ${git.reasons.join("\n- ")}`);
}

export async function cancelGuideLaunch(
  root        ,
  config               ,
  launchId        ,
  cancelledBy        ,
  reason        ,
)                  {
  if (cancelledBy.trim() === "" || /[\r\n]/.test(cancelledBy)) {
    throw new Error("The cancelling owner must be a non-empty single line.");
  }
  if (reason.trim() === "") throw new Error("Launch cancellation requires a reason.");
  const pending = await pendingGuideLaunches(root, config);
  const launch = pending.find((item) => item.id === launchId);
  if (!launch) throw new Error(`Guide launch ${launchId} is not a pending READY_TO_LAUNCH request.`);
  const directory = guideCancellationsDir(root, config);
  await ensureRealDirectory(root, directory, "Guide cancellations directory");
  const file = path.join(directory, `${launchId}.json`);
  const cancellation                          = {
    version: 1,
    launchId,
    status: "CANCELLED",
    cancelledBy: cancelledBy.trim(),
    reason: reason.trim(),
    cancelledAt: nowIso(),
  };
  await writeJsonAtomic(file, cancellation);
  return file;
}






async function sessionBoundaryEvidence(
  root        ,
  config               ,
  id        ,
)                                   {
  const directory = sessionRoot(root, config, id);
  const state = await loadSessionState(directory, id);
  const closure = await evaluateSessionClosure(root, directory, state);
  if (!closure.closed) {
    const halt = await evaluateSessionHalt(root, directory, state);
    if (!halt.halted || !halt.metadata) {
      const reasons = halt.exists ? halt.reasons : closure.reasons;
      throw new Error(`Session ${id} is neither closed nor pushed-halted:\n- ${reasons.join("\n- ")}`);
    }
    const haltRelative = path.relative(root, path.join(directory, "halt.md")).split(path.sep).join("/");
    const haltEvidence = await hashProjectFile(root, haltRelative, "Previous immutable halt");
    const directions = await carryPendingDirectionsAfterHalt(directory, state);
    return {
      dependency: { sessionId: id, terminal: "halt", evidence: haltEvidence, carryForward: haltEvidence },
      requiredPromptIds: [halt.metadata.id, ...directions.map((direction) => direction.id)],
    };
  }

  const closeRelative = path.relative(root, path.join(directory, "close.md")).split(path.sep).join("/");
  const previousClose = await hashProjectFile(root, closeRelative, "Previous immutable close");
  const summaryIndex = state.phases.findIndex((phase) => phase.name === "summary");
  const carryIndex = summaryIndex === -1 ? state.phases.length - 1 : summaryIndex;
  const carryPhase = state.phases[carryIndex] ;
  const carryRelative = path.relative(
    root,
    path.join(directory, "phases", `${String(carryIndex + 1).padStart(2, "0")}-${carryPhase.name}.md`),
  ).split(path.sep).join("/");
  return {
    dependency: {
      sessionId: id,
      terminal: "close",
      evidence: previousClose,
      carryForward: await hashProjectFile(root, carryRelative, "Previous carry-forward artifact"),
    },
    requiredPromptIds: (await carryDirectionsForNextSession(directory, state)).map((direction) => direction.id),
  };
}

async function previousSessionEvidence(
  root        ,
  config               ,
)                                                                                                                                                                                      {
  const id = await latestSessionId(root, config);
  if (!id) {
    return {
      previousSessionId: null,
      previousCloseSha256: null,
      previousCarryForward: null,
      requiredPromptIds: [],
      dependency: null,
    };
  }
  const boundary = await sessionBoundaryEvidence(root, config, id);
  return {
    previousSessionId: id,
    previousCloseSha256: boundary.dependency.evidence.sha256,
    previousCarryForward: boundary.dependency.carryForward,
    requiredPromptIds: boundary.requiredPromptIds,
    dependency: boundary.dependency,
  };
}

async function activeSessionIds(root        , config               )                    {
  const active           = [];
  for (const id of await listSessionIds(root, config)) {
    const directory = sessionRoot(root, config, id);
    const state = await loadSessionState(directory, id);
    const closure = await evaluateSessionClosure(root, directory, state);
    if (closure.closed) continue;
    const halt = await evaluateSessionHalt(root, directory, state);
    if (!halt.halted) active.push(id);
  }
  return active;
}

function validatePromptShape(content        )       {
  if (content.trim() === "") throw new Error("The Guide session prompt must be non-empty.");
  if (!content.endsWith("\n")) throw new Error("The Guide session prompt must end with a newline so its confirmed bytes are preserved.");
  for (const heading of REQUIRED_PROMPT_HEADINGS) {
    if (!content.replace(/\r\n/g, "\n").split("\n").includes(heading)) {
      throw new Error(`The Guide session prompt is missing required heading: ${heading}.`);
    }
  }
}

async function validatePromptLocation(
  root        ,
  config               ,
  promptFile        ,
)                                                 {
  const prompts = guidePromptsDir(root, config);
  const [resolvedPrompts, resolvedPrompt] = await Promise.all([realpath(prompts), realpath(promptFile)]);
  if (!within(resolvedPrompts, resolvedPrompt)) {
    throw new Error(`Confirmed prompts must live under ${displayPath(root, prompts)}.`);
  }
  const content = await readContainedRegularText(root, promptFile, "Guide session prompt");
  validatePromptShape(content);
  return { relative: path.relative(root, promptFile).split(path.sep).join("/"), content };
}

export async function confirmGuideLaunch(
  root        ,
  config               ,
  promptFile        ,
  confirmedBy        ,
  options                     = {},
)                                                        {
  if (confirmedBy.trim() === "" || /[\r\n]/.test(confirmedBy)) {
    throw new Error("The confirming owner must be a non-empty single line.");
  }
  const manifest = await loadGuideManifest(root, config);
  await requireGuideCancellationsPushed(root, config);
  const pending = await pendingGuideLaunches(root, config);
  if (pending.length) throw new Error(`Launch ${pending[0] .id} is already READY_TO_LAUNCH; bind or resolve it first.`);
  const prompt = await validatePromptLocation(root, config, promptFile);
  const sessionKind = options.kind ?? "produce";
  if (!/^[a-z][a-z0-9-]{0,31}$/.test(sessionKind)) {
    throw new Error("Session kind must start with a lowercase letter and contain only lowercase letters, digits, or hyphens (32 characters maximum).");
  }
  const dependencySessionIds = options.dependencySessionIds ?? [];
  if (new Set(dependencySessionIds).size !== dependencySessionIds.length) {
    throw new Error("A Guide launch dependency may be named only once.");
  }
  const activeIds = await activeSessionIds(root, config);
  const activeDependencies = dependencySessionIds.filter((id) => activeIds.includes(id));
  if (activeDependencies.length > 0) {
    throw new Error(`A dependent Guide launch must wait for pushed close or halt:\n- ${activeDependencies.join("\n- ")}`);
  }
  if (activeIds.length > 0 && !options.independent) {
    const reasons           = [];
    for (const id of activeIds) {
      const directory = sessionRoot(root, config, id);
      const state = await loadSessionState(directory, id);
      const closure = await evaluateSessionClosure(root, directory, state);
      const halt = await evaluateSessionHalt(root, directory, state);
      reasons.push(...(halt.exists ? halt.reasons : closure.reasons));
    }
    throw new Error(
      `Session ${activeIds.join(", ")} is neither closed nor pushed-halted:\n- ${reasons.join("\n- ")}\nUse --independent only for an evidenced sibling, or wait and use --depends-on after its pushed terminal evidence exists.`,
    );
  }

  let previousLaunchEvidence                                                                                                 = {
    previousSessionId: null,
    previousCloseSha256: null,
    previousCarryForward: null,
  };
  let dependencies                          = [];
  let requiredPromptIds           = [];
  let launchMode                    = "independent";
  if (dependencySessionIds.length > 0) {
    const boundaries = await Promise.all(dependencySessionIds.map((id) => sessionBoundaryEvidence(root, config, id)));
    dependencies = boundaries.map((item) => item.dependency);
    requiredPromptIds = boundaries.flatMap((item) => item.requiredPromptIds);
    launchMode = "dependent";
  } else if (!options.independent) {
    const previous = await previousSessionEvidence(root, config);
    previousLaunchEvidence = {
      previousSessionId: previous.previousSessionId,
      previousCloseSha256: previous.previousCloseSha256,
      previousCarryForward: previous.previousCarryForward,
    };
    dependencies = previous.dependency ? [previous.dependency] : [];
    requiredPromptIds = previous.requiredPromptIds;
    launchMode = previous.previousSessionId ? "continuation" : "independent";
  }
  const missingPriorIds = requiredPromptIds.filter((id) => !prompt.content.includes(id));
  if (missingPriorIds.length > 0) {
    const source = launchMode === "continuation"
      ? "at the prior session boundary"
      : "by its dependencies";
    throw new Error(`The Guide prompt must cite every direction released ${source} (and every halt ID):\n- ${missingPriorIds.join("\n- ")}`);
  }
  const launch                     = {
    version: 1,
    id: randomUUID(),
    status: "READY_TO_LAUNCH",
    prompt: prompt.relative,
    promptSha256: sha256(prompt.content),
    manifest: await hashProjectFile(
      root,
      path.relative(root, guideManifestPath(root, config)).split(path.sep).join("/"),
      "Guide project manifest",
    ),
    continuity: await snapshotContinuity(root, manifest),
    ...previousLaunchEvidence,
    sessionKind,
    launchMode,
    dependencies,
    confirmedBy: confirmedBy.trim(),
    confirmedAt: nowIso(),
  };
  const directory = guideLaunchesDir(root, config);
  await ensureRealDirectory(root, directory, "Guide launches directory");
  const file = path.join(directory, `${launch.id}.json`);
  await writeJsonAtomic(file, launch);
  return { launch, file };
}

function sameEvidence(left                     , right                     )          {
  return left.length === right.length && left.every((item, index) => (
    item.path === right[index]?.path && item.sha256 === right[index]?.sha256
  ));
}

export async function verifyGuideLaunch(
  root        ,
  config               ,
  expectedPromptFile         ,
)                              {
  const pending = await pendingGuideLaunches(root, config);
  if (pending.length === 0) throw new Error("No Guide prompt is READY_TO_LAUNCH.");
  if (pending.length !== 1) throw new Error("More than one Guide prompt is READY_TO_LAUNCH; state is ambiguous.");
  const launch = pending[0] ;
  const manifest = await loadGuideManifest(root, config);
  const currentManifest = await hashProjectFile(root, launch.manifest.path, "Guide project manifest");
  if (currentManifest.sha256 !== launch.manifest.sha256) {
    throw new Error("The Guide project manifest changed after owner confirmation; the launch is stale.");
  }
  const currentContinuity = await snapshotContinuity(root, manifest);
  if (!sameEvidence(launch.continuity, currentContinuity)) {
    throw new Error("The project continuity files changed after owner confirmation; the launch is stale.");
  }
  const promptFile = path.resolve(root, launch.prompt);
  const prompt = await validatePromptLocation(root, config, promptFile);
  if (sha256(prompt.content) !== launch.promptSha256) {
    throw new Error("The session prompt changed after owner confirmation; the launch is stale.");
  }
  if (expectedPromptFile) {
    const [expected, actual] = await Promise.all([realpath(expectedPromptFile), realpath(promptFile)]);
    if (expected !== actual) throw new Error("This prompt is not the owner-confirmed READY_TO_LAUNCH prompt.");
  }
  const currentDependencies = await Promise.all(
    launch.dependencies.map((dependency) => sessionBoundaryEvidence(root, config, dependency.sessionId)),
  );
  const missingPriorIds = currentDependencies
    .flatMap((item) => item.requiredPromptIds)
    .filter((id) => !prompt.content.includes(id));
  if (missingPriorIds.length > 0) {
    throw new Error(`The confirmed Guide prompt no longer cites required dependency direction evidence:\n- ${missingPriorIds.join("\n- ")}`);
  }
  for (const [index, current] of currentDependencies.entries()) {
    const expected = launch.dependencies[index] ;
    if (
      current.dependency.sessionId !== expected.sessionId ||
      current.dependency.terminal !== expected.terminal ||
      current.dependency.evidence.path !== expected.evidence.path ||
      current.dependency.evidence.sha256 !== expected.evidence.sha256 ||
      current.dependency.carryForward.path !== expected.carryForward.path ||
      current.dependency.carryForward.sha256 !== expected.carryForward.sha256
    ) throw new Error(`Dependency ${expected.sessionId} evidence changed after owner confirmation; the launch is stale.`);
  }
  if (launch.launchMode === "continuation") {
    const expected = launch.dependencies[0] ?? null;
    if (
      !expected || launch.previousSessionId !== expected.sessionId ||
      launch.previousCloseSha256 !== expected.evidence.sha256 ||
      launch.previousCarryForward?.path !== expected.carryForward.path ||
      launch.previousCarryForward?.sha256 !== expected.carryForward.sha256
    ) throw new Error("The prior-session continuity evidence is internally inconsistent.");
  }
  const launchRelative = path.relative(
    root,
    path.join(guideLaunchesDir(root, config), `${launch.id}.json`),
  ).split(path.sep).join("/");
  const git = checkGitFilesPushed(root, [
    launch.manifest.path,
    launch.prompt,
    ...launch.continuity.map((item) => item.path),
    ...launch.dependencies.flatMap((item) => [item.evidence.path, item.carryForward.path]),
    launchRelative,
  ]);
  if (!git.closed) throw new Error(`The confirmed Guide handover is not committed and pushed:\n- ${git.reasons.join("\n- ")}`);
  return launch;
}

export async function bindGuideLaunch(
  root        ,
  config               ,
  launch                    ,
  sessionId        ,
  state              ,
)                  {
  if (state.id !== sessionId) throw new Error("The launch binding session identity does not match state.json.");
  const sessionPrompt = path.join(sessionRoot(root, config, sessionId), "session-prompt.md");
  const content = await readContainedRegularText(root, sessionPrompt, "Opened session prompt");
  if (sha256(content) !== launch.promptSha256) {
    throw new Error("The opened session prompt does not match the confirmed Guide prompt.");
  }
  if (new Date(state.createdAt).valueOf() < new Date(launch.confirmedAt).valueOf()) {
    throw new Error("The session predates the Guide launch confirmation.");
  }
  const stateDependencies = state.dependencies ?? [];
  if (
    (state.kind ?? "produce") !== launch.sessionKind ||
    (state.launchMode ?? (launch.previousSessionId ? "continuation" : "independent")) !== launch.launchMode ||
    stateDependencies.length !== launch.dependencies.length ||
    stateDependencies.some((dependency, index) => {
      const expected = launch.dependencies[index];
      return !expected || dependency.sessionId !== expected.sessionId || dependency.terminal !== expected.terminal ||
        dependency.evidenceSha256 !== expected.evidence.sha256;
    })
  ) {
    throw new Error("The opened session kind, launch mode, or dependencies do not match the owner-confirmed Guide launch.");
  }
  const file = path.join(sessionRoot(root, config, sessionId), "guide-launch.json");
  if (await pathExists(file)) throw new Error(`Guide launch ${launch.id} is already bound.`);
  const binding                     = {
    version: 1,
    launchId: launch.id,
    sessionId,
    boundAt: nowIso(),
  };
  await writeJsonAtomic(file, binding);
  return file;
}

export async function recoverGuideBinding(
  root        ,
  config               ,
  launchId        ,
  sessionId        ,
)                  {
  const pending = await pendingGuideLaunches(root, config);
  const launch = pending.find((item) => item.id === launchId);
  if (!launch) throw new Error(`Guide launch ${launchId} is not a pending READY_TO_LAUNCH request.`);
  if (await latestSessionId(root, config) !== sessionId) {
    throw new Error(`Session ${sessionId} is not the latest session and cannot receive the pending Guide binding.`);
  }
  const state = await loadSessionState(sessionRoot(root, config, sessionId), sessionId);
  return bindGuideLaunch(root, config, launch, sessionId, state);
}


//# sourceURL=/Users/freeborn/Dev/koda-codex/src/guide.ts