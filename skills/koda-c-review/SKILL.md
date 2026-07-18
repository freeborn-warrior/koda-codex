---
name: koda-c-review
description: Independently verify the current Koda phase artifact against the actual files it cites, choose the correct gate verdict, and write a unique receipt-bearing review. Use for every formal phase review; keep one shared reviewer skill rather than copying rules per phase.
---

# Koda-C Review

Act as the independent receiver after a producer phase artifact is ready. Treat files as the only truth. Never act as the artifact's producer, owner approver, or gate operator.

## ENTRY CHECK

1. Locate `koda.config.json`, the latest session's `state.json`, and its current phase. Refuse if the user's named phase differs from disk.
2. Require a non-empty current artifact at `phases/<NN>-<phase>.md`. Refuse with its exact path if missing.
3. When `currentPhaseIndex > 0`, derive the prior phase from `state.json` and verify its artifact, definitive review, exact ledger receipt, and advancement record.
4. Read only the current artifact and files it explicitly cites. Do not use producer chat context or roam through unrelated files to rescue missing evidence.
5. If an active review exists, run no replacement until its receipt is recorded; for DISCUSS, require the owner's ruling too. Never overwrite an unread review.

## ITS OWN JOB

1. Verify every material claim against cited files. Distinguish observed fact, inference, and unsupported assertion.
2. Choose one verdict using the rules below.
3. Run `koda review new <phase>` to generate protected metadata and a unique receipt.
4. Replace the template findings. Preserve the `KODA_REVIEW` metadata line exactly, keep `VERDICT: ...` first, and keep the generated `RECEIPT: ...` as the final non-empty line.
5. Run `koda status`. Repair metadata, artifact-hash, uniqueness, or receipt problems before reporting.

### Verdict rules

- `APPROVE`: The cited files support the artifact unchanged.
- `APPROVE WITH COMMENTS`: It may advance unchanged, but non-blocking comments must enter the approval ledger.
- `REVISE`: Correctable problems return to the same phase producer. List every required revision as a checkable item.
- `REJECT`: The artifact is fundamentally unusable. State why and what a replacement must establish.
- `DISCUSS`: Only an owner ruling can settle the question. State it plainly; do not use DISCUSS for fixable defects.

The review does not activate another phase. After the owner reads and quotes the receipt, `koda advance` applies the verdict: allowed verdicts activate the next phase from config; blocking verdicts remain in the same phase and require a fresh review.

### Phase-specific criteria

#### Brief

Verify that the cited session prompt supports the purpose, scope, limits, success evidence, deliverable, resolved input, and review handover. Flag future promises stated as completed facts.

#### Orient

Verify the cited ground, constraints, unknowns, inferences, and boundaries. Flag conclusions that outrun inspected evidence or drift into planning.

#### Plan

Verify approved inputs, ordered work, observable outputs, negative checks, scope controls, and resolved owner decisions. Flag work whose completion cannot be proved.

#### Produce

Inspect the actual produced files cited by the manifest. Verify requirement mapping and claimed checks. Run cited deterministic checks when safe; never repeat a claimed result as observed evidence.

#### Live

Verify the real output was exercised, exact methods and environment were recorded, observed results match saved evidence, and failures or skipped conditions remain visible.

#### Summary

Verify every completion and test claim against session artifacts, reviews, ledger entries, and live evidence. Require closure to remain pending until its separate ceremony succeeds.

#### Custom phases

Apply the current phase description from `state.json`, the artifact's declared purpose, and the same evidence standard. Use DISCUSS when only the owner can define success.

## HANDOVER OBLIGATION

Write the complete review to disk before reporting anything in chat. Use concise Markdown with evidence checked, required revisions or owner questions, and optional comments. Omit empty sections except owner questions for DISCUSS.

Do not quote the receipt in chat, approve it, run `koda advance`, modify the producer artifact, or begin another phase. Report only the review path and verdict so the owner must read the file. Leave routing to the receipt gate.
