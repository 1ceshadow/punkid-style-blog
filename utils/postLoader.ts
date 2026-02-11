/**
 * 文章加载工具
 * 从 posts/ 目录动态加载所有 Markdown 文件
 */

interface PostFile {
  default: string;
}

/**
 * 使用 Vite 的 import.meta.glob 加载所有 .md 文件
 * eager: true 表示立即加载，返回内容而非 Promise
 */
export function loadAllPosts(): string[] {
  const postFiles = import.meta.glob<PostFile>('/posts/**/*.md', {
    eager: true,
    query: '?raw',
    import: 'default'
  });

  const posts: string[] = [];

  for (const path in postFiles) {
    const content = postFiles[path] as unknown as string;
    posts.push(content);
  }

  return posts;
}

/**
 * 按年份加载文章
 */
export function loadPostsByYear(year: number): string[] {
  const allPosts = loadAllPosts();
  return allPosts.filter(post => {
    const match = post.match(/publishedAt:\s*(\d{4})-/);
    return match && parseInt(match[1]) === year;
  });
}

/**
 * 按标签加载文章
 */
export function loadPostsByTag(tag: string): string[] {
  const allPosts = loadAllPosts();
  return allPosts.filter(post => {
    const match = post.match(/tags:\s*\[(.*?)\]/);
    return match && match[1].includes(tag);
  });
}
