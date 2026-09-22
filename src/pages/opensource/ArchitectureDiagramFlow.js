import React, { useState } from 'react';
import styles from './dynavec.module.css';
import MermaidDiagram from '../../components/Mermaid/MermaidDiagram';
import { getMermaidChart } from '../../components/Mermaid/mermaidCharts';

const IconExternalLink = ({ size = 10 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    aria-hidden="true"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const IconGitPull = ({ size = 11 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    aria-hidden="true"
  >
    <circle cx="18" cy="18" r="3" />
    <circle cx="6" cy="6" r="3" />
    <path d="M13 6h3a2 2 0 0 1 2 2v7" />
    <line x1="6" y1="9" x2="6" y2="21" />
  </svg>
);

const IconFlowchart = ({ size = 14 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    aria-hidden="true"
  >
    <rect x="3" y="3" width="6" height="6" rx="1.5" />
    <rect x="15" y="3" width="6" height="6" rx="1.5" />
    <rect x="9" y="15" width="6" height="6" rx="1.5" />
    <path d="M6 9v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V9" />
    <path d="M12 13v2" />
  </svg>
);

const IconLayers = ({ size = 14 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    aria-hidden="true"
  >
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const IconDownFlow = ({ size = 12 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.4" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    aria-hidden="true"
  >
    <line x1="12" y1="3" x2="12" y2="17" />
    <polyline points="18 12 12 18 6 12" />
  </svg>
);

const IconRightFlow = ({ size = 16 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 28 16" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    aria-hidden="true"
  >
    <line x1="2" y1="8" x2="19" y2="8" strokeDasharray="3 3" />
    <polyline points="15 4 23 8 15 12" />
  </svg>
);

const IconBulletArrow = ({ size = 9, color = 'currentColor' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke={color} 
    strokeWidth="2.8" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    aria-hidden="true"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default function ArchitectureDiagramFlow({ flow, projectId }) {
  if (!flow || !flow.layers) return null;

  const mm = flow.mentalModel;
  const totalCards = flow.layers.reduce((acc, l) => acc + (l.cards ? l.cards.length : 0), 0);
  const contributedCards = flow.layers.reduce(
    (acc, l) => acc + (l.cards ? l.cards.filter(c => c.isContributed).length : 0),
    0
  );

  const mermaidChart = flow.mermaidChart || getMermaidChart(projectId || flow.id || flow.title);
  const [activeTab, setActiveTab] = useState('mermaid');

  return (
    <div className={styles.archDiagramContainer}>
      {/* Canvas Top Bar / Excalidraw Style Whiteboard Header */}
      <div className={styles.archDiagramHeader}>
        <div className={styles.archHeaderLeft}>
          <span className={styles.archHeaderIconWrap}>
            <IconFlowchart size={13} />
          </span>
          <span className={styles.archHeaderTitle}>
            {flow.title || 'System Architecture Flowchart'}
          </span>
        </div>

        <div className={styles.archHeaderRight}>
          {mermaidChart && (
            <div className={styles.archViewTabs} role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'mermaid'}
                className={`${styles.archViewTab} ${activeTab === 'mermaid' ? styles.archViewTabActive : ''}`}
                onClick={() => setActiveTab('mermaid')}
              >
                <IconFlowchart size={12} />
                <span>Mermaid Flowchart</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'breakdown'}
                className={`${styles.archViewTab} ${activeTab === 'breakdown' ? styles.archViewTabActive : ''}`}
                onClick={() => setActiveTab('breakdown')}
              >
                <IconLayers size={12} />
                <span>Stage Breakdown</span>
                <span className={styles.archViewTabBadge}>{flow.layers.length}</span>
              </button>
            </div>
          )}

          {!mermaidChart && (
            <span className={styles.archHeaderBadge}>
              Flowchart Topology
            </span>
          )}
        </div>
      </div>

      {/* Mermaid View Tab */}
      {activeTab === 'mermaid' && mermaidChart ? (
        <MermaidDiagram chart={mermaidChart} title={flow.title} />
      ) : (
        /* Main Flowchart Canvas Area */
        <div className={styles.archFlowCanvas}>
          {/* Top End-to-End Pipeline / Mental Model Banner */}
          {mm && (
            <div className={styles.archPipelineCard}>
              <div className={styles.archPipelineHeader}>
                <div className={styles.archPipelineTitleGroup}>
                  <span className={styles.archPipelinePulse} />
                  <span className={styles.archPipelineTitle}>End-to-End System Pipeline</span>
                </div>
                <span className={styles.archPipelineSubtitle}>Linear Dataflow &amp; Security Boundary</span>
              </div>

              <div className={styles.archPipelineGrid}>
                <div className={`${styles.archPipelineBox} ${styles.archPipelineBoxInput}`}>
                  <div className={styles.archPipelineBoxTag}>01 / Ingestion</div>
                  <div className={styles.archPipelineBoxLabel}>{mm.inputLabel || 'Input & Harness'}</div>
                  <div className={styles.archPipelineBoxText}>{mm.input}</div>
                </div>

                <div className={styles.archPipelineArrow}>
                  <IconRightFlow size={18} />
                </div>

                <div className={`${styles.archPipelineBox} ${styles.archPipelineBoxProcess}`}>
                  <div className={styles.archPipelineBoxTag}>02 / Core Engine</div>
                  <div className={styles.archPipelineBoxLabel}>{mm.processLabel || 'Processing & Isolation'}</div>
                  <div className={styles.archPipelineBoxText}>{mm.process}</div>
                </div>

                <div className={styles.archPipelineArrow}>
                  <IconRightFlow size={18} />
                </div>

                <div className={`${styles.archPipelineBox} ${styles.archPipelineBoxOutput}`}>
                  <div className={styles.archPipelineBoxTag}>03 / Guarantees</div>
                  <div className={styles.archPipelineBoxLabel}>{mm.outputLabel || 'Output & Contract'}</div>
                  <div className={styles.archPipelineBoxText}>{mm.output}</div>
                </div>
              </div>
            </div>
          )}

          {/* Diagram Stages & Nodes */}
          <div className={styles.archStagesContainer}>
            {flow.layers.map((layer, lIdx) => (
              <React.Fragment key={lIdx}>
                {lIdx > 0 && (
                  <div className={styles.archFlowTransition}>
                    <div className={styles.archTransitionStemTop} />
                    {layer.connectorLabel ? (
                      <div className={styles.archTransitionBadge}>
                        <IconDownFlow size={11} />
                        <span>{layer.connectorLabel}</span>
                      </div>
                    ) : (
                      <div className={styles.archTransitionDot}>
                        <IconDownFlow size={11} />
                      </div>
                    )}
                    <div className={styles.archTransitionStemBottom} />
                  </div>
                )}

                <div className={styles.archStageBlock}>
                  {layer.stage && (
                    <div className={styles.archStageHeader}>
                      <div className={styles.archStagePill}>
                        <span className={styles.archStageNum}>Stage {String(lIdx + 1).padStart(2, '0')}</span>
                        <span className={styles.archStageSep}>|</span>
                        <span className={styles.archStageName}>
                          {layer.stage.replace(/^Stage\s*\d+\s*:\s*/i, '')}
                        </span>
                      </div>
                      <div className={styles.archStageDivider} />
                    </div>
                  )}

                  <div
                    className={
                      layer.cards.length === 2
                        ? styles.archFlowGrid2
                        : layer.cards.length === 3
                        ? styles.archFlowGrid3
                        : layer.cards.length === 4
                        ? styles.archFlowGrid4
                        : styles.archFlowGrid1
                    }
                  >
                    {layer.cards.map((node, nIdx) => (
                      <div
                        key={nIdx}
                        className={`${styles.archNodeCard} ${
                          node.isContributed ? styles.archNodeContributed : styles.archNodeBase
                        }`}
                      >
                        {/* Flowchart Port Connection Pins */}
                        <span className={styles.archNodePortTop} aria-hidden="true" />
                        <span className={styles.archNodePortBottom} aria-hidden="true" />

                        <div className={styles.archNodeTopRow}>
                          <div className={styles.archNodeTitleBlock}>
                            <h6 className={styles.archNodeTitle}>{node.title}</h6>
                          </div>

                          {node.isContributed && node.pr ? (
                            node.prUrl ? (
                              <a
                                href={node.prUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.archPrBadgeLink}
                                title="View PR on GitHub"
                              >
                                <IconGitPull size={10} />
                                <span>{node.pr}</span>
                                <IconExternalLink size={9} />
                              </a>
                            ) : (
                              <span className={styles.archPrBadge}>
                                <IconGitPull size={10} />
                                <span>{node.pr}</span>
                              </span>
                            )
                          ) : (
                            <span className={styles.archBaseBadge}>Upstream Core</span>
                          )}
                        </div>

                        {node.impact && (
                          <div className={styles.archImpactTag}>
                            <span>{node.impact}</span>
                          </div>
                        )}

                        {node.points && node.points.length > 0 && (
                          <ul className={styles.archNodeList}>
                            {node.points.map((pt, pIdx) => (
                              <li key={pIdx} className={styles.archNodeListItem}>
                                <span
                                  className={
                                    node.isContributed
                                      ? styles.archListArrowAccent
                                      : styles.archListArrowMuted
                                  }
                                >
                                  <IconBulletArrow
                                    size={9}
                                    color={node.isContributed ? '#FF4D4F' : '#64748B'}
                                  />
                                </span>
                                <span className={styles.archListText}>{pt}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>

          {/* Canvas Footer / Legend */}
          <div className={styles.archDiagramFooter}>
            <div className={styles.archLegendGroup}>
              <div className={styles.archLegendItem}>
                <span className={styles.archLegendDotContributed} />
                <span className={styles.archLegendText}>
                  Authored PR Contributions ({contributedCards})
                </span>
              </div>
              <div className={styles.archLegendItem}>
                <span className={styles.archLegendDotBase} />
                <span className={styles.archLegendText}>
                  Upstream Subsystems ({totalCards - contributedCards})
                </span>
              </div>
            </div>

            <div className={styles.archFooterMeta}>
              <span className={styles.archFlowDirection}>Top-to-Bottom Execution Flow</span>
              <span className={styles.archFooterSep}>·</span>
              <span className={styles.archHintText}>Click PR badges to inspect GitHub diffs</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
