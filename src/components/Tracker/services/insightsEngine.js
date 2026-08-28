/**
 * Rule-Based Productivity Insights Engine
 * Purely deterministic heuristics based on real user data — zero paid AI APIs.
 */

export function generateInsights({
  tasks = [],
  goals = [],
  habits = [],
  habitLogs = [],
  focusSessions = [],
}) {
  const insights = [];
  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;


  // Helper date boundaries
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

  // 1. Overdue Tasks Heuristic
  const overdueTasks = tasks.filter((t) => {
    if (t.status === 'completed') return false;
    if (!t.due_date) return false;
    return t.due_date < todayStr;
  });

  if (overdueTasks.length > 0) {
    insights.push({
      id: 'overdue_tasks',
      type: 'warning',
      title: `${overdueTasks.length} Overdue ${overdueTasks.length === 1 ? 'Task' : 'Tasks'}`,
      description: `You have ${overdueTasks.length} pending ${
        overdueTasks.length === 1 ? 'task' : 'tasks'
      } past their due date. Prioritize closing or rescheduling them today.`,
      icon: 'alert',
    });
  }

  // 2. Weekly Task Completion Rate Heuristic
  const tasksThisWeek = tasks.filter((t) => {
    const created = new Date(t.created_at || t.due_date || now);
    return created >= oneWeekAgo;
  });
  const completedThisWeek = tasksThisWeek.filter((t) => t.status === 'completed');

  if (tasksThisWeek.length >= 3) {
    const rate = Math.round((completedThisWeek.length / tasksThisWeek.length) * 100);
    if (rate >= 75) {
      insights.push({
        id: 'high_completion_rate',
        type: 'success',
        title: `High Execution Velocity (${rate}%)`,
        description: `You completed ${completedThisWeek.length} of ${tasksThisWeek.length} tasks scheduled in the last 7 days!`,
        icon: 'trophy',
      });
    } else if (rate < 50) {
      insights.push({
        id: 'low_completion_rate',
        type: 'info',
        title: `Pacing Check: ${rate}% Completed`,
        description: `You have completed ${completedThisWeek.length} of ${tasksThisWeek.length} recent tasks. Consider breaking larger tasks down into smaller steps.`,
        icon: 'trending',
      });
    }
  }

  // 3. Most Productive Day of Week Heuristic
  const completedTasks = tasks.filter((t) => t.status === 'completed' && t.completed_at);
  if (completedTasks.length >= 5) {
    const dayCounts = [0, 0, 0, 0, 0, 0, 0]; // Sun..Sat
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    completedTasks.forEach((t) => {
      const d = new Date(t.completed_at).getDay();
      dayCounts[d]++;
    });

    let maxDayIdx = 0;
    let maxCount = 0;
    dayCounts.forEach((c, idx) => {
      if (c > maxCount) {
        maxCount = c;
        maxDayIdx = idx;
      }
    });

    if (maxCount >= 2) {
      insights.push({
        id: 'peak_productive_day',
        type: 'positive',
        title: `${dayNames[maxDayIdx]} is Peak Execution Day`,
        description: `Historical data shows you finish the most tasks on ${dayNames[maxDayIdx]}s (${maxCount} completed).`,
        icon: 'sparkles',
      });
    }
  }

  // 4. Focus Session Trends Heuristic
  const focusThisWeekSecs = focusSessions
    .filter((s) => new Date(s.completed_at || s.created_at) >= oneWeekAgo)
    .reduce((acc, s) => acc + (Number(s.duration) || 0), 0);

  const focusLastWeekSecs = focusSessions
    .filter((s) => {
      const d = new Date(s.completed_at || s.created_at);
      return d >= twoWeeksAgo && d < oneWeekAgo;
    })
    .reduce((acc, s) => acc + (Number(s.duration) || 0), 0);

  const focusThisWeekHours = (focusThisWeekSecs / 3600).toFixed(1);

  if (focusThisWeekSecs > 0) {
    if (focusLastWeekSecs > 0 && focusThisWeekSecs > focusLastWeekSecs) {
      const increasePct = Math.round(
        ((focusThisWeekSecs - focusLastWeekSecs) / focusLastWeekSecs) * 100
      );
      insights.push({
        id: 'focus_time_growth',
        type: 'success',
        title: `Deep Work Up +${increasePct}%`,
        description: `You logged ${focusThisWeekHours} hours of focus time this week — up from last week!`,
        icon: 'timer',
      });
    } else if (Number(focusThisWeekHours) >= 5) {
      insights.push({
        id: 'solid_focus_time',
        type: 'positive',
        title: `Deep Work: ${focusThisWeekHours} hrs Logged`,
        description: `Strong deep work immersion logged this week across your prioritized tasks.`,
        icon: 'timer',
      });
    }
  }

  // 5. Habit Consistency & Streaks Heuristic
  const activeHabits = habits.filter((h) => !h.archived);
  if (activeHabits.length > 0) {
    // Check habits completed today
    const completedHabitsToday = habitLogs.filter((l) => l.completed_date === todayStr);
    const habitPct = Math.round((completedHabitsToday.length / activeHabits.length) * 100);

    if (habitPct === 100) {
      insights.push({
        id: 'all_habits_completed',
        type: 'success',
        title: `100% Daily Habits Cleared`,
        description: `All ${activeHabits.length} daily habits have been completed today. Outstanding discipline!`,
        icon: 'flame',
      });
    } else if (habitPct === 0 && now.getHours() >= 17) {
      insights.push({
        id: 'habits_pending_reminder',
        type: 'info',
        title: `Daily Habits Pending`,
        description: `You have ${activeHabits.length} habits awaiting completion today. Take a quick moment to log them.`,
        icon: 'habit',
      });
    }
  }

  // 6. Goal Progress Milestone Alert
  const nearCompletionGoals = goals.filter(
    (g) => g.status === 'active' && g.progress >= 70 && g.progress < 100
  );
  if (nearCompletionGoals.length > 0) {
    const topGoal = nearCompletionGoals[0];
    insights.push({
      id: `goal_closing_${topGoal.id}`,
      type: 'positive',
      title: `Closing In: ${topGoal.title}`,
      description: `This milestone is at ${topGoal.progress}% completion. The finish line is within reach!`,
      icon: 'flag',
    });
  }

  // Fallback if data is sparse
  if (insights.length === 0) {
    insights.push({
      id: 'insufficient_data',
      type: 'neutral',
      title: 'Building Baseline Data',
      description: 'Complete tasks, log focus sessions, and maintain daily habits to unlock personalized productivity heuristics.',
      icon: 'sparkles',
    });
  }

  return insights;
}

