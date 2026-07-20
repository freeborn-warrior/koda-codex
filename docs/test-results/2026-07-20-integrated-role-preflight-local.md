# Per-test result — 2026-07-20-integrated-role-preflight-local

- Result: **FAIL**
- Recorded at: 2026-07-20T21:01:52.637Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `c6187e1`
- Command: `/opt/homebrew/Cellar/node/26.0.0/bin/node --test --test-reporter=spec tests/concurrent-sessions.test.ts tests/config.test.ts tests/direction.test.ts tests/dogfood.test.ts tests/full-lifecycle.test.ts tests/gate.test.ts tests/guide-console.test.ts tests/guide-runtime-integration.test.ts tests/guide.test.ts tests/halt.test.ts tests/hints.test.ts tests/history.test.ts tests/interruption.test.ts tests/license.test.ts tests/package.test.ts tests/plural-runtime-integration.test.ts tests/quickstart.test.ts tests/receipt-adversarial.test.ts tests/relay-runner.test.ts tests/relay-status.test.ts tests/relay-window.test.ts tests/review-binding.test.ts tests/review.test.ts tests/reviewer-fixtures.test.ts tests/security.test.ts tests/session.test.ts tests/skill.test.ts tests/stale-review.test.ts tests/status-truth.test.ts tests/submission.test.ts tests/toolkit-integrity.test.ts tests/workset.test.ts`

Every discovered test and subtest is named below. No result is aggregated away.

```text
✔ CONCURRENT SESSION ALLOCATION: simultaneous starts receive distinct disk identities (39.289459ms)
✔ CONCURRENT SESSION MUTATION: independence is explicit and ambiguous mutation refuses (987.800334ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-dependency-M2UdPF/remote.git
 * [new branch]      main -> main
✔ DEPENDENCY MUTATION: an active predecessor refuses and pushed terminal evidence is hash-bound (1835.795916ms)
✔ the default phase chain is configurable data in the required order (2.563792ms)
✔ config validation rejects unsafe session paths and drifting phase names (0.270958ms)
✔ config validation refuses a sessions directory that resolves outside the project (11.973708ms)
✔ WAIT DIRECTION: record now, keep current contract frozen, and release only through advance (233.138541ms)
✔ WAIT DIRECTION MUTATION: citing a queued direction before its gate refuses split provenance (16.632042ms)
✔ WAIT DIRECTION CARRY: final-boundary direction becomes a hashed next-session Brief input (36.559708ms)
✔ WAIT DIRECTION MUTATION: changed prose and symbolic-link evidence refuse by name (10.290583ms)
✔ WAIT DIRECTION ATOMIC READ: Koda retries its transient file but persistent or unknown entries still refuse (331.644333ms)
✔ WAIT DIRECTION CONTAINMENT: a linked direction directory cannot redirect writes (7.991042ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-direction-boundary-ExR1VN/remote.git
 * [new branch]      main -> main
✔ WAIT FINAL BOUNDARY: a new session prompt must cite direction released by the final gate (1429.722458ms)
✔ the committed dogfood snapshot contains the full native chain and an internally bound close (48.747542ms)
✔ FULL LIFECYCLE SCENARIO: clean approvals traverse all six phases and pushed close (740.883667ms)
✔ FULL LIFECYCLE SCENARIO: a REVISE loop recovers in plan before completing and closing (786.262ms)
✔ FULL LIFECYCLE SCENARIO: DISCUSS records an owner ruling and requires a fresh live review (695.893667ms)
✔ a complete artifact, review, allowed verdict, unique receipt, and ledger proof open the gate (41.176042ms)
▶ GATE MUTATION SUITE: each core condition refuses and names itself
  ✔ artifact exists (32.377375ms)
  ✔ artifact is non-empty (10.512333ms)
  ✔ artifact is a regular file (11.44575ms)
  ✔ review exists (21.94275ms)
  ✔ review is a regular file (42.215459ms)
  ✔ approval ledger is a regular file (28.09825ms)
  ✔ verdict REVISE is blocking (15.763833ms)
  ✔ verdict REJECT is blocking (10.770375ms)
  ✔ verdict DISCUSS is blocking (15.921375ms)
  ✔ current receipt is quoted verbatim in the ledger (9.550125ms)
✔ GATE MUTATION SUITE: each core condition refuses and names itself (204.165625ms)
✔ outer receipt whitespace is ignored but inner bytes remain literal (29.483208ms)
▶ every gate condition fails closed when deliberately broken
  ✔ artifact missing (20.266042ms)
  ✔ artifact empty (13.585125ms)
  ✔ review missing (8.897125ms)
  ✔ verdict line missing (20.588959ms)
  ✔ verdict unknown (11.098208ms)
  ✔ receipt missing from last line (11.6765ms)
  ✔ generated review metadata missing (10.75125ms)
  ✔ duplicate generated review metadata is ambiguous (10.63075ms)
  ✔ review metadata names a different phase (11.995916ms)
  ✔ artifact changed after review (11.973375ms)
  ✔ final receipt differs from generated receipt (11.888375ms)
  ✔ receipt reused by another review (19.686959ms)
  ✔ approval ledger missing (12.063792ms)
  ✔ exact receipt absent from ledger (16.058666ms)
  ✔ approver missing (20.246667ms)
  ✔ APPROVE WITH COMMENTS has no ledger comments (17.667375ms)
  ✔ REVISE blocks even with receipt proof (19.086708ms)
  ✔ REJECT blocks even with receipt proof (29.454458ms)
  ✔ DISCUSS blocks without an owner ruling (15.716833ms)
  ✔ DISCUSS still blocks after the ruling until a fresh review (8.726ms)
✔ every gate condition fails closed when deliberately broken (304.234125ms)
✔ GUIDE CONSOLE SECURITY: every turn ignores ambient config and rules under the project profile (1.956625ms)
✔ GUIDE CONSOLE SECURITY: the Guide profile retains only named read-only runtime capabilities (0.28125ms)
✔ GUIDE CONSOLE STATE: invalid or ambiguous persistent identity refuses (0.741083ms)
✔ GUIDE CONSOLE TERMINAL SAFETY: model output cannot inject terminal or bidi controls (0.112667ms)
✔ GUIDE CONSOLE VISIBILITY: low-level inspection commands stay in evidence instead of flooding the screen (0.106167ms)
✔ GUIDE CONSOLE STARTUP: reconstruction is explicitly bounded to compact continuity evidence (0.201875ms)
✔ GUIDE CONSOLE LOCK: a live duplicate refuses and a released console can reopen (19.751792ms)
✔ GUIDE CONSOLE CONTAINMENT: a linked runtime parent refuses before lock creation (3.471625ms)
✔ GUIDE CONSOLE CONTAINMENT: Guide continuity cannot grant writes inside session evidence (11.07425ms)
✔ GUIDE OPEN UX: one command enters the persistent console without opening session roles (5.675084ms)
✔ GUIDE OPEN UX: partial launch staffing refuses before the Guide opens (8.5815ms)
✔ GUIDE NUMBERED LAUNCH: 2 preserves a pushed launch and 1 opens the two staffed roles (15.448458ms)
✔ GUIDE CONSOLE PERSISTENCE: a closed console resumes the same independent Guide context (697.9475ms)
✔ GUIDE CONSOLE STARTUP REFUSAL: the primary Codex error is shown before a missing context symptom (351.021125ms)
✔ GUIDE CONSOLE INPUT RECOVERY: input closing during a long startup exits cleanly after preserving the turn (528.274917ms)
✔ GUIDE CONSOLE CRASH EVIDENCE: raw events are durable while a model turn is still running (1299.783875ms)
✔ GUIDE CONSOLE CRASH EVIDENCE MUTATION: existing or linked evidence refuses before the model runs (188.053667ms)
✖ GUIDE REAL-PROJECT RELAY: an independent sibling uses two bound contexts and returns pushed close (2608.009959ms)
✔ GUIDE ENTRY: an active prior session refuses a new launch request and names it (53.215583ms)
✔ GUIDE PREFLIGHT: active work distinguishes blocked successors from explicit independent siblings (141.417041ms)
✔ GUIDE TOOLKIT BINDING: confirmation carries machine-discovered launch integrity (123.861875ms)
✔ GUIDE TOOLKIT MUTATION: changed bound toolkit proof makes the launch stale (74.922708ms)
✔ GUIDE INDEPENDENT CONTROL: an active Produce session permits an owner-classified Explore sibling (68.783291ms)
✔ GUIDE INDEPENDENT BINDING: confirmed kind and independence open exactly one matching sibling (1054.083041ms)
✔ GUIDE PREFLIGHT CONTROL: a project with no active session permits exactly one draft (15.916334ms)
✔ GUIDE HALT RETURN: a pushed halt and every waiting direction must enter a fresh confirmed Brief (1954.214375ms)
✔ GUIDE CONFIRMATION: one request binds prompt, manifest, continuity, and owner (40.127875ms)
✔ GUIDE PROMPT CONTRACT MUTATION: an explicit relationship mismatch refuses before confirmation (28.433916ms)
✔ GUIDE OWNER IDENTITY MUTATION: terminal control characters refuse before confirmation (14.562833ms)
✔ GUIDE VERIFIED HANDOVER: the owner receives a complete numbered launch choice (656.078583ms)
✔ GUIDE MUTATION: changing only a continuity file makes confirmation stale (70.408917ms)
✔ GUIDE MUTATION: changing only the prompt makes confirmation stale (75.570166ms)
✔ GUIDE MUTATION: changing only the project manifest makes confirmation stale (54.903375ms)
✔ GUIDE GIT HANDOVER: a confirmed but uncommitted request refuses launch (492.506208ms)
✔ GUIDE RECOVERY: stale confirmation requires a pushed cancellation before reconfirming (683.356833ms)
✔ GUIDE GATE: a project with a Guide manifest refuses an unconfirmed session prompt (6.276541ms)
✔ GUIDE RELAY: pushed confirmation opens the exact session and records its binding (615.092417ms)
✔ GUIDE BINDING STATUS: the session-local binding is close-bound and corruption refuses (768.985292ms)
✔ GUIDE BINDING RECOVERY: an interrupted open can bind only the matching latest session (372.636625ms)
✔ GUIDE STATUS TRUTH: corrupt launch evidence refuses instead of guessing (38.058042ms)
✔ GUIDE RUNTIME: one command binds a pushed launch and prints executable session-context commands (1055.288625ms)
✔ GUIDE RUNTIME OWNER MUTATION: removing the bound owner refuses by name (523.97675ms)
✔ GUIDE RUNTIME LEGACY: a version-1 Kristian runtime remains readable (462.613292ms)
✔ GUIDE RUNTIME MUTATION: an unignored runtime refuses by name (408.348708ms)
✔ GUIDE RUNTIME PLURALITY: unfinished runtimes coexist and status names each one (674.341792ms)
✔ GUIDE RUNTIME MUTATION: a linked RUN.json refuses as unsafe state (496.851625ms)
✔ GUIDE RUNTIME STATUS TRUTH: corrupt live state refuses instead of hiding behind launch state (492.028875ms)
✔ GUIDE RUNTIME STATUS TRUTH: a forged HALTED label refuses without pushed halt evidence (478.56675ms)
▶ GUIDE GHOSTTY START: one explicit action requests exactly one clean Reviewer and Producer launcher
  ✔ GHOSTTY LOGIN RESOLUTION MUTATION: a directory-changing login cannot strand either role command (0.086208ms)
✔ GUIDE GHOSTTY START: one explicit action requests exactly one clean Reviewer and Producer launcher (904.842875ms)
✔ GUIDE GHOSTTY MUTATION: a failed Producer request refuses duplicate automatic recovery (463.326041ms)
✔ GUIDE GHOSTTY REVIEWER READINESS MUTATION: a window request without a live Reviewer never opens Producer (444.516292ms)
✔ GUIDE GHOSTTY PRODUCER READINESS MUTATION: a window request without a live Producer refuses success (454.565ms)
✔ GUIDE VISIBLE ROLE STATUS: disk liveness reports a missing Producer instead of pretending the session is active (436.818792ms)
✔ GUIDE GHOSTTY OWNER-ERROR RECOVERY: one action reopens Reviewer first and Producer only after it is ready (386.43025ms)
✔ GUIDE GHOSTTY STABLE-HANDOVER RECOVERY: any formal owner decision can restore both missing roles (408.968833ms)
✔ GUIDE GHOSTTY STABLE-HANDOVER MUTATION: a missing reviewer job refuses instead of guessing (370.423459ms)
✔ GUIDE GHOSTTY STABLE-HANDOVER RETRY: a Reviewer startup miss stays safely recoverable (386.882125ms)
✔ GUIDE GHOSTTY STABLE-HANDOVER BINDING MUTATION: a changed Reviewer job refuses recovery (389.388833ms)
✔ GUIDE GHOSTTY PARTIAL RECOVERY: an existing Reviewer permits exactly one missing Producer retry (404.866334ms)
✔ GUIDE GHOSTTY BOTH-WINDOW RECOVERY: a saved owner decision restores Reviewer before Producer when both disappeared (409.256375ms)
✔ GUIDE CONSOLE RECOVERY: displayed choices are handled outside the model without weakening the gate (392.352459ms)
✔ GUIDE CONSOLE RECOVERY MUTATION: a bare number never guesses between two recoverable sessions (380.353667ms)
✔ GUIDE GHOSTTY BOTH-WINDOW RECOVERY MUTATION: Producer stays closed when restored Reviewer is not ready (375.875041ms)
✔ HALT CEREMONY: void the in-flight phase, require pushed evidence, then return through a fresh Brief (4223.897583ms)
✔ HALT STATUS TRUTH: corrupt halt evidence is named and never treated as terminal (371.498542ms)
✔ HALT TERMINAL MUTATION: halt and close evidence can never coexist (21.014542ms)
✔ the approval and advancement recovery commands run exactly as printed (670.613958ms)
✔ the missing-review recovery command runs exactly as printed (686.593416ms)
✔ a phase entry remains valid only while every prior gate proof still exists on disk (59.245333ms)
✔ INTERRUPTION SCHEMA: role, purpose, time, and evidence filenames remain one shared fail-closed contract (3.004416ms)
✔ INTERRUPTION RECOVERY: Ctrl-C kills Producer, distrusts partial artifact, and resumes the same context (1708.908666ms)
✖ INTERRUPTION RECOVERY: Ctrl-C returns a formal Reviewer job to PENDING and resumes the same context (8528.70225ms)
✖ INTERRUPTION RECOVERY: an interrupted owner conversation resumes without losing its disk-bound direction (8350.605292ms)
✔ INTERRUPTION MUTATION: missing first-turn context ID refuses automatic worker replacement (2993.068333ms)
✔ the repository carries the complete GPLv3-only license and Kristian's sole copyright (3.862667ms)
✔ PACKAGED NPX SUITE: the source-controlled binary is executable before npm touches it (4.02275ms)
✔ PACKAGED NPX SUITE: the documented local npx command does not mutate its checkout (4860.612ms)
✔ PACKAGED NPX SUITE: a real tarball installs and runs the plain-JavaScript koda binary (7763.697375ms)
✖ PLURAL LIVE RUNTIME: two independent Producer/Reviewer pairs complete without crossed sessions (2879.052917ms)
✔ FULL-SESSION QUICK START: one command creates a pushed project and numbered Guide launch (2574.852375ms)
✔ RECEIPT ADVERSARIAL SUITE: an earlier review's receipt cannot approve a fresh review (35.991125ms)
✔ RECEIPT ADVERSARIAL SUITE: phase N receipt cannot approve phase N+1 (14.708875ms)
✔ RECEIPT ADVERSARIAL SUITE: outer whitespace is accepted and any inner word change refuses (22.552584ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REVISE (12.907542ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REJECT (12.339292ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override DISCUSS (12.121ms)
✔ FULL RELAY RUNNER: preparation creates a clean pushed project with local skills (684.015709ms)
✖ FULL RELAY RUNNER: execution preserves two contexts and binds owner acknowledgement to the full receipt (4.353ms)
✔ GENUINE FULL RELAY EVIDENCE: six phases, revision recovery, distinct contexts, and pushed close (19.117083ms)
✔ RELAY STATUS TRUTH: a prepared run names all roles and prints only the first safe action (662.158292ms)
✔ RELAY STATUS TRUTH: after Reviewer is alive, Producer becomes the one safe next action (655.728875ms)
✔ RELAY STATUS TRUTH: a stopped reviewer process names explicit stale-lock recovery (645.52975ms)
✔ RELAY STATUS TRUTH: an active recorded producer is never duplicated by a blind hint (697.567916ms)
✔ RELAY STATUS TRUTH: corrupt or ambiguous run state refuses instead of guessing (1882.428625ms)
✔ RELAY STATUS TRUTH: a corrupt waiting direction refuses immediately by name (614.229ms)
✔ TWO-WINDOW PROTOCOL: reviewer jobs are bounded and duplicate reviewer windows refuse (40.829041ms)
✔ TWO-WINDOW VISIBILITY: progress is readable without exposing review receipts (0.306334ms)
✖ REVIEWER OPEN CONVERSATION: an idle owner question resumes the Reviewer but changes no project file (726.288125ms)
✖ REVIEWER OPEN CONVERSATION MUTATION: an empty final answer refuses instead of pretending conversation completed (687.791209ms)
✖ REVIEWER OPEN CONVERSATION SCOPE: project-level thought returns to Guide without mutation (692.820167ms)
✖ REVIEWER OPEN CONVERSATION WAIT: active direction is recorded but cannot become a current-phase handback (747.354292ms)
✖ REVIEWER OPEN CONVERSATION TTY: a real terminal line reaches the idle Reviewer prompt (882.0585ms)
✔ TWO-WINDOW RECEIPT: short owner code maps to the exact disk receipt (775.555541ms)
✔ TWO-WINDOW TERMINAL SAFETY: inline review controls are sanitized without changing disk evidence (666.747625ms)
✔ TWO-WINDOW RECEIPT MUTATION: a wrong review code refuses, names the condition, and remains retryable (754.284166ms)
✔ TWO-WINDOW RECEIPT ADVERSARIAL: a valid code from another review refuses (434.690958ms)
✖ WAIT AT FORMAL REVIEW: new direction is recorded immediately but does not revise the reviewed artifact (443.326125ms)
✖ WAIT RECEIPT BINDING: a recorded direction survives a wrong receipt but nothing advances (500.316042ms)
✔ TWO-WINDOW RECEIPT RECOVERY: the live legacy acknowledgement failure reopens the same review and context (825.111417ms)
✔ TWO-WINDOW PRODUCER RECOVERY: an awaiting formal review is rejoined instead of replaced (947.350625ms)
✔ TWO-WINDOW OWNER CEREMONY TTY: inline review and numbered choices disclose the code step (10732.37275ms)
✔ TWO-WINDOW OWNER CEREMONY TTY: stop for now preserves an explicit resumable decision point (494.289667ms)
✔ TWO-WINDOW OWNER CEREMONY TTY: inline review does not invoke a configured pager (495.958833ms)
✔ TWO-WINDOW OWNER CEREMONY TTY: acknowledgement never invokes pbcopy (600.106958ms)
✖ WAIT CONTRACT MIGRATION: the superseded same-phase handback marker refuses by name (389.336208ms)
✔ REVIEWER HALT: the sole interrupt voids the phase and pushes immutable evidence without a receipt (822.365125ms)
✖ TWO-WINDOW RELAY: a pending formal-review job wakes one persistent reviewer and returns acknowledged disk evidence (377.958917ms)
✖ TWO-WINDOW SESSION: separate producer and reviewer processes rendezvous through pushed close (1361.84ms)
✔ REVIEW BINDING SUITE: changing review findings after owner acknowledgement refuses (41.711042ms)
✔ REVIEW BINDING SUITE: an untouched generated template cannot become an approved review (59.408292ms)
✔ a current review cannot be replaced before its receipt is recorded (21.280875ms)
✔ a revised artifact receives a fresh review, fresh receipt, and archived prior review (16.630084ms)
✔ DISCUSS requires the owner's ruling before a fresh definitive review (26.879833ms)
✔ REVIEWER FIXTURES: five sealed fixtures ship as blind Koda projects (26.32875ms)
✔ REVIEWER FIXTURES: the planted hard number is unsupported and the control has no plant (0.893834ms)
✔ REVIEWER FIXTURES: inference-chain plant requires a deduction across three source files (0.422375ms)
✔ REVIEWER FIXTURES: tempting honest control is imperfect in style but its claims execute (82.0395ms)
✔ REVIEWER FIXTURES: evidence-absence trap has working code but its claimed run record is missing (118.454ms)
✔ REVIEWER FIXTURES: new scoring contracts still match their pre-run Git seal (54.905125ms)
✖ REVIEWER FIXTURES: Ghostty runs pin model and effort and preserve ephemeral Codex events (2.80975ms)
✔ REVIEWER FIXTURES: the bounded model matrix is backed by seventeen graded run folders (51.321709ms)
✔ PROJECT SANDBOX SUITE: role turns fail closed with project-scoped read and write access (0.931166ms)
✔ PROJECT SANDBOX SUITE: Guide permission table stays bounded without granting the toolkit project (29.260334ms)
✔ PROJECT SANDBOX SUITE: every verified session role carries the toolkit proof automatically (22.255583ms)
✔ PROJECT SANDBOX SUITE: the Node toolchain root is a narrow explicit read capability (1.838583ms)
✔ PROJECT SANDBOX SUITE: the resolved Git toolchain avoids the macOS xcrun cache shim (0.269542ms)
✔ PROJECT SANDBOX SUITE: read-only probes cannot mutate their workspace (0.173708ms)
✔ SECURITY INTEGRITY SUITE: the install is dependency-free with no install hook (2.587125ms)
✔ SECURITY INTEGRITY SUITE: the committed repository contains no symbolic link (12.901208ms)
✔ SECURITY INTEGRITY SUITE: tracked text contains no common live credential signature (248.512ms)
✔ SECURITY INTEGRITY SUITE: relay roles and model children never inherit ambient credentials or parent context identity (0.513833ms)
✔ SECURITY INTEGRITY SUITE: role launcher bytes ignore ambient terminal locale and color (0.584792ms)
✔ SECURITY INTEGRITY SUITE: owner receipt and ruling data never enter child-process arguments or environment (0.921458ms)
✔ SECURITY INTEGRITY SUITE: fresh-model evidence runs strip ambient credentials and parent context identity (0.565959ms)
✔ SECURITY INTEGRITY SUITE: every managed Codex exec ignores ambient command rules (1.165334ms)
✔ SECURITY INTEGRITY SUITE: the executable Ghostty role launcher starts one child with a clean environment (260.733666ms)
✔ session creation requires a prompt and numbers dated folders (33.209666ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-Dhd3sL/remote.git
 * [new branch]      main -> main
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-Dhd3sL/remote.git
   17d5506..78b3cb6  main -> main
✔ a completed session is closed only after its state is committed and pushed (3922.503291ms)
✔ immutable close refuses symbolic links inside session evidence (9.924833ms)
✔ immutable close refuses duplicate generated metadata markers (0.115542ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-ignored-remote-AiYUI0/remote.git
 * [new branch]      main -> main
✔ immutable close refuses a bound session file that Git ignored instead of pushing (297.415667ms)
✔ every Koda-C skill has valid relay sections and four-line Codex metadata (8.684041ms)
✔ skill index metadata stays concise, front-loaded, and trigger-specific (3.017459ms)
✔ producer phase skills hand only to the one shared reviewer (1.568333ms)
✔ concurrent relay skills require bound session identity instead of latest-session guessing (1.735166ms)
✔ the shared reviewer keeps all phase criteria in one place (1.303042ms)
✔ in-phase consultation is disk-backed and cannot impersonate formal review (2.11375ms)
✔ session open and close remain ceremonies outside producer phase routing (1.163667ms)
✔ the session-prompt skill is the sole skill route to a future session launch (2.355709ms)
✔ the fresh Guide preflight model run is sealed, blind, ephemeral, and read-only (0.598709ms)
✔ historical fresh Codex startup discovered the original nine local skills and root guidance without reading disk (1.792334ms)
✔ fresh Codex discovers all ten current skills and the active Guide preflight refuses without mutation (1.073541ms)
✔ STALE-REVIEW BINDING: editing the artifact after review refuses with a named re-review reason (34.524708ms)
✔ STALE-REVIEW BINDING: reviewing after an edit binds the new artifact and opens (20.259333ms)
✔ STATUS TRUTH SUITE: deleting a review is reflected immediately (349.515959ms)
✔ STATUS TRUTH SUITE: blanking an artifact is reflected immediately (341.154ms)
✔ STATUS TRUTH SUITE: corrupt ledger metadata refuses with a named corruption reason (167.654833ms)
✔ STATUS TRUTH SUITE: editing an acknowledged review is reflected immediately (175.614916ms)
✔ STATUS TRUTH SUITE: invalid state JSON refuses instead of guessing (255.7475ms)
✔ STATUS TRUTH SUITE: a path-like phase name in state refuses instead of escaping (186.210458ms)
✔ JUDGE JOURNEY SUITE: the committed binary runs without rebuilding (101.486333ms)
✔ JUDGE JOURNEY SUITE: video and submission documents preserve every live rule (2.327292ms)
✔ JUDGE JOURNEY SUITE: local links in the judge documents resolve (10.330625ms)
✔ TOOLKIT INTEGRITY: a complete manifest proves the installed launch surface (16.71625ms)
✔ TOOLKIT INTEGRITY CAPABILITY: a sandbox receives only exact verified read paths (5.828291ms)
✔ TOOLKIT INTEGRITY PERMISSIONS: public runtime code compacts without granting docs or runtime state (4.719375ms)
✔ TOOLKIT INTEGRITY MUTATION: changed launch code refuses and names the file (4.606625ms)
✔ TOOLKIT INTEGRITY MUTATION: linked evidence refuses instead of following it (4.812583ms)
✔ TOOLKIT INTEGRITY MUTATION: a manifest cannot overstate its hashed test evidence (3.836791ms)
✔ WRITE SET: claims exact clean paths and refuses Guide or sibling overlap (215.485959ms)
✔ WRITE SET CONCURRENCY: simultaneous same-path claims cannot both succeed (182.007875ms)
✔ WRITE SET CONTAINMENT: a linked parent cannot alias a claimed output path (111.215583ms)
✔ WRITE SET CLI: explicit session identity records project-relative output ownership (262.084791ms)
✔ WRITE SET STATUS TRUTH: corrupt disk evidence refuses instead of inferring state (216.494917ms)
✔ GUIDE WRITE SET: new Guide files are explicit and active-session overlap refuses (249.1925ms)
✔ WRITE SET: unrelated Guide and sibling dirt may coexist; unclaimed dirt refuses (280.107709ms)
✔ GUIDE RUNTIME OWNERSHIP: published run and return namespaces are never mistaken for sibling work (176.892583ms)
✔ WRITE SET MUTATION: rename and delete are exact owned changes, including both rename sides (455.294792ms)
✔ WRITE SET MUTATION: staged bytes must match the recorded post-work hash (202.31025ms)
✔ WRITE SET MUTATION: a claimed path changed after post-work observation refuses by name (166.90175ms)
✔ GIT LOCK: live owner refuses, stale lock recovers only with an empty index (148.647666ms)
✔ GIT LOCK SERIALIZATION: relay callers may wait for a live short ceremony (182.868167ms)
✔ GIT LOCK SERIALIZATION MUTATION: release between inspection steps retries instead of leaking ENOENT (84.358583ms)
✔ GIT LOCK RELEASE MUTATION: a new owner acquired during cleanup is never deleted by the retiring owner (88.274208ms)
✔ GIT LOCK CONTAINMENT: linked .koda cannot redirect lock evidence (79.95825ms)
✔ GIT LOCK CONTAINMENT MUTATION: a disk-supplied token cannot become a retired path (94.536625ms)
ℹ tests 248
ℹ suites 0
ℹ pass 232
ℹ fail 16
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 27951.090709

✖ failing tests:

test at tests/guide-runtime-integration.test.ts:56:1
✖ GUIDE REAL-PROJECT RELAY: an independent sibling uses two bound contexts and returns pushed close (2608.009959ms)
  AssertionError [ERR_ASSERTION]: The input did not match the regular expression /Injected interruption after Guide return staging and before project mutation/. Input:

  '\n' +
    '────────────────────────────────────────────────────────\n' +
    'RELAY PAUSED SAFELY\n' +
    '────────────────────────────────────────────────────────\n' +
    'runtime is not defined\n' +
    '\n' +
    'Return to Guide and say: Recover this session. This Producer window may be closed.\n' +
    '────────────────────────────────────────────────────────\n'

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide-runtime-integration.test.ts:206:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async startSubtestAfterBootstrap (node:internal/test_runner/harness:385:3) {
    generatedMessage: true,
    code: 'ERR_ASSERTION',
    actual: '\n────────────────────────────────────────────────────────\nRELAY PAUSED SAFELY\n────────────────────────────────────────────────────────\nruntime is not defined\n\nReturn to Guide and say: Recover this session. This Producer window may be closed.\n────────────────────────────────────────────────────────\n',
    expected: /Injected interruption after Guide return staging and before project mutation/,
    operator: 'match',
    diff: 'simple'
  }

test at tests/interruption.test.ts:186:1
✖ INTERRUPTION RECOVERY: Ctrl-C returns a formal Reviewer job to PENDING and resumes the same context (8528.70225ms)
  Error: Timed out waiting for the Reviewer model turn.
      at waitFor (file:///Users/freeborn/Dev/koda-codex/tests/interruption.test.ts:72:9)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/interruption.test.ts:265:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/interruption.test.ts:303:1
✖ INTERRUPTION RECOVERY: an interrupted owner conversation resumes without losing its disk-bound direction (8350.605292ms)
  Error: Timed out waiting for the owner conversation turn.
      at waitFor (file:///Users/freeborn/Dev/koda-codex/tests/interruption.test.ts:72:9)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/interruption.test.ts:346:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/plural-runtime-integration.test.ts:49:1
✖ PLURAL LIVE RUNTIME: two independent Producer/Reviewer pairs complete without crossed sessions (2879.052917ms)
  AssertionError [ERR_ASSERTION]: Producer A failed.
  STDOUT:

  ────────────────────────────────────────────────────────
  KODA-C PRODUCER WINDOW
  ────────────────────────────────────────────────────────
  Producer: gpt-5.6-sol / medium
  Session: not opened yet

  Owner input: CLOSED — watch here; speak only in the Reviewer window.
  This context remains the Producer for the complete configured session.
  NO ACTION NEEDED — watch only.
  ────────────────────────────────────────────────────────

  ────────────────────────────────────────────────────────
  PHASE 1/1 — BRIEF
  ────────────────────────────────────────────────────────
  State: ACTIVE — inputs frozen at phase entry.
  Handover: Producer artifact → independent Reviewer → owner receipt → mechanical gate.

  NO ACTION NEEDED — watch only.
  ────────────────────────────────────────────────────────

  ────────────────────────────────────────────────────────
  PRODUCER 1 — produce brief
  ────────────────────────────────────────────────────────
  ────────────────────────────────────────────────────────

  ────────────────────────────────────────────────────────
  PRODUCER BRIEF CONTEXT — 019f0000-0000-7000-8000-000000000011
  ────────────────────────────────────────────────────────

  ────────────────────────────────────────────────────────
  PRODUCER BRIEF UPDATE
  A producer handover complete.
  ────────────────────────────────────────────────────────

  ────────────────────────────────────────────────────────
  PRODUCER BRIEF TURN COMPLETE
  ────────────────────────────────────────────────────────

  ────────────────────────────────────────────────────────
  PRODUCER HANDOVER — BRIEF
  ────────────────────────────────────────────────────────
  Artifact: docs/sessions/2026-07-20-01/phases/01-brief.md
  Observed: non-empty regular artifact, 62 bytes, SHA-256 395757356f7e…

  Control: passed to Window B for independent formal review; the phase remains unadvanced.
  NO ACTION NEEDED — watch only.
  ────────────────────────────────────────────────────────

  ────────────────────────────────────────────────────────
  HANDOVER TO REVIEWER — formal review of brief
  ────────────────────────────────────────────────────────
  The Reviewer receives this automatically. Producer will wait here.

  NO ACTION NEEDED — watch only.
  ────────────────────────────────────────────────────────

  STDERR:

  ────────────────────────────────────────────────────────
  RELAY PAUSED SAFELY
  ────────────────────────────────────────────────────────
  runtime is not defined

  Return to Guide and say: Recover this session. This Producer window may be closed.
  ────────────────────────────────────────────────────────


  2 !== 0

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/plural-runtime-integration.test.ts:222:12)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async startSubtestAfterBootstrap (node:internal/test_runner/harness:385:3) {
    generatedMessage: false,
    code: 'ERR_ASSERTION',
    actual: 2,
    expected: 0,
    operator: 'strictEqual',
    diff: 'simple'
  }

test at tests/relay-runner.test.ts:118:1
✖ FULL RELAY RUNNER: execution preserves two contexts and binds owner acknowledgement to the full receipt (4.353ms)
  AssertionError [ERR_ASSERTION]: The input did not match the regular expression /codexRolePermissionArgs\(run\.cli, codexExecutable, relayNodeToolchainReadRoots\(\)\)/. Input:

  '#!/usr/bin/env node\n' +
    '\n' +
    'import { spawn, spawnSync } from "node:child_process";\n' +
    'import { appendFile, cp, lstat, mkdir, readFile, readdir, realpath, rm } from "node:fs/promises";\n' +
    'import path from "node:path";\n' +
    'import { createInterface } from "node:readline";\n' +
    'import { fileURLToPath } from "node:url";\n' +
    '\n' +
    'import { closePath, evaluateSessionClosure } from "../src/close.ts";\n' +
    'import { verifiedCodexRolePermissionArgs } from "../src/codex-role-permissions.ts";\n' +
    'import { pathExists, readProjectConfig } from "../src/config.ts";\n' +
    'import { evaluateGate } from "../src/gate.ts";\n' +
    'import { acquireGitOperationLock } from "../src/git-operation-lock.ts";\n' +
    'import { evaluateSessionHalt } from "../src/halt.ts";\n' +
    'import { relayOwnerName } from "../src/owner.ts";\n' +
    'import {\n' +
    '  artifactPath,\n' +
    '  currentPhase,\n' +
    '  latestSessionId,\n' +
    '  listSessionIds,\n' +
    '  loadSession,\n' +
    '  readNonEmpty,\n' +
    '  reviewPath,\n' +
    '  sessionRoot,\n' +
    '  writeJsonAtomic,\n' +
    '  writeTextAtomic,\n' +
    '} from "../src/project.ts";\n' +
    'import { readApprovalEntries, sha256 } from "../src/receipt.ts";\n' +
    'import {\n' +
    '  relayCodexEnvironment,\n' +
    '  relayGitToolchainReadRoots,\n' +
    '  relayNodeToolchainReadRoots,\n' +
    '  resolveRelayCodexExecutable,\n' +
    '  resolveRelayGitExecutable,\n' +
    '} from "../src/relay-environment.ts";\n' +
    'import {\n' +
    '  claimSessionPaths,\n' +
    '  ownedSessionPaths,\n' +
    '  reconcileSessionWorkSet,\n' +
    '  stagedProjectPaths,\n' +
    '  verifyStagedSessionClaims,\n' +
    '  verifySessionWorkSetObservations,\n' +
    '} from "../src/workset.ts";\n' +
    'import { terminalBlock, terminalPanel } from "../src/terminal-ui.ts";\n' +
    'import { formatRelayCommand, resolveRelayRunPaths } from "./relay-run-location.ts";\n' +
    'import {\n' +
    '  baseTurnPurpose,\n' +
    '  validTurnPurpose,\n' +
    '  validateModelTurnInterruption,\n' +
    '  type ModelTurnInterruption,\n' +
    '  type RelaySignal,\n' +
    '} from "./relay-interruption.ts";\n' +
    'import {\n' +
    '  PRODUCER_LOCK_DIR,\n' +
    '  REVIEWER_LOCK_DIR,\n' +
    '  acquireProducerWindow,\n' +
    '  newReviewerJob,\n' +
    '  readReviewerJob,\n' +
    '  readReviewerWindowState,\n' +
    '  renderCodexEvent,\n' +
    '  removeReviewerJob,\n' +
    '  writeReviewerJob,\n' +
    '  type ReviewerJob,\n' +
    '  type ReviewerJobKind,\n' +
    '} from "./relay-window-protocol.ts";\n' +
    '\n' +
    'type Role = "producer" | "reviewer";\n' +
    '\n' +
    'type RoleRecord = {\n' +
    '  model: string;\n' +
    '  effort: string;\n' +
    '  threadId: string | null;\n' +
    '  turns: number;\n' +
    '};\n' +
    '\n' +
    'type RunRecord = {\n' +
    '  version: number;\n' +
    '  owner?: string;\n' +
    '  mode?: "fixture-copy" | "guide-project";\n' +
    '  scenario: string;\n' +
    '  status: string;\n' +
    '  preparedAt: string;\n' +
    '  producer: RoleRecord;\n' +
    '  reviewer: RoleRecord;\n' +
    '  project: string;\n' +
    '  runtime: string;\n' +
    '  cli: string;\n' +
    '  initialCommit: string;\n' +
    '  maxTurns: number;\n' +
    '  launchId?: string;\n' +
    '  prompt?: string;\n' +
    '  sessionKind?: string;\n' +
    '  launchMode?: "independent" | "dependent" | "continuation";\n' +
    '  dependencySessionIds?: string[];\n' +
    '  archive?: string;\n' +
    '  guideReturn?: string;\n' +
    '  startedAt?: string;\n' +
    '  completedAt?: string;\n' +
    '  returnPreparedAt?: string;\n' +
    '  ownerAcknowledgements?: number;\n' +
    '  sessionId?: string;\n' +
    '  finalCommit?: string;\n' +
    '  archiveCommit?: string;\n' +
    '  lastAction?: string;\n' +
    '  lastError?: string;\n' +
    '  interruption?: ModelTurnInterruption;\n' +
    '};\n' +
    '\n' +
    'class PausedRun extends Error {}\n' +
    '\n' +
    'const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));\n' +
    'const twoWindow = process.argv.includes("--reviewer-window");\n' +
    'const requested = process.argv.slice(2).find((argument) => argument !== "--reviewer-window");\n' +
    'let stopRequested = false;\n' +
    'let stopSignal: RelaySignal | null = null;\n' +
    'let activeModelChild: ReturnType<typeof spawn> | null = null;\n' +
    '\n' +
    'function requestStop(signal: RelaySignal): void {\n' +
    '  const repeated = stopRequested;\n' +
    '  stopRequested = true;\n' +
    '  stopSignal ??= signal;\n' +
    '  if (activeModelChild) {\n' +
    '    const child = activeModelChild;\n' +
    '    child.kill(repeated ? "SIGKILL" : "SIGTERM");\n' +
    '    if (!repeated) {\n' +
    '      const force = setTimeout(() => {\n' +
    '        if (activeModelChild === child) child.kill("SIGKILL");\n' +
    '      }, 2_000);\n' +
    '      force.unref();\n' +
    '    }\n' +
    '  }\n' +
    '}\n' +
    '\n' +
    'process.on("SIGINT", () => { requestStop("SIGINT"); });\n' +
    'process.on("SIGTERM", () => { requestStop("SIGTERM"); });\n' +
    '\n' +
    'const runsRoot = await realpath(process.env.KODA_RELAY_RUNS_ROOT\n' +
    '  ? path.resolve(process.env.KODA_RELAY_RUNS_ROOT)\n' +
    '  : path.join(root, "docs", "relay-runs"));\n' +
    'async function discoverExecutableRun(): Promise<string> {\n' +
    '  const candidates: string[] = [];\n' +
    '  for (const entry of await readdir(runsRoot, { withFileTypes: true })) {\n' +
    '    if (!entry.isDirectory()) continue;\n' +
    '    const candidate = path.join(runsRoot, entry.name);\n' +
    '    const record = await readFile(path.join(candidate, "RUN.json"), "utf8")\n' +
    '      .then((content) => JSON.parse(content) as { version?: number; status?: string })\n' +
    '      .catch(() => null);\n' +
    '    if ((record?.version === 1 || record?.version === 2) && record.status !== "COMPLETE" && record.status !== "HALTED") candidates.push(candidate);\n' +
    '  }\n' +
    '  if (candidates.length === 0) throw new Error("No prepared or paused relay run exists. Prepare one first.");\n' +
    '  if (candidates.length > 1) throw new Error("More than one relay run is active. Koda will not guess which session you mean.");\n' +
    '  return candidates[0];\n' +
    '}\n' +
    '\n' +
    'const runRoot = await (requested ? realpath(path.resolve(root, requested)) : discoverExecutableRun()).catch((error) => {\n' +
    '  console.error(terminalPanel("PRODUCER REFUSED", [\n' +
    '    error instanceof Error ? error.message : String(error),\n' +
    '    "Nothing changed on disk.",\n' +
    '  ]));\n' +
    '  process.exit(1);\n' +
    '});\n' +
    'const runPath = path.join(runRoot, "RUN.json");\n' +
    'const transcriptPath = path.join(runRoot, "TRANSCRIPT.md");\n' +
    'if (!(await lstat(runPath)).isFile() || !(await lstat(transcriptPath)).isFile()) {\n' +
    '  throw new Error("Relay RUN.json and TRANSCRIPT.md must be regular files.");\n' +
    '}\n' +
    'const run = JSON.parse(await readFile(runPath, "utf8")) as RunRecord;\n' +
    'if ((run.version !== 1 && run.version !== 2) || run.status === "COMPLETE" || run.status === "HALTED") {\n' +
    '  throw new Error(`Relay run cannot execute from status ${run.status}.`);\n' +
    '}\n' +
    'const ownerName = relayOwnerName(run);\n' +
    'if (\n' +
    '  typeof run.project !== "string" ||\n' +
    '  typeof run.runtime !== "string" ||\n' +
    '  typeof run.cli !== "string" ||\n' +
    '  !Number.isInteger(run.maxTurns) ||\n' +
    '  run.maxTurns < 1 ||\n' +
    '  run.maxTurns > 100\n' +
    ') {\n' +
    '  throw new Error("Relay RUN.json has invalid paths or turn limit.");\n' +
    '}\n' +
    'if (run.interruption) {\n' +
    '  try {\n' +
    '    run.interruption = validateModelTurnInterruption(run.interruption);\n' +
    '  } catch (error) {\n' +
    '    throw new Error(`Relay RUN.json has invalid interruption evidence: ${error instanceof Error ? error.message : String(error)}`);\n' +
    '  }\n' +
    '}\n' +
    '\n' +
    'const resolved = await resolveRelayRunPaths({ packageRoot: root, configuredRunsRoot: runsRoot, runRoot, run });\n' +
    'const { project, runtime, cli } = resolved;\n' +
    'run.cli = cli;\n' +
    'if (resolved.mode === "guide-project" && (\n' +
    '  !run.launchId || !run.prompt || !run.archive || !run.guideReturn ||\n' +
    '  path.isAbsolute(run.prompt) || run.prompt.split(/[\\\\/]/).includes("..")\n' +
    ')) throw new Error("Guide relay RUN.json has missing or unsafe launch evidence paths.");\n' +
    'const reviewerResumeCommand = resolved.mode === "guide-project"\n' +
    '  ? formatRelayCommand(path.join(root, "scripts", "run-relay-reviewer-window.ts"), runRoot)\n' +
    '  : "npm run relay:reviewer";\n' +
    'const producerResumeCommand = resolved.mode === "guide-project"\n' +
    '  ? formatRelayCommand(path.join(root, "scripts", "execute-relay-run.ts"), runRoot, ["--reviewer-window"])\n' +
    '  : `npm run ${twoWindow ? "relay:producer" : "relay:execute"} -- ${path.relative(root, runRoot)}`;\n' +
    'const releaseProducerLock = twoWindow\n' +
    '  ? await acquireProducerWindow(runRoot, { recoverStale: true }).catch((error) => {\n' +
    '      console.error(terminalPanel("PRODUCER REFUSED", [\n' +
    '        error instanceof Error ? error.message : String(error),\n' +
    '        "Nothing changed on disk.",\n' +
    '      ]));\n' +
    '      process.exit(1);\n' +
    '    })\n' +
    '  : async () => {};\n' +
    '\n' +
    'function timestamp(): string {\n' +
    '  return new Date().toISOString();\n' +
    '}\n' +
    '\n' +
    'async function saveRun(): Promise<void> {\n' +
    '  await writeJsonAtomic(runPath, run);\n' +
    '}\n' +
    '\n' +
    'async function note(title: string, lines: string[] = []): Promise<void> {\n' +
    '  await appendFile(transcriptPath, [\n' +
    '    `## ${timestamp()} — ${title}`,\n' +
    '    "",\n' +
    '    ...lines,\n' +
    '    "",\n' +
    '  ].join("\\n"), "utf8");\n' +
    '}\n' +
    '\n' +
    'function git(args: string[], accepted = [0]): { status: number; stdout: string; stderr: string } {\n' +
    '  const result = spawnSync("git", args, {\n' +
    '    cwd: project,\n' +
    '    encoding: "utf8",\n' +
    '    maxBuffer: 20 * 1024 * 1024,\n' +
    '    env: { ...process.env, GIT_OPTIONAL_LOCKS: "0" },\n' +
    '  });\n' +
    '  const status = result.status ?? -1;\n' +
    '  if (!accepted.includes(status)) {\n' +
    '    throw new Error(`git ${args.join(" ")} failed (${status}): ${(result.stderr ?? "").trim()}`);\n' +
    '  }\n' +
    '  return { status, stdout: result.stdout ?? "", stderr: result.stderr ?? "" };\n' +
    '}\n' +
    '\n' +
    'function eventThreadId(output: string): string | null {\n' +
    '  for (const line of output.split(/\\r?\\n/)) {\n' +
    '    if (!line.trim()) continue;\n' +
    '    try {\n' +
    '      const event = JSON.parse(line) as { type?: string; thread_id?: string };\n' +
    '      if (event.type === "thread.started" && typeof event.thread_id === "string") return event.thread_id;\n' +
    '    } catch {\n' +
    '      // The complete raw stream remains preserved; a non-JSON diagnostic line is not discarded.\n' +
    '    }\n' +
    '  }\n' +
    '  return null;\n' +
    '}\n' +
    '\n' +
    'async function modelTurn(role: Role, purpose: string, prompt: string): Promise<void> {\n' +
    '  if (!validTurnPurpose(role, purpose)) throw new Error(`Relay refused unsafe ${role} turn purpose ${JSON.stringify(purpose)}.`);\n' +
    '  const roleRecord = run[role];\n' +
    '  if (run.producer.turns + run.reviewer.turns >= run.maxTurns) {\n' +
    '    run.status = "PAUSED_MAX_TURNS";\n' +
    '    run.lastError = `The relay reached its ${run.maxTurns}-turn safety limit.`;\n' +
    '    await saveRun();\n' +
    '    throw new PausedRun(run.lastError);\n' +
    '  }\n' +
    '\n' +
    '  const turn = roleRecord.turns + 1;\n' +
    '  const codexExecutable = resolveRelayCodexExecutable();\n' +
    '  const gitExecutable = resolveRelayGitExecutable();\n' +
    '  const xdgConfigHome = path.join(runtime, ".xdg");\n' +
    '  await mkdir(xdgConfigHome, { recursive: true });\n' +
    '  const prefix = `${role.toUpperCase()}-${String(turn).padStart(2, "0")}`;\n' +
    '  const eventFile = `${prefix}-EVENTS.jsonl`;\n' +
    '  const stderrFile = `${prefix}-STDERR.txt`;\n' +
    '  const base = [\n' +
    '    "--ask-for-approval", "never",\n' +
    '    "exec",\n' +
    '  ];\n' +
    '  const common = [\n' +
    '    "--ignore-user-config",\n' +
    '    "--ignore-rules",\n' +
    '    "--json",\n' +
    '    "-m", roleRecord.model,\n' +
    '    "-c", `model_reasoning_effort=\\"${roleReco'... 58720 more characters

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/relay-runner.test.ts:136:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: true,
    code: 'ERR_ASSERTION',
    actual: '#!/usr/bin/env node\n\nimport { spawn, spawnSync } from "node:child_process";\nimport { appendFile, cp, lstat, mkdir, readFile, readdir, realpath, rm } from "node:fs/promises";\nimport path from "node:path";\nimport { createInterface } from "node:readline";\nimport { fileURLToPath } from "node:url";\n\nimport { closePath, evaluateSessionClosure } from "../src/close.ts";\nimport { verifiedCodexRolePermissionArgs } from "../src/codex-role-permissions.ts";\nimport { pathExists, readProjectConfig } from "../src/config.ts";\nimport { evaluateGate } from "../src/gate.ts";\nimport { acquireGitOperationLock } from "../src/git-operation-lock.ts";\nimport { evaluateSessionHalt } from "../src/halt.ts";\nimport { relayOwnerName } from "../src/owner.ts";\nimport {\n  artifactPath,\n  currentPhase,\n  latestSessionId,\n  listSessionIds,\n  loadSession,\n  readNonEmpty,\n  reviewPath,\n  sessionRoot,\n  writeJsonAtomic,\n  writeTextAtomic,\n} from "../src/project.ts";\nimport { readApprovalEntries, sha256 } from "../src/receipt.ts";\nimport {\n  relayCodexEnvironment,\n  relayGitToolchainReadRoots,\n  relayNodeToolchainReadRoots,\n  resolveRelayCodexExecutable,\n  resolveRelayGitExecutable,\n} from "../src/relay-environment.ts";\nimport {\n  claimSessionPaths,\n  ownedSessionPaths,\n  reconcileSessionWorkSet,\n  stagedProjectPaths,\n  verifyStagedSessionClaims,\n  verifySessionWorkSetObservations,\n} from "../src/workset.ts";\nimport { terminalBlock, terminalPanel } from "../src/terminal-ui.ts";\nimport { formatRelayCommand, resolveRelayRunPaths } from "./relay-run-location.ts";\nimport {\n  baseTurnPurpose,\n  validTurnPurpose,\n  validateModelTurnInterruption,\n  type ModelTurnInterruption,\n  type RelaySignal,\n} from "./relay-interruption.ts";\nimport {\n  PRODUCER_LOCK_DIR,\n  REVIEWER_LOCK_DIR,\n  acquireProducerWindow,\n  newReviewerJob,\n  readReviewerJob,\n  readReviewerWindowState,\n  renderCodexEvent,\n  removeReviewerJob,\n  writeReviewerJob,\n  type ReviewerJob,\n  type ReviewerJobKind,\n} from "./relay-window-protocol.ts";\n\ntype Role = "producer" | "reviewer";\n\ntype RoleRecord = {\n  model: string;\n  effort: string;\n  threadId: string | null;\n  turns: number;\n};\n\ntype RunRecord = {\n  version: number;\n  owner?: string;\n  mode?: "fixture-copy" | "guide-project";\n  scenario: string;\n  status: string;\n  preparedAt: string;\n  producer: RoleRecord;\n  reviewer: RoleRecord;\n  project: string;\n  runtime: string;\n  cli: string;\n  initialCommit: string;\n  maxTurns: number;\n  launchId?: string;\n  prompt?: string;\n  sessionKind?: string;\n  launchMode?: "independent" | "dependent" | "continuation";\n  dependencySessionIds?: string[];\n  archive?: string;\n  guideReturn?: string;\n  startedAt?: string;\n  completedAt?: string;\n  returnPreparedAt?: string;\n  ownerAcknowledgements?: number;\n  sessionId?: string;\n  finalCommit?: string;\n  archiveCommit?: string;\n  lastAction?: string;\n  lastError?: string;\n  interruption?: ModelTurnInterruption;\n};\n\nclass PausedRun extends Error {}\n\nconst root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));\nconst twoWindow = process.argv.includes("--reviewer-window");\nconst requested = process.argv.slice(2).find((argument) => argument !== "--reviewer-window");\nlet stopRequested = false;\nlet stopSignal: RelaySignal | null = null;\nlet activeModelChild: ReturnType<typeof spawn> | null = null;\n\nfunction requestStop(signal: RelaySignal): void {\n  const repeated = stopRequested;\n  stopRequested = true;\n  stopSignal ??= signal;\n  if (activeModelChild) {\n    const child = activeModelChild;\n    child.kill(repeated ? "SIGKILL" : "SIGTERM");\n    if (!repeated) {\n      const force = setTimeout(() => {\n        if (activeModelChild === child) child.kill("SIGKILL");\n      }, 2_000);\n      force.unref();\n    }\n  }\n}\n\nprocess.on("SIGINT", () => { requestStop("SIGINT"); });\nprocess.on("SIGTERM", () => { requestStop("SIGTERM"); });\n\nconst runsRoot = await realpath(process.env.KODA_RELAY_RUNS_ROOT\n  ? path.resolve(process.env.KODA_RELAY_RUNS_ROOT)\n  : path.join(root, "docs", "relay-runs"));\nasync function discoverExecutableRun(): Promise<string> {\n  const candidates: string[] = [];\n  for (const entry of await readdir(runsRoot, { withFileTypes: true })) {\n    if (!entry.isDirectory()) continue;\n    const candidate = path.join(runsRoot, entry.name);\n    const record = await readFile(path.join(candidate, "RUN.json"), "utf8")\n      .then((content) => JSON.parse(content) as { version?: number; status?: string })\n      .catch(() => null);\n    if ((record?.version === 1 || record?.version === 2) && record.status !== "COMPLETE" && record.status !== "HALTED") candidates.push(candidate);\n  }\n  if (candidates.length === 0) throw new Error("No prepared or paused relay run exists. Prepare one first.");\n  if (candidates.length > 1) throw new Error("More than one relay run is active. Koda will not guess which session you mean.");\n  return candidates[0];\n}\n\nconst runRoot = await (requested ? realpath(path.resolve(root, requested)) : discoverExecutableRun()).catch((error) => {\n  console.error(terminalPanel("PRODUCER REFUSED", [\n    error instanceof Error ? error.message : String(error),\n    "Nothing changed on disk.",\n  ]));\n  process.exit(1);\n});\nconst runPath = path.join(runRoot, "RUN.json");\nconst transcriptPath = path.join(runRoot, "TRANSCRIPT.md");\nif (!(await lstat(runPath)).isFile() || !(await lstat(transcriptPath)).isFile()) {\n  throw new Error("Relay RUN.json and TRANSCRIPT.md must be regular files.");\n}\nconst run = JSON.parse(await readFile(runPath, "utf8")) as RunRecord;\nif ((run.version !== 1 && run.version !== 2) || run.status === "COMPLETE" || run.status === "HALTED") {\n  throw new Error(`Relay run cannot execute from status ${run.status}.`);\n}\nconst ownerName = relayOwnerName(run);\nif (\n  typeof run.project !== "string" ||\n  typeof run.runtime !== "string" ||\n  typeof run.cli !== "string" ||\n  !Number.isInteger(run.maxTurns) ||\n  run.maxTurns < 1 ||\n  run.maxTurns > 100\n) {\n  throw new Error("Relay RUN.json has invalid paths or turn limit.");\n}\nif (run.interruption) {\n  try {\n    run.interruption = validateModelTurnInterruption(run.interruption);\n  } catch (error) {\n    throw new Error(`Relay RUN.json has invalid interruption evidence: ${error instanceof Error ? error.message : String(error)}`);\n  }\n}\n\nconst resolved = await resolveRelayRunPaths({ packageRoot: root, configuredRunsRoot: runsRoot, runRoot, run });\nconst { project, runtime, cli } = resolved;\nrun.cli = cli;\nif (resolved.mode === "guide-project" && (\n  !run.launchId || !run.prompt || !run.archive || !run.guideReturn ||\n  path.isAbsolute(run.prompt) || run.prompt.split(/[\\\\/]/).includes("..")\n)) throw new Error("Guide relay RUN.json has missing or unsafe launch evidence paths.");\nconst reviewerResumeCommand = resolved.mode === "guide-project"\n  ? formatRelayCommand(path.join(root, "scripts", "run-relay-reviewer-window.ts"), runRoot)\n  : "npm run relay:reviewer";\nconst producerResumeCommand = resolved.mode === "guide-project"\n  ? formatRelayCommand(path.join(root, "scripts", "execute-relay-run.ts"), runRoot, ["--reviewer-window"])\n  : `npm run ${twoWindow ? "relay:producer" : "relay:execute"} -- ${path.relative(root, runRoot)}`;\nconst releaseProducerLock = twoWindow\n  ? await acquireProducerWindow(runRoot, { recoverStale: true }).catch((error) => {\n      console.error(terminalPanel("PRODUCER REFUSED", [\n        error instanceof Error ? error.message : String(error),\n        "Nothing changed on disk.",\n      ]));\n      process.exit(1);\n    })\n  : async () => {};\n\nfunction timestamp(): string {\n  return new Date().toISOString();\n}\n\nasync function saveRun(): Promise<void> {\n  await writeJsonAtomic(runPath, run);\n}\n\nasync function note(title: string, lines: string[] = []): Promise<void> {\n  await appendFile(transcriptPath, [\n    `## ${timestamp()} — ${title}`,\n    "",\n    ...lines,\n    "",\n  ].join("\\n"), "utf8");\n}\n\nfunction git(args: string[], accepted = [0]): { status: number; stdout: string; stderr: string } {\n  const result = spawnSync("git", args, {\n    cwd: project,\n    encoding: "utf8",\n    maxBuffer: 20 * 1024 * 1024,\n    env: { ...process.env, GIT_OPTIONAL_LOCKS: "0" },\n  });\n  const status = result.status ?? -1;\n  if (!accepted.includes(status)) {\n    throw new Error(`git ${args.join(" ")} failed (${status}): ${(result.stderr ?? "").trim()}`);\n  }\n  return { status, stdout: result.stdout ?? "", stderr: result.stderr ?? "" };\n}\n\nfunction eventThreadId(output: string): string | null {\n  for (const line of output.split(/\\r?\\n/)) {\n    if (!line.trim()) continue;\n    try {\n      const event = JSON.parse(line) as { type?: string; thread_id?: string };\n      if (event.type === "thread.started" && typeof event.thread_id === "string") return event.thread_id;\n    } catch {\n      // The complete raw stream remains preserved; a non-JSON diagnostic line is not discarded.\n    }\n  }\n  return null;\n}\n\nasync function modelTurn(role: Role, purpose: string, prompt: string): Promise<void> {\n  if (!validTurnPurpose(role, purpose)) throw new Error(`Relay refused unsafe ${role} turn purpose ${JSON.stringify(purpose)}.`);\n  const roleRecord = run[role];\n  if (run.producer.turns + run.reviewer.turns >= run.maxTurns) {\n    run.status = "PAUSED_MAX_TURNS";\n    run.lastError = `The relay reached its ${run.maxTurns}-turn safety limit.`;\n    await saveRun();\n    throw new PausedRun(run.lastError);\n  }\n\n  const turn = roleRecord.turns + 1;\n  const codexExecutable = resolveRelayCodexExecutable();\n  const gitExecutable = resolveRelayGitExecutable();\n  const xdgConfigHome = path.join(runtime, ".xdg");\n  await mkdir(xdgConfigHome, { recursive: true });\n  const prefix = `${role.toUpperCase()}-${String(turn).padStart(2, "0")}`;\n  const eventFile = `${prefix}-EVENTS.jsonl`;\n  const stderrFile = `${prefix}-STDERR.txt`;\n  const base = [\n    "--ask-for-approval", "never",\n    "exec",\n  ];\n  const common = [\n    "--ignore-user-config",\n    "--ignore-rules",\n    "--json",\n    "-m", roleRecord.model,\n    "-c", `model_reasoning_effort=\\"${roleReco'... 58720 more characters,
    expected: /codexRolePermissionArgs\(run\.cli, codexExecutable, relayNodeToolchainReadRoots\(\)\)/,
    operator: 'match',
    diff: 'simple'
  }

test at tests/relay-window.test.ts:313:1
✖ REVIEWER OPEN CONVERSATION: an idle owner question resumes the Reviewer but changes no project file (726.288125ms)
  AssertionError [ERR_ASSERTION]:
  ────────────────────────────────────────────────────────
  REVIEWER PAUSED SAFELY
  ────────────────────────────────────────────────────────
  runtime is not defined

  Resume with: npm run relay:reviewer
  ────────────────────────────────────────────────────────


  1 !== 0

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/relay-window.test.ts:316:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: false,
    code: 'ERR_ASSERTION',
    actual: 1,
    expected: 0,
    operator: 'strictEqual',
    diff: 'simple'
  }

test at tests/relay-window.test.ts:328:1
✖ REVIEWER OPEN CONVERSATION MUTATION: an empty final answer refuses instead of pretending conversation completed (687.791209ms)
  AssertionError [ERR_ASSERTION]: The input did not match the regular expression /REVIEWER PAUSED SAFELY[\s\S]*emitted no final answer/. Input:

  '\n' +
    '────────────────────────────────────────────────────────\n' +
    'REVIEWER PAUSED SAFELY\n' +
    '────────────────────────────────────────────────────────\n' +
    'runtime is not defined\n' +
    '\n' +
    'Resume with: npm run relay:reviewer\n' +
    '────────────────────────────────────────────────────────\n'

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/relay-window.test.ts:332:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: true,
    code: 'ERR_ASSERTION',
    actual: '\n────────────────────────────────────────────────────────\nREVIEWER PAUSED SAFELY\n────────────────────────────────────────────────────────\nruntime is not defined\n\nResume with: npm run relay:reviewer\n────────────────────────────────────────────────────────\n',
    expected: /REVIEWER PAUSED SAFELY[\s\S]*emitted no final answer/,
    operator: 'match',
    diff: 'simple'
  }

test at tests/relay-window.test.ts:338:1
✖ REVIEWER OPEN CONVERSATION SCOPE: project-level thought returns to Guide without mutation (692.820167ms)
  AssertionError [ERR_ASSERTION]:
  ────────────────────────────────────────────────────────
  REVIEWER PAUSED SAFELY
  ────────────────────────────────────────────────────────
  runtime is not defined

  Resume with: npm run relay:reviewer
  ────────────────────────────────────────────────────────


  1 !== 0

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/relay-window.test.ts:341:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: false,
    code: 'ERR_ASSERTION',
    actual: 1,
    expected: 0,
    operator: 'strictEqual',
    diff: 'simple'
  }

test at tests/relay-window.test.ts:348:1
✖ REVIEWER OPEN CONVERSATION WAIT: active direction is recorded but cannot become a current-phase handback (747.354292ms)
  AssertionError [ERR_ASSERTION]:
  ────────────────────────────────────────────────────────
  REVIEWER PAUSED SAFELY
  ────────────────────────────────────────────────────────
  runtime is not defined

  Resume with: npm run relay:reviewer
  ────────────────────────────────────────────────────────


  1 !== 0

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/relay-window.test.ts:354:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: false,
    code: 'ERR_ASSERTION',
    actual: 1,
    expected: 0,
    operator: 'strictEqual',
    diff: 'simple'
  }

test at tests/relay-window.test.ts:365:1
✖ REVIEWER OPEN CONVERSATION TTY: a real terminal line reaches the idle Reviewer prompt (882.0585ms)
  AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:

  1 !== 0

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/relay-window.test.ts:370:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: true,
    code: 'ERR_ASSERTION',
    actual: 1,
    expected: 0,
    operator: 'strictEqual',
    diff: 'simple'
  }

test at tests/relay-window.test.ts:446:1
✖ WAIT AT FORMAL REVIEW: new direction is recorded immediately but does not revise the reviewed artifact (443.326125ms)
  AssertionError [ERR_ASSERTION]:
  ────────────────────────────────────────────────────────
  REVIEWER PAUSED SAFELY
  ────────────────────────────────────────────────────────
  runtime is not defined
  Evidence remains in /private/var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-reviewer-window-AtOEij/2026-07-20-software-clean-sol-medium-terra-medium-01/REVIEWER-JOB.json
  Nothing was acknowledged or advanced.
  ────────────────────────────────────────────────────────


  1 !== 0

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/relay-window.test.ts:451:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: false,
    code: 'ERR_ASSERTION',
    actual: 1,
    expected: 0,
    operator: 'strictEqual',
    diff: 'simple'
  }

test at tests/relay-window.test.ts:466:1
✖ WAIT RECEIPT BINDING: a recorded direction survives a wrong receipt but nothing advances (500.316042ms)
  AssertionError [ERR_ASSERTION]:
  ────────────────────────────────────────────────────────
  REVIEWER PAUSED SAFELY
  ────────────────────────────────────────────────────────
  runtime is not defined
  Evidence remains in /private/var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-reviewer-window-ibAbom/2026-07-20-software-clean-sol-medium-terra-medium-01/REVIEWER-JOB.json
  Nothing was acknowledged or advanced.
  ────────────────────────────────────────────────────────


  1 !== 2

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/relay-window.test.ts:471:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: false,
    code: 'ERR_ASSERTION',
    actual: 1,
    expected: 2,
    operator: 'strictEqual',
    diff: 'simple'
  }

test at tests/relay-window.test.ts:800:1
✖ WAIT CONTRACT MIGRATION: the superseded same-phase handback marker refuses by name (389.336208ms)
  AssertionError [ERR_ASSERTION]: The input did not match the regular expression /superseded DISK HANDOFF REQUIRED marker/. Input:

  '\n' +
    '────────────────────────────────────────────────────────\n' +
    'REVIEWER PAUSED SAFELY\n' +
    '────────────────────────────────────────────────────────\n' +
    'runtime is not defined\n' +
    'Evidence remains in /private/var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-reviewer-window-ZW3em0/2026-07-20-software-clean-sol-medium-terra-medium-01/REVIEWER-JOB.json\n' +
    'Nothing was acknowledged or advanced.\n' +
    '────────────────────────────────────────────────────────\n'

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/relay-window.test.ts:806:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: true,
    code: 'ERR_ASSERTION',
    actual: '\n────────────────────────────────────────────────────────\nREVIEWER PAUSED SAFELY\n────────────────────────────────────────────────────────\nruntime is not defined\nEvidence remains in /private/var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-reviewer-window-ZW3em0/2026-07-20-software-clean-sol-medium-terra-medium-01/REVIEWER-JOB.json\nNothing was acknowledged or advanced.\n────────────────────────────────────────────────────────\n',
    expected: /superseded DISK HANDOFF REQUIRED marker/,
    operator: 'match',
    diff: 'simple'
  }

test at tests/relay-window.test.ts:848:1
✖ TWO-WINDOW RELAY: a pending formal-review job wakes one persistent reviewer and returns acknowledged disk evidence (377.958917ms)
  AssertionError [ERR_ASSERTION]:
  ────────────────────────────────────────────────────────
  REVIEWER PAUSED SAFELY
  ────────────────────────────────────────────────────────
  runtime is not defined
  Evidence remains in /private/var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-reviewer-wake-6dRpM8/2026-07-20-software-clean-sol-medium-terra-medium-01/REVIEWER-JOB.json
  Nothing was acknowledged or advanced.
  ────────────────────────────────────────────────────────


  1 !== 0

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/relay-window.test.ts:922:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: false,
    code: 'ERR_ASSERTION',
    actual: 1,
    expected: 0,
    operator: 'strictEqual',
    diff: 'simple'
  }

test at tests/relay-window.test.ts:935:1
✖ TWO-WINDOW SESSION: separate producer and reviewer processes rendezvous through pushed close (1361.84ms)
  AssertionError [ERR_ASSERTION]:
  ────────────────────────────────────────────────────────
  RELAY PAUSED SAFELY
  ────────────────────────────────────────────────────────
  runtime is not defined

  Resume with: npm run relay:producer -- ../../../../private/var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-two-window-session-HMoNxE/2026-07-20-software-clean-sol-medium-terra-medium-01
  ────────────────────────────────────────────────────────



  2 !== 0

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/relay-window.test.ts:1044:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: false,
    code: 'ERR_ASSERTION',
    actual: 2,
    expected: 0,
    operator: 'strictEqual',
    diff: 'simple'
  }

test at tests/reviewer-fixtures.test.ts:136:1
✖ REVIEWER FIXTURES: Ghostty runs pin model and effort and preserve ephemeral Codex events (2.80975ms)
  AssertionError [ERR_ASSERTION]: The input did not match the regular expression /relayCodexEnvironment\(process\.env\)/. Input:

  'import { spawnSync } from "node:child_process";\n' +
    'import { readFile, realpath, writeFile } from "node:fs/promises";\n' +
    'import path from "node:path";\n' +
    '\n' +
    'import { codexProjectPermissionArgs } from "../src/codex-role-permissions.ts";\n' +
    'import {\n' +
    '  relayCodexEnvironment,\n' +
    '  relayGitToolchainReadRoots,\n' +
    '  relayNodeToolchainReadRoots,\n' +
    '  resolveRelayCodexExecutable,\n' +
    '  resolveRelayGitExecutable,\n' +
    '} from "../src/relay-environment.ts";\n' +
    '\n' +
    'type RunRecord = {\n' +
    '  version: number;\n' +
    '  fixture: string;\n' +
    '  model: string;\n' +
    '  effort: string;\n' +
    '  preparedAt: string;\n' +
    '  status: string;\n' +
    '  prompt: string;\n' +
    '  startedAt?: string;\n' +
    '  finishedAt?: string;\n' +
    '  exitCode?: number;\n' +
    '};\n' +
    '\n' +
    'const requested = process.argv[2];\n' +
    'if (!requested) {\n' +
    '  console.error("Usage: npm run reviewer:execute -- docs/reviewer-runs/<prepared-run>");\n' +
    '  process.exit(1);\n' +
    '}\n' +
    '\n' +
    'const root = await realpath(process.cwd());\n' +
    'const runsRoot = path.join(root, "docs", "reviewer-runs");\n' +
    'const runRoot = path.resolve(root, requested);\n' +
    'if (path.dirname(runRoot) !== runsRoot) {\n' +
    '  throw new Error(`Reviewer run must be one direct child of ${runsRoot}`);\n' +
    '}\n' +
    '\n' +
    'const runPath = path.join(runRoot, "RUN.json");\n' +
    'const run = JSON.parse(await readFile(runPath, "utf8")) as RunRecord;\n' +
    'const validModels = new Set(["gpt-5.6-sol", "gpt-5.6-terra", "gpt-5.6-luna"]);\n' +
    'const validEfforts = new Set(["low", "medium", "high", "xhigh"]);\n' +
    'if (\n' +
    '  run.version !== 1 ||\n' +
    '  run.status !== "PREPARED" ||\n' +
    '  !validModels.has(run.model) ||\n' +
    '  !validEfforts.has(run.effort) ||\n' +
    '  typeof run.prompt !== "string" ||\n' +
    '  run.prompt.trim() === ""\n' +
    ') {\n' +
    '  throw new Error(`Reviewer run is not a prepared version-1 run: ${run.status}`);\n' +
    '}\n' +
    '\n' +
    'run.status = "RUNNING";\n' +
    'run.startedAt = new Date().toISOString();\n' +
    'await writeFile(runPath, `${JSON.stringify(run, null, 2)}\\n`, "utf8");\n' +
    '\n' +
    'const project = await realpath(path.join(runRoot, "project"));\n' +
    'if (!project.startsWith(`${runRoot}${path.sep}`)) {\n' +
    '  throw new Error("Reviewer project resolves outside its prepared run folder.");\n' +
    '}\n' +
    'const codex = resolveRelayCodexExecutable();\n' +
    'const git = resolveRelayGitExecutable();\n' +
    'const args = [\n' +
    '  "--ask-for-approval", "never",\n' +
    '  "exec",\n' +
    '  "--ephemeral",\n' +
    '  "--ignore-user-config",\n' +
    '  "--ignore-rules",\n' +
    '  "--json",\n' +
    '  "--color", "never",\n' +
    '  "-C", project,\n' +
    '  "-m", run.model,\n' +
    '  "-c", `model_reasoning_effort=\\"${run.effort}\\"`,\n' +
    '  ...codexProjectPermissionArgs({\n' +
    '    workspaceAccess: "write",\n' +
    '    trustedReadRoots: [\n' +
    '      path.join(root, ".agents", "skills", "koda-c-review"),\n' +
    '      path.join(root, "src"),\n' +
    '      path.join(root, "package.json"),\n' +
    '      codex,\n' +
    '      ...relayGitToolchainReadRoots(git),\n' +
    '      ...relayNodeToolchainReadRoots(),\n' +
    '    ],\n' +
    '  }),\n' +
    '  run.prompt,\n' +
    '];\n' +
    'const executed = spawnSync(codex, args, {\n' +
    '  cwd: root,\n' +
    '  encoding: "utf8",\n' +
    '  env: relayCodexEnvironment(process.env, undefined, git),\n' +
    '  maxBuffer: 50 * 1024 * 1024,\n' +
    '});\n' +
    '\n' +
    'const stdout = executed.stdout ?? "";\n' +
    'const stderr = executed.stderr ?? String(executed.error ?? "");\n' +
    'await Promise.all([\n' +
    '  writeFile(path.join(runRoot, "CODEX-EVENTS.jsonl"), stdout, "utf8"),\n' +
    '  writeFile(path.join(runRoot, "CODEX-STDERR.txt"), stderr, "utf8"),\n' +
    ']);\n' +
    'process.stdout.write(stdout);\n' +
    'process.stderr.write(stderr);\n' +
    '\n' +
    'run.status = executed.status === 0 ? "RUN_COMPLETE_AWAITING_EVALUATION" : "RUN_FAILED";\n' +
    'run.finishedAt = new Date().toISOString();\n' +
    'run.exitCode = executed.status ?? -1;\n' +
    'await writeFile(runPath, `${JSON.stringify(run, null, 2)}\\n`, "utf8");\n' +
    '\n' +
    'const resultPath = path.join(runRoot, "RESULT.md");\n' +
    'const result = await readFile(resultPath, "utf8");\n' +
    'await writeFile(resultPath, result\n' +
    '  .replace("- Status: PREPARED — NOT RUN", `- Status: ${run.status}`)\n' +
    '  .replace("- Codex event log: `CODEX-EVENTS.jsonl` after execution", "- Codex event log: [`CODEX-EVENTS.jsonl`](CODEX-EVENTS.jsonl)"), "utf8");\n' +
    '\n' +
    'console.log(`\\nDurable run evidence: ${runRoot}`);\n' +
    'console.log("The blind run is complete but not graded. Compare its review with sealed fixture metadata and finish RESULT.md.");\n' +
    'process.exitCode = executed.status ?? 1;\n'

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/reviewer-fixtures.test.ts:150:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: true,
    code: 'ERR_ASSERTION',
    actual: 'import { spawnSync } from "node:child_process";\nimport { readFile, realpath, writeFile } from "node:fs/promises";\nimport path from "node:path";\n\nimport { codexProjectPermissionArgs } from "../src/codex-role-permissions.ts";\nimport {\n  relayCodexEnvironment,\n  relayGitToolchainReadRoots,\n  relayNodeToolchainReadRoots,\n  resolveRelayCodexExecutable,\n  resolveRelayGitExecutable,\n} from "../src/relay-environment.ts";\n\ntype RunRecord = {\n  version: number;\n  fixture: string;\n  model: string;\n  effort: string;\n  preparedAt: string;\n  status: string;\n  prompt: string;\n  startedAt?: string;\n  finishedAt?: string;\n  exitCode?: number;\n};\n\nconst requested = process.argv[2];\nif (!requested) {\n  console.error("Usage: npm run reviewer:execute -- docs/reviewer-runs/<prepared-run>");\n  process.exit(1);\n}\n\nconst root = await realpath(process.cwd());\nconst runsRoot = path.join(root, "docs", "reviewer-runs");\nconst runRoot = path.resolve(root, requested);\nif (path.dirname(runRoot) !== runsRoot) {\n  throw new Error(`Reviewer run must be one direct child of ${runsRoot}`);\n}\n\nconst runPath = path.join(runRoot, "RUN.json");\nconst run = JSON.parse(await readFile(runPath, "utf8")) as RunRecord;\nconst validModels = new Set(["gpt-5.6-sol", "gpt-5.6-terra", "gpt-5.6-luna"]);\nconst validEfforts = new Set(["low", "medium", "high", "xhigh"]);\nif (\n  run.version !== 1 ||\n  run.status !== "PREPARED" ||\n  !validModels.has(run.model) ||\n  !validEfforts.has(run.effort) ||\n  typeof run.prompt !== "string" ||\n  run.prompt.trim() === ""\n) {\n  throw new Error(`Reviewer run is not a prepared version-1 run: ${run.status}`);\n}\n\nrun.status = "RUNNING";\nrun.startedAt = new Date().toISOString();\nawait writeFile(runPath, `${JSON.stringify(run, null, 2)}\\n`, "utf8");\n\nconst project = await realpath(path.join(runRoot, "project"));\nif (!project.startsWith(`${runRoot}${path.sep}`)) {\n  throw new Error("Reviewer project resolves outside its prepared run folder.");\n}\nconst codex = resolveRelayCodexExecutable();\nconst git = resolveRelayGitExecutable();\nconst args = [\n  "--ask-for-approval", "never",\n  "exec",\n  "--ephemeral",\n  "--ignore-user-config",\n  "--ignore-rules",\n  "--json",\n  "--color", "never",\n  "-C", project,\n  "-m", run.model,\n  "-c", `model_reasoning_effort=\\"${run.effort}\\"`,\n  ...codexProjectPermissionArgs({\n    workspaceAccess: "write",\n    trustedReadRoots: [\n      path.join(root, ".agents", "skills", "koda-c-review"),\n      path.join(root, "src"),\n      path.join(root, "package.json"),\n      codex,\n      ...relayGitToolchainReadRoots(git),\n      ...relayNodeToolchainReadRoots(),\n    ],\n  }),\n  run.prompt,\n];\nconst executed = spawnSync(codex, args, {\n  cwd: root,\n  encoding: "utf8",\n  env: relayCodexEnvironment(process.env, undefined, git),\n  maxBuffer: 50 * 1024 * 1024,\n});\n\nconst stdout = executed.stdout ?? "";\nconst stderr = executed.stderr ?? String(executed.error ?? "");\nawait Promise.all([\n  writeFile(path.join(runRoot, "CODEX-EVENTS.jsonl"), stdout, "utf8"),\n  writeFile(path.join(runRoot, "CODEX-STDERR.txt"), stderr, "utf8"),\n]);\nprocess.stdout.write(stdout);\nprocess.stderr.write(stderr);\n\nrun.status = executed.status === 0 ? "RUN_COMPLETE_AWAITING_EVALUATION" : "RUN_FAILED";\nrun.finishedAt = new Date().toISOString();\nrun.exitCode = executed.status ?? -1;\nawait writeFile(runPath, `${JSON.stringify(run, null, 2)}\\n`, "utf8");\n\nconst resultPath = path.join(runRoot, "RESULT.md");\nconst result = await readFile(resultPath, "utf8");\nawait writeFile(resultPath, result\n  .replace("- Status: PREPARED — NOT RUN", `- Status: ${run.status}`)\n  .replace("- Codex event log: `CODEX-EVENTS.jsonl` after execution", "- Codex event log: [`CODEX-EVENTS.jsonl`](CODEX-EVENTS.jsonl)"), "utf8");\n\nconsole.log(`\\nDurable run evidence: ${runRoot}`);\nconsole.log("The blind run is complete but not graded. Compare its review with sealed fixture metadata and finish RESULT.md.");\nprocess.exitCode = executed.status ?? 1;\n',
    expected: /relayCodexEnvironment\(process\.env\)/,
    operator: 'match',
    diff: 'simple'
  }
```
