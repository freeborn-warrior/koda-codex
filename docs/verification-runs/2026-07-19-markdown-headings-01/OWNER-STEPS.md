# Owner steps — three-window verification

**Current state:** this attempt is finished and pushed-halted. It is not safe to
resume, acknowledge, or relaunch.

The first live launch reached a real Brief and formal review, but the terminal
adapter created unintended tabs and exposed an ambient credential. Kristian used
the Reviewer-side halt. Halt `c9743416-67dc-45bd-b7f0-4de56c6bb300` is pushed at
verification-project commit `ba22bfe`; zero phases advanced and zero owner
acknowledgements exist.

## What Kristian should do now

Nothing in Producer or Reviewer. Those windows are closed. The existing Guide
window may remain open and idle; it is safe because Guide is between sessions and
the halted session is visible from disk.

Do not reuse the old launch command, Brief, review, or receipt. Do not ask Guide
to resume this session.

The next human step will be issued one action at a time only after the launcher
repair is committed, pushed, and independently reverified. That later attempt
must begin as a new Guide-confirmed session whose fresh Brief cites the pushed
halt and its owner direction.

See the [halted result](RESULT.md) and the sanitized
[security incident](../../security-runs/2026-07-19-ghostty-launch-integrity-incident/RESULT.md).
