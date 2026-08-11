import React from 'react';
import {useLocation} from '@docusaurus/router';

const STORAGE_KEY = 'vg-doc-chrome-collapsed';

function DocsChromeToggle() {
  const {pathname} = useLocation();
  const isDocsPage = pathname.startsWith('/notes');
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (!isDocsPage || !isMounted) {
      document.body.classList.remove('vg-doc-chrome-collapsed');
      return undefined;
    }

    const savedValue = window.localStorage.getItem(STORAGE_KEY);
    const shouldCollapse = savedValue === 'true';
    setIsCollapsed(shouldCollapse);
    document.body.classList.toggle('vg-doc-chrome-collapsed', shouldCollapse);

    return () => {
      document.body.classList.remove('vg-doc-chrome-collapsed');
    };
  }, [isDocsPage, isMounted]);

  React.useEffect(() => {
    if (!isDocsPage || !isMounted) {
      return undefined;
    }

    document.body.classList.toggle('vg-doc-chrome-collapsed', isCollapsed);
    window.localStorage.setItem(STORAGE_KEY, String(isCollapsed));

    return undefined;
  }, [isDocsPage, isMounted, isCollapsed]);

  if (!isDocsPage) {
    return null;
  }

  return (
    <button
      type="button"
      className="vg-doc-chrome-toggle"
      aria-label={isCollapsed ? 'Show sidebar' : 'Hide sidebar'}
      title={isCollapsed ? 'Show sidebar' : 'Hide sidebar'}
      onClick={() => setIsCollapsed((current) => !current)}
    >
      <svg
        className="vg-doc-chrome-toggleIcon"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <rect x="4" y="6" width="16" height="2.2" rx="1.1" />
        <rect x="4" y="11" width="12" height="2.2" rx="1.1" />
        <rect x="4" y="16" width="8" height="2.2" rx="1.1" />
      </svg>
    </button>
  );
}

export default function Root({children}) {
  return (
    <>
      {children}
      <DocsChromeToggle />
    </>
  );
}