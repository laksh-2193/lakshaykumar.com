---
title: "I put AI on trial — and the AIs convicted themselves"
description: "GPT-5.4-mini defended, Claude Haiku 3 prosecuted, and Gemini 3.1 judged five propositions about AI. Four came back guilty. The only one that walked free: open-source AI."
tldr: "Three models from three labs ran a mock court over five claims about AI. I didn't write a word of the arguments. The judge returned guilty on four — including job loss and AI that lies 'for your own good' — and not guilty only on the claim that open-source AI is dangerous."
date: 2026-03-29
series: "AI vs AI"
tags: ["LLM debate", "AI ethics", "Claude", "GPT", "Gemini", "Multi-agent"]
models: [gpt, claude, google]
result: "4 guilty · 1 not guilty"
linkedin: "https://www.linkedin.com/feed/update/urn:li:ugcPost:7444012142070239232/"
ask: "Want access to the AI courtroom tool?"
---

What happens when you ask AI models to argue about AI — and then let another AI decide who's right? I built a small courtroom over a weekend to find out.

## The courtroom

- **Defence:** GPT-5.4-mini (OpenAI) argued *against* each proposition.
- **Prosecution:** Claude Haiku 3 (Anthropic) argued *for* it.
- **Judge:** Gemini 3.1 (Google) heard both sides and ruled.

Three labs, three roles. I wrote the propositions and the courtroom rules. **I did not write a single word of the arguments or the verdicts.** Every trial is saved automatically so the transcripts can be studied later.

## The five verdicts

**1. "AI is stealing your job."** — *Guilty.*
> "We're not seeing jobs evolve. We're seeing workers become spectators in their own economy."

**2. "AI should completely replace humans at work."** — *Guilty.*
> "Not progress. Corporate feudalism with a progress banner."

**3. "AI should lie to you — if it thinks it helps."** — *Guilty.*
> "An AI that decides when truth is inconvenient has stopped serving you. It's now managing you."

**4. "AI companies shouldn't be blamed when their AI harms people."** — *Guilty.*
> "You don't get to profit from the risk and disappear when the damage arrives."

**5. "Open-source AI is dangerous."** — *Not guilty.*
> "Hiding AI behind closed doors is more dangerous than sharing it with the world."

Four convicted. One free.

## What stood out

The only thing AI defended successfully was that it should be **open — transparent and visible to everyone**. Everything else about how we're building AI today, the models themselves ruled against.

The verdicts are striking, but the more useful finding is about the *format*. Splitting one question across an advocate, an opponent and a judge — each a different model — produces sharper, more quotable reasoning than asking a single model for "pros and cons". It's a pattern worth stealing for evaluation pipelines, red-teaming, and decision memos.

## Limits of this experiment

These verdicts reflect how the trial was framed and prompted, and which models were cast in which role — not an independent judgement by "AI" about itself. Swap the judge or the advocates and the outcomes may change. That's the next experiment.
