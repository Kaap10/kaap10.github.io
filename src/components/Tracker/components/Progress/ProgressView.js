import React, { useMemo } from 'react';
import { useTracker } from '../../context/TrackerContext';
import ActivityGraph from './ActivityGraph';
import {
  IconProgress,
  IconTasks,
  IconFocus,
  IconFlame,
  IconTrophy,
} from '../Common/Icons';
import styles from '../../styles/tracker.module.css';

export default function ProgressView() {
  const { tasks, focusSessions, habits, habitLogs, lifetimeStats } = useTracker();

  // 1. Last 7 Days Task Velocity Breakdown
  const last7DaysVelocity = useMemo(() => {
    const now = new Date();
    const days = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dStr = d.toISOString().split('T')[0];

      const planned = tasks.filter((t) => (t.due_date === dStr || t.created_at?.startsWith(dStr))).length;
      const completed = tasks.filter((t) => t.status === 'completed' && t.completed_at?.startsWith(dStr)).length;

      days.push({
        dateStr: dStr,
        dayLabel: dayNames[d.getDay()],
        planned,
        completed,
      });
    }

    return days;
  }, [tasks]);

  // Max value for scaling SVG chart bars
  const maxDayTasks = Math.max(1, ...last7DaysVelocity.map((d) => Math.max(d.planned, d.completed)));

  // 2. Category Distribution Data
  const categoryStats = useMemo(() => {
    const counts = {};
    tasks.forEach((t) => {
      counts[t.category] = (counts[t.category] || 0) + 1;
    });
    return Object.entries(counts).map(([cat, count]) => ({
      category: cat,
      count,
      pct: tasks.length > 0 ? Math.round((count / tasks.length) * 100) : 0,
    }));
  }, [tasks]);

  return (
    <div className={styles.viewContainer}>
      {/* Header */}
      <div className={styles.viewHeader}>
        <div>
          <h1 className={styles.viewTitle}>Analytics & Velocity Engine</h1>
          <p className={styles.viewSubtitle}>
            Quantitative measurement of daily execution velocity, focus consistency, and multi-year trajectory.
          </p>
        </div>
      </div>

      {/* Top Lifetime Stats */}
      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <span className={styles.metricLabel}>Total Tasks Cleared</span>
            <IconTasks size={18} className={styles.metricIcon} />
          </div>
          <div className={styles.metricValue}>
            {lifetimeStats.completedTasks} <span style={{ fontSize: '1rem', color: 'var(--vg-text-muted)' }}>/ {lifetimeStats.totalTasks}</span>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--vg-text-muted)', marginTop: '0.5rem' }}>
            Overall execution rate: <strong style={{ color: 'var(--vg-accent)' }}>{lifetimeStats.completionRate}%</strong>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <span className={styles.metricLabel}>Deep Work Immersed</span>
            <IconFocus size={18} className={styles.metricIcon} />
          </div>
          <div className={styles.metricValue}>
            {lifetimeStats.totalFocusHours} <span style={{ fontSize: '1rem', color: 'var(--vg-text-muted)' }}>hours</span>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--vg-text-muted)', marginTop: '0.5rem' }}>
            Across {lifetimeStats.totalFocusSessions} logged focus sessions
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <span className={styles.metricLabel}>Peak Discipline Streak</span>
            <IconFlame size={18} className={styles.metricIcon} />
          </div>
          <div className={styles.metricValue}>
            {lifetimeStats.bestStreak} <span style={{ fontSize: '1rem', color: 'var(--vg-text-muted)' }}>days</span>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--vg-text-muted)', marginTop: '0.5rem' }}>
            Most productive day: <strong style={{ color: 'var(--vg-text)' }}>{lifetimeStats.peakDay}</strong>
          </div>
        </div>
      </div>

      {/* 52-Week GitHub Heatmap Card */}
      <div className={styles.card}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <IconProgress size={18} style={{ color: 'var(--vg-accent)' }} />
            <h2 className={styles.cardTitle}>52-Week Productivity Heatmap (365 Days)</h2>
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--vg-text-muted)' }}>
            Tasks · Deep Work · Habits
          </span>
        </div>

        <ActivityGraph />
      </div>

      {/* Two-Column Analytics Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
        {/* Left: 7-Day Velocity Chart */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle} style={{ marginBottom: '1rem' }}>
            7-Day Execution Velocity (Planned vs Completed)
          </h3>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '180px', paddingTop: '1rem', borderBottom: '1px solid var(--vg-border)' }}>
            {last7DaysVelocity.map((day) => {
              const compHeightPct = (day.completed / maxDayTasks) * 100;
              const planHeightPct = (day.planned / maxDayTasks) * 100;

              return (
                <div
                  key={day.dateStr}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                    flex: 1,
                    height: '100%',
                    justifyContent: 'flex-end',
                  }}
                >
                  <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end', height: '140px', width: '28px', justifyContent: 'center' }}>
                    {/* Planned Bar */}
                    <div
                      style={{
                        width: '8px',
                        height: `${Math.max(4, planHeightPct)}%`,
                        borderRadius: '2px 2px 0 0',
                        background: 'var(--vg-surface-strong)',
                      }}
                      title={`Planned: ${day.planned}`}
                    />
                    {/* Completed Bar */}
                    <div
                      style={{
                        width: '8px',
                        height: `${Math.max(4, compHeightPct)}%`,
                        borderRadius: '2px 2px 0 0',
                        background: 'var(--vg-accent)',
                      }}
                      title={`Completed: ${day.completed}`}
                    />
                  </div>

                  <span style={{ fontSize: '0.75rem', color: 'var(--vg-text-muted)' }}>
                    {day.dayLabel}
                  </span>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1rem', fontSize: '0.78rem', color: 'var(--vg-text-muted)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <div style={{ width: '10px', height: '10px', background: 'var(--vg-surface-strong)', borderRadius: '2px' }} />
              <span>Planned Tasks</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <div style={{ width: '10px', height: '10px', background: 'var(--vg-accent)', borderRadius: '2px' }} />
              <span>Completed Tasks</span>
            </div>
          </div>
        </div>

        {/* Right: Work Breakdown by Category */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle} style={{ marginBottom: '1rem' }}>
            Work Distribution by Category
          </h3>

          {categoryStats.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--vg-text-muted)', fontSize: '0.85rem' }}>
              No categorized task data available yet.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {categoryStats.map((item) => (
                <div key={item.category}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', fontSize: '0.84rem' }}>
                    <span style={{ fontWeight: 500, color: 'var(--vg-text)' }}>{item.category}</span>
                    <span style={{ color: 'var(--vg-text-muted)' }}>
                      {item.count} tasks ({item.pct}%)
                    </span>
                  </div>
                  <div className={styles.progressBarWrapper}>
                    <div className={styles.progressBarFill} style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
