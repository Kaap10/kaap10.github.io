import React, { useState, useEffect, useMemo } from 'react';
import styles from './styles.module.css';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function GithubActivity({ username = 'Kaap10' }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tooltip, setTooltip] = useState({ visible: false, text: '', x: 0, y: 0 });

  useEffect(() => {
    let isMounted = true;
    const cacheKey = `gh_activity_v1_${username}`;

    const loadData = async () => {
      // 1. Try local storage cache (valid for 1 hour)
      try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < 60 * 60 * 1000) {
            setData(parsed.data);
            setLoading(false);
            return;
          }
        }
      } catch {
        // localStorage not available or parse error
      }

      // 2. Fetch fresh data from public contributions API
      try {
        const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        
        if (isMounted && json && json.contributions) {
          setData(json);
          try {
            localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), data: json }));
          } catch {
            // ignore
          }
        }
      } catch (err) {
        console.error('Failed to load GitHub activity:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadData();
    return () => {
      isMounted = false;
    };
  }, [username]);

  // Organize days into weeks (columns)
  const { weeks, monthLabels, totalCount } = useMemo(() => {
    if (!data || !data.contributions || data.contributions.length === 0) {
      return { weeks: [], monthLabels: [], totalCount: 0 };
    }

    const contributions = data.contributions;
    const computedWeeks = [];
    let currentWeek = [];

    // First day's day-of-week (0 = Sun, 1 = Mon, ..., 6 = Sat)
    const firstDayDate = new Date(contributions[0].date);
    const startDayIndex = firstDayDate.getDay();

    // Fill leading empty days of first week if needed
    for (let i = 0; i < startDayIndex; i++) {
      currentWeek.push(null);
    }

    const months = [];
    let lastMonth = -1;

    contributions.forEach((item) => {
      const d = new Date(item.date);
      const m = d.getMonth();

      if (currentWeek.length === 7) {
        computedWeeks.push(currentWeek);
        currentWeek = [];
      }

      if (m !== lastMonth) {
        months.push({
          label: MONTH_NAMES[m],
          weekIndex: computedWeeks.length,
        });
        lastMonth = m;
      }

      currentWeek.push(item);
    });

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      computedWeeks.push(currentWeek);
    }

    const total = data.total?.lastYear ?? contributions.reduce((acc, c) => acc + (c.count || 0), 0);

    return { weeks: computedWeeks, monthLabels: months, totalCount: total };
  }, [data]);

  const handleMouseEnter = (e, item) => {
    if (!item) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const formattedDate = new Date(item.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    setTooltip({
      visible: true,
      text: `${item.count} contribution${item.count === 1 ? '' : 's'} on ${formattedDate}`,
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  };

  const handleMouseLeave = () => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>GitHub Activity</h2>
        <span className={styles.stats}>
          {totalCount.toLocaleString()} GitHub activities in the last year
        </span>
      </div>

      <div className={styles.calendarCard}>
        <div className={styles.scrollArea}>
          {loading ? (
            <div className={styles.skeletonGrid}>Fetching GitHub contribution data...</div>
          ) : (
            <div className={styles.gridWrapper}>
              {/* Month Labels */}
              <div className={styles.monthRow}>
                {monthLabels.map((m, idx) => (
                  <span
                    key={`${m.label}-${idx}`}
                    className={styles.monthLabel}
                    style={{ left: `${(m.weekIndex / Math.max(weeks.length, 1)) * 100}%` }}
                  >
                    {m.label}
                  </span>
                ))}
              </div>

              {/* Weeks Columns Grid */}
              <div className={styles.weeksGrid}>
                {weeks.map((week, wIdx) => (
                  <div key={wIdx} className={styles.weekColumn}>
                    {week.map((day, dIdx) => {
                      if (!day) {
                        return (
                          <div
                            key={dIdx}
                            className={`${styles.dayCell} ${styles.level0}`}
                            style={{ opacity: 0.15 }}
                          />
                        );
                      }
                      const levelClass = styles[`level${Math.min(Math.max(day.level || 0, 0), 4)}`];
                      return (
                        <div
                          key={day.date}
                          className={`${styles.dayCell} ${levelClass}`}
                          onMouseEnter={(e) => handleMouseEnter(e, day)}
                          onMouseLeave={handleMouseLeave}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className={styles.footer}>
          <span>Less active</span>
          <div className={styles.legend}>
            <div className={styles.legendScale}>
              <div className={`${styles.legendCell} ${styles.level0}`} />
              <div className={`${styles.legendCell} ${styles.level1}`} />
              <div className={`${styles.legendCell} ${styles.level2}`} />
              <div className={`${styles.legendCell} ${styles.level3}`} />
              <div className={`${styles.legendCell} ${styles.level4}`} />
            </div>
            <span>More active</span>
          </div>
        </div>
      </div>

      {/* Floating Tooltip */}
      {tooltip.visible && (
        <div
          className={styles.tooltip}
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
          }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
}

