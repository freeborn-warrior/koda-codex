# Session prompt

## Owner intent
Build and verify the first bounded Markdown heading reporter now, so Koda-C's complete Guide, Producer, Reviewer, receipt-gate, and pushed-close experience can be tested on plausible work before submission without beginning Koda-C self-hosting.

## In scope
- Create one dependency-free Node.js command that accepts exactly one local UTF-8 Markdown-file path.
- Recognize ordered ATX headings from level 1 through level 6 and record each heading's level, text, and one-based line number.
- Ignore heading-like lines inside backtick or tilde fenced code blocks.
- Emit JSON containing the source path and ordered heading records.
- Save deterministic checks and raw live evidence for ordinary headings, fenced pseudo-headings, a file with no headings, and a missing path.

## Out of scope
- Setext headings, directories, recursion, standard input, binary formats, package dependencies, network access, publishing, or performance promises.
- Koda-C self-hosting, simultaneous session pairs, forced process interruption, planted reviewer defects, or changes to the Koda-C submission source.

## Success evidence
- A stranger can run the saved command against committed fixtures and reproduce the expected JSON.
- The saved checks prove ordered level/text/line records, fenced-code exclusion, an empty heading array, a clear nonzero missing-path refusal, and unchanged inputs.
- The Live artifact cites raw command output saved in the project.
- All six configured phases receive independent review and owner acknowledgement, then immutable close is committed, pushed, verified, and returned to Guide.

## Constraints and owner rulings
- Require Node.js 22.18 or newer and use no package dependency.
- Keep the command offline and preserve every input file unchanged.
- Producer remains input-closed after session start; Kristian communicates about the active session only through the persistent Reviewer.
- Direction recorded after a phase begins waits for the next successful gate; explicit pushed halt is the only interrupt.
- No review verdict or revision count is predetermined. Route the genuine result mechanically.
- Keep every persistent output and all verification evidence inside the project.

## Prior session carry-forward
- Previous terminal evidence: none; this is the first session
- Previous summary: none
- Carried forward by owner: none
- Deliberately not carried: forward-only Koda-C self-hosting, which is deferred until after submission

## Relay handover
- Session kind: produce
- Launch relationship: independent first session (no predecessor or active sibling)
- Dependencies: none; this is the first session and no sibling is active
- Configured receiver: brief
- Ground prepared: `AGENTS.md`, `docs/PROJECT.md`, `docs/BACKLOG.md`, `docs/WORKING-PLAN.md`, and `docs/IN-PHASE-CONSULTATION.md`
- Open items: none
