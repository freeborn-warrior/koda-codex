# Per-test result — 2026-07-18-genuine-relay-evidence-final

- Result: **PASS**
- Recorded at: 2026-07-18T16:49:54.427Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `f2c32f5`
- Command: `/opt/homebrew/Cellar/node/26.0.0/bin/node --test --test-reporter=spec tests/config.test.ts tests/dogfood.test.ts tests/full-lifecycle.test.ts tests/gate.test.ts tests/hints.test.ts tests/history.test.ts tests/license.test.ts tests/package.test.ts tests/receipt-adversarial.test.ts tests/relay-runner.test.ts tests/review-binding.test.ts tests/review.test.ts tests/reviewer-fixtures.test.ts tests/session.test.ts tests/skill.test.ts tests/stale-review.test.ts tests/status-truth.test.ts`

Every discovered test and subtest is named below. No result is aggregated away.

```text
✔ the default phase chain is configurable data in the required order (1.234458ms)
✔ config validation rejects unsafe session paths and drifting phase names (0.188292ms)
✔ the committed dogfood snapshot contains the full native chain and an internally bound close (29.289708ms)
✔ FULL LIFECYCLE SCENARIO: clean approvals traverse all six phases and pushed close (545.323166ms)
✔ FULL LIFECYCLE SCENARIO: a REVISE loop recovers in plan before completing and closing (386.388791ms)
✔ FULL LIFECYCLE SCENARIO: DISCUSS records an owner ruling and requires a fresh live review (316.101958ms)
✔ a complete artifact, review, allowed verdict, unique receipt, and ledger proof open the gate (33.659666ms)
▶ GATE MUTATION SUITE: each core condition refuses and names itself
  ✔ artifact exists (14.881834ms)
  ✔ artifact is non-empty (10.276958ms)
  ✔ review exists (8.635833ms)
  ✔ verdict REVISE is blocking (10.309709ms)
  ✔ verdict REJECT is blocking (17.864833ms)
  ✔ verdict DISCUSS is blocking (23.020792ms)
  ✔ current receipt is quoted verbatim in the ledger (19.176333ms)
✔ GATE MUTATION SUITE: each core condition refuses and names itself (105.491209ms)
✔ outer receipt whitespace is ignored but inner bytes remain literal (32.8645ms)
▶ every gate condition fails closed when deliberately broken
  ✔ artifact missing (11.143875ms)
  ✔ artifact empty (15.847834ms)
  ✔ review missing (14.344542ms)
  ✔ verdict line missing (10.267791ms)
  ✔ verdict unknown (14.786875ms)
  ✔ receipt missing from last line (40.838875ms)
  ✔ generated review metadata missing (10.9755ms)
  ✔ review metadata names a different phase (10.387083ms)
  ✔ artifact changed after review (9.702375ms)
  ✔ final receipt differs from generated receipt (8.553375ms)
  ✔ receipt reused by another review (8.575ms)
  ✔ approval ledger missing (7.0705ms)
  ✔ exact receipt absent from ledger (7.275583ms)
  ✔ approver missing (8.331625ms)
  ✔ APPROVE WITH COMMENTS has no ledger comments (9.889541ms)
  ✔ REVISE blocks even with receipt proof (8.934791ms)
  ✔ REJECT blocks even with receipt proof (10.434292ms)
  ✔ DISCUSS blocks without an owner ruling (9.399667ms)
  ✔ DISCUSS still blocks after the ruling until a fresh review (26.907542ms)
✔ every gate condition fails closed when deliberately broken (246.183917ms)
✔ the approval and advancement recovery commands run exactly as printed (595.550708ms)
✔ the missing-review recovery command runs exactly as printed (476.589791ms)
✔ a phase entry remains valid only while every prior gate proof still exists on disk (48.608917ms)
✔ the repository carries the complete GPLv3-only license and Kristian's sole copyright (5.794375ms)
✔ PACKAGED NPX SUITE: a real tarball installs and runs the plain-JavaScript koda binary (2647.393667ms)
✔ RECEIPT ADVERSARIAL SUITE: an earlier review's receipt cannot approve a fresh review (30.798792ms)
✔ RECEIPT ADVERSARIAL SUITE: phase N receipt cannot approve phase N+1 (15.784041ms)
✔ RECEIPT ADVERSARIAL SUITE: outer whitespace is accepted and any inner word change refuses (20.475291ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REVISE (14.918416ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REJECT (24.252417ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override DISCUSS (18.137583ms)
✔ FULL RELAY RUNNER: preparation creates a clean pushed project with local skills (672.499708ms)
✔ FULL RELAY RUNNER: execution preserves two contexts and never automates owner receipt proof (1.291958ms)
✔ GENUINE FULL RELAY EVIDENCE: six phases, revision recovery, distinct contexts, and pushed close (15.275833ms)
✔ REVIEW BINDING SUITE: changing review findings after owner acknowledgement refuses (29.428875ms)
✔ REVIEW BINDING SUITE: an untouched generated template cannot become an approved review (15.980834ms)
✔ a current review cannot be replaced before its receipt is recorded (21.428167ms)
✔ a revised artifact receives a fresh review, fresh receipt, and archived prior review (17.732ms)
✔ DISCUSS requires the owner's ruling before a fresh definitive review (31.6455ms)
✔ REVIEWER FIXTURES: five sealed fixtures ship as blind Koda projects (35.343042ms)
✔ REVIEWER FIXTURES: the planted hard number is unsupported and the control has no plant (1.078958ms)
✔ REVIEWER FIXTURES: inference-chain plant requires a deduction across three source files (0.452292ms)
✔ REVIEWER FIXTURES: tempting honest control is imperfect in style but its claims execute (83.72325ms)
✔ REVIEWER FIXTURES: evidence-absence trap has working code but its claimed run record is missing (94.554917ms)
✔ REVIEWER FIXTURES: new scoring contracts still match their pre-run Git seal (66.706ms)
✔ REVIEWER FIXTURES: Ghostty runs pin model and effort and preserve ephemeral Codex events (0.483167ms)
✔ REVIEWER FIXTURES: the medium model matrix is backed by six graded run folders (1.872083ms)
✔ session creation requires a prompt and numbers dated folders (17.261041ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-XRSS0w/remote.git
 * [new branch]      main -> main
✔ a completed session is closed only after its state is committed and pushed (1083.584042ms)
✔ every Koda-C skill has valid relay sections and four-line Codex metadata (7.935417ms)
✔ skill index metadata stays concise, front-loaded, and trigger-specific (4.256625ms)
✔ producer phase skills hand only to the one shared reviewer (3.472292ms)
✔ the shared reviewer keeps all phase criteria in one place (3.36175ms)
✔ in-phase consultation is disk-backed and cannot impersonate formal review (2.196ms)
✔ session open and close remain ceremonies outside producer phase routing (1.155375ms)
✔ STALE-REVIEW BINDING: editing the artifact after review refuses with a named re-review reason (21.491458ms)
✔ STALE-REVIEW BINDING: reviewing after an edit binds the new artifact and opens (16.740292ms)
✔ STATUS TRUTH SUITE: deleting a review is reflected immediately (284.925084ms)
✔ STATUS TRUTH SUITE: blanking an artifact is reflected immediately (232.727458ms)
✔ STATUS TRUTH SUITE: corrupt ledger metadata refuses with a named corruption reason (117.973708ms)
✔ STATUS TRUTH SUITE: editing an acknowledged review is reflected immediately (111.934834ms)
✔ STATUS TRUTH SUITE: invalid state JSON refuses instead of guessing (112.882458ms)
ℹ tests 78
ℹ suites 0
ℹ pass 78
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 2823.077625
```
