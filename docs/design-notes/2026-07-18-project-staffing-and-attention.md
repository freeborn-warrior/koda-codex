# Project staffing and owner-attention design

**Date:** 2026-07-18
**Status:** Owner direction recorded; schema and cross-model continuation still to be proved

## The org-chart metaphor

Koda-C should treat model assignment as staffing:

- a **role** is a seat: Guide, producer, reviewer;
- a **session kind** is a department or work mode: Produce, Explore, Research, Architecture, or Triage;
- a **phase** is an assignment inside a session: Brief, Orient, Plan, Produce, Live, Summary, or a project-specific phase;
- a **model plus effort** is the staff member assigned to that seat for that work.

There is no product reason every producer phase must use the same model. The first relay used one producer model and one reviewer model because that was the smallest runtime proof. It is not the intended limit.

The leading staffing precedence is:

1. Guide assignment;
2. session-kind role defaults, including one reviewer assignment for the full session;
3. per-phase producer assignments inside that session kind;
4. an explicit owner-confirmed launch override.

The supervisor must resolve this hierarchy before launch and snapshot the result into session evidence. A later config edit must not silently restaff an active session. Every model turn and durable artifact should record the model and effort actually used, not merely the configured intention.

## Skill metadata is not the org chart

OpenAI's current Codex skill format documents `name` and `description` in `SKILL.md` frontmatter. Its optional `agents/openai.yaml` metadata covers presentation, invocation policy, and tool dependencies. It does not document a skill-level model selector. Codex model and reasoning defaults belong to configuration, while explicit launch overrides take precedence.

Sources checked on 2026-07-18:

- [OpenAI: Build skills](https://learn.chatgpt.com/docs/build-skills)
- [OpenAI: Codex configuration reference](https://learn.chatgpt.com/docs/config-file/config-reference)

Koda-C could invent a custom frontmatter field and parse it itself, but that should not become the authoritative assignment. A skill describes the job and may state a capability recommendation; the project staffing config holds the inspectable org chart. This separation lets model-matrix evidence improve staffing without editing every skill.

## Persistent seats and changing staff

Kristian's runtime ruling remains one persistent visible producer pane and one persistent owner-facing reviewer pane for the full session. Phase-level staffing does not revoke that ruling.

Before implementation, Koda-C must prove whether a Codex thread can resume under a different model while preserving its context identity and evidence boundaries. If it can, the persistent producer seat may change staff between phases. If it cannot, Koda-C must distinguish honestly between one persistent visible pane and multiple internally handed-over contexts; it must never call multiple contexts one persistent context merely for a cleaner story.

The reviewer is a continuity role and may sensibly keep one model for the full session even when producer staffing changes. The Guide has its own project-level assignment.

## Model tests become staffing evidence

The reviewer matrix is the first evidence for staffing decisions, not a universal leaderboard. It must remain a living product test:

- contracts are committed before the first model run;
- CATCH and VERDICT are scored separately;
- honest controls prevent block-everything reviewers from appearing rigorous;
- repeated runs expose variance;
- operational behavior remains secondary and never inflates cognition scores;
- deterministic gate tests remain separate from model-behavior tests.

Later, producer-side fixtures should ask role-specific questions such as which model best performs Orient, which model can handle Live at low effort, or which model preserves evidence most reliably in Summary. Staffing recommendations must cite those bounded results and retain unrun cells honestly.

## Owner attention can only become stricter at runtime

The current target keeps Kristian's acknowledgement at every gate. The mature design may configure attention independently by session kind or phase:

- `every_gate`: Kristian personally acknowledges every formal review;
- a future delegated mode: an explicitly authorized Guide or reviewer context may acknowledge routine allowed reviews;
- `OWNER_ATTENTION_REQUIRED`: a phase or reviewer emits a named artifact when it encounters genuine product judgment, design choice, material risk, or unresolved uncertainty.

The last mechanism is monotonic. An agent may demand more owner attention than config normally requires, but no agent may waive attention required by config. Receipt evidence remains mandatory at every gate; the policy changes who is authorized to acknowledge it, never whether review and receipt proof exist.

In the mature experience, the Guide is Kristian's single project interface. It receives an escalation, discusses it with him, records the ruling, and releases the waiting session. Routine bounded work may continue underneath it.

## Draft, Edit, and Refine

The six native phases remain a reference profile, not a universal semantic costume.

- In software, Produce already creates the draft and Live exercises the real output.
- In writing, Produce may be named Draft, or a distinct Edit/Refine phase may sit before Live.
- A proposed phase earns a gate only when it creates a distinct artifact, requires distinct evidence, and deserves an independent review/refusal moment.

Draft, Edit, and Refine therefore join the project-profile vocabulary. They do not alter the current reference chain without a project-specific reason.
