# First two-window runtime slice

**Date:** 2026-07-18

**Status:** Implemented and deterministically tested; live two-window owner run still pending

## Why this became the active product milestone

The first genuine relay proved that one producer context and one separate reviewer context could persist through a full six-phase session. It did not yet deliver the experience Kristian described. Both model contexts ran invisibly behind Window A, while Window B only opened a review and copied a receipt. Kristian correctly identified that the project was not finished merely because its backend proof and submission materials existed.

The active target therefore moved back from judge polish to the product relay itself. This is intentional scope discovery, not an attempt to bury unfinished behavior: using the prototype exposed that “two context IDs exist” and “the owner works with one visible reviewer beside a visible producer” are materially different promises.

## Implemented relay

```text
Window A                                      Window B
non-interactive persistent producer           persistent owner-facing reviewer
        │                                                │
        ├─ writes artifact                               │
        ├─ atomically writes REVIEWER-JOB.json ─────────▶│
        ├─ waits                                         ├─ resumes same reviewer context
        │                                                ├─ writes review/response artifact
        │                                                ├─ owner reads complete review
        │                                                ├─ Koda records exact owner quote
        │◀──────── COMPLETE job + disk evidence ─────────┤
        └─ Koda re-reads gate and derives route           └─ waits for next handover
```

- `npm run relay:producer` discovers exactly one unfinished run and refuses ambiguity.
- `npm run relay:reviewer` discovers the same run and holds a single-process reviewer-window lock.
- Reviewer jobs are atomic JSON with a unique ID, bounded kind, phase, relative expected path, purpose, prompt, and explicit status.
- Formal review, repair, fresh-review, consultation, and owner-only acknowledgement are distinct job kinds.
- Window B persists reviewer context ID and turn count separately so it never races Window A's supervisor record.
- If Window A stops after Window B has completed but before cleanup, resume consumes the completed job idempotently and re-derives the owner acknowledgement count from the ledger instead of incrementing cached state.
- A read-only `relay:status` command reconstructs the current run, phase, contexts, lock process, job, error, and next safe action directly from disk. It refuses corrupt or multiple unfinished runs.
- A stale reviewer lock is never removed merely because a second window asks. Explicit `--recover-stale-lock` succeeds only when the recorded process is no longer alive; a live process still refuses.
- At `REVIEW READY`, Kristian may reread, ask the same persistent reviewer explanation questions, acknowledge, or pause. Explanation turns are preserved as reviewer events but alter no file and do not become producer input.
- A new owner product direction is mechanically different from an explanation: the reviewer emits the exact handoff-required marker, the job records `OWNER_DIRECTION_HANDOFF_REQUIRED`, acknowledgement remains paused, and the ledger stays untouched until a future named handback can carry it.
- Both panes render model-emitted messages, completed checks, file changes, context IDs, and turn completion from raw Codex events. The complete JSONL remains evidence.
- Protected review metadata and receipt lines are removed from the readable event rendering.
- Window B snapshots the complete review before opening it and refuses if it changes while being read.
- Koda still requires Kristian's exact receipt quote. Window B may copy the phrase after reading, but it never submits it silently or sends Kristian's acknowledgement input as a model message. The reviewer necessarily sees the generated receipt while creating and validating its own review; raw reviewer events may therefore contain it.
- In-phase `AWAITING OWNER` questions remain in the reviewer window. Kristian's answer returns to the same reviewer context and must be written into the response artifact before the producer resumes.

## Receipt boundary

The new console does not make receipts cryptographically unforgeable. It preserves the existing mechanical claim: a valid ledger entry must agree with the exact phase, review ID, full review hash, artifact hash, verdict, unique receipt, and attributable approver. A wrong quote refuses and writes nothing.

A same-user writer who can coherently rewrite all project evidence can still forge history. Preventing that requires a separate identity/signing authority, not another unkeyed hash in the same writable repository. The runtime must not trade the explicit owner action away merely to look automatic.

## Tests added

The first test draft accidentally reversed the expected process exit codes for valid and invalid quotes. The product behaved correctly—valid returned zero, invalid returned one—but the run was 98/100. The assertions were corrected without changing product code.

The corrected tests prove:

- unsafe reviewer job paths refuse;
- a second Window B lock refuses;
- progress rendering removes receipt and protected-metadata lines;
- an exact quote in Window B writes one Kristian approval;
- a wrong quote exits nonzero, writes no ledger entry, and preserves a failed job;
- a pending formal-review job wakes a fake persistent reviewer context, writes a definitive review, shows redacted progress, and returns acknowledged disk evidence.

No live model was called by these deterministic tests. A full one-phase simulation now starts Window A and Window B as separate processes, uses distinct fake persistent context IDs, wakes the reviewer through the real job file, records the exact quote, advances, commits and pushes, prepares immutable close, and ends both windows from `COMPLETE`. A genuine live-model two-window full-session run is still required before calling this runtime proved in use.

## Still missing

- Free-form owner/reviewer conversation between formal handoffs.
- A general artifact for actionable owner direction that begins as arbitrary reviewer conversation.
- Guide-authored, owner-confirmed session prompt and automatic two-context launch.
- Project adaptation beyond the bounded software fixture.
- Guided recovery when Ctrl-C or a platform failure occurs during a model turn.
- External notifications, remote control, and a graphical split-pane interface.

The next safe product step is free-form reviewer discussion with a rule that no actionable owner direction reaches the producer until the reviewer serializes it into a named disk handback. The current disk gate remains the only phase authority.
