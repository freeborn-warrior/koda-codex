# Focused result — manual-terminal integrity bootstrap

- Result: **PASS**
- Recorded at: 2026-07-21T12:26:58.182Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `68151e7`
- Command: `node --test --test-reporter=spec --test-name-pattern='GUIDE NUMBERED LAUNCH|session open and close remain ceremonies|shared role launcher bytes|executable shared role launcher|PUBLIC GUIDE CONTRACT' tests/guide-console.test.ts tests/skill.test.ts tests/security.test.ts tests/submission.test.ts`

This deliberately narrow pass establishes only enough current-code evidence to
assemble a development integrity manifest. It is not the release proof; the full
suite, mutation coverage, and security audit remain required afterward.

```text
✔ GUIDE NUMBERED LAUNCH: Ghostty and manual terminals coexist while not-now preserves the launch (8.622791ms)
✔ SECURITY INTEGRITY SUITE: shared role launcher bytes ignore ambient terminal locale and color (1.086458ms)
✔ SECURITY INTEGRITY SUITE: the executable shared role launcher starts one child with a clean environment (307.162542ms)
✔ session open and close remain ceremonies outside producer phase routing (3.111167ms)
✔ PUBLIC GUIDE CONTRACT: current entry docs use the product name and describe the shipped workflow (6.642833ms)
ℹ tests 5
ℹ suites 0
ℹ pass 5
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 423.522709
```
