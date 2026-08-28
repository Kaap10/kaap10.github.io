import React, { useState, useEffect } from 'react';
import { useTracker } from '../../context/TrackerContext';
import { IconClose, IconMilestone, IconAlertCircle } from '../Common/Icons';
import styles from '../../styles/tracker.module.css';

export default function MilestoneModal({ isOpen, onClose, initialData = null, goalId = null }) {
  const { createMilestone, updateMilestone, goals } = useTracker();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetGoalId, setTargetGoalId] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [status, setStatus] = useState('active');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setErrorMsg('');
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setTargetGoalId(initialData.goal_id || goalId || '');
      setTargetDate(initialData.target_date || '');
      setStatus(initialData.status || 'active');
    } else {
      setTitle('');
      setDescription('');
      setTargetGoalId(goalId || (goals[0]?.id || ''));
      setTargetDate('');
      setStatus('active');
    }
  }, [initialData, isOpen, goalId, goals]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!title.trim()) {
      setErrorMsg('Milestone title is required.');
      return;
    }
    if (!targetGoalId) {
      setErrorMsg('Please select a parent Goal for this milestone.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        title: title.trim(),
        description: description.trim() || null,
        goal_id: targetGoalId,
        target_date: targetDate || null,
        status,
      };

      if (initialData) {
        await updateMilestone(initialData.id, payload);
      } else {
        await createMilestone(payload);
      }
      onClose();
    } catch (err) {
      console.error('Error saving milestone:', err);
      setErrorMsg(err.message || 'Failed to save milestone.');
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
              <IconMilestone size={18} />
            </span>
            <h3 className={styles.modalTitle}>{initialData ? 'Edit Milestone' : 'Add Milestone'}</h3>
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

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Parent Goal *</label>
            <select
              value={targetGoalId}
              onChange={(e) => setTargetGoalId(e.target.value)}
              className={styles.select}
              required
            >
              {goals.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.title} ({g.type === 'short_term' ? 'Short-term' : 'Long-term'})
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Milestone Title *</label>
            <input
              type="text"
              placeholder="e.g. Complete Fundamentals of Deep Learning"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.input}
              required
              autoFocus
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Description</label>
            <textarea
              placeholder="Key sub-goals, core topics, or acceptance criteria..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.textarea}
              rows={2}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Target Date</label>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className={styles.select}>
                <option value="active">Active (In Progress)</option>
                <option value="completed">Completed ✓</option>
              </select>
            </div>
          </div>

          <div className={styles.modalActions}>
            <button type="button" className={styles.btnSecondary} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.btnPrimary} disabled={loading}>
              {loading ? 'Saving...' : initialData ? 'Save Changes' : 'Create Milestone'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

