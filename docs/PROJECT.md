# Koda-C project working document

**Last updated:** 2026-07-20

## Product

Koda-C is a small, headless CLI over plain files. It prevents a project phase from advancing until a non-empty artifact, independent review, allowed verdict, unique review receipt, and an explicit owner acknowledgement bound to that exact receipt all agree on disk.

Koda-C is the workflow; the CLI is its current headless mechanical surface. The product is the movement of separate contexts, frozen inputs, artifacts, review, owner engagement, gates, session closure, and project continuity—not a wrapper around a model command. The core remains permanently interface-free: terminal, native macOS, browser, editor, and remote experiences are separate clients of its plain-file and command contract and never become the source of gate truth.

The discipline is domain-general: the produced thing may be code, prose, research, design, or another artifact. The CLI is the contract; interfaces and agent tasks sit above it.

The product originates in Kristian's repeated real workflow across C++, Swift, and Rust projects: session prompt → brief → orient → plan → produce → live → summary → push, with every phase handed to a separate reviewer chat. Koda-C automates and hardens that relay so phase depth survives without manual copy-paste.

Koda-C is a **meta-harness**, not a claim that one generic prompt set fits every project. Its disk gate, verdict routing, receipt proof, session state, and close ceremony are stable infrastructure. A project using it should carry its own purpose-adapted `AGENTS.md`, phase skills, artifact shapes, review criteria, evidence sources, and verification commands. Writing and software projects share the relay discipline while requiring materially different producer and reviewer behavior.

## Owner decisions currently in force

- The build itself uses Codex's normal engineering workflow; the phase discipline lives in the product, not the process that made it.
- All persistent outputs, skills, test evidence, transcripts, and project documents live inside this repository.
- Durable Codex guidance lives in root `AGENTS.md`; repository-local skills live in the discoverable `.agents/skills/` path.
- The initial Phase 01 build attempt and unused REVISE receipt remain only in pushed Git history, not in the live `docs/sessions/` namespace.
- Every gate condition receives a deliberate mutation test proving refusal.
- Reviewer experiments score the specific evidence-backed CATCH separately from the chosen VERDICT; operational recovery notes never inflate either score.
- Producer work and independent review are separate Codex tasks sharing one Koda session folder.
- One persistent producer context and one separate persistent reviewer context span the full session. Both are visible side by side; the named owner may watch but not type into the producer and speaks only with the reviewer. Phase boundaries never create a fresh reviewer.
- There is one producer skill per declared native phase and one shared reviewer skill with per-phase criteria.
- A producer hands its artifact to the reviewer. Only an allowed verdict, owner receipt, and `advance` activate the next phase from config.
- Normal session closure is an immutable artifact with Git between preparation and verification. Explicit halt is the only other terminal state. A dependent successor cannot open until its prerequisite has pushed close or halt; an independent sibling session kind may run concurrently.
- The current target keeps owner receipt acknowledgement at every gate. Exception-only owner attention is a distinct open policy decision and must not be introduced silently.
- Active-phase direction has only two owner-ruled transitions: wait by default or halt. Wait records immediately but enters Producer input only through the next successful gate; halt terminates the session attempt and requires pushed immutable halt evidence before a new session starts from a fresh Brief. Pause-inject-resume is forbidden.
- Explicit `$koda-c-session-prompt` use is the only owner-facing route from Guide conversation toward a bounded session. Its preflight judges declared dependencies: unresolved successors refuse, while explicitly classified independent sibling session kinds may launch. Exact Guide/session write claims and same-path conflict refusal are implemented and revalidated from disk.
- The competition entry is licensed under GPLv3 only, with `Copyright (C) 2026 Kristian Bengtsson` as the sole project copyright line.
- The product name remains **Koda-C**. The CLI command is `koda`; `koda-codex` is the lowercase repository and package slug for this Codex-built competition implementation.
- New reviewer fixtures are scored only by contracts committed before their first model run. The final model program stopped at its declared cap: two Luna baseline repeats and nine medium runs across the three new fixtures and models. All inference-chain cells passed, so no unique winner existed and the conditional low-effort confirmation was not run.
- Forward-only Koda-C self-hosting is deferred until after submission. The first complete Guide-launched owner test uses an isolated representative project, with every durable result archived in this repository and no retrofitted Koda state added to the root build.
- The owner is never an evidence courier between contexts. Guide discovers technical prerequisites from disk, reports a plain verified capability, and binds the toolkit integrity snapshot into the launch request. Only genuine intent or product judgment may remain an owner question.
- The core remains headless and interface-free by design. Every human interface is a replaceable local or remote client over the stable workflow contract; it may display state and submit requests, but the core revalidates every action and remains the sole mechanical authority.
- The TypeScript/Node.js engine is the current competition implementation, not the permanent production core. After submission, the intended implementation direction is a compiled headless Rust engine that preserves the plain-file evidence contract, deterministic gates, and separate-interface boundary.

## Lifecycle

```text
owner contract
  → session opens
  → current producer skill writes its artifact
  → koda-c-review independently verifies it
  → owner reads and acknowledges the unique receipt
  → gate routes:
      APPROVE / APPROVE WITH COMMENTS → next configured phase
      REVISE / REJECT                 → same producer phase
      DISCUSS                         → owner ruling, then fresh review
      waiting owner direction         → recorded now, released to receiving phase only
      explicit halt                   → void phase, push halt.md, return through fresh Brief
  → final declared phase advances
  → close.md is prepared
  → Git commit + push
  → close is verified
  → dependent successors may open; independent sibling sessions may already be active
```

## Context model

- A **Koda project** is the Guide-held parent context, dependency graph, steering documents, and Git history shared by many bounded sessions.
- A **Koda session** is one identified, typed, disk-backed child workstream under that project. Produce is one session kind; Explore, Research, Architecture, Triage, and later kinds may use different phase configs while retaining the same gate/receipt/close discipline.
- A **Codex task** is one agent context/window. The producer and reviewer should use separate tasks so the review does not inherit producer reasoning.
- Runtime continuity is session-scoped: the same producer task and the same reviewer task traverse every configured phase. Fresh reviewer tasks remain fixture/testing tools, not the intended owner session experience.
- Context handover happens through artifacts, cited evidence, reviews, receipts, and state—not through copied chat summaries.
- The named owner deliberately starts a session from Guide by invoking `koda-c-session-prompt`, reviewing the bounded draft, and explicitly confirming it. The trusted supervisor then starts the separate Reviewer and input-closed Producer; Producer invokes `koda-c-session` from the confirmed prompt without owner interaction. During the bounded session the owner discusses session work only with its Reviewer, and every actionable handback returns as a named disk artifact.
- A dependent session reads the pushed close/summary of every declared prerequisite and records deliberate carry-forward items. An independent sibling records why it does not depend on active sessions instead of inheriting an arbitrary "latest" session.

## Current implementation

- TypeScript source built during packaging into dependency-free plain JavaScript for Node.js 22.18+.
- Configurable phase chain snapshot into each session's `state.json`.
- Commands for init, session open/status/close, review generation, receipt approval, and advancement.
- Bound waiting-direction evidence, atomic gate release, required receiving-phase citation, and early-use refusal.
- Immutable pushed halt that voids the in-flight phase and requires a Guide-confirmed fresh Brief carrying the halt and waiting direction IDs.
- Artifact hashing, generated review metadata, unique receipts, structured Markdown approval entries, and verdict routing.
- Fail-closed checks for missing, empty, stale, malformed, duplicated, or mismatched evidence.
- Immutable close-artifact hashing plus Git-derived commit/push verification.
- Repository-local Koda-C skills: seven producer relay legs, one shared reviewer, and one close ceremony.
- A concise root `AGENTS.md` preserves repository rules without turning the build itself into a gated Koda session.
- A preserved historical fresh ephemeral Codex startup proves the original nine session-runtime skills and root guidance were injected before any tool call or repository read.
- A second fresh ephemeral startup proof covers the current ten-skill set, including `koda-c-session-prompt`, with zero tools or repository reads. A separate sealed Sol/medium task exercised that skill against an active Brief and refused before drafting without changing fixture bytes.
- A preserved full native-chain session and normalized transcript under `docs/dogfood/`.
- Five sealed reviewer fixtures: the original hard-number capability check and honest control, plus an inference-chain plant, an imperfect-but-correct temperament control, and a missing-evidence trap.
- A completed seventeen-run model ledger: six original comparable runs, two Luna baseline repetitions, and nine new-fixture medium runs. All sealed score cells passed; Sol was operationally most consistent, while Terra recovered from path errors and Luna more often needed gate repair or skipped safe checks.
- A resumable full-relay test harness prepares a project-specific software session, persists separate producer/reviewer Codex thread IDs, re-derives every step from Koda files, pauses for Kristian's genuine receipt, and preserves a restorable Git proof bundle. Its first genuine run completed all six phases with distinct persistent contexts, an unplanned Summary REVISE recovery, seven owner acknowledgements, and a pushed immutable close.
- In supervised close, the persistent producer prepares and later verifies immutable `close.md`, while the trusted relay supervisor performs the exact intervening session commit and push. This keeps `.git` protected from model sandboxes without moving closure authority out of Koda's disk checks.
- The historical owner reader reduced Window B to `npm run relay:review`. The first real two-window slice now uses `npm run relay:producer` and `npm run relay:reviewer`: Window A posts an atomic disk job and waits; Window B owns a single persistent reviewer context, automatically receives formal reviews and consultations, streams readable activity with receipts redacted, opens the complete review, and keeps exact owner receipt acknowledgement in that same window.
- The current owner ceremony no longer uses a pager or clipboard. Reviewer prints the
  human-facing review inline, omits machine-only metadata, and displays a
  deterministic eight-character code. A matching code resolves to the current
  complete receipt before the core gate runs; wrong or old codes change nothing.
  Guide, Reviewer, and Producer share one bounded terminal-panel language, and
  Producer explicitly marks every owner-free state as watch-only. The shared
  renderer strips terminal control and bidirectional-override characters from
  visible text while preserving the exact evidence bytes and hashes on disk.
  Pushed toolkit capability `owner-review-ceremony-v13` binds code commit
  `c1d55ea`, the unchanged 232/232 transcript, and every critical renderer and
  relay file. That pushed implementation enabled the later successful recovery.
- The reviewer-window lock prevents two Window B processes from claiming the same run. Unsafe job paths, ambiguous unfinished runs, wrong receipts, changed reviews, and missing persistent context identity all refuse with named disk state.
- Managed Producer and Reviewer model commands now use a strict Codex permission profile rather than broad-read `workspace-write`: active-project read/write, read-only Git/instructions/config, denied project `.env`, no sibling or ordinary home reads, no network/web search/login shell/user config/approval escape, and only the exact Koda/Codex executables plus Node toolchain added read-only. A live probe records two incomplete policies before the final five-condition pass. The separately started Guide remains governed by its own interactive Codex permissions and is not falsely claimed as contained by Koda.
- `npm run relay:status` is a read-only owner view derived from current run, session, job, reviewer state, and process lock files. It names Guide, Producer, Reviewer, and their owner-input scopes, then prints exactly one safe start/recovery action: Reviewer first, Producer only after Reviewer is alive. It refuses corrupt/ambiguous runs and offers stale-lock recovery only after the recorded reviewer process is no longer alive.
- `koda guide` now provides the first deterministic project-level continuity slice. A project manifest indexes its steering files; explicit owner confirmation binds their hashes, the exact session prompt, prior pushed session evidence, and the verified toolkit integrity snapshot. Unconfirmed, technically unverified, or stale prompts refuse, cancellation is immutable evidence, and successful session open records the launch-to-session binding.
- Guide status now serves as the session-prompter preflight: it lists every active session's ID, kind, phase, and terminal condition; distinguishes dependency-blocked successors from explicit independent siblings; and names a prepared launch that must bind or be cancelled before another confirmation.
- `koda guide launch` prepares one real-project runtime from that pushed binding. Ignored `.koda/runs/` holds recoverable rendezvous state; producer, reviewer, and status share one hardened path resolver; immutable close remains an ordinary pushed project commit; and tracked `docs/guide/runs/` plus `docs/guide/returns/` return the result to Guide without deleting or replacing the real repository's `.git` directory.
- A deterministic two-process integration proves active Produce sibling → owner-confirmed independent Explore prompt → exact session binding → separate context identities → Brief gate and owner receipt → pushed close → injected return-stage interruption → exact resume → pushed Guide return, while the Produce sibling remains untouched. A second four-process integration runs two independent Producer/Reviewer pairs to separate pushed closes and Guide returns in one project. Session and Guide write claims reserve exact paths, session claims bind before/after hashes, overlap and unclaimed mutation refuse, exact staging excludes unrelated dirt, and a short recoverable Git lock serializes the commit ceremony. Immutable close separately revalidates every claimed external output and refuses if its observed bytes were not committed and pushed. This was deterministic evidence before the later live-model run fulfilled the separate human proof.
- The macOS terminal adapter exposes explicit `--open ghostty`, preserves Guide as the existing conversation, records intent before GUI mutation, and refuses duplicate automatic opening after success or partial failure. After the first live adapter opened unsafe extra tabs, the repaired design gives Ghostty exactly one project-contained, mode-700 launcher token per role. A later real launch proved that token must be absolute because Ghostty's `/usr/bin/login` wrapper changes directory before execution; the Reviewer therefore failed before startup while Producer was correctly withheld. Both role commands are now absolute. Each launcher clears ambient state before the role process; every model child receives an allowlist that excludes credentials and parent context identity. Changed or linked launcher files refuse before GUI mutation.
- The bundled full-session prompt and its Guide launch are now one mechanically
  checked contract before any window opens. Explicit `Session kind`, `Launch
  relationship`, and `Dependencies` handover lines must agree with the launch
  request at confirmation and verification. Quick Start then executes the actual
  bundled first-session open and proves its `guide-launch.json` binding rather than
  treating a window request as sufficient end-to-end evidence.
  Toolkit capability `full-session-prompt-contract-v20` binds the complete local
  and unchanged post-push **246/246** suites; a fresh owner recording remains.
- The next owner recording exposed a deeper composition gap: Quick Start had
  tested the first session command and the restricted role profile separately,
  while the real Producer needed verified toolkit evidence through both at once.
  Quick Start now runs the exact first-session command through installed Codex in
  a disposable clone before `READY`; every live role automatically binds verified
  toolkit proof, native Git, and private project-run configuration. The first full
  regression honestly failed 16 checks and exposed two downstream consequences;
  the corrected local and unchanged post-push suites pass **250/250** under
  toolkit capability `integrated-role-preflight-v21`. A fresh independent review
  was blocked before start by the private-repository export boundary and is not
  represented as complete; fresh owner-visible proof also remains pending.
- The first owner-observed three-context launch created distinct persistent Sol Producer and Terra Reviewer contexts and reached formal Brief review, but it is pushed-halted failure evidence rather than a pass. The unsafe launch rendered an ambient credential, and a second race repeated a voided review after halt. Zero acknowledgements and zero phases advanced; the deterministic repair passes 181/181, while a fresh owner-observed Ghostty run remains owed.
- The first retry draft exposed a second human-experience defect before launch: Guide required Kristian to carry repository paths, commit IDs, test counts, and evidence references from the builder context. The toolkit now validates its release manifest itself, `guide status` reports one verified capability, the session-prompter forbids owner technical relays, and every new confirmation freezes that toolkit proof alongside project truth.
- The second owner-observed launch passed the repaired window/security boundary: one Reviewer and one Producer opened beside the existing Guide with no extra tabs or environment dump, and the distinct contexts reached an approved Brief. Its acknowledgement UX then failed when an ambiguous Return produced an empty receipt, correctly leaving zero ledger entries but exiting both role processes. The preserved run remains at Brief. Numbered, retryable owner decisions, stdin-only receipt/ruling transport, exact legacy recovery, and a two-choice Guide recovery surface pass a pushed 194-check transcript bound as toolkit capability `ghostty-owner-ceremony-v2`; real recovery and the remaining phases are still owed.
- The final mechanical pre-handoff audit expanded that proof to 197/197. It found
  and corrected fresh-model environment inheritance, absolute executable resolution
  under sanitization, concurrent Git-lock retirement, and disk-token traversal. A
  fresh Sol/medium Guide now also passes the sealed plural-session contract: future
  conversation stays open while a dependent start waits for pushed close or halt.
  Toolkit capability `ghostty-pre-handoff-v3` binds the pushed code and transcript;
  owner-observed recovery remains the only release blocker in this surface.
- The next owner observation exposed one more exact recovery interleaving: Reviewer
  reopened the Brief decision, but Producer tried to create a second acknowledgement
  job and exited when the identity guard refused it. No receipt or advancement
  occurred. Producer now rejoins the existing formal-review job; Guide can reopen
  only that missing role and waits for its disk readiness before reporting success.
  The expanded living suite passes 199/199; owner observation is still owed.
- The subsequent first-use audit extends process ownership to Producer as well as
  Reviewer. Initial launch is now mechanically ordered Reviewer first, Producer
  second, with bounded readiness at both steps; Guide derives the exact running or
  missing role from disk and offers numbered recovery without exposing raw commands.
  Review-reader, clipboard, and halt mistakes remain at the owner decision instead
  of terminating the role processes. Duplicate and linked role locks fail closed.
  Repair commits `153814a` and `9e2f8e4` pass pushed 204/204 transcripts; the current
  toolkit capability `ghostty-owner-surface-v6` also forbids raw recovery commands
  in low-level owner-visible refusal messages. Owner observation is still owed.
- A final pre-observation state-matrix audit found that the partial recovery still
  depended on Reviewer remaining alive. The shipped repair restores Reviewer
  first and Producer second when both disappeared, handles a Reviewer-only absence,
  and permits a genuinely missing role to recover again at the same owner handover
  while refusing live duplicates. Recovery attempts are preserved on disk. Repair
  commit `b9b63eb` passes a pushed 206/206 transcript and is bound as toolkit
  capability `ghostty-repeatable-recovery-v7`; owner observation remains.
- Recovery is now incident-independent at stable owner handovers. Any formal,
  repair, or fresh `AWAITING_OWNER` job is schema-validated and bound into recovery
  evidence; changed jobs refuse, missing roles restore in Reviewer-first order, and
  an exact window-readiness failure stays recoverable. Repair commit `93efd1a`
  passes an unchanged pushed 210/210 transcript under toolkit capability
  `ghostty-stable-handover-recovery-v8`. Ghostty remains an optional macOS adapter;
  manually opened terminals use the same core relay and gate.
- Managed Producer and Reviewer roles now bind the confirmed owner's validated
  display name instead of substituting the toolkit author, and run under a strict
  project-data permission profile with no ordinary sibling/home reads, external
  writes, network, web search, login shell, user config, or approval escape. Repair
  commit `74f9067` passes the unchanged pushed 216/216 transcript under toolkit
  capability `owner-bound-project-sandbox-v9`.
- The release Guide now has a managed `koda guide open` console instead of a raw
  interactive launch recipe. It resumes one disk-bound Codex context, strips
  ambient config/rules/credentials, disables network and approval escape, reads
  the project, and writes only the Guide directory, manifest continuity files,
  and explicit Guide claims. The trusted controller owns numeric recovery; the
  model cannot mutate active session paths or Git. A real low-effort Sol probe
  preserved a malformed patch, found and repaired real `exec resume` ordering,
  global-Git-config, and toolkit-capability defects, then passed the seven-part
  boundary and an end-to-end reopen of the same Guide context. Repair commit
  `01e8055` passes the unchanged pushed 229/229 transcript under toolkit capability
  `secure-persistent-guide-v10`.
- Guide startup now distinguishes ordinary project conversation from actual session
  intent. Koda computes status in its trusted controller, supplies it to the model
  as untrusted data, limits startup to named continuity and exact returned-session
  evidence, shows a 30-second heartbeat, and persists mode-600 raw events while the
  turn is active. Closed terminal input preserves the completed turn and same Guide
  context instead of surfacing a readline error. The corrected real Sol/medium
  startup returned to `guide>` in about 41 seconds after seven bounded checks;
  pushed toolkit capability `bounded-guide-startup-v15` binds the unchanged
  **238/238** post-push suite.
- The release now has one complete-session entry command rather than a command
  relay through outside chat. It prepares a new isolated project and local upstream,
  copies the project-local skill set, shows and confirms the exact session prompt,
  verifies the immutable launch, and opens a staffed Guide. Guide choice `1` invokes
  the trusted launcher; choice `2` leaves the launch untouched. Preparation uses an
  isolated Git environment, and an adversarial test proves ambient `GIT_DIR` and
  `GIT_INDEX_FILE` cannot redirect it. Toolkit capability
  `self-guided-full-session-v16` binds the **241/241** post-push suite. A fresh
  owner-observed run remains separate human evidence before submission.
- The first real use of that entry found a version-specific permission-profile
  serialization defect before the Guide model started. The first repair then made
  a second, documented mistake: `codex --version` did not instantiate the profile,
  so 242 green tests still missed quoted dotted keys that failed in Kristian's next
  Guide run. Koda now submits the exact Guide and role profiles to installed Codex
  CLI 0.144.6 through its offline `sandbox -P` execution path before creating a
  demo project. Both profiles deserialize and apply with exit 0; toolkit capability
  `codex-permission-instantiation-v18` binds the unchanged **244/244** post-push
  suite. The subsequent Ghostty login-resolution repair passes **245/245** locally
  and unchanged after push under `ghostty-absolute-role-command-v19`; a fresh
  owner-visible launch remains.
- A real secure-Guide recovery then proved that the saved role launcher still
  depended on the terminal which created it. Guide refused safely twice with zero
  gate movement. Role launchers now use deterministic presentation/environment
  bytes, and Koda migrates only the strictly parsed exact historical command shape
  after prevalidating both roles. Commit `461824b` passes the unchanged pushed
  230/230 transcript under toolkit capability `deterministic-role-launchers-v11`.
- A later full regression run exposed the old role-lock directory between its
  creation and owner-file write. Role ownership now publishes complete bytes at the
  public name in one no-clobber filesystem operation, while Guide still reads the
  legacy directory lock already held by the preserved Reviewer. Commit `e6890f4`
  passes the unchanged pushed 230/230 transcript under toolkit capability
  `atomic-role-ownership-v12`.
- Submission-readiness audit now starts from the same public surface a judge sees.
  Commit `eed2084` adds the root GitHub/npm landing page, makes the primary
  one-minute gate demo independent of npm cache health, corrects stale public
  totals, and passes a fresh unauthenticated clone through help, refusal, exact
  receipt, advancement, real tarball install, security/license/judge checks, and
  clean-checkout verification. No active verification-session state was touched.
- Window B keeps a real `reviewer> ` prompt open between producer handoffs. An owner message resumes the same persistent Reviewer in `owner conversation` mode; a project-level thought is redirected to Guide, ordinary explanation is non-mutating, and actionable direction is written immediately as bound waiting evidence without entering the current phase.
- At a formal decision point, Window B resumes the same reviewer context in `owner explanation` mode and presents numbered choices to acknowledge, ask, reread, stop safely, or halt. New direction waits for the next gate and does not rewrite reviewed work. Halt requires an explicit `HALT` confirmation before it prepares, commits, pushes, and verifies immutable evidence. A wrong or empty receipt stays at the same decision point with zero ledger mutation; no receipt or current-phase advancement is allowed to count.
- Window A and Window B now open with permanent role and owner-input labels. Window A announces frozen phase entry, disk-derived artifact handover, revalidated gate passage, released direction IDs, phase count, and the next phase or close ceremony. Window B names phase position and the exact owner choices. These are exposed facts, never hidden model reasoning.
- The owner-observed recovery is complete. Launch
  `6371ade2-3002-42aa-87ab-a613220b7eab` resumed the same persistent Sol Producer
  and Terra Reviewer, completed Brief through Summary with six owner
  acknowledgements, pushed immutable close `b5105da`, returned the archived run to
  Guide at `bde0807`, and left the verification repository clean and synchronized
  with `origin/main`. The complete restorable evidence is preserved under
  `docs/verification-runs/2026-07-19-markdown-headings-01/`. The run validated the
  mechanics and exposed two presentation issues: default event output was too
  inspection-heavy, and owner conversation with Reviewer was too procedural. The
  correction keeps detailed events on disk, collapses successful checks into
  one phase-aware total, keeps failures visible, and presents only the Reviewer's
  direct final answer during ordinary owner conversation. The unchanged pushed
  suite passes **234/234** without changing gate semantics; toolkit capability
  `conversational-owner-surface-v14` binds the transcript, shared Reviewer skill,
  and changed renderers.
- Ctrl-C is now a fail-closed operational stop, distinct from workflow-level halt. The supervisor terminates the active model child, saves partial events, marks possible handbacks untrusted, and resumes the same persistent context for a skill-backed reconciliation before routing. Reviewer jobs return to `PENDING`; interrupted owner conversation preserves the exact owner message; missing context identity refuses automatic worker replacement.
- A disk-backed in-phase consultation protocol lets producer skills suggest reviewer versus owner authority while sending every request to the reviewer. Reviewer advice may escalate to Kristian in the reviewer window but cannot impersonate a product ruling or become a formal phase verdict.
- The competition repository contains the domain-general gate and a reference Koda-C skill set. It does not yet generate or adapt project-local guidance for a new writing or coding project.

## Build evidence

- [Original owner contract and build-approach ruling](origin/2026-07-18-owner-contract.md)
- [Owner process origin](origin/2026-07-18-owner-process-origin.md)
- [Testing ledger](TESTING.md)
- [Visible backlog](BACKLOG.md)
- [Dated builder assessment](design-notes/2026-07-18-builder-assessment.md)
- [Codex skill-platform implications](design-notes/2026-07-18-codex-skill-platform.md)
- [Owner-facing session runtime](design-notes/2026-07-18-owner-facing-session-runtime.md)
- [First implemented two-window runtime slice](design-notes/2026-07-18-first-two-window-runtime-slice.md)
- [Long-lived guide context research](design-notes/2026-07-18-long-lived-guide-context.md)
- [Guide-to-session prompt thesis](design-notes/2026-07-18-guide-to-session-thesis.md)
- [Guide continuity protocol](GUIDE-CONTINUITY.md)
- [Current working plan](WORKING-PLAN.md)
- [Project-level Guide and session kinds](design-notes/2026-07-18-project-level-session-kinds.md)
- [Project staffing and owner-attention design](design-notes/2026-07-18-project-staffing-and-attention.md)
- [Three-context human experience](design-notes/2026-07-18-three-context-human-experience.md)
- [Guide-launched real-project runtime](design-notes/2026-07-18-guide-real-project-runtime.md)
- [Guide real-project runtime development failures](test-results/2026-07-18-guide-runtime-development-failures.md)
- [Receipt acknowledgement UX incident](verification-runs/2026-07-19-markdown-headings-01/RECEIPT-UX-INCIDENT.md)
- [Pager and clipboard owner-ceremony incident](verification-runs/2026-07-19-markdown-headings-01/OWNER-REVIEW-CEREMONY-INCIDENT-02.md)
- [First-use UX audit](quality-runs/2026-07-19-first-use-ux-audit-02/RESULT.md)
- [Final pre-handoff first-use UX audit](quality-runs/2026-07-19-first-use-ux-audit-03/RESULT.md)
- [Partial recovery first-use UX audit](quality-runs/2026-07-19-partial-recovery-ux-audit-04/RESULT.md)
- [Owner ceremony development failures](test-results/2026-07-19-owner-ceremony-development-failures.md)
- [Owner ceremony security audit](security-runs/2026-07-19-owner-ceremony-recovery-audit-07/RESULT.md)
- [Final pre-handoff security audit](security-runs/2026-07-19-pre-handoff-audit-08/RESULT.md)
- [Partial recovery security audit](security-runs/2026-07-19-partial-recovery-audit-09/RESULT.md)
- [Visible-role security audit](security-runs/2026-07-19-role-liveness-audit-10/RESULT.md)
- [One-key first-use UX audit](quality-runs/2026-07-19-first-use-ux-audit-05/RESULT.md)
- [First-use recovery development record](test-results/2026-07-19-first-use-recovery-polish-development-failures.md)
- [Pushed 204-check first-use recovery proof](test-results/2026-07-19-first-use-recovery-polish-pushed.md)
- [Repeatable-recovery first-use UX audit](quality-runs/2026-07-19-repeatable-recovery-ux-audit-06/RESULT.md)
- [Repeatable-recovery security audit](security-runs/2026-07-19-repeatable-recovery-audit-11/RESULT.md)
- [Stable-handover first-use UX audit](quality-runs/2026-07-19-stable-handover-recovery-ux-audit-07/RESULT.md)
- [Stable-handover security audit](security-runs/2026-07-19-stable-handover-recovery-audit-12/RESULT.md)
- [Pushed 210-check stable-handover proof](test-results/2026-07-19-stable-handover-recovery-pushed.md)
- [Pushed 216-check owner-bound project-sandbox proof](test-results/2026-07-19-owner-bound-project-sandbox-pushed.md)
- [Pushed 229-check secure persistent Guide proof](test-results/2026-07-19-secure-guide-console-pushed.md)
- [Pushed 230-check deterministic launcher proof](test-results/2026-07-19-deterministic-launcher-migration-pushed.md)
- [Pushed 230-check atomic role-ownership proof](test-results/2026-07-19-atomic-role-locks-pushed.md)
- [Pushed 232-check owner review ceremony proof](test-results/2026-07-20-owner-review-ceremony-pushed.md)
- [Pushed 234-check conversational owner-surface proof](test-results/2026-07-20-conversational-reviewer-pushed.md)
- [Conversational owner-surface quality audit](quality-runs/2026-07-20-conversational-owner-surface-11/RESULT.md)
- [Conversational owner-surface security audit](security-runs/2026-07-20-conversational-owner-surface-audit-17/RESULT.md)
- [Bounded Guide startup quality audit](quality-runs/2026-07-20-bounded-guide-startup-12/RESULT.md)
- [Bounded Guide startup security audit](security-runs/2026-07-20-bounded-guide-startup-audit-18/RESULT.md)
- [Bounded Guide startup committed-code 238-check proof](test-results/2026-07-20-bounded-guide-startup-committed.md)
- [Bounded Guide startup post-push 238-check proof](test-results/2026-07-20-bounded-guide-startup-pushed.md)
- [Bounded Guide startup final release 238-check proof](test-results/2026-07-20-bounded-guide-startup-release.md)
- [Secure persistent Guide security audit](security-runs/2026-07-19-secure-guide-console-boundary-14/RESULT.md)
- [Secure persistent Guide UX audit](quality-runs/2026-07-19-secure-guide-console-ux-audit-08/RESULT.md)
- [Pushed 204-check owner-surface proof](test-results/2026-07-19-owner-surface-pushed.md)
- [Ghostty launcher development failures](test-results/2026-07-18-ghostty-launcher-development-failures.md)
- [Ghostty launcher 132-check result](test-results/2026-07-18-ghostty-launcher-final.md)
- [Ghostty launcher post-push 132-check result](test-results/2026-07-18-ghostty-launcher-pushed-final.md)
- [Always-open Reviewer conversation design](design-notes/2026-07-19-always-open-reviewer-conversation.md)
- [Wait-or-halt owner ruling](design-notes/2026-07-19-wait-or-halt-owner-ruling.md)
- [Wait-or-halt development failures](test-results/2026-07-19-wait-or-halt-development-failures.md)
- [Wait-or-halt post-push 146-check result](test-results/2026-07-19-wait-or-halt-pushed-final.md)
- [CLI ceremony development failures](test-results/2026-07-19-cli-ceremony-development-failures.md)
- [CLI ceremony 147-check result](test-results/2026-07-19-cli-ceremony-final.md)
- [CLI ceremony post-push 147-check result](test-results/2026-07-19-cli-ceremony-pushed-final.md)
- [Guide session-intent preflight ruling](design-notes/2026-07-19-guide-session-intent-preflight.md)
- [Guide session-intent preflight development failures](test-results/2026-07-19-guide-session-intent-preflight-development-failures.md)
- [Guide session-intent preflight 151-check result](test-results/2026-07-19-guide-session-intent-preflight-final.md)
- [Fresh ten-skill startup discovery](discovery-runs/2026-07-19-fresh-codex-startup-02/RESULT.md)
- [Fresh active-session Guide refusal](guide-preflight-runs/2026-07-19-sol-medium-01/RESULT.md)
- [Fresh Guide preflight 152-check result](test-results/2026-07-19-guide-preflight-fresh-model-final.md)
- [Fresh Guide preflight post-push 152-check result](test-results/2026-07-19-guide-preflight-fresh-model-pushed-final.md)
- [Process interruption recovery design](design-notes/2026-07-19-interruption-recovery.md)
- [Concurrent project work and Git provenance ruling](design-notes/2026-07-19-concurrent-project-work-owner-ruling.md)
- [Concurrent project/session ruling 157-check regression](test-results/2026-07-19-concurrent-session-ruling-final.md)
- [Interruption recovery development failures](test-results/2026-07-19-interruption-recovery-development-failures.md)
- [Interruption recovery complete-suite result](test-results/2026-07-19-interruption-recovery-final.md)
- [Interruption recovery post-push 156-check result](test-results/2026-07-19-interruption-recovery-pushed-final.md)
- [Whole-product 157-check coverage result](test-results/2026-07-19-whole-product-audit-final.md)
- [Whole-product post-push 157-check result](test-results/2026-07-19-whole-product-audit-pushed-final.md)
- [Whole-product audit development failure](test-results/2026-07-19-whole-product-audit-development-failures.md)
- [Concurrent write-set development failures](test-results/2026-07-19-concurrent-write-sets-development-failures.md)
- [Concurrent write-set 174-check result](test-results/2026-07-19-concurrent-write-sets-final.md)
- [Concurrent write-set post-push 174-check result](test-results/2026-07-19-concurrent-write-sets-pushed-final.md)
- [Concurrent mutation security audit](security-runs/2026-07-19-concurrent-mutation-audit-03/RESULT.md)
- [Plural session runtime design](design-notes/2026-07-19-plural-session-runtimes.md)
- [Plural runtime development failures](test-results/2026-07-19-plural-runtime-development-failures.md)
- [Plural runtime 177-check result](test-results/2026-07-19-plural-runtime-final.md)
- [Plural runtime post-push 177-check result](test-results/2026-07-19-plural-runtime-pushed-final.md)
- [Plural runtime security audit](security-runs/2026-07-19-plural-runtime-audit-04/RESULT.md)
- [First Guide live-test target and entry-check result](design-notes/2026-07-19-first-guide-live-test-target.md)
- [Pre-submission verification owner ruling](design-notes/2026-07-19-pre-submission-verification-ruling.md)
- [Prepared three-window verification contract](verification-runs/2026-07-19-markdown-headings-01/CONTRACT.md)
- [Exact unconfirmed verification session prompt](verification-runs/2026-07-19-markdown-headings-01/SESSION-PROMPT-DRAFT.md)
- [Current three-window verification result](verification-runs/2026-07-19-markdown-headings-01/RESULT.md)
- [Sanitized Ghostty launch integrity incident](security-runs/2026-07-19-ghostty-launch-integrity-incident/RESULT.md)
- [Ghostty repair and whole-product delta security audit](security-runs/2026-07-19-ghostty-repair-audit-05/RESULT.md)
- [Ghostty integrity repair 181-check result](test-results/2026-07-19-ghostty-integrity-repair-complete.md)
- [Ghostty integrity repair ready-to-push 181-check result](test-results/2026-07-19-ghostty-integrity-repair-ready-to-push.md)
- [Ghostty integrity repair post-push 181-check result](test-results/2026-07-19-ghostty-integrity-repair-pushed-final.md)
- [First prompt-confirmation mismatch and pushed cancellation](verification-runs/2026-07-19-markdown-headings-01/CONFIRMATION-ATTEMPT-01.md)
- [Corrected prompt confirmation and verified pushed launch](verification-runs/2026-07-19-markdown-headings-01/CONFIRMATION-ATTEMPT-02.md)
- [One-action owner steps for the current three-window run](verification-runs/2026-07-19-markdown-headings-01/OWNER-STEPS.md)
- [Three-window project preparation 179-check result](test-results/2026-07-19-three-window-project-preparation-final.md)
- [First Guide live-test preflight 177-check result](test-results/2026-07-19-live-test-preflight-docs-final.md)
- [Pre-submission concurrency development failures](test-results/2026-07-19-pre-submission-concurrency-development-failures.md)
- [Pre-submission concurrency repair 179-check result](test-results/2026-07-19-pre-submission-concurrency-repairs-final.md)
- [Pre-submission concurrency repair post-push 179-check result](test-results/2026-07-19-pre-submission-concurrency-repairs-pushed-final.md)
- [Whole-product quality audit](quality-runs/2026-07-19-whole-product-01/RESULT.md)
- [Always-open Reviewer development failures](test-results/2026-07-18-reviewer-open-conversation-development-failures.md)
- [Always-open Reviewer 135-check result](test-results/2026-07-19-reviewer-open-conversation-final.md)
- [Always-open Reviewer post-push 135-check result](test-results/2026-07-19-reviewer-open-conversation-pushed-final.md)
- [Persistent Reviewer context and Guide-scope 136-check result](test-results/2026-07-19-reviewer-context-scope-final.md)
- [Guide continuity development failures](test-results/2026-07-18-guide-continuity-development-failures.md)
- [Guide continuity 123-check result](test-results/2026-07-18-guide-continuity-security-final.md)
- [Guide continuity documentation-final result](test-results/2026-07-18-guide-continuity-docs-final.md)
- [Session-local Guide binding 124-check result](test-results/2026-07-18-guide-session-binding-final.md)
- [Session-local Guide binding documentation-final result](test-results/2026-07-18-guide-session-binding-docs-final.md)
- [Guide generated-build hygiene 124-check result](test-results/2026-07-18-guide-build-hygiene-final.md)
- [Guide real-project runtime 129-check result](test-results/2026-07-18-guide-real-project-runtime-final.md)
- [Guide real-project runtime security-final 130-check result](test-results/2026-07-18-guide-real-project-runtime-security-final.md)
- [Guide real-project runtime post-push 130-check result](test-results/2026-07-18-guide-real-project-runtime-pushed-final.md)
- [Completed genuine six-phase relay](relay-runs/2026-07-18-software-clean-sol-medium-terra-medium-01/RESULT.md)
- [Completed reviewer model and effort matrix](MODEL-TEST-MATRIX.md)
- [Owner-readable bounded reviewer program report](test-results/2026-07-18-bounded-reviewer-model-program.md)
- [Fresh Codex startup discovery proof](discovery-runs/2026-07-18-fresh-codex-startup-01/RESULT.md)
- [Fresh public-checkout local npx proof](package-runs/2026-07-18-fresh-checkout-npx-01/RESULT.md)
- [Safety and threat boundaries](SECURITY.md)
- [Secure persistent Guide design](design-notes/2026-07-19-secure-guide-console.md)
- [Secure persistent Guide boundary result](security-runs/2026-07-19-secure-guide-console-boundary-14/RESULT.md)
- [Dated local safety audit](security-runs/2026-07-18-local-audit-01/RESULT.md)
- [Whole-product security audit](security-runs/2026-07-19-whole-product-audit-02/RESULT.md)
- [Under-three-minute recording script](VIDEO-SCRIPT.md)
- [Live-rules submission checklist](SUBMISSION-CHECKLIST.md)
- Git history on `main` contains honest pushed milestones.

## Drift watch against the starting document

- **Owner-approved replacement:** Section 7's instruction to phase-gate the build itself was replaced. The product remains fully gated; its construction does not.
- **Owner-approved extension:** The minimum one reviewer skill expanded to seven producer relay skills, one shared reviewer, and one close ceremony skill.
- **Owner-approved extension:** `close.md` makes the original committed-and-pushed closure rule immutable and independently checkable.
- **Owner-approved extension:** New sessions deliberately cite prior pushed closure and summary carry-forward; phase artifacts record owner/adviser input resolved mid-phase.
- **Owner-approved extension:** Mid-phase input now has an explicit request/response artifact. The producer sends everything to the reviewer; reviewer authority covers evidence and technical questions, while owner authority is obtained through the reviewer window. The persistent reviewer may later formally review because it did not author the artifact and must disclose its consultation.
- **Owner-approved runtime ruling:** The bounded session is two visible persistent contexts side by side. Producer output is observable but its input is closed; only the full-session Reviewer is conversational about that session. Independent review means separation from producer context, not a new reviewer at every phase. The enclosing Guide remains a separate ongoing project conversation before, during, and after the session.
- **Owner-approved guide direction:** A long-lived Guide hosts a distinct `koda-c-session-prompt` skill. Only an explicitly confirmed, hashed prompt may ask the supervisor to launch the separate producer/reviewer session; pushed Summary and close evidence return to the Guide afterward.
- **Owner-approved project-level clarification:** The Guide is the path-maker above many bounded sessions. Its project document, backlog, working plan, decisions, and risks evolve on disk after closed sessions and during between-session discussion. Explore, Research, Architecture, Triage, and Produce are candidate bounded session kinds; a Guide-side Librarian may later provide read-only cited recall without becoming another authority.
- **Owner-approved staffing direction:** Roles are persistent seats, session kinds and phases are assignments, and model plus effort is the staff placed into each assignment. Future config may assign Guide, session-kind reviewer, default producer, and per-phase producer independently; resolved staffing must be snapshotted at launch and supported by sealed model-matrix evidence. Skill frontmatter describes work but does not become the authoritative org chart.
- **Owner-observed provider possibility:** Separate contexts and disk contracts may let a future adapter place Codex CLI, Claude Code, or another compatible agent runtime independently into Producer or Reviewer seats without changing the gates. This is architectural leverage, not an owner requirement or roadmap commitment. The current runner remains honestly Codex-only.
- **Owner-approved core direction:** The current TypeScript/Node.js competition implementation will not remain the long-term engine. Koda-C will move toward a compiled headless Rust core; ordinary evidence may remain plain files on disk, but the core implementation itself is not intended to remain TypeScript.
- **Owner-approved interface boundary:** The Rust Koda-C core remains interfaceless. Native macOS, terminal, web, editor, mobile, or remote interfaces stay separate and replaceable; they consume status and submit actions through a bounded contract while disk-backed gate truth remains in the core.
- **Owner-approved attention direction:** A future delegated policy may allow routine sessions to flow under Guide/reviewer acknowledgement, while any phase may emit a monotonic `OWNER_ATTENTION_REQUIRED` artifact. An agent may request stricter attention but may never waive attention required by config. The current target remains owner-at-every-gate.
- **Owner-approved experience direction:** The finished terminal product is one visible, ongoing Guide project conversation enclosing a visible non-interactive Producer and a visible owner-facing session Reviewer. Guide and Reviewer both remain conversational, but at different scopes; Producer never accepts owner input after start. Guide discussion cannot silently alter the confirmed active-session snapshot and needs an explicit disk-backed transfer into Reviewer to affect it. Historical two-window runs remain valid evidence, not the finished UX target.
- **Owner-approved transfer ruling:** Direction from owner-facing Guide or Reviewer conversation is written immediately but waits for the next gate; phase inputs stay frozen from entry through review. The only interrupt is an explicit halt that voids the in-flight phase and returns through a fresh Brief after immutable pushed halt evidence. Pause-inject-resume must never be built.
- **Superseded global session-intent ruling:** The first implementation made `koda-c-session-prompt` refuse every new session while one was active. Its provenance principle remains—dependent work cannot bypass pushed terminal evidence—but its global serialization is replaced by the project/session-kind ruling below.
- **Owner-approved concurrent project/session ruling:** An active Produce session does not lock the whole project. Guide and unrelated project work may continue changing tracked files, and independent Explore, Research, Architecture, Triage, Produce, or later session kinds may run as sibling bounded sessions. Each session has explicit identity, dependencies, contexts, gates, write set, and runtime pair. Dependent successors wait for pushed close/halt; independent siblings may launch. Session commits use exact attributable paths and a short Git-operation lock; the former broad `git add -A` staging was removed. Runtime status enumerates exact launch IDs, and two live pairs are deterministically proved in one project.
- **Project-profile clarification:** Draft, Edit, and Refine are valid profile vocabulary when they create distinct artifacts and review moments. They do not alter the native reference chain merely by renaming unfinished Produce work.
- **Transparency extension:** `PROJECT.md` and `BACKLOG.md` expose work that would otherwise live only in Codex's internal plan.
- **Codex-native packaging correction:** Skills first existed under top-level `skills/`; official discovery requires `.agents/skills/`. They were moved without duplication, and root `AGENTS.md` now holds durable repository guidance.
- **State-namespace correction:** The abandoned build attempt was removed from `docs/sessions/` after its meaningful owner contract and design note were moved to `docs/origin/` and `docs/design-notes/`. Git history retains the discarded brief and review without exposing them as live session state.
- **Owner-approved test expansion:** Receipt-adversarial, stale-review, status-truth, and bounded reviewer-fixture classes make the tests part of the product contract. The first model-assisted baseline stayed limited to one planted defect and one honest control until the core target was secure.
- **Owner-approved fixture refinement:** The original 2/2 medium tie is treated as a fixture-floor result, not model equality. Three bounded fixtures deepen inference, temperament, and evidence-absence testing; CATCH and VERDICT are scored independently, with limited repetitions used only to expose decision-relevant variance.
- **Platform boundary clarified:** Skill descriptions are a bounded discovery surface, not a tool-permission boundary. Koda-C tests fresh-task independence but claims mechanical enforcement only for its disk evidence and gate.
- **Boundary preserved:** A reviewer handoff is mechanically required and may run in a separate Codex task, but the CLI does not launch agents or run a daemon.
- **No change:** Sections 3–6 remain the product contract: file truth, configurable phases, independent review, verdict routing, unique receipt proof, fail-closed gates, mutation tests, and pasteable recovery actions.

Any future contradiction—not merely an extension—requires Kristian's explicit ruling before implementation.

## Roadmap vocabulary

Explore, Research, Architecture, Triage, and Produce are confirmed sibling session kinds beneath the project Guide; Librarian remains a possible read-only Guide-side role. Core state, Guide confirmation, relay routing, and skills use explicit session identity and dependencies. Exact work claims, atomic session allocation, plural runtime discovery, and the Git lock permit non-conflicting shared-worktree mutation by several Producer/Reviewer pairs. The shared gate, receipt, close, and reviewer invariants remain the base beneath kind-specific phase and review criteria.

Self-hosting Koda-C development remains an optional later validation, not the current goal. The current goal is to make the two-context producer/reviewer/owner relay strong across every phase and prove that relay in genuinely fresh tasks.

The later adoption layer must turn an owner's project purpose into project-local operating material without weakening the invariant gate. Likely starting profiles are writing and software, but a profile is only a starting point: the resulting `AGENTS.md`, producer artifacts, live checks, and shared-reviewer criteria must be adapted to the actual project and remain in that project's repository. The exact bootstrap command and authoring ceremony are not yet settled.

Between sessions, the owner-facing Guide is the path-maker whose continuity is reconstructed from a project-specific manifest, steering files, prior pushed close, carry-forward artifact, and selectively cited history rather than trusted to chat memory alone. The repository-local `koda-c-session-prompt` skill drafts one bounded prompt with Kristian. `koda guide confirm` binds the exact prompt and project snapshot; `koda session new` refuses an unconfirmed or stale Guide prompt and binds a verified request to the resulting session. The Guide remains separate from the launched producer and reviewer contexts and resumes from their pushed evidence.

The current runtime removes the earlier multi-command terminal start. After
`koda-c-session-prompt` records explicit owner confirmation in the managed Guide,
the trusted controller revalidates the pushed handoff and can arrange one
input-closed Producer plus one owner-facing Reviewer beside Guide through the
optional Ghostty adapter. Prompt confirmation, real-project preparation,
separate-context execution, recovery, six-phase owner acknowledgement, pushed
close, and Guide return have now completed in one owner-observed run. Other terminal
adapters and a future graphical interface remain later layers over the same workflow.

## Open owner decision

The current core demonstrates owner acknowledgement at every phase because that is the clearest answer to the original unread-review failure. The desired mature workflow may instead interrupt Kristian only for `DISCUSS`, genuine product choices, and material risk while a guide/orchestrator acknowledges routine allowed reviews.

The leading design is a config-level owner-attention policy, separate from receipt enforcement:

- `every_gate` keeps the current conservative behavior;
- a future `decisions_only` policy still requires attributable receipt acknowledgement at every gate, but permits an authorized receiving context to acknowledge routine reviews and stops for Kristian on `DISCUSS` or an explicit `owner_attention_required` marker.

Before implementing the second policy, define which role may acknowledge routine reviews, how that role is authenticated in the file record, and who may set the attention marker. Preserve the same disk gate and never represent automated acknowledgement as owner reading.
