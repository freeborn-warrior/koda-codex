# Persistent full-relay test protocol

This harness is the next proof above Koda-C's deterministic six-phase scenarios. It runs one complete native session through two distinct persistent Codex contexts:

For the exact first-time Ghostty procedure, follow the [step-by-step Ghostty test guide](GHOSTTY-TEST-GUIDE.md).

```text
persistent producer → phase artifact → persistent reviewer → review file
       ↑                                                   ↓
       └──────── disk handback ← Koda gate ← Kristian receipt
```

The producer context opens the session, explicitly invokes the producer skill for every current phase, revises acknowledged blocking findings, and performs the separate close ceremony. The reviewer context explicitly invokes the one shared reviewer skill for every formal review and any in-phase consultation. Neither model approves a review or advances a gate.

## What this test proves

- producer and reviewer use two different persisted Codex thread IDs;
- each role is resumed rather than replaced at phase boundaries;
- model subprocesses receive closed conversational stdin;
- every phase is derived from current `state.json`, not a cached supervisor counter;
- each owner receipt is entered through Koda's interactive `approve` command;
- blocking verdicts return to the same producer and require a changed artifact plus fresh review;
- all produced project output is committed and pushed before close preparation;
- `close.md` then receives its own required commit and push before Koda derives `SESSION CLOSED`;
- event streams, stderr, transcript, final project snapshot, and a restorable Git bundle remain in this repository.

This harness does **not** yet provide the mature interactive reviewer conversation Kristian ultimately wants. The persistent reviewer runs as a supervised context and writes formal handbacks; Kristian interacts with the harness at the receipt prompt. If an in-phase response says `AWAITING OWNER`, the run pauses and names the response file rather than inventing a ruling. A later owner-facing reviewer interface may resume that same context for discussion. Abort-safe signal handling and notification delivery also remain product work; this harness does not claim an unattended production daemon.

Codex retains authentication and persistent thread runtime state in its platform-owned storage. Koda-C preserves every project-relevant output in the run folder: complete JSONL event streams, stderr, thread IDs, disk artifacts, Git evidence, and transcript. The platform cache is not represented as project evidence.

## Prepare

From the repository root, choose producer and reviewer models independently:

```bash
npm run relay:prepare -- software-clean gpt-5.6-sol medium gpt-5.6-terra medium
```

Preparation writes one run under `docs/relay-runs/`. Its copied software project contains:

- all nine repository-local Koda-C skills;
- project-specific `AGENTS.md` guidance;
- an owner-authored word-count session prompt;
- the six native phases from config;
- a clean initial Git commit pushed to a local bare remote inside ignored runtime storage;
- `RUN.json`, `RESULT.md`, and `TRANSCRIPT.md` marked `PREPARED — NOT RUN`.

Preparation does not call a model and does not create a Koda session.

## Execute and acknowledge

Run the exact command printed by preparation in Ghostty. The executor creates one persistent producer thread and one persistent reviewer thread, then resumes each by ID for its later turns.

At each formal review it pauses:

```text
OWNER ACKNOWLEDGEMENT REQUIRED
Read the complete review through its final receipt: <path>
Paste the exact RECEIPT line:
```

In the adjacent Ghostty pane, run `npm run relay:review`. The owner helper derives the one waiting run, current session, phase, and review from disk; opens the complete review; and, after the reader closes, copies the unchanged final receipt to the macOS clipboard without printing it. Paste it into Koda in Window A. The harness never enters the receipt on Kristian's behalf and does not copy it into `TRANSCRIPT.md`. The receipt remains where it belongs: the review and Koda approval ledger.

If execution is interrupted or a model turn fails, `RUN.json` keeps the last action, role thread IDs, and named pause status. Rerun the same `relay:execute` command; the supervisor re-derives current work from disk and resumes the existing role context. Initial and resumed model turns both receive the same explicit `workspace-write` sandbox so a continuation cannot silently fall back to Codex's read-only non-interactive default. `COMPLETE` runs refuse re-execution.

## Close evidence

Before immutable close, the supervisor stages, commits, and pushes all non-ignored project changes so produced source, checks, live evidence, and the completed session state are durable. The producer then invokes `koda-c-close`, which prepares `close.md`, runs Koda's printed session-specific Git commands, pushes again, and verifies `SESSION CLOSED` from both close and status.

After successful verification, the harness captures:

- `GIT-EVIDENCE.json` with branch, upstream, local/remote commit IDs, clean status, and final Koda status;
- `GIT-LOG.txt`;
- `PROJECT-HISTORY.bundle`, verified by `git bundle verify`;
- all producer and reviewer event/stderr files;
- the complete copied project and relay transcript.

It then removes only the copied project's nested `.git` directory and ignored runtime remote so the evidence can be committed normally to the parent Koda-C repository. The verified bundle preserves the nested history for restoration.

## Honest status

A prepared folder is not a run. A model exit is not a graded success. A completed phase count is not a closed session. Only `RESULT.md: Status: COMPLETE`, distinct thread IDs, six persisted advancements, verified owner acknowledgements, and pushed-close Git evidence constitute this full-relay proof.
