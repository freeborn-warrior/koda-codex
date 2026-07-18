#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { appendFile, readFile, readdir, realpath, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { evaluateSessionClosure } from "../src/close.ts";
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
} from "../src/project.ts";
import { sha256 } from "../src/receipt.ts";

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
const requested = process.argv[2];

if (!requested) {
  console.error("Usage: npm run relay:execute -- docs/relay-runs/<prepared-run>");
  process.exit(1);
}

const runsRoot = await realpath(path.join(root, "docs", "relay-runs"));
const runRoot = await realpath(path.resolve(root, requested));
if (path.dirname(runRoot) !== runsRoot) {
  throw new Error(`Relay run must be one direct child of ${runsRoot}`);
}

const runPath = path.join(runRoot, "RUN.json");
const transcriptPath = path.join(runRoot, "TRANSCRIPT.md");
const run = JSON.parse(await readFile(runPath, "utf8")) as RunRecord;
if (run.version !== 1 || run.status === "COMPLETE") {
  throw new Error(`Relay run cannot execute from status ${run.status}.`);
}

const project = path.resolve(runRoot, run.project);
const runtime = path.resolve(runRoot, run.runtime);
if (!project.startsWith(`${runRoot}${path.sep}`) || !runtime.startsWith(`${project}${path.sep}`)) {
  throw new Error("Relay run paths escape their prepared run folder.");
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
  ];
  const args = roleRecord.threadId
    ? [...base, "resume", ...common, roleRecord.threadId, prompt]
    : [...base, ...common, "--color", "never", "-s", "workspace-write", prompt];

  run.lastAction = `${role} turn ${turn}: ${purpose}`;
  await saveRun();
  console.log(`\n${role.toUpperCase()} ${turn}: ${purpose}`);

  const executed = spawnSync("codex", args, {
    cwd: project,
    encoding: "utf8",
    maxBuffer: 50 * 1024 * 1024,
    env: process.env,
  });
  const stdout = executed.stdout ?? "";
  const stderr = executed.stderr ?? String(executed.error ?? "");
  await Promise.all([
    writeFile(path.join(runRoot, eventFile), stdout, "utf8"),
    writeFile(path.join(runRoot, stderrFile), stderr, "utf8"),
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
    `- Exit: ${executed.status ?? -1}`,
    `- Event stream: [${eventFile}](${eventFile})`,
    `- Stderr: [${stderrFile}](${stderrFile})`,
    "- Conversational stdin: closed",
  ]);

  if (executed.status !== 0) {
    run.status = "PAUSED_MODEL_FAILURE";
    run.lastError = `${role} turn ${turn} exited ${executed.status ?? -1}.`;
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
  await modelTurn("reviewer", `${mode} review of ${phaseName}`, [
    `Read ${reviewerSkill()} completely and explicitly use koda-c-review in formal-review mode for current phase ${phaseName}.`,
    `Use node ${run.cli} wherever the skill says koda.`,
    modeInstruction,
    "Remain independent from the producer context. Use only the artifact and files it cites, write the complete review to disk, run Koda status, and stop.",
    "Never approve, advance, modify the producer artifact, or quote the receipt in your response.",
  ].join(" "));
}

async function answerConsultation(request: string): Promise<void> {
  await modelTurn("reviewer", `answer consultation ${path.basename(request)}`, [
    `Read ${reviewerSkill()} completely and explicitly use koda-c-review in in-phase consultation mode for request ${request}.`,
    `Read ${path.join(project, "docs", "IN-PHASE-CONSULTATION.md")} completely.`,
    "Answer only from the request and its cited evidence. Write the response artifact before stopping.",
    "If owner judgment is required, record AWAITING OWNER and the smallest clear owner question; never impersonate Kristian or create a formal verdict.",
  ].join(" "));
}

async function ownerAcknowledge(phaseName: string, reviewFile: string): Promise<void> {
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
  await commitProducedOutput();
  await modelTurn("producer", "perform immutable session close", [
    `Read ${producerSkill("close")} completely and explicitly use koda-c-close.`,
    `Use node ${run.cli} wherever the skill says koda.`,
    "Every configured phase is advanced and all produced output was committed and pushed by the relay supervisor.",
    "Perform the complete prepare → exact Git commands → push → verify ceremony. Do not create another session or ask the owner.",
    "Stop only after both koda session close and koda status derive SESSION CLOSED from disk and Git.",
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
    writeFile(path.join(runRoot, "GIT-LOG.txt"), log, "utf8"),
  ]);

  run.status = "COMPLETE";
  run.completedAt = timestamp();
  run.finalCommit = head;
  run.lastError = undefined;
  await saveRun();
  await writeFile(path.join(runRoot, "RESULT.md"), [
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
  ].join("\n"), "utf8");
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
  console.error(`Resume with: npm run relay:execute -- ${path.relative(root, runRoot)}`);
  process.exitCode = error instanceof PausedRun ? 2 : 1;
}
