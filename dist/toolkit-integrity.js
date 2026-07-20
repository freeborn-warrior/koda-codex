import { createHash } from "node:crypto";
import { lstat, readFile, realpath } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const MANIFEST_RELATIVE = "docs/toolkit-integrity.json";
const HASH_PATTERN = /^[a-f0-9]{64}$/;
const COMMIT_PATTERN = /^[a-f0-9]{40}$/;



























function packageRoot()         {
  return path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
}

function contained(parent        , candidate        )          {
  const relative = path.relative(parent, candidate);
  return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
}

function assertRelative(value        , label        )       {
  if (value.trim() === "" || path.isAbsolute(value) || value.split(/[\\/]/).includes("..")) {
    throw new Error(`${label} must be a non-empty toolkit-relative path without '..'.`);
  }
}

function digest(content            )         {
  return createHash("sha256").update(content).digest("hex");
}

async function verifiedFile(root        , relative        , expected        , label        )                  {
  assertRelative(relative, label);
  if (!HASH_PATTERN.test(expected)) throw new Error(`${label} has an invalid SHA-256 value.`);
  const candidate = path.resolve(root, relative);
  let metadata;
  try {
    metadata = await lstat(candidate);
  } catch {
    throw new Error(`${label} is missing: ${relative}.`);
  }
  if (!metadata.isFile()) throw new Error(`${label} must be a real regular file: ${relative}.`);
  const [resolvedRoot, resolvedCandidate] = await Promise.all([realpath(root), realpath(candidate)]);
  if (!contained(resolvedRoot, resolvedCandidate)) throw new Error(`${label} resolves outside the toolkit: ${relative}.`);
  const content = await readFile(candidate);
  if (content.length === 0) throw new Error(`${label} is empty: ${relative}.`);
  if (digest(content) !== expected) throw new Error(`${label} changed after verification: ${relative}.`);
  return content;
}

function verifyEvidenceClaims(manifest                          , content        )       {
  const required = [
    `- Result: **PASS**`,
    `- Recorded at: ${manifest.verifiedAt}`,
    `- Base commit: \`${manifest.testedCommit.slice(0, 7)}\``,
    `ℹ tests ${manifest.testCount}`,
    `ℹ pass ${manifest.testCount}`,
    `ℹ fail 0`,
  ];
  const missing = required.find((line) => !content.includes(line));
  if (missing) throw new Error(`Toolkit verification evidence contradicts the integrity manifest: missing ${missing}.`);
}

function parseManifest(value         )                           {
  if (!value || typeof value !== "object") throw new Error("Toolkit integrity manifest must contain a JSON object.");
  const item = value                                     ;
  if (
    item.version !== 1 ||
    typeof item.capability !== "string" || !/^[a-z][a-z0-9-]{0,63}$/.test(item.capability) ||
    typeof item.verifiedAt !== "string" || Number.isNaN(Date.parse(item.verifiedAt)) ||
    typeof item.repairCommit !== "string" || !COMMIT_PATTERN.test(item.repairCommit) ||
    typeof item.testedCommit !== "string" || !COMMIT_PATTERN.test(item.testedCommit) ||
    !Number.isSafeInteger(item.testCount) || item.testCount  < 1 ||
    !item.evidence || typeof item.evidence.path !== "string" || typeof item.evidence.sha256 !== "string" ||
    !Array.isArray(item.files) || item.files.length === 0
  ) throw new Error("Toolkit integrity manifest is invalid.");
  assertRelative(item.evidence.path, "Toolkit verification evidence");
  if (!HASH_PATTERN.test(item.evidence.sha256)) throw new Error("Toolkit verification evidence has an invalid SHA-256 value.");
  const seen = new Set        ();
  for (const file of item.files) {
    if (!file || typeof file.path !== "string" || typeof file.sha256 !== "string") {
      throw new Error("Toolkit integrity manifest has invalid file evidence.");
    }
    assertRelative(file.path, "Toolkit integrity file");
    if (!HASH_PATTERN.test(file.sha256)) throw new Error(`Toolkit integrity file has an invalid SHA-256 value: ${file.path}.`);
    if (seen.has(file.path)) throw new Error(`Toolkit integrity manifest lists a file more than once: ${file.path}.`);
    seen.add(file.path);
  }
  return item                            ;
}

export async function verifyToolkitIntegrityAt(root        )                                    {
  const manifestFile = path.resolve(root, MANIFEST_RELATIVE);
  let metadata;
  try {
    metadata = await lstat(manifestFile);
  } catch {
    throw new Error(`Toolkit readiness is unverified: ${MANIFEST_RELATIVE} is missing.`);
  }
  if (!metadata.isFile()) throw new Error("Toolkit readiness is unverified: the integrity manifest must be a real regular file.");
  const [resolvedRoot, resolvedManifest] = await Promise.all([realpath(root), realpath(manifestFile)]);
  if (!contained(resolvedRoot, resolvedManifest)) throw new Error("Toolkit readiness is unverified: the integrity manifest resolves outside the toolkit.");
  const manifestBytes = await readFile(manifestFile);
  let parsed         ;
  try {
    parsed = JSON.parse(manifestBytes.toString("utf8"));
  } catch {
    throw new Error("Toolkit readiness is unverified: the integrity manifest is not valid JSON.");
  }
  const manifest = parseManifest(parsed);
  const evidence = await verifiedFile(root, manifest.evidence.path, manifest.evidence.sha256, "Toolkit verification evidence");
  verifyEvidenceClaims(manifest, evidence.toString("utf8"));
  for (const file of manifest.files) {
    await verifiedFile(root, file.path, file.sha256, "Toolkit integrity file");
  }
  return {
    version: 1,
    capability: manifest.capability,
    manifestSha256: digest(manifestBytes),
    repairCommit: manifest.repairCommit,
    testedCommit: manifest.testedCommit,
    testCount: manifest.testCount,
    evidence: manifest.evidence,
  };
}

export async function verifyToolkitIntegrity()                                    {
  return verifyToolkitIntegrityAt(packageRoot());
}

/**
 * Exact installed files a sandboxed Guide must be able to read so the trusted
 * CLI can re-run toolkit verification from inside the model boundary.
 *
 * The whole source checkout is deliberately not granted: a development tree
 * may contain unrelated ignored projects or local evidence beside the package.
 */
export async function verifiedToolkitReadPathsAt(root        )                    {
  const manifestFile = path.resolve(root, MANIFEST_RELATIVE);
  const manifestBytes = await readFile(manifestFile);
  let parsed         ;
  try {
    parsed = JSON.parse(manifestBytes.toString("utf8"));
  } catch {
    throw new Error("Toolkit readiness is unverified: the integrity manifest is not valid JSON.");
  }
  const manifest = parseManifest(parsed);
  await verifyToolkitIntegrityAt(root);
  return [...new Set([
    manifestFile,
    path.resolve(root, manifest.evidence.path),
    ...manifest.files.map((file) => path.resolve(root, file.path)),
  ])].sort();
}

export async function verifiedToolkitReadPaths()                    {
  return verifiedToolkitReadPathsAt(packageRoot());
}


//# sourceURL=/Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts