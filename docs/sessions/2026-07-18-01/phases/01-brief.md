# Brief — Build Session 01

- **Scope:** Build target (a): the gate-and-receipt CLI plus one generic peer-reviewer skill.
- **Stack:** TypeScript on Node.js, packaged for a one-line `npx` run on a fresh checkout.
- The CLI will keep no hidden state; every status and decision will be derived from plain files.
- Its small surface will cover initialization, sessions, status, review creation, approval, and advancement.
- The configurable default phase chain will be brief → orient → plan → produce → live → summary.
- An artifact must exist and be non-empty, and its review file must exist, before a gate can open.
- The review's final line must be a marked, generated, unique `RECEIPT:` phrase for that review.
- The approval ledger must contain that phrase verbatim; only outer whitespace is trimmed before exact matching.
- Only APPROVE and APPROVE WITH COMMENTS may advance; comments are preserved in the ledger.
- REVISE and REJECT return work to the producer; DISCUSS blocks and routes a question to Kristian, whose ruling is recorded in the ledger.
- Every revised or blocked case requires a fresh review with a fresh receipt before it can advance.
- Refusals will fail closed, name the missing proof, and print a command Kristian or a judge can paste directly.
- Tests will deliberately break every gate condition and prove that advancement refuses each mutation.
- Tests will also run every printed recovery command from the exact state that printed it and prove it works.
- One peer-reviewer skill will verify each phase by phase-specific rules and write its review before reporting.
- The demo fixture will be a tiny non-code project whose real refusal and receipt-gated success take about one minute.
- Work order is orient, plan, core phase engine, CLI UX, negative tests, reviewer skill, live demo, then summary.
- If a real demo-fixture `advance` refusal is not working by mid-afternoon today, Kristian drops to scope (b).
- Codex will warn Kristian before that fallback point is missed, rather than waiting for him to notice.
- Each model-assisted test defaults to one GPT-5.6 variant; Sol/Terra/Luna and effort combinations run only after target (a) lands and time remains.
- Every skipped variant or effort combination will be recorded in `docs/TESTING.md`; none will silently disappear.
- Stretch roles or orchestration begin only after target (a) works, is tested, and is honestly documented.

## Proposed repository tree

Everything below is proposed, not completed. At this gate, only the session prompt, Phase 01 brief, and its first review exist.

```text
.
├── package.json
├── tsconfig.json
├── koda.config.json
├── src/
│   ├── cli.ts
│   ├── commands.ts
│   ├── config.ts
│   ├── gate.ts
│   ├── project.ts
│   ├── receipt.ts
│   └── types.ts
├── tests/
│   ├── cli.test.ts
│   ├── config.test.ts
│   ├── gate.test.ts
│   ├── hints.test.ts
│   └── session.test.ts
├── skills/
│   └── peer-reviewer/
│       ├── SKILL.md
│       └── agents/
│           └── openai.yaml
├── demo/
│   └── fixture/
│       ├── session-prompt.md
│       ├── brief.md
│       └── brief-review-body.md
└── docs/
    ├── README.md
    ├── DEMO.md
    ├── TESTING.md
    └── sessions/
        └── 2026-07-18-01/
            ├── session-prompt.md
            ├── state.json
            ├── approvals.md
            ├── phases/
            │   ├── 01-brief.md
            │   ├── 02-orient.md
            │   ├── 03-plan.md
            │   ├── 04-produce.md
            │   ├── 05-live.md
            │   └── 06-summary.md
            └── reviews/
                ├── 01-brief-review.md
                ├── 02-orient-review.md
                ├── 03-plan-review.md
                ├── 04-produce-review.md
                ├── 05-live-review.md
                └── 06-summary-review.md
```

**Done means:** from a fresh checkout, a judge can see `advance` visibly refuse and then succeed only after reading and quoting the exact receipt.
