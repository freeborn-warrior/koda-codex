# Testing ledger

Every durable test result is recorded here. Deterministic Node.js tests do not invoke a model, so model variant and effort are marked not applicable rather than invented.

Tests are product contracts. A failure is never removed by weakening its requirement. An assertion changes only when on-disk evidence shows the assertion itself encoded the wrong requirement; the failed run, reason, and corrected run remain in this ledger.

## 2026-07-18 — First live gate smoke test

- **Variant:** Not applicable; deterministic CLI run.
- **Effort:** Not applicable.
- **What:** The demo fixture's receipt gate.
- **How:** Initialized a clean temporary demo project, ran `advance`, read and quoted the generated receipt through `approve`, then ran `advance` again.
- **What happened:** The first advance visibly refused because the ledger lacked the receipt. The exact receipt was recorded, the second advance opened the gate, and status derived the next phase from disk.
- **Verdict:** PASS. The temporary sandbox was removed; only this result is retained.

## 2026-07-18 — Initial mutation suite

- **Variant:** Not applicable; Node.js test runner.
- **Effort:** Not applicable.
- **What:** Gate mutations, configuration, session creation, and pushed-session closure.
- **How:** Ran `npm test` with 25 checks.
- **What happened:** 24 passed. The closure test exposed macOS path aliases (`/var` and `/private/var`) being treated as different locations.
- **Verdict:** DEFECT FOUND. Canonicalize both paths before checking repository containment.

## 2026-07-18 — Canonical-path correction

- **Variant:** Not applicable; Node.js test runner.
- **Effort:** Not applicable.
- **What:** Full suite after fixing closure path canonicalization.
- **How:** Ran `npm test` again.
- **What happened:** All 25 checks passed, including a session committed and pushed to a local bare Git remote.
- **Verdict:** PASS.

## 2026-07-18 — Expanded fail-closed and recovery suite

- **Variant:** Not applicable; Node.js test runner.
- **Effort:** Not applicable.
- **What:** Every gate condition, every verdict, fresh-review rules, and printed recovery commands.
- **How:** Ran `npm test` with deliberate mutations for missing/empty artifacts, missing reviews, invalid verdicts, missing/mismatched/reused receipts, changed artifacts, missing/mismatched ledger proof, missing approver/comments, and blocking verdicts. The tests also executed the printed `review new`, `approve`, and `advance` recovery commands from the states that printed them.
- **What happened:** All 30 checks passed.
- **Verdict:** PASS.

## 2026-07-18 — Coverage run

- **Variant:** Not applicable; Node.js test runner.
- **Effort:** Not applicable.
- **What:** Coverage of the expanded test suite.
- **How:** Ran `npm run test:coverage`.
- **What happened:** All 30 checks passed. Overall coverage was 86.94% lines, 69.09% branches, and 92.41% functions; the gate engine reached 98.26% line coverage.
- **Verdict:** PASS. Remaining uncovered paths are mostly command usage errors and defensive corruption messages, not untested gate conditions.

## Deferred GPT-5.6 variant matrix

- **Sol / effort levels:** Skipped for now; no model-assisted product test has run yet.
- **Terra / effort levels:** Skipped for now; no model-assisted product test has run yet.
- **Luna / effort levels:** Skipped for now; no model-assisted product test has run yet.
- **Reason:** Per the owner's bounded-testing rule, model-assisted runs default to one variant and the full matrix begins only after target (a) has landed and time remains. A later entry must name the actual available variant and effort rather than infer them.

## 2026-07-18 — Reviewer skill package validation

- **Variant:** Not applicable; deterministic skill validator.
- **Effort:** Not applicable.
- **What:** `skills/peer-reviewer/SKILL.md` frontmatter, naming, and package structure.
- **How:** Ran Codex's `quick_validate.py` against the repository-local skill folder.
- **What happened:** The bundled artifact Python lacked its optional YAML package, so that runtime could not start the validator. The system Python had the required parser and returned `Skill is valid!`. The first Node run then failed because its assertion looked for different wording than the skill's actual “review is saved on disk” instruction; the assertion was corrected without weakening the requirement. The Node test checks the six default phase sections, custom-phase rule, write-before-report rule, receipt boundary, and four-line `agents/openai.yaml` sidecar.
- **Verdict:** PASS. After correcting the assertion, all 31 repository checks passed and the Codex validator again returned `Skill is valid!`. The skill exists only inside this project; nothing was installed globally.

## 2026-07-18 — Expanded relay, history, and immutable-close run

- **Variant:** Not applicable; Node.js test runner.
- **Effort:** Not applicable.
- **What:** Nine Koda-C skill packages, prior-phase entry evidence, immutable close binding, and Git between close preparation and verification.
- **How:** Ran `npm test` after expanding the producer/reviewer relay and close ceremony.
- **What happened:** 33 of 35 checks passed. Both failures were overly literal skill-test phrases: the summary used “resolved inputs” instead of the assertion's full heading, and the close skill stated “immutable” and `close.md` separately rather than adjacently. The actual history and Git closure tests passed.
- **Verdict:** TEST ASSERTIONS REVISE. Correct the wording checks without weakening their semantic requirements, then rerun the complete suite.

The first corrected rerun passed 34 of 35 checks. One assertion still assumed the words “resolved input” were adjacent, while five skills use the explicit heading “Inputs resolved during this phase.” The assertion was narrowed to the two accepted artifact headings and scheduled for another full rerun.

The final corrected run passed all 35 checks. A subsequent full run also proved `session new` refuses both an uncommitted close and a locally committed but unpushed close, then succeeds only after the close commit reaches the configured upstream. All nine skill folders independently returned `Skill is valid!` from Codex's validator.

## 2026-07-18 — Tiny end-to-end dogfood session

- **Variant:** Not applicable; deterministic CLI lifecycle proof.
- **Effort:** Not applicable.
- **What:** One complete configured phase from session open through review, receipt approval, advancement, immutable close, Git commit, push, and derived closure.
- **How:** Ran `npm run dogfood` in a disposable project with a disposable local bare Git remote. Saved the normalized transcript and session snapshot under `docs/dogfood/` and removed the temporary repositories.
- **What happened:** The first run reached verified closure but revealed that the first-push hint printed `git push` while the harness needed `git push -u origin main`. Close was changed to inspect branch/upstream, print the exact first-push command, and refuse preparation when no remote exists. The current rerun also binds the full review hash into approval evidence, executed all three printed Git commands verbatim, refused closure after the local commit, pushed commit `8ba9b4ac1f374e68d19385362ca5af8552b5861e`, then reported `SESSION CLOSED` from both close and status.
- **Verdict:** PASS after UX correction. A repository test re-hashes the preserved session and checks that `close.md` still binds its final state, review, and receipt.

## 2026-07-18 — Owner-defined test classes, first expanded run

- **Variant:** Not applicable; deterministic Node.js test runner.
- **Effort:** Not applicable.
- **What:** Explicit gate-mutation, receipt-adversarial, stale-review, status-truth, printed-command, and initial reviewer-fixture integrity tests.
- **How:** Ran `npm run test:record -- 2026-07-18-expanded-core-initial`; every test and subtest is preserved in [the per-test result](test-results/2026-07-18-expanded-core-initial.md).
- **What happened:** 55 of 56 checks passed. The older advanced-history assertion expected the superseded phrase “changed after this review,” while the product had deliberately changed the refusal to “review is stale … re-review.” The mechanism passed; the wording assertion failed.
- **Verdict:** TEST ASSERTION REVISE. Update the assertion to require the new named stale-review language, then rerun everything.

## 2026-07-18 — Owner-defined test classes, corrected run

- **Variant:** Not applicable; deterministic Node.js test runner.
- **Effort:** Not applicable.
- **What:** The complete expanded deterministic suite, including one planted reviewer fixture and one honest control.
- **How:** Corrected only the stale wording assertion, then ran `npm run test:record -- 2026-07-18-expanded-core-final`; every test and subtest is preserved in [the per-test result](test-results/2026-07-18-expanded-core-final.md).
- **What happened:** All 58 checks passed. The suite names every core gate refusal, rejects earlier-review and cross-phase receipts, accepts outer trim only, refuses any changed receipt word, binds review hashes in both directions, derives status after behind-the-CLI mutations, and names malformed ledger and state evidence.
- **Verdict:** PASS. The deterministic mechanism and two bounded fixture sources are ready; actual model-assisted fixture runs remain unrun.

## 2026-07-18 — Codex-native skill packaging correction

- **Variant:** Not applicable; deterministic skill validator and Node.js test runner.
- **Effort:** Not applicable.
- **What:** Root `AGENTS.md`, repository skill discovery layout, nine skill packages, and all existing product checks after moving from top-level `skills/` to `.agents/skills/`.
- **How:** Ran Codex's `quick_validate.py` independently for all nine folders, then `npm run test:record -- 2026-07-18-codex-native-packaging`. Every repository test and subtest is preserved in [the per-test result](test-results/2026-07-18-codex-native-packaging.md).
- **What happened:** All nine skills returned `Skill is valid!`; all 58 repository checks passed. The current task cannot prove startup discovery because Codex reads repository guidance and its initial skill list at task startup.
- **Verdict:** DETERMINISTIC PASS; FRESH-TASK DISCOVERY STILL REQUIRED. This correction came from the owner's question about `.agents`, followed by verification against current official Codex documentation.

## 2026-07-18 — Expanded core coverage

- **Variant:** Not applicable; Node.js test runner.
- **Effort:** Not applicable.
- **What:** Coverage after receipt adversarial, stale-review, status-truth, reviewer-fixture, and packaged-command additions.
- **How:** Ran `npm run test:record -- 2026-07-18-expanded-core-coverage --coverage`; every named result is preserved in [the per-test result](test-results/2026-07-18-expanded-core-coverage.md).
- **What happened:** All 58 checks passed. Overall coverage was 87.90% lines, 71.88% branches, and 91.58% functions; `gate.ts` reached 100% for lines, branches, and functions.
- **Verdict:** PASS.

## 2026-07-18 — Bidirectional review binding

- **Variant:** Not applicable; Node.js test runner.
- **Effort:** Not applicable.
- **What:** Full-review acknowledgement binding and incomplete-template refusal.
- **How:** Added the complete review SHA-256 to each approval entry, re-hashed it during every gate/status evaluation, and ran `npm run test:record -- 2026-07-18-bidirectional-review-binding-initial`. Every named result is preserved in [the per-test result](test-results/2026-07-18-bidirectional-review-binding-initial.md).
- **What happened:** All 63 checks passed. Editing review findings after the receipt was acknowledged now refuses with `approval_review_changed`; merely flipping an untouched generated template to `APPROVE` refuses with `review_incomplete`. Status reflects both conditions directly from disk.
- **Verdict:** PASS. The chain now binds artifact → review and complete review → approval, while still making no claim to prove cognition.

## 2026-07-18 — Real package investigation and correction

- **Variant:** Not applicable; npm package/install rehearsal.
- **Effort:** Not applicable.
- **What:** The documented local package invocation and installed executable, including failed attempts.
- **How:** Packed the repository, installed the tarball through `npm exec`, and executed the binary and its printed command. The exact sequence is preserved in [the package investigation result](test-results/2026-07-18-package-investigation.md).
- **What happened:** Treating the tarball itself as an npm executable first produced a permission error. Correct npm syntax then exposed the real defect: Node refuses native TypeScript type stripping inside `node_modules`. A dependency-free build step now emits plain JavaScript to `dist/`; a follow-up exposed one printed `.ts` path literal, which was also corrected.
- **Verdict:** DEFECTS FOUND AND CORRECTED. The automated package test now constructs a real tarball, installs it, starts `koda`, initializes the demo, executes the exact printed `dist/cli.js advance` command, and asserts the named refusal.

## 2026-07-18 — Packaged recovery command, corrected run

- **Variant:** Not applicable; Node.js test runner plus npm tarball installation.
- **Effort:** Not applicable.
- **What:** Complete deterministic suite after compiling the installable binary and correcting the printed path.
- **How:** Ran `npm run test:record -- 2026-07-18-packaged-recovery-command-final`; every named result is preserved in [the per-test result](test-results/2026-07-18-packaged-recovery-command-final.md).
- **What happened:** All 63 checks passed, including the real tarball/install test and exact installed-package recovery command.
- **Verdict:** PASS.

## 2026-07-18 — Final coverage run

- **Variant:** Not applicable; Node.js test runner.
- **Effort:** Not applicable.
- **What:** All deterministic product, packaging, skill-shape, dogfood-integrity, and fixture-integrity checks.
- **How:** Ran `npm run test:record -- 2026-07-18-final-coverage --coverage`; every named result is preserved in [the per-test result](test-results/2026-07-18-final-coverage.md).
- **What happened:** All 63 checks passed. Overall coverage was 87.98% lines, 71.69% branches, and 91.75% functions; `gate.ts`, `cli.ts`, `types.ts`, and the test helpers reached 100% line, branch, and function coverage.
- **Verdict:** PASS.

## 2026-07-18 — Installed-style one-minute demo rehearsal

- **Variant:** Not applicable; manual CLI rehearsal using generated commands.
- **Effort:** Not applicable.
- **What:** The user-facing refusal → receipt prompt → successful advancement path.
- **How:** Initialized the demo through the built `dist/cli.js`, then copied only commands printed by Koda. The exact commands and significant output are preserved in [the rehearsal result](test-results/2026-07-18-installed-demo-rehearsal.md).
- **What happened:** The first `advance` refused because the current receipt was absent. The printed interactive `approve` command accepted the exact final receipt and printed another `advance` command. That command opened `BRIEF` and activated `orient`.
- **Verdict:** PASS.

## 2026-07-18 — Owner-facing relay, first validation

- **Variant:** Not applicable; Node.js test runner.
- **Effort:** Not applicable.
- **What:** Persistent producer/reviewer role separation, disk-backed in-phase consultation, no chat-only handback, session-prompter boundary, and pinned ephemeral Ghostty fixture execution.
- **How:** Ran `npm test`; the failed assertions and passing-scope record are preserved in [the initial per-test result](test-results/2026-07-18-owner-facing-relay-initial.md).
- **What happened:** 63 of 65 checks passed. The expanded reviewer description no longer began with an accepted front-loaded discovery verb, and its broader receipt sentence no longer contained the exact explicit `Do not quote the receipt in chat.` prohibition required by the skill contract.
- **Verdict:** SKILL WORDING REVISE. The new relay mechanisms passed. Restore both explicit discovery/receipt requirements without weakening either test.

## 2026-07-18 — Owner-facing relay, corrected validation

- **Variant:** Not applicable; Node.js test runner plus Codex's deterministic skill validator.
- **Effort:** Not applicable.
- **What:** The complete repository after correcting the two reviewer-skill contract violations.
- **How:** Changed the reviewer description to front-load `Review`, restored the exact receipt sentence, ran all nine skills through `quick_validate.py`, and ran `npm run test:record -- 2026-07-18-owner-facing-relay-final`. Every test is preserved in [the corrected per-test result](test-results/2026-07-18-owner-facing-relay-final.md).
- **What happened:** All 65 checks passed and all nine skills returned `Skill is valid!`.
- **Verdict:** PASS. No test was weakened.

## 2026-07-18 — Owner-facing relay coverage, first run

- **Variant:** Not applicable; Node.js coverage runner.
- **Effort:** Not applicable.
- **What:** Coverage after the owner-facing relay and Ghostty fixture-runner additions.
- **How:** Ran `npm run test:record -- 2026-07-18-owner-facing-relay-coverage --coverage`; every named result is preserved in [the per-test result](test-results/2026-07-18-owner-facing-relay-coverage.md).
- **What happened:** All 65 checks passed, with 87.86% overall line coverage. Gate coverage fell from 100% to 98.46% because the `review_phase_mismatch` refusal at `gate.ts:62-63` had never been deliberately exercised.
- **Verdict:** MISSING MUTATION TEST. Add a one-condition mutation that changes only the review metadata phase and asserts the named refusal. Do not accept lower gate coverage.

## 2026-07-18 — Owner-facing relay coverage, corrected run

- **Variant:** Not applicable; Node.js coverage runner.
- **Effort:** Not applicable.
- **What:** The full suite with the missing review-phase mutation added.
- **How:** Ran `npm run test:record -- 2026-07-18-owner-facing-relay-coverage-final --coverage`; every named result is preserved in [the per-test result](test-results/2026-07-18-owner-facing-relay-coverage-final.md).
- **What happened:** All 66 checks passed. Overall coverage is 87.98% lines, 71.77% branches, and 91.75% functions; `gate.ts` is again 100% for lines, branches, and functions.
- **Verdict:** PASS. The new mutation refuses and names `review_phase_mismatch`.

## 2026-07-18 — Final package dry run

- **Variant:** Not applicable; npm packaging.
- **Effort:** Not applicable.
- **What:** Exact files and build behavior of the current installable package.
- **How:** Ran `npm pack --dry-run` with an isolated npm cache after the 66-check coverage run.
- **What happened:** `prepack` built 10 dependency-free JavaScript files; npm listed 115 packaged files, 103.2 kB compressed and 384.4 kB unpacked, including all nine `.agents/skills/` packages, docs, fixtures, scripts, source, tests, and `dist/`.
- **Verdict:** PASS. Node emitted the already-known experimental warning for `stripTypeScriptTypes`; the real tarball/install test remains green.
