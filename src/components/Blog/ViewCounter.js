import React, { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';
import { getSupabase } from '@site/src/components/Tracker/services/supabaseClient';
import styles from './ViewCounter.module.css';

export default function ViewCounter({ slug, increment = true }) {
  const [views, setViews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug || typeof window === 'undefined') return;

    let isMounted = true;
    const sessionKey = `viewed_${slug}`;
    const alreadyViewed = sessionStorage.getItem(sessionKey);

    async function handleViews() {
      const supabase = getSupabase();
      if (!supabase) {
        setLoading(false);
        return;
      }

      try {
        if (increment && !alreadyViewed) {
          const { data, error } = await supabase.rpc('increment_page_view', {
            page_slug: slug,
          });
          if (!error && data !== null) {
            sessionStorage.setItem(sessionKey, '1');
            if (isMounted) setViews(data);
          } else {
            // Fallback to read only if RPC fails or table exists without RPC
            fetchCurrentViews(supabase);
          }
        } else {
          fetchCurrentViews(supabase);
        }
      } catch (err) {
        console.warn('ViewCounter error:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    async function fetchCurrentViews(supabase) {
      try {
        const { data, error } = await supabase
          .from('page_views')
          .select('views')
          .eq('slug', slug)
          .single();

        if (!error && data && isMounted) {
          setViews(data.views);
        }
      } catch (e) {
        // ignore
      }
    }

    handleViews();

    return () => {
      isMounted = false;
    };
  }, [slug, increment]);

  if (loading) {
    return (
      <span className={styles.counterWrap}>
        <Eye size={13} className={styles.icon} />
        <span className={styles.skeleton}>...</span>
      </span>
    );
  }

  if (views === null) return null;

  return (
    <span className={styles.counterWrap} title={`${views.toLocaleString()} total page views`}>
      <Eye size={13} className={styles.icon} />
      <span>{views.toLocaleString()} views</span>
    </span>
  );
}
