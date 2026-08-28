import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from './AuthContext';
import { getSupabase } from '../services/supabaseClient';
import { generateInsights } from '../services/insightsEngine';

const TrackerContext = createContext(null);

export function TrackerProvider({ children }) {
  const { user } = useAuth();

  // Core Data Collections
  const [tasks, setTasks] = useState([]);
  const [goals, setGoals] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [focusSessions, setFocusSessions] = useState([]);
  const [habits, setHabits] = useState([]);
  const [habitLogs, setHabitLogs] = useState([]);
  const [resources, setResources] = useState([]);
  const [weeklyReviews, setWeeklyReviews] = useState([]);
  const [monthlyReviews, setMonthlyReviews] = useState([]);

  // UI State
  const [activeTab, setActiveTabState] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sync tab with URL hash/query if in browser
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const tabParam = urlParams.get('tab');
      if (tabParam) {
        setActiveTabState(tabParam);
      }
    }
  }, []);

  const setActiveTab = useCallback((tab) => {
    setActiveTabState(tab);
    if (typeof window !== 'undefined') {
      try {
        const url = new URL(window.location.href);
        url.searchParams.set('tab', tab);
        window.history.replaceState({}, '', url.toString());
      } catch (e) {
        // ignore
      }
    }
  }, []);

  // Modal States
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [goalModalOpen, setGoalModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

  const [milestoneModalOpen, setMilestoneModalOpen] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState(null);
  const [selectedGoalForMilestone, setSelectedGoalForMilestone] = useState(null);

  const [habitModalOpen, setHabitModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);

  const [resourceModalOpen, setResourceModalOpen] = useState(false);
  const [editingResource, setEditingResource] = useState(null);

  const [notesModalOpen, setNotesModalOpen] = useState(false);
  const [activeResourceForNotes, setActiveResourceForNotes] = useState(null);

  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null,
  });

  const openConfirmModal = (title, message, onConfirm) => {
    setConfirmModal({ isOpen: true, title, message, onConfirm });
  };

  const closeConfirmModal = () => {
    setConfirmModal({ isOpen: false, title: '', message: '', onConfirm: null });
  };

  // Keyboard shortcut listener for Global Search (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // ============================================================================
  // Fetch All Tracker Data from Supabase
  // ============================================================================
  const fetchData = useCallback(async () => {
    if (!user) {
      setTasks([]);
      setGoals([]);
      setMilestones([]);
      setFocusSessions([]);
      setHabits([]);
      setHabitLogs([]);
      setResources([]);
      setWeeklyReviews([]);
      setMonthlyReviews([]);
      setLoading(false);
      return;
    }

    const supabase = getSupabase();
    if (!supabase) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const [
        tasksRes,
        goalsRes,
        milestonesRes,
        focusRes,
        habitsRes,
        habitLogsRes,
        resourcesRes,
        weeklyReviewsRes,
        monthlyReviewsRes,
      ] = await Promise.all([
        supabase.from('tasks').select('*').order('created_at', { ascending: false }),
        supabase.from('goals').select('*').order('created_at', { ascending: false }),
        supabase.from('milestones').select('*').order('order_index', { ascending: true }),
        supabase.from('focus_sessions').select('*').order('created_at', { ascending: false }),
        supabase.from('habits').select('*').order('created_at', { ascending: true }),
        supabase.from('habit_logs').select('*').order('completed_date', { ascending: false }),
        supabase.from('resources').select('*').order('created_at', { ascending: false }),
        supabase.from('weekly_reviews').select('*').order('week_start_date', { ascending: false }),
        supabase.from('monthly_reviews').select('*').order('month_start_date', { ascending: false }),
      ]);

      // Check table existence errors gracefully
      const missingTableErr = [
        tasksRes.error,
        goalsRes.error,
        milestonesRes.error,
        focusRes.error,
        habitsRes.error,
        habitLogsRes.error,
        resourcesRes.error,
      ].find((err) => err && (err.code === 'PGRST205' || err.message?.includes('Could not find the table') || err.message?.includes('permission denied')));

      if (missingTableErr) {
        setError(missingTableErr.message || 'Database permissions or tables need initialization in Supabase.');
      }

      setTasks(tasksRes.data || []);
      setGoals(goalsRes.data || []);
      setMilestones(milestonesRes.data || []);
      setFocusSessions(focusRes.data || []);
      setHabits(habitsRes.data || []);
      setHabitLogs(habitLogsRes.data || []);
      setResources(resourcesRes.data || []);
      setWeeklyReviews(weeklyReviewsRes.data || []);
      setMonthlyReviews(monthlyReviewsRes.data || []);
    } catch (err) {
      console.error('Error fetching tracker data:', err);
      setError(err.message || 'Failed to load tracker data');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ============================================================================
  // Task Operations (Advanced V2 with Recurrence & Milestones)
  // ============================================================================
  const createTask = async (taskData) => {
    const supabase = getSupabase();
    if (!supabase || !user) throw new Error('Not authenticated or Supabase not initialized.');

    const payload = {
      title: taskData.title?.trim(),
      description: taskData.description?.trim() || null,
      user_id: user.id,
      status: taskData.status || 'pending',
      priority: taskData.priority || 'medium',
      category: taskData.category || 'Development',
      due_date: taskData.due_date ? taskData.due_date : null,
      due_time: taskData.due_time?.trim() || null,
      estimated_duration: Number(taskData.estimated_duration) || null,
      recurrence: taskData.recurrence || 'none',
      goal_id: taskData.goal_id ? taskData.goal_id : null,
      milestone_id: taskData.milestone_id ? taskData.milestone_id : null,
      completed_at: taskData.status === 'completed' ? new Date().toISOString() : null,
    };

    const { data, error: err } = await supabase.from('tasks').insert([payload]).select().single();
    if (err) {
      console.error('Error inserting task:', err);
      throw err;
    }

    setTasks((prev) => [data, ...prev]);
    return data;
  };

  const updateTask = async (id, updates) => {
    const supabase = getSupabase();
    if (!supabase) throw new Error('Supabase not initialized.');

    const payload = { ...updates };
    if (payload.title) payload.title = payload.title.trim();
    if ('description' in payload) payload.description = payload.description?.trim() || null;
    if ('due_date' in payload) payload.due_date = payload.due_date ? payload.due_date : null;
    if ('due_time' in payload) payload.due_time = payload.due_time?.trim() || null;
    if ('estimated_duration' in payload) payload.estimated_duration = Number(payload.estimated_duration) || null;
    if ('goal_id' in payload) payload.goal_id = payload.goal_id ? payload.goal_id : null;
    if ('milestone_id' in payload) payload.milestone_id = payload.milestone_id ? payload.milestone_id : null;

    if (updates.status === 'completed' && !updates.completed_at) {
      payload.completed_at = new Date().toISOString();
    } else if (updates.status === 'pending' || updates.status === 'in_progress') {
      payload.completed_at = null;
    }

    const { data, error: err } = await supabase
      .from('tasks')
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (err) {
      console.error('Error updating task:', err);
      throw err;
    }

    setTasks((prev) => prev.map((t) => (t.id === id ? data : t)));
    return data;
  };

  const toggleTaskStatus = async (id) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    if (task.status !== 'completed' && task.recurrence && task.recurrence !== 'none') {
      // Recurring task completed: mark current completed and generate next cycle date
      const now = new Date();
      let nextDate = new Date();
      if (task.due_date) {
        nextDate = new Date(task.due_date);
      }
      if (task.recurrence === 'daily') {
        nextDate.setDate(nextDate.getDate() + 1);
      } else if (task.recurrence === 'weekly') {
        nextDate.setDate(nextDate.getDate() + 7);
      } else if (task.recurrence === 'monthly') {
        nextDate.setMonth(nextDate.getMonth() + 1);
      }

      const nextDateStr = nextDate.toISOString().split('T')[0];

      // Mark current occurrence as completed
      await updateTask(id, { status: 'completed' });

      // Create next occurrence
      await createTask({
        title: task.title,
        description: task.description,
        priority: task.priority,
        category: task.category,
        goal_id: task.goal_id,
        milestone_id: task.milestone_id,
        recurrence: task.recurrence,
        due_date: nextDateStr,
        due_time: task.due_time,
        estimated_duration: task.estimated_duration,
        status: 'pending',
      });
    } else {
      const newStatus = task.status === 'completed' ? 'pending' : 'completed';
      return updateTask(id, { status: newStatus });
    }
  };

  const deleteTask = async (id) => {
    const supabase = getSupabase();
    if (!supabase) return;

    const { error: err } = await supabase.from('tasks').delete().eq('id', id);
    if (err) throw err;

    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // ============================================================================
  // Goal Operations
  // ============================================================================
  const createGoal = async (goalData) => {
    const supabase = getSupabase();
    if (!supabase || !user) throw new Error('Not authenticated or Supabase not initialized.');

    const payload = {
      title: goalData.title?.trim(),
      description: goalData.description?.trim() || null,
      user_id: user.id,
      type: goalData.type || 'short_term',
      status: goalData.status || 'active',
      target_date: goalData.target_date ? goalData.target_date : null,
      progress: Math.min(100, Math.max(0, Number(goalData.progress) || 0)),
    };

    const { data, error: err } = await supabase.from('goals').insert([payload]).select().single();
    if (err) {
      console.error('Error creating goal:', err);
      throw err;
    }

    setGoals((prev) => [data, ...prev]);
    return data;
  };

  const updateGoal = async (id, updates) => {
    const supabase = getSupabase();
    if (!supabase) throw new Error('Supabase not initialized.');

    const payload = { ...updates };
    if (payload.title) payload.title = payload.title.trim();
    if ('description' in payload) payload.description = payload.description?.trim() || null;
    if ('target_date' in payload) payload.target_date = payload.target_date ? payload.target_date : null;
    if ('progress' in payload) payload.progress = Math.min(100, Math.max(0, Number(payload.progress) || 0));

    const { data, error: err } = await supabase
      .from('goals')
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (err) {
      console.error('Error updating goal:', err);
      throw err;
    }

    setGoals((prev) => prev.map((g) => (g.id === id ? data : g)));
    return data;
  };

  const deleteGoal = async (id) => {
    const supabase = getSupabase();
    if (!supabase) return;

    const { error: err } = await supabase.from('goals').delete().eq('id', id);
    if (err) throw err;

    setGoals((prev) => prev.filter((g) => g.id !== id));
    setMilestones((prev) => prev.filter((m) => m.goal_id !== id));
    setTasks((prev) => prev.map((t) => (t.goal_id === id ? { ...t, goal_id: null, milestone_id: null } : t)));
  };

  // ============================================================================
  // Milestone Operations
  // ============================================================================
  const createMilestone = async (milestoneData) => {
    const supabase = getSupabase();
    if (!supabase || !user) throw new Error('Not authenticated or Supabase not initialized.');

    const payload = {
      title: milestoneData.title?.trim(),
      description: milestoneData.description?.trim() || null,
      goal_id: milestoneData.goal_id,
      user_id: user.id,
      target_date: milestoneData.target_date ? milestoneData.target_date : null,
      status: milestoneData.status || 'active',
      order_index: Number(milestoneData.order_index) || 0,
    };

    const { data, error: err } = await supabase.from('milestones').insert([payload]).select().single();
    if (err) {
      console.error('Error creating milestone:', err);
      throw err;
    }

    setMilestones((prev) => [...prev, data]);
    return data;
  };

  const updateMilestone = async (id, updates) => {
    const supabase = getSupabase();
    if (!supabase) throw new Error('Supabase not initialized.');

    const payload = { ...updates };
    if (payload.title) payload.title = payload.title.trim();
    if ('description' in payload) payload.description = payload.description?.trim() || null;
    if ('target_date' in payload) payload.target_date = payload.target_date ? payload.target_date : null;

    const { data, error: err } = await supabase
      .from('milestones')
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (err) throw err;

    setMilestones((prev) => prev.map((m) => (m.id === id ? data : m)));
    return data;
  };

  const toggleMilestoneStatus = async (id) => {
    const m = milestones.find((item) => item.id === id);
    if (!m) return;
    const newStatus = m.status === 'completed' ? 'active' : 'completed';
    return updateMilestone(id, { status: newStatus });
  };

  const deleteMilestone = async (id) => {
    const supabase = getSupabase();
    if (!supabase) return;

    const { error: err } = await supabase.from('milestones').delete().eq('id', id);
    if (err) throw err;

    setMilestones((prev) => prev.filter((m) => m.id !== id));
    setTasks((prev) => prev.map((t) => (t.milestone_id === id ? { ...t, milestone_id: null } : t)));
  };

  // ============================================================================
  // Focus Session Operations
  // ============================================================================
  const saveFocusSession = async (sessionData) => {
    const supabase = getSupabase();
    if (!supabase || !user) throw new Error('Not authenticated or Supabase not initialized.');

    const payload = {
      user_id: user.id,
      task_id: sessionData.task_id || null,
      goal_id: sessionData.goal_id || null,
      duration: Math.max(0, Math.floor(Number(sessionData.duration) || 0)), // in seconds
      started_at: sessionData.started_at || new Date().toISOString(),
      completed_at: sessionData.completed_at || new Date().toISOString(),
      notes: sessionData.notes?.trim() || null,
    };

    const { data, error: err } = await supabase.from('focus_sessions').insert([payload]).select().single();
    if (err) {
      console.error('Error saving focus session:', err);
      throw err;
    }

    setFocusSessions((prev) => [data, ...prev]);
    return data;
  };

  const deleteFocusSession = async (id) => {
    const supabase = getSupabase();
    if (!supabase) return;

    const { error: err } = await supabase.from('focus_sessions').delete().eq('id', id);
    if (err) throw err;

    setFocusSessions((prev) => prev.filter((s) => s.id !== id));
  };

  // ============================================================================
  // Habit Operations
  // ============================================================================
  const createHabit = async (habitData) => {
    const supabase = getSupabase();
    if (!supabase || !user) throw new Error('Not authenticated or Supabase not initialized.');

    const payload = {
      user_id: user.id,
      name: habitData.name?.trim(),
      description: habitData.description?.trim() || null,
      frequency: habitData.frequency || 'daily',
      archived: !!habitData.archived,
    };

    const { data, error: err } = await supabase.from('habits').insert([payload]).select().single();
    if (err) {
      console.error('Error creating habit:', err);
      throw err;
    }

    setHabits((prev) => [...prev, data]);
    return data;
  };

  const updateHabit = async (id, updates) => {
    const supabase = getSupabase();
    if (!supabase) throw new Error('Supabase not initialized.');

    const payload = { ...updates };
    if (payload.name) payload.name = payload.name.trim();
    if ('description' in payload) payload.description = payload.description?.trim() || null;

    const { data, error: err } = await supabase.from('habits').update(payload).eq('id', id).select().single();
    if (err) throw err;

    setHabits((prev) => prev.map((h) => (h.id === id ? data : h)));
    return data;
  };

  const deleteHabit = async (id) => {
    const supabase = getSupabase();
    if (!supabase) return;

    const { error: err } = await supabase.from('habits').delete().eq('id', id);
    if (err) throw err;

    setHabits((prev) => prev.filter((h) => h.id !== id));
    setHabitLogs((prev) => prev.filter((l) => l.habit_id !== id));
  };

  const toggleHabitDate = async (habitId, dateStr) => {
    const supabase = getSupabase();
    if (!supabase || !user) return;

    const existingLog = habitLogs.find((l) => l.habit_id === habitId && l.completed_date === dateStr);

    if (existingLog) {
      // Remove log (undo completion)
      const { error: err } = await supabase.from('habit_logs').delete().eq('id', existingLog.id);
      if (err) throw err;
      setHabitLogs((prev) => prev.filter((l) => l.id !== existingLog.id));
    } else {
      // Add completion log
      const payload = {
        user_id: user.id,
        habit_id: habitId,
        completed_date: dateStr,
      };
      const { data, error: err } = await supabase.from('habit_logs').insert([payload]).select().single();
      if (err) throw err;
      setHabitLogs((prev) => [data, ...prev]);
    }
  };

  // ============================================================================
  // Resource Operations & Notes
  // ============================================================================
  const createResource = async (resourceData) => {
    const supabase = getSupabase();
    if (!supabase || !user) throw new Error('Not authenticated or Supabase not initialized.');

    const payload = {
      title: resourceData.title?.trim(),
      url: resourceData.url?.trim(),
      description: resourceData.description?.trim() || null,
      user_id: user.id,
      type: resourceData.type || 'Website',
      category: resourceData.category || 'Learning',
      status: resourceData.status || 'unread',
      notes: resourceData.notes?.trim() || null,
      favorite: !!resourceData.favorite,
    };

    const { data, error: err } = await supabase.from('resources').insert([payload]).select().single();
    if (err) {
      console.error('Error creating resource:', err);
      throw err;
    }

    setResources((prev) => [data, ...prev]);
    return data;
  };

  const updateResource = async (id, updates) => {
    const supabase = getSupabase();
    if (!supabase) throw new Error('Supabase not initialized.');

    const payload = { ...updates };
    if (payload.title) payload.title = payload.title.trim();
    if (payload.url) payload.url = payload.url.trim();
    if ('description' in payload) payload.description = payload.description?.trim() || null;
    if ('notes' in payload) payload.notes = payload.notes?.trim() || null;

    const { data, error: err } = await supabase
      .from('resources')
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (err) throw err;

    setResources((prev) => prev.map((r) => (r.id === id ? data : r)));
    return data;
  };

  const deleteResource = async (id) => {
    const supabase = getSupabase();
    if (!supabase) return;

    const { error: err } = await supabase.from('resources').delete().eq('id', id);
    if (err) throw err;

    setResources((prev) => prev.filter((r) => r.id !== id));
  };

  // ============================================================================
  // Review Operations (Weekly & Monthly)
  // ============================================================================
  const saveWeeklyReview = async (reviewData) => {
    const supabase = getSupabase();
    if (!supabase || !user) throw new Error('Not authenticated or Supabase not initialized.');

    const payload = {
      user_id: user.id,
      week_start_date: reviewData.week_start_date,
      tasks_planned: Number(reviewData.tasks_planned) || 0,
      tasks_completed: Number(reviewData.tasks_completed) || 0,
      focus_minutes: Number(reviewData.focus_minutes) || 0,
      what_went_well: reviewData.what_went_well?.trim() || null,
      what_did_not_go_well: reviewData.what_did_not_go_well?.trim() || null,
      biggest_achievement: reviewData.biggest_achievement?.trim() || null,
      what_to_improve: reviewData.what_to_improve?.trim() || null,
      top_priorities: reviewData.top_priorities?.trim() || null,
      updated_at: new Date().toISOString(),
    };

    const existing = weeklyReviews.find((r) => r.week_start_date === reviewData.week_start_date);
    let resultData;

    if (existing) {
      const { data, error: err } = await supabase
        .from('weekly_reviews')
        .update(payload)
        .eq('id', existing.id)
        .select()
        .single();
      if (err) throw err;
      resultData = data;
      setWeeklyReviews((prev) => prev.map((r) => (r.id === existing.id ? data : r)));
    } else {
      const { data, error: err } = await supabase
        .from('weekly_reviews')
        .insert([payload])
        .select()
        .single();
      if (err) throw err;
      resultData = data;
      setWeeklyReviews((prev) => [data, ...prev]);
    }

    return resultData;
  };

  const saveMonthlyReview = async (reviewData) => {
    const supabase = getSupabase();
    if (!supabase || !user) throw new Error('Not authenticated or Supabase not initialized.');

    const payload = {
      user_id: user.id,
      month_start_date: reviewData.month_start_date,
      tasks_completed: Number(reviewData.tasks_completed) || 0,
      completion_rate: Number(reviewData.completion_rate) || 0,
      focus_hours: Number(reviewData.focus_hours) || 0,
      goals_completed: Number(reviewData.goals_completed) || 0,
      habit_consistency: Number(reviewData.habit_consistency) || 0,
      biggest_achievement: reviewData.biggest_achievement?.trim() || null,
      biggest_challenge: reviewData.biggest_challenge?.trim() || null,
      what_improved: reviewData.what_improved?.trim() || null,
      what_needs_improvement: reviewData.what_needs_improvement?.trim() || null,
      next_month_priorities: reviewData.next_month_priorities?.trim() || null,
      updated_at: new Date().toISOString(),
    };

    const existing = monthlyReviews.find((r) => r.month_start_date === reviewData.month_start_date);
    let resultData;

    if (existing) {
      const { data, error: err } = await supabase
        .from('monthly_reviews')
        .update(payload)
        .eq('id', existing.id)
        .select()
        .single();
      if (err) throw err;
      resultData = data;
      setMonthlyReviews((prev) => prev.map((r) => (r.id === existing.id ? data : r)));
    } else {
      const { data, error: err } = await supabase
        .from('monthly_reviews')
        .insert([payload])
        .select()
        .single();
      if (err) throw err;
      resultData = data;
      setMonthlyReviews((prev) => [data, ...prev]);
    }

    return resultData;
  };

  // ============================================================================
  // Derived Analytics & Productivity Statistics (Real Database Data)
  // ============================================================================
  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);

  const todayTasks = useMemo(
    () => tasks.filter((t) => t.due_date === todayStr),
    [tasks, todayStr]
  );

  const overdueTasks = useMemo(
    () => tasks.filter((t) => t.status !== 'completed' && t.due_date && t.due_date < todayStr),
    [tasks, todayStr]
  );

  const upcomingTasks = useMemo(
    () => tasks.filter((t) => t.status !== 'completed' && t.due_date && t.due_date > todayStr),
    [tasks, todayStr]
  );

  // Habit Streaks Computation
  const habitStreaks = useMemo(() => {
    const stats = {};
    const today = new Date();

    habits.forEach((habit) => {
      const logs = habitLogs
        .filter((l) => l.habit_id === habit.id)
        .map((l) => l.completed_date)
        .sort();

      const logSet = new Set(logs);

      // Current streak calculation
      let currentStreak = 0;
      let checkDate = new Date(today);
      const checkDateStr = checkDate.toISOString().split('T')[0];

      // If not completed today, start checking from yesterday
      if (!logSet.has(checkDateStr)) {
        checkDate.setDate(checkDate.getDate() - 1);
      }

      while (true) {
        const dStr = checkDate.toISOString().split('T')[0];
        if (logSet.has(dStr)) {
          currentStreak++;
          checkDate.setDate(checkDate.getDate() - 1);
        } else {
          break;
        }
      }

      // Longest streak calculation
      let longestStreak = 0;
      let tempStreak = 0;
      let prevDate = null;

      logs.forEach((dStr) => {
        const d = new Date(dStr);
        if (!prevDate) {
          tempStreak = 1;
        } else {
          const diffDays = Math.round((d.getTime() - prevDate.getTime()) / (1000 * 3600 * 24));
          if (diffDays === 1) {
            tempStreak++;
          } else if (diffDays > 1) {
            tempStreak = 1;
          }
        }
        if (tempStreak > longestStreak) longestStreak = tempStreak;
        prevDate = d;
      });

      // 30-day completion rate
      let last30DaysCompleted = 0;
      for (let i = 0; i < 30; i++) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        if (logSet.has(d.toISOString().split('T')[0])) {
          last30DaysCompleted++;
        }
      }
      const completionRate = Math.round((last30DaysCompleted / 30) * 100);

      stats[habit.id] = {
        currentStreak,
        longestStreak: Math.max(longestStreak, currentStreak),
        completionRate,
        totalCompletions: logs.length,
      };
    });

    return stats;
  }, [habits, habitLogs]);

  // Focus Statistics (Today, Week, Month, All-Time)
  const focusStats = useMemo(() => {
    const now = new Date();
    const startOfWeek = new Date(now);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);
    startOfWeek.setHours(0, 0, 0, 0);

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    let todaySecs = 0;
    let weekSecs = 0;
    let monthSecs = 0;
    let totalSecs = 0;

    focusSessions.forEach((s) => {
      const duration = Number(s.duration) || 0;
      const sDate = new Date(s.completed_at || s.created_at);

      totalSecs += duration;
      if (sDate.toISOString().split('T')[0] === todayStr) todaySecs += duration;
      if (sDate >= startOfWeek) weekSecs += duration;
      if (sDate >= startOfMonth) monthSecs += duration;
    });

    return {
      todaySeconds: todaySecs,
      todayMinutes: Math.round(todaySecs / 60),
      todayHours: (todaySecs / 3600).toFixed(1),
      weekMinutes: Math.round(weekSecs / 60),
      weekHours: (weekSecs / 3600).toFixed(1),
      monthHours: (monthSecs / 3600).toFixed(1),
      totalHours: (totalSecs / 3600).toFixed(1),
      totalSessions: focusSessions.length,
    };
  }, [focusSessions, todayStr]);

  // 52-Week Multi-Metric Activity Heatmap Data
  const activityMap = useMemo(() => {
    const map = {};
    const now = new Date();

    // Initialize past 365 days
    for (let i = 364; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      map[key] = {
        date: key,
        tasksCompleted: 0,
        focusSeconds: 0,
        habitsCompleted: 0,
        totalScore: 0,
      };
    }

    // 1. Task completions
    tasks.forEach((t) => {
      if (t.status === 'completed' && t.completed_at) {
        const key = t.completed_at.split('T')[0];
        if (map[key]) {
          map[key].tasksCompleted += 1;
          map[key].totalScore += 2;
        }
      }
    });

    // 2. Focus sessions
    focusSessions.forEach((s) => {
      const key = (s.completed_at || s.created_at).split('T')[0];
      if (map[key]) {
        map[key].focusSeconds += Number(s.duration) || 0;
        map[key].totalScore += Math.min(4, Math.floor((Number(s.duration) || 0) / 1800)); // +1 score per 30m
      }
    });

    // 3. Habits
    habitLogs.forEach((l) => {
      const key = l.completed_date;
      if (map[key]) {
        map[key].habitsCompleted += 1;
        map[key].totalScore += 1;
      }
    });

    return map;
  }, [tasks, focusSessions, habitLogs]);

  // Lifetime Personal Statistics
  const lifetimeStats = useMemo(() => {
    const completedTasks = tasks.filter((t) => t.status === 'completed');
    const completedGoals = goals.filter((g) => g.status === 'completed' || g.progress >= 100);
    const completedMilestones = milestones.filter((m) => m.status === 'completed');
    const completedResources = resources.filter((r) => r.status === 'completed');

    // Peak day of week
    const dayCounts = [0, 0, 0, 0, 0, 0, 0];
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    completedTasks.forEach((t) => {
      if (t.completed_at) {
        dayCounts[new Date(t.completed_at).getDay()]++;
      }
    });
    let peakDayIdx = 0;
    dayCounts.forEach((c, idx) => {
      if (c > dayCounts[peakDayIdx]) peakDayIdx = idx;
    });

    // Best streaks
    let bestHabitStreak = 0;
    Object.values(habitStreaks).forEach((s) => {
      if (s.longestStreak > bestHabitStreak) bestHabitStreak = s.longestStreak;
    });

    return {
      totalTasks: tasks.length,
      completedTasks: completedTasks.length,
      completionRate: tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0,
      totalFocusHours: focusStats.totalHours,
      totalFocusSessions: focusStats.totalSessions,
      completedGoals: completedGoals.length,
      totalGoals: goals.length,
      completedMilestones: completedMilestones.length,
      totalMilestones: milestones.length,
      completedResources: completedResources.length,
      totalResources: resources.length,
      peakDay: completedTasks.length > 0 ? dayNames[peakDayIdx] : 'N/A',
      bestStreak: bestHabitStreak,
    };
  }, [tasks, goals, milestones, resources, focusStats, habitStreaks]);

  // Rule-Based Productivity Insights
  const insights = useMemo(() => {
    return generateInsights({
      tasks,
      goals,
      habits,
      habitLogs,
      focusSessions,
    });
  }, [tasks, goals, habits, habitLogs, focusSessions]);

  return (
    <TrackerContext.Provider
      value={{
        // Data Collections
        tasks,
        goals,
        milestones,
        focusSessions,
        habits,
        habitLogs,
        resources,
        weeklyReviews,
        monthlyReviews,

        // State & Loading
        activeTab,
        setActiveTab,
        loading,
        error,
        refreshData: fetchData,

        // Modals
        taskModalOpen,
        setTaskModalOpen,
        editingTask,
        setEditingTask,

        goalModalOpen,
        setGoalModalOpen,
        editingGoal,
        setEditingGoal,

        milestoneModalOpen,
        setMilestoneModalOpen,
        editingMilestone,
        setEditingMilestone,
        selectedGoalForMilestone,
        setSelectedGoalForMilestone,

        habitModalOpen,
        setHabitModalOpen,
        editingHabit,
        setEditingHabit,

        resourceModalOpen,
        setResourceModalOpen,
        editingResource,
        setEditingResource,

        notesModalOpen,
        setNotesModalOpen,
        activeResourceForNotes,
        setActiveResourceForNotes,

        searchModalOpen,
        setSearchModalOpen,

        confirmModal,
        openConfirmModal,
        closeConfirmModal,

        // Operations
        createTask,
        updateTask,
        toggleTaskStatus,
        deleteTask,

        createGoal,
        updateGoal,
        deleteGoal,

        createMilestone,
        updateMilestone,
        toggleMilestoneStatus,
        deleteMilestone,

        saveFocusSession,
        deleteFocusSession,

        createHabit,
        updateHabit,
        deleteHabit,
        toggleHabitDate,

        createResource,
        updateResource,
        deleteResource,

        saveWeeklyReview,
        saveMonthlyReview,

        // Computed Analytics & Insights
        todayTasks,
        overdueTasks,
        upcomingTasks,
        habitStreaks,
        focusStats,
        activityMap,
        lifetimeStats,
        insights,
      }}
    >
      {children}
    </TrackerContext.Provider>
  );
}

export function useTracker() {
  const context = useContext(TrackerContext);
  if (!context) {
    throw new Error('useTracker must be used within a TrackerProvider');
  }
  return context;
}
