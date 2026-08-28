import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TrackerProvider, useTracker } from './context/TrackerContext';
import AuthView from './components/Auth/AuthView';
import TrackerLayout from './TrackerLayout';
import DashboardView from './components/Dashboard/DashboardView';
import TasksView from './components/Tasks/TasksView';
import GoalsView from './components/Goals/GoalsView';
import FocusView from './components/Focus/FocusView';
import HabitsView from './components/Habits/HabitsView';
import CalendarView from './components/Calendar/CalendarView';
import ResourcesView from './components/Resources/ResourcesView';
import ProgressView from './components/Progress/ProgressView';
import ReviewsView from './components/Reviews/ReviewsView';
import StatsView from './components/Stats/StatsView';

// Modals
import TaskModal from './components/Tasks/TaskModal';
import GoalModal from './components/Goals/GoalModal';
import MilestoneModal from './components/Goals/MilestoneModal';
import HabitModal from './components/Habits/HabitModal';
import ResourceModal from './components/Resources/ResourceModal';
import ResourceNotesModal from './components/Resources/ResourceNotesModal';
import GlobalSearchModal from './components/Common/GlobalSearchModal';
import ConfirmModal from './components/Common/ConfirmModal';

function TrackerContent() {
  const { user, loading: authLoading } = useAuth();
  const {
    activeTab,
    taskModalOpen,
    setTaskModalOpen,
    editingTask,
    goalModalOpen,
    setGoalModalOpen,
    editingGoal,
    milestoneModalOpen,
    setMilestoneModalOpen,
    editingMilestone,
    selectedGoalForMilestone,
    parentMilestoneId,
    habitModalOpen,
    setHabitModalOpen,
    editingHabit,
    resourceModalOpen,
    setResourceModalOpen,
    editingResource,
    notesModalOpen,
    setNotesModalOpen,
    activeResourceForNotes,
    searchModalOpen,
    setSearchModalOpen,
    confirmModal,
    closeConfirmModal,
  } = useTracker();

  if (!user && !authLoading) {
    return <AuthView />;
  }

  return (
    <TrackerLayout>
      <div style={{ display: activeTab === 'dashboard' ? 'block' : 'none' }}>
        <DashboardView />
      </div>
      <div style={{ display: activeTab === 'tasks' ? 'block' : 'none' }}>
        <TasksView />
      </div>
      <div style={{ display: activeTab === 'goals' ? 'block' : 'none' }}>
        <GoalsView />
      </div>
      <div style={{ display: activeTab === 'focus' ? 'block' : 'none' }}>
        <FocusView />
      </div>
      <div style={{ display: activeTab === 'habits' ? 'block' : 'none' }}>
        <HabitsView />
      </div>
      <div style={{ display: activeTab === 'calendar' ? 'block' : 'none' }}>
        <CalendarView />
      </div>
      <div style={{ display: activeTab === 'resources' ? 'block' : 'none' }}>
        <ResourcesView />
      </div>
      <div style={{ display: activeTab === 'progress' ? 'block' : 'none' }}>
        <ProgressView />
      </div>
      <div style={{ display: activeTab === 'reviews' ? 'block' : 'none' }}>
        <ReviewsView />
      </div>
      <div style={{ display: activeTab === 'stats' ? 'block' : 'none' }}>
        <StatsView />
      </div>

      {/* Global Modals */}
      <TaskModal
        isOpen={taskModalOpen}
        onClose={() => setTaskModalOpen(false)}
        initialData={editingTask}
      />

      <GoalModal
        isOpen={goalModalOpen}
        onClose={() => setGoalModalOpen(false)}
        initialData={editingGoal}
      />

      <MilestoneModal
        isOpen={milestoneModalOpen}
        onClose={() => setMilestoneModalOpen(false)}
        initialData={editingMilestone}
        goalId={selectedGoalForMilestone}
        parentMilestoneId={parentMilestoneId}
      />

      <HabitModal
        isOpen={habitModalOpen}
        onClose={() => setHabitModalOpen(false)}
        initialData={editingHabit}
      />

      <ResourceModal
        isOpen={resourceModalOpen}
        onClose={() => setResourceModalOpen(false)}
        initialData={editingResource}
      />

      <ResourceNotesModal
        isOpen={notesModalOpen}
        onClose={() => setNotesModalOpen(false)}
        resource={activeResourceForNotes}
      />

      <GlobalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        onConfirm={confirmModal.onConfirm}
        onClose={closeConfirmModal}
      />
    </TrackerLayout>
  );
}

export default function TrackerApp() {
  return (
    <AuthProvider>
      <TrackerProvider>
        <TrackerContent />
      </TrackerProvider>
    </AuthProvider>
  );
}
