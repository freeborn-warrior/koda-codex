# Per-test result — 2026-07-18-owner-direction-handback-final

- Result: **PASS**
- Recorded at: 2026-07-18T19:17:45.795Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `2b74fb2`
- Command: `/opt/homebrew/Cellar/node/26.0.0/bin/node --test --test-reporter=spec tests/config.test.ts tests/dogfood.test.ts tests/full-lifecycle.test.ts tests/gate.test.ts tests/hints.test.ts tests/history.test.ts tests/license.test.ts tests/package.test.ts tests/receipt-adversarial.test.ts tests/relay-runner.test.ts tests/relay-status.test.ts tests/relay-window.test.ts tests/review-binding.test.ts tests/review.test.ts tests/reviewer-fixtures.test.ts tests/security.test.ts tests/session.test.ts tests/skill.test.ts tests/stale-review.test.ts tests/status-truth.test.ts tests/submission.test.ts`

Every discovered test and subtest is named below. No result is aggregated away.

```text
✔ the default phase chain is configurable data in the required order (1.125666ms)
✔ config validation rejects unsafe session paths and drifting phase names (3.941875ms)
✔ config validation refuses a sessions directory that resolves outside the project (25.604458ms)
✔ the committed dogfood snapshot contains the full native chain and an internally bound close (25.912833ms)
✔ FULL LIFECYCLE SCENARIO: clean approvals traverse all six phases and pushed close (677.891334ms)
✔ FULL LIFECYCLE SCENARIO: a REVISE loop recovers in plan before completing and closing (618.039166ms)
✔ FULL LIFECYCLE SCENARIO: DISCUSS records an owner ruling and requires a fresh live review (526.225167ms)
✔ a complete artifact, review, allowed verdict, unique receipt, and ledger proof open the gate (32.902125ms)
▶ GATE MUTATION SUITE: each core condition refuses and names itself
  ✔ artifact exists (12.341083ms)
  ✔ artifact is non-empty (10.144334ms)
  ✔ artifact is a regular file (10.339792ms)
  ✔ review exists (10.147625ms)
  ✔ review is a regular file (9.969834ms)
  ✔ approval ledger is a regular file (10.03775ms)
  ✔ verdict REVISE is blocking (8.078083ms)
  ✔ verdict REJECT is blocking (10.08475ms)
  ✔ verdict DISCUSS is blocking (8.941125ms)
  ✔ current receipt is quoted verbatim in the ledger (8.733042ms)
✔ GATE MUTATION SUITE: each core condition refuses and names itself (100.110708ms)
✔ outer receipt whitespace is ignored but inner bytes remain literal (17.736083ms)
▶ every gate condition fails closed when deliberately broken
  ✔ artifact missing (10.466625ms)
  ✔ artifact empty (17.618917ms)
  ✔ review missing (11.147042ms)
  ✔ verdict line missing (11.5655ms)
  ✔ verdict unknown (8.929916ms)
  ✔ receipt missing from last line (8.083333ms)
  ✔ generated review metadata missing (7.636292ms)
  ✔ duplicate generated review metadata is ambiguous (9.020167ms)
  ✔ review metadata names a different phase (11.417375ms)
  ✔ artifact changed after review (10.5655ms)
  ✔ final receipt differs from generated receipt (10.700334ms)
  ✔ receipt reused by another review (12.695625ms)
  ✔ approval ledger missing (19.497917ms)
  ✔ exact receipt absent from ledger (14.457875ms)
  ✔ approver missing (14.91225ms)
  ✔ APPROVE WITH COMMENTS has no ledger comments (14.876875ms)
  ✔ REVISE blocks even with receipt proof (13.144125ms)
  ✔ REJECT blocks even with receipt proof (11.183583ms)
  ✔ DISCUSS blocks without an owner ruling (10.784584ms)
  ✔ DISCUSS still blocks after the ruling until a fresh review (13.713625ms)
✔ every gate condition fails closed when deliberately broken (244.626709ms)
✔ the approval and advancement recovery commands run exactly as printed (537.047458ms)
✔ the missing-review recovery command runs exactly as printed (514.227791ms)
✔ a phase entry remains valid only while every prior gate proof still exists on disk (25.573541ms)
✔ the repository carries the complete GPLv3-only license and Kristian's sole copyright (11.353542ms)
✔ PACKAGED NPX SUITE: the source-controlled binary is executable before npm touches it (5.64825ms)
✔ PACKAGED NPX SUITE: the documented local npx command does not mutate its checkout (1174.810458ms)
✔ PACKAGED NPX SUITE: a real tarball installs and runs the plain-JavaScript koda binary (2850.9185ms)
✔ RECEIPT ADVERSARIAL SUITE: an earlier review's receipt cannot approve a fresh review (24.052417ms)
✔ RECEIPT ADVERSARIAL SUITE: phase N receipt cannot approve phase N+1 (11.872042ms)
✔ RECEIPT ADVERSARIAL SUITE: outer whitespace is accepted and any inner word change refuses (21.863334ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REVISE (8.650166ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REJECT (12.176875ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override DISCUSS (7.586167ms)
✔ FULL RELAY RUNNER: preparation creates a clean pushed project with local skills (709.671334ms)
✔ FULL RELAY RUNNER: execution preserves two contexts and never automates owner receipt proof (1.980917ms)
✔ GENUINE FULL RELAY EVIDENCE: six phases, revision recovery, distinct contexts, and pushed close (27.102ms)
✔ RELAY STATUS TRUTH: a prepared run names both windows and exact safe commands (657.502333ms)
✔ RELAY STATUS TRUTH: a stopped reviewer process names explicit stale-lock recovery (558.868417ms)
✔ RELAY STATUS TRUTH: an active recorded producer is never duplicated by a blind hint (473.039583ms)
✔ RELAY STATUS TRUTH: corrupt or ambiguous run state refuses instead of guessing (1138.37275ms)
✔ RELAY STATUS TRUTH: a corrupt owner handback refuses immediately by name (442.481542ms)
✔ TWO-WINDOW PROTOCOL: reviewer jobs are bounded and duplicate reviewer windows refuse (23.689459ms)
✔ TWO-WINDOW VISIBILITY: progress is readable without exposing review receipts (0.230459ms)
✔ TWO-WINDOW RECEIPT: exact owner quote is recorded from Window B (798.037916ms)
✔ TWO-WINDOW RECEIPT MUTATION: a wrong quote refuses and names the preserved failed job (614.518917ms)
✔ OWNER DISCUSSION SAFETY: a new product direction stays paused without a disk handback (636.674709ms)
✔ OWNER HANDBACK RELAY: an explicitly sent direction is bound to disk before acknowledgement (738.795667ms)
✔ OWNER HANDBACK RECEIPT BINDING: a handback remains unusable after a wrong receipt (739.658042ms)
✔ OWNER HANDBACK MUTATION: changed prose and symbolic-link evidence refuse (649.3925ms)
✔ TWO-WINDOW RELAY: a pending formal-review job wakes one persistent reviewer and returns acknowledged disk evidence (700.548333ms)
✔ TWO-WINDOW SESSION: separate producer and reviewer processes rendezvous through pushed close (3738.876ms)
✔ REVIEW BINDING SUITE: changing review findings after owner acknowledgement refuses (32.921875ms)
✔ REVIEW BINDING SUITE: an untouched generated template cannot become an approved review (21.552209ms)
✔ a current review cannot be replaced before its receipt is recorded (28.231333ms)
✔ a revised artifact receives a fresh review, fresh receipt, and archived prior review (23.183917ms)
✔ DISCUSS requires the owner's ruling before a fresh definitive review (27.392541ms)
✔ REVIEWER FIXTURES: five sealed fixtures ship as blind Koda projects (31.324917ms)
✔ REVIEWER FIXTURES: the planted hard number is unsupported and the control has no plant (0.979ms)
✔ REVIEWER FIXTURES: inference-chain plant requires a deduction across three source files (0.655125ms)
✔ REVIEWER FIXTURES: tempting honest control is imperfect in style but its claims execute (61.861459ms)
✔ REVIEWER FIXTURES: evidence-absence trap has working code but its claimed run record is missing (83.199ms)
✔ REVIEWER FIXTURES: new scoring contracts still match their pre-run Git seal (42.263625ms)
✔ REVIEWER FIXTURES: Ghostty runs pin model and effort and preserve ephemeral Codex events (1.084167ms)
✔ REVIEWER FIXTURES: the bounded model matrix is backed by seventeen graded run folders (26.719208ms)
✔ SECURITY INTEGRITY SUITE: the install is dependency-free with no install hook (3.468875ms)
✔ SECURITY INTEGRITY SUITE: the committed repository contains no symbolic link (16.428625ms)
✔ SECURITY INTEGRITY SUITE: tracked text contains no common live credential signature (138.68975ms)
✔ session creation requires a prompt and numbers dated folders (17.872042ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-aCBPhX/remote.git
 * [new branch]      main -> main
✔ a completed session is closed only after its state is committed and pushed (1444.939541ms)
✔ immutable close refuses symbolic links inside session evidence (6.112417ms)
✔ immutable close refuses duplicate generated metadata markers (0.097791ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-ignored-remote-TncxDx/remote.git
 * [new branch]      main -> main
✔ immutable close refuses a bound session file that Git ignored instead of pushing (249.367333ms)
✔ every Koda-C skill has valid relay sections and four-line Codex metadata (8.646625ms)
✔ skill index metadata stays concise, front-loaded, and trigger-specific (3.589ms)
✔ producer phase skills hand only to the one shared reviewer (2.037542ms)
✔ the shared reviewer keeps all phase criteria in one place (1.355958ms)
✔ in-phase consultation is disk-backed and cannot impersonate formal review (2.528917ms)
✔ session open and close remain ceremonies outside producer phase routing (0.789708ms)
✔ fresh Codex startup discovers all nine local skills and root guidance without reading disk (2.002167ms)
✔ STALE-REVIEW BINDING: editing the artifact after review refuses with a named re-review reason (37.302ms)
✔ STALE-REVIEW BINDING: reviewing after an edit binds the new artifact and opens (18.547375ms)
✔ STATUS TRUTH SUITE: deleting a review is reflected immediately (271.464417ms)
✔ STATUS TRUTH SUITE: blanking an artifact is reflected immediately (233.292209ms)
✔ STATUS TRUTH SUITE: corrupt ledger metadata refuses with a named corruption reason (117.321208ms)
✔ STATUS TRUTH SUITE: editing an acknowledged review is reflected immediately (101.678834ms)
✔ STATUS TRUTH SUITE: invalid state JSON refuses instead of guessing (113.570334ms)
✔ STATUS TRUTH SUITE: a path-like phase name in state refuses instead of escaping (97.97325ms)
✔ JUDGE JOURNEY SUITE: the committed binary runs without rebuilding (78.53625ms)
✔ JUDGE JOURNEY SUITE: video and submission documents preserve every live rule (2.78775ms)
✔ JUDGE JOURNEY SUITE: local links in the judge documents resolve (3.544917ms)
ℹ tests 111
ℹ suites 0
ℹ pass 111
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 8957.668375
```
