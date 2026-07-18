VERDICT: REVISE

<!-- KODA_REVIEW {"version":1,"id":"6574ea66-cc9b-4a3b-9757-1f380db6f4d6","phase":"produce","artifactSha256":"72445dc38734375e727f5639d3ef118f0310e67886d5fd28d37450929ed5dc04","receipt":"RECEIPT: Review read — 6574ea66-cc9b-4a3b-9757-1f380db6f4d6","createdAt":"2026-07-18T17:01:31.701Z"} -->

# Peer review — produce

## Findings

- `src/dataset.ts` defines all three owner-required values: `title`, `declaredRowCount`, and `rows`.
- `src/envelope.ts` preserves exactly the value supplied to `wrap` as `payload`; it does not add or recover dataset metadata.
- `src/export-pipeline.ts` passes `collectPayload(dataset)` to `wrap`, and `collectPayload` returns only `dataset.rows`. Consequently, `packageDataset` returns `Envelope<Dataset["rows"]>` and omits both `title` and `declaredRowCount` from the writer-bound envelope.
- The production record's claims that all three values are carried into one export envelope and that inspection confirmed that mapping are unsupported and contradicted by the cited implementation.
- The dependency and file-boundary claim is consistent with the three cited source modules: their only import relationships are among those modules, and no external dependency is used.

## Required revisions

- [ ] Change the export pipeline so the envelope payload contains `title`, `declaredRowCount`, and `rows`, as required by the owner prompt.
- [ ] Update the production record's produced-output, requirement-mapping, and verification claims to match the corrected implementation.
- [ ] Cite and record a deterministic check that exercises `packageDataset` and proves all three values are present in the resulting envelope.

RECEIPT: Review read — 6574ea66-cc9b-4a3b-9757-1f380db6f4d6
