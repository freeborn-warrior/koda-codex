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
11. [x] Make Ctrl-C a named, fail-closed operational stop: kill the in-flight child, preserve partial evidence, distrust possible handbacks, resume the same context for reconciliation, and refuse context replacement when identity is missing.
12. [x] Audit the whole product, package, and new interruption surface; consolidate recovery validation, preserve 157/157 deterministic checks with coverage, and publish the current security boundaries.
13. [ ] Prove the complete three-context experience with Kristian. The first launch is pushed-halted security evidence. The dependent retry `6371ade2-3002-42aa-87ab-a613220b7eab` then proved exactly one clean Reviewer and Producer beside Guide and reached an approved Brief, but its hidden second acknowledgement step caused a recoverable empty-receipt failure. The first recovery restored Reviewer but Producer failed to rejoin its existing formal-review job. The session remains at Brief with zero acknowledgements; the exact one-role recovery now passes 199 deterministic checks and must be pushed before Kristian observes it, then all remaining gates and pushed close are still owed.
14. [x] Settle the top-level mutation ruling: an active Produce session may not lock the whole project; Guide and unrelated project work may continue changing files.
15. [x] Implement exact per-workstream write sets, before/after hashes, same-path conflict refusal, exact-path staging, and a short recoverable Git-operation lock; mutation-test attribution, rename/delete, unrelated-dirt close, and dead-lock recovery.
16. [x] Confirm the project/session model: Produce is one session kind; independent Explore, Research, Architecture, Triage, Produce, and later sibling sessions may be active concurrently.
17. [x] Replace global latest-session inference with explicit session identity, kind, dependencies, aggregate project status, dependency-scoped launch refusal, Guide confirmation, skill targeting, and relay routing while preserving every existing gate (162-check deterministic proof).
18. [x] Remove the one-live-runtime preparation limit: enumerate exact runtime IDs, allocate simultaneous session directories atomically, print run-bound commands, serialize short claim/Git ceremonies, and prove two concurrent Producer/Reviewer pairs through pushed close in one project.
19. [x] Remove the owner-as-courier failure from Guide handover: verify the toolkit's launch contract from its repository-contained manifest, expose one plain capability in status, bind its integrity snapshot at confirmation, and make any later toolkit drift stale without asking Kristian to transport technical evidence.
20. [x] Make ordinary owner mistakes recoverable: numbered Reviewer choices, explicit receipt-paste disclosure, no-exit retry, resumable stop, confirmed halt, stdin-only sensitive handoff, and one two-choice Guide recovery that preserves both context identities and opens Reviewer before Producer.
21. [x] Run the final pre-handoff audit: isolate fresh-model children, fix sanitized
    executable resolution, make Git-lock retirement ownership-safe and
    traversal-safe, pass 197/197 complete and coverage runs, revalidate Guide in a
    fresh model, and publish current security/UX boundaries.
22. [x] Repair the owner-observed partial recovery: make Producer rejoin an existing
    formal-review decision, require a live Reviewer, open only the missing role, and
    verify Producer readiness before Guide reports success.

## Submission cut

The submission demonstration still needs one strong Produce session moving from durable Guide state into its two-context relay while Guide, Producer, and Reviewer are visible. It will run in an isolated representative project, not by turning Koda-C into its own managed project before submission. The product model must no longer claim that this is the project's only possible active session. Full kind-specific skills and self-hosting may grow after the demonstration, but explicit session identity and dependency-scoped truth cannot remain globally hard-coded.

## Current constraints

- The core `koda` gate remains small, deterministic, dependency-free, and domain-general.
- Project and role behavior belongs in repository-local skills and plain files.
- Technical prerequisites move through verified files and launch bindings; the owner supplies intent and product decisions, never paths, hashes, commands, commits, receipts, or test counts from another context.
- Owner confirmation remains required at every gate for the current target.
- No producer input from the owner after session start; owner conversation stays with the persistent reviewer.
- Core CLI, Guide confirmation, session skills, Producer, Reviewer, and relay supervisor bind explicit session identity. Session and Guide work sets reserve exact paths, record session before/after hashes, reject overlap and unclaimed mutation, stage only owned paths, and serialize Git ceremonies with a short recoverable lock. Runtime discovery and Guide status enumerate exact launch IDs. A four-process test closes two independent sessions through distinct persistent Producer/Reviewer pairs in one Git project, while the earlier control proves unrelated Guide dirt survives exact close.
- Every persistent product output stays inside the project repository.
- Tests are a living product contract and may grow, but must never be weakened to hide failure.
- Koda-C is the workflow; the CLI and terminal panes are replaceable mechanical surfaces, not the product definition.

## Proof still owed

- One owner-observed Guide confirmation arranging the complete three-context experience while preserving two independent session contexts.
- One owner-observed proof of Guide editing a claimed unrelated file while a visible session runs; deterministic attribution and close mutations are complete.
- Cross-model continuation evidence before the org-chart staffing design becomes executable per-phase config.
- Cross-provider staffing remains only a possible consequence of disk-separated seats, not required proof or a current commitment.
