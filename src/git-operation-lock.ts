import { randomUUID } from "node:crypto";
import { lstat, mkdir, readFile, realpath, rename, rm, rmdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

import { pathExists } from "./config.ts";

export const GIT_OPERATION_LOCK = path.join(".koda", "git-operation.lock");

export interface GitOperationLease {
  token: string;
  release(): Promise<void>;
}

interface LockRecord {
  version: 1;
  token: string;
  pid: number;
  owner: string;
  operation: string;
  acquiredAt: string;
}

export async function inspectExistingGitOperationLock(
  lock: string,
  area: string,
  lockMetadata: Awaited<ReturnType<typeof lstat>>,
): Promise<boolean> {
  if (!lockMetadata.isDirectory()) {
    throw new Error("The Git-operation lock must be a real direct child of project-local .koda; symbolic links are refused.");
  }
  let resolvedLock: string;
  try {
    resolvedLock = await realpath(lock);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return false;
    throw error;
  }
  if (path.dirname(resolvedLock) !== area) {
    throw new Error("The Git-operation lock must be a real direct child of project-local .koda; symbolic links are refused.");
  }
  return true;
}

function processIsAlive(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return (error as NodeJS.ErrnoException).code === "EPERM";
  }
}

function parseLock(content: string): LockRecord {
  let value: unknown;
  try {
    value = JSON.parse(content);
  } catch {
    throw new Error("The Git-operation lock is corrupt; refuse automatic recovery.");
  }
  const item = value as Partial<LockRecord>;
  if (
    item.version !== 1 || typeof item.token !== "string" ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(item.token) ||
    !Number.isInteger(item.pid) || (item.pid ?? 0) < 1 ||
    typeof item.owner !== "string" || item.owner.trim() === "" ||
    typeof item.operation !== "string" || item.operation.trim() === "" ||
    typeof item.acquiredAt !== "string" || item.acquiredAt.trim() === ""
  ) throw new Error("The Git-operation lock is corrupt; refuse automatic recovery.");
  return item as LockRecord;
}

async function assertLockArea(root: string): Promise<string> {
  const resolvedRoot = await realpath(root);
  const area = path.join(root, ".koda");
  let exists = true;
  try {
    await lstat(area);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") exists = false;
    else throw error;
  }
  if (!exists) {
    await mkdir(area).catch((error) => {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
    });
  }
  const metadata = await lstat(area);
  if (!metadata.isDirectory()) throw new Error("The Git-operation lock parent must be a real project-local directory; symbolic links are refused.");
  const resolvedArea = await realpath(area);
  if (path.dirname(resolvedArea) !== resolvedRoot) {
    throw new Error("The Git-operation lock parent resolves outside the direct project-local .koda directory.");
  }
  return resolvedArea;
}

export interface RetiredGitOperationLock {
  cleanup(): Promise<void>;
}

/**
 * Atomically moves one verified lock owner out of the acquisition path before
 * deleting its files. A waiting contender may then acquire `git-operation.lock`
 * without the retiring owner accidentally deleting the new lease.
 */
export async function retireGitOperationLock(
  root: string,
  expectedToken: string,
): Promise<RetiredGitOperationLock | null> {
  const area = await assertLockArea(root);
  const lock = path.join(area, path.basename(GIT_OPERATION_LOCK));
  const recordFile = path.join(lock, "LOCK.json");
  let current: LockRecord;
  try {
    current = parseLock(await readFile(recordFile, "utf8"));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT" && !(await pathExists(lock))) return null;
    throw error;
  }
  if (current.token !== expectedToken) {
    throw new Error("The Git-operation lock changed owners before release.");
  }

  const retired = path.join(area, `${path.basename(GIT_OPERATION_LOCK)}.${expectedToken}.retired`);
  try {
    await rename(lock, retired);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
  const retiredRecord = path.join(retired, "LOCK.json");
  const moved = parseLock(await readFile(retiredRecord, "utf8"));
  if (moved.token !== expectedToken) {
    throw new Error("The retired Git-operation lock does not match its verified owner.");
  }
  return {
    cleanup: async () => {
      if (!(await pathExists(retired))) return;
      const finalRecord = parseLock(await readFile(retiredRecord, "utf8"));
      if (finalRecord.token !== expectedToken) {
        throw new Error("The retired Git-operation lock changed before cleanup.");
      }
      await unlink(retiredRecord);
      try {
        await rmdir(retired);
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code === "ENOTEMPTY") {
          throw new Error("The retired Git-operation lock contains unexpected files; refuse recursive deletion.");
        }
        throw error;
      }
    },
  };
}

export async function acquireGitOperationLock(
  root: string,
  owner: string,
  operation: string,
  options: { stagedPaths?: () => string[]; waitMs?: number } = {},
): Promise<GitOperationLease> {
  if (options.waitMs !== undefined && (!Number.isInteger(options.waitMs) || options.waitMs < 0 || options.waitMs > 60_000)) {
    throw new Error("Git-operation lock waitMs must be an integer from 0 through 60000.");
  }
  const area = await assertLockArea(root);
  const lock = path.join(area, path.basename(GIT_OPERATION_LOCK));
  const recordFile = path.join(lock, "LOCK.json");
  const deadline = Date.now() + (options.waitMs ?? 0);
  let recoveredStale = false;

  for (;;) {
    const token = randomUUID();
    const pending = path.join(area, `${path.basename(GIT_OPERATION_LOCK)}.${token}.pending`);
    try {
      const record: LockRecord = {
        version: 1,
        token,
        pid: process.pid,
        owner,
        operation,
        acquiredAt: new Date().toISOString(),
      };
      await mkdir(pending);
      await writeFile(path.join(pending, "LOCK.json"), `${JSON.stringify(record, null, 2)}\n`, { encoding: "utf8", flag: "wx" });
      await rename(pending, lock);
      return {
        token: record.token,
        release: async () => {
          const retired = await retireGitOperationLock(root, record.token);
          await retired?.cleanup();
        },
      };
    } catch (error) {
      await rm(pending, { recursive: true, force: true });
      const code = (error as NodeJS.ErrnoException).code;
      if (code !== "EEXIST" && code !== "ENOTEMPTY") throw error;
      let lockMetadata;
      try {
        lockMetadata = await lstat(lock);
      } catch (inspectionError) {
        if ((inspectionError as NodeJS.ErrnoException).code === "ENOENT") continue;
        throw inspectionError;
      }
      if (!(await inspectExistingGitOperationLock(lock, area, lockMetadata))) continue;
      if (!(await pathExists(recordFile))) {
        if (!(await pathExists(lock))) continue;
        throw new Error("The Git-operation lock exists without readable owner evidence; refuse automatic recovery.");
      }
      let recordMetadata;
      try {
        recordMetadata = await lstat(recordFile);
      } catch (inspectionError) {
        if ((inspectionError as NodeJS.ErrnoException).code === "ENOENT" && !(await pathExists(lock))) continue;
        throw inspectionError;
      }
      if (!recordMetadata.isFile()) throw new Error("The Git-operation lock evidence must be a regular file.");
      let current: LockRecord;
      try {
        current = parseLock(await readFile(recordFile, "utf8"));
      } catch (inspectionError) {
        if ((inspectionError as NodeJS.ErrnoException).code === "ENOENT" && !(await pathExists(lock))) continue;
        throw inspectionError;
      }
      if (processIsAlive(current.pid)) {
        if (Date.now() < deadline) {
          await new Promise((resolve) => setTimeout(resolve, 50));
          continue;
        }
        throw new Error(`Git operation is locked by ${current.owner}: ${current.operation} (pid ${current.pid}).`);
      }
      const staged = options.stagedPaths?.() ?? [];
      if (staged.length > 0) {
        throw new Error(`A stale Git-operation lock cannot recover while the shared index contains staged paths: ${staged.join(", ")}.`);
      }
      if (recoveredStale) throw new Error("Unable to acquire the Git-operation lock after stale-lock recovery.");
      let retired: RetiredGitOperationLock | null;
      try {
        retired = await retireGitOperationLock(root, current.token);
      } catch (recoveryError) {
        if ((recoveryError as Error).message === "The Git-operation lock changed owners before release.") continue;
        throw recoveryError;
      }
      if (!retired) continue;
      await retired.cleanup();
      recoveredStale = true;
    }
  }
}
