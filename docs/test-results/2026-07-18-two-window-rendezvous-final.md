# Per-test result — 2026-07-18-two-window-rendezvous-final

- Result: **FAIL**
- Recorded at: 2026-07-18T18:40:21.972Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `7456699`
- Command: `/opt/homebrew/Cellar/node/26.0.0/bin/node --test --test-reporter=spec tests/config.test.ts tests/dogfood.test.ts tests/full-lifecycle.test.ts tests/gate.test.ts tests/hints.test.ts tests/history.test.ts tests/license.test.ts tests/package.test.ts tests/receipt-adversarial.test.ts tests/relay-runner.test.ts tests/relay-window.test.ts tests/review-binding.test.ts tests/review.test.ts tests/reviewer-fixtures.test.ts tests/security.test.ts tests/session.test.ts tests/skill.test.ts tests/stale-review.test.ts tests/status-truth.test.ts tests/submission.test.ts`

Every discovered test and subtest is named below. No result is aggregated away.

```text
✔ the default phase chain is configurable data in the required order (1.08775ms)
✔ config validation rejects unsafe session paths and drifting phase names (0.177791ms)
✔ config validation refuses a sessions directory that resolves outside the project (28.225375ms)
✔ the committed dogfood snapshot contains the full native chain and an internally bound close (18.913542ms)
✔ FULL LIFECYCLE SCENARIO: clean approvals traverse all six phases and pushed close (661.257583ms)
✔ FULL LIFECYCLE SCENARIO: a REVISE loop recovers in plan before completing and closing (485.2745ms)
✔ FULL LIFECYCLE SCENARIO: DISCUSS records an owner ruling and requires a fresh live review (456.229375ms)
✔ a complete artifact, review, allowed verdict, unique receipt, and ledger proof open the gate (31.087583ms)
▶ GATE MUTATION SUITE: each core condition refuses and names itself
  ✔ artifact exists (10.407292ms)
  ✔ artifact is non-empty (9.473209ms)
  ✔ artifact is a regular file (8.51325ms)
  ✔ review exists (11.068541ms)
  ✔ review is a regular file (23.848958ms)
  ✔ approval ledger is a regular file (17.528458ms)
  ✔ verdict REVISE is blocking (8.270209ms)
  ✔ verdict REJECT is blocking (7.493375ms)
  ✔ verdict DISCUSS is blocking (31.411583ms)
  ✔ current receipt is quoted verbatim in the ledger (10.16875ms)
✔ GATE MUTATION SUITE: each core condition refuses and names itself (139.911792ms)
✔ outer receipt whitespace is ignored but inner bytes remain literal (21.345417ms)
▶ every gate condition fails closed when deliberately broken
  ✔ artifact missing (8.242292ms)
  ✔ artifact empty (21.990708ms)
  ✔ review missing (8.102041ms)
  ✔ verdict line missing (14.478959ms)
  ✔ verdict unknown (8.334ms)
  ✔ receipt missing from last line (8.886583ms)
  ✔ generated review metadata missing (9.184458ms)
  ✔ duplicate generated review metadata is ambiguous (11.390125ms)
  ✔ review metadata names a different phase (14.097458ms)
  ✔ artifact changed after review (7.8375ms)
  ✔ final receipt differs from generated receipt (11.47025ms)
  ✔ receipt reused by another review (21.213625ms)
  ✔ approval ledger missing (13.158125ms)
  ✔ exact receipt absent from ledger (14.384792ms)
  ✔ approver missing (9.110166ms)
  ✔ APPROVE WITH COMMENTS has no ledger comments (12.052958ms)
  ✔ REVISE blocks even with receipt proof (9.99625ms)
  ✔ REJECT blocks even with receipt proof (7.932208ms)
  ✔ DISCUSS blocks without an owner ruling (10.480708ms)
  ✔ DISCUSS still blocks after the ruling until a fresh review (11.6435ms)
✔ every gate condition fails closed when deliberately broken (236.382708ms)
✔ the approval and advancement recovery commands run exactly as printed (503.25975ms)
✔ the missing-review recovery command runs exactly as printed (468.611875ms)
✔ a phase entry remains valid only while every prior gate proof still exists on disk (37.473ms)
✔ the repository carries the complete GPLv3-only license and Kristian's sole copyright (18.133083ms)
✔ PACKAGED NPX SUITE: the source-controlled binary is executable before npm touches it (8.427667ms)
✔ PACKAGED NPX SUITE: the documented local npx command does not mutate its checkout (1250.78ms)
✔ PACKAGED NPX SUITE: a real tarball installs and runs the plain-JavaScript koda binary (2490.433042ms)
✔ RECEIPT ADVERSARIAL SUITE: an earlier review's receipt cannot approve a fresh review (27.778542ms)
✔ RECEIPT ADVERSARIAL SUITE: phase N receipt cannot approve phase N+1 (12.58975ms)
✔ RECEIPT ADVERSARIAL SUITE: outer whitespace is accepted and any inner word change refuses (19.358583ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REVISE (9.943167ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REJECT (9.684375ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override DISCUSS (10.907666ms)
✔ FULL RELAY RUNNER: preparation creates a clean pushed project with local skills (653.974ms)
✔ FULL RELAY RUNNER: execution preserves two contexts and never automates owner receipt proof (2.261375ms)
✔ GENUINE FULL RELAY EVIDENCE: six phases, revision recovery, distinct contexts, and pushed close (13.092583ms)
✔ TWO-WINDOW PROTOCOL: reviewer jobs are bounded and duplicate reviewer windows refuse (11.400209ms)
✔ TWO-WINDOW VISIBILITY: progress is readable without exposing review receipts (0.42325ms)
✔ TWO-WINDOW RECEIPT: exact owner quote is recorded from Window B (737.687875ms)
✔ TWO-WINDOW RECEIPT MUTATION: a wrong quote refuses and names the preserved failed job (536.551125ms)
✔ TWO-WINDOW RELAY: a pending formal-review job wakes one persistent reviewer and returns acknowledged disk evidence (792.886708ms)
✔ TWO-WINDOW SESSION: separate producer and reviewer processes rendezvous through pushed close (3166.402084ms)
✔ REVIEW BINDING SUITE: changing review findings after owner acknowledgement refuses (26.379416ms)
✔ REVIEW BINDING SUITE: an untouched generated template cannot become an approved review (17.527166ms)
✔ a current review cannot be replaced before its receipt is recorded (25.8685ms)
✔ a revised artifact receives a fresh review, fresh receipt, and archived prior review (18.530916ms)
✔ DISCUSS requires the owner's ruling before a fresh definitive review (43.140375ms)
✔ REVIEWER FIXTURES: five sealed fixtures ship as blind Koda projects (25.151292ms)
✔ REVIEWER FIXTURES: the planted hard number is unsupported and the control has no plant (1.359917ms)
✔ REVIEWER FIXTURES: inference-chain plant requires a deduction across three source files (0.792584ms)
✔ REVIEWER FIXTURES: tempting honest control is imperfect in style but its claims execute (69.056833ms)
✔ REVIEWER FIXTURES: evidence-absence trap has working code but its claimed run record is missing (72.1315ms)
✔ REVIEWER FIXTURES: new scoring contracts still match their pre-run Git seal (42.194ms)
✔ REVIEWER FIXTURES: Ghostty runs pin model and effort and preserve ephemeral Codex events (0.832708ms)
✔ REVIEWER FIXTURES: the bounded model matrix is backed by seventeen graded run folders (27.417167ms)
✔ SECURITY INTEGRITY SUITE: the install is dependency-free with no install hook (5.121667ms)
✔ SECURITY INTEGRITY SUITE: the committed repository contains no symbolic link (27.898791ms)
✔ SECURITY INTEGRITY SUITE: tracked text contains no common live credential signature (144.378375ms)
✔ session creation requires a prompt and numbers dated folders (26.206333ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-sDknhz/remote.git
 * [new branch]      main -> main
✔ a completed session is closed only after its state is committed and pushed (1285.554958ms)
✔ immutable close refuses symbolic links inside session evidence (5.060917ms)
✔ immutable close refuses duplicate generated metadata markers (0.086666ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-ignored-remote-UgNc4Z/remote.git
 * [new branch]      main -> main
✔ immutable close refuses a bound session file that Git ignored instead of pushing (216.858417ms)
✔ every Koda-C skill has valid relay sections and four-line Codex metadata (7.72225ms)
✔ skill index metadata stays concise, front-loaded, and trigger-specific (9.818709ms)
✔ producer phase skills hand only to the one shared reviewer (1.528917ms)
✔ the shared reviewer keeps all phase criteria in one place (1.249042ms)
✔ in-phase consultation is disk-backed and cannot impersonate formal review (2.759625ms)
✔ session open and close remain ceremonies outside producer phase routing (0.637291ms)
✔ fresh Codex startup discovers all nine local skills and root guidance without reading disk (0.934875ms)
✔ STALE-REVIEW BINDING: editing the artifact after review refuses with a named re-review reason (20.881709ms)
✔ STALE-REVIEW BINDING: reviewing after an edit binds the new artifact and opens (12.713334ms)
✔ STATUS TRUTH SUITE: deleting a review is reflected immediately (258.529875ms)
✔ STATUS TRUTH SUITE: blanking an artifact is reflected immediately (196.718333ms)
✔ STATUS TRUTH SUITE: corrupt ledger metadata refuses with a named corruption reason (106.729584ms)
✔ STATUS TRUTH SUITE: editing an acknowledged review is reflected immediately (117.681417ms)
✔ STATUS TRUTH SUITE: invalid state JSON refuses instead of guessing (100.761917ms)
✔ STATUS TRUTH SUITE: a path-like phase name in state refuses instead of escaping (101.098416ms)
✔ JUDGE JOURNEY SUITE: the committed binary runs without rebuilding (70.869333ms)
✔ JUDGE JOURNEY SUITE: video and submission documents preserve every live rule (3.23ms)
✖ JUDGE JOURNEY SUITE: local links in the judge documents resolve (7.036209ms)
ℹ tests 102
ℹ suites 0
ℹ pass 101
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 5534.990333

✖ failing tests:

test at tests/submission.test.ts:38:1
✖ JUDGE JOURNEY SUITE: local links in the judge documents resolve (7.036209ms)
  AssertionError [ERR_ASSERTION]: Broken local judge links:
  docs/README.md -> test-results/2026-07-18-two-window-rendezvous-final.md
  + actual - expected

  + [
  +   'docs/README.md -> test-results/2026-07-18-two-window-rendezvous-final.md'
  + ]
  - []

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/submission.test.ts:58:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: false,
    code: 'ERR_ASSERTION',
    actual: [ 'docs/README.md -> test-results/2026-07-18-two-window-rendezvous-final.md' ],
    expected: [],
    operator: 'deepStrictEqual',
    diff: 'simple'
  }
```
