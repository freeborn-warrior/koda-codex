# Reviewer model and effort matrix

**Last updated:** 2026-07-18

This is the living overview of model-assisted Koda-C reviewer tests. It is derived only from preserved run folders; an empty cell is never interpreted as success.

The matrix measures observable behavior under controlled evidence. Its two score axes never merge:

- **CATCH:** did the review name the fixture's specific plant and refute it from delivered files? A vague block is a miss.
- **VERDICT:** did the review choose a verdict permitted by the sealed fixture contract? A correct blocking verdict does not convert a missed plant into a catch.

For an honest control, CATCH is N/A because there is no plant; VERDICT measures temperament. Path mistakes, reliance on gate repair, timing, and recovery remain secondary execution observations and never enter either score.

These results can support comparisons about reasoning behavior and effort sensitivity. They do not prove subjective cognition or comprehension.

## Sealed-contract boundary

Every source fixture's expected verdict and exact CATCH definition was committed and pushed in `b4434e4` before the first run against any of the three new fixtures. Those scoring contracts are immutable for this experiment: observed model output may populate result rows but may never tune the rule used to grade them.

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

1. Before any new-fixture run, execute two more fresh Luna / medium runs against `planted-hard-number`. Score each separately to see whether gate rescue of a malformed review recurs or was isolated.
2. Run `inference-chain-plant`, `tempting-honest`, and `missing-evidence` once at medium on Sol, Terra, and Luna: nine fresh runs with unchanged fixture sources.
3. If those inference-chain results identify one defensible medium winner, run that model once on the same inference-chain fixture at low effort. If medium ties, record no unique winner and do not manufacture a low-effort comparison.
4. Stop model testing. Do not run high, xhigh, max, Ultra, extra fixtures, or completeness cells before submission.
5. Keep model, effort, actual verdict, CATCH, VERDICT, false positives, secondary execution observations, event stream, stderr, and failed attempts in the repository.

The matrix is intentionally incomplete. Its purpose is honest, saved behavioral evidence—not a filled grid.
