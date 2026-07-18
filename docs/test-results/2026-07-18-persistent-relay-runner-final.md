# Per-test result — 2026-07-18-persistent-relay-runner-final

- Result: **PASS**
- Recorded at: 2026-07-18T15:50:59.972Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `b4434e4`
- Command: `/opt/homebrew/Cellar/node/26.0.0/bin/node --test --test-reporter=spec tests/config.test.ts tests/dogfood.test.ts tests/full-lifecycle.test.ts tests/gate.test.ts tests/hints.test.ts tests/history.test.ts tests/license.test.ts tests/package.test.ts tests/receipt-adversarial.test.ts tests/relay-runner.test.ts tests/review-binding.test.ts tests/review.test.ts tests/reviewer-fixtures.test.ts tests/session.test.ts tests/skill.test.ts tests/stale-review.test.ts tests/status-truth.test.ts`

Every discovered test and subtest is named below. No result is aggregated away.

```text
✔ the default phase chain is configurable data in the required order (2.982333ms)
✔ config validation rejects unsafe session paths and drifting phase names (0.417959ms)
✔ the committed dogfood snapshot contains the full native chain and an internally bound close (29.129416ms)
✔ FULL LIFECYCLE SCENARIO: clean approvals traverse all six phases and pushed close (429.108333ms)
✔ FULL LIFECYCLE SCENARIO: a REVISE loop recovers in plan before completing and closing (352.150167ms)
✔ FULL LIFECYCLE SCENARIO: DISCUSS records an owner ruling and requires a fresh live review (365.470416ms)
✔ a complete artifact, review, allowed verdict, unique receipt, and ledger proof open the gate (29.77225ms)
▶ GATE MUTATION SUITE: each core condition refuses and names itself
  ✔ artifact exists (13.561875ms)
  ✔ artifact is non-empty (9.801125ms)
  ✔ review exists (9.086625ms)
  ✔ verdict REVISE is blocking (9.280208ms)
  ✔ verdict REJECT is blocking (11.30225ms)
  ✔ verdict DISCUSS is blocking (15.290959ms)
  ✔ current receipt is quoted verbatim in the ledger (7.092583ms)
✔ GATE MUTATION SUITE: each core condition refuses and names itself (76.749292ms)
✔ outer receipt whitespace is ignored but inner bytes remain literal (22.536708ms)
▶ every gate condition fails closed when deliberately broken
  ✔ artifact missing (8.212375ms)
  ✔ artifact empty (12.481708ms)
  ✔ review missing (9.548917ms)
  ✔ verdict line missing (6.568542ms)
  ✔ verdict unknown (7.709416ms)
  ✔ receipt missing from last line (7.673625ms)
  ✔ generated review metadata missing (9.097333ms)
  ✔ review metadata names a different phase (9.200917ms)
  ✔ artifact changed after review (11.714167ms)
  ✔ final receipt differs from generated receipt (10.137875ms)
  ✔ receipt reused by another review (7.877167ms)
  ✔ approval ledger missing (6.599958ms)
  ✔ exact receipt absent from ledger (6.816625ms)
  ✔ approver missing (7.049625ms)
  ✔ APPROVE WITH COMMENTS has no ledger comments (7.120458ms)
  ✔ REVISE blocks even with receipt proof (8.46025ms)
  ✔ REJECT blocks even with receipt proof (12.775541ms)
  ✔ DISCUSS blocks without an owner ruling (12.040875ms)
  ✔ DISCUSS still blocks after the ruling until a fresh review (14.604083ms)
✔ every gate condition fails closed when deliberately broken (178.102583ms)
✔ the approval and advancement recovery commands run exactly as printed (609.303375ms)
✔ the missing-review recovery command runs exactly as printed (476.808334ms)
✔ a phase entry remains valid only while every prior gate proof still exists on disk (35.459458ms)
✔ the repository carries the complete GPLv3-only license and Kristian's sole copyright (21.892208ms)
✔ PACKAGED NPX SUITE: a real tarball installs and runs the plain-JavaScript koda binary (2519.265083ms)
✔ RECEIPT ADVERSARIAL SUITE: an earlier review's receipt cannot approve a fresh review (40.407625ms)
✔ RECEIPT ADVERSARIAL SUITE: phase N receipt cannot approve phase N+1 (12.047167ms)
✔ RECEIPT ADVERSARIAL SUITE: outer whitespace is accepted and any inner word change refuses (19.759708ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REVISE (9.930792ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REJECT (13.933125ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override DISCUSS (11.951167ms)
✔ FULL RELAY RUNNER: preparation creates a clean pushed project with local skills (570.648667ms)
✔ FULL RELAY RUNNER: execution preserves two contexts and never automates owner receipt proof (1.469ms)
✔ REVIEW BINDING SUITE: changing review findings after owner acknowledgement refuses (18.182042ms)
✔ REVIEW BINDING SUITE: an untouched generated template cannot become an approved review (11.429375ms)
✔ a current review cannot be replaced before its receipt is recorded (18.018292ms)
✔ a revised artifact receives a fresh review, fresh receipt, and archived prior review (20.150333ms)
✔ DISCUSS requires the owner's ruling before a fresh definitive review (23.997ms)
✔ REVIEWER FIXTURES: five sealed fixtures ship as blind Koda projects (31.523041ms)
✔ REVIEWER FIXTURES: the planted hard number is unsupported and the control has no plant (1.41225ms)
✔ REVIEWER FIXTURES: inference-chain plant requires a deduction across three source files (1.285375ms)
✔ REVIEWER FIXTURES: tempting honest control is imperfect in style but its claims execute (81.427916ms)
✔ REVIEWER FIXTURES: evidence-absence trap has working code but its claimed run record is missing (80.912583ms)
✔ REVIEWER FIXTURES: new scoring contracts still match their pre-run Git seal (51.749667ms)
✔ REVIEWER FIXTURES: Ghostty runs pin model and effort and preserve ephemeral Codex events (1.034708ms)
✔ REVIEWER FIXTURES: the medium model matrix is backed by six graded run folders (1.851083ms)
✔ session creation requires a prompt and numbers dated folders (18.389083ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-2dOLSG/remote.git
 * [new branch]      main -> main
✔ a completed session is closed only after its state is committed and pushed (1021.017666ms)
✔ every Koda-C skill has valid relay sections and four-line Codex metadata (7.607958ms)
✔ skill index metadata stays concise, front-loaded, and trigger-specific (7.1955ms)
✔ producer phase skills hand only to the one shared reviewer (4.302541ms)
✔ the shared reviewer keeps all phase criteria in one place (2.060792ms)
✔ in-phase consultation is disk-backed and cannot impersonate formal review (3.99475ms)
✔ session open and close remain ceremonies outside producer phase routing (0.466125ms)
✔ STALE-REVIEW BINDING: editing the artifact after review refuses with a named re-review reason (19.9075ms)
✔ STALE-REVIEW BINDING: reviewing after an edit binds the new artifact and opens (18.331666ms)
✔ STATUS TRUTH SUITE: deleting a review is reflected immediately (271.772917ms)
✔ STATUS TRUTH SUITE: blanking an artifact is reflected immediately (223.299167ms)
✔ STATUS TRUTH SUITE: corrupt ledger metadata refuses with a named corruption reason (117.627459ms)
✔ STATUS TRUTH SUITE: editing an acknowledged review is reflected immediately (107.895291ms)
✔ STATUS TRUTH SUITE: invalid state JSON refuses instead of guessing (104.02275ms)
ℹ tests 77
ℹ suites 0
ℹ pass 77
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 2675.071333
```
