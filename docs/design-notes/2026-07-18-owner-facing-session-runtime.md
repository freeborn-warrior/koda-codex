# Owner-facing session runtime — 2026-07-18

This note records the mature runtime Kristian described. It is a product direction, not a claim about the current submission build.

## Desired experience

Kristian has one conversational counterpart at a time:

```text
between sessions: Kristian ↔ guide/session-prompter
during session:   Kristian ↔ reviewer ↔ disk relay ↔ producer
```

The guide maintains the project-wide conversation, reconstructable from project files. It develops a written session prompt with Kristian. After Kristian authorizes “start,” the guide may launch the session automatically; Kristian does not need to enter the producer window.

During the session, the producer runs non-interactively. It accepts no conversational input. Kristian may terminate the process, but every normal input reaches the producer only as a reviewer-authored disk artifact. The reviewer remains interactive: it explains evidence, expands implications, answers technical questions, asks Kristian for product judgments, records rulings, and relays them to the producer.

At pushed close, the owner-facing task returns to guide/session-prompter behavior.

## Runtime shape

1. Verify the previous Koda session is immutably closed, committed, and pushed.
2. The guide and Kristian produce an explicit session prompt artifact.
3. Kristian authorizes start in the guide interface.
4. A supervisor opens the Koda session and launches a producer process with conversational stdin closed.
5. The owner-facing guide context becomes the session reviewer, or hands its disk context to a reviewer process.
6. Producer and reviewer exchange only named files. A notification may point to a file but never substitute for it.
7. The reviewer may obtain owner rulings in its interface and writes them before producer work resumes.
8. Final summary, formal review, receipt, immutable close, commit, and push complete before another session can launch.
9. Ctrl-C or an equivalent signal may abort the producer; abort evidence and recovery state must be explicit rather than guessed.

## Mechanical boundary

The existing plain-file CLI remains the gate authority. A future supervisor may watch files, launch Codex processes, and send notifications, but it must not cache phase truth or bypass `status`, review binding, receipt rules, or pushed close.

A visible Ghostty producer pane can still be non-interactive by running a supervised `codex exec` process with stdin closed. The reviewer pane remains an interactive Codex task. Internally, the supervisor may need to resume or replace producer contexts at safe file handoffs while preserving the appearance and contract of one running session.

## Current gap

Koda-C currently proves the disk gate, phase skills, review/receipt relay, close, and a documented manual two-task workflow. It does not yet launch or supervise two Codex processes, watch handoffs, notify Kristian, or prevent terminal input to an interactive producer. Those are roadmap orchestration features above the core CLI.

Automatic launch should mean “after owner-approved prompt,” not “the guide independently chose product work.” Whether a later configuration permits any broader scheduling remains an owner decision.
