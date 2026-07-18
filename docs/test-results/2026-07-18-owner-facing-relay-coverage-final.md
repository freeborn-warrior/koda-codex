# Per-test result — 2026-07-18-owner-facing-relay-coverage-final

- Result: **PASS**
- Recorded at: 2026-07-18T14:33:36.588Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `971b546`
- Command: `/opt/homebrew/Cellar/node/26.0.0/bin/node --experimental-test-coverage --test --test-reporter=spec tests/config.test.ts tests/dogfood.test.ts tests/gate.test.ts tests/hints.test.ts tests/history.test.ts tests/package.test.ts tests/receipt-adversarial.test.ts tests/review-binding.test.ts tests/review.test.ts tests/reviewer-fixtures.test.ts tests/session.test.ts tests/skill.test.ts tests/stale-review.test.ts tests/status-truth.test.ts`

Every discovered test and subtest is named below. No result is aggregated away.

```text
✔ the default phase chain is configurable data in the required order (1.448125ms)
✔ config validation rejects unsafe session paths and drifting phase names (0.284958ms)
✔ the committed dogfood snapshot contains a complete, internally bound close (23.652334ms)
✔ a complete artifact, review, allowed verdict, unique receipt, and ledger proof open the gate (27.616708ms)
▶ GATE MUTATION SUITE: each core condition refuses and names itself
  ✔ artifact exists (13.114417ms)
  ✔ artifact is non-empty (12.972ms)
  ✔ review exists (8.2335ms)
  ✔ verdict REVISE is blocking (9.70175ms)
  ✔ verdict REJECT is blocking (13.148333ms)
  ✔ verdict DISCUSS is blocking (8.73725ms)
  ✔ current receipt is quoted verbatim in the ledger (9.594917ms)
✔ GATE MUTATION SUITE: each core condition refuses and names itself (76.79375ms)
✔ outer receipt whitespace is ignored but inner bytes remain literal (16.039125ms)
▶ every gate condition fails closed when deliberately broken
  ✔ artifact missing (9.829417ms)
  ✔ artifact empty (10.844541ms)
  ✔ review missing (12.507625ms)
  ✔ verdict line missing (14.4715ms)
  ✔ verdict unknown (46.8165ms)
  ✔ receipt missing from last line (12.713334ms)
  ✔ generated review metadata missing (8.972167ms)
  ✔ review metadata names a different phase (7.246375ms)
  ✔ artifact changed after review (10.293666ms)
  ✔ final receipt differs from generated receipt (7.749ms)
  ✔ receipt reused by another review (10.130208ms)
  ✔ approval ledger missing (8.091583ms)
  ✔ exact receipt absent from ledger (7.177333ms)
  ✔ approver missing (7.737208ms)
  ✔ APPROVE WITH COMMENTS has no ledger comments (6.628ms)
  ✔ REVISE blocks even with receipt proof (8.473583ms)
  ✔ REJECT blocks even with receipt proof (6.493625ms)
  ✔ DISCUSS blocks without an owner ruling (8.470625ms)
  ✔ DISCUSS still blocks after the ruling until a fresh review (8.518917ms)
✔ every gate condition fails closed when deliberately broken (215.720417ms)
✔ the approval and advancement recovery commands run exactly as printed (569.407416ms)
✔ the missing-review recovery command runs exactly as printed (487.073375ms)
✔ a phase entry remains valid only while every prior gate proof still exists on disk (62.108666ms)
✔ PACKAGED NPX SUITE: a real tarball installs and runs the plain-JavaScript koda binary (2126.495292ms)
✔ RECEIPT ADVERSARIAL SUITE: an earlier review's receipt cannot approve a fresh review (31.24575ms)
✔ RECEIPT ADVERSARIAL SUITE: phase N receipt cannot approve phase N+1 (16.269041ms)
✔ RECEIPT ADVERSARIAL SUITE: outer whitespace is accepted and any inner word change refuses (19.357792ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REVISE (9.784208ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REJECT (13.12475ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override DISCUSS (15.489834ms)
✔ REVIEW BINDING SUITE: changing review findings after owner acknowledgement refuses (33.786125ms)
✔ REVIEW BINDING SUITE: an untouched generated template cannot become an approved review (15.414458ms)
✔ a current review cannot be replaced before its receipt is recorded (26.092042ms)
✔ a revised artifact receives a fresh review, fresh receipt, and archived prior review (15.563125ms)
✔ DISCUSS requires the owner's ruling before a fresh definitive review (22.006666ms)
✔ REVIEWER FIXTURES: one planted defect and one honest control ship as blind Koda projects (32.329375ms)
✔ REVIEWER FIXTURES: the planted hard number is unsupported and the control has no plant (1.593041ms)
✔ REVIEWER FIXTURES: Ghostty runs pin model and effort and preserve ephemeral Codex events (2.701ms)
✔ session creation requires a prompt and numbers dated folders (38.991417ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-bUEHPt/remote.git
 * [new branch]      main -> main
✔ a completed session is closed only after its state is committed and pushed (946.602542ms)
✔ every Koda-C skill has valid relay sections and four-line Codex metadata (21.160167ms)
✔ skill index metadata stays concise, front-loaded, and trigger-specific (9.10775ms)
✔ producer phase skills hand only to the one shared reviewer (2.522583ms)
✔ the shared reviewer keeps all phase criteria in one place (3.285ms)
✔ in-phase consultation is disk-backed and cannot impersonate formal review (2.72ms)
✔ session open and close remain ceremonies outside producer phase routing (0.701125ms)
✔ STALE-REVIEW BINDING: editing the artifact after review refuses with a named re-review reason (30.868416ms)
✔ STALE-REVIEW BINDING: reviewing after an edit binds the new artifact and opens (13.088292ms)
✔ STATUS TRUTH SUITE: deleting a review is reflected immediately (250.000917ms)
✔ STATUS TRUTH SUITE: blanking an artifact is reflected immediately (239.244916ms)
✔ STATUS TRUTH SUITE: corrupt ledger metadata refuses with a named corruption reason (121.152083ms)
✔ STATUS TRUTH SUITE: editing an acknowledged review is reflected immediately (126.455708ms)
✔ STATUS TRUTH SUITE: invalid state JSON refuses instead of guessing (129.472ms)
ℹ tests 66
ℹ suites 0
ℹ pass 66
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 2294.826125
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
ℹ all files    |  87.98 |    71.77 |   91.75 | 
ℹ -------------------------------------------------------------------------------------------------------------------------------------------------------------------------
ℹ end of coverage report
```
