# Owner-facing session runtime — 2026-07-18

This note records the mature runtime Kristian described and the first shipped two-window slice toward it. The desired experience remains broader than the current harness.

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

## Visible role stream and turn summaries

The two-window relay now renders agent messages, completed checks, file changes, context identity, and turn completion from the real JSONL event stream while preserving the full raw events. Receipt and protected review-metadata lines are removed from the readable progress rendering. It also prints supervisor-derived handover summaries from current disk: producer artifact path, byte count, short hash and next control; consultation request/response; review path, verdict binding, acknowledgement outcome and next control. These facts no longer depend on each model's natural closing-message quality.

The producer pane should show the current phase, entry-check outcome, exposed reasoning summaries, tool and file activity, verification commands, artifact path, and whether it handed over or paused for consultation. Its closing message should say what artifact was produced, what was actually checked, what remains unresolved, and that control passed to the reviewer. It must not invite owner input.

The reviewer pane should show the current review or consultation mode, evidence being inspected, exposed reasoning summaries, verification activity, definitive verdict, review/response path, required-revision count or owner question, and resulting gate state. Its closing message should explain the actionable outcome to Kristian without printing the receipt; the receipt remains inside the complete review opened through the owner-reading flow.

These are visibility and comprehension features, not new authority. Rendered status and turn handovers come from the event stream and current disk state, never from a separate optimistic UI cache. A polished summary cannot substitute for the artifact, formal review, receipt, or gate check. Hidden private chain-of-thought remains outside the product claim.

## Current bridge and gap

Koda-C proves the disk gate, phase skills, review/receipt relay, close, deterministic full-session scenarios, and a documented manual two-task workflow. A repository harness now prepares and supervises two persistent Codex thread IDs with closed stdin, watches disk handoffs, pauses for Kristian's actual receipt, commits produced output, and preserves pushed-close Git evidence. The first genuine run reached `COMPLETE` after exposing and recovering from real resume, owner-interface, review, and close defects; its transcript, event streams, restored Git bundle, and test result are preserved in the repository.

The first runtime slice now separates execution across the two visible windows. Window A owns the non-interactive producer and supervisor. It posts one bounded `REVIEWER-JOB.json` and waits. Window B holds a single-process lock, owns the persistent reviewer context, automatically receives formal-review and consultation work, shows readable event progress, opens the complete review, and runs the exact receipt acknowledgement in that same owner-facing window. A wrong quote leaves the approval ledger untouched and preserves a named failed job. An in-phase `AWAITING OWNER` response is shown in Window B; Kristian's answer is returned to the same reviewer context and must be written into the response artifact before the producer resumes.

Window B now permits repeated explanation turns at a formal-review decision point using the same persistent reviewer context. Kristian may reread, discuss, acknowledge, or pause. Explanation turns alter no files. If the owner introduces a new product direction outside the formal review, a required marker and job state keep acknowledgement paused until Kristian explicitly sends or discards it. A sent direction is serialized with the verbatim owner statement, reviewer relay, artifact hash, review ID, and review hash; the receipt remains mandatory. Window A consumes it before advancement, the producer must revise and cite it, and Koda requires a fresh review because the old one is stale.

The remaining gap is substantial but narrower: Window B is not yet conversational while the producer is working; the launcher remains tied to a prepared relay fixture rather than an adapted real project; Ctrl-C during a model turn is preserved as explicit failure but lacks guided retry/replace-context recovery; and there are no external notifications or graphical split panes. The implemented event renderer shows exposed messages and activity, not hidden chain-of-thought. None of these unbuilt layers may be implied by the automatic reviewer wake-up.

Automatic launch should mean “after owner-approved prompt,” not “the guide independently chose product work.” Whether a later configuration permits any broader scheduling remains an owner decision.
