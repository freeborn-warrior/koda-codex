# Pre-submission verification ruling

**Date:** 2026-07-19  
**Status:** Owner-approved direction

## Ruling

Koda-C will not begin forward-only self-hosting before the contest submission.
The first complete Guide-launched human test will use a fresh representative
project prepared for verification, while every durable output remains inside the
Koda-C repository.

This is a sequencing decision, not a rejection of self-hosting. After submission,
Koda-C may adopt its own workflow at a clean, dated boundary without claiming its
earlier construction followed that process.

## Why this is the stronger submission choice

The product already has broad deterministic proof, but its complete human
experience is not yet owner-observed. Testing that experience against Koda-C
itself would change both the workflow under test and the management of the
submission repository. A representative verification project keeps the test
focused on the current claims:

- Guide creates and confirms one bounded session prompt;
- one visible persistent Producer and one separate visible persistent Reviewer
  span every configured phase;
- Kristian speaks to Reviewer during the session and may continue speaking to
  Guide about project-level direction;
- frozen phase input, formal review, exact receipt acknowledgement, gate routing,
  waiting direction, and immutable pushed close remain disk-verifiable;
- the pushed session return updates Guide-visible project state;
- no step depends on Kristian understanding shell variables or repository paths.

## Verification-project boundary

The project is not a throwaway performance with a prewritten verdict. It must
contain a small plausible task whose exact phase outcomes are not scripted. It is
isolated so a live-model or operator failure cannot mutate the submission source.
Its complete durable inputs, model events, reviews, receipts, session artifacts,
result, project snapshot, and restorable Git evidence are archived under `docs/`
in this repository.

The Koda-C root remains an ordinary build repository. It receives no root
`koda.config.json`, Guide manifest, or live session namespace for this test.

## Pre-submission verification sequence

1. Prepare the isolated project and its owner-readable task.
2. Exercise every entry check without opening Ghostty and record any refusal.
3. Re-run the complete deterministic suite without weakening any assertion.
4. Show Kristian the exact session prompt for owner confirmation.
5. Give Kristian one command at a time for the three-window Ghostty run.
6. Preserve the genuine outcomes, including revisions, interruption, or recovery;
   never tune the expected story after seeing the run.
7. Reconcile the pushed Guide return, testing ledger, backlog, and submission
   claims before recording the contest demonstration.

Self-hosting moves to post-submission work. The owner should not be asked to make
that adoption decision again during the current verification sequence.
