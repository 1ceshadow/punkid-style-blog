import React from 'react';
import { Post } from '../types';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

interface PostListProps {
  posts: Post[];
  onSelectPost: (post: Post) => void;
}

export const PostList: React.FC<PostListProps> = ({ posts, onSelectPost }) => {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-6 font-mono">
          Recent Writing
        </h2>
        <div className="space-y-8">
          {posts.map((post) => (
            <article 
              key={post.id} 
              className="group cursor-pointer flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6"
              onClick={() => onSelectPost(post)}
            >
              <div className="flex-shrink-0 w-32 font-mono text-sm text-slate-400 dark:text-slate-500 pt-1">
                {post.publishedAt}
              </div>
              <div className="flex-grow space-y-2">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-3 pt-1">
                   <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                     <Clock size={12} /> {post.readingTime}
                   </span>
                   <div className="flex gap-2">
                     {post.tags.slice(0, 2).map(tag => (
                       <span key={tag} className="text-xs font-mono text-indigo-500 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-1.5 py-0.5 rounded">
                         #{tag}
                       </span>
                     ))}
                   </div>
                   <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                     <ArrowRight size={16} className="text-indigo-500" />
                   </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      
      <section className="pt-8 border-t border-slate-200 dark:border-slate-800 border-dashed">
         <div className="flex justify-center">
            <button className="text-sm font-mono text-slate-500 hover:text-indigo-500 transition-colors">
              View Archive
            </button>
         </div>
      </section>
    </div>
  );
};
