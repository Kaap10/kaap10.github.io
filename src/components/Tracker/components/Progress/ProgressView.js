import React, { useMemo } from 'react';
import { useTracker } from '../../context/TrackerContext';
import ActivityGraph from './ActivityGraph';
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import {
  IconProgress,
  IconTasks,
  IconFocus,
  IconFlame,
  IconTrophy,
} from '../Common/Icons';
import styles from '../../styles/tracker.module.css';

// Custom Dark Mode Tooltip for Recharts
function CustomTooltip({ active, payload, label, unit = '' }) {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: '#1a1a1a',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '6px',
          padding: '0.5rem 0.75rem',
          fontSize: '0.78rem',
          color: '#ffffff',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
        }}
      >
        <div style={{ fontWeight: 600, marginBottom: '0.25rem', color: 'rgba(255, 255, 255, 0.8)' }}>
          {label}
        </div>
        {payload.map((entry, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.15rem' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: entry.color }} />
            <span>
              {entry.name}: <strong>{entry.value} {unit}</strong>
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export default function ProgressView() {
  const { tasks, focusSessions, lifetimeStats } = useTracker();

  // 1. Last 7 Days Task Velocity (Recharts data)
  const taskVelocityData = useMemo(() => {
    const now = new Date();
    const list = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;


      const planned = tasks.filter((t) => t.due_date === dStr || t.created_at?.startsWith(dStr)).length;
      const completed = tasks.filter((t) => t.status === 'completed' && t.completed_at?.startsWith(dStr)).length;

      list.push({
        day: dayNames[d.getDay()],
        date: dStr,
        Planned: planned,
        Completed: completed,
      });
    }

    return list;
  }, [tasks]);

  // 2. Last 7 Days Deep Work Focus Time (Recharts data)
  const focusTimeData = useMemo(() => {
    const now = new Date();
    const list = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;


      const totalSecs = focusSessions
        .filter((s) => (s.completed_at || s.created_at)?.startsWith(dStr))
        .reduce((acc, s) => acc + (Number(s.duration) || 0), 0);

      const hours = Number((totalSecs / 3600).toFixed(1));
      const mins = Math.round(totalSecs / 60);

      list.push({
        day: dayNames[d.getDay()],
        date: dStr,
        Hours: hours,
        Minutes: mins,
      });
    }

    return list;
  }, [focusSessions]);

  // 3. Category Distribution Data
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

      {/* Two-Column Recharts Visualizations */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Left: Recharts 7-Day Velocity Bar Chart */}
        <div className={styles.card}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 className={styles.cardTitle}>7-Day Task Completion Velocity</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--vg-text-muted)' }}>Planned vs Completed</span>
          </div>

          <div style={{ height: '220px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={taskVelocityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
                <XAxis dataKey="day" stroke="var(--vg-text-muted)" fontSize={12} tickLine={false} axisLine={{ stroke: 'var(--vg-border)' }} />
                <YAxis stroke="var(--vg-text-muted)" fontSize={12} allowDecimals={false} tickLine={false} axisLine={{ stroke: 'var(--vg-border)' }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="Planned" fill="rgba(255, 255, 255, 0.15)" radius={[3, 3, 0, 0]} maxBarSize={20} isAnimationActive={false} />
                <Bar dataKey="Completed" fill="var(--vg-accent)" radius={[3, 3, 0, 0]} maxBarSize={20} isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '0.75rem', fontSize: '0.78rem', color: 'var(--vg-text-muted)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <div style={{ width: '8px', height: '8px', background: 'rgba(255, 255, 255, 0.15)', borderRadius: '2px' }} />
              <span>Planned</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <div style={{ width: '8px', height: '8px', background: 'var(--vg-accent)', borderRadius: '2px' }} />
              <span>Completed</span>
            </div>
          </div>
        </div>

        {/* Right: Recharts 7-Day Focus Time Area Chart */}
        <div className={styles.card}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 className={styles.cardTitle}>7-Day Deep Work Focus Time</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--vg-text-muted)' }}>Hours per Day</span>
          </div>

          <div style={{ height: '220px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={focusTimeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="focusGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fa8c16" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#fa8c16" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
                <XAxis dataKey="day" stroke="var(--vg-text-muted)" fontSize={12} tickLine={false} axisLine={{ stroke: 'var(--vg-border)' }} />
                <YAxis stroke="var(--vg-text-muted)" fontSize={12} tickLine={false} axisLine={{ stroke: 'var(--vg-border)' }} />
                <Tooltip content={<CustomTooltip unit="hrs" />} />
                <Area type="monotone" dataKey="Hours" stroke="#fa8c16" strokeWidth={2} fillOpacity={1} fill="url(#focusGradient)" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '0.75rem', fontSize: '0.78rem', color: 'var(--vg-text-muted)' }}>
            <span>Orange area indicates daily focused execution volume (hours).</span>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle} style={{ marginBottom: '1rem' }}>
          Work Distribution by Category
        </h3>

        {categoryStats.length === 0 ? (
          <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--vg-text-muted)', fontSize: '0.85rem' }}>
            No categorized task data available yet.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {categoryStats.map((item) => (
              <div key={item.category} style={{ padding: '0.75rem', background: 'var(--vg-surface)', borderRadius: 'var(--vg-radius-sm)', border: '1px solid var(--vg-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '0.84rem' }}>
                  <span style={{ fontWeight: 500, color: 'var(--vg-text)' }}>{item.category}</span>
                  <span style={{ color: 'var(--vg-text-muted)' }}>{item.count} tasks ({item.pct}%)</span>
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
  );
}
