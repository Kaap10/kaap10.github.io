import React from 'react';
import styles from './dynavec.module.css';

export default function ArchitectureDiagramFlow({ flow }) {
  if (!flow || !flow.layers) return null;

  return (
    <div className={styles.archDiagramContainer}>
      <div className={styles.archDiagramHeader}>
        <div className={styles.archDiagramDots}>
          <span className={styles.archDiagramDot} />
          <span className={styles.archDiagramDot} />
          <span className={styles.archDiagramDot} />
        </div>
        <span>{flow.title || 'System Architecture Flow'}</span>
      </div>

      <div className={styles.archFlowCanvas}>
        {flow.mentalModel && (
          <div className={styles.archMentalModelBanner}>
            <div className={styles.archMentalModelHeader}>
              <span className={styles.archMentalModelTitle}>High-Level Architecture &amp; Data Lifecycle</span>
              <span className={styles.archMentalModelHint}>End-to-End Flow</span>
            </div>
            <div className={styles.archMentalModelSteps}>
              <div className={styles.archMentalStepBox}>
                <span className={styles.archMentalStepLabel}>1. Ingestion</span>
                <span className={styles.archMentalStepText}>{flow.mentalModel.input}</span>
              </div>
              <span className={styles.archMentalStepArrow}>➔</span>
              <div className={styles.archMentalStepBox}>
                <span className={styles.archMentalStepLabel}>2. Storage &amp; Search</span>
                <span className={styles.archMentalStepText}>{flow.mentalModel.process}</span>
              </div>
              <span className={styles.archMentalStepArrow}>➔</span>
              <div className={styles.archMentalStepBox}>
                <span className={styles.archMentalStepLabel}>3. Latency &amp; Math</span>
                <span className={styles.archMentalStepText}>{flow.mentalModel.output}</span>
              </div>
            </div>
          </div>
        )}

        {flow.layers.map((layer, lIdx) => (
          <React.Fragment key={lIdx}>
            {lIdx > 0 && (
              <div className={styles.archFlowConnector}>
                <div className={styles.archConnectorLine} />
                {layer.connectorLabel ? (
                  <div className={styles.archConnectorBadge}>
                    <span className={styles.archConnectorArrow}>↓</span>
                    <span>{layer.connectorLabel}</span>
                  </div>
                ) : (
                  <span className={styles.archConnectorArrow}>↓</span>
                )}
                <div className={styles.archConnectorLine} />
              </div>
            )}

            <div className={styles.archFlowRow}>
              {layer.stage && (
                <div className={styles.archStageHeaderRow}>
                  <span className={styles.archStageBadge}>{layer.stage}</span>
                  <div className={styles.archStageLine} />
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
                    : styles.archFlowRow
                }
              >
                {layer.cards.map((node, nIdx) => (
                  <div
                    key={nIdx}
                    className={`${styles.archNodeCard} ${
                      node.isContributed ? styles.archNodeContributed : styles.archNodeBase
                    }`}
                  >
                    <div className={styles.archNodeHeader}>
                      <div className={styles.archNodeTitleWrap}>
                        <h6
                          className={`${styles.archNodeTitle} ${
                            node.isContributed ? styles.archNodeTitleContributed : ''
                          }`}
                        >
                          {node.title}
                        </h6>
                      </div>
                      {node.isContributed && node.pr ? (
                        node.prUrl ? (
                          <a
                            href={node.prUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${styles.archPrBadge} ${styles.archPrBadgeLink}`}
                            title="View pull request diff on GitHub"
                          >
                            <span>[★ {node.pr}]</span>
                          </a>
                        ) : (
                          <span className={styles.archPrBadge}>[★ {node.pr}]</span>
                        )
                      ) : (
                        <span className={styles.archBaseBadge}>Core Subsystem</span>
                      )}
                    </div>

                    {node.impact && (
                      <div className={styles.archImpactPill}>
                        <span>{node.impact}</span>
                      </div>
                    )}

                    <ul className={styles.archNodeBullets}>
                      {node.points.map((pt, pIdx) => (
                        <li
                          key={pIdx}
                          className={`${styles.archNodeBulletItem} ${
                            !node.isContributed ? styles.archNodeBulletItemBase : ''
                          }`}
                        >
                          <span
                            className={
                              node.isContributed
                                ? styles.archBulletDotRed
                                : styles.archBulletDotMuted
                            }
                          >
                            •
                          </span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>

      <div className={styles.archDiagramLegend}>
        <span className={styles.archDiagramLegendBadge}>[★] Highlighted in Red</span>
        <span>Authored &amp; merged pull request contributions by @Kaap10</span>
        <span className={styles.archDiagramLegendMuted}>| Base Gray = Upstream Platform Architecture</span>
      </div>
    </div>
  );
}

