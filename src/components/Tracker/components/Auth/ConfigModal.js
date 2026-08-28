import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getSupabaseCredentials } from '../../services/supabaseClient';
import { IconSettings, IconClose, IconLock } from '../Common/Icons';
import styles from '../../styles/tracker.module.css';

export default function ConfigModal({ isOpen, onClose }) {
  const { configureCredentials, resetConfiguration } = useAuth();
  const currentCreds = getSupabaseCredentials();

  const [url, setUrl] = useState(currentCreds.url || '');
  const [anonKey, setAnonKey] = useState(currentCreds.anonKey || '');
  const [msg, setMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim() || !anonKey.trim()) {
      setMsg('Both Supabase URL and Anon Key are required.');
      return;
    }

    try {
      new URL(url.trim());
    } catch {
      setMsg('Invalid Supabase Project URL. Example: https://xyz.supabase.co');
      return;
    }

    configureCredentials(url.trim(), anonKey.trim());
    setMsg('');
    onClose();
  };

  const handleClear = () => {
    resetConfiguration();
    setUrl('');
    setAnonKey('');
    setMsg('Configuration cleared.');
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
        <div className={styles.modalHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'var(--vg-accent)' }}>
              <IconSettings size={18} />
            </span>
            <h3 className={styles.modalTitle}>Supabase Connection</h3>
          </div>
          <button type="button" className={styles.iconBtn} onClick={onClose}>
            <IconClose size={16} />
          </button>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--vg-text-muted)', lineHeight: '1.5', margin: 0 }}>
          Connect your personal Supabase project to enable secure, cloud-persistent productivity tracking.
        </p>

        <div style={{ background: 'var(--vg-surface)', padding: '0.75rem', borderRadius: 'var(--vg-radius-sm)', border: '1px solid var(--vg-border)', fontSize: '0.78rem', color: 'var(--vg-text-subtle)', lineHeight: '1.4' }}>
          <strong>Security Notice:</strong> Only enter your public <code>anon</code> publishable key. Never enter the <code>service_role</code> key.
        </div>

        {msg && (
          <div style={{ color: 'var(--vg-accent)', fontSize: '0.84rem' }}>
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Supabase Project URL</label>
            <input
              type="text"
              placeholder="https://your-project.supabase.co"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Public Anon Key</label>
            <textarea
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              value={anonKey}
              onChange={(e) => setAnonKey(e.target.value)}
              className={styles.textarea}
              style={{ minHeight: '90px', fontFamily: 'monospace', fontSize: '0.8rem' }}
              required
            />
          </div>

          <div className={styles.modalActions} style={{ justifyContent: 'space-between' }}>
            <button type="button" className={styles.btnDanger} onClick={handleClear}>
              Disconnect
            </button>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button type="button" className={styles.btnSecondary} onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className={styles.btnPrimary}>
                <IconLock size={14} />
                <span>Save &amp; Connect</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

