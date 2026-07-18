# Per-test result — 2026-07-18-expanded-core-coverage

- Result: **PASS**
- Recorded at: 2026-07-18T13:51:57.209Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `971b546`
- Command: `/opt/homebrew/Cellar/node/26.0.0/bin/node --experimental-test-coverage --test --test-reporter=spec tests/config.test.ts tests/dogfood.test.ts tests/gate.test.ts tests/hints.test.ts tests/history.test.ts tests/receipt-adversarial.test.ts tests/review.test.ts tests/reviewer-fixtures.test.ts tests/session.test.ts tests/skill.test.ts tests/stale-review.test.ts tests/status-truth.test.ts`

Every discovered test and subtest is named below. No result is aggregated away.

```text
✔ the default phase chain is configurable data in the required order (4.06575ms)
✔ config validation rejects unsafe session paths and drifting phase names (0.273708ms)
✔ the committed dogfood snapshot contains a complete, internally bound close (14.669708ms)
✔ a complete artifact, review, allowed verdict, unique receipt, and ledger proof open the gate (37.497125ms)
▶ GATE MUTATION SUITE: each core condition refuses and names itself
  ✔ artifact exists (14.570333ms)
  ✔ artifact is non-empty (9.683208ms)
  ✔ review exists (8.16525ms)
  ✔ verdict REVISE is blocking (7.013084ms)
  ✔ verdict REJECT is blocking (8.325333ms)
  ✔ verdict DISCUSS is blocking (7.991458ms)
  ✔ current receipt is quoted verbatim in the ledger (8.808042ms)
✔ GATE MUTATION SUITE: each core condition refuses and names itself (66.559959ms)
✔ outer receipt whitespace is ignored but inner bytes remain literal (20.165958ms)
▶ every gate condition fails closed when deliberately broken
  ✔ artifact missing (7.179792ms)
  ✔ artifact empty (16.989042ms)
  ✔ review missing (11.758959ms)
  ✔ verdict line missing (8.924209ms)
  ✔ verdict unknown (7.868167ms)
  ✔ receipt missing from last line (6.643041ms)
  ✔ generated review metadata missing (5.936458ms)
  ✔ artifact changed after review (5.754833ms)
  ✔ final receipt differs from generated receipt (5.437583ms)
  ✔ receipt reused by another review (4.996958ms)
  ✔ approval ledger missing (5.124958ms)
  ✔ exact receipt absent from ledger (5.538375ms)
  ✔ approver missing (3.89ms)
  ✔ APPROVE WITH COMMENTS has no ledger comments (4.118833ms)
  ✔ REVISE blocks even with receipt proof (4.554291ms)
  ✔ REJECT blocks even with receipt proof (5.131333ms)
  ✔ DISCUSS blocks without an owner ruling (6.0895ms)
  ✔ DISCUSS still blocks after the ruling until a fresh review (11.954167ms)
✔ every gate condition fails closed when deliberately broken (129.596667ms)
✔ the approval and advancement recovery commands run exactly as printed (476.122458ms)
✔ the missing-review recovery command runs exactly as printed (408.257125ms)
✔ a phase entry remains valid only while every prior gate proof still exists on disk (59.688291ms)
✔ RECEIPT ADVERSARIAL SUITE: an earlier review's receipt cannot approve a fresh review (34.976375ms)
✔ RECEIPT ADVERSARIAL SUITE: phase N receipt cannot approve phase N+1 (10.053042ms)
✔ RECEIPT ADVERSARIAL SUITE: outer whitespace is accepted and any inner word change refuses (14.656292ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REVISE (7.262459ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REJECT (7.049875ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override DISCUSS (8.000792ms)
✔ a current review cannot be replaced before its receipt is recorded (24.388ms)
✔ a revised artifact receives a fresh review, fresh receipt, and archived prior review (11.879ms)
✔ DISCUSS requires the owner's ruling before a fresh definitive review (12.626041ms)
✔ REVIEWER FIXTURES: one planted defect and one honest control ship as blind Koda projects (24.957875ms)
✔ REVIEWER FIXTURES: the planted hard number is unsupported and the control has no plant (4.177791ms)
✔ session creation requires a prompt and numbers dated folders (29.442792ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-glQ5XE/remote.git
 * [new branch]      main -> main
✔ a completed session is closed only after its state is committed and pushed (838.284625ms)
✔ every Koda-C skill has valid relay sections and four-line Codex metadata (14.938042ms)
✔ producer phase skills hand only to the one shared reviewer (2.292417ms)
✔ the shared reviewer keeps all phase criteria in one place (2.110541ms)
✔ session open and close remain ceremonies outside producer phase routing (1.5405ms)
✔ STALE-REVIEW BINDING: editing the artifact after review refuses with a named re-review reason (20.063375ms)
✔ STALE-REVIEW BINDING: reviewing after an edit binds the new artifact and opens (10.676541ms)
✔ STATUS TRUTH SUITE: deleting a review is reflected immediately (223.989958ms)
✔ STATUS TRUTH SUITE: blanking an artifact is reflected immediately (210.8655ms)
✔ STATUS TRUTH SUITE: corrupt ledger metadata refuses with a named corruption reason (103.360791ms)
✔ STATUS TRUTH SUITE: invalid state JSON refuses instead of guessing (103.567916ms)
ℹ tests 58
ℹ suites 0
ℹ pass 58
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 1067.477875
ℹ start of coverage report
ℹ -----------------------------------------------------------------------------------------------------------------------------------------------------------------
ℹ file         | line % | branch % | funcs % | uncovered lines
ℹ -----------------------------------------------------------------------------------------------------------------------------------------------------------------
ℹ src          |        |          |         | 
ℹ  cli.ts      | 100.00 |   100.00 |  100.00 | 
ℹ  close.ts    |  93.10 |    74.19 |   80.00 | 62-64 69-70 73-74 77-78 128
ℹ  commands.ts |  80.04 |    39.44 |   87.50 | 220-223 225-229 262-263 281-282 285-286 288-289 291-292 297-299 301-303 323-325 361-363 366-406 408-419 425-428 436
ℹ  config.ts   |  79.59 |    75.00 |  100.00 | 39-45 50-51 55-56 66-67 78-79 92-96
ℹ  gate.ts     | 100.00 |   100.00 |  100.00 | 
ℹ  git.ts      |  73.02 |    50.00 |   66.67 | 11-20 34-36 40-41 45-46
ℹ  history.ts  |  81.08 |    66.67 |   66.67 | 23-24 32-36
ℹ  project.ts  |  86.41 |    68.89 |   96.43 | 12-17 90-91 130-131 134-135 137-138 140-141 143-144 146-147 157-158 186-187 203-206
ℹ  receipt.ts  |  94.74 |    84.51 |  100.00 | 59-60 79-80 83-84 185-187 202-203 230-231
ℹ  types.ts    | 100.00 |   100.00 |  100.00 | 
ℹ tests        |        |          |         | 
ℹ  helpers.ts  | 100.00 |   100.00 |  100.00 | 
ℹ -----------------------------------------------------------------------------------------------------------------------------------------------------------------
ℹ all files    |  87.90 |    71.88 |   91.58 | 
ℹ -----------------------------------------------------------------------------------------------------------------------------------------------------------------
ℹ end of coverage report
```
