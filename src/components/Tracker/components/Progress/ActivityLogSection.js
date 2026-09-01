import React, { useState, useMemo } from 'react';
import { useTracker } from '../../context/TrackerContext';
import {
  IconCheck,
  IconPlus,
  IconTrash,
  IconClock,
  IconSearch,
  IconCalendar,
  IconFlame,
} from '../Common/Icons';
import styles from '../../styles/tracker.module.css';

const LOG_CATEGORIES = [
  'Naam Jap',
  'DSA',
  'AI/ML',
  'Development',
  'Learning',
  'Personal',
  'Health',
  'Other',
];

export default function ActivityLogSection() {
  const { activityLogs, saveActivityLog, deleteActivityLog, openConfirmModal } = useTracker();

  const d = new Date();
  const todayStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  // Form State
  const [category, setCategory] = useState('Naam Jap');
  const [details, setDetails] = useState('');
  const [logDate, setLogDate] = useState(todayStr);
  const [duration, setDuration] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Filter State
  const [selectedFilterCategory, setSelectedFilterCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!details.trim()) {
      setErrorMsg('Please describe what you accomplished.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      await saveActivityLog({
        category,
        details: details.trim(),
        log_date: logDate,
        duration_minutes: duration ? Number(duration) : 0,
      });

      // Reset form
      setDetails('');
      setDuration('');
    } catch (err) {
      console.error('Error saving activity log:', err);
      setErrorMsg(err.message || 'Failed to save activity log.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (log) => {
    openConfirmModal(
      'Delete Activity Log?',
      `Are you sure you want to remove "${log.details.slice(0, 40)}${log.details.length > 40 ? '...' : ''}"?`,
      () => deleteActivityLog(log.id)
    );
  };

  // Filtered Logs
  const filteredLogs = useMemo(() => {
    return (activityLogs || []).filter((log) => {
      if (selectedFilterCategory !== 'All' && log.category !== selectedFilterCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchDetails = log.details?.toLowerCase().includes(q);
        const matchCat = log.category?.toLowerCase().includes(q);
        if (!matchDetails && !matchCat) return false;
      }
      return true;
    });
  }, [activityLogs, selectedFilterCategory, searchQuery]);

  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'Naam Jap':
        return { bg: 'rgba(250, 140, 22, 0.15)', text: '#ffa940', border: 'rgba(250, 140, 22, 0.35)' };
      case 'DSA':
        return { bg: 'rgba(82, 196, 26, 0.14)', text: '#73d13d', border: 'rgba(82, 196, 26, 0.35)' };
      case 'AI/ML':
        return { bg: 'rgba(114, 46, 209, 0.16)', text: '#b37feb', border: 'rgba(114, 46, 209, 0.35)' };
      case 'Development':
        return { bg: 'rgba(24, 144, 255, 0.14)', text: '#69c0ff', border: 'rgba(24, 144, 255, 0.35)' };
      case 'Learning':
        return { bg: 'rgba(19, 194, 194, 0.14)', text: '#5cdbd3', border: 'rgba(19, 194, 194, 0.35)' };
      case 'Health':
        return { bg: 'rgba(255, 77, 79, 0.14)', text: '#ff7875', border: 'rgba(255, 77, 79, 0.35)' };
      default:
        return { bg: 'var(--vg-surface-strong)', text: 'var(--vg-text)', border: 'var(--vg-border)' };
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1.5rem' }}>
      {/* 1. Quick "Done Log" Capture Card */}
      <div className={styles.card} style={{ border: '1px solid rgba(255, 77, 79, 0.25)', position: 'relative', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent, var(--vg-accent), transparent)',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'var(--vg-accent)', display: 'flex' }}>
                <IconCheck size={18} />
              </span>
              <h2 className={styles.cardTitle} style={{ margin: 0 }}>Quick Done Logger</h2>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--vg-text-muted)', margin: '0.25rem 0 0 0' }}>
              Log what you accomplished retroactively without creating ahead-of-time tasks.
            </p>
          </div>

          <span
            style={{
              fontFamily: 'var(--ifm-font-family-monospace)',
              fontSize: '0.72rem',
              color: 'var(--vg-accent)',
              background: 'var(--vg-accent-subtle)',
              border: '1px solid var(--vg-accent-border)',
              padding: '0.15rem 0.55rem',
              borderRadius: '9999px',
            }}
          >
            Daily Retrospective
          </span>
        </div>

        {errorMsg && (
          <div
            style={{
              fontSize: '0.8rem',
              color: 'var(--vg-accent)',
              marginBottom: '0.75rem',
              padding: '0.4rem 0.75rem',
              background: 'rgba(255, 77, 79, 0.1)',
              borderRadius: 'var(--vg-radius-sm)',
            }}
          >
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {/* Category Select */}
            <div style={{ flex: '1 1 180px', minWidth: '150px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--vg-text-muted)', marginBottom: '0.3rem', display: 'block' }}>
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={styles.select}
                style={{ width: '100%' }}
              >
                {LOG_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'Naam Jap' ? '🌸 Naam Jap' : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Input */}
            <div style={{ flex: '1 1 160px', minWidth: '140px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--vg-text-muted)', marginBottom: '0.3rem', display: 'block' }}>
                Date
              </label>
              <input
                type="date"
                value={logDate}
                onChange={(e) => setLogDate(e.target.value)}
                className={styles.input}
                style={{ width: '100%' }}
              />
            </div>

            {/* Duration (Optional) */}
            <div style={{ flex: '1 1 120px', minWidth: '110px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--vg-text-muted)', marginBottom: '0.3rem', display: 'block' }}>
                Duration (mins, optional)
              </label>
              <input
                type="number"
                min="0"
                placeholder="e.g. 45"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className={styles.input}
                style={{ width: '100%' }}
              />
            </div>
          </div>

          {/* Details / What things have been done */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--vg-text-muted)', marginBottom: '0.3rem', display: 'block' }}>
              What things have you done?
            </label>
            <input
              type="text"
              placeholder={category === 'Naam Jap' ? 'e.g. Completed 16 rounds of Naam Jap with full focus' : 'e.g. Solved 3 LeetCode DP problems, refactored database queries...'}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className={styles.input}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.25rem' }}>
            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.btnPrimary}
              style={{ padding: '0.5rem 1.25rem' }}
            >
              <IconPlus size={15} />
              <span>{isSubmitting ? 'Logging...' : 'Log Activity'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* 2. Activity Timeline & Logs List */}
      <div className={styles.card}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h3 className={styles.cardTitle} style={{ margin: 0 }}>
              Activity Log History ({activityLogs?.length || 0})
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--vg-text-muted)', margin: '0.2rem 0 0 0' }}>
              Chronological log of completed engineering, learning, and discipline sessions.
            </p>
          </div>

          {/* Search */}
          <div style={{ position: 'relative', width: '220px' }}>
            <span style={{ position: 'absolute', left: '0.65rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--vg-text-muted)', display: 'flex' }}>
              <IconSearch size={14} />
            </span>
            <input
              type="text"
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.input}
              style={{ paddingLeft: '2rem', padding: '0.35rem 0.6rem 0.35rem 2rem', fontSize: '0.8rem' }}
            />
          </div>
        </div>

        {/* Category Filter Chips */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          {['All', ...LOG_CATEGORIES].map((cat) => {
            const isActive = selectedFilterCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedFilterCategory(cat)}
                style={{
                  fontSize: '0.74rem',
                  fontWeight: 500,
                  padding: '0.25rem 0.65rem',
                  borderRadius: '9999px',
                  background: isActive ? 'var(--vg-accent)' : 'var(--vg-surface)',
                  color: isActive ? '#ffffff' : 'var(--vg-text-muted)',
                  border: `1px solid ${isActive ? 'var(--vg-accent)' : 'var(--vg-border)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat === 'Naam Jap' ? '🌸 Naam Jap' : cat}
              </button>
            );
          })}
        </div>

        {/* Logs Feed */}
        {filteredLogs.length === 0 ? (
          <div style={{ padding: '2.5rem 1rem', textAlign: 'center', color: 'var(--vg-text-muted)' }}>
            <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 500 }}>No activity logged yet.</p>
            <p style={{ margin: '0.35rem 0 0 0', fontSize: '0.78rem' }}>
              Use the Quick Done Logger above to log your daily achievements and routines.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {filteredLogs.map((log) => {
              const catStyle = getCategoryColor(log.category);
              const isToday = log.log_date === todayStr;

              return (
                <div
                  key={log.id}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    padding: '0.85rem 1rem',
                    background: 'var(--vg-surface)',
                    border: '1px solid var(--vg-border)',
                    borderRadius: 'var(--vg-radius-sm)',
                    transition: 'border-color 0.2s ease, transform 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          padding: '0.15rem 0.5rem',
                          borderRadius: '4px',
                          background: catStyle.bg,
                          color: catStyle.text,
                          border: `1px solid ${catStyle.border}`,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                        }}
                      >
                        {log.category === 'Naam Jap' && '🌸 '}
                        {log.category}
                      </span>

                      <span
                        style={{
                          fontSize: '0.72rem',
                          color: isToday ? 'var(--vg-accent)' : 'var(--vg-text-muted)',
                          fontWeight: isToday ? 600 : 400,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                        }}
                      >
                        <IconCalendar size={11} />
                        {isToday ? 'Today' : log.log_date}
                      </span>

                      {log.duration_minutes > 0 && (
                        <span
                          style={{
                            fontSize: '0.72rem',
                            color: 'var(--vg-text-muted)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.2rem',
                          }}
                        >
                          <IconClock size={11} />
                          {log.duration_minutes} mins
                        </span>
                      )}
                    </div>

                    <div
                      style={{
                        fontSize: '0.88rem',
                        color: 'var(--vg-text)',
                        lineHeight: '1.45',
                        wordBreak: 'break-word',
                      }}
                    >
                      {log.details}
                    </div>
                  </div>

                  <button
                    type="button"
                    className={styles.iconBtn}
                    onClick={() => handleDelete(log)}
                    title="Delete Log"
                    style={{ color: 'var(--vg-text-muted)', flexShrink: 0, padding: '0.3rem' }}
                  >
                    <IconTrash size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}