---
title: "Face recognition with just NumPy and PCA (eigenfaces)"
description: "A face recognition system built with only NumPy, PCA and a few lines of Python — no TensorFlow, no PyTorch. Fast, explainable, and the best way to understand how machines recognise faces."
tldr: "You don’t need deep learning to understand face recognition. Using eigenfaces — PCA over flattened face images — and nearest-neighbour matching, I built a recogniser in plain NumPy that works, runs fast, and can be explained step by step."
date: 2025-04-12
series: "From scratch"
tags: ["Computer vision", "PCA", "Eigenfaces", "NumPy", "Python", "Face recognition"]
models: []
result: "Recogniser in pure NumPy"
linkedin: "https://www.linkedin.com/feed/update/urn:li:ugcPost:7316716888590295040/"
ask: "Want the full breakdown with code and visuals?"
---

Most tutorials jump straight into black-box models. But if you really want to understand how machines recognise faces, start with **eigenfaces**.

One weekend I built a basic face recognition system using only **NumPy**, **PCA**, and a few lines of Python. No TensorFlow, no PyTorch — just linear algebra.

The result:

- **It works.**
- **It’s fast.**
- **It’s explainable** — you can see the *how* and the *why* at every step.

## How eigenfaces work

**1. Flatten every face.** A 64×64 grayscale image becomes a vector of 4,096 numbers. Stack your training faces into a matrix.

**2. Subtract the mean face.** Average all the images to get the "mean face", then subtract it from each image so you’re modelling only the differences.

**3. Find the principal components.** PCA finds the directions in which faces vary the most. Reshape each direction back into an image and you get a ghostly face — an **eigenface**. A few dozen of them capture most of the variation.

**4. Project and compare.** Represent every face by its weights on those eigenfaces — a short vector instead of 4,096 pixels. To recognise a new face, project it the same way and find the nearest known face.

```python
import numpy as np

X = faces.reshape(len(faces), -1).astype(float)   # (n_images, n_pixels)
mean = X.mean(axis=0)
A = X - mean

# SVD gives the principal components without building the huge covariance matrix
_, _, Vt = np.linalg.svd(A, full_matrices=False)
eigenfaces = Vt[:50]                               # top 50 components

train_w = A @ eigenfaces.T                         # weights for known faces

def recognise(img):
    w = (img.reshape(-1) - mean) @ eigenfaces.T
    return labels[np.argmin(np.linalg.norm(train_w - w, axis=1))]
```

## Why bother, in the age of deep learning?

Because you can **build it from scratch, visualise every step, and explain it to anyone** — even without a CS degree. Seeing eigenfaces makes the idea behind every modern embedding click: compress something high-dimensional into a few numbers that keep what matters, then compare by distance.

It’s the same intuition behind the [embeddings model I built from scratch](/writing/embeddings-from-scratch/) a week later.

## Limits

Eigenfaces are sensitive to lighting, pose and alignment, and they won’t match modern deep models on messy real-world photos. As a learning tool, though, nothing beats them.
