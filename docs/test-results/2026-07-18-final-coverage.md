# Per-test result — 2026-07-18-final-coverage

- Result: **PASS**
- Recorded at: 2026-07-18T14:09:30.635Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `971b546`
- Command: `/opt/homebrew/Cellar/node/26.0.0/bin/node --experimental-test-coverage --test --test-reporter=spec tests/config.test.ts tests/dogfood.test.ts tests/gate.test.ts tests/hints.test.ts tests/history.test.ts tests/package.test.ts tests/receipt-adversarial.test.ts tests/review-binding.test.ts tests/review.test.ts tests/reviewer-fixtures.test.ts tests/session.test.ts tests/skill.test.ts tests/stale-review.test.ts tests/status-truth.test.ts`

Every discovered test and subtest is named below. No result is aggregated away.

```text
✔ the default phase chain is configurable data in the required order (2.711416ms)
✔ config validation rejects unsafe session paths and drifting phase names (0.530667ms)
✔ the committed dogfood snapshot contains a complete, internally bound close (29.598417ms)
✔ a complete artifact, review, allowed verdict, unique receipt, and ledger proof open the gate (38.187083ms)
▶ GATE MUTATION SUITE: each core condition refuses and names itself
  ✔ artifact exists (23.255458ms)
  ✔ artifact is non-empty (14.932667ms)
  ✔ review exists (10.588375ms)
  ✔ verdict REVISE is blocking (13.525792ms)
  ✔ verdict REJECT is blocking (11.426583ms)
  ✔ verdict DISCUSS is blocking (17.199042ms)
  ✔ current receipt is quoted verbatim in the ledger (21.084542ms)
✔ GATE MUTATION SUITE: each core condition refuses and names itself (113.567625ms)
✔ outer receipt whitespace is ignored but inner bytes remain literal (25.153542ms)
▶ every gate condition fails closed when deliberately broken
  ✔ artifact missing (11.440583ms)
  ✔ artifact empty (21.399458ms)
  ✔ review missing (12.283083ms)
  ✔ verdict line missing (20.775084ms)
  ✔ verdict unknown (16.481ms)
  ✔ receipt missing from last line (7.999791ms)
  ✔ generated review metadata missing (6.988334ms)
  ✔ artifact changed after review (9.618291ms)
  ✔ final receipt differs from generated receipt (6.9795ms)
  ✔ receipt reused by another review (10.307125ms)
  ✔ approval ledger missing (6.854125ms)
  ✔ exact receipt absent from ledger (10.20875ms)
  ✔ approver missing (7.26675ms)
  ✔ APPROVE WITH COMMENTS has no ledger comments (10.293ms)
  ✔ REVISE blocks even with receipt proof (6.583459ms)
  ✔ REJECT blocks even with receipt proof (8.259459ms)
  ✔ DISCUSS blocks without an owner ruling (7.399125ms)
  ✔ DISCUSS still blocks after the ruling until a fresh review (7.11325ms)
✔ every gate condition fails closed when deliberately broken (190.827042ms)
✔ the approval and advancement recovery commands run exactly as printed (565.854417ms)
✔ the missing-review recovery command runs exactly as printed (482.228083ms)
✔ a phase entry remains valid only while every prior gate proof still exists on disk (29.532125ms)
✔ PACKAGED NPX SUITE: a real tarball installs and runs the plain-JavaScript koda binary (2153.242542ms)
✔ RECEIPT ADVERSARIAL SUITE: an earlier review's receipt cannot approve a fresh review (33.802166ms)
✔ RECEIPT ADVERSARIAL SUITE: phase N receipt cannot approve phase N+1 (11.797458ms)
✔ RECEIPT ADVERSARIAL SUITE: outer whitespace is accepted and any inner word change refuses (18.537667ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REVISE (12.499125ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REJECT (11.747292ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override DISCUSS (21.752792ms)
✔ REVIEW BINDING SUITE: changing review findings after owner acknowledgement refuses (29.653625ms)
✔ REVIEW BINDING SUITE: an untouched generated template cannot become an approved review (12.165125ms)
✔ a current review cannot be replaced before its receipt is recorded (21.782833ms)
✔ a revised artifact receives a fresh review, fresh receipt, and archived prior review (8.723959ms)
✔ DISCUSS requires the owner's ruling before a fresh definitive review (26.36525ms)
✔ REVIEWER FIXTURES: one planted defect and one honest control ship as blind Koda projects (18.743875ms)
✔ REVIEWER FIXTURES: the planted hard number is unsupported and the control has no plant (6.926292ms)
✔ session creation requires a prompt and numbers dated folders (20.474333ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-g55nsq/remote.git
 * [new branch]      main -> main
✔ a completed session is closed only after its state is committed and pushed (982.366041ms)
✔ every Koda-C skill has valid relay sections and four-line Codex metadata (11.656916ms)
✔ skill index metadata stays concise, front-loaded, and trigger-specific (5.347375ms)
✔ producer phase skills hand only to the one shared reviewer (2.0505ms)
✔ the shared reviewer keeps all phase criteria in one place (1.9295ms)
✔ session open and close remain ceremonies outside producer phase routing (0.778ms)
✔ STALE-REVIEW BINDING: editing the artifact after review refuses with a named re-review reason (29.463917ms)
✔ STALE-REVIEW BINDING: reviewing after an edit binds the new artifact and opens (19.707083ms)
✔ STATUS TRUTH SUITE: deleting a review is reflected immediately (251.726625ms)
✔ STATUS TRUTH SUITE: blanking an artifact is reflected immediately (249.510167ms)
✔ STATUS TRUTH SUITE: corrupt ledger metadata refuses with a named corruption reason (128.212291ms)
✔ STATUS TRUTH SUITE: editing an acknowledged review is reflected immediately (125.498375ms)
✔ STATUS TRUTH SUITE: invalid state JSON refuses instead of guessing (121.267583ms)
ℹ tests 63
ℹ suites 0
ℹ pass 63
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 2316.167292
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
ℹ  history.ts  |  81.08 |    66.67 |   66.67 | 23-24 32-36
ℹ  project.ts  |  86.41 |    68.89 |   96.43 | 12-17 90-91 130-131 134-135 137-138 140-141 143-144 146-147 157-158 186-187 203-206
ℹ  receipt.ts  |  94.16 |    82.67 |  100.00 | 59-60 79-80 83-84 189-191 207-208 236-237 239-240
ℹ  types.ts    | 100.00 |   100.00 |  100.00 | 
ℹ tests        |        |          |         | 
ℹ  helpers.ts  | 100.00 |   100.00 |  100.00 | 
ℹ -------------------------------------------------------------------------------------------------------------------------------------------------------------------------
ℹ all files    |  87.98 |    71.69 |   91.75 | 
ℹ -------------------------------------------------------------------------------------------------------------------------------------------------------------------------
ℹ end of coverage report
```
