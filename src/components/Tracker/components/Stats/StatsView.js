import React from 'react';
import { useTracker } from '../../context/TrackerContext';
import {
  IconStats,
  IconTasks,
  IconFocus,
  IconFlame,
  IconGoals,
  IconMilestone,
  IconResources,
  IconTrophy,
} from '../Common/Icons';
import styles from '../../styles/tracker.module.css';

export default function StatsView() {
  const { lifetimeStats, tasks, focusSessions, goals, habits, resources } = useTracker();

  const statCards = [
    {
      label: 'Tasks Executed',
      value: lifetimeStats.completedTasks,
      total: lifetimeStats.totalTasks,
      unit: 'completed',
      icon: IconTasks,
      color: '#ff4d4f',
    },
    {
      label: 'Deep Work Immersed',
      value: lifetimeStats.totalFocusHours,
      total: null,
      unit: 'hours',
      icon: IconFocus,
      color: '#fa8c16',
    },
    {
      label: 'Goals Achieved',
      value: lifetimeStats.completedGoals,
      total: lifetimeStats.totalGoals,
      unit: 'goals',
      icon: IconGoals,
      color: '#1890ff',
    },
    {
      label: 'Milestones Cleared',
      value: lifetimeStats.completedMilestones,
      total: lifetimeStats.totalMilestones,
      unit: 'milestones',
      icon: IconMilestone,
      color: '#52c41a',
    },
    {
      label: 'Longest Habit Streak',
      value: lifetimeStats.bestStreak,
      total: null,
      unit: 'days consecutive',
      icon: IconFlame,
      color: '#fa541c',
    },
    {
      label: 'Knowledge Vault Read',
      value: lifetimeStats.completedResources,
      total: lifetimeStats.totalResources,
      unit: 'resources',
      icon: IconResources,
      color: '#722ed1',
    },
  ];

  return (
    <div className={styles.viewContainer}>
      {/* Header */}
      <div className={styles.viewHeader}>
        <div>
          <h1 className={styles.viewTitle}>Lifetime Statistics & Milestones</h1>
          <p className={styles.viewSubtitle}>
            Holistic quantitative record of all-time engineering output and consistency metrics.
          </p>
        </div>
      </div>

      {/* Main Grid of 6 Big Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {statCards.map((card, idx) => {
          const IconComponent = card.icon;
          return (
            <div key={idx} className={styles.metricCard} style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span className={styles.metricLabel}>{card.label}</span>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--vg-radius-sm)',
                    background: 'var(--vg-surface-strong)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: card.color,
                  }}
                >
                  <IconComponent size={18} />
                </div>
              </div>

              <div className={styles.metricValue} style={{ fontSize: '2.2rem' }}>
                {card.value}{' '}
                {card.total !== null && (
                  <span style={{ fontSize: '1.1rem', color: 'var(--vg-text-muted)', fontWeight: 400 }}>
                    / {card.total}
                  </span>
                )}
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--vg-text-muted)', marginTop: '0.5rem' }}>
                {card.unit}
              </div>
            </div>
          );
        })}
      </div>

      {/* Deep Dive Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '0.5rem' }}>
        <div className={styles.card}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <IconTrophy size={18} style={{ color: '#faad14' }} />
            <h3 className={styles.cardTitle}>Velocity & Execution Summary</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.86rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--vg-border)' }}>
              <span style={{ color: 'var(--vg-text-muted)' }}>Overall Task Completion Rate:</span>
              <strong style={{ color: 'var(--vg-accent)' }}>{lifetimeStats.completionRate}%</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--vg-border)' }}>
              <span style={{ color: 'var(--vg-text-muted)' }}>Most Productive Day of Week:</span>
              <strong>{lifetimeStats.peakDay}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--vg-border)' }}>
              <span style={{ color: 'var(--vg-text-muted)' }}>Total Focus Sessions Logged:</span>
              <strong>{focusSessions.length} sessions</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--vg-text-muted)' }}>Active Habits Tracked:</span>
              <strong>{habits.filter((h) => !h.archived).length} habits</strong>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <IconStats size={18} style={{ color: 'var(--vg-accent)' }} />
            <h3 className={styles.cardTitle}>Cloud Database Integrity</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.86rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--vg-border)' }}>
              <span style={{ color: 'var(--vg-text-muted)' }}>Database Provider:</span>
              <strong style={{ color: '#52c41a' }}>Supabase PostgreSQL</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--vg-border)' }}>
              <span style={{ color: 'var(--vg-text-muted)' }}>Row Level Security (RLS):</span>
              <strong style={{ color: '#52c41a' }}>Active & Enforced</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--vg-border)' }}>
              <span style={{ color: 'var(--vg-text-muted)' }}>Multi-Device Cloud Sync:</span>
              <strong style={{ color: '#52c41a' }}>Real-time</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--vg-text-muted)' }}>Deterministic Insights:</span>
              <strong>Active (Zero Paid AI APIs)</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

