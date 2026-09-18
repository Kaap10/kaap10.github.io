import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import BrowserOnly from '@docusaurus/BrowserOnly';
import ExcalidrawBoard from '@site/src/components/ExcalidrawBoard';
import styles from '@site/src/components/ExcalidrawBoard/styles.module.css';

export default function WhiteboardPage() {
  return (
    <Layout
      description="Whiteboard powered by Excalidraw: Sketch architecture, system designs, diagrams, and notes."
      wrapperClassName="board-wrapper"
      noNavbar
      noFooter
    >
      <Head>
        <title>Whiteboard | DevWorkspace</title>
      </Head>
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

