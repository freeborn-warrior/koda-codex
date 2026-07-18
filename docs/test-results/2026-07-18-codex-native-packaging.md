# Per-test result — 2026-07-18-codex-native-packaging

- Result: **PASS**
- Recorded at: 2026-07-18T13:51:00.289Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `971b546`
- Command: `/opt/homebrew/Cellar/node/26.0.0/bin/node --test --test-reporter=spec tests/config.test.ts tests/dogfood.test.ts tests/gate.test.ts tests/hints.test.ts tests/history.test.ts tests/receipt-adversarial.test.ts tests/review.test.ts tests/reviewer-fixtures.test.ts tests/session.test.ts tests/skill.test.ts tests/stale-review.test.ts tests/status-truth.test.ts`

Every discovered test and subtest is named below. No result is aggregated away.

```text
✔ the default phase chain is configurable data in the required order (1.11525ms)
✔ config validation rejects unsafe session paths and drifting phase names (0.255792ms)
✔ the committed dogfood snapshot contains a complete, internally bound close (17.5805ms)
✔ a complete artifact, review, allowed verdict, unique receipt, and ledger proof open the gate (40.1605ms)
▶ GATE MUTATION SUITE: each core condition refuses and names itself
  ✔ artifact exists (9.828542ms)
  ✔ artifact is non-empty (9.547333ms)
  ✔ review exists (8.668167ms)
  ✔ verdict REVISE is blocking (8.846125ms)
  ✔ verdict REJECT is blocking (8.380042ms)
  ✔ verdict DISCUSS is blocking (10.222458ms)
  ✔ current receipt is quoted verbatim in the ledger (8.240542ms)
✔ GATE MUTATION SUITE: each core condition refuses and names itself (65.034584ms)
✔ outer receipt whitespace is ignored but inner bytes remain literal (15.124834ms)
▶ every gate condition fails closed when deliberately broken
  ✔ artifact missing (7.228875ms)
  ✔ artifact empty (7.815458ms)
  ✔ review missing (7.246125ms)
  ✔ verdict line missing (7.784625ms)
  ✔ verdict unknown (6.760042ms)
  ✔ receipt missing from last line (5.211375ms)
  ✔ generated review metadata missing (4.399583ms)
  ✔ artifact changed after review (4.681459ms)
  ✔ final receipt differs from generated receipt (4.61875ms)
  ✔ receipt reused by another review (6.55725ms)
  ✔ approval ledger missing (4.571ms)
  ✔ exact receipt absent from ledger (3.93ms)
  ✔ approver missing (5.06475ms)
  ✔ APPROVE WITH COMMENTS has no ledger comments (5.157ms)
  ✔ REVISE blocks even with receipt proof (4.965958ms)
  ✔ REJECT blocks even with receipt proof (6.503ms)
  ✔ DISCUSS blocks without an owner ruling (5.430833ms)
  ✔ DISCUSS still blocks after the ruling until a fresh review (5.61875ms)
✔ every gate condition fails closed when deliberately broken (105.363ms)
✔ the approval and advancement recovery commands run exactly as printed (464.01825ms)
✔ the missing-review recovery command runs exactly as printed (380.544375ms)
✔ a phase entry remains valid only while every prior gate proof still exists on disk (52.091625ms)
✔ RECEIPT ADVERSARIAL SUITE: an earlier review's receipt cannot approve a fresh review (20.962084ms)
✔ RECEIPT ADVERSARIAL SUITE: phase N receipt cannot approve phase N+1 (11.879583ms)
✔ RECEIPT ADVERSARIAL SUITE: outer whitespace is accepted and any inner word change refuses (17.886375ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REVISE (8.132042ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REJECT (7.373458ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override DISCUSS (8.106708ms)
✔ a current review cannot be replaced before its receipt is recorded (42.153542ms)
✔ a revised artifact receives a fresh review, fresh receipt, and archived prior review (15.284375ms)
✔ DISCUSS requires the owner's ruling before a fresh definitive review (20.4285ms)
✔ REVIEWER FIXTURES: one planted defect and one honest control ship as blind Koda projects (8.416125ms)
✔ REVIEWER FIXTURES: the planted hard number is unsupported and the control has no plant (1.796ms)
✔ session creation requires a prompt and numbers dated folders (14.862833ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-6fNO44/remote.git
 * [new branch]      main -> main
✔ a completed session is closed only after its state is committed and pushed (831.3925ms)
✔ every Koda-C skill has valid relay sections and four-line Codex metadata (6.735583ms)
✔ producer phase skills hand only to the one shared reviewer (2.226792ms)
✔ the shared reviewer keeps all phase criteria in one place (2.098917ms)
✔ session open and close remain ceremonies outside producer phase routing (0.633917ms)
✔ STALE-REVIEW BINDING: editing the artifact after review refuses with a named re-review reason (15.631417ms)
✔ STALE-REVIEW BINDING: reviewing after an edit binds the new artifact and opens (10.650084ms)
✔ STATUS TRUTH SUITE: deleting a review is reflected immediately (207.133042ms)
✔ STATUS TRUTH SUITE: blanking an artifact is reflected immediately (193.515958ms)
✔ STATUS TRUTH SUITE: corrupt ledger metadata refuses with a named corruption reason (98.183084ms)
✔ STATUS TRUTH SUITE: invalid state JSON refuses instead of guessing (97.805667ms)
ℹ tests 58
ℹ suites 0
ℹ pass 58
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 1020.3545
```
