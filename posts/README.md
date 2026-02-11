# 博客写作指南

## 📁 文件结构

所有博客文章存放在 `posts/` 目录下，按年份组织：

```
posts/
├── 2024/
│   ├── 05-migrating-to-astro.md
│   ├── 04-react-server-components.md
│   └── ...
├── 2025/
└── 2026/
    └── 02-glm-flash-guide.md
```

## ✍️ 创建新文章

### 1. 文章模板

在 `posts/年份/` 目录下创建 `.md` 文件，使用以下模板：

```markdown
---
title: 文章标题
slug: url-friendly-slug
publishedAt: 2026-02-11
excerpt: 一句话简介，会在列表页显示
tags: [Tag1, Tag2, Tag3]
---

文章正文内容从这里开始...

## 二级标题

正文段落。

### 三级标题

更多内容。
```

## 🎨 支持的 Markdown 特性

### 基础语法
- **粗体** `**粗体**`
- *斜体* `*斜体*`
- `行内代码` `` `行内代码` ``
- [链接](url) `[链接](url)`

### 代码块（支持语法高亮）

````markdown
```typescript
const greeting: string = "Hello World";
console.log(greeting);
```
````

支持 50+ 语言：`typescript`, `python`, `bash`, `css`, `html` 等

**注意**：行内代码使用单个反引号 `` ` ``，样式为带边框的红色高亮；代码块使用三个反引号，支持语法高亮和复制功能。

### 数学公式（LaTeX）

本系统支持使用 KaTeX 渲染 LaTeX 数学公式。

**行内公式**（使用 `$...$`）：
```markdown
欧拉公式：$e^{i\pi} + 1 = 0$
勾股定理：$a^2 + b^2 = c^2$
```

**行间公式**（使用 `$$...$$`）：
```markdown
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
```

**复杂公式示例**：
```markdown
$$
\begin{bmatrix}
a & b \\
c & d
\end{bmatrix}
\begin{bmatrix}
x \\
y
\end{bmatrix}
=
\begin{bmatrix}
ax + by \\
cx + dy
\end{bmatrix}
$$
```

### 表格

```markdown
| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 数据1 | 数据2 | 数据3 |
```

### 块引用

```markdown
> 这是一段引用文字
```

### 列表

**无序列表**：
```markdown
- 项目 1
- 项目 2
  - 子项目 2.1
```

**有序列表**：
```markdown
1. 第一步
2. 第二步
3. 第三步
```

### 脚注

```markdown
这是正文内容[^1]。

[^1]: 这是脚注的内容，会自动显示在文章底部
```

### 图片

```markdown
![图片描述](/images/posts/your-image.jpg)
```

图片建议放在 `public/images/posts/` 目录下

## 🚀 构建流程

1. 在 `posts/年份/` 下创建 `.md` 文件
2. 填写 frontmatter（`---` 包裹的元数据）
3. 编写正文内容
4. 保存文件
5. 应用会自动检测并加载新文章

**无需手动修改任何代码文件！**

## 💡 最佳实践

### Frontmatter 字段说明

| 字段 | 必填 | 说明 | 示例 |
|------|------|------|------|
| title | ✅ | 文章标题 | `GLM-4.7 实战指南` |
| slug | ✅ | URL 路径（英文） | `glm-flash-guide` |
| publishedAt | ✅ | 发布日期 (YYYY-MM-DD) | `2026-02-11` |
| excerpt | ✅ | 摘要（建议 50-100 字） | `手把手教你接入 GLM API` |
| tags | ✅ | 标签数组 | `[AI, Tutorial, TypeScript]` |

### 标签推荐

技术类：`TypeScript`, `React`, `AI`, `Tutorial`, `Performance`  
设计类：`Design`, `UI/UX`, `CSS`, `Typography`  
其他：`Web`, `Engineering`, `Philosophy`

### SEO 优化建议

1. **标题**：简洁明了，包含关键词，控制在 60 字符内
2. **摘要**：吸引人的一句话描述，包含核心价值
3. **Slug**：使用英文，用短横线分隔，如 `glm-flash-guide`
4. **标签**：3-5 个最相关的标签

## 📝 示例

查看以下示例文章获取完整演示：

**`posts/2026/02-glm-flash-guide.md`** - 综合示例：
- ✅ 表格
- ✅ 代码块（TypeScript、Python、Bash）
- ✅ 脚注
- ✅ 引用
- ✅ 列表

**`posts/2026/02-markdown-features-test.md`** - 功能测试：
- ✅ 行内代码 vs 代码块对比
- ✅ LaTeX 数学公式（行内和行间）
- ✅ 代码与公式混合排版
- ✅ 表格与公式结合

## 🐛 常见问题

**Q: 文章没有显示？**  
A: 检查 frontmatter 格式是否正确，特别是 `---` 包裹和字段拼写

**Q: 代码块没有语法高亮？**  
A: 确保在 ``` 后面指定了语言名称，如 ```typescript

**Q: 图片无法显示？**  
A: 确认图片路径是相对于 `public/` 的，如 `/images/posts/xxx.jpg`

**Q: 数学公式无法显示？**  
A: 
- 行内公式使用 `$...$`（单个美元符号）
- 行间公式使用 `$$...$$`（双美元符号）
- 确保公式语法符合 LaTeX 规范

**Q: 行内代码样式不明显？**  
A: 新版本行内代码使用红色边框高亮，与普通文本有明显区别

---

Happy Writing! ✨
