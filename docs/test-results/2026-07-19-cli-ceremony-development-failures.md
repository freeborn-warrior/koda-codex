# Human-facing CLI ceremony — development failures

**Date:** 2026-07-19

## Active-producer status assertion retained the former prompt wording

The first focused Guide/relay/status/judge run passed **46/47**. The redesigned status output correctly printed only the Reviewer as the safe next action and still warned against starting a second Producer, but one inherited assertion expected the older capitalized phrase `Start or resume Window B`.

The assertion now requires the new full instruction: `First, start or resume Window B. Then run status again`. The neighboring checks still require the Reviewer command, forbid a blind Producer-start hint while Producer is recorded active, and separately prove that Producer becomes the sole next action only after a live Reviewer lock exists. No gate, refusal, security, or duplicate-process condition was weakened.
