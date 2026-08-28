import React from 'react';
import {
  LayoutDashboard,
  CheckSquare,
  Target,
  Flag,
  Timer,
  Repeat,
  Calendar,
  BookOpen,
  BarChart3,
  FileText,
  TrendingUp,
  Trophy,
  Flame,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Check,
  Trash2,
  Edit3,
  ExternalLink,
  Star,
  Search,
  Filter,
  Clock,
  LogOut,
  User,
  Lock,
  AlertCircle,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
  Settings,
  Video,
  FileCode,
  GraduationCap,
  Book,
  Globe,
} from 'lucide-react';

export function IconDashboard({ size = 18, className = '' }) {
  return <LayoutDashboard size={size} className={className} />;
}

export function IconTasks({ size = 18, className = '' }) {
  return <CheckSquare size={size} className={className} />;
}

export function IconGoals({ size = 18, className = '' }) {
  return <Target size={size} className={className} />;
}

export function IconMilestone({ size = 16, className = '' }) {
  return <Flag size={size} className={className} />;
}

export function IconFocus({ size = 18, className = '' }) {
  return <Timer size={size} className={className} />;
}

export function IconHabit({ size = 18, className = '' }) {
  return <Repeat size={size} className={className} />;
}

export function IconCalendar({ size = 18, className = '' }) {
  return <Calendar size={size} className={className} />;
}

export function IconResources({ size = 18, className = '' }) {
  return <BookOpen size={size} className={className} />;
}

export function IconProgress({ size = 18, className = '' }) {
  return <BarChart3 size={size} className={className} />;
}

export function IconReview({ size = 18, className = '' }) {
  return <FileText size={size} className={className} />;
}

export function IconStats({ size = 18, className = '' }) {
  return <TrendingUp size={size} className={className} />;
}

export function IconFlame({ size = 16, className = '' }) {
  return <Flame size={size} className={className} />;
}

export function IconTrophy({ size = 18, className = '' }) {
  return <Trophy size={size} className={className} />;
}

export function IconRepeat({ size = 15, className = '' }) {
  return <Repeat size={size} className={className} />;
}

export function IconPlay({ size = 16, className = '' }) {
  return <Play size={size} className={className} fill="currentColor" />;
}

export function IconPause({ size = 16, className = '' }) {
  return <Pause size={size} className={className} fill="currentColor" />;
}

export function IconRotateCcw({ size = 16, className = '' }) {
  return <RotateCcw size={size} className={className} />;
}

export function IconPlus({ size = 18, className = '' }) {
  return <Plus size={size} className={className} />;
}

export function IconCheck({ size = 16, className = '' }) {
  return <Check size={size} className={className} strokeWidth={2.5} />;
}

export function IconTrash({ size = 16, className = '' }) {
  return <Trash2 size={size} className={className} />;
}

export function IconEdit({ size = 16, className = '' }) {
  return <Edit3 size={size} className={className} />;
}

export function IconExternalLink({ size = 15, className = '' }) {
  return <ExternalLink size={size} className={className} />;
}

export function IconStar({ size = 16, filled = false, className = '' }) {
  return <Star size={size} className={className} fill={filled ? 'currentColor' : 'none'} />;
}

export function IconSearch({ size = 16, className = '' }) {
  return <Search size={size} className={className} />;
}

export function IconFilter({ size = 16, className = '' }) {
  return <Filter size={size} className={className} />;
}

export function IconClock({ size = 15, className = '' }) {
  return <Clock size={size} className={className} />;
}

export function IconLogOut({ size = 16, className = '' }) {
  return <LogOut size={size} className={className} />;
}

export function IconUser({ size = 16, className = '' }) {
  return <User size={size} className={className} />;
}

export function IconLock({ size = 16, className = '' }) {
  return <Lock size={size} className={className} />;
}

export function IconAlertCircle({ size = 18, className = '' }) {
  return <AlertCircle size={size} className={className} />;
}

export function IconSparkles({ size = 16, className = '' }) {
  return <Sparkles size={size} className={className} />;
}

export function IconClose({ size = 16, className = '' }) {
  return <X size={size} className={className} />;
}

export function IconNote({ size = 16, className = '' }) {
  return <FileText size={size} className={className} />;
}

export function IconChevronLeft({ size = 16, className = '' }) {
  return <ChevronLeft size={size} className={className} />;
}

export function IconChevronRight({ size = 16, className = '' }) {
  return <ChevronRight size={size} className={className} />;
}

export function IconSettings({ size = 16, className = '' }) {
  return <Settings size={size} className={className} />;
}

export function IconType({ type, size = 16, className = '' }) {
  switch (type) {
    case 'YouTube':
      return <Video size={size} className={className} />;
    case 'PDF':
      return <FileText size={size} className={className} />;
    case 'GitHub':
      return <FileCode size={size} className={className} />;
    case 'Course':
      return <GraduationCap size={size} className={className} />;
    case 'Book':
      return <Book size={size} className={className} />;
    case 'Website':
    default:
      return <Globe size={size} className={className} />;
  }
}
