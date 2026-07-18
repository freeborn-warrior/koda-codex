# Per-test result — 2026-07-18-ghostty-command-sheet-final

- Result: **PASS**
- Recorded at: 2026-07-18T15:59:22.114Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `97c5287`
- Command: `/opt/homebrew/Cellar/node/26.0.0/bin/node --test --test-reporter=spec tests/config.test.ts tests/dogfood.test.ts tests/full-lifecycle.test.ts tests/gate.test.ts tests/hints.test.ts tests/history.test.ts tests/license.test.ts tests/package.test.ts tests/receipt-adversarial.test.ts tests/relay-runner.test.ts tests/review-binding.test.ts tests/review.test.ts tests/reviewer-fixtures.test.ts tests/session.test.ts tests/skill.test.ts tests/stale-review.test.ts tests/status-truth.test.ts`

Every discovered test and subtest is named below. No result is aggregated away.

```text
✔ the default phase chain is configurable data in the required order (1.19725ms)
✔ config validation rejects unsafe session paths and drifting phase names (0.261416ms)
✔ the committed dogfood snapshot contains the full native chain and an internally bound close (33.705541ms)
✔ FULL LIFECYCLE SCENARIO: clean approvals traverse all six phases and pushed close (493.92975ms)
✔ FULL LIFECYCLE SCENARIO: a REVISE loop recovers in plan before completing and closing (370.281709ms)
✔ FULL LIFECYCLE SCENARIO: DISCUSS records an owner ruling and requires a fresh live review (330.885584ms)
✔ a complete artifact, review, allowed verdict, unique receipt, and ledger proof open the gate (39.16275ms)
▶ GATE MUTATION SUITE: each core condition refuses and names itself
  ✔ artifact exists (12.603583ms)
  ✔ artifact is non-empty (13.372375ms)
  ✔ review exists (8.407625ms)
  ✔ verdict REVISE is blocking (9.502834ms)
  ✔ verdict REJECT is blocking (12.963542ms)
  ✔ verdict DISCUSS is blocking (16.710833ms)
  ✔ current receipt is quoted verbatim in the ledger (21.983625ms)
✔ GATE MUTATION SUITE: each core condition refuses and names itself (96.736041ms)
✔ outer receipt whitespace is ignored but inner bytes remain literal (46.805125ms)
▶ every gate condition fails closed when deliberately broken
  ✔ artifact missing (11.749125ms)
  ✔ artifact empty (12.855ms)
  ✔ review missing (11.039834ms)
  ✔ verdict line missing (9.273417ms)
  ✔ verdict unknown (6.476541ms)
  ✔ receipt missing from last line (7.166292ms)
  ✔ generated review metadata missing (4.784083ms)
  ✔ review metadata names a different phase (9.131625ms)
  ✔ artifact changed after review (13.93675ms)
  ✔ final receipt differs from generated receipt (8.005791ms)
  ✔ receipt reused by another review (12.144625ms)
  ✔ approval ledger missing (7.153166ms)
  ✔ exact receipt absent from ledger (9.746042ms)
  ✔ approver missing (14.168959ms)
  ✔ APPROVE WITH COMMENTS has no ledger comments (12.989834ms)
  ✔ REVISE blocks even with receipt proof (7.139ms)
  ✔ REJECT blocks even with receipt proof (7.999084ms)
  ✔ DISCUSS blocks without an owner ruling (7.389375ms)
  ✔ DISCUSS still blocks after the ruling until a fresh review (7.937ms)
✔ every gate condition fails closed when deliberately broken (183.622ms)
✔ the approval and advancement recovery commands run exactly as printed (587.465583ms)
✔ the missing-review recovery command runs exactly as printed (481.989292ms)
✔ a phase entry remains valid only while every prior gate proof still exists on disk (44.0585ms)
✔ the repository carries the complete GPLv3-only license and Kristian's sole copyright (23.569792ms)
✔ PACKAGED NPX SUITE: a real tarball installs and runs the plain-JavaScript koda binary (2481.961ms)
✔ RECEIPT ADVERSARIAL SUITE: an earlier review's receipt cannot approve a fresh review (28.437209ms)
✔ RECEIPT ADVERSARIAL SUITE: phase N receipt cannot approve phase N+1 (11.03725ms)
✔ RECEIPT ADVERSARIAL SUITE: outer whitespace is accepted and any inner word change refuses (21.397916ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REVISE (19.894833ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REJECT (23.538583ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override DISCUSS (19.735416ms)
✔ FULL RELAY RUNNER: preparation creates a clean pushed project with local skills (574.764667ms)
✔ FULL RELAY RUNNER: execution preserves two contexts and never automates owner receipt proof (1.540708ms)
✔ REVIEW BINDING SUITE: changing review findings after owner acknowledgement refuses (29.119542ms)
✔ REVIEW BINDING SUITE: an untouched generated template cannot become an approved review (12.806042ms)
✔ a current review cannot be replaced before its receipt is recorded (21.590458ms)
✔ a revised artifact receives a fresh review, fresh receipt, and archived prior review (13.414959ms)
✔ DISCUSS requires the owner's ruling before a fresh definitive review (20.473416ms)
✔ REVIEWER FIXTURES: five sealed fixtures ship as blind Koda projects (30.389875ms)
✔ REVIEWER FIXTURES: the planted hard number is unsupported and the control has no plant (2.584541ms)
✔ REVIEWER FIXTURES: inference-chain plant requires a deduction across three source files (0.638208ms)
✔ REVIEWER FIXTURES: tempting honest control is imperfect in style but its claims execute (87.073041ms)
✔ REVIEWER FIXTURES: evidence-absence trap has working code but its claimed run record is missing (87.897333ms)
✔ REVIEWER FIXTURES: new scoring contracts still match their pre-run Git seal (65.360709ms)
✔ REVIEWER FIXTURES: Ghostty runs pin model and effort and preserve ephemeral Codex events (0.902125ms)
✔ REVIEWER FIXTURES: the medium model matrix is backed by six graded run folders (1.894166ms)
✔ session creation requires a prompt and numbers dated folders (24.26175ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-UPwgKe/remote.git
 * [new branch]      main -> main
✔ a completed session is closed only after its state is committed and pushed (1019.006458ms)
✔ every Koda-C skill has valid relay sections and four-line Codex metadata (24.183583ms)
✔ skill index metadata stays concise, front-loaded, and trigger-specific (7.738042ms)
✔ producer phase skills hand only to the one shared reviewer (5.414291ms)
✔ the shared reviewer keeps all phase criteria in one place (2.007334ms)
✔ in-phase consultation is disk-backed and cannot impersonate formal review (5.775833ms)
✔ session open and close remain ceremonies outside producer phase routing (0.719875ms)
✔ STALE-REVIEW BINDING: editing the artifact after review refuses with a named re-review reason (26.4115ms)
✔ STALE-REVIEW BINDING: reviewing after an edit binds the new artifact and opens (17.366208ms)
✔ STATUS TRUTH SUITE: deleting a review is reflected immediately (251.698542ms)
✔ STATUS TRUTH SUITE: blanking an artifact is reflected immediately (229.744042ms)
✔ STATUS TRUTH SUITE: corrupt ledger metadata refuses with a named corruption reason (116.571416ms)
✔ STATUS TRUTH SUITE: editing an acknowledged review is reflected immediately (120.068667ms)
✔ STATUS TRUTH SUITE: invalid state JSON refuses instead of guessing (113.237083ms)
ℹ tests 77
ℹ suites 0
ℹ pass 77
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 2636.282458
```
