# First Koda-C full-relay test in Ghostty

This guide is for Kristian's first genuine owner-acknowledged Koda-C relay. The run is already prepared at:

```text
docs/relay-runs/2026-07-18-software-clean-sol-medium-terra-medium-01
```

It uses Sol at medium effort as the persistent producer and Terra at medium effort as the persistent reviewer. The models run in separate Codex contexts behind the supervisor. Ghostty window A shows progress and accepts owner acknowledgement; Ghostty window B is where Kristian reads each review. This is not yet the future interface with two visible conversational model panes.

## Complete copy-and-paste command sheet

These are every shell command needed for the prepared test.

### Window A — start

Paste the first command and press Return:

```bash
cd /Users/freeborn/Dev/koda-codex
```

Paste the second command and press Return:

```bash
npm run relay:execute -- "docs/relay-runs/2026-07-18-software-clean-sol-medium-terra-medium-01"
```

Leave window A alone until it prints `OWNER ACKNOWLEDGEMENT REQUIRED` and waits at `Paste the exact RECEIPT line:`.

### Window B — set up once

Open the second Ghostty window. Paste these two commands separately, pressing Return after each:

```bash
cd /Users/freeborn/Dev/koda-codex
```

```bash
export KODA_RELAY_DIR="/Users/freeborn/Dev/koda-codex/docs/relay-runs/2026-07-18-software-clean-sol-medium-terra-medium-01"
```

### Window B — repeat whenever window A asks for a receipt

Paste this command to find the current review:

```bash
export KODA_REVIEW_FILE="$(find "$KODA_RELAY_DIR/project/docs/sessions" -type f -path '*/reviews/[0-9][0-9]-*-review.md' -print | sort | tail -n 1)"
```

Paste this command to confirm which review will open:

```bash
printf '%s\n' "$KODA_REVIEW_FILE"
```

Paste this command to read the complete review:

```bash
less "$KODA_REVIEW_FILE"
```

Inside `less`, press Space to move down. Read every finding through the final receipt. Press `q` to return to the normal prompt.

Paste this command to display the final non-empty line again:

```bash
awk 'NF { last = $0 } END { print last }' "$KODA_REVIEW_FILE"
```

After confirming that the displayed line begins with `RECEIPT:`, paste this command to copy that exact line to the macOS clipboard:

```bash
awk 'NF { last = $0 } END { print last }' "$KODA_REVIEW_FILE" | pbcopy
```

Return to window A. Press Command–V to paste the receipt at Koda's waiting prompt, then press Return. Command–V and Return are interactive input, not Bash commands.

Repeat the five window-B commands above at every later receipt prompt. Refreshing `KODA_REVIEW_FILE` matters because each phase has a different review, and a blocking verdict creates a fresh review at the same path.

### Window B — inspect a pause

If window A says `RELAY PAUSED`, paste:

```bash
sed -n '1,240p' "$KODA_RELAY_DIR/RUN.json"
```

To resume, return to window A and paste the same execution command again:

```bash
npm run relay:execute -- "docs/relay-runs/2026-07-18-software-clean-sol-medium-terra-medium-01"
```

### Window B — verify completion

After window A prints `RELAY COMPLETE`, paste these commands separately:

```bash
sed -n '1,240p' "$KODA_RELAY_DIR/RESULT.md"
```

```bash
sed -n '1,240p' "$KODA_RELAY_DIR/GIT-EVIDENCE.json"
```

No other Bash commands are required for the test.

## Before starting

1. Do not create another relay run.
2. Do not edit anything inside the prepared run folder.
3. Never paste a review receipt into Codex chat, this document, or a message. Paste it only into Koda's terminal prompt in window A.
4. Allow uninterrupted time for six phases. There will be at least one acknowledgement per phase; a blocking verdict may create an additional review and acknowledgement in the same phase.

## Window A — run the relay

1. Open a Ghostty window.
2. Paste this command and press Return:

   ```bash
   cd /Users/freeborn/Dev/koda-codex
   ```

3. Paste this command and press Return:

   ```bash
   npm run relay:execute -- "docs/relay-runs/2026-07-18-software-clean-sol-medium-terra-medium-01"
   ```

4. Leave this window running. Do not type while a producer or reviewer turn is in progress.
5. The terminal will print short milestones such as `PRODUCER 1` and `REVIEWER 1`. Complete model event streams are saved to the run folder rather than flooding the terminal.
6. Wait until window A prints:

   ```text
   OWNER ACKNOWLEDGEMENT REQUIRED
   Read the complete review through its final receipt: <absolute path>
   Paste the exact RECEIPT line:
   ```

Do not paste anything yet. Move to window B and read the named review.

## Window B — read the review

1. Open a second Ghostty window using the method you normally use for a new window or pane.
2. Move to the repository:

   ```bash
   cd /Users/freeborn/Dev/koda-codex
   ```

3. Copy the complete absolute review path printed in window A.
4. Type `less`, add one space, paste the path inside double quotes, and press Return. It will look like:

   ```bash
   less "/Users/freeborn/Dev/koda-codex/docs/relay-runs/.../01-brief-review.md"
   ```

5. Read from the verdict at the top through every finding. Use the Space bar to move down one screen. Do not jump straight to the receipt.
6. At the bottom, confirm that the final non-empty line begins with `RECEIPT:`.
7. Press `q` to leave `less`.
8. To isolate the line for copying after reading the full review, run:

   ```bash
   tail -n 1 "<paste the same absolute review path>"
   ```

9. Select and copy that entire line, including `RECEIPT:`.

## Return to window A — acknowledge

1. Return to the waiting `Paste the exact RECEIPT line:` prompt.
2. Paste the receipt and press Return.
3. Koda verifies it and records Kristian as the approver. The supervisor then re-reads the gate from disk.
4. If the verdict is `APPROVE`, the next configured phase starts automatically.
5. If the verdict is `APPROVE WITH COMMENTS`, Koda also asks for the review comments. Record the genuine non-blocking comments from the review.
6. If the verdict is `REVISE` or `REJECT`, Koda keeps the phase closed. The producer receives the acknowledged disk handback, changes the artifact, and the reviewer writes a fresh review. Read and acknowledge that fresh review too.
7. If the verdict is `DISCUSS`, Koda asks for Kristian's ruling. Enter a real product decision only if the question is clear. If it is not clear, stop rather than inventing an answer.

Repeat the Window B → Window A cycle for every review.

## If the run pauses or you press Control-C

1. Do not delete the run folder.
2. Do not run `relay:prepare` again.
3. Inspect the resumable state with:

   ```bash
   sed -n '1,240p' docs/relay-runs/2026-07-18-software-clean-sol-medium-terra-medium-01/RUN.json
   ```

4. Resume with the same command:

   ```bash
   npm run relay:execute -- "docs/relay-runs/2026-07-18-software-clean-sol-medium-terra-medium-01"
   ```

The supervisor derives the current phase and evidence from disk and resumes the saved role thread ID. If the status says `AWAITING_OWNER_CONSULTATION`, stop and tell Codex the named response-file path and owner question—but never send a receipt.

## Successful ending

The run is successful only when window A prints:

```text
RELAY COMPLETE — <session id>
Durable evidence: <run path>
```

Then inspect the result in window B:

```bash
sed -n '1,240p' docs/relay-runs/2026-07-18-software-clean-sol-medium-terra-medium-01/RESULT.md
```

It must say `Status: COMPLETE`, show different producer and reviewer thread IDs, report all six phases completed, and name a pushed close commit. The run folder will also contain `TRANSCRIPT.md`, `GIT-EVIDENCE.json`, `GIT-LOG.txt`, and `PROJECT-HISTORY.bundle`.

At that point, tell Codex only that the relay reached `RELAY COMPLETE`. Codex will inspect the saved evidence, update `TESTING.md`, run the deterministic suite, and commit and push the completed run folder.

## Things not to do

- Do not paste receipts into chat.
- Do not run `koda advance`, `koda approve`, or `koda review new` manually outside the supervisor's prompts.
- Do not edit artifacts or reviews during the run.
- Do not treat `PREPARED`, a model exit, or `6/6 phases` as closure. Only the final pushed-close proof is complete.
