# Per-test result — 2026-07-21-manual-terminal-first-full

- Result: **FAIL**
- Recorded at: 2026-07-21T12:29:55.980Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `68151e7`
- Command: `/opt/homebrew/Cellar/node/26.0.0/bin/node --test --test-reporter=spec tests/concurrent-sessions.test.ts tests/config.test.ts tests/direction.test.ts tests/dogfood.test.ts tests/full-lifecycle.test.ts tests/gate.test.ts tests/guide-console.test.ts tests/guide-runtime-integration.test.ts tests/guide.test.ts tests/halt.test.ts tests/hints.test.ts tests/history.test.ts tests/interruption.test.ts tests/license.test.ts tests/package.test.ts tests/plural-runtime-integration.test.ts tests/quickstart.test.ts tests/receipt-adversarial.test.ts tests/relay-runner.test.ts tests/relay-status.test.ts tests/relay-window.test.ts tests/review-binding.test.ts tests/review.test.ts tests/reviewer-fixtures.test.ts tests/security.test.ts tests/session.test.ts tests/skill.test.ts tests/stale-review.test.ts tests/status-truth.test.ts tests/submission.test.ts tests/toolkit-integrity.test.ts tests/workset.test.ts`

Every discovered test and subtest is named below. No result is aggregated away.

```text
✔ CONCURRENT SESSION ALLOCATION: simultaneous starts receive distinct disk identities (42.063291ms)
✔ CONCURRENT SESSION MUTATION: independence is explicit and ambiguous mutation refuses (983.408583ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-dependency-AcgkEv/remote.git
 * [new branch]      main -> main
✔ DEPENDENCY MUTATION: an active predecessor refuses and pushed terminal evidence is hash-bound (1686.817833ms)
✔ the default phase chain is configurable data in the required order (1.081833ms)
✔ config validation rejects unsafe session paths and drifting phase names (0.1735ms)
✔ config validation refuses a sessions directory that resolves outside the project (20.415667ms)
✔ WAIT DIRECTION: record now, keep current contract frozen, and release only through advance (199.732583ms)
✔ WAIT DIRECTION MUTATION: citing a queued direction before its gate refuses split provenance (11.4645ms)
✔ WAIT DIRECTION CARRY: final-boundary direction becomes a hashed next-session Brief input (18.706542ms)
✔ WAIT DIRECTION MUTATION: changed prose and symbolic-link evidence refuse by name (7.982709ms)
✔ WAIT DIRECTION ATOMIC READ: Koda-C retries its transient file but persistent or unknown entries still refuse (343.132209ms)
✔ WAIT DIRECTION CONTAINMENT: a linked direction directory cannot redirect writes (7.834833ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-direction-boundary-kJqUIr/remote.git
 * [new branch]      main -> main
✔ WAIT FINAL BOUNDARY: a new session prompt must cite direction released by the final gate (1336.138625ms)
✔ the committed dogfood snapshot contains the full native chain and an internally bound close (16.678208ms)
✔ FULL LIFECYCLE SCENARIO: clean approvals traverse all six phases and pushed close (683.6825ms)
✔ FULL LIFECYCLE SCENARIO: a REVISE loop recovers in plan before completing and closing (752.952417ms)
✔ FULL LIFECYCLE SCENARIO: DISCUSS records an owner ruling and requires a fresh live review (608.335084ms)
✔ a complete artifact, review, allowed verdict, unique receipt, and ledger proof open the gate (20.757583ms)
▶ GATE MUTATION SUITE: each core condition refuses and names itself
  ✔ artifact exists (9.917917ms)
  ✔ artifact is non-empty (30.027875ms)
  ✔ artifact is a regular file (12.19175ms)
  ✔ review exists (16.106791ms)
  ✔ review is a regular file (16.359667ms)
  ✔ approval ledger is a regular file (22.873875ms)
  ✔ verdict REVISE is blocking (12.044917ms)
  ✔ verdict REJECT is blocking (11.137084ms)
  ✔ verdict DISCUSS is blocking (12.573458ms)
  ✔ current receipt is quoted verbatim in the ledger (9.010041ms)
✔ GATE MUTATION SUITE: each core condition refuses and names itself (153.965042ms)
✔ outer receipt whitespace is ignored but inner bytes remain literal (30.252417ms)
▶ every gate condition fails closed when deliberately broken
  ✔ artifact missing (9.246792ms)
  ✔ artifact empty (11.329041ms)
  ✔ review missing (8.646917ms)
  ✔ verdict line missing (9.475542ms)
  ✔ verdict unknown (9.494916ms)
  ✔ receipt missing from last line (10.533625ms)
  ✔ generated review metadata missing (10.065ms)
  ✔ duplicate generated review metadata is ambiguous (10.026416ms)
  ✔ review metadata names a different phase (11.083625ms)
  ✔ artifact changed after review (18.486375ms)
  ✔ final receipt differs from generated receipt (12.289167ms)
  ✔ receipt reused by another review (22.047417ms)
  ✔ approval ledger missing (12.287042ms)
  ✔ exact receipt absent from ledger (7.628167ms)
  ✔ approver missing (9.737959ms)
  ✔ APPROVE WITH COMMENTS has no ledger comments (10.487292ms)
  ✔ REVISE blocks even with receipt proof (10.8695ms)
  ✔ REJECT blocks even with receipt proof (8.198458ms)
  ✔ DISCUSS blocks without an owner ruling (7.591166ms)
  ✔ DISCUSS still blocks after the ruling until a fresh review (8.121917ms)
✔ every gate condition fails closed when deliberately broken (220.338042ms)
✔ GUIDE CONSOLE SECURITY: every turn ignores ambient config and rules under the project profile (1.96825ms)
✔ GUIDE CONSOLE SECURITY: the Guide profile retains only named read-only runtime capabilities (0.355917ms)
✔ GUIDE CONSOLE STATE: invalid or ambiguous persistent identity refuses (0.65925ms)
✔ GUIDE CONSOLE TERMINAL SAFETY: model output cannot inject terminal or bidi controls (0.110375ms)
✔ GUIDE CONSOLE VISIBILITY: low-level inspection commands stay in evidence instead of flooding the screen (0.103917ms)
✔ GUIDE CONSOLE STARTUP: reconstruction is explicitly bounded to compact continuity evidence (0.188ms)
✔ GUIDE CONSOLE LOCK: a live duplicate refuses and a released console can reopen (10.577917ms)
✔ GUIDE CONSOLE CONTAINMENT: a linked runtime parent refuses before lock creation (1.521167ms)
✔ GUIDE CONSOLE CONTAINMENT: Guide continuity cannot grant writes inside session evidence (4.637917ms)
✔ GUIDE OPEN UX: one command enters the persistent console without opening session roles (4.168375ms)
✔ GUIDE OPEN UX: partial launch staffing refuses before the Guide opens (2.219833ms)
✔ GUIDE NUMBERED LAUNCH: Ghostty and manual terminals coexist while not-now preserves the launch (9.079542ms)
✔ GUIDE CONSOLE PERSISTENCE: a closed console resumes the same independent Guide context (685.814833ms)
✔ GUIDE CONSOLE STARTUP REFUSAL: the primary Codex error is shown before a missing context symptom (305.212958ms)
✔ GUIDE CONSOLE INPUT RECOVERY: input closing during a long startup exits cleanly after preserving the turn (576.585083ms)
✔ GUIDE CONSOLE CRASH EVIDENCE: raw events are durable while a model turn is still running (1304.541209ms)
✔ GUIDE CONSOLE CRASH EVIDENCE MUTATION: existing or linked evidence refuses before the model runs (191.232667ms)
✔ GUIDE REAL-PROJECT RELAY: an independent sibling uses two bound contexts and returns pushed close (9111.944583ms)
✔ GUIDE ENTRY: an active prior session refuses a new launch request and names it (36.598625ms)
✔ GUIDE PREFLIGHT: active work distinguishes blocked successors from explicit independent siblings (51.031917ms)
✔ GUIDE TOOLKIT BINDING: confirmation carries machine-discovered launch integrity (40.823416ms)
✔ GUIDE TOOLKIT MUTATION: changed bound toolkit proof makes the launch stale (49.87825ms)
✔ GUIDE INDEPENDENT CONTROL: an active Produce session permits an owner-classified Explore sibling (70.351083ms)
✔ GUIDE INDEPENDENT BINDING: confirmed kind and independence open exactly one matching sibling (1001.095458ms)
✔ GUIDE PREFLIGHT CONTROL: a project with no active session permits exactly one draft (26.894792ms)
✔ GUIDE HALT RETURN: a pushed halt and every waiting direction must enter a fresh confirmed Brief (1853.624792ms)
✔ GUIDE CONFIRMATION: one request binds prompt, manifest, continuity, and owner (21.698667ms)
✔ GUIDE PROMPT CONTRACT MUTATION: an explicit relationship mismatch refuses before confirmation (7.28275ms)
✔ GUIDE OWNER IDENTITY MUTATION: terminal control characters refuse before confirmation (6.379375ms)
✖ GUIDE VERIFIED HANDOVER: the owner receives a complete numbered launch choice (701.211834ms)
✔ GUIDE MUTATION: changing only a continuity file makes confirmation stale (39.259167ms)
✔ GUIDE MUTATION: changing only the prompt makes confirmation stale (72.52575ms)
✔ GUIDE MUTATION: changing only the project manifest makes confirmation stale (58.094375ms)
✔ GUIDE GIT HANDOVER: a confirmed but uncommitted request refuses launch (508.030125ms)
✔ GUIDE RECOVERY: stale confirmation requires a pushed cancellation before reconfirming (822.268792ms)
✔ GUIDE GATE: a project with a Guide manifest refuses an unconfirmed session prompt (3.799791ms)
✔ GUIDE RELAY: pushed confirmation opens the exact session and records its binding (615.978625ms)
✔ GUIDE BINDING STATUS: the session-local binding is close-bound and corruption refuses (690.754708ms)
✔ GUIDE BINDING RECOVERY: an interrupted open can bind only the matching latest session (367.984583ms)
✔ GUIDE STATUS TRUTH: corrupt launch evidence refuses instead of guessing (35.365709ms)
✖ GUIDE RUNTIME: one command binds a pushed launch and prints executable session-context commands (846.482667ms)
✖ GUIDE LAUNCH SURFACE COEXISTENCE: a prepared manual path may still choose Ghostty before either role starts (1276.623084ms)
✔ GUIDE MANUAL LAUNCH MUTATION: a running role refuses duplicate manual start instructions (1067.593209ms)
✔ GUIDE RUNTIME OWNER MUTATION: removing the bound owner refuses by name (449.17975ms)
✔ GUIDE RUNTIME LEGACY: a version-1 Kristian runtime remains readable (414.603625ms)
✔ GUIDE RUNTIME MUTATION: an unignored runtime refuses by name (381.81725ms)
✔ GUIDE RUNTIME PLURALITY: unfinished runtimes coexist and status names each one (641.857875ms)
✔ GUIDE RUNTIME MUTATION: a linked RUN.json refuses as unsafe state (397.421958ms)
✔ GUIDE RUNTIME STATUS TRUTH: corrupt live state refuses instead of hiding behind launch state (432.635041ms)
✔ GUIDE RUNTIME STATUS TRUTH: a forged HALTED label refuses without pushed halt evidence (474.545042ms)
✔ GUIDE RUNTIME STATUS TRUTH: pushed halt evidence supersedes a stale PAUSED_ERROR window label (904.890375ms)
▶ GUIDE GHOSTTY START: one explicit action requests exactly one clean Reviewer and Producer launcher
  ✔ GHOSTTY LOGIN RESOLUTION MUTATION: a directory-changing login cannot strand either role command (0.111083ms)
✔ GUIDE GHOSTTY START: one explicit action requests exactly one clean Reviewer and Producer launcher (861.155709ms)
✔ GUIDE VISIBLE STARTUP MUTATION: launch is ready only after both roles bind the same session (0.114542ms)
✔ GUIDE GHOSTTY MUTATION: a failed Producer request refuses duplicate automatic recovery (451.252625ms)
✔ GUIDE GHOSTTY REVIEWER READINESS MUTATION: a window request without a live Reviewer never opens Producer (455.821541ms)
✔ GUIDE GHOSTTY PRODUCER READINESS MUTATION: a window request without a live Producer refuses success (425.33225ms)
✔ GUIDE VISIBLE ROLE STATUS: disk liveness reports a missing Producer instead of pretending the session is active (634.182417ms)
✔ GUIDE GHOSTTY OWNER-ERROR RECOVERY: one action reopens Reviewer first and Producer only after it is ready (397.67175ms)
✔ GUIDE GHOSTTY STABLE-HANDOVER RECOVERY: any formal owner decision can restore both missing roles (406.632708ms)
✔ GUIDE GHOSTTY STABLE-HANDOVER MUTATION: a missing reviewer job refuses instead of guessing (378.1135ms)
✔ GUIDE GHOSTTY STABLE-HANDOVER RETRY: a Reviewer startup miss stays safely recoverable (386.52175ms)
✔ GUIDE GHOSTTY STABLE-HANDOVER BINDING MUTATION: a changed Reviewer job refuses recovery (394.766959ms)
✔ GUIDE GHOSTTY PARTIAL RECOVERY: an existing Reviewer permits exactly one missing Producer retry (387.948542ms)
✔ GUIDE GHOSTTY BOTH-WINDOW RECOVERY: a saved owner decision restores Reviewer before Producer when both disappeared (383.08225ms)
✔ GUIDE CONSOLE RECOVERY: displayed choices are handled outside the model without weakening the gate (374.733583ms)
✔ GUIDE MANUAL RECOVERY: the existing run routes only missing roles to terminal instructions (361.928042ms)
✖ GUIDE MANUAL RECOVERY COMMANDS: default recovery reprints only existing run-bound launchers (362.883875ms)
✔ GUIDE CONSOLE RECOVERY MUTATION: a bare number never guesses between two recoverable sessions (364.469958ms)
✔ GUIDE GHOSTTY BOTH-WINDOW RECOVERY MUTATION: Producer stays closed when restored Reviewer is not ready (359.494584ms)
✔ HALT OWNER INTENT: explicit console forms are recognized without treating ordinary conversation as halt (0.624334ms)
✔ HALT CEREMONY: void the in-flight phase, require pushed evidence, then return through a fresh Brief (4295.325334ms)
✔ HALT STATUS TRUTH: corrupt halt evidence is named and never treated as terminal (487.255917ms)
✔ HALT TERMINAL MUTATION: halt and close evidence can never coexist (25.082208ms)
✔ the approval and advancement recovery commands run exactly as printed (666.527667ms)
✔ the missing-review recovery command runs exactly as printed (702.902291ms)
✔ a phase entry remains valid only while every prior gate proof still exists on disk (22.720833ms)
✔ INTERRUPTION SCHEMA: role, purpose, time, and evidence filenames remain one shared fail-closed contract (2.658125ms)
✔ INTERRUPTION RECOVERY: Ctrl-C kills Producer, distrusts partial artifact, and resumes the same context (1730.852375ms)
✔ INTERRUPTION RECOVERY: Ctrl-C returns a formal Reviewer job to PENDING and resumes the same context (1671.850416ms)
✔ INTERRUPTION RECOVERY: an interrupted owner conversation resumes without losing its disk-bound direction (1751.314292ms)
✔ INTERRUPTION MUTATION: missing first-turn context ID refuses automatic worker replacement (3649.410917ms)
✔ the repository carries the complete GPLv3-only license and Kristian's sole copyright (5.021667ms)
✔ PACKAGED NPX SUITE: the source-controlled binary is executable before npm touches it (2.584ms)
✔ PACKAGED NPX SUITE: the documented local npx command does not mutate its checkout (7202.89225ms)
✔ PACKAGED NPX SUITE: a real tarball installs and runs the plain-JavaScript koda binary (7976.061666ms)
✔ PLURAL LIVE RUNTIME: two independent Producer/Reviewer pairs complete without crossed sessions (7982.819459ms)
✔ FULL-SESSION QUICK START: one command creates a pushed project and numbered Guide launch (2434.624833ms)
✔ RECEIPT ADVERSARIAL SUITE: an earlier review's receipt cannot approve a fresh review (20.776208ms)
✔ RECEIPT ADVERSARIAL SUITE: phase N receipt cannot approve phase N+1 (9.9595ms)
✔ RECEIPT ADVERSARIAL SUITE: outer whitespace is accepted and any inner word change refuses (17.671167ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REVISE (9.017333ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REJECT (8.036042ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override DISCUSS (9.400333ms)
✔ FULL RELAY RUNNER: preparation creates a clean pushed project with local skills (720.610334ms)
✔ FULL RELAY RUNNER: execution preserves two contexts and binds owner acknowledgement to the full receipt (3.992667ms)
✔ GENUINE FULL RELAY EVIDENCE: six phases, revision recovery, distinct contexts, and pushed close (14.728125ms)
✔ RELAY STATUS TRUTH: a prepared run names all roles and prints only the first safe action (660.157083ms)
✔ RELAY STATUS TRUTH: after Reviewer is alive, Producer becomes the one safe next action (738.923375ms)
✔ RELAY STATUS TRUTH: a stopped reviewer process names explicit stale-lock recovery (763.883583ms)
✔ RELAY STATUS TRUTH: an active recorded producer is never duplicated by a blind hint (738.9165ms)
✔ RELAY STATUS TRUTH: corrupt or ambiguous run state refuses instead of guessing (1982.368666ms)
✔ RELAY STATUS TRUTH: a corrupt waiting direction refuses immediately by name (945.567458ms)
✔ TWO-WINDOW PROTOCOL: reviewer jobs are bounded and duplicate reviewer windows refuse (48.279125ms)
✔ TWO-WINDOW VISIBILITY: progress is readable without exposing review receipts (0.655209ms)
✔ REVIEWER OPEN CONVERSATION: an idle owner question resumes the Reviewer but changes no project file (1036.76875ms)
✔ REVIEWER OPEN CONVERSATION MUTATION: an empty final answer refuses instead of pretending conversation completed (1035.077167ms)
✔ REVIEWER OPEN CONVERSATION SCOPE: project-level thought returns to Guide without mutation (1228.939791ms)
✔ REVIEWER OPEN CONVERSATION WAIT: active direction is recorded but cannot become a current-phase handback (1118.618541ms)
✔ REVIEWER OPEN CONVERSATION HALT: an explicit owner halt cannot be filed as a waiting direction (1307.381041ms)
✔ REVIEWER OPEN CONVERSATION HALT CANCEL: cancellation changes no session evidence (541.097291ms)
✔ REVIEWER OPEN CONVERSATION HALT MARKER: an explicit model boundary opens the same confirmed ceremony (1130.930625ms)
✔ REVIEWER OPEN CONVERSATION TTY: a real terminal line reaches the idle Reviewer prompt (674.143875ms)
✔ REVIEWER STARTUP RACE: input typed before session binding waits and is answered after the same session binds (1426.716083ms)
✔ TWO-WINDOW RECEIPT: short owner code maps to the exact disk receipt (487.781083ms)
✔ TWO-WINDOW TERMINAL SAFETY: inline review controls are sanitized without changing disk evidence (562.436875ms)
✔ TWO-WINDOW RECEIPT MUTATION: a wrong review code refuses, names the condition, and remains retryable (665.881458ms)
✔ TWO-WINDOW RECEIPT ADVERSARIAL: a valid code from another review refuses (479.535ms)
✔ WAIT AT FORMAL REVIEW: new direction is recorded immediately but does not revise the reviewed artifact (765.323875ms)
✔ WAIT RECEIPT BINDING: a recorded direction survives a wrong receipt but nothing advances (827.170708ms)
✔ TWO-WINDOW RECEIPT RECOVERY: the live legacy acknowledgement failure reopens the same review and context (679.943875ms)
✔ TWO-WINDOW PRODUCER RECOVERY: an awaiting formal review is rejoined instead of replaced (847.015334ms)
✔ TWO-WINDOW OWNER CEREMONY TTY: inline review and numbered choices disclose the code step (10640.806958ms)
✔ TWO-WINDOW OWNER CEREMONY TTY: stop for now preserves an explicit resumable decision point (484.317041ms)
✔ TWO-WINDOW OWNER CEREMONY TTY: inline review does not invoke a configured pager (484.350958ms)
✔ TWO-WINDOW OWNER CEREMONY TTY: acknowledgement never invokes pbcopy (580.588958ms)
✔ WAIT CONTRACT MIGRATION: the superseded same-phase handback marker refuses by name (598.337208ms)
✔ REVIEWER HALT: the sole interrupt voids the phase and pushes immutable evidence without a receipt (975.462375ms)
✔ TWO-WINDOW RELAY: a pending formal-review job wakes one persistent reviewer and returns acknowledged disk evidence (801.420042ms)
✔ TWO-WINDOW SESSION: separate producer and reviewer processes rendezvous through pushed close (3749.774083ms)
✔ REVIEW BINDING SUITE: changing review findings after owner acknowledgement refuses (61.124333ms)
✔ REVIEW BINDING SUITE: an untouched generated template cannot become an approved review (34.24625ms)
✔ a current review cannot be replaced before its receipt is recorded (28.152125ms)
✔ a revised artifact receives a fresh review, fresh receipt, and archived prior review (15.532958ms)
✔ DISCUSS requires the owner's ruling before a fresh definitive review (26.733708ms)
✔ REVIEWER FIXTURES: five sealed fixtures ship as blind Koda-C projects (28.993042ms)
✔ REVIEWER FIXTURES: the planted hard number is unsupported and the control has no plant (1.180916ms)
✔ REVIEWER FIXTURES: inference-chain plant requires a deduction across three source files (0.66575ms)
✔ REVIEWER FIXTURES: tempting honest control is imperfect in style but its claims execute (95.414875ms)
✔ REVIEWER FIXTURES: evidence-absence trap has working code but its claimed run record is missing (87.565875ms)
✔ REVIEWER FIXTURES: new scoring contracts still match their pre-run Git seal (51.828542ms)
✔ REVIEWER FIXTURES: Ghostty runs pin model and effort and preserve ephemeral Codex events (0.926167ms)
✔ REVIEWER FIXTURES: the bounded model matrix is backed by seventeen graded run folders (22.82525ms)
✔ PROJECT SANDBOX SUITE: role turns fail closed with project-scoped read and write access (2.071917ms)
✔ PROJECT SANDBOX SUITE: Guide permission table stays bounded without granting the toolkit project (133.204291ms)
✔ PROJECT SANDBOX SUITE: every verified session role carries the toolkit proof automatically (45.761583ms)
✔ PROJECT SANDBOX SUITE: the Node toolchain root is a narrow explicit read capability (0.650958ms)
✔ PROJECT SANDBOX SUITE: the resolved Git toolchain avoids the macOS xcrun cache shim (0.070208ms)
✔ PROJECT SANDBOX MUTATION: only an empty real role-config directory may be omitted from the evidence archive (4.214833ms)
✔ PROJECT SANDBOX SUITE: read-only probes cannot mutate their workspace (0.176125ms)
✔ SECURITY INTEGRITY SUITE: the install is dependency-free with no install hook (0.865666ms)
✔ SECURITY INTEGRITY SUITE: the committed repository contains no symbolic link (23.396ms)
✔ SECURITY INTEGRITY SUITE: tracked text contains no common live credential signature (211.844083ms)
✔ SECURITY INTEGRITY SUITE: relay roles and model children never inherit ambient credentials or parent context identity (0.472709ms)
✔ SECURITY INTEGRITY SUITE: shared role launcher bytes ignore ambient terminal locale and color (0.504541ms)
✔ SECURITY INTEGRITY SUITE: owner receipt and ruling data never enter child-process arguments or environment (0.894625ms)
✔ SECURITY INTEGRITY SUITE: fresh-model evidence runs strip ambient credentials and parent context identity (0.599334ms)
✔ SECURITY INTEGRITY SUITE: every managed Codex exec ignores ambient command rules (1.164041ms)
✔ SECURITY INTEGRITY SUITE: both live session roles bind verified toolkit, Git, and private config capabilities (0.533666ms)
✔ SECURITY INTEGRITY SUITE: the executable shared role launcher starts one child with a clean environment (259.0145ms)
✔ session creation requires a prompt and numbers dated folders (16.194916ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-1uAxC2/remote.git
 * [new branch]      main -> main
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-1uAxC2/remote.git
   660ef84..3c6f243  main -> main
✔ a completed session is closed only after its state is committed and pushed (4553.678583ms)
✔ immutable close refuses symbolic links inside session evidence (17.959958ms)
✔ immutable close refuses duplicate generated metadata markers (0.11725ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-ignored-remote-CTYlRo/remote.git
 * [new branch]      main -> main
✔ immutable close refuses a bound session file that Git ignored instead of pushing (299.068917ms)
✔ every Koda-C skill has valid relay sections and four-line Codex metadata (48.982833ms)
✔ skill index metadata stays concise, front-loaded, and trigger-specific (20.038334ms)
✔ producer phase skills hand only to the one shared reviewer (3.418ms)
✔ concurrent relay skills require bound session identity instead of latest-session guessing (2.088416ms)
✔ the shared reviewer keeps all phase criteria in one place (11.8245ms)
✔ in-phase consultation is disk-backed and cannot impersonate formal review (19.190125ms)
✔ session open and close remain ceremonies outside producer phase routing (3.748ms)
✔ the session-prompt skill is the sole skill route to a future session launch (4.887375ms)
✔ the fresh Guide preflight model run is sealed, blind, ephemeral, and read-only (0.86625ms)
✔ historical fresh Codex startup discovered the original nine local skills and root guidance without reading disk (1.719ms)
✔ fresh Codex discovers all ten current skills and the active Guide preflight refuses without mutation (1.01675ms)
✔ STALE-REVIEW BINDING: editing the artifact after review refuses with a named re-review reason (76.073375ms)
✔ STALE-REVIEW BINDING: reviewing after an edit binds the new artifact and opens (22.372167ms)
✔ STATUS TRUTH SUITE: deleting a review is reflected immediately (405.610292ms)
✔ STATUS TRUTH SUITE: blanking an artifact is reflected immediately (376.389958ms)
✔ STATUS TRUTH SUITE: corrupt ledger metadata refuses with a named corruption reason (177.516ms)
✔ STATUS TRUTH SUITE: editing an acknowledged review is reflected immediately (184.72425ms)
✔ STATUS TRUTH SUITE: invalid state JSON refuses instead of guessing (156.791834ms)
✔ STATUS TRUTH SUITE: a path-like phase name in state refuses instead of escaping (236.340875ms)
✔ JUDGE JOURNEY SUITE: the committed binary runs without rebuilding (89.974291ms)
✔ JUDGE JOURNEY SUITE: video and submission documents preserve every live rule (2.933166ms)
✔ PUBLIC GUIDE CONTRACT: current entry docs use the product name and describe the shipped workflow (2.3525ms)
✔ JUDGE JOURNEY SUITE: local links in the judge documents resolve (11.65375ms)
✔ TOOLKIT INTEGRITY: a complete manifest proves the installed launch surface (18.209833ms)
✔ TOOLKIT INTEGRITY CAPABILITY: a sandbox receives only exact verified read paths (10.552208ms)
✔ TOOLKIT INTEGRITY PERMISSIONS: public runtime code compacts without granting docs or runtime state (8.536ms)
✔ TOOLKIT INTEGRITY MUTATION: changed launch code refuses and names the file (9.21075ms)
✔ TOOLKIT INTEGRITY MUTATION: linked evidence refuses instead of following it (5.198208ms)
✔ TOOLKIT INTEGRITY MUTATION: a manifest cannot overstate its hashed test evidence (7.17375ms)
✔ WRITE SET: claims exact clean paths and refuses Guide or sibling overlap (322.058167ms)
✔ WRITE SET CONCURRENCY: simultaneous same-path claims cannot both succeed (191.17775ms)
✔ WRITE SET CONTAINMENT: a linked parent cannot alias a claimed output path (96.895083ms)
✔ WRITE SET CLI: explicit session identity records project-relative output ownership (173.210083ms)
✔ WRITE SET STATUS TRUTH: corrupt disk evidence refuses instead of inferring state (127.601ms)
✔ GUIDE WRITE SET: new Guide files are explicit and active-session overlap refuses (187.389209ms)
✔ WRITE SET: unrelated Guide and sibling dirt may coexist; unclaimed dirt refuses (167.383666ms)
✔ GUIDE RUNTIME OWNERSHIP: published run and return namespaces are never mistaken for sibling work (170.849541ms)
✔ WRITE SET MUTATION: rename and delete are exact owned changes, including both rename sides (319.749209ms)
✔ WRITE SET MUTATION: staged bytes must match the recorded post-work hash (141.689792ms)
✔ WRITE SET MUTATION: a claimed path changed after post-work observation refuses by name (115.494625ms)
✔ GIT LOCK: live owner refuses, stale lock recovers only with an empty index (115.646083ms)
✔ GIT LOCK SERIALIZATION: relay callers may wait for a live short ceremony (186.059833ms)
✔ GIT LOCK SERIALIZATION MUTATION: release between inspection steps retries instead of leaking ENOENT (70.290791ms)
✔ GIT LOCK RELEASE MUTATION: a new owner acquired during cleanup is never deleted by the retiring owner (68.377083ms)
✔ GIT LOCK CONTAINMENT: linked .koda cannot redirect lock evidence (64.953333ms)
✔ GIT LOCK CONTAINMENT MUTATION: a disk-supplied token cannot become a retired path (64.270209ms)
ℹ tests 262
ℹ suites 0
ℹ pass 258
ℹ fail 4
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 37307.419625

✖ failing tests:

test at tests/guide.test.ts:298:1
✖ GUIDE VERIFIED HANDOVER: the owner receives a complete numbered launch choice (701.211834ms)
  AssertionError [ERR_ASSERTION]: The input did not match the regular expression /2\. Launch in terminals I open myself.*Reviewer first.*Producer second/. Input:

  'READY TO LAUNCH — b3d05796-e976-49ff-8072-f559fdee98ce\n' +
    'Prompt: docs/guide/prompts/next-session.md\n' +
    '✓ Prompt, project continuity, and prior-session evidence still match owner confirmation.\n' +
    '\n' +
    'READY TO LAUNCH — OWNER CHOICE\n' +
    '1. Launch automatically in Ghostty — Codex may ask permission for one local launcher command; approving it opens exactly one Reviewer and one Producer window.\n' +
    '2. Launch in terminals I open myself — Koda-C prepares this same session and shows one Reviewer-first command, then one Producer-second command.\n' +
    '3. Not now — keep this launch ready without opening windows.\n' +
    'Choose in the Guide conversation.'

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:309:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: true,
    code: 'ERR_ASSERTION',
    actual: 'READY TO LAUNCH — b3d05796-e976-49ff-8072-f559fdee98ce\nPrompt: docs/guide/prompts/next-session.md\n✓ Prompt, project continuity, and prior-session evidence still match owner confirmation.\n\nREADY TO LAUNCH — OWNER CHOICE\n1. Launch automatically in Ghostty — Codex may ask permission for one local launcher command; approving it opens exactly one Reviewer and one Producer window.\n2. Launch in terminals I open myself — Koda-C prepares this same session and shows one Reviewer-first command, then one Producer-second command.\n3. Not now — keep this launch ready without opening windows.\nChoose in the Guide conversation.',
    expected: /2\. Launch in terminals I open myself.*Reviewer first.*Producer second/,
    operator: 'match',
    diff: 'simple'
  }

test at tests/guide.test.ts:457:1
✖ GUIDE RUNTIME: one command binds a pushed launch and prints executable session-context commands (846.482667ms)
  AssertionError [ERR_ASSERTION]: /bin/sh: Speak: command not found


  127 !== 0

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:496:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: false,
    code: 'ERR_ASSERTION',
    actual: 127,
    expected: 0,
    operator: 'strictEqual',
    diff: 'simple'
  }

test at tests/guide.test.ts:542:1
✖ GUIDE LAUNCH SURFACE COEXISTENCE: a prepared manual path may still choose Ghostty before either role starts (1276.623084ms)
  Error: Existing Koda-C role launcher is unsafe or changed: /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-guide-test-FCSi2y/project/.koda/runs/d8f9ec06-9fa5-4dd2-9f7e-370d2c5783c0/launch-reviewer.sh
      at inspectLauncher (file:///Users/freeborn/Dev/koda-codex/src/role-launchers.ts:157:11)
      at async Promise.all (index 0)
      at async prepareRoleLaunchers (file:///Users/freeborn/Dev/koda-codex/src/role-launchers.ts:201:40)
      at async ghosttyWindowRequests (file:///Users/freeborn/Dev/koda-codex/src/ghostty.ts:106:21)
      at async requestGhosttyWindows (file:///Users/freeborn/Dev/koda-codex/src/ghostty.ts:533:20)
      at async TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:564:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7)

test at tests/guide.test.ts:1694:1
✖ GUIDE MANUAL RECOVERY COMMANDS: default recovery reprints only existing run-bound launchers (362.883875ms)
  AssertionError [ERR_ASSERTION]: The input did not match the regular expression /MANUAL TERMINAL RECOVERY READY/. Input:

  'RECOVERY PAUSED SAFELY — Existing Koda-C role launcher is unsafe or changed: /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-guide-test-Agq9ld/project/.koda/runs/9e2b69b4-2812-4d64-951b-8135334bdc81/launch-reviewer.sh\n' +
    'Nothing was acknowledged or advanced. This Guide remains open. Type 1 to retry after the cause is corrected, or 2 to leave the session paused.'

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/guide.test.ts:1702:10)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:831:7) {
    generatedMessage: true,
    code: 'ERR_ASSERTION',
    actual: 'RECOVERY PAUSED SAFELY — Existing Koda-C role launcher is unsafe or changed: /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-guide-test-Agq9ld/project/.koda/runs/9e2b69b4-2812-4d64-951b-8135334bdc81/launch-reviewer.sh\nNothing was acknowledged or advanced. This Guide remains open. Type 1 to retry after the cause is corrected, or 2 to leave the session paused.',
    expected: /MANUAL TERMINAL RECOVERY READY/,
    operator: 'match',
    diff: 'simple'
  }
```
