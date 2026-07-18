# Per-test result — 2026-07-18-one-command-owner-review-final

- Result: **FAIL**
- Recorded at: 2026-07-18T16:20:42.113Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `2cd465d`
- Command: `/opt/homebrew/Cellar/node/26.0.0/bin/node --test --test-reporter=spec tests/config.test.ts tests/dogfood.test.ts tests/full-lifecycle.test.ts tests/gate.test.ts tests/hints.test.ts tests/history.test.ts tests/license.test.ts tests/package.test.ts tests/receipt-adversarial.test.ts tests/relay-runner.test.ts tests/review-binding.test.ts tests/review.test.ts tests/reviewer-fixtures.test.ts tests/session.test.ts tests/skill.test.ts tests/stale-review.test.ts tests/status-truth.test.ts`

Every discovered test and subtest is named below. No result is aggregated away.

```text
✔ the default phase chain is configurable data in the required order (22.113167ms)
✔ config validation rejects unsafe session paths and drifting phase names (0.631042ms)
✔ the committed dogfood snapshot contains the full native chain and an internally bound close (62.743958ms)
✔ FULL LIFECYCLE SCENARIO: clean approvals traverse all six phases and pushed close (516.893916ms)
✔ FULL LIFECYCLE SCENARIO: a REVISE loop recovers in plan before completing and closing (367.584458ms)
✔ FULL LIFECYCLE SCENARIO: DISCUSS records an owner ruling and requires a fresh live review (305.485792ms)
✔ a complete artifact, review, allowed verdict, unique receipt, and ledger proof open the gate (34.494375ms)
▶ GATE MUTATION SUITE: each core condition refuses and names itself
  ✔ artifact exists (14.860417ms)
  ✔ artifact is non-empty (10.535875ms)
  ✔ review exists (7.021292ms)
  ✔ verdict REVISE is blocking (19.684ms)
  ✔ verdict REJECT is blocking (17.008583ms)
  ✔ verdict DISCUSS is blocking (11.761583ms)
  ✔ current receipt is quoted verbatim in the ledger (22.097208ms)
✔ GATE MUTATION SUITE: each core condition refuses and names itself (104.814417ms)
✔ outer receipt whitespace is ignored but inner bytes remain literal (35.558875ms)
▶ every gate condition fails closed when deliberately broken
  ✔ artifact missing (12.246958ms)
  ✔ artifact empty (20.725791ms)
  ✔ review missing (15.562583ms)
  ✔ verdict line missing (32.392417ms)
  ✔ verdict unknown (20.457833ms)
  ✔ receipt missing from last line (13.175583ms)
  ✔ generated review metadata missing (9.092917ms)
  ✔ review metadata names a different phase (9.178125ms)
  ✔ artifact changed after review (11.015ms)
  ✔ final receipt differs from generated receipt (10.45825ms)
  ✔ receipt reused by another review (10.982125ms)
  ✔ approval ledger missing (7.565875ms)
  ✔ exact receipt absent from ledger (8.432084ms)
  ✔ approver missing (36.148667ms)
  ✔ APPROVE WITH COMMENTS has no ledger comments (14.700583ms)
  ✔ REVISE blocks even with receipt proof (11.206042ms)
  ✔ REJECT blocks even with receipt proof (11.296292ms)
  ✔ DISCUSS blocks without an owner ruling (6.842ms)
  ✔ DISCUSS still blocks after the ruling until a fresh review (8.164834ms)
✔ every gate condition fails closed when deliberately broken (272.523916ms)
✔ the approval and advancement recovery commands run exactly as printed (556.701083ms)
✔ the missing-review recovery command runs exactly as printed (444.428166ms)
✔ a phase entry remains valid only while every prior gate proof still exists on disk (36.29175ms)
✔ the repository carries the complete GPLv3-only license and Kristian's sole copyright (5.948959ms)
✔ PACKAGED NPX SUITE: a real tarball installs and runs the plain-JavaScript koda binary (2386.135042ms)
✔ RECEIPT ADVERSARIAL SUITE: an earlier review's receipt cannot approve a fresh review (26.60375ms)
✔ RECEIPT ADVERSARIAL SUITE: phase N receipt cannot approve phase N+1 (12.338542ms)
✔ RECEIPT ADVERSARIAL SUITE: outer whitespace is accepted and any inner word change refuses (19.669542ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REVISE (8.567667ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REJECT (8.015375ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override DISCUSS (9.033375ms)
✔ FULL RELAY RUNNER: preparation creates a clean pushed project with local skills (646.414166ms)
✖ FULL RELAY RUNNER: execution preserves two contexts and never automates owner receipt proof (3.0555ms)
✔ REVIEW BINDING SUITE: changing review findings after owner acknowledgement refuses (21.117833ms)
✔ REVIEW BINDING SUITE: an untouched generated template cannot become an approved review (23.484375ms)
✔ a current review cannot be replaced before its receipt is recorded (18.587917ms)
✔ a revised artifact receives a fresh review, fresh receipt, and archived prior review (23.959666ms)
✔ DISCUSS requires the owner's ruling before a fresh definitive review (35.648625ms)
✔ REVIEWER FIXTURES: five sealed fixtures ship as blind Koda projects (41.211417ms)
✔ REVIEWER FIXTURES: the planted hard number is unsupported and the control has no plant (3.494333ms)
✔ REVIEWER FIXTURES: inference-chain plant requires a deduction across three source files (0.899958ms)
✔ REVIEWER FIXTURES: tempting honest control is imperfect in style but its claims execute (93.730542ms)
✔ REVIEWER FIXTURES: evidence-absence trap has working code but its claimed run record is missing (81.728917ms)
✔ REVIEWER FIXTURES: new scoring contracts still match their pre-run Git seal (50.111792ms)
✔ REVIEWER FIXTURES: Ghostty runs pin model and effort and preserve ephemeral Codex events (0.605417ms)
✔ REVIEWER FIXTURES: the medium model matrix is backed by six graded run folders (1.737666ms)
✔ session creation requires a prompt and numbers dated folders (22.797959ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-YZh4Jg/remote.git
 * [new branch]      main -> main
✔ a completed session is closed only after its state is committed and pushed (1010.007208ms)
✔ every Koda-C skill has valid relay sections and four-line Codex metadata (9.524166ms)
✔ skill index metadata stays concise, front-loaded, and trigger-specific (7.04925ms)
✔ producer phase skills hand only to the one shared reviewer (2.401ms)
✔ the shared reviewer keeps all phase criteria in one place (1.312208ms)
✔ in-phase consultation is disk-backed and cannot impersonate formal review (7.963333ms)
✔ session open and close remain ceremonies outside producer phase routing (0.850125ms)
✔ STALE-REVIEW BINDING: editing the artifact after review refuses with a named re-review reason (30.068208ms)
✔ STALE-REVIEW BINDING: reviewing after an edit binds the new artifact and opens (15.937583ms)
✔ STATUS TRUTH SUITE: deleting a review is reflected immediately (243.461375ms)
✔ STATUS TRUTH SUITE: blanking an artifact is reflected immediately (222.507958ms)
✔ STATUS TRUTH SUITE: corrupt ledger metadata refuses with a named corruption reason (105.555459ms)
✔ STATUS TRUTH SUITE: editing an acknowledged review is reflected immediately (111.191792ms)
✔ STATUS TRUTH SUITE: invalid state JSON refuses instead of guessing (107.418083ms)
ℹ tests 77
ℹ suites 0
ℹ pass 76
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 2580.943292

✖ failing tests:

test at tests/relay-runner.test.ts:116:1
✖ FULL RELAY RUNNER: execution preserves two contexts and never automates owner receipt proof (3.0555ms)
  AssertionError [ERR_ASSERTION]: The input did not match the regular expression /Do not run `relay:prepare` again/. Input:

  '# First Koda-C full-relay test in Ghostty\n' +
    '\n' +
    "This guide is for Kristian's first genuine owner-acknowledged relay. The prepared run uses Sol at medium effort as producer and Terra at medium effort as reviewer:\n" +
    '\n' +
    '```text\n' +
    'docs/relay-runs/2026-07-18-software-clean-sol-medium-terra-medium-01\n' +
    '```\n' +
    '\n' +
    'The two Codex contexts are independent but bound to the same disk-backed relay run and Koda session. Window A is the supervisor. Window B is currently a simple owner review reader; it is not yet the future interactive reviewer conversation.\n' +
    '\n' +
    '## Window A — start or resume\n' +
    '\n' +
    'From the repository:\n' +
    '\n' +
    '```bash\n' +
    'cd /Users/freeborn/Dev/koda-codex\n' +
    '```\n' +
    '\n' +
    'Start or resume the prepared run:\n' +
    '\n' +
    '```bash\n' +
    'npm run relay:execute -- "docs/relay-runs/2026-07-18-software-clean-sol-medium-terra-medium-01"\n' +
    '```\n' +
    '\n' +
    'Leave Window A alone while it prints producer and reviewer turns. Move to Window B only when A prints `OWNER ACKNOWLEDGEMENT REQUIRED` and waits for a receipt.\n' +
    '\n' +
    '## Window B — one command whenever A waits\n' +
    '\n' +
    'Move to the repository once if needed:\n' +
    '\n' +
    '```bash\n' +
    'cd /Users/freeborn/Dev/koda-codex\n' +
    '```\n' +
    '\n' +
    'This is the one Window B command used for every phase review:\n' +
    '\n' +
    '```bash\n' +
    'npm run relay:review\n' +
    '```\n' +
    '\n' +
    'The command finds the one relay run whose status is `AWAITING_OWNER_RECEIPT`, derives its current session and phase from disk, and opens that exact review. It refuses rather than guessing if no run or more than one run is waiting.\n' +
    '\n' +
    'When the review opens:\n' +
    '\n' +
    '1. Read the verdict and every finding.\n' +
    '2. Press Space to move down when needed.\n' +
    '3. Read through the final receipt line.\n' +
    '4. Press `q` when finished.\n' +
    '\n' +
    'The helper then re-reads the review, refuses if it changed while open, and copies the exact receipt to the macOS clipboard without printing it or sending it to either model context.\n' +
    '\n' +
    'Return to Window A, press Command–V, then press Return. That is the complete owner acknowledgement action.\n' +
    '\n' +
    'If the verdict is non-blocking, the gate advances and the producer begins the next configured phase automatically. If it is blocking, the same producer context receives the acknowledged disk handback, revises the artifact, and the same reviewer context performs a fresh review. Run `npm run relay:review` again when Window A waits again.\n' +
    '\n' +
    '## One-session invariant\n' +
    '\n' +
    'The normal product state has one active session, one current phase, and at most one review awaiting owner acknowledgement. Producer and reviewer share the run ID and session ID through files, never through assumed conversational memory. A new Koda session cannot open until the prior session is closed at a pushed Git commit.\n' +
    '\n' +
    "The helper's multiple-waiter refusal is corruption and operator-error protection for this test repository, which can contain several archived or prepared fixture projects. It is not an expected owner workflow.\n" +
    '\n' +
    '## What this bridge proves—and does not\n' +
    '\n' +
    'This run proves that two distinct persistent Codex thread IDs can relay artifacts and handbacks through one disk-backed session while Koda independently controls advancement. The supervisor resumes the contexts in turn; it does not yet show two visible conversations waiting concurrently.\n' +
    '\n' +
    "The intended product experience is simpler: Kristian speaks only with the reviewer, records approval or discusses a product decision there, Koda verifies the resulting disk evidence, and the producer resumes automatically. The reviewer never gains authority to bypass the gate. Window B's one-command reader is an interim bridge toward that interface.\n" +
    '\n' +
    '## If Window A pauses\n' +
    '\n' +
    'Do not delete the run and do not prepare another one. Resume with:\n' +
    '\n' +
    '```bash\n' +
    'npm run relay:execute -- "docs/relay-runs/2026-07-18-software-clean-sol-medium-terra-medium-01"\n' +
    '```\n' +
    '\n' +
    'If the pause names an owner consultation instead of a receipt, stop and report only the named question and response-file path. Never send a receipt through chat.\n' +
    '\n' +
    '## Successful ending\n' +
    '\n' +
    'Success exists only when Window A prints `RELAY COMPLETE`. Then Window B may inspect:\n' +
    '\n' +
    '```bash\n' +
    "sed -n '1,240p' docs/relay-runs/2026-07-18-software-clean-sol-medium-terra-medium-01/RESULT.md\n" +
    '```\n' +
    '\n' +
    'The result must say `Status: COMPLETE`, show distinct producer and reviewer thread IDs, record all six phase advancements and owner acknowledgements, and name the pushed close commit. A prepared folder, a model exit, or `6/6 phases` without close evidence is not success.\n' +
    '\n' +
    '## Safety boundaries\n' +
    '\n' +
    '- Never paste a review receipt into Codex chat or documentation.\n' +
    '- Do not manually edit artifacts or reviews during the run.\n' +
    "- Do not manually run Koda approval or advancement commands outside Window A's prompt.\n" +
    '- Do not start another run while this run is active.\n'

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/relay-runner.test.ts:151:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: true,
    code: 'ERR_ASSERTION',
    actual: '# First Koda-C full-relay test in Ghostty\n\nThis guide is for Kristian\'s first genuine owner-acknowledged relay. The prepared run uses Sol at medium effort as producer and Terra at medium effort as reviewer:\n\n```text\ndocs/relay-runs/2026-07-18-software-clean-sol-medium-terra-medium-01\n```\n\nThe two Codex contexts are independent but bound to the same disk-backed relay run and Koda session. Window A is the supervisor. Window B is currently a simple owner review reader; it is not yet the future interactive reviewer conversation.\n\n## Window A — start or resume\n\nFrom the repository:\n\n```bash\ncd /Users/freeborn/Dev/koda-codex\n```\n\nStart or resume the prepared run:\n\n```bash\nnpm run relay:execute -- "docs/relay-runs/2026-07-18-software-clean-sol-medium-terra-medium-01"\n```\n\nLeave Window A alone while it prints producer and reviewer turns. Move to Window B only when A prints `OWNER ACKNOWLEDGEMENT REQUIRED` and waits for a receipt.\n\n## Window B — one command whenever A waits\n\nMove to the repository once if needed:\n\n```bash\ncd /Users/freeborn/Dev/koda-codex\n```\n\nThis is the one Window B command used for every phase review:\n\n```bash\nnpm run relay:review\n```\n\nThe command finds the one relay run whose status is `AWAITING_OWNER_RECEIPT`, derives its current session and phase from disk, and opens that exact review. It refuses rather than guessing if no run or more than one run is waiting.\n\nWhen the review opens:\n\n1. Read the verdict and every finding.\n2. Press Space to move down when needed.\n3. Read through the final receipt line.\n4. Press `q` when finished.\n\nThe helper then re-reads the review, refuses if it changed while open, and copies the exact receipt to the macOS clipboard without printing it or sending it to either model context.\n\nReturn to Window A, press Command–V, then press Return. That is the complete owner acknowledgement action.\n\nIf the verdict is non-blocking, the gate advances and the producer begins the next configured phase automatically. If it is blocking, the same producer context receives the acknowledged disk handback, revises the artifact, and the same reviewer context performs a fresh review. Run `npm run relay:review` again when Window A waits again.\n\n## One-session invariant\n\nThe normal product state has one active session, one current phase, and at most one review awaiting owner acknowledgement. Producer and reviewer share the run ID and session ID through files, never through assumed conversational memory. A new Koda session cannot open until the prior session is closed at a pushed Git commit.\n\nThe helper\'s multiple-waiter refusal is corruption and operator-error protection for this test repository, which can contain several archived or prepared fixture projects. It is not an expected owner workflow.\n\n## What this bridge proves—and does not\n\nThis run proves that two distinct persistent Codex thread IDs can relay artifacts and handbacks through one disk-backed session while Koda independently controls advancement. The supervisor resumes the contexts in turn; it does not yet show two visible conversations waiting concurrently.\n\nThe intended product experience is simpler: Kristian speaks only with the reviewer, records approval or discusses a product decision there, Koda verifies the resulting disk evidence, and the producer resumes automatically. The reviewer never gains authority to bypass the gate. Window B\'s one-command reader is an interim bridge toward that interface.\n\n## If Window A pauses\n\nDo not delete the run and do not prepare another one. Resume with:\n\n```bash\nnpm run relay:execute -- "docs/relay-runs/2026-07-18-software-clean-sol-medium-terra-medium-01"\n```\n\nIf the pause names an owner consultation instead of a receipt, stop and report only the named question and response-file path. Never send a receipt through chat.\n\n## Successful ending\n\nSuccess exists only when Window A prints `RELAY COMPLETE`. Then Window B may inspect:\n\n```bash\nsed -n \'1,240p\' docs/relay-runs/2026-07-18-software-clean-sol-medium-terra-medium-01/RESULT.md\n```\n\nThe result must say `Status: COMPLETE`, show distinct producer and reviewer thread IDs, record all six phase advancements and owner acknowledgements, and name the pushed close commit. A prepared folder, a model exit, or `6/6 phases` without close evidence is not success.\n\n## Safety boundaries\n\n- Never paste a review receipt into Codex chat or documentation.\n- Do not manually edit artifacts or reviews during the run.\n- Do not manually run Koda approval or advancement commands outside Window A\'s prompt.\n- Do not start another run while this run is active.\n',
    expected: /Do not run `relay:prepare` again/,
    operator: 'match',
    diff: 'simple'
  }
```
