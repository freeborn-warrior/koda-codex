# Koda-C

> “I design workflows. I don't write code. I gave my development discipline to Codex in one document. It built a toolkit where nothing advances without written proof the review was read.”

Koda-C is a small, headless phase gate over plain files. It refuses to advance work until the current artifact exists, an independent review exists, the verdict permits advancement, and the owner quotes that review's unique closing receipt into the approval ledger.

The naming is deliberate: **Koda-C** is the product, `koda` is its CLI command, and `koda-codex` is this lowercase repository/package slug for the Codex-built competition implementation.

No UI, daemon, database, or hidden conversational state. The files are the truth.

This repository is the competition entry and the meta-harness, not a universal ready-made project persona. Koda-C keeps the proof mechanism stable; each project is expected to keep purpose-specific `AGENTS.md`, producer skills, shared-reviewer criteria, evidence shapes, and verification commands in its own repository. A novel-writing project and a Rust project can use the same gate without pretending their work or review standards are interchangeable.

## Why it exists

Kristian developed this phase method while building products in C++, Swift, and Rust as a designer rather than a programmer: session prompt, brief, orient, plan, produce, live, summary, then push. The sequence grew from observing what stopped repeated rework. When he added an independent LLM reviewer, each phase became a manual relay between separate chats—better judgment, but an absurd amount of copy-paste.

Koda-C asks whether that practiced producer/reviewer relay can become mechanical while preserving the parts that create depth. Kristian directs software he cannot personally read. The expensive failures in his AI collaborations shared one shape: work advanced on confident prose. A summary claimed more than the files proved. Status came from conversational memory. Most sharply, a written review was delivered and then approved without being read.

That last incident created the receipt. Every review ends with a generated, unique `RECEIPT:` line. The approver must read the review and quote that line exactly before the gate can open. Delivery and reading become separate steps the files can distinguish.

This is evidence of engagement, not mind-reading. Someone can still copy a final line without understanding the review. But not-reading stops being a passive omission and becomes deliberate fraud: the approver must open the review to take its unique phrase. Koda-C creates an inspectable decision ritual and raises the floor against casual or accidental skipping; it does not claim to prove cognition.

## The mechanism

A session snapshots a configurable phase chain. The native chain is:

`brief → orient → plan → produce → live → summary`

For each phase:

1. A producer skill passes its entry check and writes the phase artifact.
2. The one shared `koda-c-review` skill verifies the artifact from a separate context and writes a verdict plus generated receipt.
3. The owner reads the review and quotes the exact receipt through `approve`.
4. `advance` re-reads disk and routes:
   - APPROVE / APPROVE WITH COMMENTS → activate the next phase from config;
   - REVISE / REJECT → remain in the same producer phase;
   - DISCUSS → remain in phase for an owner ruling and fresh review.

Advancement revalidates all earlier gates too. Deleting or changing old evidence makes later work refuse even when `state.json` names a current phase.

After the final phase advances, the first `session close` creates immutable `close.md`, bound to all durable session files and the final review receipt. Git commit and push happen next. A second `session close` writes nothing; it reports closed only if the bound files are unchanged, committed, clean, and present on the pushed upstream. Another session cannot open before that proof exists.

## Try the refusal in about one minute

Requirements: Git and Node.js 22.18 or newer. The source is TypeScript; `prepack` emits dependency-free plain JavaScript under `dist/` so the installed CLI does not ask Node to type-strip code inside `node_modules`.

From a fresh checkout:

```bash
npx --yes . --help
```

Then follow the [one-minute fixture](DEMO.md#one-minute-mechanical-proof). Its money moment is:

```text
GATE CLOSED — BRIEF
✗ The current review receipt has not been quoted into the approval ledger.
Nothing advanced.
```

After the exact receipt is recorded, the same command reports `GATE OPEN — BRIEF`.

## CLI

```text
koda init [directory] [--demo]
koda session new <prompt-file>
koda status
koda review new <phase>
koda approve <phase> [quoted-receipt] [--approver <name>]
koda advance
koda session close
```

The CLI generates artifact hashes, review IDs, receipts, structured approval entries, advancement history, and immutable close metadata. All remain readable Markdown or JSON.

## Skills: the relay above the CLI

All skills live inside this repository under Codex's discoverable `.agents/skills/` path:

- `koda-c-session` opens from an owner contract and prior pushed summary.
- `koda-c-brief`, `koda-c-orient`, `koda-c-plan`, `koda-c-produce`, `koda-c-live`, and `koda-c-summary` are producer relay legs.
- `koda-c-review` is the only formal reviewer skill; its per-phase criteria never drift into copies.
- `koda-c-close` performs the prepare → Git → verify ceremony outside the phase chain.

Every producer skill has three hard sections: ENTRY CHECK, ITS OWN JOB, and HANDOVER OBLIGATION. It refuses when required disk evidence is absent, writes only its own artifact, then hands to the shared reviewer without self-reviewing or advancing.

A phase may pause for a disk-backed [in-phase consultation](IN-PHASE-CONSULTATION.md). The producer suggests reviewer authority for evidence/technical ambiguity or owner authority for product judgment, but every request goes to the reviewer. The reviewer answers or asks Kristian in its own owner-facing window, then relays the recorded response to the producer. After Kristian's one deliberate session-start invocation, the producer never solicits him directly. Consultation creates no verdict or receipt; the persistent reviewer may later formally review because it did not author the artifact, and it discloses its prior advice.

Every reviewer → producer handback is an artifact before it is actionable: a consultation response, relayed owner ruling, or formal review. Conversation and notifications may draw attention to the file, but the producer never continues from chat text or memory.

The real collaboration uses two visible persistent Codex tasks side by side for the full Koda session. The producer task explicitly invokes the current phase skill and shows its available progress, but its conversational input is closed; Kristian can watch or terminate it but cannot type into it. The separate owner-facing reviewer task carries consultations, explanations, rulings, and formal handoffs through the one `koda-c-review` skill. Kristian speaks only there and can discuss anything he notices in the producer stream. Neither context is recreated at phase boundaries. See the [two-task walkthrough](DEMO.md#two-codex-task-collaboration).

The repository also contains a [persistent full-relay test harness](FULL-RELAY-RUN.md) that resumes two distinct Codex thread IDs across all six phases and pauses for Kristian's real receipt at every gate. Its [first genuine run](relay-runs/2026-07-18-software-clean-sol-medium-terra-medium-01/RESULT.md) completed with an unplanned Summary REVISE loop, seven owner acknowledgements, and a pushed immutable close. It proves the backend relay but remains a bridge, not yet the mature side-by-side owner-facing interface.

Kristian's exact two-window terminal procedure is in the [first-time Ghostty test guide](GHOSTTY-TEST-GUIDE.md).

That separation is a tested operating protocol, not a permission claim. `SKILL.md` cannot prove a task had no hidden context or restrict which files/tools it could access. Koda-C mechanically enforces the evidence on disk; fresh-task fixtures test reviewer independence and temperament in practice.

## Tests and evidence

```bash
npm test
npm run test:coverage
npm run dogfood
npm run relay:prepare -- software-clean gpt-5.6-sol medium gpt-5.6-terra medium
```

The suite deliberately breaks every gate condition and proves refusal: missing/empty artifacts, missing or malformed reviews, bad verdicts, missing/mismatched/reused receipts, altered artifacts, broken ledger proof, missing approver/comments, and every blocking verdict. It also executes recovery commands from the states that printed them.

The committed [dogfood transcript](dogfood/TRANSCRIPT.md) preserves the complete six-phase native chain: review refusal, receipt refusal, and gate success at every phase, followed by immutable close preparation, refusal after local commit, Git push, and derived `SESSION CLOSED`. Its session snapshot is also committed and re-hashed by the test suite.

Every run—including defects and corrected test assertions—is recorded in [TESTING.md](TESTING.md), with dated [per-test transcripts](test-results/) that name every individual result. The blind model-assisted protocol covers five sealed fixtures: the original hard-number plant and pristine honest control, an inference-chain plant, an imperfect-but-correct temperament control, and a missing-evidence trap. Its [fixture protocol](REVIEWER-FIXTURES.md) scores the specific CATCH separately from the chosen VERDICT so a vague block cannot masquerade as reasoning success. Current Codex skill-platform implications are captured in a [dated design note](design-notes/2026-07-18-codex-skill-platform.md). Current build direction and status live in [PROJECT.md](PROJECT.md) and [BACKLOG.md](BACKLOG.md).

The [reviewer model and effort matrix](MODEL-TEST-MATRIX.md) summarizes only runs that actually exist and leaves untested effort levels visibly unrun; the [dated final report](test-results/2026-07-18-bounded-reviewer-model-program.md) explains the result and its real-world limits in plain language. Sol, Terra, and Luna all passed the sealed medium-effort inference, temperament, and missing-evidence contracts, so no low-effort winner confirmation was run. Their score cells tied, but their execution did not: Sol was consistently direct, Terra recovered from path mistakes, and Luna more often relied on gate repair or skipped safe cited checks. Those are bounded behavioral observations, not claims about cognition or universal model rank.

## How this was built

Kristian supplied the lived failure, product doctrine, phase vocabulary, owner rulings, relay model, skill boundaries, immutable close ceremony, two-task collaboration model, and the requirement that all work remain visible in repository files.

GPT-5.6 Codex translated that direction into the TypeScript CLI, disk schemas, artifact and session hashing, exact receipt matching, Git-derived closure, skill packages, mutation suite, fixtures, dogfood evidence, and documentation. It also surfaced implementation defects through tests: macOS path aliases initially broke Git containment, and the first close hint printed the wrong first-push command.

Kristian explicitly chose to let Codex build in its own engineering order rather than phase-gating the construction. That choice is recorded honestly: the discipline lives in the tool, not in the process that made it. An initial gated-build attempt and its unused REVISE review remain recoverable in pushed Git history, but were removed from `docs/sessions/` so abandoned build evidence cannot masquerade as live Koda state.

No external benchmark dataset is used. Deterministic tests are marked model-not-applicable. Blind GPT-5.6 Sol, Terra, and Luna runs use repository fixtures, preserve model and effort metadata, and leave every unrun combination visibly unrun. Their observable differences can inform a reasoning comparison; Koda-C does not present them as proof of subjective cognition.

## Project boundary and roadmap

Koda-C stays a clean plain-file engine. Guide, explore, architect, and triage remain roadmap role lenses implemented as future skills, not new CLI machinery. A dashboard, editor extension, or bot can later consume the same files and a future machine-readable status mode without owning the process.

The next adoption layer is project adaptation. It should help create project-local guidance and relay skills from the owner's actual purpose, with writing and software as initial profiles, while preserving any existing project instructions and keeping all generated material inside that project. That bootstrap layer is not implemented in the current entry and must not be confused with the already working gate.

The mature runtime is one visible persistent producer beside one visible persistent owner-facing reviewer. Kristian approves a written session prompt in the guide interface, a supervisor launches both contexts for the session, and every later producer input arrives through reviewer-authored files. Kristian may follow the producer's exposed progress but speaks only with the reviewer. The current release proves the backend two-context relay; it does not yet claim that side-by-side interactive surface, automatic process launch, or unattended orchestration. See the [dated runtime design](design-notes/2026-07-18-owner-facing-session-runtime.md).

The current build record and deliberate extensions from the starting document are tracked in [PROJECT.md](PROJECT.md#drift-watch-against-the-starting-document).

The conservative current policy requires Kristian's acknowledgement at every gate. A later config setting may separate **gate acknowledgement** from **owner attention**: every review would still receive attributable receipt proof, while a `decisions_only` mode could stop Kristian only for `DISCUSS` or an explicit owner-attention marker. That policy remains a documented owner decision, not behavior this release quietly assumes.

## License

Koda-C is licensed under the [GNU General Public License version 3](../LICENSE) (`GPL-3.0-only`).

Copyright (C) 2026 Kristian Bengtsson
