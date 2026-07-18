VERDICT: REVISE

<!-- KODA_REVIEW {"version":1,"id":"3de8f96e-8a5a-4795-a1e2-1125d379b2a5","phase":"produce","artifactSha256":"72445dc38734375e727f5639d3ef118f0310e67886d5fd28d37450929ed5dc04","receipt":"RECEIPT: Review read — 3de8f96e-8a5a-4795-a1e2-1125d379b2a5","createdAt":"2026-07-18T17:04:19.644Z"} -->

# Peer review — produce

## Findings

- The owner prompt requires the export envelope to carry the dataset title, declared row count, and rows.
- `Dataset` declares all three values in `src/dataset.ts`, and `wrap` correctly creates an envelope in `src/envelope.ts`.
- `packageDataset` in `src/export-pipeline.ts` calls `collectPayload`, which returns only `dataset.rows`, and wraps that array. The returned type is `Envelope<Dataset["rows"]>`, so title and declared row count are not carried to the writer boundary.
- Therefore the production record's title and row-count mapping claims are contradicted by the cited implementation. The dependency and three-module scope claims are supported.

## Required revisions

- [ ] Change the export pipeline so the envelope payload contains the dataset title, declared row count, and rows as required by the owner prompt.
- [ ] Update the evidence manifest's requirement mapping and verification record to match the corrected implementation, then provide evidence that all three values reach the writer boundary.

RECEIPT: Review read — 3de8f96e-8a5a-4795-a1e2-1125d379b2a5
