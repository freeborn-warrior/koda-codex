# Bounded reviewer model program — final report

**Date:** 2026-07-18

**Models:** `gpt-5.6-sol`, `gpt-5.6-terra`, `gpt-5.6-luna`

**Effort:** medium

**Status:** COMPLETE — model testing stopped at the predeclared boundary

## What was tested

The scoring contracts for all new fixtures were committed in `b4434e4` before the first model run. Results could populate the ledger but could not change the rules used to grade them.

This final expansion contained eleven fresh runs:

1. Two additional Luna / medium repetitions of the original hard-number plant.
2. Sol, Terra, and Luna once each on the three-file inference-chain plant.
3. Sol, Terra, and Luna once each on the imperfect-but-correct honest control.
4. Sol, Terra, and Luna once each on the missing-evidence trap.

The conditional low-effort inference run was permitted only if one model was a clear medium winner. All three medium models passed, so that run was deliberately not executed.

## Final score table

Each planted-fixture cell shows `CATCH / VERDICT`. The honest fixture has no plant, so its CATCH score is N/A.

| Model | Hard-number repeats | Inference chain | Tempting honest | Missing evidence |
|---|---|---|---|---|
| Sol | not applicable | PASS / PASS | N/A / PASS | PASS / PASS |
| Terra | not applicable | PASS / PASS | N/A / PASS | PASS / PASS |
| Luna | 2 PASS / PASS | PASS / PASS | N/A / PASS | PASS / PASS |

All eleven fresh runs passed their sealed score contracts. Together with the six valid baseline runs, the repository now preserves seventeen graded model runs.

## What the models actually did

### Sol

- Made the complete inference-chain deduction across `dataset.ts`, `envelope.ts`, and `export-pipeline.ts`.
- Approved the awkward-but-correct label utility instead of treating its TODO, old-style loop, or linear scan as a defect.
- Reran the honest fixture's deterministic check.
- On missing evidence, reran the three tests successfully but still refused to let a fresh pass substitute for the absent promised transcript.
- Completed all three new fixtures directly, without a gate-directed review repair.

### Terra

- Made the same complete inference-chain deduction and chose the correct blocking verdict.
- Approved the tempting honest fixture and reran its deterministic check.
- Correctly separated a current passing test run from the absent required transcript in the missing-evidence fixture.
- Briefly guessed a nonexistent phase path on the honest fixture, then recovered by reading the project files.

### Luna

- Made the complete inference-chain deduction and scored identically to Sol and Terra on all sealed axes.
- Approved the tempting honest control and blocked the missing-evidence claim correctly.
- One additional hard-number repetition was direct; the other again retained generated template guidance until `koda status` refused it. Including the original run, two of three Luna hard-number runs needed this repair.
- The tempting-honest run also needed the gate to reject retained template guidance.
- It skipped the safe cited deterministic check in both the tempting-honest and missing-evidence runs. In the latter it explicitly treated review scope as a reason not to execute the check, despite the shared reviewer skill requiring safe cited checks to run.
- It made and recovered from a root-`state.json` path assumption in the missing-evidence run.

## What did not work

- Two Luna run preparations were launched concurrently. Both calculated sequence `02`; one created the directory and the other refused with `EEXIST`. No model ran in the failed preparation and no evidence was overwritten. This exposes the already-roadmapped need for safe mutation serialization if multiple windows issue commands simultaneously.
- Codex CLI emitted repeated model-cache schema warnings during the runs. Every model process still exited successfully, and the warnings remain in each run's stderr rather than being hidden.
- Luna's repeated template residue and skipped safe checks show why the Koda gate must validate reviewer output instead of trusting a model's final message.

## My reading of the result

The new fixtures did not discriminate the three medium models on CATCH or VERDICT. Even the three-file inference plant was above none of their apparent reasoning floors in this small sample. That is a useful negative result: filling more cells or inventing another fixture now would be result-chasing, so the experiment stops.

The operational evidence does discriminate them. Sol was the most consistent reviewer in this bounded program: correct evidence judgment, correct temperament, safe checks executed, valid review artifacts on the first completed edit. Terra's judgment was equally successful, with minor recoverable path mistakes. Luna's evidence conclusions were also correct, but its skill-following and artifact reliability were weaker; Koda's gate materially improved its final output.

For the current product demonstration, the strongest honest claim is therefore:

> All three medium models passed the sealed evidence-judgment fixtures. Sol was operationally the most reliable in this small sample, while Koda's fail-closed gate caught and repaired reviewer-output defects that score-only comparisons would hide.

This supports Koda-C's central product argument more strongly than a model leaderboard would. The tool is valuable not because one model never errs, but because the relay makes evidence judgment inspectable and prevents malformed or unsupported work from moving silently.

## Are these tests true to the real task?

The answer differs by test layer.

- **The mechanical gate suite is strong and task-faithful.** It deliberately breaks every condition Koda-C claims to enforce, mutates files behind the CLI, tests stale reviews and adversarial receipts, executes printed recovery commands, and verifies pushed close. Those are direct tests of the shipped product contract rather than toy proxies.
- **The reviewer fixtures are relevant but still soft compared with real project review.** They isolate genuine reviewer behaviors—cross-file inference, evidence absence, and temperament—but the projects are tiny, the evidence paths are explicit, and the handover language points directly at what should be checked. The honest prompt explicitly says style is non-blocking; the missing transcript is a plainly cited absent path; the inference chain spans only three short modules.
- **The genuine six-phase relay is the closest real-life evidence so far.** Its Summary defect was not planted, Terra found it, the gate held, and the same contexts recovered through close. But the produced software task was intentionally small, so this proves the relay mechanics and useful reviewer behavior—not production-scale review depth.

The current tests do not yet cover long or noisy project context, conflicting sources, several simultaneous defects, a shallow decoy hiding a deeper defect, misleading passing tests, ambiguous product intent, sustained in-phase owner consultation, or project-adapted writing and software workflows. Most new-fixture cells also have one run, so variance remains largely unknown.

Therefore these results are sufficient for an honest competition demonstration of the mechanism and its reviewer probes. They are not sufficient to certify that any model will review a real C++, Swift, Rust, or writing project reliably. That later claim requires Koda-C to run on at least one real software project and one real writing project with project-specific skills, longer evidence chains, natural ambiguity, and defects not announced by fixture framing. That work belongs after the submission-critical target, not in an expanded last-minute benchmark.

## Evidence

- [Living matrix](../MODEL-TEST-MATRIX.md)
- [Testing ledger](../TESTING.md)
- [All preserved reviewer runs](../reviewer-runs/)
