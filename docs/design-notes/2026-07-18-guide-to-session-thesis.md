# Guide → session prompt → session thesis

**Date:** 2026-07-18

**Status:** Owner-directed leading thesis for post-submission product work; not yet shipped behavior

## The desired experience

The Guide is Kristian's long-lived project conversation between sessions. It helps him explore, remember decisions, understand current state, and decide what the project should accomplish next. Its continuity is recoverable from project files rather than trusted only to an indefinitely growing chat.

When Kristian is ready, he explicitly invokes a distinct `koda-c-session-prompt` skill inside the Guide conversation. That skill turns the discussion into one bounded, owner-approved session-prompt artifact. Once the artifact is ready and Kristian explicitly confirms launch, a supervisor starts exactly one Koda session containing:

- one new persistent producer context, visible but closed to owner input;
- one new separate persistent reviewer context, which is Kristian's only conversational interface during the session.

The producer and reviewer remain separate from each other and persist across every configured phase. The Guide does not become a third in-session authority. It hands over through the approved prompt artifact, then remains idle while the reviewer owns the owner-facing session conversation.

After immutable close, commit, and push, the final Summary and close evidence return to the Guide. The long-lived Guide conversation can then continue from what actually happened on disk.

## Why `koda-c-session-prompt` is a separate skill

`koda-c-session` is already the ceremony that validates a written owner prompt and opens session state. It should not also conduct an open-ended project conversation or decide what the next session ought to be.

The separate `koda-c-session-prompt` skill has a different responsibility:

1. **ENTRY CHECK:** derive project state from disk; require the prior session to be immutably closed and pushed; read its final Summary, close evidence, current project document, backlog, and relevant owner decisions; refuse if another prompt is already launch-ready or a session remains open.
2. **ITS OWN JOB:** work with Kristian in the Guide context to define one session's purpose, why it matters now, scope, exclusions, success evidence, owner decisions, known risks, and unresolved questions. Write a draft prompt artifact and revise it through discussion.
3. **HANDOVER OBLIGATION:** require Kristian's explicit confirmation, bind the confirmed content hash, mark exactly one prompt `READY TO LAUNCH`, and write a supervisor-consumable launch request. It must not create Koda session state, impersonate the producer, choose a reviewer verdict, or silently launch from an unfinished conversation.

`koda-c-session` then consumes that confirmed artifact as its input and performs the existing disk-backed session-open ceremony. The two skills remain distinct so discussion, authorization, and state mutation do not blur together.

## Proposed disk relay

```text
long-lived Guide conversation
  → explicit $koda-c-session-prompt invocation
  → draft prompt on disk
  → owner discusses and revises in Guide
  → explicit owner launch confirmation
  → prompt hash + READY TO LAUNCH record
  → supervisor rechecks prior pushed close and single-session rule
  → supervisor launches producer + reviewer contexts
  → producer invokes koda-c-session with confirmed prompt
  → normal Koda phase/review/receipt relay
  → immutable close + commit + push
  → Summary and close return to Guide
```

The exact prompt and launch-request paths remain implementation details. The durable minimum is the prompt content, its hash, owner confirmation, intended project/config, creation time, and resulting Koda session ID. A casual chat phrase is never launch authority.

## What makes this excellent to use

- The Guide begins from a concise disk-derived project brief: what exists, what changed, current risks, backlog, and the last pushed close.
- Kristian can think aloud without accidentally opening a session.
- Invoking the prompt skill changes the Guide into a focused drafting mode with a visibly bounded session proposal.
- Before launch, the Guide shows a plain-language card: goal, why now, included work, excluded work, success proof, decisions already settled, and questions still requiring Kristian.
- One explicit confirmation starts the session. No commands need to be copied between contexts.
- The session view opens as two panes: producer progress visible and input-locked; reviewer conversational and owner-facing.
- Each phase ends with a clear artifact/handover summary while the files remain authoritative.
- Close returns a plain-language outcome to the Guide: what was delivered, what failed or changed, what is pushed, and what belongs in a later session.

## Safety and truth conditions

- Never launch from ordinary Guide conversation, a draft prompt, inference, or inactivity timeout. Require explicit skill invocation and explicit launch confirmation.
- Never launch while any prior Koda session lacks immutable pushed close.
- Never create more than one active or waiting session for the same project.
- Re-hash the prompt at launch; changed content invalidates earlier confirmation.
- Use fixed executable argument arrays rather than shell-built commands.
- Give producer and reviewer only the permissions required for their roles. A skill description is not a permission boundary.
- Keep owner input closed to the producer after session start; all interaction goes through the reviewer and disk artifacts.
- Keep receipt acknowledgement and gate routing unchanged. Automatic process launch is not automatic approval.
- Serialize supervisor mutations so two windows cannot calculate or claim the same next state.
- Leave every interruption in a named recoverable disk state; Ctrl-C must never create an ambiguous half-launch.

## Context thesis

The Guide may feel like a never-ending conversation, but its real continuity is a compact project state reconstructed from disk: project document, decisions, design notes, backlog, prior summaries, and pushed closes. Conversation history is useful working memory, not the final source of truth.

The leading safety design keeps the Guide context distinct from the new session reviewer. The Guide co-authors the session prompt with Kristian; the reviewer should receive that approved prompt and the producer's artifacts without inheriting the Guide's private drafting process. The interface may reuse the same owner-facing pane, but the task/context boundary remains visible in the evidence.

## What is deliberately not settled here

- The exact prompt-artifact and launch-request schemas.
- Whether the future interface replaces the Guide task in place with the reviewer or displays an explicit context switch in the same pane.
- Notification transport and remote access.
- The later `every_gate` versus `decisions_only` attention policy.

None of those choices is required to preserve the core thesis: the Guide hosts a distinct session-prompt skill; explicit owner confirmation produces a disk-backed launch handoff; the launched session contains separate producer and reviewer contexts; pushed close returns truth to the Guide.
