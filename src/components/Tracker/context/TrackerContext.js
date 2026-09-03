import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useAuth } from './AuthContext';
import { getSupabase } from '../services/supabaseClient';
import { generateInsights } from '../services/insightsEngine';


const TrackerContext = createContext(null);

export const formatLocalDate = (d) => {
  const date = d instanceof Date ? d : new Date(d);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

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
  const [activityLogs, setActivityLogs] = useState([]);

  // Notebook & Notes Collections
  const [notebooks, setNotebooks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [activeNotebookId, setActiveNotebookId] = useState(null);
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [notebookModalOpen, setNotebookModalOpen] = useState(false);
  const [editingNotebook, setEditingNotebook] = useState(null);

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

  // Listen for custom tab switch events (e.g. from GlobalTimerWidget in Root.js)
  useEffect(() => {
    const handleSetTab = (e) => {
      if (e.detail) {
        setActiveTab(e.detail);
      }
    };
    window.addEventListener('tracker:setTab', handleSetTab);
    return () => window.removeEventListener('tracker:setTab', handleSetTab);
  }, [setActiveTab]);

  // Modal States
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [goalModalOpen, setGoalModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

  const [milestoneModalOpen, setMilestoneModalOpen] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState(null);
  const [selectedGoalForMilestone, setSelectedGoalForMilestone] = useState(null);
  const [parentMilestoneId, setParentMilestoneId] = useState(null);

  const [habitModalOpen, setHabitModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);

  const [resourceModalOpen, setResourceModalOpen] = useState(false);
  const [editingResource, setEditingResource] = useState(null);

  const [notesModalOpen, setNotesModalOpen] = useState(false);
  const [activeResourceForNotes, setActiveResourceForNotes] = useState(null);

  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Floating Timer Widget
  const [floatWidgetOpen, setFloatWidgetOpen] = useState(false);
  const [focusTimerSnapshot, setFocusTimerSnapshot] = useState({
    isActive: false,
    mode: 'countdown',
    secondsRemaining: 25 * 60,
    elapsedSeconds: 0,
    selectedPreset: 25 * 60,
    presetLabel: '25m Pomodoro',
  });

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

  // Track active user ID to only wipe state on actual account switch
  const activeUserId = user?.id || null;
  const prevUserIdRef = useRef(activeUserId);

  // ============================================================================
  // Fetch All Tracker Data from Supabase (Strictly Scoped by User ID)
  // ============================================================================
  const fetchData = useCallback(async (isSilent = false) => {
    if (!user || !user.id) {
      setTasks([]);
      setGoals([]);
      setMilestones([]);
      setFocusSessions([]);
      setHabits([]);
      setHabitLogs([]);
      setResources([]);
      setWeeklyReviews([]);
      setMonthlyReviews([]);
      setActivityLogs([]);
      setLoading(false);
      return;
    }

    const supabase = getSupabase();
    if (!supabase) {
      setLoading(false);
      return;
    }

    if (!isSilent) {
      setLoading(true);
    }
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
        notebooksRes,
        notesRes,
      ] = await Promise.all([
        supabase.from('tasks').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('goals').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('milestones').select('*').eq('user_id', user.id).order('order_index', { ascending: true }),
        supabase.from('focus_sessions').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('habits').select('*').eq('user_id', user.id).order('created_at', { ascending: true }),
        supabase.from('habit_logs').select('*').eq('user_id', user.id).order('completed_date', { ascending: false }),
        supabase.from('resources').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('weekly_reviews').select('*').eq('user_id', user.id).order('week_start_date', { ascending: false }),
        supabase.from('monthly_reviews').select('*').eq('user_id', user.id).order('month_start_date', { ascending: false }),
        supabase.from('notebooks').select('*').eq('user_id', user.id).order('order_index', { ascending: true }),
        supabase.from('notes').select('*').eq('user_id', user.id).order('updated_at', { ascending: false }),
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

      // Notebooks & Notes with local storage sync/fallback
      let fetchedNotebooks = notebooksRes.data || [];
      let fetchedNotes = notesRes.data || [];

      if (fetchedNotebooks.length === 0 && typeof localStorage !== 'undefined') {
        try {
          const savedLocalNbs = localStorage.getItem(`kaap10_tracker_notebooks_${user.id}`) || localStorage.getItem('kaap10_tracker_notebooks');
          if (savedLocalNbs) fetchedNotebooks = JSON.parse(savedLocalNbs);
        } catch (e) {}
      }

      if (fetchedNotes.length === 0 && typeof localStorage !== 'undefined') {
        try {
          const savedLocalNotes = localStorage.getItem(`kaap10_tracker_notes_${user.id}`) || localStorage.getItem('kaap10_tracker_notes');
          if (savedLocalNotes) fetchedNotes = JSON.parse(savedLocalNotes);
        } catch (e) {}
      }

      // Default Notebook initialization if user has zero notebooks
      if (fetchedNotebooks.length === 0) {
        const defaultNb = {
          id: 'nb-default-' + (user.id ? user.id.slice(0, 8) : 'guest'),
          user_id: user.id,
          title: 'General Notes',
          description: 'Daily thoughts, ideas, and scratchpads',
          icon: 'book',
          color: '#FF4D4F',
          order_index: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        fetchedNotebooks = [defaultNb];
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`kaap10_tracker_notebooks_${user.id}`, JSON.stringify([defaultNb]));
        }
      }

      setNotebooks(fetchedNotebooks);
      setNotes(fetchedNotes);

      // Default active selections
      if (fetchedNotebooks.length > 0 && !activeNotebookId) {
        setActiveNotebookId(fetchedNotebooks[0].id);
      }

      // Fetch activity logs
      let fetchedLogs = [];
      try {
        const logsRes = await supabase.from('activity_logs').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
        if (logsRes.data) fetchedLogs = logsRes.data;
      } catch (e) {}

      if (fetchedLogs.length === 0 && typeof localStorage !== 'undefined') {
        try {
          const savedLocal = localStorage.getItem('kaap10_activity_logs');
          if (savedLocal) fetchedLogs = JSON.parse(savedLocal);
        } catch (e) {}
      }
      setActivityLogs(fetchedLogs);
    } catch (err) {
      console.error('Error fetching tracker data:', err);
      setError(err.message || 'Failed to load tracker data');
    } finally {
      setLoading(false);
    }
  }, [user?.id, activeNotebookId]);

  useEffect(() => {
    // Only wipe data if the user account actually changed (login/logout/switch account)
    if (prevUserIdRef.current !== activeUserId) {
      prevUserIdRef.current = activeUserId;
      setTasks([]);
      setGoals([]);
      setMilestones([]);
      setFocusSessions([]);
      setHabits([]);
      setHabitLogs([]);
      setResources([]);
      setWeeklyReviews([]);
      setMonthlyReviews([]);
      setNotebooks([]);
      setNotes([]);
      setActiveNotebookId(null);
      setActiveNoteId(null);
      fetchData(false);
    } else {
      // Same user re-focusing or background revalidation: silent refresh without flashing skeleton
      fetchData(true);
    }
  }, [activeUserId, fetchData]);



  // ============================================================================
  // Task Operations (Advanced V2 with Recurrence & Milestones)
  // ============================================================================
  const createTask = async (taskData) => {
    const supabase = getSupabase();
    if (!supabase || !user) throw new Error('Not authenticated or Supabase not initialized.');

    const sanitizeUUID = (val) => (!val || val === 'undefined' || val === '' ? null : val);

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
      goal_id: sanitizeUUID(taskData.goal_id),
      milestone_id: sanitizeUUID(taskData.milestone_id),
      subtasks: Array.isArray(taskData.subtasks) ? taskData.subtasks : [],
      completed_at: taskData.status === 'completed' ? new Date().toISOString() : null,
    };

    let { data, error: err } = await supabase.from('tasks').insert([payload]).select().single();
    if (err && (err.message?.includes('subtasks') || err.code === 'PGRST204')) {
      const fallbackPayload = { ...payload };
      delete fallbackPayload.subtasks;
      const retry = await supabase.from('tasks').insert([fallbackPayload]).select().single();
      if (!retry.error) {
        data = { ...retry.data, subtasks: payload.subtasks };
        err = null;
      } else {
        err = retry.error;
      }
    }

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
    if (!id || id === 'undefined') throw new Error('Valid task ID is required for update.');

    const sanitizeUUID = (val) => (!val || val === 'undefined' || val === '' ? null : val);

    const payload = { ...updates };
    if (payload.title) payload.title = payload.title.trim();
    if ('description' in payload) payload.description = payload.description?.trim() || null;
    if ('due_date' in payload) payload.due_date = payload.due_date ? payload.due_date : null;
    if ('due_time' in payload) payload.due_time = payload.due_time?.trim() || null;
    if ('estimated_duration' in payload) payload.estimated_duration = Number(payload.estimated_duration) || null;
    if ('goal_id' in payload) payload.goal_id = sanitizeUUID(payload.goal_id);
    if ('milestone_id' in payload) payload.milestone_id = sanitizeUUID(payload.milestone_id);
    if ('subtasks' in payload) payload.subtasks = Array.isArray(payload.subtasks) ? payload.subtasks : [];

    if (updates.status === 'completed' && !updates.completed_at) {
      payload.completed_at = new Date().toISOString();
    } else if (updates.status === 'pending' || updates.status === 'in_progress') {
      payload.completed_at = null;
    }

    let { data, error: err } = await supabase
      .from('tasks')
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (err && (err.message?.includes('subtasks') || err.code === 'PGRST204')) {
      const fallbackPayload = { ...payload };
      delete fallbackPayload.subtasks;
      const retry = await supabase.from('tasks').update(fallbackPayload).eq('id', id).select().single();
      if (!retry.error) {
        data = { ...retry.data, subtasks: payload.subtasks };
        err = null;
      } else {
        err = retry.error;
      }
    }

    if (err) {
      console.error('Error updating task:', err);
      throw err;
    }

    setTasks((prev) => prev.map((t) => (t.id === id ? data : t)));
    return data;
  };

  const toggleSubtask = async (taskId, subtaskId) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    const currentSubtasks = Array.isArray(task.subtasks) ? task.subtasks : [];
    const updatedSubtasks = currentSubtasks.map((st) =>
      st.id === subtaskId ? { ...st, completed: !st.completed } : st
    );

    // Optimistic UI update
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, subtasks: updatedSubtasks } : t))
    );

    const supabase = getSupabase();
    if (!supabase) return;

    try {
      await supabase
        .from('tasks')
        .update({ subtasks: updatedSubtasks })
        .eq('id', taskId);
    } catch (err) {
      console.warn('Could not persist subtasks to Supabase:', err);
    }
  };

  const toggleTaskStatus = async (id) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    if (task.status !== 'completed' && task.recurrence && task.recurrence !== 'none') {
      // Recurring task completed: mark current completed and generate next cycle date
      let nextDate = new Date();
      if (task.due_date && typeof task.due_date === 'string') {
        const parts = task.due_date.split('-').map(Number);
        if (parts.length === 3) {
          nextDate = new Date(parts[0], parts[1] - 1, parts[2]);
        }
      }
      if (task.recurrence === 'daily') {
        nextDate.setDate(nextDate.getDate() + 1);
      } else if (task.recurrence === 'weekly') {
        nextDate.setDate(nextDate.getDate() + 7);
      } else if (task.recurrence === 'monthly') {
        nextDate.setMonth(nextDate.getMonth() + 1);
      }

      const nextDateStr = formatLocalDate(nextDate);


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
    if (!id || id === 'undefined') throw new Error('Valid goal ID is required for update.');

    const payload = { ...updates };
    if (payload.title) payload.title = payload.title.trim();
    if ('description' in payload) payload.description = payload.description?.trim() || null;
    if ('target_date' in payload) payload.target_date = payload.target_date ? payload.target_date : null;
    if ('progress' in payload) payload.progress = Math.min(100, Math.max(0, Number(payload.progress) || 0));

    // 1. Instant 0ms Optimistic UI Update
    setGoals((prev) => prev.map((g) => (g.id === id ? { ...g, ...payload } : g)));

    // 2. Background sync to Supabase
    const { data, error: err } = await supabase
      .from('goals')
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (err) {
      console.error('Error updating goal:', err);
      fetchData();
      throw err;
    }

    if (data) {
      setGoals((prev) => prev.map((g) => (g.id === id ? data : g)));
    }
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

    const sanitizeUUID = (val) => (!val || val === 'undefined' || val === '' ? null : val);

    const payload = {
      title: milestoneData.title?.trim(),
      description: milestoneData.description?.trim() || null,
      goal_id: sanitizeUUID(milestoneData.goal_id),
      parent_id: sanitizeUUID(milestoneData.parent_id),
      user_id: user.id,
      target_date: milestoneData.target_date ? milestoneData.target_date : null,
      status: milestoneData.status || 'active',
      order_index: Number(milestoneData.order_index) || 0,
    };

    let { data, error: err } = await supabase.from('milestones').insert([payload]).select().single();
    if (err && (err.message?.includes('parent_id') || err.code === 'PGRST204')) {
      const fallbackPayload = { ...payload };
      delete fallbackPayload.parent_id;
      const retry = await supabase.from('milestones').insert([fallbackPayload]).select().single();
      if (!retry.error) {
        data = { ...retry.data, parent_id: payload.parent_id };
        err = null;
      } else {
        err = retry.error;
      }
    }

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
    if (!id || id === 'undefined') throw new Error('Valid milestone ID is required for update.');

    const sanitizeUUID = (val) => (!val || val === 'undefined' || val === '' ? null : val);

    const payload = { ...updates };
    if (payload.title) payload.title = payload.title.trim();
    if ('description' in payload) payload.description = payload.description?.trim() || null;
    if ('target_date' in payload) payload.target_date = payload.target_date ? payload.target_date : null;
    if ('goal_id' in payload) payload.goal_id = sanitizeUUID(payload.goal_id);
    if ('parent_id' in payload) payload.parent_id = sanitizeUUID(payload.parent_id);

    let { data, error: err } = await supabase
      .from('milestones')
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (err && (err.message?.includes('parent_id') || err.code === 'PGRST204')) {
      const fallbackPayload = { ...payload };
      delete fallbackPayload.parent_id;
      const retry = await supabase.from('milestones').update(fallbackPayload).eq('id', id).select().single();
      if (!retry.error) {
        data = { ...retry.data, parent_id: payload.parent_id };
        err = null;
      } else {
        err = retry.error;
      }
    }

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

    // Remove the deleted milestone AND all its sub-milestones from local state
    // (mirrors ON DELETE CASCADE on parent_id in the database)
    setMilestones((prev) => {
      const idsToRemove = new Set([id]);
      // Collect all child milestone IDs recursively
      let changed = true;
      while (changed) {
        changed = false;
        prev.forEach((m) => {
          if (m.parent_id && idsToRemove.has(m.parent_id) && !idsToRemove.has(m.id)) {
            idsToRemove.add(m.id);
            changed = true;
          }
        });
      }
      return prev.filter((m) => !idsToRemove.has(m.id));
    });
    setTasks((prev) => prev.map((t) => (t.milestone_id === id ? { ...t, milestone_id: null } : t)));
  };

  const reorderMilestones = async (reorderedList) => {
    if (!Array.isArray(reorderedList) || reorderedList.length === 0) return;

    // 1. Instant 0ms optimistic UI update
    setMilestones((prev) => {
      const orderMap = new Map();
      reorderedList.forEach((m, idx) => {
        orderMap.set(m.id, idx);
      });
      return prev.map((m) => (orderMap.has(m.id) ? { ...m, order_index: orderMap.get(m.id) } : m));
    });

    // 2. Persist updated order_index to Supabase
    const supabase = getSupabase();
    if (!supabase) return;

    try {
      await Promise.all(
        reorderedList.map((m, idx) =>
          supabase.from('milestones').update({ order_index: idx }).eq('id', m.id)
        )
      );
    } catch (err) {
      console.warn('Could not persist milestone reordering to Supabase:', err);
    }
  };


  // ============================================================================
  // Focus Session Operations
  // ============================================================================
  const saveFocusSession = async (sessionData) => {
    const supabase = getSupabase();
    if (!supabase || !user) throw new Error('Not authenticated or Supabase not initialized.');

    const sanitizeUUID = (val) => (!val || val === 'undefined' || val === '' ? null : val);

    const payload = {
      user_id: user.id,
      task_id: sanitizeUUID(sessionData.task_id),
      goal_id: sanitizeUUID(sessionData.goal_id),
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

    // Use upsert to handle concurrent saves without duplicate key errors
    const { data, error: err } = await supabase
      .from('weekly_reviews')
      .upsert(payload, { onConflict: 'user_id,week_start_date' })
      .select()
      .single();

    if (err) throw err;

    setWeeklyReviews((prev) => {
      const idx = prev.findIndex((r) => r.week_start_date === data.week_start_date && r.user_id === data.user_id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = data;
        return updated;
      }
      return [data, ...prev];
    });

    return data;
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

    // Use upsert to handle concurrent saves without duplicate key errors
    const { data, error: err } = await supabase
      .from('monthly_reviews')
      .upsert(payload, { onConflict: 'user_id,month_start_date' })
      .select()
      .single();

    if (err) throw err;

    setMonthlyReviews((prev) => {
      const idx = prev.findIndex((r) => r.month_start_date === data.month_start_date && r.user_id === data.user_id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = data;
        return updated;
      }
      return [data, ...prev];
    });

    return data;
  };


  // ============================================================================

  // ============================================================================
  // Daily Activity Logs (Done Log) Operations
  // ============================================================================
  const saveActivityLog = async (logData) => {
    const supabase = getSupabase();
    const logDate = logData.log_date || todayStr;
    const newLog = {
      id: logData.id || (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : 'log_' + Date.now()),
      user_id: user?.id || 'local_user',
      category: logData.category || 'Naam Jap',
      details: logData.details ? logData.details.trim() : '',
      duration_minutes: Number(logData.duration_minutes) || 0,
      log_date: logDate,
      created_at: new Date().toISOString(),
    };

    if (supabase && user && user.id) {
      try {
        const { data, error: err } = await supabase.from('activity_logs').insert([newLog]).select().single();
        if (!err && data) {
          setActivityLogs((prev) => [data, ...prev]);
          return data;
        }
      } catch (e) {
        console.warn('Supabase activity_logs insert fallback to localStorage:', e);
      }
    }

    setActivityLogs((prev) => {
      const updated = [newLog, ...prev];
      try {
        localStorage.setItem('kaap10_activity_logs', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    return newLog;
  };

  const deleteActivityLog = async (id) => {
    const supabase = getSupabase();
    if (supabase && user && user.id) {
      try {
        await supabase.from('activity_logs').delete().eq('id', id);
      } catch (e) {}
    }

    setActivityLogs((prev) => {
      const updated = prev.filter((l) => l.id !== id);
      try {
        localStorage.setItem('kaap10_activity_logs', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  // ============================================================================
  // Notebook Operations (Vaults & Notes)
  // ============================================================================
  const createNotebook = async (notebookData) => {
    const supabase = getSupabase();
    const newNb = {
      id: notebookData.id || (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : 'nb_' + Date.now()),
      user_id: user?.id || 'local_user',
      title: notebookData.title?.trim() || 'Untitled Notebook',
      description: notebookData.description?.trim() || null,
      icon: notebookData.icon || 'book',
      color: notebookData.color || '#FF4D4F',
      order_index: notebooks.length,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (supabase && user?.id) {
      try {
        const { data, error: err } = await supabase.from('notebooks').insert([newNb]).select().single();
        if (!err && data) {
          setNotebooks((prev) => [...prev, data]);
          if (!activeNotebookId) setActiveNotebookId(data.id);
          return data;
        }
      } catch (e) {
        console.warn('Supabase notebooks insert fallback to local state:', e);
      }
    }

    setNotebooks((prev) => {
      const updated = [...prev, newNb];
      try {
        const key = user?.id ? `kaap10_tracker_notebooks_${user.id}` : 'kaap10_tracker_notebooks';
        localStorage.setItem(key, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    if (!activeNotebookId) setActiveNotebookId(newNb.id);
    return newNb;
  };

  const updateNotebook = async (id, updates) => {
    const supabase = getSupabase();
    const updatedPayload = { ...updates, updated_at: new Date().toISOString() };
    if (updatedPayload.title) updatedPayload.title = updatedPayload.title.trim();

    if (supabase && user?.id) {
      try {
        const { data, error: err } = await supabase.from('notebooks').update(updatedPayload).eq('id', id).select().single();
        if (!err && data) {
          setNotebooks((prev) => prev.map((nb) => (nb.id === id ? data : nb)));
          return data;
        }
      } catch (e) {
        console.warn('Supabase notebooks update fallback to local state:', e);
      }
    }

    setNotebooks((prev) => {
      const updated = prev.map((nb) => (nb.id === id ? { ...nb, ...updatedPayload } : nb));
      try {
        const key = user?.id ? `kaap10_tracker_notebooks_${user.id}` : 'kaap10_tracker_notebooks';
        localStorage.setItem(key, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const deleteNotebook = async (id) => {
    const supabase = getSupabase();
    if (supabase && user?.id) {
      try {
        await supabase.from('notebooks').delete().eq('id', id);
      } catch (e) {}
    }

    setNotebooks((prev) => {
      const updated = prev.filter((nb) => nb.id !== id);
      try {
        const key = user?.id ? `kaap10_tracker_notebooks_${user.id}` : 'kaap10_tracker_notebooks';
        localStorage.setItem(key, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    // Also delete notes in this notebook
    setNotes((prev) => {
      const updatedNotes = prev.filter((n) => n.notebook_id !== id);
      try {
        const key = user?.id ? `kaap10_tracker_notes_${user.id}` : 'kaap10_tracker_notes';
        localStorage.setItem(key, JSON.stringify(updatedNotes));
      } catch (e) {}
      return updatedNotes;
    });

    if (activeNotebookId === id) {
      const remaining = notebooks.filter((nb) => nb.id !== id);
      setActiveNotebookId(remaining.length > 0 ? remaining[0].id : null);
      setActiveNoteId(null);
    }
  };

  const createNote = async (noteData) => {
    const supabase = getSupabase();
    const parentNbId = noteData.notebook_id || activeNotebookId || (notebooks[0] ? notebooks[0].id : null);
    const newNote = {
      id: noteData.id || (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : 'note_' + Date.now()),
      user_id: user?.id || 'local_user',
      notebook_id: parentNbId,
      title: noteData.title ? noteData.title.trim() : 'Untitled Note',
      content: noteData.content || '',
      category: noteData.category || 'General',
      tags: Array.isArray(noteData.tags) ? noteData.tags : [],
      is_pinned: Boolean(noteData.is_pinned),
      is_favorite: Boolean(noteData.is_favorite),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (supabase && user?.id) {
      try {
        const { data, error: err } = await supabase.from('notes').insert([newNote]).select().single();
        if (!err && data) {
          setNotes((prev) => [data, ...prev]);
          setActiveNoteId(data.id);
          return data;
        }
      } catch (e) {
        console.warn('Supabase notes insert fallback to local state:', e);
      }
    }

    setNotes((prev) => {
      const updated = [newNote, ...prev];
      try {
        const key = user?.id ? `kaap10_tracker_notes_${user.id}` : 'kaap10_tracker_notes';
        localStorage.setItem(key, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    setActiveNoteId(newNote.id);
    return newNote;
  };

  const updateNote = async (id, updates) => {
    const supabase = getSupabase();
    const updatedPayload = { ...updates, updated_at: new Date().toISOString() };
    if ('title' in updatedPayload && updatedPayload.title) {
      updatedPayload.title = updatedPayload.title.trim();
    }

    if (supabase && user?.id) {
      try {
        const { data, error: err } = await supabase.from('notes').update(updatedPayload).eq('id', id).select().single();
        if (!err && data) {
          setNotes((prev) => prev.map((n) => (n.id === id ? data : n)));
          return data;
        }
      } catch (e) {
        console.warn('Supabase notes update fallback to local state:', e);
      }
    }

    setNotes((prev) => {
      const updated = prev.map((n) => (n.id === id ? { ...n, ...updatedPayload } : n));
      try {
        const key = user?.id ? `kaap10_tracker_notes_${user.id}` : 'kaap10_tracker_notes';
        localStorage.setItem(key, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const deleteNote = async (id) => {
    const supabase = getSupabase();
    if (supabase && user?.id) {
      try {
        await supabase.from('notes').delete().eq('id', id);
      } catch (e) {}
    }

    setNotes((prev) => {
      const updated = prev.filter((n) => n.id !== id);
      try {
        const key = user?.id ? `kaap10_tracker_notes_${user.id}` : 'kaap10_tracker_notes';
        localStorage.setItem(key, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    if (activeNoteId === id) {
      setActiveNoteId(null);
    }
  };

  const toggleNotePin = async (id) => {
    const note = notes.find((n) => n.id === id);
    if (!note) return;
    await updateNote(id, { is_pinned: !note.is_pinned });
  };

  const toggleNoteFavorite = async (id) => {
    const note = notes.find((n) => n.id === id);
    if (!note) return;
    await updateNote(id, { is_favorite: !note.is_favorite });
  };

  // Derived Analytics & Productivity Statistics (Real Database Data)
  // ============================================================================
  // Use local date string to avoid off-by-one date issues in timezones ahead of UTC (e.g. IST UTC+5:30)
  const todayStr = useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }, []);


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
      const checkDateStr = formatLocalDate(checkDate);

      // If not completed today, start checking from yesterday
      if (!logSet.has(checkDateStr)) {
        checkDate.setDate(checkDate.getDate() - 1);
      }

      while (true) {
        const dStr = formatLocalDate(checkDate);
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
        const [y, m, d] = dStr.split('-').map(Number);
        const curDate = new Date(y, m - 1, d);
        if (!prevDate) {
          tempStreak = 1;
        } else {
          const diffDays = Math.round((curDate.getTime() - prevDate.getTime()) / (1000 * 3600 * 24));
          if (diffDays === 1) {
            tempStreak++;
          } else if (diffDays > 1) {
            tempStreak = 1;
          }
        }
        if (tempStreak > longestStreak) longestStreak = tempStreak;
        prevDate = curDate;
      });

      // 30-day completion rate
      let last30DaysCompleted = 0;
      for (let i = 0; i < 30; i++) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        if (logSet.has(formatLocalDate(d))) {
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
      if (formatLocalDate(sDate) === todayStr) todaySecs += duration;
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
      const key = formatLocalDate(d);
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

    // 4. Activity Logs (Done Log)
    activityLogs.forEach((l) => {
      const key = l.log_date;
      if (map[key]) {
        map[key].activityLogsCount = (map[key].activityLogsCount || 0) + 1;
        map[key].totalScore += 2;
      }
    });

    return map;
  }, [tasks, focusSessions, habitLogs, activityLogs]);

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
      totalActivityLogs: activityLogs.length,
      completedGoals: completedGoals.length,
      totalGoals: goals.length,
      completedMilestones: completedMilestones.length,
      totalMilestones: milestones.length,
      completedResources: completedResources.length,
      totalResources: resources.length,
      peakDay: completedTasks.length > 0 ? dayNames[peakDayIdx] : 'N/A',
      bestStreak: bestHabitStreak,
    };
  }, [tasks, goals, milestones, resources, focusStats, habitStreaks, activityLogs]);

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
        notebooks,
        notes,

        // State & Loading
        activeTab,
        setActiveTab,
        activeNotebookId,
        setActiveNotebookId,
        activeNoteId,
        setActiveNoteId,
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
        parentMilestoneId,
        setParentMilestoneId,

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

        notebookModalOpen,
        setNotebookModalOpen,
        editingNotebook,
        setEditingNotebook,

        searchModalOpen,
        setSearchModalOpen,

        floatWidgetOpen,
        setFloatWidgetOpen,
        focusTimerSnapshot,
        setFocusTimerSnapshot,

        confirmModal,
        openConfirmModal,
        closeConfirmModal,

        // Operations
        createTask,
        updateTask,
        toggleTaskStatus,
        toggleSubtask,
        deleteTask,

        createGoal,
        updateGoal,
        deleteGoal,

        createMilestone,
        updateMilestone,
        toggleMilestoneStatus,
        deleteMilestone,
        reorderMilestones,

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

        // Notebook & Notes Operations
        createNotebook,
        updateNotebook,
        deleteNotebook,
        createNote,
        updateNote,
        deleteNote,
        toggleNotePin,
        toggleNoteFavorite,

        // Activity Logs
        activityLogs,
        saveActivityLog,
        deleteActivityLog,

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
