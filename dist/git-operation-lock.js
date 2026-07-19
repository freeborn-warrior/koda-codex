import { randomUUID } from "node:crypto";
import { lstat, mkdir, readFile, realpath, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import { pathExists } from "./config.js";

export const GIT_OPERATION_LOCK = path.join(".koda", "git-operation.lock");















export async function inspectExistingGitOperationLock(
  lock        ,
  area        ,
  lockMetadata                                   ,
)                   {
  if (!lockMetadata.isDirectory()) {
    throw new Error("The Git-operation lock must be a real direct child of project-local .koda; symbolic links are refused.");
  }
  let resolvedLock        ;
  try {
    resolvedLock = await realpath(lock);
  } catch (error) {
    if ((error                         ).code === "ENOENT") return false;
    throw error;
  }
  if (path.dirname(resolvedLock) !== area) {
    throw new Error("The Git-operation lock must be a real direct child of project-local .koda; symbolic links are refused.");
  }
  return true;
}

function processIsAlive(pid        )          {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return (error                         ).code === "EPERM";
  }
}

function parseLock(content        )             {
  let value         ;
  try {
    value = JSON.parse(content);
  } catch {
    throw new Error("The Git-operation lock is corrupt; refuse automatic recovery.");
  }
  const item = value                       ;
  if (
    item.version !== 1 || typeof item.token !== "string" || item.token === "" ||
    !Number.isInteger(item.pid) || (item.pid ?? 0) < 1 ||
    typeof item.owner !== "string" || item.owner.trim() === "" ||
    typeof item.operation !== "string" || item.operation.trim() === "" ||
    typeof item.acquiredAt !== "string" || item.acquiredAt.trim() === ""
  ) throw new Error("The Git-operation lock is corrupt; refuse automatic recovery.");
  return item              ;
}

async function assertLockArea(root        )                  {
  const resolvedRoot = await realpath(root);
  const area = path.join(root, ".koda");
  let exists = true;
  try {
    await lstat(area);
  } catch (error) {
    if ((error                         ).code === "ENOENT") exists = false;
    else throw error;
  }
  if (!exists) {
    await mkdir(area).catch((error) => {
      if ((error                         ).code !== "EEXIST") throw error;
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
  root        ,
  owner        ,
  operation        ,
  options                                                    = {},
)                             {
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
      const record             = {
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
          if (!(await pathExists(recordFile))) return;
          const current = parseLock(await readFile(recordFile, "utf8"));
          if (current.token !== record.token) {
            throw new Error("The Git-operation lock changed owners before release.");
          }
          await rm(lock, { recursive: true });
        },
      };
    } catch (error) {
      await rm(pending, { recursive: true, force: true });
      const code = (error                         ).code;
      if (code !== "EEXIST" && code !== "ENOTEMPTY") throw error;
      let lockMetadata;
      try {
        lockMetadata = await lstat(lock);
      } catch (inspectionError) {
        if ((inspectionError                         ).code === "ENOENT") continue;
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
        if ((inspectionError                         ).code === "ENOENT" && !(await pathExists(lock))) continue;
        throw inspectionError;
      }
      if (!recordMetadata.isFile()) throw new Error("The Git-operation lock evidence must be a regular file.");
      let current            ;
      try {
        current = parseLock(await readFile(recordFile, "utf8"));
      } catch (inspectionError) {
        if ((inspectionError                         ).code === "ENOENT" && !(await pathExists(lock))) continue;
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
      try {
        await rm(lock, { recursive: true });
      } catch (recoveryError) {
        if ((recoveryError                         ).code === "ENOENT") continue;
        throw recoveryError;
      }
      recoveredStale = true;
    }
  }
}


//# sourceURL=/Users/freeborn/Dev/koda-codex/src/git-operation-lock.ts