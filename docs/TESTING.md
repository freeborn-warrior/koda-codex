# Testing ledger

Every durable test result is recorded here. Deterministic Node.js tests do not invoke a model, so model variant and effort are marked not applicable rather than invented.

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
