# Session prompt

## Owner intent
Retry and verify the bounded Markdown heading reporter from a fresh Brief after session `2026-07-19-01` halted, preserving the genuine Koda-C workflow while carrying forward the owner's launcher-safety direction. This is the right next step because the launcher repair and post-push mechanical evidence are now verified, while no work from the voided Brief counts as approved and no implementation exists.

## In scope
- Start from a fresh Brief and create one dependency-free Node.js command that accepts exactly one local UTF-8 Markdown-file path.
- Recognize ordered ATX headings from level 1 through level 6 when the opening `#` sequence is followed by whitespace or the line ends, recording each heading's level, text, and one-based line number.
- Ignore heading-like lines inside backtick or tilde fenced code blocks.
- Emit JSON containing the source path and ordered heading records.
- Save deterministic checks and raw live evidence for ordinary headings, fenced pseudo-headings, a file with no headings, a missing or unreadable path, and unchanged input files.

## Out of scope
- Setext headings, directories, recursion, standard input, binary formats, package dependencies, network access, publishing, or performance promises.
- Koda-C self-hosting, simultaneous session pairs, forced process interruption, planted reviewer defects, or changes to the Koda-C submission source.
- Treating any artifact, review, or approval from the voided Brief in session `2026-07-19-01` as approved phase work.
- Modifying the already-pushed Ghostty launcher repair inside this product session.

## Success evidence
- The fresh owner-visible launch creates exactly one Reviewer window and one Producer window, creates no extra tabs, requires no confusing repeated permissions, never prints or exposes the ambient environment, and provides a clear human-safe start. If it does not, do not call the incident closed or treat the product session as successful.
- A stranger can run the saved command against committed fixtures and reproduce the expected JSON.
- Saved checks prove ordered level/text/line records, fenced-code exclusion, an empty heading array, a clear nonzero missing-or-unreadable-path refusal, and unchanged inputs.
- The Live artifact cites raw command output saved in the project.
- All six configured phases receive independent review and owner acknowledgement, then immutable close is committed, pushed, verified, and returned to Guide.

## Constraints and owner rulings
- Require Node.js 22.18 or newer and use no package dependency.
- Keep the command entirely offline and preserve every input file unchanged.
- Keep every persistent output and all verification evidence inside this project.
- Producer remains input-closed after session start; Kristian communicates about the active session only through the persistent Reviewer.
- Direction recorded after a phase begins waits for the next successful gate; explicit pushed halt is the only interrupt.
- No review verdict or revision count is predetermined. Route the genuine result mechanically.
- Carry forward the owner direction from halt `c9743416-67dc-45bd-b7f0-4de56c6bb300` exactly: “Fix the Ghostty launcher before any further session: one verified launch must create exactly one Reviewer window and one Producer window, create no extra tabs, require no confusing repeated permissions, never print or expose the ambient environment, and provide a clear human-safe start; then retest from a fresh Brief.”
- Require `koda guide status` to report verified toolkit capability `ghostty-clean-launch-v1`. Koda carries and binds the underlying integrity proof; Kristian must not relay its paths, hashes, commits, or test counts between contexts.
- The security audit does not infer real Ghostty window count or macOS permission behavior from deterministic tests. Until this retry's fresh owner-visible launch succeeds, describe the launcher as “repaired but not human-reverified,” never “incident closed.”

## Prior session carry-forward
- Previous terminal evidence: `docs/sessions/2026-07-19-01/halt.md` (halt ID `c9743416-67dc-45bd-b7f0-4de56c6bb300`)
- Previous summary: halted before Summary
- Carried forward by owner: “Fix the Ghostty launcher before any further session: one verified launch must create exactly one Reviewer window and one Producer window, create no extra tabs, require no confusing repeated permissions, never print or expose the ambient environment, and provide a clear human-safe start; then retest from a fresh Brief.”
- Deliberately not carried: the voided Brief artifact and review from session `2026-07-19-01`, and forward-only Koda-C self-hosting

## Relay handover
- Session kind: produce
- Launch relationship: dependent successor
- Dependencies: `2026-07-19-01`
- Configured receiver: brief
- Ground prepared: `AGENTS.md`, `docs/PROJECT.md`, `docs/BACKLOG.md`, `docs/WORKING-PLAN.md`, `docs/IN-PHASE-CONSULTATION.md`, `docs/sessions/2026-07-19-01/session-prompt.md`, `docs/sessions/2026-07-19-01/state.json`, `docs/sessions/2026-07-19-01/halt.md`, and verified toolkit capability `ghostty-clean-launch-v1`
- Open items: none
