import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { IconLock, IconUser, IconSettings, IconAlertCircle, IconCheck, IconChevronLeft } from '../Common/Icons';
import ConfigModal from './ConfigModal';
import styles from '../../styles/tracker.module.css';

export default function AuthView() {

  const { isConfigured, signIn, signUp, resetPassword, authError, setAuthError } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' | 'register' | 'forgot'
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [configOpen, setConfigOpen] = useState(!isConfigured);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setAuthError(null);
    setLoading(true);

    try {
      if (mode === 'login') {
        await signIn(email.trim(), password);
      } else if (mode === 'register') {
        const result = await signUp(email.trim(), password, fullName.trim());
        // If session is null, email confirmation is required
        if (!result?.session) {
          setSuccessMsg('Account created! Please check your inbox and confirm your email to log in.');
        }
        // If session exists, AuthContext auto-logs in and redirects — no message needed
      } else if (mode === 'forgot') {
        await resetPassword(email.trim());
        setSuccessMsg('Password reset link sent to your email.');
      }

    } catch (err) {
      // Error handled by AuthContext
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 120px)',
        padding: '2rem 1.5rem',
      }}
    >
      <div
        style={{
          maxWidth: '420px',
          width: '100%',
          background: 'var(--vg-bg-elevated)',
          border: '1px solid var(--vg-border)',
          borderRadius: 'var(--vg-radius-lg)',
          padding: '2.25rem 2rem',
          boxShadow: '0 16px 36px -10px rgba(0, 0, 0, 0.4)',
          position: 'relative',
        }}
      >
        {/* Top Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: 'var(--vg-radius-md)',
              background: 'var(--vg-accent)',
              color: '#ffffff',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              boxShadow: '0 4px 16px rgba(255, 77, 79, 0.35)',
            }}
          >
            <IconLock size={20} />
          </div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 700, margin: '0 0 0.4rem', color: 'var(--ifm-heading-color)' }}>
            Personal Command Center
          </h2>
          <p style={{ fontSize: '0.86rem', color: 'var(--vg-text-muted)', margin: 0 }}>
            {mode === 'login' && 'Sign in to access your private tracker.'}
            {mode === 'register' && 'Create your private productivity vault.'}
            {mode === 'forgot' && 'Reset your password.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: mode === 'forgot' ? '1fr' : '1fr 1fr',
            gap: '0.25rem',
            background: 'var(--vg-surface)',
            padding: '0.25rem',
            borderRadius: 'var(--vg-radius-sm)',
            marginBottom: '1.5rem',
          }}
        >
          {mode !== 'forgot' ? (
            <>
              <button
                type="button"
                onClick={() => { setMode('login'); setSuccessMsg(''); setAuthError(null); }}
                style={{
                  padding: '0.45rem',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  border: 'none',
                  borderRadius: 'var(--vg-radius-sm)',
                  cursor: 'pointer',
                  background: mode === 'login' ? 'var(--vg-bg-elevated)' : 'transparent',
                  color: mode === 'login' ? 'var(--vg-text)' : 'var(--vg-text-muted)',
                  transition: 'all 150ms ease',
                }}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setMode('register'); setSuccessMsg(''); setAuthError(null); }}
                style={{
                  padding: '0.45rem',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  border: 'none',
                  borderRadius: 'var(--vg-radius-sm)',
                  cursor: 'pointer',
                  background: mode === 'register' ? 'var(--vg-bg-elevated)' : 'transparent',
                  color: mode === 'register' ? 'var(--vg-text)' : 'var(--vg-text-muted)',
                  transition: 'all 150ms ease',
                }}
              >
                Register
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => { setMode('login'); setSuccessMsg(''); setAuthError(null); }}
              style={{
                padding: '0.45rem',
                fontSize: '0.82rem',
                fontWeight: 600,
                border: 'none',
                borderRadius: 'var(--vg-radius-sm)',
                cursor: 'pointer',
                background: 'var(--vg-bg-elevated)',
                color: 'var(--vg-text)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem',
              }}
            >
              <IconChevronLeft size={14} />
              <span>Back to Sign In</span>
            </button>

          )}
        </div>

        {/* Alerts */}
        {authError && (
          <div
            style={{
              background: 'rgba(255, 77, 79, 0.12)',
              border: '1px solid var(--vg-accent-border)',
              borderRadius: 'var(--vg-radius-sm)',
              padding: '0.75rem',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.82rem',
              color: 'var(--vg-accent)',
            }}
          >
            <IconAlertCircle size={16} />
            <span>{authError}</span>
          </div>
        )}

        {successMsg && (
          <div
            style={{
              background: 'rgba(82, 196, 26, 0.12)',
              border: '1px solid rgba(82, 196, 26, 0.25)',
              borderRadius: 'var(--vg-radius-sm)',
              padding: '0.75rem',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.82rem',
              color: '#52c41a',
            }}
          >
            <IconCheck size={16} />
            <span>{successMsg}</span>
          </div>
        )}

        {!isConfigured && (
          <div
            style={{
              background: 'var(--vg-surface)',
              border: '1px solid var(--vg-border)',
              borderRadius: 'var(--vg-radius-sm)',
              padding: '0.85rem',
              marginBottom: '1.25rem',
              fontSize: '0.8rem',
              color: 'var(--vg-text-muted)',
              lineHeight: '1.45',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
              <span style={{ fontWeight: 600, color: 'var(--vg-text)' }}>Supabase Setup Required</span>
              <button
                type="button"
                className={styles.iconBtn}
                onClick={() => setConfigOpen(true)}
                title="Configure Supabase"
              >
                <IconSettings size={15} />
              </button>
            </div>
            Connect your Supabase project to authenticate and save data in the cloud.
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {mode === 'register' && (
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Full Name</label>
              <input
                type="text"
                placeholder="Vardhman Gupta"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={styles.input}
                required
              />
            </div>
          )}

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          {mode !== 'forgot' && (
            <div className={styles.formGroup}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <label className={styles.formLabel}>Password</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => { setMode('forgot'); setSuccessMsg(''); setAuthError(null); }}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      fontSize: '0.75rem',
                      color: 'var(--vg-text-subtle)',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                    }}
                  >
                    Forgot?
                  </button>
                )}
              </div>
              <input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                required
                minLength={6}
              />
            </div>
          )}

          <button
            type="submit"
            className={styles.btnPrimary}
            disabled={loading}
            style={{ width: '100%', justifyContent: 'center', padding: '0.65rem', marginTop: '0.5rem' }}
          >
            {loading ? 'Authenticating...' : mode === 'login' ? 'Sign In' : mode === 'register' ? 'Create Account' : 'Send Reset Link'}
          </button>
        </form>

        {/* Footer info & Settings link */}
        <div
          style={{
            marginTop: '1.75rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--vg-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.75rem',
            color: 'var(--vg-text-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <IconLock size={12} />
            <span>RLS Protected</span>
          </div>
          <button
            type="button"
            onClick={() => setConfigOpen(true)}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              fontSize: '0.75rem',
              color: 'var(--vg-text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
            }}
          >
            <IconSettings size={12} />
            <span>Supabase Config</span>
          </button>
        </div>
      </div>

      <ConfigModal isOpen={configOpen} onClose={() => setConfigOpen(false)} />
    </div>
  );
}

