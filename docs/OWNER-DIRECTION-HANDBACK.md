# Historical owner-direction handback — superseded

This document preserves the name of an implemented experiment that allowed an owner direction discovered during review to return to the same phase and force revision. The owner replaced that design on 2026-07-19.

It is not an active protocol. The implementation route and its `owner-handbacks/` runtime were removed because same-phase injection splits provenance: the reviewer can no longer tell whether to judge the artifact against phase-entry inputs or later conversation.

The settled contract is [wait or halt, never steer](design-notes/2026-07-19-wait-or-halt-owner-ruling.md):

- record every direction immediately as bound waiting evidence;
- release it only through the next successful gate;
- use explicit immutable pushed halt as the sole interrupt;
- return after halt through a new session and fresh Brief;
- never pause, inject, and resume an in-flight phase.

The original behavior and tests remain visible in dated Git history and old test transcripts. They are historical evidence, not current product authority.
