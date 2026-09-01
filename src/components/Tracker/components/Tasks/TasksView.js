import React, { useState, useMemo } from 'react';
import { useTracker } from '../../context/TrackerContext';
import EmptyState from '../Common/EmptyState';
import {
  IconTasks,
  IconPlus,
  IconSearch,
  IconCheck,
  IconEdit,
  IconTrash,
  IconClock,
  IconRepeat,
  IconChevronDown,
  IconChevronUp,
  IconListPlus,
} from '../Common/Icons';
import styles from '../../styles/tracker.module.css';

const CATEGORIES = ['All Categories', 'Naam Jap', 'DSA', 'AI/ML', 'Development', 'Learning', 'Personal', 'Health', 'Other'];

export default function TasksView() {
  const {
    tasks,
    toggleTaskStatus,
    toggleSubtask,
    deleteTask,
    setEditingTask,
    setTaskModalOpen,
    openConfirmModal,
  } = useTracker();

  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('due_date');
  const [expandedTasks, setExpandedTasks] = useState({});

  const _td = new Date();
  const todayStr = `${_td.getFullYear()}-${String(_td.getMonth() + 1).padStart(2, '0')}-${String(_td.getDate()).padStart(2, '0')}`;

  const toggleExpand = (taskId) => {
    setExpandedTasks((prev) => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // 1. Status / Time Filter
      if (activeFilter === 'today' && task.due_date !== todayStr) return false;
      if (activeFilter === 'upcoming') {
        if (task.status === 'completed' || !task.due_date || task.due_date <= todayStr) return false;
      }
      if (activeFilter === 'overdue') {
        if (task.status === 'completed' || !task.due_date || task.due_date >= todayStr) return false;
      }
      if (activeFilter === 'completed' && task.status !== 'completed') return false;
      if (activeFilter === 'high' && task.priority !== 'high') return false;

      // 2. Category Filter
      if (selectedCategory !== 'All Categories' && task.category !== selectedCategory) {
        return false;
      }

      // 3. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = task.title?.toLowerCase().includes(q);
        const matchDesc = task.description?.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc) return false;
      }

      return true;
    });
  }, [tasks, activeFilter, selectedCategory, searchQuery, todayStr]);

  // Sorting
  const sortedTasks = useMemo(() => {
    return [...filteredTasks].sort((a, b) => {
      if (sortBy === 'priority') {
        const weight = { high: 3, medium: 2, low: 1 };
        return (weight[b.priority] || 0) - (weight[a.priority] || 0);
      }
      if (sortBy === 'created_at') {
        return new Date(b.created_at || 0) - new Date(a.created_at || 0);
      }
      if (sortBy === 'status') {
        return a.status.localeCompare(b.status);
      }
      if (!a.due_date) return 1;
      if (!b.due_date) return -1;
      return a.due_date.localeCompare(b.due_date);
    });
  }, [filteredTasks, sortBy]);

  const handleDelete = (task) => {
    openConfirmModal(
      'Delete Task?',
      `Are you sure you want to delete "${task.title}"?`,
      () => deleteTask(task.id)
    );
  };

  return (
    <div className={styles.viewContainer}>
      {/* Header */}
      <div className={styles.viewHeader}>
        <div>
          <h1 className={styles.viewTitle}>Tasks</h1>
          <p className={styles.viewSubtitle}>
            Capture, prioritize, and execute engineering action items with clarity.
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

      {/* Filter Tabs */}
      <div className={styles.filterTabs}>
        {[
          { id: 'all', label: `All (${tasks.length})` },
          { id: 'today', label: 'Today' },
          { id: 'upcoming', label: 'Upcoming' },
          { id: 'overdue', label: 'Overdue' },
          { id: 'high', label: 'High Priority' },
          { id: 'completed', label: 'Completed' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`${styles.filterTab} ${activeFilter === tab.id ? styles.filterTabActive : ''}`}
            onClick={() => setActiveFilter(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search & Select Bars */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}
      >
        {/* Search */}
        <div style={{ position: 'relative', flex: '1 1 240px', maxWidth: '380px' }}>
          <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--vg-text-muted)', display: 'flex' }}>
            <IconSearch size={15} />
          </span>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.input}
            style={{ paddingLeft: '2.2rem' }}
          />
        </div>

        {/* Dropdowns */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={styles.select}
            style={{ width: 'auto' }}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--vg-text-muted)' }}>
            <span>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={styles.select}
              style={{ width: 'auto', padding: '0.35rem 0.6rem' }}
            >
              <option value="due_date">Due Date</option>
              <option value="priority">Priority</option>
              <option value="created_at">Created Date</option>
              <option value="status">Status</option>
            </select>
          </div>
        </div>
      </div>

      {/* Task List */}
      {sortedTasks.length === 0 ? (
        <EmptyState
          icon={IconTasks}
          title="No tasks found"
          description={
            tasks.length === 0
              ? 'Get started by creating your first engineering task.'
              : 'Try clearing your search query or filters.'
          }
          actionLabel="Add Task"
          onAction={() => {
            setEditingTask(null);
            setTaskModalOpen(true);
          }}
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {sortedTasks.map((task) => {
            const isCompleted = task.status === 'completed';
            const isOverdue = !isCompleted && task.due_date && task.due_date < todayStr;
            const subtasks = Array.isArray(task.subtasks) ? task.subtasks : [];
            const completedSubtasks = subtasks.filter((s) => s.completed);
            const isExpanded = !!expandedTasks[task.id];

            return (
              <div
                key={task.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'var(--vg-bg-elevated)',
                  border: '1px solid var(--vg-border)',
                  borderRadius: 'var(--vg-radius-sm)',
                  padding: '0.85rem 1rem',
                  gap: '0.5rem',
                  opacity: isCompleted ? 0.6 : 1,
                }}
              >
                {/* Main Task Row */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  {/* Complete Checkbox */}
                  <button
                    type="button"
                    className={`${styles.checkbox} ${isCompleted ? styles.checkboxChecked : ''}`}
                    onClick={() => toggleTaskStatus(task.id)}
                    title={isCompleted ? 'Mark as Incomplete' : 'Mark as Completed'}
                  >
                    {isCompleted && <IconCheck size={12} />}
                  </button>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span
                        style={{
                          fontSize: '0.92rem',
                          fontWeight: 500,
                          color: isCompleted ? 'var(--vg-text-muted)' : 'var(--vg-text)',
                          textDecoration: isCompleted ? 'line-through' : 'none',
                        }}
                      >
                        {task.title}
                      </span>

                      {task.status === 'in_progress' && (
                        <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.4rem', borderRadius: '4px', background: 'rgba(24, 144, 255, 0.15)', color: '#1890ff', fontWeight: 600 }}>
                          In Progress
                        </span>
                      )}

                      {task.recurrence && task.recurrence !== 'none' && (
                        <span
                          style={{
                            fontSize: '0.7rem',
                            padding: '0.15rem 0.45rem',
                            borderRadius: '4px',
                            background: 'rgba(114, 46, 209, 0.12)',
                            color: '#9254de',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.2rem',
                            fontWeight: 500,
                          }}
                        >
                          <IconRepeat size={11} /> {task.recurrence}
                        </span>
                      )}
                    </div>

                    {task.description && (
                      <div style={{ fontSize: '0.8rem', color: 'var(--vg-text-muted)', marginTop: '0.2rem', lineHeight: '1.4' }}>
                        {task.description}
                      </div>
                    )}

                    {/* Metadata Tags */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.4rem', flexWrap: 'wrap' }}>
                      <span className={`${styles.priorityTag} ${styles[`priority_${task.priority}`]}`}>
                        {task.priority}
                      </span>

                      <span className={styles.categoryTag}>{task.category}</span>

                      {task.due_date && (
                        <span
                          style={{
                            fontSize: '0.75rem',
                            color: isOverdue ? 'var(--vg-accent)' : 'var(--vg-text-muted)',
                            fontWeight: isOverdue ? 600 : 400,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                          }}
                        >
                          <IconClock size={12} />
                          {task.due_date === todayStr ? 'Due Today' : `Due: ${task.due_date}`}
                          {task.due_time ? ` @ ${task.due_time}` : ''}
                        </span>
                      )}

                      {task.estimated_duration && (
                        <span style={{ fontSize: '0.75rem', color: 'var(--vg-text-muted)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                          <IconClock size={11} /> {task.estimated_duration}m
                        </span>
                      )}

                      {/* Subtasks Counter Badge */}
                      {subtasks.length > 0 && (
                        <button
                          type="button"
                          onClick={() => toggleExpand(task.id)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            fontSize: '0.72rem',
                            padding: '0.12rem 0.45rem',
                            borderRadius: '4px',
                            background: 'var(--vg-surface)',
                            border: '1px solid var(--vg-border)',
                            color: completedSubtasks.length === subtasks.length ? '#52c41a' : 'var(--vg-text)',
                            cursor: 'pointer',
                          }}
                        >
                          <IconListPlus size={11} />
                          {completedSubtasks.length}/{subtasks.length} Subtasks
                          {isExpanded ? <IconChevronUp size={11} /> : <IconChevronDown size={11} />}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <button
                      type="button"
                      className={styles.iconBtn}
                      onClick={() => {
                        setEditingTask(task);
                        setTaskModalOpen(true);
                      }}
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

                {/* Inline Subtasks Checklist (Expanded) */}
                {isExpanded && subtasks.length > 0 && (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.3rem',
                      marginLeft: '2rem',
                      marginTop: '0.25rem',
                      paddingLeft: '0.5rem',
                      borderLeft: '2px solid var(--vg-border)',
                    }}
                  >
                    {subtasks.map((st) => (
                      <div
                        key={st.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.45rem',
                          padding: '0.25rem 0.45rem',
                          borderRadius: 'var(--vg-radius-sm)',
                          background: st.completed ? 'transparent' : 'var(--vg-surface)',
                        }}
                      >
                        <button
                          type="button"
                          className={`${styles.checkbox} ${st.completed ? styles.checkboxChecked : ''}`}
                          onClick={() => toggleSubtask(task.id, st.id)}
                          style={{ width: '15px', height: '15px', margin: 0 }}
                        >
                          {st.completed && <IconCheck size={10} />}
                        </button>
                        <span
                          style={{
                            fontSize: '0.8rem',
                            color: st.completed ? 'var(--vg-text-muted)' : 'var(--vg-text)',
                            textDecoration: st.completed ? 'line-through' : 'none',
                          }}
                        >
                          {st.title}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}