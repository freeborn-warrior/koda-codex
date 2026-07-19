import path from "node:path";

import { findProjectRoot, readProjectConfig } from "./config.ts";
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
} from "./guide.ts";
import { currentGuideRuntime, prepareGuideRuntime } from "./guide-runtime.ts";
import { displayPath, latestSessionId } from "./project.ts";

export interface GuideCliIo {
  out(message: string): void;
}

const defaultIo: GuideCliIo = { out: (message) => console.log(message) };

function option(args: string[], name: string): string | null {
  const index = args.indexOf(name);
  if (index === -1) return null;
  const value = args[index + 1];
  if (!value || value.startsWith("--")) throw new Error(`${name} needs a value.`);
  args.splice(index, 2);
  return value;
}

function rejectUnknownOptions(args: string[]): void {
  const unknown = args.find((value) => value.startsWith("--"));
  if (unknown) throw new Error(`Unknown option: ${unknown}`);
}

function help(io: GuideCliIo): void {
  io.out("Koda Guide — disk-backed continuity between Koda sessions");
  io.out("");
  io.out("Commands:");
  io.out("  koda guide status");
  io.out("  koda guide confirm <prompt-file> --owner <name>");
  io.out("  koda guide cancel <launch-id> --owner <name> --reason <text>");
  io.out("  koda guide bind <launch-id> <session-id>");
  io.out("  koda guide verify");
  io.out("  koda guide launch --producer-model <model> --producer-effort <effort> --reviewer-model <model> --reviewer-effort <effort>");
}

export async function runGuideCli(args: string[], cwd = process.cwd(), io: GuideCliIo = defaultIo): Promise<void> {
  const [verb, ...rest] = args;
  if (!verb || verb === "help" || verb === "--help" || verb === "-h") return help(io);
  const root = await findProjectRoot(cwd);
  const config = await readProjectConfig(root);

  if (verb === "status") {
    rejectUnknownOptions(rest);
    if (rest.length) throw new Error("Usage: koda guide status");
    const manifest = await loadGuideManifest(root, config);
    const continuity = await snapshotContinuity(root, manifest);
    await requireGuideCancellationsPushed(root, config);
    const pending = await pendingGuideLaunches(root, config);
    const runtime = await currentGuideRuntime(root);
    if (pending.length > 1) throw new Error(`${pending.length} prompts claim READY_TO_LAUNCH; Guide state is ambiguous.`);
    io.out(`KODA GUIDE — ${await latestSessionId(root, config) ?? "no sessions yet"}`);
    io.out(`Manifest: ${displayPath(root, guideManifestPath(root, config))}`);
    io.out(`Project: ${manifest.project} — ${continuity.length} continuity file(s)`);
    if (pending.length === 0) io.out("NO PROMPT READY — Guide discussion or drafting may continue.");
    else if (pending.length === 1) io.out(`READY TO LAUNCH — ${pending[0]!.id}`);
    if (runtime) {
      io.out("");
      io.out(`${runtime.run.status === "COMPLETE" ? "LAST SESSION RUNTIME" : "ACTIVE SESSION RUNTIME"} — ${runtime.run.launchId}`);
      io.out(`State: ${runtime.run.status}`);
      if (runtime.run.status === "COMPLETE") {
        io.out(`Guide return: ${runtime.run.guideReturn}`);
        io.out(`Durable evidence: ${runtime.run.archive}`);
      } else {
        io.out("Window B — reviewer / owner:");
        io.out(runtime.reviewerCommand);
        io.out("Window A — producer:");
        io.out(runtime.producerCommand);
        io.out("Read-only detail:");
        io.out(runtime.statusCommand);
      }
    }
    return;
  }

  if (verb === "confirm") {
    const owner = option(rest, "--owner");
    rejectUnknownOptions(rest);
    if (rest.length !== 1 || !owner) throw new Error("Usage: koda guide confirm <prompt-file> --owner <name>");
    const result = await confirmGuideLaunch(root, config, path.resolve(cwd, rest[0]!), owner);
    io.out(`READY TO LAUNCH — ${result.launch.id}`);
    io.out(`✓ Owner confirmation bound prompt SHA-256 ${result.launch.promptSha256}`);
    io.out(`✓ Bound ${result.launch.continuity.length} project continuity file(s).`);
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
    const file = await cancelGuideLaunch(root, config, rest[0]!, owner, reason);
    io.out(`LAUNCH CANCELLED — ${rest[0]}`);
    io.out(`Cancellation: ${displayPath(root, file)}`);
    io.out("Commit and push the cancellation before confirming another prompt.");
    return;
  }

  if (verb === "bind") {
    rejectUnknownOptions(rest);
    if (rest.length !== 2) throw new Error("Usage: koda guide bind <launch-id> <session-id>");
    const file = await recoverGuideBinding(root, config, rest[0]!, rest[1]!);
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
    return;
  }

  if (verb === "launch") {
    const producerModel = option(rest, "--producer-model");
    const producerEffort = option(rest, "--producer-effort");
    const reviewerModel = option(rest, "--reviewer-model");
    const reviewerEffort = option(rest, "--reviewer-effort");
    const maxTurnsText = option(rest, "--max-turns");
    rejectUnknownOptions(rest);
    if (rest.length || !producerModel || !producerEffort || !reviewerModel || !reviewerEffort) {
      throw new Error("Usage: koda guide launch --producer-model <model> --producer-effort <effort> --reviewer-model <model> --reviewer-effort <effort> [--max-turns <1-100>]");
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
    io.out("");
    io.out("WINDOW B — REVIEWER / OWNER (start this first)");
    io.out(prepared.reviewerCommand);
    io.out("");
    io.out("WINDOW A — PRODUCER (then start this)");
    io.out(prepared.producerCommand);
    io.out("");
    io.out("READ-ONLY STATUS");
    io.out(prepared.statusCommand);
    return;
  }

  throw new Error(`Unknown command: ${args.join(" ")}. Run \`koda guide --help\`.`);
}

export async function guideMain(args = process.argv.slice(2)): Promise<void> {
  try {
    await runGuideCli(args);
  } catch (error) {
    console.error(`ERROR: ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
  }
}
