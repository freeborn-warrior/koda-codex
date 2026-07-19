# Koda-C visible backlog

**Last updated:** 2026-07-19

This is the on-disk working queue for the build. A checked item means its evidence exists in committed project files; conversation-only completion does not count.

## In progress

- [ ] Receive Kristian's explicit confirmation or requested revision of the exact verification [session prompt draft](verification-runs/2026-07-19-markdown-headings-01/SESSION-PROMPT-DRAFT.md). Do not create launch evidence or start a model beforehand.
- [ ] Run one genuine full-session live-model test of the Guide-launched runtime with all three contexts visible: ongoing project-level Guide, non-interactive Producer, and owner-facing session Reviewer. The two-context session relay has already been owner-observed; deterministic Guide launch/return simulation is complete.
- [ ] Owner-test the new one-action Ghostty adapter against a genuine Guide-confirmed session. Deterministic tests prove labeled Reviewer-first/Producer-second requests, no shell evaluation, partial-open recovery, and duplicate refusal; they do not prove macOS displayed the windows.
- [ ] Complete the Guide-side human UX for active-session direction. The shared waiting evidence and fresh-Brief mechanics now work; the live three-window test must prove the owner understands that Guide and Reviewer record now but never inject the active phase.

## Next

- [ ] Finish submission-critical proof and polish only after the product runtime above is honest: final hygiene, owner recording, and external submission.
- [ ] Design the project-adaptation layer: turn a real owner/project contract into project-local `AGENTS.md`, producer skills, and one shared reviewer without changing the invariant gate. Start with writing and software profiles, but adapt beyond profile defaults.
- [ ] After the current relay is proved, decide with Kristian whether owner attention stays `every_gate` or adds a `decisions_only` setting; first define authorized routine acknowledgers and the owner-attention marker.
- [ ] Add project staffing config after proving cross-model thread continuation: Guide assignment, session-kind reviewer/defaults, and per-phase producer model/effort must resolve independently and snapshot into the session. Use sealed matrix evidence, not skill frontmatter, for recommendations.
- [ ] Add monotonic owner-attention escalation before any delegated acknowledgement mode: config may authorize routine flow, but `OWNER_ATTENTION_REQUIRED` must always stop at the Guide and no agent may waive stricter configured attention.
- [ ] Finish the ruled side-by-side runtime beyond the first job relay with always-available owner/reviewer discussion. Preserve the shipped disk-derived turn summaries; never claim hidden chain-of-thought, leak receipts, or let rendered status outrank disk truth.
- [x] Implement the owner-confirmed project/session graph across core CLI, Guide confirmation, skills, Producer, Reviewer, and relay routing: explicit kind/relationship/dependency identity, pushed-terminal hashes, aggregate active status, ambiguous-mutation refusal, and an independent Explore relay that leaves an active Produce sibling untouched. Multiple simultaneous live runtime pairs remain coupled to the write-set milestone below.
- [x] Replace blanket `koda-c-session-prompt` refusal with dependency-scoped preflight. It refuses unresolved successors, permits an explicitly owner-classified independent sibling, and never infers independence merely from a different kind label. Write-set conflict checks join it when that mechanism lands.

## Later, only after target (a) is secure

- [ ] Consider whether the existing disk-separated seats are worth adapting across providers. Codex/Fable mixed staffing is an architectural possibility, not a committed requirement or current scope.
- [ ] Evaluate a read-only Guide-side Librarian/recall skill that answers where the project has been, is now, and is heading with citations, without becoming another authority or hidden truth store.
- [ ] Consider a thin interface over the plain-file CLI contract.
- [ ] Consider an RLM-style evidence query layer only after a guide-context fixture proves ordinary file search, summaries, and compaction are insufficient.
- [ ] Add machine-readable status for future interfaces after the human CLI contract is stable.
- [ ] Revisit forward-only Koda-C self-hosting after submission at a clean, dated boundary; never retrofit the earlier construction history.
- [ ] Package Koda-C as an installable plugin only after repo-local skill discovery and the core relay are proved; evaluate trusted hooks without making the CLI depend on them.
- [ ] Prove adaptation with at least one writing project and one software project; compare their artifact and review criteria while keeping the same gate semantics.

## Completed and pushed

- [x] Prepare the representative three-window verification project in the repository-local ignored runtime area: clean pushed initial Git state, ten local skills, six phases, Guide manifest, committed continuity, verified restorable bundle, unscripted task contract, successful between-session entry check, and an exact prompt draft awaiting owner confirmation ([run contract](verification-runs/2026-07-19-markdown-headings-01/CONTRACT.md)).

- [x] Settle the first live-test target: Kristian deferred Koda-C self-hosting until after submission and chose a repository-contained representative verification project so current product claims can be tested without changing the submission repository's operating model ([owner ruling](design-notes/2026-07-19-pre-submission-verification-ruling.md)).

- [x] Remove the one-live-runtime preparation limit: runtime discovery and Guide status enumerate exact launch IDs; simultaneous session allocation is atomic; short cooperative claim/Git locks serialize rather than cross streams; session-specific upstream proof ignores unrelated local-ahead commits without accepting unpushed session bytes; and a four-process integration runs two independent Producer/Reviewer pairs through distinct receipts, pushed closes, and Guide returns in one project ([post-push 177-check proof](test-results/2026-07-19-plural-runtime-pushed-final.md)). Owner-observed multi-pair Ghostty use remains a human proof, not a mechanical gap.

- [x] Implement the owner-ruled concurrent mutation boundary: `koda work claim` and `koda guide claim` reserve exact paths; active Guide/session overlap refuses; session claims record before/after hashes; changed-after-handoff refuses; immutable close independently requires every claimed output to match, be committed, and be pushed; no relay path uses `git add -A`; exact-path commits exclude unrelated dirt; a short project-local Git lock serializes stage/commit/push and recovers a dead owner only with an empty index. Mutations cover contamination, Guide/session and session/session conflicts, rename/delete, changed post-work bytes, omitted claimed output at close, corrupt write-set status, close with unrelated dirt, live/stale locks, and real relay recovery (174-check complete development suite before durable recording).

- [x] Make process interruption fail closed: Ctrl-C terminates the active model child, preserves partial events, marks possible handbacks untrusted, resumes the same persistent context for reconciliation, returns Reviewer jobs to `PENDING`, and refuses automatic replacement when no context ID exists. Four real-signal cases pass deterministically; owner-observed Ghostty recovery remains owed.

- [x] Make `$koda-c-session-prompt` the sole skill route toward a future session and force a disk preflight before drafting. Active sessions and prepared runtimes print a named `NEXT SESSION BLOCKED` explanation; the honest control permits one draft between sessions, and pushed halt reopens the path (`c94799a`; pushed 151-check deterministic proof).
- [x] Re-run fresh startup discovery and active refusal against the sealed contract. Sol/low reported all ten Koda-C skills and repository-local placement guidance with zero tools or reads; Sol/medium refused the conceptually-ahead request without changing a file (`bc8f746`; pushed 152-check regression proof). Owner-observed three-window proof remains owed.

- [x] Make the CLI ceremony legible without implementation logs: permanent Guide/Producer/Reviewer labels, explicit owner-input state, frozen phase-entry progress, artifact and gate-pass handovers, Reviewer phase position, and sequential status that prints only Reviewer first and only then Producer. All summaries derive from exposed disk/process facts; hidden reasoning is never claimed (`d57d3fd`; pushed 147-check proof).

- [x] Implement the settled wait-or-halt transfer: immediate bound direction record, no current-phase consumption, atomic release in the next advancement record, required receiving-phase citation, early-use refusal, immutable pushed halt, and Guide-confirmed fresh Brief. The historical same-phase handback route was removed rather than retained as a hidden pause-inject-resume path (`cde10de`; pushed 146-check proof).

- [x] Keep the Reviewer conversational while Producer works: a real terminal prompt resumes the same persistent context, safe answers mutate no project file, project-scope thoughts return to Guide, and the later owner ruling makes active direction record immediately while still waiting for the boundary (`8ca8aab` is the earlier pushed conversation proof). Owner-observed proof remains part of the full three-context run.

- [x] Add an opt-in `koda guide launch --open ghostty` adapter that keeps Guide open, requests labeled Reviewer then Producer windows, persists intent before GUI mutation, passes only explicit argument arrays, retains exact manual commands, and refuses duplicate automatic opening. Owner-observed live proof remains owed.
- [x] Connect pushed Guide confirmation to an explicit real-project runtime: clean/pushed and ignored-runtime entry checks, shared path hardening, two-process relay compatibility, injected finalization recovery, unchanged project Git, pushed runtime archive, machine-readable Guide return, and disk-derived Guide status. Live visible context creation remains owed.
- [x] Build the first disk-recoverable Guide slice: project-specific steering manifest, local `koda-c-session-prompt` skill, exact owner-confirmed prompt/project/prior-session hashes, immutable cancellation, pushed-handover verification, unconfirmed/stale refusal, and launch-to-session binding. Fresh discovery and visible two-context launch remain separate owed proofs.

- [x] Let Kristian discuss an active formal review in the same reviewer context; ordinary explanation changes no file, while new direction pauses without an explicit owner send (`f68f5d7`, evidence at `9610429`).
- [x] Historical experiment: same-phase owner-direction handback with explicit send and fresh-review routing. Superseded and removed from active runtime by the 2026-07-19 wait-or-halt ruling; retained only in Git history and dated test evidence.
- [x] Add consistent disk-derived role handovers: producer artifact path/size/hash/control, consultation pause/response, reviewer verdict binding, acknowledgement outcome, and explicit next owner of control. These summarize exposed facts, never hidden chain-of-thought.
- [x] Build and deterministically prove the first real two-window runtime slice: streamed non-interactive producer, automatic disk jobs, one persistent Window B reviewer, same-window exact owner receipt, in-phase owner ruling, separate-process rendezvous, and pushed close (`84a31fb`, evidence at `ece10c5`).

- [x] Record the original one-document contract and owner ruling (`c205ebd`).
- [x] Implement the first working receipt-gated CLI refusal and success (`6e4f1f8`).
- [x] Record the abandoned build attempt in Git (`b50d805`), then remove it from the live session namespace while preserving the owner contract and design note elsewhere under `docs/`.
- [x] Add deliberate mutation tests for every core gate condition and executable recovery hints (`50d79cb`).
- [x] Create and validate the initial shared reviewer skill package (`bfb36f1`); this is being renamed and expanded under the later owner ruling above.
- [x] Keep deterministic test results, discovered defects, corrections, and skipped variant work in `docs/TESTING.md`.
- [x] Expand and validate seven producer relay skills, one shared reviewer, and one close ceremony; all nine pass Codex's skill validator.
- [x] Bind immutable `close.md` to every durable session file and the final review receipt.
- [x] Prove close is not official before commit/push and `session new` refuses both uncommitted and local-only closes.
- [x] Revalidate every prior advanced gate from disk before allowing work in the current phase.
- [x] Run and preserve the original tiny session through receipt refusal and pushed close, then supersede its snapshot with the full six-phase native-chain proof under `docs/dogfood/`.
- [x] Write the judge-facing README plus one-minute and two-task demo instructions.
- [x] Add two bounded reviewer fixtures: one planted unsupported number and one honest control.
- [x] Add root `AGENTS.md` and correct repository skill packaging from top-level `skills/` to Codex's discoverable `.agents/skills/` path.
- [x] Bind the complete review body into each approval entry so editing findings after acknowledgement refuses as changed evidence.
- [x] Build a plain-JavaScript `dist/` package, install its real tarball, and execute its printed recovery command.
- [x] Run the complete 66-check suite with coverage and preserve every named result; the gate engine is 100% covered for lines, branches, and functions.
- [x] Rehearse the one-minute demo through refusal, interactive receipt entry, and successful advancement using only printed commands.
- [x] Define disk-backed in-phase consultation, producer stop classification, reviewer-to-owner escalation, and fresh formal-review independence.
- [x] Make the reviewer Kristian's only in-session interface and require every reviewer-to-producer handback to exist as an artifact before use.
- [x] Forward-test the shared reviewer in two separate fresh Sol/medium tasks: it caught the planted unsupported number and approved the honest control; preserve both runner failures and both valid results.
- [x] Create a living Sol/Terra/Luna and effort-level overview that distinguishes passes, failures, invalid attempts, and unrun cells.
- [x] Prove three complete native chains through pushed close: clean approval, REVISE recovery in plan, and DISCUSS/owner-ruling recovery in live.
- [x] Preserve an inspectable full six-phase dogfood transcript with six artifacts, six reviews, six receipts, immutable close, commit, and push.
- [x] Complete and log the Sol/Terra/Luna medium reviewer baseline; each model caught the plant and approved the honest control, with operational differences preserved.
- [x] Add and deterministically validate three discriminating fixtures—inference-chain, tempting honest, and missing evidence—and migrate every recorded run to separate CATCH, VERDICT, and secondary observations.
- [x] Build and deterministically validate the resumable full-relay harness: exactly nine copied skills, distinct persistent role IDs, real receipt prompts, pre-close output push, immutable close, and restorable Git evidence.
- [x] Replace the first live relay's error-prone multi-command owner procedure with a tested one-command review reader that derives the waiting session from disk and never prints or submits the receipt.
- [x] Execute and preserve the first genuine owner-acknowledged relay through all six phases: persistent Sol producer, persistent Terra reviewer, an unplanned Summary REVISE loop, seven owner acknowledgements, supervised Git recovery, verified bundle, and pushed immutable close.
- [x] Complete and stop the sealed reviewer program: two Luna baseline repeats plus nine new medium cells. All three models passed the inference, temperament, and missing-evidence score contracts; no unique inference winner existed, so the conditional low-effort run was correctly skipped.
- [x] Prove root `AGENTS.md` and all nine `.agents/skills/` packages are injected into a fresh ephemeral Codex task without tool calls or repository reads; preserve raw events and bind the result into the permanent suite.
- [x] Run the README's exact one-line local `npx` path from a fresh public checkout, preserve the first executable-mode failure, correct it in the build and Git, and prove the pushed checkout remains clean afterward.
- [x] Audit package and runtime safety; close ignored-file and linked-evidence gaps, constrain relay paths, scan tracked content, and document the honest threat and concurrency boundaries.
- [x] Verify the live Build Week rules and produce the judge path, under-three-minute Ghostty script, text-description draft, and owner-ready submission checklist.

## Definition of target (a) done

- Fresh checkout runs through `npx` without hidden setup.
- Artifact, review, allowed verdict, unique receipt, exact owner quote, and artifact hash are enforced.
- REVISE, REJECT, and DISCUSS cannot advance; revised work requires a fresh review and receipt.
- Every gate condition has been seen failing in an automated mutation test.
- Every printed recovery command used by the demo runs from the state that printed it.
- The producer/reviewer two-task handoff is documented and independently exercised.
- One complete session closes only after immutable close evidence is committed and pushed.
- README, demo, testing ledger, skills, session proof, and project backlog all live under this repository.
