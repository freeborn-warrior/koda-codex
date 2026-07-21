# Markdown heading reporter

## Goal

Create a tiny dependency-free Node.js command that reads one local UTF-8 Markdown
file and prints its ATX headings as structured JSON. The project exists to show
Koda-C's complete Guide, Producer, Reviewer, gate, receipt, and close experience
on plausible work whose review outcome is not staged.

## Required behavior

- Accept exactly one local Markdown-file path.
- Recognize ATX headings from level 1 through level 6 when the opening `#`
  sequence is followed by whitespace or the line ends.
- Ignore heading-like lines inside fenced code blocks using backticks or tildes.
- Emit JSON containing the input source and ordered heading records with level,
  text, and one-based line number.
- Report no headings as an empty array.
- Refuse a missing or unreadable path with a nonzero exit and a clear error.
- Never modify the input.

## Boundaries

No setext headings, directories, recursion, standard input, binary formats,
dependencies, network access, publishing, or performance promises.

## Current state

No implementation exists. The first Koda-C session will create and exercise it.
