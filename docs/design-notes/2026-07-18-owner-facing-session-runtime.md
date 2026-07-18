# Owner-facing session runtime — 2026-07-18

This note records the mature runtime Kristian described. It is a product direction, not a claim about the current submission build.

## Desired experience

Kristian has one conversational counterpart at a time:

```text
between sessions: Kristian ↔ guide/session-prompter
during session:   Kristian ↔ reviewer ↔ disk relay ↔ producer
```

The guide maintains the project-wide conversation, reconstructable from project files. It develops a written session prompt with Kristian. After Kristian authorizes “start,” the guide may launch the session automatically; Kristian does not need to enter the producer window.

During the session, producer and reviewer remain visible side by side for the full session. The producer runs non-interactively: Kristian can watch its available progress stream, tool activity, explanations, and handoffs, and may terminate the process, but cannot type into it. Every normal input reaches the producer only as a reviewer-authored disk artifact. The reviewer remains interactive: Kristian can discuss anything he notices in the producer pane, ask for explanation, expand implications, make product judgments, and have the reviewer record and relay the resulting action.

There is exactly one persistent producer context and one separate persistent reviewer context per session. Neither is recreated at phase boundaries. “Independent review” means the reviewer never inherits the producer's conversation or authors the producer artifact; it does not mean a context-free reviewer is substituted for every formal review. Reviewer continuity across Brief, Orient, Plan, Produce, Live, and Summary is an intentional part of the product because it lets Kristian and the reviewer follow the work's development together.

At pushed close, the owner-facing task returns to guide/session-prompter behavior.

## Runtime shape

1. Verify the previous Koda session is immutably closed, committed, and pushed.
2. The guide and Kristian produce an explicit session prompt artifact.
3. Kristian authorizes start in the guide interface.
4. A supervisor opens the Koda session and launches a producer process with conversational stdin closed.
5. One visible, persistent reviewer context becomes Kristian's interactive session counterpart; one separate, visible producer context remains non-interactive for the same session lifetime.
6. Producer and reviewer exchange only named files. A notification may point to a file but never substitute for it.
7. The reviewer may obtain owner rulings in its interface and writes them before producer work resumes.
8. Final summary, formal review, receipt, immutable close, commit, and push complete before another session can launch.
9. Ctrl-C or an equivalent signal may abort the producer; abort evidence and recovery state must be explicit rather than guessed.

## Mechanical boundary

The existing plain-file CLI remains the gate authority. A future supervisor may watch files, launch Codex processes, and send notifications, but it must not cache phase truth or bypass `status`, review binding, receipt rules, or pushed close.

A visible Ghostty producer pane can still be non-interactive by running a supervised `codex exec` process with stdin closed. The reviewer pane remains one interactive Codex task. The supervisor may resume each persistent thread at safe file handoffs, but must not silently replace either context between phases. If a platform failure forces replacement, that is explicit recovery state rather than ordinary operation.

Visibility means the progress information the platform legitimately exposes. Koda-C does not claim access to hidden private chain-of-thought; it can show emitted reasoning summaries, messages, tool calls, file changes, and phase milestones when the runtime surface provides them.

## Current bridge and gap

Koda-C proves the disk gate, phase skills, review/receipt relay, close, deterministic full-session scenarios, and a documented manual two-task workflow. A repository harness now prepares and supervises two persistent Codex thread IDs with closed stdin, watches disk handoffs, pauses for Kristian's actual receipt, commits produced output, and preserves pushed-close Git evidence. Until a genuine run reaches `COMPLETE`, that is implemented test machinery rather than end-to-end proof.

The harness still does not show the producer's full progress stream in its own read-only pane or provide the mature interactive reviewer conversation, external notifications, or robust signal/abort recovery. Its two model contexts are persistent and separate, but currently run behind one supervisor while Window B is only a review reader. An in-phase `AWAITING OWNER` response pauses with named disk state; it does not yet open a discussion loop in the reviewer context. Those remain orchestration work above the core CLI and must not be implied by a successful scripted relay.

Automatic launch should mean “after owner-approved prompt,” not “the guide independently chose product work.” Whether a later configuration permits any broader scheduling remains an owner decision.
