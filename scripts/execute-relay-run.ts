#!/usr/bin/env node

import { spawn, spawnSync } from "node:child_process";
import { appendFile, lstat, readFile, readdir, realpath, rm } from "node:fs/promises";
import path from "node:path";
import { createInterface } from "node:readline";
import { fileURLToPath } from "node:url";

import { closePath, evaluateSessionClosure } from "../src/close.ts";
import { pathExists, readProjectConfig } from "../src/config.ts";
import { evaluateGate } from "../src/gate.ts";
import {
  artifactPath,
  currentPhase,
  latestSessionId,
  loadSessionState,
  readNonEmpty,
  reviewPath,
  sessionRoot,
  writeJsonAtomic,
  writeTextAtomic,
} from "../src/project.ts";
import { readApprovalEntries, sha256 } from "../src/receipt.ts";
import {
  newReviewerJob,
  readReviewerJob,
  readReviewerWindowState,
  renderCodexEvent,
  removeReviewerJob,
  writeReviewerJob,
  type ReviewerJobKind,
} from "./relay-window-protocol.ts";

type Role = "producer" | "reviewer";

type RoleRecord = {
  model: string;
  effort: string;
  threadId: string | null;
  turns: number;
};

type RunRecord = {
  version: number;
  scenario: string;
  status: string;
  preparedAt: string;
  producer: RoleRecord;
  reviewer: RoleRecord;
  project: string;
  runtime: string;
  cli: string;
  initialCommit: string;
  maxTurns: number;
  startedAt?: string;
  completedAt?: string;
  ownerAcknowledgements?: number;
  sessionId?: string;
  finalCommit?: string;
  lastAction?: string;
  lastError?: string;
};

class PausedRun extends Error {}

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const twoWindow = process.argv.includes("--reviewer-window");
const requested = process.argv.slice(2).find((argument) => argument !== "--reviewer-window");
let stopRequested = false;
process.once("SIGINT", () => { stopRequested = true; });
process.once("SIGTERM", () => { stopRequested = true; });

const runsRoot = await realpath(process.env.KODA_RELAY_RUNS_ROOT
  ? path.resolve(process.env.KODA_RELAY_RUNS_ROOT)
  : path.join(root, "docs", "relay-runs"));
async function discoverExecutableRun(): Promise<string> {
  const candidates: string[] = [];
  for (const entry of await readdir(runsRoot, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const candidate = path.join(runsRoot, entry.name);
    const record = await readFile(path.join(candidate, "RUN.json"), "utf8")
      .then((content) => JSON.parse(content) as { version?: number; status?: string })
      .catch(() => null);
    if (record?.version === 1 && record.status !== "COMPLETE") candidates.push(candidate);
  }
  if (candidates.length === 0) throw new Error("No prepared or paused relay run exists. Prepare one first.");
  if (candidates.length > 1) throw new Error("More than one relay run is active. Koda will not guess which session you mean.");
  return candidates[0];
}

const runRoot = await (requested ? realpath(path.resolve(root, requested)) : discoverExecutableRun()).catch((error) => {
  console.error(`RELAY REFUSED — ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});
if (path.dirname(runRoot) !== runsRoot) {
  throw new Error(`Relay run must be one direct child of ${runsRoot}`);
}

const runPath = path.join(runRoot, "RUN.json");
const transcriptPath = path.join(runRoot, "TRANSCRIPT.md");
if (!(await lstat(runPath)).isFile() || !(await lstat(transcriptPath)).isFile()) {
  throw new Error("Relay RUN.json and TRANSCRIPT.md must be regular files.");
}
const run = JSON.parse(await readFile(runPath, "utf8")) as RunRecord;
if (run.version !== 1 || run.status === "COMPLETE") {
  throw new Error(`Relay run cannot execute from status ${run.status}.`);
}
if (
  typeof run.project !== "string" ||
  typeof run.runtime !== "string" ||
  typeof run.cli !== "string" ||
  !Number.isInteger(run.maxTurns) ||
  run.maxTurns < 1 ||
  run.maxTurns > 100
) {
  throw new Error("Relay RUN.json has invalid paths or turn limit.");
}

const projectCandidate = path.resolve(runRoot, run.project);
const runtimeCandidate = path.resolve(runRoot, run.runtime);
if (!projectCandidate.startsWith(`${runRoot}${path.sep}`) || !runtimeCandidate.startsWith(`${projectCandidate}${path.sep}`)) {
  throw new Error("Relay run paths escape their prepared run folder.");
}
const project = await realpath(projectCandidate);
const runtime = await realpath(runtimeCandidate);
if (!project.startsWith(`${runRoot}${path.sep}`) || !runtime.startsWith(`${project}${path.sep}`)) {
  throw new Error("Relay run paths resolve outside their prepared run folder.");
}
const expectedCli = await realpath(path.join(root, "src", "cli.ts"));
if (await realpath(run.cli) !== expectedCli) {
  throw new Error("Relay RUN.json does not name this checkout's trusted Koda CLI.");
}

function timestamp(): string {
  return new Date().toISOString();
}

async function saveRun(): Promise<void> {
  await writeJsonAtomic(runPath, run);
}

async function note(title: string, lines: string[] = []): Promise<void> {
  await appendFile(transcriptPath, [
    `## ${timestamp()} — ${title}`,
    "",
    ...lines,
    "",
  ].join("\n"), "utf8");
}

function git(args: string[], accepted = [0]): { status: number; stdout: string; stderr: string } {
  const result = spawnSync("git", args, {
    cwd: project,
    encoding: "utf8",
    maxBuffer: 20 * 1024 * 1024,
  });
  const status = result.status ?? -1;
  if (!accepted.includes(status)) {
    throw new Error(`git ${args.join(" ")} failed (${status}): ${(result.stderr ?? "").trim()}`);
  }
  return { status, stdout: result.stdout ?? "", stderr: result.stderr ?? "" };
}

function eventThreadId(output: string): string | null {
  for (const line of output.split(/\r?\n/)) {
    if (!line.trim()) continue;
    try {
      const event = JSON.parse(line) as { type?: string; thread_id?: string };
      if (event.type === "thread.started" && typeof event.thread_id === "string") return event.thread_id;
    } catch {
      // The complete raw stream remains preserved; a non-JSON diagnostic line is not discarded.
    }
  }
  return null;
}

async function modelTurn(role: Role, purpose: string, prompt: string): Promise<void> {
  const roleRecord = run[role];
  if (run.producer.turns + run.reviewer.turns >= run.maxTurns) {
    run.status = "PAUSED_MAX_TURNS";
    run.lastError = `The relay reached its ${run.maxTurns}-turn safety limit.`;
    await saveRun();
    throw new PausedRun(run.lastError);
  }

  const turn = roleRecord.turns + 1;
  const prefix = `${role.toUpperCase()}-${String(turn).padStart(2, "0")}`;
  const eventFile = `${prefix}-EVENTS.jsonl`;
  const stderrFile = `${prefix}-STDERR.txt`;
  const base = [
    "--ask-for-approval", "never",
    "exec",
  ];
  const common = [
    "--ignore-user-config",
    "--json",
    "-m", roleRecord.model,
    "-c", `model_reasoning_effort=\"${roleRecord.effort}\"`,
    "-c", 'sandbox_mode="workspace-write"',
  ];
  const args = roleRecord.threadId
    ? [...base, "resume", ...common, roleRecord.threadId, prompt]
    : [...base, ...common, "--color", "never", "-s", "workspace-write", prompt];

  run.lastAction = `${role} turn ${turn}: ${purpose}`;
  await saveRun();
  console.log(`\n${role.toUpperCase()} ${turn}: ${purpose}`);

  const child = spawn(process.env.KODA_CODEX_BIN ?? "codex", args, {
    cwd: project,
    env: process.env,
    stdio: ["ignore", "pipe", "pipe"],
  });
  let stdout = "";
  let stderr = "";
  const lines = createInterface({ input: child.stdout });
  lines.on("line", (line) => {
    stdout += `${line}\n`;
    const rendered = renderCodexEvent(line, role === "producer" ? "PRODUCER" : "REVIEWER");
    if (rendered) console.log(rendered);
  });
  child.stderr.on("data", (chunk) => { stderr += String(chunk); });
  const exit = await new Promise<number>((resolve, reject) => {
    child.once("error", reject);
    child.once("close", (code) => resolve(code ?? -1));
  });
  await Promise.all([
    writeTextAtomic(path.join(runRoot, eventFile), stdout),
    writeTextAtomic(path.join(runRoot, stderrFile), stderr),
  ]);

  roleRecord.turns = turn;
  const observedThread = eventThreadId(stdout);
  if (!roleRecord.threadId && observedThread) roleRecord.threadId = observedThread;
  if (roleRecord.threadId && observedThread && roleRecord.threadId !== observedThread) {
    run.status = "PAUSED_THREAD_MISMATCH";
    run.lastError = `${role} resumed as ${observedThread}, expected ${roleRecord.threadId}.`;
    await saveRun();
    throw new PausedRun(run.lastError);
  }
  if (!roleRecord.threadId) {
    run.status = "PAUSED_THREAD_MISSING";
    run.lastError = `${role} turn emitted no persistent thread identifier.`;
    await saveRun();
    throw new PausedRun(run.lastError);
  }
  if (run.producer.threadId && run.reviewer.threadId && run.producer.threadId === run.reviewer.threadId) {
    run.status = "PAUSED_ROLE_COLLISION";
    run.lastError = "Producer and reviewer resolved to the same Codex thread.";
    await saveRun();
    throw new PausedRun(run.lastError);
  }

  await note(`${role} turn ${turn}: ${purpose}`, [
    `- Thread: \`${roleRecord.threadId}\``,
    `- Model / effort: \`${roleRecord.model}\` / \`${roleRecord.effort}\``,
    `- Exit: ${exit}`,
    `- Event stream: [${eventFile}](${eventFile})`,
    `- Stderr: [${stderrFile}](${stderrFile})`,
    "- Conversational stdin: closed",
  ]);

  if (exit !== 0) {
    run.status = "PAUSED_MODEL_FAILURE";
    run.lastError = `${role} turn ${turn} exited ${exit}.`;
    await saveRun();
    throw new PausedRun(run.lastError);
  }
  await saveRun();
}

function koda(args: string[], interactive = false): { status: number; stdout: string; stderr: string } {
  if (interactive) {
    const result = spawnSync(process.execPath, [run.cli, ...args], {
      cwd: project,
      stdio: "inherit",
      env: { ...process.env, KODA_COMMAND: `${process.execPath} ${run.cli}` },
    });
    return { status: result.status ?? -1, stdout: "", stderr: String(result.error ?? "") };
  }
  const result = spawnSync(process.execPath, [run.cli, ...args], {
    cwd: project,
    encoding: "utf8",
    env: { ...process.env, KODA_COMMAND: `${process.execPath} ${run.cli}` },
  });
  return {
    status: result.status ?? -1,
    stdout: result.stdout ?? "",
    stderr: result.stderr ?? String(result.error ?? ""),
  };
}

async function latest() {
  const config = await readProjectConfig(project);
  const id = await latestSessionId(project, config);
  if (!id) return null;
  const directory = sessionRoot(project, config, id);
  return { id, directory, state: await loadSessionState(directory, id) };
}

async function outstandingConsultation(
  sessionDir: string,
  phaseName: string,
  phaseIndex: number,
): Promise<{ request: string; response: string; awaitingOwner: boolean } | null> {
  const directory = path.join(
    sessionDir,
    "consultations",
    `${String(phaseIndex + 1).padStart(2, "0")}-${phaseName}`,
  );
  if (!(await pathExists(directory))) return null;
  const requests = (await readdir(directory))
    .filter((name) => /^\d{2}-request\.md$/.test(name))
    .sort()
    .reverse();
  for (const name of requests) {
    const request = path.join(directory, name);
    const response = path.join(directory, name.replace("-request.md", "-response.md"));
    if (!(await pathExists(response))) return { request, response, awaitingOwner: false };
    const content = await readFile(response, "utf8");
    if (/^- Disposition: AWAITING OWNER$/m.test(content)) {
      return { request, response, awaitingOwner: true };
    }
  }
  return null;
}

function producerSkill(name: string): string {
  return path.join(project, ".agents", "skills", `koda-c-${name}`, "SKILL.md");
}

function reviewerSkill(): string {
  return path.join(project, ".agents", "skills", "koda-c-review", "SKILL.md");
}

async function syncReviewerCompletion(): Promise<void> {
  const reviewerState = await readReviewerWindowState(runRoot);
  if (!reviewerState?.threadId) throw new Error("The reviewer job completed without a persistent reviewer context.");
  if (run.producer.threadId && reviewerState.threadId === run.producer.threadId) {
    throw new Error("Producer and reviewer resolved to the same Codex context.");
  }
  run.reviewer.threadId = reviewerState.threadId;
  run.reviewer.turns = reviewerState.turns;
  const session = await latest();
  if (session) run.ownerAcknowledgements = (await readApprovalEntries(session.directory)).length;
}

async function recoverCompletedReviewerJob(): Promise<void> {
  const job = await readReviewerJob(runRoot);
  if (job?.status !== "COMPLETE") return;
  await syncReviewerCompletion();
  await note(`recovered completed Window B job ${job.id}`, [
    `- Kind / phase: \`${job.kind}\` / \`${job.phase}\``,
    "- Reviewer context and owner acknowledgement count were re-derived from disk before cleanup.",
  ]);
  await removeReviewerJob(runRoot);
  await saveRun();
}

async function dispatchReviewerWindowJob(
  kind: ReviewerJobKind,
  phaseName: string,
  purpose: string,
  prompt: string,
  expectedFile: string,
): Promise<void> {
  let job = await readReviewerJob(runRoot);
  if (job) {
    if (job.kind !== kind || job.phase !== phaseName || job.expectedPath !== path.relative(project, expectedFile)) {
      throw new Error(`A different reviewer job is already active: ${job.kind} ${job.phase} (${job.status}).`);
    }
  } else {
    job = newReviewerJob({
      kind,
      phase: phaseName,
      purpose,
      prompt,
      expectedPath: path.relative(project, expectedFile),
    });
    await writeReviewerJob(runRoot, job);
  }

  run.status = "AWAITING_REVIEWER_WINDOW";
  run.lastAction = `${purpose} in Window B`;
  run.lastError = undefined;
  await saveRun();
  console.log(`\nHANDOVER TO WINDOW B — ${purpose}`);
  console.log("The persistent reviewer window receives this automatically. Window A will wait here.");
  if (!(await readReviewerWindowState(runRoot))) {
    console.log("If Window B is not open yet, run: npm run relay:reviewer");
  }

  for (;;) {
    if (stopRequested) {
      run.status = "PAUSED_BY_OWNER";
      run.lastError = "Window A was stopped while a disk-backed reviewer job remained pending.";
      await saveRun();
      throw new PausedRun(run.lastError);
    }
    const current = await readReviewerJob(runRoot);
    if (!current) throw new Error("The reviewer job disappeared before Window A consumed it.");
    if (current.status === "FAILED") {
      run.status = "PAUSED_REVIEWER_FAILURE";
      run.lastError = current.error ?? `The reviewer window failed ${purpose}.`;
      await saveRun();
      throw new PausedRun(run.lastError);
    }
    if (current.status === "COMPLETE") {
      await syncReviewerCompletion();
      run.status = "RUNNING";
      run.lastError = undefined;
      await saveRun();
      await note(`Window B completed ${purpose}`, [
        `- Reviewer context: \`${run.reviewer.threadId}\``,
        `- Disk handback: \`${path.relative(project, expectedFile)}\``,
        kind === "consultation"
          ? "- Consultation response was written before the producer resumed."
          : "- Owner acknowledgement was recorded through Koda in Window B; Kristian's quote entered neither model chat.",
      ]);
      await removeReviewerJob(runRoot);
      console.log("WINDOW B HANDOVER COMPLETE — deriving the next route from disk.");
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 350));
  }
}

async function openSession(): Promise<void> {
  await modelTurn("producer", "open the Koda session", [
    `Read ${producerSkill("session")} completely and explicitly use koda-c-session.`,
    `The owner-authored prompt is ${path.join(project, "owner-prompt.md")}.`,
    `Use node ${run.cli} wherever the skill says koda.`,
    "You are the non-interactive producer. Do not ask or address the owner, create a phase artifact, review, approval, or advancement.",
    "Verify the disk-backed handover and stop.",
  ].join(" "));
  const session = await latest();
  if (!session) throw new Error("The producer turn completed without opening a session.");
  run.sessionId = session.id;
  await saveRun();
}

async function producePhase(phaseName: string, revision: boolean): Promise<void> {
  await modelTurn("producer", revision ? `revise ${phaseName}` : `produce ${phaseName}`, [
    `Read ${producerSkill(phaseName)} completely and explicitly use koda-c-${phaseName} for the current phase named ${phaseName} on disk.`,
    `Use node ${run.cli} wherever the skill says koda.`,
    revision
      ? "This is an explicit revision request after the blocking review's receipt and any owner ruling were recorded. Read that disk handback and resolve every required revision."
      : "Perform this phase's own job from its approved disk inputs.",
    "You are the non-interactive producer. Never review, approve, advance, quote a receipt, or ask the owner in chat.",
    "If input is genuinely required, write the protocol consultation request to disk and stop. Otherwise verify the artifact handover and stop.",
  ].join(" "));
}

async function reviewPhase(phaseName: string, mode: "formal" | "repair" | "fresh"): Promise<void> {
  const modeInstruction = mode === "formal"
    ? "Create the first formal review of the completed current artifact."
    : mode === "repair"
      ? "Repair the current unread formal-review artifact so its protected metadata, definitive findings, verdict, and status are valid. Do not overwrite an acknowledged review."
      : "The blocking review was acknowledged and the artifact changed. Create a fresh definitive formal review, preserving the archived handback.";
  const prompt = [
    `Read ${reviewerSkill()} completely and explicitly use koda-c-review in formal-review mode for current phase ${phaseName}.`,
    `Use node ${run.cli} wherever the skill says koda.`,
    modeInstruction,
    "Remain independent from the producer context. Use only the artifact and files it cites, write the complete review to disk, run Koda status, and stop.",
    "Never approve, advance, modify the producer artifact, or quote the receipt in your response.",
  ].join(" ");
  if (twoWindow) {
    const session = await latest();
    if (!session) throw new Error("No active session exists for reviewer handover.");
    const active = currentPhase(session.state);
    if (!active || active.phase.name !== phaseName) throw new Error(`Disk no longer names ${phaseName} as current.`);
    await dispatchReviewerWindowJob(mode, phaseName, `${mode} review of ${phaseName}`, prompt, reviewPath(session.directory, active.phase, active.index));
    return;
  }
  await modelTurn("reviewer", `${mode} review of ${phaseName}`, prompt);
}

async function answerConsultation(request: string): Promise<void> {
  const prompt = [
    `Read ${reviewerSkill()} completely and explicitly use koda-c-review in in-phase consultation mode for request ${request}.`,
    `Read ${path.join(project, "docs", "IN-PHASE-CONSULTATION.md")} completely.`,
    "Answer only from the request and its cited evidence. Write the response artifact before stopping.",
    "If owner judgment is required, record AWAITING OWNER and the smallest clear owner question; never impersonate Kristian or create a formal verdict.",
  ].join(" ");
  if (twoWindow) {
    const response = request.replace(/-request\.md$/, "-response.md");
    const session = await latest();
    const active = session ? currentPhase(session.state) : null;
    if (!active) throw new Error("No active phase exists for reviewer consultation.");
    await dispatchReviewerWindowJob("consultation", active.phase.name, `answer consultation ${path.basename(request)}`, prompt, response);
    return;
  }
  await modelTurn("reviewer", `answer consultation ${path.basename(request)}`, prompt);
}

async function ownerAcknowledge(phaseName: string, reviewFile: string): Promise<void> {
  if (twoWindow) {
    await dispatchReviewerWindowJob(
      "acknowledge",
      phaseName,
      `owner acknowledgement of ${phaseName}`,
      "No model turn is permitted for this owner-only acknowledgement job.",
      reviewFile,
    );
    return;
  }
  run.status = "AWAITING_OWNER_RECEIPT";
  run.lastAction = `owner acknowledgement for ${phaseName}`;
  await saveRun();
  console.log("\nOWNER ACKNOWLEDGEMENT REQUIRED");
  console.log(`Read the complete review through its final receipt: ${reviewFile}`);
  console.log("Koda will ask you to paste that exact final line. The relay does not read or print it for you.");
  const result = koda(["approve", phaseName, "--approver", "Kristian"], true);
  if (result.status !== 0) {
    run.status = "PAUSED_OWNER_ACKNOWLEDGEMENT";
    run.lastError = `Owner acknowledgement exited ${result.status}.`;
    await saveRun();
    throw new PausedRun(run.lastError);
  }
  run.ownerAcknowledgements = (run.ownerAcknowledgements ?? 0) + 1;
  run.status = "RUNNING";
  await saveRun();
  await note(`owner acknowledged ${phaseName} review`, [
    `- Review: \`${path.relative(project, reviewFile)}\``,
    "- Exact receipt: entered interactively and not copied into this transcript",
    "- Approver recorded by Koda: Kristian",
  ]);
}

async function advance(phaseName: string, previousIndex: number): Promise<void> {
  const result = koda(["advance"]);
  if (result.status !== 0) {
    throw new Error(`Koda refused expected advancement for ${phaseName}: ${result.stdout}${result.stderr}`);
  }
  const session = await latest();
  if (!session || session.state.currentPhaseIndex !== previousIndex + 1) {
    throw new Error(`Koda did not persist the expected advancement after ${phaseName}.`);
  }
  await note(`gate advanced ${phaseName}`, [
    `- State index: ${previousIndex} → ${session.state.currentPhaseIndex}`,
    "- Authority: Koda re-read artifact, review, verdict, receipt acknowledgement, and prior history from disk",
  ]);
}

async function commitProducedOutput(): Promise<void> {
  git(["add", "-A"]);
  const staged = git(["diff", "--cached", "--quiet"], [0, 1]);
  if (staged.status === 1) {
    git(["commit", "-m", `chore: record ${run.sessionId ?? "relay"} output before close`]);
    git(["push"]);
    await note("pre-close output commit", [
      "- The supervisor committed and pushed every non-ignored produced file before immutable close preparation.",
      "- The close ceremony still performs its own required close.md commit and push afterward.",
    ]);
  }
}

async function closeSession(): Promise<void> {
  const session = await latest();
  if (!session) throw new Error("No session exists for close preparation.");
  const closeFile = closePath(session.directory);

  if (!(await pathExists(closeFile))) {
    await commitProducedOutput();
    await modelTurn("producer", "prepare immutable session close", [
      `Read ${producerSkill("close")} completely and explicitly use koda-c-close in supervised mode.`,
      `Use node ${run.cli} wherever the skill says koda.`,
      "Every configured phase is advanced and all produced output was committed and pushed by the relay supervisor.",
      "Prepare and validate immutable close.md, then stop before Git. The trusted relay supervisor owns the exact Git mutation because your workspace sandbox intentionally cannot write repository metadata.",
      "Do not create another session or edit close.md after preparation. The same producer context will be resumed after the supervisor push for independent close verification.",
    ].join(" "));
  }

  if (!(await pathExists(closeFile))) throw new Error("The producer did not prepare immutable close.md.");
  const relativeSession = path.relative(project, session.directory);
  const relativeClose = path.relative(project, closeFile);
  const pending = git(["status", "--porcelain", "--untracked-files=all"]).stdout.trim();
  if (pending !== `?? ${relativeClose}`) {
    throw new Error(`Close preparation changed files other than immutable close.md: ${pending || "none"}`);
  }

  git(["add", relativeSession]);
  git(["commit", "-m", `close session ${session.id}`]);
  git(["push"]);
  await note("supervisor close commit and push", [
    `- Exact prepared session path: \`${relativeSession}\``,
    `- Commit message: \`close session ${session.id}\``,
    "- Reason: Codex workspace-write intentionally protects `.git`; the supervisor is the trusted repository operator.",
  ]);

  const closeResult = koda(["session", "close"]);
  if (closeResult.status !== 0 || !closeResult.stdout.includes("SESSION CLOSED")) {
    throw new Error(`Koda did not verify the supervisor close commit: ${closeResult.stdout}${closeResult.stderr}`);
  }
  const statusResult = koda(["status"]);
  if (statusResult.status !== 0 || !statusResult.stdout.includes("SESSION CLOSED")) {
    throw new Error(`Koda status did not derive the supervisor close: ${statusResult.stdout}${statusResult.stderr}`);
  }

  await modelTurn("producer", "verify immutable session close", [
    `Read ${producerSkill("close")} completely and explicitly resume koda-c-close in supervised verification mode.`,
    `Use node ${run.cli} wherever the skill says koda.`,
    "The trusted relay supervisor executed the exact prepared-session Git add, honest close commit, and upstream push.",
    "Do not edit close.md or any session file. Recompute its binding, inspect Git and upstream state, run koda session close and koda status, and stop only after both derive SESSION CLOSED.",
  ].join(" "));
}

async function finalize(): Promise<void> {
  const session = await latest();
  if (!session) throw new Error("No session exists at finalization.");
  const closure = await evaluateSessionClosure(project, session.directory, session.state);
  if (!closure.closed) throw new Error(`Close verification failed: ${closure.reasons.join("; ")}`);

  const status = git(["status", "--porcelain", "--untracked-files=all"]).stdout.trim();
  if (status !== "") throw new Error(`Relay project is not clean at close: ${status}`);
  const head = git(["rev-parse", "HEAD"]).stdout.trim();
  const branch = git(["branch", "--show-current"]).stdout.trim();
  const upstream = git(["rev-parse", "--abbrev-ref", "--symbolic-full-name", "@{u}"]).stdout.trim();
  const ahead = git(["rev-list", "--count", "@{u}..HEAD"]).stdout.trim();
  const remoteHead = git(["rev-parse", "refs/remotes/origin/main"]).stdout.trim();
  const log = git(["log", "--oneline", "--decorate", "--all"]).stdout;
  const kodaStatus = koda(["status"]);
  if (kodaStatus.status !== 0 || !kodaStatus.stdout.includes("SESSION CLOSED")) {
    throw new Error(`Final Koda status did not derive SESSION CLOSED: ${kodaStatus.stdout}${kodaStatus.stderr}`);
  }

  const bundle = path.join(runRoot, "PROJECT-HISTORY.bundle");
  git(["bundle", "create", bundle, "--all"]);
  const bundleVerify = spawnSync("git", ["bundle", "verify", bundle], { encoding: "utf8" });
  if (bundleVerify.status !== 0) throw new Error(`Project history bundle failed verification: ${bundleVerify.stderr}`);

  await Promise.all([
    writeJsonAtomic(path.join(runRoot, "GIT-EVIDENCE.json"), {
      version: 1,
      sessionId: session.id,
      branch,
      upstream,
      head,
      remoteHead,
      aheadCount: Number(ahead),
      projectStatus: status,
      kodaStatus: kodaStatus.stdout.trim(),
      bundle: "PROJECT-HISTORY.bundle",
      capturedAt: timestamp(),
    }),
    writeTextAtomic(path.join(runRoot, "GIT-LOG.txt"), log),
  ]);

  run.status = "COMPLETE";
  run.completedAt = timestamp();
  run.finalCommit = head;
  run.lastError = undefined;
  await saveRun();
  await writeTextAtomic(path.join(runRoot, "RESULT.md"), [
    `# Full relay result — ${path.basename(runRoot)}`,
    "",
    "- Status: COMPLETE",
    `- Scenario: ${run.scenario}`,
    `- Session: ${session.id}`,
    `- Producer: ${run.producer.model} / ${run.producer.effort}`,
    `- Producer thread: ${run.producer.threadId}`,
    `- Producer turns: ${run.producer.turns}`,
    `- Reviewer: ${run.reviewer.model} / ${run.reviewer.effort}`,
    `- Reviewer thread: ${run.reviewer.threadId}`,
    `- Reviewer turns: ${run.reviewer.turns}`,
    `- Completed phases: ${session.state.currentPhaseIndex}/${session.state.phases.length}`,
    `- Owner acknowledgements: ${run.ownerAcknowledgements ?? 0}`,
    `- Close: SESSION CLOSED at pushed commit ${head}`,
    "- Git proof: [GIT-EVIDENCE.json](GIT-EVIDENCE.json)",
    "- Restorable history: [PROJECT-HISTORY.bundle](PROJECT-HISTORY.bundle)",
    "- Transcript: [TRANSCRIPT.md](TRANSCRIPT.md)",
    "",
    "The nested runtime Git repository was removed after the verified bundle and Git evidence were captured so this run can be committed as ordinary repository evidence. Restore the bundle to independently replay its Git history.",
    "",
  ].join("\n"));
  await note("relay complete", [
    `- Session: ${session.id}`,
    `- Producer / reviewer threads remained distinct: ${run.producer.threadId !== run.reviewer.threadId}`,
    `- Pushed close commit: \`${head}\``,
    "- Restorable Git history: [PROJECT-HISTORY.bundle](PROJECT-HISTORY.bundle)",
  ]);

  await rm(path.join(project, ".git"), { recursive: true, force: true });
  await rm(runtime, { recursive: true, force: true });
  console.log(`\nRELAY COMPLETE — ${session.id}`);
  console.log(`Durable evidence: ${runRoot}`);
}

async function main(): Promise<void> {
  run.status = "RUNNING";
  run.startedAt ??= timestamp();
  run.ownerAcknowledgements ??= 0;
  run.lastError = undefined;
  await saveRun();

  for (;;) {
    await recoverCompletedReviewerJob();
    const session = await latest();
    if (!session) {
      await openSession();
      continue;
    }
    run.sessionId = session.id;

    const active = currentPhase(session.state);
    if (!active) {
      const closure = await evaluateSessionClosure(project, session.directory, session.state);
      if (!closure.closed) await closeSession();
      await finalize();
      return;
    }

    const consultation = await outstandingConsultation(session.directory, active.phase.name, active.index);
    if (consultation) {
      if (consultation.awaitingOwner) {
        if (twoWindow) {
          await answerConsultation(consultation.request);
          continue;
        }
        run.status = "AWAITING_OWNER_CONSULTATION";
        run.lastError = `Reviewer recorded an owner question at ${consultation.response}.`;
        await saveRun();
        throw new PausedRun(`${run.lastError} Continue it in the owner-facing reviewer context, then rerun the relay.`);
      }
      await answerConsultation(consultation.request);
      const answered = await readNonEmpty(consultation.response);
      if (!answered) throw new Error(`Reviewer did not write consultation response ${consultation.response}.`);
      continue;
    }

    const artifactFile = artifactPath(session.directory, active.phase, active.index);
    const artifact = await readNonEmpty(artifactFile);
    if (!artifact) {
      await producePhase(active.phase.name, false);
      const after = await readNonEmpty(artifactFile);
      const pending = await outstandingConsultation(session.directory, active.phase.name, active.index);
      if (!after && !pending) throw new Error(`Producer wrote neither ${artifactFile} nor a consultation request.`);
      continue;
    }

    const reviewFile = reviewPath(session.directory, active.phase, active.index);
    if (!(await pathExists(reviewFile))) {
      await reviewPhase(active.phase.name, "formal");
      if (!(await pathExists(reviewFile))) throw new Error(`Reviewer did not write ${reviewFile}.`);
      continue;
    }

    let gate = await evaluateGate(session.directory, active.phase, active.index);
    const issueCodes = new Set(gate.issues.map((issue) => issue.code));
    const reviewInvalid = [
      "verdict_missing",
      "verdict_invalid",
      "receipt_missing",
      "review_metadata_missing",
      "review_phase_mismatch",
      "review_incomplete",
      "receipt_mismatch",
      "receipt_not_unique",
    ].some((code) => issueCodes.has(code));
    if (reviewInvalid) {
      await reviewPhase(active.phase.name, "repair");
      continue;
    }

    if (!gate.approval) {
      await ownerAcknowledge(active.phase.name, reviewFile);
      gate = await evaluateGate(session.directory, active.phase, active.index);
    }

    if (gate.open) {
      await advance(active.phase.name, active.index);
      continue;
    }

    const blocking = gate.review?.verdict === "REVISE" || gate.review?.verdict === "REJECT" || gate.review?.verdict === "DISCUSS";
    if (blocking && gate.approval && gate.review?.metadata) {
      const currentArtifact = await readFile(artifactFile, "utf8");
      if (sha256(currentArtifact) === gate.review.metadata.artifactSha256) {
        const before = sha256(currentArtifact);
        await producePhase(active.phase.name, true);
        const revised = await readNonEmpty(artifactFile);
        if (!revised || sha256(revised) === before) {
          throw new Error(`Producer did not change ${artifactFile} after acknowledged ${gate.review.verdict}.`);
        }
      } else {
        await reviewPhase(active.phase.name, "fresh");
      }
      continue;
    }

    if (gate.approval && issueCodes.has("approval_review_changed")) {
      await reviewPhase(active.phase.name, "fresh");
      continue;
    }

    throw new Error(`Relay cannot route ${active.phase.name}: ${gate.issues.map((issue) => `${issue.code}: ${issue.message}`).join("; ")}`);
  }
}

try {
  await main();
} catch (error) {
  if (!(error instanceof PausedRun)) {
    run.status = "PAUSED_ERROR";
    run.lastError = error instanceof Error ? error.message : String(error);
    await saveRun();
  }
  console.error(`\nRELAY PAUSED — ${run.lastError ?? String(error)}`);
  console.error(`Resume with: npm run ${twoWindow ? "relay:producer" : "relay:execute"} -- ${path.relative(root, runRoot)}`);
  process.exitCode = error instanceof PausedRun ? 2 : 1;
}
