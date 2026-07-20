# Conversational Reviewer development failures — 2026-07-20

These failures occurred while converting the successful three-window run's UX
observations into product behavior. No gate, receipt, verdict, mutation, or close
assertion was removed or weakened.

## First focused run — 22/31 passed

Command:

```text
npm run build && node --test tests/relay-window.test.ts tests/guide-console.test.ts
```

Nine checks failed:

- Guide console persistence refused because the toolkit integrity seal correctly
  detected locally changed relay code. The seal was not bypassed or rewritten as a
  pass; Guide rendering was isolated into a pure test until a new pushed toolkit
  proof can replace the old manifest.
- Eight Reviewer/relay paths stopped on `redactRelayOutput is not defined`. The
  conversational final-answer renderer used the existing redactor without importing
  it. This was a real implementation defect. The import was added, after which the
  conversation, direction, receipt, migration, and full two-window paths resumed.

## Second Reviewer run — 21/22 passed

After the missing import was fixed, every mechanic passed except the full-session
presentation assertion. It still expected the superseded procedural title
`REVIEWER 2 — explain brief review`; the product correctly emitted the new bounded
`REVIEWER BRIEF — THINKING` and `REVIEWER BRIEF RESPONSE` surfaces. The assertion
was replaced with checks for the new direct response and the absence of the old
title. No behavioral or gate condition changed.

## Skill validator invocation

Direct execution of the repository-external validator failed with `permission
denied` because that file is not executable. Running the same validator through
`python3` passed: `Skill is valid!`. No permission bit outside this repository was
changed.

## Corrected focused results

- Reviewer/relay slice: **23/23 passed**, including a new mutation that refuses an
  empty conversational final answer instead of presenting a false completion.
- Guide renderer slice: **2/2 passed**; low-level inspection commands are hidden
  from the human surface while the direct Guide answer remains visible.
- `koda-c-review` skill validation: **PASS**.
- Dependency-free build and `git diff --check`: **PASS**.

Full-suite, package, security, and pushed-integrity results remain separate later
steps; this file does not claim them.
