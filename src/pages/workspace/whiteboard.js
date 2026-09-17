import React from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import ExcalidrawBoard from '@site/src/components/ExcalidrawBoard';
import styles from '@site/src/components/ExcalidrawBoard/styles.module.css';

export default function WhiteboardPage() {
  return (
    <Layout
      title="Whiteboard"
      description="Whiteboard powered by Excalidraw: Sketch architecture, system designs, diagrams, and notes."
      wrapperClassName="board-wrapper"
      noNavbar
      noFooter
    >
      <main className={styles.boardContainer}>
        <BrowserOnly
          fallback={
            <div className={styles.loadingContainer}>
              <div className={styles.spinner} />
              <p>Loading Whiteboard...</p>
            </div>
          }
        >
          {() => <ExcalidrawBoard />}
        </BrowserOnly>
      </main>
    </Layout>
  );
}

