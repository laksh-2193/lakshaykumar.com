---
title: "I gave four AI models $10,000 each and let them trade"
description: "Claude Sonnet 4.6, GPT-5.4, DeepSeek v3.5 and Gemma 4 traded the same simulated market for 20 rounds with identical data and prompts. Claude won — on discipline, not intelligence."
tldr: "Same capital, same data, same prompts, 20 rounds, no human in the loop. Claude Sonnet 4.6 finished +5.26%, DeepSeek v3.5 +4.98%, Gemma 4 never traded (0.00%), and GPT-5.4 lost 0.23%. The gap came from how each model acted on signals it all agreed on."
date: 2026-04-05
series: "AI vs AI"
tags: ["LLM comparison", "AI agents", "Claude", "GPT", "DeepSeek", "Gemma", "Fintech"]
models: [claude, gpt, deepseek, google]
result: "Claude +5.26% · GPT −0.23%"
linkedin: "https://www.linkedin.com/feed/update/urn:li:ugcPost:7446436189643104257/"
ask: "Want to run the trading arena in your own environment?"
featured: true
figure: arena
---

Benchmarks tell you what a model *knows*. They rarely tell you how it *behaves* when it has to make a decision, live with it, and make another one. So I built a small arena to find out.

## The setup

Four models, each wrapped as a trading agent:

- **ClaudeTrader** — Claude Sonnet 4.6 (Anthropic)
- **GPTQuant** — GPT-5.4 (OpenAI)
- **DeepSeekPro** — DeepSeek v3.5 (DeepSeek AI)
- **GemmaBot** — Gemma 4 (Google)

Every agent got the same rules:

- **$10,000** starting capital
- **20 rounds** on a simulated market
- **The same market data and the same prompts** each round
- **No human intervention** once the run started

One job: trade better than the others.

## The results

The run went to the final round before it was decided.

| Rank | Agent | Model | Final value | Return |
| --- | --- | --- | --- | --- |
| 1 | ClaudeTrader | Claude Sonnet 4.6 | $10,526 | +5.26% |
| 2 | DeepSeekPro | DeepSeek v3.5 | $10,498 | +4.98% |
| 3 | GemmaBot | Gemma 4 | $10,000 | 0.00% |
| 4 | GPTQuant | GPT-5.4 | $9,977 | −0.23% |

## What actually separated them

It wasn't intelligence. It was **discipline**.

At round 1 the market's RSI was above 0.99. Every model read it the same way: overbought, hold. They agreed on the signal. What they did *next* is where they split.

- **ClaudeTrader** sold into overbought signals early, locked in gains, and re-entered selectively on dips — consistently, across all 20 rounds.
- **DeepSeekPro** rode momentum hard and nearly caught up. It finished $28 short.
- **GemmaBot** never placed a single trade. All cash, the whole game. Zero risk, zero reward.
- **GPTQuant** over-analysed every RSI reading and second-guessed itself into a small loss.

## Why this matters if you're building agents

Agreeing on the facts is not the same as acting well on them. Give four models the same data and prompts and you still get four different risk profiles — one decisive, one aggressive, one frozen, one indecisive. Over many steps, those differences compound.

If you're putting an LLM in a loop where it acts repeatedly — trading, triage, procurement, support routing — test its *behaviour over many turns*, not just its answer to one question. A model that's slightly worse on a benchmark can be far better as an agent if it commits to decisions and doesn't thrash.

## Limits of this experiment

This is one run on one simulated market. The spread between first and second place is small, and a different seed, prompt, or market regime could reorder the table. Treat it as a look at model *temperament*, not a recommendation to let any of them near real money.
