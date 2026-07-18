# Koda-C two-window relay in Ghostty

This is the current owner-facing runtime preview. Window A is the visible producer/supervisor. Its conversational input is closed. Window B owns one separate persistent reviewer context for the whole session and is the only place Kristian interacts.

The first completed relay remains preserved at [`relay-runs/2026-07-18-software-clean-sol-medium-terra-medium-01`](relay-runs/2026-07-18-software-clean-sol-medium-terra-medium-01/RESULT.md). Do not rerun that closed evidence. Prepare a new run for another live test.

## Prepare once

In either Ghostty window:

```bash
cd /Users/freeborn/Dev/koda-codex
npm run relay:prepare -- software-clean gpt-5.6-sol medium gpt-5.6-terra medium
```

Preparation creates exactly one new run. It does not call either model and does not open a Koda session.

## Window A — producer

```bash
cd /Users/freeborn/Dev/koda-codex
npm run relay:producer
```

Leave this running. It discovers the one prepared run, starts or resumes the non-interactive producer, and streams the role's emitted updates, completed checks, file changes, and turn endings. When an artifact is ready, Window A writes one reviewer job to disk and waits. It does not run the reviewer itself in this mode.

## Window B — reviewer and owner

```bash
cd /Users/freeborn/Dev/koda-codex
npm run relay:reviewer
```

Leave this running too. It discovers the same run and waits. When Window A posts a handover, Window B automatically resumes the same persistent reviewer context. There is no phase-specific command to copy.

For a formal review, Window B shows the reviewer progress and then says `REVIEW READY`. It asks you to press Return, opens the complete review, and waits while you read it:

1. Read the verdict and every finding.
2. Press Space to move down when needed.
3. Read through the final receipt line.
4. Press `q` when finished.
5. The exact receipt is now on the macOS clipboard. When Koda asks in this same window, press Command–V and Return.
6. If Koda asks for comments or a `DISCUSS` ruling, type that answer in Window B too.

The reviewer console never prints the receipt into its readable progress stream, and Kristian's acknowledgement input is never sent as a model message. The raw reviewer event evidence may contain the generated receipt because the reviewer creates and validates the review that contains it; the receipt is not treated as a secret. A changed review or wrong quote refuses, writes no approval, and leaves a named failed job on disk. After a valid acknowledgement, Window A re-reads the gate and automatically advances, revises, or requests a fresh review according to the verdict.

For an in-phase owner question, Window B displays the reviewer's recorded question, accepts Kristian's answer there, resumes the same reviewer context, and requires the answer to be written into the consultation response before Window A continues.

## One-session and one-reviewer invariants

The two commands discover rather than guess. They refuse if more than one unfinished run exists. A lock directory refuses a second Window B process for the same run. Producer and reviewer share the run and session only through files; their Codex context IDs must remain distinct. A new Koda session still cannot open until the prior immutable close is committed and pushed.

## Stopping and resuming

Ctrl-C preserves the run, reviewer job, context IDs, and last action. A completed Window B job is consumed idempotently on Window A resume, with acknowledgement count re-derived from the ledger. The current slice still names a reviewer process that stopped mid-model-turn as requiring explicit recovery rather than guessing whether the turn completed. Stronger guided recovery is backlog work.

To resume Window A:

```bash
cd /Users/freeborn/Dev/koda-codex
npm run relay:producer
```

To resume Window B when no stale lock is present:

```bash
cd /Users/freeborn/Dev/koda-codex
npm run relay:reviewer
```

Do not prepare another run merely because one window paused. Do not delete `REVIEWER-JOB.json`; it is the recovery evidence.

## Successful ending

Success exists only when Window A prints `RELAY COMPLETE` and Window B prints `SESSION CLOSED`. The run's `RESULT.md` must say `Status: COMPLETE`, show distinct context IDs, record every phase advancement and owner acknowledgement, and name the pushed close commit.

## Current honest boundary

This slice proves the automatic producer-to-reviewer wake-up, one persistent Window B reviewer, same-window exact receipt acknowledgement, an owner-ruling loop for in-phase consultations, and readable progress derived from actual Codex events. It is still a repository relay harness around the bounded `software-clean` scenario—not yet the general project launcher or the Guide-started experience.

Window B does not yet offer a free-form reviewer conversation between formal handoffs. Product decisions entered through defined `DISCUSS` or consultation prompts are disk-backed; arbitrary conversational owner directions are deliberately not relayed yet. Notification transport, remote control, a polished split-pane interface, and complete abort recovery remain later layers.

## Safety boundaries

- Never paste a review receipt into Codex chat or documentation.
- Do not manually edit artifacts or reviews while either role is working.
- Use the Koda prompt in Window B for acknowledgement; do not edit the ledger.
- Do not start another run while this one is active.
