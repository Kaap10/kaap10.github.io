import React, { useState, useEffect, useRef } from 'react';
import { useTracker } from '../../context/TrackerContext';
import {
  IconFocus,
  IconPlay,
  IconPause,
  IconRotateCcw,
  IconCheck,
  IconClock,
  IconTrash,
  IconAlertCircle,
} from '../Common/Icons';
import styles from '../../styles/tracker.module.css';

const FOCUS_STORAGE_KEY = 'kaap10_active_focus_session';

const PRESETS = [
  { label: '25m Pomodoro', seconds: 25 * 60 },
  { label: '50m Deep Work', seconds: 50 * 60 },
  { label: '90m Ultra Flow', seconds: 90 * 60 },
  { label: 'Stopwatch (Count-up)', seconds: 0 },
];

export default function FocusView() {
  const {
    tasks,
    goals,
    focusSessions,
    focusStats,
    saveFocusSession,
    deleteFocusSession,
    openConfirmModal,
  } = useTracker();

  // Mode: countdown or stopwatch
  const [selectedPreset, setSelectedPreset] = useState(25 * 60);
  const [mode, setMode] = useState('countdown'); // 'countdown' | 'stopwatch'
  const [secondsRemaining, setSecondsRemaining] = useState(25 * 60);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState('');
  const [sessionNotes, setSessionNotes] = useState('');
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const timerRef = useRef(null);

  // Restore active session state from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(FOCUS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.startTime) {
          const now = Date.now();
          const elapsed = Math.floor((now - parsed.startTime) / 1000) + (parsed.accumulated || 0);

          setSelectedTaskId(parsed.taskId || '');
          setSessionNotes(parsed.notes || '');
          setSessionStartTime(parsed.isoStartTime || new Date().toISOString());
          setMode(parsed.mode || 'countdown');

          if (parsed.mode === 'stopwatch') {
            setElapsedSeconds(elapsed);
            setIsActive(parsed.isActive);
          } else {
            const rem = Math.max(0, (parsed.totalPreset || 25 * 60) - elapsed);
            setSecondsRemaining(rem);
            setElapsedSeconds(elapsed);
            setIsActive(parsed.isActive && rem > 0);
          }
        }
      }
    } catch (e) {
      console.warn('Failed to restore active focus session:', e);
    }
  }, []);

  // Save active timer progress to localStorage periodically
  useEffect(() => {
    if (isActive) {
      const state = {
        startTime: Date.now(),
        accumulated: elapsedSeconds,
        totalPreset: selectedPreset,
        mode,
        taskId: selectedTaskId,
        notes: sessionNotes,
        isoStartTime: sessionStartTime || new Date().toISOString(),
        isActive: true,
      };
      localStorage.setItem(FOCUS_STORAGE_KEY, JSON.stringify(state));
    }
  }, [isActive, elapsedSeconds, selectedPreset, mode, selectedTaskId, sessionNotes, sessionStartTime]);

  // Timer Tick
  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);

        if (mode === 'countdown') {
          setSecondsRemaining((prev) => {
            if (prev <= 1) {
              clearInterval(timerRef.current);
              setIsActive(false);
              return 0;
            }
            return prev - 1;
          });
        }
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isActive, mode]);

  const handleStart = () => {
    setErrorMsg('');
    if (!sessionStartTime) {
      setSessionStartTime(new Date().toISOString());
    }
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setElapsedSeconds(0);
    setSecondsRemaining(selectedPreset);
    setSessionStartTime(null);
    localStorage.removeItem(FOCUS_STORAGE_KEY);
  };

  const handlePresetSelect = (preset) => {
    if (isActive) return;
    if (preset.seconds === 0) {
      setMode('stopwatch');
      setSelectedPreset(0);
      setElapsedSeconds(0);
      setSecondsRemaining(0);
    } else {
      setMode('countdown');
      setSelectedPreset(preset.seconds);
      setSecondsRemaining(preset.seconds);
      setElapsedSeconds(0);
    }
    setSessionStartTime(null);
    localStorage.removeItem(FOCUS_STORAGE_KEY);
  };

  const handleFinishSession = async () => {
    if (elapsedSeconds < 10) {
      setErrorMsg('Focus session duration must be at least 10 seconds to save.');
      return;
    }

    setSaving(true);
    setErrorMsg('');

    try {
      const selectedTask = tasks.find((t) => t.id === selectedTaskId);

      await saveFocusSession({
        task_id: selectedTaskId || null,
        goal_id: selectedTask?.goal_id || null,
        duration: elapsedSeconds,
        started_at: sessionStartTime || new Date(Date.now() - elapsedSeconds * 1000).toISOString(),
        completed_at: new Date().toISOString(),
        notes: sessionNotes.trim() || null,
      });

      // Clear timer
      handleReset();
      setSessionNotes('');
    } catch (err) {
      console.error('Error completing focus session:', err);
      setErrorMsg(err.message || 'Failed to save focus session.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSession = (session) => {
    openConfirmModal(
      'Delete Focus Log?',
      'Are you sure you want to remove this logged focus session?',
      () => deleteFocusSession(session.id)
    );
  };

  // Format MM:SS or HH:MM:SS
  const formatTime = (totalSecs) => {
    const hours = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;

    const pad = (n) => String(n).padStart(2, '0');

    if (hours > 0) {
      return `${pad(hours)}:${pad(mins)}:${pad(secs)}`;
    }
    return `${pad(mins)}:${pad(secs)}`;
  };

  const displayTime = mode === 'countdown' ? formatTime(secondsRemaining) : formatTime(elapsedSeconds);

  return (
    <div className={styles.viewContainer}>
      {/* Header */}
      <div className={styles.viewHeader}>
        <div>
          <h1 className={styles.viewTitle}>Deep Work Focus Mode</h1>
          <p className={styles.viewSubtitle}>
            Eliminate distractions with interval timers, stopwatch flow tracking, and task linkage.
          </p>
        </div>
      </div>

      {/* Focus Metric Overview */}
      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <span className={styles.metricLabel}>Today's Focus</span>
            <IconClock size={18} className={styles.metricIcon} />
          </div>
          <div className={styles.metricValue}>{focusStats.todayHours} <span style={{ fontSize: '1rem', color: 'var(--vg-text-muted)' }}>hours</span></div>
          <div style={{ fontSize: '0.8rem', color: 'var(--vg-text-muted)', marginTop: '0.5rem' }}>
            {focusStats.todayMinutes} active minutes logged today
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <span className={styles.metricLabel}>This Week</span>
            <IconFocus size={18} className={styles.metricIcon} />
          </div>
          <div className={styles.metricValue}>{focusStats.weekHours} <span style={{ fontSize: '1rem', color: 'var(--vg-text-muted)' }}>hours</span></div>
          <div style={{ fontSize: '0.8rem', color: 'var(--vg-text-muted)', marginTop: '0.5rem' }}>
            Across {focusSessions.length} total deep work sessions
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <span className={styles.metricLabel}>All-Time Deep Work</span>
            <IconFocus size={18} className={styles.metricIcon} />
          </div>
          <div className={styles.metricValue}>{focusStats.totalHours} <span style={{ fontSize: '1rem', color: 'var(--vg-text-muted)' }}>hours</span></div>
          <div style={{ fontSize: '0.8rem', color: 'var(--vg-text-muted)', marginTop: '0.5rem' }}>
            Lifetime cumulative deep work immersion
          </div>
        </div>
      </div>

      {/* Main Timer Workspace */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
        {/* Left: Timer Display & Controls */}
        <div className={styles.card} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2.5rem 1.5rem' }}>
          {/* Preset Buttons */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {PRESETS.map((p) => {
              const isSelected = p.seconds === selectedPreset && (p.seconds === 0 ? mode === 'stopwatch' : mode === 'countdown');
              return (
                <button
                  key={p.label}
                  type="button"
                  disabled={isActive}
                  className={`${styles.filterTab} ${isSelected ? styles.filterTabActive : ''}`}
                  onClick={() => handlePresetSelect(p)}
                  style={{ opacity: isActive && !isSelected ? 0.4 : 1 }}
                >
                  {p.label}
                </button>
              );
            })}
          </div>

          {/* Big Timer Digits */}
          <div
            style={{
              fontFamily: 'var(--vg-font-mono)',
              fontSize: '4.5rem',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: isActive ? 'var(--vg-accent)' : 'var(--vg-text)',
              marginBottom: '0.5rem',
              lineHeight: 1,
            }}
          >
            {displayTime}
          </div>

          <div style={{ fontSize: '0.85rem', color: 'var(--vg-text-muted)', marginBottom: '2rem' }}>
            {mode === 'countdown' ? (
              <span>Elapsed: {formatTime(elapsedSeconds)} · Interval Mode</span>
            ) : (
              <span>Stopwatch Mode · Counting Deep Flow</span>
            )}
          </div>

          {errorMsg && (
            <div
              style={{
                background: 'rgba(255, 77, 79, 0.12)',
                border: '1px solid var(--vg-accent-border)',
                borderRadius: 'var(--vg-radius-sm)',
                padding: '0.65rem 0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.82rem',
                color: 'var(--vg-accent)',
                marginBottom: '1.5rem',
              }}
            >
              <IconAlertCircle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Control Buttons */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {!isActive ? (
              <button
                type="button"
                className={styles.btnPrimary}
                onClick={handleStart}
                style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}
              >
                <IconPlay size={18} />
                <span>Start Session</span>
              </button>
            ) : (
              <button
                type="button"
                className={styles.btnSecondary}
                onClick={handlePause}
                style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}
              >
                <IconPause size={18} />
                <span>Pause</span>
              </button>
            )}

            <button
              type="button"
              className={styles.btnSecondary}
              onClick={handleReset}
              title="Reset Timer"
              style={{ padding: '0.75rem 1rem' }}
            >
              <IconRotateCcw size={16} />
            </button>

            {elapsedSeconds >= 10 && (
              <button
                type="button"
                className={styles.btnPrimary}
                onClick={handleFinishSession}
                disabled={saving}
                style={{
                  padding: '0.75rem 1.5rem',
                  fontSize: '0.92rem',
                  background: 'var(--vg-success, #52c41a)',
                  borderColor: 'var(--vg-success, #52c41a)',
                }}

              >
                <IconCheck size={16} />
                <span>{saving ? 'Saving...' : 'Save Log'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Right: Task Association & Notes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle} style={{ marginBottom: '1rem' }}>
              Session Linkage & Notes
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Focusing on Task</label>
                <select
                  value={selectedTaskId}
                  onChange={(e) => setSelectedTaskId(e.target.value)}
                  className={styles.select}
                >
                  <option value="">No Specific Task (General Focus)</option>
                  {tasks
                    .filter((t) => t.status !== 'completed')
                    .map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.title} ({t.category})
                      </option>
                    ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Session Reflection / Notes</label>
                <textarea
                  placeholder="What did you accomplish? Any breakthroughs or roadblocks..."
                  value={sessionNotes}
                  onChange={(e) => setSessionNotes(e.target.value)}
                  className={styles.textarea}
                  rows={4}
                />
              </div>
            </div>
          </div>

          {/* Recent Focus History */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle} style={{ marginBottom: '0.75rem' }}>
              Recent Deep Work Logs
            </h3>

            {focusSessions.length === 0 ? (
              <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--vg-text-muted)', fontSize: '0.82rem' }}>
                No focus sessions logged yet. Start your first session above!
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '220px', overflowY: 'auto' }}>
                {focusSessions.slice(0, 5).map((s) => {
                  const durationMins = Math.round((Number(s.duration) || 0) / 60);
                  const taskObj = tasks.find((t) => t.id === s.task_id);
                  const logDate = (s.completed_at || s.created_at).split('T')[0];

                  return (
                    <div
                      key={s.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.5rem 0.75rem',
                        borderRadius: 'var(--vg-radius-sm)',
                        background: 'var(--vg-surface)',
                        border: '1px solid var(--vg-border)',
                        fontSize: '0.82rem',
                      }}
                    >
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div style={{ fontWeight: 500, color: 'var(--vg-text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {taskObj ? taskObj.title : 'Deep Work Session'}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--vg-text-muted)' }}>
                          {logDate} · {durationMins} mins {s.notes ? `· "${s.notes.slice(0, 30)}..."` : ''}
                        </div>
                      </div>

                      <button
                        type="button"
                        className={styles.iconBtn}
                        onClick={() => handleDeleteSession(s)}
                        style={{ color: 'var(--vg-accent)', padding: '0.2rem' }}
                        title="Delete Log"
                      >
                        <IconTrash size={13} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

