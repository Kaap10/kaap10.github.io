-- ==============================================================================
-- Tracker V2 Database Migration Script (PostgreSQL for Supabase)
-- Non-destructive: Extends V1 with Milestones, Focus Sessions, Habits, Reviews
-- ==============================================================================

-- 1. Upgrade Tasks table
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS due_time TEXT;
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS estimated_duration INTEGER; -- minutes
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS recurrence TEXT DEFAULT 'none' CHECK (recurrence IN ('none', 'daily', 'weekly', 'monthly'));
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS milestone_id UUID;

-- 2. Upgrade Resources table
ALTER TABLE public.resources ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'in_progress', 'completed'));
ALTER TABLE public.resources ADD COLUMN IF NOT EXISTS notes TEXT;

-- 3. Milestones Table (Nested under Goals)
CREATE TABLE IF NOT EXISTS public.milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  goal_id UUID NOT NULL REFERENCES public.goals(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  target_date DATE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed')),
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Foreign key for tasks.milestone_id -> milestones.id
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'fk_tasks_milestone'
  ) THEN
    ALTER TABLE public.tasks
      ADD CONSTRAINT fk_tasks_milestone
      FOREIGN KEY (milestone_id)
      REFERENCES public.milestones(id)
      ON DELETE SET NULL;
  END IF;
END $$;

-- 4. Focus Sessions Table
CREATE TABLE IF NOT EXISTS public.focus_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  task_id UUID REFERENCES public.tasks(id) ON DELETE SET NULL,
  goal_id UUID REFERENCES public.goals(id) ON DELETE SET NULL,
  duration INTEGER NOT NULL CHECK (duration >= 0), -- duration in seconds
  started_at TIMESTAMP WITH TIME ZONE NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Habits Table
CREATE TABLE IF NOT EXISTS public.habits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  frequency TEXT NOT NULL DEFAULT 'daily' CHECK (frequency IN ('daily', 'weekly')),
  archived BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Habit Logs Table (Unique per user + habit + date to prevent duplicate counts)
CREATE TABLE IF NOT EXISTS public.habit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  habit_id UUID NOT NULL REFERENCES public.habits(id) ON DELETE CASCADE,
  completed_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  CONSTRAINT unique_user_habit_date UNIQUE (user_id, habit_id, completed_date)
);

-- 7. Weekly Reviews Table
CREATE TABLE IF NOT EXISTS public.weekly_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  week_start_date DATE NOT NULL,
  tasks_planned INTEGER DEFAULT 0,
  tasks_completed INTEGER DEFAULT 0,
  focus_minutes INTEGER DEFAULT 0,
  what_went_well TEXT,
  what_did_not_go_well TEXT,
  biggest_achievement TEXT,
  what_to_improve TEXT,
  top_priorities TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  CONSTRAINT unique_user_weekly_review UNIQUE (user_id, week_start_date)
);

-- 8. Monthly Reviews Table
CREATE TABLE IF NOT EXISTS public.monthly_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  month_start_date DATE NOT NULL,
  tasks_completed INTEGER DEFAULT 0,
  completion_rate INTEGER DEFAULT 0,
  focus_hours NUMERIC(6, 2) DEFAULT 0,
  goals_completed INTEGER DEFAULT 0,
  habit_consistency INTEGER DEFAULT 0,
  biggest_achievement TEXT,
  biggest_challenge TEXT,
  what_improved TEXT,
  what_needs_improvement TEXT,
  next_month_priorities TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  CONSTRAINT unique_user_monthly_review UNIQUE (user_id, month_start_date)
);

-- ==============================================================================
-- Enable Row Level Security (RLS) on all new V2 tables
-- ==============================================================================
ALTER TABLE public.milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.focus_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.habit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weekly_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.monthly_reviews ENABLE ROW LEVEL SECURITY;

-- Milestones RLS
CREATE POLICY "Users can manage their own milestones"
  ON public.milestones FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Focus Sessions RLS
CREATE POLICY "Users can manage their own focus sessions"
  ON public.focus_sessions FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Habits RLS
CREATE POLICY "Users can manage their own habits"
  ON public.habits FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Habit Logs RLS
CREATE POLICY "Users can manage their own habit logs"
  ON public.habit_logs FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Weekly Reviews RLS
CREATE POLICY "Users can manage their own weekly reviews"
  ON public.weekly_reviews FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Monthly Reviews RLS
CREATE POLICY "Users can manage their own monthly reviews"
  ON public.monthly_reviews FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ==============================================================================
-- Performance Indexes
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_milestones_goal_id ON public.milestones(goal_id);
CREATE INDEX IF NOT EXISTS idx_milestones_user_id ON public.milestones(user_id);
CREATE INDEX IF NOT EXISTS idx_focus_sessions_user_id ON public.focus_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_focus_sessions_completed_at ON public.focus_sessions(completed_at);
CREATE INDEX IF NOT EXISTS idx_habits_user_id ON public.habits(user_id);
CREATE INDEX IF NOT EXISTS idx_habit_logs_user_id_date ON public.habit_logs(user_id, completed_date);
CREATE INDEX IF NOT EXISTS idx_weekly_reviews_user_date ON public.weekly_reviews(user_id, week_start_date);
CREATE INDEX IF NOT EXISTS idx_monthly_reviews_user_date ON public.monthly_reviews(user_id, month_start_date);

-- ==============================================================================
-- Schema Privileges for Supabase Roles (authenticated & anon)
-- ==============================================================================
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO anon, authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO anon, authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON ROUTINES TO anon, authenticated;

