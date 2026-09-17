import React, { useState, useEffect } from 'react';
import { getSupabase } from '../Tracker/services/supabaseClient';
import { X, Lock, Mail, User, LogOut, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import styles from './authModal.module.css';

export default function AuthModal({ isOpen, onClose, currentUser = null, onAuthChange = null }) {
  const [tab, setTab] = useState('login'); // 'login' | 'register' | 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      setErrorMsg('');
      setSuccessMsg('');
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    const supabase = getSupabase();
    if (!supabase) {
      setErrorMsg('Supabase is not configured.');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) throw error;

      if (data?.user) {
        setSuccessMsg('Successfully signed in!');
        if (onAuthChange) onAuthChange(data.user);
        setTimeout(() => {
          onClose();
        }, 600);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Failed to sign in. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    const supabase = getSupabase();
    if (!supabase) {
      setErrorMsg('Supabase is not configured.');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: { full_name: fullName.trim() },
        },
      });

      if (error) throw error;

      if (data?.session?.user) {
        setSuccessMsg('Account created & logged in!');
        if (onAuthChange) onAuthChange(data.session.user);
        setTimeout(() => {
          onClose();
        }, 600);
      } else {
        setSuccessMsg('Account created! Please check your email inbox to confirm your account.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Failed to create account.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    const supabase = getSupabase();
    if (!supabase) {
      setErrorMsg('Supabase is not configured.');
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim());
      if (error) throw error;
      setSuccessMsg('Password reset link has been sent to your email.');
    } catch (err) {
      setErrorMsg(err.message || 'Failed to send password reset link.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    const supabase = getSupabase();
    if (supabase) {
      try {
        await supabase.auth.signOut();
        if (onAuthChange) onAuthChange(null);
        onClose();
      } catch (err) {
        console.warn('Sign out error:', err);
      }
    }
    setLoading(false);
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button type="button" className={styles.closeBtn} onClick={onClose} title="Close">
          <X size={18} />
        </button>

        {/* If Already Logged In: Show Profile Card */}
        {currentUser ? (
          <div>
            <div className={styles.header}>
              <div className={styles.iconWrap}>
                <User size={22} />
              </div>
              <h2 className={styles.title}>Account Profile</h2>
              <p className={styles.subtitle}>Connected & Synced to Cloud</p>
            </div>

            <div className={styles.profileCard}>
              <div className={styles.avatar}>
                {currentUser.user_metadata?.full_name
                  ? currentUser.user_metadata.full_name.charAt(0).toUpperCase()
                  : currentUser.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className={styles.profileInfo}>
                <span className={styles.profileName}>
                  {currentUser.user_metadata?.full_name || 'Authenticated User'}
                </span>
                <span className={styles.profileEmail}>{currentUser.email}</span>
              </div>
            </div>

            <button
              type="button"
              className={styles.signOutBtn}
              onClick={handleSignOut}
              disabled={loading}
            >
              {loading ? <Loader2 size={16} className={styles.spin} /> : <LogOut size={16} />}
              <span>Sign Out</span>
            </button>
          </div>
        ) : (
          /* If Guest: Show Sign In / Sign Up Tabs */
          <div>
            <div className={styles.header}>
              <div className={styles.iconWrap}>
                <Lock size={22} />
              </div>
              <h2 className={styles.title}>
                {tab === 'login' && 'Sign In to Sync'}
                {tab === 'register' && 'Create Account'}
                {tab === 'forgot' && 'Reset Password'}
              </h2>
              <p className={styles.subtitle}>
                Access your Whiteboards & Notes across laptop, phone & all devices
              </p>
            </div>

            {/* Tab Navigation */}
            <div className={styles.tabNav}>
              <button
                type="button"
                className={`${styles.tabBtn} ${tab === 'login' ? styles.tabBtnActive : ''}`}
                onClick={() => {
                  setTab('login');
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
              >
                Sign In
              </button>
              <button
                type="button"
                className={`${styles.tabBtn} ${tab === 'register' ? styles.tabBtnActive : ''}`}
                onClick={() => {
                  setTab('register');
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
              >
                Register
              </button>
              <button
                type="button"
                className={`${styles.tabBtn} ${tab === 'forgot' ? styles.tabBtnActive : ''}`}
                onClick={() => {
                  setTab('forgot');
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
              >
                Reset
              </button>
            </div>

            {/* Feedback Notifications */}
            {errorMsg && (
              <div className={styles.errorBox}>
                <AlertCircle size={15} style={{ flexShrink: 0 }} />
                <span>{errorMsg}</span>
              </div>
            )}
            {successMsg && (
              <div className={styles.successBox}>
                <CheckCircle2 size={15} style={{ flexShrink: 0 }} />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Sign In Form */}
            {tab === 'login' && (
              <form className={styles.form} onSubmit={handleSignIn}>
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="you@domain.com"
                    className={styles.inputField}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className={styles.inputField}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button type="submit" className={styles.submitBtn} disabled={loading}>
                  {loading ? <Loader2 size={16} className={styles.spin} /> : <Lock size={15} />}
                  <span>Sign In & Sync</span>
                </button>
              </form>
            )}

            {/* Register Form */}
            {tab === 'register' && (
              <form className={styles.form} onSubmit={handleSignUp}>
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    className={styles.inputField}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    autoFocus
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="you@domain.com"
                    className={styles.inputField}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Password</label>
                  <input
                    type="password"
                    required
                    placeholder="Minimum 6 characters"
                    minLength={6}
                    className={styles.inputField}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button type="submit" className={styles.submitBtn} disabled={loading}>
                  {loading ? <Loader2 size={16} className={styles.spin} /> : <User size={15} />}
                  <span>Create Free Account</span>
                </button>
              </form>
            )}

            {/* Forgot Password Form */}
            {tab === 'forgot' && (
              <form className={styles.form} onSubmit={handleResetPassword}>
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Registered Email</label>
                  <input
                    type="email"
                    required
                    placeholder="you@domain.com"
                    className={styles.inputField}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                  />
                </div>

                <button type="submit" className={styles.submitBtn} disabled={loading}>
                  {loading ? <Loader2 size={16} className={styles.spin} /> : <Mail size={15} />}
                  <span>Send Reset Link</span>
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

