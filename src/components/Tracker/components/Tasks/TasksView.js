import React, { useState, useMemo } from 'react';
import { useTracker } from '../../context/TrackerContext';
import {
  IconPlus,
  IconCheck,
  IconEdit,
  IconTrash,
  IconSearch,
  IconFilter,
  IconCalendar,
  IconGoals,
  IconTasks,
} from '../Common/Icons';
import EmptyState from '../Common/EmptyState';
import styles from '../../styles/tracker.module.css';

const CATEGORIES = ['All', 'Development', 'AI/ML', 'DSA', 'Learning', 'Personal', 'Other'];

export default function TasksView() {
  const {
    tasks,
    goals,
    toggleTaskStatus,
    deleteTask,
    setTaskModalOpen,
    setEditingTask,
    requestConfirmation,
  } = useTracker();

  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'pending' | 'completed' | 'high'
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      // Status filter
      if (statusFilter === 'pending' && t.status !== 'pending') return false;
      if (statusFilter === 'completed' && t.status !== 'completed') return false;
      if (statusFilter === 'high' && t.priority !== 'high') return false;

      // Category filter
      if (categoryFilter !== 'All' && t.category !== categoryFilter) return false;

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const titleMatch = t.title?.toLowerCase().includes(q);
        const descMatch = t.description?.toLowerCase().includes(q);
        if (!titleMatch && !descMatch) return false;
      }

      return true;
    });
  }, [tasks, statusFilter, categoryFilter, searchQuery]);

  const goalsMap = useMemo(() => {
    const map = {};
    goals.forEach((g) => {
      map[g.id] = g.title;
    });
    return map;
  }, [goals]);

  const handleDelete = (task) => {
    requestConfirmation({
      title: 'Delete Task',
      message: `Are you sure you want to delete "${task.title}"?`,
      onConfirm: async () => {
        await deleteTask(task.id);
      },
    });
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setTaskModalOpen(true);
  };

  return (
    <div>
      {/* Top Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerTitleArea}>
          <span className={styles.headerKicker}>Task Management</span>
          <h1 className={styles.headerTitle}>Tasks &amp; Todos</h1>
          <p className={styles.headerSubtitle}>
            Organize daily execution and tie tasks to your larger goals.
          </p>
        </div>

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

      {/* Filter / Search Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        {/* Status Filter Buttons */}
        <div
          style={{
            display: 'inline-flex',
            background: 'var(--vg-surface)',
            padding: '0.25rem',
            borderRadius: 'var(--vg-radius-sm)',
            border: '1px solid var(--vg-border)',
            gap: '0.2rem',
          }}
        >
          {[
            { id: 'all', label: 'All' },
            { id: 'pending', label: 'Pending' },
            { id: 'completed', label: 'Completed' },
            { id: 'high', label: 'High Priority' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStatusFilter(tab.id)}
              style={{
                padding: '0.35rem 0.75rem',
                fontSize: '0.8rem',
                fontWeight: 500,
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                background: statusFilter === tab.id ? 'var(--vg-bg-elevated)' : 'transparent',
                color: statusFilter === tab.id ? 'var(--vg-text)' : 'var(--vg-text-muted)',
                boxShadow: statusFilter === tab.id ? '0 1px 3px rgba(0,0,0,0.2)' : 'none',
                transition: 'all 150ms ease',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Right side: Category Dropdown & Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexGrow: 1, maxWidth: '480px' }}>
          <div style={{ minWidth: '140px' }}>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className={styles.select}
              style={{ padding: '0.45rem 0.75rem', fontSize: '0.82rem' }}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>

          <div style={{ position: 'relative', width: '100%' }}>
            <span
              style={{
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--vg-text-subtle)',
                display: 'flex',
              }}
            >
              <IconSearch size={14} />
            </span>
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.input}
              style={{ paddingLeft: '2rem', fontSize: '0.82rem' }}
            />
          </div>
        </div>
      </div>

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <EmptyState
          icon={<IconTasks size={22} />}
          title={searchQuery || statusFilter !== 'all' || categoryFilter !== 'All' ? 'No matching tasks' : 'No tasks created yet'}
          description={
            searchQuery || statusFilter !== 'all' || categoryFilter !== 'All'
              ? 'Try changing your search query or filters.'
              : 'Add your first task to start organizing your workflow.'
          }
          actionLabel="Create Task"
          onAction={() => {
            setEditingTask(null);
            setTaskModalOpen(true);
          }}
        />
      ) : (
        <div className={styles.taskList}>
          {filteredTasks.map((task) => {
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
                      {task.due_date && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                          <IconCalendar size={12} />
                          <span>{task.due_date}</span>
                        </span>
                      )}
                      {task.goal_id && goalsMap[task.goal_id] && (
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            color: 'var(--vg-accent)',
                          }}
                        >
                          <IconGoals size={12} />
                          <span>{goalsMap[task.goal_id]}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className={styles.taskActions}>
                  <button
                    type="button"
                    className={styles.iconBtn}
                    onClick={() => handleEdit(task)}
                    title="Edit Task"
                  >
                    <IconEdit size={15} />
                  </button>
                  <button
                    type="button"
                    className={styles.iconBtn}
                    onClick={() => handleDelete(task)}
                    title="Delete Task"
                    style={{ color: 'var(--vg-accent)' }}
                  >
                    <IconTrash size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

