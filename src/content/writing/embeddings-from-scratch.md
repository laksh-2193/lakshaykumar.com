---
title: "I built a word embeddings model from scratch — no libraries"
description: "Tokenisation, co-occurrence matrices, context windows and Word2Vec-style gradient descent, trained on my own dataset and visualised with PCA and t-SNE. What I learned about how meaning becomes math."
tldr: "Instead of calling SentenceTransformer or an embeddings API, I built one: raw text to vectors via tokenisation, co-occurrence windows and Word2Vec-style training, then checked the space with PCA and t-SNE. Biggest lessons: context windows shape meaning, and dimensionality reduction is a sanity check, not just a plot."
date: 2025-04-20
series: "From scratch"
tags: ["Embeddings", "NLP", "Word2Vec", "Python", "Machine learning"]
models: []
result: "Word2Vec-style, zero libraries"
linkedin: "https://www.linkedin.com/feed/update/urn:li:ugcPost:7319606035147542528/"
ask: "Want my notes or the code? I'm happy to share."
---

Most of us plug in `SentenceTransformer` or `OpenAIEmbeddings` and move on. I wanted to understand what happens under the hood — so I built one.

## What I built

- **Raw text → vector space**, end to end
- **Tokenisation**, **co-occurrence matrices** and **windowing**
- **Word2Vec-style training** with gradient descent
- Trained on **my own dataset**
- The resulting space **visualised with PCA and t-SNE**

## The pipeline, in plain terms

**1. Tokenise.** Split text into tokens and build a vocabulary. Every word becomes an integer id.

**2. Slide a context window.** For each word, look at the words within *k* positions on either side. Those neighbours are its context. Count how often each pair appears together and you have a co-occurrence matrix.

**3. Learn vectors.** Give every word a small random vector. Then nudge vectors with gradient descent so that words that appear in each other's context end up pointing in similar directions, and random pairs don't. That's the core idea behind Word2Vec's skip-gram objective.

**4. Inspect the space.** Project the learned vectors down to two dimensions with PCA (linear) and t-SNE (non-linear) and see whether related words cluster.

A minimal sketch of the training step looks like this:

```python
import numpy as np

V, D, lr = len(vocab), 50, 0.05
W_in  = np.random.randn(V, D) * 0.01   # word vectors
W_out = np.random.randn(V, D) * 0.01   # context vectors

def sigmoid(x): return 1 / (1 + np.exp(-x))

for center, context, label in training_pairs:   # label: 1 = real pair, 0 = negative sample
    v, u = W_in[center], W_out[context]
    grad = sigmoid(v @ u) - label
    W_in[center]   -= lr * grad * u
    W_out[context] -= lr * grad * v
```

## What I learned

- **Dimensionality reduction isn't just a plotting tool — it's a sanity check.** If the 2D projection is a shapeless cloud, something upstream is wrong.
- **Context windows actually shape meaning.** Small windows pull together words that are *interchangeable* (syntax). Larger windows pull together words that are *about the same thing* (topic).
- **"Close" vectors have a precise meaning.** Two words are close when they show up in similar contexts — not because the model knows what they mean.

Building it made me appreciate how elegant these models are, and gave me a real feel for how language gets encoded as math. If you're getting into NLP, I'd recommend doing this once before you go back to the APIs.
