import React, { useState, useEffect, useMemo } from 'react';
import { useTracker } from '../../context/TrackerContext';
import {
  IconReview,
  IconCheck,
  IconAlertCircle,
  IconChevronLeft,
  IconChevronRight,
  IconTasks,
  IconFocus,
} from '../Common/Icons';
import styles from '../../styles/tracker.module.css';

export default function ReviewsView() {
  const {
    tasks,
    focusSessions,
    goals,
    weeklyReviews,
    monthlyReviews,
    saveWeeklyReview,
    saveMonthlyReview,
  } = useTracker();

  const [reviewType, setReviewType] = useState('weekly'); // 'weekly' | 'monthly'
  const [currentDate, setCurrentDate] = useState(new Date());

  // Weekly review state
  const [whatWentWell, setWhatWentWell] = useState('');
  const [whatDidNotGoWell, setWhatDidNotGoWell] = useState('');
  const [biggestAchievement, setBiggestAchievement] = useState('');
  const [whatToImprove, setWhatToImprove] = useState('');
  const [topPriorities, setTopPriorities] = useState('');

  // Monthly review state
  const [biggestChallenge, setBiggestChallenge] = useState('');
  const [whatImproved, setWhatImproved] = useState('');
  const [whatNeedsImprovement, setWhatNeedsImprovement] = useState('');
  const [nextMonthPriorities, setNextMonthPriorities] = useState('');

  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Local date helper — avoids off-by-one in timezones ahead of UTC (e.g. IST UTC+5:30)
  const toLocalDateStr = (d) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  // Calculate Monday of the current week
  const weekStartDateStr = useMemo(() => {
    const d = new Date(currentDate);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    d.setDate(diff);
    return toLocalDateStr(d);
  }, [currentDate]);

  // Calculate first day of current month
  const monthStartDateStr = useMemo(() => {
    const d = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    return toLocalDateStr(d);
  }, [currentDate]);


  // Auto-calculated Quantitative Metrics for Week
  const weekMetrics = useMemo(() => {
    const start = new Date(weekStartDateStr + 'T00:00:00');
    const end = new Date(start);
    end.setDate(end.getDate() + 7);

    const weekTasks = tasks.filter((t) => {
      const d = new Date(t.due_date || t.created_at || 0);
      return d >= start && d < end;
    });

    const completed = weekTasks.filter((t) => t.status === 'completed').length;

    const weekFocusSecs = focusSessions
      .filter((s) => {
        const d = new Date(s.completed_at || s.created_at);
        return d >= start && d < end;
      })
      .reduce((acc, s) => acc + (Number(s.duration) || 0), 0);

    return {
      planned: weekTasks.length,
      completed,
      focusMins: Math.round(weekFocusSecs / 60),
    };
  }, [tasks, focusSessions, weekStartDateStr]);

  // Auto-calculated Quantitative Metrics for Month
  const monthMetrics = useMemo(() => {
    const start = new Date(monthStartDateStr + 'T00:00:00');
    const end = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);

    const monthTasks = tasks.filter((t) => {
      const d = new Date(t.due_date || t.created_at || 0);
      return d >= start && d < end;
    });

    const completedTasks = monthTasks.filter((t) => t.status === 'completed').length;
    const rate = monthTasks.length > 0 ? Math.round((completedTasks / monthTasks.length) * 100) : 0;

    const monthFocusSecs = focusSessions
      .filter((s) => {
        const d = new Date(s.completed_at || s.created_at);
        return d >= start && d < end;
      })
      .reduce((acc, s) => acc + (Number(s.duration) || 0), 0);

    const completedGoals = goals.filter((g) => g.status === 'completed').length;

    return {
      completedTasks,
      rate,
      focusHours: (monthFocusSecs / 3600).toFixed(1),
      completedGoals,
    };
  }, [tasks, focusSessions, goals, monthStartDateStr, currentDate]);

  // Populate fields when changing week/month or loading from state
  useEffect(() => {
    setErrorMsg('');
    setSaveSuccess(false);

    if (reviewType === 'weekly') {
      const existing = weeklyReviews.find((r) => r.week_start_date === weekStartDateStr);
      if (existing) {
        setWhatWentWell(existing.what_went_well || '');
        setWhatDidNotGoWell(existing.what_did_not_go_well || '');
        setBiggestAchievement(existing.biggest_achievement || '');
        setWhatToImprove(existing.what_to_improve || '');
        setTopPriorities(existing.top_priorities || '');
      } else {
        setWhatWentWell('');
        setWhatDidNotGoWell('');
        setBiggestAchievement('');
        setWhatToImprove('');
        setTopPriorities('');
      }
    } else {
      const existing = monthlyReviews.find((r) => r.month_start_date === monthStartDateStr);
      if (existing) {
        setBiggestAchievement(existing.biggest_achievement || '');
        setBiggestChallenge(existing.biggest_challenge || '');
        setWhatImproved(existing.what_improved || '');
        setWhatNeedsImprovement(existing.what_needs_improvement || '');
        setNextMonthPriorities(existing.next_month_priorities || '');
      } else {
        setBiggestAchievement('');
        setBiggestChallenge('');
        setWhatImproved('');
        setWhatNeedsImprovement('');
        setNextMonthPriorities('');
      }
    }
  }, [reviewType, weekStartDateStr, monthStartDateStr, weeklyReviews, monthlyReviews]);

  const handlePrev = () => {
    const d = new Date(currentDate);
    if (reviewType === 'weekly') {
      d.setDate(d.getDate() - 7);
    } else {
      d.setMonth(d.getMonth() - 1);
    }
    setCurrentDate(d);
  };

  const handleNext = () => {
    const d = new Date(currentDate);
    if (reviewType === 'weekly') {
      d.setDate(d.getDate() + 7);
    } else {
      d.setMonth(d.getMonth() + 1);
    }
    setCurrentDate(d);
  };

  const handleSave = async () => {
    setSaving(true);
    setErrorMsg('');
    setSaveSuccess(false);

    try {
      if (reviewType === 'weekly') {
        await saveWeeklyReview({
          week_start_date: weekStartDateStr,
          tasks_planned: weekMetrics.planned,
          tasks_completed: weekMetrics.completed,
          focus_minutes: weekMetrics.focusMins,
          what_went_well: whatWentWell,
          what_did_not_go_well: whatDidNotGoWell,
          biggest_achievement: biggestAchievement,
          what_to_improve: whatToImprove,
          top_priorities: topPriorities,
        });
      } else {
        await saveMonthlyReview({
          month_start_date: monthStartDateStr,
          tasks_completed: monthMetrics.completedTasks,
          completion_rate: monthMetrics.rate,
          focus_hours: Number(monthMetrics.focusHours),
          goals_completed: monthMetrics.completedGoals,
          biggest_achievement: biggestAchievement,
          biggest_challenge: biggestChallenge,
          what_improved: whatImproved,
          what_needs_improvement: whatNeedsImprovement,
          next_month_priorities: nextMonthPriorities,
        });
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving review:', err);
      setErrorMsg(err.message || 'Failed to save review reflection.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.viewContainer}>
      {/* Header */}
      <div className={styles.viewHeader}>
        <div>
          <h1 className={styles.viewTitle}>Cadence Reviews & Retrospectives</h1>
          <p className={styles.viewSubtitle}>
            Conduct structured weekly & monthly reviews to compound engineering progress.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            type="button"
            className={`${styles.filterTab} ${reviewType === 'weekly' ? styles.filterTabActive : ''}`}
            onClick={() => setReviewType('weekly')}
          >
            Weekly Review
          </button>
          <button
            type="button"
            className={`${styles.filterTab} ${reviewType === 'monthly' ? styles.filterTabActive : ''}`}
            onClick={() => setReviewType('monthly')}
          >
            Monthly Review
          </button>
        </div>
      </div>

      {/* Date Period Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', background: 'var(--vg-surface)', borderRadius: 'var(--vg-radius-sm)', border: '1px solid var(--vg-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button type="button" className={styles.iconBtn} onClick={handlePrev}>
            <IconChevronLeft size={16} />
          </button>
          <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--vg-text)' }}>
            {reviewType === 'weekly'
              ? `Week of ${weekStartDateStr}`
              : currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
          </span>
          <button type="button" className={styles.iconBtn} onClick={handleNext}>
            <IconChevronRight size={16} />
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', fontSize: '0.82rem', color: 'var(--vg-text-muted)' }}>
          {reviewType === 'weekly' ? (
            <>
              <span>Tasks: <strong style={{ color: 'var(--vg-text)' }}>{weekMetrics.completed}/{weekMetrics.planned}</strong></span>
              <span>Focus: <strong style={{ color: 'var(--vg-accent)' }}>{weekMetrics.focusMins}m</strong></span>
            </>
          ) : (
            <>
              <span>Velocity: <strong style={{ color: 'var(--vg-text)' }}>{monthMetrics.completedTasks} tasks ({monthMetrics.rate}%)</strong></span>
              <span>Focus: <strong style={{ color: 'var(--vg-accent)' }}>{monthMetrics.focusHours}h</strong></span>
            </>
          )}
        </div>
      </div>

      {errorMsg && (
        <div
          style={{
            background: 'rgba(255, 77, 79, 0.12)',
            border: '1px solid var(--vg-accent-border)',
            borderRadius: 'var(--vg-radius-sm)',
            padding: '0.75rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.84rem',
            color: 'var(--vg-accent)',
          }}
        >
          <IconAlertCircle size={16} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Review Form Card */}
      <div className={styles.card}>
        {reviewType === 'weekly' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Biggest Achievement of the Week</label>
              <input
                type="text"
                placeholder="What was the standout victory or milestone accomplished?"
                value={biggestAchievement}
                onChange={(e) => setBiggestAchievement(e.target.value)}
                className={styles.input}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>What Went Well</label>
                <textarea
                  placeholder="Key accomplishments, focused deep work, smooth execution..."
                  value={whatWentWell}
                  onChange={(e) => setWhatWentWell(e.target.value)}
                  className={styles.textarea}
                  rows={4}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>What Did Not Go Well</label>
                <textarea
                  placeholder="Blockers, distractions, missed estimates, energy dips..."
                  value={whatDidNotGoWell}
                  onChange={(e) => setWhatDidNotGoWell(e.target.value)}
                  className={styles.textarea}
                  rows={4}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Concrete Adjustments to Improve Next Week</label>
                <textarea
                  placeholder="System tweaks, schedule protection, earlier starts..."
                  value={whatToImprove}
                  onChange={(e) => setWhatToImprove(e.target.value)}
                  className={styles.textarea}
                  rows={3}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Top 3 Priorities for Next Week</label>
                <textarea
                  placeholder="1. Ship feature X&#10;2. Finish chapter Y&#10;3. Solve 10 DSA questions"
                  value={topPriorities}
                  onChange={(e) => setTopPriorities(e.target.value)}
                  className={styles.textarea}
                  rows={3}
                />
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Biggest Monthly Achievement</label>
              <input
                type="text"
                placeholder="Major project completion, roadmap clearance, skill unlocked..."
                value={biggestAchievement}
                onChange={(e) => setBiggestAchievement(e.target.value)}
                className={styles.input}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>What Improved This Month</label>
                <textarea
                  placeholder="Skills sharpened, systems built, habits solidified..."
                  value={whatImproved}
                  onChange={(e) => setWhatImproved(e.target.value)}
                  className={styles.textarea}
                  rows={4}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Biggest Challenge & Friction Point</label>
                <textarea
                  placeholder="Where did momentum slow down? What caused friction?..."
                  value={biggestChallenge}
                  onChange={(e) => setBiggestChallenge(e.target.value)}
                  className={styles.textarea}
                  rows={4}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Next Month's Core Engineering Priorities</label>
              <textarea
                placeholder="Key goals, milestone deliverables, and focus areas for next month..."
                value={nextMonthPriorities}
                onChange={(e) => setNextMonthPriorities(e.target.value)}
                className={styles.textarea}
                rows={3}
              />
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--vg-border)' }}>
          <div>
            {saveSuccess && (
              <span style={{ fontSize: '0.85rem', color: '#52c41a', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <IconCheck size={16} /> Review reflection saved successfully to cloud!
              </span>
            )}
          </div>

          <button
            type="button"
            className={styles.btnPrimary}
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 'Saving Reflection...' : 'Save Review'}
          </button>
        </div>
      </div>
    </div>
  );
}

