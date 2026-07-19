# Project-level Guide and session kinds

**Date:** 2026-07-18

**Status:** Owner direction captured; standard Guide-to-session slice is active, multiple session kinds are post-submission product direction

## The project is above the session

Kristian's existing projects have reached roughly 27 and 44 sessions. A bounded session cannot by itself hold the evolving goal, accumulated decisions, visible backlog, current working plan, risks, and the reason one session should follow another. That is the Guide's project-level responsibility.

The Guide is both continuity and path-maker. It holds the destination while choosing and revising the route toward it. A session is one bounded step—or a few related steps—on that evolving path, not the authority that chooses the whole journey. After a pushed session close or explicit pushed halt, the Guide reads the terminal evidence and moves the project documents forward. Between sessions, it can explore with Kristian and update those documents when decisions or direction change. Before a session, it uses the explicit session-prompter skill to turn current project truth into one bounded owner-confirmed handoff.

An idea may arrive during the Guide conversation, but Explore is not merely the Guide thinking aloud. The Guide can commission a distinct Explore session to throw that idea against the actual project: does it strengthen the destination, reveal a better route, create too much disruption, or deserve rejection? The Explore session is a bounded expedition with artifacts and review. When it returns, the Guide—not the session—decides with Kristian whether and how its evidence changes the route.

This continuity must remain selective. The Guide should begin from a compact steering set and follow citations into old session evidence only when needed. It must be replaceable by a fresh context that reconstructs the same state from disk.

## Session kinds

Not every useful project episode is a production session:

- **Explore:** develop an idea, compare directions, and end with an explicit pursue/defer/reject decision plus its effect on project direction.
- **Research:** reduce a named uncertainty, preserve sources and limits, and hand findings back without silently turning them into owner decisions.
- **Architecture:** reason across technical requirements and system boundaries, record tradeoffs and a checkable technical direction, and avoid producing unrelated implementation.
- **Triage:** assess product quality, safety, security, vulnerabilities, incomplete proof, and priority; convert findings into owned project work.
- **Produce:** execute one bounded manifestation through brief, orient, plan, produce, live, and summary or another project-adapted phase chain.

The likely design is one shared session/close/receipt discipline with a declared session kind selecting project-adapted phases, producer skills, artifact shapes, and shared-reviewer criteria. The kind must live in config and disk evidence, not be inferred from chat. This remains a thesis until the standard Guide handoff is proven.

## Reviewer recommendation

Keep one reviewer role and one shared reviewer skill across session kinds. Start a fresh independent reviewer context for each session and keep it persistent for that full session. The shared core preserves independence, evidence discipline, owner-facing conversation, receipt handling, temperament, and disk handbacks.

The session kind supplies a different review brief rather than a copied reviewer skill. An Explore reviewer tests whether the project evidence supports the idea and whether costs were honestly considered. A Research reviewer checks sources, uncertainty, and unsupported inference. An Architecture reviewer checks cross-file/system reasoning and tradeoffs. A Triage reviewer checks severity, reproducibility, safety, and prioritization. A Produce reviewer applies the configured phase criteria. Model and effort may be selected per kind once fixtures show a real capability difference.

This is a leading design recommendation, not yet a new runtime contract. The existing owner ruling—one shared reviewer skill, never copied per phase—remains in force.

## Librarian recommendation

Long-running projects may benefit from a Librarian or recall skill on the Guide side. It is not a path-maker, producer, reviewer, or third in-session authority. It answers four evidence questions: where have we been, where are we, why did we get here, and what do the current files say comes next?

The Librarian reads the steering files first, follows their citations selectively into sessions and Git history, names contradictions or missing history, and cites every answer. It does not choose direction or maintain a second hidden summary of project truth. If its briefing must persist, it belongs under the Guide evidence directory. This is especially useful when the Guide needs reliable recall without loading dozens of sessions into context.

## Submission boundary

Koda-C should first demonstrate the strongest invariant cleanly:

```text
evolving project files
  → Guide reconciliation
  → explicit confirmed prompt
  → pushed launch evidence
  → separate producer + reviewer session
  → gated phases
  → immutable pushed close
  → Guide reconciliation
```

Multiple session kinds are recorded because they explain the larger product, but implementing five incomplete runtimes would weaken the submission. The near-term proof uses one standard session and preserves the configurable architecture needed for later kinds.

## Test implication

The test suite evolves alongside the product. New session kinds will require both shared invariant tests and kind-specific capability/temperament fixtures. Their addition must not erase the existing receipt, staleness, status-truth, printed-command, role-separation, Git-close, and Guide-confirmation contracts.
