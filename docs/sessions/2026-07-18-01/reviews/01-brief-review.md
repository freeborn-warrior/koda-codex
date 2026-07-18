VERDICT: REVISE

# Peer review — Phase 01 brief

The brief has the right product direction, but it leaves out several protections from the owner's contract. Those omissions could let the later plan and build drift, so they should be repaired before this gate opens.

## What is aligned

- **Scope and stack:** The brief chooses target (a), exactly as requested: the gate-and-receipt command-line tool plus one generic peer-reviewer skill. It also keeps the default TypeScript/Node stack and the one-line `npx` goal.
- **Phase chain:** It names the complete default chain in the correct order: brief → orient → plan → produce → live → summary, and says the chain is configurable.
- **Core doctrine:** It says status and decisions come from files rather than hidden memory, and it says gates fail closed when proof is missing.
- **Reviewer skill:** It proposes one shared skill with phase-specific rules and the required `SKILL.md` and `agents/openai.yaml` files, rather than separate copies that could drift.
- **Demo:** The proposed clean, tiny, non-code fixture fits the product's general-purpose promise. Its refusal-first, receipt-quoted success is the right “money moment,” and the roughly one-minute judge goal matches the contract.
- **Document locations:** It correctly puts human-facing material and the build session under `docs/`, as Kristian ruled in the owner addendum.

## What must be revised

1. **State the complete gate rule.** The brief currently says only that the artifact, verdict, receipt, and ledger must agree. Add that the artifact must exist and be non-empty; the review must exist; its last line must be a marked, unique `RECEIPT:` phrase; and the ledger quote must match that phrase exactly after trimming outer whitespace. Also say that only APPROVE and APPROVE WITH COMMENTS may advance. REVISE and REJECT return work to the producer. DISCUSS blocks and goes to Kristian for a ruling. Every blocked or revised case needs a fresh review and fresh receipt before advancement.

2. **Make the negative tests explicit.** “Mutation tests” is too broad to preserve the contract's two hard guards. Say that tests will deliberately break every gate condition and prove advancement refuses. Also say every command printed as a recovery hint will be run from the state that printed it, proving it can actually be pasted and followed.

3. **Include the fallback trigger from owner addendum §10.1.** The brief must record that Kristian drops to scope (b) if a real `advance` refusal is not working on the demo fixture by mid-afternoon of build day, and that the builder must warn him before that point is missed.

4. **Include the bounded variant-testing rule from owner addendum §10.2.** Record that each model-assisted test defaults to one GPT-5.6 variant; the full Sol/Terra/Luna and effort-level matrix happens only after target (a) lands and time remains; and skipped combinations are written to `docs/TESTING.md` rather than silently disappearing.

5. **Show the full proposed tree requested by owner addendum §10.3.** The current prose names major folders but not a full tree. Replace it with a literal tree showing the intended files, including the exact TypeScript config name, command entry point, test files or groups, demo contents, `docs/README.md`, `docs/DEMO.md`, `docs/TESTING.md`, and the session's `session-prompt.md`, phase, review, `approvals.md`, and named state file. This gives Kristian something concrete to approve before code is built.

## Disk check

The repository is genuinely near-empty at this gate. Before this review was written, the only substantive files on disk were the session prompt and this brief, in the correct dated session folder; there were no commits yet. The proposed TypeScript package, source, tests, skill, demo, ledger, and state file do not exist yet. That is acceptable at the brief phase, but it means they are future promises, not completed facts. The next brief should keep that distinction clear.

RECEIPT: Amber lighthouse guards the July gate 7C4F9A2D
