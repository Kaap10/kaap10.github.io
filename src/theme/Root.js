import React from 'react';
import {useLocation} from '@docusaurus/router';

const STORAGE_KEY = 'vg-doc-chrome-collapsed';
const THEME_KEY = 'theme-626';

function ThemeToggle() {
  const [theme, setTheme] = React.useState('dark');
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    setTheme(currentTheme === 'light' ? 'light' : 'dark');
    setIsMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    document.documentElement.setAttribute('data-theme-choice', nextTheme);
    window.localStorage.setItem(THEME_KEY, nextTheme);
    setTheme(nextTheme);
  };

  return (
    <button
      type="button"
      className="vg-theme-toggle"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggleTheme}
      suppressHydrationWarning
    >
      {isMounted && theme === 'dark' ? (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M12 4.5a1 1 0 0 1 1 1v1.2a1 1 0 1 1-2 0V5.5a1 1 0 0 1 1-1Zm0 11.8a4.3 4.3 0 1 0 0-8.6 4.3 4.3 0 0 0 0 8.6Zm7.5-5.3a1 1 0 1 1 0 2h-1.2a1 1 0 1 1 0-2h1.2ZM6.7 12a1 1 0 0 1-1 1H4.5a1 1 0 1 1 0-2h1.2a1 1 0 0 1 1 1Zm10.18-5.88a1 1 0 0 1 1.42 1.42l-.86.86a1 1 0 0 1-1.42-1.42l.86-.86ZM7.98 16.02A1 1 0 0 1 7.98 17.44l-.86.86a1 1 0 0 1-1.42-1.42l.86-.86a1 1 0 0 1 1.42 0Zm10.32.86a1 1 0 1 1-1.42 1.42l-.86-.86a1 1 0 0 1 1.42-1.42l.86.86ZM7.12 5.7l.86.86a1 1 0 1 1-1.42 1.42l-.86-.86A1 1 0 1 1 7.12 5.7ZM12 17.3a1 1 0 0 1 1 1v1.2a1 1 0 1 1-2 0v-1.2a1 1 0 0 1 1-1Z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M20.4 14.4A7.6 7.6 0 0 1 9.6 3.6a8.7 8.7 0 1 0 10.8 10.8Z" />
        </svg>
      )}
    </button>
  );
}

export default function Root({children}) {
  return (
    <>
      {children}
      <ThemeToggle />
    </>
  );
}
