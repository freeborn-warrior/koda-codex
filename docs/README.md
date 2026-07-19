# Koda-C

> “I design workflows. I don't write code. I gave my development discipline to Codex in one document. It built a toolkit where nothing advances without written proof the review was read.”

Koda-C is a small, headless phase gate over plain files. It refuses to advance work until the current artifact exists, an independent review exists, the verdict permits advancement, and the owner quotes that review's unique closing receipt into the approval ledger.

The naming is deliberate: **Koda-C** is the product, `koda` is its CLI command, and `koda-codex` is this lowercase repository/package slug for the Codex-built competition implementation.

No UI, daemon, database, or hidden conversational state. The files are the truth.

This repository is the competition entry and the meta-harness, not a universal ready-made project persona. Koda-C keeps the proof mechanism stable; each project is expected to keep purpose-specific `AGENTS.md`, producer skills, shared-reviewer criteria, evidence shapes, and verification commands in its own repository. A novel-writing project and a Rust project can use the same gate without pretending their work or review standards are interchangeable.

## Judge path

1. **Run without rebuilding:** `node dist/cli.js --help`.
2. **See the refusal:** follow the [one-minute fixture](DEMO.md#one-minute-mechanical-proof).
3. **Inspect the real relay:** the [genuine six-phase result](relay-runs/2026-07-18-software-clean-sol-medium-terra-medium-01/RESULT.md) records distinct persistent producer/reviewer contexts, an unplanned Summary REVISE, seven owner acknowledgements, and pushed close.
4. **Check the claims:** the [pushed 147-check CLI ceremony transcript](test-results/2026-07-19-cli-ceremony-pushed-final.md), [model matrix](MODEL-TEST-MATRIX.md), [fresh skill-discovery proof](discovery-runs/2026-07-18-fresh-codex-startup-01/RESULT.md), and [safety audit](security-runs/2026-07-18-local-audit-01/RESULT.md) are committed evidence.

Tested here on macOS 26.5.1 arm64 with Node.js 26.0.0 and Apple Git 2.50.1. The core requires Node.js 22.18+ and Git; other platforms are not claimed as tested. The current reviewer window uses macOS `less` and `pbcopy` for the owner-reading ceremony.

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

After the final phase advances, the first `session close` creates immutable `close.md`, bound to all durable session files and the final review receipt. Git commit and push happen next. A second `session close` writes nothing; it reports closed only if the bound files are unchanged, committed, clean, and present on the pushed upstream. Another session cannot open before pushed terminal proof exists: normal close or explicit halt.

Direction during a phase has exactly two verbs. **Wait** is the default: Koda writes the owner's exact words, source, time, frozen phase-entry hash, and observed artifact/review hashes immediately, but Producer receives the direction only through the next successful advancement record. The receiving artifact must cite its direction ID; early use refuses. **Halt** is the only interrupt: immutable `halt.md` voids the in-flight phase, must be committed and pushed, and forces later work through a new session and fresh Brief. There is no pause-inject-resume route.

## Try the refusal in about one minute

Requirements: Git and Node.js 22.18 or newer. The source is TypeScript; `prepack` emits dependency-free plain JavaScript under `dist/` so the installed CLI does not ask Node to type-strip code inside `node_modules`.

The core has no runtime dependencies, install hook, daemon, or network call. Its exact write and trust boundaries—including the model-launching relay scripts—are documented in [SECURITY.md](SECURITY.md).

From a fresh checkout:

```bash
npx --yes . --help
```

That exact path is preserved as a [fresh public-checkout proof](package-runs/2026-07-18-fresh-checkout-npx-01/RESULT.md): the first run exposed an executable-mode defect, and the corrected pushed checkout prints help without changing any tracked or untracked file.

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
koda guide status
koda guide confirm <prompt-file> --owner <name>
koda guide cancel <launch-id> --owner <name> --reason <text>
koda guide bind <launch-id> <session-id>
koda guide verify
koda guide launch --producer-model <model> --producer-effort <effort> --reviewer-model <model> --reviewer-effort <effort> [--open ghostty]
koda session new <prompt-file>
koda status
koda review new <phase>
koda direction wait <owner-message-file> <classification-file> [--source owner-via-guide|owner-via-reviewer]
koda approve <phase> [quoted-receipt] [--approver <name>]
koda advance
koda session halt [owner-direction-file]
koda session close
```

The CLI generates artifact hashes, review IDs, receipts, structured approval entries, advancement history, and immutable close metadata. All remain readable Markdown or JSON.

## Skills: the relay above the CLI

All skills live inside this repository under Codex's discoverable `.agents/skills/` path:

- `koda-c-session-prompt` turns the Guide's project-level context into one owner-confirmed, hashed launch handoff.
- `koda-c-session` opens from an owner contract and prior pushed summary.
- `koda-c-brief`, `koda-c-orient`, `koda-c-plan`, `koda-c-produce`, `koda-c-live`, and `koda-c-summary` are producer relay legs.
- `koda-c-review` is the only formal reviewer skill; its per-phase criteria never drift into copies.
- `koda-c-close` performs the prepare → Git → verify ceremony outside the phase chain.

A [fresh ephemeral Codex startup proof](discovery-runs/2026-07-18-fresh-codex-startup-01/RESULT.md) discovered the original nine session-runtime skills and root project guidance without any tool call or repository read. The newer Guide-side session-prompt skill passes the same repository validator and deterministic contract suite; its own genuinely fresh startup discovery run remains visibly pending rather than being inferred from the historical proof.

Between sessions, the Guide reconstructs the project from its configured steering files, prior pushed close or halt, and carry-forward evidence. After halt it must cite the halt ID and every waiting direction ID in the newly confirmed prompt before a fresh Brief can open. Explicit owner confirmation writes one `READY_TO_LAUNCH` request binding the prompt, Guide manifest, steering snapshot, and prior-session evidence; edits make it stale, and cancellation is an immutable pushed artifact rather than deletion. A project with a Guide manifest cannot open a session from an unconfirmed prompt. `koda guide launch` then binds explicit producer/reviewer assignments into ignored `.koda/` runtime and prints exact Window B, Window A, and status commands. On macOS, explicit `--open ghostty` requests labeled Reviewer and Producer windows in that order while the existing Guide conversation stays open. It records the request before opening either window, refuses duplicate automatic opening, and retains the exact manual commands as recovery. After pushed close, the runtime returns a tracked archive and machine-readable handback under `docs/guide/`. The [Guide continuity protocol](GUIDE-CONTINUITY.md) documents the mechanics and limits.

Every producer skill has three hard sections: ENTRY CHECK, ITS OWN JOB, and HANDOVER OBLIGATION. It refuses when required disk evidence is absent, writes only its own artifact, then hands to the shared reviewer without self-reviewing or advancing.

A phase may pause for a disk-backed [in-phase consultation](IN-PHASE-CONSULTATION.md). The producer suggests reviewer authority for evidence/technical ambiguity or owner authority for product judgment, but every request goes to the reviewer. The reviewer answers or asks Kristian in its own owner-facing window, then relays the recorded response to the producer. After Kristian's one deliberate session-start invocation, the producer never solicits him directly. Consultation creates no verdict or receipt; the persistent reviewer may later formally review because it did not author the artifact, and it discloses its prior advice.

Every reviewer → producer handback is an artifact before it is actionable: a consultation response, relayed owner ruling, formal review, or waiting-direction ID released by advancement. Conversation and notifications may draw attention to the file, but Producer never continues from chat text or memory. New direction stated in Guide or Reviewer conversation is recorded immediately and waits one boundary; it cannot revise the active phase. The [wait-or-halt ruling](design-notes/2026-07-19-wait-or-halt-owner-ruling.md) supersedes the historical same-phase owner-handback experiment.

The bounded session uses two visible persistent Codex tasks side by side. The Producer explicitly invokes the current phase skill and shows its available progress, but its conversational input is closed; Kristian can watch or terminate it but cannot type into it. The separate owner-facing Reviewer carries consultations, explanations, rulings, and formal handoffs through the one `koda-c-review` skill. Kristian discusses that active session there, while his enclosing Guide project conversation may continue separately. Neither session context is recreated at phase boundaries. See the [two-task walkthrough](DEMO.md#two-codex-task-collaboration).

The repository also contains a [persistent full-relay test harness](FULL-RELAY-RUN.md) that resumes two distinct Codex thread IDs across all six phases and pauses for Kristian's real receipt at every gate. Its [first genuine run](relay-runs/2026-07-18-software-clean-sol-medium-terra-medium-01/RESULT.md) completed with an unplanned Summary REVISE loop, seven owner acknowledgements, and a pushed immutable close. The same relay now has a separate real-project mode: a deterministic integration proves pushed Guide request → two processes → receipt gate → pushed close → interrupted return recovery → pushed Guide handback without removing the actual repository's `.git`. The macOS Ghostty adapter deterministically proves safe argument construction, Reviewer-first ordering, persisted launch intent, partial-open refusal, manual recovery, and duplicate-open refusal. No live model or real Ghostty window was opened by those new tests; Kristian's owner-observed three-context run remains pending.

Kristian's historical two-window terminal proof remains in the [first-time Ghostty test guide](GHOSTTY-TEST-GUIDE.md). The current product target is a [three-context human experience](design-notes/2026-07-18-three-context-human-experience.md): ongoing project-level Guide, visible non-interactive Producer, and ongoing owner-facing session Reviewer. Guide and Reviewer both remain conversational at their distinct scopes; Producer does not.

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

The owner-ready [video script](VIDEO-SCRIPT.md) and live-rules [submission checklist](SUBMISSION-CHECKLIST.md) keep the remaining external work explicit instead of treating an implemented repository as a submitted entry.

The [reviewer model and effort matrix](MODEL-TEST-MATRIX.md) summarizes only runs that actually exist and leaves untested effort levels visibly unrun; the [dated final report](test-results/2026-07-18-bounded-reviewer-model-program.md) explains the result and its real-world limits in plain language. Sol, Terra, and Luna all passed the sealed medium-effort inference, temperament, and missing-evidence contracts, so no low-effort winner confirmation was run. Their score cells tied, but their execution did not: Sol was consistently direct, Terra recovered from path mistakes, and Luna more often relied on gate repair or skipped safe cited checks. Those are bounded behavioral observations, not claims about cognition or universal model rank.

## How this was built

Kristian supplied the lived failure, product doctrine, phase vocabulary, owner rulings, relay model, skill boundaries, immutable close ceremony, two-task collaboration model, and the requirement that all work remain visible in repository files.

GPT-5.6 Codex translated that direction into the TypeScript CLI, disk schemas, artifact and session hashing, exact receipt matching, Git-derived closure, skill packages, mutation suite, fixtures, dogfood evidence, and documentation. It also surfaced implementation defects through tests: macOS path aliases initially broke Git containment, and the first close hint printed the wrong first-push command.

Kristian explicitly chose to let Codex build in its own engineering order rather than phase-gating the construction. That choice is recorded honestly: the discipline lives in the tool, not in the process that made it. An initial gated-build attempt and its unused REVISE review remain recoverable in pushed Git history, but were removed from `docs/sessions/` so abandoned build evidence cannot masquerade as live Koda state.

No external benchmark dataset is used. Deterministic tests are marked model-not-applicable. Blind GPT-5.6 Sol, Terra, and Luna runs use repository fixtures, preserve model and effort metadata, and leave every unrun combination visibly unrun. Their observable differences can inform a reasoning comparison; Koda-C does not present them as proof of subjective cognition.

## Project boundary and roadmap

Koda-C stays a clean plain-file engine. The first Guide continuity and confirmed-prompt mechanics now exist under the single `koda` executable. Explore, Research, Architecture, Triage, and a read-only Librarian remain roadmap role/session lenses rather than rushed parallel runtimes. A dashboard, editor extension, or bot can later consume the same files and a future machine-readable status mode without owning the process.

The next adoption layer is project adaptation. It should help create project-local guidance and relay skills from the owner's actual purpose, with writing and software as initial profiles, while preserving any existing project instructions and keeping all generated material inside that project. Profiles may rename Produce to Draft or earn a distinct Edit/Refine phase when it creates separate evidence; the native six phases are a reference chain, not a semantic costume. That bootstrap layer is not implemented in the current entry and must not be confused with the already working gate.

The mature runtime presents three visible persistent contexts: Guide holding an ongoing project conversation, Producer visibly working with owner input closed, and Reviewer holding the ongoing active-session conversation. Each runtime pane prints its permanent role and owner-input state. Producer announces frozen phase entry, artifact handover, revalidated gate passage, released directions, phase count, and the next phase or close ceremony; Reviewer names phase position and the available owner choices. `relay:status` names all three scopes and prints only one safe action at a time—Reviewer first, then Producer after Reviewer is alive. `relay:reviewer` keeps a real `reviewer> ` prompt open, resumes the same persistent Reviewer for active-session questions, opens and explains formal reviews, records direction immediately as gate-waiting evidence, offers explicit pushed halt as the sole interrupt, and keeps exact receipt acknowledgement in Window B. Project-scope thoughts return to Guide. Neither Guide nor Reviewer may inject direction into the active phase; advancement is the only release. Guide-launched general-project preparation, execution, recovery, pushed return, and an opt-in one-action Ghostty window request work deterministically. The remaining central UX gap is owner-observed live proof of the complete three-context path. See the [Ghostty guide](GHOSTTY-TEST-GUIDE.md), [wait-or-halt ruling](design-notes/2026-07-19-wait-or-halt-owner-ruling.md), [three-context experience](design-notes/2026-07-18-three-context-human-experience.md), [always-open Reviewer design](design-notes/2026-07-19-always-open-reviewer-conversation.md), and [real-project Guide runtime note](design-notes/2026-07-18-guide-real-project-runtime.md).

The current build record and deliberate extensions from the starting document are tracked in [PROJECT.md](PROJECT.md#drift-watch-against-the-starting-document).

The conservative current policy requires Kristian's acknowledgement at every gate. A later config setting may separate **gate acknowledgement** from **owner attention**: every review would still receive attributable receipt proof, while a `decisions_only` mode could stop Kristian only for `DISCUSS` or an explicit owner-attention marker. That policy remains a documented owner decision, not behavior this release quietly assumes.

Model assignment is likewise treated as future project staffing, not hidden skill behavior. A role is a seat, a session kind or phase is an assignment, and model plus effort is the staff member. The leading design resolves Guide, session-kind reviewer/defaults, and per-phase producer assignments centrally, snapshots them at launch, and uses sealed matrix results as evidence. Current Codex skill frontmatter does not select a model, and cross-model thread continuation still needs proof. See the [staffing and attention design](design-notes/2026-07-18-project-staffing-and-attention.md).

## License

Koda-C is licensed under the [GNU General Public License version 3](../LICENSE) (`GPL-3.0-only`).

Copyright (C) 2026 Kristian Bengtsson
