# Per-test result — 2026-07-18-owner-facing-relay-final

- Result: **PASS**
- Recorded at: 2026-07-18T14:30:54.311Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `971b546`
- Command: `/opt/homebrew/Cellar/node/26.0.0/bin/node --test --test-reporter=spec tests/config.test.ts tests/dogfood.test.ts tests/gate.test.ts tests/hints.test.ts tests/history.test.ts tests/package.test.ts tests/receipt-adversarial.test.ts tests/review-binding.test.ts tests/review.test.ts tests/reviewer-fixtures.test.ts tests/session.test.ts tests/skill.test.ts tests/stale-review.test.ts tests/status-truth.test.ts`

Every discovered test and subtest is named below. No result is aggregated away.

```text
✔ the default phase chain is configurable data in the required order (1.348584ms)
✔ config validation rejects unsafe session paths and drifting phase names (0.487375ms)
✔ the committed dogfood snapshot contains a complete, internally bound close (14.252208ms)
✔ a complete artifact, review, allowed verdict, unique receipt, and ledger proof open the gate (29.192625ms)
▶ GATE MUTATION SUITE: each core condition refuses and names itself
  ✔ artifact exists (29.934417ms)
  ✔ artifact is non-empty (18.131125ms)
  ✔ review exists (18.166417ms)
  ✔ verdict REVISE is blocking (14.791625ms)
  ✔ verdict REJECT is blocking (9.023834ms)
  ✔ verdict DISCUSS is blocking (9.212583ms)
  ✔ current receipt is quoted verbatim in the ledger (6.166791ms)
✔ GATE MUTATION SUITE: each core condition refuses and names itself (111.642125ms)
✔ outer receipt whitespace is ignored but inner bytes remain literal (18.061917ms)
▶ every gate condition fails closed when deliberately broken
  ✔ artifact missing (15.501459ms)
  ✔ artifact empty (19.730042ms)
  ✔ review missing (13.215584ms)
  ✔ verdict line missing (10.146042ms)
  ✔ verdict unknown (9.272958ms)
  ✔ receipt missing from last line (11.235792ms)
  ✔ generated review metadata missing (10.660167ms)
  ✔ artifact changed after review (9.493375ms)
  ✔ final receipt differs from generated receipt (9.740125ms)
  ✔ receipt reused by another review (6.700709ms)
  ✔ approval ledger missing (7.574209ms)
  ✔ exact receipt absent from ledger (6.618208ms)
  ✔ approver missing (6.13775ms)
  ✔ APPROVE WITH COMMENTS has no ledger comments (6.052416ms)
  ✔ REVISE blocks even with receipt proof (6.45675ms)
  ✔ REJECT blocks even with receipt proof (6.729291ms)
  ✔ DISCUSS blocks without an owner ruling (6.024875ms)
  ✔ DISCUSS still blocks after the ruling until a fresh review (5.923542ms)
✔ every gate condition fails closed when deliberately broken (169.15725ms)
✔ the approval and advancement recovery commands run exactly as printed (547.107042ms)
✔ the missing-review recovery command runs exactly as printed (473.28825ms)
✔ a phase entry remains valid only while every prior gate proof still exists on disk (34.520875ms)
✔ PACKAGED NPX SUITE: a real tarball installs and runs the plain-JavaScript koda binary (1832.627417ms)
✔ RECEIPT ADVERSARIAL SUITE: an earlier review's receipt cannot approve a fresh review (30.335042ms)
✔ RECEIPT ADVERSARIAL SUITE: phase N receipt cannot approve phase N+1 (14.461792ms)
✔ RECEIPT ADVERSARIAL SUITE: outer whitespace is accepted and any inner word change refuses (21.183042ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REVISE (8.357791ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REJECT (11.209208ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override DISCUSS (9.370167ms)
✔ REVIEW BINDING SUITE: changing review findings after owner acknowledgement refuses (20.067625ms)
✔ REVIEW BINDING SUITE: an untouched generated template cannot become an approved review (9.127292ms)
✔ a current review cannot be replaced before its receipt is recorded (28.222625ms)
✔ a revised artifact receives a fresh review, fresh receipt, and archived prior review (24.428459ms)
✔ DISCUSS requires the owner's ruling before a fresh definitive review (36.28625ms)
✔ REVIEWER FIXTURES: one planted defect and one honest control ship as blind Koda projects (7.979166ms)
✔ REVIEWER FIXTURES: the planted hard number is unsupported and the control has no plant (5.018959ms)
✔ REVIEWER FIXTURES: Ghostty runs pin model and effort and preserve ephemeral Codex events (1.870167ms)
✔ session creation requires a prompt and numbers dated folders (18.774791ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-n5q4W4/remote.git
 * [new branch]      main -> main
✔ a completed session is closed only after its state is committed and pushed (1010.416875ms)
✔ every Koda-C skill has valid relay sections and four-line Codex metadata (13.682875ms)
✔ skill index metadata stays concise, front-loaded, and trigger-specific (5.225458ms)
✔ producer phase skills hand only to the one shared reviewer (2.166583ms)
✔ the shared reviewer keeps all phase criteria in one place (2.270875ms)
✔ in-phase consultation is disk-backed and cannot impersonate formal review (4.963209ms)
✔ session open and close remain ceremonies outside producer phase routing (0.545833ms)
✔ STALE-REVIEW BINDING: editing the artifact after review refuses with a named re-review reason (18.410417ms)
✔ STALE-REVIEW BINDING: reviewing after an edit binds the new artifact and opens (17.873458ms)
✔ STATUS TRUTH SUITE: deleting a review is reflected immediately (237.452625ms)
✔ STATUS TRUTH SUITE: blanking an artifact is reflected immediately (240.98225ms)
✔ STATUS TRUTH SUITE: corrupt ledger metadata refuses with a named corruption reason (121.603125ms)
✔ STATUS TRUTH SUITE: editing an acknowledged review is reflected immediately (134.433333ms)
✔ STATUS TRUTH SUITE: invalid state JSON refuses instead of guessing (116.631583ms)
ℹ tests 65
ℹ suites 0
ℹ pass 65
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 2014.950333
```
