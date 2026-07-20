import path from "node:path";

import { verifiedToolkitPermissionReadPaths } from "./toolkit-integrity.js";

function tomlString(value        )         {
  return JSON.stringify(value);
}

/**
 * Codex permission-profile arguments for a Koda Producer or Reviewer turn.
 *
 * The model may read and write its project, read the trusted compiled Koda CLI
 * plus its exact verified integrity evidence, and read only the minimal
 * operating-system paths Codex needs for local tools.
 * It cannot read sibling projects or ordinary home-directory files, mutate Git
 * metadata or repository-local agent/config instructions, use a login shell, or
 * reach the network or web-search tool. `--strict-config` makes older Codex
 * clients fail closed instead of silently ignoring this policy.
 */
export function codexProjectPermissionArgs(options





 )           {
  const trustedReadRoots = [...new Set(options.trustedReadRoots ?? [])];
  const profileName = options.profileName ?? "koda_project";
  if (!/^[a-z][a-z0-9_]*$/.test(profileName)) {
    throw new Error("The Codex permission profile name must contain only lowercase letters, digits, and underscores.");
  }
  for (const trustedRoot of trustedReadRoots) {
    if (!path.isAbsolute(trustedRoot)) {
      throw new Error("Every trusted Codex read root must be absolute.");
    }
  }
  const workspaceOverrides = Object.entries(options.workspaceOverrides ?? {}).map(([entry, access]) => {
    const normalized = entry.split(path.sep).join("/").replace(/^\.\//, "");
    if (
      !normalized || path.posix.isAbsolute(normalized) || normalized.split("/").includes("..") ||
      normalized === ".git" || normalized.startsWith(".git/") ||
      normalized === ".agents" || normalized.startsWith(".agents/") ||
      normalized === ".codex" || normalized.startsWith(".codex/") ||
      normalized === ".koda" || normalized.startsWith(".koda/")
    ) {
      throw new Error(`Codex workspace permission override is unsafe: ${entry}.`);
    }
    return [normalized, access]         ;
  });
  // Codex's dynamic `-c` parser does not interpret quoted dotted-path segments:
  // a key such as filesystem.":minimal" becomes the literal path `":minimal"`.
  // Supply the documented table value instead, with explicit TOML whitespace so
  // the value is parsed as an inline table rather than falling back to a string.
  const workspaceRootEntries = [
    `${tomlString(".")} = ${tomlString(options.workspaceAccess)}`,
    ...workspaceOverrides.map(([entry, access]) => `${tomlString(entry)} = ${tomlString(access)}`),
    `${tomlString(".git")} = ${tomlString(options.gitAccess ?? "read")}`,
    `${tomlString(".agents")} = "read"`,
    `${tomlString(".codex")} = "read"`,
    `${tomlString("**/*.env")} = "deny"`,
  ].join(", ");
  const filesystem = [
    `${tomlString(":minimal")} = "read"`,
    ...trustedReadRoots.map((trustedRoot) => `${tomlString(path.resolve(trustedRoot))} = "read"`),
    `${tomlString(":workspace_roots")} = { ${workspaceRootEntries} }`,
  ].join(", ");

  return [
    "--strict-config",
    "-c", 'web_search="disabled"',
    "-c", "allow_login_shell=false",
    "-c", `default_permissions=${tomlString(profileName)}`,
    "-c", `permissions.${profileName}.filesystem={ ${filesystem} }`,
    "-c", `permissions.${profileName}.network.enabled=false`,
  ];
}

/**
 * The persistent Guide gets the same project-data boundary as session roles.
 * It remains unable to mutate Git metadata itself: trusted numbered controller
 * actions perform the narrow runtime operations the owner explicitly selects.
 */
export function codexGuidePermissionArgs(
  trustedCli        ,
  codexExecutable        ,
  toolchainReadRoots          ,
  guideWritePaths           = [],
  toolkitVerificationPaths           = [],
)           {
  if (!path.isAbsolute(trustedCli) || !path.isAbsolute(codexExecutable)) {
    throw new Error("The trusted Koda CLI and Codex executable paths must be absolute before Guide permissions are built.");
  }
  const toolkitRuntime = path.dirname(path.resolve(trustedCli));
  const toolkitPackage = path.join(path.dirname(toolkitRuntime), "package.json");
  return codexProjectPermissionArgs({
    workspaceAccess: "read",
    profileName: "koda_guide",
    gitAccess: "read",
    workspaceOverrides: Object.fromEntries(guideWritePaths.map((entry) => [entry, "write"])),
    trustedReadRoots: [
      toolkitRuntime,
      toolkitPackage,
      path.resolve(codexExecutable),
      ...toolkitVerificationPaths,
      ...toolchainReadRoots,
    ],
  });
}

export function codexRolePermissionArgs(
  trustedCli        ,
  codexExecutable        ,
  toolchainReadRoots          ,
  toolkitVerificationPaths          ,
)           {
  if (!path.isAbsolute(trustedCli) || !path.isAbsolute(codexExecutable)) {
    throw new Error("The trusted Koda CLI and Codex executable paths must be absolute before role permissions are built.");
  }
  const toolkitRuntime = path.dirname(path.resolve(trustedCli));
  const toolkitPackage = path.join(path.dirname(toolkitRuntime), "package.json");
  return codexProjectPermissionArgs({
    workspaceAccess: "write",
    trustedReadRoots: [
      toolkitRuntime,
      toolkitPackage,
      path.resolve(codexExecutable),
      ...toolkitVerificationPaths,
      ...toolchainReadRoots,
    ],
  });
}

export async function verifiedCodexRolePermissionArgs(
  trustedCli        ,
  codexExecutable        ,
  toolchainReadRoots          ,
)                    {
  return codexRolePermissionArgs(
    trustedCli,
    codexExecutable,
    toolchainReadRoots,
    await verifiedToolkitPermissionReadPaths(),
  );
}


//# sourceURL=/Users/freeborn/Dev/koda-codex/src/codex-role-permissions.ts