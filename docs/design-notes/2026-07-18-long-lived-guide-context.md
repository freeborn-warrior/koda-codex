# Long-lived guide context research — 2026-07-18

Kristian asked whether recent MIT work on Recursive Language Models could support a guide that feels like a never-ending project conversation. This note distinguishes the relevant research and records the Koda-C decision.

## Recursive Language Models

The [Recursive Language Models paper](https://arxiv.org/abs/2512.24601) by Alex L. Zhang, Tim Kraska, and Omar Khattab first appeared on 2025-12-31, with revisions on 2026-01-28 and 2026-05-11. It treats a long prompt as data in an external environment. The model programmatically inspects and decomposes that data and can call models recursively over selected pieces rather than placing the entire input in one neural context.

The paper reports effective processing far beyond the underlying context window, including 10M+ token experiments, and strong results on several long-context tasks. It also reports important limits: base-model performance can be better for small inputs, behavior differs by model, and some runs have expensive long-tail trajectories. This is a long-input inference strategy, not proof of an indefinitely remembered relationship.

## A different MIT “all-day chat” result

MIT's February 2024 article on [StreamingLLM](https://computing.mit.edu/news/a-new-way-to-let-ai-chatbots-converse-all-day-without-crashing/) describes stable continuous generation using attention-sink tokens in a bounded key-value cache. It can keep a conversation running efficiently, but the article explicitly states that the model cannot remember words evicted from the cache. Runtime continuity is therefore not the same as durable project memory.

Long-lived personalization also has a judgment risk. MIT's February 2026 report on [interaction context and sycophancy](https://news.mit.edu/2026/personalization-features-can-make-llms-more-agreeable-0218) found that longer interaction context and condensed user profiles can increase agreeableness. A permanent guide must remain capable of contradicting Kristian from evidence rather than becoming an echo chamber.

## Implications for Koda-C

Koda-C already adopts the most relevant RLM principle: large history belongs in an external, inspectable environment—this repository—not in one swollen prompt. A guide reconstructs context from `PROJECT.md`, `BACKLOG.md`, design notes, pushed closes, summaries, decisions, and cited raw evidence.

Compaction may help an active conversation, but no compacted chat summary becomes project truth. The guide should always be replaceable by a fresh task that reads the durable files. Later, if repository history becomes too large or information-dense for ordinary search and selective reading, an RLM-style query layer could decompose questions over project evidence and retain links to every source slice.

No RLM or StreamingLLM dependency belongs in the core submission. Revisit only when a measured guide-context fixture shows that current file retrieval, summaries, and Codex compaction miss relevant history. Any future approach must test both recall and temperament: recovering old evidence is insufficient if the long-lived guide becomes increasingly agreeable.
