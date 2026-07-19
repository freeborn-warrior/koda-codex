import { randomUUID } from "node:crypto";
import { lstat, mkdir, readdir, realpath } from "node:fs/promises";
import path from "node:path";

import { evaluateSessionClosure } from "./close.ts";
import { pathExists } from "./config.ts";
import { checkGitFilesPushed } from "./git.ts";
import {
  displayPath,
  latestSessionId,
  listSessionIds,
  loadSessionState,
  nowIso,
  readRegularText,
  sessionRoot,
  writeJsonAtomic,
} from "./project.ts";
import { sha256 } from "./receipt.ts";
import type { ProjectConfig, SessionState } from "./types.ts";

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

export interface GuideProjectManifest {
  version: 1;
  project: string;
  continuityFiles: string[];
}

export interface GuideEvidenceHash {
  path: string;
  sha256: string;
}

export interface GuideLaunchRequest {
  version: 1;
  id: string;
  status: "READY_TO_LAUNCH";
  prompt: string;
  promptSha256: string;
  manifest: GuideEvidenceHash;
  continuity: GuideEvidenceHash[];
  previousSessionId: string | null;
  previousCloseSha256: string | null;
  previousCarryForward: GuideEvidenceHash | null;
  confirmedBy: string;
  confirmedAt: string;
}

export interface GuideLaunchBinding {
  version: 1;
  launchId: string;
  sessionId: string;
  boundAt: string;
}

export interface GuideLaunchCancellation {
  version: 1;
  launchId: string;
  status: "CANCELLED";
  cancelledBy: string;
  reason: string;
  cancelledAt: string;
}

function assertRelativeProjectPath(value: string, label: string): void {
  if (
    value.trim() === "" ||
    path.isAbsolute(value) ||
    value.split(/[\\/]/).includes("..")
  ) {
    throw new Error(`${label} must be a non-empty project-relative path without '..'.`);
  }
}

function within(parent: string, candidate: string): boolean {
  const relative = path.relative(parent, candidate);
  return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
}

async function readContainedRegularText(root: string, candidate: string, label: string): Promise<string> {
  const [resolvedRoot, resolvedCandidate] = await Promise.all([realpath(root), realpath(candidate)]);
  if (!within(resolvedRoot, resolvedCandidate)) {
    throw new Error(`${label} resolves outside the project root.`);
  }
  return readRegularText(candidate, label);
}

async function ensureRealDirectory(root: string, candidate: string, label: string): Promise<void> {
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

export function guideRoot(root: string, config: ProjectConfig): string {
  return path.join(root, path.dirname(config.sessionsDir), "guide");
}

export function guideManifestPath(root: string, config: ProjectConfig): string {
  return path.join(guideRoot(root, config), MANIFEST_FILE);
}

export function guidePromptsDir(root: string, config: ProjectConfig): string {
  return path.join(guideRoot(root, config), "prompts");
}

export function guideLaunchesDir(root: string, config: ProjectConfig): string {
  return path.join(guideRoot(root, config), "launches");
}

export function guideCancellationsDir(root: string, config: ProjectConfig): string {
  return path.join(guideRoot(root, config), "cancellations");
}

function validateManifest(value: unknown): GuideProjectManifest {
  if (!value || typeof value !== "object") throw new Error(`${MANIFEST_FILE} must contain a JSON object.`);
  const candidate = value as Partial<GuideProjectManifest>;
  if (
    candidate.version !== 1 ||
    typeof candidate.project !== "string" ||
    candidate.project.trim() === "" ||
    !Array.isArray(candidate.continuityFiles) ||
    candidate.continuityFiles.length === 0
  ) {
    throw new Error(`${MANIFEST_FILE} must name the project and at least one continuity file.`);
  }
  const seen = new Set<string>();
  for (const file of candidate.continuityFiles) {
    if (typeof file !== "string") throw new Error(`${MANIFEST_FILE} continuity files must be strings.`);
    assertRelativeProjectPath(file, `${MANIFEST_FILE} continuity file`);
    if (seen.has(file)) throw new Error(`${MANIFEST_FILE} lists a continuity file more than once: ${file}.`);
    seen.add(file);
  }
  return candidate as GuideProjectManifest;
}

export async function hasGuideManifest(root: string, config: ProjectConfig): Promise<boolean> {
  return pathExists(guideManifestPath(root, config));
}

export async function loadGuideManifest(root: string, config: ProjectConfig): Promise<GuideProjectManifest> {
  const file = guideManifestPath(root, config);
  let parsed: unknown;
  try {
    parsed = JSON.parse(await readContainedRegularText(root, file, "Guide project manifest"));
  } catch (error) {
    if (error instanceof SyntaxError) throw new Error(`${MANIFEST_FILE} is not valid JSON.`);
    throw error;
  }
  return validateManifest(parsed);
}

async function hashProjectFile(root: string, relative: string, label: string): Promise<GuideEvidenceHash> {
  assertRelativeProjectPath(relative, label);
  const file = path.resolve(root, relative);
  const content = await readContainedRegularText(root, file, label);
  if (content.trim() === "") throw new Error(`${label} is empty: ${relative}.`);
  return { path: relative.split(path.sep).join("/"), sha256: sha256(content) };
}

export async function snapshotContinuity(
  root: string,
  manifest: GuideProjectManifest,
): Promise<GuideEvidenceHash[]> {
  const result: GuideEvidenceHash[] = [];
  for (const file of manifest.continuityFiles) {
    result.push(await hashProjectFile(root, file, "Guide continuity file"));
  }
  return result;
}

function parseLaunch(value: unknown, source: string): GuideLaunchRequest {
  if (!value || typeof value !== "object") throw new Error(`${source} must contain a JSON object.`);
  const item = value as Partial<GuideLaunchRequest>;
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
    typeof item.confirmedAt !== "string"
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
  return item as GuideLaunchRequest;
}

async function listLaunches(root: string, config: ProjectConfig): Promise<GuideLaunchRequest[]> {
  const directory = guideLaunchesDir(root, config);
  if (!(await pathExists(directory))) return [];
  const metadata = await lstat(directory);
  if (!metadata.isDirectory()) throw new Error("Guide launches must be a real directory; symbolic links are refused.");
  const launches: GuideLaunchRequest[] = [];
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

async function validBindingExists(root: string, config: ProjectConfig, launch: GuideLaunchRequest): Promise<boolean> {
  let matched = false;
  for (const sessionId of await listSessionIds(root, config)) {
    const directory = sessionRoot(root, config, sessionId);
    const file = path.join(directory, "guide-launch.json");
    if (!(await pathExists(file))) continue;
    let value: unknown;
    try {
      value = JSON.parse(await readContainedRegularText(root, file, "Guide launch binding"));
    } catch (error) {
      if (error instanceof SyntaxError) throw new Error(`Session ${sessionId} guide-launch.json is not valid JSON.`);
      throw error;
    }
    const binding = value as Partial<GuideLaunchBinding>;
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

async function validCancellationExists(root: string, config: ProjectConfig, launchId: string): Promise<boolean> {
  const file = path.join(guideCancellationsDir(root, config), `${launchId}.json`);
  if (!(await pathExists(file))) return false;
  let value: unknown;
  try {
    value = JSON.parse(await readContainedRegularText(root, file, "Guide launch cancellation"));
  } catch (error) {
    if (error instanceof SyntaxError) throw new Error(`Guide cancellation ${launchId}.json is not valid JSON.`);
    throw error;
  }
  const cancellation = value as Partial<GuideLaunchCancellation>;
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

export async function pendingGuideLaunches(root: string, config: ProjectConfig): Promise<GuideLaunchRequest[]> {
  const result: GuideLaunchRequest[] = [];
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

export async function requireGuideCancellationsPushed(root: string, config: ProjectConfig): Promise<void> {
  const directory = guideCancellationsDir(root, config);
  if (!(await pathExists(directory))) return;
  const files: string[] = [];
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
  root: string,
  config: ProjectConfig,
  launchId: string,
  cancelledBy: string,
  reason: string,
): Promise<string> {
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
  const cancellation: GuideLaunchCancellation = {
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

async function previousSessionEvidence(
  root: string,
  config: ProjectConfig,
): Promise<Pick<GuideLaunchRequest, "previousSessionId" | "previousCloseSha256" | "previousCarryForward">> {
  const id = await latestSessionId(root, config);
  if (!id) return { previousSessionId: null, previousCloseSha256: null, previousCarryForward: null };
  const directory = sessionRoot(root, config, id);
  const state = await loadSessionState(directory, id);
  const closure = await evaluateSessionClosure(root, directory, state);
  if (!closure.closed) throw new Error(`Session ${id} is not closed:\n- ${closure.reasons.join("\n- ")}`);

  const closeRelative = path.relative(root, path.join(directory, "close.md")).split(path.sep).join("/");
  const previousClose = await hashProjectFile(root, closeRelative, "Previous immutable close");
  const summaryIndex = state.phases.findIndex((phase) => phase.name === "summary");
  const carryIndex = summaryIndex === -1 ? state.phases.length - 1 : summaryIndex;
  const carryPhase = state.phases[carryIndex]!;
  const carryRelative = path.relative(
    root,
    path.join(directory, "phases", `${String(carryIndex + 1).padStart(2, "0")}-${carryPhase.name}.md`),
  ).split(path.sep).join("/");
  return {
    previousSessionId: id,
    previousCloseSha256: previousClose.sha256,
    previousCarryForward: await hashProjectFile(root, carryRelative, "Previous carry-forward artifact"),
  };
}

function validatePromptShape(content: string): void {
  if (content.trim() === "") throw new Error("The Guide session prompt must be non-empty.");
  if (!content.endsWith("\n")) throw new Error("The Guide session prompt must end with a newline so its confirmed bytes are preserved.");
  for (const heading of REQUIRED_PROMPT_HEADINGS) {
    if (!content.replace(/\r\n/g, "\n").split("\n").includes(heading)) {
      throw new Error(`The Guide session prompt is missing required heading: ${heading}.`);
    }
  }
}

async function validatePromptLocation(
  root: string,
  config: ProjectConfig,
  promptFile: string,
): Promise<{ relative: string; content: string }> {
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
  root: string,
  config: ProjectConfig,
  promptFile: string,
  confirmedBy: string,
): Promise<{ launch: GuideLaunchRequest; file: string }> {
  if (confirmedBy.trim() === "" || /[\r\n]/.test(confirmedBy)) {
    throw new Error("The confirming owner must be a non-empty single line.");
  }
  const manifest = await loadGuideManifest(root, config);
  await requireGuideCancellationsPushed(root, config);
  const pending = await pendingGuideLaunches(root, config);
  if (pending.length) throw new Error(`Launch ${pending[0]!.id} is already READY_TO_LAUNCH; bind or resolve it first.`);
  const prompt = await validatePromptLocation(root, config, promptFile);
  const previous = await previousSessionEvidence(root, config);
  const launch: GuideLaunchRequest = {
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
    ...previous,
    confirmedBy: confirmedBy.trim(),
    confirmedAt: nowIso(),
  };
  const directory = guideLaunchesDir(root, config);
  await ensureRealDirectory(root, directory, "Guide launches directory");
  const file = path.join(directory, `${launch.id}.json`);
  await writeJsonAtomic(file, launch);
  return { launch, file };
}

function sameEvidence(left: GuideEvidenceHash[], right: GuideEvidenceHash[]): boolean {
  return left.length === right.length && left.every((item, index) => (
    item.path === right[index]?.path && item.sha256 === right[index]?.sha256
  ));
}

export async function verifyGuideLaunch(
  root: string,
  config: ProjectConfig,
  expectedPromptFile?: string,
): Promise<GuideLaunchRequest> {
  const pending = await pendingGuideLaunches(root, config);
  if (pending.length === 0) throw new Error("No Guide prompt is READY_TO_LAUNCH.");
  if (pending.length !== 1) throw new Error("More than one Guide prompt is READY_TO_LAUNCH; state is ambiguous.");
  const launch = pending[0]!;
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
  const currentPrevious = await previousSessionEvidence(root, config);
  if (
    currentPrevious.previousSessionId !== launch.previousSessionId ||
    currentPrevious.previousCloseSha256 !== launch.previousCloseSha256 ||
    currentPrevious.previousCarryForward?.path !== launch.previousCarryForward?.path ||
    currentPrevious.previousCarryForward?.sha256 !== launch.previousCarryForward?.sha256
  ) throw new Error("The prior-session evidence changed after owner confirmation; the launch is stale.");
  const launchRelative = path.relative(
    root,
    path.join(guideLaunchesDir(root, config), `${launch.id}.json`),
  ).split(path.sep).join("/");
  const git = checkGitFilesPushed(root, [
    launch.manifest.path,
    launch.prompt,
    ...launch.continuity.map((item) => item.path),
    launchRelative,
  ]);
  if (!git.closed) throw new Error(`The confirmed Guide handover is not committed and pushed:\n- ${git.reasons.join("\n- ")}`);
  return launch;
}

export async function bindGuideLaunch(
  root: string,
  config: ProjectConfig,
  launch: GuideLaunchRequest,
  sessionId: string,
  state: SessionState,
): Promise<string> {
  if (state.id !== sessionId) throw new Error("The launch binding session identity does not match state.json.");
  const sessionPrompt = path.join(sessionRoot(root, config, sessionId), "session-prompt.md");
  const content = await readContainedRegularText(root, sessionPrompt, "Opened session prompt");
  if (sha256(content) !== launch.promptSha256) {
    throw new Error("The opened session prompt does not match the confirmed Guide prompt.");
  }
  if (new Date(state.createdAt).valueOf() < new Date(launch.confirmedAt).valueOf()) {
    throw new Error("The session predates the Guide launch confirmation.");
  }
  const file = path.join(sessionRoot(root, config, sessionId), "guide-launch.json");
  if (await pathExists(file)) throw new Error(`Guide launch ${launch.id} is already bound.`);
  const binding: GuideLaunchBinding = {
    version: 1,
    launchId: launch.id,
    sessionId,
    boundAt: nowIso(),
  };
  await writeJsonAtomic(file, binding);
  return file;
}

export async function recoverGuideBinding(
  root: string,
  config: ProjectConfig,
  launchId: string,
  sessionId: string,
): Promise<string> {
  const pending = await pendingGuideLaunches(root, config);
  const launch = pending.find((item) => item.id === launchId);
  if (!launch) throw new Error(`Guide launch ${launchId} is not a pending READY_TO_LAUNCH request.`);
  if (await latestSessionId(root, config) !== sessionId) {
    throw new Error(`Session ${sessionId} is not the latest session and cannot receive the pending Guide binding.`);
  }
  const state = await loadSessionState(sessionRoot(root, config, sessionId), sessionId);
  return bindGuideLaunch(root, config, launch, sessionId, state);
}
