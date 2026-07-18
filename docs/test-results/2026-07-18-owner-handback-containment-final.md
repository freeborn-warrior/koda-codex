# Per-test result — 2026-07-18-owner-handback-containment-final

- Result: **PASS**
- Recorded at: 2026-07-18T19:22:40.755Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `1393432`
- Command: `/opt/homebrew/Cellar/node/26.0.0/bin/node --test --test-reporter=spec tests/config.test.ts tests/dogfood.test.ts tests/full-lifecycle.test.ts tests/gate.test.ts tests/hints.test.ts tests/history.test.ts tests/license.test.ts tests/package.test.ts tests/receipt-adversarial.test.ts tests/relay-runner.test.ts tests/relay-status.test.ts tests/relay-window.test.ts tests/review-binding.test.ts tests/review.test.ts tests/reviewer-fixtures.test.ts tests/security.test.ts tests/session.test.ts tests/skill.test.ts tests/stale-review.test.ts tests/status-truth.test.ts tests/submission.test.ts`

Every discovered test and subtest is named below. No result is aggregated away.

```text
✔ the default phase chain is configurable data in the required order (5.749041ms)
✔ config validation rejects unsafe session paths and drifting phase names (0.379208ms)
✔ config validation refuses a sessions directory that resolves outside the project (16.649459ms)
✔ the committed dogfood snapshot contains the full native chain and an internally bound close (19.249833ms)
✔ FULL LIFECYCLE SCENARIO: clean approvals traverse all six phases and pushed close (669.6825ms)
✔ FULL LIFECYCLE SCENARIO: a REVISE loop recovers in plan before completing and closing (660.393667ms)
✔ FULL LIFECYCLE SCENARIO: DISCUSS records an owner ruling and requires a fresh live review (495.256542ms)
✔ a complete artifact, review, allowed verdict, unique receipt, and ledger proof open the gate (29.83375ms)
▶ GATE MUTATION SUITE: each core condition refuses and names itself
  ✔ artifact exists (12.263167ms)
  ✔ artifact is non-empty (8.922292ms)
  ✔ artifact is a regular file (8.558792ms)
  ✔ review exists (8.148792ms)
  ✔ review is a regular file (9.206167ms)
  ✔ approval ledger is a regular file (8.217417ms)
  ✔ verdict REVISE is blocking (8.368ms)
  ✔ verdict REJECT is blocking (11.970417ms)
  ✔ verdict DISCUSS is blocking (15.53675ms)
  ✔ current receipt is quoted verbatim in the ledger (9.187166ms)
✔ GATE MUTATION SUITE: each core condition refuses and names itself (102.134875ms)
✔ outer receipt whitespace is ignored but inner bytes remain literal (30.224916ms)
▶ every gate condition fails closed when deliberately broken
  ✔ artifact missing (13.099584ms)
  ✔ artifact empty (9.936958ms)
  ✔ review missing (7.066792ms)
  ✔ verdict line missing (13.653417ms)
  ✔ verdict unknown (10.38975ms)
  ✔ receipt missing from last line (8.141417ms)
  ✔ generated review metadata missing (21.835125ms)
  ✔ duplicate generated review metadata is ambiguous (16.057583ms)
  ✔ review metadata names a different phase (12.068833ms)
  ✔ artifact changed after review (9.933042ms)
  ✔ final receipt differs from generated receipt (14.69425ms)
  ✔ receipt reused by another review (14.664792ms)
  ✔ approval ledger missing (10.42375ms)
  ✔ exact receipt absent from ledger (13.828042ms)
  ✔ approver missing (9.234125ms)
  ✔ APPROVE WITH COMMENTS has no ledger comments (9.940458ms)
  ✔ REVISE blocks even with receipt proof (8.683375ms)
  ✔ REJECT blocks even with receipt proof (11.190458ms)
  ✔ DISCUSS blocks without an owner ruling (8.264125ms)
  ✔ DISCUSS still blocks after the ruling until a fresh review (16.745875ms)
✔ every gate condition fails closed when deliberately broken (242.016125ms)
✔ the approval and advancement recovery commands run exactly as printed (547.66375ms)
✔ the missing-review recovery command runs exactly as printed (534.880917ms)
✔ a phase entry remains valid only while every prior gate proof still exists on disk (42.611ms)
✔ the repository carries the complete GPLv3-only license and Kristian's sole copyright (24.191792ms)
✔ PACKAGED NPX SUITE: the source-controlled binary is executable before npm touches it (3.172167ms)
✔ PACKAGED NPX SUITE: the documented local npx command does not mutate its checkout (1161.461625ms)
✔ PACKAGED NPX SUITE: a real tarball installs and runs the plain-JavaScript koda binary (2774.542792ms)
✔ RECEIPT ADVERSARIAL SUITE: an earlier review's receipt cannot approve a fresh review (31.089958ms)
✔ RECEIPT ADVERSARIAL SUITE: phase N receipt cannot approve phase N+1 (13.678375ms)
✔ RECEIPT ADVERSARIAL SUITE: outer whitespace is accepted and any inner word change refuses (21.469916ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REVISE (20.978333ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REJECT (10.313708ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override DISCUSS (13.35475ms)
✔ FULL RELAY RUNNER: preparation creates a clean pushed project with local skills (760.425875ms)
✔ FULL RELAY RUNNER: execution preserves two contexts and never automates owner receipt proof (2.043584ms)
✔ GENUINE FULL RELAY EVIDENCE: six phases, revision recovery, distinct contexts, and pushed close (17.035833ms)
✔ RELAY STATUS TRUTH: a prepared run names both windows and exact safe commands (660.92425ms)
✔ RELAY STATUS TRUTH: a stopped reviewer process names explicit stale-lock recovery (562.527625ms)
✔ RELAY STATUS TRUTH: an active recorded producer is never duplicated by a blind hint (480.253041ms)
✔ RELAY STATUS TRUTH: corrupt or ambiguous run state refuses instead of guessing (1123.701875ms)
✔ RELAY STATUS TRUTH: a corrupt owner handback refuses immediately by name (443.24ms)
✔ TWO-WINDOW PROTOCOL: reviewer jobs are bounded and duplicate reviewer windows refuse (14.58325ms)
✔ TWO-WINDOW VISIBILITY: progress is readable without exposing review receipts (0.375625ms)
✔ TWO-WINDOW RECEIPT: exact owner quote is recorded from Window B (837.693334ms)
✔ TWO-WINDOW RECEIPT MUTATION: a wrong quote refuses and names the preserved failed job (649.655083ms)
✔ OWNER DISCUSSION SAFETY: a new product direction stays paused without a disk handback (611.704ms)
✔ OWNER HANDBACK RELAY: an explicitly sent direction is bound to disk before acknowledgement (737.914042ms)
✔ OWNER HANDBACK RECEIPT BINDING: a handback remains unusable after a wrong receipt (733.964041ms)
✔ OWNER HANDBACK MUTATION: changed prose and symbolic-link evidence refuse (668.609208ms)
✔ OWNER HANDBACK CONTAINMENT: a linked handback directory cannot redirect writes (416.776458ms)
✔ TWO-WINDOW RELAY: a pending formal-review job wakes one persistent reviewer and returns acknowledged disk evidence (712.861375ms)
✔ TWO-WINDOW SESSION: separate producer and reviewer processes rendezvous through pushed close (4083.810166ms)
✔ REVIEW BINDING SUITE: changing review findings after owner acknowledgement refuses (18.976875ms)
✔ REVIEW BINDING SUITE: an untouched generated template cannot become an approved review (10.349708ms)
✔ a current review cannot be replaced before its receipt is recorded (21.666541ms)
✔ a revised artifact receives a fresh review, fresh receipt, and archived prior review (27.134416ms)
✔ DISCUSS requires the owner's ruling before a fresh definitive review (38.186375ms)
✔ REVIEWER FIXTURES: five sealed fixtures ship as blind Koda projects (39.221ms)
✔ REVIEWER FIXTURES: the planted hard number is unsupported and the control has no plant (1.281208ms)
✔ REVIEWER FIXTURES: inference-chain plant requires a deduction across three source files (1.056792ms)
✔ REVIEWER FIXTURES: tempting honest control is imperfect in style but its claims execute (65.859875ms)
✔ REVIEWER FIXTURES: evidence-absence trap has working code but its claimed run record is missing (82.812459ms)
✔ REVIEWER FIXTURES: new scoring contracts still match their pre-run Git seal (42.757333ms)
✔ REVIEWER FIXTURES: Ghostty runs pin model and effort and preserve ephemeral Codex events (0.667125ms)
✔ REVIEWER FIXTURES: the bounded model matrix is backed by seventeen graded run folders (48.6695ms)
✔ SECURITY INTEGRITY SUITE: the install is dependency-free with no install hook (4.155875ms)
✔ SECURITY INTEGRITY SUITE: the committed repository contains no symbolic link (24.27175ms)
✔ SECURITY INTEGRITY SUITE: tracked text contains no common live credential signature (157.124833ms)
✔ session creation requires a prompt and numbers dated folders (20.208375ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-2geTiu/remote.git
 * [new branch]      main -> main
✔ a completed session is closed only after its state is committed and pushed (1447.743375ms)
✔ immutable close refuses symbolic links inside session evidence (7.686416ms)
✔ immutable close refuses duplicate generated metadata markers (0.143208ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-ignored-remote-xTNkBU/remote.git
 * [new branch]      main -> main
✔ immutable close refuses a bound session file that Git ignored instead of pushing (252.261125ms)
✔ every Koda-C skill has valid relay sections and four-line Codex metadata (10.335083ms)
✔ skill index metadata stays concise, front-loaded, and trigger-specific (3.564958ms)
✔ producer phase skills hand only to the one shared reviewer (1.887791ms)
✔ the shared reviewer keeps all phase criteria in one place (1.322042ms)
✔ in-phase consultation is disk-backed and cannot impersonate formal review (2.346708ms)
✔ session open and close remain ceremonies outside producer phase routing (0.690125ms)
✔ fresh Codex startup discovers all nine local skills and root guidance without reading disk (2.011791ms)
✔ STALE-REVIEW BINDING: editing the artifact after review refuses with a named re-review reason (31.194833ms)
✔ STALE-REVIEW BINDING: reviewing after an edit binds the new artifact and opens (24.58875ms)
✔ STATUS TRUTH SUITE: deleting a review is reflected immediately (278.199083ms)
✔ STATUS TRUTH SUITE: blanking an artifact is reflected immediately (243.678375ms)
✔ STATUS TRUTH SUITE: corrupt ledger metadata refuses with a named corruption reason (105.2895ms)
✔ STATUS TRUTH SUITE: editing an acknowledged review is reflected immediately (108.960875ms)
✔ STATUS TRUTH SUITE: invalid state JSON refuses instead of guessing (104.969292ms)
✔ STATUS TRUTH SUITE: a path-like phase name in state refuses instead of escaping (105.444708ms)
✔ JUDGE JOURNEY SUITE: the committed binary runs without rebuilding (71.570333ms)
✔ JUDGE JOURNEY SUITE: video and submission documents preserve every live rule (4.220291ms)
✔ JUDGE JOURNEY SUITE: local links in the judge documents resolve (3.960458ms)
ℹ tests 112
ℹ suites 0
ℹ pass 112
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 9747.9645
```
