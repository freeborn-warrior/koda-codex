import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("the repository carries the complete GPLv3-only license and Kristian's sole copyright", async () => {
  const [license, packageText, readme] = await Promise.all([
    readFile("LICENSE", "utf8"),
    readFile("package.json", "utf8"),
    readFile("docs/README.md", "utf8"),
  ]);
  const packageJson = JSON.parse(packageText) as { license?: string };

  assert.match(license, /^Koda-C\nCopyright \(C\) 2026 Kristian Bengtsson\n/);
  assert.doesNotMatch(license.split("\n").slice(0, 4).join("\n"), /contributors?/i);
  assert.match(license, /GNU GENERAL PUBLIC LICENSE\n\s+Version 3, 29 June 2007/);
  assert.match(license, /Copyright \(C\) 2007 Free Software Foundation, Inc\./);
  assert.match(license, /0\. Definitions\./);
  assert.match(license, /17\. Interpretation of Sections 15 and 16\./);
  assert.match(license, /END OF TERMS AND CONDITIONS/);
  assert(license.length > 34_000, "LICENSE must contain the full standard GPLv3 text");
  assert.equal(packageJson.license, "GPL-3.0-only");
  assert.match(readme, /GNU General Public License version 3/);
  assert.match(readme, /Copyright \(C\) 2026 Kristian Bengtsson/);
});
