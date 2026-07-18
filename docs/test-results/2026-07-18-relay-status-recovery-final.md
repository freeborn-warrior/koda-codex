# Per-test result — 2026-07-18-relay-status-recovery-final

- Result: **PASS**
- Recorded at: 2026-07-18T18:51:41.939Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `53bd638`
- Command: `/opt/homebrew/Cellar/node/26.0.0/bin/node --test --test-reporter=spec tests/config.test.ts tests/dogfood.test.ts tests/full-lifecycle.test.ts tests/gate.test.ts tests/hints.test.ts tests/history.test.ts tests/license.test.ts tests/package.test.ts tests/receipt-adversarial.test.ts tests/relay-runner.test.ts tests/relay-status.test.ts tests/relay-window.test.ts tests/review-binding.test.ts tests/review.test.ts tests/reviewer-fixtures.test.ts tests/security.test.ts tests/session.test.ts tests/skill.test.ts tests/stale-review.test.ts tests/status-truth.test.ts tests/submission.test.ts`

Every discovered test and subtest is named below. No result is aggregated away.

```text
✔ the default phase chain is configurable data in the required order (1.092583ms)
✔ config validation rejects unsafe session paths and drifting phase names (0.178667ms)
✔ config validation refuses a sessions directory that resolves outside the project (12.156708ms)
✔ the committed dogfood snapshot contains the full native chain and an internally bound close (40.768959ms)
✔ FULL LIFECYCLE SCENARIO: clean approvals traverse all six phases and pushed close (648.362625ms)
✔ FULL LIFECYCLE SCENARIO: a REVISE loop recovers in plan before completing and closing (659.196125ms)
✔ FULL LIFECYCLE SCENARIO: DISCUSS records an owner ruling and requires a fresh live review (524.962375ms)
✔ a complete artifact, review, allowed verdict, unique receipt, and ledger proof open the gate (36.022ms)
▶ GATE MUTATION SUITE: each core condition refuses and names itself
  ✔ artifact exists (9.250834ms)
  ✔ artifact is non-empty (8.352791ms)
  ✔ artifact is a regular file (8.355042ms)
  ✔ review exists (7.067792ms)
  ✔ review is a regular file (7.5175ms)
  ✔ approval ledger is a regular file (7.520875ms)
  ✔ verdict REVISE is blocking (7.260292ms)
  ✔ verdict REJECT is blocking (8.085833ms)
  ✔ verdict DISCUSS is blocking (7.669ms)
  ✔ current receipt is quoted verbatim in the ledger (12.68775ms)
✔ GATE MUTATION SUITE: each core condition refuses and names itself (85.25525ms)
✔ outer receipt whitespace is ignored but inner bytes remain literal (17.284875ms)
▶ every gate condition fails closed when deliberately broken
  ✔ artifact missing (11.648125ms)
  ✔ artifact empty (12.190541ms)
  ✔ review missing (9.011833ms)
  ✔ verdict line missing (13.186417ms)
  ✔ verdict unknown (11.030583ms)
  ✔ receipt missing from last line (10.447333ms)
  ✔ generated review metadata missing (7.78725ms)
  ✔ duplicate generated review metadata is ambiguous (7.776209ms)
  ✔ review metadata names a different phase (8.575209ms)
  ✔ artifact changed after review (8.199458ms)
  ✔ final receipt differs from generated receipt (41.354917ms)
  ✔ receipt reused by another review (14.1155ms)
  ✔ approval ledger missing (16.487208ms)
  ✔ exact receipt absent from ledger (13.748917ms)
  ✔ approver missing (9.816375ms)
  ✔ APPROVE WITH COMMENTS has no ledger comments (10.395333ms)
  ✔ REVISE blocks even with receipt proof (8.776917ms)
  ✔ REJECT blocks even with receipt proof (10.869833ms)
  ✔ DISCUSS blocks without an owner ruling (8.252084ms)
  ✔ DISCUSS still blocks after the ruling until a fresh review (9.692916ms)
✔ every gate condition fails closed when deliberately broken (245.544917ms)
✔ the approval and advancement recovery commands run exactly as printed (551.7135ms)
✔ the missing-review recovery command runs exactly as printed (503.546334ms)
✔ a phase entry remains valid only while every prior gate proof still exists on disk (32.023916ms)
✔ the repository carries the complete GPLv3-only license and Kristian's sole copyright (4.899333ms)
✔ PACKAGED NPX SUITE: the source-controlled binary is executable before npm touches it (3.56625ms)
✔ PACKAGED NPX SUITE: the documented local npx command does not mutate its checkout (1169.072334ms)
✔ PACKAGED NPX SUITE: a real tarball installs and runs the plain-JavaScript koda binary (2658.02175ms)
✔ RECEIPT ADVERSARIAL SUITE: an earlier review's receipt cannot approve a fresh review (23.595167ms)
✔ RECEIPT ADVERSARIAL SUITE: phase N receipt cannot approve phase N+1 (14.478125ms)
✔ RECEIPT ADVERSARIAL SUITE: outer whitespace is accepted and any inner word change refuses (22.490458ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REVISE (13.2205ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REJECT (10.696708ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override DISCUSS (9.372792ms)
✔ FULL RELAY RUNNER: preparation creates a clean pushed project with local skills (719.152875ms)
✔ FULL RELAY RUNNER: execution preserves two contexts and never automates owner receipt proof (4.278625ms)
✔ GENUINE FULL RELAY EVIDENCE: six phases, revision recovery, distinct contexts, and pushed close (18.607416ms)
✔ RELAY STATUS TRUTH: a prepared run names both windows and exact safe commands (667.068834ms)
✔ RELAY STATUS TRUTH: a stopped reviewer process names explicit stale-lock recovery (529.7555ms)
✔ RELAY STATUS TRUTH: an active recorded producer is never duplicated by a blind hint (473.695375ms)
✔ RELAY STATUS TRUTH: corrupt or ambiguous run state refuses instead of guessing (1140.233625ms)
✔ TWO-WINDOW PROTOCOL: reviewer jobs are bounded and duplicate reviewer windows refuse (25.034958ms)
✔ TWO-WINDOW VISIBILITY: progress is readable without exposing review receipts (0.461917ms)
✔ TWO-WINDOW RECEIPT: exact owner quote is recorded from Window B (811.622125ms)
✔ TWO-WINDOW RECEIPT MUTATION: a wrong quote refuses and names the preserved failed job (652.119375ms)
✔ TWO-WINDOW RELAY: a pending formal-review job wakes one persistent reviewer and returns acknowledged disk evidence (836.23675ms)
✔ TWO-WINDOW SESSION: separate producer and reviewer processes rendezvous through pushed close (3174.478875ms)
✔ REVIEW BINDING SUITE: changing review findings after owner acknowledgement refuses (22.756625ms)
✔ REVIEW BINDING SUITE: an untouched generated template cannot become an approved review (16.639458ms)
✔ a current review cannot be replaced before its receipt is recorded (33.995166ms)
✔ a revised artifact receives a fresh review, fresh receipt, and archived prior review (19.28875ms)
✔ DISCUSS requires the owner's ruling before a fresh definitive review (22.384333ms)
✔ REVIEWER FIXTURES: five sealed fixtures ship as blind Koda projects (28.82725ms)
✔ REVIEWER FIXTURES: the planted hard number is unsupported and the control has no plant (1.062625ms)
✔ REVIEWER FIXTURES: inference-chain plant requires a deduction across three source files (0.38ms)
✔ REVIEWER FIXTURES: tempting honest control is imperfect in style but its claims execute (62.829ms)
✔ REVIEWER FIXTURES: evidence-absence trap has working code but its claimed run record is missing (63.014709ms)
✔ REVIEWER FIXTURES: new scoring contracts still match their pre-run Git seal (43.091833ms)
✔ REVIEWER FIXTURES: Ghostty runs pin model and effort and preserve ephemeral Codex events (1.372042ms)
✔ REVIEWER FIXTURES: the bounded model matrix is backed by seventeen graded run folders (33.631083ms)
✔ SECURITY INTEGRITY SUITE: the install is dependency-free with no install hook (3.307417ms)
✔ SECURITY INTEGRITY SUITE: the committed repository contains no symbolic link (14.224334ms)
✔ SECURITY INTEGRITY SUITE: tracked text contains no common live credential signature (139.831125ms)
✔ session creation requires a prompt and numbers dated folders (18.488583ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-ZCDImg/remote.git
 * [new branch]      main -> main
✔ a completed session is closed only after its state is committed and pushed (1444.801ms)
✔ immutable close refuses symbolic links inside session evidence (6.859ms)
✔ immutable close refuses duplicate generated metadata markers (0.085084ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-ignored-remote-pvWTGZ/remote.git
 * [new branch]      main -> main
✔ immutable close refuses a bound session file that Git ignored instead of pushing (248.365458ms)
✔ every Koda-C skill has valid relay sections and four-line Codex metadata (7.013792ms)
✔ skill index metadata stays concise, front-loaded, and trigger-specific (4.251125ms)
✔ producer phase skills hand only to the one shared reviewer (2.011167ms)
✔ the shared reviewer keeps all phase criteria in one place (1.354125ms)
✔ in-phase consultation is disk-backed and cannot impersonate formal review (2.628375ms)
✔ session open and close remain ceremonies outside producer phase routing (0.888792ms)
✔ fresh Codex startup discovers all nine local skills and root guidance without reading disk (1.361667ms)
✔ STALE-REVIEW BINDING: editing the artifact after review refuses with a named re-review reason (24.525959ms)
✔ STALE-REVIEW BINDING: reviewing after an edit binds the new artifact and opens (34.2565ms)
✔ STATUS TRUTH SUITE: deleting a review is reflected immediately (285.476542ms)
✔ STATUS TRUTH SUITE: blanking an artifact is reflected immediately (239.439792ms)
✔ STATUS TRUTH SUITE: corrupt ledger metadata refuses with a named corruption reason (117.293875ms)
✔ STATUS TRUTH SUITE: editing an acknowledged review is reflected immediately (103.900708ms)
✔ STATUS TRUTH SUITE: invalid state JSON refuses instead of guessing (114.971584ms)
✔ STATUS TRUTH SUITE: a path-like phase name in state refuses instead of escaping (101.27075ms)
✔ JUDGE JOURNEY SUITE: the committed binary runs without rebuilding (64.572583ms)
✔ JUDGE JOURNEY SUITE: video and submission documents preserve every live rule (2.095042ms)
✔ JUDGE JOURNEY SUITE: local links in the judge documents resolve (3.529917ms)
ℹ tests 106
ℹ suites 0
ℹ pass 106
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 5785.789208
```
