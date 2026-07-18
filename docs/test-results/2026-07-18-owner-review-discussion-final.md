# Per-test result — 2026-07-18-owner-review-discussion-final

- Result: **PASS**
- Recorded at: 2026-07-18T19:01:50.618Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `f68f5d7`
- Command: `/opt/homebrew/Cellar/node/26.0.0/bin/node --test --test-reporter=spec tests/config.test.ts tests/dogfood.test.ts tests/full-lifecycle.test.ts tests/gate.test.ts tests/hints.test.ts tests/history.test.ts tests/license.test.ts tests/package.test.ts tests/receipt-adversarial.test.ts tests/relay-runner.test.ts tests/relay-status.test.ts tests/relay-window.test.ts tests/review-binding.test.ts tests/review.test.ts tests/reviewer-fixtures.test.ts tests/security.test.ts tests/session.test.ts tests/skill.test.ts tests/stale-review.test.ts tests/status-truth.test.ts tests/submission.test.ts`

Every discovered test and subtest is named below. No result is aggregated away.

```text
✔ the default phase chain is configurable data in the required order (1.09775ms)
✔ config validation rejects unsafe session paths and drifting phase names (0.180083ms)
✔ config validation refuses a sessions directory that resolves outside the project (22.290958ms)
✔ the committed dogfood snapshot contains the full native chain and an internally bound close (28.301625ms)
✔ FULL LIFECYCLE SCENARIO: clean approvals traverse all six phases and pushed close (691.98325ms)
✔ FULL LIFECYCLE SCENARIO: a REVISE loop recovers in plan before completing and closing (620.750417ms)
✔ FULL LIFECYCLE SCENARIO: DISCUSS records an owner ruling and requires a fresh live review (555.40975ms)
✔ a complete artifact, review, allowed verdict, unique receipt, and ledger proof open the gate (27.654208ms)
▶ GATE MUTATION SUITE: each core condition refuses and names itself
  ✔ artifact exists (8.989166ms)
  ✔ artifact is non-empty (8.343583ms)
  ✔ artifact is a regular file (7.956375ms)
  ✔ review exists (7.229208ms)
  ✔ review is a regular file (8.68225ms)
  ✔ approval ledger is a regular file (10.421583ms)
  ✔ verdict REVISE is blocking (6.88975ms)
  ✔ verdict REJECT is blocking (7.102167ms)
  ✔ verdict DISCUSS is blocking (5.090917ms)
  ✔ current receipt is quoted verbatim in the ledger (12.682625ms)
✔ GATE MUTATION SUITE: each core condition refuses and names itself (84.717ms)
✔ outer receipt whitespace is ignored but inner bytes remain literal (21.757709ms)
▶ every gate condition fails closed when deliberately broken
  ✔ artifact missing (7.985333ms)
  ✔ artifact empty (11.92475ms)
  ✔ review missing (10.156166ms)
  ✔ verdict line missing (12.347792ms)
  ✔ verdict unknown (9.816542ms)
  ✔ receipt missing from last line (11.262542ms)
  ✔ generated review metadata missing (8.454334ms)
  ✔ duplicate generated review metadata is ambiguous (8.450542ms)
  ✔ review metadata names a different phase (12.544083ms)
  ✔ artifact changed after review (8.501458ms)
  ✔ final receipt differs from generated receipt (8.232834ms)
  ✔ receipt reused by another review (14.557666ms)
  ✔ approval ledger missing (8.187042ms)
  ✔ exact receipt absent from ledger (11.774125ms)
  ✔ approver missing (8.389041ms)
  ✔ APPROVE WITH COMMENTS has no ledger comments (11.374042ms)
  ✔ REVISE blocks even with receipt proof (8.898333ms)
  ✔ REJECT blocks even with receipt proof (12.870916ms)
  ✔ DISCUSS blocks without an owner ruling (11.202584ms)
  ✔ DISCUSS still blocks after the ruling until a fresh review (10.495666ms)
✔ every gate condition fails closed when deliberately broken (209.809209ms)
✔ the approval and advancement recovery commands run exactly as printed (549.916458ms)
✔ the missing-review recovery command runs exactly as printed (536.480667ms)
✔ a phase entry remains valid only while every prior gate proof still exists on disk (27.004958ms)
✔ the repository carries the complete GPLv3-only license and Kristian's sole copyright (4.854208ms)
✔ PACKAGED NPX SUITE: the source-controlled binary is executable before npm touches it (6.764083ms)
✔ PACKAGED NPX SUITE: the documented local npx command does not mutate its checkout (1118.16975ms)
✔ PACKAGED NPX SUITE: a real tarball installs and runs the plain-JavaScript koda binary (2915.434333ms)
✔ RECEIPT ADVERSARIAL SUITE: an earlier review's receipt cannot approve a fresh review (28.68975ms)
✔ RECEIPT ADVERSARIAL SUITE: phase N receipt cannot approve phase N+1 (10.958666ms)
✔ RECEIPT ADVERSARIAL SUITE: outer whitespace is accepted and any inner word change refuses (14.9775ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REVISE (8.126917ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REJECT (7.669ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override DISCUSS (11.401417ms)
✔ FULL RELAY RUNNER: preparation creates a clean pushed project with local skills (681.713125ms)
✔ FULL RELAY RUNNER: execution preserves two contexts and never automates owner receipt proof (1.841625ms)
✔ GENUINE FULL RELAY EVIDENCE: six phases, revision recovery, distinct contexts, and pushed close (23.991875ms)
✔ RELAY STATUS TRUTH: a prepared run names both windows and exact safe commands (654.242792ms)
✔ RELAY STATUS TRUTH: a stopped reviewer process names explicit stale-lock recovery (551.742417ms)
✔ RELAY STATUS TRUTH: an active recorded producer is never duplicated by a blind hint (503.870417ms)
✔ RELAY STATUS TRUTH: corrupt or ambiguous run state refuses instead of guessing (1138.493958ms)
✔ TWO-WINDOW PROTOCOL: reviewer jobs are bounded and duplicate reviewer windows refuse (40.479583ms)
✔ TWO-WINDOW VISIBILITY: progress is readable without exposing review receipts (1.615958ms)
✔ TWO-WINDOW RECEIPT: exact owner quote is recorded from Window B (780.869333ms)
✔ TWO-WINDOW RECEIPT MUTATION: a wrong quote refuses and names the preserved failed job (650.379709ms)
✔ OWNER DISCUSSION SAFETY: a new product direction stays paused without a disk handback (619.495625ms)
✔ TWO-WINDOW RELAY: a pending formal-review job wakes one persistent reviewer and returns acknowledged disk evidence (834.93825ms)
✔ TWO-WINDOW SESSION: separate producer and reviewer processes rendezvous through pushed close (3256.170292ms)
✔ REVIEW BINDING SUITE: changing review findings after owner acknowledgement refuses (36.189583ms)
✔ REVIEW BINDING SUITE: an untouched generated template cannot become an approved review (15.968125ms)
✔ a current review cannot be replaced before its receipt is recorded (17.819167ms)
✔ a revised artifact receives a fresh review, fresh receipt, and archived prior review (20.182542ms)
✔ DISCUSS requires the owner's ruling before a fresh definitive review (37.633541ms)
✔ REVIEWER FIXTURES: five sealed fixtures ship as blind Koda projects (31.554166ms)
✔ REVIEWER FIXTURES: the planted hard number is unsupported and the control has no plant (1.207834ms)
✔ REVIEWER FIXTURES: inference-chain plant requires a deduction across three source files (0.708917ms)
✔ REVIEWER FIXTURES: tempting honest control is imperfect in style but its claims execute (66.044708ms)
✔ REVIEWER FIXTURES: evidence-absence trap has working code but its claimed run record is missing (77.187667ms)
✔ REVIEWER FIXTURES: new scoring contracts still match their pre-run Git seal (43.114666ms)
✔ REVIEWER FIXTURES: Ghostty runs pin model and effort and preserve ephemeral Codex events (0.730583ms)
✔ REVIEWER FIXTURES: the bounded model matrix is backed by seventeen graded run folders (28.639875ms)
✔ SECURITY INTEGRITY SUITE: the install is dependency-free with no install hook (3.553291ms)
✔ SECURITY INTEGRITY SUITE: the committed repository contains no symbolic link (16.265875ms)
✔ SECURITY INTEGRITY SUITE: tracked text contains no common live credential signature (153.55225ms)
✔ session creation requires a prompt and numbers dated folders (18.138625ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-hegeVo/remote.git
 * [new branch]      main -> main
✔ a completed session is closed only after its state is committed and pushed (1537.176208ms)
✔ immutable close refuses symbolic links inside session evidence (6.799708ms)
✔ immutable close refuses duplicate generated metadata markers (0.087709ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-ignored-remote-ZeDVNL/remote.git
 * [new branch]      main -> main
✔ immutable close refuses a bound session file that Git ignored instead of pushing (272.618125ms)
✔ every Koda-C skill has valid relay sections and four-line Codex metadata (9.500417ms)
✔ skill index metadata stays concise, front-loaded, and trigger-specific (8.954709ms)
✔ producer phase skills hand only to the one shared reviewer (2.308833ms)
✔ the shared reviewer keeps all phase criteria in one place (1.450791ms)
✔ in-phase consultation is disk-backed and cannot impersonate formal review (2.351666ms)
✔ session open and close remain ceremonies outside producer phase routing (0.676625ms)
✔ fresh Codex startup discovers all nine local skills and root guidance without reading disk (1.794708ms)
✔ STALE-REVIEW BINDING: editing the artifact after review refuses with a named re-review reason (35.731417ms)
✔ STALE-REVIEW BINDING: reviewing after an edit binds the new artifact and opens (15.196042ms)
✔ STATUS TRUTH SUITE: deleting a review is reflected immediately (274.895417ms)
✔ STATUS TRUTH SUITE: blanking an artifact is reflected immediately (233.8335ms)
✔ STATUS TRUTH SUITE: corrupt ledger metadata refuses with a named corruption reason (106.038208ms)
✔ STATUS TRUTH SUITE: editing an acknowledged review is reflected immediately (106.868084ms)
✔ STATUS TRUTH SUITE: invalid state JSON refuses instead of guessing (122.197208ms)
✔ STATUS TRUTH SUITE: a path-like phase name in state refuses instead of escaping (122.790667ms)
✔ JUDGE JOURNEY SUITE: the committed binary runs without rebuilding (98.270708ms)
✔ JUDGE JOURNEY SUITE: video and submission documents preserve every live rule (3.700958ms)
✔ JUDGE JOURNEY SUITE: local links in the judge documents resolve (4.8145ms)
ℹ tests 107
ℹ suites 0
ℹ pass 107
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 6505.452666
```
