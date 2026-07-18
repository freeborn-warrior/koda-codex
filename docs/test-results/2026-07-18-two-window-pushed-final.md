# Per-test result — 2026-07-18-two-window-pushed-final

- Result: **PASS**
- Recorded at: 2026-07-18T18:44:36.893Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `84a31fb`
- Command: `/opt/homebrew/Cellar/node/26.0.0/bin/node --test --test-reporter=spec tests/config.test.ts tests/dogfood.test.ts tests/full-lifecycle.test.ts tests/gate.test.ts tests/hints.test.ts tests/history.test.ts tests/license.test.ts tests/package.test.ts tests/receipt-adversarial.test.ts tests/relay-runner.test.ts tests/relay-window.test.ts tests/review-binding.test.ts tests/review.test.ts tests/reviewer-fixtures.test.ts tests/security.test.ts tests/session.test.ts tests/skill.test.ts tests/stale-review.test.ts tests/status-truth.test.ts tests/submission.test.ts`

Every discovered test and subtest is named below. No result is aggregated away.

```text
✔ the default phase chain is configurable data in the required order (1.103417ms)
✔ config validation rejects unsafe session paths and drifting phase names (0.180208ms)
✔ config validation refuses a sessions directory that resolves outside the project (36.415125ms)
✔ the committed dogfood snapshot contains the full native chain and an internally bound close (16.281875ms)
✔ FULL LIFECYCLE SCENARIO: clean approvals traverse all six phases and pushed close (677.999167ms)
✔ FULL LIFECYCLE SCENARIO: a REVISE loop recovers in plan before completing and closing (559.0155ms)
✔ FULL LIFECYCLE SCENARIO: DISCUSS records an owner ruling and requires a fresh live review (438.436917ms)
✔ a complete artifact, review, allowed verdict, unique receipt, and ledger proof open the gate (28.113166ms)
▶ GATE MUTATION SUITE: each core condition refuses and names itself
  ✔ artifact exists (12.226125ms)
  ✔ artifact is non-empty (14.4875ms)
  ✔ artifact is a regular file (8.999417ms)
  ✔ review exists (7.912542ms)
  ✔ review is a regular file (8.8375ms)
  ✔ approval ledger is a regular file (13.065333ms)
  ✔ verdict REVISE is blocking (19.750834ms)
  ✔ verdict REJECT is blocking (17.776042ms)
  ✔ verdict DISCUSS is blocking (10.166ms)
  ✔ current receipt is quoted verbatim in the ledger (7.675333ms)
✔ GATE MUTATION SUITE: each core condition refuses and names itself (122.610667ms)
✔ outer receipt whitespace is ignored but inner bytes remain literal (24.897458ms)
▶ every gate condition fails closed when deliberately broken
  ✔ artifact missing (7.614792ms)
  ✔ artifact empty (10.360208ms)
  ✔ review missing (10.697709ms)
  ✔ verdict line missing (35.143ms)
  ✔ verdict unknown (23.053541ms)
  ✔ receipt missing from last line (13.713625ms)
  ✔ generated review metadata missing (14.321916ms)
  ✔ duplicate generated review metadata is ambiguous (9.971042ms)
  ✔ review metadata names a different phase (14.097958ms)
  ✔ artifact changed after review (15.794583ms)
  ✔ final receipt differs from generated receipt (7.914542ms)
  ✔ receipt reused by another review (11.255583ms)
  ✔ approval ledger missing (21.452208ms)
  ✔ exact receipt absent from ledger (12.191125ms)
  ✔ approver missing (7.692041ms)
  ✔ APPROVE WITH COMMENTS has no ledger comments (9.479458ms)
  ✔ REVISE blocks even with receipt proof (12.464875ms)
  ✔ REJECT blocks even with receipt proof (10.441292ms)
  ✔ DISCUSS blocks without an owner ruling (12.87125ms)
  ✔ DISCUSS still blocks after the ruling until a fresh review (12.382333ms)
✔ every gate condition fails closed when deliberately broken (275.686042ms)
✔ the approval and advancement recovery commands run exactly as printed (513.501208ms)
✔ the missing-review recovery command runs exactly as printed (473.159959ms)
✔ a phase entry remains valid only while every prior gate proof still exists on disk (31.992208ms)
✔ the repository carries the complete GPLv3-only license and Kristian's sole copyright (2.972916ms)
✔ PACKAGED NPX SUITE: the source-controlled binary is executable before npm touches it (2.677334ms)
✔ PACKAGED NPX SUITE: the documented local npx command does not mutate its checkout (1140.874ms)
✔ PACKAGED NPX SUITE: a real tarball installs and runs the plain-JavaScript koda binary (2451.411542ms)
✔ RECEIPT ADVERSARIAL SUITE: an earlier review's receipt cannot approve a fresh review (22.62625ms)
✔ RECEIPT ADVERSARIAL SUITE: phase N receipt cannot approve phase N+1 (11.378625ms)
✔ RECEIPT ADVERSARIAL SUITE: outer whitespace is accepted and any inner word change refuses (16.408792ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REVISE (8.253125ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REJECT (10.876875ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override DISCUSS (22.466333ms)
✔ FULL RELAY RUNNER: preparation creates a clean pushed project with local skills (683.285584ms)
✔ FULL RELAY RUNNER: execution preserves two contexts and never automates owner receipt proof (1.332042ms)
✔ GENUINE FULL RELAY EVIDENCE: six phases, revision recovery, distinct contexts, and pushed close (13.689166ms)
✔ TWO-WINDOW PROTOCOL: reviewer jobs are bounded and duplicate reviewer windows refuse (22.930292ms)
✔ TWO-WINDOW VISIBILITY: progress is readable without exposing review receipts (0.579542ms)
✔ TWO-WINDOW RECEIPT: exact owner quote is recorded from Window B (735.351042ms)
✔ TWO-WINDOW RECEIPT MUTATION: a wrong quote refuses and names the preserved failed job (557.857791ms)
✔ TWO-WINDOW RELAY: a pending formal-review job wakes one persistent reviewer and returns acknowledged disk evidence (754.987167ms)
✔ TWO-WINDOW SESSION: separate producer and reviewer processes rendezvous through pushed close (3130.561667ms)
✔ REVIEW BINDING SUITE: changing review findings after owner acknowledgement refuses (42.008125ms)
✔ REVIEW BINDING SUITE: an untouched generated template cannot become an approved review (17.885ms)
✔ a current review cannot be replaced before its receipt is recorded (26.386ms)
✔ a revised artifact receives a fresh review, fresh receipt, and archived prior review (17.012875ms)
✔ DISCUSS requires the owner's ruling before a fresh definitive review (26.73075ms)
✔ REVIEWER FIXTURES: five sealed fixtures ship as blind Koda projects (31.808666ms)
✔ REVIEWER FIXTURES: the planted hard number is unsupported and the control has no plant (1.19175ms)
✔ REVIEWER FIXTURES: inference-chain plant requires a deduction across three source files (0.567209ms)
✔ REVIEWER FIXTURES: tempting honest control is imperfect in style but its claims execute (61.985042ms)
✔ REVIEWER FIXTURES: evidence-absence trap has working code but its claimed run record is missing (68.625334ms)
✔ REVIEWER FIXTURES: new scoring contracts still match their pre-run Git seal (40.481541ms)
✔ REVIEWER FIXTURES: Ghostty runs pin model and effort and preserve ephemeral Codex events (0.847084ms)
✔ REVIEWER FIXTURES: the bounded model matrix is backed by seventeen graded run folders (37.972875ms)
✔ SECURITY INTEGRITY SUITE: the install is dependency-free with no install hook (6.075583ms)
✔ SECURITY INTEGRITY SUITE: the committed repository contains no symbolic link (13.139542ms)
✔ SECURITY INTEGRITY SUITE: tracked text contains no common live credential signature (158.619917ms)
✔ session creation requires a prompt and numbers dated folders (16.512625ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-qaOftZ/remote.git
 * [new branch]      main -> main
✔ a completed session is closed only after its state is committed and pushed (1343.677542ms)
✔ immutable close refuses symbolic links inside session evidence (4.640125ms)
✔ immutable close refuses duplicate generated metadata markers (0.080666ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-ignored-remote-xrnQ8C/remote.git
 * [new branch]      main -> main
✔ immutable close refuses a bound session file that Git ignored instead of pushing (214.117458ms)
✔ every Koda-C skill has valid relay sections and four-line Codex metadata (9.448083ms)
✔ skill index metadata stays concise, front-loaded, and trigger-specific (3.834583ms)
✔ producer phase skills hand only to the one shared reviewer (1.589333ms)
✔ the shared reviewer keeps all phase criteria in one place (1.719ms)
✔ in-phase consultation is disk-backed and cannot impersonate formal review (1.652083ms)
✔ session open and close remain ceremonies outside producer phase routing (0.350375ms)
✔ fresh Codex startup discovers all nine local skills and root guidance without reading disk (0.995333ms)
✔ STALE-REVIEW BINDING: editing the artifact after review refuses with a named re-review reason (28.672584ms)
✔ STALE-REVIEW BINDING: reviewing after an edit binds the new artifact and opens (15.995625ms)
✔ STATUS TRUTH SUITE: deleting a review is reflected immediately (243.426166ms)
✔ STATUS TRUTH SUITE: blanking an artifact is reflected immediately (222.616084ms)
✔ STATUS TRUTH SUITE: corrupt ledger metadata refuses with a named corruption reason (122.0215ms)
✔ STATUS TRUTH SUITE: editing an acknowledged review is reflected immediately (100.93375ms)
✔ STATUS TRUTH SUITE: invalid state JSON refuses instead of guessing (104.895666ms)
✔ STATUS TRUTH SUITE: a path-like phase name in state refuses instead of escaping (106.401375ms)
✔ JUDGE JOURNEY SUITE: the committed binary runs without rebuilding (75.76675ms)
✔ JUDGE JOURNEY SUITE: video and submission documents preserve every live rule (3.674292ms)
✔ JUDGE JOURNEY SUITE: local links in the judge documents resolve (9.587375ms)
ℹ tests 102
ℹ suites 0
ℹ pass 102
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 5505.497625
```
