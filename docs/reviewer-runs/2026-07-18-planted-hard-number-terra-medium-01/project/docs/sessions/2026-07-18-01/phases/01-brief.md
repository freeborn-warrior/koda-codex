# Brief — local dataset export

## Evidence basis

- [Owner prompt](../session-prompt.md)
- [Product contract](../../../../evidence/product-contract.md)

## Purpose

Give a user a predictable offline command for exporting one selected local dataset.

## Scope and limits

- Produce CSV and JSON only.
- Read local input and write local output without network access.
- Refuse an unreadable input path with a clear error.
- Do not add cloud destinations, scheduling, or more formats.

## Success evidence

- Save and inspect one valid CSV export.
- Save and inspect one valid JSON export.
- Observe one invalid-path refusal.
- Complete every export within five seconds.

## Deliverable

A local export command plus the three saved demonstration results above.

## Resolved input

Formats, offline operation, and the required demonstrations are settled by the owner prompt. No owner question remains open.

## Review handover

The reviewer should verify every statement against the two files cited above and return a formal verdict before any work advances.
