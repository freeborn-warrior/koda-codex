# Codex skill-platform implications — 2026-07-18

Kristian supplied a current platform summary after noticing that the Koda-C skills were not under `.agents/`. The builder checked the material against OpenAI's live [Build skills](https://learn.chatgpt.com/docs/build-skills), [AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md), [Build plugins](https://learn.chatgpt.com/docs/build-plugins), and [advanced configuration](https://learn.chatgpt.com/docs/config-file/config-advanced) pages on 2026-07-18. This note records only the implications for Koda-C; it is not a frozen copy of the platform documentation.

## Confirmed platform facts that shape Koda-C

- Repository skills are discovered under `.agents/skills/` from the working directory up to the repository root. Koda-C's nine skills therefore belong there, not under a generic top-level `skills/` folder.
- A skill is `SKILL.md` plus optional scripts, references, assets, and `agents/openai.yaml`. The Koda-C skills are currently instruction-only and use the optional UI metadata.
- Codex first exposes only skill names, descriptions, and paths, with a bounded initial skill-index budget. Descriptions may be shortened when many skills are available. Koda-C descriptions must therefore front-load the job and trigger condition instead of relying on the body for discovery.
- Skills may be selected explicitly or implicitly. `policy.allow_implicit_invocation` can turn off implicit selection, but it does not replace Koda's disk entry checks or gate.
- `SKILL.md` has no supported `allowed-tools` field that confines a running Codex task. File/tool enforcement comes from Codex permissions, trusted hooks, and external mechanisms—not prose inside the skill.
- Plugins are the later distribution unit when a stable workflow should bundle multiple skills, hooks, connectors, MCP configuration, or install metadata. Plugin hooks are not automatically trusted merely because the plugin is installed or enabled.
- `AGENTS.md` and skills are complementary: the former carries small persistent repository rules; the latter carries reusable task workflows.

## Decisions applied now

1. Keep exactly one copy of every Koda-C skill under `.agents/skills/` and a concise root `AGENTS.md`.
2. Test each skill's trigger description for front-loaded action, explicit use condition, and bounded length; also bound the combined Koda-C description footprint.
3. Explicitly invoke the current relay skill at each phase/task handoff. Do not assume that using one skill implicitly carries another phase skill into later work.
4. Keep deterministic enforcement in the plain-file CLI. Skills explain and perform phase behavior; they do not become the hidden authority for gate truth.
5. Prove contextual independence by using a genuinely fresh reviewer task with no producer transcript and record that setup as test evidence.

## Honesty boundary

Koda-C mechanically proves that the artifact, bound review, verdict, exact receipt acknowledgement, and prior gate history agree on disk. It does not mechanically prove that a Codex reviewer had no hidden producer context or read no uncited file. The two-task protocol and blind fixtures raise confidence in independence, but they are observable test design rather than a claim that `SKILL.md` creates a permission boundary.

This is parallel to the receipt limitation: make the enforceable claim strongly, name the human/contextual boundary honestly, and test the boundary in the most adversarial practical way available.

## Ghostty model evaluation

Ghostty can host independent Codex CLI runs while every durable result remains in this repository. OpenAI's current [Codex model guide](https://learn.chatgpt.com/docs/models) lists `gpt-5.6-sol`, `gpt-5.6-terra`, and `gpt-5.6-luna`, supports launch-time `--model` selection, and exposes reasoning effort. The [configuration reference](https://learn.chatgpt.com/docs/config-file/config-reference) names `model_reasoning_effort` as the corresponding config key.

Koda's fixture runner pins both values, uses `codex exec --ephemeral --json`, and saves the event stream under `docs/reviewer-runs/`. Ephemeral execution prevents the test from depending on an undisclosed persisted task; the project files still preserve the review and execution evidence. Each run uses a separate copied fixture so concurrent or sequential model tests cannot mutate one another.

## Deferred until target (a) is secure

- Package the skill family as a Koda-C plugin for installation beyond one repository.
- Evaluate whether trusted project/plugin hooks materially improve task isolation or handoff automation without making the CLI depend on Codex.
- Decide explicit-only versus implicit invocation per skill using real trigger tests. Entry checks must refuse incorrect phase state either way.
- Add scripts or references to individual skills only when repeated real runs show that instruction-only behavior is insufficient.
