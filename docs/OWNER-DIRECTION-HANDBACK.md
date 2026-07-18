# Owner-direction handback protocol

This protocol carries a new owner direction discovered while Kristian is discussing an active formal review with the persistent reviewer. It is not a verdict, approval, advancement, or substitute for the review receipt.

## Safety sequence

1. The owner asks or states something in Window B.
2. The same reviewer classifies it. Ordinary explanation changes no file. New direction begins with the exact marker `OWNER DIRECTION — DISK HANDOFF REQUIRED`.
3. Window B asks Kristian whether to send or discard the direction. Classification alone is not authority to send it.
4. On explicit send, the runtime writes one immutable Markdown handback under `owner-handbacks/<NN>-<phase>/<CC>-direction.md`.
5. The handback binds the verbatim owner statement, its hash, current artifact hash, active review ID, and complete review hash. It preserves the reviewer relay that explained the direction and consequence.
6. Kristian still reads and quotes the active review's exact receipt. Without that receipt, Window A remains paused even if a handback file exists.
7. Window A gives pending handbacks priority over an otherwise open gate. The producer must revise the same phase artifact and cite every handback path.
8. The prior review becomes stale. Koda requires a fresh formal review and a fresh receipt before the phase can advance.

Discard writes no handback and changes no producer input. Pausing preserves the waiting reviewer job. A malformed, mismatched, symbolic-link, stale, or ambiguously named handback refuses; neither window guesses.

The receipt proves the review phrase entered the decision loop, and the handback proves what direction entered the producer relay. Neither mechanism proves private cognition or prevents a malicious same-user process from fabricating coherent files.
