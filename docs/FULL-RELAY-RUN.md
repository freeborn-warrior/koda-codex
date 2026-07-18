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
- the persistent producer prepares and validates immutable `close.md`;
- the trusted supervisor performs the exact session-specific Git commit and push because Codex's least-privilege workspace sandbox protects `.git` metadata;
- the same producer context resumes to verify the unchanged binding and both Koda close commands before `SESSION CLOSED` is accepted;
- event streams, stderr, transcript, final project snapshot, and a restorable Git bundle remain in this repository.

The original executor still preserves the completed backend proof exactly as run. A new two-window mode now moves reviewer execution and owner acknowledgement into Window B: Window A posts one atomic reviewer job and waits; Window B resumes one persistent reviewer context, streams its emitted progress, opens the complete review, and runs Koda's exact-receipt prompt in that same window. An in-phase `AWAITING OWNER` response is also resolved through Window B and written to the response artifact before the producer continues.

This is the first owner-facing slice, not the mature interface. Window B does not yet support arbitrary free-form discussion between formal handoffs, the prepared scenario is still the bounded software fixture, and a process stopped during a model turn requires explicit recovery rather than an inferred retry. Notification delivery and a general Guide-launched project runtime also remain product work; the harness does not claim an unattended production daemon.

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

## Execute and acknowledge — current two-window mode

Start the two persistent sides once:

```bash
# Window A
npm run relay:producer

# Window B
npm run relay:reviewer
```

Each command discovers the only unfinished run and refuses ambiguity. Window B stays open and receives formal review or consultation jobs automatically. At `REVIEW READY`, Kristian opens the complete review and quotes the copied exact receipt into Koda in Window B. The readable progress renderer removes receipt lines, and Kristian's acknowledgement input is not submitted as a model message. Raw reviewer events may contain the generated receipt because the reviewer creates the review that contains it. Window A consumes only the completed job plus disk gate state and then derives the route.

The six deterministic two-window tests cover bounded job paths, a single reviewer-window lock, progress receipt redaction, successful same-window acknowledgement, wrong-receipt refusal with an untouched ledger, a pending formal job waking a persistent reviewer context, and separate producer/reviewer processes rendezvousing through phase advancement and pushed close.

## Historical single-supervisor mode

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

Before immutable close, the supervisor stages, commits, and pushes all non-ignored project changes so produced source, checks, live evidence, and the completed session state are durable. The producer then invokes `koda-c-close` in supervised mode and prepares and validates `close.md`. Codex's `workspace-write` sandbox deliberately protects `.git`, so the trusted supervisor—not the model—stages exactly the prepared session path, makes the honest close commit, and pushes it. The same persistent producer context is then resumed to recompute the binding and verify `SESSION CLOSED` from both close and status.

After successful verification, the harness captures:

- `GIT-EVIDENCE.json` with branch, upstream, local/remote commit IDs, clean status, and final Koda status;
- `GIT-LOG.txt`;
- `PROJECT-HISTORY.bundle`, verified by `git bundle verify`;
- all producer and reviewer event/stderr files;
- the complete copied project and relay transcript.

It then removes only the copied project's nested `.git` directory and ignored runtime remote so the evidence can be committed normally to the parent Koda-C repository. The verified bundle preserves the nested history for restoration.

## Honest status

A prepared folder is not a run. A model exit is not a graded success. A completed phase count is not a closed session. Only `RESULT.md: Status: COMPLETE`, distinct thread IDs, six persisted advancements, verified owner acknowledgements, and pushed-close Git evidence constitute this full-relay proof.
