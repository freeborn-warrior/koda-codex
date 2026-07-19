# Per-test result — 2026-07-19-guide-preflight-fresh-model-development-failure

- Result: **FAIL**
- Recorded at: 2026-07-19T06:06:47.246Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `c94799a`
- Command: `/opt/homebrew/Cellar/node/26.0.0/bin/node --test --test-reporter=spec tests/config.test.ts tests/direction.test.ts tests/dogfood.test.ts tests/full-lifecycle.test.ts tests/gate.test.ts tests/guide-runtime-integration.test.ts tests/guide.test.ts tests/halt.test.ts tests/hints.test.ts tests/history.test.ts tests/license.test.ts tests/package.test.ts tests/receipt-adversarial.test.ts tests/relay-runner.test.ts tests/relay-status.test.ts tests/relay-window.test.ts tests/review-binding.test.ts tests/review.test.ts tests/reviewer-fixtures.test.ts tests/security.test.ts tests/session.test.ts tests/skill.test.ts tests/stale-review.test.ts tests/status-truth.test.ts tests/submission.test.ts`

Every discovered test and subtest is named below. No result is aggregated away.

```text
✔ the default phase chain is configurable data in the required order (2.5845ms)
✔ config validation rejects unsafe session paths and drifting phase names (0.261417ms)
✔ config validation refuses a sessions directory that resolves outside the project (30.707125ms)
✔ WAIT DIRECTION: record now, keep current contract frozen, and release only through advance (283.423708ms)
✔ WAIT DIRECTION MUTATION: citing a queued direction before its gate refuses split provenance (11.760541ms)
✔ WAIT DIRECTION CARRY: final-boundary direction becomes a hashed next-session Brief input (20.900166ms)
✔ WAIT DIRECTION MUTATION: changed prose and symbolic-link evidence refuse by name (9.663667ms)
✔ WAIT DIRECTION CONTAINMENT: a linked direction directory cannot redirect writes (8.010167ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-direction-boundary-CLeAuS/remote.git
 * [new branch]      main -> main
✔ WAIT FINAL BOUNDARY: a new session prompt must cite direction released by the final gate (1011.773916ms)
✔ the committed dogfood snapshot contains the full native chain and an internally bound close (59.875041ms)
✔ FULL LIFECYCLE SCENARIO: clean approvals traverse all six phases and pushed close (755.301792ms)
✔ FULL LIFECYCLE SCENARIO: a REVISE loop recovers in plan before completing and closing (842.243458ms)
✔ FULL LIFECYCLE SCENARIO: DISCUSS records an owner ruling and requires a fresh live review (810.420875ms)
✔ a complete artifact, review, allowed verdict, unique receipt, and ledger proof open the gate (32.209958ms)
▶ GATE MUTATION SUITE: each core condition refuses and names itself
  ✔ artifact exists (11.6835ms)
  ✔ artifact is non-empty (10.571666ms)
  ✔ artifact is a regular file (10.475ms)
  ✔ review exists (9.279167ms)
  ✔ review is a regular file (7.648875ms)
  ✔ approval ledger is a regular file (9.308875ms)
  ✔ verdict REVISE is blocking (10.835167ms)
  ✔ verdict REJECT is blocking (9.9615ms)
  ✔ verdict DISCUSS is blocking (14.118834ms)
  ✔ current receipt is quoted verbatim in the ledger (12.219375ms)
✔ GATE MUTATION SUITE: each core condition refuses and names itself (107.633042ms)
✔ outer receipt whitespace is ignored but inner bytes remain literal (23.016458ms)
▶ every gate condition fails closed when deliberately broken
  ✔ artifact missing (19.922625ms)
  ✔ artifact empty (15.762375ms)
  ✔ review missing (16.548333ms)
  ✔ verdict line missing (9.804333ms)
  ✔ verdict unknown (16.112208ms)
  ✔ receipt missing from last line (15.747583ms)
  ✔ generated review metadata missing (13.4185ms)
  ✔ duplicate generated review metadata is ambiguous (15.483542ms)
  ✔ review metadata names a different phase (16.181ms)
  ✔ artifact changed after review (11.478875ms)
  ✔ final receipt differs from generated receipt (16.490167ms)
  ✔ receipt reused by another review (12.561791ms)
  ✔ approval ledger missing (15.581542ms)
  ✔ exact receipt absent from ledger (19.02275ms)
  ✔ approver missing (10.515125ms)
  ✔ APPROVE WITH COMMENTS has no ledger comments (14.52175ms)
  ✔ REVISE blocks even with receipt proof (29.043917ms)
  ✔ REJECT blocks even with receipt proof (16.401708ms)
  ✔ DISCUSS blocks without an owner ruling (17.279ms)
  ✔ DISCUSS still blocks after the ruling until a fresh review (11.478417ms)
✔ every gate condition fails closed when deliberately broken (318.031708ms)
✔ GUIDE REAL-PROJECT RELAY: two processes return pushed close evidence without replacing Git (6998.319125ms)
✔ GUIDE ENTRY: an active prior session refuses a new launch request and names it (25.483833ms)
✔ GUIDE PREFLIGHT: an active session blocks a conceptually competing session before drafting (11.510084ms)
✔ GUIDE PREFLIGHT CONTROL: a project with no active session permits exactly one draft (7.772083ms)
✔ GUIDE HALT RETURN: a pushed halt and every waiting direction must enter a fresh confirmed Brief (1698.438125ms)
✔ GUIDE CONFIRMATION: one request binds prompt, manifest, continuity, and owner (12.397375ms)
✔ GUIDE MUTATION: changing only a continuity file makes confirmation stale (11.190916ms)
✔ GUIDE MUTATION: changing only the prompt makes confirmation stale (17.353792ms)
✔ GUIDE MUTATION: changing only the project manifest makes confirmation stale (10.417916ms)
✔ GUIDE GIT HANDOVER: a confirmed but uncommitted request refuses launch (533.164917ms)
✔ GUIDE RECOVERY: stale confirmation requires a pushed cancellation before reconfirming (736.665584ms)
✔ GUIDE GATE: a project with a Guide manifest refuses an unconfirmed session prompt (11.709041ms)
✔ GUIDE RELAY: pushed confirmation opens the exact session and records its binding (679.366125ms)
✔ GUIDE BINDING STATUS: the session-local binding is close-bound and corruption refuses (571.89375ms)
✔ GUIDE BINDING RECOVERY: an interrupted open can bind only the matching latest session (375.270042ms)
✔ GUIDE STATUS TRUTH: corrupt launch evidence refuses instead of guessing (9.260084ms)
✔ GUIDE RUNTIME: one command binds a pushed launch and prints executable session-context commands (1015.731333ms)
✔ GUIDE RUNTIME MUTATION: an unignored runtime refuses by name (514.441458ms)
✔ GUIDE RUNTIME MUTATION: another unfinished runtime blocks a new session (758.572792ms)
✔ GUIDE RUNTIME MUTATION: a linked RUN.json refuses as unsafe state (477.766958ms)
✔ GUIDE RUNTIME STATUS TRUTH: corrupt live state refuses instead of hiding behind launch state (483.624292ms)
✔ GUIDE RUNTIME STATUS TRUTH: a forged HALTED label refuses without pushed halt evidence (458.631417ms)
✔ GUIDE GHOSTTY START: one explicit action requests Reviewer then Producer without shell evaluation (609.136917ms)
✔ GUIDE GHOSTTY MUTATION: a failed Producer request refuses duplicate automatic recovery (420.574708ms)
✔ HALT CEREMONY: void the in-flight phase, require pushed evidence, then return through a fresh Brief (3239.934791ms)
✔ HALT STATUS TRUTH: corrupt halt evidence is named and never treated as terminal (398.789333ms)
✔ HALT TERMINAL MUTATION: halt and close evidence can never coexist (24.577625ms)
✔ the approval and advancement recovery commands run exactly as printed (797.863041ms)
✔ the missing-review recovery command runs exactly as printed (690.843041ms)
✔ a phase entry remains valid only while every prior gate proof still exists on disk (40.195667ms)
✔ the repository carries the complete GPLv3-only license and Kristian's sole copyright (3.961834ms)
✔ PACKAGED NPX SUITE: the source-controlled binary is executable before npm touches it (9.695334ms)
✔ PACKAGED NPX SUITE: the documented local npx command does not mutate its checkout (1665.450041ms)
✔ PACKAGED NPX SUITE: a real tarball installs and runs the plain-JavaScript koda binary (6114.474541ms)
✔ RECEIPT ADVERSARIAL SUITE: an earlier review's receipt cannot approve a fresh review (45.414125ms)
✔ RECEIPT ADVERSARIAL SUITE: phase N receipt cannot approve phase N+1 (20.322917ms)
✔ RECEIPT ADVERSARIAL SUITE: outer whitespace is accepted and any inner word change refuses (23.269959ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REVISE (15.213625ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REJECT (11.045167ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override DISCUSS (17.89425ms)
✔ FULL RELAY RUNNER: preparation creates a clean pushed project with local skills (787.06725ms)
✔ FULL RELAY RUNNER: execution preserves two contexts and never automates owner receipt proof (3.162542ms)
✔ GENUINE FULL RELAY EVIDENCE: six phases, revision recovery, distinct contexts, and pushed close (29.859ms)
✔ RELAY STATUS TRUTH: a prepared run names all roles and prints only the first safe action (751.206708ms)
✔ RELAY STATUS TRUTH: after Reviewer is alive, Producer becomes the one safe next action (748.17975ms)
✔ RELAY STATUS TRUTH: a stopped reviewer process names explicit stale-lock recovery (678.888792ms)
✔ RELAY STATUS TRUTH: an active recorded producer is never duplicated by a blind hint (730.049667ms)
✔ RELAY STATUS TRUTH: corrupt or ambiguous run state refuses instead of guessing (1692.019209ms)
✔ RELAY STATUS TRUTH: a corrupt waiting direction refuses immediately by name (553.866458ms)
✔ TWO-WINDOW PROTOCOL: reviewer jobs are bounded and duplicate reviewer windows refuse (21.492833ms)
✔ TWO-WINDOW VISIBILITY: progress is readable without exposing review receipts (0.551417ms)
✔ REVIEWER OPEN CONVERSATION: an idle owner question resumes the Reviewer but changes no project file (1044.86525ms)
✔ REVIEWER OPEN CONVERSATION SCOPE: project-level thought returns to Guide without mutation (1069.711167ms)
✔ REVIEWER OPEN CONVERSATION WAIT: active direction is recorded but cannot become a current-phase handback (962.137375ms)
✔ REVIEWER OPEN CONVERSATION TTY: a real terminal line reaches the idle Reviewer prompt (888.628792ms)
✔ TWO-WINDOW RECEIPT: exact owner quote is recorded from Window B (685.272292ms)
✔ TWO-WINDOW RECEIPT MUTATION: a wrong quote refuses and names the preserved failed job (659.275084ms)
✔ WAIT AT FORMAL REVIEW: new direction is recorded immediately but does not revise the reviewed artifact (841.119208ms)
✔ WAIT RECEIPT BINDING: a recorded direction survives a wrong receipt but nothing advances (727.441375ms)
✔ WAIT CONTRACT MIGRATION: the superseded same-phase handback marker refuses by name (630.094708ms)
✔ REVIEWER HALT: the sole interrupt voids the phase and pushes immutable evidence without a receipt (722.395875ms)
✔ TWO-WINDOW RELAY: a pending formal-review job wakes one persistent reviewer and returns acknowledged disk evidence (824.992375ms)
✔ TWO-WINDOW SESSION: separate producer and reviewer processes rendezvous through pushed close (3594.558459ms)
✔ REVIEW BINDING SUITE: changing review findings after owner acknowledgement refuses (51.336083ms)
✔ REVIEW BINDING SUITE: an untouched generated template cannot become an approved review (17.173916ms)
✔ a current review cannot be replaced before its receipt is recorded (19.572708ms)
✔ a revised artifact receives a fresh review, fresh receipt, and archived prior review (14.225333ms)
✔ DISCUSS requires the owner's ruling before a fresh definitive review (22.277833ms)
✔ REVIEWER FIXTURES: five sealed fixtures ship as blind Koda projects (28.671417ms)
✔ REVIEWER FIXTURES: the planted hard number is unsupported and the control has no plant (1.143541ms)
✔ REVIEWER FIXTURES: inference-chain plant requires a deduction across three source files (0.887125ms)
✔ REVIEWER FIXTURES: tempting honest control is imperfect in style but its claims execute (86.991542ms)
✔ REVIEWER FIXTURES: evidence-absence trap has working code but its claimed run record is missing (158.471875ms)
✔ REVIEWER FIXTURES: new scoring contracts still match their pre-run Git seal (47.635833ms)
✔ REVIEWER FIXTURES: Ghostty runs pin model and effort and preserve ephemeral Codex events (1.240542ms)
✔ REVIEWER FIXTURES: the bounded model matrix is backed by seventeen graded run folders (27.383041ms)
✔ SECURITY INTEGRITY SUITE: the install is dependency-free with no install hook (13.370958ms)
✔ SECURITY INTEGRITY SUITE: the committed repository contains no symbolic link (17.755708ms)
✔ SECURITY INTEGRITY SUITE: tracked text contains no common live credential signature (209.418917ms)
✔ session creation requires a prompt and numbers dated folders (17.742333ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-SKufRL/remote.git
 * [new branch]      main -> main
✔ a completed session is closed only after its state is committed and pushed (1910.918958ms)
✔ immutable close refuses symbolic links inside session evidence (12.614208ms)
✔ immutable close refuses duplicate generated metadata markers (0.112125ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-ignored-remote-JfV3nb/remote.git
 * [new branch]      main -> main
✔ immutable close refuses a bound session file that Git ignored instead of pushing (425.401583ms)
✔ every Koda-C skill has valid relay sections and four-line Codex metadata (9.8685ms)
✔ skill index metadata stays concise, front-loaded, and trigger-specific (4.196917ms)
✔ producer phase skills hand only to the one shared reviewer (1.978084ms)
✔ the shared reviewer keeps all phase criteria in one place (1.582125ms)
✔ in-phase consultation is disk-backed and cannot impersonate formal review (2.246542ms)
✔ session open and close remain ceremonies outside producer phase routing (1.41875ms)
✔ the session-prompt skill is the sole skill route to a future session launch (1.623791ms)
✔ the fresh Guide preflight model run is sealed, blind, ephemeral, and read-only (0.540125ms)
✔ historical fresh Codex startup discovered the original nine local skills and root guidance without reading disk (2.037625ms)
✔ fresh Codex discovers all ten current skills and the active Guide preflight refuses without mutation (0.871917ms)
✔ STALE-REVIEW BINDING: editing the artifact after review refuses with a named re-review reason (24.005666ms)
✔ STALE-REVIEW BINDING: reviewing after an edit binds the new artifact and opens (24.720292ms)
✔ STATUS TRUTH SUITE: deleting a review is reflected immediately (375.729667ms)
✔ STATUS TRUTH SUITE: blanking an artifact is reflected immediately (344.167958ms)
✔ STATUS TRUTH SUITE: corrupt ledger metadata refuses with a named corruption reason (169.711084ms)
✔ STATUS TRUTH SUITE: editing an acknowledged review is reflected immediately (193.325292ms)
✔ STATUS TRUTH SUITE: invalid state JSON refuses instead of guessing (163.999417ms)
✔ STATUS TRUTH SUITE: a path-like phase name in state refuses instead of escaping (154.553875ms)
✔ JUDGE JOURNEY SUITE: the committed binary runs without rebuilding (96.211042ms)
✔ JUDGE JOURNEY SUITE: video and submission documents preserve every live rule (2.320792ms)
✖ JUDGE JOURNEY SUITE: local links in the judge documents resolve (10.155375ms)
ℹ tests 152
ℹ suites 0
ℹ pass 151
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 14341.922792

✖ failing tests:

test at tests/submission.test.ts:42:1
✖ JUDGE JOURNEY SUITE: local links in the judge documents resolve (10.155375ms)
  AssertionError [ERR_ASSERTION]: Broken local judge links:
  docs/README.md -> test-results/2026-07-19-guide-preflight-fresh-model-final.md
  + actual - expected

  + [
  +   'docs/README.md -> test-results/2026-07-19-guide-preflight-fresh-model-final.md'
  + ]
  - []

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/submission.test.ts:62:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: false,
    code: 'ERR_ASSERTION',
    actual: [ 'docs/README.md -> test-results/2026-07-19-guide-preflight-fresh-model-final.md' ],
    expected: [],
    operator: 'deepStrictEqual',
    diff: 'simple'
  }
```
