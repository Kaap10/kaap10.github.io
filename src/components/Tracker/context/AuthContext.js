import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getSupabase, getSupabaseCredentials, saveSupabaseCredentials, clearSupabaseCredentials } from '../services/supabaseClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isConfigured, setIsConfigured] = useState(false);
  const [authError, setAuthError] = useState(null);

  const checkConfigAndInit = useCallback(async () => {
    setLoading(true);
    setAuthError(null);
    const { url, anonKey } = getSupabaseCredentials();

    if (!url || !anonKey) {
      setIsConfigured(false);
      setUser(null);
      setSession(null);
      setLoading(false);
      return;
    }

    const supabase = getSupabase();
    if (!supabase) {
      setIsConfigured(false);
      setLoading(false);
      return;
    }

    setIsConfigured(true);

    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.warn('Error fetching Supabase session:', error.message);
      }
      setSession(data?.session || null);
      setUser(data?.session?.user || null);
    } catch (err) {
      console.error('Failed to get Supabase session:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkConfigAndInit();

    // Subscribe to auth state changes — non-async wrapper so React properly uses cleanup
    const supabase = getSupabase();
    if (!supabase) return;

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        setSession(currentSession);
        setUser((prev) => {
          const next = currentSession?.user || null;
          if (!prev && !next) return null;
          if (prev && next && prev.id === next.id && prev.email === next.email) {
            return prev;
          }
          return next;
        });
        setLoading(false);
      }
    );


    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [checkConfigAndInit]);

  const signIn = async (email, password) => {
    setAuthError(null);
    const supabase = getSupabase();
    if (!supabase) throw new Error('Supabase is not configured.');

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setAuthError(error.message);
      throw error;
    }

    setSession(data.session);
    setUser(data.user);
    return data;
  };

  const signUp = async (email, password, fullName = '') => {
    setAuthError(null);
    const supabase = getSupabase();
    if (!supabase) throw new Error('Supabase is not configured.');

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    if (error) {
      setAuthError(error.message);
      throw error;
    }

    // If email confirmation is disabled, session is present → auto-login.
    // If email confirmation is enabled, session is null → user must confirm first.
    if (data.session) {
      setSession(data.session);
      setUser(data.user);
    }

    return data;
  };

  const signOut = async () => {
    const supabase = getSupabase();
    if (supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setSession(null);
  };

  const resetPassword = async (email) => {
    setAuthError(null);
    const supabase = getSupabase();
    if (!supabase) throw new Error('Supabase is not configured.');

    // Build redirect URL respecting base path (GitHub Pages, Docusaurus, etc.)
    let redirectTo;
    if (typeof window !== 'undefined') {
      const base = window.location.origin + (window.location.pathname.split('/tracker')[0] || '');
      redirectTo = `${base}/tracker`;
    }

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });

    if (error) {
      setAuthError(error.message);
      throw error;
    }
    return data;
  };

  const configureCredentials = (url, anonKey) => {
    saveSupabaseCredentials(url, anonKey);
    checkConfigAndInit();
  };

  const resetConfiguration = () => {
    clearSupabaseCredentials();
    setIsConfigured(false);
    setUser(null);
    setSession(null);
  };

  const value = {
    user,
    session,
    loading,
    isConfigured,
    authError,
    setAuthError,
    signIn,
    signUp,
    signOut,
    resetPassword,
    configureCredentials,
    resetConfiguration,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

