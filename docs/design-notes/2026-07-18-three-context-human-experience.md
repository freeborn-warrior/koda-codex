# Three-context human experience

**Date:** 2026-07-18
**Status:** First one-action Ghostty adapter implemented and deterministic; live owner experience pending

## The product is a ceremony, not a collection of commands

Koda-C's deterministic gates are its foundation, but the finished product experience must make the relay understandable and satisfying for a human who does not write code. A refusal is not an implementation error or an edge case. It is one of the product's signature moments: calm, specific, evidence-backed, and paired with one safe next action.

The complete experience is now best understood as three visible, persistent contexts:

1. **Guide — the ongoing project conversation.** Kristian plans the path here before a session. It confirms and launches the bounded session, remains conversationally available for project-level thinking while that session runs, and receives the pushed return after close.
2. **Producer — the visible workshop.** It works without owner input. Kristian may watch its progress, phase transitions, evidence used, artifact summaries, and handovers, but cannot steer it directly during the session.
3. **Reviewer — the active session conversation.** This is the only context Kristian talks to while the producer session is active. It receives every producer handoff, discusses reviews and product decisions with him, records every actionable response on disk, and releases the producer only through mechanical evidence.

The bounded session still contains two independent working contexts: Producer and Reviewer. Guide is the enclosing project context, not a third author inside the session. Guide and Reviewer may both hold ongoing owner conversations, but their scopes are different:

- talk with **Guide** about the project, path, future sessions, new ideas, and changes above or beyond the active session;
- talk with **Reviewer** about the active session, its findings, consultations, and owner decisions;
- never talk directly to **Producer** after session start.

An active session is bound to its confirmed snapshot. Guide conversation or steering-file changes cannot silently alter that running session. If a Guide-level decision truly needs to affect it, Koda-C needs an explicit disk-backed transfer into Reviewer, followed by the appropriate owner/review evidence, before Producer may use it. That transfer protocol is not implemented yet.

## What the CLI must make obvious

The mature terminal adapter should make this arrangement feel like one launch, not terminal administration:

- one confirmed Guide action launches or arranges all required visible contexts without ending the Guide conversation;
- every context has a permanent human label and clearly states whether owner input is open or closed;
- Producer streams useful progress summaries without exposing or pretending to expose private chain-of-thought;
- each phase ends with a concise artifact and handover summary;
- Reviewer announces new work, explains formal findings conversationally, and makes the owner action unmistakable;
- status and refusal messages use plain language, name the exact failed evidence, and offer one executable recovery action;
- a close visibly returns cited evidence to the ongoing Guide conversation.

Exact commands remain valuable as transparent recovery evidence. They should not be the normal experience Kristian must assemble by hand.

## Why this matters to product quality

Koda-C is not complete merely because the backend can resume Codex contexts and enforce hashes, receipts, reviews, and pushed close. The human ceremony is how those mechanics become a coherent product rather than a headless proof. Its central interaction is unusually quiet: work stops for a good reason, the reason is legible, the right person engages with the evidence, and progress resumes without ambiguity.

The competition criteria brought this risk into focus, but the response is a product requirement rather than a video-only defense. A demonstration should reveal the real experience that exists; it must not be asked to disguise unfinished interaction design.

## Evidence and honest limits

The first owner-observed relay proved two separate session contexts and caught an unplanned Summary defect. The new Guide runtime deterministically proves the enclosing launch and return mechanics against a real Git project. A later slice adds a continuously conversational Reviewer prompt between handoffs. The combined experience still needs owner-observed three-context proof and richer phase narration.

The first macOS adapter now makes the intended arrangement one explicit command: `koda guide launch ... --open ghostty`. It records launch intent, requests a labeled Reviewer first and Producer second, keeps Guide as the existing conversation, passes direct process arguments rather than a shell-evaluated command, and refuses duplicate automatic opening. A partial GUI request leaves exact manual recovery commands on disk.

The adapter has been tested with an injected macOS opener, not by launching real windows during unattended development. The Reviewer prompt has deterministic pipe and real pseudo-terminal coverage, but no owner-observed full session yet. Rich phase narration and the explicit Guide/idle-direction transfer remain product work. Historical documents may accurately call the first run a two-window proof. Current roadmap language must distinguish that evidence from the three-context finished experience.
