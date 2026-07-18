# Per-test result — 2026-07-18-full-native-lifecycle-final

- Result: **PASS**
- Recorded at: 2026-07-18T14:58:05.928Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `711d6a9`
- Command: `/opt/homebrew/Cellar/node/26.0.0/bin/node --test --test-reporter=spec tests/config.test.ts tests/dogfood.test.ts tests/full-lifecycle.test.ts tests/gate.test.ts tests/hints.test.ts tests/history.test.ts tests/package.test.ts tests/receipt-adversarial.test.ts tests/review-binding.test.ts tests/review.test.ts tests/reviewer-fixtures.test.ts tests/session.test.ts tests/skill.test.ts tests/stale-review.test.ts tests/status-truth.test.ts`

Every discovered test and subtest is named below. No result is aggregated away.

```text
✔ the default phase chain is configurable data in the required order (1.86025ms)
✔ config validation rejects unsafe session paths and drifting phase names (0.2115ms)
✔ the committed dogfood snapshot contains the full native chain and an internally bound close (32.11175ms)
✔ FULL LIFECYCLE SCENARIO: clean approvals traverse all six phases and pushed close (434.710041ms)
✔ FULL LIFECYCLE SCENARIO: a REVISE loop recovers in plan before completing and closing (357.25975ms)
✔ FULL LIFECYCLE SCENARIO: DISCUSS records an owner ruling and requires a fresh live review (356.144834ms)
✔ a complete artifact, review, allowed verdict, unique receipt, and ledger proof open the gate (50.581834ms)
▶ GATE MUTATION SUITE: each core condition refuses and names itself
  ✔ artifact exists (15.654542ms)
  ✔ artifact is non-empty (15.807875ms)
  ✔ review exists (18.607458ms)
  ✔ verdict REVISE is blocking (11.325042ms)
  ✔ verdict REJECT is blocking (37.222292ms)
  ✔ verdict DISCUSS is blocking (14.937667ms)
  ✔ current receipt is quoted verbatim in the ledger (26.47ms)
✔ GATE MUTATION SUITE: each core condition refuses and names itself (143.354916ms)
✔ outer receipt whitespace is ignored but inner bytes remain literal (27.269917ms)
▶ every gate condition fails closed when deliberately broken
  ✔ artifact missing (12.456166ms)
  ✔ artifact empty (9.228125ms)
  ✔ review missing (9.600417ms)
  ✔ verdict line missing (10.417792ms)
  ✔ verdict unknown (11.150417ms)
  ✔ receipt missing from last line (9.11775ms)
  ✔ generated review metadata missing (8.481958ms)
  ✔ review metadata names a different phase (17.16825ms)
  ✔ artifact changed after review (12.302125ms)
  ✔ final receipt differs from generated receipt (9.561708ms)
  ✔ receipt reused by another review (12.643625ms)
  ✔ approval ledger missing (6.868208ms)
  ✔ exact receipt absent from ledger (7.772625ms)
  ✔ approver missing (6.923834ms)
  ✔ APPROVE WITH COMMENTS has no ledger comments (12.219458ms)
  ✔ REVISE blocks even with receipt proof (7.232584ms)
  ✔ REJECT blocks even with receipt proof (9.093708ms)
  ✔ DISCUSS blocks without an owner ruling (6.182583ms)
  ✔ DISCUSS still blocks after the ruling until a fresh review (6.640958ms)
✔ every gate condition fails closed when deliberately broken (187.466834ms)
✔ the approval and advancement recovery commands run exactly as printed (565.613292ms)
✔ the missing-review recovery command runs exactly as printed (472.298458ms)
✔ a phase entry remains valid only while every prior gate proof still exists on disk (34.662792ms)
✔ PACKAGED NPX SUITE: a real tarball installs and runs the plain-JavaScript koda binary (2076.379167ms)
✔ RECEIPT ADVERSARIAL SUITE: an earlier review's receipt cannot approve a fresh review (26.579333ms)
✔ RECEIPT ADVERSARIAL SUITE: phase N receipt cannot approve phase N+1 (11.353209ms)
✔ RECEIPT ADVERSARIAL SUITE: outer whitespace is accepted and any inner word change refuses (24.552291ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REVISE (8.972791ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REJECT (14.541209ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override DISCUSS (11.661ms)
✔ REVIEW BINDING SUITE: changing review findings after owner acknowledgement refuses (43.903292ms)
✔ REVIEW BINDING SUITE: an untouched generated template cannot become an approved review (9.938875ms)
✔ a current review cannot be replaced before its receipt is recorded (45.952333ms)
✔ a revised artifact receives a fresh review, fresh receipt, and archived prior review (14.799ms)
✔ DISCUSS requires the owner's ruling before a fresh definitive review (27.310667ms)
✔ REVIEWER FIXTURES: one planted defect and one honest control ship as blind Koda projects (20.209334ms)
✔ REVIEWER FIXTURES: the planted hard number is unsupported and the control has no plant (1.551292ms)
✔ REVIEWER FIXTURES: Ghostty runs pin model and effort and preserve ephemeral Codex events (1.551ms)
✔ session creation requires a prompt and numbers dated folders (24.7285ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-8JmDhh/remote.git
 * [new branch]      main -> main
✔ a completed session is closed only after its state is committed and pushed (1028.600334ms)
✔ every Koda-C skill has valid relay sections and four-line Codex metadata (7.984208ms)
✔ skill index metadata stays concise, front-loaded, and trigger-specific (6.864917ms)
✔ producer phase skills hand only to the one shared reviewer (4.375208ms)
✔ the shared reviewer keeps all phase criteria in one place (2.048708ms)
✔ in-phase consultation is disk-backed and cannot impersonate formal review (4.826125ms)
✔ session open and close remain ceremonies outside producer phase routing (0.498583ms)
✔ STALE-REVIEW BINDING: editing the artifact after review refuses with a named re-review reason (23.555875ms)
✔ STALE-REVIEW BINDING: reviewing after an edit binds the new artifact and opens (19.501833ms)
✔ STATUS TRUTH SUITE: deleting a review is reflected immediately (256.16625ms)
✔ STATUS TRUTH SUITE: blanking an artifact is reflected immediately (247.945042ms)
✔ STATUS TRUTH SUITE: corrupt ledger metadata refuses with a named corruption reason (110.189416ms)
✔ STATUS TRUTH SUITE: editing an acknowledged review is reflected immediately (126.750541ms)
✔ STATUS TRUTH SUITE: invalid state JSON refuses instead of guessing (117.355334ms)
ℹ tests 69
ℹ suites 0
ℹ pass 69
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 2230.226875
```
