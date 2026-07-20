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

## 2026-07-18 — Fresh reviewer runner integration failures

- **Variant:** `gpt-5.6-sol` requested at medium effort; no model review completed in either failed run.
- **Effort:** Medium requested; not evaluated.
- **What:** First execution of the blind reviewer-fixture runner against `planted-hard-number`.
- **How:** Prepared a copied fixture project and launched fresh ephemeral Codex tasks with the generated commands. Preserved both failed attempts under [`reviewer-runs/`](reviewer-runs/).
- **What happened:** Run 01 never started Codex because the executor placed the global `-a never` option after `exec`; its result writer also omitted newline joining and collapsed the initial Markdown. Both runner defects were corrected and regression assertions added. Run 02 created a fresh task, but the service refused `gpt-5.6-sol` because the installed Codex CLI 0.139.0 was too old. Codex was upgraded to 0.144.6 before creating a new run. Neither failed project was reused or called a model result.
- **Verdict:** RUNNER AND ENVIRONMENT FAILURES, PRESERVED. No fixture capability claim comes from either attempt.

## 2026-07-18 — Fresh Sol reviewer capability fixture

- **Variant:** `gpt-5.6-sol`.
- **Effort:** Medium.
- **What:** Blind formal review of the one-defect `planted-hard-number` fixture in a fresh ephemeral Codex task.
- **How:** The runner gave the task the named repository reviewer skill, a copied Koda project, the active artifact, and only its cited evidence. Expected behavior remained sealed outside the copied project until grading. Full evidence is in [run 03](reviewer-runs/2026-07-18-planted-hard-number-sol-medium-03/RESULT.md).
- **What happened:** The reviewer returned REVISE and identified exactly that neither cited file supports the brief's five-second promise. It made no other item blocking, preserved review metadata and receipt, ran status, and did not expose the receipt in chat.
- **Verdict:** PASS — capability control caught the plant.

## 2026-07-18 — Fresh Sol reviewer temperament fixture

- **Variant:** `gpt-5.6-sol`.
- **Effort:** Medium.
- **What:** Blind formal review of the `honest-control` fixture in a separate fresh ephemeral Codex task.
- **How:** Used the same bounded runner and evidence boundary as the planted run, with a clean copied project and sealed expectation. Full evidence is in [run 01](reviewer-runs/2026-07-18-honest-control-sol-medium-01/RESULT.md).
- **What happened:** The reviewer verified the artifact against both cited sources and returned APPROVE without inventing a defect. It preserved review metadata and receipt, ran status, and did not expose the receipt in chat.
- **Verdict:** PASS — temperament control approved honest work.

Both successful tasks emitted repeated local model-cache parse warnings about `supports_reasoning_summaries`; the task turns still completed with exit code 0 and their stderr remains attached. These runs prove fresh-context reviewer behavior because the runner names the skill explicitly. They do not yet prove automatic startup discovery of repository skills, which remains a separate test.

## 2026-07-18 — Reviewer runner corrected deterministic run

- **Variant:** Not applicable; Node.js test runner.
- **Effort:** Not applicable.
- **What:** Complete repository suite after correcting global Codex option placement and durable result formatting.
- **How:** Ran `npm run test:record -- 2026-07-18-reviewer-runner-final`; every named result is preserved in [the per-test result](test-results/2026-07-18-reviewer-runner-final.md).
- **What happened:** All 66 checks passed. Regression checks require `--ask-for-approval never` before the `exec` subcommand, forbid the broken post-subcommand shorthand, and require the prepared result lines to be joined with newlines.
- **Verdict:** PASS. The failed attempts remain recorded; their tests were not weakened or erased.

## 2026-07-18 — Full native lifecycle scenarios, first run

- **Variant:** Not applicable; deterministic Node.js and local Git scenarios.
- **Effort:** Not applicable.
- **What:** Three complete native chains: clean approval, REVISE recovery in plan, and DISCUSS with an owner ruling plus fresh live review. Every scenario traverses brief → orient → plan → produce → live → summary and reaches a pushed immutable close.
- **How:** Added three independent temporary-project tests and strengthened the committed dogfood test to require all six native phases, then ran `npm test` before replacing the old snapshot.
- **What happened:** All three new full-lifecycle scenarios passed. The complete suite reported 68 of 69 passing because the committed dogfood snapshot still honestly contained only its prior one-phase brief session.
- **Verdict:** EXPECTED EVIDENCE MIGRATION FAILURE. Regenerate the dogfood through the full native chain; do not weaken the six-phase assertion or call the old snapshot sufficient.

## 2026-07-18 — Full native lifecycle scenarios, corrected run

- **Variant:** Not applicable; deterministic Node.js and local Git scenarios.
- **Effort:** Not applicable.
- **What:** The complete repository after regenerating dogfood through all six native phases and retaining the clean, REVISE, and DISCUSS scenario tests.
- **How:** Ran `npm run dogfood`, inspected the resulting six artifacts, six reviews, six advancement records, close metadata, and transcript, then ran `npm run test:record -- 2026-07-18-full-native-lifecycle-final`. Every named test is preserved in [the per-test result](test-results/2026-07-18-full-native-lifecycle-final.md).
- **What happened:** All 69 checks passed. Each of the three full-session scenarios reached an immutable close committed and pushed to its own temporary Git remote. The preserved clean dogfood separately refused twice per phase—first without review, then without receipt—before every gate opened and summary handed to pushed close.
- **Verdict:** PASS. Mechanical support for the full native lifecycle is now proved across multiple routes; actual model-driven producer/reviewer operation across that lifecycle remains a separate next proof.

## 2026-07-18 — Full native lifecycle coverage

- **Variant:** Not applicable; Node.js coverage runner plus local Git scenario repositories.
- **Effort:** Not applicable.
- **What:** Coverage after adding three six-phase pushed-close scenarios and the full native dogfood snapshot.
- **How:** Ran `npm run test:record -- 2026-07-18-full-native-lifecycle-coverage --coverage`; every result and the complete coverage table are preserved in [the per-test result](test-results/2026-07-18-full-native-lifecycle-coverage.md).
- **What happened:** All 69 checks passed. Overall coverage increased to 88.24% lines, 72.46% branches, and 91.75% functions. `gate.ts` remains 100% for lines, branches, and functions.
- **Verdict:** PASS. Adding lifecycle scenarios did not reduce mutation coverage or weaken any refusal test.

## 2026-07-18 — GPLv3 ownership and package metadata

- **Variant:** Not applicable; deterministic file and package validation.
- **Effort:** Not applicable.
- **What:** Owner-directed replacement of MIT with GPLv3 only and the sole project copyright line `Copyright (C) 2026 Kristian Bengtsson`.
- **How:** Retrieved the canonical GPLv3 text from GNU, added the project copyright header, set package metadata to `GPL-3.0-only`, added the README license section, and compared the license body after the header byte-for-byte with GNU's source. Both SHA-256 values were `3972dc9744f6499f0f9b2dbf76696f2ae7ad8af9b23dde66d6af86c9dfb36986`. Then ran `npm run test:record -- 2026-07-18-gplv3-license-final`; every named result is preserved in [the per-test result](test-results/2026-07-18-gplv3-license-final.md).
- **What happened:** All 70 checks passed, including the real packaged executable. The license test requires the exact owner line, GPLv3 title, standard sections 0 and 17, end marker, full-text size, package SPDX identifier, and README notice.
- **Verdict:** PASS. The complete standard GPLv3 body is intact and package/readme metadata agree.

## 2026-07-18 — Terra medium reviewer pair

- **Variant:** `gpt-5.6-terra`.
- **Effort:** Medium.
- **What:** The same sealed planted-hard-number and honest-control fixtures already used for Sol.
- **How:** Ran each copied project in a separate fresh Codex task with the reviewer skill and evidence boundary pinned. The first planted attempt never reached a model because the desktop sandbox denied Codex state-database initialization; it remains preserved as [NOT RUN](reviewer-runs/2026-07-18-planted-hard-number-terra-medium-01/RESULT.md). Fresh replacement and honest-control evidence are linked from [the matrix](MODEL-TEST-MATRIX.md).
- **What happened:** Terra returned REVISE for the planted unsupported five-second promise and APPROVE for the honest control. It made no false blocking finding. It briefly tried a nonexistent `00-brief.md` path in the planted run and an incorrect citation location in the honest run, then corrected both from disk before writing the reviews.
- **Verdict:** PAIR PASS — capability 1/1, temperament 1/1. Operational path recovery remains visible rather than being collapsed into the verdict.

## 2026-07-18 — Luna medium reviewer pair

- **Variant:** `gpt-5.6-luna`.
- **Effort:** Medium.
- **What:** The identical sealed planted-hard-number and honest-control fixture pair.
- **How:** Ran each copied project in a separate fresh Codex task with the same prompt and evidence boundary as Sol and Terra. Evidence is linked from [the matrix](MODEL-TEST-MATRIX.md).
- **What happened:** Luna returned REVISE for the plant and APPROVE for the honest control, with no false blocking finding. Its first planted-review edit retained generated template guidance; `koda status` named and refused the incomplete review, and Luna corrected it before reporting. In the honest run it first looked for root `state.json`, then followed disk discovery to the real session state.
- **Verdict:** PAIR PASS — capability 1/1, temperament 1/1. The planted run also demonstrates that the mechanical gate catches a reviewer artifact defect even when the model's final judgment is correct.

## Medium baseline comparison

Sol, Terra, and Luna each score 2/2 on this bounded fixture pair at medium effort. That result is not evidence that their review processes were identical: preserved event streams show Sol completing more directly, Terra recovering from citation/path resolution errors, and Luna relying once on Koda's incomplete-template refusal before producing valid review evidence. Broader capability claims require more defect classes; effort-sensitivity claims require paired runs at another effort.

## 2026-07-18 — Medium model matrix consistency run

- **Variant:** Not applicable; deterministic Node.js validation of model-run evidence.
- **Effort:** Not applicable.
- **What:** Cross-check the six PASS cells in `MODEL-TEST-MATRIX.md` against the exact graded Sol, Terra, and Luna run folders.
- **How:** Added a test requiring each recorded result to name the pinned model, medium effort, PASS status, and expected verdict, while requiring the matrix's three medium rows to report 2/2 and retain the Terra infrastructure failure. Ran `npm run test:record -- 2026-07-18-medium-model-baseline-final`; every result is preserved in [the per-test transcript](test-results/2026-07-18-medium-model-baseline-final.md).
- **What happened:** All 71 checks passed, including the installed package, full lifecycle scenarios, GPLv3 validation, gate mutations, and matrix-to-folder consistency.
- **Verdict:** PASS. The overview is now mechanically tied to the six graded medium runs instead of being an unsupported summary.

## 2026-07-18 — Discriminating fixture expansion, first deterministic run

- **Variant:** Not applicable; Node.js test runner.
- **Effort:** Not applicable.
- **What:** Three new sealed reviewer fixtures—an inference-chain plant, a tempting honest control, and a missing-evidence trap—plus independent CATCH and VERDICT scoring for every run.
- **How:** Added executable fixture-integrity checks and ran `npm test` before recording a final result.
- **What happened:** 73 of 74 checks passed. The missing-evidence fixture's actual three tests exited successfully, but the parent Node test process received no child TAP stdout and a test-only assertion expected `# pass 3`. The fixture plant itself remained intact: its claimed `evidence/test-output.txt` was still absent.
- **Verdict:** TEST-HARNESS DEFECT. Keep the successful child exit assertion, count the three declared deterministic tests directly, and remove only the environment-dependent TAP-rendering assertion. Do not add the missing transcript or weaken the planted absence.

## 2026-07-18 — Discriminating fixture expansion, corrected run

- **Variant:** Not applicable; Node.js test runner.
- **Effort:** Not applicable.
- **What:** The complete repository with five blind reviewer fixtures, versioned sealed scoring metadata, and every existing run migrated to separate CATCH, VERDICT, and secondary execution observations.
- **How:** Kept the missing-evidence child test process's successful exit assertion, added a direct count of its three declared checks, removed only the environment-dependent TAP-rendering check, and ran `npm run test:record -- 2026-07-18-discriminating-fixtures-final`. Every named result is preserved in [the per-test transcript](test-results/2026-07-18-discriminating-fixtures-final.md).
- **What happened:** All 74 checks passed. The inference fixture mechanically requires the title and row-count omission to be derived across the dataset, envelope, and pipeline files. The tempting honest fixture proves its three bounded behaviors despite deliberate style temptations. The absence fixture proves its code/tests pass while the exact transcript claimed by the artifact remains absent.
- **Verdict:** PASS. A blocking verdict with a vague rationale can no longer score as a catch, and operational recovery notes remain outside both score axes.

## 2026-07-18 — Persistent full-relay runner, first deterministic run

- **Variant:** Not applicable; Node.js test runner and local Git preparation fixture. No model was called.
- **Effort:** Not applicable.
- **What:** Preparation and static execution contracts for a resumable six-phase relay using distinct persistent producer/reviewer thread IDs, real owner receipt prompts, pre-close output push, and restorable close evidence.
- **How:** Ran `npm test` after adding the runner, package commands, protocol, and two deterministic relay checks.
- **What happened:** 75 of 77 checks passed. Real preparation copied two ignored source residues—`.DS_Store` and an otherwise empty legacy `peer-reviewer/` directory—because it recursively copied the entire `.agents/skills` parent instead of the declared nine packages. The second failure was a test-only wording mismatch: the protocol's exact limitation used Markdown emphasis around `not`, while the assertion expected unformatted text.
- **Verdict:** PACKAGING DEFECT AND ASSERTION DEFECT. Copy only the explicit nine-skill allowlist so ignored filesystem residue cannot enter a prepared project. Preserve the emphasized limitation and correct the assertion to its actual exact wording; do not accept an eleventh skill or weaken the runtime boundary.

## 2026-07-18 — Persistent full-relay runner, corrected deterministic run

- **Variant:** Not applicable; Node.js test runner and local Git preparation fixture. No model was called.
- **Effort:** Not applicable.
- **What:** The complete repository after constraining relay preparation to the declared nine skills and retaining the explicit interactive-reviewer boundary.
- **How:** Replaced recursive parent-folder copying with a nine-name skill allowlist, corrected only the Markdown-aware boundary assertion, and ran `npm run test:record -- 2026-07-18-persistent-relay-runner-final`. Every named result is preserved in [the per-test transcript](test-results/2026-07-18-persistent-relay-runner-final.md).
- **What happened:** All 77 checks passed. A real temporary preparation produced a clean project, exactly nine skills, an initial commit, a configured upstream, and zero unpushed commits. Static execution contracts require persistent thread resume, distinct role IDs, closed model stdin, interactive Kristian approval, disk gate/close evaluation, pre-close output commit, verified Git bundle capture, and cleanup of only nested runtime Git.
- **Verdict:** PASS. The harness is ready for a genuine owner-acknowledged run; this deterministic result does not claim that such a model-driven run has happened.

## 2026-07-18 — First-time Ghostty guide validation

- **Variant:** Not applicable; Node.js test runner. No model was called.
- **Effort:** Not applicable.
- **What:** Kristian's exact two-window procedure for the prepared full relay, including the distinction between the supervised reviewer context and window B's current role as a review-reading surface.
- **How:** Added `docs/GHOSTTY-TEST-GUIDE.md`, linked it from the relay protocol and README, added plain-language baseline interpretation to the model matrix, and required the guide to preserve the exact execution command, chat receipt prohibition, resume rule, and `RELAY COMPLETE` evidence. Ran `npm run test:record -- 2026-07-18-ghostty-guide-final`; every named result is preserved in [the per-test transcript](test-results/2026-07-18-ghostty-guide-final.md).
- **What happened:** All 77 checks passed. The prepared run remains `PREPARED — NOT RUN`; its folder is deliberately excluded from this documentation commit until Kristian completes the relay.
- **Verdict:** PASS. The instructions no longer imply that the second Ghostty window is already an interactive reviewer interface.

## 2026-07-18 — Complete Ghostty command-sheet validation

- **Variant:** Not applicable; Node.js test runner. No model was called.
- **Effort:** Not applicable.
- **What:** A literal copy-and-paste command sheet covering Window A execution, Window B review discovery and full reading, exact receipt copying, pause inspection, resume, and completion evidence.
- **How:** Required every command and the receipt-safety boundary from `docs/GHOSTTY-TEST-GUIDE.md`, then ran `npm run test:record -- 2026-07-18-ghostty-command-sheet-final`. Every named result is preserved in [the per-test transcript](test-results/2026-07-18-ghostty-command-sheet-final.md).
- **What happened:** All 77 checks passed. The command sheet keeps receipt discovery in Kristian's reading window and never sends a receipt through model chat.
- **Verdict:** PASS. The prepared relay has a complete operator procedure with no implied terminal commands omitted.

## 2026-07-18 — First genuine persistent-relay attempt

- **Variant:** Producer `gpt-5.6-sol` at medium effort; reviewer `gpt-5.6-terra` at medium effort was not reached.
- **Effort:** Medium for the one producer context used.
- **What:** The prepared six-phase relay in Ghostty, using the real persistent producer context and owner-visible supervisor.
- **How:** Kristian ran `npm run relay:execute -- docs/relay-runs/2026-07-18-software-clean-sol-medium-terra-medium-01`. The supervisor saved every event stream, stderr file, thread ID, session artifact, and pause reason in that run folder.
- **What happened:** Producer turn 1 opened session `2026-07-18-01`. Producer turn 2 resumed the same thread but Codex rejected its brief edit because the resumed non-interactive invocation had fallen back to a read-only sandbox. No brief and no consultation request were written, so the supervisor refused to guess and paused with the missing-artifact condition named. The reviewer never ran.
- **Verdict:** RUNNER DEFECT; RELAY NOT COMPLETE. Preserve the session and persistent producer thread, explicitly bind `workspace-write` to resumed turns, then continue the same run. This is not a model-quality result and must not enter the reviewer matrix.

## 2026-07-18 — Persistent-relay resume permission correction

- **Variant:** Not applicable; deterministic Node.js and local Git tests. No model was called.
- **Effort:** Not applicable.
- **What:** Regression protection for identical least-privilege write access on initial and resumed Codex relay turns.
- **How:** Added the per-invocation Codex configuration override `sandbox_mode="workspace-write"` to the argument list shared by both branches, required the resume branch to consume that shared list, documented the recovery invariant, and ran `npm run test:record -- 2026-07-18-relay-resume-sandbox-final`. Every named result is preserved in [the per-test transcript](test-results/2026-07-18-relay-resume-sandbox-final.md).
- **What happened:** All 77 checks passed. The saved run remains paused and unchanged apart from its already-recorded evidence; rerunning its exact execute command will resume the same producer thread from current disk state.
- **Verdict:** PASS. The concrete first-run failure now has a tested correction, without broadening the model sandbox to `danger-full-access` or weakening any gate or mutation test.

## 2026-07-18 — First live owner acknowledgement UX finding

- **Variant:** Live Sol/medium producer and Terra/medium reviewer relay; operator interaction by Kristian.
- **Effort:** Medium for both model contexts.
- **What:** Kristian's first Brief review acknowledgement using the documented multi-command Window B procedure.
- **How:** Kristian found and opened the complete review, read its APPROVE verdict and findings, then manually pasted the exact receipt into Window A. The gate accepted it and automatically activated Orient.
- **What happened:** The gate and two-context relay behaved correctly, but the five-command owner procedure did not. Ambiguous instructions caused Kristian to expose the receipt once in the separate build-support chat while asking what to paste. That chat did not enter the producer context, reviewer context, run transcript, or approval ledger; Kristian still entered the receipt himself after reading. The incident nevertheless violates the intended operator boundary and is preserved as a usability failure.
- **Verdict:** OWNER INTERFACE REVISE; GATE PASS. Replace review discovery, opening, unchanged-file verification, and clipboard copying with one owner-facing command. Keep manual paste into Koda and never claim that a machine proved comprehension.

## 2026-07-18 — One-command owner review, guarded validation attempts

- **Variant:** Not applicable; deterministic Node.js test runner and a temporary prepared relay. No model was called.
- **Effort:** Not applicable.
- **What:** `npm run relay:review`, which finds the single waiting run, derives its active session/phase from disk, opens the complete review, detects changes during reading, and copies—but never prints—the exact receipt.
- **How:** The temporary execution test opened a planted review through a noninteractive test pager, required the exact receipt in a test clipboard, and required stdout not to contain `RECEIPT:`. The first unrecorded `npm test` run passed 76/77 because the rewritten guide had softened the exact “Never paste” prohibition. After restoring it, `npm run test:record -- 2026-07-18-one-command-owner-review-final` again passed 76/77 because the shorter guide had omitted the exact “Do not run `relay:prepare` again” recovery prohibition. Every named result from the recorded failure remains in [the failed per-test transcript](test-results/2026-07-18-one-command-owner-review-final.md).
- **What happened:** Both failures were safety-copy regressions caught by the existing test, not gate failures. Neither assertion was removed or weakened; both exact prohibitions were restored.
- **Verdict:** DOCUMENTATION REVISE. Retain the simpler interaction while preserving every prior safety boundary verbatim.

## 2026-07-18 — One-command owner review, corrected validation

- **Variant:** Not applicable; deterministic Node.js test runner and a temporary prepared relay. No model was called.
- **Effort:** Not applicable.
- **What:** The corrected one-command owner reader, single-session identity documentation, and explicit current-versus-future two-window boundary.
- **How:** Ran `npm run test:record -- 2026-07-18-one-command-owner-review-corrected`; every named result is preserved in [the corrected per-test transcript](test-results/2026-07-18-one-command-owner-review-corrected.md).
- **What happened:** All 77 checks passed. The executable helper finds exactly one `AWAITING_OWNER_RECEIPT` run, derives its current review from `RUN.json` and `state.json`, refuses zero or multiple waiters, verifies the review hash is unchanged after reading, copies the receipt without printing it, and leaves the actual Koda acknowledgement manual. The complete mutation, adversarial-receipt, status-truth, stale-review, package, and close suites remain intact.
- **Verdict:** PASS. Window B now requires one stable command for every phase while the guide states honestly that the mature owner-facing reviewer conversation is still future work.

## 2026-07-18 — Persistent side-by-side runtime ruling

- **Variant:** Not applicable; owner product ruling plus deterministic regression suite. No model was called for this validation.
- **Effort:** Not applicable.
- **What:** Clarify that one persistent producer context and one separate persistent reviewer context span the entire visible session; producer progress is observable but owner input is closed, while the reviewer is the sole conversational interface.
- **How:** Updated root guidance, README, project contract, backlog, and the dated runtime design. Explicitly removed the prior suggestion that either context might normally be replaced at phase handoffs, distinguished exposed progress from hidden chain-of-thought, and ran `npm run test:record -- 2026-07-18-persistent-side-by-side-runtime-ruling`. Every named result is preserved in [the per-test transcript](test-results/2026-07-18-persistent-side-by-side-runtime-ruling.md).
- **What happened:** All 77 checks passed. Fresh reviewer contexts remain useful for blind fixtures, but are not the ruled in-session experience. The current harness still proves only two persistent backend contexts behind a supervisor, not the future side-by-side interactive surface.
- **Verdict:** PASS. Independent review is now defined as producer/reviewer context separation, not per-phase reviewer replacement, without changing any mechanical gate condition.

## 2026-07-18 — First genuine relay close attempt

- **Variant:** Producer `gpt-5.6-sol` at medium effort in the active persistent relay.
- **Effort:** Medium.
- **What:** Immutable close after all six phases advanced, including one unplanned Summary REVISE loop and seven genuine owner acknowledgements.
- **How:** The relay supervisor committed and pushed every produced output before resuming the producer with `koda-c-close`. The producer prepared `close.md`, recomputed and matched its session binding, then attempted Koda's exact Git staging command.
- **What happened:** Codex's least-privilege `workspace-write` sandbox denied creation of `.git/index.lock`. The producer correctly reported the permission boundary, verified that no lock, staged change, or commit remained, and left only the immutable untracked `close.md`. Koda reported `PHASES COMPLETE — SESSION NOT CLOSED`; the supervisor preserved the pause as `PAUSED_ERROR` rather than claiming completion.
- **Verdict:** SUPERVISOR RESPONSIBILITY DEFECT; CLOSE GATE PASS. The model must not receive broad filesystem access merely to mutate repository metadata. Keep close preparation and final verification in the same producer context, but assign the exact intervening Git commit and push to the trusted relay supervisor.

## 2026-07-18 — Supervised immutable-close recovery validation

- **Variant:** Not applicable; deterministic Node.js, package, mutation, status, and local-Git suite. No model was called.
- **Effort:** Not applicable.
- **What:** A resumable three-part close: persistent producer prepares and validates immutable `close.md`; trusted supervisor commits and pushes exactly the session path; the same producer context resumes and independently verifies close and status.
- **How:** Added supervised mode to `koda-c-close`, required the runner to refuse any preparation change other than the one untracked `close.md`, stage the exact session path, use an honest session-close commit, push, require both Koda close/status checks, and resume the saved producer thread for verification. Ran `npm run test:record -- 2026-07-18-supervised-close-recovery-final`; every named result is preserved in [the per-test transcript](test-results/2026-07-18-supervised-close-recovery-final.md).
- **What happened:** All 77 checks passed. The gate, receipt adversarial, stale-review, disk-truth, printed-command, package, skill, and Git-close tests remain intact. The active relay is still paused with its original immutable close artifact; the correction has not yet been credited as live success.
- **Verdict:** PASS FOR RECOVERY IMPLEMENTATION; LIVE CLOSE PENDING. Resume the same run only after this correction is committed and pushed, then accept success solely if the same session reaches `RELAY COMPLETE` with verified Git evidence.

## 2026-07-18 — First genuine persistent relay, completed result

- **Variant:** Persistent producer `gpt-5.6-sol` medium; separate persistent reviewer `gpt-5.6-terra` medium.
- **Effort:** Medium for both contexts.
- **What:** One real software session through Session → Brief → Orient → Plan → Produce → Live → Summary → immutable close, with Kristian acknowledging every formal review.
- **How:** Ran the resumable Ghostty supervisor against `software-clean`. Both roles kept one distinct thread ID for the entire session and conversational stdin remained closed for model subprocesses. Every event stream, stderr file, artifact, review, approval, advancement, live result, pause, recovery, close record, Git log, and verified history bundle is preserved under [the completed relay folder](relay-runs/2026-07-18-software-clean-sol-medium-terra-medium-01/RESULT.md).
- **What happened:** Brief through Live received APPROVE. The first Summary made one unsupported Git-state assertion; Terra found it without a planted defect and returned REVISE. Kristian acknowledged it, Koda kept the gate shut, Sol corrected the Summary, and Terra approved the fresh artifact. Seven genuine acknowledgements produced six advancements. Two harness defects remained visible and recoverable: resumed turns initially fell back to read-only, and the model sandbox could not write `.git` during close. After narrow supervisor fixes, the same producer/reviewer contexts continued. Final Koda status was `SESSION CLOSED`; local and remote heads matched pushed commit `bbcb5cf097e88db5ab95d8065f43c116eb926690`, ahead count was zero, project status was clean, and `git bundle verify` reported complete history.
- **Secondary observation:** The prepared snapshot contains one committed `.DS_Store` inside the copied Brief skill. It did not affect discovery or execution, but it is unnecessary source residue. The completed evidence remains immutable; future preparation now filters macOS metadata, gives each nested project its own `.DS_Store` ignore rule, and tests both protections.
- **Owner-interface observation:** The initial multi-command review instructions caused one receipt to be exposed in the separate build-support chat while Kristian asked for help. It never entered either relay model context or the repository transcript. The replacement `npm run relay:review` reduced all later owner review cycles to one stable command.
- **Verdict:** LIVE RELAY PASS. This proves a resumable backend relay between two persistent independent contexts and a real pushed close. It does not yet prove the future visible producer pane, interactive reviewer conversation, notifications, or unattended daemon.

## 2026-07-18 — Completed relay evidence regression and restoration

- **Variant:** Not applicable; deterministic repository and restored-bundle validation. No model was called.
- **Effort:** Not applicable.
- **What:** Bind the genuine completed relay into the permanent suite and independently restore its nested Git history.
- **How:** Added a test requiring COMPLETE status, distinct thread IDs, 11 producer and 7 reviewer turns, six configured advancements, seven ledger acknowledgements, the archived Summary REVISE, immutable close metadata, matching local/remote final commit, zero ahead count, clean project status, `SESSION CLOSED`, absent nested runtime metadata, and a verifiable complete-history bundle. Ran `npm run test:record -- 2026-07-18-genuine-relay-evidence-final`; every named result is preserved in [the per-test transcript](test-results/2026-07-18-genuine-relay-evidence-final.md). Then cloned `PROJECT-HISTORY.bundle` into a fresh temporary directory and ran the restored project's real test suite.
- **What happened:** All 78 Koda-C checks passed. The restored history contained exactly the initial fixture commit, pre-close output commit, and final close commit at the recorded head; its working tree was clean and all five restored word-count tests passed.
- **Verdict:** PASS. The completed relay is now executable, internally checked repository evidence rather than a prose claim or an opaque transcript archive.

## 2026-07-18 — Bounded reviewer model program, final result

- **Variant:** Fresh ephemeral `gpt-5.6-sol`, `gpt-5.6-terra`, and `gpt-5.6-luna` reviewer contexts.
- **Effort:** Medium for every run.
- **What:** Two additional Luna hard-number repetitions, followed by the sealed inference-chain, tempting-honest, and missing-evidence fixtures on all three models. CATCH and VERDICT remained separately scored from execution behavior.
- **Contract:** The three new fixture contracts were committed in `b4434e4` before their first run. A low-effort inference confirmation was permitted only for one clear medium winner.
- **How:** Ran each model in a fresh ephemeral Codex context with pinned model and effort, graded only after its disk review existed, then ran `npm run test:record -- 2026-07-18-bounded-reviewer-model-program-final`. All 78 named repository results are preserved in [the passing integrity transcript](test-results/2026-07-18-bounded-reviewer-model-program-final.md).

| Model | Fixture | Verdict | CATCH | VERDICT | Secondary execution observation | Evidence |
|---|---|---|---|---|---|---|
| Luna | hard number — repeat 2 | REVISE | PASS | PASS | Direct; no gate repair | [Result](reviewer-runs/2026-07-18-planted-hard-number-luna-medium-02/RESULT.md) |
| Luna | hard number — repeat 3 | REVISE | PASS | PASS | Gate refused retained template guidance; repaired | [Result](reviewer-runs/2026-07-18-planted-hard-number-luna-medium-03/RESULT.md) |
| Sol | inference chain | REVISE | PASS | PASS | Direct three-file deduction | [Result](reviewer-runs/2026-07-18-inference-chain-plant-sol-medium-01/RESULT.md) |
| Terra | inference chain | REVISE | PASS | PASS | Direct three-file deduction | [Result](reviewer-runs/2026-07-18-inference-chain-plant-terra-medium-01/RESULT.md) |
| Luna | inference chain | REVISE | PASS | PASS | Direct three-file deduction | [Result](reviewer-runs/2026-07-18-inference-chain-plant-luna-medium-01/RESULT.md) |
| Sol | tempting honest | APPROVE | N/A | PASS | Reran safe check; style stayed non-blocking | [Result](reviewer-runs/2026-07-18-tempting-honest-sol-medium-01/RESULT.md) |
| Terra | tempting honest | APPROVE | N/A | PASS | Corrected phase path; reran safe check | [Result](reviewer-runs/2026-07-18-tempting-honest-terra-medium-01/RESULT.md) |
| Luna | tempting honest | APPROVE | N/A | PASS | Gate repair; safe check not rerun | [Result](reviewer-runs/2026-07-18-tempting-honest-luna-medium-01/RESULT.md) |
| Sol | missing evidence | REVISE | PASS | PASS | Fresh tests passed but did not replace absent transcript | [Result](reviewer-runs/2026-07-18-missing-evidence-sol-medium-01/RESULT.md) |
| Terra | missing evidence | REVISE | PASS | PASS | Fresh tests passed but did not replace absent transcript | [Result](reviewer-runs/2026-07-18-missing-evidence-terra-medium-01/RESULT.md) |
| Luna | missing evidence | REVISE | PASS | PASS | Corrected state path; safe test not rerun | [Result](reviewer-runs/2026-07-18-missing-evidence-luna-medium-01/RESULT.md) |

- **What happened:** All eleven fresh runs passed their sealed score contracts. All three models made the complete three-file inference, approved the imperfect-but-correct control, and blocked the unsupported missing-transcript claim. The inference result was a three-way tie, so the conditional low-effort run was correctly skipped and model testing stopped. Including the original Luna plant run, two of three Luna hard-number repetitions required the gate to reject retained template guidance. Sol was operationally direct across all new fixtures; Terra made one recoverable phase-path error; Luna also skipped two safe cited checks.
- **Preparation failure preserved:** Two Luna repetitions were initially prepared concurrently. Both calculated sequence `02`; one created it and the other refused with `EEXIST`. No model ran in the failed attempt and no run evidence was overwritten. This is a real serialization limitation for future multi-window orchestration, not a model score.
- **Test realism boundary:** The gate mutations are direct product tests, while the reviewer fixtures are controlled capability probes. The projects remain small and signposted, and the genuine relay task was deliberately tiny. The full boundary and later real-project validation need are recorded in [the final owner-readable report](test-results/2026-07-18-bounded-reviewer-model-program.md).
- **Verdict:** PASS FOR THE SEALED PROGRAM; NO MODEL SCORE WINNER. The strongest bounded conclusion is that all three medium models met the evidence-judgment contracts, while Sol was the most operationally consistent in this small sample. Do not generalize this to production-scale reviewer reliability.

## 2026-07-18 — Fresh Codex startup skill and guidance discovery

- **Variant:** Fresh ephemeral `gpt-5.6-sol` task with user configuration ignored.
- **Effort:** Low.
- **What:** Prove that root `AGENTS.md` and all nine repository-local Koda-C skills enter a genuinely fresh Codex task through startup discovery rather than being found by a task-time directory search.
- **How:** Launched Codex read-only with a prompt that named no expected skill, no expected count, and no expected guidance text. The prompt prohibited every tool call and repository file read and asked only for startup-provided `koda-c-` skills plus one skill-location rule. Preserved the raw response, run metadata, and stderr under [the discovery result](discovery-runs/2026-07-18-fresh-codex-startup-01/RESULT.md), then ran `npm run test:record -- 2026-07-18-fresh-skill-discovery-final`; all 79 named results are in [the integrity transcript](test-results/2026-07-18-fresh-skill-discovery-final.md).
- **What happened:** The task reported exactly `koda-c-session`, the six phase skills, `koda-c-review`, and `koda-c-close`—nine total—and repeated the root guidance that local skills belong under `.agents/skills/` and must not be installed globally. The event stream contains one model answer and no command, file-read, or file-change events. Codex CLI emitted its recurring model-cache schema warning, which remains preserved in stderr and did not affect the successful turn.
- **Verdict:** PASS. Repository-local skill discovery and root guidance injection are now proved in a fresh context and permanently regression-checked from saved evidence.

## 2026-07-18 — Fresh-checkout local npx attempt and executable correction

- **Variant:** Not applicable; public Git checkout, local npm packaging, and deterministic Node.js tests. No model was called.
- **Effort:** Not applicable.
- **What:** Prove the README's exact `npx --yes . --help` command from a new shallow checkout with no hidden setup and no working-tree mutation.
- **How:** Cloned pushed commit `4d0b959b83d87abe133edbdb9714bcc42b405b8b` from GitHub into `/tmp`, ran the command under Node `v26.0.0`, then inspected every tracked/untracked change. Preserved the command and status output under [the package run](package-runs/2026-07-18-fresh-checkout-npx-01/RESULT.md). Corrected the build to set the package binary executable, added pre-npm and post-local-npx mutation checks, and ran `npm run test:record -- 2026-07-18-clean-local-npx-final`; all 81 results are preserved in [the local correction transcript](test-results/2026-07-18-clean-local-npx-final.md).
- **What happened:** Help printed successfully, but the first checkout became dirty because npm changed `dist/cli.js` from mode `100644` to `100755`. This is a packaging failure, not a pass with a cosmetic caveat. The corrected local suite passes 81/81 and now catches both a non-executable source binary and mutation by the documented command.
- **Verdict:** REVISE PENDING PUBLIC RE-CHECK. Commit and push the executable correction, then repeat the same command from another shallow public checkout and require an empty `git status` before changing this result to PASS.

## 2026-07-18 — Corrected public fresh-checkout npx proof

- **Variant:** Not applicable; fresh public Git checkout and npm. No model was called.
- **Effort:** Not applicable.
- **What:** Repeat the failed public-checkout proof only after the executable correction exists on the pushed branch.
- **How:** Cloned public commit `6ed7d4470c51119bfd3ec341d404b006c15a5085` into a second new `/tmp` directory, verified the initial binary mode was `0755`, ran the exact README command `npx --yes . --help`, then required empty short status plus successful unstaged and staged `git diff --exit-code` checks. Raw outputs and the initial restricted-cache detour are preserved in [the completed package run](package-runs/2026-07-18-fresh-checkout-npx-01/RESULT.md).
- **What happened:** Koda printed its complete help and the public checkout remained byte- and mode-clean. The desktop sandbox first denied access to npm's normal user cache before Koda executed; that non-product attempt left the checkout clean and was rerun unchanged with normal cache access.
- **Verdict:** PASS AFTER PRESERVED REVISE. A fresh public checkout now runs the one-line local command without dependency setup or repository mutation.

## 2026-07-18 — Local package and runtime safety audit

- **Variant:** Not applicable; deterministic Node.js, filesystem, Git, npm-package, and static secret-signature checks. No model was called.
- **Effort:** Not applicable.
- **What:** Audit whether Koda is safe to place on another computer, covering package lifecycle hooks and dependencies, write/destructive call sites, project/session containment, symbolic links, corrupted state paths, immutable-close Git completeness, relay path trust, committed credentials, and current concurrency limits.
- **How:** Inspected every source and harness subprocess/destructive call, ran `npm pack --dry-run --json`, searched tracked text for common live credential signatures, and planted one mutation per newly enforced condition. The audit narrative and honest limits are in [SECURITY.md](SECURITY.md) and [the dated result](security-runs/2026-07-18-local-audit-01/RESULT.md). Ran `npm run test:record -- 2026-07-18-security-hardening-final`; every named result is preserved in [the test transcript](test-results/2026-07-18-security-hardening-final.md).
- **What happened:** All 93 checks passed. The audit first found and corrected two material integrity gaps: an ignored session file could be bound locally without being tracked/pushed, and symlink/path-like evidence could escape its declared plain-file location. Koda now requires every close-bound file to be regular and tracked, revalidates disk phase names, constrains session/relay/reviewer real paths, refuses duplicate generated markers, atomically owns prepared relay folders, and cleans failed atomic-write residue. The package remains dependency-free with no install hook; no tracked symlink or common credential signature was found.
- **Verdict:** PASS WITH DOCUMENTED BOUNDARIES. The core makes no network call or automatic Git mutation. Same-user forgery, prompt injection, clipboard visibility, inherited model-launch environment, Git hooks, and the absence of a project-wide concurrent mutation lock remain explicit non-claims rather than hidden passes.

## 2026-07-18 — Live-rules judge journey and recording package

- **Variant:** Not applicable; deterministic binary, documentation-contract, and link validation. No model was called.
- **Effort:** Not applicable.
- **What:** Turn the working repository into a judge- and owner-runnable submission path: zero-build first command, one-minute refusal demo, under-three-minute Ghostty narration, live-rules checklist, text-description draft, supported-platform statement, and explicit remaining external actions.
- **How:** Verified the 2026-07-18 live [OpenAI Build Week page](https://openai.com/build-week/) and [official Devpost rules](https://openai.devpost.com/rules), then encoded the requirements in [SUBMISSION-CHECKLIST.md](SUBMISSION-CHECKLIST.md) and [VIDEO-SCRIPT.md](VIDEO-SCRIPT.md). Added permanent checks that execute the committed `dist` binary, require the deadline/category/video/audio/YouTube/repository-collaboration/`/feedback` fields, and resolve every local link in the judge documents. The first recorded run is preserved in [the failed transcript](test-results/2026-07-18-judge-journey-final.md); the corrected rerun is preserved in [the 96-check transcript](test-results/2026-07-18-judge-journey-corrected.md).
- **What happened:** The first run passed 95/96. Its only failure was deliberately useful: README linked to the result file that the recorder creates only after tests complete, so the link checker refused the nonexistent future evidence. No assertion changed. After the failed transcript existed, the identical suite passed 96/96; README now points to that corrected transcript. The remaining unchecked work is genuinely external: Kristian must choose or confirm the category, run `/feedback` in the primary build task, rehearse and record, upload the public YouTube video, complete the Devpost form, freeze/tag the referenced commit, and submit before the buffer target.
- **Verdict:** PASS AFTER PRESERVED DOCUMENTATION REVISE; SUBMISSION NOT YET CLAIMED. The files distinguish a ready entry from a submitted entry and preserve the official-rules links as the final authority.

## 2026-07-18 — First two-window owner-facing runtime slice

- **Variant:** Deterministic Node.js protocol and fake-Codex integration; no live model was called.
- **Effort:** Not applicable.
- **What:** Move the relay from two hidden contexts behind one supervisor toward the ruled side-by-side product: Window A streams and waits on an atomic reviewer job; Window B owns one persistent reviewer context, automatically receives work, shows receipt-redacted progress, handles in-phase owner rulings, opens the complete formal review, and records Kristian's exact quote through Koda in that same window.
- **How:** Added bounded `REVIEWER-JOB.json` and separate reviewer state, a single-process Window B lock, exact run discovery, persistent context/turn checks, atomic status transitions, formal/repair/fresh/consultation/acknowledgement job kinds, readable Codex-event rendering, symlink and escaped-path refusal, and `relay:producer` / `relay:reviewer` commands. Ran one fake persistent reviewer integration and one wrong-receipt mutation without calling a model. Every final named result is preserved in [the 101-check transcript](test-results/2026-07-18-two-window-runtime-final.md); both development failures are preserved in [the failure record](test-results/2026-07-18-two-window-development-failures.md).
- **What happened:** The first new full run failed 98/100 because the valid and invalid process exit expectations were reversed in the test; product behavior was correct. A later focused run failed 7/8 because a historical documentation assertion still required the now-superseded “Window B is only a reader” boundary. Only those incorrect expectations changed. The corrected final suite passed 101/101. A wrong quote exits nonzero, writes no ledger entry, and preserves a named failed job. A pending formal job wakes one persistent reviewer context, writes the review, redacts its receipt from readable progress, and returns acknowledged disk evidence.
- **Security boundary:** The owner quote remains explicit and attributable but not cryptographically unforgeable against a same-user writer. Reviewer job/state symlinks refuse. Raw reviewer events may contain the generated receipt because the reviewer creates the review containing it; Kristian's acknowledgement input is never submitted as a model message.
- **Verdict:** DETERMINISTIC SLICE PASS; LIVE TWO-WINDOW RUN PENDING. Do not claim free-form owner/reviewer discussion, general project launch, Guide initiation, or guided mid-turn abort recovery yet.

## 2026-07-18 — Separate-process two-window rendezvous through pushed close

- **Variant:** Deterministic fake producer and reviewer contexts in two separate Node.js processes; no live model was called.
- **Effort:** Not applicable.
- **What:** Exercise the real Window A/Window B rendezvous rather than creating and consuming each job in isolation: discover one shared run, preserve distinct context IDs, open the session, produce Brief, post and consume the formal-review job, record the exact receipt, advance, commit and push output, prepare immutable close, commit and push close, and let both windows end from the same `COMPLETE` state.
- **How:** Reduced only the temporary scenario's config to one phase, then ran `execute-relay-run.ts --reviewer-window` and `run-relay-reviewer-window.ts` concurrently against the same temporary run. The fake role executable responded to the real supervisor prompts and used the real Koda CLI, filesystem, gate, approval ledger, Git remote, close binding, and finalization code. No gate or close check was stubbed. Full development failures are preserved in [the failure record](test-results/2026-07-18-two-window-development-failures.md).
- **What happened:** The first attempt timed out because the fake actor matched a display label that was not present in the actual session prompt. Saved stderr named that mismatch. A later attempt found the same fake-prompt mistake at close. After correcting only the test actor, the focused rendezvous passed in 3.08 seconds. The first recorded full run then passed 101/102 because README linked its not-yet-created transcript; that failed transcript remains [on disk](test-results/2026-07-18-two-window-rendezvous-final.md). The unchanged suite then passed 102/102 in [the corrected named transcript](test-results/2026-07-18-two-window-rendezvous-corrected.md).
- **Post-push verification:** After the complete slice was committed and pushed at `84a31fb`, the full suite passed 102/102 again with that commit recorded as its base. Every named result is in [the pushed-milestone transcript](test-results/2026-07-18-two-window-pushed-final.md).
- **Verdict:** DETERMINISTIC TWO-PROCESS PASS; LIVE MODEL RUN PENDING. Automatic wake-up, exact owner proof, phase route, and pushed close now work together under simulation. Do not promote the runtime to live-proved until Kristian can run a genuine full session in the two windows.

## 2026-07-18 — Read-only relay status and explicit stale-lock recovery

- **Variant:** Deterministic Node.js, process-liveness, plain-file, and temporary-run tests; no model was called.
- **Effort:** Not applicable.
- **What:** Give a non-technical owner one truthful command for current relay state and a safe recovery path when Window B is killed without cleaning its lock.
- **How:** Added `npm run relay:status`, derived from current `RUN.json`, Koda session state, reviewer state, reviewer job, and lock owner. Added explicit `npm run relay:reviewer -- --recover-stale-lock`, which checks the recorded PID before removing only the exact run lock. Tested prepared state, stale process, live duplicate lock, active-producer hint safety, corrupt run metadata, and multiple unfinished runs.
- **What happened:** All 106 checks passed from pushed base commit `53bd638`; every named result is preserved in [the status/recovery transcript](test-results/2026-07-18-relay-status-recovery-final.md). Status prints both role models, context IDs, turn counts, phase, owner acknowledgement count, disk handover, error, and next safe action. It never recommends blindly starting a second producer when disk says Window A is already active. Corrupt or ambiguous state refuses. A live reviewer PID cannot be displaced; a stopped PID requires the explicit recovery flag.
- **Verdict:** PASS. This resolves stale reviewer-window locks and makes current disk state owner-readable. Mid-model-turn retry/replace-context policy remains explicitly unresolved rather than being hidden inside the status command.

## 2026-07-18 — Same-context review explanation and owner-direction refusal

- **Variant:** Deterministic Node.js protocol and fake-Codex integration; no live model was called.
- **Effort:** Not applicable.
- **What:** Let Kristian ask the same persistent Window B reviewer questions about a formal review before acknowledging it, while keeping explanations non-mutating and preventing new owner direction from silently becoming producer input.
- **How:** Added `owner explanation` mode to the one shared reviewer skill, a review-time menu in Window B, same-context explanation turns, review-hash revalidation after every turn, a safe pause, and an exact `OWNER DIRECTION — DISK HANDOFF REQUIRED` refusal. Extended the separate-process rendezvous to require two turns in one reviewer context, and added a mutation proving that actionable direction writes no approval and leaves the producer waiting.
- **Development failure preserved:** The first focused skill run passed 13/14. The system validator rejected the skill because its discovery description was 232 characters, above the 220-character budget. Only the metadata sentence was shortened; the mode contract, safety behavior, and assertions were unchanged. The focused suite then passed 14/14 and the system skill validator passed.
- **What happened:** The complete local suite passed 107/107 before commit. After the feature was pushed at `f68f5d7`, the suite passed 107/107 again; every named result is preserved in [the owner-review discussion transcript](test-results/2026-07-18-owner-review-discussion-final.md). An ordinary explanation returns to the owner decision menu without changing the review. A response marked as new direction leaves the reviewer job `AWAITING_OWNER`, records `OWNER_DIRECTION_HANDOFF_REQUIRED`, exits safely, writes no ledger entry, and never wakes the producer as though the direction were approved work.
- **Verdict:** DETERMINISTIC EXPLANATION SLICE PASS. Arbitrary actionable owner direction still needs its named disk handback mechanism; until that exists, the product deliberately pauses rather than pretending reviewer conversation is producer evidence.

## 2026-07-18 — Bound owner-direction handback relay

- **Variant:** Deterministic Node.js protocol and fake-Codex two-process integration; no live model was called.
- **Effort:** Not applicable.
- **What:** Turn new owner direction from Window B into a confirmed, disk-backed reviewer-to-producer relay without bypassing the review receipt or allowing an otherwise open gate to advance first.
- **How:** Added the [owner-direction handback protocol](OWNER-DIRECTION-HANDBACK.md), protected metadata binding the verbatim owner statement, reviewer relay, artifact hash, review ID, and review hash, plus explicit send/discard choices. Window A gives an acknowledged matching handback priority, requires producer revision and citation, then routes the stale artifact to a fresh formal review. The end-to-end two-process fixture now exercises review → discussion → explicit send → handback → receipt → producer revision → fresh review → fresh receipt → advancement → pushed close.
- **Development failures preserved:** The first focused run passed 6/8. A legitimate handback path was saved while the job completion was still null, but the new validator allowed that path only after final completion; its own error handler then could not persist `FAILED`, leaving Window A waiting until the deterministic timeout. The schema was corrected to permit only this named pre-completion handback state. The next run passed 7/8: the fake producer matched the supervisor's display purpose rather than text actually present in the model prompt, so it returned success without editing the artifact. The product correctly refused the unchanged artifact. Only the fake actor's match was corrected. After owner-facing documentation was updated, the full suite passed 109/110 because a static truth assertion still demanded the superseded claim that arbitrary review discussion was unavailable. It was replaced with checks for the actual remaining boundary—Window B is not yet conversational while the producer is working—and for the newly documented bound handback.
- **Adversarial results:** No explicit send leaves no handback and no approval. A sent handback paired with the wrong receipt remains on disk but is not consumable. Changing the visible owner words or replacing the handback with a symbolic link refuses. An acknowledged valid handback becomes pending only while the artifact and current review still match its bindings; after producer revision it cannot apply twice. `relay:status` re-reads the new evidence class and refuses a malformed handback by name instead of reporting cached run state. A linked `owner-handbacks` parent directory refuses before it can redirect creation outside the active session.
- **What happened:** The complete local suite passed 110/110 before documentation, and the corrected suite passed 110/110 afterward. Adding the status-truth mutation raised the suite to 111/111. After the product was pushed at `2b74fb2`, all 111 checks passed again in [the first owner-direction handback transcript](test-results/2026-07-18-owner-direction-handback-final.md). A post-checkpoint parent-directory threat review added one non-redirection mutation. After that containment fix was pushed at `1393432`, all 112 checks passed in [the final containment transcript](test-results/2026-07-18-owner-handback-containment-final.md). The shared reviewer skill also passed the system validator. No gate, adversarial, or behavior assertion was weakened; one obsolete documentation assertion was updated to the shipped product boundary.
- **Verdict:** DETERMINISTIC OWNER-HANDBACK PASS; LIVE OWNER RUN PENDING. Always-open reviewer conversation while the producer is working remains separate product work.

## 2026-07-18 — Disk-derived role handover summaries

- **Variant:** Deterministic two-process fake-Codex integration; no live model was called.
- **Effort:** Not applicable.
- **What:** Make the visible producer and reviewer panes explain each safe stop consistently without relying on a model to volunteer a useful closing message or claiming access to hidden chain-of-thought.
- **How:** Window A now prints producer artifact path, observed byte count, short content hash, consultation path when paused, and the next controller. Window B prints review path, artifact binding, decision options, acknowledgement or owner-handback outcome, disk evidence path, and the next controller. Every field is derived from the already verified file or job state.
- **What happened:** The strengthened two-process scenario proves both owner-handback and ordinary acknowledgement summaries while retaining the full revision/fresh-review/pushed-close route. The focused relay suite passed 14/14. After the feature was pushed at `45c18be`, the complete suite passed 112/112; every named result is in [the disk-role handover transcript](test-results/2026-07-18-disk-role-handovers-final.md).
- **Verdict:** PASS. These summaries improve observability only; artifacts, receipts, jobs, status, and gates remain the authority.

## 2026-07-18 — Project-level Guide continuity and confirmed session handoff

- **Variant:** Not applicable; deterministic Node.js, filesystem, Git, npm-package, and skill-validation tests. No model was called.
- **Effort:** Not applicable.
- **What:** Add the project layer above bounded Koda sessions: a project-specific steering-file manifest, the repository-local `koda-c-session-prompt` skill, exact owner-confirmed prompt/project/prior-session hashes, immutable cancellation, pushed handover verification, stale/unconfirmed refusal, and launch-to-session binding.
- **How:** Added one-condition Guide mutations for active prior session, changed continuity file, changed prompt, changed manifest, uncommitted launch request, absent confirmation, corrupt launch evidence, and corrupt session-local binding. Exercised real temporary Git remotes for pushed confirmation and cancellation, simulated interruption between session creation and binding, installed the actual npm tarball, validated the new skill with Codex's system validator, and retained every inherited test class. Development runs and corrections are recorded in [the failure record](test-results/2026-07-18-guide-continuity-development-failures.md).
- **Development failures:** The first focused run passed 17/19 because macOS `/tmp` versus `/private/tmp` aliases made valid Guide evidence look outside Git; canonicalizing both sides corrected it without changing an assertion. A later focused run passed 22/23 because a second npm binary made the proven `npx --yes . --help` entry ambiguous; the product returned to one `koda` executable and nested Guide commands beneath `koda guide`, preserving the package test unchanged. After the README moved to the new result, a focused documentation run passed 9/10 because its truth assertion still required the prior literal `112-check transcript`; it was strengthened to require the exact existing 123-check label and path.
- **What happened:** The first complete run passed 122/122 in [the full Guide transcript](test-results/2026-07-18-guide-continuity-final.md). An intermediate binding-directory implementation and documentation correction passed 123/123 in the preserved [security](test-results/2026-07-18-guide-continuity-security-final.md) and [documentation](test-results/2026-07-18-guide-continuity-docs-final.md) transcripts. Pre-commit review then found that Guide-level binding evidence would sit outside the session close commit. The binding moved into `<session>/guide-launch.json`, corruption became status-visible, and `koda guide bind` gained a real interrupted-open recovery test. The current design passed **124/124** in [the binding transcript](test-results/2026-07-18-guide-session-binding-final.md) and again after the exact README assertion changed in [the final documentation transcript](test-results/2026-07-18-guide-session-binding-docs-final.md). The new skill independently reports `Skill is valid!`. The historical fresh-startup proof remains explicitly scoped to the original nine skills; genuinely fresh discovery of the tenth skill is still unrun.
- **Verdict:** DETERMINISTIC GUIDE HANDOFF PASS; VISIBLE GUIDE-LAUNCHED THREE-CONTEXT EXPERIENCE PENDING. The Guide can now bind durable project truth to one confirmed session and Koda refuses stale or unconfirmed launch inputs. Automatically arranging ongoing Guide, persistent Producer, and persistent Reviewer contexts from that binding and returning pushed close evidence to the live Guide remain product work.

### Build-hygiene post-check

The first staged diff check found 149 trailing-space lines where Node's type stripper had blanked type syntax in the two new generated JavaScript files. The build now removes trailing horizontal whitespace mechanically; no generated file is hand-edited. `git diff --check` passed afterward and the complete suite stayed **124/124** in [the build-hygiene transcript](test-results/2026-07-18-guide-build-hygiene-final.md).

## 2026-07-18 — Guide-launched real-project relay and pushed return

- **Variant:** Deterministic fake producer and reviewer identities in two separate Node.js processes against an ordinary temporary Git project and bare pushed remote; no live model was called.
- **Effort:** Not applicable.
- **What:** Connect one pushed `READY_TO_LAUNCH` Guide request to one recoverable real-project runtime, reuse the existing persistent producer/reviewer disk relay, preserve the actual repository, and return pushed close evidence to the Guide.
- **How:** `koda guide launch` now requires explicit producer/reviewer model and effort, verifies ignored `.koda/`, clean Git, pushed upstream, one confirmed request, and no other active runtime, then prints exact Window B, Window A, and status commands. All three relay surfaces share one path resolver. The end-to-end fixture exercised confirmed prompt binding, separate context IDs, Brief artifact, formal review, exact receipt ledger entry, advancement, pre-close output push, immutable close push, producer verification, staged runtime archive, machine-readable Guide return, archive commit, and push. The real project's `.git` was inspected before and after.
- **Development failures:** A shared-resolver refactor invalidated two location-specific static assertions while the behavior remained protected; both assertions were moved to the new shared security boundary. Three real-project attempts timed out because the test fixture had not activated the existing non-human owner-input guard; improved diagnostics showed Window B correctly waiting for Return at the review. The complete sequence and corrections are preserved in [the development failure record](test-results/2026-07-18-guide-runtime-development-failures.md).
- **Recovery mutation:** The permanent test interrupts after ignored Guide-return staging and before tracked mutation. It asserts `FINALIZING_GUIDE_RETURN`, clean project state, intact `.git`, persistent reviewer wait, exact Window A resume, refusal when the bound close commit is corrupted, restored-state recovery, named-file-only return commit, push, and final reviewer exit. Changed or unrelated recovery files refuse rather than being overwritten.
- **Status truth:** `.koda/` not ignored refuses by name; another unfinished runtime refuses a new session; linked or corrupt runtime JSON refuses rather than being followed or hidden behind launch state. Active status prints exact role and detail commands, while complete status names the pushed return and archive.
- **What happened:** The first complete repository run after the recovered relay passed **128/128**. A final runtime-status mutation raised that to **129/129** in [the real-project runtime transcript](test-results/2026-07-18-guide-real-project-runtime-final.md). The linked-runtime and exact-close-commit recovery mutations then passed with every inherited check: **130/130** in [the security-final transcript](test-results/2026-07-18-guide-real-project-runtime-security-final.md).
- **Post-push verification:** After the complete runtime milestone was committed and pushed at `76be09b`, the unchanged complete suite passed **130/130** again with that commit recorded as its base in [the pushed-milestone transcript](test-results/2026-07-18-guide-real-project-runtime-pushed-final.md).
- **Verdict:** DETERMINISTIC REAL-PROJECT BACKEND PASS; LIVE THREE-CONTEXT EXPERIENCE PENDING. The Guide-bound relay now operates against an actual project and returns pushed evidence without using fixture deletion semantics. It still prints two session-context commands instead of arranging the ongoing Guide, Producer, and Reviewer automatically, and no live model has exercised this path.

## 2026-07-18 — One-action macOS Ghostty adapter

- **Variant:** Deterministic injected `/usr/bin/open` behavior using the installed Ghostty 1.3.1 and Codex CLI help as the local platform contract. No GUI window or model was launched by the tests.
- **Effort:** Not applicable.
- **What:** Let one explicit Guide launch action keep Guide open and request labeled Reviewer then Producer windows without requiring Kristian to copy two session commands.
- **How:** `--open ghostty` resolves the Codex executable, constructs Ghostty's documented macOS `open -na Ghostty.app --args ... -e` argument arrays, sets fixed role titles and project working directory, records terminal-launch intent before the first external request, then requests Reviewer before Producer. No `/bin/zsh`, `-lc`, or other shell evaluation is used. Exact manual commands remain in status.
- **Mutations:** A second automatic launch refuses before invoking the opener. An injected successful Reviewer request followed by failed Producer request preserves `PREPARED`, records the named error, exposes both manual commands through Guide status, and still refuses a blind automatic retry that could duplicate Reviewer.
- **Development failure:** The first focused run passed 25/26 because top-level `koda --help` hid `guide launch` even though nested Guide help documented it. The product help was corrected; the built-binary discoverability assertion was not weakened. The failure is preserved in [the Ghostty launcher failure record](test-results/2026-07-18-ghostty-launcher-development-failures.md).
- **What happened:** The corrected focused run passed 26/26. The complete suite then passed **132/132** in [the Ghostty launcher transcript](test-results/2026-07-18-ghostty-launcher-final.md), including every prior gate, receipt, relay, Git, package, security, skill, fixture, and status check.
- **Post-push verification:** After the adapter was committed and pushed at `5caf2cb`, the unchanged complete suite passed **132/132** again with that commit recorded as its base in [the pushed Ghostty transcript](test-results/2026-07-18-ghostty-launcher-pushed-final.md).
- **Verdict:** DETERMINISTIC ADAPTER PASS; OWNER-OBSERVED GHOSTTY PROOF PENDING. The test proves Koda's request and recovery behavior, not that macOS displayed either window.

## 2026-07-19 — Always-open active-session Reviewer conversation

- **Variant:** Deterministic fake-Codex turns through both captured-process input and a real macOS pseudo-terminal; no live model or Ghostty window was launched.
- **Effort:** Not applicable.
- **What:** Keep Window B conversational while Producer works, using the same persistent Reviewer context without letting chat mutate project evidence or silently steer Producer.
- **How:** Added `owner conversation` mode to the one shared `koda-c-review` skill, a persistent `reviewer> ` terminal prompt, same-context idle questions, exact Guide-scope and active-direction classifications, and non-mutation checks. The adversarial case requires possible direction to print `OWNER DIRECTION — NOT SENT`, create no owner handback, and leave the active project unchanged. A macOS `/usr/bin/expect` fixture allocates a real terminal, waits for the prompt, types one line, observes the response, and verifies clean exit and unchanged project state. The skill passes Codex's system validator.
- **Development failures preserved:** The shared-skill description first exceeded its 220-character discovery budget twice while every runtime case passed. The metadata was tightened without removing a mode or changing a behavior assertion. BSD `script` could not allocate a PTY from Node's captured socket, so the fixture moved to installed Expect. Its first launch used unsupported `spawn --`; Expect rejected it before Koda started while returning a misleading zero exit. The launcher changed to the platform-supported `spawn <node> <script>` and every prompt/non-mutation assertion remained. Full details are in [the development failure record](test-results/2026-07-18-reviewer-open-conversation-development-failures.md).
- **Truth update:** One inherited static assertion still required the now-superseded sentence that Window B was not conversational while Producer worked. It was replaced with stronger current assertions requiring the actual always-open prompt and the explicit rule that no chat line becomes Producer evidence.
- **What happened:** The focused runtime, skill, and real-project integration suite passed **22/22**. The complete repository suite then passed **135/135**, with every inherited gate, receipt, stale-review, status-truth, package, security, Guide, Ghostty, fixture, and relay check intact. Every named result is preserved in [the full transcript](test-results/2026-07-19-reviewer-open-conversation-final.md).
- **Post-push verification:** After the feature was committed and pushed at `8ca8aab`, the unchanged complete suite passed **135/135** again with that commit recorded as its base in [the pushed transcript](test-results/2026-07-19-reviewer-open-conversation-pushed-final.md).
- **Evidence strengthening:** The first idle-conversation fixture proved the resulting saved context ID but began from an empty Reviewer identity. The strengthened fixture starts from an existing thread ID and turn count, requires the runtime to invoke Codex's `resume` path with that exact ID, and proves the turn count increments without replacement. A fourth conversation case now proves the exact Guide-scope marker returns project-level thought to Guide while creating no handback or project mutation. The complete living suite passed **136/136** in [the context-and-scope transcript](test-results/2026-07-19-reviewer-context-scope-final.md).
- **Verdict:** DETERMINISTIC REVIEWER-CONVERSATION PASS; LIVE OWNER PROOF PENDING. Safe active-session explanation is open between handoffs. Project-level thoughts return to Guide, and possible active-session direction remains visibly unsent until its distinct transfer artifact is owner-approved.

## 2026-07-19 — Owner-ruled wait-or-halt transfer boundary

- **Variant:** Deterministic Node.js, filesystem, Git, two-process fake-Codex relay, Guide continuity, real pseudo-terminal, package, skill-validation, and status-truth checks. No live model or Ghostty window was launched.
- **Effort:** Not applicable.
- **What:** Replace the historical same-phase owner-handback experiment with the settled transfer contract: record direction immediately, keep the active phase inputs frozen, release direction only through the next successful gate, and make pushed immutable halt the sole interrupt returning through a fresh Brief.
- **How:** Added numbered `KODA_WAITING_DIRECTION` artifacts binding the exact owner words, source, time, active phase-entry identity, and observed artifact/review hashes. Advancement records release waiting IDs atomically; early current-phase use and missing receiving-phase citation refuse by name. Final-boundary direction becomes hashed next-session input. Added `KODA_HALT` evidence bound to the complete session digest, active phase, exact owner direction, Git commit, and pushed upstream. Guide and `session new` require the halt ID plus all carried direction IDs. Reviewer `h` stages only the active session, refuses unrelated staged or unpushed work, commits, pushes, verifies, and terminates both session contexts as `HALTED`. The obsolete `scripts/owner-handback.ts` route and every active marker for pause-inject-resume were removed.
- **Adversarial coverage:** Mutations prove queued direction cannot be consumed before its gate; receiving work cannot omit a released ID; visible direction prose changes and linked evidence refuse; a linked direction root cannot redirect writes; corrupt status refuses immediately; changed halt evidence refuses; close and halt cannot coexist; a forged Guide runtime `HALTED` label refuses without pushed evidence; a new session prompt missing final-boundary or halt evidence refuses. A wrong receipt leaves the recorded direction intact but advances nothing. The Reviewer migration fixture rejects the obsolete handback marker.
- **Development failures preserved:** Focused runs first retained two old no-record expectations, then exposed a pseudo-terminal Return escaping error. The initial complete suite passed 142/145 because two stale assertions and the unstaged deleted-file index still described the old state. The first staged final-state suite passed 145/146 and exposed a parallel isolation race: `npm pack` rebuilt the live `dist/` while the judge test inspected it. Packaging now runs from a temporary checkout; the committed-binary assertion is unchanged. Every failure and correction is detailed in [the development record](test-results/2026-07-19-wait-or-halt-development-failures.md).
- **What happened:** The focused cross-layer set passed **52/52**; all ten repository-local skills passed Codex's system validator; the dependency-free build emitted sixteen plain-JavaScript files; the complete suite passed **146/146**. Every named result is preserved in [the wait-or-halt transcript](test-results/2026-07-19-wait-or-halt-final.md).
- **Post-push verification:** After the implementation, skills, obsolete-route deletion, docs, failure record, and pre-push transcript were committed and pushed at `cde10de`, the unchanged complete suite passed **146/146** again with that commit recorded as its base in [the pushed wait-or-halt transcript](test-results/2026-07-19-wait-or-halt-pushed-final.md).
- **Verdict:** DETERMINISTIC WAIT-OR-HALT PASS; LIVE THREE-CONTEXT OWNER PROOF PENDING. This ruling supersedes the dated “direction remains unsent” and same-phase handback behaviors above. The files and gates now enforce record-now/wait-one-boundary or pushed halt; owner-observed Guide/Reviewer direction UX in real Ghostty remains honestly unproved.

## 2026-07-19 — Human-facing three-context CLI ceremony

- **Variant:** Deterministic Guide CLI, read-only relay status, two-process fake-Codex rendezvous, real role-output rendering, package, security, and complete regression checks. No live model or Ghostty window was launched.
- **Effort:** Not applicable.
- **What:** Make the terminal relay understandable without asking a non-technical owner to decode implementation logs: permanent roles, explicit owner-input state, visible phase position and frozen-input boundary, concise disk-derived handovers, and one safe next action at a time.
- **How:** Window A now opens as `KODA-C PRODUCER WINDOW`, says owner input is closed, retains one Producer context for the session, announces each `PHASE n/total`, and prints a `GATE PASSED` block naming revalidated evidence, released waiting directions, completed count, and the next phase or close. Window B opens as `KODA-C REVIEWER WINDOW`, says owner input is open, retains one Reviewer context, and adds phase position plus all owner choices to `REVIEW READY`. Guide status states its project scope. Relay status names Guide/Producer/Reviewer scope and enforces sequential startup: while Reviewer is absent it prints only Reviewer; only after a live Reviewer lock exists does it print Producer.
- **Truth boundary:** Every summary comes from verified run, session, job, process-lock, artifact, review, gate, or advancement state. No output claims to reveal hidden chain-of-thought. Historical two-window evidence remains historical; deterministic labels do not substitute for Kristian watching the complete three-window path.
- **Development failure preserved:** The first focused run passed **46/47** because one inherited assertion still expected the former status wording. The new full instruction was asserted without reducing the duplicate-producer or safe-sequencing conditions. Details are in [the development record](test-results/2026-07-19-cli-ceremony-development-failures.md).
- **What happened:** The corrected focused Guide/relay/status/judge set passed **47/47**. The complete repository suite passed **147/147**, including every prior gate mutation, receipt attack, stale review, wait/halt transition, Guide return, package, skill, fixture, status-truth, and security check. Every named result is in [the CLI ceremony transcript](test-results/2026-07-19-cli-ceremony-final.md).
- **Post-push verification:** After the role labels, phase/gate summaries, sequential status, docs, and pre-push evidence were committed and pushed at `d57d3fd`, the unchanged complete suite passed **147/147** again with that commit recorded as its base in [the pushed CLI ceremony transcript](test-results/2026-07-19-cli-ceremony-pushed-final.md).
- **Verdict:** DETERMINISTIC CEREMONY PASS; OWNER-OBSERVED THREE-CONTEXT RUN PENDING. The CLI no longer asks status users to start both role windows from one instruction, and the actual two-process run proves the new banners, phase summary, gate summary, and Reviewer decision context.

## 2026-07-19 — Guide session-intent preflight

- **Variant:** Deterministic Guide CLI, active and terminal session fixtures, prepared-runtime state, repository-local skill contract, package build, and complete regression suite. No live model or Ghostty window was used in this result.
- **Effort:** Not applicable.
- **What:** Make explicit `$koda-c-session-prompt` use the sole skill route toward a future session and refuse a conceptually competing session before any prompt draft exists.
- **How:** The session-prompter now runs `koda guide status` before drafting, editing, confirming, or launching. Status re-derives the latest session and runtime from disk, distinguishes `BETWEEN SESSIONS` from `NEXT SESSION BLOCKED`, names the session/phase or bound launch and the failed terminal condition, and states the only two active-path transitions: wait for immutable pushed close or explicitly halt and push `halt.md`. Guide may discuss or preserve a future idea, but cannot create a parallel lane.
- **Mutation and honest control:** One active Brief is the single changed condition and must refuse by name; a no-active-session project must permit exactly one next-session draft. A pushed halt must reopen the path. A prepared runtime must still block before Producer opens a session. Static skill coverage proves no other Koda-C skill contains the Guide confirmation route.
- **Development failure:** The first focused run passed **28/29** because the new status path referenced the existing close evaluator without importing it. Product code gained the missing import; the test stayed unchanged. The corrected and expanded focused set passed **32/32**, and the skill validator reported `Skill is valid!`. The failure is preserved in [the development record](test-results/2026-07-19-guide-session-intent-preflight-development-failures.md).
- **What happened:** The built dependency-free CLI and every inherited gate, receipt, stale-review, wait/halt, Guide runtime, package, skill, fixture, status-truth, and security test passed **151/151**. Every result is named in [the preflight transcript](test-results/2026-07-19-guide-session-intent-preflight-final.md).
- **Verdict:** DETERMINISTIC GUIDE PREFLIGHT PASS; FRESH MODEL AND OWNER-OBSERVED THREE-CONTEXT PROOF PENDING. The mechanics cannot prove every natural-language phrasing triggers the skill, so a separate sealed fresh-context run is committed before execution rather than inferred from static instructions.

## 2026-07-19 — Fresh session-prompter discovery and active-session refusal

- **Variant:** `gpt-5.6-sol`; one fresh ephemeral startup-only discovery at low effort and one fresh ephemeral active-session Guide task at medium effort.
- **Seal:** The expected skill set, active fixture, CATCH conditions, unchanged-file requirement, tested skill, and repeatable runner were committed and pushed at `c94799a` before either model task ran. The model prompt did not contain the expected verdict or score contract.
- **Discovery result:** PASS. With tools and repository reads forbidden, Sol/low named all ten current `koda-c-*` skills, reported the correct total, and reproduced the root `.agents/skills/` placement rule. The raw event stream contains no command execution.
- **Active result:** PASS. Given the owner request to start a conceptually ahead session, fresh Sol/medium loaded `koda-c-session-prompt`, ran `node dist/cli.js guide status`, observed `NEXT SESSION BLOCKED` for session `2026-07-19-01` at Brief 1/6, refused to draft, confirm, or launch, distinguished future discussion from a parallel lane, and named pushed close or explicit pushed halt as the allowed routes.
- **Mutation boundary:** The fixture was read-only and its complete regular-file hash map was identical before and after. The deterministic honest control separately proves the between-session state permits one draft, so a block-everything response cannot pass the product suite.
- **Execution observation:** Both successful tasks emitted the same local Codex model-cache schema warning and state-database fallback warnings on stderr. They exited zero and satisfied the sealed behavior checks; the warnings are preserved as secondary operational evidence and do not affect the CATCH result.
- **Evidence:** [Fresh ten-skill discovery](discovery-runs/2026-07-19-fresh-codex-startup-02/RESULT.md) and [fresh active-session preflight](guide-preflight-runs/2026-07-19-sol-medium-01/RESULT.md), each with raw JSONL events, stderr, run metadata, model, effort, prompt, and thread ID.
- **Regression:** The permanent suite now re-parses both raw runs and requires all ten discovered skills, zero discovery tool events, actual skill-file loading, actual Guide status execution, the named blocked session/Brief, the unchanged-file score, and the honest limitation statement. With every inherited class intact, the suite passed **152/152** in [the fresh-model transcript](test-results/2026-07-19-guide-preflight-fresh-model-final.md).
- **Post-push verification:** After the raw runs, grading, docs, and permanent assertions were committed and pushed at `bc8f746`, the unchanged suite passed **152/152** again with that commit recorded as its base in [the pushed transcript](test-results/2026-07-19-guide-preflight-fresh-model-pushed-final.md).
- **Verdict:** FRESH GUIDE PREFLIGHT PASS FOR ONE SOL/MEDIUM PHRASING. This closes fresh discovery of the tenth skill and demonstrates the intended refusal once. It does not establish universal phrasing/model behavior or owner usability in the real three-window Ghostty ceremony.

## 2026-07-19 — Process interruption and same-context reconciliation

- **Variant:** Deterministic Node.js supervisor and fake-Codex child processes driven with real `SIGINT`, `SIGTERM`, and forced `SIGKILL`; no live model or Ghostty window was launched.
- **Effort:** Not applicable.
- **What:** Make Ctrl-C a fail-closed operational stop without turning it into the forbidden pause-inject-resume workflow. Partial model output must never be inferred complete, and a replacement context must never impersonate the interrupted worker.
- **How:** Window A and Window B now forward termination to the active Codex child and force-stop that exact child after two seconds if soft termination is ignored. They preserve partial events and stderr plus role, turn, purpose, signal, time, and observed context identity. Restart resumes the same context for a skill-backed reconciliation before normal routing. Formal Reviewer jobs return to `PENDING`; interrupted owner conversation reuses the exact saved owner message and reconstructs the standard bounded prompt rather than replaying a mutable prompt blob. Missing context identity refuses automatic replacement. Safe-boundary Window A stops remain `PAUSED_BY_OWNER` with the exact resume command.
- **Adversarial coverage:** A planted partial Brief cannot reach formal review until the same Producer context replaces it. A planted partial review cannot become `COMPLETE`; the same Reviewer context must replace it before owner acknowledgement. Interrupted owner direction becomes exactly one waiting-direction artifact after same-context recovery. The missing-ID worker deliberately ignores soft termination, is force-stopped, and cannot be replaced on restart. Runtime interruption purposes are constrained to known supervisor tasks before any recovery prompt is constructed.
- **Development failures preserved:** The first focused run passed 2/3 and timed out on Producer recovery. Improved diagnostics exposed that the worker required an explicit reconciliation phrase that existed only in the human-facing turn label. The product prompt now names same-context reconciliation directly; capitalization was correctly treated as presentation, not behavior. The unchanged behavior checks then passed 4/4. A later unsafe-purpose status mutation produced a 9/10 run because corrupt runtime state was mislabeled as no run; discovery now refuses corruption by name and the inherited assertion forbids that absence message. Details are in [the development failure record](test-results/2026-07-19-interruption-recovery-development-failures.md).
- **What happened:** The dependency-free build passed, the focused interruption suite passed **4/4**, the related Guide/status/two-window regression passed **25/25**, and the complete living suite passed **156/156** with every earlier gate mutation, receipt attack, stale review, waiting direction, halt, Guide, package, skill, reviewer fixture, and status-truth assertion intact. Every named result is preserved in [the complete transcript](test-results/2026-07-19-interruption-recovery-final.md).
- **Truth boundary:** The tests prove direct-child termination, bounded force-stop, disk preservation, same-context resume arguments, conservative reconciliation, and no-context refusal. They do not prove operating-system process-tree containment, a live Codex model's recovery quality, or owner comprehension in Ghostty.
- **Post-push verification:** After interruption recovery was committed and pushed at `b3cdeec`, the unchanged suite passed **156/156** again with that commit recorded as its base in [the pushed transcript](test-results/2026-07-19-interruption-recovery-pushed-final.md).
- **Verdict:** DETERMINISTIC INTERRUPTION RECOVERY PASS; LIVE OWNER PROOF PENDING. Process stop is recoverable without becoming workflow direction. The pushed-state regression is complete; owner-observed Ghostty recovery remains honestly unproved.

## 2026-07-19 — Whole-product quality, package, and security audit

- **Variant:** Deterministic Node.js, filesystem, Git, package, process-signal, Guide, Producer/Reviewer rendezvous, skill-contract, fixture-integrity, and coverage checks. No live model or Ghostty window was launched.
- **Effort:** Not applicable.
- **What:** Re-read the complete product as a workflow, confirm all implemented claims together, remove schema drift from interruption recovery, inspect the actual npm package and every child/destructive process boundary, and search specifically for security risk introduced by the three-context and Ctrl-C work.
- **Correction from owner:** Provider-separated seats remain an architectural possibility only. Koda-C is not required or currently promised to be provider independent; today's runner is Codex-specific. The README, project record, backlog, and staffing note preserve that distinction.
- **Hardening:** Producer execution and relay status now use one interruption validator. It permits only known role-specific turn purposes, positive turns, SIGINT/SIGTERM, canonical ISO UTC time, role-matched event/stderr files, and present-or-null context identity. Mutations reject an unsafe purpose, mismatched role file, invalid time, and permissively parseable but non-canonical date.
- **Package and static result:** The dependency-free build emitted sixteen JavaScript files; the committed CLI help ran; isolated-cache `npm pack --dry-run --json` passed with zero bundled dependencies; no tracked symlink, active non-sample Git hook, custom hooks path, common tracked credential signature, diff whitespace error, or Git object error was found. The machine's default npm cache first refused with external `EPERM`; the cache was not modified and the isolated rerun passed.
- **Security finding:** The real-project pre-close path uses `git add -A`. It starts from clean pushed state, but a concurrent unrelated tracked Guide/owner edit could be swept into Producer's commit. The current safe-use boundary is documented, mutation provenance is promoted to `BACKLOG.md`, and the owner must choose an exclusive mutation lease, exact produced-output manifest, or compatible combination before safe simultaneous project editing is claimed. Existing Git-hook, inherited-environment, same-user, local-privacy, and direct-child/process-tree boundaries remain explicit.
- **Development failure preserved:** After the first 157/157 coverage pass, a README evidence refresh removed the still-required link to the independent 152-check fresh-model transcript. The final regression passed **156/157** and named that exact missing evidence contract. The README now carries both the new whole-product transcript and the independent fresh-model transcript; the assertion was not removed or relaxed. Details are preserved in [the audit development failure record](test-results/2026-07-19-whole-product-audit-development-failures.md).
- **What happened:** The ordinary complete suite passed **157/157**. The final durable run then passed **157/157** again with full coverage reporting: **88.28% lines, 65.80% branches, and 88.09% functions across all exercised files**; the gate engine remained at **97.51% lines, 98.73% branches, and 100% functions**. Every named result is preserved in [the whole-product transcript](test-results/2026-07-19-whole-product-audit-final.md). The owner-readable conclusions are in the [quality audit](quality-runs/2026-07-19-whole-product-01/RESULT.md) and [security audit](security-runs/2026-07-19-whole-product-audit-02/RESULT.md).
- **Post-push verification:** After the audit and hardening milestone was committed and pushed at `ee94d2d`, the unchanged complete suite passed **157/157** again with that commit recorded as its base in [the pushed whole-product transcript](test-results/2026-07-19-whole-product-audit-pushed-final.md).
- **Verdict:** DETERMINISTIC WHOLE-PRODUCT PASS WITH DOCUMENTED BOUNDARIES. The remaining human test is the genuine three-window Ghostty ceremony. The remaining architecture decision is mutation provenance; neither has been represented as passed.

## 2026-07-19 — Concurrent project and session-kind owner ruling

- **Variant:** Documentation and contract regression only; no concurrent-session runtime was claimed or model invoked.
- **Effort:** Not applicable.
- **Owner ruling:** Produce is one bounded session kind beneath the project Guide, alongside Explore, Research, Architecture, Triage, and later kinds. Independent sibling sessions may be active concurrently. Only dependent successors wait for the prerequisite session's immutable pushed close or halt. Guide and unrelated project work may continue changing files while Produce runs.
- **Explicit drift:** This replaces the earlier global interpretation that any active session blocks every new session. The current CLI, Guide preflight, relay discovery, and skills still implement that serialized reference path and are now marked incomplete rather than silently presented as the product rule.
- **Required mechanics:** Explicit session identity on every mutation; durable session kind and dependency edges; aggregate project status; dependency-scoped launch refusal; exact per-workstream write sets; same-path conflict refusal; exact-path staging; and a short recoverable lock only around Git stage/commit/push.
- **What happened:** The existing suite passed **157/157** unchanged after the owner ruling, README truth update, project/backlog/working-plan changes, security addenda, and dated design note. This proves the documentation remains internally linked and every shipped serialized invariant still passes; it does **not** prove the new concurrent product model is implemented. Every name is preserved in [the ruling regression transcript](test-results/2026-07-19-concurrent-session-ruling-final.md).
- **Verdict:** OWNER PRODUCT MODEL RECORDED; IMPLEMENTATION AND MUTATION PROOF PENDING. The next engineering work must replace global latest-session inference without weakening any session-local gate.
## 2026-07-19 — Concurrent session identity and dependency foundation

- **Variant:** Deterministic Node.js, filesystem, Git, CLI, package, relay, Guide, skill, security, and complete regression checks. No live model or Ghostty window was launched.
- **What:** Remove the core CLI's global latest-session assumption without silently guessing whether a new workstream is independent or dependent.
- **How:** New sessions record a session kind, launch mode, and exact dependency list in `state.json`. `--independent` permits a sibling while other work is active; `--depends-on` requires each named predecessor to have immutable pushed close or halt evidence and binds its SHA-256. Every session mutation accepts `--session`, also supports `KODA_SESSION_ID`, and refuses when more than one active session makes implicit targeting ambiguous. Unqualified `koda status` aggregates active sessions from disk.
- **Mutation coverage:** An implicit sibling start refuses and names the active workstream; an explicit independent Explore sibling opens; an unqualified review mutation refuses with both session IDs; exact targeting changes only the selected session; an active dependency refuses; a pushed dependency opens; changing its terminal evidence makes the dependent session stale and refuses by name.
- **Development failures preserved:** The first complete run passed 153/157 because four inherited checks required the established prior-boundary and terminal-reason wording. The mechanics were not weakened: the new refusal was expanded to preserve the exact underlying close/halt reason and the historical phrase alongside the new independent-session recovery. The focused rerun passed, then the complete living suite passed **159/159**.
- **Evidence:** The first corrected 159-check run is preserved in [the initial transcript](test-results/2026-07-19-concurrent-session-identity.md). After adding the unqualified-status stale-dependency assertion and rebuilding `dist/`, the unchanged 159-test inventory passed again in [the final transcript](test-results/2026-07-19-concurrent-session-identity-final.md).
- **Boundary:** This proves core session identity, explicit independence, dependency binding, and aggregate status. Guide launch/runtime and relay processes still assume one active session and are not claimed complete.
- **Verdict:** CORE CONCURRENT-IDENTITY PASS; GUIDE/RELAY MIGRATION PENDING.

## 2026-07-19 — Guide and relay session-identity migration

- **Variant:** Deterministic Node.js, filesystem, Git, Guide CLI, two-process fake-Codex relay, skill contracts, package, security, and complete regression checks. No live model or Ghostty window was launched.
- **What:** Carry explicit session identity through Guide confirmation, Producer, Reviewer, every phase skill, and the complete relay instead of falling back to “latest session.”
- **How:** Guide launch evidence now binds the owner-confirmed session kind, independent/dependent/continuation relationship, and hashed terminal/carry-forward evidence for each dependency. Guide status lists all active session IDs, kinds, phases, and terminal conditions. Session-prompter classifies before drafting: active dependencies refuse, explicit independent siblings may proceed, and kind labels never imply independence. The runtime snapshots those fields, opens with the exact confirmed CLI options, discovers the one newly bound session, persists its ID, exports `KODA_SESSION_ID`, and targets all later Producer/Reviewer/status/approval work to it. Every relay skill now requires that bound identity.
- **End-to-end control:** A committed active Produce session remains at Brief 0/1 while Guide confirms an independent Explore session. A mismatched Produce open refuses before creating an orphan. The matching Explore launch uses two distinct persistent contexts, completes its gate and pushed close, survives injected Guide-return recovery, and returns to Guide. The original Produce `state.json` remains unchanged.
- **Development failures preserved:** The first Guide-focused run passed **21/25**: two failures required the established underlying terminal reasons, while two assertions still demanded the now-superseded blanket `NEXT SESSION BLOCKED` behavior. Messages regained their named evidence; the outdated global-lock assertions were replaced with stronger successor-versus-sibling checks. The first skill/Guide run passed **33/35** because the revised discovery description omitted the required word `Use` and one skill assertion still encoded global refusal. Metadata was corrected and the assertion now requires explicit dependency refusal, explicit independent classification, and the no-kind-inference rule. A standalone `npx tsc --noEmit` produced no output and was stopped after an abnormal delay; the dependency-free build and executable tests are the authoritative checks in this repository.
- **What happened:** The skill validator passed. The focused Guide/relay/interruption set passed **44/44**. The independent-sibling real-project integration passed. After rebuilding all sixteen dependency-free JavaScript files, the complete living suite passed **162/162** with every inherited gate, receipt, stale-review, wait/halt, package, fixture, interruption, status-truth, and security class intact. The durable transcript is [Guide and relay identity final](test-results/2026-07-19-guide-relay-session-identity-final.md).
- **Boundary:** This proves one full independent relay can run while another sibling session is active and untouched. Runtime preparation still admits only one live Producer/Reviewer pair at a time, and `git add -A` still prevents a claim of safe overlapping mutation. Both wait for exact write sets, same-path conflict refusal, and the short Git-operation lock.
- **Verdict:** EXPLICIT GUIDE/RELAY SESSION IDENTITY PASS; CONCURRENT MUTATION ATTRIBUTION PENDING.

## 2026-07-19 — Exact concurrent write attribution and short Git lock

- **Variant:** Deterministic Node.js, filesystem, Git, CLI, Guide, Producer/Reviewer relay, package, skill-contract, and security checks. No live model or Ghostty window was launched.
- **What:** Make non-conflicting Guide and sibling-session work attributable in one project without sweeping unrelated mutations into a session commit or weakening immutable close.
- **How:** `koda work claim <path...> --session <id>` and `koda guide claim <path...>` reserve exact clean paths. Session claims record clean before and observed after SHA-256 values; active Guide/session and session/session overlap refuse. Handoffs re-read working-tree bytes, exact staging hashes the actual Git index blob, and relay finalization stages only the selected session's owned paths. A short atomic `.koda/git-operation.lock` serializes claim acquisition and stage/commit/push, refuses live owners, and recovers dead owners only when the shared index is empty. Immutable close independently rechecks every claimed external path, its observed hash, and its clean committed state before accepting the pushed branch.
- **Mutation coverage:** One-at-a-time checks cover claim overlap, simultaneous same-path claims, unclaimed contamination, Guide/sibling dirt controls, rename/delete ownership, same-path post-handoff change, staged-byte mismatch, linked output components, linked lock parent, live lock, dead lock with clean index, dead lock with staged residue, corrupt write-set status, and a pushed session directory whose claimed output was deliberately omitted. The real-project Guide relay still completes an independent Explore sibling and injected return recovery while leaving an active Produce sibling untouched.
- **Development failures preserved:** The superseded broad-staging assertion, forged Guide-return diagnostic, symlink preflight ordering, concurrent `.koda` creation race, and pre-final external-output close gap are recorded in [the development failure record](test-results/2026-07-19-concurrent-write-sets-development-failures.md). No gate or mutation was weakened.
- **Security result:** The prior broad `git add -A` finding is closed. Linked path/lock redirects refuse and staged Git bytes are independently bound. Same-user writers, manual Git, hooks, direct-child process-tree limits, and simultaneous dead-lock-recovery callers remain explicit boundaries in [the concurrent mutation audit](security-runs/2026-07-19-concurrent-mutation-audit-03/RESULT.md).
- **What happened:** The dependency-free build emitted eighteen JavaScript files. The focused close/write-set suite passed **17/17**. The complete living suite and durable rerun each passed **174/174**, retaining every earlier gate mutation, receipt adversarial, stale-review, wait/halt, Guide, relay, package, skill, fixture, status-truth, and security class. Every named result is preserved in [the 174-check transcript](test-results/2026-07-19-concurrent-write-sets-final.md).
- **Post-push verification:** After the milestone was committed and pushed at `eb15f72`, the unchanged complete suite passed **174/174** again with that commit recorded as its base in [the pushed transcript](test-results/2026-07-19-concurrent-write-sets-pushed-final.md).
- **Boundary:** This proves explicit session identity and non-conflicting shared-worktree provenance with one live real-project relay. Guide runtime preparation still admits one visible Producer/Reviewer pair at a time; plural live runtime discovery and Kristian's three-window owner test remain owed.
- **Verdict:** DETERMINISTIC CONCURRENT WRITE ATTRIBUTION PASS; PLURAL LIVE RUNTIME AND OWNER-OBSERVED PROOF PENDING.

## 2026-07-19 — Plural live session runtimes and session-specific Git truth

- **Variant:** Deterministic Node.js, filesystem, Git, four OS relay processes, fake Codex children, exact owner-receipt adapters, package, skills, status-truth, and complete regression checks. No live model or Ghostty window was launched.
- **What:** Remove the one-live-runtime project limit without merging contexts or letting concurrent Git activity falsify another session's close.
- **How:** Guide runtime discovery validates and enumerates exact launch IDs; every printed role command contains its run root; generic single-runtime selection refuses ambiguity. Simultaneous session starts allocate dated directories atomically. Two independent launches create two persistent Producer/Reviewer pairs and bind exact session IDs throughout. Cooperative claims and Git ceremonies wait only at short locks; lock owner evidence publishes atomically and Koda Git reads disable optional index refreshes.
- **Upstream truth:** Immutable close now proves the complete session tree and every claimed external output match upstream. It no longer mistakes an unrelated sibling's temporary local-ahead commit for unpushed session evidence. Each close and Guide return binds the latest commit touching its exact paths, while every mutation ceremony first refuses pre-existing unpushed commits so it cannot sweep unrelated local history into its push.
- **Adversarial coverage:** Simultaneous session allocation must produce distinct IDs; multiple unfinished runtimes must enumerate; generic lookup must refuse and exact launch lookup must succeed; simultaneous same-path claims must produce exactly one named loser; corrupt or linked runtime records still refuse; an unpushed claimed output keeps close shut; an unrelated local commit does not falsify already-pushed session evidence; and the four-process run requires four context IDs, two sessions, two receipts, two exact close/return commit bindings, clean Git, and zero final ahead count.
- **Development failures preserved:** Missing fixture prompt headings, absent session directory, and the headless clipboard adapter were initial fixture defects. The first complete run then exposed a false global-ahead close failure; the focused concurrency run exposed partially published lock evidence and an optional Git index-refresh collision. All are recorded in [the development failure record](test-results/2026-07-19-plural-runtime-development-failures.md). The 45-second liveness limit and every inherited gate remained intact.
- **What happened:** After the concurrency fixes, the focused close/write-set/plural set passed **19/19**, the ordinary complete suite passed **177/177**, and the durable complete rerun passed **177/177**. The latter names every result in [the plural-runtime transcript](test-results/2026-07-19-plural-runtime-final.md). The four-process case completed in 8.94 seconds in that durable run.
- **Post-push verification:** After the milestone was committed and pushed at `f2b1356`, the unchanged complete suite passed **177/177** again with that commit recorded as its base in [the pushed transcript](test-results/2026-07-19-plural-runtime-pushed-final.md). The four-process case completed in 9.16 seconds.
- **Security result:** Exact staging, session-specific upstream comparison, atomic lock publication, optional-lock suppression, exact commit attribution, and zero-ahead mutation entry close the observed cooperative races. Isolated-cache package dry-run, diff whitespace, tracked-symlink, credential-signature, and Git connectivity checks pass. Full `git fsck` also names recoverable unreachable blobs/trees from prior history operations; it found no missing or corrupt reachable object. Same-user bypass, manual Git, hooks/remotes, bounded lock delay, direct-child containment, and live-human usability remain explicit in [the plural runtime audit](security-runs/2026-07-19-plural-runtime-audit-04/RESULT.md).
- **Boundary:** This proves deterministic mechanics with four independent processes, not cognition, live Codex behavior, Ghostty window creation, or owner comprehension. Kristian's visible three-context run remains the next human proof; several simultaneous session pairs are supported but not required for the submission demo.
- **Verdict:** DETERMINISTIC PLURAL RUNTIME PASS; OWNER-OBSERVED GHOSTTY PROOF PENDING.

## 2026-07-19 — First Guide live-test preflight and owner handoff

- **Variant:** Repository-local Guide/session-prompt skill preflight plus documentation, skill-contract, judge-journey, and complete deterministic regression. No live model, Ghostty window, prompt confirmation, runtime, or Koda session was launched.
- **Entry check:** `koda-c-session-prompt` required the disk-derived Guide status before drafting. `node dist/cli.js guide status` refused with `ERROR: No koda.config.json found. Run koda init first.` This is truthful because Koda-C's construction was intentionally not self-hosted; the repository has neither root config nor Guide manifest. The refusal created no prompt, launch request, runtime, or session.
- **Documentation correction:** The root guidance and project record now say that Guide drafts and confirms the prompt before the trusted supervisor launches an input-closed Producer; the Producer no longer appears to solicit the owner directly. The working plan now reflects implemented exact write claims and the short Git lock. Submission evidence names ten skills and 177 checks. The Ghostty guide now begins with five operator preconditions, labels all three windows, gives one launch command, and explains receipt acknowledgement without asking a non-technical owner to assemble paths or environment variables.
- **Focused result:** The submission and skill-contract checks passed **14/14** after the corrections.
- **Complete result:** The ordinary suite passed **177/177**, then the durable suite passed **177/177** with every prior mutation, receipt, stale-review, waiting-direction, halt, Guide, package, reviewer-fixture, concurrency, Git-provenance, and status-truth class intact. Every result is preserved in [the preflight transcript](test-results/2026-07-19-live-test-preflight-docs-final.md).
- **Owner boundary:** Forward-only self-hosting would add current and future Koda state without claiming the earlier build used it. A disposable test project remains possible but produces weaker real-product evidence. Initialization and prompt drafting are intentionally stopped until Kristian chooses between those targets.
- **Verdict:** PREFLIGHT PASS; REAL OWNER PRODUCT DECISION REQUIRED BEFORE INITIALIZATION. No terminal action is currently expected from Kristian.

## 2026-07-19 — Pre-submission target ruling and concurrency repairs

- **Variant:** Deterministic Node.js, filesystem, Git, four-process plural relay, work-set, lock, Guide-runtime, package, skill, and complete regression checks. No live model or Ghostty window was launched.
- **Owner ruling:** Forward-only Koda-C self-hosting is deferred until after submission. The complete owner-observed test will use a fresh representative verification project, isolate live mutation from submission source, and archive every durable result in this repository. This focuses the submission on proving the current workflow rather than changing Koda-C's own operating model.
- **First discovered defect:** The first complete run passed **176/177**. A cooperative lock owner disappeared between a sibling's `lstat` and `realpath`, leaking raw `ENOENT` instead of retrying. The repair treats disappearance as release while retaining fail-closed checks for linked, malformed, live, and staged-stale locks.
- **Second discovered defect:** The first durable repair run passed **177/178**. One session correctly refused when a sibling's Guide archive bytes became visible before ownership covered their namespace. The failed transcript is preserved at [177/178](test-results/2026-07-19-pre-submission-lock-race-final.md). Guide now owns configured `runs/` and `returns/` before runtime writes; exact staging remains launch-specific.
- **Test-authoring failure:** The first focused lock mutation passed **14/15** because its new `lstat` call lacked an import. The import was corrected without changing the assertion. All three failures and their causes are preserved in [the development failure record](test-results/2026-07-19-pre-submission-concurrency-development-failures.md).
- **Mutation and repetition:** A lock is now deliberately removed between inspection steps and must reacquire. Concurrent Guide run/return files must be accepted as Guide-owned while an adjacent unclaimed control still refuses. The focused suite passed **16/16**. The four-process plural scenario then passed three additional independent repetitions.
- **Complete result:** The ordinary complete suite passed **179/179**, then the durable complete suite passed **179/179**, preserving every earlier gate, receipt, stale-review, waiting-direction, halt, Guide, interruption, package, fixture, status-truth, and security condition. Every result is named in [the concurrency-repair transcript](test-results/2026-07-19-pre-submission-concurrency-repairs-final.md).
- **Post-push verification:** After the owner ruling, repairs, mutations, failures, and first passing transcript were committed and pushed at `4117c9a`, the unchanged suite passed **179/179** again with that commit recorded as its base in [the pushed transcript](test-results/2026-07-19-pre-submission-concurrency-repairs-pushed-final.md).
- **Boundary:** Deterministic concurrency is stronger, but this still does not prove live Codex behavior, Ghostty window creation, or owner usability. Those remain the purpose of the isolated three-window verification project.
- **Verdict:** CONCURRENCY REPAIRS PASS; REPRESENTATIVE LIVE PROJECT PREPARATION NEXT.

## 2026-07-19 — Representative three-window project preparation

- **Variant:** Repository-contained isolated Git project and Guide/session-prompt entry check. No model, Codex task, Ghostty window, launch request, Koda session, formal review, receipt, or close was created.
- **Owner boundary:** This implements Kristian's pre-submission ruling without initializing Koda-C itself. The live project exists physically under this repository's ignored `.koda/verification-projects/` area; the tracked contract, initial bundle, prompt copy, preparation metadata, and eventual results live under `docs/verification-runs/`.
- **Project ground:** The project declares all six native phases, ten repository-local skills, project-specific `AGENTS.md`, three Guide continuity files, an in-phase consultation contract, and one plausible dependency-free Markdown heading reporter task. No expected verdict, revision count, planted defect, or preferred story exists.
- **Git proof:** Initial project commit `f3d99323f7df8bf308d0f26ea9cc5eb7a9a3256d` is clean and matches its local upstream. `INITIAL-PROJECT.bundle` verifies as complete restorable history containing local and upstream `main` plus `HEAD`.
- **Skill entry check:** From the isolated project, `koda-c-session-prompt` required `koda guide status`. It returned `KODA GUIDE — no sessions yet`, named the manifest and three continuity files, and permitted exactly one between-session draft.
- **Prompt state:** The exact draft hashes to `864058a56f4738a707265be8e72c6df667ecb64ee60b830d7051bca6a4d01845`. The live draft and tracked owner-readable copy are byte-identical. It is not confirmed, committed in the live project, or runnable; model execution remains false in `PREPARATION.json`.
- **Regression:** The unchanged complete deterministic suite passed **179/179** after preparation. Every named result is preserved in [the project-preparation transcript](test-results/2026-07-19-three-window-project-preparation-final.md).
- **Boundary:** The next action is a real owner decision on the exact prompt. Until Kristian confirms or revises it, the skill forbids `koda guide confirm`, launch preparation, Producer/Reviewer creation, and session opening.
- **Verdict:** PREPARATION PASS; OWNER PROMPT CONFIRMATION REQUIRED.

## 2026-07-19 — First verification-prompt confirmation refused by semantic handover

- **Variant:** Guide confirmation and immutable cancellation only. No model, Ghostty window, Koda session, review, receipt, phase artifact, or close was created.
- **What happened:** Kristian approved the sealed prompt if it worked. The required fresh Guide status passed. `koda guide confirm` bound the exact prompt hash and three continuity files but classified the first dependency-free session as `independent`, while the prompt said `continuation (first session with no predecessor)`.
- **Refusal:** The CLI request was mechanically valid, but the `koda-c-session-prompt` handover requires prompt and launch relationship to agree. The mismatch was not ignored or reinterpreted after confirmation.
- **Recovery:** Launch `1cf9d706-666e-4891-97a7-f33ecf5506ac` was cancelled through Koda, then prompt, request, and cancellation were committed and pushed together at `df3fea05447c119164d6b4a5ea69e8b5494ca102`. The complete history is preserved in the run bundle and the two JSON artifacts are copied under `confirmation-attempts/`.
- **Correction:** Only the relationship line changed, from `continuation (first session with no predecessor)` to `independent first session (no predecessor or active sibling)`. Its new exact SHA-256 is `d2a72f1b018eddc936ef1d0a9a355788f749ffb0aed57da199ad0a17e4cd9c8a`.
- **Verdict:** HANDOVER CORRECTLY REFUSED; FRESH OWNER CONFIRMATION REQUIRED. Model execution remains false.

## 2026-07-19 — Corrected verification prompt confirmed and pushed

- **Variant:** Guide confirmation, inner-project Git handover, and `koda guide verify`. No model, Ghostty window, runtime record, Koda session, review, receipt, phase artifact, or close was created.
- **Owner confirmation:** Kristian explicitly confirmed the corrected exact prompt. Fresh status showed no session or competing request. Launch `bf91c29d-a7a3-4cd5-8118-80b186d7a790` binds prompt SHA-256 `d2a72f1b018eddc936ef1d0a9a355788f749ffb0aed57da199ad0a17e4cd9c8a`, kind `produce`, mode `independent`, zero dependencies, Kristian, and three continuity hashes.
- **Git handover:** The prompt and launch request were committed and pushed at `ae2255c7d738644eb6a92e58ed3bae41f3c77bfa`. The inner project is clean, zero ahead, and matches its local upstream. `READY-TO-LAUNCH-HISTORY.bundle` verifies as complete history.
- **Verification:** `koda guide verify` returned `READY TO LAUNCH` and confirmed prompt, continuity, and prior-session evidence still match owner confirmation.
- **Boundary:** Runtime preparation and automatic Ghostty opening remain deliberately unstarted. The next step requires Kristian to be present and receive one human action at a time.
- **Verdict:** GUIDE HANDOVER PASS; OWNER-OBSERVED THREE-WINDOW LAUNCH NEXT.

## 2026-07-19 — Guide-window owner instruction correction

- **Variant:** Installed Codex CLI `0.144.6` help plus owner-instruction review. No Codex task, runtime, session, model turn, or Ghostty role window was started.
- **Problem found:** The general Ghostty guide correctly required an ongoing conversational Guide, but then told Kristian to paste the underlying shell launch command into Window G. A Codex conversation expects ordinary language, so this recreated the shell-versus-chat ambiguity from the historical two-window test.
- **Correction:** The current run now gives exactly one terminal command: start interactive Codex in the isolated project with `-C`, Sol, medium effort, and a bounded Guide-only prompt. After disk status appears, Kristian speaks to Guide in plain language; Guide invokes the technical launch command. The owner never assembles a run path or pastes shell into a Codex prompt.
- **Source boundary:** Installed Codex CLI `0.144.6` locally confirms `-C`, `-m`, `-c`, and an optional starting prompt. Its local model catalog confirms both `gpt-5.6-sol` and `gpt-5.6-terra` support medium effort. The official Codex manual fetch failed because the sandbox could not resolve `developers.openai.com`; no undocumented flag was invented. The exact local command remains subject to owner observation in Ghostty.
- **Verdict:** INSTRUCTION AMBIGUITY CORRECTED; OWNER STEP 1 READY.

## 2026-07-19 — First live three-window failure and Ghostty integrity repair

- **Live variant:** Ghostty 1.3.1 on macOS, persistent Guide, Sol/medium Producer,
  Terra/medium Reviewer, and the owner in the Reviewer window. This was a live,
  unscripted product attempt, not a planted model fixture.
- **Live result:** **HALTED — HUMAN EXPERIENCE AND SECURITY FAILURE.** Launch
  `bf91c29d-a7a3-4cd5-8118-80b186d7a790` opened the intended role contexts plus
  unintended tabs created from loose command tokens. The extra surfaces included
  an environment dump, Node prompt, empty shell, and direct-execution errors. The
  environment dump rendered an active ambient credential. This ledger stores no
  credential value, receipt, unsafe screenshot, or raw environment output.
- **Owner impact and response:** Repeated permissions, similarly named tabs, and
  contradictory errors made the session unusable for a non-technical owner.
  Kristian invoked the official Reviewer halt before acknowledgement. Halt
  `c9743416-67dc-45bd-b7f0-4de56c6bb300` was committed and pushed at verification-
  project commit `ba22bfe`; **0** acknowledgements and **0/6** advanced phases
  exist. Kristian chose not to rotate the exposed credential immediately because
  other projects depend on it and will monitor use. That choice is recorded as an
  owner operational ruling, not as technical remediation.
- **Second product defect:** After pushed halt, Producer consumed the completed
  Reviewer job before checking terminal evidence and presented the voided review
  again. Disk-only reconciliation restored `HALTED` and removed the stale job
  without another model call.
- **Why earlier tests passed:** The mocked Ghostty callback asserted the unsafe
  multi-token vector rather than executing it through real Ghostty. The Reviewer
  halt test stopped before Producer consumed the completed `HALTED` job. Both
  missing adversarial conditions became permanent tests; no gate was weakened.
- **Interim deterministic result:** The first repair passed **180/180** and was
  preserved in [the interim transcript](test-results/2026-07-19-ghostty-integrity-repair-final.md).
  Audit then identified that this still inspected launcher text rather than
  executing the private launcher under a hostile environment, so one stronger
  security test was added.
- **Test-authoring failure:** The first strengthened focused run passed **43/44**.
  The only failure was an obsolete filename regular expression after the launcher
  gained an explicit extension; the one-token safety assertion and all product
  conditions passed. The filename expectation was corrected without relaxing the
  command-token, environment, mutation, or halt-race requirements.
- **Defense-in-depth change:** The private launcher was moved from Node bootstrap
  code to a mode-700 non-interactive shell trampoline. Ghostty sees one relative
  executable token. The file immediately uses `/usr/bin/env -i` and an explicit
  allowlist before starting the role process. Every model child independently
  receives the same safe subset. The executable test supplies hostile credential,
  parent-context, and `NODE_OPTIONS` values and proves none reach Node.
- **Final focused result:** **44/44 passed**, including exact one-token requests,
  actual launcher execution, changed-launcher refusal, and the pushed-halt race.
- **Complete results:** The ordinary suite passed **181/181**. The coverage suite
  passed **181/181** with 89.08% line coverage overall, 100% in the environment
  sanitizer, and 93.92% in the Ghostty adapter. The durable suite passed
  **181/181** and is preserved in [the final repair transcript](test-results/2026-07-19-ghostty-integrity-repair-complete.md).
- **Ready-to-push repetition:** After the path-quoting control and all incident,
  project, README, owner-step, and security-report updates landed, the ordinary
  suite passed **181/181** again and a second durable run passed **181/181** in
  [the ready-to-push transcript](test-results/2026-07-19-ghostty-integrity-repair-ready-to-push.md).
- **Post-push verification:** The complete repair milestone was committed and
  pushed at `963a76b`. The unchanged complete suite then passed **181/181** again
  with that commit recorded as its base in [the post-push transcript](test-results/2026-07-19-ghostty-integrity-repair-pushed-final.md).
- **Security checks:** Diff whitespace, repair-surface symlinks, repository
  credential signatures, real package installation, and reachable Git object
  integrity passed. `git fsck --full` named only recoverable unreachable objects
  left by prior development operations, not reachable corruption.
- **Boundary:** Deterministic mechanics are repaired and post-push verified. One
  fresh owner-observed run remains required because tests cannot prove Ghostty's
  real window count, permission prompts, or Kristian's human clarity.
- **Verdict:** MECHANICAL REPAIR PASS; RELEASE BLOCKER REMAINS UNTIL FRESH HUMAN RUN.

## 2026-07-19 — Guide toolkit binding and owner-courier removal

- **Observed UX failure:** The first post-halt retry was correctly classified as
  a dependent successor, but Guide treated the launcher-repair proof as owner
  input. Kristian was asked to copy a repository path, commit IDs, a test count,
  and evidence locations from the builder conversation. He correctly identified
  that no ordinary human could be expected to supply that material.
- **Product change:** A repository-contained toolkit integrity manifest now binds
  the current Ghostty launch capability to its post-push evidence and critical
  launcher, environment, Guide, and session-prompter files. `guide status`
  verifies those bytes and reports one capability. New Guide confirmations bind
  that snapshot; changed toolkit proof makes the launch stale. The updated
  session-prompter forbids owner technical relays and reserves open items for real
  product decisions.
- **Live-project correction:** The unconfirmed retry prompt and continuity files
  were normalized from copied paths, hashes, commits, and test counts to verified
  capability `ghostty-clean-launch-v1`. No replacement launch was confirmed or
  opened.
- **Mutation coverage:** A changed critical toolkit file refuses and names the
  path; linked verification evidence refuses; a changed toolkit snapshot inside a
  launch request refuses as stale. Skill-contract tests require the no-courier
  rule and toolkit binding language.
- **Validation:** Both repository-local copies of `koda-c-session-prompt` passed
  the packaged skill validator. Initial focused Guide/skill/toolkit checks passed
  **41/41**. The first ordinary and durable complete suites passed **186/186** in
  [the development transcript](test-results/2026-07-19-guide-toolkit-binding-final.md).
  Security review then added a manifest-versus-transcript consistency mutation;
  focused checks passed **42/42**, and the final ordinary and durable complete
  suites passed **187/187** in [the final per-test transcript](test-results/2026-07-19-guide-toolkit-integrity-final.md).
- **Execution mistake preserved:** One combined validation command ran Guide
  status successfully from the isolated project and then tried to locate the root
  test files from that same directory. Node named the missing test paths and ran
  no tests. The identical focused test command was rerun from the repository root
  and passed **41/41**. A later combined command passed **42/42** and then invoked
  Guide status from the Koda-C source root, which correctly named the absence of
  `koda.config.json`; status was rerun from the isolated project and passed. No
  assertion or product condition changed in either correction.
- **Documentation regression caught after the durable run:** A focused
  submission/package/security check passed **14/15** because the updated README
  judge path accidentally replaced, rather than retained, the committed
  152-check fresh-Guide preflight link. The existing assertion was not changed.
  The historical link was restored alongside the new 187-check evidence and the
  same focused set passed **15/15**. A final ready-to-push durable repetition then
  passed **187/187** in [the ready-to-push transcript](test-results/2026-07-19-guide-toolkit-integrity-ready-to-push.md).
- **Post-push verification:** After the complete mechanism, tests, docs, skill,
  and security audit were committed and pushed at `d9e51d2`, the unchanged suite
  passed **187/187** again with that pushed commit recorded as its base in
  [the post-push transcript](test-results/2026-07-19-guide-toolkit-integrity-pushed-final.md).
  The toolkit manifest now reports 187/187 and binds this exact transcript hash.
- **Post-push evidence-promotion correction:** After the manifest moved from the
  old 181-check repair transcript to the new post-push 187-check transcript, a
  focused Guide/package/submission set passed **36/37**. The only failure was a
  test that hardcoded the superseded evidence filename even though the product
  correctly bound the new file. The assertion was corrected to require exact
  equality with the currently verified manifest evidence path; the binding,
  hash, capability, and stale-refusal conditions remain unchanged. The same
  focused set then passed **37/37**, and the complete suite passed **187/187**.
- **Boundary:** This proves deterministic discovery, integrity binding, and stale
  refusal. It does not prove the real Ghostty experience is now clear. Kristian's
  fresh owner-observed retry remains the release-blocking human test.
- **Verdict:** OWNER COURIER REMOVED AND POST-PUSH VERIFIED; HUMAN GHOSTTY RETRY
  REMAINS.

## 2026-07-19 — Clean Ghostty retry and owner-ceremony recovery

- **Live variant:** Existing persistent Guide; one Sol/medium Producer; one distinct
  Terra/medium Reviewer; Ghostty on macOS; dependent retry launch
  `6371ade2-3002-42aa-87ab-a613220b7eab`; session `2026-07-19-02`.
- **Launcher result:** The repaired private-launcher boundary passed its first owner
  observation. Exactly one Reviewer and one Producer opened beside Guide. No extra
  tabs, environment dump, Node prompt, direct-execution error, or repeated permission
  cascade appeared.
- **Reached:** Producer completed Brief; Reviewer produced an APPROVE review. Distinct
  persistent context IDs were recorded. No expected verdict or revision was planted.
- **Live UX failure:** The prompt implied Return acknowledged the review, then exposed
  a hidden receipt-paste step. Kristian reasonably pressed Return. Literal matching
  refused the empty value, wrote zero ledger entries, and advanced zero phases, but
  both role processes exited and the idle Guide received no automatic notification.
  The run is paused at Brief, not passed. The sanitized record is
  [RECEIPT-UX-INCIDENT.md](verification-runs/2026-07-19-markdown-headings-01/RECEIPT-UX-INCIDENT.md).
- **Repair:** Review-reader instructions now explain Return, `(END)`, and `q` before
  opening. The Reviewer uses numbered acknowledge/ask/reread/stop/halt choices,
  discloses the paste action, retries invalid or empty input without exiting, preserves
  stop as `AWAITING_OWNER`, and double-confirms halt. Receipt, comments, and rulings
  reach `koda approve` over stdin rather than process arguments or environment.
- **Recovery:** The exact historical failure reopens the same review and context.
  Guide binds the current toolkit, opens Reviewer first, waits for its live
  `AWAITING_OWNER` point, then opens Producer. Duplicate, live, corrupt, or different
  failure states refuse. Owner-facing Guide status prints only `1` reopen / `2` not
  now and no role command.
- **Concurrency defect found:** A full run observed Koda's atomic waiting-direction
  temporary file before rename. Only the exact Koda filename now receives a bounded
  retry; unknown or persistent entries still refuse. This repaired the race without
  weakening containment or corruption tests.
- **Failure ledger:** All intermediate results—28/56, 55/56, two 190/191 runs,
  integrity refusals, one zero-test wrong-directory invocation, validator permission,
  npm cache, and no-lock audit behavior—are preserved in
  [the development record](test-results/2026-07-19-owner-ceremony-development-failures.md).
- **Focused results:** Corrected Guide/relay/skill sets passed 66/66. Expanded
  first-use and leak checks passed 73/73. The final focused owner-facing status set
  passed 63/63.
- **Complete result:** The ordinary suite passed **194/194**. The coverage suite
  passed **194/194** at 89.34% lines, 68.52% branches, and 86.97% functions.
- **Pushed-code durable result:** After the complete repair was committed and pushed
  at `d7bd3dc`, the unchanged complete suite passed **194/194** with that commit as
  its recorded base in
  [the durable transcript](test-results/2026-07-19-owner-ceremony-recovery-pushed-final.md).
  Toolkit capability `ghostty-owner-ceremony-v2` binds that transcript, all changed
  recovery/Guide/receipt files, and the changed direction reader.
- **Package/security checks:** Isolated `npm pack --dry-run` passed; an isolated
  dependency-free npm audit reported zero vulnerabilities; skill validation passed;
  diff whitespace passed; reachable Git history passed with only dangling
  development objects. See the [security audit](security-runs/2026-07-19-owner-ceremony-recovery-audit-07/RESULT.md)
  and [first-use audit](quality-runs/2026-07-19-first-use-ux-audit-02/RESULT.md).
- **Honest boundary:** A terminal process cannot inject a notification into an idle
  Guide chat. Guide reconstructs current state from disk when Kristian speaks. Actual
  Ghostty recovery, its host permission, visual clarity, and the remaining five phase
  decisions are still human proof.
- **Verdict:** LOCAL MECHANICS, SECURITY, AND PUSHED TOOLKIT PROOF PASS; HUMAN
  RECOVERY REMAINS.

## 2026-07-19 — Fresh-context preflight attempt 03 refused by its host

- **Variant:** Requested Sol/low fresh startup discovery; the model never started.
- **What:** Re-run the sealed fresh startup discovery before the active-session Guide
  preflight, without overwriting either prior proof.
- **What happened:** Codex exited before creating a task because this builder's
  restricted host could not write its own state database or initialize its in-process
  app-server client. The run made zero tool calls, returned no model answer, and
  discovered zero skills. It is preserved as
  [startup attempt 03](discovery-runs/2026-07-19-fresh-codex-startup-03/RESULT.md),
  but it is an **invalid environment attempt**, not a Sol failure or a Koda-C result.
  The active-session preflight correctly did not run after its prerequisite failed.
- **Security finding:** Inspection of the runner found that fresh model children
  inherited the builder's ambient environment. No credential value appears in the
  preserved output, but the boundary was unsafe. The runner now uses Koda-C's tested
  allowlist so credentials, unrelated project variables, `NODE_OPTIONS`, and the
  parent Codex context identity do not enter either fresh task. A permanent security
  assertion protects that route.
- **Next evidence:** The corrected discovery uses a new immutable attempt ID and must
  run with ordinary host access. Attempt 03 will not be deleted, rewritten, or scored.

## 2026-07-19 — Pre-handoff concurrency defect and correction

- **Variant:** Not applicable; deterministic Node.js and four-process relay tests.
- **What:** Run the complete living suite after securing the fresh-context runner.
- **Failure:** **194/195** passed. The real plural-runtime integration exposed an
  `ENOTEMPTY` race when one Git-lock owner removed its public directory while a waiting
  owner acquired that same path. No gate advanced falsely, but one Producer paused
  with a technical error.
- **Correction:** Lock release now atomically retires the verified old directory
  before deleting its exact evidence. The previous owner can no longer delete a new
  lease, and unexpected retired files refuse recursive cleanup.
- **Mutations:** One new test deterministically retires owner A, acquires owner B,
  then finishes A's cleanup and proves B still owns the public lock. A second proves
  a corrupt disk token cannot become a path or alter an outside file. The focused
  work-set and plural integration passed **18/18**; the corrected complete suite
  passed **197/197**.
- **Evidence:** Intermediate details are preserved in the
  [pre-handoff development record](test-results/2026-07-19-pre-handoff-audit-development-failures.md).
- **Verdict:** DEFECT FOUND AND CORRECTED; PUSHED AND FRESH-CONTEXT EVIDENCE PENDING.

## 2026-07-19 — Fresh-context preflight attempt 04 could not resolve Codex

- **Variant:** Requested Sol/low discovery; no model task was created.
- **What happened:** Credential stripping intentionally replaced the ambient `PATH`,
  but the runner still passed the bare executable name `codex`. The child spawn
  returned `ENOENT` before creating a thread. Attempt 04 made zero tool calls and has
  no model answer; it is an invalid harness attempt, not a skill or Sol result.
- **Correction:** The runner now resolves Codex to one canonical absolute executable
  before constructing the allowlisted child environment. Credentials and parent
  context remain stripped. The failed attempt is immutable and the corrected run uses
  a new ID.

## 2026-07-19 — Fresh discovery 05 passed; Guide preflight 02 exposed fixture drift

- **Discovery:** Sol/low reported all ten Koda-C skills and repository-local placement
  guidance from startup context with zero tools and zero repository reads. **PASS.**
- **Active preflight:** Sol/medium loaded `koda-c-session-prompt`, ran Guide status,
  inspected the active session, named `2026-07-19-01` at Brief, refused to draft, and
  changed no fixture file. The sealed score still failed because Guide status stopped
  first at missing `docs/toolkit-integrity.json`; it therefore did not emit the later
  `NEXT SESSION BLOCKED` state or the expected discussion-versus-start explanation.
- **Classification:** **INVALID FIXTURE FOR THE CURRENT ENTRY CONTRACT.** The model
  behaved safely, but the run does not prove the targeted active-session route and is
  not promoted as a pass.
- **Correction:** The fixture now contains a minimal internally hash-bound toolkit
  proof before its snapshot. A permanent contract assertion requires it. Both the
  discovery and active-preflight retry use new immutable IDs.

## 2026-07-19 — Fresh discovery 06 passed; Guide preflight 03 found a conversation miss

- **Discovery:** Sol/low again reported all ten local skills and the placement rule
  with zero tools or reads. **PASS.**
- **Active preflight:** With toolkit readiness valid, Sol/medium ran Guide status,
  classified the request as a dependent successor, named the active session at Brief,
  refused every mutation, named pushed close or halt, and changed no file. It did not
  tell the owner that the idea could still be discussed or preserved in Guide now.
- **Historical-contract mismatch:** The original sealed contract also required the
  old global header `NEXT SESSION BLOCKED`. The owner later permitted explicitly
  independent siblings, so the current truthful status says `ACTIVE PROJECT WORK`
  while separately blocking dependent successors. Contract 01 and this failed run
  remain unchanged and are not rescored.
- **Correction and reseal:** Guide status and `koda-c-session-prompt` now explicitly
  keep future-idea conversation open while refusing its start. A new
  [plural-session contract](guide-preflight-runs/CONTRACT-02.md) is sealed around the
  current product semantics. The runner binds its hash and supports an active-only
  rerun so a passing discovery need not be spent again.
- **Deterministic validation:** The updated skill passed Codex's package validator;
  focused Guide, skill, security, toolkit, and judge checks passed **54/54**; the
  complete living suite passed **197/197** against a temporary uncommitted integrity
  bootstrap. The committed manifest intentionally stays stale until pushed-code proof
  exists.

## 2026-07-19 — Guide preflight 04 satisfied contract 02 but exposed a scorer defect

- **Behavior:** Fresh Sol/medium named the exact active Brief, observed current
  blocked-state output, created nothing, said the future idea could be discussed now,
  said starting it **must wait** for pushed close or halt, and left every file
  unchanged.
- **Recorded result:** **FAIL.** The sealed contract was not changed, and the run is
  not rewritten. Its `ownerFacingRefusal` implementation recognized “cannot,”
  “blocked,” or “won't,” but not the equally explicit contract-satisfying phrase “must
  wait.” Seven other score conditions passed.
- **Assertion correction:** The scorer now accepts “must wait” only when it is bound
  near start/draft/confirm/launch/session language. It still requires the disk
  preflight, blocked state, exact session/phase, discussion distinction, close/halt,
  and unchanged snapshot. A permanent source assertion protects the corrected case.
- **Next:** Preflight 05 uses the unchanged contract-02 hash and a new immutable result
  path. Preflight 04 remains preserved as the scorer-defect failure.

## 2026-07-19 — Guide preflight 05 passed contract 02

- **Variant:** Fresh ephemeral `gpt-5.6-sol`, medium effort, read-only sandbox,
  sanitized environment, active-only run.
- **Seal:** Contract 02, the changed skill/status, fixture, runner, and corrected scorer
  were committed before this run. The result binds contract SHA-256
  `96d4d40cb88f0f62a8f224eb298431880309d3ef79730cb932ca94ba531103d6`.
- **Result:** **PASS.** The Guide ran disk status, observed `ACTIVE PROJECT WORK` and
  the dependent-successor block, named session `2026-07-19-01` at Brief 1/6, created
  nothing, kept discussion/exploration/preservation open, and said starting must wait
  for immutable pushed close or explicit pushed halt. The complete fixture snapshot
  was unchanged.
- **Boundary:** This is one response to one phrasing. It does not prove universal
  classification or Kristian's comprehension in the real Ghostty recovery.
- **Evidence:** [Fresh plural-session Guide preflight](guide-preflight-runs/2026-07-19-sol-medium-05/RESULT.md).

## 2026-07-19 — Final pre-handoff audit and pushed-code proof

- **Scope:** Complete gate, receipt, stale-review, status-truth, printed-command,
  Guide, relay, owner-error, interruption, concurrency, security, package, skill,
  fixture, and submission regression before returning the Ghostty retry to Kristian.
- **Development failures preserved:** Fresh-context attempt 03 could not write its
  host database and exposed unsafe ambient environment inheritance. Attempt 04 then
  could not resolve bare `codex` after sanitization. Preflight 02 stopped on a stale
  fixture; preflight 03 found a real missing discussion distinction; preflight 04
  satisfied the sealed contract but exposed an overly narrow scorer. The complete
  suite also produced a real **194/195** Git-lock cleanup race. None was overwritten
  or converted into a pass.
- **Documentation regression:** The first post-audit complete run passed **196/197**.
  The README correctly promoted the current 197-check and plural-session evidence,
  while the judge-journey assertion still required the superseded 152-check link.
  The assertion was updated—not removed—to require both current durable evidence and
  the current fresh Guide result. Historical evidence remains on disk and linked
  from the testing history.
- **Corrections:** Fresh-model children use Koda's allowlisted environment and one
  pre-resolved executable. Guide keeps future-idea conversation open while dependent
  starts wait. The scorer accepts contract-equivalent “must wait” only near start
  language. Git-lock release atomically retires the verified lease, and UUID-only
  tokens cannot become paths.
- **Fresh evidence:** Startup 06 rediscovered all ten local skills with zero tools or
  reads. Sol/medium preflight 05 passed all sealed plural-session conditions and left
  the fixture unchanged.
- **Complete result:** The ordinary suite passed **197/197**. The durable pushed-code
  suite passed **197/197** at base commit `15cbdd3`, with every named result in
  [the transcript](test-results/2026-07-19-pre-handoff-pushed-final.md). The final
  coverage suite also passed **197/197** at **89.17% lines, 68.53% branches, and
  87.02% functions** overall; `gate.ts` remained at 97.51% lines, 98.73% branches,
  and 100% functions.
- **Package and repository:** Dependency-free final package dry-run passed (879.5 kB
  compressed, 4.2 MB unpacked, 755 evidence-inclusive files); the corrected isolated
  lockfile audit reported zero vulnerabilities; credential-signature and tracked
  symlink checks found nothing; diff whitespace passed; Git reported no corrupt or
  missing reachable object, only dangling development objects.
- **Invalid audit attempt:** One combined package-audit command entered an empty
  temporary directory before copying this project's manifest. Its pack/copy failed,
  so the resulting empty-package zero-vulnerability result is explicitly invalid and
  not counted. The corrected explicit-manifest audit is the result above.
- **Package measurement retry:** A later display-only parser expected pure JSON, but
  the successful prepack build printed its notice first, so parsing failed. The
  corrected size measurement used the already-built output with scripts disabled;
  the ordinary complete suite separately exercised the real prepack/install path.
- **Corrected documentation result:** After promoting the current evidence and
  strengthening the judge assertion, the complete suite returned to **197/197** and
  the final focused integrity/skill/security/submission slice passed **25/25**.
- **Pushed-audit durable result:** After the audit, living ledger, current judge
  assertion, first-use report, and toolkit manifest were pushed at `4e3b7df`, the
  complete suite passed **197/197** again with that pushed commit as its base. Every
  result is preserved in the
  [final durable transcript](test-results/2026-07-19-pre-handoff-manifest-pushed.md),
  now bound by toolkit capability `ghostty-pre-handoff-v3`.

## 2026-07-19 — Live partial-recovery failure and correction

- **Observed:** Guide reopened the same Reviewer at the unacknowledged Brief review,
  then Producer exited because it saw that `formal brief (AWAITING_OWNER)` job and
  attempted to create a separate acknowledgement job. Kristian stopped immediately.
- **Integrity result:** The reviewer-job identity guard refused the conflicting write.
  No receipt, approval, or advancement occurred; Reviewer remained open and the
  session stayed at Brief.
- **Cause:** Restarted Producer reconstructed the missing approval but did not
  reconstruct ownership of the already-open formal-review handover. The prior mocked
  window-order test did not run this process interleaving.
- **Correction:** Producer now waits on the exact existing formal/repair/fresh job and
  refuses changed identity. Guide detects this exact partial state, offers one
  Producer-only recovery, requires a live Reviewer, refuses duplicate retry, and
  waits for Producer's disk readiness before reporting success.
- **Development test failures:** The first focused relay run passed **17/18**; its new
  assertion raced streamed stdout after already observing the correct disk state, so
  it gained a bounded wait for both signals. The next combined run passed **58/59**;
  one old assertion expected future tense even though Guide now reports recovery only
  after it happened, so the same requirement was corrected to truthful past tense.
- **Corrected results:** Relay window **18/18**; combined Guide, relay, security, and
  integrity **59/59**; complete living suite **199/199**; coverage suite **199/199**
  at **89.32% lines, 69.05% branches, and 87.43% functions** overall.
- **Pushed-code result:** Repair commit `9d4eaa7` reached `origin/main`, then the
  unchanged complete suite passed **199/199** with that commit as its recorded base.
  The [durable transcript](test-results/2026-07-19-producer-rejoin-pushed.md) is
  hash-bound by toolkit capability `ghostty-partial-recovery-v4`.
- **Evidence:** [Live incident](verification-runs/2026-07-19-markdown-headings-01/PRODUCER-RECOVERY-INCIDENT.md),
  [security audit 09](security-runs/2026-07-19-partial-recovery-audit-09/RESULT.md),
  and [first-use UX audit 04](quality-runs/2026-07-19-partial-recovery-ux-audit-04/RESULT.md).
- **Verdict:** PUSHED DETERMINISTIC REPAIR PASS; OWNER OBSERVATION STILL REQUIRED.
- **Reports:** [Security audit 08](security-runs/2026-07-19-pre-handoff-audit-08/RESULT.md)
  and [first-use UX audit 03](quality-runs/2026-07-19-first-use-ux-audit-03/RESULT.md).
- **Verdict:** MECHANICAL, FRESH-CONTEXT, PACKAGE, AND SECURITY PRE-HANDOFF PASS.
  Same-context Ghostty recovery, visual clarity, and the remaining phase decisions
  are still owner-observed proof; they are not represented as passed.

## 2026-07-19 — Visible-role ownership and one-key recovery polish

- **Owner observation preserved:** Before Kristian pasted recovery wording, Guide
  independently reported the paused session from disk. This is positive Guide
  continuity evidence even though the later Producer rejoin failed.
- **Scope:** Add Producer process ownership beside the existing Reviewer lock; order
  initial launch on real Reviewer and Producer readiness; derive missing-role truth
  in Guide; keep ordinary failures at numbered owner choices; hide raw role commands
  from the ordinary Guide surface.
- **Development failures:** The first owner-error slice passed **4/6** because
  `/usr/bin/expect` merged child stderr into its captured stream while two assertions
  inspected stdout alone. Corrected combined-stream assertions passed **2/2**. The
  first complete suite passed **203/204** because finalization did not yet recognize
  the exact new ephemeral Producer lock. The allowlist was expanded by that one
  named path; single and plural integrations then passed **2/2**. A later rerun with
  the deliberately stale pushed manifest refused Guide setup as designed and also
  found a real status race: Producer retired its lock between the directory and owner
  probes. Status now treats that exact disappearance as not running while preserving
  refusal for an existing lock with missing or corrupt evidence.
- **Corrected results:** Focused relay/status **24/24**; combined Guide, relay,
  security, and integrity **71/71**; complete suite **204/204**; coverage suite
  **204/204** at 89.03% lines, 68.92% branches, and 86.94% functions overall.
- **Security/package:** Linked or non-directory role locks refuse without touching
  outside evidence. Private-cache `npm pack --dry-run` passed at 896,230 compressed
  bytes, 4,289,377 unpacked bytes, and 760 files. An isolated dependency-free
  lockfile audit reported zero vulnerabilities. Diff whitespace and reachable Git
  object checks passed.
- **Invalid environment attempts:** The first package check failed on a root-owned
  user npm cache. The first audit command lacked a lockfile. Neither is promoted;
  both and their corrected executions are preserved in the
  [development record](test-results/2026-07-19-first-use-recovery-polish-development-failures.md).
- **Evidence:** [One-key UX audit](quality-runs/2026-07-19-first-use-ux-audit-05/RESULT.md)
  and [role-liveness security audit](security-runs/2026-07-19-role-liveness-audit-10/RESULT.md).
- **Pushed-code proof:** Repair commit `153814a` reached `origin/main` before the
  unchanged complete suite passed **204/204** and wrote the
  [durable transcript](test-results/2026-07-19-first-use-recovery-polish-pushed.md).
  Toolkit capability `ghostty-first-use-recovery-v5` binds that transcript and every
  changed launch/recovery file.
- **Final manifest regression:** After the transcript, manifest, current README,
  backlog, project document, and submission checklist were assembled, the complete
  suite passed **204/204** again.
- **Post-bind owner-surface scan:** Three low-level Ghostty refusal messages still
  exposed a raw `koda guide status` instruction. They now route the owner back to the
  Guide conversation, and strengthened existing assertions forbid raw status or
  recovery-command wording. The first focused run correctly refused **0/6** on the
  stale v5 integrity hash; after a local hash bootstrap it passed **6/6**, and the
  complete suite passed **204/204**.
- **Owner-surface pushed proof:** Commit `9e2f8e4` reached `origin/main` before the
  unchanged suite passed **204/204** and wrote the
  [owner-surface transcript](test-results/2026-07-19-owner-surface-pushed.md).
  Toolkit capability `ghostty-owner-surface-v6` binds it and the changed launch
  surface.
- **Verdict:** PUSHED MECHANICS AND SECURITY PASS; HUMAN RECOVERY REMAINS.

## 2026-07-19 — Both-window and repeatable owner-decision recovery

- **Why:** The owner-observed partial recovery left Reviewer open and Producer
  missing. Before returning that flow to Kristian, a state-matrix review found that
  the repair depended on Reviewer staying alive and that the Ghostty guide still
  described the superseded 194-check state. If Reviewer closed while Kristian was
  away, the saved decision remained intact but automatic recovery had no valid route.
- **Correction:** Recovery now derives the missing role set from live disk evidence.
  It restores only Producer when Reviewer is alive, only Reviewer when Producer is
  alive, or Reviewer first and Producer second when both are absent. A stable
  `AWAITING_REVIEWER_WINDOW` handover can recover again after a later role loss;
  successful attempts append to `RECOVERY.json` rather than turning the mechanism
  into a one-shot dead end. Role-lock observation also tolerates the lock disappearing
  during either owner-file probe while still refusing an extant unsafe owner.
- **Mutation:** The new readiness mutation makes restored Reviewer fail. Exactly one
  Reviewer request occurs, Producer is never opened or checked, and the saved run
  names that refusal. Existing duplicate recovery still refuses when both role locks
  are live.
- **Local results:** Focused Guide suite **35/35**; complete living suite **206/206**;
  coverage suite **206/206** at **89.03% lines, 69.12% branches, and 86.46%
  functions** overall. No existing assertion was weakened.
- **Live-state check:** The preserved verification project was read only. It remains
  at Brief with the same `AWAITING_OWNER` formal review, zero acknowledgements, and
  zero advancements. No role was launched and no runtime file was changed.
- **Evidence:** [Repeatable-recovery UX audit](quality-runs/2026-07-19-repeatable-recovery-ux-audit-06/RESULT.md)
  and [security audit 11](security-runs/2026-07-19-repeatable-recovery-audit-11/RESULT.md).
- **Pushed-code proof:** Repair commit `b9b63eb` reached `origin/main` before the
  unchanged complete suite passed **206/206** and wrote the
  [durable transcript](test-results/2026-07-19-repeatable-recovery-pushed.md).
  Toolkit capability `ghostty-repeatable-recovery-v7` binds that transcript and the
  changed recovery surface.
- **Manifest assembly failure:** The first bound-manifest regression passed
  **170/206**. Thirty-five Guide/plural-runtime checks correctly refused because the
  manifest timestamp had been rounded to `23:34:52.000Z` instead of quoting the
  transcript's exact `23:34:43.046Z`. The judge-document check also refused because
  its assertion still required the superseded 197-check README link after the README
  promoted the current 206-check proof. Every named pass and failure is preserved in
  the [failed transcript](test-results/2026-07-19-repeatable-recovery-manifest-assembly-failure.md).
  The exact timestamp was copied; the judge contract was strengthened to require the
  current transcript and current security audit. No product test or gate condition
  was removed.
- **Corrected manifest result:** The corrected, unchanged complete suite passed
  **206/206**. Every named result is preserved in the
  [bound transcript](test-results/2026-07-19-repeatable-recovery-manifest-corrected.md),
  which toolkit capability `ghostty-repeatable-recovery-v7` now verifies directly.
- **Final audit:** Guide/security/submission/integrity slice **49/49**; dependency-free
  package dry-run passed at 932,472 compressed bytes, 4,495,542 unpacked bytes, 770
  files, and zero bundled dependencies; credential-signature, committed-symlink,
  diff-whitespace, and reachable-object checks passed. Git reports only dangling
  development objects, not corrupt or missing reachable history.
- **Evidence push:** Manifest, transcripts, corrected judge assertion, and final
  audits were pushed at `42476f7`. The post-push security, submission, and toolkit
  integrity slice passed **14/14**, and local `HEAD` matched `origin/main`.
- **Real paused-project preflight:** The current shipped CLI read the preserved
  verification project without mutation. It reported toolkit capability
  `ghostty-repeatable-recovery-v7` at **206/206**, session `2026-07-19-02` at Brief
  1/6, the existing owner decision still open, Reviewer present, Producer missing,
  and only `1` reopen Producer / `2` not now. No role was launched.
- **Remaining proof:** Kristian's Ghostty observation and continuation through the
  remaining gates and pushed close.

## 2026-07-19 — Stable owner-handover recovery

- **Why:** Repeatable recovery was proved only after the historical receipt error.
  A later ordinary Orient, Plan, Produce, Live, or Summary owner decision could still
  lose one or both visible windows without that incident marker and fall back to a
  technical dead end.
- **Correction:** Any stable formal, repair, or fresh `AWAITING_OWNER` handover may
  now restore exactly the missing roles. Reviewer opens before Producer. Recovery
  binds the Reviewer job identity, validates its full schema, and refuses if the job
  changes. An exact Koda launch/readiness failure remains recoverable instead of
  making recovery itself a one-shot failure.
- **Mutations:** A missing Reviewer job refuses; changing only the bound Reviewer job
  refuses; and an unready restored Reviewer opens no Producer. No receipt, approval,
  or advancement path was relaxed.
- **Development failures:** One inconsistent old liveness fixture and one deliberately
  stale local integrity hash produced named refusals before correction. Both are
  preserved in the [development record](test-results/2026-07-19-stable-handover-recovery-development-failures.md).
- **Local corrected results:** Focused Guide **39/39**; complete suite **210/210**;
  coverage **210/210** at **89.08% lines, 69.65% branches, and 86.65% functions**.
  Dependency-free package dry-run, whitespace, tracked-symlink, and reachable Git
  checks pass.
- **Audits:** [Security audit 12](security-runs/2026-07-19-stable-handover-recovery-audit-12/RESULT.md)
  and [first-use UX audit 07](quality-runs/2026-07-19-stable-handover-recovery-ux-audit-07/RESULT.md).
- **Pushed-code result:** Repair commit `93efd1a` reached `origin/main`, then the
  unchanged complete suite passed **210/210** with every named result in the
  [pushed transcript](test-results/2026-07-19-stable-handover-recovery-pushed.md).
  Toolkit capability `ghostty-stable-handover-recovery-v8` binds that commit,
  transcript, and changed launch surface.
- **Manifest regression:** After binding the exact pushed transcript, repair commit,
  current source/distribution hashes, and current judge links, the unchanged complete
  suite passed **210/210** again.
- **State:** PUSHED DETERMINISTIC AND MANIFEST PASS. Post-push focused slice and owner
  observation remain pending.
- **Evidence push and post-push check:** Capability manifest, current project docs,
  judge assertion, audits, and transcript reached `origin/main` at `83bc605`. The
  post-push Guide, security, submission, and toolkit-integrity slice passed **53/53**.
- **Real paused-project preflight:** The shipped CLI read the preserved verification
  project without mutation. It reported capability
  `ghostty-stable-handover-recovery-v8` at 210/210, session `2026-07-19-02` at Brief
  1/6, the existing Reviewer decision still open, Producer missing, and only `1`
  reopen Producer / `2` not now. No role or terminal was launched.
- **Final state:** PUSHED MECHANICAL, SECURITY, PACKAGE, AND OWNER-SURFACE PASS.
  Kristian's Ghostty observation and continuation through pushed close remain.

## 2026-07-19 — Dynamic owner identity and project-scoped Codex roles

- **Why:** The Guide and relay still substituted the toolkit author's name in
  several active owner messages, and the legacy `workspace-write` sandbox limited
  writes but did not justify a project-only read claim.
- **Owner binding:** New Guide runtimes are version 2 and bind the confirming
  owner's validated display name through status, Reviewer prompts, approval ledger,
  and relay transcript. Empty, overlong, and terminal-control-character names
  refuse. Version-1 runtimes retain `Kristian` only as an explicit historical
  migration fallback. The session-prompt skill now resolves owner identity from
  project evidence or asks once; it never substitutes the toolkit author.
- **Sandbox correction:** Managed Producer and Reviewer turns now use a strict
  Codex permission profile: project read/write; read-only `.git`, `.agents`, and
  `.codex`; denied project `.env`; no ordinary parent/sibling/home reads; disabled
  network, web search, login shell, user config, and approval escape; exact
  read-only Koda/Codex runtime files; and a read-only Node toolchain root. Older
  unsupported config fails closed.
- **Development failure 1:** The first focused run passed **46/86**. All forty
  Guide failures named one cause: the integrity manifest correctly detected the
  newly changed relay script. After a local development hash bootstrap, the exact
  focused suite passed **86/86**. The final manifest remains owed pushed-code proof.
- **Live probe 1:** Strict project write and parent-read denial passed.
- **Live probe 2:** Project write, parent-read denial, Git write denial, and `.env`
  read denial passed, but trusted Koda execution failed because the package
  manifest and Codex self-executable were not yet allowed.
- **Live probe 3:** Those exact files were allowed, but Koda execution still failed.
  No-model diagnostics traced the failure through Homebrew Node, `libnode`, and a
  linked `llhttp` library. The policy added the read-only Homebrew toolchain root;
  no project or gate assertion changed.
- **Final live probe:** Sol/low returned `INSIDE_WRITE=PASS`,
  `OUTSIDE_READ=BLOCKED`, `GIT_WRITE=BLOCKED`,
  `PROJECT_ENV_READ=BLOCKED`, and `TRUSTED_TOOLKIT_READ=PASS`. A real HTTPS command
  failed DNS resolution under the same profile. A planted required project-local
  MCP server did not load under `--ignore-user-config`.
- **Corrected local deterministic results:** focused relay/Guide/security/skills
  **86/86**, then the changed permission slice **13/13**, then the complete suite
  **216/216**. Coverage also passed **216/216** at **89.23% lines, 70.25%
  branches, and 86.86% functions** overall; the new permission-profile module is
  at **100% lines, branches, and functions**. No assertion was weakened.
- **Packaging and repository checks:** Dependency-free package dry-run passed at
  955,624 compressed bytes, 4,587,696 unpacked bytes, 781 files, and zero bundled
  dependencies. The isolated production dependency audit found zero
  vulnerabilities. Credential-signature, whitespace, and reachable-object checks
  passed.
- **Pushed-code result:** Repair commit `74f9067` reached `origin/main`, then the
  unchanged complete suite passed **216/216** with every named result in the
  [pushed transcript](test-results/2026-07-19-owner-bound-project-sandbox-pushed.md).
  Toolkit capability `owner-bound-project-sandbox-v9` binds that commit,
  transcript, owner/permission launch surface, and exact critical-file hashes.
- **Evidence:** [owner identity design note](design-notes/2026-07-19-owner-identity-binding.md),
  [permission design note](design-notes/2026-07-19-project-scoped-codex-permissions.md),
  and [live boundary result](security-runs/2026-07-19-project-boundary-probe-13/RESULT.md).
- **Remaining boundary:** The separately started interactive Guide still uses the
  permissions selected at its own Codex launch. Koda must design a simple secure
  Guide opening experience before claiming whole-workflow containment.

## 2026-07-19 — Secure persistent Guide and failure-safe recovery

- **Why:** The first human run proved the role gates but also exposed that raw Guide
  startup sat outside Koda's project boundary, and that a failed owner recovery
  could close the process that was supposed to explain what happened.
- **Implementation:** `koda guide open` now owns one persistent Guide context across
  repeated Codex turns. Every managed turn ignores ambient user configuration and
  command rules, uses a no-approval, no-network permission profile, reads the
  project and exact verified toolkit files, and writes only Guide continuity. Any
  requested Guide write inside configured session evidence refuses before Codex
  starts. Exact context state and raw turn evidence remain project-local.
- **Recovery UX:** The trusted controller handles displayed `1` recover / `2` not
  now choices. It never guesses between multiple sessions. A role-launch or
  readiness failure reports `RECOVERY PAUSED SAFELY`, confirms that no gate moved,
  and leaves Guide open. Empty input, corrupt state, duplicate consoles, stale
  locks, terminal controls, and linked runtime parents all have explicit outcomes.
- **Real-runtime evidence:** Sol/low passed Guide-owned write, active-session write
  denial, parent read denial, project `.env` denial, Git write denial, network
  denial, and trusted-toolkit execution in one persistent context. A planted
  project rule that explicitly allowed the read was ignored. A second end-to-end
  run resumed one Guide context after finding the exact blocked Git/toolkit reads,
  reached `guide>`, and closed without opening session roles. See
  [security audit 14](security-runs/2026-07-19-secure-guide-console-boundary-14/RESULT.md).
- **Preserved failures:** Fixture setup, local integrity refusals, a real Codex
  option-order defect, a malformed model patch, one concurrent role-lock cleanup
  race, and the no-lockfile audit refusal are all preserved in the
  [development record](test-results/2026-07-19-secure-guide-console-development-failures.md).
  No gate or mutation assertion was weakened.
- **Corrected local results:** Complete suite **228/228**, then coverage after the
  session-write refusal **229/229** at **87.62% lines, 70.76% branches, and 85.77%
  functions** overall. Security/package/submission/integrity slice **22/22**.
- **Package and repository checks:** Dependency-free package dry-run passed at
  980,813 compressed bytes, 4,692,898 unpacked bytes, 790 files, and zero bundled
  dependencies. An isolated production lockfile audit found zero vulnerabilities.
  Whitespace and tracked-symlink checks passed; reachable Git history is intact.
- **UX assessment:** [audit 08](quality-runs/2026-07-19-secure-guide-console-ux-audit-08/RESULT.md)
  records the one-command Guide, one-number recovery, mistake behavior, optional
  Ghostty boundary, and the remaining future-session publisher work.
- **State:** LOCAL MECHANICS, SECURITY, PACKAGE, AND REAL-CODEX BOUNDARY PASS.
  The unchanged pushed-code run passed **229/229** and wrote the
  [durable transcript](test-results/2026-07-19-secure-guide-console-pushed.md).
  Toolkit capability `secure-persistent-guide-v10` binds repair commit `01e8055`,
  that transcript, and the exact managed Guide/relay surface. Kristian's recovered
  Ghostty observation remains. After the manifest, current judge links, backlog,
  project record, and failure ledger were assembled, the unchanged complete suite
  passed **229/229** again.

## 2026-07-19 — Deterministic role launchers and bounded legacy migration

- **Observed failure:** The secure Guide found the correct saved Brief decision,
  but two owner recovery selections refused because the clean Ghostty-generated
  launcher did not byte-match a launcher reconstructed under the managed Guide's
  different `LANG`, `TERM`, and `COLORTERM`. Guide stayed open; no role opened,
  receipt was written, or phase advanced. The event is preserved in the
  [launcher-context incident](verification-runs/2026-07-19-markdown-headings-01/LAUNCHER-CONTEXT-MISMATCH-INCIDENT.md).
- **Correction:** Role launcher locale, terminal, color, and executable-search
  path are now fixed.
  Koda accepts an older mismatch only when a strict parser proves the whole
  generated shell form, allowlisted environment order, project, Node/Codex
  executables, role script, and runtime arguments. Both launchers are inspected
  before mutation; valid migration is atomic and records old/new hashes. Tampered,
  linked, malformed, concurrently changed, or command-divergent files still refuse.
- **Development failures:** The first focused run passed 15/56 because the prior
  integrity seal correctly rejected changed launch code. The exact failure and
  correction are in the
  [development record](test-results/2026-07-19-launcher-context-migration-development-failures.md).
- **Corrected local results:** Guide/security **56/56**; complete suite **230/230**.
  Coverage passed **230/230** at **87.70% lines, 70.84% branches, and 85.94%
  functions** overall. The dependency-free package dry-run passed at 994,236
  compressed bytes, 4,750,526 unpacked bytes, 794 files, and zero bundled
  dependencies. An isolated production lockfile audit found zero vulnerabilities;
  whitespace, tracked-symlink, and reachable-object checks passed.
  A read-only check proves both preserved production launchers match the bounded
  legacy form. Neither production launcher nor active session evidence was changed.
- **Post-push result:** Repair commit `461824b` reached `origin/main`, then the
  unchanged complete suite passed **230/230** in the
  [pushed transcript](test-results/2026-07-19-deterministic-launcher-migration-pushed.md).
  Toolkit capability `deterministic-role-launchers-v11` binds that commit,
  transcript, and exact launch surface.
- **Evidence-assembly refusal:** After promoting the new proof in the README, the
  focused submission/security/integrity run passed **19/20**. The one refusal named
  an obsolete assertion still requiring the prior 229-check README link. That
  assertion now requires the stronger 230-check pushed proof; no live-rule,
  security, or gate assertion was removed.
- **Lock-publication failure:** The next complete run passed **229/230**. Under
  full-suite load, Producer status observed the old two-step lock directory after
  directory creation but before `OWNER.json` publication and refused it as a
  persistent ownerless lock. This is a genuine process-visibility race, not a test
  timeout. Role locks now publish complete owner bytes through one no-clobber
  filesystem link; the reader retains compatibility with the open legacy Reviewer
  lock in the preserved live session.
- **Test-authoring failure:** The first focused atomic-lock run passed **19/20**;
  the new regular-file assertion lacked its `lstat` import. The import was added
  without changing the ownership, duplicate, stale, link, or recovery assertions.
- **Corrected atomic-lock results:** Focused role protocol **20/20**; combined
  Guide/role/security/integrity **81/81**; complete suite **230/230**; coverage
  **230/230** at **87.60% lines, 70.93% branches, and 86.04% functions** overall.
  The dependency-free package dry-run passed at 1,001,772 compressed bytes,
  4,782,431 unpacked bytes, 795 files, and zero bundled dependencies.
- **Atomic-lock post-push result:** Commit `e6890f4` reached `origin/main`, then
  the unchanged complete suite passed **230/230** in the
  [pushed transcript](test-results/2026-07-19-atomic-role-locks-pushed.md). Toolkit
  capability `atomic-role-ownership-v12` binds that commit, transcript, launcher,
  and role-lock surface.
- **State:** PUSHED MECHANICAL PASS. The owner's next recovery observation remains.

## 2026-07-19 — Submission landing and literal first-time path audit

- **Scope:** Root GitHub/npm landing page, official no-rebuild judge path,
  submission/video totals, real tarball installation, package contents, and the
  exact one-minute refusal/receipt/open ceremony. No active verification-session
  file or runtime was touched.
- **Document defects found:** The repository had no root `README.md`, so GitHub
  and npm did not open on the required collaboration, install, and testing story.
  The submission checklist still named 210 checks and the video narration still
  named 179 even though the bound suite had reached 230. Both totals now derive
  from the current pushed transcript.
- **Environment failures preserved:** A direct `npm pack --dry-run --json` and the
  literal `npx --yes . init ...` command both stopped before Koda because the
  machine's global npm cache contains root-owned entries. No `sudo`, ownership
  change, retry-as-success, or global-cache mutation was used. The corrected
  package inspection uses an isolated cache; the primary judge demo now uses the
  committed `node dist/cli.js` binary and does not depend on npm cache health.
- **Operator setup failure:** The first isolated audit-copy command was run from
  the empty temporary directory with a relative `package.json` source and failed
  by name. Re-running with the explicit repository source path succeeded; this
  changed no product or assertion.
- **Corrected results:** Package/security/submission slice **18/18**. A real
  tarball installed and ran the CLI and demo. The exact primary path produced
  `GATE CLOSED — BRIEF`, accepted only the complete receipt, then produced
  `GATE OPEN — BRIEF` and activated `orient`.
- **Package and dependency result:** Isolated dry-run reports 1,009,289 compressed
  bytes, 4,816,071 unpacked bytes, 797 declared file entries, and zero bundled
  dependencies. The real tarball contains the root README, full GPLv3 license,
  and local skills, while excluding `.git`, `.koda`, `.env`, `.DS_Store`,
  `node_modules`, and nested tarballs. An isolated production lockfile audit
  reports zero known vulnerabilities at every severity.
- **State:** LOCAL JUDGE-LANDING AND PACKAGE PASS. A pushed fresh-checkout proof
  is still required after this documentation milestone is committed.
- **Public-clone result:** After commit `eed2084` reached `origin/main`, a new
  unauthenticated HTTPS clone matched that commit, passed Git object verification,
  ran the exact refusal → receipt → open path outside the checkout, and remained
  clean. The clone's package/security/license/judge slice passed **19/19**,
  including a real tarball install. See the
  [UX audit](quality-runs/2026-07-19-submission-readiness-09/RESULT.md) and
  [security audit 15](security-runs/2026-07-19-submission-readiness-audit-15/RESULT.md).
- **Assembled-suite result:** The completed judge landing, refreshed submission
  documents, project records, and audit links passed the full **230/230** suite in
  the [named local transcript](test-results/2026-07-19-submission-readiness-final.md).
- **Post-push result:** After the assembled audit commit `91729b0` reached
  `origin/main`, the unchanged full suite passed **230/230** again in the
  [post-push transcript](test-results/2026-07-19-submission-readiness-pushed.md).
- **Final instruction audit:** Freeze review found that “from a fresh checkout”
  still assumed the judge knew the clone and repository-entry commands. Both
  READMEs now give the exact public `git clone`, `cd`, and no-build `node` path and
  say no `npm install` is required. A new submission assertion plus the complete
  package/security slice passed **18/18**; no product mechanic changed.

## 2026-07-20 — Inline owner review ceremony and shared three-window language

- **Owner-observed failure:** The preserved retry reached an APPROVE Brief review,
  but the owner ceremony still opened an external pager, required a hidden `q`,
  overwrote the clipboard, and then triggered Ghostty's multi-line paste warning.
  An attempted paste contained terminal history instead of the receipt. The exact
  receipt gate refused it; zero approval entries and zero advancements were
  written. Guide, Reviewer, and Producer were then closed safely.
- **Replacement:** The persistent Reviewer now prints the complete human-facing
  review inline, omits protected machine metadata from terminal display, and shows
  a deterministic eight-character review code. The code resolves to the current
  review's full receipt only inside the controller; the full receipt still enters
  the unchanged core approval command over stdin. Pager and clipboard mutation
  were removed from the managed ceremony.
- **Three-window language:** Guide, Reviewer, and Producer now share bounded
  divider panels. Only an owner-interactive window presents numbered choices.
  Producer panels explicitly say `NO ACTION NEEDED — watch only`. Refusal,
  recovery, interruption, handover, halt, and completion branches use the same
  visual language instead of falling back to raw terminal prose.
- **New adversarial check:** A correctly formed review code derived from another
  receipt refuses, leaves the Reviewer job `AWAITING_OWNER`, and writes no ledger
  entry. Existing full-receipt adversarial and gate mutation suites remain intact.
- **Development failures:** The first post-panel focused run passed **22/32**.
  The integrity manifest correctly rejected changed launch files; the remaining
  failures were exact assertions for superseded sentence layout, including one
  Expect script that timed out while waiting for old wording. After the local
  development hashes and first assertions were corrected, the slice passed
  **25/32**; seven further assertions still joined titles and bodies that are now
  deliberately separated by panel dividers. No gate, receipt, mutation, security,
  or recovery condition failed.
- **Corrected focused results:** The complete Guide/Reviewer/Producer window slice
  passed **33/33**, including real TTY choices, wrong and cross-review codes,
  recovery, interruption, halt, conversation, and pushed close. The focused
  real-project/interruption/security slice passed **18/18**.
- **First complete-suite run:** **226/231** passed. The five failures were stale
  presentation or source-structure assertions: one Reviewer close sentence, three
  interruption output layouts, and one security assertion that still named the
  removed raw receipt variable. Each was updated to require the stronger inline,
  metadata-hidden, stdin-only contract.
- **Corrected complete-suite result:** `npm test` passed **231/231**. No assertion
  was removed to create a pass; every changed assertion now checks the replacement
  behavior or a stronger confidentiality/binding property.
- **Security defect found before handoff:** Printing reviews inline introduced a
  terminal-output trust boundary. A review could contain escape, bell, C1, or
  Unicode bidirectional controls. The shared Guide/Reviewer/Producer renderer now
  strips those bytes from terminal display only; the review on disk, artifact hash,
  receipt, and gate evidence remain unchanged. The new mutation plants controls,
  proves none reach the terminal, proves they remain on disk, and still records the
  exact bound receipt through the gate.
- **Final focused and complete results:** Guide/Reviewer/security/integrity passed
  **48/48**. The complete suite passed **232/232** and the durable local transcript
  is [recorded here](test-results/2026-07-20-owner-review-ceremony-final-local.md).
  Coverage passed **232/232** at **87.70% lines, 71.45% branches, and 86.24%
  functions** overall; the new shared terminal renderer has 100% line, branch, and
  function coverage.
- **Package and dependency result:** An isolated `npm pack --dry-run --json` and
  real tarball completed with 1,036,827 compressed bytes, 4,977,358 unpacked bytes,
  809 entries, and zero bundled dependencies. The tarball contains the full GPLv3
  license, root README, compiled CLI, and repository-local review skill while
  excluding `.git`, `.koda`, `.env`, `.DS_Store`, `node_modules`, and nested
  tarballs. An isolated production lockfile audit reports zero vulnerabilities at
  every severity. `git diff --check` and `git fsck --full --no-dangling` passed.
- **Audit setup failure preserved:** The first isolated audit-copy command used a
  relative `package.json` after changing to the temporary directory and failed by
  name. Re-running with the explicit repository path succeeded. The failure changed
  no project file, test, or assertion. The first staged whitespace check then named
  seven trailing-space lines in new audit Markdown. Because the check and commit
  were mistakenly sequential rather than conditional, the milestone commit still
  completed locally. A separate cleanup removes the spaces; the corrected staged
  check must pass before either commit is pushed.
- **State:** LOCAL DETERMINISTIC, COVERAGE, PACKAGE, UX, AND SECURITY PASS. The
  [UX audit](quality-runs/2026-07-20-owner-review-ceremony-ux-audit-10/RESULT.md)
  and [security audit](security-runs/2026-07-20-owner-review-ceremony-audit-16/RESULT.md)
  are durable.
- **Post-push result:** Code and cleanup commits `536d471` and `c1d55ea` reached
  `origin/main`. The unchanged complete suite then passed **232/232** in the
  [post-push transcript](test-results/2026-07-20-owner-review-ceremony-pushed.md).
  Toolkit capability `owner-review-ceremony-v13` binds commit `c1d55ea`, that
  transcript, and every critical Guide/Reviewer/Producer renderer and relay file.
- **Integrity-assembly refusals:** The first focused evidence slice passed
  **49/51**. Toolkit verification rejected a manifest timestamp that differed by
  8.001 seconds from the transcript's exact recorded timestamp, and one submission
  assertion still required the historical 230/230 checklist wording. The manifest
  now carries the transcript timestamp byte-for-byte and the assertion requires the
  stronger current 232/232 proof. No product, gate, or security assertion was
  removed.
- **Corrected integrity-assembly result:** Guide, Reviewer, security, submission,
  and toolkit-integrity checks passed **51/51**.
- **State:** PUSHED MECHANICAL PASS. The preserved live Brief remains unchanged;
  Kristian's fresh human recovery observation is the next proof.

## 2026-07-20 — Owner-observed six-phase Guide relay completion

- **Subject:** Preserved Guide launch
  `6371ade2-3002-42aa-87ab-a613220b7eab`, session `2026-07-19-02`.
- **Staffing:** Persistent `gpt-5.6-sol` / medium Producer and distinct persistent
  `gpt-5.6-terra` / medium Reviewer, with Kristian in the owner-facing Reviewer
  window and the persistent Guide remaining available.
- **Result:** PASS. Brief, Orient, Plan, Produce, Live, and Summary each produced a
  non-empty artifact, received an independent bound review, required owner reading
  and acknowledgement, and advanced only after Koda revalidated disk evidence.
  Six phases and six owner acknowledgements completed.
- **Closure:** Immutable close commit
  `b5105da7b9404d2d2e42421fe732d047380a599e` was pushed. Guide archive commit
  `bde0807643718b94bc0e9ee31d478b7e8d5c7d3e` was pushed afterward. The project
  ended clean with local `main` exactly matching `origin/main`.
- **Continuity:** Producer context
  `019f7c0d-dc76-7510-8636-db23d81bf002` completed 9 turns; Reviewer context
  `019f7c10-aabf-75d2-bc9d-3f9804992246` completed 8. They remained distinct.
- **Durable evidence:** The complete verification history is stored in
  [COMPLETED-SESSION-HISTORY.bundle](verification-runs/2026-07-19-markdown-headings-01/COMPLETED-SESSION-HISTORY.bundle),
  SHA-256
  `a536da61e642ca57b019b72db15145804cbcf33443de60257ee19aebdf9b8cb3`.
- **Human UX findings:** The owner ceremony itself was usable and no longer relied
  on a pager, clipboard, long receipt paste, raw recovery command, or extra role
  window. Default model-event output still overemphasized inspection commands, and
  Reviewer conversation felt procedural. These findings are queued as presentation
  corrections; they did not alter the completed gate or close result.

## 2026-07-20 — Conversational Reviewer and phase-aware terminal development

- **Trigger:** Kristian reported that Reviewer chat felt mechanical and that the
  default streams overused inspection/check output without consistently naming the
  active phase.
- **Implementation under test:** Owner conversation now displays only the model's
  final direct answer, while raw intermediate events remain saved. The shared event
  renderer attaches the active phase, suppresses successful command spam, keeps
  failures visible without exposing command text, and emits one aggregate check
  summary. Guide no longer repeats one inspection line per command. The shared
  Reviewer skill now gives positive natural-conversation guidance without changing
  review criteria or routing markers.
- **Preserved failures:** The first focused run passed **22/31**; a missing import
  broke eight Reviewer paths and the toolkit integrity seal correctly refused the
  locally changed Guide path. After the import fix, the Reviewer slice passed
  **21/22**; the remaining assertion expected the old procedural title. The skill
  validator's non-executable file also produced one `permission denied` invocation.
  See the [development record](test-results/2026-07-20-conversational-reviewer-development-failures.md).
- **Corrected focused result:** Reviewer/relay **23/23**, Guide renderer **2/2**,
  skill validation PASS, dependency-free build PASS, and whitespace check PASS.
- **Complete local result:** The full suite passed **234/234** twice. The second
  durable transcript is
  [conversational-reviewer-final-local.md](test-results/2026-07-20-conversational-reviewer-final-local.md).
  Coverage passed **234/234** at **87.75% lines, 71.44% branches, and 86.14%
  functions** overall.
- **Package and repository result:** An isolated package dry-run contains 814
  entries, zero bundled dependencies, the compiled CLI, GPLv3, README, local
  Reviewer skill, and the intentional demo fixture. It excludes `.git`, `.koda`,
  `.env`, `.DS_Store`, and `node_modules`. The production-only audit reports zero
  vulnerabilities. Repository symlink scan, `git diff --check`, and
  `git fsck --full --no-dangling` passed.
- **Audit setup refusal:** Direct `npm audit` refused with `ENOLOCK` because this
  dependency-free source repository intentionally has no lockfile. The successful
  audit generated a temporary production lockfile outside the repository; no
  project file was changed to hide the refusal.
- **Audits:** The [quality audit](quality-runs/2026-07-20-conversational-owner-surface-11/RESULT.md)
  and [security audit](security-runs/2026-07-20-conversational-owner-surface-audit-17/RESULT.md)
  preserve the exact claims and honest boundaries.
- **Post-push result:** Code and local-evidence commits `1abdf68` and `975678e`
  reached `origin/main`. The unchanged complete suite then passed **234/234** in
  the [post-push transcript](test-results/2026-07-20-conversational-reviewer-pushed.md).
  Toolkit capability `conversational-owner-surface-v14` binds tested commit
  `975678e`, that transcript, the shared Reviewer skill, and every critical changed
  terminal/relay file.
- **Final assembly refusal:** The first package/security/skill/submission/integrity
  slice after promoting the new proof passed **33/34**. The judge-journey test still
  required the superseded `232-check` README wording and prior transcript link. The
  assertion now requires the current `234-check` post-push proof; no product,
  security, receipt, or gate condition was removed.
- **Second assembly refusal:** The corrected slice again passed **33/34** and
  exposed a second sequential stale assertion for `passes 232/232` in the
  submission checklist. It now requires `passes 234/234`. This was the same
  evidence-version migration, not a hidden product failure.
- **Corrected assembly result:** Package, security, skills, judge journey, and
  toolkit integrity passed **34/34** with the current 234-check claims and links.
- **Final pushed-candidate result:** After the corrected judge assertions and all
  release documents reached commit `e77c67c` on `origin/main`, the complete suite
  passed **234/234** again. The durable
  [submission-surface transcript](test-results/2026-07-20-submission-surface-final.md)
  names that exact base commit. No product or test file changed after this run.

## 2026-07-20 — Unauthenticated repository access probe

- **Target:** `https://github.com/freeborn-warrior/koda-codex`.
- **Result:** BLOCKED FOR JUDGES. Authenticated push and `origin/main` synchronization
  pass, but an unauthenticated HTTP request returned 404 and authenticated GitHub
  metadata reports visibility `PRIVATE`.
- **Rule check:** The live Devpost rules permit either a public repository or a
  private repository shared with both `testing@devpost.com` and
  `build-week-event@openai.com`.
- **Owner decision required:** Make the repository public, or keep it private and
  grant/verify both judging invitations. Koda must not represent the public clone
  path as judge-ready until one route is observed working.
