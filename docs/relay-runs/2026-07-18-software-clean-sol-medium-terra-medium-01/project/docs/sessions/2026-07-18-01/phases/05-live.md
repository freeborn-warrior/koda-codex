# Live exercise

## Output exercised
- [`../../../../word-count.js`](../../../../word-count.js): the real produced Node.js command approved in the production record.

## Environment
- Working directory: project root `/Users/freeborn/Dev/koda-codex/docs/relay-runs/2026-07-18-software-clean-sol-medium-terra-medium-01/project`.
- Runtime: Node.js `v26.0.0`.
- Platform: Darwin `25.5.0` on `arm64`.
- Direct commands were run from the project root. A Node.js `spawnSync` observation using the same executable and arguments separately confirmed each command's stdout, stderr, and exit status before the raw files were saved.

## Scenarios and observed results
1. **Scenario:** Count the saved ordinary-text fixture with the real command.
   - Command or method: `node word-count.js test/fixtures/ordinary.txt`
   - Expected: exit zero; JSON containing the supplied fixture path and integer `wordCount` 4; empty stderr.
   - Observed: exit `0`; stdout was `{"source":"test/fixtures/ordinary.txt","wordCount":4}` followed by a newline; stderr was empty.
   - Evidence: [`../../../../evidence/live/ordinary.stdout.json`](../../../../evidence/live/ordinary.stdout.json), [`../../../../evidence/live/ordinary.stderr.txt`](../../../../evidence/live/ordinary.stderr.txt), and [`../../../../evidence/live/ordinary.exit.txt`](../../../../evidence/live/ordinary.exit.txt).
   - Verdict: PASS
2. **Scenario:** Count the saved zero-byte fixture with the real command.
   - Command or method: `node word-count.js test/fixtures/empty.txt`
   - Expected: exit zero; JSON containing the supplied fixture path and integer `wordCount` 0; empty stderr.
   - Observed: exit `0`; stdout was `{"source":"test/fixtures/empty.txt","wordCount":0}` followed by a newline; stderr was empty.
   - Evidence: [`../../../../evidence/live/empty.stdout.json`](../../../../evidence/live/empty.stdout.json), [`../../../../evidence/live/empty.stderr.txt`](../../../../evidence/live/empty.stderr.txt), and [`../../../../evidence/live/empty.exit.txt`](../../../../evidence/live/empty.exit.txt).
   - Verdict: PASS
3. **Scenario:** Invoke the real command with a deliberately absent path.
   - Command or method: `node word-count.js test/fixtures/missing.txt`
   - Expected: nonzero exit; no success stdout; clear path-specific error on stderr.
   - Observed: exit `1`; stdout was empty; stderr reported `word-count: cannot read "test/fixtures/missing.txt": ENOENT: no such file or directory, open 'test/fixtures/missing.txt'` followed by a newline.
   - Evidence: [`../../../../evidence/live/missing.stdout.txt`](../../../../evidence/live/missing.stdout.txt), [`../../../../evidence/live/missing.stderr.txt`](../../../../evidence/live/missing.stderr.txt), and [`../../../../evidence/live/missing.exit.txt`](../../../../evidence/live/missing.exit.txt).
   - Verdict: PASS
4. **Scenario:** Compare saved fixture hashes before and after all direct live invocations.
   - Command or method: `shasum -a 256 test/fixtures/ordinary.txt test/fixtures/empty.txt` before and after the command scenarios.
   - Expected: each fixture's before and after SHA-256 values match.
   - Observed: ordinary fixture hash remained `8b85a9a03249a356fc850b4e61f935bf53ccdc9d8cdb1e6ac8cc530b07d2c4d4`; empty fixture hash remained `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`.
   - Evidence: [`../../../../evidence/live/input-sha256.txt`](../../../../evidence/live/input-sha256.txt).
   - Verdict: PASS

## Failure-path evidence
- The deliberately absent `test/fixtures/missing.txt` path produced exit `1`, empty stdout, and the preserved `ENOENT` stderr in [`../../../../evidence/live/missing.stderr.txt`](../../../../evidence/live/missing.stderr.txt); the failure remains visible and was not repaired or replaced.

## Inputs resolved during this phase
- Question: none
- Source and answer: The approved [`03-plan.md`](03-plan.md) and [`04-produce.md`](04-produce.md) specify the three live scenarios, expected streams and statuses, evidence paths, and fixture-hash check; no additional input was required.

## Limitations
- Live exercise was limited to the approved ordinary-text, zero-byte, missing-path, and input-preservation scenarios. Binary formats, directory recursion, publishing, network behavior, language-specific tokenization, and performance remain outside scope.
- Zero-argument and excess-argument refusals were not repeated as direct live scenarios; they remain captured by the approved production test suite rather than being presented here as live observations.

## Review handover
- Immediate receiver: `koda-c-review`
- Evidence to inspect: `phases/05-live.md`, `../../../../word-count.js`, and every file under `../../../../evidence/live/`
- Unresolved items: none
