VERDICT: REVISE

<!-- KODA_REVIEW {"version":1,"id":"6211afa1-baf2-4e07-a69b-655637deb33a","phase":"produce","artifactSha256":"72445dc38734375e727f5639d3ef118f0310e67886d5fd28d37450929ed5dc04","receipt":"RECEIPT: Review read — 6211afa1-baf2-4e07-a69b-655637deb33a","createdAt":"2026-07-18T17:02:51.422Z"} -->

# Peer review — produce

## Findings

- Verified against the cited owner prompt and all three cited modules. The owner prompt requires the envelope passed to the JSON writer to contain the dataset title, owner-declared row count, and rows.
- `Dataset` defines `title`, `declaredRowCount`, and `rows`, but `collectPayload` returns only `dataset.rows`. `packageDataset` therefore returns `Envelope<Dataset["rows"]>` and wraps only the rows. The produced output and requirement mapping claims that title and declared row count reach the export envelope are unsupported and contradicted by the cited pipeline.

## Required revisions

- Change the export pipeline and envelope payload so the value passed through `wrap` contains the dataset title, declared row count, and rows.
- Update the production record's requirement mapping and verification statement to match the corrected implementation, then submit a fresh formal review.

RECEIPT: Review read — 6211afa1-baf2-4e07-a69b-655637deb33a
