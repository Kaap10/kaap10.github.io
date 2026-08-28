import React from 'react';
import { useTracker } from '../../context/TrackerContext';
import QuickActions from './QuickActions';
import EmptyState from '../Common/EmptyState';
import { DashboardSkeleton } from '../Common/LoadingSkeleton';
import {
  IconTasks,
  IconGoals,
  IconCheck,
  IconClock,
  IconFlame,
  IconFocus,
  IconAlertCircle,
  IconSparkles,
  IconRepeat,
  IconChevronRight,
} from '../Common/Icons';

import styles from '../../styles/tracker.module.css';

export default function DashboardView() {
  const {
    loading,
    tasks,
    goals,
    habits,
    milestones,
    habitLogs,
    habitStreaks,
    todayTasks,
    overdueTasks,
    focusStats,
    insights,
    toggleTaskStatus,
    toggleHabitDate,
    setEditingTask,
    setTaskModalOpen,
    setActiveTab,
  } = useTracker();

  const computeGoalProgress = (goal) => {
    const goalMilestones = milestones.filter((m) => m.goal_id === goal.id);
    const goalTasks = tasks.filter((t) => t.goal_id === goal.id);
    const totalUnits = goalMilestones.length + goalTasks.length;

    if (totalUnits === 0) {
      return Number(goal.progress) || 0;
    }

    const completedMilestones = goalMilestones.filter((m) => m.status === 'completed').length;
    const completedTasks = goalTasks.filter((t) => t.status === 'completed').length;
    return Math.round(((completedMilestones + completedTasks) / totalUnits) * 100);
  };

  if (loading && tasks.length === 0 && habits.length === 0 && goals.length === 0) {
    return <DashboardSkeleton />;
  }

  const d = new Date();
  const todayStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;


  // Today's task completion progress
  const completedToday = todayTasks.filter((t) => t.status === 'completed').length;
  const todayProgressPct = todayTasks.length > 0 ? Math.round((completedToday / todayTasks.length) * 100) : 0;

  // Active habits for today
  const activeHabits = habits.filter((h) => !h.archived);
  const completedHabitsToday = habitLogs.filter((l) => l.completed_date === todayStr);
  const activeHabitIdsCompleted = new Set(completedHabitsToday.map((l) => l.habit_id));

  // Active goals summary
  const activeGoals = goals.filter((g) => g.status === 'active').slice(0, 3);

  return (
    <div className={styles.viewContainer}>
      {/* Header & Quick Action Bar */}
      <div className={styles.viewHeader}>
        <div>
          <h1 className={styles.viewTitle}>Productivity Command Center</h1>
          <p className={styles.viewSubtitle}>
            Daily focus, priority execution, habit consistency, and active milestones.
          </p>
        </div>
        <QuickActions />
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
                {overdueTasks.length} {overdueTasks.length === 1 ? 'Task is Overdue' : 'Tasks are Overdue'}
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
            Review Overdue
          </button>
        </div>
      )}

      {/* Top Metric Cards */}
      <div className={styles.metricsGrid}>
        {/* Today's Execution */}
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
            {todayProgressPct}% completed
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
            Week total: <strong style={{ color: 'var(--vg-text)' }}>{focusStats.weekHours} hrs</strong> across {focusStats.totalSessions} sessions
          </div>
        </div>

        {/* Daily Habits */}
        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <span className={styles.metricLabel}>Daily Habits</span>
            <IconFlame size={18} className={styles.metricIcon} />
          </div>
          <div className={styles.metricValue}>
            {activeHabitIdsCompleted.size} <span style={{ fontSize: '1rem', color: 'var(--vg-text-muted)' }}>/ {activeHabits.length}</span>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--vg-text-muted)', marginTop: '0.65rem' }}>
            {activeHabits.length > 0 && activeHabitIdsCompleted.size === activeHabits.length
              ? 'All habits logged for today.'
              : `${activeHabits.length - activeHabitIdsCompleted.size} habits remaining today`}
          </div>
        </div>
      </div>

      {/* Main Grid: Today's Priorities & Active Goals / Habits */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
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
              <span>View All Tasks</span>
              <IconChevronRight size={14} />
            </button>

          </div>

          {todayTasks.length === 0 ? (
            <EmptyState
              icon={IconTasks}
              title="No tasks scheduled for today"
              description="Plan your day by adding tasks or setting due dates to today."
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
                        {t.recurrence && t.recurrence !== 'none' && (
                          <span style={{ fontSize: '0.72rem', color: 'var(--vg-accent)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <IconRepeat size={12} /> {t.recurrence}
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

        {/* Right Column: Daily Habits & Active Goals */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Daily Habit Checklist */}
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
                <span>Manage Habits</span>
                <IconChevronRight size={14} />
              </button>
            </div>

            {activeHabits.length === 0 ? (
              <EmptyState
                icon={IconFlame}
                title="No habits defined yet"
                description="Form daily routines (DSA, Reading, Workouts, Deep Work)."
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

          {/* Active Goals Snapshot */}
          <div className={styles.card}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <IconGoals size={18} style={{ color: 'var(--vg-accent)' }} />
                <h2 className={styles.cardTitle}>Active Milestones</h2>
              </div>
              <button
                type="button"
                className={styles.linkBtn}
                onClick={() => setActiveTab('goals')}
                style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
              >
                <span>View Roadmaps</span>
                <IconChevronRight size={14} />
              </button>

            </div>

            {activeGoals.length === 0 ? (
              <EmptyState
                icon={IconGoals}
                title="No active milestones"
                description="Set short-term & long-term engineering horizons."
                actionLabel="Set Goal"
                onAction={() => setActiveTab('goals')}
              />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {activeGoals.map((g) => {
                  const autoProg = computeGoalProgress(g);
                  return (
                    <div key={g.id}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                        <span style={{ fontSize: '0.86rem', fontWeight: 500, color: 'var(--vg-text)' }}>
                          {g.title}
                        </span>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: autoProg === 100 ? '#52c41a' : 'var(--vg-accent)' }}>
                          {autoProg}%
                        </span>
                      </div>
                      <div className={styles.progressBarWrapper}>
                        <div
                          className={styles.progressBarFill}
                          style={{
                            width: `${autoProg}%`,
                            background: autoProg === 100 ? '#52c41a' : 'var(--vg-accent)',
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Rule-Based Heuristic Insights Section */}
      <div className={styles.card}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <span style={{ color: 'var(--vg-accent)' }}>
            <IconSparkles size={18} />
          </span>
          <h2 className={styles.cardTitle}>Productivity Insights & Heuristics</h2>
          <span style={{ fontSize: '0.72rem', color: 'var(--vg-text-muted)', marginLeft: 'auto' }}>
            Deterministic rule-based heuristics
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {insights.map((ins) => (
            <div
              key={ins.id}
              style={{
                padding: '0.9rem 1rem',
                borderRadius: 'var(--vg-radius-sm)',
                background: 'var(--vg-surface)',
                border: '1px solid var(--vg-border)',
                display: 'flex',
                gap: '0.75rem',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--vg-radius-sm)',
                  background: 'var(--vg-surface-strong)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--vg-accent)',
                  flexShrink: 0,
                }}
              >
                <IconSparkles size={15} />
              </div>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--vg-text)' }}>
                  {ins.title}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--vg-text-muted)', marginTop: '0.25rem', lineHeight: '1.4' }}>
                  {ins.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
