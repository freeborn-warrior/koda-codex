# Per-test result — 2026-07-18-gplv3-license-final

- Result: **PASS**
- Recorded at: 2026-07-18T15:10:32.563Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `a65e6b5`
- Command: `/opt/homebrew/Cellar/node/26.0.0/bin/node --test --test-reporter=spec tests/config.test.ts tests/dogfood.test.ts tests/full-lifecycle.test.ts tests/gate.test.ts tests/hints.test.ts tests/history.test.ts tests/license.test.ts tests/package.test.ts tests/receipt-adversarial.test.ts tests/review-binding.test.ts tests/review.test.ts tests/reviewer-fixtures.test.ts tests/session.test.ts tests/skill.test.ts tests/stale-review.test.ts tests/status-truth.test.ts`

Every discovered test and subtest is named below. No result is aggregated away.

```text
✔ the default phase chain is configurable data in the required order (2.330208ms)
✔ config validation rejects unsafe session paths and drifting phase names (0.205917ms)
✔ the committed dogfood snapshot contains the full native chain and an internally bound close (25.796875ms)
✔ FULL LIFECYCLE SCENARIO: clean approvals traverse all six phases and pushed close (431.0605ms)
✔ FULL LIFECYCLE SCENARIO: a REVISE loop recovers in plan before completing and closing (336.466417ms)
✔ FULL LIFECYCLE SCENARIO: DISCUSS records an owner ruling and requires a fresh live review (363.465292ms)
✔ a complete artifact, review, allowed verdict, unique receipt, and ledger proof open the gate (28.278792ms)
▶ GATE MUTATION SUITE: each core condition refuses and names itself
  ✔ artifact exists (10.066292ms)
  ✔ artifact is non-empty (8.748958ms)
  ✔ review exists (9.896834ms)
  ✔ verdict REVISE is blocking (8.131541ms)
  ✔ verdict REJECT is blocking (10.961084ms)
  ✔ verdict DISCUSS is blocking (21.483084ms)
  ✔ current receipt is quoted verbatim in the ledger (12.959334ms)
✔ GATE MUTATION SUITE: each core condition refuses and names itself (83.392417ms)
✔ outer receipt whitespace is ignored but inner bytes remain literal (42.897375ms)
▶ every gate condition fails closed when deliberately broken
  ✔ artifact missing (11.661583ms)
  ✔ artifact empty (16.447042ms)
  ✔ review missing (14.808541ms)
  ✔ verdict line missing (10.657ms)
  ✔ verdict unknown (19.11425ms)
  ✔ receipt missing from last line (7.694125ms)
  ✔ generated review metadata missing (9.319167ms)
  ✔ review metadata names a different phase (8.034167ms)
  ✔ artifact changed after review (9.934334ms)
  ✔ final receipt differs from generated receipt (8.157584ms)
  ✔ receipt reused by another review (12.007458ms)
  ✔ approval ledger missing (9.520583ms)
  ✔ exact receipt absent from ledger (7.125833ms)
  ✔ approver missing (8.098083ms)
  ✔ APPROVE WITH COMMENTS has no ledger comments (12.098334ms)
  ✔ REVISE blocks even with receipt proof (14.080458ms)
  ✔ REJECT blocks even with receipt proof (7.397625ms)
  ✔ DISCUSS blocks without an owner ruling (11.173917ms)
  ✔ DISCUSS still blocks after the ruling until a fresh review (8.85375ms)
✔ every gate condition fails closed when deliberately broken (208.849958ms)
✔ the approval and advancement recovery commands run exactly as printed (500.063833ms)
✔ the missing-review recovery command runs exactly as printed (450.014541ms)
✔ a phase entry remains valid only while every prior gate proof still exists on disk (49.343042ms)
✔ the repository carries the complete GPLv3-only license and Kristian's sole copyright (4.721958ms)
✔ PACKAGED NPX SUITE: a real tarball installs and runs the plain-JavaScript koda binary (2220.536833ms)
✔ RECEIPT ADVERSARIAL SUITE: an earlier review's receipt cannot approve a fresh review (35.601958ms)
✔ RECEIPT ADVERSARIAL SUITE: phase N receipt cannot approve phase N+1 (17.2095ms)
✔ RECEIPT ADVERSARIAL SUITE: outer whitespace is accepted and any inner word change refuses (22.730167ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REVISE (16.269541ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REJECT (21.50175ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override DISCUSS (13.885125ms)
✔ REVIEW BINDING SUITE: changing review findings after owner acknowledgement refuses (22.956542ms)
✔ REVIEW BINDING SUITE: an untouched generated template cannot become an approved review (33.066625ms)
✔ a current review cannot be replaced before its receipt is recorded (26.062ms)
✔ a revised artifact receives a fresh review, fresh receipt, and archived prior review (25.663667ms)
✔ DISCUSS requires the owner's ruling before a fresh definitive review (37.917916ms)
✔ REVIEWER FIXTURES: one planted defect and one honest control ship as blind Koda projects (11.080208ms)
✔ REVIEWER FIXTURES: the planted hard number is unsupported and the control has no plant (2.485541ms)
✔ REVIEWER FIXTURES: Ghostty runs pin model and effort and preserve ephemeral Codex events (1.409708ms)
✔ session creation requires a prompt and numbers dated folders (21.657791ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-yaOtYC/remote.git
 * [new branch]      main -> main
✔ a completed session is closed only after its state is committed and pushed (1018.890625ms)
✔ every Koda-C skill has valid relay sections and four-line Codex metadata (6.726833ms)
✔ skill index metadata stays concise, front-loaded, and trigger-specific (3.858416ms)
✔ producer phase skills hand only to the one shared reviewer (1.789667ms)
✔ the shared reviewer keeps all phase criteria in one place (3.465792ms)
✔ in-phase consultation is disk-backed and cannot impersonate formal review (2.771167ms)
✔ session open and close remain ceremonies outside producer phase routing (0.672833ms)
✔ STALE-REVIEW BINDING: editing the artifact after review refuses with a named re-review reason (21.979458ms)
✔ STALE-REVIEW BINDING: reviewing after an edit binds the new artifact and opens (14.7865ms)
✔ STATUS TRUTH SUITE: deleting a review is reflected immediately (253.904916ms)
✔ STATUS TRUTH SUITE: blanking an artifact is reflected immediately (227.874375ms)
✔ STATUS TRUTH SUITE: corrupt ledger metadata refuses with a named corruption reason (123.845625ms)
✔ STATUS TRUTH SUITE: editing an acknowledged review is reflected immediately (110.000292ms)
✔ STATUS TRUTH SUITE: invalid state JSON refuses instead of guessing (112.593708ms)
ℹ tests 70
ℹ suites 0
ℹ pass 70
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 2366.830375
```
