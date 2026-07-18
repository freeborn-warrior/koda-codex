# Owner process origin — 2026-07-18

This note records Kristian's account of how Koda-C emerged from his real working practice. It is product origin evidence, not a Koda phase artifact or test result.

## The practiced method

Kristian has used the same phase discipline while building products in C++, Swift, and Rust:

1. begin a session with a written session prompt;
2. invoke a brief skill;
3. invoke an orient skill;
4. invoke a plan skill;
5. invoke a produce skill;
6. invoke a live skill;
7. invoke a summary skill;
8. push the completed session.

The phases grew partly from his design background and partly from repeated observation of what prevented work from being redone. The structure was not invented as abstract process theory; it accumulated as a practical answer to missing context, premature planning, untested output, unclear handover, and repeated rework.

## Why a separate reviewer appeared

Kristian then recognized a capability mismatch. As the designer and product owner, he could judge purpose, experience, direction, and product decisions, but he could not reliably review implementation in languages he does not write. An LLM could perform that evidence-level review.

He added a reviewer skill and began sending every phase artifact into a separate chat, then copying the result back into the producer chat before continuing. This improved independence but turned the method into a laborious manual relay: phase output out, review output back, repeated across an entire session.

Koda-C begins with the question that followed: can the relay be automated, can its handoffs be hard-gated, and can the owner be interrupted only when something genuinely needs owner attention?

## Owner role

Kristian is not trying to become the code reviewer. His useful role is product ownership:

- make product decisions;
- resolve questions only a human owner can settle;
- work with explore and guide partners to deepen and expand the product;
- understand meaningful evidence without pretending to inspect code he cannot evaluate.

The intended system should carry routine producer/reviewer relay work through explicit phases and bring him in when judgment, direction, or risk actually requires him.

## Product belief

The underlying belief is that a structured creative process can produce better and deeper products when someone is trying to manifest a meaningful idea. The phases protect depth: they make purpose explicit, inspect the real ground, separate planning from production, require live evidence, and close with an honest summary. Independent review and mechanical gates make that discipline survivable across separate AI contexts.

## Current implementation tension

The current target requires an owner receipt quote at every phase gate. That is faithful to the original unread-review failure and creates the clearest one-minute proof. The longer-term attention model described here is exception-based: routine allowed reviews may be acknowledged and routed by a trusted receiving context, while `DISCUSS` and genuine product decisions must reach the owner.

Those policies are not silently interchangeable. The current owner-every-gate behavior remains in force unless Kristian explicitly changes it. The leading future design is a config-level owner-attention setting: every gate still receives attributable receipt acknowledgement, while a `decisions_only` mode may route routine work through a guide/orchestrator and reserve `DISCUSS` or an explicit attention marker for Kristian. This must not weaken artifact, review, verdict, receipt, or stale-evidence checks.
