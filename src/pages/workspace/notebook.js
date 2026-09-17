import React from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import NotebookApp from '@site/src/components/Notebook';

export default function WorkspaceNotebookPage() {
  return (
    <Layout
      title="Developer Notebook"
      description="Private distraction-free markdown notebook, code snippets, and technical scratchpad."
      wrapperClassName="notebook-wrapper"
      noNavbar
      noFooter
    >
      <BrowserOnly
        fallback={
          <div
            style={{
              minHeight: '100vh',
              background: 'var(--vg-bg, #1E1E1E)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--vg-text-muted, #A6A6AC)',
              fontSize: '0.88rem',
            }}
          >
            Initializing Developer Notebook...
          </div>
        }
      >
        {() => <NotebookApp />}
      </BrowserOnly>
    </Layout>
  );
}
