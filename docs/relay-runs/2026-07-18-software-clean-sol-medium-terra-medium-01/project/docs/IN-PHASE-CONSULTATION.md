# In-phase consultation protocol

An in-phase consultation resolves a blocking question while the current producer phase remains open. It is not the phase-closing review and cannot create a verdict, receipt, approval, or advancement.

**No chat-only handback:** every reviewer response that may change producer work must be written to the named response artifact first. The producer may not continue from a chat message, notification, or remembered explanation.

## Classify the stop

The producer skill suggests the smallest authority needed and records why, but every request is sent to the reviewer:

- **Reviewer stop:** facts, cited evidence, technical feasibility, correctness, reviewability, or whether a claim can be checked.
- **Owner stop:** purpose, scope, priority, intended experience, product tradeoff, risk appetite, or which outcome should exist.

When the class is genuinely uncertain, the producer requests reviewer triage. A reviewer may answer a reviewer-class question or escalate it as `OWNER DECISION REQUIRED`; it must never silently make an owner decision. Even when the product judgment is obvious, the producer sends the request to the reviewer with `Suggested stop: owner`. The producer never addresses or notifies the owner directly.

## Files

Write consultations under the current session:

```text
consultations/<NN>-<phase>/<CC>-request.md
consultations/<NN>-<phase>/<CC>-response.md
```

`NN` is the current one-based phase index and `CC` is a two-digit sequence within that phase. Never overwrite an answered pair.

The request has this shape:

```markdown
# In-phase consultation request

- Phase: <current phase>
- Suggested stop: reviewer | owner
- Classification reason: <why this role is the smallest honest authority>
- Requested by: <producer identity>
- Blocking: yes

## Question
<one answerable question>

## Why it blocks this phase
<work that cannot honestly continue>

## Evidence and options
- [`path`](path): <relevant evidence>
- Option: <choice and consequence, when applicable>

## Decision boundary
<what the responder may decide and what remains out of scope>
```

The response has this shape:

```markdown
# In-phase consultation response

- Request: [`<CC>-request.md`](<CC>-request.md)
- Answer authority: reviewer | owner-via-reviewer
- Respondent: <reviewer identity, or owner identity relayed by reviewer>
- Disposition: ANSWERED | AWAITING OWNER

## Answer or ruling
<answer, owner ruling, or the smallest clear owner question while awaiting response>

## Evidence checked
- [`path`](path): <what supports the answer>

## Consequence for the active phase
<what may continue, change, or remain blocked>
```

## Relay rules

1. The producer writes every request for the reviewer, remains in the same phase, and pauses the blocked work. It never speaks to or notifies the owner.
2. For reviewer authority, the reviewer answers from cited evidence.
3. For owner authority, or when reviewer triage discovers a product judgment, the reviewer records `AWAITING OWNER`, asks the owner in the reviewer interface, then records the owner's response verbatim and changes the disposition to `ANSWERED`. An answered response pair is never overwritten.
4. The reviewer relays the disk-backed answer to the producer. The owner does not enter the producer interface.
5. The producer links the request and final response under `Inputs resolved during this phase` and explains how they affected the artifact.
6. The completed artifact still goes through the normal formal review and receipt gate in the persistent reviewer task. If that reviewer advised during the phase, the formal review discloses the consultation and verifies the artifact against it; the reviewer still did not author the artifact.

Disk files prove what question and response entered the relay. They do not prove a respondent's private cognition or that two Codex tasks lacked hidden shared context. The normal operating proof is role separation between the persistent producer and reviewer tasks; genuinely fresh blind reviewer tasks are an additional fixture-testing method.
