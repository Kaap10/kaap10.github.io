import React, { useState, useEffect, useRef } from 'react';
import styles from '../../pages/opensource/dynavec.module.css';

const IconZoomIn = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="11" y1="8" x2="11" y2="14" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);

const IconZoomOut = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);

const IconReset = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </svg>
);

const IconCopy = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const IconCheck = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconCode = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

export default function MermaidDiagram({ chart, title = 'System Architecture Flowchart' }) {
  const containerRef = useRef(null);
  const [svgContent, setSvgContent] = useState('');
  const [zoom, setZoom] = useState(1);
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [renderError, setRenderError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function initAndRender() {
      if (!chart) return;
      try {
        const mermaid = (await import('mermaid')).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: 'base',
          securityLevel: 'loose',
          fontFamily: 'JetBrains Mono, monospace, -apple-system, BlinkMacSystemFont, Segoe UI',
          themeVariables: {
            darkMode: true,
            background: '#0B0D14',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '12.5px',
            primaryColor: '#121524',
            primaryBorderColor: '#38BDF8',
            primaryTextColor: '#F8FAFC',
            secondaryColor: '#181226',
            secondaryBorderColor: '#A855F7',
            secondaryTextColor: '#F8FAFC',
            tertiaryColor: '#10221A',
            tertiaryBorderColor: '#22C55E',
            tertiaryTextColor: '#F8FAFC',
            lineColor: '#64748B',
            textColor: '#F1F5F9',
            mainBkg: '#111422',
            nodeBorder: '#38BDF8',
            clusterBkg: 'rgba(14, 17, 26, 0.75)',
            clusterBorder: 'rgba(255, 255, 255, 0.14)',
            titleColor: '#38BDF8',
            edgeLabelBackground: '#121522',
          },
          flowchart: {
            htmlLabels: true,
            curve: 'basis',
            nodeSpacing: 15,
            rankSpacing: 20,
            padding: 8,
          },
        });

        const id = 'mermaid-' + Math.random().toString(36).substring(2, 9);
        const { svg } = await mermaid.render(id, chart);
        if (isMounted) {
          setSvgContent(svg);
          setRenderError(null);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Mermaid rendering error:', err);
          setRenderError(err.message || 'Error rendering Mermaid flowchart');
        }
      }
    }

    initAndRender();
    return () => {
      isMounted = false;
    };
  }, [chart]);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.15, 1.8));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.15, 0.6));
  const handleResetZoom = () => setZoom(1);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(chart);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className={styles.mermaidWrapper}>
      {/* Control Bar */}
      <div className={styles.mermaidToolbar}>
        <div className={styles.mermaidToolbarLeft}>
          <span className={styles.mermaidBadge}>Mermaid.js</span>
          <span className={styles.mermaidTitle}>{title}</span>
        </div>

        <div className={styles.mermaidToolbarRight}>
          <div className={styles.mermaidControlGroup}>
            <button
              type="button"
              className={styles.mermaidToolBtn}
              onClick={handleZoomOut}
              title="Zoom Out"
              aria-label="Zoom Out"
            >
              <IconZoomOut size={13} />
            </button>
            <button
              type="button"
              className={styles.mermaidZoomValue}
              onClick={handleResetZoom}
              title="Reset Zoom (100%)"
            >
              {Math.round(zoom * 100)}%
            </button>
            <button
              type="button"
              className={styles.mermaidToolBtn}
              onClick={handleZoomIn}
              title="Zoom In"
              aria-label="Zoom In"
            >
              <IconZoomIn size={13} />
            </button>
          </div>

          <div className={styles.mermaidControlGroup}>
            <button
              type="button"
              className={`${styles.mermaidToolBtn} ${showCode ? styles.mermaidToolBtnActive : ''}`}
              onClick={() => setShowCode(!showCode)}
              title="Toggle Mermaid Source Code"
            >
              <IconCode size={13} />
              <span className={styles.mermaidBtnText}>Source</span>
            </button>

            <button
              type="button"
              className={styles.mermaidToolBtn}
              onClick={handleCopy}
              title="Copy Mermaid Code"
            >
              {copied ? <IconCheck size={13} /> : <IconCopy size={13} />}
              <span className={styles.mermaidBtnText}>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Raw Syntax Drawer */}
      {showCode && (
        <div className={styles.mermaidCodeDrawer}>
          <div className={styles.mermaidCodeHeader}>
            <span>Mermaid Syntax</span>
          </div>
          <pre className={styles.mermaidCodePre}>
            <code>{chart}</code>
          </pre>
        </div>
      )}

      {/* Canvas Viewport */}
      <div className={styles.mermaidViewport}>
        {renderError ? (
          <div className={styles.mermaidErrorBox}>
            <span>Failed to render flowchart: {renderError}</span>
          </div>
        ) : svgContent ? (
          <div
            ref={containerRef}
            className={styles.mermaidSvgContainer}
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'top center',
              transition: 'transform 0.12s ease-out',
            }}
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        ) : (
          <div className={styles.mermaidLoadingBox}>
            <div className={styles.mermaidSpinner} />
            <span>Compiling Mermaid.js Flowchart...</span>
          </div>
        )}
      </div>

      {/* Mermaid Legend */}
      <div className={styles.mermaidFooter}>
        <div className={styles.mermaidLegendItem}>
          <span className={styles.mermaidLegendDotRed} />
          <span>Authored PR Contribution (@Kaap10)</span>
        </div>
        <div className={styles.mermaidLegendItem}>
          <span className={styles.mermaidLegendDotCyan} />
          <span>Ingestion & Client Adapters</span>
        </div>
        <div className={styles.mermaidLegendItem}>
          <span className={styles.mermaidLegendDotPurple} />
          <span>Engine, Security & Traversal</span>
        </div>
        <div className={styles.mermaidLegendItem}>
          <span className={styles.mermaidLegendDotGreen} />
          <span>Guarantees & Verification</span>
        </div>
      </div>
    </div>
  );
}
