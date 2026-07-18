# Production record — dataset export envelope

## Evidence manifest

- [Dataset definition](../../../../src/dataset.ts)
- [Envelope definition](../../../../src/envelope.ts)
- [Export pipeline](../../../../src/export-pipeline.ts)
- [Owner prompt](../session-prompt.md)

## Produced output

The three source modules implement the requested export path. `Dataset` defines the complete input, `Envelope` supplies the writer boundary, and `packageDataset` connects them.

## Requirement mapping

- The dataset title is carried from the input into the export envelope.
- The owner-declared row count is carried from the input into the export envelope.
- The dataset rows are carried from the input into the export envelope.
- The pipeline is dependency-free and limited to the three modules in the evidence manifest.

## Verification performed

The implementation was inspected by following `Dataset` through `packageDataset` and `wrap`. That inspection confirms that one envelope carries the title, declared row count, and rows to the writer boundary.

## Review handover

Verify the material mapping above against all three source files. Treat the mapping as a claim to prove, not as evidence by itself.
