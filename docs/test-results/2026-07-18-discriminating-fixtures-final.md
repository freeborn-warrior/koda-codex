# Per-test result — 2026-07-18-discriminating-fixtures-final

- Result: **PASS**
- Recorded at: 2026-07-18T15:32:41.285Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `062ecb5`
- Command: `/opt/homebrew/Cellar/node/26.0.0/bin/node --test --test-reporter=spec tests/config.test.ts tests/dogfood.test.ts tests/full-lifecycle.test.ts tests/gate.test.ts tests/hints.test.ts tests/history.test.ts tests/license.test.ts tests/package.test.ts tests/receipt-adversarial.test.ts tests/review-binding.test.ts tests/review.test.ts tests/reviewer-fixtures.test.ts tests/session.test.ts tests/skill.test.ts tests/stale-review.test.ts tests/status-truth.test.ts`

Every discovered test and subtest is named below. No result is aggregated away.

```text
✔ the default phase chain is configurable data in the required order (1.158833ms)
✔ config validation rejects unsafe session paths and drifting phase names (0.184542ms)
✔ the committed dogfood snapshot contains the full native chain and an internally bound close (27.000917ms)
✔ FULL LIFECYCLE SCENARIO: clean approvals traverse all six phases and pushed close (483.846542ms)
✔ FULL LIFECYCLE SCENARIO: a REVISE loop recovers in plan before completing and closing (342.340417ms)
✔ FULL LIFECYCLE SCENARIO: DISCUSS records an owner ruling and requires a fresh live review (335.317625ms)
✔ a complete artifact, review, allowed verdict, unique receipt, and ledger proof open the gate (27.311208ms)
▶ GATE MUTATION SUITE: each core condition refuses and names itself
  ✔ artifact exists (17.962042ms)
  ✔ artifact is non-empty (12.08675ms)
  ✔ review exists (11.082584ms)
  ✔ verdict REVISE is blocking (13.398166ms)
  ✔ verdict REJECT is blocking (23.22ms)
  ✔ verdict DISCUSS is blocking (15.829958ms)
  ✔ current receipt is quoted verbatim in the ledger (17.409ms)
✔ GATE MUTATION SUITE: each core condition refuses and names itself (112.068ms)
✔ outer receipt whitespace is ignored but inner bytes remain literal (17.776ms)
▶ every gate condition fails closed when deliberately broken
  ✔ artifact missing (12.251959ms)
  ✔ artifact empty (6.461583ms)
  ✔ review missing (7.158667ms)
  ✔ verdict line missing (5.644417ms)
  ✔ verdict unknown (5.882584ms)
  ✔ receipt missing from last line (6.352916ms)
  ✔ generated review metadata missing (7.766334ms)
  ✔ review metadata names a different phase (21.792542ms)
  ✔ artifact changed after review (18.107083ms)
  ✔ final receipt differs from generated receipt (19.27925ms)
  ✔ receipt reused by another review (17.686917ms)
  ✔ approval ledger missing (12.635792ms)
  ✔ exact receipt absent from ledger (9.313ms)
  ✔ approver missing (12.889417ms)
  ✔ APPROVE WITH COMMENTS has no ledger comments (19.681333ms)
  ✔ REVISE blocks even with receipt proof (11.35125ms)
  ✔ REJECT blocks even with receipt proof (18.904666ms)
  ✔ DISCUSS blocks without an owner ruling (10.933958ms)
  ✔ DISCUSS still blocks after the ruling until a fresh review (11.989084ms)
✔ every gate condition fails closed when deliberately broken (238.722417ms)
✔ the approval and advancement recovery commands run exactly as printed (570.264375ms)
✔ the missing-review recovery command runs exactly as printed (459.528917ms)
✔ a phase entry remains valid only while every prior gate proof still exists on disk (40.129458ms)
✔ the repository carries the complete GPLv3-only license and Kristian's sole copyright (14.131ms)
✔ PACKAGED NPX SUITE: a real tarball installs and runs the plain-JavaScript koda binary (2484.992042ms)
✔ RECEIPT ADVERSARIAL SUITE: an earlier review's receipt cannot approve a fresh review (31.103583ms)
✔ RECEIPT ADVERSARIAL SUITE: phase N receipt cannot approve phase N+1 (14.77825ms)
✔ RECEIPT ADVERSARIAL SUITE: outer whitespace is accepted and any inner word change refuses (23.040416ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REVISE (22.951167ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REJECT (14.330791ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override DISCUSS (17.579375ms)
✔ REVIEW BINDING SUITE: changing review findings after owner acknowledgement refuses (41.268834ms)
✔ REVIEW BINDING SUITE: an untouched generated template cannot become an approved review (11.741917ms)
✔ a current review cannot be replaced before its receipt is recorded (17.955291ms)
✔ a revised artifact receives a fresh review, fresh receipt, and archived prior review (22.080667ms)
✔ DISCUSS requires the owner's ruling before a fresh definitive review (24.920666ms)
✔ REVIEWER FIXTURES: five sealed fixtures ship as blind Koda projects (56.984334ms)
✔ REVIEWER FIXTURES: the planted hard number is unsupported and the control has no plant (2.147833ms)
✔ REVIEWER FIXTURES: inference-chain plant requires a deduction across three source files (1.116ms)
✔ REVIEWER FIXTURES: tempting honest control is imperfect in style but its claims execute (87.645042ms)
✔ REVIEWER FIXTURES: evidence-absence trap has working code but its claimed run record is missing (82.395333ms)
✔ REVIEWER FIXTURES: Ghostty runs pin model and effort and preserve ephemeral Codex events (0.987916ms)
✔ REVIEWER FIXTURES: the medium model matrix is backed by six graded run folders (1.657166ms)
✔ session creation requires a prompt and numbers dated folders (22.751708ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-aElNYx/remote.git
 * [new branch]      main -> main
✔ a completed session is closed only after its state is committed and pushed (1023.118ms)
✔ every Koda-C skill has valid relay sections and four-line Codex metadata (12.815875ms)
✔ skill index metadata stays concise, front-loaded, and trigger-specific (8.541708ms)
✔ producer phase skills hand only to the one shared reviewer (5.021917ms)
✔ the shared reviewer keeps all phase criteria in one place (3.927875ms)
✔ in-phase consultation is disk-backed and cannot impersonate formal review (3.779084ms)
✔ session open and close remain ceremonies outside producer phase routing (1.101292ms)
✔ STALE-REVIEW BINDING: editing the artifact after review refuses with a named re-review reason (28.384375ms)
✔ STALE-REVIEW BINDING: reviewing after an edit binds the new artifact and opens (18.2975ms)
✔ STATUS TRUTH SUITE: deleting a review is reflected immediately (253.438041ms)
✔ STATUS TRUTH SUITE: blanking an artifact is reflected immediately (243.325959ms)
✔ STATUS TRUTH SUITE: corrupt ledger metadata refuses with a named corruption reason (122.638917ms)
✔ STATUS TRUTH SUITE: editing an acknowledged review is reflected immediately (113.982917ms)
✔ STATUS TRUTH SUITE: invalid state JSON refuses instead of guessing (113.563125ms)
ℹ tests 74
ℹ suites 0
ℹ pass 74
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 2655.834875
```
