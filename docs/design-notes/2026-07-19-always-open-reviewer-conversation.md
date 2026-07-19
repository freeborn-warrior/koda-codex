# Always-open Reviewer conversation

**Date:** 2026-07-19  
**Status:** Implemented and deterministically tested; owner-observed full session pending

## Decision

Window B is not merely a job reader. It owns one persistent active-session Reviewer context and keeps a real `reviewer> ` prompt available while Producer works as well as between formal handoffs. Kristian may ask about the current session without waiting for a review or consultation artifact.

Guide has the same conversational continuity at project scope. The difference is altitude, not whether conversation stays open:

- Guide holds the project path, future sessions, backlog, and ideas beyond the active session;
- Reviewer holds the bounded active session, its evidence, decisions, and handoffs;
- Producer remains visible and non-interactive after launch.

## Mechanical boundary

An idle Reviewer question resumes the same saved reviewer context in explicit `owner conversation` mode. The answer may explain disk-backed purpose, progress, evidence, uncertainty, and consequences. It may not edit a file, create a review, approve, advance, or claim that Producer received the exchange.

Two exact classifications keep scope legible:

- `GUIDE CONVERSATION — PROJECT SCOPE` returns wider project thinking to Guide;
- `OWNER DIRECTION — ACTIVE SESSION TRANSFER REQUIRED` makes possible direction visible.

The runtime renders the second case as `OWNER DIRECTION — NOT SENT`. It changes no project file, does not pause or steer Producer, and names the missing mechanism honestly. The shipped formal-review owner-handback binds direction to an active review and receipt. Reusing it outside that decision point would silently invent different authority, so idle active-session transfer remains a separate owner decision.

Likewise, Guide conversation cannot silently change the confirmed session snapshot. Any Guide decision that must affect active work needs an explicit disk-backed transfer into Reviewer before it can enter Producer's evidence loop.

## Test evidence

The deterministic slice proves three distinct cases:

1. a pipe-driven active-session question invokes the `resume` path with the already saved Reviewer context ID, increments its saved turn count, and changes no project file;
2. a project-level thought returns to Guide without creating a handback or project mutation;
3. adversarial actionable direction creates no owner-handback and is named as unsent;
4. a real macOS pseudo-terminal displays `reviewer> `, accepts one typed line, receives the Reviewer response, exits cleanly, and leaves the project unchanged.

The pseudo-terminal fixture uses the installed `/usr/bin/expect`; it validates the actual terminal-input branch that ordinary captured-process tests cannot reach. The shared `koda-c-review` package also passes Codex's system skill validator.

These tests prove deterministic routing and non-mutation with a fake Codex subprocess. They do not prove that a live model will classify every ambiguous message correctly, that Ghostty displayed the complete three-context arrangement, or that Kristian finds the interaction sufficiently clear. Those remain owner-observed product tests.
