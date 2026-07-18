# Koda-C submission checklist

**Verified against the live rules:** 2026-07-18

**Hard deadline:** 2026-07-21 at 5:00 pm Pacific

**Koda buffer target:** submit on 2026-07-20, not during the final-day window

The [official OpenAI page](https://openai.com/build-week/) says strong entries
should show thoughtful Codex/GPT-5.6 use and clearly explain the problem,
solution, and approach. The
[official Devpost rules](https://openai.devpost.com/rules) remain the source of
truth for the exact submission requirements.

## Repository and runnable product

- [x] Public repository: `https://github.com/freeborn-warrior/koda-codex`
- [x] If the repository ever becomes private before judging, share it with
  `testing@devpost.com` and `build-week-event@openai.com`; the intended submission
  state is public, so no invitation is currently required.
- [x] GPLv3-only license and sole owner copyright are present.
- [x] Product name, repository/package slug, and CLI command are distinguished:
  Koda-C / `koda-codex` / `koda`.
- [x] Required runtime is documented: Node.js 22.18+ and Git.
- [x] Tested platform is stated honestly: macOS 26.5.1 arm64, Node 26.0.0,
  Apple Git 2.50.1. Other platforms are not represented as tested.
- [x] A judge can run the committed binary without rebuilding:
  `node dist/cli.js --help`.
- [x] A judge can run the exact local package path from a fresh checkout:
  `npx --yes . --help`.
- [x] The one-minute refusal fixture is documented in [DEMO.md](DEMO.md).
- [x] Package safety, install hooks, dependencies, and model-harness boundaries
  are documented in [SECURITY.md](SECURITY.md).
- [x] The current full suite passes 96/96 and preserves its named transcript.
- [ ] Kristian performs one final fresh-checkout demo rehearsal before recording.

## Submission form

- [ ] Join the OpenAI Build Week challenge on Devpost.
- [ ] Owner confirms **Developer Tools** as the single category. The live rules
  explicitly place testing, DevOps, agentic workflows, and security there.
- [ ] Enter the final project title: **Koda-C**.
- [ ] Enter the final one-line description. Working draft:

  > A plain-file relay that refuses to advance AI-produced work until an
  > independent review, its verdict, and proof that the review entered the
  > owner's decision loop all agree on disk.

- [ ] Paste the final text description from the draft below.
- [ ] Add the public repository URL.
- [ ] In this primary Codex build task, Kristian runs `/feedback` and records the
  returned Codex Session ID in the form. Do not substitute the relay's producer
  or reviewer thread IDs; the rules ask for the project thread where most core
  functionality was built.
- [ ] Re-check every Devpost preview field before submitting.

## Video

- [ ] Record in English with audible narration.
- [ ] Keep the finished video below 3:00; target 2:30–2:40.
- [ ] Show a real refusal and a real successful advancement.
- [ ] Explain what was built and how Codex plus GPT-5.6 were used.
- [ ] Name Kristian's product/design decisions and Codex's engineering work.
- [ ] Use no music, stock imagery, or third-party visual asset. Crop terminal
  chrome where practical and show only material needed for the demo.
- [ ] Export, watch from beginning to end with sound, and verify text legibility.
- [ ] Upload publicly to YouTube.
- [ ] Open the public URL in a signed-out/private browser window.
- [ ] Add the YouTube URL to the submission form.

The exact shot order, narration, fallback lines, and recording checks are in
[VIDEO-SCRIPT.md](VIDEO-SCRIPT.md).

## Collaboration evidence

- [x] The README explains the lived failure and receipt mechanism.
- [x] The README says where Kristian made product decisions.
- [x] The README says where Codex accelerated and implemented the work.
- [x] The repository and test ledger identify GPT-5.6 Sol, Terra, and Luna work.
- [x] The dated Git history began during the submission period and preserves
  honest failures and fixes.
- [x] A genuine two-context full relay, unplanned Summary REVISE, seven owner
  acknowledgements, and pushed close are preserved on disk.
- [x] Fresh Codex skill discovery and the public fresh-checkout path are proved.

## Final freeze

- [ ] `git status --short` is empty.
- [ ] `git log -1 --oneline` names the intended submission commit.
- [ ] `git rev-list --count origin/main..HEAD` prints `0`.
- [ ] `npm test` passes from the submission commit.
- [ ] Public fresh checkout prints help and remains clean after the demo path.
- [ ] All Markdown links needed by judges resolve from `docs/README.md`.
- [ ] Create and push a submission tag only after the video/form references the
  exact commit. Suggested tag: `build-week-2026-submission`.
- [ ] Record the submission commit, tag, YouTube URL, `/feedback` Session ID,
  category, and Devpost URL in a dated `docs/submission/` receipt.
- [ ] Submit before the buffer target and confirm Devpost shows the entry as
  submitted, not merely saved as a draft.

The rules say submission materials cannot be changed after the deadline, though
the general Devpost portfolio may continue to be updated. Keep the submitted
commit and video available free of charge throughout judging; safest is to leave
them public through the announced winner date on August 12.

## Text-description draft

Koda-C is a developer tool for a failure that appears when AI can produce work
faster than an owner can responsibly inspect it. Most workflow systems blur two
different events: whether an independent review permits progress, and whether
that review actually entered the owner's decision loop.

Koda-C separates them. Every phase is represented by plain files. Work advances
only when the artifact exists, a separate reviewer has written a valid verdict,
the review is bound to the current artifact, and the review's unique receipt has
been quoted into the approval ledger. REVISE, REJECT, and DISCUSS remain blocking
even when the receipt is exact. The final close binds every session file and is
official only after every bound file is tracked, committed, and pushed.

The project includes a dependency-free CLI, configurable six-phase reference
workflow, seven producer skills, one shared reviewer skill, immutable close
ceremony, mutation/adversarial/status/staleness/security suites, five sealed
reviewer fixtures, a Sol/Terra/Luna comparison, and one genuine full relay between
persistent producer and reviewer contexts. That relay encountered an unplanned
Summary defect, revised it, received a fresh review, and closed at a verified
pushed commit.

Kristian Bengtsson brought the process from years of directing C++, Swift, and
Rust products as a designer: session prompt, brief, orient, plan, produce, live,
summary, push, with independent review between phases. He made the product calls
about the receipt, one shared reviewer, producer/reviewer relay, owner-facing
reviewer, immutable Git close, model tests, and honest limits. GPT-5.6 Codex turned
those rulings into the engine, skills, harness, tests, security hardening, and
inspectable evidence—while preserving failed attempts and corrections in dated
Git history.

The receipt does not prove comprehension. It raises the floor: ignoring a review
is no longer a passive omission; bypassing it requires deliberately opening the
review and taking its unique phrase. Koda-C is not mind-reading. It is a small,
auditable relay that makes confident prose answer to evidence.
