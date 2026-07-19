# Per-test result — 2026-07-19-whole-product-audit-final

- Result: **PASS**
- Recorded at: 2026-07-19T06:53:22.363Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `b3cdeec`
- Command: `/opt/homebrew/Cellar/node/26.0.0/bin/node --experimental-test-coverage --test --test-reporter=spec tests/config.test.ts tests/direction.test.ts tests/dogfood.test.ts tests/full-lifecycle.test.ts tests/gate.test.ts tests/guide-runtime-integration.test.ts tests/guide.test.ts tests/halt.test.ts tests/hints.test.ts tests/history.test.ts tests/interruption.test.ts tests/license.test.ts tests/package.test.ts tests/receipt-adversarial.test.ts tests/relay-runner.test.ts tests/relay-status.test.ts tests/relay-window.test.ts tests/review-binding.test.ts tests/review.test.ts tests/reviewer-fixtures.test.ts tests/security.test.ts tests/session.test.ts tests/skill.test.ts tests/stale-review.test.ts tests/status-truth.test.ts tests/submission.test.ts`

Every discovered test and subtest is named below. No result is aggregated away.

```text
✔ the default phase chain is configurable data in the required order (3.008041ms)
✔ config validation rejects unsafe session paths and drifting phase names (0.454375ms)
✔ config validation refuses a sessions directory that resolves outside the project (17.497583ms)
✔ WAIT DIRECTION: record now, keep current contract frozen, and release only through advance (220.821791ms)
✔ WAIT DIRECTION MUTATION: citing a queued direction before its gate refuses split provenance (19.58675ms)
✔ WAIT DIRECTION CARRY: final-boundary direction becomes a hashed next-session Brief input (40.941333ms)
✔ WAIT DIRECTION MUTATION: changed prose and symbolic-link evidence refuse by name (13.060125ms)
✔ WAIT DIRECTION CONTAINMENT: a linked direction directory cannot redirect writes (10.514709ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-direction-boundary-jiwob0/remote.git
 * [new branch]      main -> main
✔ WAIT FINAL BOUNDARY: a new session prompt must cite direction released by the final gate (929.280083ms)
✔ the committed dogfood snapshot contains the full native chain and an internally bound close (30.194542ms)
✔ FULL LIFECYCLE SCENARIO: clean approvals traverse all six phases and pushed close (752.382667ms)
✔ FULL LIFECYCLE SCENARIO: a REVISE loop recovers in plan before completing and closing (681.029916ms)
✔ FULL LIFECYCLE SCENARIO: DISCUSS records an owner ruling and requires a fresh live review (711.688792ms)
✔ a complete artifact, review, allowed verdict, unique receipt, and ledger proof open the gate (59.097708ms)
▶ GATE MUTATION SUITE: each core condition refuses and names itself
  ✔ artifact exists (10.386334ms)
  ✔ artifact is non-empty (10.46425ms)
  ✔ artifact is a regular file (12.704167ms)
  ✔ review exists (11.011ms)
  ✔ review is a regular file (12.737625ms)
  ✔ approval ledger is a regular file (17.248875ms)
  ✔ verdict REVISE is blocking (31.224542ms)
  ✔ verdict REJECT is blocking (23.762125ms)
  ✔ verdict DISCUSS is blocking (17.17625ms)
  ✔ current receipt is quoted verbatim in the ledger (8.654584ms)
✔ GATE MUTATION SUITE: each core condition refuses and names itself (157.562959ms)
✔ outer receipt whitespace is ignored but inner bytes remain literal (30.777292ms)
▶ every gate condition fails closed when deliberately broken
  ✔ artifact missing (9.753333ms)
  ✔ artifact empty (11.672417ms)
  ✔ review missing (13.989959ms)
  ✔ verdict line missing (18.939125ms)
  ✔ verdict unknown (24.323708ms)
  ✔ receipt missing from last line (15.05775ms)
  ✔ generated review metadata missing (13.83575ms)
  ✔ duplicate generated review metadata is ambiguous (13.989834ms)
  ✔ review metadata names a different phase (16.070208ms)
  ✔ artifact changed after review (21.59925ms)
  ✔ final receipt differs from generated receipt (12.719333ms)
  ✔ receipt reused by another review (13.747292ms)
  ✔ approval ledger missing (12.888583ms)
  ✔ exact receipt absent from ledger (21.53425ms)
  ✔ approver missing (16.525292ms)
  ✔ APPROVE WITH COMMENTS has no ledger comments (15.223958ms)
  ✔ REVISE blocks even with receipt proof (11.515542ms)
  ✔ REJECT blocks even with receipt proof (12.110084ms)
  ✔ DISCUSS blocks without an owner ruling (20.526542ms)
  ✔ DISCUSS still blocks after the ruling until a fresh review (18.165167ms)
✔ every gate condition fails closed when deliberately broken (316.793583ms)
✔ GUIDE REAL-PROJECT RELAY: two processes return pushed close evidence without replacing Git (6887.887834ms)
✔ GUIDE ENTRY: an active prior session refuses a new launch request and names it (34.998583ms)
✔ GUIDE PREFLIGHT: an active session blocks a conceptually competing session before drafting (18.521ms)
✔ GUIDE PREFLIGHT CONTROL: a project with no active session permits exactly one draft (16.229541ms)
✔ GUIDE HALT RETURN: a pushed halt and every waiting direction must enter a fresh confirmed Brief (1479.054334ms)
✔ GUIDE CONFIRMATION: one request binds prompt, manifest, continuity, and owner (11.122875ms)
✔ GUIDE MUTATION: changing only a continuity file makes confirmation stale (12.021542ms)
✔ GUIDE MUTATION: changing only the prompt makes confirmation stale (13.104ms)
✔ GUIDE MUTATION: changing only the project manifest makes confirmation stale (11.289375ms)
✔ GUIDE GIT HANDOVER: a confirmed but uncommitted request refuses launch (493.987958ms)
✔ GUIDE RECOVERY: stale confirmation requires a pushed cancellation before reconfirming (648.619667ms)
✔ GUIDE GATE: a project with a Guide manifest refuses an unconfirmed session prompt (10.109584ms)
✔ GUIDE RELAY: pushed confirmation opens the exact session and records its binding (666.642292ms)
✔ GUIDE BINDING STATUS: the session-local binding is close-bound and corruption refuses (608.9855ms)
✔ GUIDE BINDING RECOVERY: an interrupted open can bind only the matching latest session (367.305708ms)
✔ GUIDE STATUS TRUTH: corrupt launch evidence refuses instead of guessing (16.321667ms)
✔ GUIDE RUNTIME: one command binds a pushed launch and prints executable session-context commands (997.289834ms)
✔ GUIDE RUNTIME MUTATION: an unignored runtime refuses by name (565.927125ms)
✔ GUIDE RUNTIME MUTATION: another unfinished runtime blocks a new session (661.451625ms)
✔ GUIDE RUNTIME MUTATION: a linked RUN.json refuses as unsafe state (450.341ms)
✔ GUIDE RUNTIME STATUS TRUTH: corrupt live state refuses instead of hiding behind launch state (446.184958ms)
✔ GUIDE RUNTIME STATUS TRUTH: a forged HALTED label refuses without pushed halt evidence (385.982292ms)
✔ GUIDE GHOSTTY START: one explicit action requests Reviewer then Producer without shell evaluation (675.15575ms)
✔ GUIDE GHOSTTY MUTATION: a failed Producer request refuses duplicate automatic recovery (419.965709ms)
✔ HALT CEREMONY: void the in-flight phase, require pushed evidence, then return through a fresh Brief (2878.548292ms)
✔ HALT STATUS TRUTH: corrupt halt evidence is named and never treated as terminal (381.656083ms)
✔ HALT TERMINAL MUTATION: halt and close evidence can never coexist (28.367542ms)
✔ the approval and advancement recovery commands run exactly as printed (665.36425ms)
✔ the missing-review recovery command runs exactly as printed (689.974958ms)
✔ a phase entry remains valid only while every prior gate proof still exists on disk (41.199083ms)
✔ INTERRUPTION SCHEMA: role, purpose, time, and evidence filenames remain one shared fail-closed contract (2.249208ms)
✔ INTERRUPTION RECOVERY: Ctrl-C kills Producer, distrusts partial artifact, and resumes the same context (1653.473375ms)
✔ INTERRUPTION RECOVERY: Ctrl-C returns a formal Reviewer job to PENDING and resumes the same context (1634.346042ms)
✔ INTERRUPTION RECOVERY: an interrupted owner conversation resumes without losing its disk-bound direction (1645.546791ms)
✔ INTERRUPTION MUTATION: missing first-turn context ID refuses automatic worker replacement (3158.962167ms)
✔ the repository carries the complete GPLv3-only license and Kristian's sole copyright (6.182125ms)
✔ PACKAGED NPX SUITE: the source-controlled binary is executable before npm touches it (7.202209ms)
✔ PACKAGED NPX SUITE: the documented local npx command does not mutate its checkout (1554.297417ms)
✔ PACKAGED NPX SUITE: a real tarball installs and runs the plain-JavaScript koda binary (7029.11675ms)
✔ RECEIPT ADVERSARIAL SUITE: an earlier review's receipt cannot approve a fresh review (50.659083ms)
✔ RECEIPT ADVERSARIAL SUITE: phase N receipt cannot approve phase N+1 (30.780334ms)
✔ RECEIPT ADVERSARIAL SUITE: outer whitespace is accepted and any inner word change refuses (22.513875ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REVISE (10.991375ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REJECT (11.673458ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override DISCUSS (11.81875ms)
✔ FULL RELAY RUNNER: preparation creates a clean pushed project with local skills (685.053375ms)
✔ FULL RELAY RUNNER: execution preserves two contexts and never automates owner receipt proof (1.169667ms)
✔ GENUINE FULL RELAY EVIDENCE: six phases, revision recovery, distinct contexts, and pushed close (14.436084ms)
✔ RELAY STATUS TRUTH: a prepared run names all roles and prints only the first safe action (720.724209ms)
✔ RELAY STATUS TRUTH: after Reviewer is alive, Producer becomes the one safe next action (699.069542ms)
✔ RELAY STATUS TRUTH: a stopped reviewer process names explicit stale-lock recovery (746.517625ms)
✔ RELAY STATUS TRUTH: an active recorded producer is never duplicated by a blind hint (650.132042ms)
✔ RELAY STATUS TRUTH: corrupt or ambiguous run state refuses instead of guessing (1646.358375ms)
✔ RELAY STATUS TRUTH: a corrupt waiting direction refuses immediately by name (510.60275ms)
✔ TWO-WINDOW PROTOCOL: reviewer jobs are bounded and duplicate reviewer windows refuse (22.953084ms)
✔ TWO-WINDOW VISIBILITY: progress is readable without exposing review receipts (0.285625ms)
✔ REVIEWER OPEN CONVERSATION: an idle owner question resumes the Reviewer but changes no project file (930.4535ms)
✔ REVIEWER OPEN CONVERSATION SCOPE: project-level thought returns to Guide without mutation (968.550708ms)
✔ REVIEWER OPEN CONVERSATION WAIT: active direction is recorded but cannot become a current-phase handback (991.452333ms)
✔ REVIEWER OPEN CONVERSATION TTY: a real terminal line reaches the idle Reviewer prompt (856.931041ms)
✔ TWO-WINDOW RECEIPT: exact owner quote is recorded from Window B (799.058291ms)
✔ TWO-WINDOW RECEIPT MUTATION: a wrong quote refuses and names the preserved failed job (579.1215ms)
✔ WAIT AT FORMAL REVIEW: new direction is recorded immediately but does not revise the reviewed artifact (808.913791ms)
✔ WAIT RECEIPT BINDING: a recorded direction survives a wrong receipt but nothing advances (732.039459ms)
✔ WAIT CONTRACT MIGRATION: the superseded same-phase handback marker refuses by name (658.684666ms)
✔ REVIEWER HALT: the sole interrupt voids the phase and pushes immutable evidence without a receipt (729.706416ms)
✔ TWO-WINDOW RELAY: a pending formal-review job wakes one persistent reviewer and returns acknowledged disk evidence (791.906542ms)
✔ TWO-WINDOW SESSION: separate producer and reviewer processes rendezvous through pushed close (3254.713791ms)
✔ REVIEW BINDING SUITE: changing review findings after owner acknowledgement refuses (19.950708ms)
✔ REVIEW BINDING SUITE: an untouched generated template cannot become an approved review (11.82375ms)
✔ a current review cannot be replaced before its receipt is recorded (19.538834ms)
✔ a revised artifact receives a fresh review, fresh receipt, and archived prior review (9.812958ms)
✔ DISCUSS requires the owner's ruling before a fresh definitive review (59.121375ms)
✔ REVIEWER FIXTURES: five sealed fixtures ship as blind Koda projects (46.089959ms)
✔ REVIEWER FIXTURES: the planted hard number is unsupported and the control has no plant (1.263125ms)
✔ REVIEWER FIXTURES: inference-chain plant requires a deduction across three source files (1.181875ms)
✔ REVIEWER FIXTURES: tempting honest control is imperfect in style but its claims execute (78.587166ms)
✔ REVIEWER FIXTURES: evidence-absence trap has working code but its claimed run record is missing (91.831042ms)
✔ REVIEWER FIXTURES: new scoring contracts still match their pre-run Git seal (42.600125ms)
✔ REVIEWER FIXTURES: Ghostty runs pin model and effort and preserve ephemeral Codex events (1.664084ms)
✔ REVIEWER FIXTURES: the bounded model matrix is backed by seventeen graded run folders (30.103709ms)
✔ SECURITY INTEGRITY SUITE: the install is dependency-free with no install hook (4.983791ms)
✔ SECURITY INTEGRITY SUITE: the committed repository contains no symbolic link (21.091208ms)
✔ SECURITY INTEGRITY SUITE: tracked text contains no common live credential signature (205.460167ms)
✔ session creation requires a prompt and numbers dated folders (19.261334ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-RXMbDv/remote.git
 * [new branch]      main -> main
✔ a completed session is closed only after its state is committed and pushed (1911.366791ms)
✔ immutable close refuses symbolic links inside session evidence (10.816584ms)
✔ immutable close refuses duplicate generated metadata markers (0.11425ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-ignored-remote-jN5pSJ/remote.git
 * [new branch]      main -> main
✔ immutable close refuses a bound session file that Git ignored instead of pushing (359.071292ms)
✔ every Koda-C skill has valid relay sections and four-line Codex metadata (11.465666ms)
✔ skill index metadata stays concise, front-loaded, and trigger-specific (3.798625ms)
✔ producer phase skills hand only to the one shared reviewer (3.009417ms)
✔ the shared reviewer keeps all phase criteria in one place (1.934667ms)
✔ in-phase consultation is disk-backed and cannot impersonate formal review (2.309958ms)
✔ session open and close remain ceremonies outside producer phase routing (1.129625ms)
✔ the session-prompt skill is the sole skill route to a future session launch (2.833375ms)
✔ the fresh Guide preflight model run is sealed, blind, ephemeral, and read-only (0.444417ms)
✔ historical fresh Codex startup discovered the original nine local skills and root guidance without reading disk (1.8225ms)
✔ fresh Codex discovers all ten current skills and the active Guide preflight refuses without mutation (1.106667ms)
✔ STALE-REVIEW BINDING: editing the artifact after review refuses with a named re-review reason (32.572208ms)
✔ STALE-REVIEW BINDING: reviewing after an edit binds the new artifact and opens (20.470208ms)
✔ STATUS TRUTH SUITE: deleting a review is reflected immediately (379.432583ms)
✔ STATUS TRUTH SUITE: blanking an artifact is reflected immediately (352.821125ms)
✔ STATUS TRUTH SUITE: corrupt ledger metadata refuses with a named corruption reason (162.742208ms)
✔ STATUS TRUTH SUITE: editing an acknowledged review is reflected immediately (171.61575ms)
✔ STATUS TRUTH SUITE: invalid state JSON refuses instead of guessing (153.449625ms)
✔ STATUS TRUTH SUITE: a path-like phase name in state refuses instead of escaping (173.559167ms)
✔ JUDGE JOURNEY SUITE: the committed binary runs without rebuilding (97.942416ms)
✔ JUDGE JOURNEY SUITE: video and submission documents preserve every live rule (5.926292ms)
✔ JUDGE JOURNEY SUITE: local links in the judge documents resolve (7.885125ms)
ℹ tests 157
ℹ suites 0
ℹ pass 157
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 13798.152584
ℹ start of coverage report
ℹ ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
ℹ file                               | line % | branch % | funcs % | uncovered lines
ℹ ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
ℹ scripts                            |        |          |         |
ℹ  execute-relay-run.ts              |  80.02 |    47.50 |   81.13 | 129-130 135-136 139-140 149-150 155-156 198-199 210-211 220-224 279-283 311-315 317-321 333-337 352-356 362-367 369-374 376-379 392-398 419 422 427 432-438 470-483 498-499 509-515 527-529 561-565 630 648 651-667 669-701 706-707 710-711 761-762 775-776 779-780 792-793 814-820 908-909 913 922 934 943-944 952-953 979-980 1000-1001 1138-1152 1196-1198 1200-1202 1205-1223 1229 1232-1245 1247-1252
ℹ  prepare-relay-run.ts              |  96.67 |    50.00 |  100.00 | 37-39 178-180
ℹ  read-relay-review.ts              |  88.29 |    18.52 |   50.00 | 26-29 50-51 55-56 79-80 106-108
ℹ  relay-interruption.ts             |  95.16 |    75.00 |  100.00 | 32 46-47
ℹ  relay-run-location.ts             |  85.71 |    46.67 |  100.00 | 55-56 60-61 64-65 71-72 77-78 81-82
ℹ  relay-window-protocol.ts          |  92.50 |    78.57 |   95.00 | 111-113 133-134 226-227 256-257 267-271 273-279
ℹ  run-relay-reviewer-window.ts      |  84.14 |    48.72 |   77.50 | 65 75-78 145-147 157-159 172-173 175 214-215 258-259 269-281 297-298 321-322 343-344 347-348 356-357 424-452 458-460 487-507 520-521 539-543 571 599-600 602-603 686-694
ℹ  show-relay-status.ts              |  91.08 |    46.15 |   66.67 | 77-78 95-96 175-181 185-187 191 202 207 212-213
ℹ src                                |        |          |         |
ℹ  cli.ts                            | 100.00 |   100.00 |  100.00 |
ℹ  close.ts                          |  92.02 |    84.62 |   80.00 | 67-69 77-78 81-82 85-86 141-143 146
ℹ  commands.ts                       |  84.56 |    43.14 |   93.55 | 267-270 291-292 294-295 300-316 344-345 365-366 369-370 372-373 375-376 381-382 387-389 391-393 414-416 475-479 483-487 501-505 522-526 541-545 551-566 572-575 586
ℹ  config.ts                         |  79.37 |    75.00 |   85.71 | 42-48 53-54 64-65 73-74 78-79 97-100 107-108 118-122
ℹ  direction.ts                      |  96.33 |    78.49 |   92.31 | 101-102 113-114 143-144 161-162 174-175 236-237
ℹ  gate.ts                           |  97.51 |    98.73 |  100.00 | 186-190
ℹ  ghostty.ts                        |  93.02 |    52.63 |   83.33 | 33 35-36 75-76 100-103
ℹ  git.ts                            |  85.27 |    62.22 |  100.00 | 18-20 24-26 47-49 51 78-79 87-89 100-101 105-106
ℹ  guide-commands.ts                 |  78.46 |    72.73 |   57.14 | 46-56 147-148 162-171 174-185 197-204 215-216 218-219 249-250 254-260
ℹ  guide-runtime.ts                  |  95.38 |    66.27 |   94.12 | 82-83 85-86 91-92 131-134 136 173-174 232-233
ℹ  guide.ts                          |  93.25 |    71.93 |   92.31 | 82-83 94-95 144-145 166-168 213-214 217-218 232-233 306-308 361-362 407-410 421-422 430-431 443-444 457-458 529-530 562-563 565-566 589-590
ℹ  halt.ts                           |  92.97 |    64.00 |  100.00 | 42-44 106-107 117-118 123-124
ℹ  history.ts                        |  86.49 |    83.33 |   66.67 | 32-36
ℹ  project.ts                        |  91.41 |    78.13 |  100.00 | 12-17 96-97 142-143 152-153 155-156 159-160 162-163 165-166 228-229
ℹ  receipt.ts                        |  94.19 |    83.54 |  100.00 | 60-61 80-81 84-85 190-192 208-209 237-238 240-241
ℹ  types.ts                          | 100.00 |   100.00 |  100.00 |
ℹ tests                              |        |          |         |
ℹ  fixtures                          |        |          |         |
ℹ   reviewer                         |        |          |         |
ℹ    tempting-honest                 |        |          |         |
ℹ     project                        |        |          |         |
ℹ      evidence                      |        |          |         |
ℹ       check.mjs                    | 100.00 |   100.00 |  100.00 |
ℹ      src                           |        |          |         |
ℹ       collect-labels.mjs           | 100.00 |   100.00 |  100.00 |
ℹ  helpers.ts                        | 100.00 |   100.00 |  100.00 |
ℹ ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
ℹ all files                          |  88.28 |    65.80 |   88.09 |
ℹ ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
ℹ end of coverage report
```
