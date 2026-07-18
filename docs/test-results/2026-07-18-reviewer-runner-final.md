# Per-test result — 2026-07-18-reviewer-runner-final

- Result: **PASS**
- Recorded at: 2026-07-18T14:45:00.824Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `47049bc`
- Command: `/opt/homebrew/Cellar/node/26.0.0/bin/node --test --test-reporter=spec tests/config.test.ts tests/dogfood.test.ts tests/gate.test.ts tests/hints.test.ts tests/history.test.ts tests/package.test.ts tests/receipt-adversarial.test.ts tests/review-binding.test.ts tests/review.test.ts tests/reviewer-fixtures.test.ts tests/session.test.ts tests/skill.test.ts tests/stale-review.test.ts tests/status-truth.test.ts`

Every discovered test and subtest is named below. No result is aggregated away.

```text
✔ the default phase chain is configurable data in the required order (1.165792ms)
✔ config validation rejects unsafe session paths and drifting phase names (0.190583ms)
✔ the committed dogfood snapshot contains a complete, internally bound close (37.768541ms)
✔ a complete artifact, review, allowed verdict, unique receipt, and ledger proof open the gate (49.123458ms)
▶ GATE MUTATION SUITE: each core condition refuses and names itself
  ✔ artifact exists (10.201542ms)
  ✔ artifact is non-empty (12.736959ms)
  ✔ review exists (15.591875ms)
  ✔ verdict REVISE is blocking (13.56325ms)
  ✔ verdict REJECT is blocking (11.242417ms)
  ✔ verdict DISCUSS is blocking (14.951625ms)
  ✔ current receipt is quoted verbatim in the ledger (7.386042ms)
✔ GATE MUTATION SUITE: each core condition refuses and names itself (87.605ms)
✔ outer receipt whitespace is ignored but inner bytes remain literal (18.280625ms)
▶ every gate condition fails closed when deliberately broken
  ✔ artifact missing (8.701083ms)
  ✔ artifact empty (11.457916ms)
  ✔ review missing (11.689125ms)
  ✔ verdict line missing (11.019584ms)
  ✔ verdict unknown (13.667916ms)
  ✔ receipt missing from last line (10.502958ms)
  ✔ generated review metadata missing (21.15575ms)
  ✔ review metadata names a different phase (10.21075ms)
  ✔ artifact changed after review (16.811667ms)
  ✔ final receipt differs from generated receipt (16.719125ms)
  ✔ receipt reused by another review (12.212375ms)
  ✔ approval ledger missing (8.007709ms)
  ✔ exact receipt absent from ledger (7.140042ms)
  ✔ approver missing (6.525125ms)
  ✔ APPROVE WITH COMMENTS has no ledger comments (8.175333ms)
  ✔ REVISE blocks even with receipt proof (6.134084ms)
  ✔ REJECT blocks even with receipt proof (7.595208ms)
  ✔ DISCUSS blocks without an owner ruling (7.732ms)
  ✔ DISCUSS still blocks after the ruling until a fresh review (9.578667ms)
✔ every gate condition fails closed when deliberately broken (207.52925ms)
✔ the approval and advancement recovery commands run exactly as printed (627.294583ms)
✔ the missing-review recovery command runs exactly as printed (500.27725ms)
✔ a phase entry remains valid only while every prior gate proof still exists on disk (37.489208ms)
✔ PACKAGED NPX SUITE: a real tarball installs and runs the plain-JavaScript koda binary (2479.218083ms)
✔ RECEIPT ADVERSARIAL SUITE: an earlier review's receipt cannot approve a fresh review (27.384709ms)
✔ RECEIPT ADVERSARIAL SUITE: phase N receipt cannot approve phase N+1 (10.888833ms)
✔ RECEIPT ADVERSARIAL SUITE: outer whitespace is accepted and any inner word change refuses (16.065083ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REVISE (8.8965ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REJECT (24.355625ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override DISCUSS (21.620292ms)
✔ REVIEW BINDING SUITE: changing review findings after owner acknowledgement refuses (47.006125ms)
✔ REVIEW BINDING SUITE: an untouched generated template cannot become an approved review (16.698083ms)
✔ a current review cannot be replaced before its receipt is recorded (53.501ms)
✔ a revised artifact receives a fresh review, fresh receipt, and archived prior review (19.52475ms)
✔ DISCUSS requires the owner's ruling before a fresh definitive review (24.366375ms)
✔ REVIEWER FIXTURES: one planted defect and one honest control ship as blind Koda projects (17.802875ms)
✔ REVIEWER FIXTURES: the planted hard number is unsupported and the control has no plant (1.426625ms)
✔ REVIEWER FIXTURES: Ghostty runs pin model and effort and preserve ephemeral Codex events (1.390375ms)
✔ session creation requires a prompt and numbers dated folders (25.017416ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-bOU4Pf/remote.git
 * [new branch]      main -> main
✔ a completed session is closed only after its state is committed and pushed (1071.706583ms)
✔ every Koda-C skill has valid relay sections and four-line Codex metadata (8.563542ms)
✔ skill index metadata stays concise, front-loaded, and trigger-specific (3.501417ms)
✔ producer phase skills hand only to the one shared reviewer (1.810125ms)
✔ the shared reviewer keeps all phase criteria in one place (1.530583ms)
✔ in-phase consultation is disk-backed and cannot impersonate formal review (2.969875ms)
✔ session open and close remain ceremonies outside producer phase routing (0.653208ms)
✔ STALE-REVIEW BINDING: editing the artifact after review refuses with a named re-review reason (22.121875ms)
✔ STALE-REVIEW BINDING: reviewing after an edit binds the new artifact and opens (11.680292ms)
✔ STATUS TRUTH SUITE: deleting a review is reflected immediately (275.075125ms)
✔ STATUS TRUTH SUITE: blanking an artifact is reflected immediately (257.113667ms)
✔ STATUS TRUTH SUITE: corrupt ledger metadata refuses with a named corruption reason (130.225125ms)
✔ STATUS TRUTH SUITE: editing an acknowledged review is reflected immediately (120.80325ms)
✔ STATUS TRUTH SUITE: invalid state JSON refuses instead of guessing (124.111458ms)
ℹ tests 66
ℹ suites 0
ℹ pass 66
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 2678.543459
```
