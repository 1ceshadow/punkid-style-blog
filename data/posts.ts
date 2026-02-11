// This file simulates a folder containing .md files.
// In a real file system, these would be separate files (e.g., posts/post1.md).

export const RAW_MD_FILES = [
  `---
title: Migrating to Astro 4.0
slug: migrating-to-astro
publishedAt: 2024-05-12
excerpt: Reflecting on the performance wins and migration strategy for moving this blog to the newest version of Astro.
tags: [Astro, Performance, Web]
---

The web is constantly evolving, and so are the tools we use to build it. Recently, I decided to migrate this personal blog from Next.js to Astro 4.0. The results have been nothing short of spectacular.

### Why Astro?

Astro's "Island Architecture" allows us to ship zero JavaScript to the client by default. This is a game-changer for content-heavy sites like blogs.

1. **Performance**: Google Lighthouse scores hit 100 across the board.
2. **Simplicity**: No complex hydration logic unless explicitly requested.
3. **DX**: The authoring experience with Markdown and MDX is superb.

### The Migration Process

Moving components was straightforward. Astro supports React components out of the box, so I reused my existing UI library.

\`\`\`javascript
// Example of an Astro component
---
import Header from '../components/Header.jsx';
---
<Header />
<h1>Hello World</h1>
\`\`\`

The hardest part was rewiring the data fetching layer, but Astro's content collections API made that type-safe and pleasant.`,

  `---
title: Understanding React Server Components
slug: react-server-components
publishedAt: 2024-04-28
excerpt: A deep dive into how RSCs change the mental model of React development and data fetching.
tags: [React, Next.js, Engineering]
---

React Server Components (RSC) represent the biggest shift in the React ecosystem since Hooks. But what exactly problem do they solve?

### The Waterfall Problem

Traditionally, we fetched data inside components using \`useEffect\`. This often led to "waterfalls" where child components waited for parents to finish rendering before initiating their own data requests.

RSC allows us to move this data fetching to the server, closer to the database.

> "Server Components allow developers to build apps that span the server and client, combining the rich interactivity of client-side apps with the improved performance of traditional server rendering."

### When to use Client Components?

Use Client Components when you need:
- Interactivity (onClick, onChange)
- State (useState, useReducer)
- Lifecycle effects (useEffect)
- Browser-only APIs

Everything else can stay on the server.`,

  `---
title: The Art of Minimalist Design
slug: minimalist-design
publishedAt: 2024-03-15
excerpt: Why less is often more when it comes to digital product design and user interfaces.
tags: [Design, UI/UX, Philosophy]
---

Minimalism isn't just about using white space; it's about removing distractions to focus on what truly matters. In UI design, this translates to clarity.

**Key Principles:**

*   **Negative Space**: Gives the eye a place to rest.
*   **Typography**: The voice of your content.
*   **Contrast**: Directs attention without shouting.

When designing this blog, I looked at print editorial design. The rigid grid systems and careful font selection of magazines translate beautifully to the web.`,

  `---
title: Gemini API: Building Smart Apps
slug: gemini-api-intro
publishedAt: 2024-02-10
excerpt: Exploring the capabilities of Google's Gemini models for text generation and reasoning.
tags: [AI, Gemini, Tutorial]
---

Integrating AI into applications is easier than ever. Google's Gemini API provides a robust interface for reasoning, summarization, and generation.

### Getting Started

First, grab your API key. Then, initialize the client:

\`\`\`typescript
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const response = await ai.models.generateContent({
  model: 'gemini-3-flash-preview',
  contents: 'Explain quantum computing to a 5 year old.',
});
\`\`\`

The \`gemini-3-flash-preview\` model is incredibly fast and cost-effective for tasks like real-time chat or content summarization.`,

  `---
title: 探索中文排版之美 (Chinese Typography)
slug: chinese-typography
publishedAt: 2024-06-01
excerpt: 探讨在现代 Web 设计中如何处理中文排版，以及中西文混排的最佳实践。
tags: [Design, Typography, CSS]
---

中文排版（Typography）在 Web 设计中一直是一个容易被忽视但极其重要的领域。不同于西文，汉字是方块字，具有独特的网格特性。

### 核心原则

1. **行高 (Line Height)**: 中文通常需要比西文更大的行高。推荐设置为 1.5 到 1.8 之间，以保证良好的阅读体验。
2. **字间距 (Letter Spacing)**: CSS 的 \`letter-spacing\` 通常不适用于中文正文，除非是为了特殊的标题效果。
3. **中西文混排**: 

当汉字与拉丁字母（English）混排时，由于视觉重心的不同，建议在汉字与英文之间增加 1/4 个汉字宽度的空格（Pangu spacing）。

> "排版是文字的衣服。" —— 好的排版能让信息传递更高效。

### CSS 实现

\`\`\`css
article {
  font-family: -apple-system, "Noto Sans SC", "Microsoft YaHei", sans-serif;
  line-height: 1.75;
  text-align: justify;
}
\`\`\`

在设计这个博客时，我特意测试了 JetBrains Mono 和系统默认中文字体的搭配效果。
`
];
