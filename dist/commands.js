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
import { evaluateGate } from "./gate.js";
import { pushCommandArgs } from "./git.js";
import { requireAdvancedHistory, validateAdvancedHistory } from "./history.js";
import {
  artifactPath,
  createSession,
  currentPhase,
  displayPath,
  latestSessionId,
  ledgerPath,
  loadLatestSession,
  loadSessionState,
  nowIso,
  reviewPath,
  saveSessionState,
  sessionRoot,
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

function rejectUnknownOptions(args          )       {
  const unknown = args.find((value) => value.startsWith("--"));
  if (unknown) throw new Error(`Unknown option: ${unknown}`);
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
  rejectUnknownOptions(args);
  if (args.length !== 1) throw new Error("Usage: koda session new <prompt-file>");

  const root = await findProjectRoot(cwd);
  const config = await readProjectConfig(root);
  const promptPath = path.resolve(cwd, args[0]);
  if (!(await pathExists(promptPath))) throw new Error(`Prompt file not found: ${promptPath}`);
  const prompt = await readFile(promptPath, "utf8");
  if (prompt.trim() === "") throw new Error("The session prompt must be non-empty.");

  const previousId = await latestSessionId(root, config);
  if (previousId) {
    const previousDir = sessionRoot(root, config, previousId);
    const previous = await loadSessionState(previousDir, previousId);
    const closure = await evaluateSessionClosure(root, previousDir, previous);
    if (!closure.closed) {
      throw new Error(`Session ${previousId} is not closed:\n- ${closure.reasons.join("\n- ")}`);
    }
  }

  const session = await createSession(root, config, prompt);
  io.out(`✓ Opened session ${session.id}`);
  io.out(`Prompt: ${displayPath(root, path.join(session.directory, "session-prompt.md"))}`);
  io.out(`Current phase: ${session.state.phases[0].name}`);
  io.out(`Write the artifact: ${displayPath(root, artifactPath(session.directory, session.state.phases[0], 0))}`);
}

function gateNextStep(root        , result            )           {
  const codes = new Set(result.issues.map((item) => item.code));
  if (codes.has("artifact_missing") || codes.has("artifact_empty")) {
    return [`Write a non-empty artifact at: ${displayPath(root, result.artifactPath)}`];
  }
  if (codes.has("review_missing")) {
    return ["Create the peer-review template:", `  ${command("review", "new", result.phase.name)}`];
  }
  if (
    codes.has("artifact_changed") ||
    codes.has("receipt_missing") ||
    codes.has("receipt_mismatch") ||
    codes.has("receipt_not_unique") ||
    codes.has("review_metadata_missing") ||
    codes.has("review_phase_mismatch") ||
    codes.has("review_incomplete") ||
    codes.has("approval_review_changed") ||
    codes.has("ledger_corrupt") ||
    codes.has("verdict_revise") ||
    codes.has("verdict_reject") ||
    codes.has("verdict_discuss")
  ) {
    return ["After resolving the finding, create a fresh review and receipt:", `  ${command("review", "new", result.phase.name)}`];
  }
  if (codes.has("approval_missing") || codes.has("ledger_missing")) {
    return [
      `Read ${displayPath(root, result.reviewPath)} through its final RECEIPT line.`,
      "Then run this command; it will ask you to quote that line:",
      `  ${command("approve", result.phase.name, "--approver", "Owner")}`,
    ];
  }
  return [];
}

function printClosedGate(root        , result            , io       )       {
  io.out(`GATE CLOSED — ${result.phase.name.toUpperCase()}`);
  for (const finding of result.issues) io.out(`✗ ${finding.message}`);
  io.out("Nothing advanced.");
  const next = gateNextStep(root, result);
  if (next.length) {
    io.out("");
    for (const line of next) io.out(line);
  }
}

async function statusCommand(args          , cwd        , io       )                {
  rejectUnknownOptions(args);
  if (args.length !== 0) throw new Error("Usage: koda status");
  const root = await findProjectRoot(cwd);
  const config = await readProjectConfig(root);
  const session = await loadLatestSession(root, config);
  const active = currentPhase(session.state);

  io.out(`KODA — ${session.id}`);
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
  const result = await evaluateGate(session.directory, active.phase, active.index);
  io.out(result.open ? "GATE OPEN — ready to advance" : `GATE CLOSED — ${result.issues.length} requirement(s) missing`);
  for (const finding of result.issues) io.out(`✗ ${finding.message}`);
  for (const line of gateNextStep(root, result)) io.out(line);
}

async function reviewNewCommand(args          , cwd        , io       )                {
  rejectUnknownOptions(args);
  if (args.length !== 1) throw new Error("Usage: koda review new <phase>");
  const root = await findProjectRoot(cwd);
  const config = await readProjectConfig(root);
  const session = await loadLatestSession(root, config);
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
  const approver = option(args, "--approver") ?? "Owner";
  let comments = option(args, "--comments");
  let ruling = option(args, "--ruling");
  rejectUnknownOptions(args);
  if (args.length < 1 || args.length > 2) {
    throw new Error("Usage: koda approve <phase> [quoted-receipt] [--approver <name>] [--comments <text>] [--ruling <text>]");
  }
  if (approver.trim() === "" || /[\r\n]/.test(approver)) throw new Error("Approver must be a non-empty single line.");

  const root = await findProjectRoot(cwd);
  const config = await readProjectConfig(root);
  const session = await loadLatestSession(root, config);
  await requireAdvancedHistory(session.directory, session.state);
  const active = currentPhase(session.state);
  if (!active) throw new Error("All phases are complete; there is nothing to approve.");
  if (args[0] !== active.phase.name) throw new Error(`Current phase is ${active.phase.name}, not ${args[0]}.`);

  const phaseReviewPath = reviewPath(session.directory, active.phase, active.index);
  const phaseArtifactPath = artifactPath(session.directory, active.phase, active.index);
  if (!(await pathExists(phaseReviewPath))) throw new Error(`Review missing: ${displayPath(root, phaseReviewPath)}`);
  if (!(await pathExists(phaseArtifactPath))) throw new Error(`Artifact missing: ${displayPath(root, phaseArtifactPath)}`);

  const reviewContent = await readFile(phaseReviewPath, "utf8");
  const parsed = parseReview(reviewContent);
  if (!parsed.verdict || !parsed.receipt || !parsed.metadata) {
    throw new Error("The review's verdict, generated metadata, or final receipt is invalid.");
  }
  const artifact = await readFile(phaseArtifactPath, "utf8");
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
    ruling = await io.prompt("Enter Kristian's ruling for the ledger: ");
    if (!ruling.trim()) throw new Error("DISCUSS requires Kristian's ruling before a fresh review.");
  }

  const entry                = {
    version: 1,
    phase: active.phase.name,
    reviewId: parsed.metadata.id,
    reviewSha256: sha256(reviewContent),
    verdict: parsed.verdict,
    receipt: parsed.receipt,
    approver: approver.trim(),
    comments: comments?.trim() || null,
    ruling: ruling?.trim() || null,
    recordedAt: nowIso(),
  };
  await recordApproval(session.directory, entry);
  io.out(`✓ Receipt recorded in ${displayPath(root, ledgerPath(session.directory))}`);

  if (parsed.verdict === "APPROVE" || parsed.verdict === "APPROVE WITH COMMENTS") {
    io.out("The verdict permits advancement. Run:");
    io.out(`  ${command("advance")}`);
  } else {
    io.out(`${parsed.verdict} still blocks advancement. Resolve it, then create a fresh review:`);
    io.out(`  ${command("review", "new", active.phase.name)}`);
  }
}

async function advanceCommand(args          , cwd        , io       )                {
  rejectUnknownOptions(args);
  if (args.length !== 0) throw new Error("Usage: koda advance");
  const root = await findProjectRoot(cwd);
  const config = await readProjectConfig(root);
  const session = await loadLatestSession(root, config);
  await requireAdvancedHistory(session.directory, session.state);
  const active = currentPhase(session.state);
  if (!active) throw new Error("All phases have already advanced. Commit and push, then run `koda session close`." );

  const result = await evaluateGate(session.directory, active.phase, active.index);
  if (!result.open || !result.review?.metadata || !result.review.receipt) {
    printClosedGate(root, result, io);
    process.exitCode = 2;
    return;
  }

  session.state.advances.push({
    phase: active.phase.name,
    receipt: result.review.receipt,
    reviewId: result.review.metadata.id,
    advancedAt: nowIso(),
  });
  session.state.currentPhaseIndex += 1;
  await saveSessionState(session.directory, session.state);

  io.out(`GATE OPEN — ${active.phase.name.toUpperCase()}`);
  io.out(`✓ Advanced with artifact, review, ${result.review.verdict}, and exact receipt proof.`);
  const next = currentPhase(session.state);
  if (next) {
    io.out(`Next phase: ${next.phase.name}`);
    io.out(`Write the artifact: ${displayPath(root, artifactPath(session.directory, next.phase, next.index))}`);
  } else {
    io.out("All phases are complete. Prepare the immutable close artifact:");
    io.out(`  ${command("session", "close")}`);
  }
}

async function sessionCloseCommand(args          , cwd        , io       )                {
  rejectUnknownOptions(args);
  if (args.length !== 0) throw new Error("Usage: koda session close");
  const root = await findProjectRoot(cwd);
  const config = await readProjectConfig(root);
  const session = await loadLatestSession(root, config);
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

function help(io       )       {
  io.out("Koda — phase gates with proof the review was read");
  io.out("");
  io.out("Commands:");
  io.out("  koda init [directory] [--demo]");
  io.out("  koda session new <prompt-file>");
  io.out("  koda status");
  io.out("  koda review new <phase>");
  io.out("  koda approve <phase> [quoted-receipt] [--approver <name>]");
  io.out("  koda advance");
  io.out("  koda session close");
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
  if (verb === "review" && rest[0] === "new") return reviewNewCommand(rest.slice(1), cwd, io);
  if (verb === "approve") return approveCommand(rest, cwd, io);
  if (verb === "advance") return advanceCommand(rest, cwd, io);
  if (verb === "session" && rest[0] === "new") return sessionNewCommand(rest.slice(1), cwd, io);
  if (verb === "session" && rest[0] === "close") return sessionCloseCommand(rest.slice(1), cwd, io);
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