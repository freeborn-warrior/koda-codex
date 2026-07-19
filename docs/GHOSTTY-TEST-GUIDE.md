# Koda-C terminal testing in Ghostty

## New Guide-launched route — built, not owner-tested yet

The intended three-context start now has one opt-in command after Guide has created, confirmed, committed, and pushed a fresh `READY_TO_LAUNCH` prompt:

```bash
node dist/cli.js guide launch --producer-model gpt-5.6-sol --producer-effort medium --reviewer-model gpt-5.6-terra --reviewer-effort medium --open ghostty
```

Run it from the target project's existing Guide conversation. It should leave that Guide open, then request a labeled Reviewer window and a labeled Producer window. Do not run it in this repository merely to experiment when no fresh confirmed prompt exists; the entry checks will refuse.

The automatic path has deterministic argument/order/failure tests but has not yet been watched by Kristian on screen. If either requested window does not appear, do not repeat the command. Run `node dist/cli.js guide status` and use only the exact recovery command it prints. A blind retry refuses because one window may already exist.

## Historical manual two-window proof

The remainder of this guide preserves the earlier owner-observed session proof. Window A is the visible producer/supervisor. Its conversational input is closed. Window B owns one separate persistent reviewer context for the whole bounded session. The enclosing Guide context was not part of this historical run.

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

At each producer stop, Window A prints a `PRODUCER HANDOVER` or `PRODUCER PAUSED` block derived from disk. It names the artifact or consultation, observed byte count and short hash when applicable, and which window now has control. This is a factual summary, not hidden model thinking.

## Window B — reviewer and owner

```bash
cd /Users/freeborn/Dev/koda-codex
npm run relay:reviewer
```

Leave this running too. It discovers the same run and waits. When Window A posts a handover, Window B automatically resumes the same persistent reviewer context. There is no phase-specific command to copy.

While Window A is working, Window B shows `reviewer> `. Type an active-session question there and press Return. The same Reviewer context answers from current disk evidence, then returns to the prompt. Ordinary explanation changes no project file. A project-level thought is marked for Guide. Direction is marked `OWNER DIRECTION — WAIT FOR GATE` and written immediately under the session's `directions/` folder, bound to the frozen phase entry and the artifact/review state observed when it arrived. Producer does not receive it until the next successful gate.

For a formal review, Window B shows the reviewer progress and then says `REVIEW READY`. It asks you to press Return, opens the complete review, and waits while you read it:

1. Read the verdict and every finding.
2. Press Space to move down when needed.
3. Read through the final receipt line.
4. Press `q` when finished.
5. Back in Window B, choose what you need:
   - press Return to acknowledge;
   - type `d` to ask the same reviewer a question about the review;
   - type `r` to reread the complete review;
   - type `h` to halt the whole session attempt and enter the fresh-Brief direction;
   - type `p` to stop the relay safely without changing phase inputs.
6. Explanation questions resume the same reviewer context, alter no files, and return to this menu. Ask as many as needed.
7. If discussion introduces new product direction, Window B records it immediately and says `DIRECTION RECORDED — WAITING FOR GATE`. Acknowledging the review still judges the unchanged artifact against its frozen entry contract. There is no send-now or same-phase revision choice.
8. When you acknowledge, the exact receipt is on the macOS clipboard. Press Command–V and Return when Koda asks in this same window.
9. If Koda asks for comments or a `DISCUSS` ruling, type that answer in Window B too.

The reviewer console never prints the receipt into its readable progress stream, and Kristian's acknowledgement input is never sent as a model message. The raw reviewer event evidence may contain the generated receipt because the reviewer creates and validates the review that contains it; the receipt is not treated as a secret. A changed review or wrong quote refuses, writes no approval, and leaves a named failed job on disk. After a valid acknowledgement, Window A re-reads the gate and automatically advances, revises, or requests a fresh review according to the verdict.

Window B prints a disk-derived `REVIEWER HANDOVER` after a consultation answer or acknowledgement. It names the response, review, or waiting-direction path and says that Window A regains control; the gate still decides the route.

The reviewer can explain findings, evidence, implications, and `DISCUSS` options without changing the review. Waiting direction binds Kristian's verbatim statement, the Reviewer classification, phase entry, current artifact hash or explicit absence, and current review hash when one exists. On advancement, `state.json` releases its ID to the receiving phase, whose artifact must read and cite it. If Kristian chooses `h`, Window B instead creates immutable `halt.md`, commits and pushes the bound session, and tells Window A to stop; the next session must start through a fresh Brief citing the halt and waiting direction IDs.

For an in-phase owner question, Window B displays the reviewer's recorded question, accepts Kristian's answer there, resumes the same reviewer context, and requires the answer to be written into the consultation response before Window A continues.

## One-session and one-reviewer invariants

The two commands discover rather than guess. They refuse if more than one unfinished run exists. A lock directory refuses a second Window B process for the same run. Producer and reviewer share the run and session only through files; their Codex context IDs must remain distinct. A new Koda session cannot open until the prior immutable close or explicit halt is committed and pushed.

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

At any time, a third terminal—or either window after it stops—can show the truth without changing it:

```bash
cd /Users/freeborn/Dev/koda-codex
npm run relay:status
```

It reports the run, session, phase, both context IDs and turn counts, reviewer-console process, disk job, last error, and the next safe command. It refuses ambiguous or corrupt run state rather than choosing one. If the computer killed Window B without letting it clean up, status names the stopped process and prints the explicit recovery command:

```bash
npm run relay:reviewer -- --recover-stale-lock
```

That command removes a lock only after the recorded process is no longer alive. It refuses to displace a running reviewer window.

## Successful ending

Normal success exists only when Window A prints `RELAY COMPLETE` and Window B prints `SESSION CLOSED`. An explicit interrupt instead ends with `RELAY HALTED` / `SESSION HALTED`, a pushed `halt.md`, no advancement for the voided phase, and a required return to Guide for a fresh Brief.

## Current honest boundary

This slice proves the automatic producer-to-reviewer wake-up, one persistent Window B reviewer, a terminal-backed conversation prompt while Producer works, same-window review explanations and exact receipt acknowledgement, an owner-ruling loop for in-phase consultations, and readable progress derived from actual Codex events. The historical manual route remains a repository relay harness around the bounded `software-clean` scenario; the newer Guide launcher connects the same runtime to a real project but still needs owner-observed proof.

Ordinary explanation between handoffs is deliberately non-mutating. Product decisions entered through `DISCUSS` or consultation prompts are disk-backed; new direction is also disk-backed immediately but waits for the next gate. Pause-inject-resume does not exist. Notification transport, remote control, a polished split-pane interface, and broader crash recovery remain later layers.

## Safety boundaries

- Never paste a review receipt into Codex chat or documentation.
- Do not manually edit artifacts or reviews while either role is working.
- Use the Koda prompt in Window B for acknowledgement; do not edit the ledger.
- Do not start another run while this one is active.
