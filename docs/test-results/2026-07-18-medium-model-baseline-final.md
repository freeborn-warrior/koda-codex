# Per-test result — 2026-07-18-medium-model-baseline-final

- Result: **PASS**
- Recorded at: 2026-07-18T15:15:47.132Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `18ad44a`
- Command: `/opt/homebrew/Cellar/node/26.0.0/bin/node --test --test-reporter=spec tests/config.test.ts tests/dogfood.test.ts tests/full-lifecycle.test.ts tests/gate.test.ts tests/hints.test.ts tests/history.test.ts tests/license.test.ts tests/package.test.ts tests/receipt-adversarial.test.ts tests/review-binding.test.ts tests/review.test.ts tests/reviewer-fixtures.test.ts tests/session.test.ts tests/skill.test.ts tests/stale-review.test.ts tests/status-truth.test.ts`

Every discovered test and subtest is named below. No result is aggregated away.

```text
✔ the default phase chain is configurable data in the required order (2.045417ms)
✔ config validation rejects unsafe session paths and drifting phase names (0.38575ms)
✔ the committed dogfood snapshot contains the full native chain and an internally bound close (21.57125ms)
✔ FULL LIFECYCLE SCENARIO: clean approvals traverse all six phases and pushed close (490.111666ms)
✔ FULL LIFECYCLE SCENARIO: a REVISE loop recovers in plan before completing and closing (337.638125ms)
✔ FULL LIFECYCLE SCENARIO: DISCUSS records an owner ruling and requires a fresh live review (356.169625ms)
✔ a complete artifact, review, allowed verdict, unique receipt, and ledger proof open the gate (47.298875ms)
▶ GATE MUTATION SUITE: each core condition refuses and names itself
  ✔ artifact exists (14.730667ms)
  ✔ artifact is non-empty (13.943333ms)
  ✔ review exists (9.408ms)
  ✔ verdict REVISE is blocking (12.018458ms)
  ✔ verdict REJECT is blocking (7.6555ms)
  ✔ verdict DISCUSS is blocking (9.592792ms)
  ✔ current receipt is quoted verbatim in the ledger (5.462417ms)
✔ GATE MUTATION SUITE: each core condition refuses and names itself (74.24475ms)
✔ outer receipt whitespace is ignored but inner bytes remain literal (18.864208ms)
▶ every gate condition fails closed when deliberately broken
  ✔ artifact missing (24.756167ms)
  ✔ artifact empty (14.036542ms)
  ✔ review missing (12.720917ms)
  ✔ verdict line missing (54.551041ms)
  ✔ verdict unknown (8.069209ms)
  ✔ receipt missing from last line (7.087125ms)
  ✔ generated review metadata missing (15.996375ms)
  ✔ review metadata names a different phase (9.192875ms)
  ✔ artifact changed after review (21.168584ms)
  ✔ final receipt differs from generated receipt (7.953083ms)
  ✔ receipt reused by another review (11.461667ms)
  ✔ approval ledger missing (21.812208ms)
  ✔ exact receipt absent from ledger (8.207875ms)
  ✔ approver missing (10.308834ms)
  ✔ APPROVE WITH COMMENTS has no ledger comments (14.492042ms)
  ✔ REVISE blocks even with receipt proof (8.479375ms)
  ✔ REJECT blocks even with receipt proof (8.491292ms)
  ✔ DISCUSS blocks without an owner ruling (6.510792ms)
  ✔ DISCUSS still blocks after the ruling until a fresh review (6.714291ms)
✔ every gate condition fails closed when deliberately broken (274.470958ms)
✔ the approval and advancement recovery commands run exactly as printed (612.255625ms)
✔ the missing-review recovery command runs exactly as printed (464.215083ms)
✔ a phase entry remains valid only while every prior gate proof still exists on disk (46.083584ms)
✔ the repository carries the complete GPLv3-only license and Kristian's sole copyright (4.960375ms)
✔ PACKAGED NPX SUITE: a real tarball installs and runs the plain-JavaScript koda binary (2319.119208ms)
✔ RECEIPT ADVERSARIAL SUITE: an earlier review's receipt cannot approve a fresh review (50.297666ms)
✔ RECEIPT ADVERSARIAL SUITE: phase N receipt cannot approve phase N+1 (28.193ms)
✔ RECEIPT ADVERSARIAL SUITE: outer whitespace is accepted and any inner word change refuses (30.766375ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REVISE (10.794625ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REJECT (20.082167ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override DISCUSS (26.997208ms)
✔ REVIEW BINDING SUITE: changing review findings after owner acknowledgement refuses (76.819583ms)
✔ REVIEW BINDING SUITE: an untouched generated template cannot become an approved review (11.693208ms)
✔ a current review cannot be replaced before its receipt is recorded (23.3285ms)
✔ a revised artifact receives a fresh review, fresh receipt, and archived prior review (16.346417ms)
✔ DISCUSS requires the owner's ruling before a fresh definitive review (61.873542ms)
✔ REVIEWER FIXTURES: one planted defect and one honest control ship as blind Koda projects (7.27125ms)
✔ REVIEWER FIXTURES: the planted hard number is unsupported and the control has no plant (1.163334ms)
✔ REVIEWER FIXTURES: Ghostty runs pin model and effort and preserve ephemeral Codex events (1.753417ms)
✔ REVIEWER FIXTURES: the medium model matrix is backed by six graded run folders (1.773083ms)
✔ session creation requires a prompt and numbers dated folders (24.719ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-xpMeex/remote.git
 * [new branch]      main -> main
✔ a completed session is closed only after its state is committed and pushed (1010.875542ms)
✔ every Koda-C skill has valid relay sections and four-line Codex metadata (8.537625ms)
✔ skill index metadata stays concise, front-loaded, and trigger-specific (10.8885ms)
✔ producer phase skills hand only to the one shared reviewer (2.768458ms)
✔ the shared reviewer keeps all phase criteria in one place (1.5315ms)
✔ in-phase consultation is disk-backed and cannot impersonate formal review (1.791375ms)
✔ session open and close remain ceremonies outside producer phase routing (0.60225ms)
✔ STALE-REVIEW BINDING: editing the artifact after review refuses with a named re-review reason (19.707167ms)
✔ STALE-REVIEW BINDING: reviewing after an edit binds the new artifact and opens (18.217417ms)
✔ STATUS TRUTH SUITE: deleting a review is reflected immediately (244.271583ms)
✔ STATUS TRUTH SUITE: blanking an artifact is reflected immediately (236.765625ms)
✔ STATUS TRUTH SUITE: corrupt ledger metadata refuses with a named corruption reason (121.79025ms)
✔ STATUS TRUTH SUITE: editing an acknowledged review is reflected immediately (110.141125ms)
✔ STATUS TRUTH SUITE: invalid state JSON refuses instead of guessing (124.065041ms)
ℹ tests 71
ℹ suites 0
ℹ pass 71
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 2468.018042
```
