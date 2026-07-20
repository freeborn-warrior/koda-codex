# Launcher context mismatch incident

- **Observed:** 2026-07-19 (America/New_York)
- **Session:** `2026-07-19-02`
- **Launch:** `6371ade2-3002-42aa-87ab-a613220b7eab`
- **Gate impact:** none; zero acknowledgements and zero advancements
- **Owner action:** selected the displayed recovery choice twice

## What happened

The new secure Guide correctly found the saved Brief decision and offered only
`1` recover Producer / `2` remain paused. Both recovery selections refused before
opening a role because the saved Reviewer launcher did not byte-match a launcher
generated from the secure Guide's process environment. Guide remained open and
explicitly reported that nothing advanced.

The launcher had not been tampered with. The original clean launch occurred from
Ghostty and captured terminal-specific `LANG`, `TERM`, and `COLORTERM` values.
Recovery occurred from Koda's managed Guide, whose safe child environment used
different locale/terminal values. The launcher command, project, runtime, Codex
executable, Node executable, role script, arguments, and credential-free boundary
were unchanged, but Koda incorrectly treated ambient presentation values as part
of immutable command identity.

## Repair contract

- New role launchers use fixed locale, terminal, color, and executable-search path
  values, so their
  bytes do not depend on whether Guide was opened from Ghostty, Codex Desktop, or
  another terminal.
- A mismatched existing launcher is never trusted or executed. Koda accepts it for
  migration only if a strict parser proves the complete generated shell structure,
  allowlisted environment-key order, exact project, exact Node/Codex executables,
  exact role script, and exact runtime arguments.
- Both role launchers are inspected before either is changed. Arbitrary text,
  extra commands, changed script paths, links, non-files, malformed quoting, and
  concurrent changes still refuse.
- A validated legacy launcher is atomically replaced with current deterministic
  bytes and the prior/current hashes are recorded in
  `.koda/runs/<launch-id>/LAUNCHER-MIGRATION.json`.

The preserved production launchers were checked read-only against this parser;
both match the bounded legacy shape. They have not yet been migrated or executed.
Kristian's two Guide/Reviewer windows remain the next live observation after the
repair is pushed and sealed.
