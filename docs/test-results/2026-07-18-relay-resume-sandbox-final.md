# Per-test result — 2026-07-18-relay-resume-sandbox-final

- Result: **PASS**
- Recorded at: 2026-07-18T16:03:02.577Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `97c5287`
- Command: `/opt/homebrew/Cellar/node/26.0.0/bin/node --test --test-reporter=spec tests/config.test.ts tests/dogfood.test.ts tests/full-lifecycle.test.ts tests/gate.test.ts tests/hints.test.ts tests/history.test.ts tests/license.test.ts tests/package.test.ts tests/receipt-adversarial.test.ts tests/relay-runner.test.ts tests/review-binding.test.ts tests/review.test.ts tests/reviewer-fixtures.test.ts tests/session.test.ts tests/skill.test.ts tests/stale-review.test.ts tests/status-truth.test.ts`

Every discovered test and subtest is named below. No result is aggregated away.

```text
✔ the default phase chain is configurable data in the required order (2.023375ms)
✔ config validation rejects unsafe session paths and drifting phase names (0.267583ms)
✔ the committed dogfood snapshot contains the full native chain and an internally bound close (23.94875ms)
✔ FULL LIFECYCLE SCENARIO: clean approvals traverse all six phases and pushed close (480.673167ms)
✔ FULL LIFECYCLE SCENARIO: a REVISE loop recovers in plan before completing and closing (357.903375ms)
✔ FULL LIFECYCLE SCENARIO: DISCUSS records an owner ruling and requires a fresh live review (313.009625ms)
✔ a complete artifact, review, allowed verdict, unique receipt, and ledger proof open the gate (46.000667ms)
▶ GATE MUTATION SUITE: each core condition refuses and names itself
  ✔ artifact exists (12.138416ms)
  ✔ artifact is non-empty (8.81875ms)
  ✔ review exists (7.484833ms)
  ✔ verdict REVISE is blocking (9.947ms)
  ✔ verdict REJECT is blocking (13.462208ms)
  ✔ verdict DISCUSS is blocking (10.851125ms)
  ✔ current receipt is quoted verbatim in the ledger (10.23875ms)
✔ GATE MUTATION SUITE: each core condition refuses and names itself (74.168583ms)
✔ outer receipt whitespace is ignored but inner bytes remain literal (17.9ms)
▶ every gate condition fails closed when deliberately broken
  ✔ artifact missing (9.2075ms)
  ✔ artifact empty (7.73725ms)
  ✔ review missing (24.86925ms)
  ✔ verdict line missing (19.09225ms)
  ✔ verdict unknown (13.719041ms)
  ✔ receipt missing from last line (10.686625ms)
  ✔ generated review metadata missing (9.676416ms)
  ✔ review metadata names a different phase (32.371875ms)
  ✔ artifact changed after review (28.587458ms)
  ✔ final receipt differs from generated receipt (12.960708ms)
  ✔ receipt reused by another review (8.802625ms)
  ✔ approval ledger missing (12.957625ms)
  ✔ exact receipt absent from ledger (8.665417ms)
  ✔ approver missing (9.16375ms)
  ✔ APPROVE WITH COMMENTS has no ledger comments (9.427416ms)
  ✔ REVISE blocks even with receipt proof (7.131ms)
  ✔ REJECT blocks even with receipt proof (7.091917ms)
  ✔ DISCUSS blocks without an owner ruling (7.915ms)
  ✔ DISCUSS still blocks after the ruling until a fresh review (14.347584ms)
✔ every gate condition fails closed when deliberately broken (257.319417ms)
✔ the approval and advancement recovery commands run exactly as printed (582.99025ms)
✔ the missing-review recovery command runs exactly as printed (448.512375ms)
✔ a phase entry remains valid only while every prior gate proof still exists on disk (51.949667ms)
✔ the repository carries the complete GPLv3-only license and Kristian's sole copyright (16.66125ms)
✔ PACKAGED NPX SUITE: a real tarball installs and runs the plain-JavaScript koda binary (2458.397625ms)
✔ RECEIPT ADVERSARIAL SUITE: an earlier review's receipt cannot approve a fresh review (41.965042ms)
✔ RECEIPT ADVERSARIAL SUITE: phase N receipt cannot approve phase N+1 (13.023666ms)
✔ RECEIPT ADVERSARIAL SUITE: outer whitespace is accepted and any inner word change refuses (17.819583ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REVISE (11.324125ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REJECT (13.263ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override DISCUSS (10.828958ms)
✔ FULL RELAY RUNNER: preparation creates a clean pushed project with local skills (551.579125ms)
✔ FULL RELAY RUNNER: execution preserves two contexts and never automates owner receipt proof (0.809625ms)
✔ REVIEW BINDING SUITE: changing review findings after owner acknowledgement refuses (34.159833ms)
✔ REVIEW BINDING SUITE: an untouched generated template cannot become an approved review (11.359ms)
✔ a current review cannot be replaced before its receipt is recorded (21.970459ms)
✔ a revised artifact receives a fresh review, fresh receipt, and archived prior review (12.630208ms)
✔ DISCUSS requires the owner's ruling before a fresh definitive review (55.46825ms)
✔ REVIEWER FIXTURES: five sealed fixtures ship as blind Koda projects (37.6925ms)
✔ REVIEWER FIXTURES: the planted hard number is unsupported and the control has no plant (1.386041ms)
✔ REVIEWER FIXTURES: inference-chain plant requires a deduction across three source files (0.838875ms)
✔ REVIEWER FIXTURES: tempting honest control is imperfect in style but its claims execute (82.327417ms)
✔ REVIEWER FIXTURES: evidence-absence trap has working code but its claimed run record is missing (84.089292ms)
✔ REVIEWER FIXTURES: new scoring contracts still match their pre-run Git seal (61.698083ms)
✔ REVIEWER FIXTURES: Ghostty runs pin model and effort and preserve ephemeral Codex events (0.782834ms)
✔ REVIEWER FIXTURES: the medium model matrix is backed by six graded run folders (2.045833ms)
✔ session creation requires a prompt and numbers dated folders (33.289458ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-qXPkst/remote.git
 * [new branch]      main -> main
✔ a completed session is closed only after its state is committed and pushed (1025.215ms)
✔ every Koda-C skill has valid relay sections and four-line Codex metadata (16.4065ms)
✔ skill index metadata stays concise, front-loaded, and trigger-specific (4.148583ms)
✔ producer phase skills hand only to the one shared reviewer (2.33575ms)
✔ the shared reviewer keeps all phase criteria in one place (2.612416ms)
✔ in-phase consultation is disk-backed and cannot impersonate formal review (2.688916ms)
✔ session open and close remain ceremonies outside producer phase routing (2.332084ms)
✔ STALE-REVIEW BINDING: editing the artifact after review refuses with a named re-review reason (19.29425ms)
✔ STALE-REVIEW BINDING: reviewing after an edit binds the new artifact and opens (11.552666ms)
✔ STATUS TRUTH SUITE: deleting a review is reflected immediately (252.390417ms)
✔ STATUS TRUTH SUITE: blanking an artifact is reflected immediately (224.445667ms)
✔ STATUS TRUTH SUITE: corrupt ledger metadata refuses with a named corruption reason (112.113708ms)
✔ STATUS TRUTH SUITE: editing an acknowledged review is reflected immediately (115.188292ms)
✔ STATUS TRUTH SUITE: invalid state JSON refuses instead of guessing (103.384958ms)
ℹ tests 77
ℹ suites 0
ℹ pass 77
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 2627.714917
```
