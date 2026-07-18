# Per-test result — 2026-07-18-disk-role-handovers-final

- Result: **PASS**
- Recorded at: 2026-07-18T19:25:49.641Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `45c18be`
- Command: `/opt/homebrew/Cellar/node/26.0.0/bin/node --test --test-reporter=spec tests/config.test.ts tests/dogfood.test.ts tests/full-lifecycle.test.ts tests/gate.test.ts tests/hints.test.ts tests/history.test.ts tests/license.test.ts tests/package.test.ts tests/receipt-adversarial.test.ts tests/relay-runner.test.ts tests/relay-status.test.ts tests/relay-window.test.ts tests/review-binding.test.ts tests/review.test.ts tests/reviewer-fixtures.test.ts tests/security.test.ts tests/session.test.ts tests/skill.test.ts tests/stale-review.test.ts tests/status-truth.test.ts tests/submission.test.ts`

Every discovered test and subtest is named below. No result is aggregated away.

```text
✔ the default phase chain is configurable data in the required order (1.200791ms)
✔ config validation rejects unsafe session paths and drifting phase names (0.180917ms)
✔ config validation refuses a sessions directory that resolves outside the project (9.905125ms)
✔ the committed dogfood snapshot contains the full native chain and an internally bound close (42.592875ms)
✔ FULL LIFECYCLE SCENARIO: clean approvals traverse all six phases and pushed close (617.926708ms)
✔ FULL LIFECYCLE SCENARIO: a REVISE loop recovers in plan before completing and closing (629.058458ms)
✔ FULL LIFECYCLE SCENARIO: DISCUSS records an owner ruling and requires a fresh live review (545.993959ms)
✔ a complete artifact, review, allowed verdict, unique receipt, and ledger proof open the gate (49.838208ms)
▶ GATE MUTATION SUITE: each core condition refuses and names itself
  ✔ artifact exists (9.616792ms)
  ✔ artifact is non-empty (9.06ms)
  ✔ artifact is a regular file (8.591875ms)
  ✔ review exists (8.092875ms)
  ✔ review is a regular file (9.255292ms)
  ✔ approval ledger is a regular file (12.160292ms)
  ✔ verdict REVISE is blocking (11.157666ms)
  ✔ verdict REJECT is blocking (9.148083ms)
  ✔ verdict DISCUSS is blocking (7.445792ms)
  ✔ current receipt is quoted verbatim in the ledger (10.131625ms)
✔ GATE MUTATION SUITE: each core condition refuses and names itself (96.110209ms)
✔ outer receipt whitespace is ignored but inner bytes remain literal (20.327958ms)
▶ every gate condition fails closed when deliberately broken
  ✔ artifact missing (9.671167ms)
  ✔ artifact empty (6.804292ms)
  ✔ review missing (7.395792ms)
  ✔ verdict line missing (10.2605ms)
  ✔ verdict unknown (10.57325ms)
  ✔ receipt missing from last line (8.212417ms)
  ✔ generated review metadata missing (7.936667ms)
  ✔ duplicate generated review metadata is ambiguous (8.72925ms)
  ✔ review metadata names a different phase (10.934ms)
  ✔ artifact changed after review (9.760166ms)
  ✔ final receipt differs from generated receipt (9.903833ms)
  ✔ receipt reused by another review (10.708041ms)
  ✔ approval ledger missing (8.866167ms)
  ✔ exact receipt absent from ledger (11.686875ms)
  ✔ approver missing (10.715042ms)
  ✔ APPROVE WITH COMMENTS has no ledger comments (10.966125ms)
  ✔ REVISE blocks even with receipt proof (11.622542ms)
  ✔ REJECT blocks even with receipt proof (8.550042ms)
  ✔ DISCUSS blocks without an owner ruling (11.145875ms)
  ✔ DISCUSS still blocks after the ruling until a fresh review (11.43675ms)
✔ every gate condition fails closed when deliberately broken (198.075959ms)
✔ the approval and advancement recovery commands run exactly as printed (587.628084ms)
✔ the missing-review recovery command runs exactly as printed (541.32675ms)
✔ a phase entry remains valid only while every prior gate proof still exists on disk (42.760542ms)
✔ the repository carries the complete GPLv3-only license and Kristian's sole copyright (4.975041ms)
✔ PACKAGED NPX SUITE: the source-controlled binary is executable before npm touches it (8.694625ms)
✔ PACKAGED NPX SUITE: the documented local npx command does not mutate its checkout (1219.749042ms)
✔ PACKAGED NPX SUITE: a real tarball installs and runs the plain-JavaScript koda binary (2811.646584ms)
✔ RECEIPT ADVERSARIAL SUITE: an earlier review's receipt cannot approve a fresh review (25.138875ms)
✔ RECEIPT ADVERSARIAL SUITE: phase N receipt cannot approve phase N+1 (21.740625ms)
✔ RECEIPT ADVERSARIAL SUITE: outer whitespace is accepted and any inner word change refuses (20.443959ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REVISE (11.357125ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REJECT (10.097125ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override DISCUSS (6.743209ms)
✔ FULL RELAY RUNNER: preparation creates a clean pushed project with local skills (733.51775ms)
✔ FULL RELAY RUNNER: execution preserves two contexts and never automates owner receipt proof (1.808833ms)
✔ GENUINE FULL RELAY EVIDENCE: six phases, revision recovery, distinct contexts, and pushed close (26.325667ms)
✔ RELAY STATUS TRUTH: a prepared run names both windows and exact safe commands (673.815958ms)
✔ RELAY STATUS TRUTH: a stopped reviewer process names explicit stale-lock recovery (589.145583ms)
✔ RELAY STATUS TRUTH: an active recorded producer is never duplicated by a blind hint (487.810667ms)
✔ RELAY STATUS TRUTH: corrupt or ambiguous run state refuses instead of guessing (1121.802125ms)
✔ RELAY STATUS TRUTH: a corrupt owner handback refuses immediately by name (415.170834ms)
✔ TWO-WINDOW PROTOCOL: reviewer jobs are bounded and duplicate reviewer windows refuse (40.787833ms)
✔ TWO-WINDOW VISIBILITY: progress is readable without exposing review receipts (0.790333ms)
✔ TWO-WINDOW RECEIPT: exact owner quote is recorded from Window B (786.398084ms)
✔ TWO-WINDOW RECEIPT MUTATION: a wrong quote refuses and names the preserved failed job (667.835709ms)
✔ OWNER DISCUSSION SAFETY: a new product direction stays paused without a disk handback (624.833042ms)
✔ OWNER HANDBACK RELAY: an explicitly sent direction is bound to disk before acknowledgement (724.616833ms)
✔ OWNER HANDBACK RECEIPT BINDING: a handback remains unusable after a wrong receipt (693.8455ms)
✔ OWNER HANDBACK MUTATION: changed prose and symbolic-link evidence refuse (660.374375ms)
✔ OWNER HANDBACK CONTAINMENT: a linked handback directory cannot redirect writes (417.0325ms)
✔ TWO-WINDOW RELAY: a pending formal-review job wakes one persistent reviewer and returns acknowledged disk evidence (730.902542ms)
✔ TWO-WINDOW SESSION: separate producer and reviewer processes rendezvous through pushed close (4082.642958ms)
✔ REVIEW BINDING SUITE: changing review findings after owner acknowledgement refuses (28.317958ms)
✔ REVIEW BINDING SUITE: an untouched generated template cannot become an approved review (13.837791ms)
✔ a current review cannot be replaced before its receipt is recorded (23.244792ms)
✔ a revised artifact receives a fresh review, fresh receipt, and archived prior review (32.16625ms)
✔ DISCUSS requires the owner's ruling before a fresh definitive review (65.129375ms)
✔ REVIEWER FIXTURES: five sealed fixtures ship as blind Koda projects (28.287833ms)
✔ REVIEWER FIXTURES: the planted hard number is unsupported and the control has no plant (1.208458ms)
✔ REVIEWER FIXTURES: inference-chain plant requires a deduction across three source files (0.812875ms)
✔ REVIEWER FIXTURES: tempting honest control is imperfect in style but its claims execute (60.70425ms)
✔ REVIEWER FIXTURES: evidence-absence trap has working code but its claimed run record is missing (75.749541ms)
✔ REVIEWER FIXTURES: new scoring contracts still match their pre-run Git seal (50.662584ms)
✔ REVIEWER FIXTURES: Ghostty runs pin model and effort and preserve ephemeral Codex events (0.677375ms)
✔ REVIEWER FIXTURES: the bounded model matrix is backed by seventeen graded run folders (42.002666ms)
✔ SECURITY INTEGRITY SUITE: the install is dependency-free with no install hook (4.388125ms)
✔ SECURITY INTEGRITY SUITE: the committed repository contains no symbolic link (13.589084ms)
✔ SECURITY INTEGRITY SUITE: tracked text contains no common live credential signature (145.285459ms)
✔ session creation requires a prompt and numbers dated folders (18.884ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-yTFqGc/remote.git
 * [new branch]      main -> main
✔ a completed session is closed only after its state is committed and pushed (1477.18775ms)
✔ immutable close refuses symbolic links inside session evidence (7.944792ms)
✔ immutable close refuses duplicate generated metadata markers (0.097917ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-ignored-remote-vaqkn9/remote.git
 * [new branch]      main -> main
✔ immutable close refuses a bound session file that Git ignored instead of pushing (233.221083ms)
✔ every Koda-C skill has valid relay sections and four-line Codex metadata (7.117042ms)
✔ skill index metadata stays concise, front-loaded, and trigger-specific (5.908125ms)
✔ producer phase skills hand only to the one shared reviewer (2.181208ms)
✔ the shared reviewer keeps all phase criteria in one place (1.542417ms)
✔ in-phase consultation is disk-backed and cannot impersonate formal review (3.161834ms)
✔ session open and close remain ceremonies outside producer phase routing (1.049166ms)
✔ fresh Codex startup discovers all nine local skills and root guidance without reading disk (3.756875ms)
✔ STALE-REVIEW BINDING: editing the artifact after review refuses with a named re-review reason (21.734542ms)
✔ STALE-REVIEW BINDING: reviewing after an edit binds the new artifact and opens (68.474542ms)
✔ STATUS TRUTH SUITE: deleting a review is reflected immediately (252.015833ms)
✔ STATUS TRUTH SUITE: blanking an artifact is reflected immediately (227.125416ms)
✔ STATUS TRUTH SUITE: corrupt ledger metadata refuses with a named corruption reason (115.870875ms)
✔ STATUS TRUTH SUITE: editing an acknowledged review is reflected immediately (114.064375ms)
✔ STATUS TRUTH SUITE: invalid state JSON refuses instead of guessing (114.084709ms)
✔ STATUS TRUTH SUITE: a path-like phase name in state refuses instead of escaping (125.037083ms)
✔ JUDGE JOURNEY SUITE: the committed binary runs without rebuilding (79.23125ms)
✔ JUDGE JOURNEY SUITE: video and submission documents preserve every live rule (3.403417ms)
✔ JUDGE JOURNEY SUITE: local links in the judge documents resolve (3.116625ms)
ℹ tests 112
ℹ suites 0
ℹ pass 112
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 9781.271583
```
