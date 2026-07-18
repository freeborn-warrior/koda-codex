# Per-test result — 2026-07-18-clean-local-npx-final

- Result: **PASS**
- Recorded at: 2026-07-18T17:43:17.115Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `4d0b959`
- Command: `/opt/homebrew/Cellar/node/26.0.0/bin/node --test --test-reporter=spec tests/config.test.ts tests/dogfood.test.ts tests/full-lifecycle.test.ts tests/gate.test.ts tests/hints.test.ts tests/history.test.ts tests/license.test.ts tests/package.test.ts tests/receipt-adversarial.test.ts tests/relay-runner.test.ts tests/review-binding.test.ts tests/review.test.ts tests/reviewer-fixtures.test.ts tests/session.test.ts tests/skill.test.ts tests/stale-review.test.ts tests/status-truth.test.ts`

Every discovered test and subtest is named below. No result is aggregated away.

```text
✔ the default phase chain is configurable data in the required order (1.131292ms)
✔ config validation rejects unsafe session paths and drifting phase names (0.1835ms)
✔ the committed dogfood snapshot contains the full native chain and an internally bound close (38.160334ms)
✔ FULL LIFECYCLE SCENARIO: clean approvals traverse all six phases and pushed close (550.92825ms)
✔ FULL LIFECYCLE SCENARIO: a REVISE loop recovers in plan before completing and closing (371.9215ms)
✔ FULL LIFECYCLE SCENARIO: DISCUSS records an owner ruling and requires a fresh live review (312.408167ms)
✔ a complete artifact, review, allowed verdict, unique receipt, and ledger proof open the gate (72.109333ms)
▶ GATE MUTATION SUITE: each core condition refuses and names itself
  ✔ artifact exists (34.318542ms)
  ✔ artifact is non-empty (18.347166ms)
  ✔ review exists (13.226208ms)
  ✔ verdict REVISE is blocking (11.689459ms)
  ✔ verdict REJECT is blocking (10.337166ms)
  ✔ verdict DISCUSS is blocking (9.54075ms)
  ✔ current receipt is quoted verbatim in the ledger (6.675292ms)
✔ GATE MUTATION SUITE: each core condition refuses and names itself (105.641292ms)
✔ outer receipt whitespace is ignored but inner bytes remain literal (22.247542ms)
▶ every gate condition fails closed when deliberately broken
  ✔ artifact missing (25.9285ms)
  ✔ artifact empty (21.939625ms)
  ✔ review missing (17.682042ms)
  ✔ verdict line missing (14.270167ms)
  ✔ verdict unknown (14.537333ms)
  ✔ receipt missing from last line (26.7045ms)
  ✔ generated review metadata missing (39.546583ms)
  ✔ review metadata names a different phase (30.27725ms)
  ✔ artifact changed after review (26.455542ms)
  ✔ final receipt differs from generated receipt (30.89225ms)
  ✔ receipt reused by another review (32.472125ms)
  ✔ approval ledger missing (14.455542ms)
  ✔ exact receipt absent from ledger (12.776875ms)
  ✔ approver missing (17.641542ms)
  ✔ APPROVE WITH COMMENTS has no ledger comments (12.098791ms)
  ✔ REVISE blocks even with receipt proof (12.006833ms)
  ✔ REJECT blocks even with receipt proof (13.2205ms)
  ✔ DISCUSS blocks without an owner ruling (9.438917ms)
  ✔ DISCUSS still blocks after the ruling until a fresh review (8.52775ms)
✔ every gate condition fails closed when deliberately broken (383.11775ms)
✔ the approval and advancement recovery commands run exactly as printed (662.557708ms)
✔ the missing-review recovery command runs exactly as printed (460.716208ms)
✔ a phase entry remains valid only while every prior gate proof still exists on disk (27.12775ms)
✔ the repository carries the complete GPLv3-only license and Kristian's sole copyright (5.883542ms)
✔ PACKAGED NPX SUITE: the source-controlled binary is executable before npm touches it (4.435416ms)
✔ PACKAGED NPX SUITE: the documented local npx command does not mutate its checkout (1329.41225ms)
✔ PACKAGED NPX SUITE: a real tarball installs and runs the plain-JavaScript koda binary (2462.427083ms)
✔ RECEIPT ADVERSARIAL SUITE: an earlier review's receipt cannot approve a fresh review (69.378708ms)
✔ RECEIPT ADVERSARIAL SUITE: phase N receipt cannot approve phase N+1 (16.807958ms)
✔ RECEIPT ADVERSARIAL SUITE: outer whitespace is accepted and any inner word change refuses (22.61275ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REVISE (13.749416ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REJECT (25.722166ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override DISCUSS (21.85625ms)
✔ FULL RELAY RUNNER: preparation creates a clean pushed project with local skills (728.685167ms)
✔ FULL RELAY RUNNER: execution preserves two contexts and never automates owner receipt proof (1.095041ms)
✔ GENUINE FULL RELAY EVIDENCE: six phases, revision recovery, distinct contexts, and pushed close (14.25225ms)
✔ REVIEW BINDING SUITE: changing review findings after owner acknowledgement refuses (34.478666ms)
✔ REVIEW BINDING SUITE: an untouched generated template cannot become an approved review (17.480333ms)
✔ a current review cannot be replaced before its receipt is recorded (25.620166ms)
✔ a revised artifact receives a fresh review, fresh receipt, and archived prior review (23.1495ms)
✔ DISCUSS requires the owner's ruling before a fresh definitive review (25.377166ms)
✔ REVIEWER FIXTURES: five sealed fixtures ship as blind Koda projects (41.631333ms)
✔ REVIEWER FIXTURES: the planted hard number is unsupported and the control has no plant (1.98375ms)
✔ REVIEWER FIXTURES: inference-chain plant requires a deduction across three source files (0.447083ms)
✔ REVIEWER FIXTURES: tempting honest control is imperfect in style but its claims execute (86.542125ms)
✔ REVIEWER FIXTURES: evidence-absence trap has working code but its claimed run record is missing (91.817834ms)
✔ REVIEWER FIXTURES: new scoring contracts still match their pre-run Git seal (55.566792ms)
✔ REVIEWER FIXTURES: Ghostty runs pin model and effort and preserve ephemeral Codex events (1.139625ms)
✔ REVIEWER FIXTURES: the bounded model matrix is backed by seventeen graded run folders (43.437625ms)
✔ session creation requires a prompt and numbers dated folders (22.252166ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-uKnDX3/remote.git
 * [new branch]      main -> main
✔ a completed session is closed only after its state is committed and pushed (1000.138208ms)
✔ every Koda-C skill has valid relay sections and four-line Codex metadata (8.433959ms)
✔ skill index metadata stays concise, front-loaded, and trigger-specific (8.4915ms)
✔ producer phase skills hand only to the one shared reviewer (1.879958ms)
✔ the shared reviewer keeps all phase criteria in one place (1.931834ms)
✔ in-phase consultation is disk-backed and cannot impersonate formal review (3.647ms)
✔ session open and close remain ceremonies outside producer phase routing (0.366709ms)
✔ fresh Codex startup discovers all nine local skills and root guidance without reading disk (0.93225ms)
✔ STALE-REVIEW BINDING: editing the artifact after review refuses with a named re-review reason (18.068166ms)
✔ STALE-REVIEW BINDING: reviewing after an edit binds the new artifact and opens (16.235209ms)
✔ STATUS TRUTH SUITE: deleting a review is reflected immediately (238.910708ms)
✔ STATUS TRUTH SUITE: blanking an artifact is reflected immediately (240.198917ms)
✔ STATUS TRUTH SUITE: corrupt ledger metadata refuses with a named corruption reason (102.491291ms)
✔ STATUS TRUTH SUITE: editing an acknowledged review is reflected immediately (105.676667ms)
✔ STATUS TRUTH SUITE: invalid state JSON refuses instead of guessing (107.546583ms)
ℹ tests 81
ℹ suites 0
ℹ pass 81
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 3996.168708
```
