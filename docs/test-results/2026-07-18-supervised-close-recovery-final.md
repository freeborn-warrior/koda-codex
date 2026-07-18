# Per-test result — 2026-07-18-supervised-close-recovery-final

- Result: **PASS**
- Recorded at: 2026-07-18T16:43:02.476Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `a609deb`
- Command: `/opt/homebrew/Cellar/node/26.0.0/bin/node --test --test-reporter=spec tests/config.test.ts tests/dogfood.test.ts tests/full-lifecycle.test.ts tests/gate.test.ts tests/hints.test.ts tests/history.test.ts tests/license.test.ts tests/package.test.ts tests/receipt-adversarial.test.ts tests/relay-runner.test.ts tests/review-binding.test.ts tests/review.test.ts tests/reviewer-fixtures.test.ts tests/session.test.ts tests/skill.test.ts tests/stale-review.test.ts tests/status-truth.test.ts`

Every discovered test and subtest is named below. No result is aggregated away.

```text
✔ the default phase chain is configurable data in the required order (2.278667ms)
✔ config validation rejects unsafe session paths and drifting phase names (0.39375ms)
✔ the committed dogfood snapshot contains the full native chain and an internally bound close (23.828ms)
✔ FULL LIFECYCLE SCENARIO: clean approvals traverse all six phases and pushed close (529.173292ms)
✔ FULL LIFECYCLE SCENARIO: a REVISE loop recovers in plan before completing and closing (396.513459ms)
✔ FULL LIFECYCLE SCENARIO: DISCUSS records an owner ruling and requires a fresh live review (333.152917ms)
✔ a complete artifact, review, allowed verdict, unique receipt, and ledger proof open the gate (33.79225ms)
▶ GATE MUTATION SUITE: each core condition refuses and names itself
  ✔ artifact exists (10.186ms)
  ✔ artifact is non-empty (10.027625ms)
  ✔ review exists (7.216ms)
  ✔ verdict REVISE is blocking (11.333792ms)
  ✔ verdict REJECT is blocking (11.700833ms)
  ✔ verdict DISCUSS is blocking (11.323625ms)
  ✔ current receipt is quoted verbatim in the ledger (11.703125ms)
✔ GATE MUTATION SUITE: each core condition refuses and names itself (75.072459ms)
✔ outer receipt whitespace is ignored but inner bytes remain literal (82.439125ms)
▶ every gate condition fails closed when deliberately broken
  ✔ artifact missing (19.80625ms)
  ✔ artifact empty (42.903791ms)
  ✔ review missing (14.229917ms)
  ✔ verdict line missing (12.365458ms)
  ✔ verdict unknown (12.936792ms)
  ✔ receipt missing from last line (12.851333ms)
  ✔ generated review metadata missing (8.058291ms)
  ✔ review metadata names a different phase (13.428208ms)
  ✔ artifact changed after review (18.519375ms)
  ✔ final receipt differs from generated receipt (16.014834ms)
  ✔ receipt reused by another review (21.330416ms)
  ✔ approval ledger missing (22.63225ms)
  ✔ exact receipt absent from ledger (15.232459ms)
  ✔ approver missing (17.138792ms)
  ✔ APPROVE WITH COMMENTS has no ledger comments (18.622709ms)
  ✔ REVISE blocks even with receipt proof (10.5165ms)
  ✔ REJECT blocks even with receipt proof (18.722208ms)
  ✔ DISCUSS blocks without an owner ruling (10.4565ms)
  ✔ DISCUSS still blocks after the ruling until a fresh review (8.251417ms)
✔ every gate condition fails closed when deliberately broken (317.166625ms)
✔ the approval and advancement recovery commands run exactly as printed (639.165083ms)
✔ the missing-review recovery command runs exactly as printed (489.213458ms)
✔ a phase entry remains valid only while every prior gate proof still exists on disk (34.104375ms)
✔ the repository carries the complete GPLv3-only license and Kristian's sole copyright (18.586292ms)
✔ PACKAGED NPX SUITE: a real tarball installs and runs the plain-JavaScript koda binary (2735.017042ms)
✔ RECEIPT ADVERSARIAL SUITE: an earlier review's receipt cannot approve a fresh review (39.665417ms)
✔ RECEIPT ADVERSARIAL SUITE: phase N receipt cannot approve phase N+1 (15.938084ms)
✔ RECEIPT ADVERSARIAL SUITE: outer whitespace is accepted and any inner word change refuses (19.73875ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REVISE (9.344041ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REJECT (12.389291ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override DISCUSS (10.343708ms)
✔ FULL RELAY RUNNER: preparation creates a clean pushed project with local skills (699.273084ms)
✔ FULL RELAY RUNNER: execution preserves two contexts and never automates owner receipt proof (0.7945ms)
✔ REVIEW BINDING SUITE: changing review findings after owner acknowledgement refuses (27.154875ms)
✔ REVIEW BINDING SUITE: an untouched generated template cannot become an approved review (11.690458ms)
✔ a current review cannot be replaced before its receipt is recorded (18.662792ms)
✔ a revised artifact receives a fresh review, fresh receipt, and archived prior review (12.012459ms)
✔ DISCUSS requires the owner's ruling before a fresh definitive review (18.77125ms)
✔ REVIEWER FIXTURES: five sealed fixtures ship as blind Koda projects (30.169459ms)
✔ REVIEWER FIXTURES: the planted hard number is unsupported and the control has no plant (1.295083ms)
✔ REVIEWER FIXTURES: inference-chain plant requires a deduction across three source files (0.748167ms)
✔ REVIEWER FIXTURES: tempting honest control is imperfect in style but its claims execute (112.071042ms)
✔ REVIEWER FIXTURES: evidence-absence trap has working code but its claimed run record is missing (92.728959ms)
✔ REVIEWER FIXTURES: new scoring contracts still match their pre-run Git seal (66.4765ms)
✔ REVIEWER FIXTURES: Ghostty runs pin model and effort and preserve ephemeral Codex events (1.997875ms)
✔ REVIEWER FIXTURES: the medium model matrix is backed by six graded run folders (5.141833ms)
✔ session creation requires a prompt and numbers dated folders (18.851958ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-uc2mDi/remote.git
 * [new branch]      main -> main
✔ a completed session is closed only after its state is committed and pushed (1110.652792ms)
✔ every Koda-C skill has valid relay sections and four-line Codex metadata (7.30425ms)
✔ skill index metadata stays concise, front-loaded, and trigger-specific (6.005209ms)
✔ producer phase skills hand only to the one shared reviewer (6.516708ms)
✔ the shared reviewer keeps all phase criteria in one place (4.869083ms)
✔ in-phase consultation is disk-backed and cannot impersonate formal review (2.948416ms)
✔ session open and close remain ceremonies outside producer phase routing (0.862875ms)
✔ STALE-REVIEW BINDING: editing the artifact after review refuses with a named re-review reason (20.413458ms)
✔ STALE-REVIEW BINDING: reviewing after an edit binds the new artifact and opens (18.375333ms)
✔ STATUS TRUTH SUITE: deleting a review is reflected immediately (281.039625ms)
✔ STATUS TRUTH SUITE: blanking an artifact is reflected immediately (257.794458ms)
✔ STATUS TRUTH SUITE: corrupt ledger metadata refuses with a named corruption reason (122.749166ms)
✔ STATUS TRUTH SUITE: editing an acknowledged review is reflected immediately (110.332042ms)
✔ STATUS TRUTH SUITE: invalid state JSON refuses instead of guessing (107.798833ms)
ℹ tests 77
ℹ suites 0
ℹ pass 77
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 2910.116
```
