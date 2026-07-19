import { randomUUID } from "node:crypto";
import { lstat, mkdir, readFile, realpath, rm, writeFile } from "node:fs/promises";
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
    item.version !== 1 || typeof item.token !== "string" || item.token === "" ||
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

export async function acquireGitOperationLock(
  root: string,
  owner: string,
  operation: string,
  options: { stagedPaths?: () => string[] } = {},
): Promise<GitOperationLease> {
  const area = await assertLockArea(root);
  const lock = path.join(area, path.basename(GIT_OPERATION_LOCK));
  const recordFile = path.join(lock, "LOCK.json");

  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      await mkdir(lock);
      const record: LockRecord = {
        version: 1,
        token: randomUUID(),
        pid: process.pid,
        owner,
        operation,
        acquiredAt: new Date().toISOString(),
      };
      await writeFile(recordFile, `${JSON.stringify(record, null, 2)}\n`, { encoding: "utf8", flag: "wx" });
      return {
        token: record.token,
        release: async () => {
          if (!(await pathExists(recordFile))) return;
          const current = parseLock(await readFile(recordFile, "utf8"));
          if (current.token !== record.token) {
            throw new Error("The Git-operation lock changed owners before release.");
          }
          await rm(lock, { recursive: true });
        },
      };
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
      const lockMetadata = await lstat(lock);
      if (!lockMetadata.isDirectory() || path.dirname(await realpath(lock)) !== area) {
        throw new Error("The Git-operation lock must be a real direct child of project-local .koda; symbolic links are refused.");
      }
      if (!(await pathExists(recordFile))) {
        throw new Error("The Git-operation lock exists without readable owner evidence; refuse automatic recovery.");
      }
      if (!(await lstat(recordFile)).isFile()) throw new Error("The Git-operation lock evidence must be a regular file.");
      const current = parseLock(await readFile(recordFile, "utf8"));
      if (processIsAlive(current.pid)) {
        throw new Error(`Git operation is locked by ${current.owner}: ${current.operation} (pid ${current.pid}).`);
      }
      const staged = options.stagedPaths?.() ?? [];
      if (staged.length > 0) {
        throw new Error(`A stale Git-operation lock cannot recover while the shared index contains staged paths: ${staged.join(", ")}.`);
      }
      await rm(lock, { recursive: true });
    }
  }
  throw new Error("Unable to acquire the Git-operation lock after stale-lock recovery.");
}
