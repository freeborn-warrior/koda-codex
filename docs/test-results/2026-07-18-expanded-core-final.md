# Per-test result — 2026-07-18-expanded-core-final

- Result: **PASS**
- Recorded at: 2026-07-18T13:45:22.807Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `971b546`
- Command: `/opt/homebrew/Cellar/node/26.0.0/bin/node --test --test-reporter=spec tests/config.test.ts tests/dogfood.test.ts tests/gate.test.ts tests/hints.test.ts tests/history.test.ts tests/receipt-adversarial.test.ts tests/review.test.ts tests/reviewer-fixtures.test.ts tests/session.test.ts tests/skill.test.ts tests/stale-review.test.ts tests/status-truth.test.ts`

Every discovered test and subtest is named below. No result is aggregated away.

```text
✔ the default phase chain is configurable data in the required order (1.125334ms)
✔ config validation rejects unsafe session paths and drifting phase names (0.181791ms)
✔ the committed dogfood snapshot contains a complete, internally bound close (26.039667ms)
✔ a complete artifact, review, allowed verdict, unique receipt, and ledger proof open the gate (43.732792ms)
▶ GATE MUTATION SUITE: each core condition refuses and names itself
  ✔ artifact exists (11.62675ms)
  ✔ artifact is non-empty (9.936084ms)
  ✔ review exists (7.083167ms)
  ✔ verdict REVISE is blocking (7.915583ms)
  ✔ verdict REJECT is blocking (7.224541ms)
  ✔ verdict DISCUSS is blocking (8.626291ms)
  ✔ current receipt is quoted verbatim in the ledger (6.423292ms)
✔ GATE MUTATION SUITE: each core condition refuses and names itself (60.507167ms)
✔ outer receipt whitespace is ignored but inner bytes remain literal (18.689709ms)
▶ every gate condition fails closed when deliberately broken
  ✔ artifact missing (7.427291ms)
  ✔ artifact empty (9.660708ms)
  ✔ review missing (7.225041ms)
  ✔ verdict line missing (13.337917ms)
  ✔ verdict unknown (7.773792ms)
  ✔ receipt missing from last line (7.485542ms)
  ✔ generated review metadata missing (6.296834ms)
  ✔ artifact changed after review (5.279166ms)
  ✔ final receipt differs from generated receipt (5.767291ms)
  ✔ receipt reused by another review (6.658875ms)
  ✔ approval ledger missing (3.899875ms)
  ✔ exact receipt absent from ledger (4.584ms)
  ✔ approver missing (4.739375ms)
  ✔ APPROVE WITH COMMENTS has no ledger comments (4.289833ms)
  ✔ REVISE blocks even with receipt proof (4.589ms)
  ✔ REJECT blocks even with receipt proof (4.771875ms)
  ✔ DISCUSS blocks without an owner ruling (5.066583ms)
  ✔ DISCUSS still blocks after the ruling until a fresh review (5.683667ms)
✔ every gate condition fails closed when deliberately broken (116.458542ms)
✔ the approval and advancement recovery commands run exactly as printed (446.750458ms)
✔ the missing-review recovery command runs exactly as printed (382.944542ms)
✔ a phase entry remains valid only while every prior gate proof still exists on disk (55.265125ms)
✔ RECEIPT ADVERSARIAL SUITE: an earlier review's receipt cannot approve a fresh review (23.863083ms)
✔ RECEIPT ADVERSARIAL SUITE: phase N receipt cannot approve phase N+1 (9.868541ms)
✔ RECEIPT ADVERSARIAL SUITE: outer whitespace is accepted and any inner word change refuses (15.6635ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REVISE (7.257708ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REJECT (7.199584ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override DISCUSS (8.400542ms)
✔ a current review cannot be replaced before its receipt is recorded (32.330916ms)
✔ a revised artifact receives a fresh review, fresh receipt, and archived prior review (11.703875ms)
✔ DISCUSS requires the owner's ruling before a fresh definitive review (16.793458ms)
✔ REVIEWER FIXTURES: one planted defect and one honest control ship as blind Koda projects (17.594667ms)
✔ REVIEWER FIXTURES: the planted hard number is unsupported and the control has no plant (1.906334ms)
✔ session creation requires a prompt and numbers dated folders (28.622083ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-nFb5AO/remote.git
 * [new branch]      main -> main
✔ a completed session is closed only after its state is committed and pushed (832.691334ms)
✔ every Koda-C skill has valid relay sections and four-line Codex metadata (7.341833ms)
✔ producer phase skills hand only to the one shared reviewer (2.594125ms)
✔ the shared reviewer keeps all phase criteria in one place (2.80225ms)
✔ session open and close remain ceremonies outside producer phase routing (0.603208ms)
✔ STALE-REVIEW BINDING: editing the artifact after review refuses with a named re-review reason (13.919166ms)
✔ STALE-REVIEW BINDING: reviewing after an edit binds the new artifact and opens (8.869167ms)
✔ STATUS TRUTH SUITE: deleting a review is reflected immediately (217.796833ms)
✔ STATUS TRUTH SUITE: blanking an artifact is reflected immediately (193.319ms)
✔ STATUS TRUTH SUITE: corrupt ledger metadata refuses with a named corruption reason (98.5015ms)
✔ STATUS TRUTH SUITE: invalid state JSON refuses instead of guessing (95.423208ms)
ℹ tests 58
ℹ suites 0
ℹ pass 58
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 1054.069708
```
