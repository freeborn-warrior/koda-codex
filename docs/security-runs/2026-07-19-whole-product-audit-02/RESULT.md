# Whole-product security audit — 2026-07-19 — run 02

- Status: **PASS WITH ONE HIGH-PRIORITY INTEGRITY IMPLEMENTATION AND DOCUMENTED TRUST BOUNDARIES**
- Platform: macOS arm64
- Node: `v26.0.0`
- Scope: package lifecycle and contents, dependency surface, executable modes,
  child-process launch, signals, Git mutation, path containment, symlinks,
  credentials, local runtime evidence, concurrency, and newly added interruption recovery

## Executive result

No new dependency, install hook, shell-evaluated user input, path escape,
credential signature, or tracked symbolic link was found. The gate and status
surfaces remain fail-closed, and the interruption schema was consolidated so the
supervisor and status command cannot silently drift into different definitions
of valid recovery evidence.

One important existing design risk became clearer when auditing the mature
three-context goal: the real-project relay stages every changed path before close.
It is not safe to claim that Guide/owner project edits may occur concurrently
until Koda owns mutation provenance explicitly. This is high priority because it
can misattribute unrelated content to a Producer commit, not because an external
attacker was shown to gain access.

## Checks and results

| Area | Result | Evidence |
|---|---|---|
| Runtime dependencies | PASS | `package.json` declares none; pack reports zero bundled dependencies. |
| Install lifecycle | PASS | No `preinstall`, `install`, or `postinstall`; `prepack` rebuilds only validated repository-local `dist/`. |
| Package inspection | PASS WITH ENVIRONMENT NOTE | Isolated-cache `npm pack --dry-run --json`: 617,579 packed bytes, 3,082,856 unpacked bytes, 649 files. Default global cache first refused with external `EPERM`; it was not modified. |
| Executables | PASS | Only `dist/cli.js`, `src/cli.ts`, and deterministic dogfood runner are tracked executable; package CLI is `0755`. |
| Symbolic links | PASS | No tracked mode `120000`; bound runtime/session paths also reject linked evidence in mutation tests. |
| Process invocation | PASS WITH BOUNDARIES | Runtime Codex, Git, pager, clipboard, Node, and macOS open calls use argument arrays. The only `shell: true` helper executes three fixed commands printed by Koda inside the deterministic disposable dogfood harness, not owner or model input in the product relay. |
| Secrets | PASS WITH LAUNCH-ENV WARNING | Tracked-text signature scan passes. Codex subprocesses intentionally inherit the launch environment for authentication; unrelated shell secrets remain an operator risk. |
| Interrupt recovery | PASS WITH PROCESS-TREE LIMIT | Direct Codex child receives SIGTERM and then SIGKILL after two seconds if needed; partial files stay untrusted; same-context reconciliation is required. Descendant-process cleanup is not claimed. |
| Git integrity | OPEN HIGH-PRIORITY DESIGN RISK | Clean pushed entry and exact close/Guide-return staging are checked, but pre-close produced output uses `git add -A`, so concurrent unrelated tracked edits could be included. |
| Git hooks/remotes | DOCUMENTED TRUST BOUNDARY | Explicit relay and Reviewer halt execute commit/push, which can invoke configured hooks and contact configured remotes. No active non-sample hook or custom `core.hooksPath` exists in this checkout. |
| Same-user attacker | OUT OF THREAT MODEL | Hashes bind content but are not signatures; a writer with repository and Git-history control can forge coherent evidence. |
| Local privacy | DOCUMENTED LIMIT | Receipts are not secrets; review reading may use the clipboard, raw model events persist locally, and ignored `.koda` evidence follows the user's filesystem permissions. |

## Finding S-02-01 — broad pre-close staging

- Severity: **High priority product-integrity decision**
- State: **Open; safe-use boundary documented**
- Location: `scripts/execute-relay-run.ts`, `commitProducedOutput()`
- Mechanism: `git add -A` deliberately captures output whose paths are not known
  before Produce. If any other tracked file changes after clean launch and before
  pre-close, Git cannot tell whether Producer, Guide, owner, hook, or another
  process authored it; the supervisor can include it in the same commit.
- Current safe operation: while a real-project relay is active, do not mutate
  tracked project files outside the trusted relay/Reviewer evidence route.
- Required owner/architecture decision: choose an exclusive recoverable mutation
  lease, a phase-produced exact path manifest checked against the Git diff, or a
  compatible combination. Whatever is chosen must mutation-test one unrelated
  staged file, one unrelated unstaged file, an allowed waiting-direction write,
  intended deletion/rename, and crash recovery.

**Owner addendum:** Kristian requires Guide and unrelated project work to remain
able to modify files during Produce. A whole-project lease is rejected. Koda must
use exact per-workstream write sets and path-conflict detection, with a short
recoverable lock only for Git stage/commit/push. The current broad-staging runner
remains unsafe for that experience until the new contract is implemented and
mutation-tested. Kristian also confirmed that independent formal session kinds
may run concurrently, which makes explicit session identity and dependency-aware
Git attribution mandatory rather than optional scaling work.

## Finding S-02-02 — repository Git hooks execute with relay authority

- Severity: **Medium trust boundary**
- State: **Documented; owner policy not yet chosen**
- Mechanism: the real-project supervisor and explicit Reviewer halt run `git
  commit` and `git push`. Git defines hooks as executable programs triggered at
  points in Git execution, including commit and push. This checkout has only
  `.sample` hook files and no custom `core.hooksPath`, but another project may not.
- Options for owner ruling: retain normal hooks as part of project policy; require
  a preflight that inventories active hooks; or run relay-owned Git with a sealed
  hook policy. Disabling hooks silently is not automatically safer because a
  legitimate security hook might be part of the project contract.

## Finding S-02-03 — direct-child stop is not process-tree containment

- Severity: **Low now; higher for a future service runtime**
- State: **Documented and deliberately not overclaimed**
- Mechanism: Node sends the signal to the spawned Codex process. Platform child
  process behavior does not guarantee descendants are terminated merely because
  their parent receives a signal. Koda records and reconciles the direct worker;
  it is not an operating-system sandbox or process supervisor yet.

## New hardening completed

1. Removed duplicated interruption validators from Producer execution and status.
2. Constrained interruption recovery to known role-specific supervisor purposes.
3. Required canonical ISO UTC timestamps rather than any string accepted by
   permissive date parsing.
4. Required role-matched event/stderr filenames and positive turn numbers.
5. Preserved the existing refusal when no persistent context ID was observed.

## Primary references used for the boundary audit

- Git's official hook documentation: <https://git-scm.com/docs/githooks>
- Node's official child-process documentation: <https://nodejs.org/api/child_process.html>
- npm lifecycle documentation: <https://docs.npmjs.com/cli/v11/using-npm/scripts/>
- npm package `files` documentation: <https://docs.npmjs.com/cli/v11/configuring-npm/package-json/#files>

## Verdict

Koda-C remains appropriate for trusted local-project use under its documented
boundaries. Do not yet advertise safe simultaneous Guide/owner project mutation,
hostile-repository execution, sandboxing, or unattended service containment. The
next owner decision should settle mutation provenance before that broader claim.
