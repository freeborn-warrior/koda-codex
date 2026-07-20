import path from "node:path";

function tomlString(value: string): string {
  return JSON.stringify(value);
}

/**
 * Codex permission-profile arguments for a Koda Producer or Reviewer turn.
 *
 * The model may read and write its project, read the trusted compiled Koda CLI,
 * and read only the minimal operating-system paths Codex needs for local tools.
 * It cannot read sibling projects or ordinary home-directory files, mutate Git
 * metadata or repository-local agent/config instructions, use a login shell, or
 * reach the network or web-search tool. `--strict-config` makes older Codex
 * clients fail closed instead of silently ignoring this policy.
 */
export function codexProjectPermissionArgs(options: {
  workspaceAccess: "read" | "write";
  trustedReadRoots?: string[];
}): string[] {
  const trustedReadRoots = options.trustedReadRoots ?? [];
  for (const trustedRoot of trustedReadRoots) {
    if (!path.isAbsolute(trustedRoot)) {
      throw new Error("Every trusted Codex read root must be absolute.");
    }
  }
  const filesystem = [
    `${tomlString(":minimal")}="read",`,
    ...trustedReadRoots.map((trustedRoot) => `${tomlString(path.resolve(trustedRoot))}="read",`),
    `${tomlString(":workspace_roots")}={`,
    `${tomlString(".")}=${tomlString(options.workspaceAccess)},`,
    `${tomlString(".git")}="read",`,
    `${tomlString(".agents")}="read",`,
    `${tomlString(".codex")}="read",`,
    `${tomlString("**/*.env")}="deny"`,
    "}",
  ].join("");

  return [
    "--strict-config",
    "-c", 'web_search="disabled"',
    "-c", "allow_login_shell=false",
    "-c", 'default_permissions="koda_project"',
    "-c", `permissions.koda_project.filesystem={${filesystem}}`,
    "-c", "permissions.koda_project.network.enabled=false",
  ];
}

export function codexRolePermissionArgs(
  trustedCli: string,
  codexExecutable: string,
  toolchainReadRoots: string[],
): string[] {
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
      ...toolchainReadRoots,
    ],
  });
}
