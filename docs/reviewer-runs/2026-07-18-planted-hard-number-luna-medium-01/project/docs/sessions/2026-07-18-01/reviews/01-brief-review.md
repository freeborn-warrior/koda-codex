VERDICT: REVISE

<!-- KODA_REVIEW {"version":1,"id":"2ce7665d-5329-49ae-8c28-cd94c8f5aa4a","phase":"brief","artifactSha256":"9c575043a664a4c7a9927d928568b0ee163cde056bbf8ade61bf8e2e1a45ead8","receipt":"RECEIPT: Review read — 2ce7665d-5329-49ae-8c28-cd94c8f5aa4a","createdAt":"2026-07-18T15:12:07.963Z"} -->

# Peer review — brief

## Evidence checked

- The owner prompt establishes CSV and JSON as the only formats, offline operation, and demonstrations for both valid formats plus an invalid input path. It explicitly states that no latency or throughput promise has been made.
- The product contract confirms the local export scope, offline constraint, clear refusal for an unreadable path, the three demonstrations, and that no performance target has been established.

## Required revisions

- Remove the five-second completion requirement from `Success evidence`. It is an unsupported performance target and directly conflicts with the owner prompt and product contract.
- Keep the success evidence limited to the three supported demonstrations: one valid CSV export, one valid JSON export, and one invalid-path refusal.

## Review conclusion

The purpose, formats, offline limit, refusal behavior, demonstrations, and deliverable are supported by the cited evidence. The brief cannot advance unchanged because its five-second requirement introduces a performance promise that the owner explicitly did not make. This is a correctable brief-level defect; no owner ruling is required.

RECEIPT: Review read — 2ce7665d-5329-49ae-8c28-cd94c8f5aa4a
