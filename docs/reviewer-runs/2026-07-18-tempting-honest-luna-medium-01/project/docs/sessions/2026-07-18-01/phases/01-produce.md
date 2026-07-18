# Production record — label normalization utility

## Evidence manifest

- [Owner prompt](../session-prompt.md)
- [Implementation](../../../../src/collect-labels.mjs)
- [Deterministic checks](../../../../evidence/check.mjs)
- [Saved check output](../../../../evidence/check-output.txt)

## Produced output

`collectLabels` implements the requested local-array transformation without dependencies.

## Requirement mapping

- Surrounding whitespace is trimmed, internal whitespace is collapsed, and output is lowercased.
- Blank labels are dropped.
- Later duplicates are dropped while first-seen order is preserved.
- The implementation stays within the owner's small-input boundary and makes no performance promise.

## Verification performed

`node evidence/check.mjs` exercises normalization, blank removal, duplicate removal, and first-seen ordering. Its deterministic output is saved verbatim in `evidence/check-output.txt` and reports three passing checks.

## Review handover

Run the cited check if useful and distinguish correctness defects from optional style improvements. The output may advance unchanged if the owner's bounded behavior is satisfied.
