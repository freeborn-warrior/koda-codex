# Per-test result — 2026-07-18-judge-journey-corrected

- Result: **PASS**
- Recorded at: 2026-07-18T18:11:35.171Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `3642334`
- Command: `/opt/homebrew/Cellar/node/26.0.0/bin/node --test --test-reporter=spec tests/config.test.ts tests/dogfood.test.ts tests/full-lifecycle.test.ts tests/gate.test.ts tests/hints.test.ts tests/history.test.ts tests/license.test.ts tests/package.test.ts tests/receipt-adversarial.test.ts tests/relay-runner.test.ts tests/review-binding.test.ts tests/review.test.ts tests/reviewer-fixtures.test.ts tests/security.test.ts tests/session.test.ts tests/skill.test.ts tests/stale-review.test.ts tests/status-truth.test.ts tests/submission.test.ts`

Every discovered test and subtest is named below. No result is aggregated away.

```text
✔ the default phase chain is configurable data in the required order (1.082042ms)
✔ config validation rejects unsafe session paths and drifting phase names (0.176209ms)
✔ config validation refuses a sessions directory that resolves outside the project (32.720208ms)
✔ the committed dogfood snapshot contains the full native chain and an internally bound close (26.499334ms)
✔ FULL LIFECYCLE SCENARIO: clean approvals traverse all six phases and pushed close (623.645458ms)
✔ FULL LIFECYCLE SCENARIO: a REVISE loop recovers in plan before completing and closing (444.056792ms)
✔ FULL LIFECYCLE SCENARIO: DISCUSS records an owner ruling and requires a fresh live review (360.296708ms)
✔ a complete artifact, review, allowed verdict, unique receipt, and ledger proof open the gate (35.033417ms)
▶ GATE MUTATION SUITE: each core condition refuses and names itself
  ✔ artifact exists (10.213083ms)
  ✔ artifact is non-empty (11.547625ms)
  ✔ artifact is a regular file (11.774417ms)
  ✔ review exists (7.91825ms)
  ✔ review is a regular file (9.278375ms)
  ✔ approval ledger is a regular file (9.254875ms)
  ✔ verdict REVISE is blocking (7.498459ms)
  ✔ verdict REJECT is blocking (7.5515ms)
  ✔ verdict DISCUSS is blocking (10.772125ms)
  ✔ current receipt is quoted verbatim in the ledger (8.722125ms)
✔ GATE MUTATION SUITE: each core condition refuses and names itself (96.023084ms)
✔ outer receipt whitespace is ignored but inner bytes remain literal (18.446584ms)
▶ every gate condition fails closed when deliberately broken
  ✔ artifact missing (6.958875ms)
  ✔ artifact empty (7.2485ms)
  ✔ review missing (9.765375ms)
  ✔ verdict line missing (12.677208ms)
  ✔ verdict unknown (13.470334ms)
  ✔ receipt missing from last line (10.078083ms)
  ✔ generated review metadata missing (7.994042ms)
  ✔ duplicate generated review metadata is ambiguous (10.870459ms)
  ✔ review metadata names a different phase (13.007791ms)
  ✔ artifact changed after review (10.661125ms)
  ✔ final receipt differs from generated receipt (10.457542ms)
  ✔ receipt reused by another review (11.226417ms)
  ✔ approval ledger missing (7.416833ms)
  ✔ exact receipt absent from ledger (9.730083ms)
  ✔ approver missing (8.253542ms)
  ✔ APPROVE WITH COMMENTS has no ledger comments (10.341292ms)
  ✔ REVISE blocks even with receipt proof (13.002584ms)
  ✔ REJECT blocks even with receipt proof (7.258125ms)
  ✔ DISCUSS blocks without an owner ruling (10.327666ms)
  ✔ DISCUSS still blocks after the ruling until a fresh review (11.696375ms)
✔ every gate condition fails closed when deliberately broken (204.722875ms)
✔ the approval and advancement recovery commands run exactly as printed (527.809333ms)
✔ the missing-review recovery command runs exactly as printed (415.493792ms)
✔ a phase entry remains valid only while every prior gate proof still exists on disk (50.168792ms)
✔ the repository carries the complete GPLv3-only license and Kristian's sole copyright (3.733541ms)
✔ PACKAGED NPX SUITE: the source-controlled binary is executable before npm touches it (11.225583ms)
✔ PACKAGED NPX SUITE: the documented local npx command does not mutate its checkout (988.136584ms)
✔ PACKAGED NPX SUITE: a real tarball installs and runs the plain-JavaScript koda binary (2386.442166ms)
✔ RECEIPT ADVERSARIAL SUITE: an earlier review's receipt cannot approve a fresh review (24.055833ms)
✔ RECEIPT ADVERSARIAL SUITE: phase N receipt cannot approve phase N+1 (12.364041ms)
✔ RECEIPT ADVERSARIAL SUITE: outer whitespace is accepted and any inner word change refuses (19.607709ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REVISE (8.001459ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REJECT (10.247875ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override DISCUSS (7.686708ms)
✔ FULL RELAY RUNNER: preparation creates a clean pushed project with local skills (585.018542ms)
✔ FULL RELAY RUNNER: execution preserves two contexts and never automates owner receipt proof (1.50175ms)
✔ GENUINE FULL RELAY EVIDENCE: six phases, revision recovery, distinct contexts, and pushed close (10.673875ms)
✔ REVIEW BINDING SUITE: changing review findings after owner acknowledgement refuses (39.738625ms)
✔ REVIEW BINDING SUITE: an untouched generated template cannot become an approved review (21.202333ms)
✔ a current review cannot be replaced before its receipt is recorded (39.069875ms)
✔ a revised artifact receives a fresh review, fresh receipt, and archived prior review (22.66975ms)
✔ DISCUSS requires the owner's ruling before a fresh definitive review (25.717541ms)
✔ REVIEWER FIXTURES: five sealed fixtures ship as blind Koda projects (23.535875ms)
✔ REVIEWER FIXTURES: the planted hard number is unsupported and the control has no plant (0.976917ms)
✔ REVIEWER FIXTURES: inference-chain plant requires a deduction across three source files (0.697334ms)
✔ REVIEWER FIXTURES: tempting honest control is imperfect in style but its claims execute (73.171458ms)
✔ REVIEWER FIXTURES: evidence-absence trap has working code but its claimed run record is missing (69.707167ms)
✔ REVIEWER FIXTURES: new scoring contracts still match their pre-run Git seal (44.610334ms)
✔ REVIEWER FIXTURES: Ghostty runs pin model and effort and preserve ephemeral Codex events (0.585917ms)
✔ REVIEWER FIXTURES: the bounded model matrix is backed by seventeen graded run folders (23.918416ms)
✔ SECURITY INTEGRITY SUITE: the install is dependency-free with no install hook (2.942583ms)
✔ SECURITY INTEGRITY SUITE: the committed repository contains no symbolic link (23.399125ms)
✔ SECURITY INTEGRITY SUITE: tracked text contains no common live credential signature (137.700084ms)
✔ session creation requires a prompt and numbers dated folders (12.643833ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-nJ7wAW/remote.git
 * [new branch]      main -> main
✔ a completed session is closed only after its state is committed and pushed (1136.30475ms)
✔ immutable close refuses symbolic links inside session evidence (4.889792ms)
✔ immutable close refuses duplicate generated metadata markers (0.071916ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-ignored-remote-zm4HsT/remote.git
 * [new branch]      main -> main
✔ immutable close refuses a bound session file that Git ignored instead of pushing (203.542792ms)
✔ every Koda-C skill has valid relay sections and four-line Codex metadata (6.555333ms)
✔ skill index metadata stays concise, front-loaded, and trigger-specific (3.036708ms)
✔ producer phase skills hand only to the one shared reviewer (1.753083ms)
✔ the shared reviewer keeps all phase criteria in one place (1.684167ms)
✔ in-phase consultation is disk-backed and cannot impersonate formal review (2.247042ms)
✔ session open and close remain ceremonies outside producer phase routing (0.4715ms)
✔ fresh Codex startup discovers all nine local skills and root guidance without reading disk (1.995125ms)
✔ STALE-REVIEW BINDING: editing the artifact after review refuses with a named re-review reason (20.588625ms)
✔ STALE-REVIEW BINDING: reviewing after an edit binds the new artifact and opens (11.570167ms)
✔ STATUS TRUTH SUITE: deleting a review is reflected immediately (242.424708ms)
✔ STATUS TRUTH SUITE: blanking an artifact is reflected immediately (193.976792ms)
✔ STATUS TRUTH SUITE: corrupt ledger metadata refuses with a named corruption reason (105.01725ms)
✔ STATUS TRUTH SUITE: editing an acknowledged review is reflected immediately (93.927ms)
✔ STATUS TRUTH SUITE: invalid state JSON refuses instead of guessing (90.603ms)
✔ STATUS TRUTH SUITE: a path-like phase name in state refuses instead of escaping (91.345667ms)
✔ JUDGE JOURNEY SUITE: the committed binary runs without rebuilding (68.404292ms)
✔ JUDGE JOURNEY SUITE: video and submission documents preserve every live rule (3.063083ms)
✔ JUDGE JOURNEY SUITE: local links in the judge documents resolve (3.453291ms)
ℹ tests 96
ℹ suites 0
ℹ pass 96
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 3526.361625
```
