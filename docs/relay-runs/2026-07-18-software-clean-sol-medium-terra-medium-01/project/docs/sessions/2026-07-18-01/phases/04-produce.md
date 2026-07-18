# Production record

## Approved inputs
- [`../session-prompt.md`](../session-prompt.md): owner requirements for a dependency-free, offline, input-preserving Node.js word-count command and saved evidence.
- [`01-brief.md`](01-brief.md): approved scope, exclusions, and checkable ordinary-text, empty-file, and missing-path outcomes.
- [`02-orient.md`](02-orient.md): approved ground and technical unknowns to resolve downstream.
- [`03-plan.md`](03-plan.md): approved filenames, JSON shape, whitespace word rule, fail-closed behavior, checks, and evidence layout.
- [`../../../../AGENTS.md`](../../../../AGENTS.md): project-local durability and producer/reviewer separation requirements.

## Output produced
- [`../../../../word-count.js`](../../../../word-count.js): dependency-free Node.js command that reads one UTF-8 file, emits `source` and integer `wordCount` JSON, and fails closed on argument or read errors.
- [`../../../../test/fixtures/ordinary.txt`](../../../../test/fixtures/ordinary.txt): fixed four-word ordinary-text fixture.
- [`../../../../test/fixtures/empty.txt`](../../../../test/fixtures/empty.txt): fixed zero-byte fixture.
- [`../../../../test/word-count.test.js`](../../../../test/word-count.test.js): dependency-free `node:test` suite invoking the real command as a child process for success, failure, argument-count, and input-preservation checks.
- [`../../../../evidence/test-output.txt`](../../../../evidence/test-output.txt): raw output captured from the successful standalone test run.

## Requirement mapping
- Accept one local UTF-8 text-file path and emit JSON with the supplied source path and integer count → [`../../../../word-count.js`](../../../../word-count.js), checked by [`../../../../test/word-count.test.js`](../../../../test/word-count.test.js).
- Report the expected count for ordinary text → [`../../../../test/fixtures/ordinary.txt`](../../../../test/fixtures/ordinary.txt) and the exact parsed-JSON assertion in [`../../../../test/word-count.test.js`](../../../../test/word-count.test.js).
- Report zero for an empty file → zero-byte [`../../../../test/fixtures/empty.txt`](../../../../test/fixtures/empty.txt) and the exact parsed-JSON assertion in [`../../../../test/word-count.test.js`](../../../../test/word-count.test.js).
- Refuse a missing path with nonzero exit and clear error → missing-path child-process assertions in [`../../../../test/word-count.test.js`](../../../../test/word-count.test.js).
- Preserve input files → before/after byte-buffer assertions for both saved fixtures in [`../../../../test/word-count.test.js`](../../../../test/word-count.test.js).
- Use no dependencies or network access → Node.js built-in imports only in [`../../../../word-count.js`](../../../../word-count.js) and [`../../../../test/word-count.test.js`](../../../../test/word-count.test.js); the command imports only `node:fs/promises` and calls only `readFile`.
- Save deterministic checks on disk → [`../../../../test/word-count.test.js`](../../../../test/word-count.test.js) and successful raw report [`../../../../evidence/test-output.txt`](../../../../evidence/test-output.txt).

## Verification performed
- Command or inspection: `node --check word-count.js && node --check test/word-count.test.js`
- Observed result: both files passed Node.js syntax validation with exit zero.
- Command or inspection: `node --test test/word-count.test.js`
- Observed result: exit zero; 5 tests passed, 0 failed, covering ordinary text, a zero-byte file, a missing path, zero arguments, and excess arguments. The standalone run output is saved verbatim in [`../../../../evidence/test-output.txt`](../../../../evidence/test-output.txt).
- Command or inspection: `wc -c test/fixtures/empty.txt test/fixtures/ordinary.txt`
- Observed result: the empty fixture is 0 bytes and the ordinary fixture is 19 bytes.
- Command or inspection: `rg -n "^import|readFile|writeFile|https?|fetch|node:net" word-count.js test/word-count.test.js`
- Observed result: imports are limited to Node.js built-ins; the command uses `readFile`, with no write or network API present.

## Inputs resolved during this phase
- Question: none
- Source and answer: The approved [`03-plan.md`](03-plan.md) fully specifies the command behavior, filenames, JSON keys, word rule, checks, and evidence paths. The inherited ESM setting required Node.js built-in `import` syntax; this preserves every approved behavior and requires no product ruling.

## Known gaps or limits
- Direct raw command captures and before/after SHA-256 evidence were not created because they belong to the configured `live` phase. No live evaluation was begun during production.
- Binary detection, recursion, language-specific tokenization, publishing, and performance behavior remain outside the approved scope.

## Review handover
- Immediate receiver: `koda-c-review`
- Evidence to inspect: `phases/04-produce.md`, `../../../../word-count.js`, `../../../../test/fixtures/ordinary.txt`, `../../../../test/fixtures/empty.txt`, `../../../../test/word-count.test.js`, and `../../../../evidence/test-output.txt`
- Unresolved items: none
