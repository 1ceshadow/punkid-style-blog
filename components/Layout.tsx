import React from 'react';
import { SITE_CONFIG } from '../constants';
import { Sun, Moon, Github, Terminal } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  darkMode: boolean;
  toggleTheme: () => void;
  goHome: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, darkMode, toggleTheme, goHome }) => {
  return (
    <div className="min-h-screen flex flex-col items-center relative overflow-hidden font-sans selection:bg-indigo-500/30">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none z-0" />

      {/* Main Container */}
      <div className="w-full max-w-3xl px-6 md:px-8 py-12 z-10 flex flex-col min-h-screen">
        
        {/* Header */}
        <header className="flex justify-between items-start mb-16 select-none">
          <div className="group cursor-pointer" onClick={goHome}>
            <div className="flex items-center gap-2 mb-1">
              <Terminal size={20} className="text-indigo-600 dark:text-indigo-400 group-hover:rotate-12 transition-transform duration-300" />
              <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                {SITE_CONFIG.title}
              </h1>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              {SITE_CONFIG.description}
            </p>
          </div>

          <div className="flex items-center gap-4">
             {/* Navigation Links (Mock) */}
             <nav className="hidden sm:flex gap-4 text-sm font-medium text-slate-600 dark:text-slate-400 mr-4">
              <span onClick={goHome} className="cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Posts</span>
              <span className="cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About</span>
            </nav>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:ring-2 ring-indigo-500/50 transition-all"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-grow animate-fade-in">
          {children}
        </main>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs sm:text-sm text-slate-500 dark:text-slate-500 font-mono">
          <div>
            &copy; {new Date().getFullYear()} {SITE_CONFIG.author}
          </div>
          <div className="flex gap-4">
            <a href={SITE_CONFIG.socials.github} target="_blank" rel="noreferrer" className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors flex items-center gap-1">
              <Github size={14} /> Github
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};
