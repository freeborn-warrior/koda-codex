# Per-test result — 2026-07-18-packaged-recovery-command-final

- Result: **PASS**
- Recorded at: 2026-07-18T14:03:52.005Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `971b546`
- Command: `/opt/homebrew/Cellar/node/26.0.0/bin/node --test --test-reporter=spec tests/config.test.ts tests/dogfood.test.ts tests/gate.test.ts tests/hints.test.ts tests/history.test.ts tests/package.test.ts tests/receipt-adversarial.test.ts tests/review-binding.test.ts tests/review.test.ts tests/reviewer-fixtures.test.ts tests/session.test.ts tests/skill.test.ts tests/stale-review.test.ts tests/status-truth.test.ts`

Every discovered test and subtest is named below. No result is aggregated away.

```text
✔ the default phase chain is configurable data in the required order (17.852833ms)
✔ config validation rejects unsafe session paths and drifting phase names (0.252666ms)
✔ the committed dogfood snapshot contains a complete, internally bound close (17.255459ms)
✔ a complete artifact, review, allowed verdict, unique receipt, and ledger proof open the gate (45.778833ms)
▶ GATE MUTATION SUITE: each core condition refuses and names itself
  ✔ artifact exists (23.901291ms)
  ✔ artifact is non-empty (35.740708ms)
  ✔ review exists (21.250917ms)
  ✔ verdict REVISE is blocking (14.421958ms)
  ✔ verdict REJECT is blocking (34.267583ms)
  ✔ verdict DISCUSS is blocking (14.600708ms)
  ✔ current receipt is quoted verbatim in the ledger (8.319459ms)
✔ GATE MUTATION SUITE: each core condition refuses and names itself (156.654417ms)
✔ outer receipt whitespace is ignored but inner bytes remain literal (19.932292ms)
▶ every gate condition fails closed when deliberately broken
  ✔ artifact missing (9.218959ms)
  ✔ artifact empty (11.001833ms)
  ✔ review missing (10.756583ms)
  ✔ verdict line missing (7.601458ms)
  ✔ verdict unknown (8.738625ms)
  ✔ receipt missing from last line (25.789083ms)
  ✔ generated review metadata missing (22.642125ms)
  ✔ artifact changed after review (27.67025ms)
  ✔ final receipt differs from generated receipt (15.378125ms)
  ✔ receipt reused by another review (11.107583ms)
  ✔ approval ledger missing (8.179334ms)
  ✔ exact receipt absent from ledger (8.852208ms)
  ✔ approver missing (9.291417ms)
  ✔ APPROVE WITH COMMENTS has no ledger comments (10.289042ms)
  ✔ REVISE blocks even with receipt proof (9.461709ms)
  ✔ REJECT blocks even with receipt proof (8.688542ms)
  ✔ DISCUSS blocks without an owner ruling (8.770792ms)
  ✔ DISCUSS still blocks after the ruling until a fresh review (8.056625ms)
✔ every gate condition fails closed when deliberately broken (224.126791ms)
✔ the approval and advancement recovery commands run exactly as printed (565.419292ms)
✔ the missing-review recovery command runs exactly as printed (502.307917ms)
✔ a phase entry remains valid only while every prior gate proof still exists on disk (30.630333ms)
✔ PACKAGED NPX SUITE: a real tarball installs and runs the plain-JavaScript koda binary (2023.905375ms)
✔ RECEIPT ADVERSARIAL SUITE: an earlier review's receipt cannot approve a fresh review (38.692042ms)
✔ RECEIPT ADVERSARIAL SUITE: phase N receipt cannot approve phase N+1 (16.725458ms)
✔ RECEIPT ADVERSARIAL SUITE: outer whitespace is accepted and any inner word change refuses (28.37225ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REVISE (16.214125ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REJECT (11.068917ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override DISCUSS (21.973125ms)
✔ REVIEW BINDING SUITE: changing review findings after owner acknowledgement refuses (29.663417ms)
✔ REVIEW BINDING SUITE: an untouched generated template cannot become an approved review (14.462875ms)
✔ a current review cannot be replaced before its receipt is recorded (22.564625ms)
✔ a revised artifact receives a fresh review, fresh receipt, and archived prior review (29.88725ms)
✔ DISCUSS requires the owner's ruling before a fresh definitive review (30.299875ms)
✔ REVIEWER FIXTURES: one planted defect and one honest control ship as blind Koda projects (17.547458ms)
✔ REVIEWER FIXTURES: the planted hard number is unsupported and the control has no plant (3.494125ms)
✔ session creation requires a prompt and numbers dated folders (23.688792ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-Y2Zsh1/remote.git
 * [new branch]      main -> main
✔ a completed session is closed only after its state is committed and pushed (1100.09125ms)
✔ every Koda-C skill has valid relay sections and four-line Codex metadata (12.4215ms)
✔ skill index metadata stays concise, front-loaded, and trigger-specific (7.365875ms)
✔ producer phase skills hand only to the one shared reviewer (2.995375ms)
✔ the shared reviewer keeps all phase criteria in one place (2.310834ms)
✔ session open and close remain ceremonies outside producer phase routing (1.154709ms)
✔ STALE-REVIEW BINDING: editing the artifact after review refuses with a named re-review reason (21.925708ms)
✔ STALE-REVIEW BINDING: reviewing after an edit binds the new artifact and opens (34.57575ms)
✔ STATUS TRUTH SUITE: deleting a review is reflected immediately (267.560417ms)
✔ STATUS TRUTH SUITE: blanking an artifact is reflected immediately (240.171709ms)
✔ STATUS TRUTH SUITE: corrupt ledger metadata refuses with a named corruption reason (130.745667ms)
✔ STATUS TRUTH SUITE: editing an acknowledged review is reflected immediately (138.04825ms)
✔ STATUS TRUTH SUITE: invalid state JSON refuses instead of guessing (138.658417ms)
ℹ tests 63
ℹ suites 0
ℹ pass 63
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 2210.618333
```
