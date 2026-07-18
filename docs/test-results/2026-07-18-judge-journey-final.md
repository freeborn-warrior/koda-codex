# Per-test result — 2026-07-18-judge-journey-final

- Result: **FAIL**
- Recorded at: 2026-07-18T18:11:05.863Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `3642334`
- Command: `/opt/homebrew/Cellar/node/26.0.0/bin/node --test --test-reporter=spec tests/config.test.ts tests/dogfood.test.ts tests/full-lifecycle.test.ts tests/gate.test.ts tests/hints.test.ts tests/history.test.ts tests/license.test.ts tests/package.test.ts tests/receipt-adversarial.test.ts tests/relay-runner.test.ts tests/review-binding.test.ts tests/review.test.ts tests/reviewer-fixtures.test.ts tests/security.test.ts tests/session.test.ts tests/skill.test.ts tests/stale-review.test.ts tests/status-truth.test.ts tests/submission.test.ts`

Every discovered test and subtest is named below. No result is aggregated away.

```text
✔ the default phase chain is configurable data in the required order (1.092625ms)
✔ config validation rejects unsafe session paths and drifting phase names (0.193958ms)
✔ config validation refuses a sessions directory that resolves outside the project (12.418375ms)
✔ the committed dogfood snapshot contains the full native chain and an internally bound close (28.6095ms)
✔ FULL LIFECYCLE SCENARIO: clean approvals traverse all six phases and pushed close (603.648125ms)
✔ FULL LIFECYCLE SCENARIO: a REVISE loop recovers in plan before completing and closing (449.274417ms)
✔ FULL LIFECYCLE SCENARIO: DISCUSS records an owner ruling and requires a fresh live review (358.9285ms)
✔ a complete artifact, review, allowed verdict, unique receipt, and ledger proof open the gate (25.189625ms)
▶ GATE MUTATION SUITE: each core condition refuses and names itself
  ✔ artifact exists (11.635709ms)
  ✔ artifact is non-empty (7.9675ms)
  ✔ artifact is a regular file (12.465875ms)
  ✔ review exists (11.336ms)
  ✔ review is a regular file (8.984875ms)
  ✔ approval ledger is a regular file (9.122959ms)
  ✔ verdict REVISE is blocking (8.1475ms)
  ✔ verdict REJECT is blocking (8.136584ms)
  ✔ verdict DISCUSS is blocking (7.628ms)
  ✔ current receipt is quoted verbatim in the ledger (13.742542ms)
✔ GATE MUTATION SUITE: each core condition refuses and names itself (100.824833ms)
✔ outer receipt whitespace is ignored but inner bytes remain literal (21.37325ms)
▶ every gate condition fails closed when deliberately broken
  ✔ artifact missing (13.279583ms)
  ✔ artifact empty (10.294375ms)
  ✔ review missing (9.219875ms)
  ✔ verdict line missing (9.548917ms)
  ✔ verdict unknown (7.743209ms)
  ✔ receipt missing from last line (12.062958ms)
  ✔ generated review metadata missing (7.5895ms)
  ✔ duplicate generated review metadata is ambiguous (10.993625ms)
  ✔ review metadata names a different phase (18.280625ms)
  ✔ artifact changed after review (32.531166ms)
  ✔ final receipt differs from generated receipt (12.515417ms)
  ✔ receipt reused by another review (34.065167ms)
  ✔ approval ledger missing (18.00075ms)
  ✔ exact receipt absent from ledger (15.489ms)
  ✔ approver missing (9.350709ms)
  ✔ APPROVE WITH COMMENTS has no ledger comments (10.353417ms)
  ✔ REVISE blocks even with receipt proof (9.694709ms)
  ✔ REJECT blocks even with receipt proof (9.96925ms)
  ✔ DISCUSS blocks without an owner ruling (9.264875ms)
  ✔ DISCUSS still blocks after the ruling until a fresh review (9.67375ms)
✔ every gate condition fails closed when deliberately broken (272.924584ms)
✔ the approval and advancement recovery commands run exactly as printed (539.621333ms)
✔ the missing-review recovery command runs exactly as printed (384.130542ms)
✔ a phase entry remains valid only while every prior gate proof still exists on disk (34.221916ms)
✔ the repository carries the complete GPLv3-only license and Kristian's sole copyright (25.197042ms)
✔ PACKAGED NPX SUITE: the source-controlled binary is executable before npm touches it (12.343958ms)
✔ PACKAGED NPX SUITE: the documented local npx command does not mutate its checkout (1009.77825ms)
✔ PACKAGED NPX SUITE: a real tarball installs and runs the plain-JavaScript koda binary (2358.672417ms)
✔ RECEIPT ADVERSARIAL SUITE: an earlier review's receipt cannot approve a fresh review (27.022875ms)
✔ RECEIPT ADVERSARIAL SUITE: phase N receipt cannot approve phase N+1 (15.258125ms)
✔ RECEIPT ADVERSARIAL SUITE: outer whitespace is accepted and any inner word change refuses (20.461542ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REVISE (17.289084ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REJECT (12.036458ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override DISCUSS (13.189625ms)
✔ FULL RELAY RUNNER: preparation creates a clean pushed project with local skills (576.012791ms)
✔ FULL RELAY RUNNER: execution preserves two contexts and never automates owner receipt proof (1.569375ms)
✔ GENUINE FULL RELAY EVIDENCE: six phases, revision recovery, distinct contexts, and pushed close (13.407834ms)
✔ REVIEW BINDING SUITE: changing review findings after owner acknowledgement refuses (28.076ms)
✔ REVIEW BINDING SUITE: an untouched generated template cannot become an approved review (13.823875ms)
✔ a current review cannot be replaced before its receipt is recorded (21.649458ms)
✔ a revised artifact receives a fresh review, fresh receipt, and archived prior review (11.754375ms)
✔ DISCUSS requires the owner's ruling before a fresh definitive review (18.66925ms)
✔ REVIEWER FIXTURES: five sealed fixtures ship as blind Koda projects (27.864416ms)
✔ REVIEWER FIXTURES: the planted hard number is unsupported and the control has no plant (0.92175ms)
✔ REVIEWER FIXTURES: inference-chain plant requires a deduction across three source files (1.299709ms)
✔ REVIEWER FIXTURES: tempting honest control is imperfect in style but its claims execute (65.553625ms)
✔ REVIEWER FIXTURES: evidence-absence trap has working code but its claimed run record is missing (83.391417ms)
✔ REVIEWER FIXTURES: new scoring contracts still match their pre-run Git seal (42.131917ms)
✔ REVIEWER FIXTURES: Ghostty runs pin model and effort and preserve ephemeral Codex events (0.786875ms)
✔ REVIEWER FIXTURES: the bounded model matrix is backed by seventeen graded run folders (37.372375ms)
✔ SECURITY INTEGRITY SUITE: the install is dependency-free with no install hook (4.168ms)
✔ SECURITY INTEGRITY SUITE: the committed repository contains no symbolic link (16.899125ms)
✔ SECURITY INTEGRITY SUITE: tracked text contains no common live credential signature (142.580875ms)
✔ session creation requires a prompt and numbers dated folders (13.965416ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-WL1x4x/remote.git
 * [new branch]      main -> main
✔ a completed session is closed only after its state is committed and pushed (1153.670083ms)
✔ immutable close refuses symbolic links inside session evidence (4.790708ms)
✔ immutable close refuses duplicate generated metadata markers (0.085417ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-ignored-remote-jXEsG6/remote.git
 * [new branch]      main -> main
✔ immutable close refuses a bound session file that Git ignored instead of pushing (212.507875ms)
✔ every Koda-C skill has valid relay sections and four-line Codex metadata (6.516708ms)
✔ skill index metadata stays concise, front-loaded, and trigger-specific (4.56425ms)
✔ producer phase skills hand only to the one shared reviewer (2.327417ms)
✔ the shared reviewer keeps all phase criteria in one place (3.015417ms)
✔ in-phase consultation is disk-backed and cannot impersonate formal review (2.463459ms)
✔ session open and close remain ceremonies outside producer phase routing (0.446208ms)
✔ fresh Codex startup discovers all nine local skills and root guidance without reading disk (1.791125ms)
✔ STALE-REVIEW BINDING: editing the artifact after review refuses with a named re-review reason (19.135625ms)
✔ STALE-REVIEW BINDING: reviewing after an edit binds the new artifact and opens (14.233833ms)
✔ STATUS TRUTH SUITE: deleting a review is reflected immediately (232.84175ms)
✔ STATUS TRUTH SUITE: blanking an artifact is reflected immediately (188.868125ms)
✔ STATUS TRUTH SUITE: corrupt ledger metadata refuses with a named corruption reason (109.082375ms)
✔ STATUS TRUTH SUITE: editing an acknowledged review is reflected immediately (94.484625ms)
✔ STATUS TRUTH SUITE: invalid state JSON refuses instead of guessing (90.562417ms)
✔ STATUS TRUTH SUITE: a path-like phase name in state refuses instead of escaping (90.08775ms)
✔ JUDGE JOURNEY SUITE: the committed binary runs without rebuilding (63.920458ms)
✔ JUDGE JOURNEY SUITE: video and submission documents preserve every live rule (2.034625ms)
✖ JUDGE JOURNEY SUITE: local links in the judge documents resolve (4.271875ms)
ℹ tests 96
ℹ suites 0
ℹ pass 95
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 3517.848125

✖ failing tests:

test at tests/submission.test.ts:38:1
✖ JUDGE JOURNEY SUITE: local links in the judge documents resolve (4.271875ms)
  AssertionError [ERR_ASSERTION]: Broken local judge links:
  docs/README.md -> test-results/2026-07-18-judge-journey-final.md
  + actual - expected

  + [
  +   'docs/README.md -> test-results/2026-07-18-judge-journey-final.md'
  + ]
  - []

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/submission.test.ts:58:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: false,
    code: 'ERR_ASSERTION',
    actual: [ 'docs/README.md -> test-results/2026-07-18-judge-journey-final.md' ],
    expected: [],
    operator: 'deepStrictEqual',
    diff: 'simple'
  }
```
