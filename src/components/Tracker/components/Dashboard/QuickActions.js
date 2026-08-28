import React from 'react';
import { useTracker } from '../../context/TrackerContext';
import {
  IconPlus,
  IconGoals,
  IconHabit,
  IconFocus,
  IconResources,
  IconSearch,
} from '../Common/Icons';
import styles from '../../styles/tracker.module.css';

export default function QuickActions() {
  const {
    setTaskModalOpen,
    setEditingTask,
    setGoalModalOpen,
    setEditingGoal,
    setHabitModalOpen,
    setEditingHabit,
    setResourceModalOpen,
    setEditingResource,
    setActiveTab,
    setSearchModalOpen,
  } = useTracker();

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
      <button
        type="button"
        className={styles.btnPrimary}
        onClick={() => {
          setEditingTask(null);
          setTaskModalOpen(true);
        }}
      >
        <IconPlus size={15} />
        <span>Task</span>
      </button>

      <button
        type="button"
        className={styles.btnSecondary}
        onClick={() => {
          setEditingGoal(null);
          setGoalModalOpen(true);
        }}
      >
        <IconGoals size={15} />
        <span>Goal</span>
      </button>

      <button
        type="button"
        className={styles.btnSecondary}
        onClick={() => {
          setEditingHabit(null);
          setHabitModalOpen(true);
        }}
      >
        <IconHabit size={15} />
        <span>Habit</span>
      </button>

      <button
        type="button"
        className={styles.btnSecondary}
        onClick={() => setActiveTab('focus')}
      >
        <IconFocus size={15} />
        <span>Focus Mode</span>
      </button>

      <button
        type="button"
        className={styles.btnSecondary}
        onClick={() => {
          setEditingResource(null);
          setResourceModalOpen(true);
        }}
      >
        <IconResources size={15} />
        <span>Resource</span>
      </button>

      <button
        type="button"
        className={styles.btnSecondary}
        onClick={() => setSearchModalOpen(true)}
        title="Quick Search (Cmd+K / Ctrl+K)"
        style={{ padding: '0.45rem 0.65rem' }}
      >
        <IconSearch size={15} />
      </button>
    </div>
  );
}
