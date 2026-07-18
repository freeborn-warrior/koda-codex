# Per-test result — 2026-07-18-ghostty-guide-final

- Result: **PASS**
- Recorded at: 2026-07-18T15:56:19.972Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `b452d7c`
- Command: `/opt/homebrew/Cellar/node/26.0.0/bin/node --test --test-reporter=spec tests/config.test.ts tests/dogfood.test.ts tests/full-lifecycle.test.ts tests/gate.test.ts tests/hints.test.ts tests/history.test.ts tests/license.test.ts tests/package.test.ts tests/receipt-adversarial.test.ts tests/relay-runner.test.ts tests/review-binding.test.ts tests/review.test.ts tests/reviewer-fixtures.test.ts tests/session.test.ts tests/skill.test.ts tests/stale-review.test.ts tests/status-truth.test.ts`

Every discovered test and subtest is named below. No result is aggregated away.

```text
✔ the default phase chain is configurable data in the required order (1.336417ms)
✔ config validation rejects unsafe session paths and drifting phase names (0.231791ms)
✔ the committed dogfood snapshot contains the full native chain and an internally bound close (36.16225ms)
✔ FULL LIFECYCLE SCENARIO: clean approvals traverse all six phases and pushed close (551.871416ms)
✔ FULL LIFECYCLE SCENARIO: a REVISE loop recovers in plan before completing and closing (413.574834ms)
✔ FULL LIFECYCLE SCENARIO: DISCUSS records an owner ruling and requires a fresh live review (342.014042ms)
✔ a complete artifact, review, allowed verdict, unique receipt, and ledger proof open the gate (30.85175ms)
▶ GATE MUTATION SUITE: each core condition refuses and names itself
  ✔ artifact exists (14.728584ms)
  ✔ artifact is non-empty (12.067458ms)
  ✔ review exists (9.914209ms)
  ✔ verdict REVISE is blocking (13.801417ms)
  ✔ verdict REJECT is blocking (12.816042ms)
  ✔ verdict DISCUSS is blocking (21.187959ms)
  ✔ current receipt is quoted verbatim in the ledger (16.318833ms)
✔ GATE MUTATION SUITE: each core condition refuses and names itself (102.422583ms)
✔ outer receipt whitespace is ignored but inner bytes remain literal (34.990583ms)
▶ every gate condition fails closed when deliberately broken
  ✔ artifact missing (19.357959ms)
  ✔ artifact empty (23.8955ms)
  ✔ review missing (16.717167ms)
  ✔ verdict line missing (14.101375ms)
  ✔ verdict unknown (27.058167ms)
  ✔ receipt missing from last line (23.667708ms)
  ✔ generated review metadata missing (11.215125ms)
  ✔ review metadata names a different phase (23.36225ms)
  ✔ artifact changed after review (15.115875ms)
  ✔ final receipt differs from generated receipt (6.946375ms)
  ✔ receipt reused by another review (14.118541ms)
  ✔ approval ledger missing (12.440916ms)
  ✔ exact receipt absent from ledger (9.550292ms)
  ✔ approver missing (9.646584ms)
  ✔ APPROVE WITH COMMENTS has no ledger comments (26.277458ms)
  ✔ REVISE blocks even with receipt proof (14.566209ms)
  ✔ REJECT blocks even with receipt proof (12.820083ms)
  ✔ DISCUSS blocks without an owner ruling (11.583709ms)
  ✔ DISCUSS still blocks after the ruling until a fresh review (9.608541ms)
✔ every gate condition fails closed when deliberately broken (304.65975ms)
✔ the approval and advancement recovery commands run exactly as printed (603.458375ms)
✔ the missing-review recovery command runs exactly as printed (517.400792ms)
✔ a phase entry remains valid only while every prior gate proof still exists on disk (23.791833ms)
✔ the repository carries the complete GPLv3-only license and Kristian's sole copyright (4.37375ms)
✔ PACKAGED NPX SUITE: a real tarball installs and runs the plain-JavaScript koda binary (2558.130459ms)
✔ RECEIPT ADVERSARIAL SUITE: an earlier review's receipt cannot approve a fresh review (26.926ms)
✔ RECEIPT ADVERSARIAL SUITE: phase N receipt cannot approve phase N+1 (14.208041ms)
✔ RECEIPT ADVERSARIAL SUITE: outer whitespace is accepted and any inner word change refuses (38.360167ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REVISE (19.119166ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REJECT (21.332916ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override DISCUSS (23.29975ms)
✔ FULL RELAY RUNNER: preparation creates a clean pushed project with local skills (627.832916ms)
✔ FULL RELAY RUNNER: execution preserves two contexts and never automates owner receipt proof (1.018417ms)
✔ REVIEW BINDING SUITE: changing review findings after owner acknowledgement refuses (31.464833ms)
✔ REVIEW BINDING SUITE: an untouched generated template cannot become an approved review (24.571ms)
✔ a current review cannot be replaced before its receipt is recorded (23.683292ms)
✔ a revised artifact receives a fresh review, fresh receipt, and archived prior review (23.140791ms)
✔ DISCUSS requires the owner's ruling before a fresh definitive review (36.763916ms)
✔ REVIEWER FIXTURES: five sealed fixtures ship as blind Koda projects (52.462041ms)
✔ REVIEWER FIXTURES: the planted hard number is unsupported and the control has no plant (1.613125ms)
✔ REVIEWER FIXTURES: inference-chain plant requires a deduction across three source files (0.734083ms)
✔ REVIEWER FIXTURES: tempting honest control is imperfect in style but its claims execute (82.752291ms)
✔ REVIEWER FIXTURES: evidence-absence trap has working code but its claimed run record is missing (108.188042ms)
✔ REVIEWER FIXTURES: new scoring contracts still match their pre-run Git seal (54.916834ms)
✔ REVIEWER FIXTURES: Ghostty runs pin model and effort and preserve ephemeral Codex events (0.8775ms)
✔ REVIEWER FIXTURES: the medium model matrix is backed by six graded run folders (2.84475ms)
✔ session creation requires a prompt and numbers dated folders (14.611209ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-y48Mmb/remote.git
 * [new branch]      main -> main
✔ a completed session is closed only after its state is committed and pushed (1103.543042ms)
✔ every Koda-C skill has valid relay sections and four-line Codex metadata (11.413292ms)
✔ skill index metadata stays concise, front-loaded, and trigger-specific (4.940583ms)
✔ producer phase skills hand only to the one shared reviewer (1.732458ms)
✔ the shared reviewer keeps all phase criteria in one place (1.674792ms)
✔ in-phase consultation is disk-backed and cannot impersonate formal review (3.051083ms)
✔ session open and close remain ceremonies outside producer phase routing (0.648625ms)
✔ STALE-REVIEW BINDING: editing the artifact after review refuses with a named re-review reason (24.135375ms)
✔ STALE-REVIEW BINDING: reviewing after an edit binds the new artifact and opens (19.645667ms)
✔ STATUS TRUTH SUITE: deleting a review is reflected immediately (286.846875ms)
✔ STATUS TRUTH SUITE: blanking an artifact is reflected immediately (259.133875ms)
✔ STATUS TRUTH SUITE: corrupt ledger metadata refuses with a named corruption reason (115.008917ms)
✔ STATUS TRUTH SUITE: editing an acknowledged review is reflected immediately (120.224167ms)
✔ STATUS TRUTH SUITE: invalid state JSON refuses instead of guessing (116.429333ms)
ℹ tests 77
ℹ suites 0
ℹ pass 77
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 2735.903792
```
