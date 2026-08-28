import React, { useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTracker } from '../../context/TrackerContext';
import {
  IconCheck,
  IconClock,
  IconGoals,
  IconTasks,
  IconCalendar,
  IconEdit,
  IconTrash,
  IconPlus,
} from '../Common/Icons';
import QuickActions from './QuickActions';
import EmptyState from '../Common/EmptyState';
import styles from '../../styles/tracker.module.css';

export default function DashboardView() {
  const { user } = useAuth();
  const {
    tasks,
    goals,
    toggleTaskStatus,
    deleteTask,
    setTaskModalOpen,
    setEditingTask,
    setGoalModalOpen,
    setEditingGoal,
    setActiveTab,
    requestConfirmation,
    analytics,
  } = useTracker();

  const { today, overall } = analytics;

  // Formatted current date and greeting
  const { dateFormatted, greeting } = useMemo(() => {
    const now = new Date();
    const hrs = now.getHours();
    let greet = 'Good evening';
    if (hrs < 12) greet = 'Good morning';
    else if (hrs < 17) greet = 'Good afternoon';

    const dateStr = now.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    return { dateFormatted: dateStr, greeting: greet };
  }, []);

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Vardhman';

  // Active goals (top 3 short-term and top 2 long-term)
  const activeGoals = useMemo(() => {
    return goals.filter((g) => g.status === 'active').slice(0, 4);
  }, [goals]);

  // Today's pending tasks first, then completed
  const sortedTodayTasks = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    const todays = tasks.filter((t) => {
      if (!t.due_date && !t.completed_at) return true;
      const isDueToday = t.due_date === todayStr;
      const isCompletedToday = t.completed_at && t.completed_at.startsWith(todayStr);
      return isDueToday || isCompletedToday;
    });

    return todays.sort((a, b) => {
      if (a.status === b.status) return 0;
      return a.status === 'pending' ? -1 : 1;
    });
  }, [tasks]);

  const handleDeleteTask = (task) => {
    requestConfirmation({
      title: 'Delete Task',
      message: `Are you sure you want to delete "${task.title}"?`,
      onConfirm: async () => {
        await deleteTask(task.id);
      },
    });
  };

  return (
    <div>
      {/* Top Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerTitleArea}>
          <span className={styles.headerKicker}>{dateFormatted}</span>
          <h1 className={styles.headerTitle}>
            {greeting}, {userName}
          </h1>
          <p className={styles.headerSubtitle}>
            {today.completed} of {today.total} tasks completed today ({today.percent}% execution rate)
          </p>
        </div>

        <QuickActions />
      </div>

      {/* Today's Overview Metric Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span>Today's Completion</span>
            <IconCheck size={16} />
          </div>
          <div className={styles.statValue}>
            {today.completed} <span style={{ fontSize: '1.1rem', color: 'var(--vg-text-subtle)' }}>/ {today.total}</span>
          </div>
          <div className={styles.progressBarTrack}>
            <div className={styles.progressBarFill} style={{ width: `${today.percent}%` }} />
          </div>
          <span className={styles.statSubtext}>{today.percent}% of today's workload completed</span>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span>Pending Today</span>
            <IconClock size={16} />
          </div>
          <div className={styles.statValue} style={{ color: today.pending > 0 ? 'var(--vg-accent)' : 'var(--vg-text)' }}>
            {today.pending}
          </div>
          <span className={styles.statSubtext}>Remaining action items</span>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span>Active Goals</span>
            <IconGoals size={16} />
          </div>
          <div className={styles.statValue}>{activeGoals.length}</div>
          <span className={styles.statSubtext}>Milestones currently in progress</span>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span>Total Tasks Done</span>
            <IconTasks size={16} />
          </div>
          <div className={styles.statValue}>{overall.completed}</div>
          <span className={styles.statSubtext}>Across all recorded projects</span>
        </div>
      </div>

      {/* 2 Columns: Today's Tasks + Active Goals */}
      <div className={styles.dashboardColumns}>
        {/* Left Column: Today's Tasks */}
        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>
              <IconTasks size={17} />
              <span>Today's Tasks</span>
            </h3>
            <button
              type="button"
              className={styles.iconBtn}
              onClick={() => {
                setEditingTask(null);
                setTaskModalOpen(true);
              }}
              title="Add Task"
            >
              <IconPlus size={16} />
            </button>
          </div>

          {sortedTodayTasks.length === 0 ? (
            <EmptyState
              icon={<IconTasks size={20} />}
              title="All clear for today"
              description="No tasks scheduled for today. Add a new task to stay productive."
              actionLabel="Add Task"
              onAction={() => {
                setEditingTask(null);
                setTaskModalOpen(true);
              }}
            />
          ) : (
            <div className={styles.taskList}>
              {sortedTodayTasks.slice(0, 7).map((task) => {
                const isCompleted = task.status === 'completed';
                const priorityClass =
                  task.priority === 'high'
                    ? styles.badgeHigh
                    : task.priority === 'low'
                    ? styles.badgeLow
                    : styles.badgeMedium;

                return (
                  <div
                    key={task.id}
                    className={`${styles.taskItem} ${isCompleted ? styles.taskCompleted : ''}`}
                  >
                    <div className={styles.taskLeft}>
                      <button
                        type="button"
                        className={`${styles.checkbox} ${isCompleted ? styles.checkboxChecked : ''}`}
                        onClick={() => toggleTaskStatus(task.id)}
                        title={isCompleted ? 'Mark as pending' : 'Mark as completed'}
                      >
                        {isCompleted && <IconCheck size={12} />}
                      </button>

                      <div className={styles.taskContent}>
                        <span className={styles.taskTitle}>{task.title}</span>
                        <div className={styles.taskMeta}>
                          <span className={`${styles.badge} ${priorityClass}`}>
                            {task.priority}
                          </span>
                          <span className={`${styles.badge} ${styles.badgeCategory}`}>
                            {task.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.taskActions}>
                      <button
                        type="button"
                        className={styles.iconBtn}
                        onClick={() => {
                          setEditingTask(task);
                          setTaskModalOpen(true);
                        }}
                        title="Edit"
                      >
                        <IconEdit size={14} />
                      </button>
                      <button
                        type="button"
                        className={styles.iconBtn}
                        onClick={() => handleDeleteTask(task)}
                        title="Delete"
                        style={{ color: 'var(--vg-accent)' }}
                      >
                        <IconTrash size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}

              {sortedTodayTasks.length > 7 && (
                <button
                  type="button"
                  onClick={() => setActiveTab('tasks')}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '0.5rem',
                    fontSize: '0.82rem',
                    color: 'var(--vg-accent)',
                    cursor: 'pointer',
                    textAlign: 'center',
                    fontWeight: 500,
                  }}
                >
                  View all {sortedTodayTasks.length} tasks →
                </button>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Active Goals */}
        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>
              <IconGoals size={17} />
              <span>Active Goals</span>
            </h3>
            <button
              type="button"
              className={styles.iconBtn}
              onClick={() => {
                setEditingGoal(null);
                setGoalModalOpen(true);
              }}
              title="Add Goal"
            >
              <IconPlus size={16} />
            </button>
          </div>

          {activeGoals.length === 0 ? (
            <EmptyState
              icon={<IconGoals size={20} />}
              title="No active goals"
              description="Define short-term and long-term milestones to track your progress."
              actionLabel="Add Goal"
              onAction={() => {
                setEditingGoal(null);
                setGoalModalOpen(true);
              }}
            />
          ) : (
            <div className={styles.goalList}>
              {activeGoals.map((goal) => (
                <div key={goal.id} className={styles.goalCard}>
                  <div className={styles.goalHeader}>
                    <div>
                      <span
                        className={styles.badge}
                        style={{
                          fontSize: '0.68rem',
                          background:
                            goal.type === 'short_term'
                              ? 'rgba(255, 77, 79, 0.15)'
                              : 'rgba(24, 144, 255, 0.15)',
                          color:
                            goal.type === 'short_term' ? 'var(--vg-accent)' : '#1890ff',
                          border: `1px solid ${
                            goal.type === 'short_term'
                              ? 'var(--vg-accent-border)'
                              : 'rgba(24, 144, 255, 0.3)'
                          }`,
                        }}
                      >
                        {goal.type === 'short_term' ? 'Short-term' : 'Long-term'}
                      </span>
                      <h4 className={styles.goalTitle} style={{ marginTop: '0.2rem' }}>
                        {goal.title}
                      </h4>
                    </div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--vg-text)', fontFamily: 'monospace' }}>
                      {goal.progress}%
                    </span>
                  </div>

                  <div className={styles.progressBarTrack}>
                    <div className={styles.progressBarFill} style={{ width: `${goal.progress}%` }} />
                  </div>

                  {goal.target_date && (
                    <div style={{ fontSize: '0.75rem', color: 'var(--vg-text-subtle)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <IconCalendar size={12} />
                      <span>Target: {goal.target_date}</span>
                    </div>
                  )}
                </div>
              ))}

              {goals.length > 4 && (
                <button
                  type="button"
                  onClick={() => setActiveTab('goals')}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '0.5rem',
                    fontSize: '0.82rem',
                    color: 'var(--vg-accent)',
                    cursor: 'pointer',
                    textAlign: 'center',
                    fontWeight: 500,
                  }}
                >
                  View all {goals.length} goals →
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

