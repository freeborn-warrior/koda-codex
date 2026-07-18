# Per-test result — 2026-07-18-one-command-owner-review-corrected

- Result: **PASS**
- Recorded at: 2026-07-18T16:20:55.616Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `2cd465d`
- Command: `/opt/homebrew/Cellar/node/26.0.0/bin/node --test --test-reporter=spec tests/config.test.ts tests/dogfood.test.ts tests/full-lifecycle.test.ts tests/gate.test.ts tests/hints.test.ts tests/history.test.ts tests/license.test.ts tests/package.test.ts tests/receipt-adversarial.test.ts tests/relay-runner.test.ts tests/review-binding.test.ts tests/review.test.ts tests/reviewer-fixtures.test.ts tests/session.test.ts tests/skill.test.ts tests/stale-review.test.ts tests/status-truth.test.ts`

Every discovered test and subtest is named below. No result is aggregated away.

```text
✔ the default phase chain is configurable data in the required order (1.15175ms)
✔ config validation rejects unsafe session paths and drifting phase names (0.184791ms)
✔ the committed dogfood snapshot contains the full native chain and an internally bound close (16.897792ms)
✔ FULL LIFECYCLE SCENARIO: clean approvals traverse all six phases and pushed close (491.671916ms)
✔ FULL LIFECYCLE SCENARIO: a REVISE loop recovers in plan before completing and closing (362.106583ms)
✔ FULL LIFECYCLE SCENARIO: DISCUSS records an owner ruling and requires a fresh live review (297.046416ms)
✔ a complete artifact, review, allowed verdict, unique receipt, and ledger proof open the gate (25.586291ms)
▶ GATE MUTATION SUITE: each core condition refuses and names itself
  ✔ artifact exists (12.837167ms)
  ✔ artifact is non-empty (10.200459ms)
  ✔ review exists (8.713625ms)
  ✔ verdict REVISE is blocking (12.547708ms)
  ✔ verdict REJECT is blocking (25.792875ms)
  ✔ verdict DISCUSS is blocking (48.30325ms)
  ✔ current receipt is quoted verbatim in the ledger (18.993333ms)
✔ GATE MUTATION SUITE: each core condition refuses and names itself (138.666375ms)
✔ outer receipt whitespace is ignored but inner bytes remain literal (74.631875ms)
▶ every gate condition fails closed when deliberately broken
  ✔ artifact missing (17.327542ms)
  ✔ artifact empty (13.376292ms)
  ✔ review missing (10.724416ms)
  ✔ verdict line missing (8.417334ms)
  ✔ verdict unknown (14.564458ms)
  ✔ receipt missing from last line (12.994209ms)
  ✔ generated review metadata missing (8.448167ms)
  ✔ review metadata names a different phase (9.232917ms)
  ✔ artifact changed after review (14.982ms)
  ✔ final receipt differs from generated receipt (21.196834ms)
  ✔ receipt reused by another review (11.126166ms)
  ✔ approval ledger missing (11.124333ms)
  ✔ exact receipt absent from ledger (10.305167ms)
  ✔ approver missing (8.559166ms)
  ✔ APPROVE WITH COMMENTS has no ledger comments (11.465ms)
  ✔ REVISE blocks even with receipt proof (8.438458ms)
  ✔ REJECT blocks even with receipt proof (7.279167ms)
  ✔ DISCUSS blocks without an owner ruling (6.50225ms)
  ✔ DISCUSS still blocks after the ruling until a fresh review (19.290958ms)
✔ every gate condition fails closed when deliberately broken (227.999583ms)
✔ the approval and advancement recovery commands run exactly as printed (572.337083ms)
✔ the missing-review recovery command runs exactly as printed (442.393084ms)
✔ a phase entry remains valid only while every prior gate proof still exists on disk (33.165541ms)
✔ the repository carries the complete GPLv3-only license and Kristian's sole copyright (3.726875ms)
✔ PACKAGED NPX SUITE: a real tarball installs and runs the plain-JavaScript koda binary (2414.229375ms)
✔ RECEIPT ADVERSARIAL SUITE: an earlier review's receipt cannot approve a fresh review (30.418291ms)
✔ RECEIPT ADVERSARIAL SUITE: phase N receipt cannot approve phase N+1 (11.000917ms)
✔ RECEIPT ADVERSARIAL SUITE: outer whitespace is accepted and any inner word change refuses (15.636792ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REVISE (9.127375ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REJECT (7.253ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override DISCUSS (9.286083ms)
✔ FULL RELAY RUNNER: preparation creates a clean pushed project with local skills (630.124375ms)
✔ FULL RELAY RUNNER: execution preserves two contexts and never automates owner receipt proof (1.163792ms)
✔ REVIEW BINDING SUITE: changing review findings after owner acknowledgement refuses (21.846166ms)
✔ REVIEW BINDING SUITE: an untouched generated template cannot become an approved review (10.048958ms)
✔ a current review cannot be replaced before its receipt is recorded (17.943833ms)
✔ a revised artifact receives a fresh review, fresh receipt, and archived prior review (11.436833ms)
✔ DISCUSS requires the owner's ruling before a fresh definitive review (32.839375ms)
✔ REVIEWER FIXTURES: five sealed fixtures ship as blind Koda projects (40.2615ms)
✔ REVIEWER FIXTURES: the planted hard number is unsupported and the control has no plant (1.280708ms)
✔ REVIEWER FIXTURES: inference-chain plant requires a deduction across three source files (0.742625ms)
✔ REVIEWER FIXTURES: tempting honest control is imperfect in style but its claims execute (85.2805ms)
✔ REVIEWER FIXTURES: evidence-absence trap has working code but its claimed run record is missing (86.68875ms)
✔ REVIEWER FIXTURES: new scoring contracts still match their pre-run Git seal (57.3055ms)
✔ REVIEWER FIXTURES: Ghostty runs pin model and effort and preserve ephemeral Codex events (1.463667ms)
✔ REVIEWER FIXTURES: the medium model matrix is backed by six graded run folders (2.674125ms)
✔ session creation requires a prompt and numbers dated folders (25.051958ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-bCmRDv/remote.git
 * [new branch]      main -> main
✔ a completed session is closed only after its state is committed and pushed (1005.545333ms)
✔ every Koda-C skill has valid relay sections and four-line Codex metadata (11.160875ms)
✔ skill index metadata stays concise, front-loaded, and trigger-specific (9.131792ms)
✔ producer phase skills hand only to the one shared reviewer (2.338541ms)
✔ the shared reviewer keeps all phase criteria in one place (3.325958ms)
✔ in-phase consultation is disk-backed and cannot impersonate formal review (4.133375ms)
✔ session open and close remain ceremonies outside producer phase routing (2.345125ms)
✔ STALE-REVIEW BINDING: editing the artifact after review refuses with a named re-review reason (22.720125ms)
✔ STALE-REVIEW BINDING: reviewing after an edit binds the new artifact and opens (14.454417ms)
✔ STATUS TRUTH SUITE: deleting a review is reflected immediately (250.955417ms)
✔ STATUS TRUTH SUITE: blanking an artifact is reflected immediately (233.475084ms)
✔ STATUS TRUTH SUITE: corrupt ledger metadata refuses with a named corruption reason (101.622417ms)
✔ STATUS TRUTH SUITE: editing an acknowledged review is reflected immediately (117.044125ms)
✔ STATUS TRUTH SUITE: invalid state JSON refuses instead of guessing (98.353416ms)
ℹ tests 77
ℹ suites 0
ℹ pass 77
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 2554.789166
```
