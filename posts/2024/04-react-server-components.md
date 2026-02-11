---
title: Understanding React Server Components
slug: react-server-components
publishedAt: 2024-04-28
excerpt: A deep dive into how RSCs change the mental model of React development and data fetching.
tags: [React, Next.js, Engineering]
---

React Server Components (RSC) represent the biggest shift in the React ecosystem since Hooks. But what exactly problem do they solve?

### The Waterfall Problem

Traditionally, we fetched data inside components using `useEffect`. This often led to "waterfalls" where child components waited for parents to finish rendering before initiating their own data requests.

RSC allows us to move this data fetching to the server, closer to the database.

> "Server Components allow developers to build apps that span the server and client, combining the rich interactivity of client-side apps with the improved performance of traditional server rendering."

### When to use Client Components?

Use Client Components when you need:
- Interactivity (onClick, onChange)
- State (useState, useReducer)
- Lifecycle effects (useEffect)
- Browser-only APIs

Everything else can stay on the server.
