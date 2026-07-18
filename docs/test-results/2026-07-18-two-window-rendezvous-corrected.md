# Per-test result — 2026-07-18-two-window-rendezvous-corrected

- Result: **PASS**
- Recorded at: 2026-07-18T18:40:44.520Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `7456699`
- Command: `/opt/homebrew/Cellar/node/26.0.0/bin/node --test --test-reporter=spec tests/config.test.ts tests/dogfood.test.ts tests/full-lifecycle.test.ts tests/gate.test.ts tests/hints.test.ts tests/history.test.ts tests/license.test.ts tests/package.test.ts tests/receipt-adversarial.test.ts tests/relay-runner.test.ts tests/relay-window.test.ts tests/review-binding.test.ts tests/review.test.ts tests/reviewer-fixtures.test.ts tests/security.test.ts tests/session.test.ts tests/skill.test.ts tests/stale-review.test.ts tests/status-truth.test.ts tests/submission.test.ts`

Every discovered test and subtest is named below. No result is aggregated away.

```text
✔ the default phase chain is configurable data in the required order (1.120625ms)
✔ config validation rejects unsafe session paths and drifting phase names (0.180208ms)
✔ config validation refuses a sessions directory that resolves outside the project (22.250333ms)
✔ the committed dogfood snapshot contains the full native chain and an internally bound close (30.465375ms)
✔ FULL LIFECYCLE SCENARIO: clean approvals traverse all six phases and pushed close (644.438666ms)
✔ FULL LIFECYCLE SCENARIO: a REVISE loop recovers in plan before completing and closing (530.127ms)
✔ FULL LIFECYCLE SCENARIO: DISCUSS records an owner ruling and requires a fresh live review (423.466167ms)
✔ a complete artifact, review, allowed verdict, unique receipt, and ledger proof open the gate (24.3935ms)
▶ GATE MUTATION SUITE: each core condition refuses and names itself
  ✔ artifact exists (12.972875ms)
  ✔ artifact is non-empty (9.203334ms)
  ✔ artifact is a regular file (7.963708ms)
  ✔ review exists (9.583375ms)
  ✔ review is a regular file (11.011791ms)
  ✔ approval ledger is a regular file (14.552709ms)
  ✔ verdict REVISE is blocking (8.433792ms)
  ✔ verdict REJECT is blocking (8.547334ms)
  ✔ verdict DISCUSS is blocking (9.444042ms)
  ✔ current receipt is quoted verbatim in the ledger (16.3315ms)
✔ GATE MUTATION SUITE: each core condition refuses and names itself (109.899917ms)
✔ outer receipt whitespace is ignored but inner bytes remain literal (36.24325ms)
▶ every gate condition fails closed when deliberately broken
  ✔ artifact missing (12.742042ms)
  ✔ artifact empty (11.245833ms)
  ✔ review missing (9.41025ms)
  ✔ verdict line missing (11.410208ms)
  ✔ verdict unknown (9.196875ms)
  ✔ receipt missing from last line (13.199375ms)
  ✔ generated review metadata missing (11.493458ms)
  ✔ duplicate generated review metadata is ambiguous (10.331333ms)
  ✔ review metadata names a different phase (14.3695ms)
  ✔ artifact changed after review (10.210125ms)
  ✔ final receipt differs from generated receipt (10.317792ms)
  ✔ receipt reused by another review (10.264708ms)
  ✔ approval ledger missing (7.899875ms)
  ✔ exact receipt absent from ledger (10.692125ms)
  ✔ approver missing (10.753166ms)
  ✔ APPROVE WITH COMMENTS has no ledger comments (10.229208ms)
  ✔ REVISE blocks even with receipt proof (9.170625ms)
  ✔ REJECT blocks even with receipt proof (9.330459ms)
  ✔ DISCUSS blocks without an owner ruling (13.723708ms)
  ✔ DISCUSS still blocks after the ruling until a fresh review (18.473ms)
✔ every gate condition fails closed when deliberately broken (226.754583ms)
✔ the approval and advancement recovery commands run exactly as printed (573.492333ms)
✔ the missing-review recovery command runs exactly as printed (495.62325ms)
✔ a phase entry remains valid only while every prior gate proof still exists on disk (36.605667ms)
✔ the repository carries the complete GPLv3-only license and Kristian's sole copyright (24.238917ms)
✔ PACKAGED NPX SUITE: the source-controlled binary is executable before npm touches it (16.297625ms)
✔ PACKAGED NPX SUITE: the documented local npx command does not mutate its checkout (1048.471459ms)
✔ PACKAGED NPX SUITE: a real tarball installs and runs the plain-JavaScript koda binary (2499.8835ms)
✔ RECEIPT ADVERSARIAL SUITE: an earlier review's receipt cannot approve a fresh review (26.79525ms)
✔ RECEIPT ADVERSARIAL SUITE: phase N receipt cannot approve phase N+1 (10.027666ms)
✔ RECEIPT ADVERSARIAL SUITE: outer whitespace is accepted and any inner word change refuses (16.693292ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REVISE (15.504875ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REJECT (9.108292ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override DISCUSS (8.30325ms)
✔ FULL RELAY RUNNER: preparation creates a clean pushed project with local skills (669.233958ms)
✔ FULL RELAY RUNNER: execution preserves two contexts and never automates owner receipt proof (1.873459ms)
✔ GENUINE FULL RELAY EVIDENCE: six phases, revision recovery, distinct contexts, and pushed close (12.050084ms)
✔ TWO-WINDOW PROTOCOL: reviewer jobs are bounded and duplicate reviewer windows refuse (10.462708ms)
✔ TWO-WINDOW VISIBILITY: progress is readable without exposing review receipts (0.456083ms)
✔ TWO-WINDOW RECEIPT: exact owner quote is recorded from Window B (753.469292ms)
✔ TWO-WINDOW RECEIPT MUTATION: a wrong quote refuses and names the preserved failed job (566.974042ms)
✔ TWO-WINDOW RELAY: a pending formal-review job wakes one persistent reviewer and returns acknowledged disk evidence (757.891916ms)
✔ TWO-WINDOW SESSION: separate producer and reviewer processes rendezvous through pushed close (3123.419417ms)
✔ REVIEW BINDING SUITE: changing review findings after owner acknowledgement refuses (28.1345ms)
✔ REVIEW BINDING SUITE: an untouched generated template cannot become an approved review (14.15975ms)
✔ a current review cannot be replaced before its receipt is recorded (23.724958ms)
✔ a revised artifact receives a fresh review, fresh receipt, and archived prior review (16.160625ms)
✔ DISCUSS requires the owner's ruling before a fresh definitive review (23.158667ms)
✔ REVIEWER FIXTURES: five sealed fixtures ship as blind Koda projects (40.723167ms)
✔ REVIEWER FIXTURES: the planted hard number is unsupported and the control has no plant (0.989375ms)
✔ REVIEWER FIXTURES: inference-chain plant requires a deduction across three source files (0.66525ms)
✔ REVIEWER FIXTURES: tempting honest control is imperfect in style but its claims execute (60.686125ms)
✔ REVIEWER FIXTURES: evidence-absence trap has working code but its claimed run record is missing (68.620625ms)
✔ REVIEWER FIXTURES: new scoring contracts still match their pre-run Git seal (47.948292ms)
✔ REVIEWER FIXTURES: Ghostty runs pin model and effort and preserve ephemeral Codex events (0.574584ms)
✔ REVIEWER FIXTURES: the bounded model matrix is backed by seventeen graded run folders (27.235041ms)
✔ SECURITY INTEGRITY SUITE: the install is dependency-free with no install hook (3.0175ms)
✔ SECURITY INTEGRITY SUITE: the committed repository contains no symbolic link (19.95ms)
✔ SECURITY INTEGRITY SUITE: tracked text contains no common live credential signature (155.697791ms)
✔ session creation requires a prompt and numbers dated folders (20.166042ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-z1MeoJ/remote.git
 * [new branch]      main -> main
✔ a completed session is closed only after its state is committed and pushed (1346.476875ms)
✔ immutable close refuses symbolic links inside session evidence (4.921833ms)
✔ immutable close refuses duplicate generated metadata markers (0.08075ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-ignored-remote-DF36mp/remote.git
 * [new branch]      main -> main
✔ immutable close refuses a bound session file that Git ignored instead of pushing (223.000292ms)
✔ every Koda-C skill has valid relay sections and four-line Codex metadata (15.681ms)
✔ skill index metadata stays concise, front-loaded, and trigger-specific (4.379333ms)
✔ producer phase skills hand only to the one shared reviewer (1.829666ms)
✔ the shared reviewer keeps all phase criteria in one place (6.763125ms)
✔ in-phase consultation is disk-backed and cannot impersonate formal review (2.5075ms)
✔ session open and close remain ceremonies outside producer phase routing (3.032333ms)
✔ fresh Codex startup discovers all nine local skills and root guidance without reading disk (1.931125ms)
✔ STALE-REVIEW BINDING: editing the artifact after review refuses with a named re-review reason (21.803042ms)
✔ STALE-REVIEW BINDING: reviewing after an edit binds the new artifact and opens (21.405083ms)
✔ STATUS TRUTH SUITE: deleting a review is reflected immediately (254.829709ms)
✔ STATUS TRUTH SUITE: blanking an artifact is reflected immediately (245.886833ms)
✔ STATUS TRUTH SUITE: corrupt ledger metadata refuses with a named corruption reason (104.270834ms)
✔ STATUS TRUTH SUITE: editing an acknowledged review is reflected immediately (98.025333ms)
✔ STATUS TRUTH SUITE: invalid state JSON refuses instead of guessing (92.280208ms)
✔ STATUS TRUTH SUITE: a path-like phase name in state refuses instead of escaping (102.793792ms)
✔ JUDGE JOURNEY SUITE: the committed binary runs without rebuilding (75.696083ms)
✔ JUDGE JOURNEY SUITE: video and submission documents preserve every live rule (2.043084ms)
✔ JUDGE JOURNEY SUITE: local links in the judge documents resolve (7.009ms)
ℹ tests 102
ℹ suites 0
ℹ pass 102
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 5512.7365
```
