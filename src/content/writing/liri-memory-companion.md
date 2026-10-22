---
title: "Liri: building a memory companion inside Telegram"
description: "Liri is a lightweight agentic AI that lives in Telegram, listens to voice notes and text, and brings back the small things you’d otherwise forget."
tldr: "I kept saying 'I’ll remember that later' and never did. So I built Liri — a Telegram companion that understands intent, remembers voice and text, and surfaces things when you need them. Built for myself first; now in private beta."
date: 2025-10-09
series: "Build log"
tags: ["Agentic AI", "Personal assistant", "Telegram bot", "Side project", "Memory"]
models: []
result: "Private beta"
linkedin: "https://www.linkedin.com/feed/update/urn:li:ugcPost:7382163130560299008/"
ask: "Want to try Liri? Ask for a beta link."
---

There’s a thing I used to say all the time: *"I’ll remember that later."* I rarely did.

Little ideas on walks. Things people said in passing. Half-written to-dos scattered across five apps. All gone by the next morning.

So I built **Liri**.

## What it is

Liri lives inside Telegram, but it feels more like a small memory companion than a bot. You talk to it — by voice note or text — and it listens and remembers.

- Thoughts and ideas you don’t want to lose
- Reminders, without opening a calendar
- Small things, like *"where’s my pendrive?"*

Liri keeps track quietly and brings things back up when you need them.

## How it works

Under the hood it’s what I call a **lightweight agentic AI**:

- **Intent first.** Every message is classified — is this something to store, something to remind about, or a question about the past?
- **It acts on its own.** Once the intent is clear, Liri does the thing: saves the memory, schedules the nudge, or retrieves the answer.
- **Voice and text in one memory.** Spoken and typed notes end up in the same place, so you can ask for something you said out loud last week.

## Why Telegram

The best interface for capture is the one you already have open. Building inside a chat app removed the hardest problem — getting people to open *another* app — and let me focus on memory and retrieval.

## Status

I started it to manage the chaos in my own head. It’s now in private beta, and I’d genuinely love feedback from people who forget things as often as I do.
