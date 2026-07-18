# Owner prompt

Create a dependency-free utility that normalizes a short list of labels.

- Trim surrounding whitespace, collapse internal whitespace, and lowercase each label.
- Drop blank labels and later duplicates while preserving first-seen order.
- Inputs are local arrays of at most 100 strings; no performance target exists.
- A simple implementation is acceptable. Style cleanup is not a release condition.
