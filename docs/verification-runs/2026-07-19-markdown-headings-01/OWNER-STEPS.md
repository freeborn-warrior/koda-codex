# Owner steps — three-window verification

**Current state:** the failed attempt is finished and pushed-halted. A fresh retry
prompt is now drafted and pushed, but it is not owner-confirmed and no launch
request or terminal window has been created.

The first live launch reached a real Brief and formal review, but the terminal
adapter created unintended tabs and exposed an ambient credential. Kristian used
the Reviewer-side halt. Halt `c9743416-67dc-45bd-b7f0-4de56c6bb300` is pushed at
verification-project commit `ba22bfe`; zero phases advanced and zero owner
acknowledgements exist.

## What Kristian should do now

Nothing in Producer or Reviewer. Those windows remain closed. Keep the existing
Guide open; it is safe because Guide is between sessions and the halted session is
visible from disk.

Do not reuse the old launch command, Brief, review, or receipt. Do not ask Guide
to resume this session.

When ready to review the retry, speak naturally in Guide:

> Show me the proposed retry session in ordinary language. Do not confirm or
> launch anything yet.

Guide must discover the technical proof itself. Kristian must never paste a
command, path, commit, hash, test count, receipt, or evidence location from
another context. Only after the plain-language proposal is acceptable should
Kristian explicitly confirm it. Launch remains a later, separate owner action
given one step at a time.

See the [halted result](RESULT.md) and the sanitized
[security incident](../../security-runs/2026-07-19-ghostty-launch-integrity-incident/RESULT.md).
The exact unconfirmed retry is archived as
[RETRY-SESSION-PROMPT-DRAFT.md](RETRY-SESSION-PROMPT-DRAFT.md).
