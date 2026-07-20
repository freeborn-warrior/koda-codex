# Koda-C working plan

**Last updated:** 2026-07-20

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
13. [x] Prove the complete three-context experience with Kristian. After preserving
    the first launch, acknowledgement, recovery, and pager/clipboard failures, the
    dependent retry `6371ade2-3002-42aa-87ab-a613220b7eab` recovered its original
    Sol Producer and Terra Reviewer, completed all six gates with six owner
    acknowledgements, pushed immutable close `b5105da`, and returned to Guide at
    `bde0807`.
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
23. [x] Give both visible roles mechanical ownership and make routine failure recovery
    one-key: ordered Reviewer-then-Producer readiness, duplicate Producer refusal,
    Guide-owned missing-role diagnosis, numbered reader/clipboard/halt recovery, and
    no raw role commands on the ordinary owner surface. The pushed suite passes
    204/204 under toolkit capability `ghostty-owner-surface-v6`; human
    observation follows.
24. [x] Promote repeatable role recovery: restore Reviewer before Producer when both
    disappear, recover a later missing role without blind duplication, preserve an
    append-only attempt history, and keep the ordinary owner surface at two Guide
    choices. Repair commit `b9b63eb` passes a pushed 206/206 transcript bound as
    toolkit capability `ghostty-repeatable-recovery-v7`; Kristian's observation
    remains.
25. [x] Generalize recovery beyond the original receipt incident: validate and bind
    every stable owner-decision Reviewer job, restore only missing roles, retry exact
    window-readiness failures without guessing, and preserve the optional Ghostty
    adapter as separate from the core workflow. Repair commit `93efd1a` passes an
    unchanged pushed 210/210 transcript under toolkit capability
    `ghostty-stable-handover-recovery-v8`; Kristian's observation remains.
26. [x] Finish the secure Guide entry milestone: one command opens or resumes one
    project-scoped Guide, ordinary text remains conversational, exact numeric
    recovery stays behind a trusted controller, active session files and Git are
    outside the model's write set, ambient config/rules/network are disabled, and
    real Codex plus the complete suite pass after the repair is pushed. Commit
    `01e8055` passes 229/229 under `secure-persistent-guide-v10`.
27. [x] Remove terminal-context bytes from role-launcher identity and add a bounded
    migration for the exact earlier generated form. Both roles prevalidate before
    either changes; hostile or command-divergent files still refuse. Commit
    `461824b` passes the unchanged pushed 230/230 transcript under
    `deterministic-role-launchers-v11`.
28. [x] Publish visible role ownership atomically instead of exposing a lock
    directory before its owner file exists; preserve strict legacy-lock reads for
    already-running windows. Commit `e6890f4` passes the unchanged pushed 230/230
    transcript under `atomic-role-ownership-v12`.
29. [x] Make the competition surface literal: root README, no-build/no-cache core
    demo, current evidence totals, public fresh-clone execution, real package
    install, security audit, and clean-checkout proof. Preserve live recovery,
    video, `/feedback`, and Devpost submission as explicit owner work rather than
    inferred completion.
30. [x] Replace the failed pager/clipboard owner ceremony without weakening the
    gate: inline human review, hidden machine metadata, a deterministic short code
    mapped to the current exact receipt, no clipboard or paste, retryable mistakes,
    and one bounded visual language across Guide, Reviewer, and Producer. Complete
    deterministic, security, coverage, package, pushed-integrity, and only then
    human verification. The local product now passes **232/232**, terminal-control
    mutation, coverage, package inspection, and zero-vulnerability audit. Pushed
    capability `owner-review-ceremony-v13` binds code commit `c1d55ea` and its
    unchanged 232/232 transcript; the later owner-observed run completed all six
    phases and immutable close.
31. [x] Correct the successful run's presentation findings without changing the
    workflow: phase-aware progress, aggregated successful checks, visible failures,
    quiet Guide inspection, and direct Reviewer conversation with complete raw
    events retained on disk. The unchanged pushed release suite passes **234/234**
    under toolkit capability `conversational-owner-surface-v14`.
32. [x] Repair the owner-observed Guide startup failure without broadening scope:
    distinguish opening Guide from session intent, precompute exact status in the
    trusted controller, bound model reads, show 30-second progress, preserve evidence
    during execution, recover safely from terminal EOF, and refuse existing/linked
    evidence. The corrected real Sol/medium context returned in about 41 seconds;
    repair and evidence reached `origin/main`, and the unchanged product passes
    **238/238** under `bounded-guide-startup-v15`.
33. [x] Close the first-use journey gap exposed by the recording attempt. Add one
    complete-session entry command, a nontechnical Quick Start and consequence-led
    command manual, controller-owned numbered launch, isolated Git preparation,
    and adversarial proof that ambient Git settings cannot redirect writes. The
    unchanged pushed implementation passes **241/241** under
    `self-guided-full-session-v16`.
34. [x] Repair the real first-use Codex configuration refusal without weakening
    isolation. The first `--version` preflight was insufficient and failed again
    for the owner; replace it with the installed CLI's offline `sandbox -P` path so
    both exact profiles are deserialized and applied before project creation. The
    unchanged post-push suite passes **244/244** under
    `codex-permission-instantiation-v18`.
35. [x] Repair the real Ghostty login-directory command failure. Preserve the
    single-token launcher design but pass its absolute, project-contained path so
    `/usr/bin/login` cannot resolve it from the owner's home directory. Reverse the
    old test that required a relative command and add a named directory-change
    mutation. Focused Guide/Ghostty coverage passes **82/82** and the complete local
    and unchanged post-push suites pass **245/245**.
36. [x] Close the bundled-demo semantic gap exposed by launch
    `e774b89e-c5f1-4cd9-b9f0-a2af4ee865c0`. Restore the already settled
    independent-first-session wording, reject explicit prompt/launch contract
    mismatches before confirmation, and make Quick Start open and bind the real
    bundled prompt instead of stopping at requested windows. The expanded Guide,
    Quick Start, plural-runtime, security, and integrity slice passes **68/68**;
    complete and pushed proof remain.

## Submission cut

The submission demonstration and its first-use entry now exist: one command creates
an isolated pushed project and enters Guide, while the preserved representative
Produce session proves the two-context relay, all six gates, pushed close, and Guide
return with Guide, Producer, and Reviewer visible. The remaining submission work is
a fresh human rehearsal, recording, repository publication, form completion, and
freezing the exact pushed commit—not another product feature or a retrofitted
self-hosting run.

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

## Proof still owed after submission cut

- One owner-observed proof of Guide editing a claimed unrelated file while a visible session runs; deterministic attribution and close mutations are complete.
- Cross-model continuation evidence before the org-chart staffing design becomes executable per-phase config.
- Cross-provider staffing remains only a possible consequence of disk-separated seats, not required proof or a current commitment.
