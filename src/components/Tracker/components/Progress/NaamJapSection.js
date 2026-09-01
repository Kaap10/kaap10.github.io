import React, { useState, useEffect, useMemo } from 'react';
import { useTracker } from '../../context/TrackerContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import {
  IconPlus,
  IconTrash,
  IconCheck,
  IconCalendar,
  IconClock,
  IconFlame,
} from '../Common/Icons';
import styles from '../../styles/tracker.module.css';

const JAP_STORAGE_KEY = 'kaap10_naam_jap_logs';

function formatNumber(num) {
  return (num || 0).toLocaleString();
}

// Custom Tooltip for Recharts
function JapTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: 'var(--vg-surface, #2E2E31)',
          border: '1px solid var(--vg-border-hover, rgba(255, 255, 255, 0.16))',
          borderRadius: '8px',
          padding: '0.65rem 0.85rem',
          fontSize: '0.8rem',
          color: 'var(--vg-text, #F5F5F7)',
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.6)',
        }}
      >
        <div style={{ fontWeight: 600, marginBottom: '0.25rem', color: 'var(--vg-text-muted, #A6A6AC)' }}>
          {label}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff7875' }} />
          <span>
            Japs: <strong style={{ color: '#fff' }}>{formatNumber(payload[0].value)}</strong>
          </span>
        </div>
      </div>
    );
  }
  return null;
}

export default function NaamJapSection() {
  const { openConfirmModal } = useTracker();

  const d = new Date();
  const todayStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  // Local State for Naam Jap Logs
  const [japLogs, setJapLogs] = useState(() => {
    try {
      const saved = localStorage.getItem(JAP_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return [
      {
        id: 'jap_demo_1',
        count: 1080,
        date: todayStr,
        notes: 'Morning contemplation (10 Malas)',
        created_at: new Date().toISOString(),
      },
    ];
  });

  // Form State
  const [count, setCount] = useState('');
  const [logDate, setLogDate] = useState(todayStr);
  const [notes, setNotes] = useState('');
  const [timeRange, setTimeRange] = useState('weekly'); // 'weekly' | 'monthly' | 'yearly'
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(JAP_STORAGE_KEY, JSON.stringify(japLogs));
    } catch (_) {}
  }, [japLogs]);

  // Handle Log Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const num = parseInt(count, 10);
    if (isNaN(num) || num <= 0) {
      setErrorMsg('Please enter a valid positive number of Japs.');
      return;
    }
    if (!logDate) {
      setErrorMsg('Please select a valid date.');
      return;
    }

    const newLog = {
      id: 'jap_' + Date.now(),
      count: num,
      date: logDate,
      notes: notes.trim(),
      created_at: new Date().toISOString(),
    };

    setJapLogs((prev) => [newLog, ...prev]);
    setCount('');
    setNotes('');
    setErrorMsg('');
    setSuccessMsg(`Logged ${formatNumber(num)} Japs for ${logDate}!`);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  // Quick Preset Increment Helper
  const handleQuickAdd = (amount) => {
    const current = parseInt(count, 10) || 0;
    setCount(String(current + amount));
  };

  // Delete Log
  const handleDelete = (log) => {
    openConfirmModal(
      'Delete Naam Jap Entry?',
      `Are you sure you want to remove ${formatNumber(log.count)} Japs logged on ${log.date}?`,
      () => {
        setJapLogs((prev) => prev.filter((item) => item.id !== log.id));
      }
    );
  };

  // ============================================================================
  // Metrics Computation (Today, Weekly, Monthly, Yearly, Lifetime)
  // ============================================================================
  const stats = useMemo(() => {
    const now = new Date();
    const curYear = now.getFullYear();
    const curMonth = now.getMonth();

    // Start of Week (Sunday)
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    let todayCount = 0;
    let weekCount = 0;
    let monthCount = 0;
    let yearCount = 0;
    let lifetimeCount = 0;

    japLogs.forEach((log) => {
      const c = Number(log.count) || 0;
      lifetimeCount += c;

      if (log.date === todayStr) {
        todayCount += c;
      }

      const logDateObj = new Date(log.date + 'T00:00:00');
      if (logDateObj >= startOfWeek && logDateObj <= now) {
        weekCount += c;
      }

      if (logDateObj.getFullYear() === curYear && logDateObj.getMonth() === curMonth) {
        monthCount += c;
      }

      if (logDateObj.getFullYear() === curYear) {
        yearCount += c;
      }
    });

    return {
      todayCount,
      weekCount,
      monthCount,
      yearCount,
      lifetimeCount,
    };
  }, [japLogs, todayStr]);

  // ============================================================================
  // Recharts Data Aggregation (Weekly, Monthly, Yearly)
  // ============================================================================
  const chartData = useMemo(() => {
    const now = new Date();

    if (timeRange === 'weekly') {
      // Last 7 Days
      const list = [];
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      for (let i = 6; i >= 0; i--) {
        const dObj = new Date(now);
        dObj.setDate(dObj.getDate() - i);
        const dStr = `${dObj.getFullYear()}-${String(dObj.getMonth() + 1).padStart(2, '0')}-${String(dObj.getDate()).padStart(2, '0')}`;
        const total = japLogs
          .filter((l) => l.date === dStr)
          .reduce((acc, l) => acc + (Number(l.count) || 0), 0);

        list.push({
          label: dayNames[dObj.getDay()],
          fullDate: dStr,
          japs: total,
        });
      }
      return list;
    }

    if (timeRange === 'monthly') {
      // Last 30 Days
      const list = [];
      for (let i = 29; i >= 0; i--) {
        const dObj = new Date(now);
        dObj.setDate(dObj.getDate() - i);
        const dStr = `${dObj.getFullYear()}-${String(dObj.getMonth() + 1).padStart(2, '0')}-${String(dObj.getDate()).padStart(2, '0')}`;
        const total = japLogs
          .filter((l) => l.date === dStr)
          .reduce((acc, l) => acc + (Number(l.count) || 0), 0);

        list.push({
          label: `${dObj.getDate()}/${dObj.getMonth() + 1}`,
          fullDate: dStr,
          japs: total,
        });
      }
      return list;
    }

    if (timeRange === 'yearly') {
      // 12 Months of Current Year
      const list = [];
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const curYear = now.getFullYear();

      for (let m = 0; m < 12; m++) {
        const total = japLogs
          .filter((l) => {
            const lDate = new Date(l.date + 'T00:00:00');
            return lDate.getFullYear() === curYear && lDate.getMonth() === m;
          })
          .reduce((acc, l) => acc + (Number(l.count) || 0), 0);

        list.push({
          label: monthNames[m],
          japs: total,
        });
      }
      return list;
    }

    return [];
  }, [japLogs, timeRange]);

  return (
    <div style={{ marginTop: '3rem' }}>
      {/* Section Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.25rem' }}>🌸</span>
            <h2 className={styles.sectionTitle} style={{ margin: 0 }}>Naam Jap Tracker</h2>
          </div>
          <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: 'var(--vg-text-muted)' }}>
            Log and review sacred chanting counts across weekly, monthly, and yearly horizons.
          </p>
        </div>

        {/* Time Horizon Filter Tabs */}
        <div style={{ display: 'flex', gap: '0.35rem', background: 'var(--vg-surface, #2E2E31)', padding: '0.25rem', borderRadius: '8px', border: '1px solid var(--vg-border)' }}>
          {['weekly', 'monthly', 'yearly'].map((t) => (
            <button
              key={t}
              type="button"
              className={`${styles.filterTab} ${timeRange === t ? styles.filterTabActive : ''}`}
              onClick={() => setTimeRange(t)}
              style={{ textTransform: 'capitalize', fontSize: '0.75rem', padding: '0.25rem 0.65rem' }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Horizon Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {/* Today */}
        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <span className={styles.metricLabel}>Today</span>
            <IconFlame size={16} className={styles.metricIcon} />
          </div>
          <div className={styles.metricValue} style={{ color: '#ff7875' }}>
            {formatNumber(stats.todayCount)}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--vg-text-muted)', marginTop: '0.35rem' }}>
            Japs logged today
          </div>
        </div>

        {/* This Week */}
        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <span className={styles.metricLabel}>This Week</span>
            <IconCalendar size={16} className={styles.metricIcon} />
          </div>
          <div className={styles.metricValue} style={{ color: '#ff9c6e' }}>
            {formatNumber(stats.weekCount)}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--vg-text-muted)', marginTop: '0.35rem' }}>
            Cumulative week volume
          </div>
        </div>

        {/* This Month */}
        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <span className={styles.metricLabel}>This Month</span>
            <IconClock size={16} className={styles.metricIcon} />
          </div>
          <div className={styles.metricValue} style={{ color: '#ffd666' }}>
            {formatNumber(stats.monthCount)}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--vg-text-muted)', marginTop: '0.35rem' }}>
            Current month progress
          </div>
        </div>

        {/* This Year / All-Time */}
        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <span className={styles.metricLabel}>Year ({new Date().getFullYear()})</span>
            <IconCheck size={16} className={styles.metricIcon} />
          </div>
          <div className={styles.metricValue} style={{ color: '#95de64' }}>
            {formatNumber(stats.yearCount)}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--vg-text-muted)', marginTop: '0.35rem' }}>
            All-Time: <strong>{formatNumber(stats.lifetimeCount)}</strong>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Chart + Right Quick Log Form */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        
        {/* Visual Progress Chart */}
        <div className={styles.card} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h3 className={styles.cardTitle} style={{ margin: 0, fontSize: '0.95rem' }}>
              {timeRange === 'weekly' ? '7-Day Jap Velocity' : timeRange === 'monthly' ? '30-Day Chanting Volume' : '12-Month Annual Distribution'}
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--vg-text-muted)', fontFamily: 'var(--ifm-font-family-monospace)' }}>
              {chartData.reduce((acc, c) => acc + c.japs, 0).toLocaleString()} Total
            </span>
          </div>

          <div style={{ width: '100%', height: '240px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
                <XAxis dataKey="label" stroke="#71717a" fontSize={11} tickLine={false} />
                <YAxis stroke="#71717a" fontSize={11} tickLine={false} />
                <Tooltip content={<JapTooltip />} />
                <Bar dataKey="japs" fill="#ff4d4f" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Log Form */}
        <div className={styles.card} style={{ padding: '1.5rem' }}>
          <h3 className={styles.cardTitle} style={{ margin: '0 0 1.25rem', fontSize: '1rem', fontWeight: 600 }}>
            Log Naam Jap Count
          </h3>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
            {/* Number of Japs Input */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.45rem', fontSize: '0.76rem', fontWeight: 600, color: 'var(--vg-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Number of Japs / Count *
              </label>
              <input
                type="number"
                min="1"
                step="1"
                className={styles.input}
                style={{ width: '100%', padding: '0.65rem 0.85rem', fontSize: '0.9rem', borderRadius: '6px' }}
                placeholder="e.g. 108, 1080, 5000"
                value={count}
                onChange={(e) => setCount(e.target.value)}
                required
              />

              {/* Quick Preset Buttons */}
              <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => handleQuickAdd(108)}
                  style={{ background: 'var(--vg-surface-strong, #38383C)', border: '1px solid var(--vg-border, rgba(255,255,255,0.1))', color: 'var(--vg-text, #F5F5F7)', padding: '0.25rem 0.55rem', borderRadius: '5px', fontSize: '0.72rem', cursor: 'pointer', transition: 'background 0.15s ease' }}
                >
                  +108 (1 Mala)
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickAdd(540)}
                  style={{ background: 'var(--vg-surface-strong, #38383C)', border: '1px solid var(--vg-border, rgba(255,255,255,0.1))', color: 'var(--vg-text, #F5F5F7)', padding: '0.25rem 0.55rem', borderRadius: '5px', fontSize: '0.72rem', cursor: 'pointer', transition: 'background 0.15s ease' }}
                >
                  +540 (5 Malas)
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickAdd(1080)}
                  style={{ background: 'var(--vg-surface-strong, #38383C)', border: '1px solid var(--vg-border, rgba(255,255,255,0.1))', color: 'var(--vg-text, #F5F5F7)', padding: '0.25rem 0.55rem', borderRadius: '5px', fontSize: '0.72rem', cursor: 'pointer', transition: 'background 0.15s ease' }}
                >
                  +1,080 (10 Malas)
                </button>
              </div>
            </div>

            {/* Date Input */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.45rem', fontSize: '0.76rem', fontWeight: 600, color: 'var(--vg-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Date *
              </label>
              <input
                type="date"
                className={styles.input}
                style={{ width: '100%', padding: '0.65rem 0.85rem', fontSize: '0.9rem', borderRadius: '6px' }}
                value={logDate}
                onChange={(e) => setLogDate(e.target.value)}
                required
              />
            </div>

            {/* Optional Notes */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.45rem', fontSize: '0.76rem', fontWeight: 600, color: 'var(--vg-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Contemplation / Notes (Optional)
              </label>
              <input
                type="text"
                className={styles.input}
                style={{ width: '100%', padding: '0.65rem 0.85rem', fontSize: '0.9rem', borderRadius: '6px' }}
                placeholder="e.g. Morning meditation, Om Namah Shivaya"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            {errorMsg && <div style={{ color: '#ff4d4f', fontSize: '0.8rem', fontWeight: 500 }}>{errorMsg}</div>}
            {successMsg && <div style={{ color: '#52c41a', fontSize: '0.8rem', fontWeight: 600 }}>{successMsg}</div>}

            <button
              type="submit"
              className={styles.btnPrimary}
              style={{
                width: '100%',
                padding: '0.7rem 1.25rem',
                fontSize: '0.9rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                borderRadius: '6px',
                marginTop: '0.25rem',
              }}
            >
              <IconPlus size={16} />
              <span>Record Naam Jap</span>
            </button>
          </form>
        </div>

      </div>

      {/* Chronological History Feed */}
      <div className={styles.card} style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h3 className={styles.cardTitle} style={{ margin: 0, fontSize: '0.95rem' }}>
            Naam Jap History ({japLogs.length})
          </h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--vg-text-muted)' }}>
            All-Time Total: <strong style={{ color: 'var(--vg-text)' }}>{formatNumber(stats.lifetimeCount)}</strong>
          </span>
        </div>

        {japLogs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--vg-text-muted)', fontSize: '0.85rem' }}>
            No Naam Jap logs recorded yet. Use the form above to record your first session!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {japLogs.map((log) => (
              <div
                key={log.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  background: 'var(--vg-surface, #2E2E31)',
                  border: '1px solid var(--vg-border)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255, 77, 79, 0.15)', color: '#ff7875', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>
                    🌸
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--vg-text)', fontFamily: 'var(--ifm-font-family-monospace)' }}>
                        {formatNumber(log.count)} Japs
                      </span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--vg-text-muted)', background: 'var(--vg-surface-strong)', padding: '0.1rem 0.45rem', borderRadius: '4px' }}>
                        {log.date}
                      </span>
                    </div>
                    {log.notes && (
                      <div style={{ fontSize: '0.78rem', color: 'var(--vg-text-muted)', marginTop: '0.2rem' }}>
                        {log.notes}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleDelete(log)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--vg-text-subtle, #787880)',
                    cursor: 'pointer',
                    padding: '0.35rem',
                    borderRadius: '4px',
                    transition: 'color 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ff4d4f')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#787880')}
                  title="Delete Log"
                >
                  <IconTrash size={15} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}