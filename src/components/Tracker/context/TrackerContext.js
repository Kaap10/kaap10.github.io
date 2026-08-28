import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from './AuthContext';
import { getSupabase } from '../services/supabaseClient';

const TrackerContext = createContext(null);

export function TrackerProvider({ children }) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [tasks, setTasks] = useState([]);
  const [goals, setGoals] = useState([]);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Quick Action Modal states
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [goalModalOpen, setGoalModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

  const [resourceModalOpen, setResourceModalOpen] = useState(false);
  const [editingResource, setEditingResource] = useState(null);

  // Delete confirmation modal state
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null,
  });

  const fetchData = useCallback(async () => {
    if (!user) {
      setTasks([]);
      setGoals([]);
      setResources([]);
      setLoading(false);
      return;
    }

    const supabase = getSupabase();
    if (!supabase) return;

    setLoading(true);
    setError(null);

    try {
      const [tasksRes, goalsRes, resourcesRes] = await Promise.all([
        supabase.from('tasks').select('*').order('created_at', { ascending: false }),
        supabase.from('goals').select('*').order('created_at', { ascending: false }),
        supabase.from('resources').select('*').order('created_at', { ascending: false }),
      ]);

      if (tasksRes.error) throw tasksRes.error;
      if (goalsRes.error) throw goalsRes.error;
      if (resourcesRes.error) throw resourcesRes.error;

      setTasks(tasksRes.data || []);
      setGoals(goalsRes.data || []);
      setResources(resourcesRes.data || []);
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
  // Task Operations
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
      goal_id: taskData.goal_id ? taskData.goal_id : null,
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
    if ('goal_id' in payload) payload.goal_id = payload.goal_id ? payload.goal_id : null;

    if (updates.status === 'completed' && !updates.completed_at) {
      payload.completed_at = new Date().toISOString();
    } else if (updates.status === 'pending') {
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

    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    return updateTask(id, { status: newStatus });
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
    // Also disconnect goal_id from local tasks state
    setTasks((prev) => prev.map((t) => (t.goal_id === id ? { ...t, goal_id: null } : t)));
  };

  // ============================================================================
  // Resource Operations
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

    const { data, error: err } = await supabase
      .from('resources')
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (err) {
      console.error('Error updating resource:', err);
      throw err;
    }

    setResources((prev) => prev.map((r) => (r.id === id ? data : r)));
    return data;
  };

  const toggleResourceFavorite = async (id) => {
    const res = resources.find((r) => r.id === id);
    if (!res) return;

    return updateResource(id, { favorite: !res.favorite });
  };

  const deleteResource = async (id) => {
    const supabase = getSupabase();
    if (!supabase) return;

    const { error: err } = await supabase.from('resources').delete().eq('id', id);
    if (err) throw err;

    setResources((prev) => prev.filter((r) => r.id !== id));
  };

  // Helper for opening confirm modal
  const requestConfirmation = ({ title, message, onConfirm }) => {
    setConfirmModal({
      isOpen: true,
      title,
      message,
      onConfirm: async () => {
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
        await onConfirm();
      },
    });
  };

  const closeConfirmModal = () => {
    setConfirmModal((prev) => ({ ...prev, isOpen: false }));
  };

  // ============================================================================
  // Computed Analytics & Stats
  // ============================================================================
  const analytics = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0];

    // Today's stats
    const todayTasks = tasks.filter((t) => {
      if (!t.due_date && !t.completed_at) return true;
      const isDueToday = t.due_date === todayStr;
      const isCompletedToday = t.completed_at && t.completed_at.startsWith(todayStr);
      return isDueToday || isCompletedToday;
    });

    const todayTotal = todayTasks.length;
    const todayCompleted = todayTasks.filter((t) => t.status === 'completed').length;
    const todayPending = todayTotal - todayCompleted;
    const todayPercent = todayTotal > 0 ? Math.round((todayCompleted / todayTotal) * 100) : 0;

    // Overall task counts
    const totalTasks = tasks.length;
    const totalCompleted = tasks.filter((t) => t.status === 'completed').length;
    const totalPending = totalTasks - totalCompleted;
    const overallPercent = totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0;

    // Weekly stats (last 7 days / current week Mon-Sun)
    const now = new Date();
    const currentDayOfWeek = now.getDay(); // 0 is Sunday
    const distanceToMonday = (currentDayOfWeek + 6) % 7;
    const monday = new Date(now);
    monday.setDate(now.getDate() - distanceToMonday);
    monday.setHours(0, 0, 0, 0);

    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const weeklyDayStats = weekDays.map((dayName, idx) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + idx);
      const dStr = d.toISOString().split('T')[0];

      const completedCount = tasks.filter(
        (t) => t.status === 'completed' && t.completed_at && t.completed_at.startsWith(dStr)
      ).length;

      const createdCount = tasks.filter(
        (t) => t.created_at && t.created_at.startsWith(dStr)
      ).length;

      return {
        day: dayName,
        date: dStr,
        completed: completedCount,
        created: createdCount,
        isToday: dStr === todayStr,
      };
    });

    const weekTotalCompleted = weeklyDayStats.reduce((acc, curr) => acc + curr.completed, 0);
    const weekTotalPlanned = weeklyDayStats.reduce((acc, curr) => acc + Math.max(curr.created, curr.completed), 0);
    const weekPercent = weekTotalPlanned > 0 ? Math.round((weekTotalCompleted / weekTotalPlanned) * 100) : (weekTotalCompleted > 0 ? 100 : 0);

    // Monthly stats (current calendar month)
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const monthName = now.toLocaleString('default', { month: 'long' });

    const monthTasksCompleted = tasks.filter((t) => {
      if (!t.completed_at) return false;
      const d = new Date(t.completed_at);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    }).length;

    const monthTasksCreated = tasks.filter((t) => {
      if (!t.created_at) return false;
      const d = new Date(t.created_at);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    }).length;

    const monthPlanned = Math.max(monthTasksCreated, monthTasksCompleted);
    const monthPercent = monthPlanned > 0 ? Math.round((monthTasksCompleted / monthPlanned) * 100) : 0;

    // Monthly weekly breakdown (Weeks 1 to 4)
    const monthlyWeeks = [1, 2, 3, 4].map((w) => {
      const startDay = (w - 1) * 7 + 1;
      const endDay = w === 4 ? 31 : w * 7;

      const comp = tasks.filter((t) => {
        if (!t.completed_at) return false;
        const d = new Date(t.completed_at);
        return (
          d.getMonth() === currentMonth &&
          d.getFullYear() === currentYear &&
          d.getDate() >= startDay &&
          d.getDate() <= endDay
        );
      }).length;

      return {
        label: `Week ${w}`,
        completed: comp,
      };
    });

    // 365-day Activity Map (GitHub style)
    // Build map of YYYY-MM-DD -> count
    const activityMap = {};
    tasks.forEach((t) => {
      if (t.status === 'completed' && t.completed_at) {
        const dStr = t.completed_at.split('T')[0];
        activityMap[dStr] = (activityMap[dStr] || 0) + 1;
      }
    });

    return {
      today: {
        total: todayTotal,
        completed: todayCompleted,
        pending: todayPending,
        percent: todayPercent,
        tasks: todayTasks,
      },
      overall: {
        total: totalTasks,
        completed: totalCompleted,
        pending: totalPending,
        percent: overallPercent,
      },
      weekly: {
        totalCompleted: weekTotalCompleted,
        totalPlanned: weekTotalPlanned,
        percent: weekPercent,
        breakdown: weeklyDayStats,
      },
      monthly: {
        monthName,
        completed: monthTasksCompleted,
        planned: monthPlanned,
        percent: monthPercent,
        weeks: monthlyWeeks,
      },
      activityMap,
    };
  }, [tasks]);

  const value = {
    activeTab,
    setActiveTab,
    tasks,
    goals,
    resources,
    loading,
    error,
    refreshData: fetchData,
    // Tasks
    createTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    taskModalOpen,
    setTaskModalOpen,
    editingTask,
    setEditingTask,
    // Goals
    createGoal,
    updateGoal,
    deleteGoal,
    goalModalOpen,
    setGoalModalOpen,
    editingGoal,
    setEditingGoal,
    // Resources
    createResource,
    updateResource,
    deleteResource,
    toggleResourceFavorite,
    resourceModalOpen,
    setResourceModalOpen,
    editingResource,
    setEditingResource,
    // Modals
    confirmModal,
    requestConfirmation,
    closeConfirmModal,
    // Analytics
    analytics,
  };

  return <TrackerContext.Provider value={value}>{children}</TrackerContext.Provider>;
}

export function useTracker() {
  const context = useContext(TrackerContext);
  if (!context) {
    throw new Error('useTracker must be used within a TrackerProvider');
  }
  return context;
}

