# Per-test result — 2026-07-18-full-native-lifecycle-coverage

- Result: **PASS**
- Recorded at: 2026-07-18T14:59:56.594Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `711d6a9`
- Command: `/opt/homebrew/Cellar/node/26.0.0/bin/node --experimental-test-coverage --test --test-reporter=spec tests/config.test.ts tests/dogfood.test.ts tests/full-lifecycle.test.ts tests/gate.test.ts tests/hints.test.ts tests/history.test.ts tests/package.test.ts tests/receipt-adversarial.test.ts tests/review-binding.test.ts tests/review.test.ts tests/reviewer-fixtures.test.ts tests/session.test.ts tests/skill.test.ts tests/stale-review.test.ts tests/status-truth.test.ts`

Every discovered test and subtest is named below. No result is aggregated away.

```text
✔ the default phase chain is configurable data in the required order (2.257292ms)
✔ config validation rejects unsafe session paths and drifting phase names (0.236125ms)
✔ the committed dogfood snapshot contains the full native chain and an internally bound close (47.115542ms)
✔ FULL LIFECYCLE SCENARIO: clean approvals traverse all six phases and pushed close (459.360209ms)
✔ FULL LIFECYCLE SCENARIO: a REVISE loop recovers in plan before completing and closing (317.713958ms)
✔ FULL LIFECYCLE SCENARIO: DISCUSS records an owner ruling and requires a fresh live review (344.242042ms)
✔ a complete artifact, review, allowed verdict, unique receipt, and ledger proof open the gate (24.60725ms)
▶ GATE MUTATION SUITE: each core condition refuses and names itself
  ✔ artifact exists (10.64725ms)
  ✔ artifact is non-empty (13.897209ms)
  ✔ review exists (9.296416ms)
  ✔ verdict REVISE is blocking (11.361542ms)
  ✔ verdict REJECT is blocking (12.26275ms)
  ✔ verdict DISCUSS is blocking (24.295334ms)
  ✔ current receipt is quoted verbatim in the ledger (24.404416ms)
✔ GATE MUTATION SUITE: each core condition refuses and names itself (107.342833ms)
✔ outer receipt whitespace is ignored but inner bytes remain literal (42.115791ms)
▶ every gate condition fails closed when deliberately broken
  ✔ artifact missing (26.189875ms)
  ✔ artifact empty (15.753708ms)
  ✔ review missing (8.225ms)
  ✔ verdict line missing (10.906333ms)
  ✔ verdict unknown (11.400291ms)
  ✔ receipt missing from last line (11.75725ms)
  ✔ generated review metadata missing (11.115458ms)
  ✔ review metadata names a different phase (8.581792ms)
  ✔ artifact changed after review (7.600084ms)
  ✔ final receipt differs from generated receipt (8.74725ms)
  ✔ receipt reused by another review (8.579916ms)
  ✔ approval ledger missing (15.655ms)
  ✔ exact receipt absent from ledger (8.752792ms)
  ✔ approver missing (7.193833ms)
  ✔ APPROVE WITH COMMENTS has no ledger comments (7.716042ms)
  ✔ REVISE blocks even with receipt proof (6.749375ms)
  ✔ REJECT blocks even with receipt proof (5.92325ms)
  ✔ DISCUSS blocks without an owner ruling (7.08375ms)
  ✔ DISCUSS still blocks after the ruling until a fresh review (7.833125ms)
✔ every gate condition fails closed when deliberately broken (198.43275ms)
✔ the approval and advancement recovery commands run exactly as printed (600.324541ms)
✔ the missing-review recovery command runs exactly as printed (482.671292ms)
✔ a phase entry remains valid only while every prior gate proof still exists on disk (27.538042ms)
✔ PACKAGED NPX SUITE: a real tarball installs and runs the plain-JavaScript koda binary (2376.894708ms)
✔ RECEIPT ADVERSARIAL SUITE: an earlier review's receipt cannot approve a fresh review (38.018542ms)
✔ RECEIPT ADVERSARIAL SUITE: phase N receipt cannot approve phase N+1 (14.0385ms)
✔ RECEIPT ADVERSARIAL SUITE: outer whitespace is accepted and any inner word change refuses (21.195417ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REVISE (13.370625ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REJECT (12.810042ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override DISCUSS (21.73525ms)
✔ REVIEW BINDING SUITE: changing review findings after owner acknowledgement refuses (24.380709ms)
✔ REVIEW BINDING SUITE: an untouched generated template cannot become an approved review (11.83375ms)
✔ a current review cannot be replaced before its receipt is recorded (33.664291ms)
✔ a revised artifact receives a fresh review, fresh receipt, and archived prior review (21.267417ms)
✔ DISCUSS requires the owner's ruling before a fresh definitive review (22.432709ms)
✔ REVIEWER FIXTURES: one planted defect and one honest control ship as blind Koda projects (18.980375ms)
✔ REVIEWER FIXTURES: the planted hard number is unsupported and the control has no plant (2.008333ms)
✔ REVIEWER FIXTURES: Ghostty runs pin model and effort and preserve ephemeral Codex events (0.995417ms)
✔ session creation requires a prompt and numbers dated folders (17.936208ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-YCiuqD/remote.git
 * [new branch]      main -> main
✔ a completed session is closed only after its state is committed and pushed (1014.686334ms)
✔ every Koda-C skill has valid relay sections and four-line Codex metadata (10.11275ms)
✔ skill index metadata stays concise, front-loaded, and trigger-specific (3.249459ms)
✔ producer phase skills hand only to the one shared reviewer (2.102042ms)
✔ the shared reviewer keeps all phase criteria in one place (1.615125ms)
✔ in-phase consultation is disk-backed and cannot impersonate formal review (3.235917ms)
✔ session open and close remain ceremonies outside producer phase routing (0.775209ms)
✔ STALE-REVIEW BINDING: editing the artifact after review refuses with a named re-review reason (23.5255ms)
✔ STALE-REVIEW BINDING: reviewing after an edit binds the new artifact and opens (21.497584ms)
✔ STATUS TRUTH SUITE: deleting a review is reflected immediately (270.1795ms)
✔ STATUS TRUTH SUITE: blanking an artifact is reflected immediately (243.993417ms)
✔ STATUS TRUTH SUITE: corrupt ledger metadata refuses with a named corruption reason (123.548916ms)
✔ STATUS TRUTH SUITE: editing an acknowledged review is reflected immediately (128.311084ms)
✔ STATUS TRUTH SUITE: invalid state JSON refuses instead of guessing (117.104292ms)
ℹ tests 69
ℹ suites 0
ℹ pass 69
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 2581.438542
ℹ start of coverage report
ℹ -------------------------------------------------------------------------------------------------------------------------------------------------------------------------
ℹ file         | line % | branch % | funcs % | uncovered lines
ℹ -------------------------------------------------------------------------------------------------------------------------------------------------------------------------
ℹ scripts      |        |          |         |
ℹ  build.ts    |  92.59 |    75.00 |  100.00 | 10-11
ℹ src          |        |          |         |
ℹ  cli.ts      | 100.00 |   100.00 |  100.00 |
ℹ  close.ts    |  93.10 |    74.19 |   80.00 | 62-64 69-70 73-74 77-78 128
ℹ  commands.ts |  80.04 |    38.89 |   87.50 | 222-225 227-231 264-265 284-285 288-289 291-292 294-295 300-301 306-308 310-312 333-335 371-373 376-416 418-429 435-438 446
ℹ  config.ts   |  79.59 |    75.00 |  100.00 | 39-45 50-51 55-56 66-67 78-79 92-96
ℹ  gate.ts     | 100.00 |   100.00 |  100.00 |
ℹ  git.ts      |  73.02 |    50.00 |   66.67 | 11-20 34-36 40-41 45-46
ℹ  history.ts  |  86.49 |    83.33 |   66.67 | 32-36
ℹ  project.ts  |  87.38 |    71.11 |   96.43 | 12-17 90-91 130-131 134-135 137-138 140-141 143-144 146-147 186-187 203-206
ℹ  receipt.ts  |  94.16 |    82.67 |  100.00 | 59-60 79-80 83-84 189-191 207-208 236-237 239-240
ℹ  types.ts    | 100.00 |   100.00 |  100.00 |
ℹ tests        |        |          |         |
ℹ  helpers.ts  | 100.00 |   100.00 |  100.00 |
ℹ -------------------------------------------------------------------------------------------------------------------------------------------------------------------------
ℹ all files    |  88.24 |    72.46 |   91.75 |
ℹ -------------------------------------------------------------------------------------------------------------------------------------------------------------------------
ℹ end of coverage report
```
