# Wait-or-halt transfer — development failures

**Date:** 2026-07-19

## First focused run retained superseded transfer assertions

The first focused run after adding waiting-direction evidence passed **61/63**. Every inherited core gate mutation, receipt behavior, session close, hint, and relay case passed. Two static behavior assertions still encoded the pre-ruling product boundary:

- the idle Reviewer direction case expected `OWNER DIRECTION — NOT SENT`, no project mutation, and no waiting artifact;
- the shared Reviewer package test still required `OWNER DIRECTION — DISK HANDOFF REQUIRED` from the former review-time revision handback.

The owner ruling explicitly replaced both expectations. The idle case now requires a timestamped waiting-direction file, unchanged active-phase inputs, and no current-phase owner handback. The shared skill now requires `OWNER DIRECTION — WAIT FOR GATE`. No gate, receipt, security, or refusal assertion was weakened.

## Generalized PTY question double-escaped Return

The next focused run passed **63/64**. All new wait-direction mechanics passed, including gate-only release and cross-session carry. The real-terminal conversation fixture timed out because its newly parameterized question passed `\\r` through JSON quoting, causing Expect to type a literal backslash sequence instead of Return. The Reviewer prompt remained open as designed.

The test question now travels through one environment value, while the Expect program retains a real `\r` terminal submission. The product runtime and every terminal-output assertion are unchanged.

## Offline TypeScript checker command was not a project dependency

A focused command used `npx tsc --noEmit`. This repository intentionally has no dependencies, so npm tried to fetch an unrelated `tsc` package and failed offline with `ENOTFOUND`. The actual project build is `npm run build`, which uses the checked-in dependency-free transformer and passed. No package was installed and no product assertion was skipped.

## First complete suite retained three superseded/development-state assumptions

The first complete wait-or-halt suite passed **142/145**. The failures were explicit and non-product-breaking:

- one static relay contract still demanded the removed `OWNER_DIRECTION_HANDOFF_REQUIRED` same-phase route;
- the credential scanner asked Git's pre-staging index to read the now-deleted `scripts/owner-handback.ts` path;
- one session test expected the older `is not closed` wording instead of the stronger `neither closed nor pushed-halted` terminal-state refusal.

The relay assertion was replaced with positive checks for immediate waiting-direction creation, explicit halt preparation, and absence of the obsolete route. The session assertion still requires refusal and now names both legal terminal states. The deleted-file scanner condition disappears once the coherent deletion is staged; the credential scan itself remains unchanged. No gate, receipt, security signature, mutation, or printed-command check was removed.

## Parallel package preparation briefly removed the committed binary

The first complete run against the staged final file set passed **145/146**. The judge-journey check correctly refused because `dist/cli.js` was momentarily absent. The packaged-tarball test was running `npm pack` in the live checkout at the same time; its `prepack` build removes and recreates `dist/`, so Node's parallel test scheduler exposed a real test-isolation race.

The committed-binary assertion remains unchanged. The tarball test now copies the checkout to its own temporary project and runs the real `npm pack`, dependency-free build, install, CLI, Guide help, and demo refusal there. Packaging can no longer mutate the checkout being judged by another test. No product check was reduced or skipped.
