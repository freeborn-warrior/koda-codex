# The Koda-C process

Koda-C separates two things that are easy to confuse:

1. the **workflow discipline** that remains mechanically true in every project;
2. the **project method** that should change for the kind of work being done.

The gates are the product. The included phase skills are one complete reference
method, developed by Kristian Bengtsson while directing C++, Swift, and Rust
projects as a designer. They show how a deep producer/reviewer relay can operate;
they are not a claim that every project should use the same phases or prompts.

## Three levels of continuity

### Project

The project is the long-lived context across many sessions. Guide holds the
owner-facing project conversation and reconstructs current truth from configured
steering documents, closed-session evidence, active sessions, and Git history.
It helps the owner decide what step belongs next without treating chat memory as
authority.

### Session

A session is one bounded step on the project's path. It begins with an
owner-confirmed session prompt and ends only with immutable pushed close evidence
or an explicit pushed halt.

One persistent Producer context and one separate persistent Reviewer context span
the session. Producer is visible but owner-input-closed. The owner speaks with
Reviewer during the session. Their handover is made through named files and gates,
not copied conversational memory.

### Phase

A phase is one configured relay leg inside a session:

1. its entry inputs are frozen from disk;
2. Producer creates a durable artifact from those inputs;
3. Reviewer checks the artifact and cited evidence from its independent context;
4. the verdict decides whether the work may move;
5. the owner acknowledges the exact current review;
6. the gate revalidates the entire condition set from disk;
7. only a successful gate releases the next configured phase.

Direction given while a phase is running is recorded immediately but waits for
the next successful gate. Halt is the only interrupt. Koda-C never injects new
direction into an in-flight phase and resumes it against split provenance.

## The shipped reference chain

| Ceremony or phase | Purpose | Durable handover |
| --- | --- | --- |
| Session prompt | Freeze the owner's purpose, limits, and success conditions. | Confirmed prompt and opened session state. |
| Brief | State what this session will do, why, its boundaries, inputs, and success evidence. | A bounded contract for independent review. |
| Orient | Inspect the actual cited ground before planning; separate observations, inferences, and unknowns. | An evidence-backed account of present reality. |
| Plan | Convert approved evidence into ordered, checkable work without making the deliverable. | A plan another context can execute and verify. |
| Produce | Create the declared output and verify it against approved inputs. | The output plus a concrete evidence manifest. |
| Live | Exercise the real output and record observed behavior without substituting predictions or mocks. | Reproducible live evidence. |
| Summary | Report what was done and verified without claiming unproved completion. | An evidence-backed account of the session. |
| Close | Bind all completed session evidence, commit it, push it, and verify the pushed state. | Immutable `close.md` and Guide return evidence. |

`koda-c-review` is one shared Reviewer skill across the chain. Its role remains
constant—verify rather than produce—while its criteria change with the artifact:
a Brief is judged as a contract, Orient as grounded observation, Plan as executable
intent, Produce as the declared output, Live as observed evidence, and Summary as
an honest account of the whole session.

## What Koda-C keeps invariant

- project and session identity on disk;
- configured phase order and frozen phase entry;
- one non-empty durable artifact per phase;
- independent review bound to the artifact's current content hash;
- explicit verdict routing;
- acknowledgement bound to the current review's unique receipt;
- whole-chain gate revalidation and named refusal reasons;
- direction released only at a successful boundary;
- immutable Git-verified session close or halt.

## What each project should adapt

- the number, names, and order of phases;
- the purpose and artifact shape of every producer skill;
- evidence sources and verification commands;
- review criteria for each kind of artifact;
- project guidance in `AGENTS.md`;
- model and effort staffing where the runtime supports it;
- session kinds and dependencies.

Phase order belongs in `koda.config.json`. A producer skill owns only its relay
leg: entry check, bounded job, artifact shape, and handover obligation. It may name
the configured receiver so the handover is humanly meaningful, but it should not
duplicate later phases or decide the project sequence itself.

The current repository includes the reference process and its software demo.
Creating tailored writing, research, design, or other project profiles remains a
future adoption layer. Those profiles should use the same mechanical gate without
pretending their domain work is interchangeable.

## Where to go next

- [Quick Start](QUICKSTART.md) shows the one-minute gate and complete three-context demo.
- [Command Manual](COMMAND-MANUAL.md) explains every command and consequence.
- [Security](SECURITY.md) states what the core and managed roles do and do not protect.
- [Project document](PROJECT.md) records implemented mechanics and future direction.
