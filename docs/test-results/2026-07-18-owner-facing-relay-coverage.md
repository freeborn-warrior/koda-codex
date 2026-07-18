# Per-test result — 2026-07-18-owner-facing-relay-coverage

- Result: **PASS**
- Recorded at: 2026-07-18T14:32:13.290Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `971b546`
- Command: `/opt/homebrew/Cellar/node/26.0.0/bin/node --experimental-test-coverage --test --test-reporter=spec tests/config.test.ts tests/dogfood.test.ts tests/gate.test.ts tests/hints.test.ts tests/history.test.ts tests/package.test.ts tests/receipt-adversarial.test.ts tests/review-binding.test.ts tests/review.test.ts tests/reviewer-fixtures.test.ts tests/session.test.ts tests/skill.test.ts tests/stale-review.test.ts tests/status-truth.test.ts`

Every discovered test and subtest is named below. No result is aggregated away.

```text
✔ the default phase chain is configurable data in the required order (1.848625ms)
✔ config validation rejects unsafe session paths and drifting phase names (0.231875ms)
✔ the committed dogfood snapshot contains a complete, internally bound close (16.815209ms)
✔ a complete artifact, review, allowed verdict, unique receipt, and ledger proof open the gate (41.360333ms)
▶ GATE MUTATION SUITE: each core condition refuses and names itself
  ✔ artifact exists (11.153167ms)
  ✔ artifact is non-empty (9.754167ms)
  ✔ review exists (9.727917ms)
  ✔ verdict REVISE is blocking (9.426625ms)
  ✔ verdict REJECT is blocking (27.571583ms)
  ✔ verdict DISCUSS is blocking (17.625875ms)
  ✔ current receipt is quoted verbatim in the ledger (17.111125ms)
✔ GATE MUTATION SUITE: each core condition refuses and names itself (103.617916ms)
✔ outer receipt whitespace is ignored but inner bytes remain literal (34.868625ms)
▶ every gate condition fails closed when deliberately broken
  ✔ artifact missing (27.725084ms)
  ✔ artifact empty (13.925208ms)
  ✔ review missing (12.886833ms)
  ✔ verdict line missing (8.840833ms)
  ✔ verdict unknown (19.447666ms)
  ✔ receipt missing from last line (9.573166ms)
  ✔ generated review metadata missing (7.874583ms)
  ✔ artifact changed after review (8.8055ms)
  ✔ final receipt differs from generated receipt (8.080083ms)
  ✔ receipt reused by another review (7.147417ms)
  ✔ approval ledger missing (6.900167ms)
  ✔ exact receipt absent from ledger (8.732ms)
  ✔ approver missing (7.167333ms)
  ✔ APPROVE WITH COMMENTS has no ledger comments (7.800541ms)
  ✔ REVISE blocks even with receipt proof (7.704ms)
  ✔ REJECT blocks even with receipt proof (8.706125ms)
  ✔ DISCUSS blocks without an owner ruling (9.222334ms)
  ✔ DISCUSS still blocks after the ruling until a fresh review (9.044375ms)
✔ every gate condition fails closed when deliberately broken (192.000208ms)
✔ the approval and advancement recovery commands run exactly as printed (562.076708ms)
✔ the missing-review recovery command runs exactly as printed (471.483625ms)
✔ a phase entry remains valid only while every prior gate proof still exists on disk (34.165792ms)
✔ PACKAGED NPX SUITE: a real tarball installs and runs the plain-JavaScript koda binary (2053.927958ms)
✔ RECEIPT ADVERSARIAL SUITE: an earlier review's receipt cannot approve a fresh review (32.375083ms)
✔ RECEIPT ADVERSARIAL SUITE: phase N receipt cannot approve phase N+1 (12.259541ms)
✔ RECEIPT ADVERSARIAL SUITE: outer whitespace is accepted and any inner word change refuses (21.328708ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REVISE (17.884583ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REJECT (22.770542ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override DISCUSS (16.924041ms)
✔ REVIEW BINDING SUITE: changing review findings after owner acknowledgement refuses (56.764875ms)
✔ REVIEW BINDING SUITE: an untouched generated template cannot become an approved review (13.259166ms)
✔ a current review cannot be replaced before its receipt is recorded (25.011083ms)
✔ a revised artifact receives a fresh review, fresh receipt, and archived prior review (14.101083ms)
✔ DISCUSS requires the owner's ruling before a fresh definitive review (42.813875ms)
✔ REVIEWER FIXTURES: one planted defect and one honest control ship as blind Koda projects (12.907459ms)
✔ REVIEWER FIXTURES: the planted hard number is unsupported and the control has no plant (2.125084ms)
✔ REVIEWER FIXTURES: Ghostty runs pin model and effort and preserve ephemeral Codex events (1.030209ms)
✔ session creation requires a prompt and numbers dated folders (23.995417ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-Pjoq6n/remote.git
 * [new branch]      main -> main
✔ a completed session is closed only after its state is committed and pushed (979.794541ms)
✔ every Koda-C skill has valid relay sections and four-line Codex metadata (13.3015ms)
✔ skill index metadata stays concise, front-loaded, and trigger-specific (8.715875ms)
✔ producer phase skills hand only to the one shared reviewer (2.138667ms)
✔ the shared reviewer keeps all phase criteria in one place (2.186666ms)
✔ in-phase consultation is disk-backed and cannot impersonate formal review (3.176875ms)
✔ session open and close remain ceremonies outside producer phase routing (0.868ms)
✔ STALE-REVIEW BINDING: editing the artifact after review refuses with a named re-review reason (25.482625ms)
✔ STALE-REVIEW BINDING: reviewing after an edit binds the new artifact and opens (21.954083ms)
✔ STATUS TRUTH SUITE: deleting a review is reflected immediately (260.422166ms)
✔ STATUS TRUTH SUITE: blanking an artifact is reflected immediately (245.992833ms)
✔ STATUS TRUTH SUITE: corrupt ledger metadata refuses with a named corruption reason (136.786959ms)
✔ STATUS TRUTH SUITE: editing an acknowledged review is reflected immediately (120.943291ms)
✔ STATUS TRUTH SUITE: invalid state JSON refuses instead of guessing (120.9625ms)
ℹ tests 65
ℹ suites 0
ℹ pass 65
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 2262.01225
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
ℹ  gate.ts     |  98.46 |    98.04 |  100.00 | 62-63
ℹ  git.ts      |  73.02 |    50.00 |   66.67 | 11-20 34-36 40-41 45-46
ℹ  history.ts  |  81.08 |    66.67 |   66.67 | 23-24 32-36
ℹ  project.ts  |  86.41 |    68.89 |   96.43 | 12-17 90-91 130-131 134-135 137-138 140-141 143-144 146-147 157-158 186-187 203-206
ℹ  receipt.ts  |  94.16 |    82.67 |  100.00 | 59-60 79-80 83-84 189-191 207-208 236-237 239-240
ℹ  types.ts    | 100.00 |   100.00 |  100.00 | 
ℹ tests        |        |          |         | 
ℹ  helpers.ts  | 100.00 |   100.00 |  100.00 | 
ℹ -------------------------------------------------------------------------------------------------------------------------------------------------------------------------
ℹ all files    |  87.86 |    71.47 |   91.75 | 
ℹ -------------------------------------------------------------------------------------------------------------------------------------------------------------------------
ℹ end of coverage report
```
