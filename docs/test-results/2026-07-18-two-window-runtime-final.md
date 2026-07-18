# Per-test result — 2026-07-18-two-window-runtime-final

- Result: **PASS**
- Recorded at: 2026-07-18T18:34:02.960Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `7456699`
- Command: `/opt/homebrew/Cellar/node/26.0.0/bin/node --test --test-reporter=spec tests/config.test.ts tests/dogfood.test.ts tests/full-lifecycle.test.ts tests/gate.test.ts tests/hints.test.ts tests/history.test.ts tests/license.test.ts tests/package.test.ts tests/receipt-adversarial.test.ts tests/relay-runner.test.ts tests/relay-window.test.ts tests/review-binding.test.ts tests/review.test.ts tests/reviewer-fixtures.test.ts tests/security.test.ts tests/session.test.ts tests/skill.test.ts tests/stale-review.test.ts tests/status-truth.test.ts tests/submission.test.ts`

Every discovered test and subtest is named below. No result is aggregated away.

```text
✔ the default phase chain is configurable data in the required order (1.078917ms)
✔ config validation rejects unsafe session paths and drifting phase names (0.17275ms)
✔ config validation refuses a sessions directory that resolves outside the project (11.722667ms)
✔ the committed dogfood snapshot contains the full native chain and an internally bound close (26.42825ms)
✔ FULL LIFECYCLE SCENARIO: clean approvals traverse all six phases and pushed close (774.093166ms)
✔ FULL LIFECYCLE SCENARIO: a REVISE loop recovers in plan before completing and closing (528.393667ms)
✔ FULL LIFECYCLE SCENARIO: DISCUSS records an owner ruling and requires a fresh live review (473.235875ms)
✔ a complete artifact, review, allowed verdict, unique receipt, and ledger proof open the gate (19.902ms)
▶ GATE MUTATION SUITE: each core condition refuses and names itself
  ✔ artifact exists (8.897042ms)
  ✔ artifact is non-empty (11.710875ms)
  ✔ artifact is a regular file (13.031834ms)
  ✔ review exists (8.412333ms)
  ✔ review is a regular file (13.707167ms)
  ✔ approval ledger is a regular file (8.106ms)
  ✔ verdict REVISE is blocking (8.066875ms)
  ✔ verdict REJECT is blocking (10.447375ms)
  ✔ verdict DISCUSS is blocking (13.340708ms)
  ✔ current receipt is quoted verbatim in the ledger (13.943ms)
✔ GATE MUTATION SUITE: each core condition refuses and names itself (111.487959ms)
✔ outer receipt whitespace is ignored but inner bytes remain literal (44.504792ms)
▶ every gate condition fails closed when deliberately broken
  ✔ artifact missing (9.760375ms)
  ✔ artifact empty (20.259375ms)
  ✔ review missing (17.098542ms)
  ✔ verdict line missing (22.739542ms)
  ✔ verdict unknown (17.47375ms)
  ✔ receipt missing from last line (9.647666ms)
  ✔ generated review metadata missing (7.84375ms)
  ✔ duplicate generated review metadata is ambiguous (8.951042ms)
  ✔ review metadata names a different phase (13.652417ms)
  ✔ artifact changed after review (11.371541ms)
  ✔ final receipt differs from generated receipt (17.876375ms)
  ✔ receipt reused by another review (18.721375ms)
  ✔ approval ledger missing (11.045041ms)
  ✔ exact receipt absent from ledger (20.244334ms)
  ✔ approver missing (15.865208ms)
  ✔ APPROVE WITH COMMENTS has no ledger comments (13.014666ms)
  ✔ REVISE blocks even with receipt proof (14.212792ms)
  ✔ REJECT blocks even with receipt proof (13.333375ms)
  ✔ DISCUSS blocks without an owner ruling (16.445542ms)
  ✔ DISCUSS still blocks after the ruling until a fresh review (10.863666ms)
✔ every gate condition fails closed when deliberately broken (293.057916ms)
✔ the approval and advancement recovery commands run exactly as printed (516.430958ms)
✔ the missing-review recovery command runs exactly as printed (469.857916ms)
✔ a phase entry remains valid only while every prior gate proof still exists on disk (50.08625ms)
✔ the repository carries the complete GPLv3-only license and Kristian's sole copyright (5.499375ms)
✔ PACKAGED NPX SUITE: the source-controlled binary is executable before npm touches it (5.143292ms)
✔ PACKAGED NPX SUITE: the documented local npx command does not mutate its checkout (1182.496709ms)
✔ PACKAGED NPX SUITE: a real tarball installs and runs the plain-JavaScript koda binary (2495.985791ms)
✔ RECEIPT ADVERSARIAL SUITE: an earlier review's receipt cannot approve a fresh review (45.47425ms)
✔ RECEIPT ADVERSARIAL SUITE: phase N receipt cannot approve phase N+1 (13.061458ms)
✔ RECEIPT ADVERSARIAL SUITE: outer whitespace is accepted and any inner word change refuses (21.34175ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REVISE (13.714542ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REJECT (10.931959ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override DISCUSS (8.196042ms)
✔ FULL RELAY RUNNER: preparation creates a clean pushed project with local skills (708.035375ms)
✔ FULL RELAY RUNNER: execution preserves two contexts and never automates owner receipt proof (1.417083ms)
✔ GENUINE FULL RELAY EVIDENCE: six phases, revision recovery, distinct contexts, and pushed close (17.129041ms)
✔ TWO-WINDOW PROTOCOL: reviewer jobs are bounded and duplicate reviewer windows refuse (23.705792ms)
✔ TWO-WINDOW VISIBILITY: progress is readable without exposing review receipts (0.2575ms)
✔ TWO-WINDOW RECEIPT: exact owner quote is recorded from Window B (758.636208ms)
✔ TWO-WINDOW RECEIPT MUTATION: a wrong quote refuses and names the preserved failed job (564.614833ms)
✔ TWO-WINDOW RELAY: a pending formal-review job wakes one persistent reviewer and returns acknowledged disk evidence (775.806542ms)
✔ REVIEW BINDING SUITE: changing review findings after owner acknowledgement refuses (41.7545ms)
✔ REVIEW BINDING SUITE: an untouched generated template cannot become an approved review (12.853083ms)
✔ a current review cannot be replaced before its receipt is recorded (27.159875ms)
✔ a revised artifact receives a fresh review, fresh receipt, and archived prior review (16.345417ms)
✔ DISCUSS requires the owner's ruling before a fresh definitive review (25.301375ms)
✔ REVIEWER FIXTURES: five sealed fixtures ship as blind Koda projects (32.897083ms)
✔ REVIEWER FIXTURES: the planted hard number is unsupported and the control has no plant (1.104292ms)
✔ REVIEWER FIXTURES: inference-chain plant requires a deduction across three source files (0.814458ms)
✔ REVIEWER FIXTURES: tempting honest control is imperfect in style but its claims execute (68.940708ms)
✔ REVIEWER FIXTURES: evidence-absence trap has working code but its claimed run record is missing (83.695833ms)
✔ REVIEWER FIXTURES: new scoring contracts still match their pre-run Git seal (51.152458ms)
✔ REVIEWER FIXTURES: Ghostty runs pin model and effort and preserve ephemeral Codex events (0.539625ms)
✔ REVIEWER FIXTURES: the bounded model matrix is backed by seventeen graded run folders (37.401ms)
✔ SECURITY INTEGRITY SUITE: the install is dependency-free with no install hook (2.632291ms)
✔ SECURITY INTEGRITY SUITE: the committed repository contains no symbolic link (16.038334ms)
✔ SECURITY INTEGRITY SUITE: tracked text contains no common live credential signature (143.72725ms)
✔ session creation requires a prompt and numbers dated folders (18.641ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-L6f3Yo/remote.git
 * [new branch]      main -> main
✔ a completed session is closed only after its state is committed and pushed (1399.087375ms)
✔ immutable close refuses symbolic links inside session evidence (6.535916ms)
✔ immutable close refuses duplicate generated metadata markers (0.087333ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-ignored-remote-ytCmXJ/remote.git
 * [new branch]      main -> main
✔ immutable close refuses a bound session file that Git ignored instead of pushing (219.547833ms)
✔ every Koda-C skill has valid relay sections and four-line Codex metadata (8.196041ms)
✔ skill index metadata stays concise, front-loaded, and trigger-specific (3.743125ms)
✔ producer phase skills hand only to the one shared reviewer (1.902375ms)
✔ the shared reviewer keeps all phase criteria in one place (1.191292ms)
✔ in-phase consultation is disk-backed and cannot impersonate formal review (2.3945ms)
✔ session open and close remain ceremonies outside producer phase routing (0.694291ms)
✔ fresh Codex startup discovers all nine local skills and root guidance without reading disk (5.295334ms)
✔ STALE-REVIEW BINDING: editing the artifact after review refuses with a named re-review reason (27.014125ms)
✔ STALE-REVIEW BINDING: reviewing after an edit binds the new artifact and opens (14.400208ms)
✔ STATUS TRUTH SUITE: deleting a review is reflected immediately (275.750584ms)
✔ STATUS TRUTH SUITE: blanking an artifact is reflected immediately (211.976333ms)
✔ STATUS TRUTH SUITE: corrupt ledger metadata refuses with a named corruption reason (122.043042ms)
✔ STATUS TRUTH SUITE: editing an acknowledged review is reflected immediately (103.889125ms)
✔ STATUS TRUTH SUITE: invalid state JSON refuses instead of guessing (105.121375ms)
✔ STATUS TRUTH SUITE: a path-like phase name in state refuses instead of escaping (100.725042ms)
✔ JUDGE JOURNEY SUITE: the committed binary runs without rebuilding (86.868208ms)
✔ JUDGE JOURNEY SUITE: video and submission documents preserve every live rule (4.085333ms)
✔ JUDGE JOURNEY SUITE: local links in the judge documents resolve (5.321ms)
ℹ tests 101
ℹ suites 0
ℹ pass 101
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 3854.788375
```
