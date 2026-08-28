import React from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import TrackerApp from '@site/src/components/Tracker/TrackerApp';

export default function TrackerPage() {
  return (
    <Layout
      title="Personal Productivity Tracker"
      description="Private productivity dashboard with tasks, milestones, resources, and progress analytics."
      noFooter
    >
      <BrowserOnly
        fallback={
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 'calc(100vh - 120px)',
              gap: '1rem',
              color: 'var(--vg-text-muted)',
              fontSize: '0.9rem',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                border: '2px solid var(--vg-border)',
                borderTopColor: 'var(--vg-accent)',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
              }}
            />
            <span>Initializing Tracker...</span>
          </div>
        }
      >
        {() => <TrackerApp />}
      </BrowserOnly>
    </Layout>
  );
}

