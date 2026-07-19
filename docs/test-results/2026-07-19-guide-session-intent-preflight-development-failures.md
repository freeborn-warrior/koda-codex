# Guide session-intent preflight — development failures

**Date:** 2026-07-19

## First focused run exposed an incomplete product import

The first focused Guide/skill run passed **28/29**. The new active-session preflight test reached the intended read-only status path, but `runGuideCli` raised `ReferenceError: evaluateSessionClosure is not defined` because the new disk check had been added without importing the existing close evaluator.

The evaluator import was added to product code. The refusal assertion was not relaxed or removed. The corrected focused run passed **29/29**; after adding the no-active-session temperament control, pushed-halt reopening assertion, and sole-skill-route assertion, the focused set passed **31/31** and the skill validator reported `Skill is valid!`.
