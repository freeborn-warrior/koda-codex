# Per-test result — 2026-07-18-bidirectional-review-binding-initial

- Result: **PASS**
- Recorded at: 2026-07-18T14:02:25.097Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `971b546`
- Command: `/opt/homebrew/Cellar/node/26.0.0/bin/node --test --test-reporter=spec tests/config.test.ts tests/dogfood.test.ts tests/gate.test.ts tests/hints.test.ts tests/history.test.ts tests/package.test.ts tests/receipt-adversarial.test.ts tests/review-binding.test.ts tests/review.test.ts tests/reviewer-fixtures.test.ts tests/session.test.ts tests/skill.test.ts tests/stale-review.test.ts tests/status-truth.test.ts`

Every discovered test and subtest is named below. No result is aggregated away.

```text
✔ the default phase chain is configurable data in the required order (2.201917ms)
✔ config validation rejects unsafe session paths and drifting phase names (0.39625ms)
✔ the committed dogfood snapshot contains a complete, internally bound close (28.855834ms)
✔ a complete artifact, review, allowed verdict, unique receipt, and ledger proof open the gate (30.13475ms)
▶ GATE MUTATION SUITE: each core condition refuses and names itself
  ✔ artifact exists (14.647666ms)
  ✔ artifact is non-empty (9.073041ms)
  ✔ review exists (10.153542ms)
  ✔ verdict REVISE is blocking (13.39525ms)
  ✔ verdict REJECT is blocking (12.243209ms)
  ✔ verdict DISCUSS is blocking (19.47075ms)
  ✔ current receipt is quoted verbatim in the ledger (9.169ms)
✔ GATE MUTATION SUITE: each core condition refuses and names itself (89.801333ms)
✔ outer receipt whitespace is ignored but inner bytes remain literal (15.050625ms)
▶ every gate condition fails closed when deliberately broken
  ✔ artifact missing (10.980542ms)
  ✔ artifact empty (7.419083ms)
  ✔ review missing (12.930542ms)
  ✔ verdict line missing (7.271166ms)
  ✔ verdict unknown (7.678875ms)
  ✔ receipt missing from last line (8.096458ms)
  ✔ generated review metadata missing (17.032458ms)
  ✔ artifact changed after review (13.589167ms)
  ✔ final receipt differs from generated receipt (11.310792ms)
  ✔ receipt reused by another review (12.122334ms)
  ✔ approval ledger missing (7.915625ms)
  ✔ exact receipt absent from ledger (10.252292ms)
  ✔ approver missing (7.530375ms)
  ✔ APPROVE WITH COMMENTS has no ledger comments (7.691458ms)
  ✔ REVISE blocks even with receipt proof (7.178834ms)
  ✔ REJECT blocks even with receipt proof (7.050208ms)
  ✔ DISCUSS blocks without an owner ruling (5.5ms)
  ✔ DISCUSS still blocks after the ruling until a fresh review (6.026458ms)
✔ every gate condition fails closed when deliberately broken (169.778333ms)
✔ the approval and advancement recovery commands run exactly as printed (511.967792ms)
✔ the missing-review recovery command runs exactly as printed (437.558375ms)
✔ a phase entry remains valid only while every prior gate proof still exists on disk (38.886125ms)
✔ PACKAGED NPX SUITE: a real tarball installs and runs the plain-JavaScript koda binary (1425.226666ms)
✔ RECEIPT ADVERSARIAL SUITE: an earlier review's receipt cannot approve a fresh review (35.286583ms)
✔ RECEIPT ADVERSARIAL SUITE: phase N receipt cannot approve phase N+1 (13.923125ms)
✔ RECEIPT ADVERSARIAL SUITE: outer whitespace is accepted and any inner word change refuses (27.217959ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REVISE (11.67225ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REJECT (16.068125ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override DISCUSS (18.141667ms)
✔ REVIEW BINDING SUITE: changing review findings after owner acknowledgement refuses (48.455625ms)
✔ REVIEW BINDING SUITE: an untouched generated template cannot become an approved review (27.591417ms)
✔ a current review cannot be replaced before its receipt is recorded (41.320291ms)
✔ a revised artifact receives a fresh review, fresh receipt, and archived prior review (22.235625ms)
✔ DISCUSS requires the owner's ruling before a fresh definitive review (19.162292ms)
✔ REVIEWER FIXTURES: one planted defect and one honest control ship as blind Koda projects (7.000875ms)
✔ REVIEWER FIXTURES: the planted hard number is unsupported and the control has no plant (0.789625ms)
✔ session creation requires a prompt and numbers dated folders (21.048208ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-V9Tz39/remote.git
 * [new branch]      main -> main
✔ a completed session is closed only after its state is committed and pushed (914.344375ms)
✔ every Koda-C skill has valid relay sections and four-line Codex metadata (14.760834ms)
✔ skill index metadata stays concise, front-loaded, and trigger-specific (5.779875ms)
✔ producer phase skills hand only to the one shared reviewer (2.193459ms)
✔ the shared reviewer keeps all phase criteria in one place (2.454541ms)
✔ session open and close remain ceremonies outside producer phase routing (0.460333ms)
✔ STALE-REVIEW BINDING: editing the artifact after review refuses with a named re-review reason (21.139458ms)
✔ STALE-REVIEW BINDING: reviewing after an edit binds the new artifact and opens (15.995166ms)
✔ STATUS TRUTH SUITE: deleting a review is reflected immediately (229.158042ms)
✔ STATUS TRUTH SUITE: blanking an artifact is reflected immediately (216.471416ms)
✔ STATUS TRUTH SUITE: corrupt ledger metadata refuses with a named corruption reason (112.860666ms)
✔ STATUS TRUTH SUITE: editing an acknowledged review is reflected immediately (119.968792ms)
✔ STATUS TRUTH SUITE: invalid state JSON refuses instead of guessing (105.482584ms)
ℹ tests 63
ℹ suites 0
ℹ pass 63
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 1586.333042
```
