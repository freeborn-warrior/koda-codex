# Whole-product audit development failures — 2026-07-19

No failing condition below was deleted, skipped, or weakened to make the suite
green.

## README evidence refresh — 156/157

- Command: `npm test`
- Result: **FAIL — 156 passed, 1 failed**
- Failing test: `JUDGE JOURNEY SUITE: video and submission documents preserve every live rule`
- Named reason: `docs/README.md` no longer contained the required link
  `[152-check fresh Guide preflight transcript](test-results/2026-07-19-guide-preflight-fresh-model-final.md)`.
- Cause: while promoting the new 157-check whole-product transcript and latest
  safety audit into the judge path, the older independent fresh-model transcript
  was replaced instead of retained beside it.
- Correction: the README now links both evidence classes. The 157-check result is
  the current deterministic regression; the 152-check result is the independent
  fresh-model Guide refusal and discovery proof. The assertion remains unchanged.
- Why this matters: a larger deterministic suite does not supersede genuinely
  fresh context evidence. The failed test correctly prevented an evidence class
  from disappearing during documentation polish.
