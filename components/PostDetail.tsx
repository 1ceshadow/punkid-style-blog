import React, { useState } from 'react';
import { Post } from '../types';
import { ArrowLeft, Sparkles, Hash, Calendar } from 'lucide-react';
import { generatePostSummary } from '../services/geminiService';

interface PostDetailProps {
  post: Post;
  onBack: () => void;
}

export const PostDetail: React.FC<PostDetailProps> = ({ post, onBack }) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);

  const handleGenerateSummary = async () => {
    setIsLoadingSummary(true);
    const result = await generatePostSummary(post.content);
    setSummary(result);
    setIsLoadingSummary(false);
  };

  // Improved renderer to handle basic MD syntax including images
  const renderContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      // Headlines
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-xl font-bold mt-8 mb-4 text-slate-800 dark:text-slate-100">{line.replace('### ', '')}</h3>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-bold mt-10 mb-5 text-slate-800 dark:text-slate-100">{line.replace('## ', '')}</h2>;
      }
      
      // Images: ![Alt](Url)
      const imgMatch = line.match(/^!\[(.*?)\]\((.*?)\)/);
      if (imgMatch) {
        return (
          <figure key={index} className="my-8">
            <img src={imgMatch[2]} alt={imgMatch[1]} className="rounded-lg shadow-md w-full object-cover" />
            <figcaption className="text-center text-xs text-slate-500 mt-2 font-mono">{imgMatch[1]}</figcaption>
          </figure>
        );
      }

      // Code blocks (naive skip for opening/closing ticks, but handled content via code logic below)
      if (line.startsWith('```')) {
        return null; 
      }
      
      // Inline Code / Blocks
      if (line.trim().startsWith('//') || line.trim().startsWith('import') || line.trim().startsWith('const') || line.trim().startsWith('<') || line.trim().startsWith('article')) {
         return (
           <div key={index} className="font-mono text-sm bg-slate-100 dark:bg-slate-900 p-3 text-slate-700 dark:text-slate-300 rounded-lg overflow-x-auto my-4 border border-slate-200 dark:border-slate-800">
             {line}
           </div>
         )
      }
      
      // Blockquotes
      if (line.startsWith('> ')) {
        return <blockquote key={index} className="border-l-4 border-indigo-500 pl-4 italic my-6 text-slate-600 dark:text-slate-400">{line.replace('> ', '')}</blockquote>
      }
      
      // Empty lines
      if (line.trim() === '') return <div key={index} className="h-4"></div>;
      
      // Lists
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
        return <li key={index} className="ml-4 list-disc marker:text-indigo-500 text-slate-700 dark:text-slate-300 mb-2">{line.replace(/^[*-]\s/, '')}</li>
      }
      if (/^\d+\./.test(line.trim())) {
        return <div key={index} className="ml-4 flex gap-2 text-slate-700 dark:text-slate-300 mb-2"><span className="font-bold text-indigo-500">{line.split('.')[0]}.</span> <span>{line.replace(/^\d+\.\s/, '')}</span></div>
      }

      // Paragraphs with basic bold support
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={index} className="mb-4 leading-7 text-slate-700 dark:text-slate-300">
          {parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={i} className="font-semibold text-slate-900 dark:text-white">{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
        </p>
      );
    });
  };

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
               Click generate to get a quick summary of this article using Gemini 3 Flash.
             </p>
          )}
        </div>
        
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl pointer-events-none"></div>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        {renderContent(post.content)}
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
