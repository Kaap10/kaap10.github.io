import React from 'react';
import styles from '../../styles/tracker.module.css';

export function SkeletonBox({ width = '100%', height = '20px', borderRadius = 'var(--vg-radius-sm)', style = {} }) {
  return (
    <div
      className={styles.skeleton}
      style={{
        width,
        height,
        borderRadius,
        ...style,
      }}
    />
  );
}

export function DashboardSkeleton() {
  return (
    <div className={styles.viewContainer}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '300px' }}>
          <SkeletonBox height="28px" width="220px" />
          <SkeletonBox height="14px" width="340px" />
        </div>
        <SkeletonBox height="36px" width="240px" />
      </div>

      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <SkeletonBox height="14px" width="100px" style={{ marginBottom: '0.75rem' }} />
          <SkeletonBox height="36px" width="80px" style={{ marginBottom: '0.5rem' }} />
          <SkeletonBox height="8px" width="100%" />
        </div>
        <div className={styles.metricCard}>
          <SkeletonBox height="14px" width="120px" style={{ marginBottom: '0.75rem' }} />
          <SkeletonBox height="36px" width="100px" style={{ marginBottom: '0.5rem' }} />
          <SkeletonBox height="12px" width="160px" />
        </div>
        <div className={styles.metricCard}>
          <SkeletonBox height="14px" width="90px" style={{ marginBottom: '0.75rem' }} />
          <SkeletonBox height="36px" width="70px" style={{ marginBottom: '0.5rem' }} />
          <SkeletonBox height="12px" width="140px" />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem', marginTop: '1rem' }}>
        <div className={styles.card}>
          <SkeletonBox height="20px" width="160px" style={{ marginBottom: '1rem' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <SkeletonBox height="44px" width="100%" />
            <SkeletonBox height="44px" width="100%" />
            <SkeletonBox height="44px" width="100%" />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className={styles.card}>
            <SkeletonBox height="20px" width="120px" style={{ marginBottom: '1rem' }} />
            <SkeletonBox height="38px" width="100%" style={{ marginBottom: '0.5rem' }} />
            <SkeletonBox height="38px" width="100%" />
          </div>
          <div className={styles.card}>
            <SkeletonBox height="20px" width="140px" style={{ marginBottom: '1rem' }} />
            <SkeletonBox height="12px" width="100%" style={{ marginBottom: '0.5rem' }} />
            <SkeletonBox height="8px" width="100%" />
          </div>
        </div>
      </div>
    </div>
  );
}

