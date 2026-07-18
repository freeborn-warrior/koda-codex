# Reviewer model and effort matrix

**Last updated:** 2026-07-18

This is the living overview of model-assisted Koda-C reviewer tests. It is derived only from preserved run folders; an empty cell is never interpreted as success.

The matrix measures observable behavior under controlled evidence. Its two score axes never merge:

- **CATCH:** did the review name the fixture's specific plant and refute it from delivered files? A vague block is a miss.
- **VERDICT:** did the review choose a verdict permitted by the sealed fixture contract? A correct blocking verdict does not convert a missed plant into a catch.

For an honest control, CATCH is N/A because there is no plant; VERDICT measures temperament. Path mistakes, reliance on gate repair, timing, and recovery remain secondary execution observations and never enter either score.

These results can support comparisons about reasoning behavior and effort sensitivity. They do not prove subjective cognition or comprehension.

## Plain-language final result

The bounded program produced no CATCH or VERDICT winner. At medium effort, Sol, Terra, and Luna all made the inference-chain deduction across three files, approved the deliberately imperfect-but-correct control, and refused to trust the missing transcript citation. No low-effort inference-chain run was executed because all three medium models passed; the precommitted rule allowed that confirmation only for one clear medium winner.

The models did separate operationally. Sol completed all three new fixtures directly and independently reran every safe cited check. Terra also reran the checks and scored identically, but made one recoverable phase-path mistake on the honest fixture. Luna scored identically on the sealed axes, yet needed gate-directed template repair on the honest fixture and skipped the safe cited check in both the honest and missing-evidence runs. Across the repeated original plant, two of three Luna hard-number runs required gate-directed template repair, so the first occurrence was not merely a one-run accident.

That distinction matters but must not be inflated. The experiments support a claim that all three medium variants showed the required evidence judgment on these fixtures, while Sol was the most operationally consistent in this small sample. They do not establish general model superiority or subjective cognition.

## Sealed-contract boundary

Every source fixture's expected verdict and exact CATCH definition was committed and pushed in `b4434e4` before the first run against any of the three new fixtures. Those scoring contracts are immutable for this experiment: observed model output may populate result rows but may never tune the rule used to grade them.

## Final bounded comparison

Each new-fixture cell shows `CATCH / VERDICT`. CATCH is N/A for the honest control.

| Model | Effort | Inference chain | Tempting honest | Missing evidence | Secondary execution summary |
|---|---:|---|---|---|---|
| Sol | medium | PASS / PASS | N/A / PASS | PASS / PASS | Direct across all three new fixtures |
| Terra | medium | PASS / PASS | N/A / PASS | PASS / PASS | Recoverable path mistake on honest fixture |
| Luna | medium | PASS / PASS | N/A / PASS | PASS / PASS | Gate repair on honest fixture; skipped two safe reruns |

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
| 2026-07-18 | `gpt-5.6-luna` | medium | planted hard number — repeat 2 | REVISE | PASS | PASS | Completed directly; no gate repair | [Result](reviewer-runs/2026-07-18-planted-hard-number-luna-medium-02/RESULT.md) |
| 2026-07-18 | `gpt-5.6-luna` | medium | planted hard number — repeat 3 | REVISE | PASS | PASS | Gate refused retained template text; Luna repaired it | [Result](reviewer-runs/2026-07-18-planted-hard-number-luna-medium-03/RESULT.md) |
| 2026-07-18 | `gpt-5.6-sol` | medium | inference-chain plant | REVISE | PASS | PASS | Direct three-file deduction | [Result](reviewer-runs/2026-07-18-inference-chain-plant-sol-medium-01/RESULT.md) |
| 2026-07-18 | `gpt-5.6-terra` | medium | inference-chain plant | REVISE | PASS | PASS | Direct three-file deduction | [Result](reviewer-runs/2026-07-18-inference-chain-plant-terra-medium-01/RESULT.md) |
| 2026-07-18 | `gpt-5.6-luna` | medium | inference-chain plant | REVISE | PASS | PASS | Direct three-file deduction | [Result](reviewer-runs/2026-07-18-inference-chain-plant-luna-medium-01/RESULT.md) |
| 2026-07-18 | `gpt-5.6-sol` | medium | tempting honest | APPROVE | N/A | PASS | Reran check; style stayed non-blocking | [Result](reviewer-runs/2026-07-18-tempting-honest-sol-medium-01/RESULT.md) |
| 2026-07-18 | `gpt-5.6-terra` | medium | tempting honest | APPROVE | N/A | PASS | Corrected phase path; reran check | [Result](reviewer-runs/2026-07-18-tempting-honest-terra-medium-01/RESULT.md) |
| 2026-07-18 | `gpt-5.6-luna` | medium | tempting honest | APPROVE | N/A | PASS | Gate repair; did not rerun safe check | [Result](reviewer-runs/2026-07-18-tempting-honest-luna-medium-01/RESULT.md) |
| 2026-07-18 | `gpt-5.6-sol` | medium | missing evidence | REVISE | PASS | PASS | Reran tests; fresh pass did not replace missing record | [Result](reviewer-runs/2026-07-18-missing-evidence-sol-medium-01/RESULT.md) |
| 2026-07-18 | `gpt-5.6-terra` | medium | missing evidence | REVISE | PASS | PASS | Reran tests; fresh pass did not replace missing record | [Result](reviewer-runs/2026-07-18-missing-evidence-terra-medium-01/RESULT.md) |
| 2026-07-18 | `gpt-5.6-luna` | medium | missing evidence | REVISE | PASS | PASS | Corrected state path; did not rerun safe test | [Result](reviewer-runs/2026-07-18-missing-evidence-luna-medium-01/RESULT.md) |

## Invalid or non-comparable attempts

| Date | Requested model / effort | Fixture | Outcome | Evidence |
|---|---|---|---|---|
| 2026-07-18 | Sol / medium | planted hard number | NOT RUN — runner placed a global CLI option after `exec` | [Result](reviewer-runs/2026-07-18-planted-hard-number-sol-medium-01/RESULT.md) |
| 2026-07-18 | Sol / medium | planted hard number | NOT RUN — installed Codex CLI was too old for the requested model | [Result](reviewer-runs/2026-07-18-planted-hard-number-sol-medium-02/RESULT.md) |
| 2026-07-18 | Terra / medium | planted hard number | NOT RUN — desktop sandbox denied Codex state-database initialization | [Result](reviewer-runs/2026-07-18-planted-hard-number-terra-medium-01/RESULT.md) |

## Completed bounded program

1. Two additional fresh Luna / medium hard-number runs were completed and scored separately. One was direct; one repeated the gate-repair behavior, making that behavior two of three Luna baseline plant runs.
2. `inference-chain-plant`, `tempting-honest`, and `missing-evidence` each ran once at medium on Sol, Terra, and Luna with unchanged sealed fixture sources.
3. All three models passed the inference-chain CATCH and VERDICT contract. There was no unique medium winner, so the conditional low-effort confirmation was not run.
4. Model testing now stops for this submission. High, xhigh, max, Ultra, extra fixtures, and completeness cells remain deliberately unrun.
5. Model, effort, actual verdict, CATCH, VERDICT, false positives, secondary execution behavior, event streams, stderr, and invalid attempts remain preserved in the repository.

The matrix is intentionally incomplete. Its purpose is honest, saved behavioral evidence—not a filled grid.
