import React, { useState, useEffect } from 'react';
import { useTracker } from '../../context/TrackerContext';
import { IconClose, IconNote, IconAlertCircle, IconCheck, IconExternalLink } from '../Common/Icons';
import styles from '../../styles/tracker.module.css';

export default function ResourceNotesModal({ isOpen, onClose, resource = null }) {
  const { updateResource } = useTracker();

  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('unread');
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setErrorMsg('');
    setSavedSuccess(false);
    if (resource) {
      setNotes(resource.notes || '');
      setStatus(resource.status || 'unread');
    }
  }, [resource, isOpen]);

  if (!isOpen || !resource) return null;

  const handleSave = async () => {
    setSaving(true);
    setErrorMsg('');
    setSavedSuccess(false);

    try {
      await updateResource(resource.id, {
        notes: notes.trim() || null,
        status,
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    } catch (err) {
      console.error('Error saving resource notes:', err);
      setErrorMsg(err.message || 'Failed to save notes.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} style={{ maxWidth: '680px' }} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0 }}>
            <span style={{ color: 'var(--vg-accent)', flexShrink: 0 }}>
              <IconNote size={18} />
            </span>
            <div style={{ minWidth: 0 }}>
              <h3 className={styles.modalTitle} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {resource.title}
              </h3>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--vg-accent)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  marginTop: '0.15rem',
                }}
              >
                <span>Open Resource</span>
                <IconExternalLink size={12} />
              </a>
            </div>
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

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div className={styles.formGroup} style={{ width: '200px' }}>
              <label className={styles.formLabel}>Reading Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className={styles.select}>
                <option value="unread">Unread / To Explore</option>
                <option value="in_progress">Currently Reading</option>
                <option value="completed">Completed ✓</option>
              </select>
            </div>

            <span style={{ fontSize: '0.75rem', color: 'var(--vg-text-muted)', alignSelf: 'flex-end', marginBottom: '0.4rem' }}>
              {notes.length} characters
            </span>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Learning Notes & Key Takeaways</label>
            <textarea
              placeholder="Record deep insights, implementation patterns, formulas, algorithms, or summary bullets..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={styles.textarea}
              rows={10}
              style={{ fontFamily: 'var(--vg-font-mono)', fontSize: '0.85rem', lineHeight: '1.6' }}
            />
          </div>

          <div className={styles.modalActions} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              {savedSuccess && (
                <span style={{ fontSize: '0.8rem', color: '#52c41a', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <IconCheck size={14} /> Notes saved to cloud
                </span>
              )}
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button type="button" className={styles.btnSecondary} onClick={onClose}>
                Close
              </button>
              <button type="button" className={styles.btnPrimary} onClick={handleSave} disabled={saving}>
                {saving ? 'Saving...' : 'Save Notes'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

