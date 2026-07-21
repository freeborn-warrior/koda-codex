# Per-test result — 2026-07-20-build-week-requirements-stale-integrity

- Result: **FAIL**
- Recorded at: 2026-07-21T03:26:56.711Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `1d95af0`
- Command: `/opt/homebrew/Cellar/node/26.0.0/bin/node --test --test-reporter=spec tests/concurrent-sessions.test.ts tests/config.test.ts tests/direction.test.ts tests/dogfood.test.ts tests/full-lifecycle.test.ts tests/gate.test.ts tests/guide-console.test.ts tests/guide-runtime-integration.test.ts tests/guide.test.ts tests/halt.test.ts tests/hints.test.ts tests/history.test.ts tests/interruption.test.ts tests/license.test.ts tests/package.test.ts tests/plural-runtime-integration.test.ts tests/quickstart.test.ts tests/receipt-adversarial.test.ts tests/relay-runner.test.ts tests/relay-status.test.ts tests/relay-window.test.ts tests/review-binding.test.ts tests/review.test.ts tests/reviewer-fixtures.test.ts tests/security.test.ts tests/session.test.ts tests/skill.test.ts tests/stale-review.test.ts tests/status-truth.test.ts tests/submission.test.ts tests/toolkit-integrity.test.ts tests/workset.test.ts`

Every discovered test and subtest is named below. No result is aggregated away.

```text
✔ CONCURRENT SESSION ALLOCATION: simultaneous starts receive distinct disk identities (51.317167ms)
✔ CONCURRENT SESSION MUTATION: independence is explicit and ambiguous mutation refuses (1230.373791ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-dependency-wxpuZ6/remote.git
 * [new branch]      main -> main
✔ DEPENDENCY MUTATION: an active predecessor refuses and pushed terminal evidence is hash-bound (2116.86475ms)
✔ the default phase chain is configurable data in the required order (2.477625ms)
✔ config validation rejects unsafe session paths and drifting phase names (0.4035ms)
✔ config validation refuses a sessions directory that resolves outside the project (31.51575ms)
✔ WAIT DIRECTION: record now, keep current contract frozen, and release only through advance (297.3405ms)
✔ WAIT DIRECTION MUTATION: citing a queued direction before its gate refuses split provenance (12.652417ms)
✔ WAIT DIRECTION CARRY: final-boundary direction becomes a hashed next-session Brief input (21.434333ms)
✔ WAIT DIRECTION MUTATION: changed prose and symbolic-link evidence refuse by name (9.921458ms)
✔ WAIT DIRECTION ATOMIC READ: Koda-C retries its transient file but persistent or unknown entries still refuse (357.715708ms)
✔ WAIT DIRECTION CONTAINMENT: a linked direction directory cannot redirect writes (22.194083ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-direction-boundary-AfJD6R/remote.git
 * [new branch]      main -> main
✔ WAIT FINAL BOUNDARY: a new session prompt must cite direction released by the final gate (1681.093875ms)
✔ the committed dogfood snapshot contains the full native chain and an internally bound close (60.585541ms)
✔ FULL LIFECYCLE SCENARIO: clean approvals traverse all six phases and pushed close (926.298708ms)
✔ FULL LIFECYCLE SCENARIO: a REVISE loop recovers in plan before completing and closing (980.854833ms)
✔ FULL LIFECYCLE SCENARIO: DISCUSS records an owner ruling and requires a fresh live review (776.756625ms)
✔ a complete artifact, review, allowed verdict, unique receipt, and ledger proof open the gate (55.52775ms)
▶ GATE MUTATION SUITE: each core condition refuses and names itself
  ✔ artifact exists (10.375ms)
  ✔ artifact is non-empty (15.973125ms)
  ✔ artifact is a regular file (11.40975ms)
  ✔ review exists (9.577541ms)
  ✔ review is a regular file (10.291125ms)
  ✔ approval ledger is a regular file (8.179292ms)
  ✔ verdict REVISE is blocking (10.222417ms)
  ✔ verdict REJECT is blocking (18.258875ms)
  ✔ verdict DISCUSS is blocking (76.558542ms)
  ✔ current receipt is quoted verbatim in the ledger (12.113542ms)
✔ GATE MUTATION SUITE: each core condition refuses and names itself (184.555917ms)
✔ outer receipt whitespace is ignored but inner bytes remain literal (30.848166ms)
▶ every gate condition fails closed when deliberately broken
  ✔ artifact missing (18.184042ms)
  ✔ artifact empty (24.22975ms)
  ✔ review missing (8.806417ms)
  ✔ verdict line missing (12.070792ms)
  ✔ verdict unknown (14.057084ms)
  ✔ receipt missing from last line (22.4765ms)
  ✔ generated review metadata missing (20.978125ms)
  ✔ duplicate generated review metadata is ambiguous (39.658833ms)
  ✔ review metadata names a different phase (13.219875ms)
  ✔ artifact changed after review (8.500625ms)
  ✔ final receipt differs from generated receipt (9.009042ms)
  ✔ receipt reused by another review (11.545375ms)
  ✔ approval ledger missing (10.069209ms)
  ✔ exact receipt absent from ledger (11.761875ms)
  ✔ approver missing (13.249583ms)
  ✔ APPROVE WITH COMMENTS has no ledger comments (11.271625ms)
  ✔ REVISE blocks even with receipt proof (21.235375ms)
  ✔ REJECT blocks even with receipt proof (23.742791ms)
  ✔ DISCUSS blocks without an owner ruling (33.996333ms)
  ✔ DISCUSS still blocks after the ruling until a fresh review (13.884917ms)
✔ every gate condition fails closed when deliberately broken (344.553167ms)
✔ GUIDE CONSOLE SECURITY: every turn ignores ambient config and rules under the project profile (15.680584ms)
✔ GUIDE CONSOLE SECURITY: the Guide profile retains only named read-only runtime capabilities (0.869042ms)
✔ GUIDE CONSOLE STATE: invalid or ambiguous persistent identity refuses (1.01775ms)
✔ GUIDE CONSOLE TERMINAL SAFETY: model output cannot inject terminal or bidi controls (0.249375ms)
✔ GUIDE CONSOLE VISIBILITY: low-level inspection commands stay in evidence instead of flooding the screen (0.302208ms)
✔ GUIDE CONSOLE STARTUP: reconstruction is explicitly bounded to compact continuity evidence (0.4285ms)
✔ GUIDE CONSOLE LOCK: a live duplicate refuses and a released console can reopen (19.274292ms)
✔ GUIDE CONSOLE CONTAINMENT: a linked runtime parent refuses before lock creation (2.371708ms)
✔ GUIDE CONSOLE CONTAINMENT: Guide continuity cannot grant writes inside session evidence (5.4745ms)
✔ GUIDE OPEN UX: one command enters the persistent console without opening session roles (3.840375ms)
✔ GUIDE OPEN UX: partial launch staffing refuses before the Guide opens (3.837375ms)
✔ GUIDE NUMBERED LAUNCH: 2 preserves a pushed launch and 1 opens the two staffed roles (6.561958ms)
✖ GUIDE CONSOLE PERSISTENCE: a closed console resumes the same independent Guide context (138.682375ms)
✖ GUIDE CONSOLE STARTUP REFUSAL: the primary Codex error is shown before a missing context symptom (190.22225ms)
✖ GUIDE CONSOLE INPUT RECOVERY: input closing during a long startup exits cleanly after preserving the turn (144.789083ms)
✖ GUIDE CONSOLE CRASH EVIDENCE: raw events are durable while a model turn is still running (164.006417ms)
✖ GUIDE CONSOLE CRASH EVIDENCE MUTATION: existing or linked evidence refuses before the model runs (163.324208ms)
✖ GUIDE REAL-PROJECT RELAY: an independent sibling uses two bound contexts and returns pushed close (641.678875ms)
✔ GUIDE ENTRY: an active prior session refuses a new launch request and names it (41.818584ms)
✖ GUIDE PREFLIGHT: active work distinguishes blocked successors from explicit independent siblings (18.614916ms)
✖ GUIDE TOOLKIT BINDING: confirmation carries machine-discovered launch integrity (34.387375ms)
✖ GUIDE TOOLKIT MUTATION: changed bound toolkit proof makes the launch stale (21.355916ms)
✖ GUIDE INDEPENDENT CONTROL: an active Produce session permits an owner-classified Explore sibling (104.501958ms)
✖ GUIDE INDEPENDENT BINDING: confirmed kind and independence open exactly one matching sibling (320.7085ms)
✖ GUIDE PREFLIGHT CONTROL: a project with no active session permits exactly one draft (57.706667ms)
✖ GUIDE HALT RETURN: a pushed halt and every waiting direction must enter a fresh confirmed Brief (572.702208ms)
✖ GUIDE CONFIRMATION: one request binds prompt, manifest, continuity, and owner (97.387459ms)
✔ GUIDE PROMPT CONTRACT MUTATION: an explicit relationship mismatch refuses before confirmation (14.840208ms)
✔ GUIDE OWNER IDENTITY MUTATION: terminal control characters refuse before confirmation (9.381667ms)
✖ GUIDE VERIFIED HANDOVER: the owner receives a complete numbered launch choice (314.928083ms)
✖ GUIDE MUTATION: changing only a continuity file makes confirmation stale (55.998042ms)
✖ GUIDE MUTATION: changing only the prompt makes confirmation stale (53.895916ms)
✖ GUIDE MUTATION: changing only the project manifest makes confirmation stale (21.609584ms)
✖ GUIDE GIT HANDOVER: a confirmed but uncommitted request refuses launch (349.471833ms)
✖ GUIDE RECOVERY: stale confirmation requires a pushed cancellation before reconfirming (247.404875ms)
✔ GUIDE GATE: a project with a Guide manifest refuses an unconfirmed session prompt (25.303416ms)
✖ GUIDE RELAY: pushed confirmation opens the exact session and records its binding (292.632959ms)
✖ GUIDE BINDING STATUS: the session-local binding is close-bound and corruption refuses (293.778708ms)
✖ GUIDE BINDING RECOVERY: an interrupted open can bind only the matching latest session (289.117958ms)
✖ GUIDE STATUS TRUTH: corrupt launch evidence refuses instead of guessing (42.9995ms)
✖ GUIDE RUNTIME: one command binds a pushed launch and prints executable session-context commands (273.175792ms)
✖ GUIDE RUNTIME OWNER MUTATION: removing the bound owner refuses by name (242.264959ms)
✖ GUIDE RUNTIME LEGACY: a version-1 Kristian runtime remains readable (244.931542ms)
✖ GUIDE RUNTIME MUTATION: an unignored runtime refuses by name (268.77375ms)
✖ GUIDE RUNTIME PLURALITY: unfinished runtimes coexist and status names each one (288.150875ms)
✖ GUIDE RUNTIME MUTATION: a linked RUN.json refuses as unsafe state (290.091541ms)
✖ GUIDE RUNTIME STATUS TRUTH: corrupt live state refuses instead of hiding behind launch state (278.967708ms)
✖ GUIDE RUNTIME STATUS TRUTH: a forged HALTED label refuses without pushed halt evidence (295.49475ms)
✖ GUIDE GHOSTTY START: one explicit action requests exactly one clean Reviewer and Producer launcher (234.902959ms)
✔ GUIDE VISIBLE STARTUP MUTATION: launch is ready only after both roles bind the same session (0.270167ms)
✖ GUIDE GHOSTTY MUTATION: a failed Producer request refuses duplicate automatic recovery (246.100958ms)
✖ GUIDE GHOSTTY REVIEWER READINESS MUTATION: a window request without a live Reviewer never opens Producer (226.350375ms)
✖ GUIDE GHOSTTY PRODUCER READINESS MUTATION: a window request without a live Producer refuses success (215.847458ms)
✖ GUIDE VISIBLE ROLE STATUS: disk liveness reports a missing Producer instead of pretending the session is active (220.44725ms)
✖ GUIDE GHOSTTY OWNER-ERROR RECOVERY: one action reopens Reviewer first and Producer only after it is ready (228.618833ms)
✖ GUIDE GHOSTTY STABLE-HANDOVER RECOVERY: any formal owner decision can restore both missing roles (249.426666ms)
✖ GUIDE GHOSTTY STABLE-HANDOVER MUTATION: a missing reviewer job refuses instead of guessing (201.620542ms)
✖ GUIDE GHOSTTY STABLE-HANDOVER RETRY: a Reviewer startup miss stays safely recoverable (175.473166ms)
✖ GUIDE GHOSTTY STABLE-HANDOVER BINDING MUTATION: a changed Reviewer job refuses recovery (176.779375ms)
✖ GUIDE GHOSTTY PARTIAL RECOVERY: an existing Reviewer permits exactly one missing Producer retry (359.935333ms)
✖ GUIDE GHOSTTY BOTH-WINDOW RECOVERY: a saved owner decision restores Reviewer before Producer when both disappeared (229.660125ms)
✖ GUIDE CONSOLE RECOVERY: displayed choices are handled outside the model without weakening the gate (161.74625ms)
✖ GUIDE CONSOLE RECOVERY MUTATION: a bare number never guesses between two recoverable sessions (167.148584ms)
✖ GUIDE GHOSTTY BOTH-WINDOW RECOVERY MUTATION: Producer stays closed when restored Reviewer is not ready (187.853833ms)
✔ HALT CEREMONY: void the in-flight phase, require pushed evidence, then return through a fresh Brief (4817.860375ms)
✔ HALT STATUS TRUTH: corrupt halt evidence is named and never treated as terminal (485.616834ms)
✔ HALT TERMINAL MUTATION: halt and close evidence can never coexist (25.02775ms)
✔ the approval and advancement recovery commands run exactly as printed (921.116042ms)
✔ the missing-review recovery command runs exactly as printed (803.666917ms)
✔ a phase entry remains valid only while every prior gate proof still exists on disk (125.276542ms)
✔ INTERRUPTION SCHEMA: role, purpose, time, and evidence filenames remain one shared fail-closed contract (2.287167ms)
✖ INTERRUPTION RECOVERY: Ctrl-C kills Producer, distrusts partial artifact, and resumes the same context (8900.004292ms)
✖ INTERRUPTION RECOVERY: Ctrl-C returns a formal Reviewer job to PENDING and resumes the same context (8348.839875ms)
✖ INTERRUPTION RECOVERY: an interrupted owner conversation resumes without losing its disk-bound direction (8328.095334ms)
✖ INTERRUPTION MUTATION: missing first-turn context ID refuses automatic worker replacement (8341.649416ms)
✔ the repository carries the complete GPLv3-only license and Kristian's sole copyright (6.518209ms)
✔ PACKAGED NPX SUITE: the source-controlled binary is executable before npm touches it (3.349709ms)
✔ PACKAGED NPX SUITE: the documented local npx command does not mutate its checkout (7014.186ms)
✔ PACKAGED NPX SUITE: a real tarball installs and runs the plain-JavaScript koda binary (6552.842875ms)
✖ PLURAL LIVE RUNTIME: two independent Producer/Reviewer pairs complete without crossed sessions (461.298291ms)
✖ FULL-SESSION QUICK START: one command creates a pushed project and numbered Guide launch (196.170916ms)
✔ RECEIPT ADVERSARIAL SUITE: an earlier review's receipt cannot approve a fresh review (34.988292ms)
✔ RECEIPT ADVERSARIAL SUITE: phase N receipt cannot approve phase N+1 (13.256333ms)
✔ RECEIPT ADVERSARIAL SUITE: outer whitespace is accepted and any inner word change refuses (20.475583ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REVISE (11.558791ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REJECT (12.2235ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override DISCUSS (11.611792ms)
✔ FULL RELAY RUNNER: preparation creates a clean pushed project with local skills (816.545042ms)
✔ FULL RELAY RUNNER: execution preserves two contexts and binds owner acknowledgement to the full receipt (3.696375ms)
✔ GENUINE FULL RELAY EVIDENCE: six phases, revision recovery, distinct contexts, and pushed close (25.559417ms)
✔ RELAY STATUS TRUTH: a prepared run names all roles and prints only the first safe action (771.516333ms)
✔ RELAY STATUS TRUTH: after Reviewer is alive, Producer becomes the one safe next action (645.725417ms)
✔ RELAY STATUS TRUTH: a stopped reviewer process names explicit stale-lock recovery (667.4055ms)
✔ RELAY STATUS TRUTH: an active recorded producer is never duplicated by a blind hint (811.759042ms)
✔ RELAY STATUS TRUTH: corrupt or ambiguous run state refuses instead of guessing (1761.765416ms)
✔ RELAY STATUS TRUTH: a corrupt waiting direction refuses immediately by name (543.778625ms)
✔ TWO-WINDOW PROTOCOL: reviewer jobs are bounded and duplicate reviewer windows refuse (50.772667ms)
✔ TWO-WINDOW VISIBILITY: progress is readable without exposing review receipts (1.316542ms)
✖ REVIEWER OPEN CONVERSATION: an idle owner question resumes the Reviewer but changes no project file (845.894ms)
✖ REVIEWER OPEN CONVERSATION MUTATION: an empty final answer refuses instead of pretending conversation completed (748.838166ms)
✖ REVIEWER OPEN CONVERSATION SCOPE: project-level thought returns to Guide without mutation (853.3775ms)
✖ REVIEWER OPEN CONVERSATION WAIT: active direction is recorded but cannot become a current-phase handback (785.436292ms)
✖ REVIEWER OPEN CONVERSATION TTY: a real terminal line reaches the idle Reviewer prompt (677.180291ms)
✖ REVIEWER STARTUP RACE: input typed before session binding waits and is answered after the same session binds (1554.833291ms)
✔ TWO-WINDOW RECEIPT: short owner code maps to the exact disk receipt (576.558083ms)
✔ TWO-WINDOW TERMINAL SAFETY: inline review controls are sanitized without changing disk evidence (526.762042ms)
✔ TWO-WINDOW RECEIPT MUTATION: a wrong review code refuses, names the condition, and remains retryable (641.315084ms)
✔ TWO-WINDOW RECEIPT ADVERSARIAL: a valid code from another review refuses (432.944459ms)
✖ WAIT AT FORMAL REVIEW: new direction is recorded immediately but does not revise the reviewed artifact (424.309125ms)
✖ WAIT RECEIPT BINDING: a recorded direction survives a wrong receipt but nothing advances (453.61825ms)
✔ TWO-WINDOW RECEIPT RECOVERY: the live legacy acknowledgement failure reopens the same review and context (788.058041ms)
✔ TWO-WINDOW PRODUCER RECOVERY: an awaiting formal review is rejoined instead of replaced (890.385708ms)
✔ TWO-WINDOW OWNER CEREMONY TTY: inline review and numbered choices disclose the code step (10695.437083ms)
✔ TWO-WINDOW OWNER CEREMONY TTY: stop for now preserves an explicit resumable decision point (565.396ms)
✔ TWO-WINDOW OWNER CEREMONY TTY: inline review does not invoke a configured pager (550.459292ms)
✔ TWO-WINDOW OWNER CEREMONY TTY: acknowledgement never invokes pbcopy (613.325084ms)
✖ WAIT CONTRACT MIGRATION: the superseded same-phase handback marker refuses by name (400.682542ms)
✔ REVIEWER HALT: the sole interrupt voids the phase and pushes immutable evidence without a receipt (868.041833ms)
✖ TWO-WINDOW RELAY: a pending formal-review job wakes one persistent reviewer and returns acknowledged disk evidence (420.158458ms)
✖ TWO-WINDOW SESSION: separate producer and reviewer processes rendezvous through pushed close (545.412334ms)
✔ REVIEW BINDING SUITE: changing review findings after owner acknowledgement refuses (26.3635ms)
✔ REVIEW BINDING SUITE: an untouched generated template cannot become an approved review (14.193625ms)
✔ a current review cannot be replaced before its receipt is recorded (32.350458ms)
✔ a revised artifact receives a fresh review, fresh receipt, and archived prior review (12.935375ms)
✔ DISCUSS requires the owner's ruling before a fresh definitive review (21.535291ms)
✔ REVIEWER FIXTURES: five sealed fixtures ship as blind Koda-C projects (61.951333ms)
✔ REVIEWER FIXTURES: the planted hard number is unsupported and the control has no plant (1.382416ms)
✔ REVIEWER FIXTURES: inference-chain plant requires a deduction across three source files (1.187417ms)
✔ REVIEWER FIXTURES: tempting honest control is imperfect in style but its claims execute (83.196417ms)
✔ REVIEWER FIXTURES: evidence-absence trap has working code but its claimed run record is missing (81.583083ms)
✔ REVIEWER FIXTURES: new scoring contracts still match their pre-run Git seal (58.839792ms)
✔ REVIEWER FIXTURES: Ghostty runs pin model and effort and preserve ephemeral Codex events (0.891792ms)
✔ REVIEWER FIXTURES: the bounded model matrix is backed by seventeen graded run folders (63.983208ms)
✔ PROJECT SANDBOX SUITE: role turns fail closed with project-scoped read and write access (1.929125ms)
✖ PROJECT SANDBOX SUITE: Guide permission table stays bounded without granting the toolkit project (37.109959ms)
✖ PROJECT SANDBOX SUITE: every verified session role carries the toolkit proof automatically (16.325709ms)
✔ PROJECT SANDBOX SUITE: the Node toolchain root is a narrow explicit read capability (0.788ms)
✔ PROJECT SANDBOX SUITE: the resolved Git toolchain avoids the macOS xcrun cache shim (0.086042ms)
✔ PROJECT SANDBOX MUTATION: only an empty real role-config directory may be omitted from the evidence archive (5.167917ms)
✔ PROJECT SANDBOX SUITE: read-only probes cannot mutate their workspace (0.38325ms)
✔ SECURITY INTEGRITY SUITE: the install is dependency-free with no install hook (1.470542ms)
✔ SECURITY INTEGRITY SUITE: the committed repository contains no symbolic link (19.891291ms)
✔ SECURITY INTEGRITY SUITE: tracked text contains no common live credential signature (413.994792ms)
✔ SECURITY INTEGRITY SUITE: relay roles and model children never inherit ambient credentials or parent context identity (0.267042ms)
✔ SECURITY INTEGRITY SUITE: role launcher bytes ignore ambient terminal locale and color (0.293167ms)
✔ SECURITY INTEGRITY SUITE: owner receipt and ruling data never enter child-process arguments or environment (0.918458ms)
✔ SECURITY INTEGRITY SUITE: fresh-model evidence runs strip ambient credentials and parent context identity (0.745084ms)
✔ SECURITY INTEGRITY SUITE: every managed Codex exec ignores ambient command rules (1.800208ms)
✔ SECURITY INTEGRITY SUITE: both live session roles bind verified toolkit, Git, and private config capabilities (0.753667ms)
✔ SECURITY INTEGRITY SUITE: the executable Ghostty role launcher starts one child with a clean environment (312.545541ms)
✔ session creation requires a prompt and numbers dated folders (21.268917ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-6mbjJr/remote.git
 * [new branch]      main -> main
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-6mbjJr/remote.git
   785b060..c64b4ab  main -> main
✔ a completed session is closed only after its state is committed and pushed (4056.073958ms)
✔ immutable close refuses symbolic links inside session evidence (6.84075ms)
✔ immutable close refuses duplicate generated metadata markers (0.168417ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-ignored-remote-gk82Qe/remote.git
 * [new branch]      main -> main
✔ immutable close refuses a bound session file that Git ignored instead of pushing (537.582375ms)
✔ every Koda-C skill has valid relay sections and four-line Codex metadata (8.094417ms)
✔ skill index metadata stays concise, front-loaded, and trigger-specific (3.114292ms)
✔ producer phase skills hand only to the one shared reviewer (1.799333ms)
✔ concurrent relay skills require bound session identity instead of latest-session guessing (11.751ms)
✔ the shared reviewer keeps all phase criteria in one place (8.527208ms)
✔ in-phase consultation is disk-backed and cannot impersonate formal review (5.100084ms)
✔ session open and close remain ceremonies outside producer phase routing (1.36075ms)
✔ the session-prompt skill is the sole skill route to a future session launch (3.909958ms)
✔ the fresh Guide preflight model run is sealed, blind, ephemeral, and read-only (0.8255ms)
✔ historical fresh Codex startup discovered the original nine local skills and root guidance without reading disk (2.150625ms)
✔ fresh Codex discovers all ten current skills and the active Guide preflight refuses without mutation (1.794667ms)
✔ STALE-REVIEW BINDING: editing the artifact after review refuses with a named re-review reason (18.4345ms)
✔ STALE-REVIEW BINDING: reviewing after an edit binds the new artifact and opens (18.711791ms)
✔ STATUS TRUTH SUITE: deleting a review is reflected immediately (405.419083ms)
✔ STATUS TRUTH SUITE: blanking an artifact is reflected immediately (371.362834ms)
✔ STATUS TRUTH SUITE: corrupt ledger metadata refuses with a named corruption reason (198.493584ms)
✔ STATUS TRUTH SUITE: editing an acknowledged review is reflected immediately (197.046375ms)
✔ STATUS TRUTH SUITE: invalid state JSON refuses instead of guessing (164.593083ms)
✔ STATUS TRUTH SUITE: a path-like phase name in state refuses instead of escaping (175.415334ms)
✔ JUDGE JOURNEY SUITE: the committed binary runs without rebuilding (84.870125ms)
✔ JUDGE JOURNEY SUITE: video and submission documents preserve every live rule (2.808916ms)
✔ PUBLIC GUIDE CONTRACT: current entry docs use the product name and describe the shipped workflow (6.909875ms)
✔ JUDGE JOURNEY SUITE: local links in the judge documents resolve (15.441125ms)
✔ TOOLKIT INTEGRITY: a complete manifest proves the installed launch surface (11.652666ms)
✔ TOOLKIT INTEGRITY CAPABILITY: a sandbox receives only exact verified read paths (15.894125ms)
✔ TOOLKIT INTEGRITY PERMISSIONS: public runtime code compacts without granting docs or runtime state (6.846458ms)
✔ TOOLKIT INTEGRITY MUTATION: changed launch code refuses and names the file (6.28825ms)
✔ TOOLKIT INTEGRITY MUTATION: linked evidence refuses instead of following it (6.14575ms)
✔ TOOLKIT INTEGRITY MUTATION: a manifest cannot overstate its hashed test evidence (6.868416ms)
✔ WRITE SET: claims exact clean paths and refuses Guide or sibling overlap (284.320083ms)
✔ WRITE SET CONCURRENCY: simultaneous same-path claims cannot both succeed (195.511875ms)
✔ WRITE SET CONTAINMENT: a linked parent cannot alias a claimed output path (117.143917ms)
✔ WRITE SET CLI: explicit session identity records project-relative output ownership (215.197ms)
✔ WRITE SET STATUS TRUTH: corrupt disk evidence refuses instead of inferring state (140.836959ms)
✔ GUIDE WRITE SET: new Guide files are explicit and active-session overlap refuses (253.472458ms)
✔ WRITE SET: unrelated Guide and sibling dirt may coexist; unclaimed dirt refuses (196.749458ms)
✔ GUIDE RUNTIME OWNERSHIP: published run and return namespaces are never mistaken for sibling work (172.84675ms)
✔ WRITE SET MUTATION: rename and delete are exact owned changes, including both rename sides (394.740917ms)
✔ WRITE SET MUTATION: staged bytes must match the recorded post-work hash (237.936958ms)
✔ WRITE SET MUTATION: a claimed path changed after post-work observation refuses by name (213.058709ms)
✔ GIT LOCK: live owner refuses, stale lock recovers only with an empty index (164.893708ms)
✔ GIT LOCK SERIALIZATION: relay callers may wait for a live short ceremony (190.078291ms)
✔ GIT LOCK SERIALIZATION MUTATION: release between inspection steps retries instead of leaking ENOENT (83.398417ms)
✔ GIT LOCK RELEASE MUTATION: a new owner acquired during cleanup is never deleted by the retiring owner (85.8915ms)
✔ GIT LOCK CONTAINMENT: linked .koda cannot redirect lock evidence (143.885709ms)
✔ GIT LOCK CONTAINMENT MUTATION: a disk-supplied token cannot become a retired path (154.881125ms)
ℹ tests 252
ℹ suites 0
ℹ pass 186
ℹ fail 66
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 34988.360833

✖ failing tests:

test at tests/guide-console.test.ts:322:1
✖ GUIDE CONSOLE PERSISTENCE: a closed console resumes the same independent Guide context (138.682375ms)
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
✖ GUIDE CONSOLE STARTUP REFUSAL: the primary Codex error is shown before a missing context symptom (190.22225ms)
  AssertionError [ERR_ASSERTION]: The input did not match the regular expression /Guide could not start or continue: Error loading config\.toml: invalid permission profile/. Input:

  'GUIDE CLOSED SAFELY — Toolkit integrity file changed after verification: docs/QUICKSTART.md.\n'

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide-console.test.ts:386:10)
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
✖ GUIDE CONSOLE INPUT RECOVERY: input closing during a long startup exits cleanly after preserving the turn (144.789083ms)
  AssertionError [ERR_ASSERTION]: GUIDE CLOSED SAFELY — Toolkit integrity file changed after verification: docs/QUICKSTART.md.


  1 !== 0

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide-console.test.ts:427:10)
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
✖ GUIDE CONSOLE CRASH EVIDENCE: raw events are durable while a model turn is still running (164.006417ms)
  AssertionError [ERR_ASSERTION]: The input did not match the regular expression /thread\.started/. Input:

  ''

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide-console.test.ts:493:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: true,
    code: 'ERR_ASSERTION',
    actual: '',
    expected: /thread\.started/,
    operator: 'match',
    diff: 'simple'
  }

test at tests/guide-console.test.ts:503:1
✖ GUIDE CONSOLE CRASH EVIDENCE MUTATION: existing or linked evidence refuses before the model runs (163.324208ms)
  AssertionError [ERR_ASSERTION]: The input did not match the regular expression /Guide event evidence already exists/. Input:

  'GUIDE CLOSED SAFELY — Toolkit integrity file changed after verification: docs/QUICKSTART.md.\n'

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide-console.test.ts:537:10)
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
✖ GUIDE REAL-PROJECT RELAY: an independent sibling uses two bound contexts and returns pushed close (641.678875ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide-runtime-integration.test.ts:105:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async startSubtestAfterBootstrap (node:internal/test_runner/harness:385:3)

test at tests/guide.test.ts:101:1
✖ GUIDE PREFLIGHT: active work distinguishes blocked successors from explicit independent siblings (18.614916ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async runGuideCli (file:///Users/freeborn/Dev/koda-codex/src/guide-commands.ts:173:21)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:105:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:122:1
✖ GUIDE TOOLKIT BINDING: confirmation carries machine-discovered launch integrity (34.387375ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:124:19)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:135:1
✖ GUIDE TOOLKIT MUTATION: changed bound toolkit proof makes the launch stale (21.355916ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:137:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:149:1
✖ GUIDE INDEPENDENT CONTROL: an active Produce session permits an owner-classified Explore sibling (104.501958ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:152:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:162:1
✖ GUIDE INDEPENDENT BINDING: confirmed kind and independence open exactly one matching sibling (320.7085ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:165:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:196:1
✖ GUIDE PREFLIGHT CONTROL: a project with no active session permits exactly one draft (57.706667ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async runGuideCli (file:///Users/freeborn/Dev/koda-codex/src/guide-commands.ts:173:21)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:199:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:205:1
✖ GUIDE HALT RETURN: a pushed halt and every waiting direction must enter a fresh confirmed Brief (572.702208ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async runGuideCli (file:///Users/freeborn/Dev/koda-codex/src/guide-commands.ts:173:21)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:221:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:255:1
✖ GUIDE CONFIRMATION: one request binds prompt, manifest, continuity, and owner (97.387459ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:257:18)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:298:1
✖ GUIDE VERIFIED HANDOVER: the owner receives a complete numbered launch choice (314.928083ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:300:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:313:1
✖ GUIDE MUTATION: changing only a continuity file makes confirmation stale (55.998042ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:315:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:323:1
✖ GUIDE MUTATION: changing only the prompt makes confirmation stale (53.895916ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:325:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:333:1
✖ GUIDE MUTATION: changing only the project manifest makes confirmation stale (21.609584ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:335:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:347:1
✖ GUIDE GIT HANDOVER: a confirmed but uncommitted request refuses launch (349.471833ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:349:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:356:1
✖ GUIDE RECOVERY: stale confirmation requires a pushed cancellation before reconfirming (247.404875ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:358:17)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:387:1
✖ GUIDE RELAY: pushed confirmation opens the exact session and records its binding (292.632959ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:389:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:410:1
✖ GUIDE BINDING STATUS: the session-local binding is close-bound and corruption refuses (293.778708ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:412:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:425:1
✖ GUIDE BINDING RECOVERY: an interrupted open can bind only the matching latest session (289.117958ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:427:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:442:1
✖ GUIDE STATUS TRUTH: corrupt launch evidence refuses instead of guessing (42.9995ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:444:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:456:1
✖ GUIDE RUNTIME: one command binds a pushed launch and prints executable session-context commands (273.175792ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:458:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:515:1
✖ GUIDE RUNTIME OWNER MUTATION: removing the bound owner refuses by name (242.264959ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:517:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:536:1
✖ GUIDE RUNTIME LEGACY: a version-1 Kristian runtime remains readable (244.931542ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:538:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:554:1
✖ GUIDE RUNTIME MUTATION: an unignored runtime refuses by name (268.77375ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:556:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:569:1
✖ GUIDE RUNTIME PLURALITY: unfinished runtimes coexist and status names each one (288.150875ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:571:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:603:1
✖ GUIDE RUNTIME MUTATION: a linked RUN.json refuses as unsafe state (290.091541ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:605:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:640:1
✖ GUIDE RUNTIME STATUS TRUTH: corrupt live state refuses instead of hiding behind launch state (278.967708ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:642:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:659:1
✖ GUIDE RUNTIME STATUS TRUTH: a forged HALTED label refuses without pushed halt evidence (295.49475ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:661:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:678:1
✖ GUIDE GHOSTTY START: one explicit action requests exactly one clean Reviewer and Producer launcher (234.902959ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:680:21)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:826:1
✖ GUIDE GHOSTTY MUTATION: a failed Producer request refuses duplicate automatic recovery (246.100958ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:828:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:874:1
✖ GUIDE GHOSTTY REVIEWER READINESS MUTATION: a window request without a live Reviewer never opens Producer (226.350375ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:876:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:903:1
✖ GUIDE GHOSTTY PRODUCER READINESS MUTATION: a window request without a live Producer refuses success (215.847458ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:905:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:933:1
✖ GUIDE VISIBLE ROLE STATUS: disk liveness reports a missing Producer instead of pretending the session is active (220.44725ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:935:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:975:1
✖ GUIDE GHOSTTY OWNER-ERROR RECOVERY: one action reopens Reviewer first and Producer only after it is ready (228.618833ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:977:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:1107:1
✖ GUIDE GHOSTTY STABLE-HANDOVER RECOVERY: any formal owner decision can restore both missing roles (249.426666ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async stableOwnerHandover (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1068:3)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1108:27)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:1159:1
✖ GUIDE GHOSTTY STABLE-HANDOVER MUTATION: a missing reviewer job refuses instead of guessing (201.620542ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async stableOwnerHandover (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1068:3)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1160:17)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:1167:1
✖ GUIDE GHOSTTY STABLE-HANDOVER RETRY: a Reviewer startup miss stays safely recoverable (175.473166ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async stableOwnerHandover (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1068:3)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1168:27)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:1208:1
✖ GUIDE GHOSTTY STABLE-HANDOVER BINDING MUTATION: a changed Reviewer job refuses recovery (176.779375ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async stableOwnerHandover (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1068:3)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1209:27)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:1227:1
✖ GUIDE GHOSTTY PARTIAL RECOVERY: an existing Reviewer permits exactly one missing Producer retry (359.935333ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1229:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:1384:1
✖ GUIDE GHOSTTY BOTH-WINDOW RECOVERY: a saved owner decision restores Reviewer before Producer when both disappeared (229.660125ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async bothWindowsMissingAfterPartialRecovery (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1332:3)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1385:27)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:1468:1
✖ GUIDE CONSOLE RECOVERY: displayed choices are handled outside the model without weakening the gate (161.74625ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async bothWindowsMissingAfterPartialRecovery (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1332:3)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1469:17)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:1513:1
✖ GUIDE CONSOLE RECOVERY MUTATION: a bare number never guesses between two recoverable sessions (167.148584ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async bothWindowsMissingAfterPartialRecovery (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1332:3)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1514:27)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:1538:1
✖ GUIDE GHOSTTY BOTH-WINDOW RECOVERY MUTATION: Producer stays closed when restored Reviewer is not ready (187.853833ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async bothWindowsMissingAfterPartialRecovery (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1332:3)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1539:27)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/interruption.test.ts:94:1
✖ INTERRUPTION RECOVERY: Ctrl-C kills Producer, distrusts partial artifact, and resumes the same context (8900.004292ms)
  Error: Timed out waiting for the Producer model turn.
      at waitFor (file:///Users/freeborn/Dev/koda-codex/tests/interruption.test.ts:72:9)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/interruption.test.ts:142:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/interruption.test.ts:186:1
✖ INTERRUPTION RECOVERY: Ctrl-C returns a formal Reviewer job to PENDING and resumes the same context (8348.839875ms)
  Error: Timed out waiting for the Reviewer model turn.
      at waitFor (file:///Users/freeborn/Dev/koda-codex/tests/interruption.test.ts:72:9)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/interruption.test.ts:265:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/interruption.test.ts:303:1
✖ INTERRUPTION RECOVERY: an interrupted owner conversation resumes without losing its disk-bound direction (8328.095334ms)
  Error: Timed out waiting for the owner conversation turn.
      at waitFor (file:///Users/freeborn/Dev/koda-codex/tests/interruption.test.ts:72:9)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/interruption.test.ts:346:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/interruption.test.ts:376:1
✖ INTERRUPTION MUTATION: missing first-turn context ID refuses automatic worker replacement (8341.649416ms)
  Error: Timed out waiting for the context-free model turn.
      at waitFor (file:///Users/freeborn/Dev/koda-codex/tests/interruption.test.ts:72:9)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/interruption.test.ts:406:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/plural-runtime-integration.test.ts:49:1
✖ PLURAL LIVE RUNTIME: two independent Producer/Reviewer pairs complete without crossed sessions (461.298291ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async confirmGuideLaunch (file:///Users/freeborn/Dev/koda-codex/src/guide.ts:709:14)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/plural-runtime-integration.test.ts:87:19)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async startSubtestAfterBootstrap (node:internal/test_runner/harness:385:3)

test at tests/quickstart.test.ts:13:1
✖ FULL-SESSION QUICK START: one command creates a pushed project and numbered Guide launch (196.170916ms)
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
✖ REVIEWER OPEN CONVERSATION: an idle owner question resumes the Reviewer but changes no project file (845.894ms)
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
✖ REVIEWER OPEN CONVERSATION MUTATION: an empty final answer refuses instead of pretending conversation completed (748.838166ms)
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
✖ REVIEWER OPEN CONVERSATION SCOPE: project-level thought returns to Guide without mutation (853.3775ms)
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
✖ REVIEWER OPEN CONVERSATION WAIT: active direction is recorded but cannot become a current-phase handback (785.436292ms)
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
✖ REVIEWER OPEN CONVERSATION TTY: a real terminal line reaches the idle Reviewer prompt (677.180291ms)
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

test at tests/relay-window.test.ts:378:1
✖ REVIEWER STARTUP RACE: input typed before session binding waits and is answered after the same session binds (1554.833291ms)
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
    'Session: 2026-07-20-01\r\n' +
    'Owner input: OPEN — active-session conversation belongs here.\r\n' +
    'This context remains the Reviewer for the complete session. Leave it open.\r\n' +
    '\r\n' +
    'You may type while Producer works. New direction is recorded now and waits for the next gate.\r\n' +
    '────────────────────────────────────────────────────────\r\n' +
    'reviewer> \r\n' +
    '────────────────────────────────────────────────────────\r\n' +
    'REVIEWER PAUSED SAFELY\r\n' +
    '────────────────────────────────────────────────────────\r\n' +
    'Toolkit integrity file changed after verification: docs/QUICKSTART.md.\r\n' +
    '\r\n' +
    'Resume with: npm run relay:reviewer\r\n' +
    '────────────────────────────────────────────────────────\r\n' +
    '\n' +
    'expect: spawn id exp5 not open\n' +
    '    while executing\n' +
    '"expect "early question survived startup""\r\n'

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/relay-window.test.ts:475:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: true,
    code: 'ERR_ASSERTION',
    actual: `spawn /opt/homebrew/Cellar/node/26.0.0/bin/node /Users/freeborn/Dev/koda-codex/scripts/run-relay-reviewer-window.ts\r\n\r\n────────────────────────────────────────────────────────\r\nKODA-C REVIEWER — STARTING SESSION\r\n────────────────────────────────────────────────────────\r\nReviewer: gpt-5.6-terra / medium\r\nRelay: 2026-07-21-software-clean-sol-medium-terra-medium-01\r\n\r\nOwner input: NOT OPEN YET\r\nProducer is creating and binding the session identity.\r\nAny line typed early is held safely until that binding exists.\r\nNO ACTION NEEDED — this window will announce when conversation is ready.\r\n────────────────────────────────────────────────────────\r\nWhat's happening now?\r\r\n\r\n────────────────────────────────────────────────────────\r\nKODA-C REVIEWER — SESSION READY\r\n────────────────────────────────────────────────────────\r\nSession: 2026-07-20-01\r\nOwner input: OPEN — active-session conversation belongs here.\r\nThis context remains the Reviewer for the complete session. Leave it open.\r\n\r\nYou may type while Producer works. New direction is recorded now and waits for the next gate.\r\n────────────────────────────────────────────────────────\r\nreviewer> \r\n────────────────────────────────────────────────────────\r\nREVIEWER PAUSED SAFELY\r\n────────────────────────────────────────────────────────\r\nToolkit integrity file changed after verification: docs/QUICKSTART.md.\r\n\r\nResume with: npm run relay:reviewer\r\n────────────────────────────────────────────────────────\r\n\nexpect: spawn id exp5 not open\n    while executing\n"expect "early question survived startup""\r\n`,
    expected: /REVIEWER PAUSED SAFELY|has not bound a session ID/,
    operator: 'doesNotMatch',
    diff: 'simple'
  }

test at tests/relay-window.test.ts:550:1
✖ WAIT AT FORMAL REVIEW: new direction is recorded immediately but does not revise the reviewed artifact (424.309125ms)
  AssertionError [ERR_ASSERTION]:
  ────────────────────────────────────────────────────────
  REVIEWER PAUSED SAFELY
  ────────────────────────────────────────────────────────
  Toolkit integrity file changed after verification: docs/QUICKSTART.md.
  Evidence remains in /private/var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-reviewer-window-5NXBQV/2026-07-21-software-clean-sol-medium-terra-medium-01/REVIEWER-JOB.json
  Nothing was acknowledged or advanced.
  ────────────────────────────────────────────────────────


  1 !== 0

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/relay-window.test.ts:555:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: false,
    code: 'ERR_ASSERTION',
    actual: 1,
    expected: 0,
    operator: 'strictEqual',
    diff: 'simple'
  }

test at tests/relay-window.test.ts:570:1
✖ WAIT RECEIPT BINDING: a recorded direction survives a wrong receipt but nothing advances (453.61825ms)
  AssertionError [ERR_ASSERTION]:
  ────────────────────────────────────────────────────────
  REVIEWER PAUSED SAFELY
  ────────────────────────────────────────────────────────
  Toolkit integrity file changed after verification: docs/QUICKSTART.md.
  Evidence remains in /private/var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-reviewer-window-dGXbSh/2026-07-21-software-clean-sol-medium-terra-medium-01/REVIEWER-JOB.json
  Nothing was acknowledged or advanced.
  ────────────────────────────────────────────────────────


  1 !== 2

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/relay-window.test.ts:575:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: false,
    code: 'ERR_ASSERTION',
    actual: 1,
    expected: 2,
    operator: 'strictEqual',
    diff: 'simple'
  }

test at tests/relay-window.test.ts:904:1
✖ WAIT CONTRACT MIGRATION: the superseded same-phase handback marker refuses by name (400.682542ms)
  AssertionError [ERR_ASSERTION]: The input did not match the regular expression /superseded DISK HANDOFF REQUIRED marker/. Input:

  '\n' +
    '────────────────────────────────────────────────────────\n' +
    'REVIEWER PAUSED SAFELY\n' +
    '────────────────────────────────────────────────────────\n' +
    'Toolkit integrity file changed after verification: docs/QUICKSTART.md.\n' +
    'Evidence remains in /private/var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-reviewer-window-ZdXsQu/2026-07-21-software-clean-sol-medium-terra-medium-01/REVIEWER-JOB.json\n' +
    'Nothing was acknowledged or advanced.\n' +
    '────────────────────────────────────────────────────────\n'

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/relay-window.test.ts:910:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: true,
    code: 'ERR_ASSERTION',
    actual: '\n────────────────────────────────────────────────────────\nREVIEWER PAUSED SAFELY\n────────────────────────────────────────────────────────\nToolkit integrity file changed after verification: docs/QUICKSTART.md.\nEvidence remains in /private/var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-reviewer-window-ZdXsQu/2026-07-21-software-clean-sol-medium-terra-medium-01/REVIEWER-JOB.json\nNothing was acknowledged or advanced.\n────────────────────────────────────────────────────────\n',
    expected: /superseded DISK HANDOFF REQUIRED marker/,
    operator: 'match',
    diff: 'simple'
  }

test at tests/relay-window.test.ts:952:1
✖ TWO-WINDOW RELAY: a pending formal-review job wakes one persistent reviewer and returns acknowledged disk evidence (420.158458ms)
  AssertionError [ERR_ASSERTION]:
  ────────────────────────────────────────────────────────
  REVIEWER PAUSED SAFELY
  ────────────────────────────────────────────────────────
  Toolkit integrity file changed after verification: docs/QUICKSTART.md.
  Evidence remains in /private/var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-reviewer-wake-OE2vc3/2026-07-21-software-clean-sol-medium-terra-medium-01/REVIEWER-JOB.json
  Nothing was acknowledged or advanced.
  ────────────────────────────────────────────────────────


  1 !== 0

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/relay-window.test.ts:1026:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: false,
    code: 'ERR_ASSERTION',
    actual: 1,
    expected: 0,
    operator: 'strictEqual',
    diff: 'simple'
  }

test at tests/relay-window.test.ts:1039:1
✖ TWO-WINDOW SESSION: separate producer and reviewer processes rendezvous through pushed close (545.412334ms)
  AssertionError [ERR_ASSERTION]:
  ────────────────────────────────────────────────────────
  RELAY PAUSED SAFELY
  ────────────────────────────────────────────────────────
  Toolkit integrity file changed after verification: docs/QUICKSTART.md.

  Resume with: npm run relay:producer -- ../../../../private/var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-two-window-session-at67De/2026-07-21-software-clean-sol-medium-terra-medium-01
  ────────────────────────────────────────────────────────

  no producer stderr file

  1 !== 0

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/relay-window.test.ts:1148:10)
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
✖ PROJECT SANDBOX SUITE: Guide permission table stays bounded without granting the toolkit project (37.109959ms)
  Error: Toolkit integrity file changed after verification: docs/QUICKSTART.md.
      at verifiedFile (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:70:43)
      at async verifyToolkitIntegrityAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:137:5)
      at async verifiedToolkitReadPathsAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:171:3)
      at async verifiedToolkitPermissionReadPathsAt (file:///Users/freeborn/Dev/koda-codex/src/toolkit-integrity.ts:193:17)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/security.test.ts:58:27)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/security.test.ts:75:1
✖ PROJECT SANDBOX SUITE: every verified session role carries the toolkit proof automatically (16.325709ms)
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
