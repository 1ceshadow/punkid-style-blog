import { Post, SiteConfig } from './types';
import { loadAllPosts } from './utils/postLoader';
import { parseFrontmatter, calculateReadingTime } from './utils/markdownUtils';

export const SITE_CONFIG: SiteConfig = {
  title: "DevLog",
  description: "Notes on code, design, and life.",
  author: "Alex Dev",
  socials: {
    github: "https://github.com/1ceshadow",
  }
};

// Load posts from /posts directory
const RAW_MD_FILES = loadAllPosts();

// Transform Raw Markdown Files into Post Objects
export const MOCK_POSTS: Post[] = RAW_MD_FILES.map((rawFile, index) => {
  const { metadata, content } = parseFrontmatter(rawFile);
  
  return {
    id: String(index + 1),
    title: metadata.title || "Untitled Post",
    slug: metadata.slug || `post-${index}`,
    publishedAt: metadata.publishedAt || new Date().toISOString().split('T')[0],
    excerpt: metadata.excerpt || content.slice(0, 100) + "...",
    tags: Array.isArray(metadata.tags) ? metadata.tags : [],
    readingTime: calculateReadingTime(content), // Dynamic calculation
    content: content // Content stripped of frontmatter
  };
}).sort((a, b) => {
  // 按发布日期降序排列
  return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
});
