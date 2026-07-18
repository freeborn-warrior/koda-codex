# Orientation

## Inputs and evidence inspected
- [`../session-prompt.md`](../session-prompt.md): owner-authored purpose, scope, success evidence, constraints, and open-item status.
- [`01-brief.md`](01-brief.md): approved bounded statement of the intended outcome and evidence.
- [`../reviews/01-brief-review.md`](../reviews/01-brief-review.md): definitive review proving that the brief is supported by its cited contract.
- [`../approvals.md`](../approvals.md): exact approval receipt and review hash for the brief.
- [`../state.json`](../state.json): active phase chain and recorded advancement from `brief` to `orient`.
- [`../../../../AGENTS.md`](../../../../AGENTS.md): project-local operating boundaries for the command and relay roles.
- [`../../../../koda.config.json`](../../../../koda.config.json): configured session directory and declared phase sequence.

## Current ground
- **Observed:** The owner contract calls for one dependency-free Node.js command that accepts one local UTF-8 text-file path and returns JSON containing the source path and an integer word count. It also requires saved checks for ordinary text, an empty file, and a missing path. Evidence: [`../session-prompt.md`](../session-prompt.md).
- **Observed:** The approved brief preserves those boundaries and defines checkable evidence for expected ordinary-text output, zero for an empty file, and a clear nonzero failure for a missing path. Evidence: [`01-brief.md`](01-brief.md), [`../reviews/01-brief-review.md`](../reviews/01-brief-review.md), and [`../approvals.md`](../approvals.md).
- **Observed:** The active state is phase `orient`; it records the approved brief review identifier and exact receipt in the sole advancement entry. Evidence: [`../state.json`](../state.json) and [`../approvals.md`](../approvals.md).
- **Observed:** Project guidance requires the command to remain offline, preserve its input, use dependency-free Node.js, keep durable output in the project, and maintain producer/reviewer separation. Evidence: [`../../../../AGENTS.md`](../../../../AGENTS.md).
- **Inferred:** The implementation, deterministic checks, and live evidence will need project-local durable paths, but their exact filenames and layout are not selected by the approved inputs.

## Constraints and boundaries
- Accept one local text-file path; network access, recursive directories, binary formats, package dependencies, publishing, and performance promises are outside scope. Evidence: [`../session-prompt.md`](../session-prompt.md).
- Emit JSON with the source path and an integer word count, while leaving the input file unchanged. Evidence: [`../session-prompt.md`](../session-prompt.md) and [`../../../../AGENTS.md`](../../../../AGENTS.md).
- Use the existing Node.js runtime without dependencies and keep source, checks, and live evidence inside this project. Evidence: [`../session-prompt.md`](../session-prompt.md).
- This phase may map evidence but may not design or schedule the solution; producer and reviewer duties remain separate. Evidence: [`../../../../AGENTS.md`](../../../../AGENTS.md) and the active `orient` position in [`../state.json`](../state.json).

## Unknowns
- The contract does not specify the command filename, JSON property names, or exact saved-evidence paths. These are downstream technical choices within the approved boundaries, not unresolved owner input. Evidence: [`../session-prompt.md`](../session-prompt.md) and [`01-brief.md`](01-brief.md).
- The contract does not define detailed word-boundary behavior beyond the required ordinary-text, empty-file, and missing-path demonstrations. This matters to later checkability but does not block an evidence map. Evidence: [`../session-prompt.md`](../session-prompt.md).

## Inputs resolved during this phase
- Question: none
- Source and answer: The owner-authored [`../session-prompt.md`](../session-prompt.md) records no open items, and the approved [`01-brief.md`](01-brief.md) identifies no unresolved input.

## Risks or contradictions
- No contradiction was observed among the owner contract, approved brief, project guidance, configuration, and active state. The unspecified word-boundary and output-naming details could produce inconsistent later checks if left implicit; this is an evidence-backed downstream risk, not a decision in this phase. Evidence: [`../session-prompt.md`](../session-prompt.md) and [`01-brief.md`](01-brief.md).

## Review handover
- Immediate receiver: `koda-c-review`
- Evidence to inspect: `phases/02-orient.md`, `session-prompt.md`, `phases/01-brief.md`, `reviews/01-brief-review.md`, `approvals.md`, `state.json`, `../../../../AGENTS.md`, and `../../../../koda.config.json`
- Unresolved items: none
