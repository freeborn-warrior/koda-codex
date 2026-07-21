# Owner-visible full-session result

- Owner-observed date: 2026-07-20 America/New_York
- Durable evidence timestamps: 2026-07-21 UTC
- Result: **PASS — SIX PHASES, LIVE REVISE RECOVERY, PUSHED CLOSE, GUIDE RETURN**
- Launch: `e974b805-fac5-4648-a9e2-b66348effa47`
- Session: `2026-07-20-01`
- Guide context: `019f81fd-8198-7302-9020-b91a057e3d46`
- Producer: GPT-5.6 Sol / medium, context `019f81fe-1bfe-7720-a801-aa66e6bdeb6b`
- Reviewer: GPT-5.6 Terra / medium, context `019f81ff-910f-79e2-b772-07e7fd34a902`
- Owner acknowledgements: 7
- Phase advancements: 6/6
- Close commit: `f8b651128d3a81a98be5c0e71dae346c2b7ce8d6`
- Guide-return commit: `edaf46a`

## What the owner observed

Kristian started the shipped `npm run demo:session` path, kept the persistent
Guide visible, and watched one input-closed Producer plus one separate
owner-facing Reviewer traverse Brief, Orient, Plan, Produce, Live, and Summary.
The session built and exercised a dependency-free Markdown heading reporter.
The final repository was clean, its local `main` matched its local demonstration
upstream, and Guide reconstructed the returned close from disk.

The relay recorded ten Producer turns and eleven Reviewer turns. Every role kept
one context identity for the whole session. The complete compact turn index is in
[TRANSCRIPT.md](TRANSCRIPT.md); the restorable Git history, including the complete
archived raw event set and produced project, is in
[`COMPLETED-DEMO-HISTORY.bundle`](COMPLETED-DEMO-HISTORY.bundle).

## The Orient REVISE was not staged

The owner-confirmed session prompt says: `No review verdict or revision path is
predetermined.` The bundled project guidance says the same. Inspection of the
production relay and demo inputs found no Orient-specific forced verdict or
planted revision branch. Koda's implementation knows how to route any valid
verdict, but it did not choose this one.

The first Orient artifact asserted that work began without “a test suite that
must be preserved.” Terra's formal review found that the cited `PROJECT.md`
proved no implementation existed but did not prove the absence of every possible
test artifact. It returned a checkable `REVISE`, bound to artifact SHA-256
`63543b1473fba9713d4173e1df790fffde176b492c2e3ca7abac7581d043fd03`.
The exact blocking review is preserved as [ORIENT-REVISE.md](ORIENT-REVISE.md).

Kristian acknowledged that blocking review. The gate did not advance. Sol revised
the same phase by narrowing the inference to what the cited files actually proved.
Terra then issued a fresh `APPROVE`, bound to the changed artifact SHA-256
`7a1cb2328c5418c010d6d5057b4766295ad262fe28e37e1d8eb7bccb7fc6e736`.
Only after Kristian acknowledged that new review did the gate advance to Plan.
The fresh review is [ORIENT-APPROVE.md](ORIENT-APPROVE.md), and both entries remain
visible in [APPROVALS.md](APPROVALS.md).

This is live evidence of the intended product behavior: a separate Reviewer found
a claim the Producer had allowed to outrun its evidence; the blocking verdict held
the same phase; a changed artifact invalidated the old review binding; and a fresh
review plus fresh owner acknowledgement were required.

## Product and session evidence

- Produce's corrected deterministic run passed 9/9 on Node.js 26.0.0. Node.js
  22.18.0 was not separately exercised.
- Produce preserved its first 8/9 harness failure: the strict model sandbox denied
  creation under the system temporary directory. The correction moved temporary
  work into an already claimed project path without weakening the assertion.
- Live preserved its first capture-harness failure: it attempted to hash an
  intentionally unreadable fixture while the fixture was unreadable. The corrected
  harness moved the before-hash earlier and retained the same product checks.
- The final state contains six advancement records and distinct review IDs.
- [CLOSE.md](CLOSE.md) binds the completed session hash and final Summary receipt.
- [GUIDE-RETURN.json](GUIDE-RETURN.json) records `CLOSED_SESSION_RETURNED`, both
  context IDs, 10/11 role turns, seven acknowledgements, and the pushed close.
- The evidence copies in this directory were scanned for common credential and
  private-key signatures before preservation; none were found.
- The first evidence-assembly suite passed 251/252: one submission-document check
  refused a lowercase `record` where the protected judge instruction required
  `Record`. The document was corrected without changing the assertion. The fresh
  durable rerun then passed [252/252](../../test-results/2026-07-20-owner-full-session-evidence.md).
- After every new evidence file was staged, the tracked-file security, submission,
  and toolkit-integrity slice passed 26/26, including the credential-signature,
  symbolic-link, local-link, permission-boundary, and manifest checks.

## Guide after close

Kristian's dictation reached Guide as the declarative sentence `We have a
successful session close.` The Guide correctly treated that as ordinary
conversation: it verified the returned close, reported the now-stale project,
backlog, and working-plan files, made no mutation, and waited. That behavior
matches the repository-local Guide skill, which requires ordinary conversation
to report stale continuity and wait rather than infer permission to reconcile it.

The complete event for that turn is preserved in
[GUIDE-AFTER-CLOSE-EVENTS.jsonl](GUIDE-AFTER-CLOSE-EVENTS.jsonl). The three demo
continuity files remain intentionally stale evidence of the just-finished first
session; Guide must reconcile them before preparing a later dependent session.

## Bundle verification

The Git bundle SHA-256 is
`d771ff3fbf72253bb5c4943ca310567a0f3671652bae5116e56df38a7373d354`.
It was created from a repository whose `main` and local `origin/main` both pointed
to Guide-return commit `edaf46a` and whose reachable objects passed `git fsck`.
`git bundle verify` confirmed that it records complete history and that its branch,
remote-tracking branch, and `HEAD` all identify the same returned-close commit.
