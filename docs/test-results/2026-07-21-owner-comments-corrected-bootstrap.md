# Focused result — multi-part owner acknowledgement integrity bootstrap

- Result: **PASS**
- Recorded at: 2026-07-21T15:01:56.275Z
- Node: v26.0.0
- Platform: darwin arm64
- Base commit: `4dc31b5`
- Command: `node --test --test-reporter=spec --test-name-pattern='OWNER ACKNOWLEDGEMENT PIPE|owner receipt and ruling data never enter child-process arguments or environment' tests/relay-window.test.ts tests/security.test.ts`

This narrow pass binds the corrected implementation commit so the complete suite
can run with integrity enforcement active. It proves both affected multi-part
acknowledgement paths and the unchanged stdin-only security boundary. It is a
development bootstrap, not the release claim.

```text
✔ OWNER ACKNOWLEDGEMENT PIPE: APPROVE WITH COMMENTS preserves the receipt and comments without a stranded prompt (451.519041ms)
✔ OWNER ACKNOWLEDGEMENT PIPE: DISCUSS preserves the receipt and owner ruling without a stranded prompt (449.146209ms)
✔ SECURITY INTEGRITY SUITE: owner receipt and ruling data never enter child-process arguments or environment (3.432583ms)
ℹ tests 3
ℹ suites 0
ℹ pass 3
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 1014.084959
```
