# Focused result — corrected manual-terminal integrity bootstrap

- Result: **PASS**
- Recorded at: 2026-07-21T12:33:30.700Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `4a134f0`
- Command: `node --test --test-reporter=spec --test-name-pattern='GUIDE NUMBERED LAUNCH|session open and close remain ceremonies|shared role launcher bytes|executable shared role launcher|PUBLIC GUIDE CONTRACT' tests/guide-console.test.ts tests/skill.test.ts tests/security.test.ts tests/submission.test.ts`

This narrow pass binds the corrected implementation commit so the complete suite
can run with integrity enforcement active. It is a development bootstrap, not the
release claim.

```text
✔ GUIDE NUMBERED LAUNCH: Ghostty and manual terminals coexist while not-now preserves the launch (8.101417ms)
✔ SECURITY INTEGRITY SUITE: shared role launcher bytes ignore ambient terminal locale and color (1.722917ms)
✔ SECURITY INTEGRITY SUITE: the executable shared role launcher starts one child with a clean environment (369.026625ms)
✔ session open and close remain ceremonies outside producer phase routing (5.831084ms)
✔ PUBLIC GUIDE CONTRACT: current entry docs use the product name and describe the shipped workflow (4.030959ms)
ℹ tests 5
ℹ suites 0
ℹ pass 5
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 469.007208
```
