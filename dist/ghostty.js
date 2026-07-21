import { spawnSync } from "node:child_process";
import { lstat, readFile } from "node:fs/promises";
import path from "node:path";


import { nowIso, writeJsonAtomic } from "./project.js";
import { prepareRoleLaunchers } from "./role-launchers.js";






























export function visibleSessionStartupReady(
  run                          ,
  reviewer                               ,
)          {
  return Boolean(
    run?.sessionId &&
    run.status === "RUNNING" &&
    !run.lastError &&
    reviewer?.sessionId === run.sessionId &&
    ["READY", "WORKING", "AWAITING_OWNER"].includes(String(reviewer.status)) &&
    !reviewer.lastError
  );
}











const ROLE_START_ATTEMPTS = 900;

function windowRequest(options




 )                       {
  const project = path.resolve(options.project);
  const launcher = path.resolve(options.launcher);
  const runtime = path.join(project, ".koda", "runs");
  const relativeLauncher = path.relative(runtime, launcher);
  if (
    relativeLauncher === "" ||
    relativeLauncher.startsWith("..") ||
    path.isAbsolute(relativeLauncher)
  ) {
    throw new Error("Ghostty role launcher must be an absolute path inside the project runtime.");
  }
  return {
    role: options.role,
    title: options.title,
    args: [
      "-na",
      "Ghostty.app",
      "--args",
      `--title=${options.title}`,
      `--working-directory=${project}`,
      "--wait-after-command=true",
      "--shell-integration=none",
      "-e",
      launcher,
    ],
  };
}

export async function ghosttyWindowRequests(
  project        ,
  prepared                      ,
  dependencies                            = {},
)                                  {
  if ((dependencies.platform ?? process.platform) !== "darwin") {
    throw new Error("The Ghostty automatic launcher is currently supported only on macOS.");
  }
  const launchers = await prepareRoleLaunchers(project, prepared, dependencies);
  const shortId = prepared.launch.id.slice(0, 8);
  return [
    windowRequest({
      role: "reviewer",
      title: `Koda-C Reviewer — ${shortId}`,
      project,
      launcher: launchers.reviewer,
    }),
    windowRequest({
      role: "producer",
      title: `Koda-C Producer — ${shortId}`,
      project,
      launcher: launchers.producer,
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
  if (
    job.version !== 1 ||
    typeof job.id !== "string" || !/^[0-9a-f-]{36}$/.test(job.id) ||
    !["formal", "repair", "fresh"].includes(String(job.kind)) ||
    typeof job.phase !== "string" || !/^[a-z0-9][a-z0-9-]*$/.test(job.phase) ||
    typeof job.purpose !== "string" || job.purpose.trim() === "" ||
    typeof job.prompt !== "string" || job.prompt.trim() === "" ||
    typeof job.expectedPath !== "string" || job.expectedPath.trim() === "" || path.isAbsolute(job.expectedPath) || job.expectedPath.split(/[\\/]/).includes("..") ||
    typeof job.createdAt !== "string" ||
    typeof job.updatedAt !== "string" ||
    job.completion !== null ||
    (!retryableLegacyFailure && !retryableCurrentState)
  ) {
    throw new Error("This Reviewer state is not a retryable owner-receipt attempt. Koda-C refuses to guess.");
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

async function roleLockAlive(runRoot        , role                         )                   {
  const lock = path.join(runRoot, `.${role.toLowerCase()}-window.lock`);
  const metadata = await lstat(lock).catch(() => null);
  if (!metadata) return false;
  if (metadata.isSymbolicLink() || (!metadata.isFile() && !metadata.isDirectory())) {
    throw new Error(`${role} recovery lock is unsafe.`);
  }
  const ownerFile = metadata.isFile() ? lock : path.join(lock, "OWNER.json");
  let ownerMetadata;
  try {
    ownerMetadata = await lstat(ownerFile);
  } catch (error) {
    if ((error                         ).code === "ENOENT") {
      const lockStillExists = await lstat(lock).then(() => true).catch(() => false);
      if (!lockStillExists) return false;
      throw new Error(`${role} recovery lock owner is unsafe.`);
    }
    throw error;
  }
  if (!ownerMetadata || !ownerMetadata.isFile() || ownerMetadata.isSymbolicLink()) {
    throw new Error(`${role} recovery lock owner is unsafe.`);
  }
  let owner                                                        ;
  try {
    owner = JSON.parse(await readFile(ownerFile, "utf8"))                                                          ;
  } catch (error) {
    if ((error                         ).code === "ENOENT") {
      const lockStillExists = await lstat(lock).then(() => true).catch(() => false);
      if (!lockStillExists) return false;
      throw new Error(`${role} recovery lock owner is unsafe.`);
    }
    throw new Error(`${role} recovery lock owner is invalid.`, { cause: error });
  }
  if (owner.version !== 1 || !Number.isInteger(owner.pid) || owner.pid  < 1 || typeof owner.startedAt !== "string") {
    throw new Error(`${role} recovery lock owner is invalid.`);
  }
  return processAlive(owner.pid );
}

async function reviewerLockAlive(runRoot        )                   {
  return roleLockAlive(runRoot, "Reviewer");
}

async function producerLockAlive(runRoot        )                   {
  return roleLockAlive(runRoot, "Producer");
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
    const reviewerFile = path.join(runRoot, "REVIEWER-STATE.json");
    const reviewerMetadata = await lstat(reviewerFile).catch(() => null);
    let reviewer                                = null;
    if (reviewerMetadata) {
      if (!reviewerMetadata.isFile() || reviewerMetadata.isSymbolicLink()) {
        throw new Error("Visible startup requires a real REVIEWER-STATE.json file.");
      }
      try {
        reviewer = JSON.parse(await readFile(reviewerFile, "utf8"))                          ;
      } catch {
        throw new Error("Visible startup requires valid Reviewer state JSON.");
      }
    }
    if (
      await producerLockAlive(runRoot) &&
      visibleSessionStartupReady(state, reviewer)
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
  if (
    record.version !== 1 ||
    !["owner-receipt-input-retry", "stable-owner-handover-role-recovery"].includes(String(record.reason)) ||
    typeof record.requestedAt !== "string"
  ) {
    throw new Error("Visible recovery evidence does not match the session-recovery contract.");
  }
  const reviewerJob = record.reviewerJob                                       ;
  if (record.reason === "stable-owner-handover-role-recovery" && (
    !reviewerJob ||
    typeof reviewerJob.id !== "string" || !/^[0-9a-f-]{36}$/.test(reviewerJob.id) ||
    !["formal", "repair", "fresh"].includes(String(reviewerJob.kind)) ||
    typeof reviewerJob.phase !== "string" || !/^[a-z0-9][a-z0-9-]*$/.test(reviewerJob.phase) ||
    typeof reviewerJob.expectedPath !== "string" || reviewerJob.expectedPath.trim() === "" ||
    path.isAbsolute(reviewerJob.expectedPath) || reviewerJob.expectedPath.split(/[\\/]/).includes("..")
  )) {
    throw new Error("Visible recovery evidence has an invalid reviewer-job binding.");
  }
  if (record.attempts !== undefined && !Array.isArray(record.attempts)) {
    throw new Error("Visible recovery evidence has an invalid attempt history.");
  }
  return record;
}

export async function producerOnlyRecoveryReady(runtime                  )                   {
  const roles = await partialRecoveryRoles(runtime);
  return roles?.length === 1 && roles[0] === "producer";
}

export async function partialRecoveryRoles(
  runtime                  ,
)                                                      {
  const recoveryFile = path.join(runtime.runRoot, "RECOVERY.json");
  const recoveryExists = await lstat(recoveryFile).then(() => true).catch(() => false);
  const recovery = recoveryExists ? await readRecoveryRecord(recoveryFile) : null;
  const stableOwnerHandover = runtime.run.status === "AWAITING_REVIEWER_WINDOW" && runtime.run.lastError === undefined;
  const possibleFailedRejoin = recoveryExists &&
    runtime.run.status === "PAUSED_ERROR" &&
    runtime.run.lastError?.startsWith("A different reviewer job is already active:") === true;
  const possibleFailedRecovery = recoveryExists &&
    (runtime.run.lastAction === "recover visible Reviewer and Producer after retryable owner receipt input" ||
      runtime.run.lastAction?.startsWith("reopen missing ") === true) &&
    (runtime.run.lastError === "Recovered Reviewer did not reach its owner decision point; the Producer was not opened." ||
      runtime.run.lastError === "Recovered Reviewer did not reach the existing owner decision point; the Producer was not opened." ||
      runtime.run.lastError === "Recovered Producer did not rejoin the existing Reviewer decision point." ||
      runtime.run.lastError?.startsWith("Ghostty refused the recovered Reviewer window") === true ||
      runtime.run.lastError?.startsWith("Ghostty refused the recovered Producer window") === true);
  if (!stableOwnerHandover && !possibleFailedRejoin && !possibleFailedRecovery) return null;
  const job = await receiptRecoveryJob(runtime.runRoot);
  const boundJob = recovery?.reviewerJob                                       ;
  if (boundJob && (
    boundJob.id !== job.id || boundJob.kind !== job.kind ||
    boundJob.phase !== job.phase || boundJob.expectedPath !== job.expectedPath
  )) {
    throw new Error("Visible recovery evidence is bound to a different Reviewer job. Koda-C refuses to guess.");
  }
  const expectedError = `A different reviewer job is already active: ${job.kind} ${job.phase} (${job.status}).`;
  const failedRejoin = possibleFailedRejoin && runtime.run.lastError === expectedError;
  const exactPartialState = ((failedRejoin || stableOwnerHandover) && job.status === "AWAITING_OWNER") ||
    (possibleFailedRecovery && ["FAILED", "AWAITING_OWNER"].includes(job.status));
  if (!exactPartialState) return null;
  const health = await visibleRoleHealth(runtime.runRoot);
  const missing                                      = [];
  if (!health.reviewerRunning) missing.push("reviewer");
  if (!health.producerRunning) missing.push("producer");
  return missing.length > 0 ? missing : null;
}

export async function requestGhosttyRecoveryWindows(
  project        ,
  runtime                  ,
  toolkit                          ,
  dependencies                            = {},
)                                  {
  const recoveryFile = path.join(runtime.runRoot, "RECOVERY.json");
  const priorRecovery = await lstat(recoveryFile).then(() => true).catch(() => false);
  const partialRoles = await partialRecoveryRoles(runtime);
  if (partialRoles) {
    const job = await receiptRecoveryJob(runtime.runRoot);
    const recovery = priorRecovery
      ? await readRecoveryRecord(recoveryFile)
      : {
          version: 1,
          reason: "stable-owner-handover-role-recovery",
          requestedAt: nowIso(),
          toolkit,
          reviewerJob: { id: job.id, kind: job.kind, phase: job.phase, expectedPath: job.expectedPath },
        };
    if (!priorRecovery) await writeJsonAtomic(recoveryFile, recovery);
    const retryRequestedAt = nowIso();
    const prepared = {
      ...runtime,
      launch: { id: runtime.run.launchId },
    }                        ;
    const allRequests = await ghosttyWindowRequests(project, prepared, dependencies);
    const requests = allRequests.filter((request) => partialRoles.includes(request.role));
    runtime.run.lastAction = `reopen missing ${partialRoles.join(" and ")} after partial recovery`;
    runtime.run.lastError = undefined;
    await writeJsonAtomic(path.join(runtime.runRoot, "RUN.json"), runtime.run);
    const open = dependencies.open ?? defaultOpen;
    for (const request of requests) {
      const result = open(request.args, project);
      if (result.status !== 0) {
        runtime.run.lastError = `Ghostty refused the recovered ${request.role === "reviewer" ? "Reviewer" : "Producer"} window${result.stderr ? `: ${result.stderr}` : "."}`;
        await writeJsonAtomic(path.join(runtime.runRoot, "RUN.json"), runtime.run);
        throw new Error(runtime.run.lastError);
      }
      const ready = request.role === "reviewer"
        ? await (dependencies.waitForRecoveredReviewer ?? waitForRecoveredReviewer)(runtime.runRoot)
        : await (dependencies.waitForRecoveredProducer ?? waitForRecoveredProducer)(runtime.runRoot);
      if (!ready) {
        const current = await recoveredRunState(runtime.runRoot);
        runtime.run.status = current?.status ?? "PAUSED_ERROR";
        runtime.run.lastError = current?.lastError ?? (request.role === "reviewer"
          ? "Recovered Reviewer did not reach the existing owner decision point; the Producer was not opened."
          : "Recovered Producer did not rejoin the existing Reviewer decision point.");
        await writeJsonAtomic(path.join(runtime.runRoot, "RUN.json"), runtime.run);
        throw new Error(runtime.run.lastError);
      }
    }
    const completedAt = nowIso();
    await writeJsonAtomic(recoveryFile, {
      ...recovery,
      rolesRetried: partialRoles,
      completedAt,
      attempts: [
        ...(Array.isArray(recovery.attempts) ? recovery.attempts : []),
        { roles: partialRoles, requestedAt: retryRequestedAt, completedAt },
      ],
      ...(partialRoles.includes("producer") ? { producerRetryAt: completedAt } : {}),
    });
    return requests;
  }
  if (priorRecovery) {
    throw new Error("A visible recovery was already requested. Return to the Guide conversation; do not open duplicate windows.");
  }
  if (runtime.run.status !== "PAUSED_REVIEWER_FAILURE" || runtime.run.lastError !== "Owner acknowledgement exited 1.") {
    throw new Error("Automatic recovery is limited to the named owner-receipt failure. Return to Guide for an exact diagnosis; do not run a role command.");
  }
  if (!runtime.run.terminalLaunch) throw new Error("No prior visible launch exists to recover.");
  if (await reviewerLockAlive(runtime.runRoot)) {
    throw new Error("The Reviewer window is already running; automatic recovery refuses a duplicate.");
  }
  const job = await receiptRecoveryJob(runtime.runRoot);

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
    reviewerJob: { id: job.id, kind: job.kind, phase: job.phase, expectedPath: job.expectedPath },
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
  if (prepared.run.terminalLaunch) {
    throw new Error("This Guide runtime already exists; automatic Ghostty opening refuses to create duplicate Producer or Reviewer processes. Return to Guide for the exact next choice.");
  }
  if (prepared.reused) {
    const health = await visibleRoleHealth(prepared.runRoot);
    if (health.reviewerRunning || health.producerRunning) {
      throw new Error("This Guide runtime already has a running Reviewer or Producer; automatic Ghostty opening refuses a duplicate.");
    }
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