import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createInterface } from "node:readline/promises";

import {
  CONFIG_FILE,
  DEFAULT_CONFIG,
  findProjectRoot,
  pathExists,
  readProjectConfig,
} from "./config.js";
import { closePath, evaluateSessionClosure, prepareCloseArtifact } from "./close.js";
import {
  carryDirectionsForNextSession,
  carryPendingDirectionsAfterHalt,
  createWaitingDirection,
  pendingDirectionsForActivePhase,
} from "./direction.js";
import { evaluateGate } from "./gate.js";
import { pushCommandArgs } from "./git.js";
import { evaluateSessionHalt, haltPath, prepareHaltArtifact } from "./halt.js";
import { bindGuideLaunch, hasGuideManifest, verifyGuideLaunch } from "./guide.js";
import { runGuideCli } from "./guide-commands.js";
import { requireAdvancedHistory, validateAdvancedHistory } from "./history.js";
import { normalizeOwnerName } from "./owner.js";
import {
  artifactPath,
  createSession,
  currentPhase,
  displayPath,
  latestSessionId,
  ledgerPath,
  listSessionIds,
  loadLatestSession,
  loadSession,
  nowIso,
  readRegularText,
  reviewPath,
  saveSessionState,
  statePath,
  writeJsonAtomic,
  writeTextAtomic,
} from "./project.js";
import {
  createFreshReview,
  parseReview,
  readApprovalEntries,
  receiptOccurrenceCount,
  recordApproval,
  sha256,
} from "./receipt.js";









import { claimSessionPaths, loadSessionWorkSet } from "./workset.js";

const packageRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));







function defaultIo()        {
  return {
    out: (message) => console.log(message),
    error: (message) => console.error(message),
    prompt: async (message) => {
      const terminal = createInterface({ input: process.stdin, output: process.stdout });
      try {
        return await terminal.question(message);
      } finally {
        terminal.close();
      }
    },
  };
}

function shellQuote(value        )         {
  return `'${value.replaceAll("'", `'"'"'`)}'`;
}

export function commandPrefix()         {
  if (process.env.KODA_COMMAND?.trim()) return process.env.KODA_COMMAND.trim();
  return `${shellQuote(process.execPath)} ${shellQuote(fileURLToPath(new URL("./cli.js", import.meta.url)))}`;
}

function command(...parts          )         {
  return [commandPrefix(), ...parts.map(shellQuote)].join(" ");
}

function option(args          , name        )                {
  const index = args.indexOf(name);
  if (index === -1) return null;
  const value = args[index + 1];
  if (!value || value.startsWith("--")) throw new Error(`${name} needs a value.`);
  args.splice(index, 2);
  return value;
}

function flag(args          , name        )          {
  const index = args.indexOf(name);
  if (index === -1) return false;
  args.splice(index, 1);
  return true;
}

function repeatedOption(args          , name        )           {
  const values           = [];
  while (args.includes(name)) values.push(option(args, name) );
  return values;
}

function rejectUnknownOptions(args          )       {
  const unknown = args.find((value) => value.startsWith("--"));
  if (unknown) throw new Error(`Unknown option: ${unknown}`);
}



async function terminalEvidence(
  root        ,
  session               ,
)                                                                         {
  const closure = await evaluateSessionClosure(root, session.directory, session.state);
  if (closure.closed) {
    return { terminal: "close", evidenceSha256: sha256(await readRegularText(closePath(session.directory), "close.md")) };
  }
  const halt = await evaluateSessionHalt(root, session.directory, session.state);
  if (halt.halted) {
    return { terminal: "halt", evidenceSha256: sha256(await readRegularText(haltPath(session.directory), "halt.md")) };
  }
  return null;
}

async function unfinishedSessions(root        , config               )                           {
  const unfinished                  = [];
  for (const id of await listSessionIds(root, config)) {
    const session = await loadSession(root, config, id);
    if (!(await terminalEvidence(root, session))) unfinished.push(session);
  }
  return unfinished;
}

function requestedSession(args          )                {
  const fromOption = option(args, "--session");
  const fromEnvironment = process.env.KODA_SESSION_ID?.trim() || null;
  if (fromOption && fromEnvironment && fromOption !== fromEnvironment) {
    throw new Error(`--session ${fromOption} conflicts with KODA_SESSION_ID=${fromEnvironment}.`);
  }
  return fromOption ?? fromEnvironment;
}

async function validateSessionDependencies(root        , config               , session               )                {
  for (const dependency of session.state.dependencies ?? []) {
    const source = await loadSession(root, config, dependency.sessionId);
    const current = await terminalEvidence(root, source);
    if (!current) throw new Error(`Session ${session.id} dependency ${source.id} is no longer pushed-terminal.`);
    if (current.terminal !== dependency.terminal || current.evidenceSha256 !== dependency.evidenceSha256) {
      throw new Error(`Session ${session.id} dependency ${source.id} terminal evidence changed; entry is stale.`);
    }
  }
}

async function selectedSession(
  root        ,
  config               ,
  id               ,
)                         {
  if (id) {
    const selected = await loadSession(root, config, id);
    await validateSessionDependencies(root, config, selected);
    return selected;
  }
  const unfinished = await unfinishedSessions(root, config);
  if (unfinished.length > 1) {
    throw new Error(
      `More than one session is active; session identity is required:\n- ${unfinished.map((item) => item.id).join("\n- ")}\nRun the command again with --session <session-id>.`,
    );
  }
  const selected = unfinished[0] ?? await loadLatestSession(root, config);
  await validateSessionDependencies(root, config, selected);
  return selected;
}

function sessionCommand(sessionId        , ...parts          )         {
  return command(...parts, "--session", sessionId);
}

async function initCommand(args          , cwd        , io       )                {
  const demo = flag(args, "--demo");
  rejectUnknownOptions(args);
  if (args.length > 1) throw new Error("Usage: koda init [directory] [--demo]");

  const root = path.resolve(cwd, args[0] ?? ".");
  await mkdir(root, { recursive: true });
  const configPath = path.join(root, CONFIG_FILE);
  if (await pathExists(configPath)) throw new Error(`${CONFIG_FILE} already exists at ${root}.`);

  await writeJsonAtomic(configPath, DEFAULT_CONFIG);
  await mkdir(path.join(root, DEFAULT_CONFIG.sessionsDir), { recursive: true });
  io.out(`✓ Initialized Koda in ${root}`);

  if (!demo) {
    io.out("Create a non-empty session prompt, then pass its path to `koda session new`.");
    return;
  }

  const fixtureDir = path.join(packageRoot, "demo", "fixture");
  const [prompt, artifact, reviewBody] = await Promise.all([
    readFile(path.join(fixtureDir, "session-prompt.md"), "utf8"),
    readFile(path.join(fixtureDir, "brief.md"), "utf8"),
    readFile(path.join(fixtureDir, "brief-review-body.md"), "utf8"),
  ]);
  const session = await createSession(root, DEFAULT_CONFIG, prompt);
  const first = session.state.phases[0];
  await writeTextAtomic(artifactPath(session.directory, first, 0), artifact);
  await createFreshReview(session.directory, first, 0, { verdict: "APPROVE", body: reviewBody });

  io.out(`✓ Created demo session ${session.id}`);
  io.out("The artifact and review exist. The approval receipt has deliberately not been recorded.");
  io.out("Run the gate and watch it refuse:");
  io.out(`  cd ${shellQuote(root)}`);
  io.out(`  ${command("advance")}`);
}

async function sessionNewCommand(args          , cwd        , io       )                {
  const kind = option(args, "--kind") ?? "produce";
  const dependencyIds = repeatedOption(args, "--depends-on")
    .flatMap((value) => value.split(","))
    .map((value) => value.trim())
    .filter(Boolean);
  const independent = flag(args, "--independent");
  rejectUnknownOptions(args);
  if (args.length !== 1) {
    throw new Error("Usage: koda session new <prompt-file> [--kind <kind>] [--depends-on <session-id>] [--independent]");
  }
  if (new Set(dependencyIds).size !== dependencyIds.length) throw new Error("A session dependency may be named only once.");

  const root = await findProjectRoot(cwd);
  const config = await readProjectConfig(root);
  const promptPath = path.resolve(cwd, args[0]);
  if (!(await pathExists(promptPath))) throw new Error(`Prompt file not found: ${promptPath}`);
  const prompt = await readRegularText(promptPath, "The session prompt");
  if (prompt.trim() === "") throw new Error("The session prompt must be non-empty.");

  const active = await unfinishedSessions(root, config);
  const activeIds = new Set(active.map((session) => session.id));
  const activeDependencies = dependencyIds.filter((id) => activeIds.has(id));
  if (activeDependencies.length > 0) {
    throw new Error(
      `A dependent session cannot start until every named dependency has a pushed close or pushed halt:\n- ${activeDependencies.join("\n- ")}`,
    );
  }
  if (active.length > 0 && !independent) {
    const namedReasons           = [];
    for (const session of active) {
      const closure = await evaluateSessionClosure(root, session.directory, session.state);
      const halt = await evaluateSessionHalt(root, session.directory, session.state);
      const reasons = halt.exists ? halt.reasons : closure.reasons;
      namedReasons.push(`${session.id}: ${reasons.join("; ")}`);
    }
    throw new Error(
      `Session ${active.map((session) => session.id).join(", ")} is neither closed nor pushed-halted:\n- ${namedReasons.join("\n- ")}\nIndependent sessions are allowed, but intent must be explicit while other work is active:\n- ${active.map((session) => `${session.id} (${session.state.kind ?? "produce"})`).join("\n- ")}\nUse --independent for a sibling workstream, or wait and use --depends-on after its pushed terminal evidence exists.`,
    );
  }

  let dependencySources                  = [];
  if (dependencyIds.length > 0) {
    dependencySources = await Promise.all(dependencyIds.map((id) => loadSession(root, config, id)));
  } else if (!independent && active.length === 0) {
    const previousId = await latestSessionId(root, config);
    if (previousId) dependencySources = [await loadSession(root, config, previousId)];
  }

  const dependencies                      = [];
  let entryDirections                       = [];
  const priorHaltIds           = [];
  for (const source of dependencySources) {
    const terminal = await terminalEvidence(root, source);
    if (!terminal) {
      const closure = await evaluateSessionClosure(root, source.directory, source.state);
      const halt = await evaluateSessionHalt(root, source.directory, source.state);
      const reasons = halt.exists ? halt.reasons : closure.reasons;
      throw new Error(`Session ${source.id} is neither closed nor pushed-halted:\n- ${reasons.join("\n- ")}`);
    }
    dependencies.push({ sessionId: source.id, ...terminal });
    if (terminal.terminal === "halt") {
      const halt = await evaluateSessionHalt(root, source.directory, source.state);
      if (!halt.metadata) throw new Error(`Session ${source.id} has invalid halt evidence.`);
      priorHaltIds.push(halt.metadata.id);
      const directions = await carryPendingDirectionsAfterHalt(source.directory, source.state);
      entryDirections.push(...directions);
      const requiredIds = [halt.metadata.id, ...directions.map((direction) => direction.id)];
      const missing = requiredIds.filter((id) => !prompt.includes(id));
      if (missing.length > 0) {
        throw new Error(`The fresh session prompt must cite the pushed halt and every waiting direction ID:\n- ${missing.join("\n- ")}`);
      }
    } else {
      const directions = await carryDirectionsForNextSession(source.directory, source.state);
      entryDirections.push(...directions);
      const missing = directions.map((direction) => direction.id).filter((id) => !prompt.includes(id));
      if (missing.length > 0) {
        const boundary = dependencyIds.length === 0
          ? "at the prior session boundary"
          : `by dependency ${source.id}`;
        throw new Error(`The new session prompt must cite every direction released ${boundary}:\n- ${missing.join("\n- ")}`);
      }
    }
  }

  const guideLaunch = await hasGuideManifest(root, config)
    ? await verifyGuideLaunch(root, config, promptPath)
    : null;
  const launchMode = dependencies.length > 0 ? (dependencyIds.length > 0 ? "dependent" : "continuation") : "independent";
  if (
    guideLaunch && (
      guideLaunch.sessionKind !== kind || guideLaunch.launchMode !== launchMode ||
      guideLaunch.dependencies.length !== dependencies.length ||
      guideLaunch.dependencies.some((dependency, index) => {
        const actual = dependencies[index];
        return !actual || dependency.sessionId !== actual.sessionId || dependency.terminal !== actual.terminal ||
          dependency.evidence.sha256 !== actual.evidenceSha256;
      })
    )
  ) {
    throw new Error("The requested session kind, launch mode, or dependencies do not match the owner-confirmed Guide launch.");
  }
  const session = await createSession(root, config, prompt, {
    entryDirections,
    kind,
    dependencies,
    launchMode,
  });
  if (guideLaunch) await bindGuideLaunch(root, config, guideLaunch, session.id, session.state);
  io.out(`✓ Opened session ${session.id}`);
  io.out(`Kind: ${session.state.kind}`);
  io.out(`Launch: ${session.state.launchMode}`);
  if (dependencies.length > 0) io.out(`Dependencies: ${dependencies.map((item) => item.sessionId).join(", ")}`);
  io.out(`Prompt: ${displayPath(root, path.join(session.directory, "session-prompt.md"))}`);
  io.out(`Current phase: ${session.state.phases[0].name}`);
  if (entryDirections.length > 0) io.out(`Waiting directions entering Brief: ${entryDirections.length}`);
  for (const priorHaltId of priorHaltIds) io.out(`Fresh Brief after pushed halt: ${priorHaltId}`);
  io.out(`Write the artifact: ${displayPath(root, artifactPath(session.directory, session.state.phases[0], 0))}`);
}

function gateNextStep(root        , sessionId        , result            )           {
  const codes = new Set(result.issues.map((item) => item.code));
  if (codes.has("artifact_missing") || codes.has("artifact_empty") || codes.has("artifact_not_regular")) {
    return [`Write a non-empty artifact at: ${displayPath(root, result.artifactPath)}`];
  }
  if (codes.has("review_missing")) {
    return ["Create the peer-review template:", `  ${sessionCommand(sessionId, "review", "new", result.phase.name)}`];
  }
  if (
    codes.has("direction_input_missing") ||
    codes.has("direction_used_before_gate") ||
    codes.has("direction_evidence_invalid") ||
    codes.has("artifact_changed") ||
    codes.has("receipt_missing") ||
    codes.has("receipt_mismatch") ||
    codes.has("receipt_not_unique") ||
    codes.has("review_not_regular") ||
    codes.has("review_metadata_missing") ||
    codes.has("review_phase_mismatch") ||
    codes.has("review_incomplete") ||
    codes.has("approval_review_changed") ||
    codes.has("ledger_corrupt") ||
    codes.has("verdict_revise") ||
    codes.has("verdict_reject") ||
    codes.has("verdict_discuss")
  ) {
    return ["After resolving the finding, create a fresh review and receipt:", `  ${sessionCommand(sessionId, "review", "new", result.phase.name)}`];
  }
  if (codes.has("approval_missing") || codes.has("ledger_missing")) {
    return [
      `Read ${displayPath(root, result.reviewPath)} through its final RECEIPT line.`,
      "Then run this command; it will ask you to quote that line:",
      `  ${sessionCommand(sessionId, "approve", result.phase.name, "--approver", "Owner")}`,
    ];
  }
  return [];
}

function printClosedGate(root        , sessionId        , result            , io       )       {
  io.out(`GATE CLOSED — ${result.phase.name.toUpperCase()}`);
  for (const finding of result.issues) io.out(`✗ ${finding.message}`);
  io.out("Nothing advanced.");
  const next = gateNextStep(root, sessionId, result);
  if (next.length) {
    io.out("");
    for (const line of next) io.out(line);
  }
}

async function printSessionStatus(root        , session               , io       )                {
  const active = currentPhase(session.state);
  io.out(`KODA — ${session.id} — ${session.state.kind ?? "produce"}`);
  io.out(`Launch: ${session.state.launchMode ?? "legacy"}`);
  if ((session.state.dependencies ?? []).length > 0) {
    io.out(`Dependencies: ${session.state.dependencies .map((item) => item.sessionId).join(", ")}`);
  }
  const workSet = await loadSessionWorkSet(session.directory, session.id);
  io.out(`Write set: ${workSet.claims.length} external path(s)`);
  for (const claim of workSet.claims) io.out(`  ${claim.path}`);
  const halt = await evaluateSessionHalt(root, session.directory, session.state);
  if (halt.exists) {
    io.out(halt.halted ? "SESSION HALTED — dependent work may open" : "HALT PREPARED — SESSION NOT YET HALTED");
    for (const reason of halt.reasons) io.out(`✗ ${reason}`);
    return;
  }
  const historyIssues = await validateAdvancedHistory(session.directory, session.state);
  if (historyIssues.length) {
    io.out("SESSION EVIDENCE BROKEN — ENTRY REFUSED");
    for (const finding of historyIssues) io.out(`✗ ${finding.phase}: ${finding.message}`);
    return;
  }
  if (!active) {
    const closure = await evaluateSessionClosure(root, session.directory, session.state);
    io.out(closure.closed ? "SESSION CLOSED" : "PHASES COMPLETE — SESSION NOT CLOSED");
    for (const reason of closure.reasons) io.out(`✗ ${reason}`);
    return;
  }

  io.out(`Phase ${active.index + 1}/${session.state.phases.length}: ${active.phase.name}`);
  const waiting = await pendingDirectionsForActivePhase(session.directory, session.state);
  if (waiting.length > 0) io.out(`WAITING AT NEXT GATE — ${waiting.length} recorded direction(s); current phase inputs remain frozen.`);
  const result = await evaluateGate(session.directory, active.phase, active.index);
  io.out(result.open ? "GATE OPEN — ready to advance" : `GATE CLOSED — ${result.issues.length} requirement(s) missing`);
  for (const finding of result.issues) io.out(`✗ ${finding.message}`);
  for (const line of gateNextStep(root, session.id, result)) io.out(line);
}

async function statusCommand(args          , cwd        , io       )                {
  const sessionId = requestedSession(args);
  rejectUnknownOptions(args);
  if (args.length !== 0) throw new Error("Usage: koda status [--session <session-id>]");
  const root = await findProjectRoot(cwd);
  const config = await readProjectConfig(root);
  if (sessionId) {
    await printSessionStatus(root, await selectedSession(root, config, sessionId), io);
    return;
  }
  const unfinished = await unfinishedSessions(root, config);
  if (unfinished.length <= 1) {
    const selected = unfinished[0] ?? await loadLatestSession(root, config);
    await validateSessionDependencies(root, config, selected);
    await printSessionStatus(root, selected, io);
    return;
  }
  io.out(`KODA PROJECT — ${unfinished.length} ACTIVE SESSIONS`);
  io.out("Session identity is explicit; use --session <session-id> for any mutation.");
  for (const session of unfinished) {
    await validateSessionDependencies(root, config, session);
    io.out("");
    await printSessionStatus(root, session, io);
  }
}

async function directionWaitCommand(args          , cwd        , io       )                {
  const source = option(args, "--source") ?? "owner-via-guide";
  const sessionId = requestedSession(args);
  rejectUnknownOptions(args);
  if (args.length !== 2) {
    throw new Error("Usage: koda direction wait <owner-message-file> <classification-file> [--source owner-via-guide|owner-via-reviewer]");
  }
  if (source !== "owner-via-guide" && source !== "owner-via-reviewer") {
    throw new Error("Direction source must be owner-via-guide or owner-via-reviewer.");
  }
  const root = await findProjectRoot(cwd);
  const config = await readProjectConfig(root);
  const session = await selectedSession(root, config, sessionId);
  if (await pathExists(haltPath(session.directory))) throw new Error("Session halt is already prepared; no new direction may enter it.");
  await requireAdvancedHistory(session.directory, session.state);
  if (!currentPhase(session.state)) throw new Error("No active phase can receive waiting direction.");
  const [ownerStatement, classification] = await Promise.all([
    readRegularText(path.resolve(cwd, args[0]), "The owner direction file"),
    readRegularText(path.resolve(cwd, args[1]), "The direction classification file"),
  ]);
  const created = await createWaitingDirection({
    sessionDir: session.directory,
    state: session.state,
    source,
    ownerStatement,
    classification,
  });
  io.out(`DIRECTION RECORDED — WAITING FOR GATE`);
  io.out(`✓ ${displayPath(root, created.path)}`);
  io.out(`Direction ID: ${created.metadata.id}`);
  io.out("The active phase inputs remain frozen. Producer receives this only after the next successful gate.");
}

async function workClaimCommand(args          , cwd        , io       )                {
  const sessionId = requestedSession(args);
  rejectUnknownOptions(args);
  if (args.length === 0) throw new Error("Usage: koda work claim <path> [path...] [--session <session-id>]");
  const root = await findProjectRoot(cwd);
  const config = await readProjectConfig(root);
  const session = await selectedSession(root, config, sessionId);
  if (await terminalEvidence(root, session)) throw new Error(`Session ${session.id} is terminal and cannot claim new output paths.`);
  const relative = args.map((value) => {
    const candidate = path.resolve(cwd, value);
    const result = path.relative(root, candidate);
    if (result.startsWith("..") || path.isAbsolute(result)) throw new Error(`Write claim escapes the project: ${value}.`);
    return result.split(path.sep).join("/");
  });
  const before = await claimSessionPaths(root, config, session.id, relative);
  io.out(`WRITE SET — ${session.id}`);
  for (const claim of before.claims) io.out(`✓ ${claim.path}`);
  io.out("Only this session may mutate these paths until it reaches pushed close or halt.");
}

async function reviewNewCommand(args          , cwd        , io       )                {
  const sessionId = requestedSession(args);
  rejectUnknownOptions(args);
  if (args.length !== 1) throw new Error("Usage: koda review new <phase>");
  const root = await findProjectRoot(cwd);
  const config = await readProjectConfig(root);
  const session = await selectedSession(root, config, sessionId);
  if (await pathExists(haltPath(session.directory))) throw new Error("Session halt is already prepared; no review may be created.");
  await requireAdvancedHistory(session.directory, session.state);
  const active = currentPhase(session.state);
  if (!active) throw new Error("All phases are complete; no review can be created.");
  if (args[0] !== active.phase.name) throw new Error(`Current phase is ${active.phase.name}, not ${args[0]}.`);

  const created = await createFreshReview(session.directory, active.phase, active.index);
  if (created.archivedPath) io.out(`✓ Archived prior review: ${displayPath(root, created.archivedPath)}`);
  io.out(`✓ Created fresh review: ${displayPath(root, created.filePath)}`);
  io.out("A peer reviewer must replace the template findings and set a definitive VERDICT.");
  io.out("Keep the generated metadata and final RECEIPT line unchanged.");
}

async function approveCommand(args          , cwd        , io       )                {
  const approver = normalizeOwnerName(option(args, "--approver") ?? "Owner", "Approver");
  let comments = option(args, "--comments");
  let ruling = option(args, "--ruling");
  const sessionId = requestedSession(args);
  rejectUnknownOptions(args);
  if (args.length < 1 || args.length > 2) {
    throw new Error("Usage: koda approve <phase> [quoted-receipt] [--approver <name>] [--comments <text>] [--ruling <text>]");
  }
  const root = await findProjectRoot(cwd);
  const config = await readProjectConfig(root);
  const session = await selectedSession(root, config, sessionId);
  if (await pathExists(haltPath(session.directory))) throw new Error("Session halt is already prepared; no review may be approved.");
  await requireAdvancedHistory(session.directory, session.state);
  const active = currentPhase(session.state);
  if (!active) throw new Error("All phases are complete; there is nothing to approve.");
  if (args[0] !== active.phase.name) throw new Error(`Current phase is ${active.phase.name}, not ${args[0]}.`);

  const phaseReviewPath = reviewPath(session.directory, active.phase, active.index);
  const phaseArtifactPath = artifactPath(session.directory, active.phase, active.index);
  if (!(await pathExists(phaseReviewPath))) throw new Error(`Review missing: ${displayPath(root, phaseReviewPath)}`);
  if (!(await pathExists(phaseArtifactPath))) throw new Error(`Artifact missing: ${displayPath(root, phaseArtifactPath)}`);

  const reviewContent = await readRegularText(phaseReviewPath, "The peer-review file");
  const parsed = parseReview(reviewContent);
  if (!parsed.verdict || !parsed.receipt || !parsed.metadata) {
    throw new Error("The review's verdict, generated metadata, or final receipt is invalid.");
  }
  const artifact = await readRegularText(phaseArtifactPath, "The phase artifact");
  if (artifact.trim() === "" || sha256(artifact) !== parsed.metadata.artifactSha256) {
    throw new Error("The artifact is empty or changed after this review was generated. Create a fresh review.");
  }
  if (parsed.metadata.phase !== active.phase.name || parsed.metadata.receipt !== parsed.receipt) {
    throw new Error("The review metadata does not match this phase and receipt.");
  }
  if (await receiptOccurrenceCount(session.directory, parsed.receipt) !== 1) {
    throw new Error("The review receipt is not unique. Create a fresh review.");
  }
  if (
    reviewContent.includes("Verify the artifact against the files it cites. Replace this guidance with findings.") ||
    reviewContent.includes("- Record what the files prove.")
  ) {
    throw new Error("The review still contains untouched template guidance. Complete the review first.");
  }

  const quoted = (args[1] ?? await io.prompt("Paste the exact RECEIPT line: ")).trim();
  if (quoted !== parsed.receipt.trim()) throw new Error("Receipt mismatch. Nothing was written to the ledger.");
  if (parsed.verdict === "APPROVE WITH COMMENTS" && !comments?.trim()) {
    comments = await io.prompt("Enter the review comments for the ledger: ");
    if (!comments.trim()) throw new Error("APPROVE WITH COMMENTS requires comments in the ledger.");
  }
  if (parsed.verdict === "DISCUSS" && !ruling?.trim()) {
    ruling = await io.prompt("Enter the owner's ruling for the ledger: ");
    if (!ruling.trim()) throw new Error("DISCUSS requires the owner's ruling before a fresh review.");
  }

  const entry                = {
    version: 1,
    phase: active.phase.name,
    reviewId: parsed.metadata.id,
    reviewSha256: sha256(reviewContent),
    verdict: parsed.verdict,
    receipt: parsed.receipt,
    approver,
    comments: comments?.trim() || null,
    ruling: ruling?.trim() || null,
    recordedAt: nowIso(),
  };
  await recordApproval(session.directory, entry);
  io.out(`✓ Receipt recorded in ${displayPath(root, ledgerPath(session.directory))}`);

  if (parsed.verdict === "APPROVE" || parsed.verdict === "APPROVE WITH COMMENTS") {
    io.out("The verdict permits advancement. Run:");
    io.out(`  ${sessionCommand(session.id, "advance")}`);
  } else {
    io.out(`${parsed.verdict} still blocks advancement. Resolve it, then create a fresh review:`);
    io.out(`  ${sessionCommand(session.id, "review", "new", active.phase.name)}`);
  }
}

async function advanceCommand(args          , cwd        , io       )                {
  const sessionId = requestedSession(args);
  rejectUnknownOptions(args);
  if (args.length !== 0) throw new Error("Usage: koda advance");
  const root = await findProjectRoot(cwd);
  const config = await readProjectConfig(root);
  const session = await selectedSession(root, config, sessionId);
  if (await pathExists(haltPath(session.directory))) throw new Error("Session halt is already prepared; no phase may advance.");
  await requireAdvancedHistory(session.directory, session.state);
  const active = currentPhase(session.state);
  if (!active) throw new Error("All phases have already advanced. Commit and push, then run `koda session close`." );

  const result = await evaluateGate(session.directory, active.phase, active.index);
  if (!result.open || !result.review?.metadata || !result.review.receipt) {
    printClosedGate(root, session.id, result, io);
    process.exitCode = 2;
    return;
  }

  const waitingDirections = await pendingDirectionsForActivePhase(session.directory, session.state);
  session.state.advances.push({
    phase: active.phase.name,
    receipt: result.review.receipt,
    reviewId: result.review.metadata.id,
    advancedAt: nowIso(),
    ...(waitingDirections.length > 0
      ? { directions: waitingDirections.map((direction) => direction.metadata.id) }
      : {}),
  });
  session.state.currentPhaseIndex += 1;
  await saveSessionState(session.directory, session.state);

  io.out(`GATE OPEN — ${active.phase.name.toUpperCase()}`);
  io.out(`✓ Advanced with artifact, review, ${result.review.verdict}, and exact receipt proof.`);
  const released = session.state.advances.at(-1)?.directions ?? [];
  if (released.length > 0) {
    io.out(`✓ Released ${released.length} waiting direction(s) to the receiving phase.`);
    for (const id of released) io.out(`  ${id}`);
  }
  const next = currentPhase(session.state);
  if (next) {
    io.out(`Next phase: ${next.phase.name}`);
    io.out(`Write the artifact: ${displayPath(root, artifactPath(session.directory, next.phase, next.index))}`);
  } else {
    io.out("All phases are complete. Prepare the immutable close artifact:");
    io.out(`  ${sessionCommand(session.id, "session", "close")}`);
  }
}

async function sessionCloseCommand(args          , cwd        , io       )                {
  const sessionId = requestedSession(args);
  rejectUnknownOptions(args);
  if (args.length !== 0) throw new Error("Usage: koda session close");
  const root = await findProjectRoot(cwd);
  const config = await readProjectConfig(root);
  const session = await selectedSession(root, config, sessionId);
  if (await pathExists(haltPath(session.directory))) throw new Error("A halted session cannot run the close ceremony.");
  if (session.state.currentPhaseIndex !== session.state.phases.length) {
    io.out(`SESSION NOT CLOSED — ${session.id}`);
    io.out("✗ Every declared phase has not advanced.");
    process.exitCode = 2;
    return;
  }
  if (!(await pathExists(closePath(session.directory)))) {
    const pushArgs = pushCommandArgs(root);
    if (!pushArgs) {
      io.out(`SESSION NOT CLOSED — ${session.id}`);
      io.out("✗ Configure a Git remote and named branch before preparing close.md.");
      process.exitCode = 2;
      return;
    }
    const prepared = await prepareCloseArtifact(session.directory, session.state);
    const relativeSession = displayPath(root, session.directory);
    io.out(`CLOSE PREPARED — ${session.id} — NOT CLOSED`);
    io.out(`✓ Created immutable ${displayPath(root, prepared)}`);
    io.out("Commit and push the bound session, then run `koda session close` again:");
    io.out(`  git add ${shellQuote(relativeSession)}`);
    io.out(`  git commit -m ${shellQuote(`close session ${session.id}`)}`);
    io.out(`  git ${pushArgs.map(shellQuote).join(" ")}`);
    process.exitCode = 2;
    return;
  }
  const closure = await evaluateSessionClosure(root, session.directory, session.state);
  if (!closure.closed) {
    io.out(`SESSION NOT CLOSED — ${session.id}`);
    for (const reason of closure.reasons) io.out(`✗ ${reason}`);
    process.exitCode = 2;
    return;
  }
  io.out(`SESSION CLOSED — ${session.id}`);
  io.out("✓ Final phase gated, immutable close committed, and branch pushed.");
}

async function sessionHaltCommand(args          , cwd        , io       )                {
  const sessionId = requestedSession(args);
  rejectUnknownOptions(args);
  if (args.length > 1) throw new Error("Usage: koda session halt [owner-direction-file]");
  const root = await findProjectRoot(cwd);
  const config = await readProjectConfig(root);
  const session = await selectedSession(root, config, sessionId);
  const file = haltPath(session.directory);
  if (!(await pathExists(file))) {
    if (args.length !== 1) throw new Error("Usage: koda session halt <owner-direction-file>");
    const ownerDirection = await readRegularText(path.resolve(cwd, args[0]), "The halt direction file");
    const pushArgs = pushCommandArgs(root);
    if (!pushArgs) {
      io.out(`SESSION NOT HALTED — ${session.id}`);
      io.out("✗ Configure a Git remote and named branch before preparing halt.md.");
      process.exitCode = 2;
      return;
    }
    const prepared = await prepareHaltArtifact(session.directory, session.state, ownerDirection);
    const relativeSession = displayPath(root, session.directory);
    io.out(`HALT PREPARED — ${session.id} — NOT HALTED`);
    io.out(`✓ Created immutable ${displayPath(root, prepared)}`);
    io.out("The active phase is void and cannot resume. Commit and push the bound session, then verify:");
    io.out(`  git add ${shellQuote(relativeSession)}`);
    io.out(`  git commit -m ${shellQuote(`halt session ${session.id}`)}`);
    io.out(`  git ${pushArgs.map(shellQuote).join(" ")}`);
    io.out(`  ${sessionCommand(session.id, "session", "halt")}`);
    process.exitCode = 2;
    return;
  }
  const halt = await evaluateSessionHalt(root, session.directory, session.state);
  if (!halt.halted) {
    io.out(`SESSION NOT HALTED — ${session.id}`);
    for (const reason of halt.reasons) io.out(`✗ ${reason}`);
    process.exitCode = 2;
    return;
  }
  io.out(`SESSION HALTED — ${session.id}`);
  io.out(`✓ In-flight phase ${halt.metadata?.phase} is void; no artifact, review, or approval from it may count.`);
  io.out(`Fresh Brief must cite halt ID: ${halt.metadata?.id}`);
}

function help(io       )       {
  io.out("Koda — a disk-backed workflow where review proof controls advancement");
  io.out("");
  io.out("Commands:");
  io.out("  koda init [directory] [--demo]");
  io.out("  koda session new <prompt-file> [--kind <kind>] [--depends-on <session-id>] [--independent]");
  io.out("  koda guide <status|claim|confirm|cancel|bind|verify|launch>");
  io.out("  koda guide launch ... [--open ghostty]");
  io.out("  koda guide recover --open ghostty");
  io.out("  koda status [--session <session-id>]");
  io.out("  koda review new <phase> [--session <session-id>]");
  io.out("  koda direction wait <owner-message-file> <classification-file> [--source owner-via-guide|owner-via-reviewer] [--session <session-id>]");
  io.out("  koda work claim <path> [path...] [--session <session-id>]");
  io.out("  koda approve <phase> [quoted-receipt] [--approver <name>] [--session <session-id>]");
  io.out("  koda advance [--session <session-id>]");
  io.out("  koda session halt [owner-direction-file] [--session <session-id>]");
  io.out("  koda session close [--session <session-id>]");
}

export async function runCli(args          , cwd = process.cwd(), io        = defaultIo())                {
  const [verb, ...rest] = args;
  if (!verb || verb === "help" || verb === "--help" || verb === "-h") return help(io);
  if (verb === "--version" || verb === "-v") {
    const pkg = JSON.parse(await readFile(path.join(packageRoot, "package.json"), "utf8"))                       ;
    io.out(pkg.version);
    return;
  }
  if (verb === "init") return initCommand(rest, cwd, io);
  if (verb === "status") return statusCommand(rest, cwd, io);
  if (verb === "guide") return runGuideCli(rest, cwd, { out: io.out });
  if (verb === "review" && rest[0] === "new") return reviewNewCommand(rest.slice(1), cwd, io);
  if (verb === "direction" && rest[0] === "wait") return directionWaitCommand(rest.slice(1), cwd, io);
  if (verb === "work" && rest[0] === "claim") return workClaimCommand(rest.slice(1), cwd, io);
  if (verb === "approve") return approveCommand(rest, cwd, io);
  if (verb === "advance") return advanceCommand(rest, cwd, io);
  if (verb === "session" && rest[0] === "new") return sessionNewCommand(rest.slice(1), cwd, io);
  if (verb === "session" && rest[0] === "close") return sessionCloseCommand(rest.slice(1), cwd, io);
  if (verb === "session" && rest[0] === "halt") return sessionHaltCommand(rest.slice(1), cwd, io);
  throw new Error(`Unknown command: ${args.join(" ")}. Run \`koda --help\`.`);
}

export async function main(args = process.argv.slice(2))                {
  try {
    await runCli(args);
  } catch (error) {
    console.error(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
  }
}


//# sourceURL=/Users/freeborn/Dev/koda-codex/src/commands.ts