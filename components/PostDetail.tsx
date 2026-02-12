import React, { useState, useMemo } from 'react';
import { Post } from '../types';
import { ArrowLeft, Sparkles, Hash, Calendar, Copy, Check } from 'lucide-react';
import { generatePostSummary } from '../services/glmService';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkFootnotes from 'remark-footnotes';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import 'katex/dist/katex.min.css';

interface PostDetailProps {
  post: Post;
  onBack: () => void;
}

export const PostDetail: React.FC<PostDetailProps> = ({ post, onBack }) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<string | null>(null);

  const handleGenerateSummary = async () => {
    setIsLoadingSummary(true);
    const result = await generatePostSummary(post.content);
    setSummary(result);
    setIsLoadingSummary(false);
  };

  const copyToClipboard = async (code: string, index: string) => {
    let copied = false;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(code);
        copied = true;
      }
    } catch (error) {
      copied = false;
    }

    if (!copied) {
      const textarea = document.createElement('textarea');
      textarea.value = code;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();

      try {
        copied = document.execCommand('copy');
      } catch (error) {
        copied = false;
      }

      document.body.removeChild(textarea);
    }

    if (copied) {
      setCopiedCodeIndex(index);
      setTimeout(() => setCopiedCodeIndex(null), 2000);
    }
  };

  // Custom renderers for various Markdown elements
  const customComponents = useMemo(() => ({
    // Custom Code Block Renderer
    code: ({ node, inline, className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || '');
      const isInline = inline || !match;
      const codeString = String(children).replace(/\n$/, '');
      
      // Inline Code - Gemini Styled
      if (isInline) {
        return (
          <code 
            className="px-1.5 py-0.5 mx-0.5 rounded-md bg-slate-100 dark:bg-slate-800/50 text-rose-600 dark:text-rose-300 font-mono text-[0.85em] border border-slate-200 dark:border-slate-700/50 align-middle tracking-tight"
            {...props}
          >
            {children}
          </code>
        );
      }

      // Code Block - Modern Editor Style
      const language = match ? match[1] : 'text';
      // Use code content as stable ID to fix "Copied" state flickering on re-render
      const uniqueId = `${language}:${codeString}`;

      let highlighted = codeString;
      try {
        if (language && hljs.getLanguage(language)) {
          highlighted = hljs.highlight(codeString, { language, ignoreIllegals: true }).value;
        } else {
          highlighted = hljs.highlightAuto(codeString).value;
        }
      } catch (e) {
        // Fallback
      }

      return (
        <div className="group my-6 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1117] shadow-sm hover:shadow-md transition-all duration-300">
          {/* Editor Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-[#161b22] border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider select-none">
                {language}
              </span>
            </div>
            
            <button
              onClick={() => copyToClipboard(codeString, uniqueId)}
              className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-all active:scale-95"
              aria-label="Copy code"
            >
              {copiedCodeIndex === uniqueId ? (
                <>
                  <Check size={14} className="text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-500">Copied</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <div className="relative">
             {/* Code Content */}
            <pre className="!m-0 !p-4 overflow-x-auto bg-white dark:bg-[#0d1117] text-sm leading-relaxed">
              <code 
                className={`!bg-transparent !p-0 font-mono hljs language-${language}`}
                dangerouslySetInnerHTML={{ __html: highlighted }}
              />
            </pre>
          </div>
        </div>
      );
    },

    // Pre 元素 - 确保代码块正确嵌套
    pre: ({ node, children, ...props }: any) => {
      // 如果子元素是 code，直接返回 children（让 code 组件处理）
      return <>{children}</>;
    },

    // 表格
    table: ({ node, children, ...props }: any) => (
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-slate-300 dark:border-slate-700">
          {children}
        </table>
      </div>
    ),
    thead: ({ node, children, ...props }: any) => (
      <thead className="bg-slate-100 dark:bg-slate-800">
        {children}
      </thead>
    ),
    tbody: ({ node, children, ...props }: any) => (
      <tbody>
        {children}
      </tbody>
    ),
    tr: ({ node, children, ...props }: any) => (
      <tr className="border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        {children}
      </tr>
    ),
    td: ({ node, children, ...props }: any) => (
      <td className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-slate-700 dark:text-slate-300">
        {children}
      </td>
    ),
    th: ({ node, children, ...props }: any) => (
      <th className="border border-slate-300 dark:border-slate-700 px-4 py-2 text-left font-semibold text-slate-900 dark:text-slate-100">
        {children}
      </th>
    ),

    // 图片优化
    img: ({ src, alt, ...props }: any) => (
      <figure className="my-8">
        <img 
          src={src} 
          alt={alt} 
          className="rounded-lg shadow-md w-full max-h-96 object-cover hover:shadow-lg transition-shadow"
          loading="lazy"
          {...props}
        />
        {alt && <figcaption className="text-center text-xs text-slate-500 mt-2 font-mono">{alt}</figcaption>}
      </figure>
    ),

    // 标题
    h1: ({ node, children, ...props }: any) => (
      <h1 className="text-3xl font-bold mt-12 mb-6 text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-4" {...props}>
        {children}
      </h1>
    ),
    h2: ({ node, children, ...props }: any) => (
      <h2 className="text-2xl font-bold mt-10 mb-5 text-slate-900 dark:text-white" {...props}>
        {children}
      </h2>
    ),
    h3: ({ node, children, ...props }: any) => (
      <h3 className="text-xl font-bold mt-8 mb-4 text-slate-800 dark:text-slate-100" {...props}>
        {children}
      </h3>
    ),
    h4: ({ node, children, ...props }: any) => (
      <h4 className="text-lg font-semibold mt-6 mb-3 text-slate-800 dark:text-slate-100" {...props}>
        {children}
      </h4>
    ),

    // 段落
    p: ({ node, children, ...props }: any) => (
      <p className="mb-4 leading-7 text-slate-700 dark:text-slate-300" {...props}>
        {children}
      </p>
    ),

    // 块引用
    blockquote: ({ node, children, ...props }: any) => (
      <blockquote className="border-l-4 border-indigo-500 pl-4 italic my-6 text-slate-600 dark:text-slate-400 bg-indigo-50 dark:bg-indigo-900/10 py-3 pr-4 rounded-r-lg" {...props}>
        {children}
      </blockquote>
    ),

    // 链接
    a: ({ node, href, children, ...props }: any) => (
      <a 
        href={href} 
        className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium transition-colors"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    ),

    // 列表
    ul: ({ node, children, ...props }: any) => (
      <ul className="ml-6 mb-4 space-y-2" {...props}>
        {children}
      </ul>
    ),
    ol: ({ node, children, ...props }: any) => (
      <ol className="ml-6 mb-4 space-y-2 list-decimal" {...props}>
        {children}
      </ol>
    ),
    li: ({ node, children, ...props }: any) => (
      <li className="text-slate-700 dark:text-slate-300 list-item marker:text-indigo-500" {...props}>
        {children}
      </li>
    ),

    // 水平线
    hr: ({ ...props }: any) => (
      <hr className="my-8 border-slate-200 dark:border-slate-800" {...props} />
    ),

    // 脚注 - 由 remark-footnotes 处理
    section: ({ node, children, ...props }: any) => {
      const isFootnotes = (node as any)?.data?.hProperties?.className?.includes('footnotes');
      if (isFootnotes) {
        return (
          <section className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800" {...props}>
            <div className="text-sm space-y-2 text-slate-600 dark:text-slate-400">
              {children}
            </div>
          </section>
        );
      }
      return <section {...props}>{children}</section>;
    },
  }), [copiedCodeIndex]);

  return (
    <article className="animate-fade-in-up">
      <button 
        onClick={onBack}
        className="group flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 mb-8 transition-colors"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to list
      </button>

      <header className="mb-10">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map(tag => (
            <span key={tag} className="flex items-center text-xs font-mono font-medium text-indigo-500 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-1 rounded-md">
              <Hash size={10} className="mr-1" /> {tag}
            </span>
          ))}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-sm font-mono text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <Calendar size={14} /> {post.publishedAt}
          </span>
          <span>•</span>
          <span>{post.readingTime}</span>
        </div>
      </header>

      {/* AI Summary Section */}
      <div className="mb-10 p-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-white dark:from-slate-800 dark:to-slate-900 border border-indigo-100 dark:border-slate-700 shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between mb-3 relative z-10">
           <h3 className="text-sm font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-2">
             <Sparkles size={16} className="text-indigo-500" />
             AI TL;DR
           </h3>
           {!summary && !isLoadingSummary && (
             <button 
               onClick={handleGenerateSummary}
               className="text-xs bg-white dark:bg-slate-700 hover:bg-indigo-50 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 px-3 py-1.5 rounded-full transition-all shadow-sm font-medium"
             >
               Generate Summary
             </button>
           )}
        </div>
        
        <div className="relative z-10">
          {isLoadingSummary ? (
            <div className="animate-pulse space-y-2">
              <div className="h-4 bg-indigo-200/50 dark:bg-slate-600 rounded w-3/4"></div>
              <div className="h-4 bg-indigo-200/50 dark:bg-slate-600 rounded w-full"></div>
            </div>
          ) : summary ? (
             <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 animate-fade-in">
               {summary}
             </p>
          ) : (
             <p className="text-sm text-slate-500 italic">
               Click generate to get a quick summary of this article using GLM-4.7-Flash.
             </p>
          )}
        </div>
        
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl pointer-events-none"></div>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkFootnotes, remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={customComponents}
        >
          {post.content}
        </ReactMarkdown>
      </div>
      
      <hr className="my-12 border-slate-200 dark:border-slate-800" />
      
      <div className="flex justify-between items-center">
         <p className="font-mono text-sm text-slate-500">Thanks for reading.</p>
         <button 
           onClick={() => window.scrollTo({ top: 0, behavior: 'smooth'})}
           className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
         >
           Back to top
         </button>
      </div>
    </article>
  );
};
