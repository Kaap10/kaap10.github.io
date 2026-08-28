import React, { useState, useMemo } from 'react';
import { useTracker } from '../../context/TrackerContext';
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconCalendar,
  IconGoals,
  IconTasks,
  IconCheck,
} from '../Common/Icons';
import EmptyState from '../Common/EmptyState';
import styles from '../../styles/tracker.module.css';

export default function GoalsView() {
  const {
    goals,
    tasks,
    deleteGoal,
    updateGoal,
    setGoalModalOpen,
    setEditingGoal,
    setTaskModalOpen,
    setEditingTask,
    requestConfirmation,
  } = useTracker();

  const [filterType, setFilterType] = useState('all'); // 'all' | 'short_term' | 'long_term' | 'completed'

  // Map of goal_id -> { totalTasks, completedTasks }
  const goalTasksStats = useMemo(() => {
    const map = {};
    tasks.forEach((t) => {
      if (t.goal_id) {
        if (!map[t.goal_id]) {
          map[t.goal_id] = { total: 0, completed: 0 };
        }
        map[t.goal_id].total += 1;
        if (t.status === 'completed') {
          map[t.goal_id].completed += 1;
        }
      }
    });
    return map;
  }, [tasks]);

  const filteredGoals = useMemo(() => {
    return goals.filter((g) => {
      if (filterType === 'short_term') return g.type === 'short_term' && g.status === 'active';
      if (filterType === 'long_term') return g.type === 'long_term' && g.status === 'active';
      if (filterType === 'completed') return g.status === 'completed';
      return g.status !== 'archived';
    });
  }, [goals, filterType]);

  const handleDelete = (goal) => {
    requestConfirmation({
      title: 'Delete Goal',
      message: `Are you sure you want to delete "${goal.title}"? Connected tasks will be preserved as independent tasks.`,
      onConfirm: async () => {
        await deleteGoal(goal.id);
      },
    });
  };

  const handleEdit = (goal) => {
    setEditingGoal(goal);
    setGoalModalOpen(true);
  };

  const handleQuickProgress = async (goal, delta) => {
    const nextVal = Math.min(100, Math.max(0, goal.progress + delta));
    const nextStatus = nextVal === 100 ? 'completed' : goal.status === 'completed' ? 'active' : goal.status;
    await updateGoal(goal.id, { progress: nextVal, status: nextStatus });
  };

  const handleAddTaskForGoal = (goal) => {
    setEditingTask({
      title: '',
      description: '',
      priority: 'medium',
      category: 'Development',
      due_date: new Date().toISOString().split('T')[0],
      goal_id: goal.id,
    });
    setTaskModalOpen(true);
  };

  return (
    <div>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerTitleArea}>
          <span className={styles.headerKicker}>Milestones &amp; Horizons</span>
          <h1 className={styles.headerTitle}>Goals</h1>
          <p className={styles.headerSubtitle}>
            Track short-term targets and long-term technical achievements.
          </p>
        </div>

        <button
          type="button"
          className={styles.btnPrimary}
          onClick={() => {
            setEditingGoal(null);
            setGoalModalOpen(true);
          }}
        >
          <IconPlus size={16} />
          <span>New Goal</span>
        </button>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: 'inline-flex',
          background: 'var(--vg-surface)',
          padding: '0.25rem',
          borderRadius: 'var(--vg-radius-sm)',
          border: '1px solid var(--vg-border)',
          gap: '0.2rem',
          marginBottom: '1.5rem',
        }}
      >
        {[
          { id: 'all', label: 'All Active' },
          { id: 'short_term', label: 'Short-term' },
          { id: 'long_term', label: 'Long-term' },
          { id: 'completed', label: 'Completed' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilterType(tab.id)}
            style={{
              padding: '0.35rem 0.85rem',
              fontSize: '0.8rem',
              fontWeight: 500,
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              background: filterType === tab.id ? 'var(--vg-bg-elevated)' : 'transparent',
              color: filterType === tab.id ? 'var(--vg-text)' : 'var(--vg-text-muted)',
              boxShadow: filterType === tab.id ? '0 1px 3px rgba(0,0,0,0.2)' : 'none',
              transition: 'all 150ms ease',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Goals List */}
      {filteredGoals.length === 0 ? (
        <EmptyState
          icon={<IconGoals size={22} />}
          title="No goals found"
          description="Create your first goal to guide your daily tasks and measure progress."
          actionLabel="Create Goal"
          onAction={() => {
            setEditingGoal(null);
            setGoalModalOpen(true);
          }}
        />
      ) : (
        <div className={styles.goalList}>
          {filteredGoals.map((goal) => {
            const taskStats = goalTasksStats[goal.id] || { total: 0, completed: 0 };
            const isCompleted = goal.status === 'completed' || goal.progress === 100;

            return (
              <div key={goal.id} className={styles.goalCard}>
                <div className={styles.goalHeader}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <span
                        className={styles.badge}
                        style={{
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
                      {isCompleted && (
                        <span
                          className={styles.badge}
                          style={{
                            background: 'rgba(82, 196, 26, 0.15)',
                            color: '#52c41a',
                            border: '1px solid rgba(82, 196, 26, 0.3)',
                          }}
                        >
                          Completed
                        </span>
                      )}
                    </div>
                    <h3 className={styles.goalTitle}>{goal.title}</h3>
                    {goal.description && <p className={styles.goalDesc}>{goal.description}</p>}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <button
                      type="button"
                      className={styles.iconBtn}
                      onClick={() => handleAddTaskForGoal(goal)}
                      title="Add task for this goal"
                    >
                      <IconPlus size={15} />
                    </button>
                    <button
                      type="button"
                      className={styles.iconBtn}
                      onClick={() => handleEdit(goal)}
                      title="Edit Goal"
                    >
                      <IconEdit size={15} />
                    </button>
                    <button
                      type="button"
                      className={styles.iconBtn}
                      onClick={() => handleDelete(goal)}
                      title="Delete Goal"
                      style={{ color: 'var(--vg-accent)' }}
                    >
                      <IconTrash size={15} />
                    </button>
                  </div>
                </div>

                {/* Progress Bar & percentage */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.25rem' }}>
                  <div style={{ flexGrow: 1 }}>
                    <div className={styles.progressBarTrack}>
                      <div
                        className={styles.progressBarFill}
                        style={{
                          width: `${goal.progress}%`,
                          background: isCompleted ? '#52c41a' : 'var(--vg-accent)',
                        }}
                      />
                    </div>
                  </div>
                  <span style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--vg-text)', minWidth: '40px', textAlign: 'right' }}>
                    {goal.progress}%
                  </span>
                </div>

                {/* Footer Meta & Controls */}
                <div className={styles.goalFooter}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {goal.target_date && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                        <IconCalendar size={13} />
                        <span>Target: {goal.target_date}</span>
                      </span>
                    )}

                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                      <IconTasks size={13} />
                      <span>
                        {taskStats.completed}/{taskStats.total} tasks completed
                      </span>
                    </span>
                  </div>

                  {/* Quick increment / decrement */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <button
                      type="button"
                      className={styles.iconBtn}
                      onClick={() => handleQuickProgress(goal, -10)}
                      title="Decrease 10%"
                      style={{ fontSize: '0.75rem', padding: '0.2rem 0.4rem' }}
                    >
                      -10%
                    </button>
                    <button
                      type="button"
                      className={styles.iconBtn}
                      onClick={() => handleQuickProgress(goal, 10)}
                      title="Increase 10%"
                      style={{ fontSize: '0.75rem', padding: '0.2rem 0.4rem' }}
                    >
                      +10%
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

