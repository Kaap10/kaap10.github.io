import React, { useState, useMemo } from 'react';
import { useTracker } from '../../context/TrackerContext';
import EmptyState from '../Common/EmptyState';
import {
  IconGoals,
  IconPlus,
  IconMilestone,
  IconCheck,
  IconEdit,
  IconTrash,
  IconTasks,
  IconCalendar,
  IconCornerDownRight,
  IconGripVertical,
  IconChevronUp,
  IconChevronDown,
} from '../Common/Icons';
import styles from '../../styles/tracker.module.css';

export default function GoalsView() {
  const {
    goals,
    milestones,
    tasks,
    deleteGoal,
    toggleMilestoneStatus,
    deleteMilestone,
    reorderMilestones,
    setEditingGoal,
    setGoalModalOpen,
    setEditingMilestone,
    setMilestoneModalOpen,
    setSelectedGoalForMilestone,
    setParentMilestoneId,
    setEditingTask,
    setTaskModalOpen,
    openConfirmModal,
  } = useTracker();

  const [activeTab, setActiveTab] = useState('all'); // all, short_term, long_term, completed
  const [draggedMilestoneId, setDraggedMilestoneId] = useState(null);
  const [dragOverMilestoneId, setDragOverMilestoneId] = useState(null);

  // Helper to compute dynamic progress for a goal from its milestones and tasks
  const computeGoalProgress = (goal) => {
    const goalMilestones = milestones.filter((m) => m.goal_id === goal.id);
    const goalTasks = tasks.filter((t) => t.goal_id === goal.id);
    const totalUnits = goalMilestones.length + goalTasks.length;

    if (totalUnits === 0) {
      return Number(goal.progress) || 0;
    }

    const completedMilestones = goalMilestones.filter((m) => m.status === 'completed').length;
    const completedTasks = goalTasks.filter((t) => t.status === 'completed').length;
    const completedUnits = completedMilestones + completedTasks;

    return Math.round((completedUnits / totalUnits) * 100);
  };

  const filteredGoals = useMemo(() => {
    return goals.filter((g) => {
      const prog = computeGoalProgress(g);
      const isDone = g.status === 'completed' || prog >= 100;

      if (activeTab === 'short_term') return g.type === 'short_term';
      if (activeTab === 'long_term') return g.type === 'long_term';
      if (activeTab === 'completed') return isDone;
      return true;
    });
  }, [goals, milestones, tasks, activeTab]);

  const handleDeleteGoal = (goal) => {
    openConfirmModal(
      'Delete Goal & Milestones?',
      `Are you sure you want to delete "${goal.title}"? Connected milestones will also be removed.`,
      () => deleteGoal(goal.id)
    );
  };

  const handleDeleteMilestone = (m) => {
    openConfirmModal(
      'Delete Milestone?',
      `Are you sure you want to remove milestone "${m.title}"? Any sub-milestones will also be removed.`,
      () => deleteMilestone(m.id)
    );
  };

  const handleDropMilestone = (e, targetMilestone, goalId) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedMilestoneId || draggedMilestoneId === targetMilestone.id) {
      setDraggedMilestoneId(null);
      setDragOverMilestoneId(null);
      return;
    }

    const sourceMilestone = milestones.find((item) => item.id === draggedMilestoneId);
    if (!sourceMilestone) {
      setDraggedMilestoneId(null);
      setDragOverMilestoneId(null);
      return;
    }

    // Must belong to the same goal
    if (sourceMilestone.goal_id !== goalId || targetMilestone.goal_id !== goalId) {
      setDraggedMilestoneId(null);
      setDragOverMilestoneId(null);
      return;
    }

    // Must be at the same hierarchy level (both root milestones or both sub-milestones under the same parent)
    const isSourceRoot = !sourceMilestone.parent_id;
    const isTargetRoot = !targetMilestone.parent_id;

    if (isSourceRoot !== isTargetRoot) {
      setDraggedMilestoneId(null);
      setDragOverMilestoneId(null);
      return;
    }

    if (!isSourceRoot && sourceMilestone.parent_id !== targetMilestone.parent_id) {
      setDraggedMilestoneId(null);
      setDragOverMilestoneId(null);
      return;
    }

    const parentId = targetMilestone.parent_id || null;
    const scopeSiblings = milestones
      .filter((m) => m.goal_id === goalId && (parentId ? m.parent_id === parentId : !m.parent_id))
      .sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0));

    const sourceIndex = scopeSiblings.findIndex((m) => m.id === sourceMilestone.id);
    const targetIndex = scopeSiblings.findIndex((m) => m.id === targetMilestone.id);

    if (sourceIndex === -1 || targetIndex === -1) {
      setDraggedMilestoneId(null);
      setDragOverMilestoneId(null);
      return;
    }

    const reordered = [...scopeSiblings];
    const [movedItem] = reordered.splice(sourceIndex, 1);
    reordered.splice(targetIndex, 0, movedItem);

    reorderMilestones(reordered);

    setDraggedMilestoneId(null);
    setDragOverMilestoneId(null);
  };

  const handleMoveMilestone = (milestone, direction, goalId) => {
    const parentId = milestone.parent_id || null;
    const scopeSiblings = milestones
      .filter((m) => m.goal_id === goalId && (parentId ? m.parent_id === parentId : !m.parent_id))
      .sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0));

    const currentIndex = scopeSiblings.findIndex((m) => m.id === milestone.id);
    if (currentIndex === -1) return;

    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= scopeSiblings.length) return;

    const reordered = [...scopeSiblings];
    const [movedItem] = reordered.splice(currentIndex, 1);
    reordered.splice(targetIndex, 0, movedItem);

    reorderMilestones(reordered);
  };

  return (
    <div className={styles.viewContainer}>
      {/* Header - Fixed with glass blur effect when scrolling */}
      <div
        className={styles.viewHeader}
      >
        <div>
          <h1 className={styles.viewTitle}>Strategic Goals & Milestones</h1>
          <p className={styles.viewSubtitle}>
            Break down ambitious multi-year visions into concrete milestones, sub-milestones, and actionable tasks.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          {goals.length > 0 && (
            <button
              type="button"
              className={styles.btnSecondary}
              onClick={() => {
                setSelectedGoalForMilestone(goals[0]?.id || null);
                setParentMilestoneId(null);
                setEditingMilestone(null);
                setMilestoneModalOpen(true);
              }}
            >
              <IconPlus size={15} />
              <span>Add Milestone</span>
            </button>
          )}

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
      </div>

      {/* Filter Tabs */}
      <div className={styles.filterTabs}>
        {[
          { id: 'all', label: `All Goals (${goals.length})` },
          { id: 'short_term', label: 'Short-term' },
          { id: 'long_term', label: 'Long-term' },
          { id: 'completed', label: 'Completed' },
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            className={`${styles.filterTab} ${activeTab === t.id ? styles.filterTabActive : ''}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Goals List */}
      {filteredGoals.length === 0 ? (
        <EmptyState
          icon={IconGoals}
          title="No goals found"
          description="Create your first strategic engineering milestone or roadmap."
          actionLabel="Create First Goal"
          onAction={() => {
            setEditingGoal(null);
            setGoalModalOpen(true);
          }}
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {filteredGoals.map((goal) => {
            const goalMilestones = milestones.filter((m) => m.goal_id === goal.id);
            const rootMilestones = goalMilestones
              .filter((m) => !m.parent_id)
              .sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0));
            const goalTasks = tasks.filter((t) => t.goal_id === goal.id);
            const completedGoalTasks = goalTasks.filter((t) => t.status === 'completed');
            const completedMilestonesCount = goalMilestones.filter((m) => m.status === 'completed').length;
            const autoProgress = computeGoalProgress(goal);
            const isCompleted = goal.status === 'completed' || autoProgress >= 100;

            return (
              <div key={goal.id} className={styles.card}>
                {/* Goal Header & Controls */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--vg-text)', lineHeight: '1.3', margin: 0 }}>
                        {goal.title}
                      </h3>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          fontSize: '0.7rem',
                          padding: '0.15rem 0.5rem',
                          borderRadius: '4px',
                          background: goal.type === 'short_term' ? 'rgba(82, 196, 26, 0.12)' : 'rgba(24, 144, 255, 0.12)',
                          color: goal.type === 'short_term' ? '#52c41a' : '#1890ff',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          lineHeight: '1',
                        }}
                      >
                        {goal.type === 'short_term' ? 'Short-term' : 'Long-term'}
                      </span>

                      {isCompleted && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '4px', background: 'rgba(82, 196, 26, 0.15)', color: '#52c41a', fontWeight: 600, lineHeight: '1' }}>
                          Completed
                        </span>
                      )}
                    </div>

                    {goal.description && (
                      <p style={{ fontSize: '0.85rem', color: 'var(--vg-text-muted)', marginTop: '0.35rem', lineHeight: '1.4' }}>
                        {goal.description}
                      </p>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginTop: '0.5rem', fontSize: '0.78rem', color: 'var(--vg-text-muted)' }}>
                      {goal.target_date && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <IconCalendar size={13} />
                          Target: {goal.target_date}
                        </span>
                      )}
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <IconMilestone size={13} style={{ color: 'var(--vg-accent)' }} />
                        {completedMilestonesCount}/{goalMilestones.length} Milestones
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <IconTasks size={13} />
                        {completedGoalTasks.length}/{goalTasks.length} Tasks Done
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <button
                      type="button"
                      className={styles.iconBtn}
                      onClick={() => {
                        setEditingGoal(goal);
                        setGoalModalOpen(true);
                      }}
                      title="Edit Goal"
                    >
                      <IconEdit size={15} />
                    </button>
                    <button
                      type="button"
                      className={styles.iconBtn}
                      onClick={() => handleDeleteGoal(goal)}
                      title="Delete Goal"
                      style={{ color: 'var(--vg-accent)' }}
                    >
                      <IconTrash size={15} />
                    </button>
                  </div>
                </div>

                {/* Dynamic Automatic Progress Bar */}
                <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--vg-text-muted)' }}>
                        Completion Progress {goalMilestones.length > 0 || goalTasks.length > 0 ? '(Auto-calculated)' : ''}
                      </span>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: autoProgress === 100 ? '#52c41a' : 'var(--vg-accent)' }}>
                        {autoProgress}%
                      </span>
                    </div>
                    <div className={styles.progressBarWrapper}>
                      <div
                        className={styles.progressBarFill}
                        style={{
                          width: `${autoProgress}%`,
                          background: autoProgress === 100 ? '#52c41a' : 'var(--vg-accent)',
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Milestones Nested Section */}
                <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--vg-border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--vg-text)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <IconMilestone size={14} style={{ color: 'var(--vg-accent)' }} />
                      Milestones ({completedMilestonesCount}/{goalMilestones.length})
                    </span>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        type="button"
                        className={styles.btnSecondary}
                        onClick={() => {
                          setSelectedGoalForMilestone(goal.id);
                          setParentMilestoneId(null);
                          setEditingMilestone(null);
                          setMilestoneModalOpen(true);
                        }}
                        style={{ fontSize: '0.75rem', padding: '0.25rem 0.55rem' }}
                      >
                        <IconPlus size={13} /> Milestone
                      </button>

                      <button
                        type="button"
                        className={styles.btnSecondary}
                        onClick={() => {
                          setEditingTask({ goal_id: goal.id });
                          setTaskModalOpen(true);
                        }}
                        style={{ fontSize: '0.75rem', padding: '0.25rem 0.55rem' }}
                      >
                        <IconPlus size={13} /> Task
                      </button>
                    </div>
                  </div>

                  {rootMilestones.length === 0 ? (
                    <div style={{ padding: '0.85rem 1rem', borderRadius: 'var(--vg-radius-sm)', background: 'var(--vg-surface)', fontSize: '0.8rem', color: 'var(--vg-text-muted)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                      <span>No milestones created yet. Break this goal into concrete milestones.</span>
                      <button
                        type="button"
                        className={styles.btnSecondary}
                        onClick={() => {
                          setSelectedGoalForMilestone(goal.id);
                          setParentMilestoneId(null);
                          setEditingMilestone(null);
                          setMilestoneModalOpen(true);
                        }}
                        style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem' }}
                      >
                        <IconPlus size={12} /> Add First Milestone
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      {rootMilestones.map((m, mIdx) => {
                        const isDone = m.status === 'completed';
                        const milestoneTasks = tasks.filter((t) => t.milestone_id === m.id);
                        const subMilestones = goalMilestones
                          .filter((sub) => sub.parent_id === m.id)
                          .sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0));
                        const isDragging = draggedMilestoneId === m.id;
                        const isDragOver = dragOverMilestoneId === m.id && draggedMilestoneId !== m.id;

                        return (
                          <div key={m.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                            {/* Root Milestone Row */}
                            <div
                              draggable={true}
                              onDragStart={(e) => {
                                if (e.target.closest('button, input, select')) {
                                  e.preventDefault();
                                  return;
                                }
                                e.dataTransfer.setData('text/plain', m.id);
                                e.dataTransfer.effectAllowed = 'move';
                                setDraggedMilestoneId(m.id);
                              }}
                              onDragOver={(e) => {
                                e.preventDefault();
                                e.dataTransfer.dropEffect = 'move';
                                if (dragOverMilestoneId !== m.id) setDragOverMilestoneId(m.id);
                              }}
                              onDragLeave={() => {
                                if (dragOverMilestoneId === m.id) setDragOverMilestoneId(null);
                              }}
                              onDrop={(e) => handleDropMilestone(e, m, goal.id)}
                              onDragEnd={() => {
                                setDraggedMilestoneId(null);
                                setDragOverMilestoneId(null);
                              }}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '0.55rem 0.75rem',
                                borderRadius: 'var(--vg-radius-sm)',
                                background: isDone ? 'rgba(82, 196, 26, 0.06)' : 'var(--vg-surface)',
                                border: isDragOver ? '1px dashed var(--vg-accent)' : '1px solid var(--vg-border)',
                                borderTop: isDragOver ? '2px solid var(--vg-accent)' : undefined,
                                opacity: isDragging ? 0.35 : 1,
                                transform: isDragging ? 'scale(0.99)' : undefined,
                                transition: 'border 0.15s ease, opacity 0.15s ease, transform 0.15s ease',
                                cursor: 'grab',
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flex: 1, minWidth: 0 }}>
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: 'var(--vg-text-muted)',
                                    cursor: 'grab',
                                    padding: '0.1rem',
                                    opacity: 0.65,
                                    userSelect: 'none',
                                  }}
                                  title="Drag milestone up or down to reorder"
                                >
                                  <IconGripVertical size={14} />
                                </div>

                                <button
                                  type="button"
                                  className={`${styles.checkbox} ${isDone ? styles.checkboxChecked : ''}`}
                                  onClick={() => toggleMilestoneStatus(m.id)}
                                >
                                  {isDone && <IconCheck size={12} />}
                                </button>

                                <div style={{ minWidth: 0 }}>
                                  <div style={{ fontSize: '0.85rem', fontWeight: 500, color: isDone ? 'var(--vg-text-muted)' : 'var(--vg-text)', textDecoration: isDone ? 'line-through' : 'none' }}>
                                    {m.title}
                                  </div>
                                  {m.description && (
                                    <div style={{ fontSize: '0.75rem', color: 'var(--vg-text-muted)' }}>
                                      {m.description}
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                {m.target_date && (
                                  <span style={{ fontSize: '0.75rem', color: 'var(--vg-text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                    <IconCalendar size={12} />
                                    {m.target_date}
                                  </span>
                                )}
                                {milestoneTasks.length > 0 && (
                                  <span style={{ fontSize: '0.72rem', color: 'var(--vg-text-muted)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                                    <IconTasks size={11} /> {milestoneTasks.filter((t) => t.status === 'completed').length}/{milestoneTasks.length}
                                  </span>
                                )}

                                {/* Up / Down buttons */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.15rem' }}>
                                  <button
                                    type="button"
                                    className={styles.iconBtn}
                                    onClick={() => handleMoveMilestone(m, 'up', goal.id)}
                                    disabled={mIdx === 0}
                                    style={{ padding: '0.2rem', opacity: mIdx === 0 ? 0.3 : 0.8 }}
                                    title="Move milestone up"
                                  >
                                    <IconChevronUp size={13} />
                                  </button>
                                  <button
                                    type="button"
                                    className={styles.iconBtn}
                                    onClick={() => handleMoveMilestone(m, 'down', goal.id)}
                                    disabled={mIdx === rootMilestones.length - 1}
                                    style={{ padding: '0.2rem', opacity: mIdx === rootMilestones.length - 1 ? 0.3 : 0.8 }}
                                    title="Move milestone down"
                                  >
                                    <IconChevronDown size={13} />
                                  </button>
                                </div>

                                <button
                                  type="button"
                                  className={styles.btnSecondary}
                                  onClick={() => {
                                    setSelectedGoalForMilestone(goal.id);
                                    setParentMilestoneId(m.id);
                                    setEditingMilestone(null);
                                    setMilestoneModalOpen(true);
                                  }}
                                  style={{ fontSize: '0.7rem', padding: '0.18rem 0.45rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                                  title="Add Sub-milestone"
                                >
                                  <IconPlus size={11} /> Sub-milestone
                                </button>

                                <button
                                  type="button"
                                  className={styles.iconBtn}
                                  onClick={() => {
                                    setEditingMilestone(m);
                                    setSelectedGoalForMilestone(goal.id);
                                    setParentMilestoneId(null);
                                    setMilestoneModalOpen(true);
                                  }}
                                  style={{ padding: '0.2rem' }}
                                  title="Edit Milestone"
                                >
                                  <IconEdit size={13} />
                                </button>

                                <button
                                  type="button"
                                  className={styles.iconBtn}
                                  onClick={() => handleDeleteMilestone(m)}
                                  style={{ color: 'var(--vg-accent)', padding: '0.2rem' }}
                                  title="Delete Milestone"
                                >
                                  <IconTrash size={13} />
                                </button>
                              </div>
                            </div>

                            {/* Sub-milestones List */}
                            {subMilestones.length > 0 && (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', marginLeft: '1.5rem', paddingLeft: '0.5rem', borderLeft: '2px solid var(--vg-border)' }}>
                                {subMilestones.map((sub, subIdx) => {
                                  const subDone = sub.status === 'completed';
                                  const subTasks = tasks.filter((t) => t.milestone_id === sub.id);
                                  const isSubDragging = draggedMilestoneId === sub.id;
                                  const isSubDragOver = dragOverMilestoneId === sub.id && draggedMilestoneId !== sub.id;

                                  return (
                                    <div
                                      key={sub.id}
                                      draggable={true}
                                      onDragStart={(e) => {
                                        if (e.target.closest('button, input, select')) {
                                          e.preventDefault();
                                          return;
                                        }
                                        e.dataTransfer.setData('text/plain', sub.id);
                                        e.dataTransfer.effectAllowed = 'move';
                                        setDraggedMilestoneId(sub.id);
                                      }}
                                      onDragOver={(e) => {
                                        e.preventDefault();
                                        e.dataTransfer.dropEffect = 'move';
                                        if (dragOverMilestoneId !== sub.id) setDragOverMilestoneId(sub.id);
                                      }}
                                      onDragLeave={() => {
                                        if (dragOverMilestoneId === sub.id) setDragOverMilestoneId(null);
                                      }}
                                      onDrop={(e) => handleDropMilestone(e, sub, goal.id)}
                                      onDragEnd={() => {
                                        setDraggedMilestoneId(null);
                                        setDragOverMilestoneId(null);
                                      }}
                                      style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: '0.45rem 0.65rem',
                                        borderRadius: 'var(--vg-radius-sm)',
                                        background: subDone ? 'rgba(82, 196, 26, 0.04)' : 'var(--vg-surface)',
                                        border: isSubDragOver ? '1px dashed var(--vg-accent)' : '1px solid var(--vg-border)',
                                        borderTop: isSubDragOver ? '2px solid var(--vg-accent)' : undefined,
                                        opacity: isSubDragging ? 0.35 : 1,
                                        transform: isSubDragging ? 'scale(0.99)' : undefined,
                                        transition: 'border 0.15s ease, opacity 0.15s ease, transform 0.15s ease',
                                        cursor: 'grab',
                                      }}
                                    >
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flex: 1, minWidth: 0 }}>
                                        <div
                                          style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            color: 'var(--vg-text-muted)',
                                            cursor: 'grab',
                                            padding: '0.1rem',
                                            opacity: 0.6,
                                            userSelect: 'none',
                                          }}
                                          title="Drag sub-milestone up or down to reorder"
                                        >
                                          <IconGripVertical size={13} />
                                        </div>

                                        <span style={{ color: 'var(--vg-text-muted)' }}>
                                          <IconCornerDownRight size={13} />
                                        </span>
                                        <button
                                          type="button"
                                          className={`${styles.checkbox} ${subDone ? styles.checkboxChecked : ''}`}
                                          onClick={() => toggleMilestoneStatus(sub.id)}
                                          style={{ width: '16px', height: '16px', margin: 0 }}
                                        >
                                          {subDone && <IconCheck size={10} />}
                                        </button>
                                        <div style={{ minWidth: 0 }}>
                                          <span style={{ fontSize: '0.82rem', color: subDone ? 'var(--vg-text-muted)' : 'var(--vg-text)', textDecoration: subDone ? 'line-through' : 'none' }}>
                                            {sub.title}
                                          </span>
                                        </div>
                                      </div>

                                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                                        {sub.target_date && (
                                          <span style={{ fontSize: '0.72rem', color: 'var(--vg-text-muted)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                                            <IconCalendar size={11} />
                                            {sub.target_date}
                                          </span>
                                        )}
                                        {subTasks.length > 0 && (
                                          <span style={{ fontSize: '0.7rem', color: 'var(--vg-text-muted)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                                            <IconTasks size={10} /> {subTasks.filter((t) => t.status === 'completed').length}/{subTasks.length}
                                          </span>
                                        )}

                                        {/* Sub-milestone Up / Down buttons */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.1rem' }}>
                                          <button
                                            type="button"
                                            className={styles.iconBtn}
                                            onClick={() => handleMoveMilestone(sub, 'up', goal.id)}
                                            disabled={subIdx === 0}
                                            style={{ padding: '0.15rem', opacity: subIdx === 0 ? 0.3 : 0.8 }}
                                            title="Move sub-milestone up"
                                          >
                                            <IconChevronUp size={12} />
                                          </button>
                                          <button
                                            type="button"
                                            className={styles.iconBtn}
                                            onClick={() => handleMoveMilestone(sub, 'down', goal.id)}
                                            disabled={subIdx === subMilestones.length - 1}
                                            style={{ padding: '0.15rem', opacity: subIdx === subMilestones.length - 1 ? 0.3 : 0.8 }}
                                            title="Move sub-milestone down"
                                          >
                                            <IconChevronDown size={12} />
                                          </button>
                                        </div>

                                        <button
                                          type="button"
                                          className={styles.iconBtn}
                                          onClick={() => {
                                            setEditingMilestone(sub);
                                            setSelectedGoalForMilestone(goal.id);
                                            setParentMilestoneId(m.id);
                                            setMilestoneModalOpen(true);
                                          }}
                                          style={{ padding: '0.15rem' }}
                                          title="Edit Sub-milestone"
                                        >
                                          <IconEdit size={12} />
                                        </button>
                                        <button
                                          type="button"
                                          className={styles.iconBtn}
                                          onClick={() => handleDeleteMilestone(sub)}
                                          style={{ color: 'var(--vg-accent)', padding: '0.15rem' }}
                                          title="Delete Sub-milestone"
                                        >
                                          <IconTrash size={12} />
                                        </button>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
