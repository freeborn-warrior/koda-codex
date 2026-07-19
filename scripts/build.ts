import { chmod, readFile, mkdir, readdir, rm, writeFile } from "node:fs/promises";
import { stripTypeScriptTypes } from "node:module";
import path from "node:path";

const root = process.cwd();
const sourceDir = path.join(root, "src");
const outputDir = path.join(root, "dist");

if (path.basename(outputDir) !== "dist" || path.dirname(outputDir) !== root) {
  throw new Error(`Refusing unsafe build output path: ${outputDir}`);
}

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

const sources = (await readdir(sourceDir)).filter((name) => name.endsWith(".ts")).sort();
for (const name of sources) {
  const sourcePath = path.join(sourceDir, name);
  const source = await readFile(sourcePath, "utf8");
  const javascript = stripTypeScriptTypes(source, { mode: "strip", sourceUrl: sourcePath })
    .replaceAll(/(from\s+["'][^"']+)\.ts(["'])/g, "$1.js$2")
    .replaceAll(/(import\s*\(["'][^"']+)\.ts(["']\))/g, "$1.js$2")
    .replaceAll(/(["']\.{1,2}\/[^"']+)\.ts(["'])/g, "$1.js$2")
    .replace(/[ \t]+$/gm, "");
  await writeFile(path.join(outputDir, name.replace(/\.ts$/, ".js")), javascript, "utf8");
}

await chmod(path.join(outputDir, "cli.js"), 0o755);

console.log(`Built ${sources.length} dependency-free JavaScript files in dist/.`);
