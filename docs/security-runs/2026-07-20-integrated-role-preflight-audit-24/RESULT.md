# Integrated Producer-role preflight — security audit

- Date: 2026-07-20
- Status: **POST-PUSH PASS — INDEPENDENT REVIEW NOT RUN**
- Scope: permission proof, Git resolution, child environment, scratch cleanup,
  Guide-return archival, and repository boundaries
- Complete local regression: [250/250](../../test-results/2026-07-20-integrated-role-preflight-local-04.md)
- Unchanged post-push regression: [250/250](../../test-results/2026-07-20-integrated-role-preflight-pushed.md)

## Findings

### Verified toolkit proof

The role profile previously allowed the compiled CLI but omitted the manifest and
test evidence that the CLI itself must read. A new helper obtains only the exact
paths returned by successful toolkit-integrity verification and binds them into
both live roles. It does not grant the Koda-C `docs/` tree, development checkout,
ordinary home files, or sibling projects.

### Git execution

Calling `/usr/bin/git` inside the restricted macOS role sandbox invoked the xcrun
shim, which attempted blocked developer-cache and temporary paths. Koda now
resolves the real Git executable before entering the sandbox and grants only its
narrow read-only toolchain root. The child `PATH` places that directory first.

Global and system Git configuration are disabled, terminal credential prompting
is disabled, and optional Git locks are disabled for model-generated reads.
Trusted supervisor commit/push ceremonies retain their separate normal Git
environment.

### Private configuration state

Each session role uses `<run>/.xdg` as its `XDG_CONFIG_HOME`. This prevents a
read probe of the user's `~/.config` while keeping runtime bytes inside the
project-local ignored area. The directory is never treated as durable evidence.
Immutable Guide-return staging skips it only when it is a real and empty
directory; any contents or unsafe file type refuse the close return.

### Environment and network

The repair does not broaden inherited environment. Ambient API keys, AWS values,
parent Codex thread identity, arbitrary project variables, and Node startup hooks
remain absent. Network, web search, login shells, user config, ambient rules, and
approval escalation remain disabled by the strict role profile.

### Scratch containment

Quick Start creates the role preflight with a system-generated temporary
directory, clones only the already prepared local project, requires one new
session inside that clone, and removes only that exact temporary directory in a
`finally` block. The prepared human-demo project remains session-empty and ready
for its first visible run.

## Adversarial coverage

- relative Git and XDG paths refuse;
- role permission tables cannot silently omit toolkit proof;
- both live call sites must use the verified helper, resolved Git toolchain, and
  bound private XDG environment;
- ambient credentials and parent context identity remain absent;
- linked toolkit evidence refuses;
- changed toolkit files invalidate the manifest;
- a non-empty runtime XDG directory refuses evidence archival;
- project, `.git`, `.agents`, `.codex`, `.env`, sibling, home, and network
  boundaries retain their existing mutation coverage.

## Residual boundaries

The integrity manifest is not a signature and does not defeat a malicious
same-user replacement of verifier, evidence, and history together. Codex still
uses its own home directory outside the model command sandbox for client
authentication and task storage. Git hooks configured by a real target project
may execute during explicitly requested supervisor commits and pushes. These are
existing documented trust boundaries, not new authority introduced by this
repair.
