#!/usr/bin/env node

import { spawn, spawnSync } from "node:child_process";
import { appendFile, cp, lstat, mkdir, readFile, readdir, realpath, rm } from "node:fs/promises";
import path from "node:path";
import { createInterface } from "node:readline";
import { fileURLToPath } from "node:url";

import { closePath, evaluateSessionClosure } from "../src/close.ts";
import { pathExists, readProjectConfig } from "../src/config.ts";
import { evaluateGate } from "../src/gate.ts";
import { evaluateSessionHalt } from "../src/halt.ts";
import {
  artifactPath,
  currentPhase,
  latestSessionId,
  listSessionIds,
  loadSession,
  readNonEmpty,
  reviewPath,
  sessionRoot,
  writeJsonAtomic,
  writeTextAtomic,
} from "../src/project.ts";
import { readApprovalEntries, sha256 } from "../src/receipt.ts";
import { formatRelayCommand, resolveRelayRunPaths } from "./relay-run-location.ts";
import {
  baseTurnPurpose,
  validTurnPurpose,
  validateModelTurnInterruption,
  type ModelTurnInterruption,
  type RelaySignal,
} from "./relay-interruption.ts";
import {
  REVIEWER_LOCK_DIR,
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
  mode?: "fixture-copy" | "guide-project";
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
  launchId?: string;
  prompt?: string;
  sessionKind?: string;
  launchMode?: "independent" | "dependent" | "continuation";
  dependencySessionIds?: string[];
  archive?: string;
  guideReturn?: string;
  startedAt?: string;
  completedAt?: string;
  returnPreparedAt?: string;
  ownerAcknowledgements?: number;
  sessionId?: string;
  finalCommit?: string;
  archiveCommit?: string;
  lastAction?: string;
  lastError?: string;
  interruption?: ModelTurnInterruption;
};

class PausedRun extends Error {}

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const twoWindow = process.argv.includes("--reviewer-window");
const requested = process.argv.slice(2).find((argument) => argument !== "--reviewer-window");
let stopRequested = false;
let stopSignal: RelaySignal | null = null;
let activeModelChild: ReturnType<typeof spawn> | null = null;

function requestStop(signal: RelaySignal): void {
  const repeated = stopRequested;
  stopRequested = true;
  stopSignal ??= signal;
  if (activeModelChild) {
    const child = activeModelChild;
    child.kill(repeated ? "SIGKILL" : "SIGTERM");
    if (!repeated) {
      const force = setTimeout(() => {
        if (activeModelChild === child) child.kill("SIGKILL");
      }, 2_000);
      force.unref();
    }
  }
}

process.on("SIGINT", () => { requestStop("SIGINT"); });
process.on("SIGTERM", () => { requestStop("SIGTERM"); });

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
    if (record?.version === 1 && record.status !== "COMPLETE" && record.status !== "HALTED") candidates.push(candidate);
  }
  if (candidates.length === 0) throw new Error("No prepared or paused relay run exists. Prepare one first.");
  if (candidates.length > 1) throw new Error("More than one relay run is active. Koda will not guess which session you mean.");
  return candidates[0];
}

const runRoot = await (requested ? realpath(path.resolve(root, requested)) : discoverExecutableRun()).catch((error) => {
  console.error(`RELAY REFUSED — ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});
const runPath = path.join(runRoot, "RUN.json");
const transcriptPath = path.join(runRoot, "TRANSCRIPT.md");
if (!(await lstat(runPath)).isFile() || !(await lstat(transcriptPath)).isFile()) {
  throw new Error("Relay RUN.json and TRANSCRIPT.md must be regular files.");
}
const run = JSON.parse(await readFile(runPath, "utf8")) as RunRecord;
if (run.version !== 1 || run.status === "COMPLETE" || run.status === "HALTED") {
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
if (run.interruption) {
  try {
    run.interruption = validateModelTurnInterruption(run.interruption);
  } catch (error) {
    throw new Error(`Relay RUN.json has invalid interruption evidence: ${error instanceof Error ? error.message : String(error)}`);
  }
}

const resolved = await resolveRelayRunPaths({ packageRoot: root, configuredRunsRoot: runsRoot, runRoot, run });
const { project, runtime, cli } = resolved;
run.cli = cli;
if (resolved.mode === "guide-project" && (
  !run.launchId || !run.prompt || !run.archive || !run.guideReturn ||
  path.isAbsolute(run.prompt) || run.prompt.split(/[\\/]/).includes("..")
)) throw new Error("Guide relay RUN.json has missing or unsafe launch evidence paths.");
const reviewerResumeCommand = resolved.mode === "guide-project"
  ? formatRelayCommand(path.join(root, "scripts", "run-relay-reviewer-window.ts"), runRoot)
  : "npm run relay:reviewer";
const producerResumeCommand = resolved.mode === "guide-project"
  ? formatRelayCommand(path.join(root, "scripts", "execute-relay-run.ts"), runRoot, ["--reviewer-window"])
  : `npm run ${twoWindow ? "relay:producer" : "relay:execute"} -- ${path.relative(root, runRoot)}`;

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
  if (!validTurnPurpose(role, purpose)) throw new Error(`Relay refused unsafe ${role} turn purpose ${JSON.stringify(purpose)}.`);
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
    env: { ...process.env, ...(run.sessionId ? { KODA_SESSION_ID: run.sessionId } : {}) },
    stdio: ["ignore", "pipe", "pipe"],
  });
  activeModelChild = child;
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
  }).finally(() => {
    if (activeModelChild === child) activeModelChild = null;
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
  if (stopRequested) {
    const signal = stopSignal ?? "SIGTERM";
    run.interruption = {
      version: 1,
      role,
      purpose,
      turn,
      signal,
      interruptedAt: timestamp(),
      eventFile,
      stderrFile,
      threadId: roleRecord.threadId,
    };
    run.status = roleRecord.threadId ? "PAUSED_INTERRUPTED_MODEL_TURN" : "PAUSED_INTERRUPTED_CONTEXT_MISSING";
    run.lastError = roleRecord.threadId
      ? `${role} turn ${turn} was interrupted by ${signal}; its partial output is untrusted until the same context reconciles it.`
      : `${role} turn ${turn} was interrupted by ${signal} before a persistent context identifier was observed; automatic recovery is refused.`;
    await note(`${role} turn ${turn} interrupted by ${signal}`, [
      `- Persistent context: ${roleRecord.threadId ? `\`${roleRecord.threadId}\`` : "missing — automatic replacement refused"}`,
      `- Partial event stream: [${eventFile}](${eventFile})`,
      `- Partial stderr: [${stderrFile}](${stderrFile})`,
      "- Any artifact written during this turn remains untrusted until a same-context reconciliation succeeds.",
    ]);
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

async function recoverInterruptedModelTurn(): Promise<void> {
  const interrupted = run.interruption;
  if (!interrupted) return;
  const roleRecord = run[interrupted.role];
  if (!interrupted.threadId || !roleRecord.threadId) {
    run.status = "PAUSED_INTERRUPTED_CONTEXT_MISSING";
    run.lastError = `${interrupted.role} turn ${interrupted.turn} has no persistent context identifier. Koda will not replace that context automatically.`;
    await saveRun();
    throw new PausedRun(run.lastError);
  }
  if (roleRecord.threadId !== interrupted.threadId) {
    run.status = "PAUSED_THREAD_MISMATCH";
    run.lastError = `Interrupted ${interrupted.role} context ${interrupted.threadId} no longer matches RUN.json context ${roleRecord.threadId}.`;
    await saveRun();
    throw new PausedRun(run.lastError);
  }

  const session = await latest();
  const originalPurpose = baseTurnPurpose(interrupted.purpose);
  let recoveryGround: string;
  if (interrupted.role === "producer" && originalPurpose === "open the Koda session") {
    recoveryGround = [
      `Read ${path.join(project, ".agents", "skills", "koda-c-session", "SKILL.md")} completely and explicitly use koda-c-session.`,
      `The interrupted task was ${JSON.stringify(interrupted.purpose)}.`,
      `Reconcile the project against ${path.join(project, "owner-prompt.md")}.`,
      "Treat every file possibly written by the interrupted turn as incomplete evidence. Run the entry checks again and finish or repair exactly the session-opening job; do not open a second session.",
    ].join(" ");
  } else if (interrupted.role === "producer" && originalPurpose.includes("session close")) {
    recoveryGround = [
      `Read ${path.join(project, ".agents", "skills", "koda-c-close", "SKILL.md")} completely and explicitly use koda-c-close.`,
      `The interrupted task was ${JSON.stringify(interrupted.purpose)}.`,
      "Treat close.md and related Git state as potentially incomplete. Re-run close entry checks and reconcile exactly the interrupted close task from disk.",
      "Do not start another session.",
    ].join(" ");
  } else if (!session) {
    run.status = "PAUSED_INTERRUPTED_STATE_MISSING";
    run.lastError = `The interrupted ${interrupted.role} task ${JSON.stringify(interrupted.purpose)} has no active session to reconcile.`;
    await saveRun();
    throw new PausedRun(run.lastError);
  } else {
    const active = currentPhase(session.state);
    if (active) {
      const skill = interrupted.role === "producer" ? `koda-c-${active.phase.name}` : "koda-c-review";
      recoveryGround = [
        `Read ${path.join(project, ".agents", "skills", skill, "SKILL.md")} completely and explicitly use ${skill}.`,
        `The interrupted task was ${JSON.stringify(interrupted.purpose)} during the active ${active.phase.name} phase.`,
        "Treat any artifact, review, or consultation file written during the interrupted turn as incomplete and untrusted.",
        "Re-run the applicable entry checks from disk, inspect the frozen phase inputs, and finish or replace only that interrupted task's disk handback.",
        "Do not approve, advance, quote a receipt, or begin another phase.",
      ].join(" ");
    } else {
      recoveryGround = [
        `Read ${path.join(project, ".agents", "skills", "koda-c-close", "SKILL.md")} completely and explicitly use koda-c-close.`,
        `The interrupted task was ${JSON.stringify(interrupted.purpose)} after all configured phases advanced.`,
        "Treat close.md and related Git state as potentially incomplete. Re-run close entry checks and reconcile exactly the interrupted close task from disk.",
        "Do not start another session.",
      ].join(" ");
    }
  }

  await modelTurn(
    interrupted.role,
    `reconcile interrupted turn ${interrupted.turn}: ${interrupted.purpose}`,
    `Reconcile interrupted turn ${interrupted.turn} in the same persistent ${interrupted.role} context. ${recoveryGround}`,
  );
  delete run.interruption;
  run.status = "RUNNING";
  run.lastError = undefined;
  await saveRun();
  await note(`${interrupted.role} turn ${interrupted.turn} reconciled in the same context`, [
    `- Persistent context: \`${interrupted.threadId}\``,
    `- Interrupted evidence: [${interrupted.eventFile}](${interrupted.eventFile})`,
    "- Normal routing resumed only after the reconciliation turn completed successfully.",
  ]);
}

async function pauseAtSafeBoundary(): Promise<void> {
  if (!stopRequested) return;
  run.status = "PAUSED_BY_OWNER";
  run.lastError = `Window A stopped at a safe disk boundary after ${stopSignal ?? "SIGTERM"}; no model turn is in flight.`;
  await saveRun();
  await note("Window A stopped at a safe disk boundary", [
    `- Signal: \`${stopSignal ?? "SIGTERM"}\``,
    "- No active Codex child remained.",
    "- Resume by running the exact printed command; routing will be derived again from disk.",
  ]);
  throw new PausedRun(run.lastError);
}

function koda(args: string[], interactive = false): { status: number; stdout: string; stderr: string } {
  const environment = {
    ...process.env,
    KODA_COMMAND: `${process.execPath} ${run.cli}`,
    ...(run.sessionId ? { KODA_SESSION_ID: run.sessionId } : {}),
  };
  if (interactive) {
    const result = spawnSync(process.execPath, [run.cli, ...args], {
      cwd: project,
      stdio: "inherit",
      env: environment,
    });
    return { status: result.status ?? -1, stdout: "", stderr: String(result.error ?? "") };
  }
  const result = spawnSync(process.execPath, [run.cli, ...args], {
    cwd: project,
    encoding: "utf8",
    env: environment,
  });
  return {
    status: result.status ?? -1,
    stdout: result.stdout ?? "",
    stderr: result.stderr ?? String(result.error ?? ""),
  };
}

async function latest() {
  const config = await readProjectConfig(project);
  if (run.sessionId) return loadSession(project, config, run.sessionId);
  const ids = await listSessionIds(project, config);
  if (run.launchId) {
    const matches: string[] = [];
    for (const id of ids) {
      const binding = path.join(sessionRoot(project, config, id), "guide-launch.json");
      if (!(await pathExists(binding))) continue;
      const value = JSON.parse(await readFile(binding, "utf8")) as { launchId?: string };
      if (value.launchId === run.launchId) matches.push(id);
    }
    if (matches.length > 1) throw new Error(`Guide launch ${run.launchId} is bound to more than one session.`);
    return matches.length === 1 ? loadSession(project, config, matches[0]!) : null;
  }
  if (ids.length === 0) return null;
  const id = await latestSessionId(project, config);
  return id ? loadSession(project, config, id) : null;
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
    console.log(`If Window B is not open yet, run: ${reviewerResumeCommand}`);
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
        current.completion === "HALTED"
          ? "- Disk handback: active session `halt.md`."
          : `- Disk handback: \`${path.relative(project, expectedFile)}\``,
        kind === "consultation"
          ? "- Consultation response was written before the producer resumed."
          : current.completion === "HALTED"
            ? "- Kristian invoked the sole interrupt; pushed halt evidence voided the phase without acknowledging its review."
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
  const ownerPrompt = path.resolve(project, run.prompt ?? "owner-prompt.md");
  if (!ownerPrompt.startsWith(`${project}${path.sep}`)) throw new Error("Relay session prompt escapes the project.");
  const config = await readProjectConfig(project);
  const before = new Set(await listSessionIds(project, config));
  const openArgs = ["session", "new", ownerPrompt, "--kind", run.sessionKind ?? "produce"];
  if (run.launchMode === "independent") openArgs.push("--independent");
  for (const dependency of run.dependencySessionIds ?? []) openArgs.push("--depends-on", dependency);
  await modelTurn("producer", "open the Koda session", [
    `Read ${producerSkill("session")} completely and explicitly use koda-c-session.`,
    `The owner-authored prompt is ${ownerPrompt}.`,
    `Use node ${run.cli} wherever the skill says koda.`,
    `The exact owner-confirmed open command is: node ${run.cli} ${openArgs.map((item) => JSON.stringify(item)).join(" ")}. Use these kind and dependency options unchanged.`,
    "You are the non-interactive producer. Do not ask or address the owner, create a phase artifact, review, approval, or advancement.",
    "Verify the disk-backed handover and stop.",
  ].join(" "));
  const opened = (await listSessionIds(project, config)).filter((id) => !before.has(id));
  if (opened.length !== 1) {
    throw new Error(`The producer turn must open exactly one new bound session; observed ${opened.length}.`);
  }
  const session = await loadSession(project, config, opened[0]!);
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
    "Read and cite only direction IDs released into this phase's entry by state.json. Never inspect or apply waiting directions recorded after the phase entered.",
    "You are the non-interactive producer. Never review, approve, advance, quote a receipt, or ask the owner in chat.",
    "If input is genuinely required, write the protocol consultation request to disk and stop. Otherwise verify the artifact handover and stop.",
  ].join(" "));
}

function printProducerHandover(phaseName: string, artifactFile: string, content: string, next: string): void {
  console.log(`\nPRODUCER HANDOVER — ${phaseName.toUpperCase()}`);
  console.log(`Artifact: ${path.relative(project, artifactFile)}`);
  console.log(`Observed: non-empty regular artifact, ${Buffer.byteLength(content, "utf8")} bytes, SHA-256 ${sha256(content).slice(0, 12)}…`);
  console.log(`Control: ${next}`);
}

async function reviewPhase(phaseName: string, mode: "formal" | "repair" | "fresh"): Promise<void> {
  const modeInstruction = mode === "formal"
    ? "Create the first formal review of the completed current artifact."
    : mode === "repair"
      ? "Repair the current unread formal-review artifact so its protected metadata, definitive findings, verdict, and status are valid. Do not overwrite an acknowledged review."
      : "The prior review was acknowledged and the artifact changed. Create a fresh definitive formal review, preserving the archived handback.";
  const prompt = [
    `Read ${reviewerSkill()} completely and explicitly use koda-c-review in formal-review mode for current phase ${phaseName}.`,
    `Use node ${run.cli} wherever the skill says koda.`,
    modeInstruction,
    "Judge the artifact against its frozen phase-entry inputs. Verify every direction ID released into that entry and refuse any waiting direction used before its gate boundary.",
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
    `- Waiting directions released: ${session.state.advances.at(-1)?.directions?.join(", ") || "none"}`,
  ]);
  const released = session.state.advances.at(-1)?.directions ?? [];
  const next = currentPhase(session.state);
  console.log(`\nGATE PASSED — ${phaseName.toUpperCase()} — ${session.state.currentPhaseIndex}/${session.state.phases.length} phases complete`);
  console.log("Evidence: artifact, independent review, verdict, owner receipt, and prior gates revalidated from disk");
  console.log(`Waiting direction release: ${released.length === 0 ? "none" : released.join(", ")}`);
  console.log(next
    ? `Next: ${next.phase.name.toUpperCase()} — Producer receives only its frozen entry evidence`
    : "Next: immutable session close ceremony");
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

function safeProjectRelative(value: string | undefined, label: string): string {
  if (!value || path.isAbsolute(value) || value.split(/[\\/]/).includes("..")) {
    throw new Error(`${label} must be a safe project-relative path.`);
  }
  return value.split(path.sep).join("/");
}

async function ensureProjectDirectory(relative: string, label: string): Promise<string> {
  const parts = safeProjectRelative(relative, label).split("/").filter(Boolean);
  let current = project;
  for (const part of parts) {
    current = path.join(current, part);
    if (await pathExists(current)) {
      const metadata = await lstat(current);
      if (!metadata.isDirectory()) throw new Error(`${label} contains a symbolic link or non-directory: ${path.relative(project, current)}.`);
      const resolvedCurrent = await realpath(current);
      if (!resolvedCurrent.startsWith(`${project}${path.sep}`)) throw new Error(`${label} resolves outside the project.`);
    } else {
      await mkdir(current);
    }
  }
  return current;
}

async function sameRegularFile(left: string, right: string): Promise<boolean> {
  if (!(await pathExists(left)) || !(await pathExists(right))) return false;
  const [leftMetadata, rightMetadata] = await Promise.all([lstat(left), lstat(right)]);
  if (!leftMetadata.isFile() || !rightMetadata.isFile()) return false;
  const [leftContent, rightContent] = await Promise.all([readFile(left), readFile(right)]);
  return leftContent.equals(rightContent);
}

async function buildGuideReturnStage(session: NonNullable<Awaited<ReturnType<typeof latest>>>, head: string): Promise<string> {
  const archiveRelative = safeProjectRelative(run.archive, "Guide evidence archive");
  const guideReturnRelative = safeProjectRelative(run.guideReturn, "Guide return artifact");
  if (!run.launchId || !/^[a-f0-9-]{36}$/.test(run.launchId)) throw new Error("Guide run has no valid launch identity.");
  if (!run.prompt) throw new Error("Guide run has no bound session prompt.");

  const firstPreparation = run.status !== "FINALIZING_GUIDE_RETURN";
  run.status = "FINALIZING_GUIDE_RETURN";
  run.finalCommit = head;
  run.completedAt ??= timestamp();
  run.returnPreparedAt ??= timestamp();
  run.lastAction = "return pushed close evidence to Guide";
  run.lastError = undefined;
  await saveRun();
  await writeTextAtomic(path.join(runRoot, "RESULT.md"), [
    `# Guide relay result — ${run.launchId}`,
    "",
    "- Status: COMPLETE",
    `- Session: ${session.id}`,
    `- Confirmed prompt: ${run.prompt}`,
    `- Producer: ${run.producer.model} / ${run.producer.effort}`,
    `- Producer context: ${run.producer.threadId}`,
    `- Producer turns: ${run.producer.turns}`,
    `- Reviewer: ${run.reviewer.model} / ${run.reviewer.effort}`,
    `- Reviewer context: ${run.reviewer.threadId}`,
    `- Reviewer turns: ${run.reviewer.turns}`,
    `- Completed phases: ${session.state.currentPhaseIndex}/${session.state.phases.length}`,
    `- Owner acknowledgements: ${run.ownerAcknowledgements ?? 0}`,
    `- Close: SESSION CLOSED at pushed commit ${head}`,
    `- Guide return: ${guideReturnRelative}`,
    "",
  ].join("\n"));
  if (firstPreparation) {
    await note("session closed; preparing Guide return", [
      `- Session: ${session.id}`,
      `- Producer / reviewer contexts remained distinct: ${run.producer.threadId !== run.reviewer.threadId}`,
      `- Pushed close commit: \`${head}\``,
      `- Durable Guide archive: \`${archiveRelative}\``,
      `- Durable Guide return: \`${guideReturnRelative}\``,
    ]);
  }

  const stage = path.join(runRoot, "GUIDE-RETURN-STAGE");
  await rm(stage, { recursive: true, force: true });
  const stageArchive = path.join(stage, "archive");
  await mkdir(stageArchive, { recursive: true });
  const { archiveCommit: _archiveCommit, lastError: _lastError, ...stableRun } = run;
  await writeJsonAtomic(path.join(stageArchive, "RUN.json"), {
    ...stableRun,
    status: "COMPLETE",
    completedAt: run.completedAt,
    cli: "trusted Koda-C package CLI (machine-local path omitted from archive)",
  });
  for (const entry of await readdir(runRoot, { withFileTypes: true })) {
    if (entry.name === "RUN.json" || entry.name === "GUIDE-RETURN-STAGE") continue;
    if (entry.name === REVIEWER_LOCK_DIR && entry.isDirectory()) continue;
    if (entry.isDirectory()) throw new Error(`Guide runtime contains unexpected directory ${entry.name}; evidence archival refuses.`);
    if (!entry.isFile()) throw new Error(`Guide runtime contains symbolic link or special entry ${entry.name}; evidence archival refuses.`);
    await cp(path.join(runRoot, entry.name), path.join(stageArchive, entry.name), { errorOnExist: true });
  }
  const closeFile = closePath(session.directory);
  const closeContent = await readFile(closeFile, "utf8");
  await writeJsonAtomic(path.join(stage, "guide-return.json"), {
    version: 1,
    status: "CLOSED_SESSION_RETURNED",
    launchId: run.launchId,
    sessionId: session.id,
    prompt: run.prompt,
    close: path.relative(project, closeFile).split(path.sep).join("/"),
    closeSha256: sha256(closeContent),
    closeCommit: head,
    archive: archiveRelative,
    producer: run.producer,
    reviewer: run.reviewer,
    ownerAcknowledgements: run.ownerAcknowledgements ?? 0,
    returnedAt: run.returnPreparedAt,
  });
  return stage;
}

async function finishGuideReturn(stage: string): Promise<void> {
  const archiveRelative = safeProjectRelative(run.archive, "Guide evidence archive");
  const guideReturnRelative = safeProjectRelative(run.guideReturn, "Guide return artifact");
  const stageArchive = path.join(stage, "archive");
  const stageReturn = path.join(stage, "guide-return.json");
  if (!(await pathExists(stageArchive)) || !(await lstat(stageArchive)).isDirectory() || !(await pathExists(stageReturn)) || !(await lstat(stageReturn)).isFile()) {
    throw new Error("Guide return staging evidence is incomplete; rebuild it from the verified closed session.");
  }
  const archiveParent = await ensureProjectDirectory(path.dirname(archiveRelative), "Guide evidence archive parent");
  const archiveTarget = path.join(project, archiveRelative);
  if (!(await pathExists(archiveTarget))) await mkdir(archiveTarget);
  else if (!(await lstat(archiveTarget)).isDirectory()) throw new Error("Guide evidence archive target is not a real directory.");

  const stagedNames = (await readdir(stageArchive, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name));
  const targetNames = new Set(await readdir(archiveTarget));
  for (const entry of stagedNames) {
    if (!entry.isFile()) throw new Error(`Guide return staging contains unsafe entry ${entry.name}.`);
    const source = path.join(stageArchive, entry.name);
    const target = path.join(archiveTarget, entry.name);
    if (await pathExists(target)) {
      if (!(await sameRegularFile(source, target))) throw new Error(`Guide archive recovery found changed evidence: ${entry.name}.`);
    } else {
      await cp(source, target, { errorOnExist: true });
    }
    targetNames.delete(entry.name);
  }
  if (targetNames.size > 0) throw new Error(`Guide archive recovery found unexpected evidence: ${[...targetNames].join(", ")}.`);
  if (path.dirname(archiveTarget) !== archiveParent) throw new Error("Guide evidence archive parent mismatch.");

  await ensureProjectDirectory(path.dirname(guideReturnRelative), "Guide return parent");
  const guideReturnTarget = path.join(project, guideReturnRelative);
  if (await pathExists(guideReturnTarget)) {
    if (!(await sameRegularFile(stageReturn, guideReturnTarget))) throw new Error("Guide return recovery found a changed return artifact.");
  } else {
    await cp(stageReturn, guideReturnTarget, { errorOnExist: true });
  }

  const changed = git(["status", "--porcelain", "--untracked-files=all"]).stdout.trim().split(/\r?\n/).filter(Boolean);
  for (const line of changed) {
    const changedPath = line.slice(3).replace(/^"|"$/g, "");
    if (changedPath !== guideReturnRelative && !changedPath.startsWith(`${archiveRelative}/`) && changedPath !== `${archiveRelative}/`) {
      throw new Error(`Guide return recovery refuses unrelated project change: ${line}.`);
    }
  }

  const trackedReturn = git(["ls-files", "--error-unmatch", "--", guideReturnRelative], [0, 1]).status === 0;
  if (!trackedReturn) {
    git(["add", "--", archiveRelative, guideReturnRelative]);
    const staged = git(["diff", "--cached", "--name-only"]).stdout.trim().split(/\r?\n/).filter(Boolean);
    if (!staged.length || staged.some((name) => name !== guideReturnRelative && !name.startsWith(`${archiveRelative}/`))) {
      throw new Error("Guide return staging contains missing or unrelated Git paths.");
    }
    git(["commit", "-m", `guide: return closed session ${run.sessionId}`]);
  }
  const ahead = git(["rev-list", "--count", "@{u}..HEAD"]).stdout.trim();
  if (ahead !== "0") git(["push"]);
  const remaining = git(["status", "--porcelain", "--untracked-files=all"]).stdout.trim();
  if (remaining !== "") throw new Error(`Guide return left the project dirty: ${remaining}`);
  run.status = "COMPLETE";
  run.completedAt = timestamp();
  run.archiveCommit = git(["rev-parse", "HEAD"]).stdout.trim();
  run.lastAction = "closed session evidence returned to Guide and pushed";
  run.lastError = undefined;
  await saveRun();
  console.log(`\nRELAY COMPLETE — ${run.sessionId}`);
  console.log(`Guide return: ${path.join(project, guideReturnRelative)}`);
  console.log(`Durable evidence: ${path.join(project, archiveRelative)}`);
}

async function finalize(): Promise<void> {
  const session = await latest();
  if (!session) throw new Error("No session exists at finalization.");
  const closure = await evaluateSessionClosure(project, session.directory, session.state);
  if (!closure.closed) throw new Error(`Close verification failed: ${closure.reasons.join("; ")}`);

  if (resolved.mode === "guide-project" && run.status === "FINALIZING_GUIDE_RETURN") {
    if (!run.finalCommit || !/^[a-f0-9]{40,64}$/.test(run.finalCommit)) {
      throw new Error("Interrupted Guide return has no valid bound close commit.");
    }
    const recoveryHead = git(["rev-parse", "HEAD"]).stdout.trim();
    if (recoveryHead !== run.finalCommit) {
      throw new Error("Guide return recovery refuses because the project commit changed after return staging.");
    }
    const stage = await buildGuideReturnStage(session, run.finalCommit);
    await finishGuideReturn(stage);
    return;
  }

  const status = git(["status", "--porcelain", "--untracked-files=all"]).stdout.trim();
  if (status !== "") throw new Error(`Relay project is not clean at close: ${status}`);
  const head = git(["rev-parse", "HEAD"]).stdout.trim();
  const branch = git(["branch", "--show-current"]).stdout.trim();
  const upstream = git(["rev-parse", "--abbrev-ref", "--symbolic-full-name", "@{u}"]).stdout.trim();
  const ahead = git(["rev-list", "--count", "@{u}..HEAD"]).stdout.trim();
  const remoteHead = git(["rev-parse", upstream]).stdout.trim();
  const log = git(["log", "--oneline", "--decorate", "--all"]).stdout;
  const kodaStatus = koda(["status"]);
  if (kodaStatus.status !== 0 || !kodaStatus.stdout.includes("SESSION CLOSED")) {
    throw new Error(`Final Koda status did not derive SESSION CLOSED: ${kodaStatus.stdout}${kodaStatus.stderr}`);
  }

  if (resolved.mode === "guide-project") {
    await Promise.all([
      writeJsonAtomic(path.join(runRoot, "GIT-EVIDENCE.json"), {
        version: 1,
        mode: "guide-project",
        launchId: run.launchId,
        sessionId: session.id,
        branch,
        upstream,
        head,
        remoteHead,
        aheadCount: Number(ahead),
        projectStatus: status,
        kodaStatus: kodaStatus.stdout.trim(),
        capturedAt: timestamp(),
      }),
      writeTextAtomic(path.join(runRoot, "GIT-LOG.txt"), log),
    ]);
    const stage = await buildGuideReturnStage(session, head);
    if (process.env.KODA_RELAY_TEST_PAUSE_AFTER_GUIDE_STAGE === "1") {
      run.lastError = "Injected interruption after Guide return staging and before project mutation.";
      await saveRun();
      throw new PausedRun(run.lastError);
    }
    await finishGuideReturn(stage);
    return;
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
  if (!run.interruption && run.status !== "FINALIZING_GUIDE_RETURN") run.status = "RUNNING";
  run.startedAt ??= timestamp();
  run.ownerAcknowledgements ??= 0;
  if (!run.interruption) run.lastError = undefined;
  await saveRun();

  console.log("KODA-C PRODUCER WINDOW");
  console.log(`Producer: ${run.producer.model} / ${run.producer.effort}`);
  console.log(`Session: ${run.sessionId ?? "not opened yet"}`);
  console.log("Owner input: CLOSED — watch here; speak only in the Reviewer window");
  console.log("This context remains the Producer for the complete configured session.");

  await recoverInterruptedModelTurn();

  let announcedPhase: string | null = null;

  for (;;) {
    await pauseAtSafeBoundary();
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

    const phaseKey = `${session.id}:${active.index}:${active.phase.name}`;
    if (announcedPhase !== phaseKey) {
      announcedPhase = phaseKey;
      console.log(`\nPHASE ${active.index + 1}/${session.state.phases.length} — ${active.phase.name.toUpperCase()}`);
      console.log("State: ACTIVE — inputs frozen at phase entry");
      console.log("Handover: Producer artifact → independent Reviewer → owner receipt → mechanical gate");
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
      if (after) {
        printProducerHandover(
          active.phase.name,
          artifactFile,
          after,
          "passed to Window B for independent formal review; the phase remains unadvanced.",
        );
      } else if (pending) {
        console.log(`\nPRODUCER PAUSED — ${active.phase.name.toUpperCase()}`);
        console.log(`Consultation request: ${path.relative(project, pending.request)}`);
        console.log("Control: passed to Window B; producer work remains blocked until a disk response exists.");
      }
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
    if (issueCodes.has("artifact_changed")) {
      await reviewPhase(active.phase.name, "fresh");
      continue;
    }

    if (!gate.approval) {
      await ownerAcknowledge(active.phase.name, reviewFile);
      const halt = await evaluateSessionHalt(project, session.directory, session.state);
      if (halt.halted) {
        run.status = "HALTED";
        run.lastAction = `session halted during ${active.phase.name}; fresh Brief required`;
        run.lastError = undefined;
        await saveRun();
        await note(`session halted during ${active.phase.name}`, [
          `- Halt ID: \`${halt.metadata?.id}\``,
          `- Voided phase: \`${active.phase.name}\``,
          "- No artifact, review, or approval from the in-flight phase counts as gated work.",
          "- Continuation requires a fresh Brief through a new session.",
        ]);
        console.log(`\nRELAY HALTED — ${session.id}`);
        console.log(`Halt evidence: ${path.relative(project, session.directory)}/halt.md`);
        return;
      }
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
    if (run.status !== "FINALIZING_GUIDE_RETURN") run.status = "PAUSED_ERROR";
    run.lastError = error instanceof Error ? error.message : String(error);
    await saveRun();
  }
  console.error(`\nRELAY PAUSED — ${run.lastError ?? String(error)}`);
  console.error(`Resume with: ${producerResumeCommand}`);
  process.exitCode = error instanceof PausedRun ? 2 : 1;
}
