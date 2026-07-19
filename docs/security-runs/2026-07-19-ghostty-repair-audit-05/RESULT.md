# Ghostty repair and whole-product delta security audit — 2026-07-19 — run 05

- Status: **MECHANICAL PASS WITH OWNER-VISIBLE RELEASE BLOCKER AND DOCUMENTED LOCAL-TRUST BOUNDARIES**
- Platform: macOS arm64; Node.js 26.0.0; Ghostty 1.3.1 observed in the failed live run
- Scope: first live launch incident, Ghostty command construction, private role
  launchers, role/model environments, pushed-halt routing, package lifecycle,
  repository integrity, inherited gate/write-set/Git threats, and new residual risk

## Result

The first live three-context attempt exposed one severe implementation flaw and
one high-integrity routing race. Both are fixed mechanically and covered by
permanent adversarial tests. The complete dependency-free suite passes 181/181;
an independent coverage execution also passes 181/181. The new environment
sanitizer is 100% line/branch/function covered, and the Ghostty adapter is 93.92%
line covered.

This audit does not close the release blocker. Real Ghostty window creation and
macOS permission behavior cannot be proved through a mocked `/usr/bin/open` call.
A fresh owner-observed run must produce exactly Guide plus one Reviewer and one
Producer, with no extra tabs, environment output, Node prompt, direct-execution
errors, or confusing repeated permissions.

## Findings and disposition

| Severity | Finding | Disposition |
|---|---|---|
| Critical | Loose tokens after Ghostty `-e` became unintended terminal surfaces; one rendered an ambient credential. | **FIXED IN CODE.** Ghostty receives one relative launcher token per role. No credential, receipt, screenshot, or raw environment is copied into repository evidence. |
| High | Producer processed a completed Reviewer halt job before rechecking pushed terminal evidence, then repeated a voided review prompt. | **FIXED.** Every Producer routing loop now evaluates pushed halt before phase, review, acknowledgement, or model work; stale jobs are removed and the run becomes `HALTED`. |
| Medium | A Node-based private launcher could be influenced by ambient `NODE_OPTIONS` before its own cleanup logic ran. | **FIXED DURING AUDIT.** The mode-700 launcher is now a non-interactive `/bin/sh` file that immediately executes `/usr/bin/env -i` with a quoted allowlist before Node starts. |
| Medium | A generated shell command can split or inject when project paths contain spaces or quotes. | **COVERED.** The executable test uses a project path containing both spaces and an apostrophe, plus hostile `NODE_OPTIONS` and credential/context variables; the child starts once with only allowed values. |
| Release blocker | Deterministic tests do not establish real window count or whether macOS/Ghostty will ask for confusing repeated permissions. | **OPEN HUMAN PROOF.** Do not call the incident closed until the fresh run succeeds. |

## Environment boundary

The Guide-launched Ghostty role gets only safe terminal identity values, a fixed
system/Homebrew executable path, and the resolved Codex binary path. The role
launcher clears ambient state before starting Producer or Reviewer. Every Codex
child is independently reduced to safe terminal identity, the fixed path, and its
bound `KODA_SESSION_ID`. Ambient API credentials, cloud secrets, arbitrary project
variables, parent `CODEX_THREAD_ID`, and Node startup options are absent.

`HOME` remains intentionally present so the installed Codex CLI can locate its
own authentication and configuration. That is capability needed by the runtime,
not a promise that `SKILL.md` is a permission boundary. The model tool sandbox and
approval policy remain essential. A custom provider that relies only on an
ambient API-key variable may now fail closed rather than receive that credential;
Koda must not reintroduce blanket inheritance as a compatibility fix.

The deterministic relay fixtures retain explicit `KODA_TEST_*` channels only
when `KODA_RELAY_RUNS_ROOT` marks test mode. The real Ghostty launcher does not
pass that marker. A developer directly invoking historical relay scripts with
test-mode environment variables is operating the test harness, not the sealed
Guide-launched product route.

## Launcher and process boundary

- Private launchers are created with exclusive create, verified as unchanged
  ordinary files on reuse, and forced to mode 700.
- Ghostty receives a space-free project-relative path under the exact run root;
  the project, script, arguments, and allowlisted assignments inside the launcher
  are single-quoted with embedded apostrophes escaped.
- `/bin/sh` is non-interactive and reads no project profile before `env -i`.
- Shell `exec` replaces the trampoline with the role process, so ordinary signals
  reach the intended supervisor without another forwarding layer.
- Same-user replacement after Koda's content check but before Ghostty executes the
  file remains a local TOCTOU boundary. Koda is cooperative provenance discipline,
  not hostile same-user isolation. Stronger defense would require a separate OS
  identity, signed helper, or service boundary.
- Ctrl-C still directly contains the active model child, not an arbitrary process
  tree. Service-grade descendant containment remains later work.

## Repository, package, and inherited checks

| Area | Result |
|---|---|
| Focused repair/security/halt suite | PASS — 44/44 |
| Ordinary complete suite | PASS — 181/181 |
| Coverage complete suite | PASS — 181/181; 89.08% lines overall |
| Durable complete suite | PASS — [181/181 transcript](../../test-results/2026-07-19-ghostty-integrity-repair-complete.md) |
| Ready-to-push repetition | PASS — ordinary 181/181 plus [durable 181/181](../../test-results/2026-07-19-ghostty-integrity-repair-ready-to-push.md) after final docs and quoted-path control |
| Real package lifecycle | PASS — the complete suite builds, packs, installs, and runs the dependency-free JavaScript package with no install hook |
| Whitespace and symlinks | PASS — `git diff --check` and repair-surface link scan found no issue |
| Credential signatures | PASS — no common live credential signature was found in repository files; the exposed value was never saved |
| Git object integrity | PASS WITH RECOVERABLE DEBRIS — full inspection found dangling historical blobs/trees but no missing or corrupt reachable object |
| Receipt/gate mutations | PASS — all earlier exact-receipt, stale-review, blocking-verdict, and status-truth refusals remain intact |
| Write-set/Git mutations | PASS — exact ownership, staged-byte binding, lock, pushed close/halt, and concurrent-session conditions remain intact |

## Retained threat boundaries

1. Same-user processes, manual Git commands, hooks, and remotes can act outside
   Koda's cooperative claims. Hooks and remotes execute with the user's authority.
2. Hashes bind bytes but do not authenticate who authored them. A malicious
   repository owner can manufacture a new internally consistent history.
3. Receipts prove attributable phrase entry, not comprehension, and the macOS
   clipboard is observable by other local applications.
4. Codex skills are behavior instructions, not filesystem or context isolation.
5. Automatic terminal opening remains macOS/Ghostty-specific. Other terminals
   need their own adapter and live proof rather than inheriting this claim.
6. The owner chose to monitor rather than immediately rotate the displayed
   credential because other projects use it. That operational choice is not a
   security fix and is not represented as one.

## Verdict

No new unmitigated code-level critical or high finding remains in the repair
surface. Mechanical containment and regression evidence pass. Release readiness
still requires the fresh owner-visible Ghostty run, followed by post-push tests;
until then the product must say **repaired but not human-reverified**, never
**incident closed**.
