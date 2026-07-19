# Security incident — Ghostty launch exposed ambient environment

**Date:** 2026-07-19
**Severity:** RELEASE BLOCKER
**Status:** CONTAINED; DETERMINISTIC REPAIR VERIFIED; FRESH OWNER RUN PENDING

## Incident

The first owner-observed three-context launch did not create a coherent
three-window experience. The macOS Ghostty adapter passed a multi-token command
after `-e` through `open --args`. One intended Reviewer and one intended
Producer did start, but Ghostty also opened unintended tabs corresponding to
individual command tokens. Observed junk surfaces included an environment dump,
a Node.js REPL, empty shells, and direct TypeScript execution failures.

The environment dump displayed an active third-party API credential. This file
does not contain the credential, its value, its prefix, the terminal screenshots,
or the review receipt. None of those may be copied into repository evidence.

This is an integrity breach even though the credential appeared on Kristian's
own screen: a workflow that claims safe, bounded role launch must never cause an
ambient secret to be rendered, logged, or handed to unrelated role processes.

## Human impact

Kristian encountered repeated permission prompts, multiple similarly named tabs,
red launch errors, a Node REPL, and no clear indication of which surface was real.
He could not reasonably determine what was safe to approve, close, or use. The
experience failed the product's human-usability requirement independently of the
credential exposure.

Kristian chose not to rotate the active credential immediately because other
projects depend on it and will monitor its use. That is the owner's operational
decision. It is not technical remediation and this record does not claim the
credential's risk was removed.

## Containment

- No owner acknowledgement was recorded and no phase advanced.
- Kristian invoked the official Reviewer-side halt.
- Immutable halt `c9743416-67dc-45bd-b7f0-4de56c6bb300` voided Brief and was
  committed and pushed in the verification project at `ba22bfe`.
- The extra Reviewer and Producer windows were closed; Guide remained idle.
- A disk-only supervisor reconciliation changed the runtime to `HALTED`, removed
  the stale acknowledgement job, and called no model.
- The verification project is clean and exactly matches its upstream.

## Secondary defect discovered during containment

After the Reviewer committed the pushed halt, the Producer supervisor consumed
the completed formal-review job and queued a new owner-acknowledgement job before
checking `halt.md`. The voided review appeared again. Pushed halt evidence was
correct, but the runtime presentation contradicted it until reconciliation.

This is a separate status/routing race and part of the release block.

## Why deterministic tests missed it

The Ghostty test replaced `/usr/bin/open` with a callback and asserted only the
argument array, ordering, saved launch intent, and duplicate refusal. Worse, the
test positively required `/usr/bin/env` and several following tokens. It proved
the code constructed the intended vector; it did not prove macOS/Ghostty treated
that vector as one terminal command. The assertion encoded the unsafe design.

The halt test proved the Reviewer could create pushed immutable halt evidence,
but it did not resume the Producer from a completed `HALTED` Reviewer job. The
missing rendezvous mutation allowed the post-halt acknowledgement race.

No existing test is being weakened. Both missing adversarial conditions are now
permanent regression requirements.

## Required repair boundary

Before another owner run:

1. Ghostty receives exactly one executable token for each role, never a command
   plus loose argument tokens.
2. Each role starts through a private, mode-700 launcher bound to one run and
   exact role command.
3. Each private launcher immediately clears its inherited environment before the
   role process starts. Every Codex child also receives an explicit allowlist.
   Ambient credentials, parent Codex identity, unrelated project variables, and
   hostile Node startup options are absent.
4. Mutated, linked, or replaced launcher files refuse before GUI mutation.
5. A pushed halt wins before any artifact, review, acknowledgement, or model route;
   stale jobs are removed without owner interaction.
6. Focused, complete, durable, post-push, and security checks pass before Kristian
   is asked to touch Ghostty again.

## Current evidence

- The first focused repair run passed **43/44**. The only failure was a stale
  filename assertion after the private launcher gained an explicit `.cjs`
  extension; the one-token safety assertion and all product conditions passed.
  The obsolete filename expectation was corrected without weakening a gate.
- The launcher was then hardened again from Node bootstrap code to a mode-700,
  non-interactive shell trampoline. Ghostty receives exactly one relative `.sh`
  executable token. Inside that file, `/usr/bin/env -i` starts the role command
  with only safe terminal identity, a fixed executable search path, and the exact
  Codex binary path. A hostile ambient `NODE_OPTIONS` control cannot reach Node.
- The focused Guide, Ghostty, Reviewer-window, halt-race, and security suite
  passed **44/44** after final hardening.
- The ordinary complete suite passed **181/181**. The coverage run passed
  **181/181** with 89.08% line coverage overall, 100% for the new environment
  sanitizer, and 93.92% for the Ghostty adapter.
- The durable complete run passed **181/181** and is preserved in the
  [repair transcript](../../test-results/2026-07-19-ghostty-integrity-repair-complete.md).
- After the hostile quoted-path control and final documentation were added, a
  second ordinary and durable repetition each passed **181/181**; the latter is
  preserved in the [ready-to-push transcript](../../test-results/2026-07-19-ghostty-integrity-repair-ready-to-push.md).
- Repository whitespace, symlink, credential-signature, package/install, and Git
  connectivity checks passed. Full Git object inspection found only recoverable
  unreachable objects from prior development operations, not reachable corruption.
- Post-push proof and a fresh owner-observed launch remain pending. Mechanical
  repair is verified; human usability and real Ghostty permission behavior are
  intentionally not inferred from deterministic tests, so the incident remains
  a release blocker until that fresh run succeeds.
