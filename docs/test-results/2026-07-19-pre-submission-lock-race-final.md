# Per-test result — 2026-07-19-pre-submission-lock-race-final

- Result: **FAIL**
- Recorded at: 2026-07-19T18:16:31.375Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `dc7febe`
- Command: `/opt/homebrew/Cellar/node/26.0.0/bin/node --test --test-reporter=spec tests/concurrent-sessions.test.ts tests/config.test.ts tests/direction.test.ts tests/dogfood.test.ts tests/full-lifecycle.test.ts tests/gate.test.ts tests/guide-runtime-integration.test.ts tests/guide.test.ts tests/halt.test.ts tests/hints.test.ts tests/history.test.ts tests/interruption.test.ts tests/license.test.ts tests/package.test.ts tests/plural-runtime-integration.test.ts tests/receipt-adversarial.test.ts tests/relay-runner.test.ts tests/relay-status.test.ts tests/relay-window.test.ts tests/review-binding.test.ts tests/review.test.ts tests/reviewer-fixtures.test.ts tests/security.test.ts tests/session.test.ts tests/skill.test.ts tests/stale-review.test.ts tests/status-truth.test.ts tests/submission.test.ts tests/workset.test.ts`

Every discovered test and subtest is named below. No result is aggregated away.

```text
✔ CONCURRENT SESSION ALLOCATION: simultaneous starts receive distinct disk identities (10.529625ms)
✔ CONCURRENT SESSION MUTATION: independence is explicit and ambiguous mutation refuses (1554.725958ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-dependency-Ikdz83/remote.git
 * [new branch]      main -> main
✔ DEPENDENCY MUTATION: an active predecessor refuses and pushed terminal evidence is hash-bound (2305.884958ms)
✔ the default phase chain is configurable data in the required order (2.569375ms)
✔ config validation rejects unsafe session paths and drifting phase names (0.2505ms)
✔ config validation refuses a sessions directory that resolves outside the project (15.018875ms)
✔ WAIT DIRECTION: record now, keep current contract frozen, and release only through advance (329.357875ms)
✔ WAIT DIRECTION MUTATION: citing a queued direction before its gate refuses split provenance (35.139958ms)
✔ WAIT DIRECTION CARRY: final-boundary direction becomes a hashed next-session Brief input (74.974959ms)
✔ WAIT DIRECTION MUTATION: changed prose and symbolic-link evidence refuse by name (15.952625ms)
✔ WAIT DIRECTION CONTAINMENT: a linked direction directory cannot redirect writes (7.330916ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-direction-boundary-AHV4xM/remote.git
 * [new branch]      main -> main
✔ WAIT FINAL BOUNDARY: a new session prompt must cite direction released by the final gate (1698.362208ms)
✔ the committed dogfood snapshot contains the full native chain and an internally bound close (19.150292ms)
✔ FULL LIFECYCLE SCENARIO: clean approvals traverse all six phases and pushed close (889.506791ms)
✔ FULL LIFECYCLE SCENARIO: a REVISE loop recovers in plan before completing and closing (877.075542ms)
✔ FULL LIFECYCLE SCENARIO: DISCUSS records an owner ruling and requires a fresh live review (796.695042ms)
✔ a complete artifact, review, allowed verdict, unique receipt, and ledger proof open the gate (32.859167ms)
▶ GATE MUTATION SUITE: each core condition refuses and names itself
  ✔ artifact exists (22.610292ms)
  ✔ artifact is non-empty (14.174333ms)
  ✔ artifact is a regular file (27.649833ms)
  ✔ review exists (33.037209ms)
  ✔ review is a regular file (11.219167ms)
  ✔ approval ledger is a regular file (11.64775ms)
  ✔ verdict REVISE is blocking (10.27275ms)
  ✔ verdict REJECT is blocking (45.317875ms)
  ✔ verdict DISCUSS is blocking (18.919041ms)
  ✔ current receipt is quoted verbatim in the ledger (15.6525ms)
✔ GATE MUTATION SUITE: each core condition refuses and names itself (212.038417ms)
✔ outer receipt whitespace is ignored but inner bytes remain literal (78.643667ms)
▶ every gate condition fails closed when deliberately broken
  ✔ artifact missing (46.437667ms)
  ✔ artifact empty (31.312625ms)
  ✔ review missing (37.953833ms)
  ✔ verdict line missing (32.173667ms)
  ✔ verdict unknown (44.938041ms)
  ✔ receipt missing from last line (37.258166ms)
  ✔ generated review metadata missing (20.261333ms)
  ✔ duplicate generated review metadata is ambiguous (17.035375ms)
  ✔ review metadata names a different phase (17.970458ms)
  ✔ artifact changed after review (18.105125ms)
  ✔ final receipt differs from generated receipt (20.795167ms)
  ✔ receipt reused by another review (15.409583ms)
  ✔ approval ledger missing (26.325959ms)
  ✔ exact receipt absent from ledger (12.948875ms)
  ✔ approver missing (13.517333ms)
  ✔ APPROVE WITH COMMENTS has no ledger comments (12.017542ms)
  ✔ REVISE blocks even with receipt proof (10.962167ms)
  ✔ REJECT blocks even with receipt proof (16.374ms)
  ✔ DISCUSS blocks without an owner ruling (16.446708ms)
  ✔ DISCUSS still blocks after the ruling until a fresh review (22.107542ms)
✔ every gate condition fails closed when deliberately broken (473.310791ms)
✔ GUIDE REAL-PROJECT RELAY: an independent sibling uses two bound contexts and returns pushed close (11496.062625ms)
✔ GUIDE ENTRY: an active prior session refuses a new launch request and names it (27.049708ms)
✔ GUIDE PREFLIGHT: active work distinguishes blocked successors from explicit independent siblings (13.026625ms)
✔ GUIDE INDEPENDENT CONTROL: an active Produce session permits an owner-classified Explore sibling (31.859833ms)
✔ GUIDE INDEPENDENT BINDING: confirmed kind and independence open exactly one matching sibling (1118.190917ms)
✔ GUIDE PREFLIGHT CONTROL: a project with no active session permits exactly one draft (6.744042ms)
✔ GUIDE HALT RETURN: a pushed halt and every waiting direction must enter a fresh confirmed Brief (2574.410375ms)
✔ GUIDE CONFIRMATION: one request binds prompt, manifest, continuity, and owner (35.328084ms)
✔ GUIDE MUTATION: changing only a continuity file makes confirmation stale (23.658875ms)
✔ GUIDE MUTATION: changing only the prompt makes confirmation stale (14.664834ms)
✔ GUIDE MUTATION: changing only the project manifest makes confirmation stale (16.672834ms)
✔ GUIDE GIT HANDOVER: a confirmed but uncommitted request refuses launch (644.211125ms)
✔ GUIDE RECOVERY: stale confirmation requires a pushed cancellation before reconfirming (1100.414958ms)
✔ GUIDE GATE: a project with a Guide manifest refuses an unconfirmed session prompt (10.0355ms)
✔ GUIDE RELAY: pushed confirmation opens the exact session and records its binding (956.692125ms)
✔ GUIDE BINDING STATUS: the session-local binding is close-bound and corruption refuses (814.010334ms)
✔ GUIDE BINDING RECOVERY: an interrupted open can bind only the matching latest session (582.849375ms)
✔ GUIDE STATUS TRUTH: corrupt launch evidence refuses instead of guessing (9.69825ms)
✔ GUIDE RUNTIME: one command binds a pushed launch and prints executable session-context commands (1481.093875ms)
✔ GUIDE RUNTIME MUTATION: an unignored runtime refuses by name (858.461625ms)
✔ GUIDE RUNTIME PLURALITY: unfinished runtimes coexist and status names each one (1150.374542ms)
✔ GUIDE RUNTIME MUTATION: a linked RUN.json refuses as unsafe state (632.894916ms)
✔ GUIDE RUNTIME STATUS TRUTH: corrupt live state refuses instead of hiding behind launch state (718.593292ms)
✔ GUIDE RUNTIME STATUS TRUTH: a forged HALTED label refuses without pushed halt evidence (552.483834ms)
✔ GUIDE GHOSTTY START: one explicit action requests Reviewer then Producer without shell evaluation (814.389542ms)
✔ GUIDE GHOSTTY MUTATION: a failed Producer request refuses duplicate automatic recovery (533.658583ms)
✔ HALT CEREMONY: void the in-flight phase, require pushed evidence, then return through a fresh Brief (6197.414125ms)
✔ HALT STATUS TRUTH: corrupt halt evidence is named and never treated as terminal (669.790125ms)
✔ HALT TERMINAL MUTATION: halt and close evidence can never coexist (19.023167ms)
✔ the approval and advancement recovery commands run exactly as printed (885.319334ms)
✔ the missing-review recovery command runs exactly as printed (1008.24275ms)
✔ a phase entry remains valid only while every prior gate proof still exists on disk (37.624542ms)
✔ INTERRUPTION SCHEMA: role, purpose, time, and evidence filenames remain one shared fail-closed contract (7.667583ms)
✔ INTERRUPTION RECOVERY: Ctrl-C kills Producer, distrusts partial artifact, and resumes the same context (1942.810208ms)
✔ INTERRUPTION RECOVERY: Ctrl-C returns a formal Reviewer job to PENDING and resumes the same context (1924.511292ms)
✔ INTERRUPTION RECOVERY: an interrupted owner conversation resumes without losing its disk-bound direction (2291.368042ms)
✔ INTERRUPTION MUTATION: missing first-turn context ID refuses automatic worker replacement (4162.162ms)
✔ the repository carries the complete GPLv3-only license and Kristian's sole copyright (3.872375ms)
✔ PACKAGED NPX SUITE: the source-controlled binary is executable before npm touches it (3.514875ms)
✔ PACKAGED NPX SUITE: the documented local npx command does not mutate its checkout (1670.000667ms)
✔ PACKAGED NPX SUITE: a real tarball installs and runs the plain-JavaScript koda binary (11624.0725ms)
✖ PLURAL LIVE RUNTIME: two independent Producer/Reviewer pairs complete without crossed sessions (46736.546916ms)
✔ RECEIPT ADVERSARIAL SUITE: an earlier review's receipt cannot approve a fresh review (27.562209ms)
✔ RECEIPT ADVERSARIAL SUITE: phase N receipt cannot approve phase N+1 (14.203333ms)
✔ RECEIPT ADVERSARIAL SUITE: outer whitespace is accepted and any inner word change refuses (35.840709ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REVISE (22.986875ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REJECT (49.443125ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override DISCUSS (10.533709ms)
✔ FULL RELAY RUNNER: preparation creates a clean pushed project with local skills (865.73775ms)
✔ FULL RELAY RUNNER: execution preserves two contexts and never automates owner receipt proof (2.726542ms)
✔ GENUINE FULL RELAY EVIDENCE: six phases, revision recovery, distinct contexts, and pushed close (22.174958ms)
✔ RELAY STATUS TRUTH: a prepared run names all roles and prints only the first safe action (873.022166ms)
✔ RELAY STATUS TRUTH: after Reviewer is alive, Producer becomes the one safe next action (903.895291ms)
✔ RELAY STATUS TRUTH: a stopped reviewer process names explicit stale-lock recovery (1106.083541ms)
✔ RELAY STATUS TRUTH: an active recorded producer is never duplicated by a blind hint (1082.934625ms)
✔ RELAY STATUS TRUTH: corrupt or ambiguous run state refuses instead of guessing (2701.609167ms)
✔ RELAY STATUS TRUTH: a corrupt waiting direction refuses immediately by name (879.894125ms)
✔ TWO-WINDOW PROTOCOL: reviewer jobs are bounded and duplicate reviewer windows refuse (22.017583ms)
✔ TWO-WINDOW VISIBILITY: progress is readable without exposing review receipts (0.511375ms)
✔ REVIEWER OPEN CONVERSATION: an idle owner question resumes the Reviewer but changes no project file (1264.292459ms)
✔ REVIEWER OPEN CONVERSATION SCOPE: project-level thought returns to Guide without mutation (1460.6625ms)
✔ REVIEWER OPEN CONVERSATION WAIT: active direction is recorded but cannot become a current-phase handback (1414.593459ms)
✔ REVIEWER OPEN CONVERSATION TTY: a real terminal line reaches the idle Reviewer prompt (1320.496708ms)
✔ TWO-WINDOW RECEIPT: exact owner quote is recorded from Window B (1330.31375ms)
✔ TWO-WINDOW RECEIPT MUTATION: a wrong quote refuses and names the preserved failed job (990.21175ms)
✔ WAIT AT FORMAL REVIEW: new direction is recorded immediately but does not revise the reviewed artifact (1054.155583ms)
✔ WAIT RECEIPT BINDING: a recorded direction survives a wrong receipt but nothing advances (973.216083ms)
✔ WAIT CONTRACT MIGRATION: the superseded same-phase handback marker refuses by name (786.981792ms)
✔ REVIEWER HALT: the sole interrupt voids the phase and pushes immutable evidence without a receipt (871.243917ms)
✔ TWO-WINDOW RELAY: a pending formal-review job wakes one persistent reviewer and returns acknowledged disk evidence (873.224958ms)
✔ TWO-WINDOW SESSION: separate producer and reviewer processes rendezvous through pushed close (3695.538916ms)
✔ REVIEW BINDING SUITE: changing review findings after owner acknowledgement refuses (92.451708ms)
✔ REVIEW BINDING SUITE: an untouched generated template cannot become an approved review (87.134125ms)
✔ a current review cannot be replaced before its receipt is recorded (36.902791ms)
✔ a revised artifact receives a fresh review, fresh receipt, and archived prior review (25.186584ms)
✔ DISCUSS requires the owner's ruling before a fresh definitive review (63.292416ms)
✔ REVIEWER FIXTURES: five sealed fixtures ship as blind Koda projects (94.723333ms)
✔ REVIEWER FIXTURES: the planted hard number is unsupported and the control has no plant (2.812459ms)
✔ REVIEWER FIXTURES: inference-chain plant requires a deduction across three source files (2.811042ms)
✔ REVIEWER FIXTURES: tempting honest control is imperfect in style but its claims execute (102.812584ms)
✔ REVIEWER FIXTURES: evidence-absence trap has working code but its claimed run record is missing (165.953958ms)
✔ REVIEWER FIXTURES: new scoring contracts still match their pre-run Git seal (79.225083ms)
✔ REVIEWER FIXTURES: Ghostty runs pin model and effort and preserve ephemeral Codex events (1.746541ms)
✔ REVIEWER FIXTURES: the bounded model matrix is backed by seventeen graded run folders (33.721875ms)
✔ SECURITY INTEGRITY SUITE: the install is dependency-free with no install hook (8.346417ms)
✔ SECURITY INTEGRITY SUITE: the committed repository contains no symbolic link (38.4565ms)
✔ SECURITY INTEGRITY SUITE: tracked text contains no common live credential signature (365.366209ms)
✔ session creation requires a prompt and numbers dated folders (102.943875ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-QTj6p9/remote.git
 * [new branch]      main -> main
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-QTj6p9/remote.git
   4f6fffd..c6ffa86  main -> main
✔ a completed session is closed only after its state is committed and pushed (5952.343125ms)
✔ immutable close refuses symbolic links inside session evidence (9.254083ms)
✔ immutable close refuses duplicate generated metadata markers (0.112042ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-ignored-remote-l83QEe/remote.git
 * [new branch]      main -> main
✔ immutable close refuses a bound session file that Git ignored instead of pushing (410.377416ms)
✔ every Koda-C skill has valid relay sections and four-line Codex metadata (37.901959ms)
✔ skill index metadata stays concise, front-loaded, and trigger-specific (9.003958ms)
✔ producer phase skills hand only to the one shared reviewer (4.710375ms)
✔ concurrent relay skills require bound session identity instead of latest-session guessing (6.631584ms)
✔ the shared reviewer keeps all phase criteria in one place (4.385375ms)
✔ in-phase consultation is disk-backed and cannot impersonate formal review (13.919042ms)
✔ session open and close remain ceremonies outside producer phase routing (4.430083ms)
✔ the session-prompt skill is the sole skill route to a future session launch (12.40275ms)
✔ the fresh Guide preflight model run is sealed, blind, ephemeral, and read-only (3.280042ms)
✔ historical fresh Codex startup discovered the original nine local skills and root guidance without reading disk (4.436084ms)
✔ fresh Codex discovers all ten current skills and the active Guide preflight refuses without mutation (4.011916ms)
✔ STALE-REVIEW BINDING: editing the artifact after review refuses with a named re-review reason (59.374958ms)
✔ STALE-REVIEW BINDING: reviewing after an edit binds the new artifact and opens (52.316417ms)
✔ STATUS TRUTH SUITE: deleting a review is reflected immediately (559.866375ms)
✔ STATUS TRUTH SUITE: blanking an artifact is reflected immediately (508.662542ms)
✔ STATUS TRUTH SUITE: corrupt ledger metadata refuses with a named corruption reason (190.996334ms)
✔ STATUS TRUTH SUITE: editing an acknowledged review is reflected immediately (290.4595ms)
✔ STATUS TRUTH SUITE: invalid state JSON refuses instead of guessing (256.857417ms)
✔ STATUS TRUTH SUITE: a path-like phase name in state refuses instead of escaping (249.6135ms)
✔ JUDGE JOURNEY SUITE: the committed binary runs without rebuilding (100.294125ms)
✔ JUDGE JOURNEY SUITE: video and submission documents preserve every live rule (10.490792ms)
✔ JUDGE JOURNEY SUITE: local links in the judge documents resolve (8.229958ms)
✔ WRITE SET: claims exact clean paths and refuses Guide or sibling overlap (323.342291ms)
✔ WRITE SET CONCURRENCY: simultaneous same-path claims cannot both succeed (233.229875ms)
✔ WRITE SET CONTAINMENT: a linked parent cannot alias a claimed output path (139.545334ms)
✔ WRITE SET CLI: explicit session identity records project-relative output ownership (180.849791ms)
✔ WRITE SET STATUS TRUTH: corrupt disk evidence refuses instead of inferring state (137.705584ms)
✔ GUIDE WRITE SET: new Guide files are explicit and active-session overlap refuses (283.239166ms)
✔ WRITE SET: unrelated Guide and sibling dirt may coexist; unclaimed dirt refuses (221.732333ms)
✔ WRITE SET MUTATION: rename and delete are exact owned changes, including both rename sides (431.213084ms)
✔ WRITE SET MUTATION: staged bytes must match the recorded post-work hash (303.61025ms)
✔ WRITE SET MUTATION: a claimed path changed after post-work observation refuses by name (189.775292ms)
✔ GIT LOCK: live owner refuses, stale lock recovers only with an empty index (207.188958ms)
✔ GIT LOCK SERIALIZATION: relay callers may wait for a live short ceremony (203.004417ms)
✔ GIT LOCK SERIALIZATION MUTATION: release between inspection steps retries instead of leaking ENOENT (81.5705ms)
✔ GIT LOCK CONTAINMENT: linked .koda cannot redirect lock evidence (89.446375ms)
ℹ tests 178
ℹ suites 0
ℹ pass 177
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 49189.181292

✖ failing tests:

test at tests/plural-runtime-integration.test.ts:49:1
✖ PLURAL LIVE RUNTIME: two independent Producer/Reviewer pairs complete without crossed sessions (46736.546916ms)
  AssertionError [ERR_ASSERTION]: Producer B failed.
  STDOUT:
  KODA-C PRODUCER WINDOW
  Producer: gpt-5.6-sol / medium
  Session: not opened yet
  Owner input: CLOSED — watch here; speak only in the Reviewer window
  This context remains the Producer for the complete configured session.

  PRODUCER 1: open the Koda session
  PRODUCER CONTEXT — 019f0000-0000-7000-8000-000000000021
  PRODUCER UPDATE
  B producer handover complete.
  PRODUCER TURN COMPLETE

  PHASE 1/1 — BRIEF
  State: ACTIVE — inputs frozen at phase entry
  Handover: Producer artifact → independent Reviewer → owner receipt → mechanical gate

  PRODUCER 2: produce brief
  PRODUCER CONTEXT — 019f0000-0000-7000-8000-000000000021
  PRODUCER UPDATE
  B producer handover complete.
  PRODUCER TURN COMPLETE

  PRODUCER HANDOVER — BRIEF
  Artifact: docs/sessions/2026-07-19-02/phases/01-brief.md
  Observed: non-empty regular artifact, 62 bytes, SHA-256 0a85c7be3be1…
  Control: passed to Window B for independent formal review; the phase remains unadvanced.

  HANDOVER TO WINDOW B — formal review of brief
  The persistent reviewer window receives this automatically. Window A will wait here.
  WINDOW B HANDOVER COMPLETE — deriving the next route from disk.

  GATE PASSED — BRIEF — 1/1 phases complete
  Evidence: artifact, independent review, verdict, owner receipt, and prior gates revalidated from disk
  Waiting direction release: none
  Next: immutable session close ceremony

  PRODUCER 3: prepare immutable session close
  PRODUCER CONTEXT — 019f0000-0000-7000-8000-000000000021
  PRODUCER UPDATE
  B producer handover complete.
  PRODUCER TURN COMPLETE

  PRODUCER 4: verify immutable session close
  PRODUCER CONTEXT — 019f0000-0000-7000-8000-000000000021
  PRODUCER UPDATE
  B producer handover complete.
  PRODUCER TURN COMPLETE

  STDERR:

  RELAY PAUSED — Unclaimed project mutation has ambiguous provenance; declare it before writing: docs/guide/runs/1df3cb42-bb84-45f6-b6db-80fe64dadcd8/GIT-EVIDENCE.json, docs/guide/runs/1df3cb42-bb84-45f6-b6db-80fe64dadcd8/GIT-LOG.txt, docs/guide/runs/1df3cb42-bb84-45f6-b6db-80fe64dadcd8/PRODUCER-01-EVENTS.jsonl, docs/guide/runs/1df3cb42-bb84-45f6-b6db-80fe64dadcd8/PRODUCER-01-STDERR.txt, docs/guide/runs/1df3cb42-bb84-45f6-b6db-80fe64dadcd8/PRODUCER-02-EVENTS.jsonl, docs/guide/runs/1df3cb42-bb84-45f6-b6db-80fe64dadcd8/PRODUCER-02-STDERR.txt, docs/guide/runs/1df3cb42-bb84-45f6-b6db-80fe64dadcd8/PRODUCER-03-EVENTS.jsonl.
  Resume with: '/opt/homebrew/Cellar/node/26.0.0/bin/node' '/Users/freeborn/Dev/koda-codex/scripts/execute-relay-run.ts' '--reviewer-window' '/private/var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-plural-live-RDqh7p/project/.koda/runs/e8476e57-df5e-4522-92a9-e8508f49ab0e'


  1 !== 0

      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/plural-runtime-integration.test.ts:224:12)
      at process.processTicksAndRejections (node:internal/process/task_queues:104:5)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async startSubtestAfterBootstrap (node:internal/test_runner/harness:385:3) {
    generatedMessage: false,
    code: 'ERR_ASSERTION',
    actual: 1,
    expected: 0,
    operator: 'strictEqual',
    diff: 'simple'
  }
```
