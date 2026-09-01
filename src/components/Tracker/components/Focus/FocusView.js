import React, { useState, useEffect, useRef, useCallback } from 'react';
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
    floatWidgetOpen,
    setFloatWidgetOpen,
    setFocusTimerSnapshot,
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

  // Timer refs — wall-clock based, immune to tab throttling
  const rafRef = useRef(null);
  const timerStartedAtRef = useRef(null); // Date.now() when the current run started
  const accumulatedRef = useRef(0);       // seconds accumulated before current run
  const selectedPresetRef = useRef(25 * 60);
  const modeRef = useRef('countdown');

  useEffect(() => {
    selectedPresetRef.current = selectedPreset;
    modeRef.current = mode;
  }, [selectedPreset, mode]);

  // rAF tick — reads wall clock, no drift across tab switches
  const tick = useCallback(() => {
    if (!timerStartedAtRef.current) return;

    const elapsed = Math.floor((Date.now() - timerStartedAtRef.current) / 1000) + accumulatedRef.current;
    setElapsedSeconds(elapsed);

    if (mode === 'countdown') {
      const remaining = Math.max(0, selectedPreset - elapsed);
      setSecondsRemaining(remaining);
      setFocusTimerSnapshot((prev) => ({
        ...prev,
        isActive: true,
        mode,
        secondsRemaining: remaining,
        elapsedSeconds: elapsed,
        selectedPreset,
      }));
      if (remaining <= 0) {
        // Timer done — stop
        timerStartedAtRef.current = null;
        accumulatedRef.current = selectedPreset;
        setIsActive(false);
        const finalState = {
          startedAt: null,
          accumulated: selectedPreset,
          totalPreset: selectedPreset,
          mode,
          taskId: selectedTaskId,
          notes: sessionNotes,
          isoStartTime: sessionStartTime || new Date().toISOString(),
          isActive: false,
        };
        localStorage.setItem(FOCUS_STORAGE_KEY, JSON.stringify(finalState));
        window.dispatchEvent(new CustomEvent('focusWidget:stateChange', { detail: finalState }));
        setFocusTimerSnapshot((prev) => ({ ...prev, isActive: false, secondsRemaining: 0, elapsedSeconds: selectedPreset }));
        return;
      }
    } else {
      setFocusTimerSnapshot((prev) => ({
        ...prev,
        isActive: true,
        mode,
        elapsedSeconds: elapsed,
        selectedPreset,
      }));
    }

    rafRef.current = requestAnimationFrame(tick);
  }, [mode, selectedPreset, selectedTaskId, sessionNotes, sessionStartTime, setFocusTimerSnapshot]);

  useEffect(() => {
    if (isActive) {
      if (!timerStartedAtRef.current) {
        timerStartedAtRef.current = Date.now();
      }
      accumulatedRef.current = elapsedSeconds;
      rafRef.current = requestAnimationFrame(tick);
    } else {
      cancelAnimationFrame(rafRef.current);
      timerStartedAtRef.current = null;
    }

    return () => cancelAnimationFrame(rafRef.current);
  }, [isActive, tick]); // eslint-disable-line react-hooks/exhaustive-deps

  // Restore active session from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(FOCUS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const preset = parsed.totalPreset ?? 25 * 60;
        const savedMode = parsed.mode || 'countdown';
        const isRun = !!parsed.isActive;

        let elapsed = parsed.accumulated || 0;
        if (isRun && parsed.startedAt) {
          elapsed = Math.floor((Date.now() - parsed.startedAt) / 1000) + (parsed.accumulated || 0);
        }

        setSelectedTaskId(parsed.taskId || '');
        setSessionNotes(parsed.notes || '');
        setSessionStartTime(parsed.isoStartTime || new Date().toISOString());
        setMode(savedMode);
        setSelectedPreset(preset);
        accumulatedRef.current = elapsed;
        setElapsedSeconds(elapsed);

        if (savedMode === 'stopwatch') {
          setIsActive(isRun);
          if (isRun) timerStartedAtRef.current = parsed.startedAt || Date.now();
        } else {
          const rem = Math.max(0, preset - elapsed);
          setSecondsRemaining(rem);
          setIsActive(isRun && rem > 0);
          if (isRun && rem > 0) timerStartedAtRef.current = parsed.startedAt || Date.now();
        }
      }
    } catch (e) {
      console.warn('Failed to restore focus session:', e);
    }
  }, []);

  // Listen for sync events from GlobalTimerWidget / PiP Window
  useEffect(() => {
    const onStateChange = (e) => {
      const d = e.detail;
      if (!d) return;
      if (typeof d.totalPreset === 'number') {
        setSelectedPreset(d.totalPreset);
        selectedPresetRef.current = d.totalPreset;
      }
      if (d.mode) {
        setMode(d.mode);
        modeRef.current = d.mode;
      }
      if (!d.isActive) {
        // Paused from external widget / PiP
        cancelAnimationFrame(rafRef.current);
        timerStartedAtRef.current = null;
        const cur = d.accumulated || 0;
        accumulatedRef.current = cur;
        setIsActive(false);
        setElapsedSeconds(cur);
        if (d.mode === 'countdown') {
          const p = d.totalPreset ?? selectedPresetRef.current;
          setSecondsRemaining(Math.max(0, p - cur));
        }
      } else {
        // Resumed from external widget / PiP
        const cur = d.accumulated || 0;
        accumulatedRef.current = cur;
        timerStartedAtRef.current = d.startedAt || Date.now();
        setIsActive(true);
      }
    };

    const onReset = () => {
      cancelAnimationFrame(rafRef.current);
      timerStartedAtRef.current = null;
      accumulatedRef.current = 0;
      setIsActive(false);
      setElapsedSeconds(0);
      setSecondsRemaining(selectedPresetRef.current);
      setSessionStartTime(null);
    };

    window.addEventListener('focusWidget:stateChange', onStateChange);
    window.addEventListener('focusWidget:reset', onReset);
    return () => {
      window.removeEventListener('focusWidget:stateChange', onStateChange);
      window.removeEventListener('focusWidget:reset', onReset);
    };
  }, []);

  // Start / Resume Handler
  const handleStart = () => {
    setErrorMsg('');
    const now = Date.now();
    const isoStart = sessionStartTime || new Date().toISOString();
    if (!sessionStartTime) {
      setSessionStartTime(isoStart);
    }
    timerStartedAtRef.current = now;
    accumulatedRef.current = elapsedSeconds;
    setIsActive(true);

    const state = {
      startedAt: now,
      accumulated: elapsedSeconds,
      totalPreset: selectedPresetRef.current,
      mode: modeRef.current,
      taskId: selectedTaskId,
      notes: sessionNotes,
      isoStartTime: isoStart,
      isActive: true,
    };
    localStorage.setItem(FOCUS_STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent('focusWidget:stateChange', { detail: state }));
  };

  // Pause Handler
  const handlePause = () => {
    const now = Date.now();
    let currentElapsed = elapsedSeconds;
    if (timerStartedAtRef.current) {
      currentElapsed = Math.floor((now - timerStartedAtRef.current) / 1000) + accumulatedRef.current;
    }
    cancelAnimationFrame(rafRef.current);
    timerStartedAtRef.current = null;
    accumulatedRef.current = currentElapsed;
    setIsActive(false);
    setElapsedSeconds(currentElapsed);
    if (modeRef.current === 'countdown') {
      setSecondsRemaining(Math.max(0, selectedPresetRef.current - currentElapsed));
    }

    const state = {
      startedAt: null,
      accumulated: currentElapsed,
      totalPreset: selectedPresetRef.current,
      mode: modeRef.current,
      taskId: selectedTaskId,
      notes: sessionNotes,
      isoStartTime: sessionStartTime || new Date().toISOString(),
      isActive: false,
    };
    localStorage.setItem(FOCUS_STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent('focusWidget:stateChange', { detail: state }));
    setFocusTimerSnapshot((prev) => ({ ...prev, isActive: false, elapsedSeconds: currentElapsed }));
  };

  // Reset Handler
  const handleReset = () => {
    cancelAnimationFrame(rafRef.current);
    timerStartedAtRef.current = null;
    accumulatedRef.current = 0;
    setIsActive(false);
    setElapsedSeconds(0);
    const currPreset = selectedPresetRef.current;
    setSecondsRemaining(currPreset);
    setSessionStartTime(null);
    const resetState = {
      startedAt: null,
      accumulated: 0,
      totalPreset: currPreset,
      mode: modeRef.current,
      taskId: selectedTaskId,
      notes: sessionNotes,
      isoStartTime: null,
      isActive: false,
    };
    localStorage.setItem(FOCUS_STORAGE_KEY, JSON.stringify(resetState));
    window.dispatchEvent(new CustomEvent('focusWidget:stateChange', { detail: resetState }));
    setFocusTimerSnapshot((prev) => ({
      ...prev,
      isActive: false,
      elapsedSeconds: 0,
      secondsRemaining: currPreset,
    }));
  };

  const handlePresetSelect = (preset) => {
    if (isActive) return;
    cancelAnimationFrame(rafRef.current);
    timerStartedAtRef.current = null;
    accumulatedRef.current = 0;
    setIsActive(false);
    setElapsedSeconds(0);
    setSessionStartTime(null);

    const newSeconds = preset.seconds;
    const newMode = newSeconds === 0 ? 'stopwatch' : 'countdown';

    selectedPresetRef.current = newSeconds;
    modeRef.current = newMode;
    setSelectedPreset(newSeconds);
    setMode(newMode);
    setSecondsRemaining(newSeconds);

    const newState = {
      startedAt: null,
      accumulated: 0,
      totalPreset: newSeconds,
      mode: newMode,
      taskId: selectedTaskId,
      notes: sessionNotes,
      isoStartTime: null,
      isActive: false,
    };
    localStorage.setItem(FOCUS_STORAGE_KEY, JSON.stringify(newState));
    window.dispatchEvent(new CustomEvent('focusWidget:stateChange', { detail: newState }));
    setFocusTimerSnapshot((prev) => ({
      ...prev,
      isActive: false,
      mode: newMode,
      elapsedSeconds: 0,
      secondsRemaining: newSeconds,
      selectedPreset: newSeconds,
    }));
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

  // Format MM:SS (e.g. 25:00, 50:00, 90:00)
  const formatTime = (totalSecs) => {
    totalSecs = Math.max(0, Math.floor(totalSecs));
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    const pad = (n) => String(n).padStart(2, '0');
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
            className={styles.focusTimerDisplay}
            style={{
              color: isActive ? 'var(--vg-accent)' : 'var(--vg-text)',
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
          <div className={styles.focusControlsRow}>
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

            <button
              type="button"
              className={styles.btnSecondary}
              onClick={() => {
                setFloatWidgetOpen(true);
                window.dispatchEvent(new CustomEvent('focusWidget:open'));
              }}
              title="Open floating PiP capsule widget"
              style={{ padding: '0.75rem 1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="2" ry="2"/>
                <path d="M7 7h4v4H7z"/>
              </svg>
              <span>PiP Widget</span>
            </button>
          </div>
        </div>

        {/* Right: Task Association & Notes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle} style={{ marginBottom: '1rem' }}>
              Session Linkage & Notes
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--vg-text-muted)', marginBottom: '0.35rem', display: 'block' }}>
                  Link to Active Task (Optional)
                </label>
                <select
                  value={selectedTaskId}
                  onChange={(e) => setSelectedTaskId(e.target.value)}
                  disabled={isActive}
                  className={styles.select}
                  style={{ width: '100%' }}
                >
                  <option value="">No Specific Task</option>
                  {tasks
                    .filter((t) => t.status !== 'completed')
                    .map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.title} ({t.category})
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--vg-text-muted)', marginBottom: '0.35rem', display: 'block' }}>
                  Deep Work Notes / Focus Log
                </label>
                <textarea
                  value={sessionNotes}
                  onChange={(e) => setSessionNotes(e.target.value)}
                  placeholder="What are you focusing on during this block? (e.g. implementing binary search tree, system architecture design, reading paper...)"
                  className={styles.textarea}
                  rows={4}
                  style={{ width: '100%', resize: 'vertical' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Focus History Logs */}
      <div className={styles.card} style={{ marginTop: '1.5rem' }}>
        <h3 className={styles.cardTitle} style={{ marginBottom: '1rem' }}>
          Recent Focus Sessions ({focusSessions.length})
        </h3>

        {focusSessions.length === 0 ? (
          <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--vg-text-muted)', fontSize: '0.85rem' }}>
            No completed focus sessions logged yet. Start your first session above!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {focusSessions.slice(0, 10).map((s) => {
              const task = tasks.find((t) => t.id === s.task_id);
              const mins = Math.round((Number(s.duration) || 0) / 60);
              const dateStr = s.completed_at ? new Date(s.completed_at).toLocaleDateString() : 'Recent';

              return (
                <div
                  key={s.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--vg-radius-sm)',
                    background: 'var(--vg-surface)',
                    border: '1px solid var(--vg-border)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ color: '#52c41a', display: 'flex' }}>
                      <IconCheck size={16} />
                    </span>
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--vg-text)' }}>
                        {task ? task.title : 'General Deep Work Session'}
                      </div>
                      {s.notes && (
                        <div style={{ fontSize: '0.78rem', color: 'var(--vg-text-muted)', marginTop: '0.15rem' }}>
                          {s.notes}
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--vg-accent)' }}>
                      {mins} mins
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--vg-text-muted)' }}>
                      {dateStr}
                    </span>
                    <button
                      type="button"
                      className={styles.iconBtn}
                      onClick={() => handleDeleteSession(s)}
                      title="Delete Session"
                      style={{ color: 'var(--vg-text-muted)' }}
                    >
                      <IconTrash size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}