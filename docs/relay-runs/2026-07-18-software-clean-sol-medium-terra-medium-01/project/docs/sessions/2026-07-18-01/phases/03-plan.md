# Plan

## Approved inputs
- [`../session-prompt.md`](../session-prompt.md): owner purpose, scope, success evidence, constraints, and ruling that no open item remains.
- [`01-brief.md`](01-brief.md): approved bounded deliverable and required demonstrations.
- [`02-orient.md`](02-orient.md): approved evidence map, project boundaries, and downstream technical choices that must be made explicit.
- [`../../../../AGENTS.md`](../../../../AGENTS.md): project-local requirements for offline, dependency-free, input-preserving work and separate producer/reviewer duties.

## Intended outcome
A project-local, dependency-free Node.js command that accepts exactly one local UTF-8 text-file path, prints one JSON object with that supplied path and an integer word count, preserves the input, and has saved deterministic checks and raw live evidence for ordinary text, an empty file, and a missing path.

## Ordered work
1. **Step:** Implement `word-count.js` using only Node.js built-ins. Require exactly one path argument; read it as UTF-8 without writing to it; count zero when trimmed content is empty and otherwise count non-empty runs separated by JavaScript whitespace; emit `{"source": <supplied path>, "wordCount": <integer>}` followed by a newline. On argument or read failure, print a concise `word-count:` error to stderr and exit nonzero without success JSON.
   - Output: `word-count.js`
   - Proof: `node --check word-count.js` exits zero, and the saved automated checks exercise the public command behavior rather than an internal mock.
2. **Step:** Add fixed ordinary-text and zero-byte fixtures plus a dependency-free `node:test` suite that invokes the real command as a child process. Assert exact parsed JSON for the ordinary and empty fixtures, nonzero exit and clear stderr for a missing path, empty success stdout on failure, and byte-for-byte unchanged fixture contents after execution.
   - Output: `test/fixtures/ordinary.txt`, `test/fixtures/empty.txt`, and `test/word-count.test.js`
   - Proof: `node --test test/word-count.test.js` exits zero with all three required behavior cases passing and the preservation assertions satisfied.
3. **Step:** Run the complete saved test suite from the project root and capture its raw combined output without masking the test process exit status.
   - Output: `evidence/test-output.txt`
   - Proof: the capture exists and is non-empty, the test command exits zero, and the captured report contains no failed test.
4. **Step:** Exercise the real command directly against the saved ordinary fixture, saved empty fixture, and a deliberately absent path; capture stdout, stderr, and exit status for each invocation without substituting predicted or mocked output.
   - Output: `evidence/live/ordinary.stdout.json`, `evidence/live/ordinary.stderr.txt`, `evidence/live/ordinary.exit.txt`, `evidence/live/empty.stdout.json`, `evidence/live/empty.stderr.txt`, `evidence/live/empty.exit.txt`, `evidence/live/missing.stdout.txt`, `evidence/live/missing.stderr.txt`, and `evidence/live/missing.exit.txt`
   - Proof: the ordinary JSON contains the fixture path and expected integer count with exit zero; the empty JSON contains count zero with exit zero; the missing-path capture has a nonzero exit, empty success stdout, and a clear error on stderr.
5. **Step:** Record SHA-256 values for both saved input fixtures before and after the direct live invocations.
   - Output: `evidence/live/input-sha256.txt`
   - Proof: the recorded before/after hashes match for each fixture, independently demonstrating that the command did not modify its inputs.

## Fail-closed and negative checks
- Invoke the command with a deliberately absent path and require a nonzero exit, no success JSON on stdout, and a clear path-specific error on stderr.
- Invoke the command with zero arguments and with more than one argument in the automated suite; require a nonzero exit and concise usage error so the one-path interface cannot silently accept ambiguous input.
- Treat any test failure, malformed JSON, non-integer `wordCount`, unexpected stderr on success, unexpected stdout on failure, or changed fixture hash as a failed handover.
- Inspect the command's imports and runtime behavior for Node.js built-ins only; any package dependency, network operation, directory recursion, or input write fails the project constraints.

## Scope controls and fallback
- Keep the interface to one file path and the output to the two JSON properties `source` and `wordCount`; preserve the supplied path string rather than adding path normalization behavior not requested by the contract.
- Define a word for this fixture as a non-empty run separated by JavaScript whitespace after trimming; do not add language-specific tokenization, punctuation rules, binary detection, recursion, performance work, publishing, or package metadata.
- Keep all source, fixtures, checks, and evidence inside the project. If satisfying a discovered requirement would need network access, a dependency, input mutation, or a product decision beyond the approved contract, stop rather than expand scope and route the decision through the in-phase consultation protocol.

## Inputs resolved during this phase
- Question: none
- Source and answer: The owner-authored [`../session-prompt.md`](../session-prompt.md) records no open item. The approved [`02-orient.md`](02-orient.md) identifies filenames, JSON keys, evidence paths, and word-boundary details as downstream technical choices; this plan fixes them explicitly as `word-count.js`, `source`/`wordCount`, project-local `test/` and `evidence/` paths, and whitespace-separated non-empty runs.

## Review handover
- Immediate receiver: `koda-c-review`
- Evidence to inspect: `phases/03-plan.md`, `session-prompt.md`, `phases/01-brief.md`, `phases/02-orient.md`, and `../../../../AGENTS.md`
- Unresolved items: none
