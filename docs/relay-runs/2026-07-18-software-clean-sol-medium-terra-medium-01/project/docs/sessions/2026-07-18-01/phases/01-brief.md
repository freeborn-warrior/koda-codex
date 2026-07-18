# Brief

## Source contract
- [Session prompt](../session-prompt.md)

## Purpose and why
Create a tiny dependency-free Node.js command that reports the word count of one local UTF-8 text file as JSON, so the full software relay can be inspected end to end.

## In scope
- One command accepting one local text-file path.
- JSON output with the source path and integer word count.
- Saved deterministic checks for ordinary text, an empty file, and a missing path.

## Out of scope
- Network access.
- Recursive directory handling.
- Binary formats.
- Package dependencies.
- Publishing.
- Performance promises.

## Success evidence
- The real command reports the expected count for a saved ordinary-text sample.
- The real command reports zero for an empty file.
- The real command refuses a missing path with a nonzero exit and a clear error.
- Tests and raw live output are saved on disk inside this project.

## Constraints and owner rulings
- Use the Node.js runtime already required by Koda-C and no dependencies.
- Preserve every input file unchanged.
- Keep this fixture deliberately small; correctness and inspectability matter more than features.
- Keep produced source, checks, and saved live evidence inside this project so the supervisor can commit and push them before immutable close.

## Inputs resolved during this phase
- Question: none
- Source and answer: The owner-authored [session prompt](../session-prompt.md) records no open items and supplies the purpose, scope, success evidence, and non-negotiable rulings.

## Deliverable or demonstration
Producer interpretation: a project-local, dependency-free Node.js word-count command, deterministic checks, and saved live evidence demonstrating ordinary-text, empty-file, and missing-path behavior within the owner-defined limits.

## Review handover
- Immediate receiver: `koda-c-review`
- Evidence to inspect: `phases/01-brief.md` and `session-prompt.md`
- Unresolved items: none
