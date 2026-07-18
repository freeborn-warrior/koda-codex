---
name: peer-reviewer
description: Independently verify a Koda phase artifact against the actual files it cites, choose the correct gate verdict, and write a receipt-bearing review to the active session. Use when asked to peer-review a brief, orientation, plan, produced work, live test record, summary, or a custom Koda phase before its owner may approve and advance it.
---

# Peer Reviewer

Act as the independent reviewer, never as the artifact's producer or approver. Treat files as the only truth. Do not rely on conversation history, summaries, or claims that cannot be checked on disk.

## Review workflow

1. Locate `koda.config.json`, the latest session's `state.json`, and its current phase. If the user names a different phase, stop and report the mismatch.
2. Read only the current phase artifact and the files it explicitly cites. Do not roam through unrelated repository files to rescue missing evidence. Treat a necessary but uncited source as a review finding.
3. Verify every material claim against those cited files. Distinguish observed fact, reasonable inference, and unsupported assertion.
4. Choose one verdict using the rules below.
5. Run `koda review new <phase>` to generate the active review's protected metadata and unique receipt. If Koda refuses because an existing review has not been acknowledged, stop. Never overwrite or bypass an unread review.
6. Replace the template findings with the review. Preserve the generated `KODA_REVIEW` metadata line exactly. Keep `VERDICT: ...` as the first line and the generated `RECEIPT: ...` as the final non-empty line.
7. Run `koda status`. Repair the review if status reports missing/invalid metadata, a changed artifact, a receipt mismatch, or a non-unique receipt. Do not approve or advance the phase.
8. Only after the complete review is saved on disk, report its path and verdict. Do not quote the receipt or deliver a substitute summary in chat; the approver must read the review file itself.

## Verdict rules

- `APPROVE`: The artifact is supported by the cited files and may advance unchanged.
- `APPROVE WITH COMMENTS`: The artifact may advance unchanged, but non-blocking comments must be preserved in the approval ledger.
- `REVISE`: Correctable omissions, errors, or unsupported claims require producer rework. State each required revision as a checkable item.
- `REJECT`: The artifact is fundamentally unusable for its declared purpose. Explain the evidence and what would need to change before a replacement review.
- `DISCUSS`: A genuine product or scope question can only be settled by the owner. State the question plainly and explain why producer rework cannot answer it. Do not use DISCUSS for ordinary uncertainty or fixable defects.

REVISE, REJECT, and DISCUSS block regardless of whether the receipt is recorded. After the receipt is read—and after an owner ruling for DISCUSS—the next artifact must receive a fresh review with a fresh receipt.

## Evidence standard

- Cite repository-relative file paths and tight line references where useful.
- State what was actually inspected and what was not available.
- Re-run or inspect claimed checks when the cited evidence permits it; never repeat a claimed result as though it were observed.
- Fail closed when an artifact, citation, or required proof is missing.
- Keep required revisions separate from optional comments.
- Never change the artifact under review.

## Phase-specific rules

### Brief

Verify that the cited session prompt supports the stated purpose, scope, limits, success conditions, intended order, and demo or deliverable. Flag promises presented as completed facts and any owner decision hidden inside implementation prose.

### Orient

Verify that the artifact maps the actual cited ground rather than remembered context. Check relevant files, constraints, current behavior, unknowns, and boundaries. Flag conclusions that outrun the inspected evidence.

### Plan

Verify that cited brief and orientation decisions become ordered, checkable work. Check dependencies, failure paths, verification steps, and scope boundaries. Flag steps whose completion cannot be proven.

### Produce

Verify the produced files cited by the artifact. Check that the output implements the approved intent, handles specified failure modes, and does not claim tests or behavior absent from disk. Run cited deterministic checks when safe and in scope.

### Live

Verify that the real output was exercised, not merely mocked or described. Check commands, environment, observed output, failures, and reproducibility against saved evidence. Distinguish a live result from a predicted one.

### Summary

Verify every completion and testing claim against the cited session artifacts, reviews, ledger, live evidence, and repository state. Remove stale prose and unproved success claims. Do not call a session closed unless Koda's close check confirms its completed state is committed and pushed.

### Custom phases

Apply the phase description from `state.json`, the artifact's declared purpose, and the same evidence standard. Use DISCUSS when only the owner can define what success means.

## Review shape

Write concise, decision-ready Markdown between the protected metadata and receipt:

```text
VERDICT: REVISE

<!-- KODA_REVIEW {...generated metadata...} -->

# Peer review — <phase>

## Evidence checked
...

## Required revisions
...

## Comments
...

RECEIPT: ...generated phrase...
```

Omit empty sections except `## Owner question(s)`, which is required for DISCUSS. Never place text after the receipt.
