# Tiny end-to-end dogfood transcript

- **Date:** 2026-07-18
- **Model variant / effort:** Not applicable; this is a deterministic CLI lifecycle proof.
- **Project:** Disposable one-phase Koda project, preserved below without its temporary `.git` directory.
- **Git proof:** A local bare remote proves the required commit/push boundary without relying on network state.
- **Pushed close commit:** `feb18dfda2913e7378000f227ddef7da4b16de82`
- **Verdict:** PASS if the final commands report both `SESSION CLOSED` and a derived closed status.

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

[evidence step] Configured one phase (`brief`) to keep the proof tiny while exercising the complete session lifecycle.

[evidence step] Wrote the owner's opening contract to owner-prompt.md.

$ koda "session" "new" "owner-prompt.md"
✓ Opened session 2026-07-18-01
Prompt: docs/sessions/2026-07-18-01/session-prompt.md
Current phase: brief
Write the artifact: docs/sessions/2026-07-18-01/phases/01-brief.md
[exit 0]

[evidence step] The producer wrote the brief artifact and stopped without creating its review.

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

[evidence step] A separate reviewer step wrote an APPROVE review while preserving generated metadata and receipt. No model was invoked in this deterministic proof.

$ koda "advance"
GATE CLOSED — BRIEF
✗ The current review receipt has not been quoted into the approval ledger.
Nothing advanced.

Read docs/sessions/2026-07-18-01/reviews/01-brief-review.md through its final RECEIPT line.
Then run this command; it will ask you to quote that line:
  koda 'approve' 'brief' '--approver' 'Owner'
[exit 2]

$ koda "approve" "brief" "RECEIPT: Review read — e15ec960-6820-4de3-8943-ae8b03765f3f" "--approver" "Dogfood Owner"
✓ Receipt recorded in docs/sessions/2026-07-18-01/approvals.md
The verdict permits advancement. Run:
  koda 'advance'
[exit 0]

$ koda "advance"
GATE OPEN — BRIEF
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
?? docs/
?? koda.config.json
?? owner-prompt.md
[exit 0]

$ git add 'docs/sessions/2026-07-18-01'
[exit 0]

$ git commit -m 'close session 2026-07-18-01'
[main (root-commit) feb18df] close session 2026-07-18-01
 6 files changed, 73 insertions(+)
 create mode 100644 docs/sessions/2026-07-18-01/approvals.md
 create mode 100644 docs/sessions/2026-07-18-01/close.md
 create mode 100644 docs/sessions/2026-07-18-01/phases/01-brief.md
 create mode 100644 docs/sessions/2026-07-18-01/reviews/01-brief-review.md
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
feb18dfda2913e7378000f227ddef7da4b16de82
[exit 0]

```
