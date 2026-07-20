import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { findProjectRoot, readProjectConfig } from "./config.js";
import {
  cancelGuideLaunch,
  confirmGuideLaunch,
  guideManifestPath,
  loadGuideManifest,
  pendingGuideLaunches,
  recoverGuideBinding,
  requireGuideCancellationsPushed,
  snapshotContinuity,
  verifyGuideLaunch,
} from "./guide.js";
import { currentGuideRuntime, listGuideRuntimes, prepareGuideRuntime } from "./guide-runtime.js";
import {
  partialRecoveryRoles,
  requestGhosttyRecoveryWindows,
  requestGhosttyWindows,
  visibleRoleHealth,

} from "./ghostty.js";
import { evaluateSessionClosure } from "./close.js";
import { evaluateSessionHalt } from "./halt.js";
import { relayOwnerName } from "./owner.js";
import { currentPhase, displayPath, latestSessionId, listSessionIds, loadSessionState, sessionRoot } from "./project.js";
import { claimGuidePaths, loadGuideWorkSet } from "./workset.js";
import { verifyToolkitIntegrity } from "./toolkit-integrity.js";















const defaultIo             = { out: (message) => console.log(message) };
const defaultDependencies                       = {
  openGhostty: requestGhosttyWindows,
  recoverGhostty: requestGhosttyRecoveryWindows,
  async openGuide(project, options) {
    const script = fileURLToPath(new URL("./guide-console-cli.js", import.meta.url));
    const result = spawnSync(process.execPath, [
      script,
      ...(options.model ? ["--model", options.model] : []),
      ...(options.effort ? ["--effort", options.effort] : []),
    ], { cwd: project, stdio: "inherit", env: process.env });
    return result.status ?? 1;
  },
};

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

function help(io            )       {
  io.out("Koda Guide — disk-backed continuity between Koda sessions");
  io.out("");
  io.out("Commands:");
  io.out("  koda guide open [--model <model>] [--effort <effort>]");
  io.out("  koda guide status");
  io.out("  koda guide claim <path> [path...]");
  io.out("  koda guide confirm <prompt-file> --owner <name> [--kind <kind>] [--depends-on <session-id>] [--independent]");
  io.out("  koda guide cancel <launch-id> --owner <name> --reason <text>");
  io.out("  koda guide bind <launch-id> <session-id>");
  io.out("  koda guide verify");
  io.out("  koda guide launch --producer-model <model> --producer-effort <effort> --reviewer-model <model> --reviewer-effort <effort> [--open ghostty]");
  io.out("  koda guide recover --open ghostty");
}

export async function runGuideCli(
  args          ,
  cwd = process.cwd(),
  io             = defaultIo,
  dependencies                       = defaultDependencies,
)                {
  const [verb, ...rest] = args;
  if (!verb || verb === "help" || verb === "--help" || verb === "-h") return help(io);
  const root = await findProjectRoot(cwd);
  const config = await readProjectConfig(root);

  if (verb === "open") {
    const model = option(rest, "--model");
    const effort = option(rest, "--effort");
    rejectUnknownOptions(rest);
    if (rest.length) throw new Error("Usage: koda guide open [--model <model>] [--effort <effort>]");
    io.out("OPENING SECURE GUIDE");
    io.out("One persistent project conversation will reconstruct its state from disk.");
    io.out("Producer and Reviewer remain separate; this command opens neither one.");
    const status = await (dependencies.openGuide ?? defaultDependencies.openGuide )(root, { model, effort });
    if (status !== 0) throw new Error("The secure Guide console exited with an error. Project and session evidence remain on disk.");
    return;
  }

  if (verb === "claim") {
    rejectUnknownOptions(rest);
    if (rest.length === 0) throw new Error("Usage: koda guide claim <path> [path...]");
    const relative = rest.map((value) => {
      const candidate = path.resolve(cwd, value);
      const result = path.relative(root, candidate);
      if (result.startsWith("..") || path.isAbsolute(result)) throw new Error(`Guide write claim escapes the project: ${value}.`);
      return result.split(path.sep).join("/");
    });
    const workSet = await claimGuidePaths(root, config, relative);
    io.out("GUIDE WRITE SET");
    for (const claim of workSet.claims) io.out(`✓ ${claim.path}`);
    io.out("Guide may now mutate these paths; active sessions will treat them as unrelated Guide-owned work.");
    return;
  }

  if (verb === "status") {
    rejectUnknownOptions(rest);
    if (rest.length) throw new Error("Usage: koda guide status");
    const manifest = await loadGuideManifest(root, config);
    const toolkit = await verifyToolkitIntegrity();
    const continuity = await snapshotContinuity(root, manifest);
    const guideWorkSet = await loadGuideWorkSet(root, config);
    await requireGuideCancellationsPushed(root, config);
    const pending = await pendingGuideLaunches(root, config);
    const runtimes = await listGuideRuntimes(root);
    const latestId = await latestSessionId(root, config);
    const activeSessions





       = [];
    for (const sessionId of await listSessionIds(root, config)) {
      const directory = sessionRoot(root, config, sessionId);
      const state = await loadSessionState(directory, sessionId);
      const closure = await evaluateSessionClosure(root, directory, state);
      if (!closure.closed) {
        const halt = await evaluateSessionHalt(root, directory, state);
        if (!halt.halted) {
          const active = currentPhase(state);
          activeSessions.push({
            id: sessionId,
            kind: state.kind ?? "produce",
            phase: active ? active.phase.name : "close ceremony",
            progress: active
              ? `${active.index + 1}/${state.phases.length}`
              : `${state.phases.length}/${state.phases.length}`,
            reason: (halt.exists ? halt.reasons : closure.reasons)[0] ?? "pushed terminal evidence is missing",
          });
        }
      }
    }
    if (pending.length > 1) throw new Error(`${pending.length} prompts claim READY_TO_LAUNCH; Guide state is ambiguous.`);
    const activeRuntimes = runtimes.filter(({ run }) => run.status !== "COMPLETE" && run.status !== "HALTED");
    const runtimeActive = activeRuntimes.length > 0;
    io.out(`KODA GUIDE — ${latestId ?? "no sessions yet"}`);
    io.out("Owner input: OPEN — project-level conversation belongs in this Guide context.");
    io.out("Active-session questions belong in Reviewer; Guide direction cannot inject the active phase.");
    io.out(`TOOLKIT READY — ${toolkit.capability} — ${toolkit.testCount}/${toolkit.testCount} post-push checks`);
    io.out("The Guide carries toolkit proof itself. The owner must never relay commands, paths, hashes, commits, test counts, receipts, or evidence locations between contexts.");
    io.out(`Manifest: ${displayPath(root, guideManifestPath(root, config))}`);
    io.out(`Project: ${manifest.project} — ${continuity.length} continuity file(s)`);
    io.out(`Guide write set: ${guideWorkSet.claims.length} additional path(s)`);
    for (const claim of guideWorkSet.claims) io.out(`  ${claim.path}`);
    if (activeSessions.length > 0 || runtimeActive) {
      io.out(`ACTIVE PROJECT WORK — ${activeSessions.length} bounded session(s).`);
      for (const session of activeSessions) {
        io.out(`Current bounded session: ${session.id} — ${session.kind} — ${session.phase} (${session.progress})`);
        io.out(`Named condition: ${session.reason}`);
      }
      if (runtimeActive && activeSessions.length === 0) {
        for (const runtime of activeRuntimes) {
          io.out(`Current bound launch: ${runtime.run.launchId} — ${runtime.run.status} — session ${runtime.run.sessionId ?? "not opened"}`);
        }
      }
      io.out("A dependent successor is blocked until every named predecessor has pushed close or halt evidence.");
      io.out("Guide may discuss or preserve a future idea now. Starting a dependent successor still waits for pushed close or halt.");
      if (pending.length === 0) {
        io.out("An independent sibling may be confirmed only with an explicit --independent classification; a different kind name alone proves nothing.");
      } else {
        io.out("The current READY_TO_LAUNCH request must bind or be cancelled before another confirmation is created.");
        io.out(`READY TO LAUNCH — ${pending[0] .id}`);
      }
    } else if (pending.length === 0) {
      io.out("BETWEEN SESSIONS — Guide discussion or one next-session draft may continue.");
    } else if (pending.length === 1) {
      io.out(`READY TO LAUNCH — ${pending[0] .id}`);
    }
    const displayedRuntimes = activeRuntimes.length > 0 ? activeRuntimes : runtimes.slice(-1);
    for (const runtime of displayedRuntimes) {
      if (runtime.run.status === "HALTED") {
        const sessionId = runtime.run.sessionId;
        if (!sessionId) throw new Error(`Guide runtime ${runtime.run.launchId} claims HALTED but no bound session exists.`);
        const directory = sessionRoot(root, config, sessionId);
        const state = await loadSessionState(directory, sessionId);
        const halt = await evaluateSessionHalt(root, directory, state);
        if (!halt.halted) throw new Error(`Guide runtime ${runtime.run.launchId} claims HALTED without pushed halt evidence:\n- ${halt.reasons.join("\n- ")}`);
      }
      io.out("");
      const terminal = runtime.run.status === "COMPLETE" || runtime.run.status === "HALTED";
      io.out(`${terminal ? "LAST SESSION RUNTIME" : "ACTIVE SESSION RUNTIME"} — ${runtime.run.launchId}`);
      io.out(`Owner: ${relayOwnerName(runtime.run)}`);
      io.out(`Session: ${runtime.run.sessionId ?? "not opened"}`);
      io.out(`State: ${runtime.run.status}`);
      if (runtime.run.terminalLaunch) {
        io.out(`Visible launch: ${runtime.run.terminalLaunch.adapter} requested at ${runtime.run.terminalLaunch.requestedAt}`);
      }
      if (runtime.run.lastError) io.out(`Last error: ${runtime.run.lastError}`);
      if (terminal) {
        if (runtime.run.status === "COMPLETE") {
          io.out(`Guide return: ${runtime.run.guideReturn}`);
          io.out(`Durable evidence: ${runtime.run.archive}`);
        } else {
          io.out("The prior session ended through pushed halt. Reconcile it and confirm a fresh Brief before launching again.");
        }
      } else {
        const partialRoles = await partialRecoveryRoles(runtime);
        if (partialRoles) {
          const reviewerMissing = partialRoles.includes("reviewer");
          const producerMissing = partialRoles.includes("producer");
          if (!reviewerMissing && producerMissing) {
            io.out("REVIEWER RECOVERED — the existing owner decision is still open and nothing advanced.");
            io.out("The Producer window failed to rejoin that decision and may be closed.");
          } else if (reviewerMissing && producerMissing) {
            io.out("SESSION WINDOWS CLOSED — the saved owner decision is still open and nothing advanced.");
            io.out("Both visible role windows are gone. Koda can restore the Reviewer first, then the Producer, from the same disk state.");
          } else {
            io.out("REVIEWER WINDOW CLOSED — the saved owner decision is still open and nothing advanced.");
            io.out("The Producer remains present. Koda can restore only the missing Reviewer at that same decision.");
          }
          io.out("");
          io.out("SESSION RECOVERY READY");
          if (!reviewerMissing && producerMissing) {
            io.out("1. Reopen only the missing Producer — Koda will make it wait on the existing Reviewer decision without creating another job.");
          } else if (reviewerMissing && producerMissing) {
            io.out("1. Reopen this session — Koda will restore the Reviewer first and open the Producer only after that decision is ready.");
          } else {
            io.out("1. Reopen only the missing Reviewer — Koda will restore the same owner decision without creating another job.");
          }
          io.out("2. Not now — keep the session safely paused without changing the saved decision.");
          io.out("Choose in the Guide conversation. Do not paste or reconstruct a technical command.");
          continue;
        }
        if (runtime.run.status === "PAUSED_REVIEWER_FAILURE" && runtime.run.lastError === "Owner acknowledgement exited 1.") {
          io.out("OWNER INPUT WAS NOT RECORDED — the receipt did not match. Nothing advanced and the gate remains closed.");
          io.out("");
          io.out("SESSION RECOVERY READY");
          io.out("1. Reopen this session — Koda will restore the same Reviewer and Producer contexts at the same unacknowledged review. Codex may ask permission for one local launcher command.");
          io.out("2. Not now — keep the session safely paused. Nothing will advance.");
          io.out("Choose in the Guide conversation. Do not paste or reconstruct a technical command.");
          continue;
        }
        const roles = runtime.run.terminalLaunch ? await visibleRoleHealth(runtime.runRoot) : null;
        if (roles) {
          io.out(`Visible roles: Reviewer ${roles.reviewerRunning ? "running" : "not running"}; Producer ${roles.producerRunning ? "running" : "not running"}.`);
        }
        if (runtime.run.lastError) {
          io.out("SESSION NEEDS GUIDE ATTENTION — nothing advances while this saved error is unresolved.");
          io.out("1. Ask Guide to diagnose this exact saved session and name the safe recovery.");
          io.out("2. Not now — leave the session safely unchanged.");
        } else if (roles && (!roles.reviewerRunning || !roles.producerRunning)) {
          io.out("SESSION WINDOW RECOVERY NEEDED — Koda will not pretend a requested window is still running.");
          io.out("1. Ask Guide to inspect this exact state and reopen only the missing role or roles when safe.");
          io.out("2. Not now — preserve the session without opening anything.");
        } else if (runtime.run.status === "PREPARED" && !runtime.run.terminalLaunch) {
          io.out("SESSION IS PREPARED — its role windows have not been requested yet.");
          io.out("1. Ask Guide to launch this verified session.");
          io.out("2. Not now — keep the prepared session unchanged.");
        } else if (runtime.run.status.startsWith("PAUSED")) {
          io.out("SESSION IS PAUSED SAFELY — its disk state is preserved and nothing is advancing.");
          io.out("1. Ask Guide to inspect this exact pause and resume only if it is safe.");
          io.out("2. Not now — keep the session paused.");
        } else {
          io.out("SESSION IS ACTIVE — watch Producer and speak only in Reviewer for session work.");
          io.out("If a role window disappears, return to Guide. Do not reconstruct or rerun a role command yourself.");
        }
        io.out("Choose in the Guide conversation; technical role commands stay behind Guide.");
      }
    }
    return;
  }

  if (verb === "confirm") {
    const owner = option(rest, "--owner");
    const kind = option(rest, "--kind") ?? "produce";
    const dependencySessionIds = repeatedOption(rest, "--depends-on")
      .flatMap((value) => value.split(","))
      .map((value) => value.trim())
      .filter(Boolean);
    const independent = flag(rest, "--independent");
    rejectUnknownOptions(rest);
    if (rest.length !== 1 || !owner) {
      throw new Error("Usage: koda guide confirm <prompt-file> --owner <name> [--kind <kind>] [--depends-on <session-id>] [--independent]");
    }
    const result = await confirmGuideLaunch(root, config, path.resolve(cwd, rest[0] ), owner, {
      kind,
      independent,
      dependencySessionIds,
    });
    io.out(`READY TO LAUNCH — ${result.launch.id}`);
    io.out(`✓ Session kind: ${result.launch.sessionKind}`);
    io.out(`✓ Launch mode: ${result.launch.launchMode}`);
    if (result.launch.dependencies.length > 0) {
      io.out(`✓ Dependencies: ${result.launch.dependencies.map((item) => item.sessionId).join(", ")}`);
    }
    io.out(`✓ Owner confirmation bound prompt SHA-256 ${result.launch.promptSha256}`);
    io.out(`✓ Bound ${result.launch.continuity.length} project continuity file(s).`);
    io.out(`✓ Bound verified toolkit contract ${result.launch.toolkit .capability}.`);
    io.out(`Launch request: ${displayPath(root, result.file)}`);
    return;
  }

  if (verb === "cancel") {
    const owner = option(rest, "--owner");
    const reason = option(rest, "--reason");
    rejectUnknownOptions(rest);
    if (rest.length !== 1 || !owner || !reason) {
      throw new Error("Usage: koda guide cancel <launch-id> --owner <name> --reason <text>");
    }
    const file = await cancelGuideLaunch(root, config, rest[0] , owner, reason);
    io.out(`LAUNCH CANCELLED — ${rest[0]}`);
    io.out(`Cancellation: ${displayPath(root, file)}`);
    io.out("Commit and push the cancellation before confirming another prompt.");
    return;
  }

  if (verb === "bind") {
    rejectUnknownOptions(rest);
    if (rest.length !== 2) throw new Error("Usage: koda guide bind <launch-id> <session-id>");
    const file = await recoverGuideBinding(root, config, rest[0] , rest[1] );
    io.out(`LAUNCH BOUND — ${rest[0]} → ${rest[1]}`);
    io.out(`Binding: ${displayPath(root, file)}`);
    return;
  }

  if (verb === "verify") {
    rejectUnknownOptions(rest);
    if (rest.length) throw new Error("Usage: koda guide verify");
    const launch = await verifyGuideLaunch(root, config);
    io.out(`READY TO LAUNCH — ${launch.id}`);
    io.out(`Prompt: ${launch.prompt}`);
    io.out("✓ Prompt, project continuity, and prior-session evidence still match owner confirmation.");
    io.out("");
    io.out("READY TO LAUNCH — OWNER CHOICE");
    io.out("1. Launch this session now — Codex may ask permission for one local launcher command; approving it opens exactly one Reviewer and one Producer window.");
    io.out("2. Not now — keep this launch ready without opening windows.");
    io.out("Choose in the Guide conversation; do not paste or reconstruct a technical command.");
    return;
  }

  if (verb === "recover") {
    const openTerminal = option(rest, "--open");
    rejectUnknownOptions(rest);
    if (rest.length || openTerminal !== "ghostty") throw new Error("Usage: koda guide recover --open ghostty");
    const runtime = await currentGuideRuntime(root);
    if (!runtime) throw new Error("No Guide runtime exists to recover.");
    const toolkit = await verifyToolkitIntegrity();
    const requests = await (dependencies.recoverGhostty ?? requestGhosttyRecoveryWindows)(root, runtime, toolkit);
    io.out(`SESSION RECOVERY REQUESTED — ${runtime.run.launchId}`);
    if (requests.length === 1 && requests[0]?.role === "producer") {
      io.out("✓ The recovered Reviewer stays open at the same owner decision.");
      io.out(`✓ ${requests[0].title} rejoined that existing decision.`);
    } else if (requests.length === 1 && requests[0]?.role === "reviewer") {
      io.out("✓ The same Reviewer context reopened at the unacknowledged review.");
      io.out("✓ The existing Producer stays bound to that decision.");
    } else {
      io.out("✓ The same Reviewer context reopened at the unacknowledged review.");
      io.out("✓ Producer opened only after Reviewer reached the owner decision point.");
      io.out(`✓ ${requests[0] .title} requested first.`);
      io.out(`✓ ${requests[1] .title} requested second.`);
    }
    io.out("No receipt was recorded and no phase advanced during recovery.");
    return;
  }

  if (verb === "launch") {
    const producerModel = option(rest, "--producer-model");
    const producerEffort = option(rest, "--producer-effort");
    const reviewerModel = option(rest, "--reviewer-model");
    const reviewerEffort = option(rest, "--reviewer-effort");
    const maxTurnsText = option(rest, "--max-turns");
    const openTerminal = option(rest, "--open");
    rejectUnknownOptions(rest);
    if (openTerminal !== null && openTerminal !== "ghostty") {
      throw new Error("--open currently accepts only ghostty.");
    }
    if (rest.length || !producerModel || !producerEffort || !reviewerModel || !reviewerEffort) {
      throw new Error("Usage: koda guide launch --producer-model <model> --producer-effort <effort> --reviewer-model <model> --reviewer-effort <effort> [--max-turns <1-100>] [--open ghostty]");
    }
    const prepared = await prepareGuideRuntime(root, config, {
      producerModel,
      producerEffort,
      reviewerModel,
      reviewerEffort,
      ...(maxTurnsText === null ? {} : { maxTurns: Number(maxTurnsText) }),
    });
    io.out(`${prepared.reused ? "GUIDE SESSION RECOVERED" : "GUIDE SESSION PREPARED"} — ${prepared.launch.id}`);
    io.out("The confirmed prompt and both role assignments are bound on disk.");
    if (openTerminal === null) {
      io.out("");
      io.out("WINDOW B — REVIEWER / OWNER (start this first)");
      io.out(prepared.reviewerCommand);
      io.out("");
      io.out("WINDOW A — PRODUCER (then start this)");
      io.out(prepared.producerCommand);
      io.out("");
      io.out("READ-ONLY STATUS");
      io.out(prepared.statusCommand);
    } else {
      const requests = await dependencies.openGhostty(root, prepared);
      io.out("");
      io.out("THREE-CONTEXT START REQUESTED");
      io.out("✓ This Guide conversation stays open.");
      io.out(`✓ ${requests[0] .title} requested first.`);
      io.out(`✓ ${requests[1] .title} requested second.`);
      io.out("If either window does not appear, return to this Guide conversation. Never repeat automatic opening blindly.");
    }
    return;
  }

  throw new Error(`Unknown command: ${args.join(" ")}. Run \`koda guide --help\`.`);
}

export async function guideMain(args = process.argv.slice(2))                {
  try {
    await runGuideCli(args);
  } catch (error) {
    console.error(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
  }
}


//# sourceURL=/Users/freeborn/Dev/koda-codex/src/guide-commands.ts