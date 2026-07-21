# Per-test result — 2026-07-21-owner-comments-bootstrap-refusal

- Result: **FAIL**
- Recorded at: 2026-07-21T15:01:04.780Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `4dc31b5`
- Command: `/opt/homebrew/Cellar/node/26.0.0/bin/node --test --test-reporter=spec tests/concurrent-sessions.test.ts tests/config.test.ts tests/direction.test.ts tests/dogfood.test.ts tests/full-lifecycle.test.ts tests/gate.test.ts tests/guide-console.test.ts tests/guide-runtime-integration.test.ts tests/guide.test.ts tests/halt.test.ts tests/hints.test.ts tests/history.test.ts tests/interruption.test.ts tests/license.test.ts tests/package.test.ts tests/plural-runtime-integration.test.ts tests/quickstart.test.ts tests/receipt-adversarial.test.ts tests/relay-runner.test.ts tests/relay-status.test.ts tests/relay-window.test.ts tests/review-binding.test.ts tests/review.test.ts tests/reviewer-fixtures.test.ts tests/security.test.ts tests/session.test.ts tests/skill.test.ts tests/stale-review.test.ts tests/status-truth.test.ts tests/submission.test.ts tests/toolkit-integrity.test.ts tests/workset.test.ts`

Every discovered test and subtest is named below. No result is aggregated away.

```text
✔ CONCURRENT SESSION ALLOCATION: simultaneous starts receive distinct disk identities (68.660792ms)
✔ CONCURRENT SESSION MUTATION: independence is explicit and ambiguous mutation refuses (1094.472584ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-dependency-em434P/remote.git
 * [new branch]      main -> main
✔ DEPENDENCY MUTATION: an active predecessor refuses and pushed terminal evidence is hash-bound (2012.692708ms)
✔ the default phase chain is configurable data in the required order (2.584875ms)
✔ config validation rejects unsafe session paths and drifting phase names (0.269375ms)
✔ config validation refuses a sessions directory that resolves outside the project (37.096584ms)
✔ WAIT DIRECTION: record now, keep current contract frozen, and release only through advance (257.887916ms)
✔ WAIT DIRECTION MUTATION: citing a queued direction before its gate refuses split provenance (17.997667ms)
✔ WAIT DIRECTION CARRY: final-boundary direction becomes a hashed next-session Brief input (35.91325ms)
✔ WAIT DIRECTION MUTATION: changed prose and symbolic-link evidence refuse by name (18.808333ms)
✔ WAIT DIRECTION ATOMIC READ: Koda-C retries its transient file but persistent or unknown entries still refuse (339.911709ms)
✔ WAIT DIRECTION CONTAINMENT: a linked direction directory cannot redirect writes (7.309625ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-direction-boundary-uSMewB/remote.git
 * [new branch]      main -> main
✔ WAIT FINAL BOUNDARY: a new session prompt must cite direction released by the final gate (1567.007791ms)
✔ the committed dogfood snapshot contains the full native chain and an internally bound close (30.856209ms)
✔ FULL LIFECYCLE SCENARIO: clean approvals traverse all six phases and pushed close (825.731791ms)
✔ FULL LIFECYCLE SCENARIO: a REVISE loop recovers in plan before completing and closing (768.953334ms)
✔ FULL LIFECYCLE SCENARIO: DISCUSS records an owner ruling and requires a fresh live review (737.095584ms)
✔ a complete artifact, review, allowed verdict, unique receipt, and ledger proof open the gate (56.019292ms)
▶ GATE MUTATION SUITE: each core condition refuses and names itself
  ✔ artifact exists (18.954792ms)
  ✔ artifact is non-empty (11.327375ms)
  ✔ artifact is a regular file (10.526583ms)
  ✔ review exists (11.062708ms)
  ✔ review is a regular file (10.419208ms)
  ✔ approval ledger is a regular file (9.034708ms)
  ✔ verdict REVISE is blocking (12.0625ms)
  ✔ verdict REJECT is blocking (22.379458ms)
  ✔ verdict DISCUSS is blocking (19.987125ms)
  ✔ current receipt is quoted verbatim in the ledger (29.891125ms)
✔ GATE MUTATION SUITE: each core condition refuses and names itself (157.2715ms)
✔ outer receipt whitespace is ignored but inner bytes remain literal (23.970959ms)
▶ every gate condition fails closed when deliberately broken
  ✔ artifact missing (11.812542ms)
  ✔ artifact empty (15.415625ms)
  ✔ review missing (12.215ms)
  ✔ verdict line missing (12.036083ms)
  ✔ verdict unknown (13.654458ms)
  ✔ receipt missing from last line (14.908333ms)
  ✔ generated review metadata missing (24.42ms)
  ✔ duplicate generated review metadata is ambiguous (19.131042ms)
  ✔ review metadata names a different phase (20.050625ms)
  ✔ artifact changed after review (8.663333ms)
  ✔ final receipt differs from generated receipt (9.049584ms)
  ✔ receipt reused by another review (12.216ms)
  ✔ approval ledger missing (7.513584ms)
  ✔ exact receipt absent from ledger (10.3505ms)
  ✔ approver missing (8.491417ms)
  ✔ APPROVE WITH COMMENTS has no ledger comments (8.5255ms)
  ✔ REVISE blocks even with receipt proof (15.507583ms)
  ✔ REJECT blocks even with receipt proof (17.227584ms)
  ✔ DISCUSS blocks without an owner ruling (36.146958ms)
  ✔ DISCUSS still blocks after the ruling until a fresh review (10.320916ms)
✔ every gate condition fails closed when deliberately broken (289.988291ms)
✔ GUIDE CONSOLE SECURITY: every turn ignores ambient config and rules under the project profile (1.84275ms)
✔ GUIDE CONSOLE SECURITY: the Guide profile retains only named read-only runtime capabilities (0.304833ms)
✔ GUIDE CONSOLE STATE: invalid or ambiguous persistent identity refuses (0.837667ms)
✔ GUIDE CONSOLE TERMINAL SAFETY: model output cannot inject terminal or bidi controls (0.100042ms)
✔ GUIDE CONSOLE VISIBILITY: low-level inspection commands stay in evidence instead of flooding the screen (0.095333ms)
✔ GUIDE CONSOLE STARTUP: reconstruction is explicitly bounded to compact continuity evidence (0.173708ms)
✔ GUIDE CONSOLE LOCK: a live duplicate refuses and a released console can reopen (12.358792ms)
✔ GUIDE CONSOLE CONTAINMENT: a linked runtime parent refuses before lock creation (1.97125ms)
✔ GUIDE CONSOLE CONTAINMENT: Guide continuity cannot grant writes inside session evidence (7.759541ms)
✔ GUIDE OPEN UX: one command enters the persistent console without opening session roles (4.273ms)
✔ GUIDE OPEN UX: partial launch staffing refuses before the Guide opens (3.797416ms)
✔ GUIDE NUMBERED LAUNCH: Ghostty and manual terminals coexist while not-now preserves the launch (13.980292ms)
✖ GUIDE CONSOLE PERSISTENCE: a closed console resumes the same independent Guide context (121.449083ms)
✖ GUIDE CONSOLE STARTUP REFUSAL: the primary Codex error is shown before a missing context symptom (121.119458ms)
✖ GUIDE CONSOLE INPUT RECOVERY: input closing during a long startup exits cleanly after preserving the turn (101.166833ms)
✖ GUIDE CONSOLE CRASH EVIDENCE: raw events are durable while a model turn is still running (117.682625ms)
✖ GUIDE CONSOLE CRASH EVIDENCE MUTATION: existing or linked evidence refuses before the model runs (96.790584ms)
✖ GUIDE REAL-PROJECT RELAY: an independent sibling uses two bound contexts and returns pushed close (492.93125ms)
✔ GUIDE ENTRY: an active prior session refuses a new launch request and names it (87.415334ms)
✖ GUIDE PREFLIGHT: active work distinguishes blocked successors from explicit independent siblings (35.910916ms)
✖ GUIDE TOOLKIT BINDING: confirmation carries machine-discovered launch integrity (21.793333ms)
✖ GUIDE TOOLKIT MUTATION: changed bound toolkit proof makes the launch stale (59.986291ms)
✖ GUIDE INDEPENDENT CONTROL: an active Produce session permits an owner-classified Explore sibling (39.569584ms)
✖ GUIDE INDEPENDENT BINDING: confirmed kind and independence open exactly one matching sibling (298.804917ms)
✖ GUIDE PREFLIGHT CONTROL: a project with no active session permits exactly one draft (24.545958ms)
✖ GUIDE HALT RETURN: a pushed halt and every waiting direction must enter a fresh confirmed Brief (465.973167ms)
✖ GUIDE CONFIRMATION: one request binds prompt, manifest, continuity, and owner (32.328041ms)
✔ GUIDE PROMPT CONTRACT MUTATION: an explicit relationship mismatch refuses before confirmation (7.180291ms)
✔ GUIDE OWNER IDENTITY MUTATION: terminal control characters refuse before confirmation (4.962667ms)
✖ GUIDE VERIFIED HANDOVER: the owner receives a complete numbered launch choice (302.4135ms)
✖ GUIDE MUTATION: changing only a continuity file makes confirmation stale (16.883ms)
✖ GUIDE MUTATION: changing only the prompt makes confirmation stale (23.406917ms)
✖ GUIDE MUTATION: changing only the project manifest makes confirmation stale (28.169042ms)
✖ GUIDE GIT HANDOVER: a confirmed but uncommitted request refuses launch (302.931542ms)
✖ GUIDE RECOVERY: stale confirmation requires a pushed cancellation before reconfirming (261.470208ms)
✔ GUIDE GATE: a project with a Guide manifest refuses an unconfirmed session prompt (8.993542ms)
✖ GUIDE RELAY: pushed confirmation opens the exact session and records its binding (215.420541ms)
✖ GUIDE BINDING STATUS: the session-local binding is close-bound and corruption refuses (241.445875ms)
✖ GUIDE BINDING RECOVERY: an interrupted open can bind only the matching latest session (255.036833ms)
✖ GUIDE STATUS TRUTH: corrupt launch evidence refuses instead of guessing (23.92575ms)
✖ GUIDE RUNTIME: one command binds a pushed launch and prints executable session-context commands (272.593375ms)
✖ GUIDE LAUNCH SURFACE COEXISTENCE: a prepared manual path may still choose Ghostty before either role starts (259.624584ms)
✖ GUIDE MANUAL LAUNCH MUTATION: a running role refuses duplicate manual start instructions (219.364084ms)
✖ GUIDE RUNTIME OWNER MUTATION: removing the bound owner refuses by name (234.746459ms)
✖ GUIDE RUNTIME LEGACY: a version-1 Kristian runtime remains readable (248.52625ms)
✖ GUIDE RUNTIME MUTATION: an unignored runtime refuses by name (250.877459ms)
✖ GUIDE RUNTIME PLURALITY: unfinished runtimes coexist and status names each one (267.954875ms)
✖ GUIDE RUNTIME MUTATION: a linked RUN.json refuses as unsafe state (238.136416ms)
✖ GUIDE RUNTIME STATUS TRUTH: corrupt live state refuses instead of hiding behind launch state (275.279625ms)
✖ GUIDE RUNTIME STATUS TRUTH: a forged HALTED label refuses without pushed halt evidence (244.280333ms)
✖ GUIDE RUNTIME STATUS TRUTH: pushed halt evidence supersedes a stale PAUSED_ERROR window label (210.465125ms)
✖ GUIDE GHOSTTY START: one explicit action requests exactly one clean Reviewer and Producer launcher (207.672333ms)
✔ GUIDE VISIBLE STARTUP MUTATION: launch is ready only after both roles bind the same session (0.204708ms)
✖ GUIDE GHOSTTY MUTATION: a failed Producer request refuses duplicate automatic recovery (211.001334ms)
✖ GUIDE GHOSTTY REVIEWER READINESS MUTATION: a window request without a live Reviewer never opens Producer (201.243708ms)
✖ GUIDE GHOSTTY PRODUCER READINESS MUTATION: a window request without a live Producer refuses success (207.748041ms)
✖ GUIDE VISIBLE ROLE STATUS: disk liveness reports a missing Producer instead of pretending the session is active (199.313416ms)
✖ GUIDE GHOSTTY OWNER-ERROR RECOVERY: one action reopens Reviewer first and Producer only after it is ready (257.513791ms)
✖ GUIDE GHOSTTY STABLE-HANDOVER RECOVERY: any formal owner decision can restore both missing roles (222.221041ms)
✖ GUIDE GHOSTTY STABLE-HANDOVER MUTATION: a missing reviewer job refuses instead of guessing (223.896417ms)
✖ GUIDE GHOSTTY STABLE-HANDOVER RETRY: a Reviewer startup miss stays safely recoverable (209.770625ms)
✖ GUIDE GHOSTTY STABLE-HANDOVER BINDING MUTATION: a changed Reviewer job refuses recovery (162.817084ms)
✖ GUIDE GHOSTTY PARTIAL RECOVERY: an existing Reviewer permits exactly one missing Producer retry (169.644917ms)
✖ GUIDE GHOSTTY BOTH-WINDOW RECOVERY: a saved owner decision restores Reviewer before Producer when both disappeared (151.65025ms)
✖ GUIDE CONSOLE RECOVERY: displayed choices are handled outside the model without weakening the gate (151.646459ms)
✖ GUIDE MANUAL RECOVERY: the existing run routes only missing roles to terminal instructions (131.070834ms)
✖ GUIDE MANUAL RECOVERY COMMANDS: default recovery reprints only existing run-bound launchers (283.453958ms)
✖ GUIDE CONSOLE RECOVERY MUTATION: a bare number never guesses between two recoverable sessions (259.272625ms)
✖ GUIDE GHOSTTY BOTH-WINDOW RECOVERY MUTATION: Producer stays closed when restored Reviewer is not ready (151.982ms)
✔ HALT OWNER INTENT: explicit console forms are recognized without treating ordinary conversation as halt (0.6315ms)
✔ HALT CEREMONY: void the in-flight phase, require pushed evidence, then return through a fresh Brief (4588.580458ms)
✔ HALT STATUS TRUTH: corrupt halt evidence is named and never treated as terminal (423.063375ms)
✔ HALT TERMINAL MUTATION: halt and close evidence can never coexist (28.929708ms)
✔ the approval and advancement recovery commands run exactly as printed (710.243042ms)
✔ the missing-review recovery command runs exactly as printed (937.308625ms)
✔ a phase entry remains valid only while every prior gate proof still exists on disk (81.233ms)
✔ INTERRUPTION SCHEMA: role, purpose, time, and evidence filenames remain one shared fail-closed contract (1.566375ms)
✖ INTERRUPTION RECOVERY: Ctrl-C kills Producer, distrusts partial artifact, and resumes the same context (8687.108167ms)
✖ INTERRUPTION RECOVERY: Ctrl-C returns a formal Reviewer job to PENDING and resumes the same context (8328.116125ms)
✖ INTERRUPTION RECOVERY: an interrupted owner conversation resumes without losing its disk-bound direction (8323.148708ms)
✖ INTERRUPTION MUTATION: missing first-turn context ID refuses automatic worker replacement (8365.494ms)
✔ the repository carries the complete GPLv3-only license and Kristian's sole copyright (3.654416ms)
✔ PACKAGED NPX SUITE: the source-controlled binary is executable before npm touches it (5.972791ms)
✔ PACKAGED NPX SUITE: the documented local npx command does not mutate its checkout (7813.430833ms)
✔ PACKAGED NPX SUITE: a real tarball installs and runs the plain-JavaScript koda binary (6843.851125ms)
✖ PLURAL LIVE RUNTIME: two independent Producer/Reviewer pairs complete without crossed sessions (426.284625ms)
✖ FULL-SESSION QUICK START: one command creates a pushed project and numbered Guide launch (258.272292ms)
✔ RECEIPT ADVERSARIAL SUITE: an earlier review's receipt cannot approve a fresh review (24.388583ms)
✔ RECEIPT ADVERSARIAL SUITE: phase N receipt cannot approve phase N+1 (12.044791ms)
✔ RECEIPT ADVERSARIAL SUITE: outer whitespace is accepted and any inner word change refuses (19.231541ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REVISE (10.110375ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REJECT (10.270167ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override DISCUSS (10.080167ms)
✔ FULL RELAY RUNNER: preparation creates a clean pushed project with local skills (681.738458ms)
✔ FULL RELAY RUNNER: execution preserves two contexts and binds owner acknowledgement to the full receipt (3.495417ms)
✔ GENUINE FULL RELAY EVIDENCE: six phases, revision recovery, distinct contexts, and pushed close (18.508958ms)
✔ RELAY STATUS TRUTH: a prepared run names all roles and prints only the first safe action (644.681458ms)
✔ RELAY STATUS TRUTH: after Reviewer is alive, Producer becomes the one safe next action (614.635625ms)
✔ RELAY STATUS TRUTH: a stopped reviewer process names explicit stale-lock recovery (677.386084ms)
✔ RELAY STATUS TRUTH: an active recorded producer is never duplicated by a blind hint (696.058833ms)
✔ RELAY STATUS TRUTH: corrupt or ambiguous run state refuses instead of guessing (1710.977917ms)
✔ RELAY STATUS TRUTH: a corrupt waiting direction refuses immediately by name (614.328333ms)
✔ TWO-WINDOW PROTOCOL: reviewer jobs are bounded and duplicate reviewer windows refuse (37.056417ms)
✔ TWO-WINDOW VISIBILITY: progress is readable without exposing review receipts (0.731291ms)
✖ REVIEWER OPEN CONVERSATION: an idle owner question resumes the Reviewer but changes no project file (805.488833ms)
✖ REVIEWER OPEN CONVERSATION MUTATION: an empty final answer refuses instead of pretending conversation completed (752.397416ms)
✖ REVIEWER OPEN CONVERSATION SCOPE: project-level thought returns to Guide without mutation (822.723458ms)
✖ REVIEWER OPEN CONVERSATION WAIT: active direction is recorded but cannot become a current-phase handback (777.23975ms)
✔ REVIEWER OPEN CONVERSATION HALT: an explicit owner halt cannot be filed as a waiting direction (1028.93275ms)
✔ REVIEWER OPEN CONVERSATION HALT CANCEL: cancellation changes no session evidence (660.534042ms)
✖ REVIEWER OPEN CONVERSATION HALT MARKER: an explicit model boundary opens the same confirmed ceremony (516.270292ms)
✖ REVIEWER OPEN CONVERSATION TTY: a real terminal line reaches the idle Reviewer prompt (535.764458ms)
✖ REVIEWER STARTUP RACE: input typed before session binding waits and is answered after the same session binds (1416.167458ms)
✔ TWO-WINDOW RECEIPT: short owner code maps to the exact disk receipt (526.401584ms)
✔ TWO-WINDOW TERMINAL SAFETY: inline review controls are sanitized without changing disk evidence (498.154208ms)
✔ TWO-WINDOW RECEIPT MUTATION: a wrong review code refuses, names the condition, and remains retryable (590.452625ms)
✔ TWO-WINDOW RECEIPT ADVERSARIAL: a valid code from another review refuses (445.086625ms)
✖ WAIT AT FORMAL REVIEW: new direction is recorded immediately but does not revise the reviewed artifact (460.007625ms)
✖ WAIT RECEIPT BINDING: a recorded direction survives a wrong receipt but nothing advances (388.875584ms)
✔ TWO-WINDOW RECEIPT RECOVERY: the live legacy acknowledgement failure reopens the same review and context (794.370833ms)
✔ TWO-WINDOW PRODUCER RECOVERY: an awaiting formal review is rejoined instead of replaced (864.136375ms)
✔ OWNER ACKNOWLEDGEMENT PIPE: APPROVE WITH COMMENTS preserves the receipt and comments without a stranded prompt (534.952792ms)
✔ OWNER ACKNOWLEDGEMENT PIPE: DISCUSS preserves the receipt and owner ruling without a stranded prompt (669.04825ms)
✔ TWO-WINDOW OWNER CEREMONY TTY: inline review and numbered choices disclose the code step (10615.854916ms)
✔ TWO-WINDOW OWNER CEREMONY TTY: stop for now preserves an explicit resumable decision point (529.649375ms)
✔ TWO-WINDOW OWNER CEREMONY TTY: inline review does not invoke a configured pager (481.740459ms)
✔ TWO-WINDOW OWNER CEREMONY TTY: acknowledgement never invokes pbcopy (570.329291ms)
✖ WAIT CONTRACT MIGRATION: the superseded same-phase handback marker refuses by name (374.282709ms)
✔ REVIEWER HALT: the sole interrupt voids the phase and pushes immutable evidence without a receipt (967.355208ms)
✖ TWO-WINDOW RELAY: a pending formal-review job wakes one persistent reviewer and returns acknowledged disk evidence (387.79225ms)
✖ TWO-WINDOW SESSION: separate producer and reviewer processes rendezvous through pushed close (507.262792ms)
✔ REVIEW BINDING SUITE: changing review findings after owner acknowledgement refuses (23.06825ms)
✔ REVIEW BINDING SUITE: an untouched generated template cannot become an approved review (14.583875ms)
✔ a current review cannot be replaced before its receipt is recorded (20.487625ms)
✔ a revised artifact receives a fresh review, fresh receipt, and archived prior review (16.4995ms)
✔ DISCUSS requires the owner's ruling before a fresh definitive review (24.617167ms)
✔ REVIEWER FIXTURES: five sealed fixtures ship as blind Koda-C projects (52.289083ms)
✔ REVIEWER FIXTURES: the planted hard number is unsupported and the control has no plant (1.339417ms)
✔ REVIEWER FIXTURES: inference-chain plant requires a deduction across three source files (2.059666ms)
✔ REVIEWER FIXTURES: tempting honest control is imperfect in style but its claims execute (74.362209ms)
✔ REVIEWER FIXTURES: evidence-absence trap has working code but its claimed run record is missing (73.155416ms)
✔ REVIEWER FIXTURES: new scoring contracts still match their pre-run Git seal (42.199792ms)
✔ REVIEWER FIXTURES: Ghostty runs pin model and effort and preserve ephemeral Codex events (0.865833ms)
✔ REVIEWER FIXTURES: the bounded model matrix is backed by seventeen graded run folders (24.742875ms)
✔ PROJECT SANDBOX SUITE: role turns fail closed with project-scoped read and write access (1.095667ms)
✖ PROJECT SANDBOX SUITE: Guide permission table stays bounded without granting the toolkit project (16.380917ms)
✖ PROJECT SANDBOX SUITE: every verified session role carries the toolkit proof automatically (12.614541ms)
✔ PROJECT SANDBOX SUITE: the Node toolchain root is a narrow explicit read capability (1.2975ms)
✔ PROJECT SANDBOX SUITE: the resolved Git toolchain avoids the macOS xcrun cache shim (0.193125ms)
✔ PROJECT SANDBOX MUTATION: only an empty real role-config directory may be omitted from the evidence archive (7.725042ms)
✔ PROJECT SANDBOX SUITE: read-only probes cannot mutate their workspace (0.16ms)
✔ SECURITY INTEGRITY SUITE: the install is dependency-free with no install hook (2.214459ms)
✔ SECURITY INTEGRITY SUITE: the committed repository contains no symbolic link (13.581916ms)
✔ SECURITY INTEGRITY SUITE: tracked text contains no common live credential signature (365.214458ms)
✔ SECURITY INTEGRITY SUITE: relay roles and model children never inherit ambient credentials or parent context identity (0.484625ms)
✔ SECURITY INTEGRITY SUITE: shared role launcher bytes ignore ambient terminal locale and color (0.51075ms)
✔ SECURITY INTEGRITY SUITE: owner receipt and ruling data never enter child-process arguments or environment (0.753708ms)
✔ SECURITY INTEGRITY SUITE: fresh-model evidence runs strip ambient credentials and parent context identity (0.672208ms)
✔ SECURITY INTEGRITY SUITE: every managed Codex exec ignores ambient command rules (1.005041ms)
✔ SECURITY INTEGRITY SUITE: both live session roles bind verified toolkit, Git, and private config capabilities (1.012375ms)
✔ SECURITY INTEGRITY SUITE: the executable shared role launcher starts one child with a clean environment (353.586541ms)
✔ session creation requires a prompt and numbers dated folders (19.675375ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-U2Dfvv/remote.git
 * [new branch]      main -> main
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-U2Dfvv/remote.git
   4928987..b2f9be1  main -> main
✔ a completed session is closed only after its state is committed and pushed (3869.861541ms)
✔ immutable close refuses symbolic links inside session evidence (13.472166ms)
✔ immutable close refuses duplicate generated metadata markers (0.118583ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-ignored-remote-iDy6ID/remote.git
 * [new branch]      main -> main
✔ immutable close refuses a bound session file that Git ignored instead of pushing (326.212167ms)
✔ every Koda-C skill has valid relay sections and four-line Codex metadata (11.381959ms)
✔ skill index metadata stays concise, front-loaded, and trigger-specific (4.361083ms)
✔ producer phase skills hand only to the one shared reviewer (3.919084ms)
✔ concurrent relay skills require bound session identity instead of latest-session guessing (2.0205ms)
✔ the shared reviewer keeps all phase criteria in one place (1.151959ms)
✔ in-phase consultation is disk-backed and cannot impersonate formal review (2.501959ms)
✔ session open and close remain ceremonies outside producer phase routing (2.888959ms)
✔ the session-prompt skill is the sole skill route to a future session launch (2.319375ms)
✔ the fresh Guide preflight model run is sealed, blind, ephemeral, and read-only (0.645083ms)
✔ historical fresh Codex startup discovered the original nine local skills and root guidance without reading disk (2.225334ms)
✔ fresh Codex discovers all ten current skills and the active Guide preflight refuses without mutation (1.285709ms)
✔ STALE-REVIEW BINDING: editing the artifact after review refuses with a named re-review reason (30.65325ms)
✔ STALE-REVIEW BINDING: reviewing after an edit binds the new artifact and opens (37.633417ms)
✔ STATUS TRUTH SUITE: deleting a review is reflected immediately (347.926833ms)
✔ STATUS TRUTH SUITE: blanking an artifact is reflected immediately (327.872208ms)
✔ STATUS TRUTH SUITE: corrupt ledger metadata refuses with a named corruption reason (175.490875ms)
✔ STATUS TRUTH SUITE: editing an acknowledged review is reflected immediately (158.187833ms)
✔ STATUS TRUTH SUITE: invalid state JSON refuses instead of guessing (149.247875ms)
✔ STATUS TRUTH SUITE: a path-like phase name in state refuses instead of escaping (203.618125ms)
✔ JUDGE JOURNEY SUITE: the committed binary runs without rebuilding (81.835166ms)
✔ JUDGE JOURNEY SUITE: video and submission documents preserve every live rule (3.271333ms)
✔ PUBLIC GUIDE CONTRACT: current entry docs use the product name and describe the shipped workflow (5.370333ms)
✔ JUDGE JOURNEY SUITE: local links in the judge documents resolve (25.775458ms)
✔ TOOLKIT INTEGRITY: a complete manifest proves the installed launch surface (20.954375ms)
✔ TOOLKIT INTEGRITY CAPABILITY: a sandbox receives only exact verified read paths (5.444458ms)
✔ TOOLKIT INTEGRITY PERMISSIONS: public runtime code compacts without granting docs or runtime state (31.46125ms)
✔ TOOLKIT INTEGRITY MUTATION: changed launch code refuses and names the file (6.997958ms)
✔ TOOLKIT INTEGRITY MUTATION: linked evidence refuses instead of following it (5.223666ms)
✔ TOOLKIT INTEGRITY MUTATION: a manifest cannot overstate its hashed test evidence (11.757666ms)
✔ WRITE SET: claims exact clean paths and refuses Guide or sibling overlap (221.362625ms)
✔ WRITE SET CONCURRENCY: simultaneous same-path claims cannot both succeed (183.470417ms)
✔ WRITE SET CONTAINMENT: a linked parent cannot alias a claimed output path (147.116541ms)
✔ WRITE SET CLI: explicit session identity records project-relative output ownership (176.677958ms)
✔ WRITE SET STATUS TRUTH: corrupt disk evidence refuses instead of inferring state (183.031541ms)
✔ GUIDE WRITE SET: new Guide files are explicit and active-session overlap refuses (236.03325ms)
✔ WRITE SET: unrelated Guide and sibling dirt may coexist; unclaimed dirt refuses (221.693625ms)
✔ GUIDE RUNTIME OWNERSHIP: published run and return namespaces are never mistaken for sibling work (166.519042ms)
✔ WRITE SET MUTATION: rename and delete are exact owned changes, including both rename sides (404.368ms)
✔ WRITE SET MUTATION: staged bytes must match the recorded post-work hash (200.438792ms)
✔ WRITE SET MUTATION: a claimed path changed after post-work observation refuses by name (191.195542ms)
✔ GIT LOCK: live owner refuses, stale lock recovers only with an empty index (188.363083ms)
✔ GIT LOCK SERIALIZATION: relay callers may wait for a live short ceremony (212.395667ms)
✔ GIT LOCK SERIALIZATION MUTATION: release between inspection steps retries instead of leaking ENOENT (96.742417ms)
✔ GIT LOCK RELEASE MUTATION: a new owner acquired during cleanup is never deleted by the retiring owner (119.528209ms)
✔ GIT LOCK CONTAINMENT: linked .koda cannot redirect lock evidence (92.487083ms)
✔ GIT LOCK CONTAINMENT MUTATION: a disk-supplied token cannot become a retired path (85.560958ms)
ℹ tests 263
ℹ suites 0
ℹ pass 191
ℹ fail 72
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 34614.367917

✖ failing tests:

test at tests/guide-console.test.ts:339:1
✖ GUIDE CONSOLE PERSISTENCE: a closed console resumes the same independent Guide context (121.449083ms)
  AssertionError [ERR_ASSERTION]: GUIDE CLOSED SAFELY — Toolkit integrity file changed after verification: src/commands.ts.


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
✖ GUIDE CONSOLE STARTUP REFUSAL: the primary Codex error is shown before a missing context symptom (121.119458ms)
  AssertionError [ERR_ASSERTION]: The input did not match the regular expression /Guide could not start or continue: Error loading config\.toml: invalid permission profile/. Input:

  'GUIDE CLOSED SAFELY — Toolkit integrity file changed after verification: src/commands.ts.\n'

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide-console.test.ts:403:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: true,
    code: 'ERR_ASSERTION',
    actual: 'GUIDE CLOSED SAFELY — Toolkit integrity file changed after verification: src/commands.ts.\n',
    expected: /Guide could not start or continue: Error loading config\.toml: invalid permission profile/,
    operator: 'match',
    diff: 'simple'
  }

test at tests/guide-console.test.ts:409:1
✖ GUIDE CONSOLE INPUT RECOVERY: input closing during a long startup exits cleanly after preserving the turn (101.166833ms)
  AssertionError [ERR_ASSERTION]: GUIDE CLOSED SAFELY — Toolkit integrity file changed after verification: src/commands.ts.


  1 !== 0

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide-console.test.ts:444:10)
      at process.processTicksAndRejections (node:internal/process/task_queues:104:5)
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
✖ GUIDE CONSOLE CRASH EVIDENCE: raw events are durable while a model turn is still running (117.682625ms)
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
✖ GUIDE CONSOLE CRASH EVIDENCE MUTATION: existing or linked evidence refuses before the model runs (96.790584ms)
  AssertionError [ERR_ASSERTION]: The input did not match the regular expression /Guide event evidence already exists/. Input:

  'GUIDE CLOSED SAFELY — Toolkit integrity file changed after verification: src/commands.ts.\n'

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide-console.test.ts:554:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: true,
    code: 'ERR_ASSERTION',
    actual: 'GUIDE CLOSED SAFELY — Toolkit integrity file changed after verification: src/commands.ts.\n',
    expected: /Guide event evidence already exists/,
    operator: 'match',
    diff: 'simple'
  }

test at tests/guide-runtime-integration.test.ts:56:1
✖ GUIDE REAL-PROJECT RELAY: an independent sibling uses two bound contexts and returns pushed close (492.93125ms)
  Error: Toolkit integrity file changed after verification: src/commands.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide-runtime-integration.test.ts:105:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async startSubtestAfterBootstrap (node:internal/test_runner/harness:385:3)

test at tests/guide.test.ts:101:1
✖ GUIDE PREFLIGHT: active work distinguishes blocked successors from explicit independent siblings (35.910916ms)
  Error: Toolkit integrity file changed after verification: src/commands.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async runGuideCli (file:///Users/freeborn/Dev/koda-codex/src/guide-commands.ts:178:21)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:105:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:122:1
✖ GUIDE TOOLKIT BINDING: confirmation carries machine-discovered launch integrity (21.793333ms)
  Error: Toolkit integrity file changed after verification: src/commands.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:124:19)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:135:1
✖ GUIDE TOOLKIT MUTATION: changed bound toolkit proof makes the launch stale (59.986291ms)
  Error: Toolkit integrity file changed after verification: src/commands.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:137:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:149:1
✖ GUIDE INDEPENDENT CONTROL: an active Produce session permits an owner-classified Explore sibling (39.569584ms)
  Error: Toolkit integrity file changed after verification: src/commands.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:152:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:162:1
✖ GUIDE INDEPENDENT BINDING: confirmed kind and independence open exactly one matching sibling (298.804917ms)
  Error: Toolkit integrity file changed after verification: src/commands.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:165:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:196:1
✖ GUIDE PREFLIGHT CONTROL: a project with no active session permits exactly one draft (24.545958ms)
  Error: Toolkit integrity file changed after verification: src/commands.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async runGuideCli (file:///Users/freeborn/Dev/koda-codex/src/guide-commands.ts:178:21)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:199:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:205:1
✖ GUIDE HALT RETURN: a pushed halt and every waiting direction must enter a fresh confirmed Brief (465.973167ms)
  Error: Toolkit integrity file changed after verification: src/commands.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async runGuideCli (file:///Users/freeborn/Dev/koda-codex/src/guide-commands.ts:178:21)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:221:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:255:1
✖ GUIDE CONFIRMATION: one request binds prompt, manifest, continuity, and owner (32.328041ms)
  Error: Toolkit integrity file changed after verification: src/commands.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:257:18)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:298:1
✖ GUIDE VERIFIED HANDOVER: the owner receives a complete numbered launch choice (302.4135ms)
  Error: Toolkit integrity file changed after verification: src/commands.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:300:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:314:1
✖ GUIDE MUTATION: changing only a continuity file makes confirmation stale (16.883ms)
  Error: Toolkit integrity file changed after verification: src/commands.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:316:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:324:1
✖ GUIDE MUTATION: changing only the prompt makes confirmation stale (23.406917ms)
  Error: Toolkit integrity file changed after verification: src/commands.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:326:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:334:1
✖ GUIDE MUTATION: changing only the project manifest makes confirmation stale (28.169042ms)
  Error: Toolkit integrity file changed after verification: src/commands.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:336:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:348:1
✖ GUIDE GIT HANDOVER: a confirmed but uncommitted request refuses launch (302.931542ms)
  Error: Toolkit integrity file changed after verification: src/commands.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:350:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:357:1
✖ GUIDE RECOVERY: stale confirmation requires a pushed cancellation before reconfirming (261.470208ms)
  Error: Toolkit integrity file changed after verification: src/commands.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:359:17)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:388:1
✖ GUIDE RELAY: pushed confirmation opens the exact session and records its binding (215.420541ms)
  Error: Toolkit integrity file changed after verification: src/commands.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:390:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:411:1
✖ GUIDE BINDING STATUS: the session-local binding is close-bound and corruption refuses (241.445875ms)
  Error: Toolkit integrity file changed after verification: src/commands.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:413:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:426:1
✖ GUIDE BINDING RECOVERY: an interrupted open can bind only the matching latest session (255.036833ms)
  Error: Toolkit integrity file changed after verification: src/commands.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:428:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:443:1
✖ GUIDE STATUS TRUTH: corrupt launch evidence refuses instead of guessing (23.92575ms)
  Error: Toolkit integrity file changed after verification: src/commands.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:445:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:457:1
✖ GUIDE RUNTIME: one command binds a pushed launch and prints executable session-context commands (272.593375ms)
  Error: Toolkit integrity file changed after verification: src/commands.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:459:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:542:1
✖ GUIDE LAUNCH SURFACE COEXISTENCE: a prepared manual path may still choose Ghostty before either role starts (259.624584ms)
  Error: Toolkit integrity file changed after verification: src/commands.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:550:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:583:1
✖ GUIDE MANUAL LAUNCH MUTATION: a running role refuses duplicate manual start instructions (219.364084ms)
  Error: Toolkit integrity file changed after verification: src/commands.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:585:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:623:1
✖ GUIDE RUNTIME OWNER MUTATION: removing the bound owner refuses by name (234.746459ms)
  Error: Toolkit integrity file changed after verification: src/commands.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:625:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:644:1
✖ GUIDE RUNTIME LEGACY: a version-1 Kristian runtime remains readable (248.52625ms)
  Error: Toolkit integrity file changed after verification: src/commands.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:646:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:662:1
✖ GUIDE RUNTIME MUTATION: an unignored runtime refuses by name (250.877459ms)
  Error: Toolkit integrity file changed after verification: src/commands.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:664:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:677:1
✖ GUIDE RUNTIME PLURALITY: unfinished runtimes coexist and status names each one (267.954875ms)
  Error: Toolkit integrity file changed after verification: src/commands.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:679:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:711:1
✖ GUIDE RUNTIME MUTATION: a linked RUN.json refuses as unsafe state (238.136416ms)
  Error: Toolkit integrity file changed after verification: src/commands.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:713:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:748:1
✖ GUIDE RUNTIME STATUS TRUTH: corrupt live state refuses instead of hiding behind launch state (275.279625ms)
  Error: Toolkit integrity file changed after verification: src/commands.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:750:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:767:1
✖ GUIDE RUNTIME STATUS TRUTH: a forged HALTED label refuses without pushed halt evidence (244.280333ms)
  Error: Toolkit integrity file changed after verification: src/commands.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:769:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:786:1
✖ GUIDE RUNTIME STATUS TRUTH: pushed halt evidence supersedes a stale PAUSED_ERROR window label (210.465125ms)
  Error: Toolkit integrity file changed after verification: src/commands.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:788:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:840:1
✖ GUIDE GHOSTTY START: one explicit action requests exactly one clean Reviewer and Producer launcher (207.672333ms)
  Error: Toolkit integrity file changed after verification: src/commands.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:842:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:988:1
✖ GUIDE GHOSTTY MUTATION: a failed Producer request refuses duplicate automatic recovery (211.001334ms)
  Error: Toolkit integrity file changed after verification: src/commands.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:990:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:1036:1
✖ GUIDE GHOSTTY REVIEWER READINESS MUTATION: a window request without a live Reviewer never opens Producer (201.243708ms)
  Error: Toolkit integrity file changed after verification: src/commands.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1038:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:1065:1
✖ GUIDE GHOSTTY PRODUCER READINESS MUTATION: a window request without a live Producer refuses success (207.748041ms)
  Error: Toolkit integrity file changed after verification: src/commands.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1067:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:1095:1
✖ GUIDE VISIBLE ROLE STATUS: disk liveness reports a missing Producer instead of pretending the session is active (199.313416ms)
  Error: Toolkit integrity file changed after verification: src/commands.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1097:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:1137:1
✖ GUIDE GHOSTTY OWNER-ERROR RECOVERY: one action reopens Reviewer first and Producer only after it is ready (257.513791ms)
  Error: Toolkit integrity file changed after verification: src/commands.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1139:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:1269:1
✖ GUIDE GHOSTTY STABLE-HANDOVER RECOVERY: any formal owner decision can restore both missing roles (222.221041ms)
  Error: Toolkit integrity file changed after verification: src/commands.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async stableOwnerHandover (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1230:3)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1270:27)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:1321:1
✖ GUIDE GHOSTTY STABLE-HANDOVER MUTATION: a missing reviewer job refuses instead of guessing (223.896417ms)
  Error: Toolkit integrity file changed after verification: src/commands.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async stableOwnerHandover (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1230:3)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1322:17)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:1329:1
✖ GUIDE GHOSTTY STABLE-HANDOVER RETRY: a Reviewer startup miss stays safely recoverable (209.770625ms)
  Error: Toolkit integrity file changed after verification: src/commands.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async stableOwnerHandover (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1230:3)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1330:27)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:1370:1
✖ GUIDE GHOSTTY STABLE-HANDOVER BINDING MUTATION: a changed Reviewer job refuses recovery (162.817084ms)
  Error: Toolkit integrity file changed after verification: src/commands.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async stableOwnerHandover (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1230:3)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1371:27)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:1389:1
✖ GUIDE GHOSTTY PARTIAL RECOVERY: an existing Reviewer permits exactly one missing Producer retry (169.644917ms)
  Error: Toolkit integrity file changed after verification: src/commands.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1391:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:1546:1
✖ GUIDE GHOSTTY BOTH-WINDOW RECOVERY: a saved owner decision restores Reviewer before Producer when both disappeared (151.65025ms)
  Error: Toolkit integrity file changed after verification: src/commands.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async bothWindowsMissingAfterPartialRecovery (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1494:3)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1547:27)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:1630:1
✖ GUIDE CONSOLE RECOVERY: displayed choices are handled outside the model without weakening the gate (151.646459ms)
  Error: Toolkit integrity file changed after verification: src/commands.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async bothWindowsMissingAfterPartialRecovery (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1494:3)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1631:17)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:1675:1
✖ GUIDE MANUAL RECOVERY: the existing run routes only missing roles to terminal instructions (131.070834ms)
  Error: Toolkit integrity file changed after verification: src/commands.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async bothWindowsMissingAfterPartialRecovery (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1494:3)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1676:27)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:1700:1
✖ GUIDE MANUAL RECOVERY COMMANDS: default recovery reprints only existing run-bound launchers (283.453958ms)
  Error: Toolkit integrity file changed after verification: src/commands.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async bothWindowsMissingAfterPartialRecovery (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1494:3)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1707:27)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:1722:1
✖ GUIDE CONSOLE RECOVERY MUTATION: a bare number never guesses between two recoverable sessions (259.272625ms)
  Error: Toolkit integrity file changed after verification: src/commands.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async bothWindowsMissingAfterPartialRecovery (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1494:3)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1723:27)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:1747:1
✖ GUIDE GHOSTTY BOTH-WINDOW RECOVERY MUTATION: Producer stays closed when restored Reviewer is not ready (151.982ms)
  Error: Toolkit integrity file changed after verification: src/commands.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async bothWindowsMissingAfterPartialRecovery (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1494:3)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1748:27)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/interruption.test.ts:94:1
✖ INTERRUPTION RECOVERY: Ctrl-C kills Producer, distrusts partial artifact, and resumes the same context (8687.108167ms)
  Error: Timed out waiting for the Producer model turn.
      at waitFor (file:///Users/freeborn/Dev/koda-codex/tests/interruption.test.ts:72:9)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/interruption.test.ts:142:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/interruption.test.ts:186:1
✖ INTERRUPTION RECOVERY: Ctrl-C returns a formal Reviewer job to PENDING and resumes the same context (8328.116125ms)
  Error: Timed out waiting for the Reviewer model turn.
      at waitFor (file:///Users/freeborn/Dev/koda-codex/tests/interruption.test.ts:72:9)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/interruption.test.ts:265:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/interruption.test.ts:303:1
✖ INTERRUPTION RECOVERY: an interrupted owner conversation resumes without losing its disk-bound direction (8323.148708ms)
  Error: Timed out waiting for the owner conversation turn.
      at waitFor (file:///Users/freeborn/Dev/koda-codex/tests/interruption.test.ts:72:9)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/interruption.test.ts:346:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/interruption.test.ts:376:1
✖ INTERRUPTION MUTATION: missing first-turn context ID refuses automatic worker replacement (8365.494ms)
  Error: Timed out waiting for the context-free model turn.
      at waitFor (file:///Users/freeborn/Dev/koda-codex/tests/interruption.test.ts:72:9)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/interruption.test.ts:406:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/plural-runtime-integration.test.ts:49:1
✖ PLURAL LIVE RUNTIME: two independent Producer/Reviewer pairs complete without crossed sessions (426.284625ms)
  Error: Toolkit integrity file changed after verification: src/commands.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/plural-runtime-integration.test.ts:87:19)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async startSubtestAfterBootstrap (node:internal/test_runner/harness:385:3)

test at tests/quickstart.test.ts:13:1
✖ FULL-SESSION QUICK START: one command creates a pushed project and numbered Guide launch (258.272292ms)
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


  ERROR: Toolkit integrity file changed after verification: src/commands.ts.


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

test at tests/relay-window.test.ts:322:1
✖ REVIEWER OPEN CONVERSATION: an idle owner question resumes the Reviewer but changes no project file (805.488833ms)
  AssertionError [ERR_ASSERTION]:
  ────────────────────────────────────────────────────────
  REVIEWER PAUSED SAFELY
  ────────────────────────────────────────────────────────
  Toolkit integrity file changed after verification: src/commands.ts.

  Resume with: npm run relay:reviewer
  ────────────────────────────────────────────────────────


  1 !== 0

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/relay-window.test.ts:325:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: false,
    code: 'ERR_ASSERTION',
    actual: 1,
    expected: 0,
    operator: 'strictEqual',
    diff: 'simple'
  }

test at tests/relay-window.test.ts:337:1
✖ REVIEWER OPEN CONVERSATION MUTATION: an empty final answer refuses instead of pretending conversation completed (752.397416ms)
  AssertionError [ERR_ASSERTION]: The input did not match the regular expression /REVIEWER PAUSED SAFELY[\s\S]*emitted no final answer/. Input:

  '\n' +
    '────────────────────────────────────────────────────────\n' +
    'REVIEWER PAUSED SAFELY\n' +
    '────────────────────────────────────────────────────────\n' +
    'Toolkit integrity file changed after verification: src/commands.ts.\n' +
    '\n' +
    'Resume with: npm run relay:reviewer\n' +
    '────────────────────────────────────────────────────────\n'

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/relay-window.test.ts:341:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: true,
    code: 'ERR_ASSERTION',
    actual: '\n────────────────────────────────────────────────────────\nREVIEWER PAUSED SAFELY\n────────────────────────────────────────────────────────\nToolkit integrity file changed after verification: src/commands.ts.\n\nResume with: npm run relay:reviewer\n────────────────────────────────────────────────────────\n',
    expected: /REVIEWER PAUSED SAFELY[\s\S]*emitted no final answer/,
    operator: 'match',
    diff: 'simple'
  }

test at tests/relay-window.test.ts:347:1
✖ REVIEWER OPEN CONVERSATION SCOPE: project-level thought returns to Guide without mutation (822.723458ms)
  AssertionError [ERR_ASSERTION]:
  ────────────────────────────────────────────────────────
  REVIEWER PAUSED SAFELY
  ────────────────────────────────────────────────────────
  Toolkit integrity file changed after verification: src/commands.ts.

  Resume with: npm run relay:reviewer
  ────────────────────────────────────────────────────────


  1 !== 0

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/relay-window.test.ts:350:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: false,
    code: 'ERR_ASSERTION',
    actual: 1,
    expected: 0,
    operator: 'strictEqual',
    diff: 'simple'
  }

test at tests/relay-window.test.ts:357:1
✖ REVIEWER OPEN CONVERSATION WAIT: active direction is recorded but cannot become a current-phase handback (777.23975ms)
  AssertionError [ERR_ASSERTION]:
  ────────────────────────────────────────────────────────
  REVIEWER PAUSED SAFELY
  ────────────────────────────────────────────────────────
  Toolkit integrity file changed after verification: src/commands.ts.

  Resume with: npm run relay:reviewer
  ────────────────────────────────────────────────────────


  1 !== 0

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/relay-window.test.ts:363:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: false,
    code: 'ERR_ASSERTION',
    actual: 1,
    expected: 0,
    operator: 'strictEqual',
    diff: 'simple'
  }

test at tests/relay-window.test.ts:404:1
✖ REVIEWER OPEN CONVERSATION HALT MARKER: an explicit model boundary opens the same confirmed ceremony (516.270292ms)
  AssertionError [ERR_ASSERTION]:
  ────────────────────────────────────────────────────────
  REVIEWER PAUSED SAFELY
  ────────────────────────────────────────────────────────
  Toolkit integrity file changed after verification: src/commands.ts.

  Resume with: npm run relay:reviewer
  ────────────────────────────────────────────────────────


  1 !== 0

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/relay-window.test.ts:411:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: false,
    code: 'ERR_ASSERTION',
    actual: 1,
    expected: 0,
    operator: 'strictEqual',
    diff: 'simple'
  }

test at tests/relay-window.test.ts:419:1
✖ REVIEWER OPEN CONVERSATION TTY: a real terminal line reaches the idle Reviewer prompt (535.764458ms)
  AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:

  1 !== 0

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/relay-window.test.ts:424:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: true,
    code: 'ERR_ASSERTION',
    actual: 1,
    expected: 0,
    operator: 'strictEqual',
    diff: 'simple'
  }

test at tests/relay-window.test.ts:432:1
✖ REVIEWER STARTUP RACE: input typed before session binding waits and is answered after the same session binds (1416.167458ms)
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
    'Toolkit integrity file changed after verification: src/commands.ts.\r\n' +
    '\r\n' +
    'Resume with: npm run relay:reviewer\r\n' +
    '────────────────────────────────────────────────────────\r\n' +
    '\n' +
    'expect: spawn id exp5 not open\n' +
    '    while executing\n' +
    '"expect "early question survived startup""\r\n'

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/relay-window.test.ts:529:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: true,
    code: 'ERR_ASSERTION',
    actual: `spawn /opt/homebrew/Cellar/node/26.0.0/bin/node /Users/freeborn/Dev/koda-codex/scripts/run-relay-reviewer-window.ts\r\n\r\n────────────────────────────────────────────────────────\r\nKODA-C REVIEWER — STARTING SESSION\r\n────────────────────────────────────────────────────────\r\nReviewer: gpt-5.6-terra / medium\r\nRelay: 2026-07-21-software-clean-sol-medium-terra-medium-01\r\n\r\nOwner input: NOT OPEN YET\r\nProducer is creating and binding the session identity.\r\nAny line typed early is held safely until that binding exists.\r\nNO ACTION NEEDED — this window will announce when conversation is ready.\r\n────────────────────────────────────────────────────────\r\nWhat's happening now?\r\r\n\r\n────────────────────────────────────────────────────────\r\nKODA-C REVIEWER — SESSION READY\r\n────────────────────────────────────────────────────────\r\nSession: 2026-07-21-01\r\nOwner input: OPEN — active-session conversation belongs here.\r\nThis context remains the Reviewer for the complete session. Leave it open.\r\n\r\nYou may type while Producer works. New direction is recorded now and waits for the next gate.\r\nType /halt to request a permanent end to this session attempt.\r\n────────────────────────────────────────────────────────\r\nreviewer> \r\n────────────────────────────────────────────────────────\r\nREVIEWER PAUSED SAFELY\r\n────────────────────────────────────────────────────────\r\nToolkit integrity file changed after verification: src/commands.ts.\r\n\r\nResume with: npm run relay:reviewer\r\n────────────────────────────────────────────────────────\r\n\nexpect: spawn id exp5 not open\n    while executing\n"expect "early question survived startup""\r\n`,
    expected: /REVIEWER PAUSED SAFELY|has not bound a session ID/,
    operator: 'doesNotMatch',
    diff: 'simple'
  }

test at tests/relay-window.test.ts:604:1
✖ WAIT AT FORMAL REVIEW: new direction is recorded immediately but does not revise the reviewed artifact (460.007625ms)
  AssertionError [ERR_ASSERTION]:
  ────────────────────────────────────────────────────────
  REVIEWER PAUSED SAFELY
  ────────────────────────────────────────────────────────
  Toolkit integrity file changed after verification: src/commands.ts.
  Evidence remains in /private/var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-reviewer-window-MRoJ1C/2026-07-21-software-clean-sol-medium-terra-medium-01/REVIEWER-JOB.json
  Nothing was acknowledged or advanced.
  ────────────────────────────────────────────────────────


  1 !== 0

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/relay-window.test.ts:609:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: false,
    code: 'ERR_ASSERTION',
    actual: 1,
    expected: 0,
    operator: 'strictEqual',
    diff: 'simple'
  }

test at tests/relay-window.test.ts:624:1
✖ WAIT RECEIPT BINDING: a recorded direction survives a wrong receipt but nothing advances (388.875584ms)
  AssertionError [ERR_ASSERTION]:
  ────────────────────────────────────────────────────────
  REVIEWER PAUSED SAFELY
  ────────────────────────────────────────────────────────
  Toolkit integrity file changed after verification: src/commands.ts.
  Evidence remains in /private/var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-reviewer-window-ffgMsc/2026-07-21-software-clean-sol-medium-terra-medium-01/REVIEWER-JOB.json
  Nothing was acknowledged or advanced.
  ────────────────────────────────────────────────────────


  1 !== 2

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/relay-window.test.ts:629:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: false,
    code: 'ERR_ASSERTION',
    actual: 1,
    expected: 2,
    operator: 'strictEqual',
    diff: 'simple'
  }

test at tests/relay-window.test.ts:992:1
✖ WAIT CONTRACT MIGRATION: the superseded same-phase handback marker refuses by name (374.282709ms)
  AssertionError [ERR_ASSERTION]: The input did not match the regular expression /superseded DISK HANDOFF REQUIRED marker/. Input:

  '\n' +
    '────────────────────────────────────────────────────────\n' +
    'REVIEWER PAUSED SAFELY\n' +
    '────────────────────────────────────────────────────────\n' +
    'Toolkit integrity file changed after verification: src/commands.ts.\n' +
    'Evidence remains in /private/var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-reviewer-window-zhPFPI/2026-07-21-software-clean-sol-medium-terra-medium-01/REVIEWER-JOB.json\n' +
    'Nothing was acknowledged or advanced.\n' +
    '────────────────────────────────────────────────────────\n'

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/relay-window.test.ts:998:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: true,
    code: 'ERR_ASSERTION',
    actual: '\n────────────────────────────────────────────────────────\nREVIEWER PAUSED SAFELY\n────────────────────────────────────────────────────────\nToolkit integrity file changed after verification: src/commands.ts.\nEvidence remains in /private/var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-reviewer-window-zhPFPI/2026-07-21-software-clean-sol-medium-terra-medium-01/REVIEWER-JOB.json\nNothing was acknowledged or advanced.\n────────────────────────────────────────────────────────\n',
    expected: /superseded DISK HANDOFF REQUIRED marker/,
    operator: 'match',
    diff: 'simple'
  }

test at tests/relay-window.test.ts:1054:1
✖ TWO-WINDOW RELAY: a pending formal-review job wakes one persistent reviewer and returns acknowledged disk evidence (387.79225ms)
  AssertionError [ERR_ASSERTION]:
  ────────────────────────────────────────────────────────
  REVIEWER PAUSED SAFELY
  ────────────────────────────────────────────────────────
  Toolkit integrity file changed after verification: src/commands.ts.
  Evidence remains in /private/var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-reviewer-wake-N7Vfi5/2026-07-21-software-clean-sol-medium-terra-medium-01/REVIEWER-JOB.json
  Nothing was acknowledged or advanced.
  ────────────────────────────────────────────────────────


  1 !== 0

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/relay-window.test.ts:1128:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: false,
    code: 'ERR_ASSERTION',
    actual: 1,
    expected: 0,
    operator: 'strictEqual',
    diff: 'simple'
  }

test at tests/relay-window.test.ts:1141:1
✖ TWO-WINDOW SESSION: separate producer and reviewer processes rendezvous through pushed close (507.262792ms)
  AssertionError [ERR_ASSERTION]:
  ────────────────────────────────────────────────────────
  RELAY PAUSED SAFELY
  ────────────────────────────────────────────────────────
  Toolkit integrity file changed after verification: src/commands.ts.

  Resume with: npm run relay:producer -- ../../../../private/var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-two-window-session-fbHODi/2026-07-21-software-clean-sol-medium-terra-medium-01
  ────────────────────────────────────────────────────────

  no producer stderr file

  1 !== 0

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/relay-window.test.ts:1250:10)
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
✖ PROJECT SANDBOX SUITE: Guide permission table stays bounded without granting the toolkit project (16.380917ms)
  Error: Toolkit integrity file changed after verification: src/commands.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async verifiedToolkitReadPathsAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:171:3)
      at async verifiedToolkitPermissionReadPathsAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:193:17)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/security.test.ts:58:27)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/security.test.ts:75:1
✖ PROJECT SANDBOX SUITE: every verified session role carries the toolkit proof automatically (12.614541ms)
  Error: Toolkit integrity file changed after verification: src/commands.ts.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async verifiedToolkitReadPathsAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:171:3)
      at async verifiedToolkitPermissionReadPathsAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:193:17)
      at async verifiedCodexRolePermissionArgs (file:///Users/freeborn/Dev/koda-codex/src/codex-role-permissions.ts:142:5)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/security.test.ts:77:16)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)
```
