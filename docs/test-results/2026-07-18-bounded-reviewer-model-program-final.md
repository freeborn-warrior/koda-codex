# Per-test result — 2026-07-18-bounded-reviewer-model-program-final

- Result: **PASS**
- Recorded at: 2026-07-18T17:20:22.167Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `af5fa03`
- Command: `/opt/homebrew/Cellar/node/26.0.0/bin/node --test --test-reporter=spec tests/config.test.ts tests/dogfood.test.ts tests/full-lifecycle.test.ts tests/gate.test.ts tests/hints.test.ts tests/history.test.ts tests/license.test.ts tests/package.test.ts tests/receipt-adversarial.test.ts tests/relay-runner.test.ts tests/review-binding.test.ts tests/review.test.ts tests/reviewer-fixtures.test.ts tests/session.test.ts tests/skill.test.ts tests/stale-review.test.ts tests/status-truth.test.ts`

Every discovered test and subtest is named below. No result is aggregated away.

```text
✔ the default phase chain is configurable data in the required order (5.338333ms)
✔ config validation rejects unsafe session paths and drifting phase names (0.531042ms)
✔ the committed dogfood snapshot contains the full native chain and an internally bound close (27.086166ms)
✔ FULL LIFECYCLE SCENARIO: clean approvals traverse all six phases and pushed close (476.72775ms)
✔ FULL LIFECYCLE SCENARIO: a REVISE loop recovers in plan before completing and closing (370.608125ms)
✔ FULL LIFECYCLE SCENARIO: DISCUSS records an owner ruling and requires a fresh live review (340.664375ms)
✔ a complete artifact, review, allowed verdict, unique receipt, and ledger proof open the gate (30.636292ms)
▶ GATE MUTATION SUITE: each core condition refuses and names itself
  ✔ artifact exists (10.012292ms)
  ✔ artifact is non-empty (8.581375ms)
  ✔ review exists (6.392833ms)
  ✔ verdict REVISE is blocking (7.85575ms)
  ✔ verdict REJECT is blocking (7.436417ms)
  ✔ verdict DISCUSS is blocking (8.675583ms)
  ✔ current receipt is quoted verbatim in the ledger (6.556458ms)
✔ GATE MUTATION SUITE: each core condition refuses and names itself (56.716167ms)
✔ outer receipt whitespace is ignored but inner bytes remain literal (17.977542ms)
▶ every gate condition fails closed when deliberately broken
  ✔ artifact missing (9.3865ms)
  ✔ artifact empty (9.208417ms)
  ✔ review missing (8.879917ms)
  ✔ verdict line missing (11.212541ms)
  ✔ verdict unknown (7.8385ms)
  ✔ receipt missing from last line (8.206917ms)
  ✔ generated review metadata missing (9.019083ms)
  ✔ review metadata names a different phase (4.759208ms)
  ✔ artifact changed after review (7.161959ms)
  ✔ final receipt differs from generated receipt (7.069458ms)
  ✔ receipt reused by another review (7.751875ms)
  ✔ approval ledger missing (8.459375ms)
  ✔ exact receipt absent from ledger (6.547833ms)
  ✔ approver missing (5.260167ms)
  ✔ APPROVE WITH COMMENTS has no ledger comments (6.5615ms)
  ✔ REVISE blocks even with receipt proof (5.701042ms)
  ✔ REJECT blocks even with receipt proof (6.048458ms)
  ✔ DISCUSS blocks without an owner ruling (5.956208ms)
  ✔ DISCUSS still blocks after the ruling until a fresh review (6.683166ms)
✔ every gate condition fails closed when deliberately broken (143.947166ms)
✔ the approval and advancement recovery commands run exactly as printed (604.762959ms)
✔ the missing-review recovery command runs exactly as printed (487.32725ms)
✔ a phase entry remains valid only while every prior gate proof still exists on disk (25.464875ms)
✔ the repository carries the complete GPLv3-only license and Kristian's sole copyright (5.535291ms)
✔ PACKAGED NPX SUITE: a real tarball installs and runs the plain-JavaScript koda binary (2986.481333ms)
✔ RECEIPT ADVERSARIAL SUITE: an earlier review's receipt cannot approve a fresh review (34.052375ms)
✔ RECEIPT ADVERSARIAL SUITE: phase N receipt cannot approve phase N+1 (9.492042ms)
✔ RECEIPT ADVERSARIAL SUITE: outer whitespace is accepted and any inner word change refuses (17.78725ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REVISE (9.090625ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REJECT (12.595458ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override DISCUSS (9.333708ms)
✔ FULL RELAY RUNNER: preparation creates a clean pushed project with local skills (719.432042ms)
✔ FULL RELAY RUNNER: execution preserves two contexts and never automates owner receipt proof (1.525375ms)
✔ GENUINE FULL RELAY EVIDENCE: six phases, revision recovery, distinct contexts, and pushed close (15.810041ms)
✔ REVIEW BINDING SUITE: changing review findings after owner acknowledgement refuses (31.396ms)
✔ REVIEW BINDING SUITE: an untouched generated template cannot become an approved review (25.98575ms)
✔ a current review cannot be replaced before its receipt is recorded (25.340542ms)
✔ a revised artifact receives a fresh review, fresh receipt, and archived prior review (36.791584ms)
✔ DISCUSS requires the owner's ruling before a fresh definitive review (15.744166ms)
✔ REVIEWER FIXTURES: five sealed fixtures ship as blind Koda projects (27.237292ms)
✔ REVIEWER FIXTURES: the planted hard number is unsupported and the control has no plant (2.016958ms)
✔ REVIEWER FIXTURES: inference-chain plant requires a deduction across three source files (3.124917ms)
✔ REVIEWER FIXTURES: tempting honest control is imperfect in style but its claims execute (91.784166ms)
✔ REVIEWER FIXTURES: evidence-absence trap has working code but its claimed run record is missing (91.782416ms)
✔ REVIEWER FIXTURES: new scoring contracts still match their pre-run Git seal (51.296417ms)
✔ REVIEWER FIXTURES: Ghostty runs pin model and effort and preserve ephemeral Codex events (1.01675ms)
✔ REVIEWER FIXTURES: the bounded model matrix is backed by seventeen graded run folders (27.61325ms)
✔ session creation requires a prompt and numbers dated folders (16.211125ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-gZVNJh/remote.git
 * [new branch]      main -> main
✔ a completed session is closed only after its state is committed and pushed (1048.105875ms)
✔ every Koda-C skill has valid relay sections and four-line Codex metadata (13.142209ms)
✔ skill index metadata stays concise, front-loaded, and trigger-specific (7.709625ms)
✔ producer phase skills hand only to the one shared reviewer (10.942959ms)
✔ the shared reviewer keeps all phase criteria in one place (3.909208ms)
✔ in-phase consultation is disk-backed and cannot impersonate formal review (2.947958ms)
✔ session open and close remain ceremonies outside producer phase routing (0.4335ms)
✔ STALE-REVIEW BINDING: editing the artifact after review refuses with a named re-review reason (26.526917ms)
✔ STALE-REVIEW BINDING: reviewing after an edit binds the new artifact and opens (12.650375ms)
✔ STATUS TRUTH SUITE: deleting a review is reflected immediately (271.008709ms)
✔ STATUS TRUTH SUITE: blanking an artifact is reflected immediately (258.5375ms)
✔ STATUS TRUTH SUITE: corrupt ledger metadata refuses with a named corruption reason (114.602125ms)
✔ STATUS TRUTH SUITE: editing an acknowledged review is reflected immediately (109.562208ms)
✔ STATUS TRUTH SUITE: invalid state JSON refuses instead of guessing (106.464292ms)
ℹ tests 78
ℹ suites 0
ℹ pass 78
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 3152.406791
```
