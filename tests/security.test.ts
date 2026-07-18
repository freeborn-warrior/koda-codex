import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import test from "node:test";

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
