# Koda-C visible backlog

**Last updated:** 2026-07-18

This is the on-disk working queue for the build. A checked item means its evidence exists in committed project files; conversation-only completion does not count.

## In progress

- [ ] Finish judge-facing README and one-window/two-window demo instructions.

## Next

- [ ] Run one complete tiny Koda session end to end and save its session files and transcript under `docs/`.
- [ ] Forward-test the reviewer in a fresh Codex task with no producer context; record the task setup, available GPT-5.6 variant/effort, result, and verdict.
- [ ] Write `docs/DEMO.md` with a two-window producer/reviewer walkthrough and a one-window one-minute judge fixture.
- [ ] Finish `docs/README.md`: origin story, install, architecture, collaboration account, build-approach ruling, and roadmap.
- [ ] Verify the one-line local `npx` path from a fresh checkout/package.
- [ ] Run package dry-run, full tests, coverage, and demo rehearsal; update `docs/TESTING.md` as each happens.

## Later, only after target (a) is secure

- [ ] Decide whether time remains for GPT-5.6 Sol/Terra/Luna and effort-level comparisons; record every skipped combination.
- [ ] Consider guide, explore, architect, and triage role skills without expanding the CLI.
- [ ] Consider a thin interface over the plain-file CLI contract.
- [ ] Prepare the under-three-minute video script and submission checklist.

## Completed and pushed

- [x] Record the original one-document contract and owner ruling (`c205ebd`).
- [x] Implement the first working receipt-gated CLI refusal and success (`6e4f1f8`).
- [x] Mark the abandoned build-phase session as archive evidence (`b50d805`).
- [x] Add deliberate mutation tests for every core gate condition and executable recovery hints (`50d79cb`).
- [x] Create and validate the initial shared reviewer skill package (`bfb36f1`); this is being renamed and expanded under the later owner ruling above.
- [x] Keep deterministic test results, discovered defects, corrections, and skipped variant work in `docs/TESTING.md`.
- [x] Expand and validate seven producer relay skills, one shared reviewer, and one close ceremony; all nine pass Codex's skill validator.
- [x] Bind immutable `close.md` to every durable session file and the final review receipt.
- [x] Prove close is not official before commit/push and `session new` refuses both uncommitted and local-only closes.
- [x] Revalidate every prior advanced gate from disk before allowing work in the current phase.
- [x] Run and preserve a complete tiny session through receipt refusal, advancement, immutable close, local-commit refusal, push, and verified closure under `docs/dogfood/`.

## Definition of target (a) done

- Fresh checkout runs through `npx` without hidden setup.
- Artifact, review, allowed verdict, unique receipt, exact owner quote, and artifact hash are enforced.
- REVISE, REJECT, and DISCUSS cannot advance; revised work requires a fresh review and receipt.
- Every gate condition has been seen failing in an automated mutation test.
- Every printed recovery command used by the demo runs from the state that printed it.
- The producer/reviewer two-task handoff is documented and independently exercised.
- One complete session closes only after immutable close evidence is committed and pushed.
- README, demo, testing ledger, skills, session proof, and project backlog all live under this repository.
