import React from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import TrackerApp from '@site/src/components/Tracker/TrackerApp';

export default function TrackerPage() {
  return (
    <Layout
      title="Personal Productivity OS"
      title="Tracker"
      description="Private productivity dashboard with tasks, milestones, resources, and progress analytics."
      noFooter
    >
      <BrowserOnly
        fallback={
          <div
            style={{
              minHeight: '100vh',
              background: 'var(--vg-bg, #0a0a0a)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        }
      >
        {() => <TrackerApp />}
      </BrowserOnly>
    </Layout>
  );
}
