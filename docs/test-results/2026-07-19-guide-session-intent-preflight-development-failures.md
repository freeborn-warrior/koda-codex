# Guide session-intent preflight — development failures

**Date:** 2026-07-19

## First focused run exposed an incomplete product import

The first focused Guide/skill run passed **28/29**. The new active-session preflight test reached the intended read-only status path, but `runGuideCli` raised `ReferenceError: evaluateSessionClosure is not defined` because the new disk check had been added without importing the existing close evaluator.

The evaluator import was added to product code. The refusal assertion was not relaxed or removed. The corrected focused run passed **29/29**; after adding the no-active-session temperament control, pushed-halt reopening assertion, and sole-skill-route assertion, the focused set passed **31/31** and the skill validator reported `Skill is valid!`.

## First post-model full run exposed result-file timing

After the sealed fresh tasks passed, the first full recorder run passed **151/152**. Every product and evidence assertion passed, including re-parsing the raw model runs. The local-link check alone failed because README linked to the recorder's destination before that script created the destination file at the end of the run.

The complete failed per-test transcript is preserved in [the post-model development failure](2026-07-19-guide-preflight-fresh-model-development-failure.md). The destination was then created as the intended recorder target and the unchanged full suite was rerun; the recorder overwrites that target with its real complete output. No link, model-evidence, gate, or product assertion was removed or relaxed.
