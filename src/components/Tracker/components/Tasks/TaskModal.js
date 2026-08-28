import React, { useState, useEffect } from 'react';
import { useTracker } from '../../context/TrackerContext';
import { IconClose, IconTasks, IconAlertCircle, IconPlus, IconTrash, IconCheck } from '../Common/Icons';
import styles from '../../styles/tracker.module.css';

const CATEGORIES = ['DSA', 'AI/ML', 'Development', 'Learning', 'Personal', 'Other'];
const PRIORITIES = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];
const STATUSES = [
  { value: 'pending', label: 'Planned / Pending' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
];
const RECURRENCE_OPTIONS = [
  { value: 'none', label: 'Does not repeat' },
  { value: 'daily', label: 'Repeats Daily' },
  { value: 'weekly', label: 'Repeats Weekly' },
  { value: 'monthly', label: 'Repeats Monthly' },
];

export default function TaskModal({ isOpen, onClose, initialData = null }) {
  const { createTask, updateTask, goals, milestones } = useTracker();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('Development');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [estimatedDuration, setEstimatedDuration] = useState('');
  const [recurrence, setRecurrence] = useState('none');
  const [goalId, setGoalId] = useState('');
  const [milestoneId, setMilestoneId] = useState('');
  const [subtasks, setSubtasks] = useState([]);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setErrorMsg('');
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setStatus(initialData.status || 'pending');
      setPriority(initialData.priority || 'medium');
      setCategory(initialData.category || 'Development');
      setDueDate(initialData.due_date || '');
      setDueTime(initialData.due_time || '');
      setEstimatedDuration(initialData.estimated_duration ? String(initialData.estimated_duration) : '');
      setRecurrence(initialData.recurrence || 'none');
      setGoalId(initialData.goal_id || '');
      setMilestoneId(initialData.milestone_id || '');
      setSubtasks(Array.isArray(initialData.subtasks) ? initialData.subtasks : []);
    } else {
      setTitle('');
      setDescription('');
      setStatus('pending');
      setPriority('medium');
      setCategory('Development');
      setDueDate(new Date().toISOString().split('T')[0]);
      setDueTime('');
      setEstimatedDuration('');
      setRecurrence('none');
      setGoalId('');
      setMilestoneId('');
      setSubtasks([]);
    }
    setNewSubtaskTitle('');
  }, [initialData, isOpen]);

  // Filter milestones matching selected goal
  const availableMilestones = milestones.filter((m) => !goalId || m.goal_id === goalId);

  if (!isOpen) return null;

  const handleAddSubtask = (e) => {
    e.preventDefault();
    if (!newSubtaskTitle.trim()) return;
    const newSub = {
      id: `st_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      title: newSubtaskTitle.trim(),
      completed: false,
    };
    setSubtasks((prev) => [...prev, newSub]);
    setNewSubtaskTitle('');
  };

  const handleToggleSubtaskLocal = (id) => {
    setSubtasks((prev) =>
      prev.map((s) => (s.id === id ? { ...s, completed: !s.completed } : s))
    );
  };

  const handleDeleteSubtaskLocal = (id) => {
    setSubtasks((prev) => prev.filter((s) => s.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!title.trim()) {
      setErrorMsg('Task title is required.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        title: title.trim(),
        description: description.trim() || null,
        status,
        priority,
        category,
        due_date: dueDate || null,
        due_time: dueTime || null,
        estimated_duration: estimatedDuration ? Number(estimatedDuration) : null,
        recurrence,
        goal_id: goalId || null,
        milestone_id: milestoneId || null,
        subtasks,
      };

      if (initialData && initialData.id) {
        await updateTask(initialData.id, payload);
      } else {
        await createTask(payload);
      }
      onClose();
    } catch (err) {
      console.error('Error saving task:', err);
      setErrorMsg(err.message || 'Failed to save task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'var(--vg-accent)' }}>
              <IconTasks size={18} />
            </span>
            <h3 className={styles.modalTitle}>{initialData && initialData.id ? 'Edit Task' : 'Create Task'}</h3>
          </div>
          <button type="button" className={styles.iconBtn} onClick={onClose}>
            <IconClose size={16} />
          </button>
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
            }}
          >
            <IconAlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Task Title *</label>
            <input
              type="text"
              placeholder="e.g. Implement Transformer Attention layer"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.input}
              required
              autoFocus
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Description (Optional)</label>
            <textarea
              placeholder="Add key objectives, notes, or execution steps..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.textarea}
              rows={2}
            />
          </div>

          {/* Subtasks Checklist Section */}
          <div className={styles.formGroup}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
              <label className={styles.formLabel}>Subtasks & Action Items ({subtasks.filter(s => s.completed).length}/{subtasks.length})</label>
            </div>
            
            {subtasks.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '0.5rem' }}>
                {subtasks.map((st) => (
                  <div
                    key={st.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.35rem 0.6rem',
                      background: 'var(--vg-surface)',
                      borderRadius: 'var(--vg-radius-sm)',
                      border: '1px solid var(--vg-border)',
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => handleToggleSubtaskLocal(st.id)}
                      className={`${styles.checkbox} ${st.completed ? styles.checkboxChecked : ''}`}
                      style={{ width: '16px', height: '16px', margin: 0 }}
                    >
                      {st.completed && <IconCheck size={11} />}
                    </button>
                    <span
                      style={{
                        fontSize: '0.82rem',
                        flexGrow: 1,
                        color: st.completed ? 'var(--vg-text-muted)' : 'var(--vg-text)',
                        textDecoration: st.completed ? 'line-through' : 'none',
                      }}
                    >
                      {st.title}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDeleteSubtaskLocal(st.id)}
                      className={styles.iconBtn}
                      style={{ padding: '0.15rem' }}
                    >
                      <IconTrash size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: 'flex', gap: '0.45rem' }}>
              <input
                type="text"
                placeholder="Add a concrete subtask..."
                value={newSubtaskTitle}
                onChange={(e) => setNewSubtaskTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSubtask(e);
                  }
                }}
                className={styles.input}
                style={{ fontSize: '0.82rem', padding: '0.4rem 0.65rem' }}
              />
              <button
                type="button"
                onClick={handleAddSubtask}
                className={styles.btnSecondary}
                style={{ fontSize: '0.78rem', padding: '0.4rem 0.75rem', whiteSpace: 'nowrap' }}
              >
                <IconPlus size={13} /> Add Subtask
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className={styles.select}>
                {STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Priority</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value)} className={styles.select}>
                {PRIORITIES.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className={styles.select}>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Due Time (Opt.)</label>
              <input
                type="time"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Est. Min</label>
              <input
                type="number"
                min={5}
                step={5}
                placeholder="e.g. 45"
                value={estimatedDuration}
                onChange={(e) => setEstimatedDuration(e.target.value)}
                className={styles.input}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Recurrence</label>
              <select value={recurrence} onChange={(e) => setRecurrence(e.target.value)} className={styles.select}>
                {RECURRENCE_OPTIONS.map((r) => (
                  <option key={r.value} value={r.value}>{r.label}</option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Link Goal</label>
              <select
                value={goalId}
                onChange={(e) => {
                  setGoalId(e.target.value);
                  setMilestoneId('');
                }}
                className={styles.select}
              >
                <option value="">No Goal (Independent)</option>
                {goals.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.title} ({g.type === 'short_term' ? 'Short' : 'Long'})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {goalId && availableMilestones.length > 0 && (
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Link Milestone</label>
              <select
                value={milestoneId}
                onChange={(e) => setMilestoneId(e.target.value)}
                className={styles.select}
              >
                <option value="">No Specific Milestone</option>
                {availableMilestones.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.title} {m.status === 'completed' ? '(Completed)' : ''}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className={styles.modalActions} style={{ marginTop: '0.5rem' }}>
            <button type="button" className={styles.btnSecondary} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.btnPrimary} disabled={loading}>
              {loading ? 'Saving...' : initialData && initialData.id ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
