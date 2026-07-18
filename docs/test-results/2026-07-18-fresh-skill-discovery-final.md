# Per-test result — 2026-07-18-fresh-skill-discovery-final

- Result: **PASS**
- Recorded at: 2026-07-18T17:37:14.045Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `dfe2631`
- Command: `/opt/homebrew/Cellar/node/26.0.0/bin/node --test --test-reporter=spec tests/config.test.ts tests/dogfood.test.ts tests/full-lifecycle.test.ts tests/gate.test.ts tests/hints.test.ts tests/history.test.ts tests/license.test.ts tests/package.test.ts tests/receipt-adversarial.test.ts tests/relay-runner.test.ts tests/review-binding.test.ts tests/review.test.ts tests/reviewer-fixtures.test.ts tests/session.test.ts tests/skill.test.ts tests/stale-review.test.ts tests/status-truth.test.ts`

Every discovered test and subtest is named below. No result is aggregated away.

```text
✔ the default phase chain is configurable data in the required order (2.823208ms)
✔ config validation rejects unsafe session paths and drifting phase names (0.493417ms)
✔ the committed dogfood snapshot contains the full native chain and an internally bound close (23.559209ms)
✔ FULL LIFECYCLE SCENARIO: clean approvals traverse all six phases and pushed close (522.210708ms)
✔ FULL LIFECYCLE SCENARIO: a REVISE loop recovers in plan before completing and closing (401.246375ms)
✔ FULL LIFECYCLE SCENARIO: DISCUSS records an owner ruling and requires a fresh live review (316.218208ms)
✔ a complete artifact, review, allowed verdict, unique receipt, and ledger proof open the gate (44.350042ms)
▶ GATE MUTATION SUITE: each core condition refuses and names itself
  ✔ artifact exists (26.999084ms)
  ✔ artifact is non-empty (17.711292ms)
  ✔ review exists (8.36875ms)
  ✔ verdict REVISE is blocking (27.638792ms)
  ✔ verdict REJECT is blocking (13.198709ms)
  ✔ verdict DISCUSS is blocking (21.810166ms)
  ✔ current receipt is quoted verbatim in the ledger (13.665459ms)
✔ GATE MUTATION SUITE: each core condition refuses and names itself (130.691542ms)
✔ outer receipt whitespace is ignored but inner bytes remain literal (35.939792ms)
▶ every gate condition fails closed when deliberately broken
  ✔ artifact missing (13.58125ms)
  ✔ artifact empty (13.206375ms)
  ✔ review missing (19.398625ms)
  ✔ verdict line missing (27.012375ms)
  ✔ verdict unknown (26.267791ms)
  ✔ receipt missing from last line (11.318791ms)
  ✔ generated review metadata missing (8.873583ms)
  ✔ review metadata names a different phase (9.694083ms)
  ✔ artifact changed after review (13.511542ms)
  ✔ final receipt differs from generated receipt (14.663291ms)
  ✔ receipt reused by another review (16.078917ms)
  ✔ approval ledger missing (9.861167ms)
  ✔ exact receipt absent from ledger (7.732ms)
  ✔ approver missing (8.677458ms)
  ✔ APPROVE WITH COMMENTS has no ledger comments (10.990917ms)
  ✔ REVISE blocks even with receipt proof (20.948334ms)
  ✔ REJECT blocks even with receipt proof (8.079833ms)
  ✔ DISCUSS blocks without an owner ruling (8.326208ms)
  ✔ DISCUSS still blocks after the ruling until a fresh review (7.113959ms)
✔ every gate condition fails closed when deliberately broken (257.952ms)
✔ the approval and advancement recovery commands run exactly as printed (642.823667ms)
✔ the missing-review recovery command runs exactly as printed (480.327ms)
✔ a phase entry remains valid only while every prior gate proof still exists on disk (36.907042ms)
✔ the repository carries the complete GPLv3-only license and Kristian's sole copyright (11.253125ms)
✔ PACKAGED NPX SUITE: a real tarball installs and runs the plain-JavaScript koda binary (2895.934209ms)
✔ RECEIPT ADVERSARIAL SUITE: an earlier review's receipt cannot approve a fresh review (33.940334ms)
✔ RECEIPT ADVERSARIAL SUITE: phase N receipt cannot approve phase N+1 (29.710791ms)
✔ RECEIPT ADVERSARIAL SUITE: outer whitespace is accepted and any inner word change refuses (25.080875ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REVISE (26.507792ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REJECT (20.53525ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override DISCUSS (12.788875ms)
✔ FULL RELAY RUNNER: preparation creates a clean pushed project with local skills (693.516292ms)
✔ FULL RELAY RUNNER: execution preserves two contexts and never automates owner receipt proof (1.049084ms)
✔ GENUINE FULL RELAY EVIDENCE: six phases, revision recovery, distinct contexts, and pushed close (16.969125ms)
✔ REVIEW BINDING SUITE: changing review findings after owner acknowledgement refuses (33.424334ms)
✔ REVIEW BINDING SUITE: an untouched generated template cannot become an approved review (13.80225ms)
✔ a current review cannot be replaced before its receipt is recorded (23.522ms)
✔ a revised artifact receives a fresh review, fresh receipt, and archived prior review (14.627833ms)
✔ DISCUSS requires the owner's ruling before a fresh definitive review (37.712041ms)
✔ REVIEWER FIXTURES: five sealed fixtures ship as blind Koda projects (33.996459ms)
✔ REVIEWER FIXTURES: the planted hard number is unsupported and the control has no plant (2.822417ms)
✔ REVIEWER FIXTURES: inference-chain plant requires a deduction across three source files (1.071292ms)
✔ REVIEWER FIXTURES: tempting honest control is imperfect in style but its claims execute (86.571875ms)
✔ REVIEWER FIXTURES: evidence-absence trap has working code but its claimed run record is missing (86.427042ms)
✔ REVIEWER FIXTURES: new scoring contracts still match their pre-run Git seal (57.825125ms)
✔ REVIEWER FIXTURES: Ghostty runs pin model and effort and preserve ephemeral Codex events (0.934667ms)
✔ REVIEWER FIXTURES: the bounded model matrix is backed by seventeen graded run folders (26.771917ms)
✔ session creation requires a prompt and numbers dated folders (16.2525ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-Fpo1GU/remote.git
 * [new branch]      main -> main
✔ a completed session is closed only after its state is committed and pushed (1036.794625ms)
✔ every Koda-C skill has valid relay sections and four-line Codex metadata (8.514834ms)
✔ skill index metadata stays concise, front-loaded, and trigger-specific (5.8385ms)
✔ producer phase skills hand only to the one shared reviewer (2.619333ms)
✔ the shared reviewer keeps all phase criteria in one place (1.944458ms)
✔ in-phase consultation is disk-backed and cannot impersonate formal review (2.665458ms)
✔ session open and close remain ceremonies outside producer phase routing (1.318625ms)
✔ fresh Codex startup discovers all nine local skills and root guidance without reading disk (2.477667ms)
✔ STALE-REVIEW BINDING: editing the artifact after review refuses with a named re-review reason (22.459083ms)
✔ STALE-REVIEW BINDING: reviewing after an edit binds the new artifact and opens (17.955917ms)
✔ STATUS TRUTH SUITE: deleting a review is reflected immediately (254.697541ms)
✔ STATUS TRUTH SUITE: blanking an artifact is reflected immediately (241.819042ms)
✔ STATUS TRUTH SUITE: corrupt ledger metadata refuses with a named corruption reason (120.394167ms)
✔ STATUS TRUTH SUITE: editing an acknowledged review is reflected immediately (103.20875ms)
✔ STATUS TRUTH SUITE: invalid state JSON refuses instead of guessing (102.641125ms)
ℹ tests 79
ℹ suites 0
ℹ pass 79
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 3060.686417
```
