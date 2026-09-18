import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import BrowserOnly from '@docusaurus/BrowserOnly';
import NotebookApp from '@site/src/components/Notebook';

export default function NotebookPage() {
  return (
    <Layout
      description="Private distraction-free markdown notebook, code snippets, and technical scratchpad."
      wrapperClassName="notebook-wrapper"
      noNavbar
      noFooter
    >
      <Head>
        <title>Notebook | DevWorkspace</title>
      </Head>
      <BrowserOnly
        fallback={
          <div
            style={{
              minHeight: '100vh',
              background: 'var(--vg-bg, #121216)',
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
