# Koda-C

> “I design workflows. I don't write code. I gave my development discipline to Codex in one document. It built a toolkit where nothing advances without written proof the review was read.”

Koda-C is a small, headless workflow over plain files. Its mechanical gate refuses to advance work until the current artifact exists, an independent review exists, the verdict permits advancement, and the review's unique closing receipt is bound to an explicit owner acknowledgement in the approval ledger.

The naming is deliberate: **Koda-C** is the product, `koda` is its CLI command, and `koda-codex` is this lowercase repository/package slug for the Codex-built competition implementation.

No UI, daemon, database, or conversational memory treated as authority. The files are the truth.

This repository is the competition entry and the meta-harness, not a universal ready-made project persona. Koda-C keeps the proof mechanism stable; each project is expected to keep purpose-specific `AGENTS.md`, producer skills, shared-reviewer criteria, evidence shapes, and verification commands in its own repository. A novel-writing project and a Rust project can use the same gate without pretending their work or review standards are interchangeable.

## Judge path

1. **Run without rebuilding:** `node dist/cli.js --help`.
2. **See the refusal:** follow the [one-minute fixture](DEMO.md#one-minute-mechanical-proof).
3. **Run the human workflow:** use the [complete-session Quick Start](QUICKSTART.md#path-b--run-a-complete-three-context-session). One command prepares an isolated pushed project and opens Guide; Koda owns the remaining instructions.
4. **Inspect the preserved relay:** the [genuine six-phase result](relay-runs/2026-07-18-software-clean-sol-medium-terra-medium-01/RESULT.md) records distinct persistent producer/reviewer contexts, an unplanned Summary REVISE, seven owner acknowledgements, and pushed close.
5. **Check the claims:** the current [bound 241-check transcript](test-results/2026-07-20-self-guided-full-session-security-final.md), [self-guided full-session quality audit](quality-runs/2026-07-20-self-guided-full-session-13/RESULT.md), [self-guided full-session security audit](security-runs/2026-07-20-self-guided-full-session-audit-19/RESULT.md), [bounded Guide startup quality audit](quality-runs/2026-07-20-bounded-guide-startup-12/RESULT.md), [bounded Guide startup security audit](security-runs/2026-07-20-bounded-guide-startup-audit-18/RESULT.md), [conversational-surface quality audit](quality-runs/2026-07-20-conversational-owner-surface-11/RESULT.md), [conversational-surface security audit](security-runs/2026-07-20-conversational-owner-surface-audit-17/RESULT.md), [owner-ceremony UX audit](quality-runs/2026-07-20-owner-review-ceremony-ux-audit-10/RESULT.md), [owner-ceremony security audit](security-runs/2026-07-20-owner-review-ceremony-audit-16/RESULT.md), [public-clone UX audit](quality-runs/2026-07-19-submission-readiness-09/RESULT.md), [project-boundary security probe](security-runs/2026-07-19-project-boundary-probe-13/RESULT.md), [persistent Guide security probe](security-runs/2026-07-19-secure-guide-console-boundary-14/RESULT.md), [sanitized first-launch incident](security-runs/2026-07-19-ghostty-launch-integrity-incident/RESULT.md), [model matrix](MODEL-TEST-MATRIX.md), [fresh ten-skill discovery proof](discovery-runs/2026-07-19-fresh-codex-startup-06/RESULT.md), and [fresh plural-session Guide preflight](guide-preflight-runs/2026-07-19-sol-medium-05/RESULT.md) are committed evidence.

Tested here on macOS 26.5.1 arm64 with Node.js 26.0.0 and Apple Git 2.50.1. The core requires Node.js 22.18+ and Git; other platforms are not claimed as tested. The current Reviewer prints the human-facing review inline and accepts a deterministic short review code; it does not invoke a pager or system clipboard. Guide, Reviewer, and Producer use the same bounded display grammar, and terminal control or bidirectional-override characters are removed from visible output without changing the evidence on disk. Ghostty is an optional macOS window-opening adapter, not a Koda-C requirement: manually opened terminal windows use the same disk relay and gates.

## Why it exists

Kristian developed this phase method while building products in C++, Swift, and Rust as a designer rather than a programmer: session prompt, brief, orient, plan, produce, live, summary, then push. The sequence grew from observing what stopped repeated rework. When he added an independent LLM reviewer, each phase became a manual relay between separate chats—better judgment, but an absurd amount of copy-paste.

Koda-C asks whether that practiced producer/reviewer relay can become mechanical while preserving the parts that create depth. Kristian directs software he cannot personally read. The expensive failures in his AI collaborations shared one shape: work advanced on confident prose. A summary claimed more than the files proved. Status came from conversational memory. Most sharply, a written review was delivered and then approved without being read.

That last incident created the receipt. Every review ends with a generated, unique `RECEIPT:` line. The core `approve` command accepts only that complete line. In the managed Reviewer window, the owner instead types the deterministic eight-character code displayed beneath that review; the controller resolves it to the current exact receipt before calling the same core command. Delivery and explicit acknowledgement become separate steps the files can distinguish.

This is evidence of engagement, not mind-reading. Someone can still copy a final line without understanding the review. But not-reading stops being a passive omission and becomes deliberate fraud: the approver must open the review to take its unique phrase. Koda-C creates an inspectable decision ritual and raises the floor against casual or accidental skipping; it does not claim to prove cognition.

## The mechanism

A session snapshots a configurable phase chain. The native chain is:

`brief → orient → plan → produce → live → summary`

For each phase:

1. A producer skill passes its entry check and writes the phase artifact.
2. The one shared `koda-c-review` skill verifies the artifact from a separate context and writes a verdict plus generated receipt.
3. The owner reads and acknowledges the review: either by quoting the exact receipt through the core `approve` command or by entering the bound short code in the managed Reviewer window.
4. `advance` re-reads disk and routes:
   - APPROVE / APPROVE WITH COMMENTS → activate the next phase from config;
   - REVISE / REJECT → remain in the same producer phase;
   - DISCUSS → remain in phase for an owner ruling and fresh review.

Advancement revalidates all earlier gates too. Deleting or changing old evidence makes later work refuse even when `state.json` names a current phase.

After the final phase advances, the first `session close` creates immutable `close.md`, bound to all durable session files and the final review receipt. Git commit and push happen next. A second `session close` writes nothing; it reports closed only if the bound files are unchanged, committed, clean, and present on the pushed upstream. Another session cannot open before pushed terminal proof exists: normal close or explicit halt.

Direction during a phase has exactly two verbs. **Wait** is the default: Koda writes the owner's exact words, source, time, frozen phase-entry hash, and observed artifact/review hashes immediately, but Producer receives the direction only through the next successful advancement record. The receiving artifact must cite its direction ID; early use refuses. **Halt** is the only interrupt: immutable `halt.md` voids the in-flight phase, must be committed and pushed, and forces later work through a new session and fresh Brief. There is no pause-inject-resume route.

## Try the refusal in about one minute

Requirements: Git and Node.js 22.18 or newer. The source is TypeScript; `prepack` emits dependency-free plain JavaScript under `dist/` so the installed CLI does not ask Node to type-strip code inside `node_modules`. The managed Codex relay uses current permission profiles (available in Codex CLI 0.138.0+ and tested here on 0.144.6); an unsupported client fails closed.

The core has no runtime dependencies, install hook, daemon, or network call. Its exact write and trust boundaries—including the model-launching relay scripts—are documented in [SECURITY.md](SECURITY.md).

Install and run the committed binary without rebuilding:

```bash
git clone https://github.com/freeborn-warrior/koda-codex.git
cd koda-codex
node dist/cli.js --help
```

The separately tested `npx --yes . --help` package path is preserved as a
[fresh public-checkout proof](package-runs/2026-07-18-fresh-checkout-npx-01/RESULT.md):
the first run exposed an executable-mode defect, and the corrected pushed checkout
prints help without changing any tracked or untracked file. It is not a prerequisite
for the primary demo, so npm cache health cannot obscure the gate.

Then follow the [one-minute fixture](DEMO.md#one-minute-mechanical-proof). Its money moment is:

```text
GATE CLOSED — BRIEF
✗ The current review receipt has not been quoted into the approval ledger.
Nothing advanced.
```

After the exact receipt is recorded, the same command reports `GATE OPEN — BRIEF`.

## CLI

Start with the [Quick Start](QUICKSTART.md). The complete syntax, intended caller,
write effects, and refusal consequences are in the [Command Manual](COMMAND-MANUAL.md).

```text
koda init [directory] [--demo]
koda guide open [--model <model>] [--effort <effort>] [--producer-model <model>] [--producer-effort <effort>] [--reviewer-model <model>] [--reviewer-effort <effort>]
koda guide status
koda guide confirm <prompt-file> --owner <name> [--kind <kind>] [--depends-on <session-id>] [--independent]
koda guide cancel <launch-id> --owner <name> --reason <text>
koda guide bind <launch-id> <session-id>
koda guide verify
koda guide launch --producer-model <model> --producer-effort <effort> --reviewer-model <model> --reviewer-effort <effort> [--open ghostty]
koda guide recover --open ghostty
koda session new <prompt-file> [--kind <kind>] [--depends-on <session-id>] [--independent]
koda status [--session <session-id>]
koda review new <phase> [--session <session-id>]
koda direction wait <owner-message-file> <classification-file> [--source owner-via-guide|owner-via-reviewer] [--session <session-id>]
koda approve <phase> [quoted-receipt] [--approver <name>] [--session <session-id>]
koda advance [--session <session-id>]
koda session halt [owner-direction-file] [--session <session-id>]
koda session close [--session <session-id>]
```

The CLI generates artifact hashes, review IDs, receipts, structured approval entries, advancement history, and immutable close metadata. All remain readable Markdown or JSON.

## Skills: the relay above the CLI

All skills live inside this repository under Codex's discoverable `.agents/skills/` path:

- `koda-c-session-prompt` is the sole Guide skill route toward a bounded session. It classifies the request from disk: dependent successors wait for pushed terminal evidence, explicit independent siblings may proceed, and a different kind label alone never proves independence.
- `koda-c-session` opens from an owner contract and prior pushed summary.
- `koda-c-brief`, `koda-c-orient`, `koda-c-plan`, `koda-c-produce`, `koda-c-live`, and `koda-c-summary` are producer relay legs.
- `koda-c-review` is the only formal reviewer skill; its per-phase criteria never drift into copies.
- `koda-c-close` performs the prepare → Git → verify ceremony outside the phase chain.

A [fresh ephemeral Codex startup proof](discovery-runs/2026-07-18-fresh-codex-startup-01/RESULT.md) discovered the original nine session-runtime skills and root project guidance without any tool call or repository read. The current [ten-skill startup proof](discovery-runs/2026-07-19-fresh-codex-startup-06/RESULT.md) independently includes the Guide-side session-prompter under the same zero-tool, zero-read rule. Its historical [active-session run](guide-preflight-runs/2026-07-19-sol-medium-01/RESULT.md) proves the original serialized path. After the owner broadened the product to explicit independent siblings, a newly sealed [plural-session Guide preflight](guide-preflight-runs/2026-07-19-sol-medium-05/RESULT.md) shows fresh Sol/medium refusing a conceptually dependent successor while keeping future-idea conversation open and changing no file.

Guide reconstructs the project from configured steering files and disk-backed session evidence. `$koda-c-session-prompt` is the only owner-facing start ceremony. `koda guide status` lists every active session with kind, phase, named terminal condition, external write claims, and exact runtime commands; it also verifies the installed toolkit contract from a repository-contained integrity manifest. The owner never carries commands, paths, hashes, commits, test counts, receipts, or evidence locations between contexts. A dependent successor creates no prompt until all named predecessors have pushed close or halt; an explicitly owner-classified independent sibling may be confirmed with `--independent`. Confirmation binds the owner's chosen display name along with kind, relationship, prompt, steering snapshot, dependency terminal hashes, and the verified toolkit snapshot. New runtimes carry that identity through status, owner-facing messages, and approval ledger entries; Koda does not substitute the toolkit author's name. Changed project or toolkit evidence makes the launch stale; cancellation is immutable pushed evidence. A project with a Guide manifest cannot open from an unconfirmed or mismatched prompt. `koda guide launch` binds one Producer/Reviewer pair to the confirmed launch under `.koda/runs/<launch-id>/`; several valid launch IDs may remain active together. The supervisor exports `KODA_SESSION_ID`, and every producer/reviewer skill and CLI mutation targets that ID. A four-process real-Git integration proves two independent session pairs can complete distinct receipts, pushed closes, and Guide returns without crossing artifacts or contexts. `koda work claim` reserves planned session outputs before mutation; `koda guide claim` reserves additional Guide paths. Before/post-work hashes, overlap and unclaimed-mutation refusal, exact staging, and the short Git lock let unrelated dirty work coexist without entering or blocking another session's commit. Immutable close rechecks every claimed output and stays shut if the recorded bytes are changed, uncommitted, or unpushed. The [Guide continuity protocol](GUIDE-CONTINUITY.md) documents the mechanics and limits.

`koda guide open` is the managed human entry to one persistent Guide context. It
reopens the same context ID from project-local state, ignores ambient user config
and command rules, disables network and approval escape, and gives the model
project read access plus writes only to `docs/guide`, configured continuity files,
and explicit Guide claims. Active session folders and Git metadata remain
read-only. Trusted numbered controller actions handle an eligible session recovery;
`1` recovers and `2` changes nothing, while a bare number refuses if several
sessions would make the target ambiguous. Normal text remains project-level Guide
conversation. Raw `codex -C ...` remains possible for experts, but it is not the
contained Koda entry and is not the recommended judge path.

Produce is one session kind beneath Guide, alongside Explore, Research, Architecture, Triage, and later kinds. The shipped core records explicit IDs, kinds, relationships, dependency hashes, aggregate active status, plural end-to-end relay binding, exact Guide/session write claims, post-work hashes, conflict refusal, exact-path commits, and a recoverable Git-operation lock. See the [concurrent project/session ruling](design-notes/2026-07-19-concurrent-project-work-owner-ruling.md) and [plural runtime proof](design-notes/2026-07-19-plural-session-runtimes.md).

Every producer skill has three hard sections: ENTRY CHECK, ITS OWN JOB, and HANDOVER OBLIGATION. It refuses when required disk evidence is absent, writes only its own artifact, then hands to the shared reviewer without self-reviewing or advancing.

A phase may pause for a disk-backed [in-phase consultation](IN-PHASE-CONSULTATION.md). The producer suggests reviewer authority for evidence/technical ambiguity or owner authority for product judgment, but every request goes to the reviewer. The reviewer answers or asks the owner in its owner-facing window, then relays the recorded response to the producer. After the owner's one deliberate session-start invocation, the producer never solicits the owner directly. Consultation creates no verdict or receipt; the persistent reviewer may later formally review because it did not author the artifact, and it discloses its prior advice.

Every reviewer → producer handback is an artifact before it is actionable: a consultation response, relayed owner ruling, formal review, or waiting-direction ID released by advancement. Conversation and notifications may draw attention to the file, but Producer never continues from chat text or memory. New direction stated in Guide or Reviewer conversation is recorded immediately and waits one boundary; it cannot revise the active phase. The [wait-or-halt ruling](design-notes/2026-07-19-wait-or-halt-owner-ruling.md) supersedes the historical same-phase owner-handback experiment.

The bounded session uses two visible persistent Codex tasks side by side. The Producer explicitly invokes the current phase skill and shows its available progress, but its conversational input is closed; the owner can watch or terminate it but cannot type into it. The separate owner-facing Reviewer carries consultations, explanations, rulings, and formal handoffs through the one `koda-c-review` skill. The owner discusses that active session there, while the enclosing Guide project conversation may continue separately. Neither session context is recreated at phase boundaries. See the [two-task walkthrough](DEMO.md#two-codex-task-collaboration).

The repository also contains a [persistent full-relay test harness](FULL-RELAY-RUN.md) that resumes two distinct Codex thread IDs across all six phases and pauses for Kristian's real receipt at every gate. Its [first genuine run](relay-runs/2026-07-18-software-clean-sol-medium-terra-medium-01/RESULT.md) completed with an unplanned Summary REVISE loop, seven owner acknowledgements, and a pushed immutable close. The same relay now has a separate real-project mode: a deterministic integration proves pushed Guide request → two processes → receipt gate → pushed close → interrupted return recovery → pushed Guide handback without removing the actual repository's `.git`. Real-signal tests also prove that Ctrl-C distrusts partial Producer and Reviewer output, returns Reviewer jobs to `PENDING`, recovers owner conversation, resumes the same context before routing, and refuses automatic replacement when identity is missing.

The first owner-observed three-context launch did create distinct persistent Sol Producer and Terra Reviewer contexts and reached formal Brief review, but it failed the human and security contract: unsafe Ghostty token handling opened extra tabs, rendered an ambient credential, and a post-halt race repeated the voided review. Kristian halted with zero acknowledgements and zero advanced phases. The [sanitized incident](security-runs/2026-07-19-ghostty-launch-integrity-incident/RESULT.md) is committed evidence, not hidden history. The dependent retry then opened exactly one clean Reviewer and one clean Producer beside Guide and reached another real approved Brief, but an ambiguous Return hid a second receipt step and exited both processes after an empty paste. The gate again stayed shut with zero acknowledgements. The [receipt UX incident](verification-runs/2026-07-19-markdown-headings-01/RECEIPT-UX-INCIDENT.md) is equally explicit failure evidence. Its first recovery restored the Reviewer but exposed a further interleaving: Producer tried to replace the already-open review handover and safely exited when the job guard refused. The [Producer recovery incident](verification-runs/2026-07-19-markdown-headings-01/PRODUCER-RECOVERY-INCIDENT.md) preserves that failure—and also records that Guide correctly discovered the paused session from disk before Kristian supplied any recovery wording. Producer now rejoins the exact existing handover. Both visible roles have process ownership, Guide reopens only missing roles, Reviewer readiness precedes Producer startup, and startup success waits for both roles' disk evidence. If both windows disappear, Guide restores Reviewer first and Producer second; a later genuinely missing role can recover again without permitting a blind duplicate. The same recovery now applies at every stable formal, repair, or fresh owner decision, binds the exact Reviewer job, and remains available after a failed window start. A later recovery refusal exposed terminal-specific bytes in otherwise valid saved launchers; Koda stayed open and moved no gate. The [launcher-context incident](verification-runs/2026-07-19-markdown-headings-01/LAUNCHER-CONTEXT-MISMATCH-INCIDENT.md) and strict migration repair are preserved too. A full regression then exposed partial publication of the old role-lock directory; role ownership now appears with complete bytes in one no-clobber operation while still reading the live Reviewer's legacy lock. The next human recovery reached the same Brief decision but proved that its pager-and-clipboard ceremony was still unusable: terminal-mode warnings, hidden pager controls, an overwritten clipboard, and Ghostty's paste-safety dialog left the owner unsure which layer was active. The gate refused and remained at zero acknowledgements. That second failure is preserved in the [owner review ceremony incident](verification-runs/2026-07-19-markdown-headings-01/OWNER-REVIEW-CEREMONY-INCIDENT-02.md). The replacement prints the human review inline, hides machine metadata, accepts a bound eight-character review code, never touches the clipboard, sanitizes hostile terminal controls from display, and gives Guide, Reviewer, and Producer one visually bounded terminal language. Pushed toolkit capability `owner-review-ceremony-v13` binds that ceremony. Kristian then recovered the same persistent contexts and completed Brief through Summary with six owner acknowledgements, pushed immutable close, and a durable Guide return. The completed run's last presentation findings—inspection-heavy progress and procedural Reviewer chat—were corrected without changing gate semantics; pushed capability `conversational-owner-surface-v14` binds the unchanged 234-check transcript. The complete [owner-observed result](verification-runs/2026-07-19-markdown-headings-01/RESULT.md) preserves the whole failure-to-pass history and its restorable Git bundle.

Kristian's historical two-window terminal proof remains in the [first-time Ghostty test guide](GHOSTTY-TEST-GUIDE.md). The current product target is a [three-context human experience](design-notes/2026-07-18-three-context-human-experience.md): ongoing project-level Guide, visible non-interactive Producer, and ongoing owner-facing session Reviewer. Guide and Reviewer both remain conversational at their distinct scopes; Producer does not.

Context separation is a tested operating protocol; `SKILL.md` alone is not a permission boundary. Koda-managed Producer and Reviewer commands run under a strict Codex profile: project read/write, read-only `.git`/`.agents`/`.codex`, denied project `.env`, no ordinary sibling or home-file reads, no network or web search, no login shell, no user config or ambient command rules, and no approval escape. Only the exact Codex/Koda executables and local Node toolchain are added read-only. The managed Guide uses the narrower claimed-write profile described above and receives only the exact integrity-manifest files needed to revalidate Koda. A [role boundary probe](security-runs/2026-07-19-project-boundary-probe-13/RESULT.md) and [persistent Guide boundary probe](security-runs/2026-07-19-secure-guide-console-boundary-14/RESULT.md) preserve their failed designs and final live passes. A manually started raw interactive Codex task still has whatever permissions its launcher selected; Koda does not mislabel that separate route as contained.

## Tests and evidence

```bash
npm test
npm run test:coverage
npm run dogfood
npm run relay:prepare -- software-clean gpt-5.6-sol medium gpt-5.6-terra medium
```

The suite deliberately breaks every gate condition and proves refusal: missing/empty artifacts, missing or malformed reviews, bad verdicts, missing/mismatched/reused receipts, altered artifacts, broken ledger proof, missing approver/comments, and every blocking verdict. It also executes recovery commands from the states that printed them and sends real process signals through the relay's interruption paths.

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

Koda-C stays a clean, headless plain-file engine. This competition entry is implemented in TypeScript and dependency-free JavaScript, but the intended production core is a compiled headless Rust engine; TypeScript is not the permanent core architecture. The first Guide continuity and confirmed-prompt mechanics now exist under the single `koda` executable. Explore, Research, Architecture, Triage, and Produce are confirmed sibling session kinds beneath Guide. Multiple active session records, non-conflicting shared-worktree changes, and several explicitly addressed Producer/Reviewer runtime pairs are supported. Kind-specific phase configs are not yet implemented. A read-only Librarian remains a possible Guide-side role. Interfaces are permanently separate clients: a native macOS app, dashboard, editor extension, terminal, mobile client, or bot may connect locally or remotely and consume a future machine-readable status and action boundary, but it never owns the process or becomes gate truth.

The next adoption layer is project adaptation. It should help create project-local guidance and relay skills from the owner's actual purpose, with writing and software as initial profiles, while preserving any existing project instructions and keeping all generated material inside that project. Profiles may rename Produce to Draft or earn a distinct Edit/Refine phase when it creates separate evidence; the native six phases are a reference chain, not a semantic costume. That bootstrap layer is not implemented in the current entry and must not be confused with the already working gate.

The mature runtime presents three visible persistent contexts: Guide holding an ongoing project conversation, Producer visibly working with owner input closed, and Reviewer holding the ongoing active-session conversation. All three use the same bounded panels, headings, and whitespace so one message has a visible beginning and end. Numbered choices appear only where owner input is accepted; Producer repeatedly says `NO ACTION NEEDED — watch only`. Producer announces frozen phase entry, artifact handover, revalidated gate passage, released directions, phase count, and the next phase or close ceremony. Default model progress names the active phase and collapses successful low-level commands into one check total while retaining complete diagnostic events on disk; failures remain visible. Reviewer prints the human-facing review inline, omits protected machine metadata, displays a bound eight-character review code beneath it, then presents numbered choices to acknowledge, discuss, reread, stop safely, or halt. A wrong code changes nothing and remains retryable. Ordinary Reviewer conversation leads with its direct final answer instead of streaming procedural file and command narration. The controller translates a correct current code to the exact complete receipt before the unchanged core gate runs; there is no pager, clipboard, or paste step. Free text is reserved for real Guide/Reviewer conversation, actual owner direction, review comments or rulings, and the short code. Guide derives visible role health from disk, opens Reviewer before Producer, restores one or both missing roles in that order, and never hands raw role commands to the owner. Ghostty may automate window opening on macOS, but it is a replaceable adapter; manual terminal start remains a valid route to the same roles. Ctrl-C is an operational stop: partial output is untrusted until same-context reconciliation and cannot change the frozen contract. Project-scope thoughts return to Guide. Neither Guide nor Reviewer may inject direction into the active phase; advancement is the only release. Owner-observed recovery and completion passed all six gates and pushed close; the remaining human question is subjective conversational tone, not gate correctness. See the [owner-observed result](verification-runs/2026-07-19-markdown-headings-01/RESULT.md), [owner review ceremony incident](verification-runs/2026-07-19-markdown-headings-01/OWNER-REVIEW-CEREMONY-INCIDENT-02.md), [Ghostty guide](GHOSTTY-TEST-GUIDE.md), [wait-or-halt ruling](design-notes/2026-07-19-wait-or-halt-owner-ruling.md), [three-context experience](design-notes/2026-07-18-three-context-human-experience.md), and [always-open Reviewer design](design-notes/2026-07-19-always-open-reviewer-conversation.md).

The current build record and deliberate extensions from the starting document are tracked in [PROJECT.md](PROJECT.md#drift-watch-against-the-starting-document).

The conservative current policy requires the named owner's acknowledgement at every gate. A later config setting may separate **gate acknowledgement** from **owner attention**: every review would still receive attributable receipt proof, while a `decisions_only` mode could stop the owner only for `DISCUSS` or an explicit owner-attention marker. That policy remains a documented owner decision, not behavior this release quietly assumes.

Model assignment is likewise treated as future project staffing, not hidden skill behavior. A role is a seat, a session kind or phase is an assignment, and model plus effort is the staff member. Because those seats already use isolated contexts and disk handoffs, the approach could potentially accommodate Codex CLI, Claude Code, or another compatible agent runtime in different seats later. That is an architectural possibility, not a provider-independence requirement or current capability; today's runner is Codex-only. The leading design resolves Guide, session-kind reviewer/defaults, and per-phase producer assignments centrally, snapshots them at launch, and uses sealed matrix results as evidence. Current Codex skill frontmatter does not select a model, and cross-model thread continuation still needs proof. See the [staffing and attention design](design-notes/2026-07-18-project-staffing-and-attention.md).

## License

Koda-C is licensed under the [GNU General Public License version 3](../LICENSE) (`GPL-3.0-only`).

Copyright (C) 2026 Kristian Bengtsson
