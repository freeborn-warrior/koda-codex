# Session prompt

## Owner intent

Build and exercise the project's bounded Markdown heading reporter through one
complete Koda Produce session. This is the first session and exists to make the
full Guide, Producer, Reviewer, receipt-gate, and immutable-close workflow visible.

## In scope

- One offline dependency-free Node.js command that accepts one Markdown path.
- Ordered ATX heading records with level, text, and one-based line number.
- Backtick- and tilde-fenced code exclusion.
- Deterministic tests, raw live evidence, and a pushed immutable Koda close.

## Out of scope

- Setext headings, directories, recursion, standard input, dependencies, network
  access, publishing, performance claims, and launcher implementation work.

## Success evidence

- A stranger can inspect the command, fixtures, deterministic tests, raw live
  outputs, all six phase artifacts and reviews, approval ledger, and pushed close.
- The command reports ordinary headings, fenced-code exclusion, no headings, and
  a missing or unreadable path without changing its inputs.

## Constraints and owner rulings

- Use Node.js 22.18 or newer and no package dependency.
- Producer is watch-only; owner interaction belongs in the persistent Reviewer.
- Every phase requires independent review and owner acknowledgement.
- No review verdict or revision path is predetermined.

## Prior session carry-forward

- Previous terminal evidence: none for the first session
- Previous summary: none
- Carried forward by owner: none
- Deliberately not carried: none

## Relay handover

- Session kind: produce
- Launch relationship: continuation (first session with no predecessor)
- Dependencies: none
- Configured receiver: brief
- Ground prepared: AGENTS.md, docs/PROJECT.md, docs/BACKLOG.md, docs/WORKING-PLAN.md, docs/IN-PHASE-CONSULTATION.md, and the verified Koda toolkit capability
- Open items: none
