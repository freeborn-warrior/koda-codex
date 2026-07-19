# Per-test result — 2026-07-19-repeatable-recovery-manifest-assembly-failure

- Result: **FAIL**
- Recorded at: 2026-07-19T23:37:51.008Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `b9b63eb`
- Command: `/opt/homebrew/Cellar/node/26.0.0/bin/node --test --test-reporter=spec tests/concurrent-sessions.test.ts tests/config.test.ts tests/direction.test.ts tests/dogfood.test.ts tests/full-lifecycle.test.ts tests/gate.test.ts tests/guide-runtime-integration.test.ts tests/guide.test.ts tests/halt.test.ts tests/hints.test.ts tests/history.test.ts tests/interruption.test.ts tests/license.test.ts tests/package.test.ts tests/plural-runtime-integration.test.ts tests/receipt-adversarial.test.ts tests/relay-runner.test.ts tests/relay-status.test.ts tests/relay-window.test.ts tests/review-binding.test.ts tests/review.test.ts tests/reviewer-fixtures.test.ts tests/security.test.ts tests/session.test.ts tests/skill.test.ts tests/stale-review.test.ts tests/status-truth.test.ts tests/submission.test.ts tests/toolkit-integrity.test.ts tests/workset.test.ts`

Every discovered test and subtest is named below. No result is aggregated away.

```text
✔ CONCURRENT SESSION ALLOCATION: simultaneous starts receive distinct disk identities (56.106708ms)
✔ CONCURRENT SESSION MUTATION: independence is explicit and ambiguous mutation refuses (989.640958ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-dependency-MgEDl9/remote.git
 * [new branch]      main -> main
✔ DEPENDENCY MUTATION: an active predecessor refuses and pushed terminal evidence is hash-bound (1986.559583ms)
✔ the default phase chain is configurable data in the required order (1.119833ms)
✔ config validation rejects unsafe session paths and drifting phase names (0.18ms)
✔ config validation refuses a sessions directory that resolves outside the project (59.255208ms)
✔ WAIT DIRECTION: record now, keep current contract frozen, and release only through advance (239.81475ms)
✔ WAIT DIRECTION MUTATION: citing a queued direction before its gate refuses split provenance (19.135041ms)
✔ WAIT DIRECTION CARRY: final-boundary direction becomes a hashed next-session Brief input (23.526917ms)
✔ WAIT DIRECTION MUTATION: changed prose and symbolic-link evidence refuse by name (11.013791ms)
✔ WAIT DIRECTION ATOMIC READ: Koda retries its transient file but persistent or unknown entries still refuse (377.206875ms)
✔ WAIT DIRECTION CONTAINMENT: a linked direction directory cannot redirect writes (18.227792ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-direction-boundary-qbHOjE/remote.git
 * [new branch]      main -> main
✔ WAIT FINAL BOUNDARY: a new session prompt must cite direction released by the final gate (1356.562792ms)
✔ the committed dogfood snapshot contains the full native chain and an internally bound close (62.282334ms)
✔ FULL LIFECYCLE SCENARIO: clean approvals traverse all six phases and pushed close (773.679208ms)
✔ FULL LIFECYCLE SCENARIO: a REVISE loop recovers in plan before completing and closing (680.01725ms)
✔ FULL LIFECYCLE SCENARIO: DISCUSS records an owner ruling and requires a fresh live review (761.643042ms)
✔ a complete artifact, review, allowed verdict, unique receipt, and ledger proof open the gate (30.354917ms)
▶ GATE MUTATION SUITE: each core condition refuses and names itself
  ✔ artifact exists (9.608833ms)
  ✔ artifact is non-empty (11.082541ms)
  ✔ artifact is a regular file (12.502333ms)
  ✔ review exists (11.155666ms)
  ✔ review is a regular file (11.172292ms)
  ✔ approval ledger is a regular file (8.325958ms)
  ✔ verdict REVISE is blocking (10.693667ms)
  ✔ verdict REJECT is blocking (16.065917ms)
  ✔ verdict DISCUSS is blocking (27.179958ms)
  ✔ current receipt is quoted verbatim in the ledger (34.982584ms)
✔ GATE MUTATION SUITE: each core condition refuses and names itself (154.18225ms)
✔ outer receipt whitespace is ignored but inner bytes remain literal (21.549291ms)
▶ every gate condition fails closed when deliberately broken
  ✔ artifact missing (12.381ms)
  ✔ artifact empty (14.17525ms)
  ✔ review missing (14.146125ms)
  ✔ verdict line missing (10.087375ms)
  ✔ verdict unknown (11.79175ms)
  ✔ receipt missing from last line (10.581542ms)
  ✔ generated review metadata missing (11.235583ms)
  ✔ duplicate generated review metadata is ambiguous (9.604208ms)
  ✔ review metadata names a different phase (11.358541ms)
  ✔ artifact changed after review (10.254833ms)
  ✔ final receipt differs from generated receipt (11.148667ms)
  ✔ receipt reused by another review (12.211875ms)
  ✔ approval ledger missing (8.421917ms)
  ✔ exact receipt absent from ledger (12.280334ms)
  ✔ approver missing (20.468167ms)
  ✔ APPROVE WITH COMMENTS has no ledger comments (18.896917ms)
  ✔ REVISE blocks even with receipt proof (19.91375ms)
  ✔ REJECT blocks even with receipt proof (9.304166ms)
  ✔ DISCUSS blocks without an owner ruling (9.377417ms)
  ✔ DISCUSS still blocks after the ruling until a fresh review (13.775834ms)
✔ every gate condition fails closed when deliberately broken (253.77775ms)
✖ GUIDE REAL-PROJECT RELAY: an independent sibling uses two bound contexts and returns pushed close (509.994166ms)
✔ GUIDE ENTRY: an active prior session refuses a new launch request and names it (22.186583ms)
✖ GUIDE PREFLIGHT: active work distinguishes blocked successors from explicit independent siblings (12.060208ms)
✖ GUIDE TOOLKIT BINDING: confirmation carries machine-discovered launch integrity (8.783458ms)
✖ GUIDE TOOLKIT MUTATION: changed bound toolkit proof makes the launch stale (8.884542ms)
✖ GUIDE INDEPENDENT CONTROL: an active Produce session permits an owner-classified Explore sibling (16.130958ms)
✖ GUIDE INDEPENDENT BINDING: confirmed kind and independence open exactly one matching sibling (283.694417ms)
✖ GUIDE PREFLIGHT CONTROL: a project with no active session permits exactly one draft (39.837333ms)
✖ GUIDE HALT RETURN: a pushed halt and every waiting direction must enter a fresh confirmed Brief (456.208792ms)
✖ GUIDE CONFIRMATION: one request binds prompt, manifest, continuity, and owner (8.261833ms)
✖ GUIDE VERIFIED HANDOVER: the owner receives a complete numbered launch choice (236.283042ms)
✖ GUIDE MUTATION: changing only a continuity file makes confirmation stale (10.121958ms)
✖ GUIDE MUTATION: changing only the prompt makes confirmation stale (7.2275ms)
✖ GUIDE MUTATION: changing only the project manifest makes confirmation stale (7.256709ms)
✖ GUIDE GIT HANDOVER: a confirmed but uncommitted request refuses launch (209.892792ms)
✖ GUIDE RECOVERY: stale confirmation requires a pushed cancellation before reconfirming (250.496375ms)
✔ GUIDE GATE: a project with a Guide manifest refuses an unconfirmed session prompt (10.425417ms)
✖ GUIDE RELAY: pushed confirmation opens the exact session and records its binding (253.880666ms)
✖ GUIDE BINDING STATUS: the session-local binding is close-bound and corruption refuses (243.447167ms)
✖ GUIDE BINDING RECOVERY: an interrupted open can bind only the matching latest session (252.010458ms)
✖ GUIDE STATUS TRUTH: corrupt launch evidence refuses instead of guessing (12.742334ms)
✖ GUIDE RUNTIME: one command binds a pushed launch and prints executable session-context commands (249.509917ms)
✖ GUIDE RUNTIME MUTATION: an unignored runtime refuses by name (235.763084ms)
✖ GUIDE RUNTIME PLURALITY: unfinished runtimes coexist and status names each one (248.346375ms)
✖ GUIDE RUNTIME MUTATION: a linked RUN.json refuses as unsafe state (281.940417ms)
✖ GUIDE RUNTIME STATUS TRUTH: corrupt live state refuses instead of hiding behind launch state (265.086625ms)
✖ GUIDE RUNTIME STATUS TRUTH: a forged HALTED label refuses without pushed halt evidence (299.318417ms)
✖ GUIDE GHOSTTY START: one explicit action requests exactly one clean Reviewer and Producer launcher (247.84475ms)
✖ GUIDE GHOSTTY MUTATION: a failed Producer request refuses duplicate automatic recovery (244.744792ms)
✖ GUIDE GHOSTTY REVIEWER READINESS MUTATION: a window request without a live Reviewer never opens Producer (233.73475ms)
✖ GUIDE GHOSTTY PRODUCER READINESS MUTATION: a window request without a live Producer refuses success (222.84475ms)
✖ GUIDE VISIBLE ROLE STATUS: disk liveness reports a missing Producer instead of pretending the session is active (232.362958ms)
✖ GUIDE GHOSTTY OWNER-ERROR RECOVERY: one action reopens Reviewer first and Producer only after it is ready (212.492125ms)
✖ GUIDE GHOSTTY PARTIAL RECOVERY: an existing Reviewer permits exactly one missing Producer retry (312.530292ms)
✖ GUIDE GHOSTTY BOTH-WINDOW RECOVERY: a saved owner decision restores Reviewer before Producer when both disappeared (212.309584ms)
✖ GUIDE GHOSTTY BOTH-WINDOW RECOVERY MUTATION: Producer stays closed when restored Reviewer is not ready (196.363584ms)
✔ HALT CEREMONY: void the in-flight phase, require pushed evidence, then return through a fresh Brief (4468.452833ms)
✔ HALT STATUS TRUTH: corrupt halt evidence is named and never treated as terminal (364.648125ms)
✔ HALT TERMINAL MUTATION: halt and close evidence can never coexist (19.943584ms)
✔ the approval and advancement recovery commands run exactly as printed (592.099167ms)
✔ the missing-review recovery command runs exactly as printed (688.041833ms)
✔ a phase entry remains valid only while every prior gate proof still exists on disk (28.443541ms)
✔ INTERRUPTION SCHEMA: role, purpose, time, and evidence filenames remain one shared fail-closed contract (2.338042ms)
✔ INTERRUPTION RECOVERY: Ctrl-C kills Producer, distrusts partial artifact, and resumes the same context (1652.750292ms)
✔ INTERRUPTION RECOVERY: Ctrl-C returns a formal Reviewer job to PENDING and resumes the same context (1496.976667ms)
✔ INTERRUPTION RECOVERY: an interrupted owner conversation resumes without losing its disk-bound direction (1611.11375ms)
✔ INTERRUPTION MUTATION: missing first-turn context ID refuses automatic worker replacement (3259.575834ms)
✔ the repository carries the complete GPLv3-only license and Kristian's sole copyright (3.217583ms)
✔ PACKAGED NPX SUITE: the source-controlled binary is executable before npm touches it (4.343042ms)
✔ PACKAGED NPX SUITE: the documented local npx command does not mutate its checkout (1752.155625ms)
✔ PACKAGED NPX SUITE: a real tarball installs and runs the plain-JavaScript koda binary (6741.559375ms)
✖ PLURAL LIVE RUNTIME: two independent Producer/Reviewer pairs complete without crossed sessions (342.472042ms)
✔ RECEIPT ADVERSARIAL SUITE: an earlier review's receipt cannot approve a fresh review (89.508042ms)
✔ RECEIPT ADVERSARIAL SUITE: phase N receipt cannot approve phase N+1 (16.810708ms)
✔ RECEIPT ADVERSARIAL SUITE: outer whitespace is accepted and any inner word change refuses (27.060875ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REVISE (17.262917ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REJECT (18.192417ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override DISCUSS (12.533125ms)
✔ FULL RELAY RUNNER: preparation creates a clean pushed project with local skills (760.431917ms)
✔ FULL RELAY RUNNER: execution preserves two contexts and never automates owner receipt proof (2.492459ms)
✔ GENUINE FULL RELAY EVIDENCE: six phases, revision recovery, distinct contexts, and pushed close (17.412041ms)
✔ RELAY STATUS TRUTH: a prepared run names all roles and prints only the first safe action (722.236459ms)
✔ RELAY STATUS TRUTH: after Reviewer is alive, Producer becomes the one safe next action (758.789792ms)
✔ RELAY STATUS TRUTH: a stopped reviewer process names explicit stale-lock recovery (754.772916ms)
✔ RELAY STATUS TRUTH: an active recorded producer is never duplicated by a blind hint (642.461166ms)
✔ RELAY STATUS TRUTH: corrupt or ambiguous run state refuses instead of guessing (1745.299791ms)
✔ RELAY STATUS TRUTH: a corrupt waiting direction refuses immediately by name (485.426541ms)
✔ TWO-WINDOW PROTOCOL: reviewer jobs are bounded and duplicate reviewer windows refuse (25.332875ms)
✔ TWO-WINDOW VISIBILITY: progress is readable without exposing review receipts (0.633708ms)
✔ REVIEWER OPEN CONVERSATION: an idle owner question resumes the Reviewer but changes no project file (1026.071209ms)
✔ REVIEWER OPEN CONVERSATION SCOPE: project-level thought returns to Guide without mutation (1049.515292ms)
✔ REVIEWER OPEN CONVERSATION WAIT: active direction is recorded but cannot become a current-phase handback (891.740541ms)
✔ REVIEWER OPEN CONVERSATION TTY: a real terminal line reaches the idle Reviewer prompt (1069.423709ms)
✔ TWO-WINDOW RECEIPT: exact owner quote is recorded from Window B (597.852333ms)
✔ TWO-WINDOW RECEIPT MUTATION: a wrong quote refuses, names the condition, and remains retryable (677.579292ms)
✔ WAIT AT FORMAL REVIEW: new direction is recorded immediately but does not revise the reviewed artifact (721.104416ms)
✔ WAIT RECEIPT BINDING: a recorded direction survives a wrong receipt but nothing advances (662.486375ms)
✔ TWO-WINDOW RECEIPT RECOVERY: the live legacy acknowledgement failure reopens the same review and context (712.490167ms)
✔ TWO-WINDOW PRODUCER RECOVERY: an awaiting formal review is rejoined instead of replaced (818.658ms)
✔ TWO-WINDOW OWNER CEREMONY TTY: numbered choices disclose the receipt step before acknowledgement (588.283166ms)
✔ TWO-WINDOW OWNER CEREMONY TTY: stop for now preserves an explicit resumable decision point (469.139916ms)
✔ TWO-WINDOW OWNER ERROR: a failed review reader offers numbered retry or safe stop (467.129375ms)
✔ TWO-WINDOW OWNER ERROR: a failed receipt copy offers only numbered recovery choices (656.437833ms)
✔ WAIT CONTRACT MIGRATION: the superseded same-phase handback marker refuses by name (614.320125ms)
✔ REVIEWER HALT: the sole interrupt voids the phase and pushes immutable evidence without a receipt (750.486625ms)
✔ TWO-WINDOW RELAY: a pending formal-review job wakes one persistent reviewer and returns acknowledged disk evidence (780.189833ms)
✔ TWO-WINDOW SESSION: separate producer and reviewer processes rendezvous through pushed close (3560.8285ms)
✔ REVIEW BINDING SUITE: changing review findings after owner acknowledgement refuses (29.998917ms)
✔ REVIEW BINDING SUITE: an untouched generated template cannot become an approved review (15.182459ms)
✔ a current review cannot be replaced before its receipt is recorded (23.934833ms)
✔ a revised artifact receives a fresh review, fresh receipt, and archived prior review (16.228ms)
✔ DISCUSS requires the owner's ruling before a fresh definitive review (22.540416ms)
✔ REVIEWER FIXTURES: five sealed fixtures ship as blind Koda projects (33.074833ms)
✔ REVIEWER FIXTURES: the planted hard number is unsupported and the control has no plant (1.050459ms)
✔ REVIEWER FIXTURES: inference-chain plant requires a deduction across three source files (0.744167ms)
✔ REVIEWER FIXTURES: tempting honest control is imperfect in style but its claims execute (65.287959ms)
✔ REVIEWER FIXTURES: evidence-absence trap has working code but its claimed run record is missing (70.253875ms)
✔ REVIEWER FIXTURES: new scoring contracts still match their pre-run Git seal (64.980834ms)
✔ REVIEWER FIXTURES: Ghostty runs pin model and effort and preserve ephemeral Codex events (0.747875ms)
✔ REVIEWER FIXTURES: the bounded model matrix is backed by seventeen graded run folders (21.957666ms)
✔ SECURITY INTEGRITY SUITE: the install is dependency-free with no install hook (4.548583ms)
✔ SECURITY INTEGRITY SUITE: the committed repository contains no symbolic link (18.665208ms)
✔ SECURITY INTEGRITY SUITE: tracked text contains no common live credential signature (173.519375ms)
✔ SECURITY INTEGRITY SUITE: relay roles and model children never inherit ambient credentials or parent context identity (0.723875ms)
✔ SECURITY INTEGRITY SUITE: owner receipt and ruling data never enter child-process arguments or environment (0.656041ms)
✔ SECURITY INTEGRITY SUITE: fresh-model evidence runs strip ambient credentials and parent context identity (0.502666ms)
✔ SECURITY INTEGRITY SUITE: the executable Ghostty role launcher starts one child with a clean environment (244.330584ms)
✔ session creation requires a prompt and numbers dated folders (30.623875ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-OH9BDG/remote.git
 * [new branch]      main -> main
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-OH9BDG/remote.git
   e8fe36c..0c3fb8d  main -> main
✔ a completed session is closed only after its state is committed and pushed (4009.52925ms)
✔ immutable close refuses symbolic links inside session evidence (14.995333ms)
✔ immutable close refuses duplicate generated metadata markers (0.095458ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-ignored-remote-88rq57/remote.git
 * [new branch]      main -> main
✔ immutable close refuses a bound session file that Git ignored instead of pushing (269.115583ms)
✔ every Koda-C skill has valid relay sections and four-line Codex metadata (16.509625ms)
✔ skill index metadata stays concise, front-loaded, and trigger-specific (7.607084ms)
✔ producer phase skills hand only to the one shared reviewer (1.699666ms)
✔ concurrent relay skills require bound session identity instead of latest-session guessing (9.7625ms)
✔ the shared reviewer keeps all phase criteria in one place (14.067291ms)
✔ in-phase consultation is disk-backed and cannot impersonate formal review (2.4345ms)
✔ session open and close remain ceremonies outside producer phase routing (1.375167ms)
✔ the session-prompt skill is the sole skill route to a future session launch (1.908375ms)
✔ the fresh Guide preflight model run is sealed, blind, ephemeral, and read-only (0.34525ms)
✔ historical fresh Codex startup discovered the original nine local skills and root guidance without reading disk (1.125833ms)
✔ fresh Codex discovers all ten current skills and the active Guide preflight refuses without mutation (0.449333ms)
✔ STALE-REVIEW BINDING: editing the artifact after review refuses with a named re-review reason (30.437292ms)
✔ STALE-REVIEW BINDING: reviewing after an edit binds the new artifact and opens (13.271375ms)
✔ STATUS TRUTH SUITE: deleting a review is reflected immediately (314.657334ms)
✔ STATUS TRUTH SUITE: blanking an artifact is reflected immediately (324.312417ms)
✔ STATUS TRUTH SUITE: corrupt ledger metadata refuses with a named corruption reason (152.140083ms)
✔ STATUS TRUTH SUITE: editing an acknowledged review is reflected immediately (174.548083ms)
✔ STATUS TRUTH SUITE: invalid state JSON refuses instead of guessing (167.975916ms)
✔ STATUS TRUTH SUITE: a path-like phase name in state refuses instead of escaping (186.640375ms)
✔ JUDGE JOURNEY SUITE: the committed binary runs without rebuilding (85.636875ms)
✖ JUDGE JOURNEY SUITE: video and submission documents preserve every live rule (4.550292ms)
✔ JUDGE JOURNEY SUITE: local links in the judge documents resolve (19.044584ms)
✔ TOOLKIT INTEGRITY: a complete manifest proves the installed launch surface (28.861125ms)
✔ TOOLKIT INTEGRITY MUTATION: changed launch code refuses and names the file (17.570375ms)
✔ TOOLKIT INTEGRITY MUTATION: linked evidence refuses instead of following it (5.387458ms)
✔ TOOLKIT INTEGRITY MUTATION: a manifest cannot overstate its hashed test evidence (7.4105ms)
✔ WRITE SET: claims exact clean paths and refuses Guide or sibling overlap (254.307208ms)
✔ WRITE SET CONCURRENCY: simultaneous same-path claims cannot both succeed (200.157667ms)
✔ WRITE SET CONTAINMENT: a linked parent cannot alias a claimed output path (120.488917ms)
✔ WRITE SET CLI: explicit session identity records project-relative output ownership (198.585583ms)
✔ WRITE SET STATUS TRUTH: corrupt disk evidence refuses instead of inferring state (156.929375ms)
✔ GUIDE WRITE SET: new Guide files are explicit and active-session overlap refuses (245.015792ms)
✔ WRITE SET: unrelated Guide and sibling dirt may coexist; unclaimed dirt refuses (228.321834ms)
✔ GUIDE RUNTIME OWNERSHIP: published run and return namespaces are never mistaken for sibling work (202.527292ms)
✔ WRITE SET MUTATION: rename and delete are exact owned changes, including both rename sides (494.675291ms)
✔ WRITE SET MUTATION: staged bytes must match the recorded post-work hash (197.345667ms)
✔ WRITE SET MUTATION: a claimed path changed after post-work observation refuses by name (190.494ms)
✔ GIT LOCK: live owner refuses, stale lock recovers only with an empty index (137.461417ms)
✔ GIT LOCK SERIALIZATION: relay callers may wait for a live short ceremony (176.484834ms)
✔ GIT LOCK SERIALIZATION MUTATION: release between inspection steps retries instead of leaking ENOENT (88.231ms)
✔ GIT LOCK RELEASE MUTATION: a new owner acquired during cleanup is never deleted by the retiring owner (65.672458ms)
✔ GIT LOCK CONTAINMENT: linked .koda cannot redirect lock evidence (83.406458ms)
✔ GIT LOCK CONTAINMENT MUTATION: a disk-supplied token cannot become a retired path (70.14925ms)
ℹ tests 206
ℹ suites 0
ℹ pass 170
ℹ fail 36
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 18473.184417

✖ failing tests:

test at tests/guide-runtime-integration.test.ts:55:1
✖ GUIDE REAL-PROJECT RELAY: an independent sibling uses two bound contexts and returns pushed close (509.994166ms)
  Error: Toolkit verification evidence contradicts the integrity manifest: missing - Recorded at: 2026-07-19T23:34:52.000Z.
      at verifyEvidenceClaims (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:84:22)
      at verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:135:3)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:647:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide-runtime-integration.test.ts:104:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async startSubtestAfterBootstrap (node:internal/test_runner/harness:385:3)

test at tests/guide.test.ts:100:1
✖ GUIDE PREFLIGHT: active work distinguishes blocked successors from explicit independent siblings (12.060208ms)
  Error: Toolkit verification evidence contradicts the integrity manifest: missing - Recorded at: 2026-07-19T23:34:52.000Z.
      at verifyEvidenceClaims (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:84:22)
      at verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:135:3)
      at async runGuideCli (file:///Users/freeborn/Dev/koda-codex/src/guide-commands.ts:120:21)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:104:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:121:1
✖ GUIDE TOOLKIT BINDING: confirmation carries machine-discovered launch integrity (8.783458ms)
  Error: Toolkit verification evidence contradicts the integrity manifest: missing - Recorded at: 2026-07-19T23:34:52.000Z.
      at verifyEvidenceClaims (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:84:22)
      at verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:135:3)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:123:19)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:134:1
✖ GUIDE TOOLKIT MUTATION: changed bound toolkit proof makes the launch stale (8.884542ms)
  Error: Toolkit verification evidence contradicts the integrity manifest: missing - Recorded at: 2026-07-19T23:34:52.000Z.
      at verifyEvidenceClaims (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:84:22)
      at verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:135:3)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:647:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:136:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:148:1
✖ GUIDE INDEPENDENT CONTROL: an active Produce session permits an owner-classified Explore sibling (16.130958ms)
  Error: Toolkit verification evidence contradicts the integrity manifest: missing - Recorded at: 2026-07-19T23:34:52.000Z.
      at verifyEvidenceClaims (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:84:22)
      at verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:135:3)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:647:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:151:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:161:1
✖ GUIDE INDEPENDENT BINDING: confirmed kind and independence open exactly one matching sibling (283.694417ms)
  Error: Toolkit verification evidence contradicts the integrity manifest: missing - Recorded at: 2026-07-19T23:34:52.000Z.
      at verifyEvidenceClaims (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:84:22)
      at verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:135:3)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:647:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:164:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:195:1
✖ GUIDE PREFLIGHT CONTROL: a project with no active session permits exactly one draft (39.837333ms)
  Error: Toolkit verification evidence contradicts the integrity manifest: missing - Recorded at: 2026-07-19T23:34:52.000Z.
      at verifyEvidenceClaims (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:84:22)
      at verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:135:3)
      at async runGuideCli (file:///Users/freeborn/Dev/koda-codex/src/guide-commands.ts:120:21)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:198:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:204:1
✖ GUIDE HALT RETURN: a pushed halt and every waiting direction must enter a fresh confirmed Brief (456.208792ms)
  Error: Toolkit verification evidence contradicts the integrity manifest: missing - Recorded at: 2026-07-19T23:34:52.000Z.
      at verifyEvidenceClaims (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:84:22)
      at verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:135:3)
      at async runGuideCli (file:///Users/freeborn/Dev/koda-codex/src/guide-commands.ts:120:21)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:220:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:254:1
✖ GUIDE CONFIRMATION: one request binds prompt, manifest, continuity, and owner (8.261833ms)
  Error: Toolkit verification evidence contradicts the integrity manifest: missing - Recorded at: 2026-07-19T23:34:52.000Z.
      at verifyEvidenceClaims (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:84:22)
      at verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:135:3)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:647:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:256:18)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:266:1
✖ GUIDE VERIFIED HANDOVER: the owner receives a complete numbered launch choice (236.283042ms)
  Error: Toolkit verification evidence contradicts the integrity manifest: missing - Recorded at: 2026-07-19T23:34:52.000Z.
      at verifyEvidenceClaims (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:84:22)
      at verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:135:3)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:647:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:268:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:281:1
✖ GUIDE MUTATION: changing only a continuity file makes confirmation stale (10.121958ms)
  Error: Toolkit verification evidence contradicts the integrity manifest: missing - Recorded at: 2026-07-19T23:34:52.000Z.
      at verifyEvidenceClaims (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:84:22)
      at verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:135:3)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:647:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:283:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:291:1
✖ GUIDE MUTATION: changing only the prompt makes confirmation stale (7.2275ms)
  Error: Toolkit verification evidence contradicts the integrity manifest: missing - Recorded at: 2026-07-19T23:34:52.000Z.
      at verifyEvidenceClaims (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:84:22)
      at verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:135:3)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:647:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:293:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:301:1
✖ GUIDE MUTATION: changing only the project manifest makes confirmation stale (7.256709ms)
  Error: Toolkit verification evidence contradicts the integrity manifest: missing - Recorded at: 2026-07-19T23:34:52.000Z.
      at verifyEvidenceClaims (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:84:22)
      at verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:135:3)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:647:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:303:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:315:1
✖ GUIDE GIT HANDOVER: a confirmed but uncommitted request refuses launch (209.892792ms)
  Error: Toolkit verification evidence contradicts the integrity manifest: missing - Recorded at: 2026-07-19T23:34:52.000Z.
      at verifyEvidenceClaims (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:84:22)
      at verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:135:3)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:647:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:317:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:324:1
✖ GUIDE RECOVERY: stale confirmation requires a pushed cancellation before reconfirming (250.496375ms)
  Error: Toolkit verification evidence contradicts the integrity manifest: missing - Recorded at: 2026-07-19T23:34:52.000Z.
      at verifyEvidenceClaims (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:84:22)
      at verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:135:3)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:647:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:326:17)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:355:1
✖ GUIDE RELAY: pushed confirmation opens the exact session and records its binding (253.880666ms)
  Error: Toolkit verification evidence contradicts the integrity manifest: missing - Recorded at: 2026-07-19T23:34:52.000Z.
      at verifyEvidenceClaims (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:84:22)
      at verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:135:3)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:647:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:357:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:378:1
✖ GUIDE BINDING STATUS: the session-local binding is close-bound and corruption refuses (243.447167ms)
  Error: Toolkit verification evidence contradicts the integrity manifest: missing - Recorded at: 2026-07-19T23:34:52.000Z.
      at verifyEvidenceClaims (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:84:22)
      at verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:135:3)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:647:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:380:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:393:1
✖ GUIDE BINDING RECOVERY: an interrupted open can bind only the matching latest session (252.010458ms)
  Error: Toolkit verification evidence contradicts the integrity manifest: missing - Recorded at: 2026-07-19T23:34:52.000Z.
      at verifyEvidenceClaims (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:84:22)
      at verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:135:3)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:647:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:395:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:410:1
✖ GUIDE STATUS TRUTH: corrupt launch evidence refuses instead of guessing (12.742334ms)
  Error: Toolkit verification evidence contradicts the integrity manifest: missing - Recorded at: 2026-07-19T23:34:52.000Z.
      at verifyEvidenceClaims (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:84:22)
      at verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:135:3)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:647:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:412:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:424:1
✖ GUIDE RUNTIME: one command binds a pushed launch and prints executable session-context commands (249.509917ms)
  Error: Toolkit verification evidence contradicts the integrity manifest: missing - Recorded at: 2026-07-19T23:34:52.000Z.
      at verifyEvidenceClaims (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:84:22)
      at verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:135:3)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:647:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:426:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:479:1
✖ GUIDE RUNTIME MUTATION: an unignored runtime refuses by name (235.763084ms)
  Error: Toolkit verification evidence contradicts the integrity manifest: missing - Recorded at: 2026-07-19T23:34:52.000Z.
      at verifyEvidenceClaims (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:84:22)
      at verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:135:3)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:647:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:481:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:494:1
✖ GUIDE RUNTIME PLURALITY: unfinished runtimes coexist and status names each one (248.346375ms)
  Error: Toolkit verification evidence contradicts the integrity manifest: missing - Recorded at: 2026-07-19T23:34:52.000Z.
      at verifyEvidenceClaims (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:84:22)
      at verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:135:3)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:647:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:496:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:528:1
✖ GUIDE RUNTIME MUTATION: a linked RUN.json refuses as unsafe state (281.940417ms)
  Error: Toolkit verification evidence contradicts the integrity manifest: missing - Recorded at: 2026-07-19T23:34:52.000Z.
      at verifyEvidenceClaims (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:84:22)
      at verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:135:3)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:647:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:530:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:565:1
✖ GUIDE RUNTIME STATUS TRUTH: corrupt live state refuses instead of hiding behind launch state (265.086625ms)
  Error: Toolkit verification evidence contradicts the integrity manifest: missing - Recorded at: 2026-07-19T23:34:52.000Z.
      at verifyEvidenceClaims (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:84:22)
      at verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:135:3)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:647:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:567:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:584:1
✖ GUIDE RUNTIME STATUS TRUTH: a forged HALTED label refuses without pushed halt evidence (299.318417ms)
  Error: Toolkit verification evidence contradicts the integrity manifest: missing - Recorded at: 2026-07-19T23:34:52.000Z.
      at verifyEvidenceClaims (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:84:22)
      at verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:135:3)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:647:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:586:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:603:1
✖ GUIDE GHOSTTY START: one explicit action requests exactly one clean Reviewer and Producer launcher (247.84475ms)
  Error: Toolkit verification evidence contradicts the integrity manifest: missing - Recorded at: 2026-07-19T23:34:52.000Z.
      at verifyEvidenceClaims (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:84:22)
      at verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:135:3)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:647:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:605:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:699:1
✖ GUIDE GHOSTTY MUTATION: a failed Producer request refuses duplicate automatic recovery (244.744792ms)
  Error: Toolkit verification evidence contradicts the integrity manifest: missing - Recorded at: 2026-07-19T23:34:52.000Z.
      at verifyEvidenceClaims (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:84:22)
      at verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:135:3)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:647:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:701:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:747:1
✖ GUIDE GHOSTTY REVIEWER READINESS MUTATION: a window request without a live Reviewer never opens Producer (233.73475ms)
  Error: Toolkit verification evidence contradicts the integrity manifest: missing - Recorded at: 2026-07-19T23:34:52.000Z.
      at verifyEvidenceClaims (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:84:22)
      at verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:135:3)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:647:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:749:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:776:1
✖ GUIDE GHOSTTY PRODUCER READINESS MUTATION: a window request without a live Producer refuses success (222.84475ms)
  Error: Toolkit verification evidence contradicts the integrity manifest: missing - Recorded at: 2026-07-19T23:34:52.000Z.
      at verifyEvidenceClaims (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:84:22)
      at verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:135:3)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:647:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:778:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:806:1
✖ GUIDE VISIBLE ROLE STATUS: disk liveness reports a missing Producer instead of pretending the session is active (232.362958ms)
  Error: Toolkit verification evidence contradicts the integrity manifest: missing - Recorded at: 2026-07-19T23:34:52.000Z.
      at verifyEvidenceClaims (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:84:22)
      at verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:135:3)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:647:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:808:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:845:1
✖ GUIDE GHOSTTY OWNER-ERROR RECOVERY: one action reopens Reviewer first and Producer only after it is ready (212.492125ms)
  Error: Toolkit verification evidence contradicts the integrity manifest: missing - Recorded at: 2026-07-19T23:34:52.000Z.
      at verifyEvidenceClaims (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:84:22)
      at verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:135:3)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:647:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:847:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:936:1
✖ GUIDE GHOSTTY PARTIAL RECOVERY: an existing Reviewer permits exactly one missing Producer retry (312.530292ms)
  Error: Toolkit verification evidence contradicts the integrity manifest: missing - Recorded at: 2026-07-19T23:34:52.000Z.
      at verifyEvidenceClaims (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:84:22)
      at verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:135:3)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:647:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:938:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:1093:1
✖ GUIDE GHOSTTY BOTH-WINDOW RECOVERY: a saved owner decision restores Reviewer before Producer when both disappeared (212.309584ms)
  Error: Toolkit verification evidence contradicts the integrity manifest: missing - Recorded at: 2026-07-19T23:34:52.000Z.
      at verifyEvidenceClaims (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:84:22)
      at verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:135:3)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:647:14)
      at async bothWindowsMissingAfterPartialRecovery (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1041:3)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1094:27)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:1177:1
✖ GUIDE GHOSTTY BOTH-WINDOW RECOVERY MUTATION: Producer stays closed when restored Reviewer is not ready (196.363584ms)
  Error: Toolkit verification evidence contradicts the integrity manifest: missing - Recorded at: 2026-07-19T23:34:52.000Z.
      at verifyEvidenceClaims (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:84:22)
      at verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:135:3)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:647:14)
      at async bothWindowsMissingAfterPartialRecovery (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1041:3)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1178:27)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/plural-runtime-integration.test.ts:49:1
✖ PLURAL LIVE RUNTIME: two independent Producer/Reviewer pairs complete without crossed sessions (342.472042ms)
  Error: Toolkit verification evidence contradicts the integrity manifest: missing - Recorded at: 2026-07-19T23:34:52.000Z.
      at verifyEvidenceClaims (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:84:22)
      at verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:135:3)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:647:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/plural-runtime-integration.test.ts:87:19)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async startSubtestAfterBootstrap (node:internal/test_runner/harness:385:3)

test at tests/submission.test.ts:15:1
✖ JUDGE JOURNEY SUITE: video and submission documents preserve every live rule (4.550292ms)
  AssertionError [ERR_ASSERTION]: The input did not match the regular expression /\[post-push 197-check pre-handoff transcript\]\(test-results\/2026-07-19-pre-handoff-pushed-final\.md\)/. Input:

  '# Koda-C\n' +
    '\n' +
    "> “I design workflows. I don't write code. I gave my development discipline to Codex in one document. It built a toolkit where nothing advances without written proof the review was read.”\n" +
    '\n' +
    "Koda-C is a small, headless workflow over plain files. Its mechanical gate refuses to advance work until the current artifact exists, an independent review exists, the verdict permits advancement, and the owner quotes that review's unique closing receipt into the approval ledger.\n" +
    '\n' +
    'The naming is deliberate: **Koda-C** is the product, `koda` is its CLI command, and `koda-codex` is this lowercase repository/package slug for the Codex-built competition implementation.\n' +
    '\n' +
    'No UI, daemon, database, or conversational memory treated as authority. The files are the truth.\n' +
    '\n' +
    'This repository is the competition entry and the meta-harness, not a universal ready-made project persona. Koda-C keeps the proof mechanism stable; each project is expected to keep purpose-specific `AGENTS.md`, producer skills, shared-reviewer criteria, evidence shapes, and verification commands in its own repository. A novel-writing project and a Rust project can use the same gate without pretending their work or review standards are interchangeable.\n' +
    '\n' +
    '## Judge path\n' +
    '\n' +
    '1. **Run without rebuilding:** `node dist/cli.js --help`.\n' +
    '2. **See the refusal:** follow the [one-minute fixture](DEMO.md#one-minute-mechanical-proof).\n' +
    '3. **Inspect the real relay:** the [genuine six-phase result](relay-runs/2026-07-18-software-clean-sol-medium-terra-medium-01/RESULT.md) records distinct persistent producer/reviewer contexts, an unplanned Summary REVISE, seven owner acknowledgements, and pushed close.\n' +
    '4. **Check the claims:** the current [pushed 206-check transcript](test-results/2026-07-19-repeatable-recovery-pushed.md), [repeatable-recovery security audit](security-runs/2026-07-19-repeatable-recovery-audit-11/RESULT.md), [first-use UX audit](quality-runs/2026-07-19-repeatable-recovery-ux-audit-06/RESULT.md), [sanitized first-launch incident](security-runs/2026-07-19-ghostty-launch-integrity-incident/RESULT.md), [model matrix](MODEL-TEST-MATRIX.md), [fresh ten-skill discovery proof](discovery-runs/2026-07-19-fresh-codex-startup-06/RESULT.md), and [fresh plural-session Guide preflight](guide-preflight-runs/2026-07-19-sol-medium-05/RESULT.md) are committed evidence.\n' +
    '\n' +
    'Tested here on macOS 26.5.1 arm64 with Node.js 26.0.0 and Apple Git 2.50.1. The core requires Node.js 22.18+ and Git; other platforms are not claimed as tested. The current reviewer window uses macOS `less` and `pbcopy` for the owner-reading ceremony.\n' +
    '\n' +
    '## Why it exists\n' +
    '\n' +
    'Kristian developed this phase method while building products in C++, Swift, and Rust as a designer rather than a programmer: session prompt, brief, orient, plan, produce, live, summary, then push. The sequence grew from observing what stopped repeated rework. When he added an independent LLM reviewer, each phase became a manual relay between separate chats—better judgment, but an absurd amount of copy-paste.\n' +
    '\n' +
    'Koda-C asks whether that practiced producer/reviewer relay can become mechanical while preserving the parts that create depth. Kristian directs software he cannot personally read. The expensive failures in his AI collaborations shared one shape: work advanced on confident prose. A summary claimed more than the files proved. Status came from conversational memory. Most sharply, a written review was delivered and then approved without being read.\n' +
    '\n' +
    'That last incident created the receipt. Every review ends with a generated, unique `RECEIPT:` line. The approver must read the review and quote that line exactly before the gate can open. Delivery and reading become separate steps the files can distinguish.\n' +
    '\n' +
    'This is evidence of engagement, not mind-reading. Someone can still copy a final line without understanding the review. But not-reading stops being a passive omission and becomes deliberate fraud: the approver must open the review to take its unique phrase. Koda-C creates an inspectable decision ritual and raises the floor against casual or accidental skipping; it does not claim to prove cognition.\n' +
    '\n' +
    '## The mechanism\n' +
    '\n' +
    'A session snapshots a configurable phase chain. The native chain is:\n' +
    '\n' +
    '`brief → orient → plan → produce → live → summary`\n' +
    '\n' +
    'For each phase:\n' +
    '\n' +
    '1. A producer skill passes its entry check and writes the phase artifact.\n' +
    '2. The one shared `koda-c-review` skill verifies the artifact from a separate context and writes a verdict plus generated receipt.\n' +
    '3. The owner reads the review and quotes the exact receipt through `approve`.\n' +
    '4. `advance` re-reads disk and routes:\n' +
    '   - APPROVE / APPROVE WITH COMMENTS → activate the next phase from config;\n' +
    '   - REVISE / REJECT → remain in the same producer phase;\n' +
    '   - DISCUSS → remain in phase for an owner ruling and fresh review.\n' +
    '\n' +
    'Advancement revalidates all earlier gates too. Deleting or changing old evidence makes later work refuse even when `state.json` names a current phase.\n' +
    '\n' +
    'After the final phase advances, the first `session close` creates immutable `close.md`, bound to all durable session files and the final review receipt. Git commit and push happen next. A second `session close` writes nothing; it reports closed only if the bound files are unchanged, committed, clean, and present on the pushed upstream. Another session cannot open before pushed terminal proof exists: normal close or explicit halt.\n' +
    '\n' +
    "Direction during a phase has exactly two verbs. **Wait** is the default: Koda writes the owner's exact words, source, time, frozen phase-entry hash, and observed artifact/review hashes immediately, but Producer receives the direction only through the next successful advancement record. The receiving artifact must cite its direction ID; early use refuses. **Halt** is the only interrupt: immutable `halt.md` voids the in-flight phase, must be committed and pushed, and forces later work through a new session and fresh Brief. There is no pause-inject-resume route.\n" +
    '\n' +
    '## Try the refusal in about one minute\n' +
    '\n' +
    'Requirements: Git and Node.js 22.18 or newer. The source is TypeScript; `prepack` emits dependency-free plain JavaScript under `dist/` so the installed CLI does not ask Node to type-strip code inside `node_modules`.\n' +
    '\n' +
    'The core has no runtime dependencies, install hook, daemon, or network call. Its exact write and trust boundaries—including the model-launching relay scripts—are documented in [SECURITY.md](SECURITY.md).\n' +
    '\n' +
    'From a fresh checkout:\n' +
    '\n' +
    '```bash\n' +
    'npx --yes . --help\n' +
    '```\n' +
    '\n' +
    'That exact path is preserved as a [fresh public-checkout proof](package-runs/2026-07-18-fresh-checkout-npx-01/RESULT.md): the first run exposed an executable-mode defect, and the corrected pushed checkout prints help without changing any tracked or untracked file.\n' +
    '\n' +
    'Then follow the [one-minute fixture](DEMO.md#one-minute-mechanical-proof). Its money moment is:\n' +
    '\n' +
    '```text\n' +
    'GATE CLOSED — BRIEF\n' +
    '✗ The current review receipt has not been quoted into the approval ledger.\n' +
    'Nothing advanced.\n' +
    '```\n' +
    '\n' +
    'After the exact receipt is recorded, the same command reports `GATE OPEN — BRIEF`.\n' +
    '\n' +
    '## CLI\n' +
    '\n' +
    '```text\n' +
    'koda init [directory] [--demo]\n' +
    'koda guide status\n' +
    'koda guide confirm <prompt-file> --owner <name> [--kind <kind>] [--depends-on <session-id>] [--independent]\n' +
    'koda guide cancel <launch-id> --owner <name> --reason <text>\n' +
    'koda guide bind <launch-id> <session-id>\n' +
    'koda guide verify\n' +
    'koda guide launch --producer-model <model> --producer-effort <effort> --reviewer-model <model> --reviewer-effort <effort> [--open ghostty]\n' +
    'koda guide recover --open ghostty\n' +
    'koda session new <prompt-file> [--kind <kind>] [--depends-on <session-id>] [--independent]\n' +
    'koda status [--session <session-id>]\n' +
    'koda review new <phase> [--session <session-id>]\n' +
    'koda direction wait <owner-message-file> <classification-file> [--source owner-via-guide|owner-via-reviewer] [--session <session-id>]\n' +
    'koda approve <phase> [quoted-receipt] [--approver <name>] [--session <session-id>]\n' +
    'koda advance [--session <session-id>]\n' +
    'koda session halt [owner-direction-file] [--session <session-id>]\n' +
    'koda session close [--session <session-id>]\n' +
    '```\n' +
    '\n' +
    'The CLI generates artifact hashes, review IDs, receipts, structured approval entries, advancement history, and immutable close metadata. All remain readable Markdown or JSON.\n' +
    '\n' +
    '## Skills: the relay above the CLI\n' +
    '\n' +
    "All skills live inside this repository under Codex's discoverable `.agents/skills/` path:\n" +
    '\n' +
    '- `koda-c-session-prompt` is the sole Guide skill route toward a bounded session. It classifies the request from disk: dependent successors wait for pushed terminal evidence, explicit independent siblings may proceed, and a different kind label alone never proves independence.\n' +
    '- `koda-c-session` opens from an owner contract and prior pushed summary.\n' +
    '- `koda-c-brief`, `koda-c-orient`, `koda-c-plan`, `koda-c-produce`, `koda-c-live`, and `koda-c-summary` are producer relay legs.\n' +
    '- `koda-c-review` is the only formal reviewer skill; its per-phase criteria never drift into copies.\n' +
    '- `koda-c-close` performs the prepare → Git → verify ceremony outside the phase chain.\n' +
    '\n' +
    'A [fresh ephemeral Codex startup proof](discovery-runs/2026-07-18-fresh-codex-startup-01/RESULT.md) discovered the original nine session-runtime skills and root project guidance without any tool call or repository read. The current [ten-skill startup proof](discovery-runs/2026-07-19-fresh-codex-startup-06/RESULT.md) independently includes the Guide-side session-prompter under the same zero-tool, zero-read rule. Its historical [active-session run](guide-preflight-runs/2026-07-19-sol-medium-01/RESULT.md) proves the original serialized path. After the owner broadened the product to explicit independent siblings, a newly sealed [plural-session Guide preflight](guide-preflight-runs/2026-07-19-sol-medium-05/RESULT.md) shows fresh Sol/medium refusing a conceptually dependent successor while keeping future-idea conversation open and changing no file.\n' +
    '\n' +
    'Guide reconstructs the project from configured steering files and disk-backed session evidence.'... 17625 more characters

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/submission.test.ts:23:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: true,
    code: 'ERR_ASSERTION',
    actual: "# Koda-C\n\n> “I design workflows. I don't write code. I gave my development discipline to Codex in one document. It built a toolkit where nothing advances without written proof the review was read.”\n\nKoda-C is a small, headless workflow over plain files. Its mechanical gate refuses to advance work until the current artifact exists, an independent review exists, the verdict permits advancement, and the owner quotes that review's unique closing receipt into the approval ledger.\n\nThe naming is deliberate: **Koda-C** is the product, `koda` is its CLI command, and `koda-codex` is this lowercase repository/package slug for the Codex-built competition implementation.\n\nNo UI, daemon, database, or conversational memory treated as authority. The files are the truth.\n\nThis repository is the competition entry and the meta-harness, not a universal ready-made project persona. Koda-C keeps the proof mechanism stable; each project is expected to keep purpose-specific `AGENTS.md`, producer skills, shared-reviewer criteria, evidence shapes, and verification commands in its own repository. A novel-writing project and a Rust project can use the same gate without pretending their work or review standards are interchangeable.\n\n## Judge path\n\n1. **Run without rebuilding:** `node dist/cli.js --help`.\n2. **See the refusal:** follow the [one-minute fixture](DEMO.md#one-minute-mechanical-proof).\n3. **Inspect the real relay:** the [genuine six-phase result](relay-runs/2026-07-18-software-clean-sol-medium-terra-medium-01/RESULT.md) records distinct persistent producer/reviewer contexts, an unplanned Summary REVISE, seven owner acknowledgements, and pushed close.\n4. **Check the claims:** the current [pushed 206-check transcript](test-results/2026-07-19-repeatable-recovery-pushed.md), [repeatable-recovery security audit](security-runs/2026-07-19-repeatable-recovery-audit-11/RESULT.md), [first-use UX audit](quality-runs/2026-07-19-repeatable-recovery-ux-audit-06/RESULT.md), [sanitized first-launch incident](security-runs/2026-07-19-ghostty-launch-integrity-incident/RESULT.md), [model matrix](MODEL-TEST-MATRIX.md), [fresh ten-skill discovery proof](discovery-runs/2026-07-19-fresh-codex-startup-06/RESULT.md), and [fresh plural-session Guide preflight](guide-preflight-runs/2026-07-19-sol-medium-05/RESULT.md) are committed evidence.\n\nTested here on macOS 26.5.1 arm64 with Node.js 26.0.0 and Apple Git 2.50.1. The core requires Node.js 22.18+ and Git; other platforms are not claimed as tested. The current reviewer window uses macOS `less` and `pbcopy` for the owner-reading ceremony.\n\n## Why it exists\n\nKristian developed this phase method while building products in C++, Swift, and Rust as a designer rather than a programmer: session prompt, brief, orient, plan, produce, live, summary, then push. The sequence grew from observing what stopped repeated rework. When he added an independent LLM reviewer, each phase became a manual relay between separate chats—better judgment, but an absurd amount of copy-paste.\n\nKoda-C asks whether that practiced producer/reviewer relay can become mechanical while preserving the parts that create depth. Kristian directs software he cannot personally read. The expensive failures in his AI collaborations shared one shape: work advanced on confident prose. A summary claimed more than the files proved. Status came from conversational memory. Most sharply, a written review was delivered and then approved without being read.\n\nThat last incident created the receipt. Every review ends with a generated, unique `RECEIPT:` line. The approver must read the review and quote that line exactly before the gate can open. Delivery and reading become separate steps the files can distinguish.\n\nThis is evidence of engagement, not mind-reading. Someone can still copy a final line without understanding the review. But not-reading stops being a passive omission and becomes deliberate fraud: the approver must open the review to take its unique phrase. Koda-C creates an inspectable decision ritual and raises the floor against casual or accidental skipping; it does not claim to prove cognition.\n\n## The mechanism\n\nA session snapshots a configurable phase chain. The native chain is:\n\n`brief → orient → plan → produce → live → summary`\n\nFor each phase:\n\n1. A producer skill passes its entry check and writes the phase artifact.\n2. The one shared `koda-c-review` skill verifies the artifact from a separate context and writes a verdict plus generated receipt.\n3. The owner reads the review and quotes the exact receipt through `approve`.\n4. `advance` re-reads disk and routes:\n   - APPROVE / APPROVE WITH COMMENTS → activate the next phase from config;\n   - REVISE / REJECT → remain in the same producer phase;\n   - DISCUSS → remain in phase for an owner ruling and fresh review.\n\nAdvancement revalidates all earlier gates too. Deleting or changing old evidence makes later work refuse even when `state.json` names a current phase.\n\nAfter the final phase advances, the first `session close` creates immutable `close.md`, bound to all durable session files and the final review receipt. Git commit and push happen next. A second `session close` writes nothing; it reports closed only if the bound files are unchanged, committed, clean, and present on the pushed upstream. Another session cannot open before pushed terminal proof exists: normal close or explicit halt.\n\nDirection during a phase has exactly two verbs. **Wait** is the default: Koda writes the owner's exact words, source, time, frozen phase-entry hash, and observed artifact/review hashes immediately, but Producer receives the direction only through the next successful advancement record. The receiving artifact must cite its direction ID; early use refuses. **Halt** is the only interrupt: immutable `halt.md` voids the in-flight phase, must be committed and pushed, and forces later work through a new session and fresh Brief. There is no pause-inject-resume route.\n\n## Try the refusal in about one minute\n\nRequirements: Git and Node.js 22.18 or newer. The source is TypeScript; `prepack` emits dependency-free plain JavaScript under `dist/` so the installed CLI does not ask Node to type-strip code inside `node_modules`.\n\nThe core has no runtime dependencies, install hook, daemon, or network call. Its exact write and trust boundaries—including the model-launching relay scripts—are documented in [SECURITY.md](SECURITY.md).\n\nFrom a fresh checkout:\n\n```bash\nnpx --yes . --help\n```\n\nThat exact path is preserved as a [fresh public-checkout proof](package-runs/2026-07-18-fresh-checkout-npx-01/RESULT.md): the first run exposed an executable-mode defect, and the corrected pushed checkout prints help without changing any tracked or untracked file.\n\nThen follow the [one-minute fixture](DEMO.md#one-minute-mechanical-proof). Its money moment is:\n\n```text\nGATE CLOSED — BRIEF\n✗ The current review receipt has not been quoted into the approval ledger.\nNothing advanced.\n```\n\nAfter the exact receipt is recorded, the same command reports `GATE OPEN — BRIEF`.\n\n## CLI\n\n```text\nkoda init [directory] [--demo]\nkoda guide status\nkoda guide confirm <prompt-file> --owner <name> [--kind <kind>] [--depends-on <session-id>] [--independent]\nkoda guide cancel <launch-id> --owner <name> --reason <text>\nkoda guide bind <launch-id> <session-id>\nkoda guide verify\nkoda guide launch --producer-model <model> --producer-effort <effort> --reviewer-model <model> --reviewer-effort <effort> [--open ghostty]\nkoda guide recover --open ghostty\nkoda session new <prompt-file> [--kind <kind>] [--depends-on <session-id>] [--independent]\nkoda status [--session <session-id>]\nkoda review new <phase> [--session <session-id>]\nkoda direction wait <owner-message-file> <classification-file> [--source owner-via-guide|owner-via-reviewer] [--session <session-id>]\nkoda approve <phase> [quoted-receipt] [--approver <name>] [--session <session-id>]\nkoda advance [--session <session-id>]\nkoda session halt [owner-direction-file] [--session <session-id>]\nkoda session close [--session <session-id>]\n```\n\nThe CLI generates artifact hashes, review IDs, receipts, structured approval entries, advancement history, and immutable close metadata. All remain readable Markdown or JSON.\n\n## Skills: the relay above the CLI\n\nAll skills live inside this repository under Codex's discoverable `.agents/skills/` path:\n\n- `koda-c-session-prompt` is the sole Guide skill route toward a bounded session. It classifies the request from disk: dependent successors wait for pushed terminal evidence, explicit independent siblings may proceed, and a different kind label alone never proves independence.\n- `koda-c-session` opens from an owner contract and prior pushed summary.\n- `koda-c-brief`, `koda-c-orient`, `koda-c-plan`, `koda-c-produce`, `koda-c-live`, and `koda-c-summary` are producer relay legs.\n- `koda-c-review` is the only formal reviewer skill; its per-phase criteria never drift into copies.\n- `koda-c-close` performs the prepare → Git → verify ceremony outside the phase chain.\n\nA [fresh ephemeral Codex startup proof](discovery-runs/2026-07-18-fresh-codex-startup-01/RESULT.md) discovered the original nine session-runtime skills and root project guidance without any tool call or repository read. The current [ten-skill startup proof](discovery-runs/2026-07-19-fresh-codex-startup-06/RESULT.md) independently includes the Guide-side session-prompter under the same zero-tool, zero-read rule. Its historical [active-session run](guide-preflight-runs/2026-07-19-sol-medium-01/RESULT.md) proves the original serialized path. After the owner broadened the product to explicit independent siblings, a newly sealed [plural-session Guide preflight](guide-preflight-runs/2026-07-19-sol-medium-05/RESULT.md) shows fresh Sol/medium refusing a conceptually dependent successor while keeping future-idea conversation open and changing no file.\n\nGuide reconstructs the project from configured steering files and disk-backed session evidence."... 17625 more characters,
    expected: /\[post-push 197-check pre-handoff transcript\]\(test-results\/2026-07-19-pre-handoff-pushed-final\.md\)/,
    operator: 'match',
    diff: 'simple'
  }
```
