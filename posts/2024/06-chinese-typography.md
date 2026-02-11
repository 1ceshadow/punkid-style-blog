---
title: 探索中文排版之美 (Chinese Typography)
slug: chinese-typography
publishedAt: 2024-06-01
excerpt: 探讨在现代 Web 设计中如何处理中文排版，以及中西文混排的最佳实践。
tags: [Design, Typography, CSS]
---

中文排版（Typography）在 Web 设计中一直是一个容易被忽视但极其重要的领域。不同于西文，汉字是方块字，具有独特的网格特性。

### 核心原则

1. **行高 (Line Height)**: 中文通常需要比西文更大的行高。推荐设置为 1.5 到 1.8 之间，以保证良好的阅读体验。
2. **字间距 (Letter Spacing)**: CSS 的 `letter-spacing` 通常不适用于中文正文，除非是为了特殊的标题效果。
3. **中西文混排**: 

当汉字与拉丁字母（English）混排时，由于视觉重心的不同，建议在汉字与英文之间增加 1/4 个汉字宽度的空格（Pangu spacing）。

> "排版是文字的衣服。" —— 好的排版能让信息传递更高效。

### CSS 实现

```css
article {
  font-family: -apple-system, "Noto Sans SC", "Microsoft YaHei", sans-serif;
  line-height: 1.75;
  text-align: justify;
}
```

在设计这个博客时，我特意测试了 JetBrains Mono 和系统默认中文字体的搭配效果。
