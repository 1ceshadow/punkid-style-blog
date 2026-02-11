---
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

```javascript
// Example of an Astro component
---
import Header from '../components/Header.jsx';
---
<Header />
<h1>Hello World</h1>
```

The hardest part was rewiring the data fetching layer, but Astro's content collections API made that type-safe and pleasant.
