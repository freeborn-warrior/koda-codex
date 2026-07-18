# Full native-chain deterministic dogfood transcript

- **Date:** 2026-07-18
- **Model variant / effort:** Not applicable; this is a deterministic CLI lifecycle proof.
- **Project:** Disposable six-phase Koda project, preserved below without its temporary `.git` directory.
- **Git proof:** A local bare remote proves the required commit/push boundary without relying on network state.
- **Pushed close commit:** `38ad90579eb1589942ecfe0b945f1bfc0ed193ee`
- **Scenario:** Clean approval through brief → orient → plan → produce → live → summary.
- **Verdict:** PASS if every phase first refuses without review and receipt, every gate later opens, and the final commands report both `SESSION CLOSED` and a derived closed status.

Commands are displayed as `koda`; the harness executed this repository's `src/cli.ts` through Node.

```text
$ git "init" "--bare" "<local-bare-remote>"
Initialized empty Git repository in <local-bare-remote>/
[exit 0]

$ git "init" "-b" "main"
Initialized empty Git repository in <dogfood-project>/.git/
[exit 0]

$ git "config" "user.name" "Koda Dogfood"
[exit 0]

$ git "config" "user.email" "dogfood@example.invalid"
[exit 0]

$ git "remote" "add" "origin" "<local-bare-remote>"
[exit 0]

$ koda "init" "."
✓ Initialized Koda in <dogfood-project>
Create a non-empty session prompt, then pass its path to `koda session new`.
[exit 0]

[evidence step] Kept the complete native chain: brief → orient → plan → produce → live → summary.

[evidence step] Wrote the owner's opening contract to owner-prompt.md.

$ koda "session" "new" "owner-prompt.md"
✓ Opened session 2026-07-18-01
Prompt: docs/sessions/2026-07-18-01/session-prompt.md
Current phase: brief
Write the artifact: docs/sessions/2026-07-18-01/phases/01-brief.md
[exit 0]

[evidence step] The brief producer leg wrote 01-brief.md and stopped without creating its review.

$ koda "advance"
GATE CLOSED — BRIEF
✗ The peer-review file does not exist.
Nothing advanced.

Create the peer-review template:
  koda 'review' 'new' 'brief'
[exit 2]

$ koda "review" "new" "brief"
✓ Created fresh review: docs/sessions/2026-07-18-01/reviews/01-brief-review.md
A peer reviewer must replace the template findings and set a definitive VERDICT.
Keep the generated metadata and final RECEIPT line unchanged.
[exit 0]

[evidence step] A separate deterministic reviewer step wrote APPROVE for brief, preserving protected metadata and receipt. No model was invoked.

$ koda "advance"
GATE CLOSED — BRIEF
✗ The current review receipt has not been quoted into the approval ledger.
Nothing advanced.

Read docs/sessions/2026-07-18-01/reviews/01-brief-review.md through its final RECEIPT line.
Then run this command; it will ask you to quote that line:
  koda 'approve' 'brief' '--approver' 'Owner'
[exit 2]

$ koda "approve" "brief" "RECEIPT: Review read — 93c98583-dc68-4761-8581-6af6d732271e" "--approver" "Dogfood Owner"
✓ Receipt recorded in docs/sessions/2026-07-18-01/approvals.md
The verdict permits advancement. Run:
  koda 'advance'
[exit 0]

$ koda "advance"
GATE OPEN — BRIEF
✓ Advanced with artifact, review, APPROVE, and exact receipt proof.
Next phase: orient
Write the artifact: docs/sessions/2026-07-18-01/phases/02-orient.md
[exit 0]

[evidence step] The orient producer leg wrote 02-orient.md and stopped without creating its review.

$ koda "advance"
GATE CLOSED — ORIENT
✗ The peer-review file does not exist.
Nothing advanced.

Create the peer-review template:
  koda 'review' 'new' 'orient'
[exit 2]

$ koda "review" "new" "orient"
✓ Created fresh review: docs/sessions/2026-07-18-01/reviews/02-orient-review.md
A peer reviewer must replace the template findings and set a definitive VERDICT.
Keep the generated metadata and final RECEIPT line unchanged.
[exit 0]

[evidence step] A separate deterministic reviewer step wrote APPROVE for orient, preserving protected metadata and receipt. No model was invoked.

$ koda "advance"
GATE CLOSED — ORIENT
✗ The current review receipt has not been quoted into the approval ledger.
Nothing advanced.

Read docs/sessions/2026-07-18-01/reviews/02-orient-review.md through its final RECEIPT line.
Then run this command; it will ask you to quote that line:
  koda 'approve' 'orient' '--approver' 'Owner'
[exit 2]

$ koda "approve" "orient" "RECEIPT: Review read — 3c03e869-55b6-42a7-9777-03b937fa4119" "--approver" "Dogfood Owner"
✓ Receipt recorded in docs/sessions/2026-07-18-01/approvals.md
The verdict permits advancement. Run:
  koda 'advance'
[exit 0]

$ koda "advance"
GATE OPEN — ORIENT
✓ Advanced with artifact, review, APPROVE, and exact receipt proof.
Next phase: plan
Write the artifact: docs/sessions/2026-07-18-01/phases/03-plan.md
[exit 0]

[evidence step] The plan producer leg wrote 03-plan.md and stopped without creating its review.

$ koda "advance"
GATE CLOSED — PLAN
✗ The peer-review file does not exist.
Nothing advanced.

Create the peer-review template:
  koda 'review' 'new' 'plan'
[exit 2]

$ koda "review" "new" "plan"
✓ Created fresh review: docs/sessions/2026-07-18-01/reviews/03-plan-review.md
A peer reviewer must replace the template findings and set a definitive VERDICT.
Keep the generated metadata and final RECEIPT line unchanged.
[exit 0]

[evidence step] A separate deterministic reviewer step wrote APPROVE for plan, preserving protected metadata and receipt. No model was invoked.

$ koda "advance"
GATE CLOSED — PLAN
✗ The current review receipt has not been quoted into the approval ledger.
Nothing advanced.

Read docs/sessions/2026-07-18-01/reviews/03-plan-review.md through its final RECEIPT line.
Then run this command; it will ask you to quote that line:
  koda 'approve' 'plan' '--approver' 'Owner'
[exit 2]

$ koda "approve" "plan" "RECEIPT: Review read — 51be65ad-b1eb-4472-b668-0112d878fbfa" "--approver" "Dogfood Owner"
✓ Receipt recorded in docs/sessions/2026-07-18-01/approvals.md
The verdict permits advancement. Run:
  koda 'advance'
[exit 0]

$ koda "advance"
GATE OPEN — PLAN
✓ Advanced with artifact, review, APPROVE, and exact receipt proof.
Next phase: produce
Write the artifact: docs/sessions/2026-07-18-01/phases/04-produce.md
[exit 0]

[evidence step] The produce leg wrote the declared real output before writing its evidence manifest.

[evidence step] The produce producer leg wrote 04-produce.md and stopped without creating its review.

$ koda "advance"
GATE CLOSED — PRODUCE
✗ The peer-review file does not exist.
Nothing advanced.

Create the peer-review template:
  koda 'review' 'new' 'produce'
[exit 2]

$ koda "review" "new" "produce"
✓ Created fresh review: docs/sessions/2026-07-18-01/reviews/04-produce-review.md
A peer reviewer must replace the template findings and set a definitive VERDICT.
Keep the generated metadata and final RECEIPT line unchanged.
[exit 0]

[evidence step] A separate deterministic reviewer step wrote APPROVE for produce, preserving protected metadata and receipt. No model was invoked.

$ koda "advance"
GATE CLOSED — PRODUCE
✗ The current review receipt has not been quoted into the approval ledger.
Nothing advanced.

Read docs/sessions/2026-07-18-01/reviews/04-produce-review.md through its final RECEIPT line.
Then run this command; it will ask you to quote that line:
  koda 'approve' 'produce' '--approver' 'Owner'
[exit 2]

$ koda "approve" "produce" "RECEIPT: Review read — 661387d0-7942-441a-b211-f73cc4cd4364" "--approver" "Dogfood Owner"
✓ Receipt recorded in docs/sessions/2026-07-18-01/approvals.md
The verdict permits advancement. Run:
  koda 'advance'
[exit 0]

$ koda "advance"
GATE OPEN — PRODUCE
✓ Advanced with artifact, review, APPROVE, and exact receipt proof.
Next phase: live
Write the artifact: docs/sessions/2026-07-18-01/phases/05-live.md
[exit 0]

[evidence step] The live producer leg wrote 05-live.md and stopped without creating its review.

$ koda "advance"
GATE CLOSED — LIVE
✗ The peer-review file does not exist.
Nothing advanced.

Create the peer-review template:
  koda 'review' 'new' 'live'
[exit 2]

$ koda "review" "new" "live"
✓ Created fresh review: docs/sessions/2026-07-18-01/reviews/05-live-review.md
A peer reviewer must replace the template findings and set a definitive VERDICT.
Keep the generated metadata and final RECEIPT line unchanged.
[exit 0]

[evidence step] A separate deterministic reviewer step wrote APPROVE for live, preserving protected metadata and receipt. No model was invoked.

$ koda "advance"
GATE CLOSED — LIVE
✗ The current review receipt has not been quoted into the approval ledger.
Nothing advanced.

Read docs/sessions/2026-07-18-01/reviews/05-live-review.md through its final RECEIPT line.
Then run this command; it will ask you to quote that line:
  koda 'approve' 'live' '--approver' 'Owner'
[exit 2]

$ koda "approve" "live" "RECEIPT: Review read — 654e930f-8ca8-4aa8-aff2-8f9287971cc5" "--approver" "Dogfood Owner"
✓ Receipt recorded in docs/sessions/2026-07-18-01/approvals.md
The verdict permits advancement. Run:
  koda 'advance'
[exit 0]

$ koda "advance"
GATE OPEN — LIVE
✓ Advanced with artifact, review, APPROVE, and exact receipt proof.
Next phase: summary
Write the artifact: docs/sessions/2026-07-18-01/phases/06-summary.md
[exit 0]

[evidence step] The summary producer leg wrote 06-summary.md and stopped without creating its review.

$ koda "advance"
GATE CLOSED — SUMMARY
✗ The peer-review file does not exist.
Nothing advanced.

Create the peer-review template:
  koda 'review' 'new' 'summary'
[exit 2]

$ koda "review" "new" "summary"
✓ Created fresh review: docs/sessions/2026-07-18-01/reviews/06-summary-review.md
A peer reviewer must replace the template findings and set a definitive VERDICT.
Keep the generated metadata and final RECEIPT line unchanged.
[exit 0]

[evidence step] A separate deterministic reviewer step wrote APPROVE for summary, preserving protected metadata and receipt. No model was invoked.

$ koda "advance"
GATE CLOSED — SUMMARY
✗ The current review receipt has not been quoted into the approval ledger.
Nothing advanced.

Read docs/sessions/2026-07-18-01/reviews/06-summary-review.md through its final RECEIPT line.
Then run this command; it will ask you to quote that line:
  koda 'approve' 'summary' '--approver' 'Owner'
[exit 2]

$ koda "approve" "summary" "RECEIPT: Review read — 7bbd5174-a950-4ce2-95b6-0aa29880522f" "--approver" "Dogfood Owner"
✓ Receipt recorded in docs/sessions/2026-07-18-01/approvals.md
The verdict permits advancement. Run:
  koda 'advance'
[exit 0]

$ koda "advance"
GATE OPEN — SUMMARY
✓ Advanced with artifact, review, APPROVE, and exact receipt proof.
All phases are complete. Prepare the immutable close artifact:
  koda 'session' 'close'
[exit 0]

$ koda "session" "close"
CLOSE PREPARED — 2026-07-18-01 — NOT CLOSED
✓ Created immutable docs/sessions/2026-07-18-01/close.md
Commit and push the bound session, then run `koda session close` again:
  git add 'docs/sessions/2026-07-18-01'
  git commit -m 'close session 2026-07-18-01'
  git 'push' '-u' 'origin' 'main'
[exit 2]

$ git "status" "--short"
?? deliverable/
?? docs/
?? koda.config.json
?? owner-prompt.md
[exit 0]

$ git add 'docs/sessions/2026-07-18-01'
[exit 0]

$ git commit -m 'close session 2026-07-18-01'
[main (root-commit) 38ad905] close session 2026-07-18-01
 16 files changed, 316 insertions(+)
 create mode 100644 docs/sessions/2026-07-18-01/approvals.md
 create mode 100644 docs/sessions/2026-07-18-01/close.md
 create mode 100644 docs/sessions/2026-07-18-01/phases/01-brief.md
 create mode 100644 docs/sessions/2026-07-18-01/phases/02-orient.md
 create mode 100644 docs/sessions/2026-07-18-01/phases/03-plan.md
 create mode 100644 docs/sessions/2026-07-18-01/phases/04-produce.md
 create mode 100644 docs/sessions/2026-07-18-01/phases/05-live.md
 create mode 100644 docs/sessions/2026-07-18-01/phases/06-summary.md
 create mode 100644 docs/sessions/2026-07-18-01/reviews/01-brief-review.md
 create mode 100644 docs/sessions/2026-07-18-01/reviews/02-orient-review.md
 create mode 100644 docs/sessions/2026-07-18-01/reviews/03-plan-review.md
 create mode 100644 docs/sessions/2026-07-18-01/reviews/04-produce-review.md
 create mode 100644 docs/sessions/2026-07-18-01/reviews/05-live-review.md
 create mode 100644 docs/sessions/2026-07-18-01/reviews/06-summary-review.md
 create mode 100644 docs/sessions/2026-07-18-01/session-prompt.md
 create mode 100644 docs/sessions/2026-07-18-01/state.json
[exit 0]

$ koda "session" "close"
SESSION NOT CLOSED — 2026-07-18-01
✗ The current branch has no pushed upstream branch.
[exit 2]

$ git 'push' '-u' 'origin' 'main'
branch 'main' set up to track 'origin/main'.
To <local-bare-remote>
 * [new branch]      main -> main
[exit 0]

$ koda "session" "close"
SESSION CLOSED — 2026-07-18-01
✓ Final phase gated, immutable close committed, and branch pushed.
[exit 0]

$ koda "status"
KODA — 2026-07-18-01
SESSION CLOSED
[exit 0]

$ git "rev-parse" "HEAD"
38ad90579eb1589942ecfe0b945f1bfc0ed193ee
[exit 0]

```
