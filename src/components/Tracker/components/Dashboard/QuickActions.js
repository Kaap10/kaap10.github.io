import React from 'react';
import { useTracker } from '../../context/TrackerContext';
import { IconPlus, IconTasks, IconGoals, IconResources } from '../Common/Icons';
import styles from '../../styles/tracker.module.css';

export default function QuickActions() {
  const { setTaskModalOpen, setEditingTask, setGoalModalOpen, setEditingGoal, setResourceModalOpen, setEditingResource } = useTracker();

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
      <button
        type="button"
        className={styles.btnPrimary}
        onClick={() => {
          setEditingTask(null);
          setTaskModalOpen(true);
        }}
      >
        <IconPlus size={15} />
        <span>Add Task</span>
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
        <span>Add Goal</span>
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
        <span>Add Resource</span>
      </button>
    </div>
  );
}

