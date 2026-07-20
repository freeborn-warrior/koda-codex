# Koda-C terminal testing in Ghostty

Ghostty is the optional macOS window-opening adapter used for this human test, not a
Koda-C requirement. The gate, disk relay, and separate contexts also work when a
user opens terminal windows manually. This guide focuses on Ghostty because the
competition demonstration uses it and because its convenience path must be safe;
other terminal applications are not excluded by the workflow.

## Current status — clean retry preserved at its Brief decision

This is the route Kristian will use. It is written for someone who should not
need to understand shell state, environment variables, run directories, or
process locks.

The first live attempt is pushed-halted security evidence. A dependent retry then
opened exactly one Reviewer and one Producer beside the persistent Guide and reached
an approved Brief without extra tabs or environment output. Its ambiguous
acknowledgement prompt caused an empty receipt and exited both role processes. The
gate stayed shut: zero ledger entries and zero advanced phases.

Session `2026-07-19-02` remains safely recoverable with the same review and context
identities. Do not create another session or manually start either role. The pushed
229-check capability `secure-persistent-guide-v10` covers the exact recovery
shapes that the live attempt exposed:

- if Reviewer is still running, Koda opens only the missing Producer;
- if Reviewer also disappeared, Koda restores Reviewer first and opens Producer only
  after Reviewer reaches the saved owner decision;
- if either readiness check fails, the later role stays closed and Guide names the
  unchanged pause, and the same Guide recovery choice remains available; and
- if a restored role later disappears from the same owner handover, the same
  disk-bound recovery remains available instead of becoming a one-shot dead end.

The first secure-Guide recovery then exposed that legacy launcher bytes still
captured the terminal which created them. Koda refused safely and left Guide open.
The repair uses deterministic launcher bytes and migrates an older file only after
validating its complete generated structure and exact role command; arbitrary or
changed launchers remain refusals. See the
[launcher-context incident](verification-runs/2026-07-19-markdown-headings-01/LAUNCHER-CONTEXT-MISMATCH-INCIDENT.md).

The same mechanism applies at every stable formal, repair, or fresh owner decision,
not only the Brief incident that first exposed the recovery need. Its recovery
record binds the exact Reviewer job; changed or missing job evidence refuses.

The gate remains unchanged throughout recovery. See the
[sanitized receipt UX incident](verification-runs/2026-07-19-markdown-headings-01/RECEIPT-UX-INCIDENT.md).

### Before Kristian types anything

The isolated verification project must already be initialized as a Guide project,
and Guide must have:

1. drafted one session prompt through `koda-c-session-prompt`;
2. shown Kristian that exact prompt in plain language;
3. received Kristian's explicit confirmation;
4. committed and pushed the prompt, Guide snapshot, and launch request; and
5. passed `koda guide verify` through the project's trusted Koda-C package.

If any item is missing, do not improvise a terminal command. Guide fixes or
names the missing evidence first.

### What the three windows mean

- **Window G — Guide:** already open. Kristian talks here about the project,
  future direction, and future sessions.
- **Window B — Reviewer:** opened by Koda. Kristian talks here about the active
  bounded session, reviews, questions, and product decisions.
- **Window A — Producer:** opened by Koda. Kristian watches but never types here.

### The one launch or recovery action

Window G is a real persistent Codex Guide behind Koda's plain secure console, not
a shell window pretending to be Guide. Open it from the target project with:

```bash
node /Users/freeborn/Dev/koda-codex/dist/cli.js guide open --model gpt-5.6-sol --effort medium
```

It opens or resumes Guide only; it does not launch Producer or Reviewer. For an
installed package, the equivalent command is `koda guide open ...`. Do not replace
it with raw `codex -C`: that route does not establish Koda's Guide permission
boundary or trusted numeric recovery controller. Once `guide>` appears, speak in
ordinary language or type a displayed number. Kristian should never paste a shell
command into the Guide conversation.

Once Guide verifies a fresh launch, it shows `1` launch / `2` not now. When Guide
detects a recoverable session, it shows `1` reopen / `2` not now and explains which
window or windows are missing. Kristian presses or types only the number. Guide
invokes the bound technical action; Kristian never pastes a command, path, launch
ID, receipt, commit, or test count.

Codex may display one host permission asking whether to run Koda's local launcher.
Choosing yes should leave Guide open, request one labeled Reviewer first, wait for its
decision point, and then request one labeled Producer.

After a fresh launch request:

1. Do not ask Guide to launch again.
2. Exactly one Reviewer and one Producer window should appear. If any extra tab,
   environment output, Node prompt, red direct-execution error, or confusing
   repeated permission request appears, stop. Do not keep approving prompts and
   do not try to identify the real windows by trial and error.
3. Wait for Window B to say `KODA-C REVIEWER WINDOW` and `Owner input: OPEN`.
4. Wait for Window A to say `KODA-C PRODUCER WINDOW` and `Owner input: CLOSED`.
5. Leave Window A alone. Watching is safe; typing is not part of the workflow.
6. Speak about the active session only in Window B.
7. Keep Window G available for project-level conversation and future ideas.

Do not run the launch command in this repository merely to experiment when no
fresh confirmed prompt exists; the entry checks will refuse.

The repaired automatic path has deterministic argument, executable-launcher,
environment, order, repeated-recovery, failure, and halt-race tests. Those do not
predict macOS permission behavior. If either requested window does not appear, do
not repeat anything yourself. In Window G, ask: **“What is the current session
state?”** Guide performs the read-only check and shows the applicable numbered
choice. A blind retry refuses because one window may already exist.

### What Kristian does after both windows appear

Nothing is required while Producer is working. When Reviewer needs Kristian,
Window B presents the review or question and explains the numbered choices. The
detailed receipt ceremony is documented below, but the human rule is simple:

1. read what Window B opens;
2. ask questions in Window B if needed;
3. acknowledge in Window B only after reading; and
4. never paste a real receipt into Guide, Producer, chat, or documentation.

## Historical manual two-window proof

The remainder of this guide preserves the earlier owner-observed session proof. Window A is the visible producer/supervisor. Its conversational input is closed. Window B owns one separate persistent reviewer context for the whole bounded session. The enclosing Guide context was not part of this historical run.

The first completed relay remains preserved at [`relay-runs/2026-07-18-software-clean-sol-medium-terra-medium-01`](relay-runs/2026-07-18-software-clean-sol-medium-terra-medium-01/RESULT.md). Do not rerun that closed evidence. Prepare a new run for another live test.

## Prepare once

In either Ghostty window:

```bash
cd /Users/freeborn/Dev/koda-codex
npm run relay:prepare -- software-clean gpt-5.6-sol medium gpt-5.6-terra medium
```

Preparation creates exactly one new run. It does not call either model and does not open a Koda session.

Start order is intentionally simple:

1. In Window B, run `npm run relay:reviewer` and leave it open.
2. In Window A, run `npm run relay:producer` and leave it open.

Window B will say that owner input is open. Window A will say that owner input is closed. You never need a phase-specific command after that.

## Window A — producer

```bash
cd /Users/freeborn/Dev/koda-codex
npm run relay:producer
```

Leave this running. It discovers the one prepared run, starts or resumes the non-interactive producer, and streams the role's emitted updates, completed checks, file changes, and turn endings. When an artifact is ready, Window A writes one reviewer job to disk and waits. It does not run the reviewer itself in this mode.

Window A begins with the permanent `KODA-C PRODUCER WINDOW` label, names its model and session, and says `Owner input: CLOSED`. At phase entry it prints `PHASE n/total`; after a successful gate it prints the revalidated evidence, released waiting-direction IDs, completed count, and next phase or close ceremony. At each producer stop it prints a `PRODUCER HANDOVER` or `PRODUCER PAUSED` block derived from disk. These are factual summaries, not hidden model thinking.

## Window B — reviewer and owner

```bash
cd /Users/freeborn/Dev/koda-codex
npm run relay:reviewer
```

Leave this running too. It begins with the permanent `KODA-C REVIEWER WINDOW` label and says `Owner input: OPEN`. It discovers the same run and waits. When Window A posts a handover, Window B automatically resumes the same persistent reviewer context. There is no phase-specific command to copy.

While Window A is working, Window B shows `reviewer> `. Type an active-session question there and press Return. The same Reviewer context answers from current disk evidence, then returns to the prompt. Ordinary explanation changes no project file. A project-level thought is marked for Guide. Direction is marked `OWNER DIRECTION — WAIT FOR GATE` and written immediately under the session's `directions/` folder, bound to the frozen phase entry and the artifact/review state observed when it arrived. Producer does not receive it until the next successful gate.

For a formal review, Window B shows the reviewer progress and then says `REVIEW READY`. It asks you to press Return, opens the complete review, and waits while you read it:

1. Read the verdict and every finding.
2. Press Space to move down when needed.
3. Read through the final receipt line.
4. Press `q` when finished.
5. Back in Window B, choose the displayed number:
   - `1` acknowledges after one disclosed receipt-paste step;
   - `2` asks the same Reviewer a question;
   - `3` rereads the complete review;
   - `4` stops for now while preserving the decision point;
   - `5` begins permanent halt, which still requires direction and `HALT` confirmation.
6. Explanation questions resume the same reviewer context, alter no files, and return to this menu. Ask as many as needed.
7. If discussion introduces new product direction, Window B records it immediately and says `DIRECTION RECORDED — WAITING FOR GATE`. Acknowledging the review still judges the unchanged artifact against its frozen entry contract. There is no send-now or same-phase revision choice.
8. When you choose `1`, Koda says the exact receipt is on the macOS clipboard before it asks for input. Press Command–V and Return in this same window. A wrong or empty paste changes nothing and offers numbered retry choices; it does not end the process.
9. If Koda asks for comments or a `DISCUSS` ruling, type that answer in Window B too.

The reviewer console never prints the receipt into its readable progress stream, and Kristian's acknowledgement input is never sent as a model message or child-process argument. The raw reviewer event evidence may contain the generated receipt because the reviewer creates and validates the review that contains it; the receipt is not treated as a secret. A changed review or wrong quote refuses and writes no approval. After a valid acknowledgement, Window A re-reads the gate and automatically advances, revises, or requests a fresh review according to the verdict.

Window B prints a disk-derived `REVIEWER HANDOVER` after a consultation answer or acknowledgement. It names the response, review, or waiting-direction path and says that Window A regains control; the gate still decides the route.

The reviewer can explain findings, evidence, implications, and `DISCUSS` options without changing the review. Waiting direction binds Kristian's verbatim statement, the Reviewer classification, phase entry, current artifact hash or explicit absence, and current review hash when one exists. On advancement, `state.json` releases its ID to the receiving phase, whose artifact must read and cite it. If Kristian chooses `h`, Window B instead creates immutable `halt.md`, commits and pushes the bound session, and tells Window A to stop; the next session must start through a fresh Brief citing the halt and waiting direction IDs.

For an in-phase owner question, Window B displays the reviewer's recorded question, accepts Kristian's answer there, resumes the same reviewer context, and requires the answer to be written into the consultation response before Window A continues.

## Runtime-selection and one-reviewer invariants

Unqualified historical commands discover rather than guess and refuse if more
than one unfinished run exists. Guide-launched commands contain the exact run
root, so several independent session pairs may coexist without selecting by
recency. A lock directory refuses a second Window B process for the same run.
Producer and Reviewer share the run and session only through files; their Codex
context IDs must remain distinct. A dependent successor waits for its named
predecessor's pushed close or halt; an explicitly independent sibling may run.

## Stopping and resuming

Ctrl-C preserves the run, reviewer job, context IDs, last action, and partial event evidence. If a model turn was active, Koda terminates that child, marks any possible handback untrusted, and records the exact interruption. On restart it resumes the same context for a reconciliation turn before normal routing. Window B returns an interrupted job to `PENDING`; owner conversation resumes from the saved owner message. If no context ID was observed, Koda refuses to invent a replacement. A completed Window B job is still consumed idempotently on Window A resume, with acknowledgement count re-derived from the ledger.

To resume Window A:

```bash
cd /Users/freeborn/Dev/koda-codex
npm run relay:producer
```

To resume Window B when no stale lock is present:

```bash
cd /Users/freeborn/Dev/koda-codex
npm run relay:reviewer
```

Do not prepare another run merely because one window paused. Do not delete `REVIEWER-JOB.json`; it is the recovery evidence.

At any time, a third terminal—or either window after it stops—can show the truth without changing it:

```bash
cd /Users/freeborn/Dev/koda-codex
npm run relay:status
```

It reports Guide, Producer, and Reviewer scope; owner-input state; run, session, and phase; both session context IDs and turn counts; reviewer-console process; disk job; last error; and exactly one safe next action. Before Reviewer is alive it prints only the Reviewer command. After Reviewer is alive it prints only the Producer command. It refuses ambiguous or corrupt run state rather than choosing one. If the computer killed Window B without letting it clean up, status names the stopped process and prints the explicit recovery command:

```bash
npm run relay:reviewer -- --recover-stale-lock
```

That command removes a lock only after the recorded process is no longer alive. It refuses to displace a running reviewer window.

## Successful ending

Normal success exists only when Window A prints `RELAY COMPLETE` and Window B prints `SESSION CLOSED`. An explicit interrupt instead ends with `RELAY HALTED` / `SESSION HALTED`, a pushed `halt.md`, no advancement for the voided phase, and a required return to Guide for a fresh Brief.

## Current honest boundary

This slice proves the automatic producer-to-reviewer wake-up, one persistent Window B reviewer, a terminal-backed conversation prompt while Producer works, same-window review explanations and exact receipt acknowledgement, an owner-ruling loop for in-phase consultations, and readable progress derived from actual Codex events. The historical manual route remains a repository relay harness around the bounded `software-clean` scenario; the newer Guide launcher connects the same runtime to a real project but still needs owner-observed proof.

Ordinary explanation between handoffs is deliberately non-mutating. Product decisions entered through `DISCUSS` or consultation prompts are disk-backed; new direction is also disk-backed immediately but waits for the next gate. Process recovery never injects new direction, so pause-inject-resume still does not exist. Notification transport, remote control, a polished split-pane interface, and service-grade process-tree supervision remain later layers.

## Safety boundaries

- Never paste a review receipt into Codex chat or documentation.
- Do not manually edit artifacts or reviews while either role is working.
- Use the Koda prompt in Window B for acknowledgement; do not edit the ledger.
- During the first owner-observed test, do not start a second run; plural runtime
  is already mechanically proved and would add human complexity without helping
  this usability test.
