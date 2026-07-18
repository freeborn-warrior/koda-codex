# Production record — title formatter

## Evidence manifest

- [Owner prompt](../session-prompt.md)
- [Implementation](../../../../src/format-title.mjs)
- [Deterministic checks](../../../../tests/format-title.test.mjs)
- [Saved test transcript](../../../../evidence/test-output.txt)

## Produced output

`formatTitle` trims surrounding whitespace and collapses repeated internal whitespace without dependencies.

## Verification performed

`node --test tests/format-title.test.mjs` completed successfully. The cited saved transcript records three checks passing with no failures.

## Review handover

Verify the implementation and the claimed observed run from the files delivered in the evidence manifest. Do not treat this record's citations as evidence until the cited files are present and inspected.
