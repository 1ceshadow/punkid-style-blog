---
title: Gemini API: Building Smart Apps
slug: gemini-api-intro
publishedAt: 2024-02-10
excerpt: Exploring the capabilities of Google's Gemini models for text generation and reasoning.
tags: [AI, Gemini, Tutorial]
---

Integrating AI into applications is easier than ever. Google's Gemini API provides a robust interface for reasoning, summarization, and generation.

### Getting Started

First, grab your API key. Then, initialize the client:

```typescript
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const response = await ai.models.generateContent({
  model: 'gemini-3-flash-preview',
  contents: 'Explain quantum computing to a 5 year old.',
});
```

The `gemini-3-flash-preview` model is incredibly fast and cost-effective for tasks like real-time chat or content summarization.
