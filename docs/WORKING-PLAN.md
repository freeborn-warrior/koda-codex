# Koda-C working plan

**Last updated:** 2026-07-19

This file records the current engineering direction above individual implementation steps. `PROJECT.md` explains what Koda-C is, `BACKLOG.md` tracks the visible work/evidence queue, and this plan states the sequence currently being pursued. Conversation may change the plan, but the change is not durable until this file moves with it.

## Current objective

Turn the proved two-context session relay into a project-level experience that can hold dozens of sessions together without relying on one chat's memory.

## Active sequence

1. [x] Establish the Guide continuity contract and project-specific steering-file index.
2. [x] Ship the repository-local `koda-c-session-prompt` skill.
3. [x] Bind explicit owner confirmation to the prompt, steering snapshot, prior pushed close, and Git handover.
4. [x] Make `koda-c-session` consume and bind that verified request while preserving the existing producer/reviewer separation.
5. [x] Mutate every new refusal condition, record the results, and keep prior tests intact.
6. [x] Prove the Guide-to-session transition against a real Git project with separate deterministic processes, injected return-stage interruption, pushed close, pushed Guide return, and unchanged repository identity.
7. [x] Add one opt-in macOS Ghostty action that requests the two labeled session contexts while preserving exact manual recovery commands.
8. [x] Keep the persistent Reviewer conversational between formal handoffs without turning conversation into Producer input; pushed deterministic proof covers captured input, active-direction mutation, and a real pseudo-terminal.
9. [x] Implement the owner-ruled wait-or-halt boundary: record direction now, release it only through the next gate, and make halt restart from a fresh Brief after pushed immutable evidence.
10. [x] Make the session-prompter preflight every start request and refuse conceptually competing sessions before a draft exists.
11. [ ] Prove the complete three-context experience with Kristian when he is rested and available to test.

## Submission cut

The product needs one strong standard session moving from durable Guide state into the existing two-context relay while all three human-facing contexts are visible: ongoing project Guide, non-interactive Producer, and conversational session Reviewer. Explore, research, architecture, triage, and other session kinds are recorded product direction, but do not block this proof and will not be rushed into separate runtimes.

## Current constraints

- The core `koda` gate remains small, deterministic, dependency-free, and domain-general.
- Project and role behavior belongs in repository-local skills and plain files.
- Owner confirmation remains required at every gate for the current target.
- No producer input from the owner after session start; owner conversation stays with the persistent reviewer.
- No new session while the previous session lacks immutable pushed close or explicit pushed halt.
- Every persistent product output stays inside the project repository.
- Tests are a living product contract and may grow, but must never be weakened to hide failure.

## Proof still owed

- One owner-observed Guide confirmation arranging the complete three-context experience while preserving two independent session contexts.
- Cross-model continuation evidence before the org-chart staffing design becomes executable per-phase config.
