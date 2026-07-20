# Per-test result — 2026-07-20-integrated-role-preflight-local-03

- Result: **FAIL**
- Recorded at: 2026-07-20T21:15:00.359Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `c6187e1`
- Command: `/opt/homebrew/Cellar/node/26.0.0/bin/node --test --test-reporter=spec tests/concurrent-sessions.test.ts tests/config.test.ts tests/direction.test.ts tests/dogfood.test.ts tests/full-lifecycle.test.ts tests/gate.test.ts tests/guide-console.test.ts tests/guide-runtime-integration.test.ts tests/guide.test.ts tests/halt.test.ts tests/hints.test.ts tests/history.test.ts tests/interruption.test.ts tests/license.test.ts tests/package.test.ts tests/plural-runtime-integration.test.ts tests/quickstart.test.ts tests/receipt-adversarial.test.ts tests/relay-runner.test.ts tests/relay-status.test.ts tests/relay-window.test.ts tests/review-binding.test.ts tests/review.test.ts tests/reviewer-fixtures.test.ts tests/security.test.ts tests/session.test.ts tests/skill.test.ts tests/stale-review.test.ts tests/status-truth.test.ts tests/submission.test.ts tests/toolkit-integrity.test.ts tests/workset.test.ts`

Every discovered test and subtest is named below. No result is aggregated away.

```text
✔ CONCURRENT SESSION ALLOCATION: simultaneous starts receive distinct disk identities (63.298458ms)
✔ CONCURRENT SESSION MUTATION: independence is explicit and ambiguous mutation refuses (1071.677333ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-dependency-16E70H/remote.git
 * [new branch]      main -> main
✔ DEPENDENCY MUTATION: an active predecessor refuses and pushed terminal evidence is hash-bound (1969.538375ms)
✔ the default phase chain is configurable data in the required order (1.428959ms)
✔ config validation rejects unsafe session paths and drifting phase names (0.689042ms)
✔ config validation refuses a sessions directory that resolves outside the project (21.676833ms)
✔ WAIT DIRECTION: record now, keep current contract frozen, and release only through advance (275.668375ms)
✔ WAIT DIRECTION MUTATION: citing a queued direction before its gate refuses split provenance (19.708083ms)
✔ WAIT DIRECTION CARRY: final-boundary direction becomes a hashed next-session Brief input (36.684416ms)
✔ WAIT DIRECTION MUTATION: changed prose and symbolic-link evidence refuse by name (38.176084ms)
✔ WAIT DIRECTION ATOMIC READ: Koda retries its transient file but persistent or unknown entries still refuse (325.216958ms)
✔ WAIT DIRECTION CONTAINMENT: a linked direction directory cannot redirect writes (6.033834ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-direction-boundary-sdt368/remote.git
 * [new branch]      main -> main
✔ WAIT FINAL BOUNDARY: a new session prompt must cite direction released by the final gate (1408.2645ms)
✔ the committed dogfood snapshot contains the full native chain and an internally bound close (39.399125ms)
✔ FULL LIFECYCLE SCENARIO: clean approvals traverse all six phases and pushed close (864.4225ms)
✔ FULL LIFECYCLE SCENARIO: a REVISE loop recovers in plan before completing and closing (775.579167ms)
✔ FULL LIFECYCLE SCENARIO: DISCUSS records an owner ruling and requires a fresh live review (740.345ms)
✔ a complete artifact, review, allowed verdict, unique receipt, and ledger proof open the gate (113.628667ms)
▶ GATE MUTATION SUITE: each core condition refuses and names itself
  ✔ artifact exists (18.916666ms)
  ✔ artifact is non-empty (10.069708ms)
  ✔ artifact is a regular file (11.388084ms)
  ✔ review exists (12.160042ms)
  ✔ review is a regular file (14.232959ms)
  ✔ approval ledger is a regular file (15.435542ms)
  ✔ verdict REVISE is blocking (21.847459ms)
  ✔ verdict REJECT is blocking (10.306584ms)
  ✔ verdict DISCUSS is blocking (39.300083ms)
  ✔ current receipt is quoted verbatim in the ledger (16.702667ms)
✔ GATE MUTATION SUITE: each core condition refuses and names itself (172.555125ms)
✔ outer receipt whitespace is ignored but inner bytes remain literal (33.514875ms)
▶ every gate condition fails closed when deliberately broken
  ✔ artifact missing (10.701292ms)
  ✔ artifact empty (17.619625ms)
  ✔ review missing (12.386208ms)
  ✔ verdict line missing (25.5675ms)
  ✔ verdict unknown (42.092625ms)
  ✔ receipt missing from last line (12.987709ms)
  ✔ generated review metadata missing (11.391166ms)
  ✔ duplicate generated review metadata is ambiguous (10.169084ms)
  ✔ review metadata names a different phase (9.312625ms)
  ✔ artifact changed after review (11.79775ms)
  ✔ final receipt differs from generated receipt (11.61125ms)
  ✔ receipt reused by another review (15.148458ms)
  ✔ approval ledger missing (19.484917ms)
  ✔ exact receipt absent from ledger (22.420625ms)
  ✔ approver missing (30.573291ms)
  ✔ APPROVE WITH COMMENTS has no ledger comments (9.932ms)
  ✔ REVISE blocks even with receipt proof (10.367459ms)
  ✔ REJECT blocks even with receipt proof (8.343334ms)
  ✔ DISCUSS blocks without an owner ruling (16.880083ms)
  ✔ DISCUSS still blocks after the ruling until a fresh review (8.478625ms)
✔ every gate condition fails closed when deliberately broken (319.846375ms)
✔ GUIDE CONSOLE SECURITY: every turn ignores ambient config and rules under the project profile (2.53925ms)
✔ GUIDE CONSOLE SECURITY: the Guide profile retains only named read-only runtime capabilities (0.376084ms)
✔ GUIDE CONSOLE STATE: invalid or ambiguous persistent identity refuses (1.220125ms)
✔ GUIDE CONSOLE TERMINAL SAFETY: model output cannot inject terminal or bidi controls (0.242667ms)
✔ GUIDE CONSOLE VISIBILITY: low-level inspection commands stay in evidence instead of flooding the screen (0.196ms)
✔ GUIDE CONSOLE STARTUP: reconstruction is explicitly bounded to compact continuity evidence (0.219416ms)
✔ GUIDE CONSOLE LOCK: a live duplicate refuses and a released console can reopen (19.48675ms)
✔ GUIDE CONSOLE CONTAINMENT: a linked runtime parent refuses before lock creation (3.174333ms)
✔ GUIDE CONSOLE CONTAINMENT: Guide continuity cannot grant writes inside session evidence (5.360958ms)
✔ GUIDE OPEN UX: one command enters the persistent console without opening session roles (4.041916ms)
✔ GUIDE OPEN UX: partial launch staffing refuses before the Guide opens (4.5235ms)
✔ GUIDE NUMBERED LAUNCH: 2 preserves a pushed launch and 1 opens the two staffed roles (8.0005ms)
✖ GUIDE CONSOLE PERSISTENCE: a closed console resumes the same independent Guide context (102.883417ms)
✖ GUIDE CONSOLE STARTUP REFUSAL: the primary Codex error is shown before a missing context symptom (109.9745ms)
✖ GUIDE CONSOLE INPUT RECOVERY: input closing during a long startup exits cleanly after preserving the turn (114.520541ms)
✖ GUIDE CONSOLE CRASH EVIDENCE: raw events are durable while a model turn is still running (793.479459ms)
✖ GUIDE CONSOLE CRASH EVIDENCE MUTATION: existing or linked evidence refuses before the model runs (155.190334ms)
✖ GUIDE REAL-PROJECT RELAY: an independent sibling uses two bound contexts and returns pushed close (533.970667ms)
✔ GUIDE ENTRY: an active prior session refuses a new launch request and names it (26.637917ms)
✖ GUIDE PREFLIGHT: active work distinguishes blocked successors from explicit independent siblings (31.234083ms)
✖ GUIDE TOOLKIT BINDING: confirmation carries machine-discovered launch integrity (22.590292ms)
✖ GUIDE TOOLKIT MUTATION: changed bound toolkit proof makes the launch stale (109.914416ms)
✖ GUIDE INDEPENDENT CONTROL: an active Produce session permits an owner-classified Explore sibling (32.951083ms)
✖ GUIDE INDEPENDENT BINDING: confirmed kind and independence open exactly one matching sibling (311.647209ms)
✖ GUIDE PREFLIGHT CONTROL: a project with no active session permits exactly one draft (14.7695ms)
✖ GUIDE HALT RETURN: a pushed halt and every waiting direction must enter a fresh confirmed Brief (396.156625ms)
✖ GUIDE CONFIRMATION: one request binds prompt, manifest, continuity, and owner (22.764292ms)
✔ GUIDE PROMPT CONTRACT MUTATION: an explicit relationship mismatch refuses before confirmation (6.9ms)
✔ GUIDE OWNER IDENTITY MUTATION: terminal control characters refuse before confirmation (7.442709ms)
✖ GUIDE VERIFIED HANDOVER: the owner receives a complete numbered launch choice (301.245875ms)
✖ GUIDE MUTATION: changing only a continuity file makes confirmation stale (25.766458ms)
✖ GUIDE MUTATION: changing only the prompt makes confirmation stale (24.131916ms)
✖ GUIDE MUTATION: changing only the project manifest makes confirmation stale (15.819208ms)
✖ GUIDE GIT HANDOVER: a confirmed but uncommitted request refuses launch (305.370125ms)
✖ GUIDE RECOVERY: stale confirmation requires a pushed cancellation before reconfirming (269.313834ms)
✔ GUIDE GATE: a project with a Guide manifest refuses an unconfirmed session prompt (11.048ms)
✖ GUIDE RELAY: pushed confirmation opens the exact session and records its binding (265.07975ms)
✖ GUIDE BINDING STATUS: the session-local binding is close-bound and corruption refuses (278.599666ms)
✖ GUIDE BINDING RECOVERY: an interrupted open can bind only the matching latest session (279.206708ms)
✖ GUIDE STATUS TRUTH: corrupt launch evidence refuses instead of guessing (22.962542ms)
✖ GUIDE RUNTIME: one command binds a pushed launch and prints executable session-context commands (294.4045ms)
✖ GUIDE RUNTIME OWNER MUTATION: removing the bound owner refuses by name (269.181ms)
✖ GUIDE RUNTIME LEGACY: a version-1 Kristian runtime remains readable (273.696917ms)
✖ GUIDE RUNTIME MUTATION: an unignored runtime refuses by name (252.320833ms)
✖ GUIDE RUNTIME PLURALITY: unfinished runtimes coexist and status names each one (299.189875ms)
✖ GUIDE RUNTIME MUTATION: a linked RUN.json refuses as unsafe state (273.226959ms)
✖ GUIDE RUNTIME STATUS TRUTH: corrupt live state refuses instead of hiding behind launch state (269.019083ms)
✖ GUIDE RUNTIME STATUS TRUTH: a forged HALTED label refuses without pushed halt evidence (279.666166ms)
✖ GUIDE GHOSTTY START: one explicit action requests exactly one clean Reviewer and Producer launcher (257.416292ms)
✖ GUIDE GHOSTTY MUTATION: a failed Producer request refuses duplicate automatic recovery (218.8195ms)
✖ GUIDE GHOSTTY REVIEWER READINESS MUTATION: a window request without a live Reviewer never opens Producer (216.589917ms)
✖ GUIDE GHOSTTY PRODUCER READINESS MUTATION: a window request without a live Producer refuses success (421.922166ms)
✖ GUIDE VISIBLE ROLE STATUS: disk liveness reports a missing Producer instead of pretending the session is active (218.520542ms)
✖ GUIDE GHOSTTY OWNER-ERROR RECOVERY: one action reopens Reviewer first and Producer only after it is ready (228.141042ms)
✖ GUIDE GHOSTTY STABLE-HANDOVER RECOVERY: any formal owner decision can restore both missing roles (290.151042ms)
✖ GUIDE GHOSTTY STABLE-HANDOVER MUTATION: a missing reviewer job refuses instead of guessing (237.549166ms)
✖ GUIDE GHOSTTY STABLE-HANDOVER RETRY: a Reviewer startup miss stays safely recoverable (220.509333ms)
✖ GUIDE GHOSTTY STABLE-HANDOVER BINDING MUTATION: a changed Reviewer job refuses recovery (232.009334ms)
✖ GUIDE GHOSTTY PARTIAL RECOVERY: an existing Reviewer permits exactly one missing Producer retry (200.30825ms)
✖ GUIDE GHOSTTY BOTH-WINDOW RECOVERY: a saved owner decision restores Reviewer before Producer when both disappeared (177.600416ms)
✖ GUIDE CONSOLE RECOVERY: displayed choices are handled outside the model without weakening the gate (155.338917ms)
✖ GUIDE CONSOLE RECOVERY MUTATION: a bare number never guesses between two recoverable sessions (165.445166ms)
✖ GUIDE GHOSTTY BOTH-WINDOW RECOVERY MUTATION: Producer stays closed when restored Reviewer is not ready (166.947834ms)
✔ HALT CEREMONY: void the in-flight phase, require pushed evidence, then return through a fresh Brief (4720.361333ms)
✔ HALT STATUS TRUTH: corrupt halt evidence is named and never treated as terminal (363.002ms)
✔ HALT TERMINAL MUTATION: halt and close evidence can never coexist (30.579542ms)
✔ the approval and advancement recovery commands run exactly as printed (752.188667ms)
✔ the missing-review recovery command runs exactly as printed (801.12ms)
✔ a phase entry remains valid only while every prior gate proof still exists on disk (28.432167ms)
✔ INTERRUPTION SCHEMA: role, purpose, time, and evidence filenames remain one shared fail-closed contract (3.895584ms)
✖ INTERRUPTION RECOVERY: Ctrl-C kills Producer, distrusts partial artifact, and resumes the same context (8598.0365ms)
✖ INTERRUPTION RECOVERY: Ctrl-C returns a formal Reviewer job to PENDING and resumes the same context (8406.591167ms)
✖ INTERRUPTION RECOVERY: an interrupted owner conversation resumes without losing its disk-bound direction (8336.092834ms)
✖ INTERRUPTION MUTATION: missing first-turn context ID refuses automatic worker replacement (8316.637375ms)
✔ the repository carries the complete GPLv3-only license and Kristian's sole copyright (5.971667ms)
✔ PACKAGED NPX SUITE: the source-controlled binary is executable before npm touches it (2.85425ms)
✔ PACKAGED NPX SUITE: the documented local npx command does not mutate its checkout (5104.604833ms)
✔ PACKAGED NPX SUITE: a real tarball installs and runs the plain-JavaScript koda binary (6949.036459ms)
✖ PLURAL LIVE RUNTIME: two independent Producer/Reviewer pairs complete without crossed sessions (419.226583ms)
✖ FULL-SESSION QUICK START: one command creates a pushed project and numbered Guide launch (166.878833ms)
✔ RECEIPT ADVERSARIAL SUITE: an earlier review's receipt cannot approve a fresh review (31.0315ms)
✔ RECEIPT ADVERSARIAL SUITE: phase N receipt cannot approve phase N+1 (11.505042ms)
✔ RECEIPT ADVERSARIAL SUITE: outer whitespace is accepted and any inner word change refuses (21.282333ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REVISE (10.542167ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REJECT (15.192ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override DISCUSS (18.304ms)
✔ FULL RELAY RUNNER: preparation creates a clean pushed project with local skills (723.464208ms)
✔ FULL RELAY RUNNER: execution preserves two contexts and binds owner acknowledgement to the full receipt (3.863542ms)
✔ GENUINE FULL RELAY EVIDENCE: six phases, revision recovery, distinct contexts, and pushed close (23.768666ms)
✔ RELAY STATUS TRUTH: a prepared run names all roles and prints only the first safe action (713.970792ms)
✔ RELAY STATUS TRUTH: after Reviewer is alive, Producer becomes the one safe next action (647.602125ms)
✔ RELAY STATUS TRUTH: a stopped reviewer process names explicit stale-lock recovery (725.222417ms)
✔ RELAY STATUS TRUTH: an active recorded producer is never duplicated by a blind hint (720.8605ms)
✔ RELAY STATUS TRUTH: corrupt or ambiguous run state refuses instead of guessing (1935.690375ms)
✔ RELAY STATUS TRUTH: a corrupt waiting direction refuses immediately by name (591.193334ms)
✔ TWO-WINDOW PROTOCOL: reviewer jobs are bounded and duplicate reviewer windows refuse (60.026125ms)
✔ TWO-WINDOW VISIBILITY: progress is readable without exposing review receipts (0.607584ms)
✖ REVIEWER OPEN CONVERSATION: an idle owner question resumes the Reviewer but changes no project file (805.197375ms)
✖ REVIEWER OPEN CONVERSATION MUTATION: an empty final answer refuses instead of pretending conversation completed (786.535625ms)
✖ REVIEWER OPEN CONVERSATION SCOPE: project-level thought returns to Guide without mutation (791.467459ms)
✖ REVIEWER OPEN CONVERSATION WAIT: active direction is recorded but cannot become a current-phase handback (753.574916ms)
✖ REVIEWER OPEN CONVERSATION TTY: a real terminal line reaches the idle Reviewer prompt (843.623125ms)
✔ TWO-WINDOW RECEIPT: short owner code maps to the exact disk receipt (824.505334ms)
✔ TWO-WINDOW TERMINAL SAFETY: inline review controls are sanitized without changing disk evidence (689.722042ms)
✔ TWO-WINDOW RECEIPT MUTATION: a wrong review code refuses, names the condition, and remains retryable (659.47425ms)
✔ TWO-WINDOW RECEIPT ADVERSARIAL: a valid code from another review refuses (409.007292ms)
✖ WAIT AT FORMAL REVIEW: new direction is recorded immediately but does not revise the reviewed artifact (454.930625ms)
✖ WAIT RECEIPT BINDING: a recorded direction survives a wrong receipt but nothing advances (504.108875ms)
✔ TWO-WINDOW RECEIPT RECOVERY: the live legacy acknowledgement failure reopens the same review and context (730.710291ms)
✔ TWO-WINDOW PRODUCER RECOVERY: an awaiting formal review is rejoined instead of replaced (947.854375ms)
✔ TWO-WINDOW OWNER CEREMONY TTY: inline review and numbered choices disclose the code step (10697.695167ms)
✔ TWO-WINDOW OWNER CEREMONY TTY: stop for now preserves an explicit resumable decision point (509.743625ms)
✔ TWO-WINDOW OWNER CEREMONY TTY: inline review does not invoke a configured pager (510.4885ms)
✔ TWO-WINDOW OWNER CEREMONY TTY: acknowledgement never invokes pbcopy (602.288209ms)
✖ WAIT CONTRACT MIGRATION: the superseded same-phase handback marker refuses by name (391.480916ms)
✔ REVIEWER HALT: the sole interrupt voids the phase and pushes immutable evidence without a receipt (858.46825ms)
✖ TWO-WINDOW RELAY: a pending formal-review job wakes one persistent reviewer and returns acknowledged disk evidence (400.626875ms)
✖ TWO-WINDOW SESSION: separate producer and reviewer processes rendezvous through pushed close (550.74075ms)
✔ REVIEW BINDING SUITE: changing review findings after owner acknowledgement refuses (33.019125ms)
✔ REVIEW BINDING SUITE: an untouched generated template cannot become an approved review (21.757208ms)
✔ a current review cannot be replaced before its receipt is recorded (17.673292ms)
✔ a revised artifact receives a fresh review, fresh receipt, and archived prior review (14.336ms)
✔ DISCUSS requires the owner's ruling before a fresh definitive review (19.887167ms)
✔ REVIEWER FIXTURES: five sealed fixtures ship as blind Koda projects (41.389709ms)
✔ REVIEWER FIXTURES: the planted hard number is unsupported and the control has no plant (2.155125ms)
✔ REVIEWER FIXTURES: inference-chain plant requires a deduction across three source files (0.728958ms)
✔ REVIEWER FIXTURES: tempting honest control is imperfect in style but its claims execute (77.871917ms)
✔ REVIEWER FIXTURES: evidence-absence trap has working code but its claimed run record is missing (96.046292ms)
✔ REVIEWER FIXTURES: new scoring contracts still match their pre-run Git seal (52.767292ms)
✔ REVIEWER FIXTURES: Ghostty runs pin model and effort and preserve ephemeral Codex events (0.846625ms)
✔ REVIEWER FIXTURES: the bounded model matrix is backed by seventeen graded run folders (27.313959ms)
✔ PROJECT SANDBOX SUITE: role turns fail closed with project-scoped read and write access (2.066709ms)
✖ PROJECT SANDBOX SUITE: Guide permission table stays bounded without granting the toolkit project (29.549834ms)
✖ PROJECT SANDBOX SUITE: every verified session role carries the toolkit proof automatically (15.425ms)
✔ PROJECT SANDBOX SUITE: the Node toolchain root is a narrow explicit read capability (1.272375ms)
✔ PROJECT SANDBOX SUITE: the resolved Git toolchain avoids the macOS xcrun cache shim (0.16375ms)
✔ PROJECT SANDBOX MUTATION: only an empty real role-config directory may be omitted from the evidence archive (4.441959ms)
✔ PROJECT SANDBOX SUITE: read-only probes cannot mutate their workspace (0.1985ms)
✔ SECURITY INTEGRITY SUITE: the install is dependency-free with no install hook (0.846209ms)
✔ SECURITY INTEGRITY SUITE: the committed repository contains no symbolic link (16.313583ms)
✔ SECURITY INTEGRITY SUITE: tracked text contains no common live credential signature (246.892875ms)
✔ SECURITY INTEGRITY SUITE: relay roles and model children never inherit ambient credentials or parent context identity (0.525416ms)
✔ SECURITY INTEGRITY SUITE: role launcher bytes ignore ambient terminal locale and color (0.541083ms)
✔ SECURITY INTEGRITY SUITE: owner receipt and ruling data never enter child-process arguments or environment (1.1295ms)
✔ SECURITY INTEGRITY SUITE: fresh-model evidence runs strip ambient credentials and parent context identity (0.690959ms)
✔ SECURITY INTEGRITY SUITE: every managed Codex exec ignores ambient command rules (1.240875ms)
✔ SECURITY INTEGRITY SUITE: both live session roles bind verified toolkit, Git, and private config capabilities (1.388458ms)
✔ SECURITY INTEGRITY SUITE: the executable Ghostty role launcher starts one child with a clean environment (304.988084ms)
✔ session creation requires a prompt and numbers dated folders (19.672ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-sOZVNM/remote.git
 * [new branch]      main -> main
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-sOZVNM/remote.git
   ef96540..806fb30  main -> main
✔ a completed session is closed only after its state is committed and pushed (4322.203834ms)
✔ immutable close refuses symbolic links inside session evidence (12.569209ms)
✔ immutable close refuses duplicate generated metadata markers (0.143166ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-ignored-remote-2rMGAI/remote.git
 * [new branch]      main -> main
✔ immutable close refuses a bound session file that Git ignored instead of pushing (303.537917ms)
✔ every Koda-C skill has valid relay sections and four-line Codex metadata (9.856916ms)
✔ skill index metadata stays concise, front-loaded, and trigger-specific (3.204125ms)
✔ producer phase skills hand only to the one shared reviewer (2.469916ms)
✔ concurrent relay skills require bound session identity instead of latest-session guessing (1.967667ms)
✔ the shared reviewer keeps all phase criteria in one place (1.78425ms)
✔ in-phase consultation is disk-backed and cannot impersonate formal review (2.945ms)
✔ session open and close remain ceremonies outside producer phase routing (2.183875ms)
✔ the session-prompt skill is the sole skill route to a future session launch (2.21775ms)
✔ the fresh Guide preflight model run is sealed, blind, ephemeral, and read-only (0.7125ms)
✔ historical fresh Codex startup discovered the original nine local skills and root guidance without reading disk (2.080458ms)
✔ fresh Codex discovers all ten current skills and the active Guide preflight refuses without mutation (1.57175ms)
✔ STALE-REVIEW BINDING: editing the artifact after review refuses with a named re-review reason (19.615708ms)
✔ STALE-REVIEW BINDING: reviewing after an edit binds the new artifact and opens (14.296167ms)
✔ STATUS TRUTH SUITE: deleting a review is reflected immediately (362.658291ms)
✔ STATUS TRUTH SUITE: blanking an artifact is reflected immediately (381.55525ms)
✔ STATUS TRUTH SUITE: corrupt ledger metadata refuses with a named corruption reason (161.813208ms)
✔ STATUS TRUTH SUITE: editing an acknowledged review is reflected immediately (168.881917ms)
✔ STATUS TRUTH SUITE: invalid state JSON refuses instead of guessing (192.912667ms)
✔ STATUS TRUTH SUITE: a path-like phase name in state refuses instead of escaping (174.921875ms)
✔ JUDGE JOURNEY SUITE: the committed binary runs without rebuilding (140.396166ms)
✔ JUDGE JOURNEY SUITE: video and submission documents preserve every live rule (3.591834ms)
✔ JUDGE JOURNEY SUITE: local links in the judge documents resolve (31.377459ms)
✔ TOOLKIT INTEGRITY: a complete manifest proves the installed launch surface (16.878292ms)
✔ TOOLKIT INTEGRITY CAPABILITY: a sandbox receives only exact verified read paths (7.299375ms)
✔ TOOLKIT INTEGRITY PERMISSIONS: public runtime code compacts without granting docs or runtime state (5.274417ms)
✔ TOOLKIT INTEGRITY MUTATION: changed launch code refuses and names the file (4.364209ms)
✔ TOOLKIT INTEGRITY MUTATION: linked evidence refuses instead of following it (6.331334ms)
✔ TOOLKIT INTEGRITY MUTATION: a manifest cannot overstate its hashed test evidence (10.085167ms)
✔ WRITE SET: claims exact clean paths and refuses Guide or sibling overlap (214.963416ms)
✔ WRITE SET CONCURRENCY: simultaneous same-path claims cannot both succeed (200.971708ms)
✔ WRITE SET CONTAINMENT: a linked parent cannot alias a claimed output path (124.797041ms)
✔ WRITE SET CLI: explicit session identity records project-relative output ownership (220.845375ms)
✔ WRITE SET STATUS TRUTH: corrupt disk evidence refuses instead of inferring state (150.980625ms)
✔ GUIDE WRITE SET: new Guide files are explicit and active-session overlap refuses (251.268084ms)
✔ WRITE SET: unrelated Guide and sibling dirt may coexist; unclaimed dirt refuses (213.636291ms)
✔ GUIDE RUNTIME OWNERSHIP: published run and return namespaces are never mistaken for sibling work (319.689625ms)
✔ WRITE SET MUTATION: rename and delete are exact owned changes, including both rename sides (427.001584ms)
✔ WRITE SET MUTATION: staged bytes must match the recorded post-work hash (287.393209ms)
✔ WRITE SET MUTATION: a claimed path changed after post-work observation refuses by name (195.340083ms)
✔ GIT LOCK: live owner refuses, stale lock recovers only with an empty index (174.920958ms)
✔ GIT LOCK SERIALIZATION: relay callers may wait for a live short ceremony (216.484208ms)
✔ GIT LOCK SERIALIZATION MUTATION: release between inspection steps retries instead of leaking ENOENT (88.636458ms)
✔ GIT LOCK RELEASE MUTATION: a new owner acquired during cleanup is never deleted by the retiring owner (128.963ms)
✔ GIT LOCK CONTAINMENT: linked .koda cannot redirect lock evidence (75.221ms)
✔ GIT LOCK CONTAINMENT MUTATION: a disk-supplied token cannot become a retired path (92.78275ms)
ℹ tests 249
ℹ suites 0
ℹ pass 184
ℹ fail 65
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 34627.375708

✖ failing tests:

test at tests/guide-console.test.ts:322:1
✖ GUIDE CONSOLE PERSISTENCE: a closed console resumes the same independent Guide context (102.883417ms)
  AssertionError [ERR_ASSERTION]: GUIDE CLOSED SAFELY — Toolkit integrity file changed after verification: docs/QUICKSTART.md.


  1 !== 0

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide-console.test.ts:345:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: false,
    code: 'ERR_ASSERTION',
    actual: 1,
    expected: 0,
    operator: 'strictEqual',
    diff: 'simple'
  }

test at tests/guide-console.test.ts:365:1
✖ GUIDE CONSOLE STARTUP REFUSAL: the primary Codex error is shown before a missing context symptom (109.9745ms)
  AssertionError [ERR_ASSERTION]: The input did not match the regular expression /Guide could not start or continue: Error loading config\.toml: invalid permission profile/. Input:

  'GUIDE CLOSED SAFELY — Toolkit integrity file changed after verification: docs/QUICKSTART.md.\n'

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide-console.test.ts:386:10)
      at process.processTicksAndRejections (node:internal/process/task_queues:104:5)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: true,
    code: 'ERR_ASSERTION',
    actual: 'GUIDE CLOSED SAFELY — Toolkit integrity file changed after verification: docs/QUICKSTART.md.\n',
    expected: /Guide could not start or continue: Error loading config\.toml: invalid permission profile/,
    operator: 'match',
    diff: 'simple'
  }

test at tests/guide-console.test.ts:392:1
✖ GUIDE CONSOLE INPUT RECOVERY: input closing during a long startup exits cleanly after preserving the turn (114.520541ms)
  AssertionError [ERR_ASSERTION]: GUIDE CLOSED SAFELY — Toolkit integrity file changed after verification: docs/QUICKSTART.md.


  1 !== 0

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide-console.test.ts:427:10)
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

test at tests/guide-console.test.ts:436:1
✖ GUIDE CONSOLE CRASH EVIDENCE: raw events are durable while a model turn is still running (793.479459ms)
  AssertionError [ERR_ASSERTION]: The input did not match the regular expression /thread\.started/. Input:

  ''

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide-console.test.ts:484:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: true,
    code: 'ERR_ASSERTION',
    actual: '',
    expected: /thread\.started/,
    operator: 'match',
    diff: 'simple'
  }

test at tests/guide-console.test.ts:496:1
✖ GUIDE CONSOLE CRASH EVIDENCE MUTATION: existing or linked evidence refuses before the model runs (155.190334ms)
  AssertionError [ERR_ASSERTION]: The input did not match the regular expression /Guide event evidence already exists/. Input:

  'GUIDE CLOSED SAFELY — Toolkit integrity file changed after verification: docs/QUICKSTART.md.\n'

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide-console.test.ts:530:10)
      at process.processTicksAndRejections (node:internal/process/task_queues:104:5)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: true,
    code: 'ERR_ASSERTION',
    actual: 'GUIDE CLOSED SAFELY — Toolkit integrity file changed after verification: docs/QUICKSTART.md.\n',
    expected: /Guide event evidence already exists/,
    operator: 'match',
    diff: 'simple'
  }

test at tests/guide-runtime-integration.test.ts:56:1
✖ GUIDE REAL-PROJECT RELAY: an independent sibling uses two bound contexts and returns pushed close (533.970667ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide-runtime-integration.test.ts:105:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async startSubtestAfterBootstrap (node:internal/test_runner/harness:385:3)

test at tests/guide.test.ts:101:1
✖ GUIDE PREFLIGHT: active work distinguishes blocked successors from explicit independent siblings (31.234083ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async runGuideCli (file:///Users/freeborn/Dev/koda-codex/src/guide-commands.ts:173:21)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:105:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:122:1
✖ GUIDE TOOLKIT BINDING: confirmation carries machine-discovered launch integrity (22.590292ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:124:19)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:135:1
✖ GUIDE TOOLKIT MUTATION: changed bound toolkit proof makes the launch stale (109.914416ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:137:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:149:1
✖ GUIDE INDEPENDENT CONTROL: an active Produce session permits an owner-classified Explore sibling (32.951083ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:152:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:162:1
✖ GUIDE INDEPENDENT BINDING: confirmed kind and independence open exactly one matching sibling (311.647209ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:165:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:196:1
✖ GUIDE PREFLIGHT CONTROL: a project with no active session permits exactly one draft (14.7695ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async runGuideCli (file:///Users/freeborn/Dev/koda-codex/src/guide-commands.ts:173:21)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:199:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:205:1
✖ GUIDE HALT RETURN: a pushed halt and every waiting direction must enter a fresh confirmed Brief (396.156625ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async runGuideCli (file:///Users/freeborn/Dev/koda-codex/src/guide-commands.ts:173:21)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:221:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:255:1
✖ GUIDE CONFIRMATION: one request binds prompt, manifest, continuity, and owner (22.764292ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:257:18)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:298:1
✖ GUIDE VERIFIED HANDOVER: the owner receives a complete numbered launch choice (301.245875ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:300:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:313:1
✖ GUIDE MUTATION: changing only a continuity file makes confirmation stale (25.766458ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:315:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:323:1
✖ GUIDE MUTATION: changing only the prompt makes confirmation stale (24.131916ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:325:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:333:1
✖ GUIDE MUTATION: changing only the project manifest makes confirmation stale (15.819208ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:335:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:347:1
✖ GUIDE GIT HANDOVER: a confirmed but uncommitted request refuses launch (305.370125ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:349:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:356:1
✖ GUIDE RECOVERY: stale confirmation requires a pushed cancellation before reconfirming (269.313834ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:358:17)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:387:1
✖ GUIDE RELAY: pushed confirmation opens the exact session and records its binding (265.07975ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:389:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:410:1
✖ GUIDE BINDING STATUS: the session-local binding is close-bound and corruption refuses (278.599666ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:412:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:425:1
✖ GUIDE BINDING RECOVERY: an interrupted open can bind only the matching latest session (279.206708ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:427:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:442:1
✖ GUIDE STATUS TRUTH: corrupt launch evidence refuses instead of guessing (22.962542ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:444:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:456:1
✖ GUIDE RUNTIME: one command binds a pushed launch and prints executable session-context commands (294.4045ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:458:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:515:1
✖ GUIDE RUNTIME OWNER MUTATION: removing the bound owner refuses by name (269.181ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:517:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:536:1
✖ GUIDE RUNTIME LEGACY: a version-1 Kristian runtime remains readable (273.696917ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:538:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:554:1
✖ GUIDE RUNTIME MUTATION: an unignored runtime refuses by name (252.320833ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:556:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:569:1
✖ GUIDE RUNTIME PLURALITY: unfinished runtimes coexist and status names each one (299.189875ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:571:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:603:1
✖ GUIDE RUNTIME MUTATION: a linked RUN.json refuses as unsafe state (273.226959ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:605:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:640:1
✖ GUIDE RUNTIME STATUS TRUTH: corrupt live state refuses instead of hiding behind launch state (269.019083ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:642:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:659:1
✖ GUIDE RUNTIME STATUS TRUTH: a forged HALTED label refuses without pushed halt evidence (279.666166ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:661:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:678:1
✖ GUIDE GHOSTTY START: one explicit action requests exactly one clean Reviewer and Producer launcher (257.416292ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:680:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:812:1
✖ GUIDE GHOSTTY MUTATION: a failed Producer request refuses duplicate automatic recovery (218.8195ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:814:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:860:1
✖ GUIDE GHOSTTY REVIEWER READINESS MUTATION: a window request without a live Reviewer never opens Producer (216.589917ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:862:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:889:1
✖ GUIDE GHOSTTY PRODUCER READINESS MUTATION: a window request without a live Producer refuses success (421.922166ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:891:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:919:1
✖ GUIDE VISIBLE ROLE STATUS: disk liveness reports a missing Producer instead of pretending the session is active (218.520542ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:921:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:961:1
✖ GUIDE GHOSTTY OWNER-ERROR RECOVERY: one action reopens Reviewer first and Producer only after it is ready (228.141042ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:963:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:1093:1
✖ GUIDE GHOSTTY STABLE-HANDOVER RECOVERY: any formal owner decision can restore both missing roles (290.151042ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async stableOwnerHandover (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1054:3)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1094:27)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:1145:1
✖ GUIDE GHOSTTY STABLE-HANDOVER MUTATION: a missing reviewer job refuses instead of guessing (237.549166ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async stableOwnerHandover (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1054:3)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1146:17)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:1153:1
✖ GUIDE GHOSTTY STABLE-HANDOVER RETRY: a Reviewer startup miss stays safely recoverable (220.509333ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async stableOwnerHandover (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1054:3)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1154:27)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:1194:1
✖ GUIDE GHOSTTY STABLE-HANDOVER BINDING MUTATION: a changed Reviewer job refuses recovery (232.009334ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async stableOwnerHandover (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1054:3)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1195:27)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:1213:1
✖ GUIDE GHOSTTY PARTIAL RECOVERY: an existing Reviewer permits exactly one missing Producer retry (200.30825ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1215:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:1370:1
✖ GUIDE GHOSTTY BOTH-WINDOW RECOVERY: a saved owner decision restores Reviewer before Producer when both disappeared (177.600416ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async bothWindowsMissingAfterPartialRecovery (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1318:3)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1371:27)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:1454:1
✖ GUIDE CONSOLE RECOVERY: displayed choices are handled outside the model without weakening the gate (155.338917ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async bothWindowsMissingAfterPartialRecovery (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1318:3)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1455:17)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:1499:1
✖ GUIDE CONSOLE RECOVERY MUTATION: a bare number never guesses between two recoverable sessions (165.445166ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async bothWindowsMissingAfterPartialRecovery (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1318:3)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1500:27)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:1524:1
✖ GUIDE GHOSTTY BOTH-WINDOW RECOVERY MUTATION: Producer stays closed when restored Reviewer is not ready (166.947834ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async bothWindowsMissingAfterPartialRecovery (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1318:3)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1525:27)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/interruption.test.ts:94:1
✖ INTERRUPTION RECOVERY: Ctrl-C kills Producer, distrusts partial artifact, and resumes the same context (8598.0365ms)
  Error: Timed out waiting for the Producer model turn.
      at waitFor (file:///Users/freeborn/Dev/koda-codex/tests/interruption.test.ts:72:9)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/interruption.test.ts:142:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/interruption.test.ts:186:1
✖ INTERRUPTION RECOVERY: Ctrl-C returns a formal Reviewer job to PENDING and resumes the same context (8406.591167ms)
  Error: Timed out waiting for the Reviewer model turn.
      at waitFor (file:///Users/freeborn/Dev/koda-codex/tests/interruption.test.ts:72:9)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/interruption.test.ts:265:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/interruption.test.ts:303:1
✖ INTERRUPTION RECOVERY: an interrupted owner conversation resumes without losing its disk-bound direction (8336.092834ms)
  Error: Timed out waiting for the owner conversation turn.
      at waitFor (file:///Users/freeborn/Dev/koda-codex/tests/interruption.test.ts:72:9)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/interruption.test.ts:346:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/interruption.test.ts:376:1
✖ INTERRUPTION MUTATION: missing first-turn context ID refuses automatic worker replacement (8316.637375ms)
  Error: Timed out waiting for the context-free model turn.
      at waitFor (file:///Users/freeborn/Dev/koda-codex/tests/interruption.test.ts:72:9)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/interruption.test.ts:406:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/plural-runtime-integration.test.ts:49:1
✖ PLURAL LIVE RUNTIME: two independent Producer/Reviewer pairs complete without crossed sessions (419.226583ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/plural-runtime-integration.test.ts:87:19)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async startSubtestAfterBootstrap (node:internal/test_runner/harness:385:3)

test at tests/quickstart.test.ts:13:1
✖ FULL-SESSION QUICK START: one command creates a pushed project and numbered Guide launch (166.878833ms)
  AssertionError [ERR_ASSERTION]: ────────────────────────────────────────────────────────
  KODA-C FULL-SESSION QUICK START

  This creates a disposable project inside the Koda-C folder.
  It uses its own local Git remote. It cannot push into Koda-C.
  ────────────────────────────────────────────────────────

  # Session prompt

  ## Owner intent

  Build and exercise the project's bounded Markdown heading reporter through one
  complete Koda Produce session. This is the first session and exists to make the
  full Guide, Producer, Reviewer, receipt-gate, and immutable-close workflow visible.

  ## In scope

  - One offline dependency-free Node.js command that accepts one Markdown path.
  - Ordered ATX heading records with level, text, and one-based line number.
  - Backtick- and tilde-fenced code exclusion.
  - Deterministic tests, raw live evidence, and a pushed immutable Koda close.

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
  - Ground prepared: AGENTS.md, docs/PROJECT.md, docs/BACKLOG.md, docs/WORKING-PLAN.md, docs/IN-PHASE-CONSULTATION.md, and the verified Koda toolkit capability
  - Open items: none

  ────────────────────────────────────────────────────────
  CHECKING THE REAL SESSION PATH

  Koda is validating Guide and opening one disposable session through
  the exact restricted Producer profile. No model or window opens here.
  NO ACTION NEEDED — Koda will show READY or a named refusal.
  ────────────────────────────────────────────────────────


  ERROR: Toolkit integrity file changed after verification: docs/QUICKSTART.md.


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

test at tests/relay-window.test.ts:313:1
✖ REVIEWER OPEN CONVERSATION: an idle owner question resumes the Reviewer but changes no project file (805.197375ms)
  AssertionError [ERR_ASSERTION]:
  ────────────────────────────────────────────────────────
  REVIEWER PAUSED SAFELY
  ────────────────────────────────────────────────────────
  Toolkit integrity file changed after verification: docs/QUICKSTART.md.

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
✖ REVIEWER OPEN CONVERSATION MUTATION: an empty final answer refuses instead of pretending conversation completed (786.535625ms)
  AssertionError [ERR_ASSERTION]: The input did not match the regular expression /REVIEWER PAUSED SAFELY[\s\S]*emitted no final answer/. Input:

  '\n' +
    '────────────────────────────────────────────────────────\n' +
    'REVIEWER PAUSED SAFELY\n' +
    '────────────────────────────────────────────────────────\n' +
    'Toolkit integrity file changed after verification: docs/QUICKSTART.md.\n' +
    '\n' +
    'Resume with: npm run relay:reviewer\n' +
    '────────────────────────────────────────────────────────\n'

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/relay-window.test.ts:332:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: true,
    code: 'ERR_ASSERTION',
    actual: '\n────────────────────────────────────────────────────────\nREVIEWER PAUSED SAFELY\n────────────────────────────────────────────────────────\nToolkit integrity file changed after verification: docs/QUICKSTART.md.\n\nResume with: npm run relay:reviewer\n────────────────────────────────────────────────────────\n',
    expected: /REVIEWER PAUSED SAFELY[\s\S]*emitted no final answer/,
    operator: 'match',
    diff: 'simple'
  }

test at tests/relay-window.test.ts:338:1
✖ REVIEWER OPEN CONVERSATION SCOPE: project-level thought returns to Guide without mutation (791.467459ms)
  AssertionError [ERR_ASSERTION]:
  ────────────────────────────────────────────────────────
  REVIEWER PAUSED SAFELY
  ────────────────────────────────────────────────────────
  Toolkit integrity file changed after verification: docs/QUICKSTART.md.

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
✖ REVIEWER OPEN CONVERSATION WAIT: active direction is recorded but cannot become a current-phase handback (753.574916ms)
  AssertionError [ERR_ASSERTION]:
  ────────────────────────────────────────────────────────
  REVIEWER PAUSED SAFELY
  ────────────────────────────────────────────────────────
  Toolkit integrity file changed after verification: docs/QUICKSTART.md.

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
✖ REVIEWER OPEN CONVERSATION TTY: a real terminal line reaches the idle Reviewer prompt (843.623125ms)
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
✖ WAIT AT FORMAL REVIEW: new direction is recorded immediately but does not revise the reviewed artifact (454.930625ms)
  AssertionError [ERR_ASSERTION]:
  ────────────────────────────────────────────────────────
  REVIEWER PAUSED SAFELY
  ────────────────────────────────────────────────────────
  Toolkit integrity file changed after verification: docs/QUICKSTART.md.
  Evidence remains in /private/var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-reviewer-window-YiFo7U/2026-07-20-software-clean-sol-medium-terra-medium-01/REVIEWER-JOB.json
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
✖ WAIT RECEIPT BINDING: a recorded direction survives a wrong receipt but nothing advances (504.108875ms)
  AssertionError [ERR_ASSERTION]:
  ────────────────────────────────────────────────────────
  REVIEWER PAUSED SAFELY
  ────────────────────────────────────────────────────────
  Toolkit integrity file changed after verification: docs/QUICKSTART.md.
  Evidence remains in /private/var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-reviewer-window-BuyQm5/2026-07-20-software-clean-sol-medium-terra-medium-01/REVIEWER-JOB.json
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
✖ WAIT CONTRACT MIGRATION: the superseded same-phase handback marker refuses by name (391.480916ms)
  AssertionError [ERR_ASSERTION]: The input did not match the regular expression /superseded DISK HANDOFF REQUIRED marker/. Input:

  '\n' +
    '────────────────────────────────────────────────────────\n' +
    'REVIEWER PAUSED SAFELY\n' +
    '────────────────────────────────────────────────────────\n' +
    'Toolkit integrity file changed after verification: docs/QUICKSTART.md.\n' +
    'Evidence remains in /private/var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-reviewer-window-L32k7i/2026-07-20-software-clean-sol-medium-terra-medium-01/REVIEWER-JOB.json\n' +
    'Nothing was acknowledged or advanced.\n' +
    '────────────────────────────────────────────────────────\n'

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/relay-window.test.ts:806:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: true,
    code: 'ERR_ASSERTION',
    actual: '\n────────────────────────────────────────────────────────\nREVIEWER PAUSED SAFELY\n────────────────────────────────────────────────────────\nToolkit integrity file changed after verification: docs/QUICKSTART.md.\nEvidence remains in /private/var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-reviewer-window-L32k7i/2026-07-20-software-clean-sol-medium-terra-medium-01/REVIEWER-JOB.json\nNothing was acknowledged or advanced.\n────────────────────────────────────────────────────────\n',
    expected: /superseded DISK HANDOFF REQUIRED marker/,
    operator: 'match',
    diff: 'simple'
  }

test at tests/relay-window.test.ts:848:1
✖ TWO-WINDOW RELAY: a pending formal-review job wakes one persistent reviewer and returns acknowledged disk evidence (400.626875ms)
  AssertionError [ERR_ASSERTION]:
  ────────────────────────────────────────────────────────
  REVIEWER PAUSED SAFELY
  ────────────────────────────────────────────────────────
  Toolkit integrity file changed after verification: docs/QUICKSTART.md.
  Evidence remains in /private/var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-reviewer-wake-vw4P9o/2026-07-20-software-clean-sol-medium-terra-medium-01/REVIEWER-JOB.json
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
✖ TWO-WINDOW SESSION: separate producer and reviewer processes rendezvous through pushed close (550.74075ms)
  AssertionError [ERR_ASSERTION]:
  ────────────────────────────────────────────────────────
  RELAY PAUSED SAFELY
  ────────────────────────────────────────────────────────
  Toolkit integrity file changed after verification: docs/QUICKSTART.md.

  Resume with: npm run relay:producer -- ../../../../private/var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-two-window-session-zYOwTg/2026-07-20-software-clean-sol-medium-terra-medium-01
  ────────────────────────────────────────────────────────

  no producer stderr file

  1 !== 0

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/relay-window.test.ts:1044:10)
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
✖ PROJECT SANDBOX SUITE: Guide permission table stays bounded without granting the toolkit project (29.549834ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async verifiedToolkitReadPathsAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:171:3)
      at async verifiedToolkitPermissionReadPathsAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:193:17)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/security.test.ts:58:27)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/security.test.ts:75:1
✖ PROJECT SANDBOX SUITE: every verified session role carries the toolkit proof automatically (15.425ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async verifiedToolkitReadPathsAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:171:3)
      at async verifiedToolkitPermissionReadPathsAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:193:17)
      at async verifiedCodexRolePermissionArgs (file:///Users/freeborn/Dev/koda-codex/src/codex-role-permissions.ts:142:5)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/security.test.ts:77:16)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)
```
