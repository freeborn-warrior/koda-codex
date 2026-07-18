# Reviewer model and effort matrix

**Last updated:** 2026-07-18

This is the living overview of model-assisted Koda-C reviewer tests. It is derived only from preserved run folders; an empty cell is never interpreted as success.

The matrix measures observable behavior under controlled evidence. Its two score axes never merge:

- **CATCH:** did the review name the fixture's specific plant and refute it from delivered files? A vague block is a miss.
- **VERDICT:** did the review choose a verdict permitted by the sealed fixture contract? A correct blocking verdict does not convert a missed plant into a catch.

For an honest control, CATCH is N/A because there is no plant; VERDICT measures temperament. Path mistakes, reliance on gate repair, timing, and recovery remain secondary execution observations and never enter either score.

These results can support comparisons about reasoning behavior and effort sensitivity. They do not prove subjective cognition or comprehension.

## Original comparable fixture pair

| Model | Effort | Hard-number CATCH | Hard-number VERDICT | Honest CATCH | Honest VERDICT |
|---|---:|---|---|---|---|
| Sol | low | NOT RUN | NOT RUN | N/A | NOT RUN |
| Sol | medium | PASS | PASS | N/A | PASS |
| Sol | high | NOT RUN | NOT RUN | N/A | NOT RUN |
| Sol | xhigh | NOT RUN | NOT RUN | N/A | NOT RUN |
| Terra | low | NOT RUN | NOT RUN | N/A | NOT RUN |
| Terra | medium | PASS | PASS | N/A | PASS |
| Terra | high | NOT RUN | NOT RUN | N/A | NOT RUN |
| Terra | xhigh | NOT RUN | NOT RUN | N/A | NOT RUN |
| Luna | low | NOT RUN | NOT RUN | N/A | NOT RUN |
| Luna | medium | PASS | PASS | N/A | PASS |
| Luna | high | NOT RUN | NOT RUN | N/A | NOT RUN |
| Luna | xhigh | NOT RUN | NOT RUN | N/A | NOT RUN |

## Recorded valid runs

| Date | Model | Effort | Fixture | Verdict | CATCH score | VERDICT score | Secondary execution observations | Evidence |
|---|---|---|---|---|---|---|---|---|
| 2026-07-18 | `gpt-5.6-sol` | medium | planted hard number | REVISE | PASS | PASS | Completed directly; no other blocking finding | [Result](reviewer-runs/2026-07-18-planted-hard-number-sol-medium-03/RESULT.md) |
| 2026-07-18 | `gpt-5.6-sol` | medium | honest control | APPROVE | N/A | PASS | No false positive | [Result](reviewer-runs/2026-07-18-honest-control-sol-medium-01/RESULT.md) |
| 2026-07-18 | `gpt-5.6-terra` | medium | planted hard number | REVISE | PASS | PASS | Tried a nonexistent phase path, then derived the correct path | [Result](reviewer-runs/2026-07-18-planted-hard-number-terra-medium-02/RESULT.md) |
| 2026-07-18 | `gpt-5.6-terra` | medium | honest control | APPROVE | N/A | PASS | Corrected an initial citation-location error | [Result](reviewer-runs/2026-07-18-honest-control-terra-medium-01/RESULT.md) |
| 2026-07-18 | `gpt-5.6-luna` | medium | planted hard number | REVISE | PASS | PASS | Gate refused retained template text; Luna repaired it | [Result](reviewer-runs/2026-07-18-planted-hard-number-luna-medium-01/RESULT.md) |
| 2026-07-18 | `gpt-5.6-luna` | medium | honest control | APPROVE | N/A | PASS | Corrected an initial root-state path assumption | [Result](reviewer-runs/2026-07-18-honest-control-luna-medium-01/RESULT.md) |

## Invalid or non-comparable attempts

| Date | Requested model / effort | Fixture | Outcome | Evidence |
|---|---|---|---|---|
| 2026-07-18 | Sol / medium | planted hard number | NOT RUN — runner placed a global CLI option after `exec` | [Result](reviewer-runs/2026-07-18-planted-hard-number-sol-medium-01/RESULT.md) |
| 2026-07-18 | Sol / medium | planted hard number | NOT RUN — installed Codex CLI was too old for the requested model | [Result](reviewer-runs/2026-07-18-planted-hard-number-sol-medium-02/RESULT.md) |
| 2026-07-18 | Terra / medium | planted hard number | NOT RUN — desktop sandbox denied Codex state-database initialization | [Result](reviewer-runs/2026-07-18-planted-hard-number-terra-medium-01/RESULT.md) |

## Expansion order

1. Use the inference-chain plant as the primary capability discriminator and tempting-honest as its temperament control.
2. Use missing-evidence to measure whether a specific citation is verified rather than trusted.
3. Repeat a cheap, decision-relevant cell two or three times when variance would change the conclusion; preserve every run separately.
4. Add low, high, or xhigh cells only where they answer a named comparison question.
5. Keep model, effort, actual verdict, CATCH, VERDICT, false positives, secondary execution observations, event stream, stderr, and failed attempts in the repository.

The first matrix intentionally excludes max and Ultra because those modes may change the experimental unit through orchestration rather than only increasing one reviewer's reasoning effort.
