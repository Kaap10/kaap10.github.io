import { createClient } from '@supabase/supabase-js';

const CONFIG_STORAGE_KEY = 'kaap10_tracker_supabase_config';

const DEFAULT_SUPABASE_URL = 'https://coqywwpqisjdlsrgdaum.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable__nu57a-zuULjY3byY17iYQ_FISJxG2X';

/**
 * Safely gets an environment variable without throwing ReferenceError: process is not defined
 */
function getEnvVar(key) {
  try {
    if (typeof process !== 'undefined' && process && process.env) {
      return process.env[key] || '';
    }
  } catch (e) {
    // ignore
  }
  return '';
}

/**
 * Retrieves Supabase URL and Anon Key from environment variables,
 * local storage overrides, or project defaults.
 */
export function getSupabaseCredentials() {
  let url = getEnvVar('SUPABASE_URL') || getEnvVar('NEXT_PUBLIC_SUPABASE_URL') || '';
  let anonKey = getEnvVar('SUPABASE_ANON_KEY') || getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY') || '';

  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(CONFIG_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.url && parsed.anonKey) {
          url = parsed.url;
          anonKey = parsed.anonKey;
        }
      }
    } catch (e) {
      console.warn('Failed to parse local Supabase config:', e);
    }
  }

  if (!url || url.includes('coqvwwpqijsdlsrgdaum')) url = DEFAULT_SUPABASE_URL;
  if (!anonKey) anonKey = DEFAULT_SUPABASE_ANON_KEY;

  return { url: url.trim(), anonKey: anonKey.trim() };
}

export function saveSupabaseCredentials(url, anonKey) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(
      CONFIG_STORAGE_KEY,
      JSON.stringify({ url: url.trim(), anonKey: anonKey.trim() })
    );
    // Reset client instance so it re-initializes with new credentials
    supabaseInstance = null;
  } catch (e) {
    console.error('Failed to save Supabase config to local storage:', e);
  }
}

export function clearSupabaseCredentials() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(CONFIG_STORAGE_KEY);
    supabaseInstance = null;
  } catch (e) {
    console.error('Failed to clear Supabase config:', e);
  }
}

let supabaseInstance = null;

/**
 * Initializes and returns the Supabase client singleton
 */
export function getSupabase() {
  if (supabaseInstance) return supabaseInstance;

  const { url, anonKey } = getSupabaseCredentials();

  if (!url || !anonKey) {
    return null;
  }

  try {
    supabaseInstance = createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
    return supabaseInstance;
  } catch (err) {
    console.error('Failed to create Supabase client:', err);
    return null;
  }
}
