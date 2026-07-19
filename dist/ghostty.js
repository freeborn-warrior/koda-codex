import { spawnSync } from "node:child_process";
import { chmod, lstat, readFile, realpath, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";


import { nowIso, writeJsonAtomic } from "./project.js";
import { relayRoleEnvironment } from "./relay-environment.js";




























const ROLE_START_ATTEMPTS = 900;

function packageRoot()         {
  return path.dirname(path.dirname(fileURLToPath(import.meta.url)));
}

async function codexExecutable(override         )                  {
  const configured = override ?? process.env.KODA_CODEX_BIN ?? "codex";
  if (path.isAbsolute(configured)) return realpath(configured);
  const found = spawnSync("/usr/bin/which", [configured], { encoding: "utf8" });
  if (found.status !== 0 || !(found.stdout ?? "").trim()) {
    throw new Error(`Ghostty launch cannot find the Codex executable named ${configured}.`);
  }
  return realpath((found.stdout ?? "").trim());
}

function windowRequest(options




 )                       {
  const relativeLauncher = path.relative(options.project, options.launcher).split(path.sep).join("/");
  if (!relativeLauncher.startsWith(".koda/runs/") || /\s/.test(relativeLauncher)) {
    throw new Error("Ghostty role launcher must be a space-free path inside the project runtime.");
  }
  return {
    role: options.role,
    title: options.title,
    args: [
      "-na",
      "Ghostty.app",
      "--args",
      `--title=${options.title}`,
      `--working-directory=${options.project}`,
      "--wait-after-command=true",
      "--shell-integration=none",
      "-e",
      `./${relativeLauncher}`,
    ],
  };
}

export function ghosttyRoleLauncherSource(options





 )         {
  const environment = relayRoleEnvironment(options.executable, options.environmentSource);
  const shellWord = (value        )         => `'${value.replaceAll("'", `'"'"'`)}'`;
  const environmentArguments = Object.entries(environment).map(([key, value]) => {
    if (value === undefined) throw new Error(`Ghostty role environment is missing ${key}.`);
    return `${key}=${value}`;
  });
  const command = [
    "/usr/bin/env",
    "-i",
    ...environmentArguments,
    process.execPath,
    options.script,
    ...options.scriptArgs,
  ].map(shellWord);
  return [
    "#!/bin/sh",
    "set -eu",
    `cd ${shellWord(options.project)}`,
    `exec ${command.join(" \\\n  ")}`,
    "",
  ].join("\n");
}

async function ensureLauncher(file        , content        )                {
  try {
    await writeFile(file, content, { encoding: "utf8", mode: 0o700, flag: "wx" });
  } catch (error) {
    if ((error                         ).code !== "EEXIST") throw error;
    const metadata = await lstat(file);
    if (!metadata.isFile() || metadata.isSymbolicLink() || await readFile(file, "utf8") !== content) {
      throw new Error(`Existing Ghostty role launcher is unsafe or changed: ${file}`);
    }
  }
  await chmod(file, 0o700);
}

export async function ghosttyWindowRequests(
  project        ,
  prepared                      ,
  dependencies                            = {},
)                                  {
  if ((dependencies.platform ?? process.platform) !== "darwin") {
    throw new Error("The Ghostty automatic launcher is currently supported only on macOS.");
  }
  const executable = await codexExecutable(dependencies.codexExecutable);
  const scripts = path.join(packageRoot(), "scripts");
  const shortId = prepared.launch.id.slice(0, 8);
  const reviewerLauncher = path.join(prepared.runRoot, "launch-reviewer.sh");
  const producerLauncher = path.join(prepared.runRoot, "launch-producer.sh");
  await ensureLauncher(reviewerLauncher, ghosttyRoleLauncherSource({
    executable,
    project,
    script: path.join(scripts, "run-relay-reviewer-window.ts"),
    scriptArgs: [prepared.runRoot],
  }));
  await ensureLauncher(producerLauncher, ghosttyRoleLauncherSource({
    executable,
    project,
    script: path.join(scripts, "execute-relay-run.ts"),
    scriptArgs: ["--reviewer-window", prepared.runRoot],
  }));
  return [
    windowRequest({
      role: "reviewer",
      title: `Koda-C Reviewer — ${shortId}`,
      project,
      launcher: reviewerLauncher,
    }),
    windowRequest({
      role: "producer",
      title: `Koda-C Producer — ${shortId}`,
      project,
      launcher: producerLauncher,
    }),
  ];
}








async function receiptRecoveryJob(runRoot        )                              {
  const file = path.join(runRoot, "REVIEWER-JOB.json");
  const metadata = await lstat(file).catch(() => null);
  if (!metadata || !metadata.isFile() || metadata.isSymbolicLink()) {
    throw new Error("Receipt recovery requires a real REVIEWER-JOB.json file.");
  }
  let value         ;
  try {
    value = JSON.parse(await readFile(file, "utf8"));
  } catch {
    throw new Error("Receipt recovery requires valid reviewer-job JSON.");
  }
  if (!value || typeof value !== "object") throw new Error("Receipt recovery found invalid reviewer-job data.");
  const job = value                               ;
  const retryableLegacyFailure = job.status === "FAILED" && job.error === "Owner acknowledgement exited 1.";
  const retryableCurrentState = job.status === "AWAITING_OWNER" && job.error === null;
  if (job.version !== 1 || job.completion !== null || (!retryableLegacyFailure && !retryableCurrentState)) {
    throw new Error("This Reviewer state is not a retryable owner-receipt attempt. Koda refuses to guess.");
  }
  return job                      ;
}

function processAlive(pid        )          {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return (error                         ).code === "EPERM";
  }
}

async function reviewerLockAlive(runRoot        )                   {
  const lock = path.join(runRoot, ".reviewer-window.lock");
  const metadata = await lstat(lock).catch(() => null);
  if (!metadata) return false;
  if (!metadata.isDirectory() || metadata.isSymbolicLink()) throw new Error("Reviewer recovery lock is unsafe.");
  const ownerFile = path.join(lock, "OWNER.json");
  const ownerMetadata = await lstat(ownerFile).catch(() => null);
  if (!ownerMetadata || !ownerMetadata.isFile() || ownerMetadata.isSymbolicLink()) {
    throw new Error("Reviewer recovery lock owner is unsafe.");
  }
  const owner = JSON.parse(await readFile(ownerFile, "utf8"))                                      ;
  if (owner.version !== 1 || !Number.isInteger(owner.pid) || owner.pid  < 1) {
    throw new Error("Reviewer recovery lock owner is invalid.");
  }
  return processAlive(owner.pid );
}

async function producerLockAlive(runRoot        )                   {
  const lock = path.join(runRoot, ".producer-window.lock");
  const metadata = await lstat(lock).catch(() => null);
  if (!metadata) return false;
  if (!metadata.isDirectory() || metadata.isSymbolicLink()) throw new Error("Producer recovery lock is unsafe.");
  const ownerFile = path.join(lock, "OWNER.json");
  const ownerMetadata = await lstat(ownerFile).catch(() => null);
  if (!ownerMetadata || !ownerMetadata.isFile() || ownerMetadata.isSymbolicLink()) {
    throw new Error("Producer recovery lock owner is unsafe.");
  }
  const owner = JSON.parse(await readFile(ownerFile, "utf8"))                                      ;
  if (owner.version !== 1 || !Number.isInteger(owner.pid) || owner.pid  < 1) {
    throw new Error("Producer recovery lock owner is invalid.");
  }
  return processAlive(owner.pid );
}

export async function visibleRoleHealth(runRoot        )                             {
  const [reviewerRunning, producerRunning] = await Promise.all([
    reviewerLockAlive(runRoot),
    producerLockAlive(runRoot),
  ]);
  return { reviewerRunning, producerRunning };
}

async function waitForRecoveredReviewer(runRoot        )                   {
  for (let attempt = 0; attempt < ROLE_START_ATTEMPTS; attempt += 1) {
    if (await reviewerLockAlive(runRoot)) {
      const job = await receiptRecoveryJob(runRoot).catch(() => null);
      if (job?.status === "AWAITING_OWNER") return true;
    }
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  return false;
}

async function recoveredRunState(runRoot        )                                                          {
  const file = path.join(runRoot, "RUN.json");
  const metadata = await lstat(file).catch(() => null);
  if (!metadata || !metadata.isFile() || metadata.isSymbolicLink()) {
    throw new Error("Recovery requires a real RUN.json file.");
  }
  try {
    return JSON.parse(await readFile(file, "utf8"))                                           ;
  } catch {
    throw new Error("Recovery requires valid RUN.json data.");
  }
}

async function waitForRecoveredProducer(runRoot        )                   {
  for (let attempt = 0; attempt < ROLE_START_ATTEMPTS; attempt += 1) {
    const state = await recoveredRunState(runRoot);
    if (state?.status === "AWAITING_REVIEWER_WINDOW" && !state.lastError && await producerLockAlive(runRoot)) return true;
    if (["PAUSED_ERROR", "PAUSED_REVIEWER_FAILURE"].includes(String(state?.status))) return false;
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  return false;
}

async function waitForStartedReviewer(runRoot        )                   {
  for (let attempt = 0; attempt < ROLE_START_ATTEMPTS; attempt += 1) {
    if (await reviewerLockAlive(runRoot)) {
      const state = path.join(runRoot, "REVIEWER-STATE.json");
      const metadata = await lstat(state).catch(() => null);
      if (metadata?.isFile() && !metadata.isSymbolicLink()) return true;
    }
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  return false;
}

async function waitForStartedProducer(runRoot        )                   {
  for (let attempt = 0; attempt < ROLE_START_ATTEMPTS; attempt += 1) {
    const state = await recoveredRunState(runRoot);
    if (
      await producerLockAlive(runRoot) &&
      !["PREPARED", "PAUSED_ERROR", "PAUSED_REVIEWER_FAILURE"].includes(String(state?.status)) &&
      !state?.lastError
    ) return true;
    if (["PAUSED_ERROR", "PAUSED_REVIEWER_FAILURE"].includes(String(state?.status))) return false;
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  return false;
}

async function readRecoveryRecord(file        )                                   {
  const metadata = await lstat(file).catch(() => null);
  if (!metadata || !metadata.isFile() || metadata.isSymbolicLink()) {
    throw new Error("Visible recovery evidence must be a real RECOVERY.json file.");
  }
  let value         ;
  try {
    value = JSON.parse(await readFile(file, "utf8"));
  } catch {
    throw new Error("Visible recovery evidence must contain valid JSON.");
  }
  if (!value || typeof value !== "object") throw new Error("Visible recovery evidence is invalid.");
  const record = value                           ;
  if (record.version !== 1 || record.reason !== "owner-receipt-input-retry" || typeof record.requestedAt !== "string") {
    throw new Error("Visible recovery evidence does not match the owner-receipt recovery contract.");
  }
  return record;
}

export async function producerOnlyRecoveryReady(runtime                  )                   {
  const recoveryFile = path.join(runtime.runRoot, "RECOVERY.json");
  if (!(await lstat(recoveryFile).then(() => true).catch(() => false))) return false;
  const recovery = await readRecoveryRecord(recoveryFile);
  const job = await receiptRecoveryJob(runtime.runRoot);
  const jobRecord = job                                      ;
  const expectedError = `A different reviewer job is already active: ${String(jobRecord.kind)} ${String(jobRecord.phase)} (${job.status}).`;
  return runtime.run.status === "PAUSED_ERROR" &&
    runtime.run.lastError === expectedError &&
    job.status === "AWAITING_OWNER" &&
    ["formal", "repair", "fresh"].includes(String(jobRecord.kind)) &&
    recovery.producerRetryAt === undefined &&
    await reviewerLockAlive(runtime.runRoot) &&
    !(await producerLockAlive(runtime.runRoot));
}

export async function requestGhosttyRecoveryWindows(
  project        ,
  runtime                  ,
  toolkit                          ,
  dependencies                            = {},
)                                  {
  const recoveryFile = path.join(runtime.runRoot, "RECOVERY.json");
  const priorRecovery = await lstat(recoveryFile).then(() => true).catch(() => false);
  if (priorRecovery) {
    const recovery = await readRecoveryRecord(recoveryFile);
    if (!(await producerOnlyRecoveryReady(runtime))) {
      throw new Error("A visible recovery was already requested. Run koda guide status instead of opening duplicate windows.");
    }
    const prepared = {
      ...runtime,
      launch: { id: runtime.run.launchId },
    }                        ;
    const producerRequest = (await ghosttyWindowRequests(project, prepared, dependencies))[1] ;
    runtime.run.lastAction = "reopen only the missing Producer after Reviewer recovery";
    runtime.run.lastError = undefined;
    await writeJsonAtomic(path.join(runtime.runRoot, "RUN.json"), runtime.run);
    const open = dependencies.open ?? defaultOpen;
    const producer = open(producerRequest.args, project);
    if (producer.status !== 0) {
      runtime.run.lastError = `Ghostty refused the recovered Producer window${producer.stderr ? `: ${producer.stderr}` : "."}`;
      await writeJsonAtomic(path.join(runtime.runRoot, "RUN.json"), runtime.run);
      throw new Error(runtime.run.lastError);
    }
    const producerReady = await (dependencies.waitForRecoveredProducer ?? waitForRecoveredProducer)(runtime.runRoot);
    if (!producerReady) {
      const current = await recoveredRunState(runtime.runRoot);
      runtime.run.status = current?.status ?? "PAUSED_ERROR";
      runtime.run.lastError = current?.lastError ?? "Recovered Producer did not rejoin the existing Reviewer decision point.";
      await writeJsonAtomic(path.join(runtime.runRoot, "RUN.json"), runtime.run);
      throw new Error(runtime.run.lastError);
    }
    await writeJsonAtomic(recoveryFile, { ...recovery, producerRetryAt: nowIso() });
    return [producerRequest];
  }
  if (runtime.run.status !== "PAUSED_REVIEWER_FAILURE" || runtime.run.lastError !== "Owner acknowledgement exited 1.") {
    throw new Error("Automatic recovery is limited to the named owner-receipt failure. Run koda guide status for other states.");
  }
  if (!runtime.run.terminalLaunch) throw new Error("No prior visible launch exists to recover.");
  if (await reviewerLockAlive(runtime.runRoot)) {
    throw new Error("The Reviewer window is already running; automatic recovery refuses a duplicate.");
  }
  await receiptRecoveryJob(runtime.runRoot);

  const prepared = {
    ...runtime,
    launch: { id: runtime.run.launchId },
  }                        ;
  const requests = await ghosttyWindowRequests(project, prepared, dependencies);
  await writeJsonAtomic(recoveryFile, {
    version: 1,
    reason: "owner-receipt-input-retry",
    priorError: runtime.run.lastError,
    requestedAt: nowIso(),
    toolkit,
  });
  runtime.run.lastAction = "recover visible Reviewer and Producer after retryable owner receipt input";
  runtime.run.lastError = undefined;
  await writeJsonAtomic(path.join(runtime.runRoot, "RUN.json"), runtime.run);

  const open = dependencies.open ?? defaultOpen;
  const reviewer = open(requests[0] .args, project);
  if (reviewer.status !== 0) {
    runtime.run.lastError = `Ghostty refused the recovered Reviewer window${reviewer.stderr ? `: ${reviewer.stderr}` : "."}`;
    await writeJsonAtomic(path.join(runtime.runRoot, "RUN.json"), runtime.run);
    throw new Error(`${runtime.run.lastError} The Producer was not opened.`);
  }
  const reviewerReady = await (dependencies.waitForRecoveredReviewer ?? waitForRecoveredReviewer)(runtime.runRoot);
  if (!reviewerReady) {
    runtime.run.lastError = "Recovered Reviewer did not reach its owner decision point; the Producer was not opened.";
    await writeJsonAtomic(path.join(runtime.runRoot, "RUN.json"), runtime.run);
    throw new Error(runtime.run.lastError);
  }
  const producer = open(requests[1] .args, project);
  if (producer.status !== 0) {
    runtime.run.lastError = `Ghostty refused the recovered Producer window${producer.stderr ? `: ${producer.stderr}` : "."}`;
    await writeJsonAtomic(path.join(runtime.runRoot, "RUN.json"), runtime.run);
    throw new Error(runtime.run.lastError);
  }
  const producerReady = await (dependencies.waitForRecoveredProducer ?? waitForRecoveredProducer)(runtime.runRoot);
  if (!producerReady) {
    const current = await recoveredRunState(runtime.runRoot);
    runtime.run.status = current?.status ?? "PAUSED_ERROR";
    runtime.run.lastError = current?.lastError ?? "Recovered Producer did not rejoin the existing Reviewer decision point.";
    await writeJsonAtomic(path.join(runtime.runRoot, "RUN.json"), runtime.run);
    throw new Error(runtime.run.lastError);
  }
  return requests;
}

function defaultOpen(args          , cwd        )                    {
  const result = spawnSync("/usr/bin/open", args, { cwd, encoding: "utf8" });
  return { status: result.status, stderr: (result.stderr ?? "").trim() };
}

export async function requestGhosttyWindows(
  project        ,
  prepared                      ,
  dependencies                            = {},
)                                  {
  if (prepared.reused || prepared.run.terminalLaunch) {
    throw new Error("This Guide runtime already exists; automatic Ghostty opening refuses to create duplicate Producer or Reviewer processes. Use koda guide status for exact recovery commands.");
  }
  const requests = await ghosttyWindowRequests(project, prepared, dependencies);
  prepared.run.terminalLaunch = { adapter: "ghostty-macos", requestedAt: nowIso() };
  prepared.run.lastAction = "request visible Ghostty Reviewer and Producer windows";
  prepared.run.lastError = undefined;
  await writeJsonAtomic(path.join(prepared.runRoot, "RUN.json"), prepared.run);

  const open = dependencies.open ?? defaultOpen;
  const reviewer = open(requests[0] .args, project);
  if (reviewer.status !== 0) {
    prepared.run.lastError = `Ghostty refused the reviewer window request${reviewer.stderr ? `: ${reviewer.stderr}` : "."}`;
    await writeJsonAtomic(path.join(prepared.runRoot, "RUN.json"), prepared.run);
    throw new Error(`${prepared.run.lastError} The Producer was not opened.`);
  }
  const reviewerReady = await (dependencies.waitForStartedReviewer ?? waitForStartedReviewer)(prepared.runRoot);
  if (!reviewerReady) {
    prepared.run.lastError = "The Reviewer window request returned, but Reviewer did not become ready; the Producer was not opened.";
    await writeJsonAtomic(path.join(prepared.runRoot, "RUN.json"), prepared.run);
    throw new Error(prepared.run.lastError);
  }
  const producer = open(requests[1] .args, project);
  if (producer.status !== 0) {
    prepared.run.lastError = `Ghostty refused the producer window request${producer.stderr ? `: ${producer.stderr}` : "."}`;
    await writeJsonAtomic(path.join(prepared.runRoot, "RUN.json"), prepared.run);
    throw new Error(`${prepared.run.lastError} The Reviewer remains open. The runtime remains recoverable through Guide.`);
  }
  const producerReady = await (dependencies.waitForStartedProducer ?? waitForStartedProducer)(prepared.runRoot);
  if (!producerReady) {
    const current = await recoveredRunState(prepared.runRoot);
    prepared.run.status = current?.status ?? prepared.run.status;
    prepared.run.lastError = current?.lastError ?? "The Producer window request returned, but Producer did not become ready. The Reviewer remains open.";
    await writeJsonAtomic(path.join(prepared.runRoot, "RUN.json"), prepared.run);
    throw new Error(prepared.run.lastError);
  }
  return requests;
}


//# sourceURL=/Users/freeborn/Dev/koda-codex/src/ghostty.ts