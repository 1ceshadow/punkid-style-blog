export interface ParsedMarkdown {
  metadata: Record<string, any>;
  content: string;
}

/**
 * Parses a raw markdown string with YAML frontmatter.
 * Example input:
 * ---
 * title: Hello
 * tags: [a, b]
 * ---
 * # Content
 */
export const parseFrontmatter = (fileContent: string): ParsedMarkdown => {
  const frontmatterRegex = /^---\s*[\r\n]+([\s\S]*?)[\r\n]+---([\s\S]*)$/;
  const match = frontmatterRegex.exec(fileContent);

  if (!match) {
    return { metadata: {}, content: fileContent };
  }

  const frontmatterBlock = match[1];
  const content = match[2].trim();
  const metadata: Record<string, any> = {};

  // Simple YAML line parser (handles title: value and tags: [a, b])
  frontmatterBlock.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();

      // Remove quotes if present
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      if (value.startsWith("'") && value.endsWith("'")) {
        value = value.slice(1, -1);
      }

      // Handle array syntax like [tag1, tag2]
      if (value.startsWith('[') && value.endsWith(']')) {
        const arrayValue = value.slice(1, -1).split(',').map(v => v.trim());
        metadata[key] = arrayValue;
      } else {
        metadata[key] = value;
      }
    }
  });

  return { metadata, content };
};

/**
 * Calculates reading time for mixed English and Chinese content.
 * English: ~200 words per minute
 * Chinese: ~400 characters per minute
 */
export const calculateReadingTime = (text: string): string => {
  const words = text.trim().split(/\s+/g);
  let englishWordCount = 0;
  let chineseCharCount = 0;

  words.forEach(word => {
    // Check if word contains Chinese characters
    if (/[\u4e00-\u9fa5]/.test(word)) {
      chineseCharCount += word.length;
    } else {
      englishWordCount++;
    }
  });

  // Calculate minutes
  const enMinutes = englishWordCount / 200;
  const cnMinutes = chineseCharCount / 400;
  const totalMinutes = Math.ceil(enMinutes + cnMinutes);

  if (totalMinutes < 1) return "Less than 1 min read";
  return `${totalMinutes} min read`;
};
