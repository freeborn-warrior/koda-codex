import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { chmod, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { compatibleGhosttyRoleLauncherSource, ghosttyRoleLauncherSource } from "../src/ghostty.ts";
import {
  codexGuidePermissionArgs,
  codexProjectPermissionArgs,
  codexRolePermissionArgs,
} from "../src/codex-role-permissions.ts";
import {
  relayCodexEnvironment,
  relayNodeToolchainReadRoots,
  relayRoleEnvironment,
} from "../src/relay-environment.ts";
import { verifiedToolkitPermissionReadPaths } from "../src/toolkit-integrity.ts";

test("PROJECT SANDBOX SUITE: role turns fail closed with project-scoped read and write access", () => {
  const args = codexRolePermissionArgs(
    "/trusted/koda/dist/cli.js",
    "/trusted/codex/bin/codex",
    ["/trusted/toolchain"],
  );
  const joined = args.join("\n");
  assert.match(joined, /--strict-config/);
  assert.match(joined, /web_search="disabled"/);
  assert.match(joined, /allow_login_shell=false/);
  assert.match(joined, /default_permissions="koda_project"/);
  assert.match(joined, /":minimal" = "read"/);
  assert.match(joined, /"\/trusted\/koda\/dist" = "read"/);
  assert.match(joined, /"\/trusted\/koda\/package\.json" = "read"/);
  assert.match(joined, /"\/trusted\/codex\/bin\/codex" = "read"/);
  assert.match(joined, /"\/trusted\/toolchain" = "read"/);
  assert.match(joined, /filesystem=\{ ":minimal" = "read",/);
  assert.match(joined, /":workspace_roots" = \{ "\." = "write"/);
  assert.match(joined, /"\.git" = "read"/);
  assert.match(joined, /"\.agents" = "read"/);
  assert.match(joined, /"\.codex" = "read"/);
  assert.match(joined, /"\*\*\/\*\.env" = "deny"/);
  assert.doesNotMatch(joined, /filesystem\.":workspace_roots"/);
  assert.match(joined, /permissions\.koda_project\.network\.enabled=false/);
  assert.doesNotMatch(joined, /workspace-write/);
  assert.throws(() => codexRolePermissionArgs("relative/dist/cli.js", "/trusted/codex", []), /must be absolute/);
  assert.throws(() => codexRolePermissionArgs("/trusted/koda/dist/cli.js", "relative/codex", []), /must be absolute/);
});

test("PROJECT SANDBOX SUITE: Guide permission table stays bounded without granting the toolkit project", async () => {
  const packageRoot = path.resolve(".");
  const permissionRoots = await verifiedToolkitPermissionReadPaths();
  const args = codexGuidePermissionArgs(
    path.join(packageRoot, "dist", "cli.js"),
    "/trusted/codex/bin/codex",
    ["/trusted/toolchain"],
    ["docs/guide"],
    permissionRoots,
  );
  const filesystem = args.find((argument) => argument.startsWith("permissions.koda_guide.filesystem="));
  assert.ok(filesystem);
  assert.ok(filesystem.length < 2_000, `Guide permission table is too large for installed Codex: ${filesystem.length}`);
  assert.match(filesystem, new RegExp(`${packageRoot.replaceAll("/", "\\/")}\\/src`));
  assert.match(filesystem, new RegExp(`${packageRoot.replaceAll("/", "\\/")}\\/scripts`));
  assert.doesNotMatch(filesystem, new RegExp(`${packageRoot.replaceAll("/", "\\/")}\\/docs\" = \"read\"`));
  assert.doesNotMatch(filesystem, /\/\.koda\" = \"read\"/);
});

test("PROJECT SANDBOX SUITE: the Node toolchain root is a narrow explicit read capability", () => {
  assert.deepEqual(
    relayNodeToolchainReadRoots("/opt/homebrew/Cellar/node/26.0.0/bin/node"),
    ["/opt/homebrew"],
  );
  assert.deepEqual(
    relayNodeToolchainReadRoots("/Users/example/.nvm/versions/node/v22.18.0/bin/node"),
    ["/Users/example/.nvm/versions/node/v22.18.0"],
  );
});

test("PROJECT SANDBOX SUITE: read-only probes cannot mutate their workspace", () => {
  const joined = codexProjectPermissionArgs({ workspaceAccess: "read" }).join("\n");
  assert.match(joined, /":workspace_roots" = \{ "\." = "read"/);
  assert.doesNotMatch(joined, /":workspace_roots" = \{ "\." = "write"/);
  assert.throws(
    () => codexProjectPermissionArgs({ workspaceAccess: "read", trustedReadRoots: ["relative"] }),
    /must be absolute/,
  );
});

test("SECURITY INTEGRITY SUITE: the install is dependency-free with no install hook", async () => {
  const pkg = JSON.parse(await readFile("package.json", "utf8")) as {
    dependencies?: unknown;
    optionalDependencies?: unknown;
    peerDependencies?: unknown;
    scripts: Record<string, string>;
    bin: Record<string, string>;
  };
  assert.equal(pkg.dependencies, undefined);
  assert.equal(pkg.optionalDependencies, undefined);
  assert.equal(pkg.peerDependencies, undefined);
  for (const hook of ["preinstall", "install", "postinstall"]) {
    assert.equal(pkg.scripts[hook], undefined, `${hook} must not execute during installation`);
  }
  assert.equal(pkg.bin.koda, "./dist/cli.js");

  const build = await readFile("scripts/build.ts", "utf8");
  assert.match(build, /path\.basename\(outputDir\) !== "dist"/);
  assert.match(build, /path\.dirname\(outputDir\) !== root/);
  assert.match(build, /rm\(outputDir, \{ recursive: true, force: true \}\)/);
});

test("SECURITY INTEGRITY SUITE: the committed repository contains no symbolic link", () => {
  const listed = spawnSync("git", ["ls-files", "-s"], { encoding: "utf8" });
  assert.equal(listed.status, 0, listed.stderr);
  const links = listed.stdout.split(/\r?\n/).filter((line) => line.startsWith("120000 "));
  assert.deepEqual(links, []);
});

test("SECURITY INTEGRITY SUITE: tracked text contains no common live credential signature", async () => {
  const listed = spawnSync("git", ["ls-files", "-z"], { encoding: "buffer" });
  assert.equal(listed.status, 0, String(listed.stderr));
  const files = listed.stdout.toString("utf8").split("\0").filter(Boolean);
  const signatures = [
    /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/,
    /AKIA[0-9A-Z]{16}/,
    /gh[pousr]_[A-Za-z0-9_]{30,}/,
    /sk-[A-Za-z0-9]{20,}/,
    /xox[baprs]-[A-Za-z0-9-]{10,}/,
  ];
  const findings: string[] = [];
  for (const file of files) {
    const content = await readFile(file);
    if (content.includes(0)) continue;
    const text = content.toString("utf8");
    if (signatures.some((signature) => signature.test(text))) findings.push(file);
  }
  assert.deepEqual(findings, [], `Possible committed credentials: ${findings.join(", ")}`);
});

test("SECURITY INTEGRITY SUITE: relay roles and model children never inherit ambient credentials or parent context identity", () => {
  const ambient = {
    HOME: "/safe/home",
    PATH: "/safe/bin",
    TMPDIR: "/safe/tmp",
    LANG: "C.UTF-8",
    FIREWORKS_API_KEY: "never-propagate-fireworks",
    OPENAI_API_KEY: "never-propagate-openai",
    AWS_SECRET_ACCESS_KEY: "never-propagate-aws",
    CODEX_THREAD_ID: "never-propagate-parent-context",
    RANDOM_PROJECT_SECRET: "never-propagate-project-secret",
  };
  const role = relayRoleEnvironment("/safe/codex", ambient);
  const child = relayCodexEnvironment(ambient, "2026-07-19-01");
  assert.deepEqual(role, {
    HOME: "/safe/home",
    TMPDIR: "/safe/tmp",
    LANG: "C.UTF-8",
    LC_ALL: "C.UTF-8",
    LC_CTYPE: "C.UTF-8",
    TERM: "xterm-256color",
    NO_COLOR: "1",
    PATH: "/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin",
    KODA_CODEX_BIN: "/safe/codex",
  });
  assert.deepEqual(child, {
    HOME: "/safe/home",
    TMPDIR: "/safe/tmp",
    LANG: "C.UTF-8",
    PATH: "/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin",
    GIT_CONFIG_GLOBAL: "/dev/null",
    GIT_CONFIG_SYSTEM: "/dev/null",
    GIT_OPTIONAL_LOCKS: "0",
    GIT_TERMINAL_PROMPT: "0",
    KODA_SESSION_ID: "2026-07-19-01",
  });
});

test("SECURITY INTEGRITY SUITE: role launcher bytes ignore ambient terminal locale and color", () => {
  const base = {
    executable: "/safe/codex",
    project: "/safe/project",
    script: "/safe/koda/scripts/producer.ts",
    scriptArgs: ["/safe/project/.koda/runs/11111111-1111-4111-8111-111111111111"],
  };
  const fromGhostty = ghosttyRoleLauncherSource({
    ...base,
    environmentSource: { HOME: "/safe/home", LANG: "en_US.UTF-8", TERM: "xterm-ghostty", COLORTERM: "truecolor" },
  });
  const fromDesktop = ghosttyRoleLauncherSource({
    ...base,
    environmentSource: { HOME: "/safe/home", LANG: "C.UTF-8", TERM: "dumb" },
  });
  assert.equal(fromGhostty, fromDesktop);
  assert.match(fromGhostty, /LANG=C\.UTF-8/);
  assert.match(fromGhostty, /TERM=xterm-256color/);
  assert.doesNotMatch(fromGhostty, /COLORTERM/);

  const legacy = fromGhostty
    .replace("'LANG=C.UTF-8'", "'LANG=en_US.UTF-8'")
    .replace("'TERM=xterm-256color'", "'TERM=xterm-ghostty'")
    .replace("  'NO_COLOR=1' \\", "  'COLORTERM=truecolor' \\\n  'NO_COLOR=1' \\");
  assert.equal(compatibleGhosttyRoleLauncherSource(legacy, base), true);
  assert.equal(compatibleGhosttyRoleLauncherSource("#!/bin/sh\necho injected\n", base), false);
  assert.equal(compatibleGhosttyRoleLauncherSource(legacy.replace("/safe/koda/scripts/producer.ts", "/tmp/evil.ts"), base), false);
});

test("SECURITY INTEGRITY SUITE: owner receipt and ruling data never enter child-process arguments or environment", async () => {
  const reviewerWindow = await readFile("scripts/run-relay-reviewer-window.ts", "utf8");
  assert.match(reviewerWindow, /const approvalInput = \[parsed\.receipt\.trim\(\)\]/);
  assert.match(reviewerWindow, /input: `\$\{approvalInput\.join\("\\n"\)\}\\n`/);
  assert.doesNotMatch(reviewerWindow, /approvalArgs[^\n]*parsed\.receipt/);
  assert.doesNotMatch(reviewerWindow, /approvalArgs\.push\("--(?:comments|ruling)"/);
  assert.doesNotMatch(reviewerWindow, /KODA_(?!RELAY_TEST_)[A-Z_]*(?:RECEIPT|RULING|COMMENTS)[A-Z_]*/);
});

test("SECURITY INTEGRITY SUITE: fresh-model evidence runs strip ambient credentials and parent context identity", async () => {
  const runner = await readFile("scripts/run-guide-preflight-model-test.ts", "utf8");
  assert.match(runner, /import \{ relayCodexEnvironment, relayNodeToolchainReadRoots \} from "\.\.\/src\/relay-environment\.ts"/);
  assert.match(runner, /codexProjectPermissionArgs/);
  assert.match(runner, /"--ignore-rules"/);
  assert.match(runner, /const codex = resolveExecutable\(process\.env\.KODA_CODEX_BIN/);
  assert.match(runner, /env: relayCodexEnvironment\(process\.env\)/);
  assert.doesNotMatch(runner, /spawnSync\(codex, args, \{ cwd, encoding:/);
});

test("SECURITY INTEGRITY SUITE: every managed Codex exec ignores ambient command rules", async () => {
  const files = [
    "scripts/execute-relay-run.ts",
    "scripts/run-relay-reviewer-window.ts",
    "scripts/execute-reviewer-run.ts",
    "scripts/run-guide-preflight-model-test.ts",
    "src/guide-console.ts",
  ];
  for (const file of files) {
    const source = await readFile(file, "utf8");
    assert.match(source, /"--ignore-user-config"[\s\S]{0,80}"--ignore-rules"/, `${file} must ignore config and rules together`);
  }
});

test("SECURITY INTEGRITY SUITE: the executable Ghostty role launcher starts one child with a clean environment", async () => {
  const temporary = await mkdtemp(path.join(tmpdir(), "koda-clean-launcher-"));
  try {
    const project = path.join(temporary, "project with ' quoted path");
    await mkdir(project, { recursive: true });
    const observed = path.join(project, "observed.json");
    const child = path.join(project, "capture.mjs");
    const launcher = path.join(temporary, "launch-role.sh");
    await writeFile(child, [
      'import { writeFileSync } from "node:fs";',
      `writeFileSync(${JSON.stringify(observed)}, JSON.stringify(process.env));`,
      "",
    ].join("\n"), "utf8");
    await writeFile(launcher, ghosttyRoleLauncherSource({
      executable: process.execPath,
      project,
      script: child,
      scriptArgs: [],
      environmentSource: {
        HOME: "/safe/home",
        TMPDIR: temporary,
        LANG: "C.UTF-8",
        FIREWORKS_API_KEY: "must-not-reach-launcher-child",
        OPENAI_API_KEY: "must-not-reach-launcher-child",
        CODEX_THREAD_ID: "must-not-reach-launcher-child",
      },
    }), { encoding: "utf8", mode: 0o700 });
    await chmod(launcher, 0o700);

    const executed = spawnSync(launcher, [], {
      cwd: temporary,
      encoding: "utf8",
      env: {
        ...process.env,
        FIREWORKS_API_KEY: "ambient-must-not-reach-child",
        OPENAI_API_KEY: "ambient-must-not-reach-child",
        CODEX_THREAD_ID: "ambient-must-not-reach-child",
        NODE_OPTIONS: "--require=/definitely/missing/koda-ambient-hook.cjs",
      },
    });
    assert.equal(executed.status, 0, executed.stderr);
    const environment = JSON.parse(await readFile(observed, "utf8"));
    assert.equal(environment.HOME, "/safe/home");
    assert.equal(environment.PATH, "/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin");
    assert.equal(environment.KODA_CODEX_BIN, process.execPath);
    assert.equal(environment.FIREWORKS_API_KEY, undefined);
    assert.equal(environment.OPENAI_API_KEY, undefined);
    assert.equal(environment.CODEX_THREAD_ID, undefined);
  } finally {
    await rm(temporary, { recursive: true, force: true });
  }
});
