import React from 'react';
import { useTracker } from '../../context/TrackerContext';
import { IconProgress, IconCalendar, IconCheck, IconTasks } from '../Common/Icons';
import ActivityGraph from './ActivityGraph';
import styles from '../../styles/tracker.module.css';

export default function ProgressView() {
  const { analytics } = useTracker();
  const { today, weekly, monthly, overall, activityMap } = analytics;

  return (
    <div>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerTitleArea}>
          <span className={styles.headerKicker}>Analytics &amp; Output</span>
          <h1 className={styles.headerTitle}>Productivity Progress</h1>
          <p className={styles.headerSubtitle}>
            Real-time daily, weekly, and monthly execution performance.
          </p>
        </div>
      </div>

      {/* Top 4 Stat Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span>Today's Execution</span>
            <IconCheck size={16} />
          </div>
          <div className={styles.statValue}>
            {today.completed} <span style={{ fontSize: '1.1rem', color: 'var(--vg-text-subtle)' }}>/ {today.total}</span>
          </div>
          <div className={styles.progressBarTrack}>
            <div className={styles.progressBarFill} style={{ width: `${today.percent}%` }} />
          </div>
          <span className={styles.statSubtext}>{today.percent}% daily target achieved</span>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span>This Week</span>
            <IconCalendar size={16} />
          </div>
          <div className={styles.statValue}>
            {weekly.totalCompleted} <span style={{ fontSize: '1.1rem', color: 'var(--vg-text-subtle)' }}>/ {weekly.totalPlanned}</span>
          </div>
          <div className={styles.progressBarTrack}>
            <div className={styles.progressBarFill} style={{ width: `${weekly.percent}%` }} />
          </div>
          <span className={styles.statSubtext}>{weekly.percent}% weekly consistency</span>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span>Month ({monthly.monthName})</span>
            <IconProgress size={16} />
          </div>
          <div className={styles.statValue}>
            {monthly.completed} <span style={{ fontSize: '1.1rem', color: 'var(--vg-text-subtle)' }}>/ {monthly.planned}</span>
          </div>
          <div className={styles.progressBarTrack}>
            <div className={styles.progressBarFill} style={{ width: `${monthly.percent}%` }} />
          </div>
          <span className={styles.statSubtext}>{monthly.percent}% monthly throughput</span>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span>All-time Total</span>
            <IconTasks size={16} />
          </div>
          <div className={styles.statValue}>{overall.completed}</div>
          <div className={styles.progressBarTrack}>
            <div className={styles.progressBarFill} style={{ width: `${overall.percent}%` }} />
          </div>
          <span className={styles.statSubtext}>{overall.total} total recorded tasks</span>
        </div>
      </div>

      {/* 52-Week Contribution / Heatmap */}
      <ActivityGraph activityMap={activityMap} />

      {/* Weekly and Monthly Visual Breakdown */}
      <div className={styles.dashboardColumns}>
        {/* Weekly Day-by-Day Breakdown */}
        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>
              <IconCalendar size={17} />
              <span>Weekly Daily Breakdown</span>
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--vg-text-subtle)', fontFamily: 'monospace' }}>
              Mon — Sun
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {weekly.breakdown.map((item) => {
              const maxCompletedInWeek = Math.max(1, ...weekly.breakdown.map((d) => d.completed));
              const barWidth = Math.round((item.completed / maxCompletedInWeek) * 100);

              return (
                <div key={item.day} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span
                    style={{
                      width: '32px',
                      fontSize: '0.82rem',
                      fontWeight: item.isToday ? 700 : 500,
                      color: item.isToday ? 'var(--vg-accent)' : 'var(--vg-text-muted)',
                      fontFamily: 'monospace',
                    }}
                  >
                    {item.day}
                  </span>

                  <div style={{ flexGrow: 1, height: '10px', background: 'var(--vg-surface)', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${item.completed > 0 ? Math.max(8, barWidth) : 0}%`,
                        background: item.isToday ? 'var(--vg-accent)' : 'var(--vg-text-muted)',
                        borderRadius: '9999px',
                        transition: 'width 300ms ease',
                      }}
                    />
                  </div>

                  <span style={{ minWidth: '55px', textAlign: 'right', fontSize: '0.8rem', color: 'var(--vg-text)', fontFamily: 'monospace' }}>
                    {item.completed} done
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Monthly Weekly Cadence */}
        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>
              <IconProgress size={17} />
              <span>Monthly Cadence ({monthly.monthName})</span>
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--vg-text-subtle)', fontFamily: 'monospace' }}>
              4 Weeks
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {monthly.weeks.map((w) => {
              const maxInMonth = Math.max(1, ...monthly.weeks.map((wk) => wk.completed));
              const barWidth = Math.round((w.completed / maxInMonth) * 100);

              return (
                <div key={w.label} style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                    <span style={{ fontWeight: 500, color: 'var(--vg-text)' }}>{w.label}</span>
                    <span style={{ color: 'var(--vg-text-muted)', fontFamily: 'monospace' }}>
                      {w.completed} tasks completed
                    </span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'var(--vg-surface)', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${w.completed > 0 ? Math.max(6, barWidth) : 0}%`,
                        background: 'var(--vg-accent)',
                        borderRadius: '9999px',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

