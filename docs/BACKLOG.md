# Koda-C visible backlog

**Last updated:** 2026-07-18

This is the on-disk working queue for the build. A checked item means its evidence exists in committed project files; conversation-only completion does not count.

## In progress

- [ ] Verify root `AGENTS.md` and all nine `.agents/skills/` packages are discovered in a genuinely fresh Codex task.
- [ ] Verify the one-line local `npx` path from a fresh checkout/package.

## Next

- [ ] Run the medium-effort Terra and Luna fixture pairs only if submission time remains; preserve every run or skip honestly.
- [ ] After the current relay is proved, decide with Kristian whether owner attention stays `every_gate` or adds a `decisions_only` setting; first define authorized routine acknowledgers and the owner-attention marker.
- [ ] Design the long-lived, disk-recoverable guide/session-prompter from real use; decide whether it is one guide skill or a distinct prompt skill before creating either.
- [ ] After the manual two-task relay is proved, design a supervisor that launches a non-interactive producer and owner-facing reviewer after an owner-approved prompt; keep all authority in the existing disk gate.
- [ ] Add abort/recovery semantics before claiming the producer can run unattended; Ctrl-C must leave named recoverable state.

## Later, only after target (a) is secure

- [ ] Decide whether time remains for GPT-5.6 Sol/Terra/Luna and effort-level comparisons; record every skipped combination.
- [ ] Consider guide, explore, architect, and triage role skills without expanding the CLI.
- [ ] Consider a thin interface over the plain-file CLI contract.
- [ ] Consider an RLM-style evidence query layer only after a guide-context fixture proves ordinary file search, summaries, and compaction are insufficient.
- [ ] Add machine-readable status for future interfaces after the human CLI contract is stable.
- [ ] Add safe mutation serialization if real two-window use shows simultaneous write races.
- [ ] Consider a clean-boundary Koda-C self-hosting session only as later validation; do not let it displace the producer/reviewer relay work.
- [ ] Package Koda-C as an installable plugin only after repo-local skill discovery and the core relay are proved; evaluate trusted hooks without making the CLI depend on them.
- [ ] Prepare the under-three-minute video script and submission checklist.

## Completed and pushed

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
- [x] Run and preserve a complete tiny session through receipt refusal, advancement, immutable close, local-commit refusal, push, and verified closure under `docs/dogfood/`.
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

## Definition of target (a) done

- Fresh checkout runs through `npx` without hidden setup.
- Artifact, review, allowed verdict, unique receipt, exact owner quote, and artifact hash are enforced.
- REVISE, REJECT, and DISCUSS cannot advance; revised work requires a fresh review and receipt.
- Every gate condition has been seen failing in an automated mutation test.
- Every printed recovery command used by the demo runs from the state that printed it.
- The producer/reviewer two-task handoff is documented and independently exercised.
- One complete session closes only after immutable close evidence is committed and pushed.
- README, demo, testing ledger, skills, session proof, and project backlog all live under this repository.
