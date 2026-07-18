# Per-test result — 2026-07-18-expanded-core-initial

- Result: **FAIL**
- Recorded at: 2026-07-18T13:42:55.483Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `971b546`
- Command: `/opt/homebrew/Cellar/node/26.0.0/bin/node --test --test-reporter=spec tests/config.test.ts tests/dogfood.test.ts tests/gate.test.ts tests/hints.test.ts tests/history.test.ts tests/receipt-adversarial.test.ts tests/review.test.ts tests/session.test.ts tests/skill.test.ts tests/stale-review.test.ts tests/status-truth.test.ts`

Every discovered test and subtest is named below. No result is aggregated away.

```text
✔ the default phase chain is configurable data in the required order (1.125333ms)
✔ config validation rejects unsafe session paths and drifting phase names (0.4755ms)
✔ the committed dogfood snapshot contains a complete, internally bound close (39.471917ms)
✔ a complete artifact, review, allowed verdict, unique receipt, and ledger proof open the gate (25.219542ms)
▶ GATE MUTATION SUITE: each core condition refuses and names itself
  ✔ artifact exists (8.300709ms)
  ✔ artifact is non-empty (8.024167ms)
  ✔ review exists (6.684292ms)
  ✔ verdict REVISE is blocking (8.279334ms)
  ✔ verdict REJECT is blocking (7.5955ms)
  ✔ verdict DISCUSS is blocking (8.388542ms)
  ✔ current receipt is quoted verbatim in the ledger (6.332042ms)
✔ GATE MUTATION SUITE: each core condition refuses and names itself (54.595334ms)
✔ outer receipt whitespace is ignored but inner bytes remain literal (11.787209ms)
▶ every gate condition fails closed when deliberately broken
  ✔ artifact missing (5.254583ms)
  ✔ artifact empty (6.468042ms)
  ✔ review missing (5.924667ms)
  ✔ verdict line missing (10.10625ms)
  ✔ verdict unknown (5.528292ms)
  ✔ receipt missing from last line (10.518916ms)
  ✔ generated review metadata missing (7.737459ms)
  ✔ artifact changed after review (7.154417ms)
  ✔ final receipt differs from generated receipt (6.729084ms)
  ✔ receipt reused by another review (7.236459ms)
  ✔ approval ledger missing (4.952791ms)
  ✔ exact receipt absent from ledger (4.799417ms)
  ✔ approver missing (4.911958ms)
  ✔ APPROVE WITH COMMENTS has no ledger comments (4.730291ms)
  ✔ REVISE blocks even with receipt proof (5.843708ms)
  ✔ REJECT blocks even with receipt proof (5.255667ms)
  ✔ DISCUSS blocks without an owner ruling (4.662417ms)
  ✔ DISCUSS still blocks after the ruling until a fresh review (5.4485ms)
✔ every gate condition fails closed when deliberately broken (115.034167ms)
✔ the approval and advancement recovery commands run exactly as printed (459.210459ms)
✔ the missing-review recovery command runs exactly as printed (381.083125ms)
✖ a phase entry remains valid only while every prior gate proof still exists on disk (29.955208ms)
✔ RECEIPT ADVERSARIAL SUITE: an earlier review's receipt cannot approve a fresh review (25.586959ms)
✔ RECEIPT ADVERSARIAL SUITE: phase N receipt cannot approve phase N+1 (9.564083ms)
✔ RECEIPT ADVERSARIAL SUITE: outer whitespace is accepted and any inner word change refuses (15.567667ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REVISE (7.631667ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override REJECT (7.380875ms)
✔ RECEIPT ADVERSARIAL SUITE: exact receipt cannot override DISCUSS (8.009958ms)
✔ a current review cannot be replaced before its receipt is recorded (27.385208ms)
✔ a revised artifact receives a fresh review, fresh receipt, and archived prior review (10.90875ms)
✔ DISCUSS requires the owner's ruling before a fresh definitive review (16.11875ms)
✔ session creation requires a prompt and numbers dated folders (17.1885ms)
To /var/folders/kq/gnsj2lq94m3dysw58_dnwrjw0000gn/T/koda-close-test-g5QnyQ/remote.git
 * [new branch]      main -> main
✔ a completed session is closed only after its state is committed and pushed (841.092834ms)
✔ every Koda-C skill has valid relay sections and four-line Codex metadata (26.895917ms)
✔ producer phase skills hand only to the one shared reviewer (2.801333ms)
✔ the shared reviewer keeps all phase criteria in one place (3.474208ms)
✔ session open and close remain ceremonies outside producer phase routing (0.67525ms)
✔ STALE-REVIEW BINDING: editing the artifact after review refuses with a named re-review reason (15.190917ms)
✔ STALE-REVIEW BINDING: reviewing after an edit binds the new artifact and opens (10.138459ms)
✔ STATUS TRUTH SUITE: deleting a review is reflected immediately (207.004625ms)
✔ STATUS TRUTH SUITE: blanking an artifact is reflected immediately (196.838958ms)
✔ STATUS TRUTH SUITE: corrupt ledger metadata refuses with a named corruption reason (94.295291ms)
✔ STATUS TRUTH SUITE: invalid state JSON refuses instead of guessing (99.382ms)
ℹ tests 56
ℹ suites 0
ℹ pass 55
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 1028.847042

✖ failing tests:

test at tests/history.test.ts:10:1
✖ a phase entry remains valid only while every prior gate proof still exists on disk (29.955208ms)
  AssertionError [ERR_ASSERTION]: The expression evaluated to a falsy value:
  
    assert(broken.some((item) => item.phase === "brief" && item.message.includes("changed after this review")))
  
      at TestContext.<anonymous> (file:///Users/freeborn/Dev/koda-codex/tests/history.test.ts:42:3)
      at async Test.run (node:internal/test_runner/test:1208:7)
      at async startSubtestAfterBootstrap (node:internal/test_runner/harness:385:3) {
    generatedMessage: true,
    code: 'ERR_ASSERTION',
    actual: false,
    expected: true,
    operator: '==',
    diff: 'simple'
  }
```
