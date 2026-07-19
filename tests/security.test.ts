import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { chmod, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { ghosttyRoleLauncherSource } from "../src/ghostty.ts";
import { relayCodexEnvironment, relayRoleEnvironment } from "../src/relay-environment.ts";

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
    PATH: "/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin",
    KODA_CODEX_BIN: "/safe/codex",
  });
  assert.deepEqual(child, {
    HOME: "/safe/home",
    TMPDIR: "/safe/tmp",
    LANG: "C.UTF-8",
    PATH: "/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin",
    KODA_SESSION_ID: "2026-07-19-01",
  });
});

test("SECURITY INTEGRITY SUITE: owner receipt and ruling data never enter child-process arguments or environment", async () => {
  const reviewerWindow = await readFile("scripts/run-relay-reviewer-window.ts", "utf8");
  assert.match(reviewerWindow, /const approvalInput = \[receiptInput\.trim\(\)\]/);
  assert.match(reviewerWindow, /input: `\$\{approvalInput\.join\("\\n"\)\}\\n`/);
  assert.doesNotMatch(reviewerWindow, /approvalArgs[^\n]*receiptInput/);
  assert.doesNotMatch(reviewerWindow, /approvalArgs\.push\("--(?:comments|ruling)"/);
  assert.doesNotMatch(reviewerWindow, /KODA_(?!RELAY_TEST_)[A-Z_]*(?:RECEIPT|RULING|COMMENTS)[A-Z_]*/);
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
