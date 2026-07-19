# Koda-C repository guidance

## Start here

- Read `docs/PROJECT.md`, `docs/BACKLOG.md`, `docs/WORKING-PLAN.md`, and the latest entries in `docs/TESTING.md` before changing the product. Read `docs/GUIDE-CONTINUITY.md` before changing between-session behavior.
- Treat `docs/origin/2026-07-18-owner-contract.md` as the settled source contract. The abandoned build brief and unused REVISE review exist only in Git history and must never become active gate evidence.
- Kristian is the product owner. Ask him when a real product decision is not already settled on disk; choose implementation order and engineering method independently.
- Keep owner acknowledgement at every gate for the current target. Exception-only owner routing is documented as an open decision and must not be introduced without Kristian's ruling.

## Repository boundaries

- Keep every persistent output inside this repository. Put human-facing documentation under `docs/` except this Codex-native `AGENTS.md` file.
- Keep repository-local skills only under `.agents/skills/`; never install Koda-C skills globally while developing this project.
- Invoke the current Koda-C relay skill explicitly at each phase/task handoff; do not assume a prior skill remains active across later work.
- Keep the CLI small and domain-general. Phase and role behavior belongs in skills; gate truth belongs in plain files and deterministic code.
- The construction history is intentionally not retrofitted into Koda phase gates. Self-hosting Koda-C development is optional later validation, not a current build requirement.

## Verification and evidence

- Require Node.js 22.18 or newer. The runtime is dependency-free.
- Run `npm test` after product changes.
- Run `npm run test:record -- YYYY-MM-DD-label` for durable per-test evidence and add the outcome—including failures—to `docs/TESTING.md`.
- Never weaken a test to make a failure disappear. Fix the product or violated contract. Change an assertion only when evidence shows it encoded the wrong requirement, and record the failed run, reasoning, and corrected run.
- Mutation tests must break one gate condition at a time, prove refusal, and assert the named reason. Printed recovery commands must execute from the state that printed them.
- Reviewer-fixture runs must record the real date, fixture, model variant, effort, actual verdict, CATCH score, and VERDICT score. A vague block never counts as a catch; execution behavior stays secondary. Never imply an unrun model test passed.
- Treat fresh-task reviewer isolation as test evidence, not as a permission guarantee supplied by `SKILL.md`.
- In a Guide project, the owner initiates a session only from Guide by invoking `koda-c-session-prompt` and explicitly confirming the resulting prompt. The trusted supervisor launches the input-closed Producer, which invokes `koda-c-session`; the owner never types into Producer. Once active, every session request goes through the owner-facing Reviewer, and every actionable Reviewer handback exists as a named disk artifact before Producer use.
- When a project has a Guide manifest, the owner confirms the exact prompt through `koda-c-session-prompt` before `koda-c-session` may open it. The Guide owns project direction and reconciles its configured steering files between sessions; a changed confirmed input is stale and requires an immutable pushed cancellation before reconfirmation.
- Preserve the owner-ruled runtime: one visible persistent producer context and one separate visible persistent reviewer context span the full session. Owner input to producer is closed; owner conversation happens only with the reviewer. Do not replace the reviewer with fresh per-phase contexts.
- Preserve the owner-ruled transfer bridge: record direction immediately but release it only at the next successful gate; explicit pushed halt is the sole interrupt and returns through a new session and fresh Brief. Never add pause-inject-resume or a same-phase direction handback.

## Git

- Preserve unrelated owner changes.
- Commit and push coherent milestones often with honest messages; the dated history is build evidence.
- A Koda session is closed only when its immutable close artifact and bound evidence are committed and pushed.
