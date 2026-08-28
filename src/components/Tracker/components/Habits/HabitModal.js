import React, { useState, useEffect } from 'react';
import { useTracker } from '../../context/TrackerContext';
import { IconClose, IconHabit, IconAlertCircle } from '../Common/Icons';
import styles from '../../styles/tracker.module.css';

export default function HabitModal({ isOpen, onClose, initialData = null }) {
  const { createHabit, updateHabit } = useTracker();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setErrorMsg('');
    if (initialData) {
      setName(initialData.name || '');
      setDescription(initialData.description || '');
      setFrequency(initialData.frequency || 'daily');
    } else {
      setName('');
      setDescription('');
      setFrequency('daily');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!name.trim()) {
      setErrorMsg('Habit name is required.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: name.trim(),
        description: description.trim() || null,
        frequency,
      };

      if (initialData && initialData.id) {
        await updateHabit(initialData.id, payload);
      } else {
        await createHabit(payload);
      }
      onClose();
    } catch (err) {
      console.error('Error saving habit:', err);
      setErrorMsg(err.message || 'Failed to save habit.');
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
              <IconHabit size={18} />
            </span>
            <h3 className={styles.modalTitle}>{initialData ? 'Edit Habit' : 'New Daily Habit'}</h3>
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
            <label className={styles.formLabel}>Habit Name *</label>
            <input
              type="text"
              placeholder="e.g. Solve 2 LeetCode problems daily"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              required
              autoFocus
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Description (Optional)</label>
            <textarea
              placeholder="Why this habit matters, target consistency, or execution cues..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.textarea}
              rows={2}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Frequency</label>
            <select value={frequency} onChange={(e) => setFrequency(e.target.value)} className={styles.select}>
              <option value="daily">Every Day (Daily)</option>
              <option value="weekly">Weekly Target</option>
            </select>
          </div>

          <div className={styles.modalActions}>
            <button type="button" className={styles.btnSecondary} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.btnPrimary} disabled={loading}>
              {loading ? 'Saving...' : initialData ? 'Save Changes' : 'Create Habit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

