---
title: Markdown 渲染功能测试
slug: markdown-features-test
publishedAt: 2026-02-11
excerpt: 测试博客系统的各种 Markdown 渲染功能，包括行内代码、代码块、数学公式等。
tags: [Test, Markdown, LaTeX]
---

本文用于测试博客系统的 Markdown 渲染功能。

## 代码渲染测试

### 行内代码 vs 代码块

这是一个行内代码示例：`const greeting = "Hello World"`，注意它的样式与普通文本有明显区别。

多个行内代码：`npm install`、`yarn dev`、`process.env.API_KEY`

下面是代码块示例：

```typescript
// 这是一个代码块，有语法高亮和复制按钮
interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];

function findUser(id: number): User | undefined {
  return users.find(user => user.id === id);
}
```

Python 示例：

```python
def fibonacci(n):
    """计算第 n 个斐波那契数"""
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# 使用示例
result = fibonacci(10)
print(f"第 10 个斐波那契数是: {result}")
```

## 数学公式测试

### 行内公式

勾股定理：$a^2 + b^2 = c^2$

欧拉公式：$e^{i\pi} + 1 = 0$

二次方程求根公式：$x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}$

### 行间公式（展示模式）

麦克斯韦方程组：

$$
\begin{aligned}
\nabla \cdot \mathbf{E} &= \frac{\rho}{\varepsilon_0} \\
\nabla \cdot \mathbf{B} &= 0 \\
\nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t} \\
\nabla \times \mathbf{B} &= \mu_0\mathbf{J} + \mu_0\varepsilon_0\frac{\partial \mathbf{E}}{\partial t}
\end{aligned}
$$

傅里叶变换：

$$
F(\omega) = \int_{-\infty}^{\infty} f(t) e^{-i\omega t} dt
$$

矩阵表示：

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

### 概率与统计

正态分布概率密度函数：

$$
f(x) = \frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{(x-\mu)^2}{2\sigma^2}}
$$

贝叶斯定理：

$$
P(A|B) = \frac{P(B|A) \cdot P(A)}{P(B)}
$$

## 混合使用示例

在机器学习中，我们经常使用 `softmax` 函数来将 logits 转换为概率分布：

$$
\text{softmax}(x_i) = \frac{e^{x_i}}{\sum_{j=1}^{n} e^{x_j}}
$$

实现代码如下：

```python
import numpy as np

def softmax(x):
    """计算 softmax 函数"""
    exp_x = np.exp(x - np.max(x))  # 减去最大值以提高数值稳定性
    return exp_x / np.sum(exp_x)

# 示例
logits = np.array([2.0, 1.0, 0.1])
probabilities = softmax(logits)
print(probabilities)  # [0.659, 0.242, 0.099]
```

损失函数常用交叉熵 `cross_entropy`：

$$
L = -\sum_{i=1}^{n} y_i \log(\hat{y}_i)
$$

其中 $y_i$ 是真实标签，$\hat{y}_i$ 是预测概率。

## 表格与公式结合

| 函数 | 公式 | 用途 |
|------|------|------|
| Sigmoid | $\sigma(x) = \frac{1}{1+e^{-x}}$ | 二分类激活函数 |
| ReLU | $\text{ReLU}(x) = \max(0, x)$ | 常用激活函数 |
| Tanh | $\tanh(x) = \frac{e^x - e^{-x}}{e^x + e^{-x}}$ | 双曲正切函数 |

## 总结

本文测试了：

- ✅ **行内代码**：使用 `特殊样式` 与普通文本明显区分
- ✅ **代码块**：支持语法高亮、行号、复制按钮
- ✅ **行内数学公式**：使用 `$...$` 包裹
- ✅ **行间数学公式**：使用 `$$...$$` 包裹
- ✅ **混合排版**：代码与公式无缝结合

所有功能均正常工作！🎉
