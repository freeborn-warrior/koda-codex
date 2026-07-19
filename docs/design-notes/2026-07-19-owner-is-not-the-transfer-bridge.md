# The owner is not the transfer bridge

**Date:** 2026-07-19

## Observed failure

After the first Ghostty run was pushed-halted and the launcher repair passed its
post-push checks, Guide correctly classified the retry as a dependent successor.
It then treated the location of that repair proof as an unresolved owner input.
Kristian was asked to copy a repository path, commit IDs, a test count, and
evidence references from the builder conversation into Guide.

That is a product failure even though the copied facts were accurate. Koda-C
exists to replace manual context-to-context relays with files and gates. A human
owner cannot be expected to assemble or authenticate implementation evidence,
and technical copy-paste makes the resulting provenance look stronger than the
mechanism that produced it.

## Ruling

The owner supplies intent, priorities, constraints, product judgment, and exact
confirmation. The owner is never the transport layer for shell commands,
filesystem paths, hashes, commit IDs, test counts, receipts, or evidence
locations.

Machine-verifiable prerequisites belong to the toolkit. Guide discovers them
from disk. If verified, Guide names the capability in plain language and Koda
binds the underlying integrity snapshot into the launch request. If unverified,
the launch refuses with a named toolkit condition; the absence is not converted
into an owner question.

## Implemented contract

- `docs/toolkit-integrity.json` names the current launch capability, post-push
  evidence, and exact critical files.
- `koda guide status` validates those bytes before reporting `TOOLKIT READY`.
- `koda guide confirm` freezes the toolkit manifest hash and evidence identity
  alongside the prompt, continuity files, and dependency terminal evidence.
- `koda guide verify` refuses when that toolkit snapshot changes.
- `koda-c-session-prompt` forbids technical owner relays and reserves `Open
  items` for genuine owner product questions.
- The unconfirmed verification retry prompt cites the verified capability, not
  the technical material Kristian had been asked to copy.

This does not create cryptographic authorship or prove cognition. It removes a
human courier step and makes the exact installed launch contract inspectable,
repeatable, and stale-detectable using the same plain-file discipline as the
rest of Koda-C.

## Drift watch

This does not change the original product direction. It applies it more
consistently: disk evidence, not copied chat, carries truth between independent
contexts. It also keeps the CLI domain-general; project-specific interpretation
and owner conversation remain in repository-local Guide skills.
