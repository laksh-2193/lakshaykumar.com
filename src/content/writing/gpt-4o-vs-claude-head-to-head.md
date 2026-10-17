---
title: "GPT-4o vs Claude 3.5 Sonnet: two minds, one board"
description: "A small Python script pitted GPT-4o against Claude 3.5 Sonnet in a head-to-head game. Claude played from behind and adapted; GPT-4o systematically cleared pieces. The personalities were the surprise."
tldr: "I simulated a game between GPT-4o and Claude 3.5 Sonnet. Claude often looked like it was losing early, then quietly adjusted and won. GPT-4o was laser-focused on clearing its opponent's pieces. Same rules, very different styles."
date: 2025-09-08
series: "AI vs AI"
tags: ["LLM comparison", "GPT-4o", "Claude", "AI experiment", "Python"]
models: [gpt, claude]
result: "Claude comes back to win"
linkedin: "https://www.linkedin.com/feed/update/urn:li:ugcPost:7370842034783526912/"
ask: "Have a pair of models you'd like to see go head-to-head?"
---

This one started as curiosity: what happens when two AIs go head-to-head on the same board?

## The setup

A small Python script ran a game between **OpenAI's GPT-4o** and **Anthropic's Claude 3.5 Sonnet**. Each model received the board state, chose its move, and the script applied it and handed the turn over. No human moves, no hints.

## What I saw

What surprised me wasn't who won. It was the **personality** each model showed.

- **Claude 3.5 Sonnet** often looked like it was losing at first. Then it would quietly adjust, change its plan, and somehow pull off the win at the end.
- **GPT-4o** was laser-focused on one thing: systematically clearing out its opponent's pieces.

It felt less like code running and more like watching two different minds approach the same problem in their own way.

## Why it's worth doing

Head-to-head games are a cheap, honest way to see how a model plans. There's no rubric to game and no single right answer — just a sequence of decisions and a result. You see whether a model sticks to a strategy, adapts when it's behind, or tunnels on a local objective.

That instinct — *watch the behaviour, not just the output* — is what later became the [AI trading arena](/writing/ai-trading-arena/) and the [AI courtroom](/writing/ai-models-on-trial/).

## Limits of this experiment

A handful of games between two model versions is an anecdote, not a benchmark. Both models have since been superseded. The point is the method: put models in the same loop and watch what they do.
