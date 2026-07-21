# Per-test result — 2026-07-21-manual-terminal-bootstrap-refusal

- Result: **FAIL**
- Recorded at: 2026-07-21T12:24:11.269Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `6b45e31`
- Command: `/opt/homebrew/Cellar/node/26.0.0/bin/node --test --test-reporter=spec tests/concurrent-sessions.test.ts tests/config.test.ts tests/direction.test.ts tests/dogfood.test.ts tests/full-lifecycle.test.ts tests/gate.test.ts tests/guide-console.test.ts tests/guide-runtime-integration.test.ts tests/guide.test.ts tests/halt.test.ts tests/hints.test.ts tests/history.test.ts tests/interruption.test.ts tests/license.test.ts tests/package.test.ts tests/plural-runtime-integration.test.ts tests/quickstart.test.ts tests/receipt-adversarial.test.ts tests/relay-runner.test.ts tests/relay-status.test.ts tests/relay-window.test.ts tests/review-binding.test.ts tests/review.test.ts tests/reviewer-fixtures.test.ts tests/security.test.ts tests/session.test.ts tests/skill.test.ts tests/stale-review.test.ts tests/status-truth.test.ts tests/submission.test.ts tests/toolkit-integrity.test.ts tests/workset.test.ts`

Every discovered test and subtest is named below. No result is aggregated away.

```text
✔ CONCURRENT SESSION ALLOCATION: simultaneous starts receive distinct disk identities (26.717584ms)
✔ CONCURRENT SESSION MUTATION: independence is explicit and ambiguous mutation refuses (1328.666458ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-dependency-xLJFaR/remote.git
 * [new branch]      main -> main
✔ DEPENDENCY MUTATION: an active predecessor refuses and pushed terminal evidence is hash-bound (2030.143416ms)
✔ the default phase chain is configurable data in the required order (1.173958ms)
✔ config validation rejects unsafe session paths and drifting phase names (0.189958ms)
✔ config validation refuses a sessions directory that resolves outside the project (26.98675ms)
✔ WAIT DIRECTION: record now, keep current contract frozen, and release only through advance (322.67825ms)
✔ WAIT DIRECTION MUTATION: citing a queued direction before its gate refuses split provenance (31.814792ms)
✔ WAIT DIRECTION CARRY: final-boundary direction becomes a hashed next-session Brief input (69.640042ms)
✔ WAIT DIRECTION MUTATION: changed prose and symbolic-link evidence refuse by name (9.047041ms)
✔ WAIT DIRECTION ATOMIC READ: Koda-C retries its transient file but persistent or unknown entries still refuse (386.27375ms)
✔ WAIT DIRECTION CONTAINMENT: a linked direction directory cannot redirect writes (9.106917ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-direction-boundary-KTU0sI/remote.git
 * [new branch]      main -> main
✔ WAIT FINAL BOUNDARY: a new session prompt must cite direction released by the final gate (1453.572167ms)
✔ the committed dogfood snapshot contains the full native chain and an internally bound close (29.683292ms)
✔ FULL LIFECYCLE SCENARIO: clean approvals traverse all six phases and pushed close (865.283167ms)
✔ FULL LIFECYCLE SCENARIO: a REVISE loop recovers in plan before completing and closing (815.079959ms)
✔ FULL LIFECYCLE SCENARIO: DISCUSS records an owner ruling and requires a fresh live review (753.656625ms)
✔ a complete artifact, review, allowed verdict, unique receipt, and ledger proof open the gate (25.260291ms)
▶ GATE MUTATION SUITE: each core condition refuses and names itself
  ✔ artifact exists (12.055875ms)
  ✔ artifact is non-empty (10.76925ms)
  ✔ artifact is a regular file (9.726125ms)
  ✔ review exists (7.980958ms)
  ✔ review is a regular file (16.618ms)
  ✔ approval ledger is a regular file (16.60125ms)
  ✔ verdict REVISE is blocking (10.6385ms)
  ✔ verdict REJECT is blocking (14.57275ms)
  ✔ verdict DISCUSS is blocking (16.834542ms)
  ✔ current receipt is quoted verbatim in the ledger (14.309458ms)
✔ GATE MUTATION SUITE: each core condition refuses and names itself (131.842583ms)
✔ outer receipt whitespace is ignored but inner bytes remain literal (38.4185ms)
▶ every gate condition fails closed when deliberately broken
  ✔ artifact missing (18.943042ms)
  ✔ artifact empty (19.857791ms)
  ✔ review missing (14.517208ms)
  ✔ verdict line missing (16.630875ms)
  ✔ verdict unknown (17.83525ms)
  ✔ receipt missing from last line (19.937959ms)
  ✔ generated review metadata missing (22.073667ms)
  ✔ duplicate generated review metadata is ambiguous (21.2765ms)
  ✔ review metadata names a different phase (30.853208ms)
  ✔ artifact changed after review (24.215459ms)
  ✔ final receipt differs from generated receipt (38.685375ms)
  ✔ receipt reused by another review (12.830666ms)
  ✔ approval ledger missing (11.634458ms)
  ✔ exact receipt absent from ledger (23.017ms)
  ✔ approver missing (8.747958ms)
  ✔ APPROVE WITH COMMENTS has no ledger comments (6.9375ms)
  ✔ REVISE blocks even with receipt proof (10.96375ms)
  ✔ REJECT blocks even with receipt proof (8.491667ms)
  ✔ DISCUSS blocks without an owner ruling (14.839291ms)
  ✔ DISCUSS still blocks after the ruling until a fresh review (10.969583ms)
✔ every gate condition fails closed when deliberately broken (356.711292ms)
✔ GUIDE CONSOLE SECURITY: every turn ignores ambient config and rules under the project profile (17.238292ms)
✔ GUIDE CONSOLE SECURITY: the Guide profile retains only named read-only runtime capabilities (2.293667ms)
✔ GUIDE CONSOLE STATE: invalid or ambiguous persistent identity refuses (4.304375ms)
✔ GUIDE CONSOLE TERMINAL SAFETY: model output cannot inject terminal or bidi controls (0.3965ms)
✔ GUIDE CONSOLE VISIBILITY: low-level inspection commands stay in evidence instead of flooding the screen (0.109333ms)
✔ GUIDE CONSOLE STARTUP: reconstruction is explicitly bounded to compact continuity evidence (0.3835ms)
✔ GUIDE CONSOLE LOCK: a live duplicate refuses and a released console can reopen (16.963542ms)
✔ GUIDE CONSOLE CONTAINMENT: a linked runtime parent refuses before lock creation (2.398416ms)
✔ GUIDE CONSOLE CONTAINMENT: Guide continuity cannot grant writes inside session evidence (6.164ms)
✔ GUIDE OPEN UX: one command enters the persistent console without opening session roles (3.144667ms)
✔ GUIDE OPEN UX: partial launch staffing refuses before the Guide opens (2.534042ms)
✔ GUIDE NUMBERED LAUNCH: Ghostty and manual terminals coexist while not-now preserves the launch (8.269167ms)
✖ GUIDE CONSOLE PERSISTENCE: a closed console resumes the same independent Guide context (101.199125ms)
✖ GUIDE CONSOLE STARTUP REFUSAL: the primary Codex error is shown before a missing context symptom (106.290417ms)
✖ GUIDE CONSOLE INPUT RECOVERY: input closing during a long startup exits cleanly after preserving the turn (117.239833ms)
✖ GUIDE CONSOLE CRASH EVIDENCE: raw events are durable while a model turn is still running (148.410125ms)
✖ GUIDE CONSOLE CRASH EVIDENCE MUTATION: existing or linked evidence refuses before the model runs (126.057708ms)
✖ GUIDE REAL-PROJECT RELAY: an independent sibling uses two bound contexts and returns pushed close (517.873834ms)
✔ GUIDE ENTRY: an active prior session refuses a new launch request and names it (32.619292ms)
✖ GUIDE PREFLIGHT: active work distinguishes blocked successors from explicit independent siblings (24.074416ms)
✖ GUIDE TOOLKIT BINDING: confirmation carries machine-discovered launch integrity (11.223292ms)
✖ GUIDE TOOLKIT MUTATION: changed bound toolkit proof makes the launch stale (17.961333ms)
✖ GUIDE INDEPENDENT CONTROL: an active Produce session permits an owner-classified Explore sibling (15.964292ms)
✖ GUIDE INDEPENDENT BINDING: confirmed kind and independence open exactly one matching sibling (283.482167ms)
✖ GUIDE PREFLIGHT CONTROL: a project with no active session permits exactly one draft (30.998458ms)
✖ GUIDE HALT RETURN: a pushed halt and every waiting direction must enter a fresh confirmed Brief (482.662292ms)
✖ GUIDE CONFIRMATION: one request binds prompt, manifest, continuity, and owner (6.96925ms)
✔ GUIDE PROMPT CONTRACT MUTATION: an explicit relationship mismatch refuses before confirmation (7.826875ms)
✔ GUIDE OWNER IDENTITY MUTATION: terminal control characters refuse before confirmation (4.494208ms)
✖ GUIDE VERIFIED HANDOVER: the owner receives a complete numbered launch choice (285.4065ms)
✖ GUIDE MUTATION: changing only a continuity file makes confirmation stale (71.416875ms)
✖ GUIDE MUTATION: changing only the prompt makes confirmation stale (8.749ms)
✖ GUIDE MUTATION: changing only the project manifest makes confirmation stale (12.751416ms)
✖ GUIDE GIT HANDOVER: a confirmed but uncommitted request refuses launch (236.47825ms)
✖ GUIDE RECOVERY: stale confirmation requires a pushed cancellation before reconfirming (265.809375ms)
✔ GUIDE GATE: a project with a Guide manifest refuses an unconfirmed session prompt (25.425542ms)
✖ GUIDE RELAY: pushed confirmation opens the exact session and records its binding (253.583416ms)
✖ GUIDE BINDING STATUS: the session-local binding is close-bound and corruption refuses (220.534917ms)
✖ GUIDE BINDING RECOVERY: an interrupted open can bind only the matching latest session (287.290958ms)
✖ GUIDE STATUS TRUTH: corrupt launch evidence refuses instead of guessing (15.517791ms)
✖ GUIDE RUNTIME: one command binds a pushed launch and prints executable session-context commands (242.532417ms)
✖ GUIDE LAUNCH SURFACE COEXISTENCE: a prepared manual path may still choose Ghostty before either role starts (223.965833ms)
✖ GUIDE MANUAL LAUNCH MUTATION: a running role refuses duplicate manual start instructions (215.447333ms)
✖ GUIDE RUNTIME OWNER MUTATION: removing the bound owner refuses by name (206.941833ms)
✖ GUIDE RUNTIME LEGACY: a version-1 Kristian runtime remains readable (224.10075ms)
✖ GUIDE RUNTIME MUTATION: an unignored runtime refuses by name (241.57425ms)
✖ GUIDE RUNTIME PLURALITY: unfinished runtimes coexist and status names each one (218.229084ms)
✖ GUIDE RUNTIME MUTATION: a linked RUN.json refuses as unsafe state (237.236792ms)
✖ GUIDE RUNTIME STATUS TRUTH: corrupt live state refuses instead of hiding behind launch state (247.93375ms)
✖ GUIDE RUNTIME STATUS TRUTH: a forged HALTED label refuses without pushed halt evidence (242.930458ms)
✖ GUIDE RUNTIME STATUS TRUTH: pushed halt evidence supersedes a stale PAUSED_ERROR window label (259.06975ms)
✖ GUIDE GHOSTTY START: one explicit action requests exactly one clean Reviewer and Producer launcher (196.590209ms)
✔ GUIDE VISIBLE STARTUP MUTATION: launch is ready only after both roles bind the same session (0.226709ms)
✖ GUIDE GHOSTTY MUTATION: a failed Producer request refuses duplicate automatic recovery (196.92575ms)
✖ GUIDE GHOSTTY REVIEWER READINESS MUTATION: a window request without a live Reviewer never opens Producer (187.558208ms)
✖ GUIDE GHOSTTY PRODUCER READINESS MUTATION: a window request without a live Producer refuses success (183.734875ms)
✖ GUIDE VISIBLE ROLE STATUS: disk liveness reports a missing Producer instead of pretending the session is active (165.283292ms)
✖ GUIDE GHOSTTY OWNER-ERROR RECOVERY: one action reopens Reviewer first and Producer only after it is ready (198.015292ms)
✖ GUIDE GHOSTTY STABLE-HANDOVER RECOVERY: any formal owner decision can restore both missing roles (206.015375ms)
✖ GUIDE GHOSTTY STABLE-HANDOVER MUTATION: a missing reviewer job refuses instead of guessing (197.625833ms)
✖ GUIDE GHOSTTY STABLE-HANDOVER RETRY: a Reviewer startup miss stays safely recoverable (184.003625ms)
✖ GUIDE GHOSTTY STABLE-HANDOVER BINDING MUTATION: a changed Reviewer job refuses recovery (182.964833ms)
✖ GUIDE GHOSTTY PARTIAL RECOVERY: an existing Reviewer permits exactly one missing Producer retry (164.282708ms)
✖ GUIDE GHOSTTY BOTH-WINDOW RECOVERY: a saved owner decision restores Reviewer before Producer when both disappeared (282.714708ms)
✖ GUIDE CONSOLE RECOVERY: displayed choices are handled outside the model without weakening the gate (259.907875ms)
✖ GUIDE MANUAL RECOVERY: the existing run routes only missing roles to terminal instructions (139.23425ms)
✖ GUIDE MANUAL RECOVERY COMMANDS: default recovery reprints only existing run-bound launchers (148.523166ms)
✖ GUIDE CONSOLE RECOVERY MUTATION: a bare number never guesses between two recoverable sessions (132.740458ms)
✖ GUIDE GHOSTTY BOTH-WINDOW RECOVERY MUTATION: Producer stays closed when restored Reviewer is not ready (158.733792ms)
✔ HALT OWNER INTENT: explicit console forms are recognized without treating ordinary conversation as halt (1.583209ms)
✔ HALT CEREMONY: void the in-flight phase, require pushed evidence, then return through a fresh Brief (4602.676666ms)
✔ HALT STATUS TRUTH: corrupt halt evidence is named and never treated as terminal (401.713292ms)
✔ HALT TERMINAL MUTATION: halt and close evidence can never coexist (25.389708ms)
✔ the approval and advancement recovery commands run exactly as printed (881.505542ms)
✔ the missing-review recovery command runs exactly as printed (907.203541ms)
✔ a phase entry remains valid only while every prior gate proof still exists on disk (33.96925ms)
✔ INTERRUPTION SCHEMA: role, purpose, time, and evidence filenames remain one shared fail-closed contract (1.429666ms)
✖ INTERRUPTION RECOVERY: Ctrl-C kills Producer, distrusts partial artifact, and resumes the same context (8698.374917ms)
✖ INTERRUPTION RECOVERY: Ctrl-C returns a formal Reviewer job to PENDING and resumes the same context (8328.868958ms)
✖ INTERRUPTION RECOVERY: an interrupted owner conversation resumes without losing its disk-bound direction (8301.023916ms)
✖ INTERRUPTION MUTATION: missing first-turn context ID refuses automatic worker replacement (8318.738542ms)
✔ the repository carries the complete GPLv3-only license and Kristian's sole copyright (13.0785ms)
✔ PACKAGED NPX SUITE: the source-controlled binary is executable before npm touches it (4.547167ms)
✔ PACKAGED NPX SUITE: the documented local npx command does not mutate its checkout (6912.892041ms)
✔ PACKAGED NPX SUITE: a real tarball installs and runs the plain-JavaScript koda binary (6549.30725ms)
✖ PLURAL LIVE RUNTIME: two independent Producer/Reviewer pairs complete without crossed sessions (444.859416ms)
✖ FULL-SESSION QUICK START: one command creates a pushed project and numbered Guide launch (146.165458ms)
✔ RECEIPT ADVERSARIAL SUITE: an earlier review's receipt cannot approve a fresh review (25.194375ms)
✔ RECEIPT ADVERSARIAL SUITE: phase N receipt cannot approve phase N+1 (14.7925ms)
✔ RECEIPT ADVERSARIAL SUITE: outer whitespace is accepted and any inner word change refuses (22.364375ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REVISE (10.809667ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REJECT (8.036667ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override DISCUSS (8.86725ms)
✔ FULL RELAY RUNNER: preparation creates a clean pushed project with local skills (713.426667ms)
✔ FULL RELAY RUNNER: execution preserves two contexts and binds owner acknowledgement to the full receipt (3.848667ms)
✔ GENUINE FULL RELAY EVIDENCE: six phases, revision recovery, distinct contexts, and pushed close (19.929208ms)
✔ RELAY STATUS TRUTH: a prepared run names all roles and prints only the first safe action (702.801792ms)
✔ RELAY STATUS TRUTH: after Reviewer is alive, Producer becomes the one safe next action (591.012125ms)
✔ RELAY STATUS TRUTH: a stopped reviewer process names explicit stale-lock recovery (612.373ms)
✔ RELAY STATUS TRUTH: an active recorded producer is never duplicated by a blind hint (659.34775ms)
✔ RELAY STATUS TRUTH: corrupt or ambiguous run state refuses instead of guessing (1558.883ms)
✔ RELAY STATUS TRUTH: a corrupt waiting direction refuses immediately by name (557.600958ms)
✔ TWO-WINDOW PROTOCOL: reviewer jobs are bounded and duplicate reviewer windows refuse (39.740708ms)
✔ TWO-WINDOW VISIBILITY: progress is readable without exposing review receipts (0.5275ms)
✖ REVIEWER OPEN CONVERSATION: an idle owner question resumes the Reviewer but changes no project file (708.1145ms)
✖ REVIEWER OPEN CONVERSATION MUTATION: an empty final answer refuses instead of pretending conversation completed (655.995542ms)
✖ REVIEWER OPEN CONVERSATION SCOPE: project-level thought returns to Guide without mutation (690.931084ms)
✖ REVIEWER OPEN CONVERSATION WAIT: active direction is recorded but cannot become a current-phase handback (712.608916ms)
✔ REVIEWER OPEN CONVERSATION HALT: an explicit owner halt cannot be filed as a waiting direction (926.492833ms)
✔ REVIEWER OPEN CONVERSATION HALT CANCEL: cancellation changes no session evidence (592.113ms)
✖ REVIEWER OPEN CONVERSATION HALT MARKER: an explicit model boundary opens the same confirmed ceremony (538.285208ms)
✖ REVIEWER OPEN CONVERSATION TTY: a real terminal line reaches the idle Reviewer prompt (698.651084ms)
✖ REVIEWER STARTUP RACE: input typed before session binding waits and is answered after the same session binds (1239.930875ms)
✔ TWO-WINDOW RECEIPT: short owner code maps to the exact disk receipt (512.791791ms)
✔ TWO-WINDOW TERMINAL SAFETY: inline review controls are sanitized without changing disk evidence (491.052125ms)
✔ TWO-WINDOW RECEIPT MUTATION: a wrong review code refuses, names the condition, and remains retryable (639.814083ms)
✔ TWO-WINDOW RECEIPT ADVERSARIAL: a valid code from another review refuses (404.377041ms)
✖ WAIT AT FORMAL REVIEW: new direction is recorded immediately but does not revise the reviewed artifact (412.347083ms)
✖ WAIT RECEIPT BINDING: a recorded direction survives a wrong receipt but nothing advances (452.137834ms)
✔ TWO-WINDOW RECEIPT RECOVERY: the live legacy acknowledgement failure reopens the same review and context (719.060709ms)
✔ TWO-WINDOW PRODUCER RECOVERY: an awaiting formal review is rejoined instead of replaced (945.297875ms)
✔ TWO-WINDOW OWNER CEREMONY TTY: inline review and numbered choices disclose the code step (10868.989167ms)
✔ TWO-WINDOW OWNER CEREMONY TTY: stop for now preserves an explicit resumable decision point (469.280208ms)
✔ TWO-WINDOW OWNER CEREMONY TTY: inline review does not invoke a configured pager (471.351208ms)
✔ TWO-WINDOW OWNER CEREMONY TTY: acknowledgement never invokes pbcopy (584.621ms)
✖ WAIT CONTRACT MIGRATION: the superseded same-phase handback marker refuses by name (384.818417ms)
✔ REVIEWER HALT: the sole interrupt voids the phase and pushes immutable evidence without a receipt (957.637334ms)
✖ TWO-WINDOW RELAY: a pending formal-review job wakes one persistent reviewer and returns acknowledged disk evidence (360.565666ms)
✖ TWO-WINDOW SESSION: separate producer and reviewer processes rendezvous through pushed close (508.388208ms)
✔ REVIEW BINDING SUITE: changing review findings after owner acknowledgement refuses (31.875875ms)
✔ REVIEW BINDING SUITE: an untouched generated template cannot become an approved review (17.116792ms)
✔ a current review cannot be replaced before its receipt is recorded (15.964708ms)
✔ a revised artifact receives a fresh review, fresh receipt, and archived prior review (9.77825ms)
✔ DISCUSS requires the owner's ruling before a fresh definitive review (17.126625ms)
✔ REVIEWER FIXTURES: five sealed fixtures ship as blind Koda-C projects (38.435875ms)
✔ REVIEWER FIXTURES: the planted hard number is unsupported and the control has no plant (0.803792ms)
✔ REVIEWER FIXTURES: inference-chain plant requires a deduction across three source files (0.636042ms)
✔ REVIEWER FIXTURES: tempting honest control is imperfect in style but its claims execute (61.982416ms)
✔ REVIEWER FIXTURES: evidence-absence trap has working code but its claimed run record is missing (66.808958ms)
✔ REVIEWER FIXTURES: new scoring contracts still match their pre-run Git seal (47.360667ms)
✔ REVIEWER FIXTURES: Ghostty runs pin model and effort and preserve ephemeral Codex events (0.886875ms)
✔ REVIEWER FIXTURES: the bounded model matrix is backed by seventeen graded run folders (54.858042ms)
✔ PROJECT SANDBOX SUITE: role turns fail closed with project-scoped read and write access (1.386959ms)
✖ PROJECT SANDBOX SUITE: Guide permission table stays bounded without granting the toolkit project (7.640958ms)
✖ PROJECT SANDBOX SUITE: every verified session role carries the toolkit proof automatically (4.437208ms)
✔ PROJECT SANDBOX SUITE: the Node toolchain root is a narrow explicit read capability (8.442875ms)
✔ PROJECT SANDBOX SUITE: the resolved Git toolchain avoids the macOS xcrun cache shim (0.189833ms)
✔ PROJECT SANDBOX MUTATION: only an empty real role-config directory may be omitted from the evidence archive (16.404833ms)
✔ PROJECT SANDBOX SUITE: read-only probes cannot mutate their workspace (0.235ms)
✔ SECURITY INTEGRITY SUITE: the install is dependency-free with no install hook (0.971709ms)
✔ SECURITY INTEGRITY SUITE: the committed repository contains no symbolic link (12.102833ms)
✔ SECURITY INTEGRITY SUITE: tracked text contains no common live credential signature (319.254667ms)
✔ SECURITY INTEGRITY SUITE: relay roles and model children never inherit ambient credentials or parent context identity (0.305833ms)
✔ SECURITY INTEGRITY SUITE: shared role launcher bytes ignore ambient terminal locale and color (0.292375ms)
✔ SECURITY INTEGRITY SUITE: owner receipt and ruling data never enter child-process arguments or environment (0.654083ms)
✔ SECURITY INTEGRITY SUITE: fresh-model evidence runs strip ambient credentials and parent context identity (0.326292ms)
✔ SECURITY INTEGRITY SUITE: every managed Codex exec ignores ambient command rules (3.930375ms)
✔ SECURITY INTEGRITY SUITE: both live session roles bind verified toolkit, Git, and private config capabilities (0.890667ms)
✔ SECURITY INTEGRITY SUITE: the executable shared role launcher starts one child with a clean environment (276.541ms)
✔ session creation requires a prompt and numbers dated folders (18.803875ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-1IgC3E/remote.git
 * [new branch]      main -> main
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-1IgC3E/remote.git
   65de96b..3c6c93b  main -> main
✔ a completed session is closed only after its state is committed and pushed (3742.819125ms)
✔ immutable close refuses symbolic links inside session evidence (6.238709ms)
✔ immutable close refuses duplicate generated metadata markers (0.089333ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-ignored-remote-N4LxqT/remote.git
 * [new branch]      main -> main
✔ immutable close refuses a bound session file that Git ignored instead of pushing (368.64ms)
✔ every Koda-C skill has valid relay sections and four-line Codex metadata (9.232083ms)
✔ skill index metadata stays concise, front-loaded, and trigger-specific (2.58875ms)
✔ producer phase skills hand only to the one shared reviewer (1.378333ms)
✔ concurrent relay skills require bound session identity instead of latest-session guessing (1.8165ms)
✔ the shared reviewer keeps all phase criteria in one place (1.376542ms)
✔ in-phase consultation is disk-backed and cannot impersonate formal review (2.030666ms)
✔ session open and close remain ceremonies outside producer phase routing (1.40875ms)
✔ the session-prompt skill is the sole skill route to a future session launch (1.564916ms)
✔ the fresh Guide preflight model run is sealed, blind, ephemeral, and read-only (1.025833ms)
✔ historical fresh Codex startup discovered the original nine local skills and root guidance without reading disk (3.105208ms)
✔ fresh Codex discovers all ten current skills and the active Guide preflight refuses without mutation (0.945625ms)
✔ STALE-REVIEW BINDING: editing the artifact after review refuses with a named re-review reason (19.633ms)
✔ STALE-REVIEW BINDING: reviewing after an edit binds the new artifact and opens (29.851958ms)
✔ STATUS TRUTH SUITE: deleting a review is reflected immediately (332.726458ms)
✔ STATUS TRUTH SUITE: blanking an artifact is reflected immediately (347.269791ms)
✔ STATUS TRUTH SUITE: corrupt ledger metadata refuses with a named corruption reason (163.119917ms)
✔ STATUS TRUTH SUITE: editing an acknowledged review is reflected immediately (162.941291ms)
✔ STATUS TRUTH SUITE: invalid state JSON refuses instead of guessing (223.160458ms)
✔ STATUS TRUTH SUITE: a path-like phase name in state refuses instead of escaping (167.479875ms)
✔ JUDGE JOURNEY SUITE: the committed binary runs without rebuilding (86.076667ms)
✔ JUDGE JOURNEY SUITE: video and submission documents preserve every live rule (3.619458ms)
✖ PUBLIC GUIDE CONTRACT: current entry docs use the product name and describe the shipped workflow (4.614208ms)
✔ JUDGE JOURNEY SUITE: local links in the judge documents resolve (15.181166ms)
✔ TOOLKIT INTEGRITY: a complete manifest proves the installed launch surface (17.424042ms)
✔ TOOLKIT INTEGRITY CAPABILITY: a sandbox receives only exact verified read paths (6.813916ms)
✔ TOOLKIT INTEGRITY PERMISSIONS: public runtime code compacts without granting docs or runtime state (5.030708ms)
✔ TOOLKIT INTEGRITY MUTATION: changed launch code refuses and names the file (10.588125ms)
✔ TOOLKIT INTEGRITY MUTATION: linked evidence refuses instead of following it (13.023542ms)
✔ TOOLKIT INTEGRITY MUTATION: a manifest cannot overstate its hashed test evidence (4.772ms)
✔ WRITE SET: claims exact clean paths and refuses Guide or sibling overlap (200.143084ms)
✔ WRITE SET CONCURRENCY: simultaneous same-path claims cannot both succeed (191.177458ms)
✔ WRITE SET CONTAINMENT: a linked parent cannot alias a claimed output path (132.287458ms)
✔ WRITE SET CLI: explicit session identity records project-relative output ownership (193.815083ms)
✔ WRITE SET STATUS TRUTH: corrupt disk evidence refuses instead of inferring state (177.439375ms)
✔ GUIDE WRITE SET: new Guide files are explicit and active-session overlap refuses (243.534209ms)
✔ WRITE SET: unrelated Guide and sibling dirt may coexist; unclaimed dirt refuses (185.608917ms)
✔ GUIDE RUNTIME OWNERSHIP: published run and return namespaces are never mistaken for sibling work (162.199667ms)
✔ WRITE SET MUTATION: rename and delete are exact owned changes, including both rename sides (339.362667ms)
✔ WRITE SET MUTATION: staged bytes must match the recorded post-work hash (222.416125ms)
✔ WRITE SET MUTATION: a claimed path changed after post-work observation refuses by name (155.022166ms)
✔ GIT LOCK: live owner refuses, stale lock recovers only with an empty index (165.586ms)
✔ GIT LOCK SERIALIZATION: relay callers may wait for a live short ceremony (213.68325ms)
✔ GIT LOCK SERIALIZATION MUTATION: release between inspection steps retries instead of leaking ENOENT (93.393833ms)
✔ GIT LOCK RELEASE MUTATION: a new owner acquired during cleanup is never deleted by the retiring owner (83.137875ms)
✔ GIT LOCK CONTAINMENT: linked .koda cannot redirect lock evidence (80.085958ms)
✔ GIT LOCK CONTAINMENT MUTATION: a disk-supplied token cannot become a retired path (72.262208ms)
ℹ tests 261
ℹ suites 0
ℹ pass 188
ℹ fail 73
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 34591.636791

✖ failing tests:

test at tests/guide-console.test.ts:339:1
✖ GUIDE CONSOLE PERSISTENCE: a closed console resumes the same independent Guide context (101.199125ms)
  AssertionError [ERR_ASSERTION]: GUIDE CLOSED SAFELY — Toolkit integrity file changed after verification: src/ghostty.ts.


  1 !== 0

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide-console.test.ts:362:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: false,
    code: 'ERR_ASSERTION',
    actual: 1,
    expected: 0,
    operator: 'strictEqual',
    diff: 'simple'
  }

test at tests/guide-console.test.ts:382:1
✖ GUIDE CONSOLE STARTUP REFUSAL: the primary Codex error is shown before a missing context symptom (106.290417ms)
  AssertionError [ERR_ASSERTION]: The input did not match the regular expression /Guide could not start or continue: Error loading config\.toml: invalid permission profile/. Input:

  'GUIDE CLOSED SAFELY — Toolkit integrity file changed after verification: src/ghostty.ts.\n'

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide-console.test.ts:403:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: true,
    code: 'ERR_ASSERTION',
    actual: 'GUIDE CLOSED SAFELY — Toolkit integrity file changed after verification: src/ghostty.ts.\n',
    expected: /Guide could not start or continue: Error loading config\.toml: invalid permission profile/,
    operator: 'match',
    diff: 'simple'
  }

test at tests/guide-console.test.ts:409:1
✖ GUIDE CONSOLE INPUT RECOVERY: input closing during a long startup exits cleanly after preserving the turn (117.239833ms)
  AssertionError [ERR_ASSERTION]: GUIDE CLOSED SAFELY — Toolkit integrity file changed after verification: src/ghostty.ts.


  1 !== 0

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide-console.test.ts:444:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: false,
    code: 'ERR_ASSERTION',
    actual: 1,
    expected: 0,
    operator: 'strictEqual',
    diff: 'simple'
  }

test at tests/guide-console.test.ts:453:1
✖ GUIDE CONSOLE CRASH EVIDENCE: raw events are durable while a model turn is still running (148.410125ms)
  AssertionError [ERR_ASSERTION]: The input did not match the regular expression /thread\.started/. Input:

  ''

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide-console.test.ts:510:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: true,
    code: 'ERR_ASSERTION',
    actual: '',
    expected: /thread\.started/,
    operator: 'match',
    diff: 'simple'
  }

test at tests/guide-console.test.ts:520:1
✖ GUIDE CONSOLE CRASH EVIDENCE MUTATION: existing or linked evidence refuses before the model runs (126.057708ms)
  AssertionError [ERR_ASSERTION]: The input did not match the regular expression /Guide event evidence already exists/. Input:

  'GUIDE CLOSED SAFELY — Toolkit integrity file changed after verification: src/ghostty.ts.\n'

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide-console.test.ts:554:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: true,
    code: 'ERR_ASSERTION',
    actual: 'GUIDE CLOSED SAFELY — Toolkit integrity file changed after verification: src/ghostty.ts.\n',
    expected: /Guide event evidence already exists/,
    operator: 'match',
    diff: 'simple'
  }

test at tests/guide-runtime-integration.test.ts:56:1
✖ GUIDE REAL-PROJECT RELAY: an independent sibling uses two bound contexts and returns pushed close (517.873834ms)
  Error: Toolkit integrity file changed after verification: src/ghostty.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide-runtime-integration.test.ts:105:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async startSubtestAfterBootstrap (node:internal/test_runner/harness:385:3)

test at tests/guide.test.ts:101:1
✖ GUIDE PREFLIGHT: active work distinguishes blocked successors from explicit independent siblings (24.074416ms)
  Error: Toolkit integrity file changed after verification: src/ghostty.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async runGuideCli (file:///Users/freeborn/Dev/koda-codex/src/guide-commands.ts:178:21)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:105:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:122:1
✖ GUIDE TOOLKIT BINDING: confirmation carries machine-discovered launch integrity (11.223292ms)
  Error: Toolkit integrity file changed after verification: src/ghostty.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:124:19)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:135:1
✖ GUIDE TOOLKIT MUTATION: changed bound toolkit proof makes the launch stale (17.961333ms)
  Error: Toolkit integrity file changed after verification: src/ghostty.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:137:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:149:1
✖ GUIDE INDEPENDENT CONTROL: an active Produce session permits an owner-classified Explore sibling (15.964292ms)
  Error: Toolkit integrity file changed after verification: src/ghostty.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:152:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:162:1
✖ GUIDE INDEPENDENT BINDING: confirmed kind and independence open exactly one matching sibling (283.482167ms)
  Error: Toolkit integrity file changed after verification: src/ghostty.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:165:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:196:1
✖ GUIDE PREFLIGHT CONTROL: a project with no active session permits exactly one draft (30.998458ms)
  Error: Toolkit integrity file changed after verification: src/ghostty.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async runGuideCli (file:///Users/freeborn/Dev/koda-codex/src/guide-commands.ts:178:21)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:199:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:205:1
✖ GUIDE HALT RETURN: a pushed halt and every waiting direction must enter a fresh confirmed Brief (482.662292ms)
  Error: Toolkit integrity file changed after verification: src/ghostty.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async runGuideCli (file:///Users/freeborn/Dev/koda-codex/src/guide-commands.ts:178:21)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:221:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:255:1
✖ GUIDE CONFIRMATION: one request binds prompt, manifest, continuity, and owner (6.96925ms)
  Error: Toolkit integrity file changed after verification: src/ghostty.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:257:18)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:298:1
✖ GUIDE VERIFIED HANDOVER: the owner receives a complete numbered launch choice (285.4065ms)
  Error: Toolkit integrity file changed after verification: src/ghostty.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:300:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:314:1
✖ GUIDE MUTATION: changing only a continuity file makes confirmation stale (71.416875ms)
  Error: Toolkit integrity file changed after verification: src/ghostty.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:316:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:324:1
✖ GUIDE MUTATION: changing only the prompt makes confirmation stale (8.749ms)
  Error: Toolkit integrity file changed after verification: src/ghostty.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:326:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:334:1
✖ GUIDE MUTATION: changing only the project manifest makes confirmation stale (12.751416ms)
  Error: Toolkit integrity file changed after verification: src/ghostty.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:336:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:348:1
✖ GUIDE GIT HANDOVER: a confirmed but uncommitted request refuses launch (236.47825ms)
  Error: Toolkit integrity file changed after verification: src/ghostty.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:350:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:357:1
✖ GUIDE RECOVERY: stale confirmation requires a pushed cancellation before reconfirming (265.809375ms)
  Error: Toolkit integrity file changed after verification: src/ghostty.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:359:17)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:388:1
✖ GUIDE RELAY: pushed confirmation opens the exact session and records its binding (253.583416ms)
  Error: Toolkit integrity file changed after verification: src/ghostty.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:390:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:411:1
✖ GUIDE BINDING STATUS: the session-local binding is close-bound and corruption refuses (220.534917ms)
  Error: Toolkit integrity file changed after verification: src/ghostty.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:413:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:426:1
✖ GUIDE BINDING RECOVERY: an interrupted open can bind only the matching latest session (287.290958ms)
  Error: Toolkit integrity file changed after verification: src/ghostty.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:428:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:443:1
✖ GUIDE STATUS TRUTH: corrupt launch evidence refuses instead of guessing (15.517791ms)
  Error: Toolkit integrity file changed after verification: src/ghostty.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:445:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:457:1
✖ GUIDE RUNTIME: one command binds a pushed launch and prints executable session-context commands (242.532417ms)
  Error: Toolkit integrity file changed after verification: src/ghostty.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:459:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:542:1
✖ GUIDE LAUNCH SURFACE COEXISTENCE: a prepared manual path may still choose Ghostty before either role starts (223.965833ms)
  Error: Toolkit integrity file changed after verification: src/ghostty.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:544:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:577:1
✖ GUIDE MANUAL LAUNCH MUTATION: a running role refuses duplicate manual start instructions (215.447333ms)
  Error: Toolkit integrity file changed after verification: src/ghostty.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:579:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:617:1
✖ GUIDE RUNTIME OWNER MUTATION: removing the bound owner refuses by name (206.941833ms)
  Error: Toolkit integrity file changed after verification: src/ghostty.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:619:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:638:1
✖ GUIDE RUNTIME LEGACY: a version-1 Kristian runtime remains readable (224.10075ms)
  Error: Toolkit integrity file changed after verification: src/ghostty.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:640:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:656:1
✖ GUIDE RUNTIME MUTATION: an unignored runtime refuses by name (241.57425ms)
  Error: Toolkit integrity file changed after verification: src/ghostty.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:658:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:671:1
✖ GUIDE RUNTIME PLURALITY: unfinished runtimes coexist and status names each one (218.229084ms)
  Error: Toolkit integrity file changed after verification: src/ghostty.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:673:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:705:1
✖ GUIDE RUNTIME MUTATION: a linked RUN.json refuses as unsafe state (237.236792ms)
  Error: Toolkit integrity file changed after verification: src/ghostty.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:707:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:742:1
✖ GUIDE RUNTIME STATUS TRUTH: corrupt live state refuses instead of hiding behind launch state (247.93375ms)
  Error: Toolkit integrity file changed after verification: src/ghostty.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:744:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:761:1
✖ GUIDE RUNTIME STATUS TRUTH: a forged HALTED label refuses without pushed halt evidence (242.930458ms)
  Error: Toolkit integrity file changed after verification: src/ghostty.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:763:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:780:1
✖ GUIDE RUNTIME STATUS TRUTH: pushed halt evidence supersedes a stale PAUSED_ERROR window label (259.06975ms)
  Error: Toolkit integrity file changed after verification: src/ghostty.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:782:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:834:1
✖ GUIDE GHOSTTY START: one explicit action requests exactly one clean Reviewer and Producer launcher (196.590209ms)
  Error: Toolkit integrity file changed after verification: src/ghostty.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:836:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:982:1
✖ GUIDE GHOSTTY MUTATION: a failed Producer request refuses duplicate automatic recovery (196.92575ms)
  Error: Toolkit integrity file changed after verification: src/ghostty.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:984:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:1030:1
✖ GUIDE GHOSTTY REVIEWER READINESS MUTATION: a window request without a live Reviewer never opens Producer (187.558208ms)
  Error: Toolkit integrity file changed after verification: src/ghostty.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1032:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:1059:1
✖ GUIDE GHOSTTY PRODUCER READINESS MUTATION: a window request without a live Producer refuses success (183.734875ms)
  Error: Toolkit integrity file changed after verification: src/ghostty.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1061:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:1089:1
✖ GUIDE VISIBLE ROLE STATUS: disk liveness reports a missing Producer instead of pretending the session is active (165.283292ms)
  Error: Toolkit integrity file changed after verification: src/ghostty.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1091:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:1131:1
✖ GUIDE GHOSTTY OWNER-ERROR RECOVERY: one action reopens Reviewer first and Producer only after it is ready (198.015292ms)
  Error: Toolkit integrity file changed after verification: src/ghostty.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1133:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:1263:1
✖ GUIDE GHOSTTY STABLE-HANDOVER RECOVERY: any formal owner decision can restore both missing roles (206.015375ms)
  Error: Toolkit integrity file changed after verification: src/ghostty.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async stableOwnerHandover (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1224:3)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1264:27)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:1315:1
✖ GUIDE GHOSTTY STABLE-HANDOVER MUTATION: a missing reviewer job refuses instead of guessing (197.625833ms)
  Error: Toolkit integrity file changed after verification: src/ghostty.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async stableOwnerHandover (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1224:3)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1316:17)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:1323:1
✖ GUIDE GHOSTTY STABLE-HANDOVER RETRY: a Reviewer startup miss stays safely recoverable (184.003625ms)
  Error: Toolkit integrity file changed after verification: src/ghostty.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async stableOwnerHandover (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1224:3)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1324:27)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:1364:1
✖ GUIDE GHOSTTY STABLE-HANDOVER BINDING MUTATION: a changed Reviewer job refuses recovery (182.964833ms)
  Error: Toolkit integrity file changed after verification: src/ghostty.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async stableOwnerHandover (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1224:3)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1365:27)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:1383:1
✖ GUIDE GHOSTTY PARTIAL RECOVERY: an existing Reviewer permits exactly one missing Producer retry (164.282708ms)
  Error: Toolkit integrity file changed after verification: src/ghostty.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1385:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:1540:1
✖ GUIDE GHOSTTY BOTH-WINDOW RECOVERY: a saved owner decision restores Reviewer before Producer when both disappeared (282.714708ms)
  Error: Toolkit integrity file changed after verification: src/ghostty.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async bothWindowsMissingAfterPartialRecovery (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1488:3)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1541:27)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:1624:1
✖ GUIDE CONSOLE RECOVERY: displayed choices are handled outside the model without weakening the gate (259.907875ms)
  Error: Toolkit integrity file changed after verification: src/ghostty.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async bothWindowsMissingAfterPartialRecovery (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1488:3)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1625:17)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:1669:1
✖ GUIDE MANUAL RECOVERY: the existing run routes only missing roles to terminal instructions (139.23425ms)
  Error: Toolkit integrity file changed after verification: src/ghostty.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async bothWindowsMissingAfterPartialRecovery (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1488:3)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1670:27)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:1694:1
✖ GUIDE MANUAL RECOVERY COMMANDS: default recovery reprints only existing run-bound launchers (148.523166ms)
  Error: Toolkit integrity file changed after verification: src/ghostty.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async bothWindowsMissingAfterPartialRecovery (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1488:3)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1695:27)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:1710:1
✖ GUIDE CONSOLE RECOVERY MUTATION: a bare number never guesses between two recoverable sessions (132.740458ms)
  Error: Toolkit integrity file changed after verification: src/ghostty.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async bothWindowsMissingAfterPartialRecovery (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1488:3)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1711:27)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:1735:1
✖ GUIDE GHOSTTY BOTH-WINDOW RECOVERY MUTATION: Producer stays closed when restored Reviewer is not ready (158.733792ms)
  Error: Toolkit integrity file changed after verification: src/ghostty.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async bothWindowsMissingAfterPartialRecovery (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1488:3)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1736:27)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/interruption.test.ts:94:1
✖ INTERRUPTION RECOVERY: Ctrl-C kills Producer, distrusts partial artifact, and resumes the same context (8698.374917ms)
  Error: Timed out waiting for the Producer model turn.
      at waitFor (file:///Users/freeborn/Dev/koda-codex/tests/interruption.test.ts:72:9)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/interruption.test.ts:142:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/interruption.test.ts:186:1
✖ INTERRUPTION RECOVERY: Ctrl-C returns a formal Reviewer job to PENDING and resumes the same context (8328.868958ms)
  Error: Timed out waiting for the Reviewer model turn.
      at waitFor (file:///Users/freeborn/Dev/koda-codex/tests/interruption.test.ts:72:9)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/interruption.test.ts:265:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/interruption.test.ts:303:1
✖ INTERRUPTION RECOVERY: an interrupted owner conversation resumes without losing its disk-bound direction (8301.023916ms)
  Error: Timed out waiting for the owner conversation turn.
      at waitFor (file:///Users/freeborn/Dev/koda-codex/tests/interruption.test.ts:72:9)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/interruption.test.ts:346:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/interruption.test.ts:376:1
✖ INTERRUPTION MUTATION: missing first-turn context ID refuses automatic worker replacement (8318.738542ms)
  Error: Timed out waiting for the context-free model turn.
      at waitFor (file:///Users/freeborn/Dev/koda-codex/tests/interruption.test.ts:72:9)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/interruption.test.ts:406:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/plural-runtime-integration.test.ts:49:1
✖ PLURAL LIVE RUNTIME: two independent Producer/Reviewer pairs complete without crossed sessions (444.859416ms)
  Error: Toolkit integrity file changed after verification: src/ghostty.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/plural-runtime-integration.test.ts:87:19)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async startSubtestAfterBootstrap (node:internal/test_runner/harness:385:3)

test at tests/quickstart.test.ts:13:1
✖ FULL-SESSION QUICK START: one command creates a pushed project and numbered Guide launch (146.165458ms)
  AssertionError [ERR_ASSERTION]: ────────────────────────────────────────────────────────
  KODA-C FULL-SESSION QUICK START

  This creates a disposable project inside the Koda-C folder.
  It uses its own local Git remote. It cannot push into Koda-C.
  ────────────────────────────────────────────────────────

  # Session prompt

  ## Owner intent

  Build and exercise the project's bounded Markdown heading reporter through one
  complete Koda-C Produce session. This is the first session and exists to make the
  full Guide, Producer, Reviewer, receipt-gate, and immutable-close workflow visible.

  ## In scope

  - One offline dependency-free Node.js command that accepts one Markdown path.
  - Ordered ATX heading records with level, text, and one-based line number.
  - Backtick- and tilde-fenced code exclusion.
  - Deterministic tests, raw live evidence, and a pushed immutable Koda-C close.

  ## Out of scope

  - Setext headings, directories, recursion, standard input, dependencies, network
    access, publishing, performance claims, and launcher implementation work.

  ## Success evidence

  - A stranger can inspect the command, fixtures, deterministic tests, raw live
    outputs, all six phase artifacts and reviews, approval ledger, and pushed close.
  - The command reports ordinary headings, fenced-code exclusion, no headings, and
    a missing or unreadable path without changing its inputs.

  ## Constraints and owner rulings

  - Use Node.js 22.18 or newer and no package dependency.
  - Producer is watch-only; owner interaction belongs in the persistent Reviewer.
  - Every phase requires independent review and owner acknowledgement.
  - No review verdict or revision path is predetermined.

  ## Prior session carry-forward

  - Previous terminal evidence: none for the first session
  - Previous summary: none
  - Carried forward by owner: none
  - Deliberately not carried: none

  ## Relay handover

  - Session kind: produce
  - Launch relationship: independent first session (no predecessor or active sibling)
  - Dependencies: none
  - Configured receiver: brief
  - Ground prepared: AGENTS.md, docs/PROJECT.md, docs/BACKLOG.md, docs/WORKING-PLAN.md, docs/IN-PHASE-CONSULTATION.md, and the verified Koda-C toolkit capability
  - Open items: none

  ────────────────────────────────────────────────────────
  CHECKING THE REAL SESSION PATH

  Koda-C is validating Guide and opening one disposable session through
  the exact restricted Producer profile. No model or window opens here.
  NO ACTION NEEDED — Koda-C will show READY or a named refusal.
  ────────────────────────────────────────────────────────


  ERROR: Toolkit integrity file changed after verification: src/ghostty.ts.


  1 !== 0

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/quickstart.test.ts:46:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async startSubtestAfterBootstrap (node:internal/test_runner/harness:385:3) {
    generatedMessage: false,
    code: 'ERR_ASSERTION',
    actual: 1,
    expected: 0,
    operator: 'strictEqual',
    diff: 'simple'
  }

test at tests/relay-window.test.ts:317:1
✖ REVIEWER OPEN CONVERSATION: an idle owner question resumes the Reviewer but changes no project file (708.1145ms)
  AssertionError [ERR_ASSERTION]:
  ────────────────────────────────────────────────────────
  REVIEWER PAUSED SAFELY
  ────────────────────────────────────────────────────────
  Toolkit integrity file changed after verification: src/ghostty.ts.

  Resume with: npm run relay:reviewer
  ────────────────────────────────────────────────────────


  1 !== 0

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/relay-window.test.ts:320:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: false,
    code: 'ERR_ASSERTION',
    actual: 1,
    expected: 0,
    operator: 'strictEqual',
    diff: 'simple'
  }

test at tests/relay-window.test.ts:332:1
✖ REVIEWER OPEN CONVERSATION MUTATION: an empty final answer refuses instead of pretending conversation completed (655.995542ms)
  AssertionError [ERR_ASSERTION]: The input did not match the regular expression /REVIEWER PAUSED SAFELY[\s\S]*emitted no final answer/. Input:

  '\n' +
    '────────────────────────────────────────────────────────\n' +
    'REVIEWER PAUSED SAFELY\n' +
    '────────────────────────────────────────────────────────\n' +
    'Toolkit integrity file changed after verification: src/ghostty.ts.\n' +
    '\n' +
    'Resume with: npm run relay:reviewer\n' +
    '────────────────────────────────────────────────────────\n'

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/relay-window.test.ts:336:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: true,
    code: 'ERR_ASSERTION',
    actual: '\n────────────────────────────────────────────────────────\nREVIEWER PAUSED SAFELY\n────────────────────────────────────────────────────────\nToolkit integrity file changed after verification: src/ghostty.ts.\n\nResume with: npm run relay:reviewer\n────────────────────────────────────────────────────────\n',
    expected: /REVIEWER PAUSED SAFELY[\s\S]*emitted no final answer/,
    operator: 'match',
    diff: 'simple'
  }

test at tests/relay-window.test.ts:342:1
✖ REVIEWER OPEN CONVERSATION SCOPE: project-level thought returns to Guide without mutation (690.931084ms)
  AssertionError [ERR_ASSERTION]:
  ────────────────────────────────────────────────────────
  REVIEWER PAUSED SAFELY
  ────────────────────────────────────────────────────────
  Toolkit integrity file changed after verification: src/ghostty.ts.

  Resume with: npm run relay:reviewer
  ────────────────────────────────────────────────────────


  1 !== 0

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/relay-window.test.ts:345:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: false,
    code: 'ERR_ASSERTION',
    actual: 1,
    expected: 0,
    operator: 'strictEqual',
    diff: 'simple'
  }

test at tests/relay-window.test.ts:352:1
✖ REVIEWER OPEN CONVERSATION WAIT: active direction is recorded but cannot become a current-phase handback (712.608916ms)
  AssertionError [ERR_ASSERTION]:
  ────────────────────────────────────────────────────────
  REVIEWER PAUSED SAFELY
  ────────────────────────────────────────────────────────
  Toolkit integrity file changed after verification: src/ghostty.ts.

  Resume with: npm run relay:reviewer
  ────────────────────────────────────────────────────────


  1 !== 0

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/relay-window.test.ts:358:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: false,
    code: 'ERR_ASSERTION',
    actual: 1,
    expected: 0,
    operator: 'strictEqual',
    diff: 'simple'
  }

test at tests/relay-window.test.ts:399:1
✖ REVIEWER OPEN CONVERSATION HALT MARKER: an explicit model boundary opens the same confirmed ceremony (538.285208ms)
  AssertionError [ERR_ASSERTION]:
  ────────────────────────────────────────────────────────
  REVIEWER PAUSED SAFELY
  ────────────────────────────────────────────────────────
  Toolkit integrity file changed after verification: src/ghostty.ts.

  Resume with: npm run relay:reviewer
  ────────────────────────────────────────────────────────


  1 !== 0

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/relay-window.test.ts:406:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: false,
    code: 'ERR_ASSERTION',
    actual: 1,
    expected: 0,
    operator: 'strictEqual',
    diff: 'simple'
  }

test at tests/relay-window.test.ts:414:1
✖ REVIEWER OPEN CONVERSATION TTY: a real terminal line reaches the idle Reviewer prompt (698.651084ms)
  AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:

  1 !== 0

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/relay-window.test.ts:419:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: true,
    code: 'ERR_ASSERTION',
    actual: 1,
    expected: 0,
    operator: 'strictEqual',
    diff: 'simple'
  }

test at tests/relay-window.test.ts:427:1
✖ REVIEWER STARTUP RACE: input typed before session binding waits and is answered after the same session binds (1239.930875ms)
  AssertionError [ERR_ASSERTION]: The input was expected to not match the regular expression /REVIEWER PAUSED SAFELY|has not bound a session ID/. Input:

  'spawn /opt/homebrew/Cellar/node/26.0.0/bin/node /Users/freeborn/Dev/koda-codex/scripts/run-relay-reviewer-window.ts\r\n' +
    '\r\n' +
    '────────────────────────────────────────────────────────\r\n' +
    'KODA-C REVIEWER — STARTING SESSION\r\n' +
    '────────────────────────────────────────────────────────\r\n' +
    'Reviewer: gpt-5.6-terra / medium\r\n' +
    'Relay: 2026-07-21-software-clean-sol-medium-terra-medium-01\r\n' +
    '\r\n' +
    'Owner input: NOT OPEN YET\r\n' +
    'Producer is creating and binding the session identity.\r\n' +
    'Any line typed early is held safely until that binding exists.\r\n' +
    'NO ACTION NEEDED — this window will announce when conversation is ready.\r\n' +
    '────────────────────────────────────────────────────────\r\n' +
    "What's happening now?\r\r\n" +
    '\r\n' +
    '────────────────────────────────────────────────────────\r\n' +
    'KODA-C REVIEWER — SESSION READY\r\n' +
    '────────────────────────────────────────────────────────\r\n' +
    'Session: 2026-07-21-01\r\n' +
    'Owner input: OPEN — active-session conversation belongs here.\r\n' +
    'This context remains the Reviewer for the complete session. Leave it open.\r\n' +
    '\r\n' +
    'You may type while Producer works. New direction is recorded now and waits for the next gate.\r\n' +
    'Type /halt to request a permanent end to this session attempt.\r\n' +
    '────────────────────────────────────────────────────────\r\n' +
    'reviewer> \r\n' +
    '────────────────────────────────────────────────────────\r\n' +
    'REVIEWER PAUSED SAFELY\r\n' +
    '────────────────────────────────────────────────────────\r\n' +
    'Toolkit integrity file changed after verification: src/ghostty.ts.\r\n' +
    '\r\n' +
    'Resume with: npm run relay:reviewer\r\n' +
    '────────────────────────────────────────────────────────\r\n' +
    '\n' +
    'expect: spawn id exp5 not open\n' +
    '    while executing\n' +
    '"expect "early question survived startup""\r\n'

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/relay-window.test.ts:524:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: true,
    code: 'ERR_ASSERTION',
    actual: `spawn /opt/homebrew/Cellar/node/26.0.0/bin/node /Users/freeborn/Dev/koda-codex/scripts/run-relay-reviewer-window.ts\r\n\r\n────────────────────────────────────────────────────────\r\nKODA-C REVIEWER — STARTING SESSION\r\n────────────────────────────────────────────────────────\r\nReviewer: gpt-5.6-terra / medium\r\nRelay: 2026-07-21-software-clean-sol-medium-terra-medium-01\r\n\r\nOwner input: NOT OPEN YET\r\nProducer is creating and binding the session identity.\r\nAny line typed early is held safely until that binding exists.\r\nNO ACTION NEEDED — this window will announce when conversation is ready.\r\n────────────────────────────────────────────────────────\r\nWhat's happening now?\r\r\n\r\n────────────────────────────────────────────────────────\r\nKODA-C REVIEWER — SESSION READY\r\n────────────────────────────────────────────────────────\r\nSession: 2026-07-21-01\r\nOwner input: OPEN — active-session conversation belongs here.\r\nThis context remains the Reviewer for the complete session. Leave it open.\r\n\r\nYou may type while Producer works. New direction is recorded now and waits for the next gate.\r\nType /halt to request a permanent end to this session attempt.\r\n────────────────────────────────────────────────────────\r\nreviewer> \r\n────────────────────────────────────────────────────────\r\nREVIEWER PAUSED SAFELY\r\n────────────────────────────────────────────────────────\r\nToolkit integrity file changed after verification: src/ghostty.ts.\r\n\r\nResume with: npm run relay:reviewer\r\n────────────────────────────────────────────────────────\r\n\nexpect: spawn id exp5 not open\n    while executing\n"expect "early question survived startup""\r\n`,
    expected: /REVIEWER PAUSED SAFELY|has not bound a session ID/,
    operator: 'doesNotMatch',
    diff: 'simple'
  }

test at tests/relay-window.test.ts:599:1
✖ WAIT AT FORMAL REVIEW: new direction is recorded immediately but does not revise the reviewed artifact (412.347083ms)
  AssertionError [ERR_ASSERTION]:
  ────────────────────────────────────────────────────────
  REVIEWER PAUSED SAFELY
  ────────────────────────────────────────────────────────
  Toolkit integrity file changed after verification: src/ghostty.ts.
  Evidence remains in /private/var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-reviewer-window-iJme52/2026-07-21-software-clean-sol-medium-terra-medium-01/REVIEWER-JOB.json
  Nothing was acknowledged or advanced.
  ────────────────────────────────────────────────────────


  1 !== 0

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/relay-window.test.ts:604:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: false,
    code: 'ERR_ASSERTION',
    actual: 1,
    expected: 0,
    operator: 'strictEqual',
    diff: 'simple'
  }

test at tests/relay-window.test.ts:619:1
✖ WAIT RECEIPT BINDING: a recorded direction survives a wrong receipt but nothing advances (452.137834ms)
  AssertionError [ERR_ASSERTION]:
  ────────────────────────────────────────────────────────
  REVIEWER PAUSED SAFELY
  ────────────────────────────────────────────────────────
  Toolkit integrity file changed after verification: src/ghostty.ts.
  Evidence remains in /private/var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-reviewer-window-Wpa97C/2026-07-21-software-clean-sol-medium-terra-medium-01/REVIEWER-JOB.json
  Nothing was acknowledged or advanced.
  ────────────────────────────────────────────────────────


  1 !== 2

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/relay-window.test.ts:624:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: false,
    code: 'ERR_ASSERTION',
    actual: 1,
    expected: 2,
    operator: 'strictEqual',
    diff: 'simple'
  }

test at tests/relay-window.test.ts:953:1
✖ WAIT CONTRACT MIGRATION: the superseded same-phase handback marker refuses by name (384.818417ms)
  AssertionError [ERR_ASSERTION]: The input did not match the regular expression /superseded DISK HANDOFF REQUIRED marker/. Input:

  '\n' +
    '────────────────────────────────────────────────────────\n' +
    'REVIEWER PAUSED SAFELY\n' +
    '────────────────────────────────────────────────────────\n' +
    'Toolkit integrity file changed after verification: src/ghostty.ts.\n' +
    'Evidence remains in /private/var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-reviewer-window-XJNP1b/2026-07-21-software-clean-sol-medium-terra-medium-01/REVIEWER-JOB.json\n' +
    'Nothing was acknowledged or advanced.\n' +
    '────────────────────────────────────────────────────────\n'

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/relay-window.test.ts:959:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: true,
    code: 'ERR_ASSERTION',
    actual: '\n────────────────────────────────────────────────────────\nREVIEWER PAUSED SAFELY\n────────────────────────────────────────────────────────\nToolkit integrity file changed after verification: src/ghostty.ts.\nEvidence remains in /private/var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-reviewer-window-XJNP1b/2026-07-21-software-clean-sol-medium-terra-medium-01/REVIEWER-JOB.json\nNothing was acknowledged or advanced.\n────────────────────────────────────────────────────────\n',
    expected: /superseded DISK HANDOFF REQUIRED marker/,
    operator: 'match',
    diff: 'simple'
  }

test at tests/relay-window.test.ts:1015:1
✖ TWO-WINDOW RELAY: a pending formal-review job wakes one persistent reviewer and returns acknowledged disk evidence (360.565666ms)
  AssertionError [ERR_ASSERTION]:
  ────────────────────────────────────────────────────────
  REVIEWER PAUSED SAFELY
  ────────────────────────────────────────────────────────
  Toolkit integrity file changed after verification: src/ghostty.ts.
  Evidence remains in /private/var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-reviewer-wake-ZxurWF/2026-07-21-software-clean-sol-medium-terra-medium-01/REVIEWER-JOB.json
  Nothing was acknowledged or advanced.
  ────────────────────────────────────────────────────────


  1 !== 0

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/relay-window.test.ts:1089:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: false,
    code: 'ERR_ASSERTION',
    actual: 1,
    expected: 0,
    operator: 'strictEqual',
    diff: 'simple'
  }

test at tests/relay-window.test.ts:1102:1
✖ TWO-WINDOW SESSION: separate producer and reviewer processes rendezvous through pushed close (508.388208ms)
  AssertionError [ERR_ASSERTION]:
  ────────────────────────────────────────────────────────
  RELAY PAUSED SAFELY
  ────────────────────────────────────────────────────────
  Toolkit integrity file changed after verification: src/ghostty.ts.

  Resume with: npm run relay:producer -- ../../../../private/var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-two-window-session-LBmny1/2026-07-21-software-clean-sol-medium-terra-medium-01
  ────────────────────────────────────────────────────────

  no producer stderr file

  1 !== 0

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/relay-window.test.ts:1211:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: false,
    code: 'ERR_ASSERTION',
    actual: 1,
    expected: 0,
    operator: 'strictEqual',
    diff: 'simple'
  }

test at tests/security.test.ts:56:1
✖ PROJECT SANDBOX SUITE: Guide permission table stays bounded without granting the toolkit project (7.640958ms)
  Error: Toolkit integrity file changed after verification: src/ghostty.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async verifiedToolkitReadPathsAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:171:3)
      at async verifiedToolkitPermissionReadPathsAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:193:17)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/security.test.ts:58:27)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/security.test.ts:75:1
✖ PROJECT SANDBOX SUITE: every verified session role carries the toolkit proof automatically (4.437208ms)
  Error: Toolkit integrity file changed after verification: src/ghostty.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async verifiedToolkitReadPathsAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:171:3)
      at async verifiedToolkitPermissionReadPathsAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:193:17)
      at async verifiedCodexRolePermissionArgs (file:///Users/freeborn/Dev/koda-codex/src/codex-role-permissions.ts:142:5)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/security.test.ts:77:16)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/submission.test.ts:99:1
✖ PUBLIC GUIDE CONTRACT: current entry docs use the product name and describe the shipped workflow (4.614208ms)
  AssertionError [ERR_ASSERTION]: The input did not match the regular expression /manual surface is terminal-independent[\s\S]*personally exercised only on macOS 26\.5\.1 arm64/. Input:

  '# Koda-C Quick Start\n' +
    '\n' +
    'This page has two paths. Choose the one that matches what you want to see.\n' +
    '\n' +
    'Koda-C is an independent project by one human owner working with Codex, not a\n' +
    'company or team. macOS 26.5.1 arm64 is the only personally tested operating\n' +
    'system. The core is not tied to the macOS filesystem; other platforms are simply\n' +
    'not certified by this release.\n' +
    '\n' +
    '## Path A — see the gate in about one minute\n' +
    '\n' +
    'Use this when you want the smallest proof and do not want to launch a model.\n' +
    '\n' +
    'Requirements: Node.js 22.18 or newer and Git.\n' +
    '\n' +
    'From the Koda-C repository:\n' +
    '\n' +
    '```bash\n' +
    'KODA_DEMO_DIR=$(mktemp -d /tmp/koda-c-demo.XXXXXX)\n' +
    'node dist/cli.js init "$KODA_DEMO_DIR" --demo\n' +
    '```\n' +
    '\n' +
    'Koda-C prints the next command. Run it. The gate refuses because an approving\n' +
    'review exists but its receipt has not entered the approval ledger. Continue with\n' +
    'the exact commands Koda-C prints. The complete annotated version is in\n' +
    '[DEMO.md](DEMO.md#one-minute-mechanical-proof).\n' +
    '\n' +
    'This path tests the headless gate only. It does not open Guide, Producer, or\n' +
    'Reviewer and does not require Ghostty or Codex CLI.\n' +
    '\n' +
    '## Path B — run a complete three-context session\n' +
    '\n' +
    'Use this when you want the complete human workflow:\n' +
    '\n' +
    '```text\n' +
    'Guide stays open\n' +
    '  → Reviewer opens for owner conversation\n' +
    '  → Producer opens as watch-only\n' +
    '  → Brief → Orient → Plan → Produce → Live → Summary\n' +
    '  → every review requires owner acknowledgement\n' +
    '  → immutable close is committed and pushed\n' +
    '  → the result returns to Guide\n' +
    '```\n' +
    '\n' +
    'Requirements for both launch choices:\n' +
    '\n' +
    '- Codex CLI installed and signed in;\n' +
    '- enough model time for a real six-phase session.\n' +
    '\n' +
    'For automatic windows, also use macOS with Ghostty installed and allow Ghostty to\n' +
    'open the two role windows. For manual windows, use any terminal application in\n' +
    'which you can keep Guide, Reviewer, and Producer visible separately. The manual\n' +
    "surface is terminal-independent, but this release's full model workflow has still\n" +
    'been personally exercised only on macOS 26.5.1 arm64.\n' +
    '\n' +
    'macOS is required here only because this packaged demonstration uses the optional\n' +
    "macOS Ghostty window adapter. It is not a requirement of Koda-C's files, gate, or\n" +
    'core CLI. The one-minute Path A works without Ghostty or Codex; platforms beyond\n' +
    'the tested macOS release environment are not yet claimed as certified.\n' +
    '\n' +
    'No `npm install` is required. From the Koda-C repository, run one command:\n' +
    '\n' +
    '```bash\n' +
    'npm run demo:session\n' +
    '```\n' +
    '\n' +
    'Koda-C then owns the instructions:\n' +
    '\n' +
    '1. It shows the exact sample session prompt.\n' +
    '2. Type the name you want in durable review and approval records.\n' +
    '3. Choose `1` to confirm or `2` to create nothing.\n' +
    '4. Koda-C creates an isolated project under `.koda/full-session-demos/`, gives it\n' +
    '   a separate local Git remote, and confirms and pushes the prompt.\n' +
    '5. Before printing `READY`, Koda-C clones that prepared project into temporary\n' +
    '   scratch space and runs the exact first `session new` command through the\n' +
    '   installed restricted Producer profile. No model or window opens during this\n' +
    '   check, and the prepared human-demo project remains session-empty.\n' +
    '6. Koda-C opens Guide. Guide reconstructs the project from disk. When it displays\n' +
    '   `READY TO LAUNCH`, choose one launch surface:\n' +
    '   - `1` — Koda-C opens exactly one Reviewer and one Producer in Ghostty.\n' +
    '   - `2` — Koda-C prepares the same session and prints two exact commands.\n' +
    '   - `3` — open nothing and keep the verified launch ready.\n' +
    '7. For manual launch, leave Guide open. Open a second terminal in the displayed\n' +
    '   project and run the Reviewer command first. Leave it open, then open a third\n' +
    '   terminal in that same project and run the Producer command. Do not edit either\n' +
    '   command. Both are short project-contained launcher files with a clean\n' +
    '   environment and the same run ID.\n' +
    '\n' +
    'Reviewer may appear first with `STARTING SESSION — NO ACTION NEEDED`. It does not\n' +
    'accept active-session conversation yet. Producer then creates the disk-backed\n' +
    'session. Only when Reviewer displays `SESSION READY` and `reviewer>` is the owner\n' +
    'conversation open. If a line is typed during the short startup interval, the same\n' +
    'Reviewer window waits and processes it after the session binds instead of exiting.\n' +
    '\n' +
    'After either launch:\n' +
    '\n' +
    '- **Guide:** type normally for project-level conversation. It may remain open\n' +
    '  during the session.\n' +
    '- **Reviewer:** this is the session window you use. Read reviews, ask questions,\n' +
    '  and use its numbered choices.\n' +
    '- **Producer:** watch only. It says `NO ACTION NEEDED` whenever it does not accept\n' +
    '  owner input.\n' +
    '\n' +
    'At an approved review, choose `1`, then type the displayed eight-character\n' +
    "`REVIEW CODE`. The controller resolves it to the review's complete unique receipt\n" +
    'and rechecks every gate condition. A wrong or old code changes nothing and keeps\n' +
    'the decision open.\n' +
    '\n' +
    'The demo project cannot push into the Koda-C repository or GitHub. Its `origin`\n' +
    'is a local bare repository inside that disposable project. All model, runtime,\n' +
    "review, receipt, Git, and transcript evidence stays under the Koda-C repository's\n" +
    'ignored `.koda/` directory.\n' +
    '\n' +
    'The Ghostty and manual choices are two interfaces over one workflow. They do not\n' +
    'create different kinds of sessions, and the manual choice does not weaken owner\n' +
    'acknowledgement or make the owner carry reviews, receipts, paths, hashes, or state\n' +
    'between roles.\n' +
    '\n' +
    '## If you make a mistake\n' +
    '\n' +
    '- Follow the numbered choice shown in the window that accepts input.\n' +
    '- A wrong review code leaves the gate closed and lets you try again.\n' +
    '- `STOP SAFELY` preserves the decision point for later recovery.\n' +
    '- `HALT PERMANENTLY` ends that attempt and requires a fresh Brief; use it only\n' +
    '  when you intend to void the current phase.\n' +
    '- If a role window disappears, return to Guide and ask: `What is the current\n' +
    '  session state?` Guide derives the safe recovery from disk. Ghostty mode reopens\n' +
    '  only the missing role; manual mode reprints only the missing bound launcher.\n' +
    '- Never paste a receipt, filesystem path, hash, commit, or recovery command\n' +
    '  between windows. Koda-C owns that transport.\n' +
    '\n' +
    '## What the full-session demo does not claim\n' +
    '\n' +
    'It is a real model run, so duration, wording, and review outcomes are not\n' +
    'pre-scripted. The sample product is intentionally small, but its six phases,\n' +
    'separate contexts, owner decisions, mechanical gates, and pushed close are real.\n' +
    'The bundled helper is a demonstration bootstrap, not a universal project-persona\n' +
    'generator. Real projects must adapt `AGENTS.md`, skills, evidence shapes, and\n' +
    'review criteria to their own purpose.\n' +
    '\n' +
    'For every CLI verb and its consequence, see the [Command Manual](COMMAND-MANUAL.md).\n'

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/submission.test.ts:133:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: true,
    code: 'ERR_ASSERTION',
    actual: '# Koda-C Quick Start\n\nThis page has two paths. Choose the one that matches what you want to see.\n\nKoda-C is an independent project by one human owner working with Codex, not a\ncompany or team. macOS 26.5.1 arm64 is the only personally tested operating\nsystem. The core is not tied to the macOS filesystem; other platforms are simply\nnot certified by this release.\n\n## Path A — see the gate in about one minute\n\nUse this when you want the smallest proof and do not want to launch a model.\n\nRequirements: Node.js 22.18 or newer and Git.\n\nFrom the Koda-C repository:\n\n```bash\nKODA_DEMO_DIR=$(mktemp -d /tmp/koda-c-demo.XXXXXX)\nnode dist/cli.js init "$KODA_DEMO_DIR" --demo\n```\n\nKoda-C prints the next command. Run it. The gate refuses because an approving\nreview exists but its receipt has not entered the approval ledger. Continue with\nthe exact commands Koda-C prints. The complete annotated version is in\n[DEMO.md](DEMO.md#one-minute-mechanical-proof).\n\nThis path tests the headless gate only. It does not open Guide, Producer, or\nReviewer and does not require Ghostty or Codex CLI.\n\n## Path B — run a complete three-context session\n\nUse this when you want the complete human workflow:\n\n```text\nGuide stays open\n  → Reviewer opens for owner conversation\n  → Producer opens as watch-only\n  → Brief → Orient → Plan → Produce → Live → Summary\n  → every review requires owner acknowledgement\n  → immutable close is committed and pushed\n  → the result returns to Guide\n```\n\nRequirements for both launch choices:\n\n- Codex CLI installed and signed in;\n- enough model time for a real six-phase session.\n\nFor automatic windows, also use macOS with Ghostty installed and allow Ghostty to\nopen the two role windows. For manual windows, use any terminal application in\nwhich you can keep Guide, Reviewer, and Producer visible separately. The manual\nsurface is terminal-independent, but this release\'s full model workflow has still\nbeen personally exercised only on macOS 26.5.1 arm64.\n\nmacOS is required here only because this packaged demonstration uses the optional\nmacOS Ghostty window adapter. It is not a requirement of Koda-C\'s files, gate, or\ncore CLI. The one-minute Path A works without Ghostty or Codex; platforms beyond\nthe tested macOS release environment are not yet claimed as certified.\n\nNo `npm install` is required. From the Koda-C repository, run one command:\n\n```bash\nnpm run demo:session\n```\n\nKoda-C then owns the instructions:\n\n1. It shows the exact sample session prompt.\n2. Type the name you want in durable review and approval records.\n3. Choose `1` to confirm or `2` to create nothing.\n4. Koda-C creates an isolated project under `.koda/full-session-demos/`, gives it\n   a separate local Git remote, and confirms and pushes the prompt.\n5. Before printing `READY`, Koda-C clones that prepared project into temporary\n   scratch space and runs the exact first `session new` command through the\n   installed restricted Producer profile. No model or window opens during this\n   check, and the prepared human-demo project remains session-empty.\n6. Koda-C opens Guide. Guide reconstructs the project from disk. When it displays\n   `READY TO LAUNCH`, choose one launch surface:\n   - `1` — Koda-C opens exactly one Reviewer and one Producer in Ghostty.\n   - `2` — Koda-C prepares the same session and prints two exact commands.\n   - `3` — open nothing and keep the verified launch ready.\n7. For manual launch, leave Guide open. Open a second terminal in the displayed\n   project and run the Reviewer command first. Leave it open, then open a third\n   terminal in that same project and run the Producer command. Do not edit either\n   command. Both are short project-contained launcher files with a clean\n   environment and the same run ID.\n\nReviewer may appear first with `STARTING SESSION — NO ACTION NEEDED`. It does not\naccept active-session conversation yet. Producer then creates the disk-backed\nsession. Only when Reviewer displays `SESSION READY` and `reviewer>` is the owner\nconversation open. If a line is typed during the short startup interval, the same\nReviewer window waits and processes it after the session binds instead of exiting.\n\nAfter either launch:\n\n- **Guide:** type normally for project-level conversation. It may remain open\n  during the session.\n- **Reviewer:** this is the session window you use. Read reviews, ask questions,\n  and use its numbered choices.\n- **Producer:** watch only. It says `NO ACTION NEEDED` whenever it does not accept\n  owner input.\n\nAt an approved review, choose `1`, then type the displayed eight-character\n`REVIEW CODE`. The controller resolves it to the review\'s complete unique receipt\nand rechecks every gate condition. A wrong or old code changes nothing and keeps\nthe decision open.\n\nThe demo project cannot push into the Koda-C repository or GitHub. Its `origin`\nis a local bare repository inside that disposable project. All model, runtime,\nreview, receipt, Git, and transcript evidence stays under the Koda-C repository\'s\nignored `.koda/` directory.\n\nThe Ghostty and manual choices are two interfaces over one workflow. They do not\ncreate different kinds of sessions, and the manual choice does not weaken owner\nacknowledgement or make the owner carry reviews, receipts, paths, hashes, or state\nbetween roles.\n\n## If you make a mistake\n\n- Follow the numbered choice shown in the window that accepts input.\n- A wrong review code leaves the gate closed and lets you try again.\n- `STOP SAFELY` preserves the decision point for later recovery.\n- `HALT PERMANENTLY` ends that attempt and requires a fresh Brief; use it only\n  when you intend to void the current phase.\n- If a role window disappears, return to Guide and ask: `What is the current\n  session state?` Guide derives the safe recovery from disk. Ghostty mode reopens\n  only the missing role; manual mode reprints only the missing bound launcher.\n- Never paste a receipt, filesystem path, hash, commit, or recovery command\n  between windows. Koda-C owns that transport.\n\n## What the full-session demo does not claim\n\nIt is a real model run, so duration, wording, and review outcomes are not\npre-scripted. The sample product is intentionally small, but its six phases,\nseparate contexts, owner decisions, mechanical gates, and pushed close are real.\nThe bundled helper is a demonstration bootstrap, not a universal project-persona\ngenerator. Real projects must adapt `AGENTS.md`, skills, evidence shapes, and\nreview criteria to their own purpose.\n\nFor every CLI verb and its consequence, see the [Command Manual](COMMAND-MANUAL.md).\n',
    expected: /manual surface is terminal-independent[\s\S]*personally exercised only on macOS 26\.5\.1 arm64/,
    operator: 'match',
    diff: 'simple'
  }
```
