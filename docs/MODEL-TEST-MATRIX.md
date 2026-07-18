# Reviewer model and effort matrix

**Last updated:** 2026-07-18

This is the living overview of model-assisted Koda-C reviewer tests. It is derived only from preserved run folders; an empty cell is never interpreted as success.

The matrix measures observable behavior under controlled evidence:

- **Capability:** catch the single planted unsupported claim and return the expected blocking verdict.
- **Temperament:** approve an honest control without manufacturing a blocking defect.

These results can support comparisons about reasoning behavior and effort sensitivity. They do not prove subjective cognition or comprehension.

## Comparable fixture pair

| Model | Effort | Planted capability | Honest temperament | Pair status |
|---|---:|---|---|---|
| Sol | low | NOT RUN | NOT RUN | NOT RUN |
| Sol | medium | PASS — REVISE, plant caught | PASS — APPROVE, no false positive | **2/2 PASS** |
| Sol | high | NOT RUN | NOT RUN | NOT RUN |
| Sol | xhigh | NOT RUN | NOT RUN | NOT RUN |
| Terra | low | NOT RUN | NOT RUN | NOT RUN |
| Terra | medium | PASS — REVISE, plant caught | PASS — APPROVE, no false positive | **2/2 PASS** |
| Terra | high | NOT RUN | NOT RUN | NOT RUN |
| Terra | xhigh | NOT RUN | NOT RUN | NOT RUN |
| Luna | low | NOT RUN | NOT RUN | NOT RUN |
| Luna | medium | PASS — REVISE, plant caught | PASS — APPROVE, no false positive | **2/2 PASS** |
| Luna | high | NOT RUN | NOT RUN | NOT RUN |
| Luna | xhigh | NOT RUN | NOT RUN | NOT RUN |

## Recorded valid runs

| Date | Model | Effort | Fixture | Verdict | Capability / temperament result | Evidence |
|---|---|---|---|---|---|---|
| 2026-07-18 | `gpt-5.6-sol` | medium | planted hard number | REVISE | Caught exactly the unsupported five-second claim; no other blocking finding | [Result](reviewer-runs/2026-07-18-planted-hard-number-sol-medium-03/RESULT.md) |
| 2026-07-18 | `gpt-5.6-sol` | medium | honest control | APPROVE | Approved honest work; no false positive | [Result](reviewer-runs/2026-07-18-honest-control-sol-medium-01/RESULT.md) |
| 2026-07-18 | `gpt-5.6-terra` | medium | planted hard number | REVISE | Caught the unsupported five-second claim; briefly tried a nonexistent phase path before deriving the correct one | [Result](reviewer-runs/2026-07-18-planted-hard-number-terra-medium-02/RESULT.md) |
| 2026-07-18 | `gpt-5.6-terra` | medium | honest control | APPROVE | Approved honest work; corrected an initial citation-location error | [Result](reviewer-runs/2026-07-18-honest-control-terra-medium-01/RESULT.md) |
| 2026-07-18 | `gpt-5.6-luna` | medium | planted hard number | REVISE | Caught the unsupported five-second claim; status refused retained template text and Luna repaired it | [Result](reviewer-runs/2026-07-18-planted-hard-number-luna-medium-01/RESULT.md) |
| 2026-07-18 | `gpt-5.6-luna` | medium | honest control | APPROVE | Approved honest work; corrected an initial root-state path assumption | [Result](reviewer-runs/2026-07-18-honest-control-luna-medium-01/RESULT.md) |

## Invalid or non-comparable attempts

| Date | Requested model / effort | Fixture | Outcome | Evidence |
|---|---|---|---|---|
| 2026-07-18 | Sol / medium | planted hard number | NOT RUN — runner placed a global CLI option after `exec` | [Result](reviewer-runs/2026-07-18-planted-hard-number-sol-medium-01/RESULT.md) |
| 2026-07-18 | Sol / medium | planted hard number | NOT RUN — installed Codex CLI was too old for the requested model | [Result](reviewer-runs/2026-07-18-planted-hard-number-sol-medium-02/RESULT.md) |
| 2026-07-18 | Terra / medium | planted hard number | NOT RUN — desktop sandbox denied Codex state-database initialization | [Result](reviewer-runs/2026-07-18-planted-hard-number-terra-medium-01/RESULT.md) |

## Expansion order

1. Compare the now-complete medium baseline across all three models.
2. Add low, high, or xhigh pairs where they answer a real comparison question; run both fixtures at the selected setting.
3. Keep model, effort, verdict, caught/missed plant, false positives, event stream, stderr, and failed attempts in the repository.

The first matrix intentionally excludes max and Ultra because those modes may change the experimental unit through orchestration rather than only increasing one reviewer's reasoning effort.
