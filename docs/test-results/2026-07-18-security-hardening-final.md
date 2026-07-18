# Per-test result — 2026-07-18-security-hardening-final

- Result: **PASS**
- Recorded at: 2026-07-18T18:03:56.660Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `a2f5a04`
- Command: `/opt/homebrew/Cellar/node/26.0.0/bin/node --test --test-reporter=spec tests/config.test.ts tests/dogfood.test.ts tests/full-lifecycle.test.ts tests/gate.test.ts tests/hints.test.ts tests/history.test.ts tests/license.test.ts tests/package.test.ts tests/receipt-adversarial.test.ts tests/relay-runner.test.ts tests/review-binding.test.ts tests/review.test.ts tests/reviewer-fixtures.test.ts tests/security.test.ts tests/session.test.ts tests/skill.test.ts tests/stale-review.test.ts tests/status-truth.test.ts`

Every discovered test and subtest is named below. No result is aggregated away.

```text
✔ the default phase chain is configurable data in the required order (2.204958ms)
✔ config validation rejects unsafe session paths and drifting phase names (0.369542ms)
✔ config validation refuses a sessions directory that resolves outside the project (16.059458ms)
✔ the committed dogfood snapshot contains the full native chain and an internally bound close (23.14125ms)
✔ FULL LIFECYCLE SCENARIO: clean approvals traverse all six phases and pushed close (595.495209ms)
✔ FULL LIFECYCLE SCENARIO: a REVISE loop recovers in plan before completing and closing (443.811417ms)
✔ FULL LIFECYCLE SCENARIO: DISCUSS records an owner ruling and requires a fresh live review (357.851541ms)
✔ a complete artifact, review, allowed verdict, unique receipt, and ledger proof open the gate (45.905625ms)
▶ GATE MUTATION SUITE: each core condition refuses and names itself
  ✔ artifact exists (10.944167ms)
  ✔ artifact is non-empty (9.160834ms)
  ✔ artifact is a regular file (10.652584ms)
  ✔ review exists (7.937ms)
  ✔ review is a regular file (9.534417ms)
  ✔ approval ledger is a regular file (9.144458ms)
  ✔ verdict REVISE is blocking (8.2695ms)
  ✔ verdict REJECT is blocking (10.968291ms)
  ✔ verdict DISCUSS is blocking (7.267833ms)
  ✔ current receipt is quoted verbatim in the ledger (7.603875ms)
✔ GATE MUTATION SUITE: each core condition refuses and names itself (92.817041ms)
✔ outer receipt whitespace is ignored but inner bytes remain literal (15.096083ms)
▶ every gate condition fails closed when deliberately broken
  ✔ artifact missing (8.547125ms)
  ✔ artifact empty (8.981792ms)
  ✔ review missing (7.174041ms)
  ✔ verdict line missing (9.687917ms)
  ✔ verdict unknown (11.166833ms)
  ✔ receipt missing from last line (11.709917ms)
  ✔ generated review metadata missing (7.989084ms)
  ✔ duplicate generated review metadata is ambiguous (9.530542ms)
  ✔ review metadata names a different phase (9.657167ms)
  ✔ artifact changed after review (11.122542ms)
  ✔ final receipt differs from generated receipt (10.096375ms)
  ✔ receipt reused by another review (10.172708ms)
  ✔ approval ledger missing (13.811542ms)
  ✔ exact receipt absent from ledger (13.931417ms)
  ✔ approver missing (10.049709ms)
  ✔ APPROVE WITH COMMENTS has no ledger comments (16.970042ms)
  ✔ REVISE blocks even with receipt proof (10.11825ms)
  ✔ REJECT blocks even with receipt proof (9.288417ms)
  ✔ DISCUSS blocks without an owner ruling (9.287916ms)
  ✔ DISCUSS still blocks after the ruling until a fresh review (9.715709ms)
✔ every gate condition fails closed when deliberately broken (213.534708ms)
✔ the approval and advancement recovery commands run exactly as printed (549.544917ms)
✔ the missing-review recovery command runs exactly as printed (400.6445ms)
✔ a phase entry remains valid only while every prior gate proof still exists on disk (38.028958ms)
✔ the repository carries the complete GPLv3-only license and Kristian's sole copyright (9.898084ms)
✔ PACKAGED NPX SUITE: the source-controlled binary is executable before npm touches it (4.036708ms)
✔ PACKAGED NPX SUITE: the documented local npx command does not mutate its checkout (998.891ms)
✔ PACKAGED NPX SUITE: a real tarball installs and runs the plain-JavaScript koda binary (2372.281125ms)
✔ RECEIPT ADVERSARIAL SUITE: an earlier review's receipt cannot approve a fresh review (24.262416ms)
✔ RECEIPT ADVERSARIAL SUITE: phase N receipt cannot approve phase N+1 (10.831125ms)
✔ RECEIPT ADVERSARIAL SUITE: outer whitespace is accepted and any inner word change refuses (17.99625ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REVISE (9.559875ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REJECT (9.739417ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override DISCUSS (7.598042ms)
✔ FULL RELAY RUNNER: preparation creates a clean pushed project with local skills (606.634167ms)
✔ FULL RELAY RUNNER: execution preserves two contexts and never automates owner receipt proof (1.557916ms)
✔ GENUINE FULL RELAY EVIDENCE: six phases, revision recovery, distinct contexts, and pushed close (12.566333ms)
✔ REVIEW BINDING SUITE: changing review findings after owner acknowledgement refuses (31.786458ms)
✔ REVIEW BINDING SUITE: an untouched generated template cannot become an approved review (10.995959ms)
✔ a current review cannot be replaced before its receipt is recorded (25.027333ms)
✔ a revised artifact receives a fresh review, fresh receipt, and archived prior review (23.086375ms)
✔ DISCUSS requires the owner's ruling before a fresh definitive review (18.008875ms)
✔ REVIEWER FIXTURES: five sealed fixtures ship as blind Koda projects (24.7825ms)
✔ REVIEWER FIXTURES: the planted hard number is unsupported and the control has no plant (0.845ms)
✔ REVIEWER FIXTURES: inference-chain plant requires a deduction across three source files (0.475833ms)
✔ REVIEWER FIXTURES: tempting honest control is imperfect in style but its claims execute (60.558917ms)
✔ REVIEWER FIXTURES: evidence-absence trap has working code but its claimed run record is missing (80.706125ms)
✔ REVIEWER FIXTURES: new scoring contracts still match their pre-run Git seal (39.407666ms)
✔ REVIEWER FIXTURES: Ghostty runs pin model and effort and preserve ephemeral Codex events (1.213791ms)
✔ REVIEWER FIXTURES: the bounded model matrix is backed by seventeen graded run folders (25.1ms)
✔ SECURITY INTEGRITY SUITE: the install is dependency-free with no install hook (3.203167ms)
✔ SECURITY INTEGRITY SUITE: the committed repository contains no symbolic link (17.821292ms)
✔ SECURITY INTEGRITY SUITE: tracked text contains no common live credential signature (152.243041ms)
✔ session creation requires a prompt and numbers dated folders (15.965542ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-Mdmxmu/remote.git
 * [new branch]      main -> main
✔ a completed session is closed only after its state is committed and pushed (1133.450375ms)
✔ immutable close refuses symbolic links inside session evidence (4.811708ms)
✔ immutable close refuses duplicate generated metadata markers (0.0855ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-ignored-remote-hkv2Ov/remote.git
 * [new branch]      main -> main
✔ immutable close refuses a bound session file that Git ignored instead of pushing (207.627042ms)
✔ every Koda-C skill has valid relay sections and four-line Codex metadata (13.691125ms)
✔ skill index metadata stays concise, front-loaded, and trigger-specific (6.9795ms)
✔ producer phase skills hand only to the one shared reviewer (3.124583ms)
✔ the shared reviewer keeps all phase criteria in one place (1.683625ms)
✔ in-phase consultation is disk-backed and cannot impersonate formal review (3.985834ms)
✔ session open and close remain ceremonies outside producer phase routing (0.515459ms)
✔ fresh Codex startup discovers all nine local skills and root guidance without reading disk (4.325708ms)
✔ STALE-REVIEW BINDING: editing the artifact after review refuses with a named re-review reason (19.809792ms)
✔ STALE-REVIEW BINDING: reviewing after an edit binds the new artifact and opens (11.268292ms)
✔ STATUS TRUTH SUITE: deleting a review is reflected immediately (213.894833ms)
✔ STATUS TRUTH SUITE: blanking an artifact is reflected immediately (193.294375ms)
✔ STATUS TRUTH SUITE: corrupt ledger metadata refuses with a named corruption reason (125.621625ms)
✔ STATUS TRUTH SUITE: editing an acknowledged review is reflected immediately (91.711292ms)
✔ STATUS TRUTH SUITE: invalid state JSON refuses instead of guessing (87.288708ms)
✔ STATUS TRUTH SUITE: a path-like phase name in state refuses instead of escaping (88.34175ms)
ℹ tests 93
ℹ suites 0
ℹ pass 93
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 3522.616542
```
