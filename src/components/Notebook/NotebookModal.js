import React, { useState, useEffect } from 'react';
import { X, Folder } from 'lucide-react';
import styles from './styles.module.css';

export default function NotebookModal({ isOpen, onClose, onSave, initialData }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#FF4D4F');

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setTitle(initialData.title || '');
        setDescription(initialData.description || '');
        setColor(initialData.color || '#FF4D4F');
      } else {
        setTitle('');
        setDescription('');
        setColor('#FF4D4F');
      }
    }
  }, [isOpen, initialData]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({
      title: title.trim(),
      description: description.trim(),
      color,
    });
    onClose();
  };

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className={styles.modalHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Folder size={18} style={{ color: 'var(--vg-accent, #FF4D4F)' }} />
            <h2 className={styles.modalTitle}>
              {initialData ? 'Edit Notebook' : 'Create New Notebook'}
            </h2>
          </div>
          <button type="button" className={styles.iconBtn} onClick={onClose} title="Close">
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit}>
          <div className={styles.modalBody}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Notebook Title</label>
              <input
                type="text"
                className={styles.formInput}
                placeholder="e.g., System Design, React & Next.js, Algorithms..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Description (Optional)</label>
              <textarea
                className={styles.formInput}
                placeholder="What topics or snippets are stored here?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                style={{ resize: 'none', lineHeight: '1.5' }}
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div className={styles.modalFooter}>
            <button type="button" className={styles.btnSecondary} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.btnPrimary}>
              {initialData ? 'Save Changes' : 'Create Notebook'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

