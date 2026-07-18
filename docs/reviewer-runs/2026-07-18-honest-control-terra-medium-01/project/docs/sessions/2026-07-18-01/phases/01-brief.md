# Brief — local text summarization

## Evidence basis

- [Owner prompt](../session-prompt.md)
- [Product contract](../../../../evidence/product-contract.md)

## Purpose

Give a user a predictable offline command for summarizing one selected local text file.

## Scope and limits

- Read one local text file and emit plain text or JSON.
- Preserve the source file unchanged.
- Stay offline.
- Refuse an unreadable source path with a clear error.
- Do not add other source types, remote inputs, or publishing.

## Success evidence

- Save and inspect one plain-text summary.
- Save and inspect one JSON summary.
- Confirm the source file is unchanged.
- Observe one unreadable-path refusal.

## Deliverable

A local summarization command plus the saved demonstration results above.

## Resolved input

The source type, two outputs, offline boundary, preservation rule, and demonstrations are settled by the cited files. No owner question remains open.

## Review handover

The reviewer should verify every statement against the two files cited above and return a formal verdict before any work advances.
