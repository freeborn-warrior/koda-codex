# Session prompt

## Owner intent
Create a tiny dependency-free Node.js command that reports the word count of one local UTF-8 text file as JSON, so the full software relay can be inspected end to end.

## In scope
- One command accepting one local text-file path.
- JSON output with the source path and integer word count.
- Saved deterministic checks for ordinary text, an empty file, and a missing path.

## Out of scope
- Network access, recursive directories, binary formats, package dependencies, publishing, or performance promises.

## Success evidence
- The real command reports the expected count for a saved sample.
- The real command reports zero for an empty file.
- The real command refuses a missing path with a nonzero exit and clear error.
- Tests and raw live output are saved on disk.

## Constraints and owner rulings
- Use the Node.js runtime already required by Koda-C and no dependencies.
- Preserve every input file unchanged.
- Keep this fixture deliberately small; correctness and inspectability matter more than features.
- Keep produced source, checks, and saved live evidence inside this project so the supervisor can commit and push them before immutable close.

## Prior session carry-forward
- Previous close: none for this first session
- Previous summary: none
- Carried forward by owner: none
- Deliberately not carried: none

## Relay handover
- Configured receiver: brief
- Ground prepared: this owner prompt and project-local guidance
- Open items: none
