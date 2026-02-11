export interface Post {
  id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  content: string; // Markdown-like string
  tags: string[];
  readingTime: string;
}

export interface SiteConfig {
  title: string;
  description: string;
  author: string;
  socials: {
    github: string;
    twitter: string;
  };
}
