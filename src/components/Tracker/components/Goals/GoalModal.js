import React, { useState, useEffect } from 'react';
import { useTracker } from '../../context/TrackerContext';
import { IconClose, IconGoals, IconAlertCircle } from '../Common/Icons';
import styles from '../../styles/tracker.module.css';

export default function GoalModal({ isOpen, onClose, initialData = null }) {
  const { createGoal, updateGoal } = useTracker();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('short_term');
  const [status, setStatus] = useState('active');
  const [targetDate, setTargetDate] = useState('');
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setErrorMsg('');
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setType(initialData.type || 'short_term');
      setStatus(initialData.status || 'active');
      setTargetDate(initialData.target_date || '');
      setProgress(initialData.progress || 0);
    } else {
      setTitle('');
      setDescription('');
      setType('short_term');
      setStatus('active');
      setTargetDate('');
      setProgress(0);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!title.trim()) {
      setErrorMsg('Goal title is required.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        title: title.trim(),
        description: description.trim() || null,
        type,
        status,
        target_date: targetDate || null,
        progress: Math.min(100, Math.max(0, Number(progress) || 0)),
      };

      if (initialData) {
        await updateGoal(initialData.id, payload);
      } else {
        await createGoal(payload);
      }
      onClose();
    } catch (err) {
      console.error('Error saving goal:', err);
      setErrorMsg(err.message || 'Failed to save goal. Please try again.');
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
              <IconGoals size={18} />
            </span>
            <h3 className={styles.modalTitle}>{initialData ? 'Edit Goal' : 'New Goal'}</h3>
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
            <label className={styles.formLabel}>Goal Title *</label>
            <input
              type="text"
              placeholder="e.g. Master Distributed Systems Architecture"
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
              placeholder="What does success look like? Outline major milestones..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.textarea}
              rows={3}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Horizon / Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className={styles.select}
              >
                <option value="short_term">Short-term (Weeks / Months)</option>
                <option value="long_term">Long-term (Year / Multi-year)</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className={styles.select}
              >
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Target Deadline</label>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label className={styles.formLabel}>Progress</label>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--vg-accent)' }}>
                  {progress}%
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--vg-accent)', marginTop: '0.4rem' }}
              />
            </div>
          </div>

          <div className={styles.modalActions}>
            <button type="button" className={styles.btnSecondary} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.btnPrimary} disabled={loading}>
              {loading ? 'Saving...' : initialData ? 'Save Changes' : 'Create Goal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
