import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { PostList } from './components/PostList';
import { PostDetail } from './components/PostDetail';
import { MOCK_POSTS } from './constants';
import { Post } from './types';

// Simple view state definition
type ViewState = 'list' | 'detail';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('list');
  const [activePost, setActivePost] = useState<Post | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  // Initialize theme based on system preference
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  // Toggle class on HTML element for Tailwind Dark Mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  const handleSelectPost = (post: Post) => {
    setActivePost(post);
    setView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    setView('list');
    setActivePost(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout 
      darkMode={darkMode} 
      toggleTheme={toggleTheme}
      goHome={handleGoHome}
    >
      {view === 'list' ? (
        <PostList posts={MOCK_POSTS} onSelectPost={handleSelectPost} />
      ) : activePost ? (
        <PostDetail post={activePost} onBack={handleGoHome} />
      ) : (
        // Fallback
        <div className="text-center py-20 text-slate-500">Post not found.</div>
      )}
    </Layout>
  );
};

export default App;
