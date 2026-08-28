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

    setIsConfigured(true);
    const supabase = getSupabase();
    if (!supabase) {
      setIsConfigured(false);
      setLoading(false);
      return;
    }

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

    // Subscribe to auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user || null);
        setLoading(false);
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    checkConfigAndInit();
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
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      setAuthError(error.message);
      throw error;
    }

    setSession(data.session);
    setUser(data.user);
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

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/tracker` : undefined,
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

