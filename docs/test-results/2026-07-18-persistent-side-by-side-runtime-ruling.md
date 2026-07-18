# Per-test result — 2026-07-18-persistent-side-by-side-runtime-ruling

- Result: **PASS**
- Recorded at: 2026-07-18T16:29:43.617Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `6cfc1d1`
- Command: `/opt/homebrew/Cellar/node/26.0.0/bin/node --test --test-reporter=spec tests/config.test.ts tests/dogfood.test.ts tests/full-lifecycle.test.ts tests/gate.test.ts tests/hints.test.ts tests/history.test.ts tests/license.test.ts tests/package.test.ts tests/receipt-adversarial.test.ts tests/relay-runner.test.ts tests/review-binding.test.ts tests/review.test.ts tests/reviewer-fixtures.test.ts tests/session.test.ts tests/skill.test.ts tests/stale-review.test.ts tests/status-truth.test.ts`

Every discovered test and subtest is named below. No result is aggregated away.

```text
✔ the default phase chain is configurable data in the required order (1.196125ms)
✔ config validation rejects unsafe session paths and drifting phase names (0.390208ms)
✔ the committed dogfood snapshot contains the full native chain and an internally bound close (23.370625ms)
✔ FULL LIFECYCLE SCENARIO: clean approvals traverse all six phases and pushed close (484.363917ms)
✔ FULL LIFECYCLE SCENARIO: a REVISE loop recovers in plan before completing and closing (366.350833ms)
✔ FULL LIFECYCLE SCENARIO: DISCUSS records an owner ruling and requires a fresh live review (308.45125ms)
✔ a complete artifact, review, allowed verdict, unique receipt, and ledger proof open the gate (22.355042ms)
▶ GATE MUTATION SUITE: each core condition refuses and names itself
  ✔ artifact exists (9.926667ms)
  ✔ artifact is non-empty (8.895625ms)
  ✔ review exists (8.097583ms)
  ✔ verdict REVISE is blocking (9.886708ms)
  ✔ verdict REJECT is blocking (8.869583ms)
  ✔ verdict DISCUSS is blocking (18.679041ms)
  ✔ current receipt is quoted verbatim in the ledger (27.157584ms)
✔ GATE MUTATION SUITE: each core condition refuses and names itself (92.482083ms)
✔ outer receipt whitespace is ignored but inner bytes remain literal (35.347583ms)
▶ every gate condition fails closed when deliberately broken
  ✔ artifact missing (11.218708ms)
  ✔ artifact empty (9.372209ms)
  ✔ review missing (7.303083ms)
  ✔ verdict line missing (8.535417ms)
  ✔ verdict unknown (11.151709ms)
  ✔ receipt missing from last line (7.09675ms)
  ✔ generated review metadata missing (8.130291ms)
  ✔ review metadata names a different phase (52.872833ms)
  ✔ artifact changed after review (13.48825ms)
  ✔ final receipt differs from generated receipt (9.126292ms)
  ✔ receipt reused by another review (12.18775ms)
  ✔ approval ledger missing (11.618292ms)
  ✔ exact receipt absent from ledger (12.801834ms)
  ✔ approver missing (15.564667ms)
  ✔ APPROVE WITH COMMENTS has no ledger comments (9.44025ms)
  ✔ REVISE blocks even with receipt proof (10.025459ms)
  ✔ REJECT blocks even with receipt proof (7.249708ms)
  ✔ DISCUSS blocks without an owner ruling (7.989458ms)
  ✔ DISCUSS still blocks after the ruling until a fresh review (7.659791ms)
✔ every gate condition fails closed when deliberately broken (235.014166ms)
✔ the approval and advancement recovery commands run exactly as printed (579.654333ms)
✔ the missing-review recovery command runs exactly as printed (467.065708ms)
✔ a phase entry remains valid only while every prior gate proof still exists on disk (33.643125ms)
✔ the repository carries the complete GPLv3-only license and Kristian's sole copyright (18.693875ms)
✔ PACKAGED NPX SUITE: a real tarball installs and runs the plain-JavaScript koda binary (2710.200666ms)
✔ RECEIPT ADVERSARIAL SUITE: an earlier review's receipt cannot approve a fresh review (27.620417ms)
✔ RECEIPT ADVERSARIAL SUITE: phase N receipt cannot approve phase N+1 (11.556459ms)
✔ RECEIPT ADVERSARIAL SUITE: outer whitespace is accepted and any inner word change refuses (18.315917ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REVISE (9.3065ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REJECT (14.907959ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override DISCUSS (20.899917ms)
✔ FULL RELAY RUNNER: preparation creates a clean pushed project with local skills (634.004667ms)
✔ FULL RELAY RUNNER: execution preserves two contexts and never automates owner receipt proof (0.930416ms)
✔ REVIEW BINDING SUITE: changing review findings after owner acknowledgement refuses (24.479ms)
✔ REVIEW BINDING SUITE: an untouched generated template cannot become an approved review (11.90425ms)
✔ a current review cannot be replaced before its receipt is recorded (17.716875ms)
✔ a revised artifact receives a fresh review, fresh receipt, and archived prior review (12.206209ms)
✔ DISCUSS requires the owner's ruling before a fresh definitive review (16.478542ms)
✔ REVIEWER FIXTURES: five sealed fixtures ship as blind Koda projects (30.924292ms)
✔ REVIEWER FIXTURES: the planted hard number is unsupported and the control has no plant (1.395708ms)
✔ REVIEWER FIXTURES: inference-chain plant requires a deduction across three source files (0.532333ms)
✔ REVIEWER FIXTURES: tempting honest control is imperfect in style but its claims execute (87.06275ms)
✔ REVIEWER FIXTURES: evidence-absence trap has working code but its claimed run record is missing (92.014ms)
✔ REVIEWER FIXTURES: new scoring contracts still match their pre-run Git seal (50.36725ms)
✔ REVIEWER FIXTURES: Ghostty runs pin model and effort and preserve ephemeral Codex events (0.991125ms)
✔ REVIEWER FIXTURES: the medium model matrix is backed by six graded run folders (2.33425ms)
✔ session creation requires a prompt and numbers dated folders (23.447291ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-kHdny6/remote.git
 * [new branch]      main -> main
✔ a completed session is closed only after its state is committed and pushed (975.844ms)
✔ every Koda-C skill has valid relay sections and four-line Codex metadata (8.888833ms)
✔ skill index metadata stays concise, front-loaded, and trigger-specific (5.142542ms)
✔ producer phase skills hand only to the one shared reviewer (2.019833ms)
✔ the shared reviewer keeps all phase criteria in one place (2.261ms)
✔ in-phase consultation is disk-backed and cannot impersonate formal review (1.897292ms)
✔ session open and close remain ceremonies outside producer phase routing (0.865375ms)
✔ STALE-REVIEW BINDING: editing the artifact after review refuses with a named re-review reason (26.830834ms)
✔ STALE-REVIEW BINDING: reviewing after an edit binds the new artifact and opens (17.326708ms)
✔ STATUS TRUTH SUITE: deleting a review is reflected immediately (252.072458ms)
✔ STATUS TRUTH SUITE: blanking an artifact is reflected immediately (242.677875ms)
✔ STATUS TRUTH SUITE: corrupt ledger metadata refuses with a named corruption reason (113.2865ms)
✔ STATUS TRUTH SUITE: editing an acknowledged review is reflected immediately (101.531792ms)
✔ STATUS TRUTH SUITE: invalid state JSON refuses instead of guessing (102.614917ms)
ℹ tests 77
ℹ suites 0
ℹ pass 77
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 2864.934208
```
