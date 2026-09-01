import React from 'react';
import { useTracker } from '../../context/TrackerContext';
import EmptyState from '../Common/EmptyState';
import { DashboardSkeleton } from '../Common/LoadingSkeleton';
import {
  IconTasks,
  IconCheck,
  IconClock,
  IconFlame,
  IconFocus,
  IconAlertCircle,
  IconPlus,
  IconChevronRight,
  IconPlay,
  IconCalendar,
} from '../Common/Icons';
import styles from '../../styles/tracker.module.css';

export default function DashboardView() {
  const {
    loading,
    tasks,
    habits,
    habitLogs,
    habitStreaks,
    todayTasks,
    overdueTasks,
    focusStats,
    activityLogs,
    toggleTaskStatus,
    toggleHabitDate,
    setEditingTask,
    setTaskModalOpen,
    setActiveTab,
  } = useTracker();

  if (loading && tasks.length === 0 && habits.length === 0 && (activityLogs || []).length === 0) {
    return <DashboardSkeleton />;
  }

  const d = new Date();
  const todayStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const formattedTodayDate = d.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  // Today's task completion progress
  const completedToday = todayTasks.filter((t) => t.status === 'completed').length;
  const todayProgressPct = todayTasks.length > 0 ? Math.round((completedToday / todayTasks.length) * 100) : 0;

  // Active habits for today
  const activeHabits = habits.filter((h) => !h.archived);
  const completedHabitsToday = habitLogs.filter((l) => l.completed_date === todayStr);
  const activeHabitIdsCompleted = new Set(completedHabitsToday.map((l) => l.habit_id));

  // Today's activity logs
  const todayActivityLogs = (activityLogs || []).filter((l) => l.log_date === todayStr);

  return (
    <div className={styles.viewContainer}>
      {/* Header & Quick Action Bar */}
      <div className={styles.viewHeader}>
        <div>
          <h1 className={styles.viewTitle}>Today</h1>
          <p className={styles.viewSubtitle}>
            {formattedTodayDate} · Focus on priority execution, deep work, and discipline.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={() => setActiveTab('progress')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <IconCheck size={14} />
            <span>Log Done</span>
          </button>
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={() => setActiveTab('focus')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <IconPlay size={14} />
            <span>Focus Mode</span>
          </button>
          <button
            type="button"
            className={styles.btnPrimary}
            onClick={() => {
              setEditingTask(null);
              setTaskModalOpen(true);
            }}
          >
            <IconPlus size={16} />
            <span>New Task</span>
          </button>
        </div>
      </div>

      {/* Overdue Tasks Alert Banner */}
      {overdueTasks.length > 0 && (
        <div
          style={{
            background: 'rgba(255, 77, 79, 0.1)',
            border: '1px solid var(--vg-accent-border)',
            borderRadius: 'var(--vg-radius-md)',
            padding: '0.85rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <span style={{ color: 'var(--vg-accent)' }}>
              <IconAlertCircle size={20} />
            </span>
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--vg-accent)' }}>
                {overdueTasks.length} {overdueTasks.length === 1 ? 'Task Overdue' : 'Tasks Overdue'}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--vg-text-muted)', marginTop: '0.15rem' }}>
                Pending tasks past their scheduled due dates need attention.
              </div>
            </div>
          </div>
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={() => setActiveTab('tasks')}
            style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
          >
            Review Tasks
          </button>
        </div>
      )}

      {/* Top Essential Metric Cards */}
      <div className={styles.metricsGrid}>
        {/* Today's Tasks */}
        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <span className={styles.metricLabel}>Today's Execution</span>
            <IconTasks size={18} className={styles.metricIcon} />
          </div>
          <div className={styles.metricValue}>
            {completedToday} <span style={{ fontSize: '1rem', color: 'var(--vg-text-muted)' }}>/ {todayTasks.length}</span>
          </div>
          <div className={styles.progressBarWrapper} style={{ marginTop: '0.75rem' }}>
            <div className={styles.progressBarFill} style={{ width: `${todayProgressPct}%` }} />
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--vg-text-muted)', marginTop: '0.4rem', textAlign: 'right' }}>
            {todayProgressPct}% cleared
          </div>
        </div>

        {/* Deep Work Focus */}
        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <span className={styles.metricLabel}>Deep Work (Focus)</span>
            <IconFocus size={18} className={styles.metricIcon} />
          </div>
          <div className={styles.metricValue}>
            {focusStats.todayHours} <span style={{ fontSize: '1rem', color: 'var(--vg-text-muted)' }}>hrs today</span>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--vg-text-muted)', marginTop: '0.65rem' }}>
            Week total: <strong style={{ color: 'var(--vg-text)' }}>{focusStats.weekHours} hrs</strong>
          </div>
        </div>

        {/* Daily Habits & Activities */}
        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <span className={styles.metricLabel}>Habits &amp; Done Logs</span>
            <IconFlame size={18} className={styles.metricIcon} />
          </div>
          <div className={styles.metricValue}>
            {activeHabitIdsCompleted.size + todayActivityLogs.length} <span style={{ fontSize: '1rem', color: 'var(--vg-text-muted)' }}>logged</span>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--vg-text-muted)', marginTop: '0.65rem' }}>
            {activeHabits.length > 0 && activeHabitIdsCompleted.size === activeHabits.length
              ? 'All daily habits done!'
              : `${activeHabits.length - activeHabitIdsCompleted.size} habits remaining today`}
          </div>
        </div>
      </div>

      {/* Main Grid: Today's Tasks & Habits Checklist */}
      <div className={styles.dashboardGrid}>
        {/* Left Column: Today's Tasks */}
        <div className={styles.card}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <IconTasks size={18} style={{ color: 'var(--vg-accent)' }} />
              <h2 className={styles.cardTitle}>Today's Priority Tasks</h2>
            </div>
            <button
              type="button"
              className={styles.linkBtn}
              onClick={() => setActiveTab('tasks')}
              style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
            >
              <span>View All</span>
              <IconChevronRight size={14} />
            </button>
          </div>

          {todayTasks.length === 0 ? (
            <EmptyState
              icon={IconTasks}
              title="No tasks scheduled for today"
              description="Keep your day focused. Add priority tasks due today."
              actionLabel="Add Today's Task"
              onAction={() => {
                setEditingTask(null);
                setTaskModalOpen(true);
              }}
            />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {todayTasks.map((t) => {
                const isCompleted = t.status === 'completed';
                return (
                  <div
                    key={t.id}
                    className={styles.taskItem}
                    style={{ opacity: isCompleted ? 0.6 : 1 }}
                  >
                    <button
                      type="button"
                      className={`${styles.checkbox} ${isCompleted ? styles.checkboxChecked : ''}`}
                      onClick={() => toggleTaskStatus(t.id)}
                    >
                      {isCompleted && <IconCheck size={12} />}
                    </button>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: '0.9rem',
                          fontWeight: 500,
                          color: isCompleted ? 'var(--vg-text-muted)' : 'var(--vg-text)',
                          textDecoration: isCompleted ? 'line-through' : 'none',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {t.title}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem', flexWrap: 'wrap' }}>
                        <span className={`${styles.priorityTag} ${styles[`priority_${t.priority}`]}`}>
                          {t.priority}
                        </span>
                        <span className={styles.categoryTag}>{t.category}</span>
                        {t.due_time && (
                          <span style={{ fontSize: '0.75rem', color: 'var(--vg-text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <IconClock size={12} /> {t.due_time}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Daily Habits & Done Activities */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Daily Habits */}
          <div className={styles.card}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <IconFlame size={18} style={{ color: '#fa8c16' }} />
                <h2 className={styles.cardTitle}>Daily Habits</h2>
              </div>
              <button
                type="button"
                className={styles.linkBtn}
                onClick={() => setActiveTab('habits')}
                style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
              >
                <span>Manage</span>
                <IconChevronRight size={14} />
              </button>
            </div>

            {activeHabits.length === 0 ? (
              <EmptyState
                icon={IconFlame}
                title="No habits defined yet"
                description="Build atomic routines (Naam Jap, LeetCode, Workouts)."
                actionLabel="Create Habit"
                onAction={() => setActiveTab('habits')}
              />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {activeHabits.map((h) => {
                  const isDone = activeHabitIdsCompleted.has(h.id);
                  const streak = habitStreaks[h.id]?.currentStreak || 0;
                  return (
                    <div
                      key={h.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.65rem 0.85rem',
                        borderRadius: 'var(--vg-radius-sm)',
                        background: isDone ? 'rgba(82, 196, 26, 0.08)' : 'var(--vg-surface)',
                        border: '1px solid var(--vg-border)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <button
                          type="button"
                          className={`${styles.checkbox} ${isDone ? styles.checkboxChecked : ''}`}
                          onClick={() => toggleHabitDate(h.id, todayStr)}
                        >
                          {isDone && <IconCheck size={12} />}
                        </button>
                        <span style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--vg-text)' }}>
                          {h.name}
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: streak > 0 ? '#fa8c16' : 'var(--vg-text-muted)' }}>
                        <IconFlame size={13} />
                        <span>{streak}d streak</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Today's Logged Activities (Quick Snapshot) */}
          {todayActivityLogs.length > 0 && (
            <div className={styles.card} style={{ border: '1px solid rgba(250, 140, 22, 0.25)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <IconCheck size={16} style={{ color: '#fa8c16' }} />
                  <h3 className={styles.cardTitle} style={{ margin: 0, fontSize: '0.95rem' }}>
                    Logged Done Today ({todayActivityLogs.length})
                  </h3>
                </div>
                <button
                  type="button"
                  className={styles.linkBtn}
                  onClick={() => setActiveTab('progress')}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.76rem' }}
                >
                  <span>Log More</span>
                  <IconChevronRight size={13} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                {todayActivityLogs.map((log) => (
                  <div
                    key={log.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.55rem 0.75rem',
                      borderRadius: 'var(--vg-radius-sm)',
                      background: 'var(--vg-surface)',
                      border: '1px solid var(--vg-border)',
                      gap: '0.5rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0, flex: 1 }}>
                      <span
                        style={{
                          fontSize: '0.68rem',
                          fontWeight: 600,
                          padding: '0.12rem 0.4rem',
                          borderRadius: '3px',
                          background: log.category === 'Naam Jap' ? 'rgba(250, 140, 22, 0.15)' : 'var(--vg-surface-strong)',
                          color: log.category === 'Naam Jap' ? '#ffa940' : 'var(--vg-accent)',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {log.category === 'Naam Jap' ? '🌸 ' : ''}{log.category}
                      </span>
                      <span
                        style={{
                          fontSize: '0.82rem',
                          color: 'var(--vg-text)',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {log.details}
                      </span>
                    </div>

                    {log.duration_minutes > 0 && (
                      <span style={{ fontSize: '0.72rem', color: 'var(--vg-text-muted)', flexShrink: 0 }}>
                        {log.duration_minutes}m
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}