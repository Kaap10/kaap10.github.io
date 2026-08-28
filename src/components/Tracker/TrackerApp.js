import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TrackerProvider, useTracker } from './context/TrackerContext';
import AuthView from './components/Auth/AuthView';
import TrackerLayout from './TrackerLayout';
import DashboardView from './components/Dashboard/DashboardView';
import TasksView from './components/Tasks/TasksView';
import GoalsView from './components/Goals/GoalsView';
import ResourcesView from './components/Resources/ResourcesView';
import ProgressView from './components/Progress/ProgressView';
import TaskModal from './components/Tasks/TaskModal';
import GoalModal from './components/Goals/GoalModal';
import ResourceModal from './components/Resources/ResourceModal';
import ConfirmModal from './components/Common/ConfirmModal';

function TrackerContent() {
  const { user, loading: authLoading } = useAuth();
  const {
    activeTab,
    loading: trackerLoading,
    taskModalOpen,
    setTaskModalOpen,
    editingTask,
    goalModalOpen,
    setGoalModalOpen,
    editingGoal,
    resourceModalOpen,
    setResourceModalOpen,
    editingResource,
    confirmModal,
    closeConfirmModal,
  } = useTracker();

  if (authLoading) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'calc(100vh - 120px)',
          gap: '1rem',
          color: 'var(--vg-text-muted)',
          fontSize: '0.9rem',
        }}
      >
        <div
          style={{
            width: '32px',
            height: '32px',
            border: '2px solid var(--vg-border)',
            borderTopColor: 'var(--vg-accent)',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }}
        />
        <span>Loading Tracker...</span>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!user) {
    return <AuthView />;
  }

  return (
    <TrackerLayout>
      {activeTab === 'dashboard' && <DashboardView />}
      {activeTab === 'tasks' && <TasksView />}
      {activeTab === 'goals' && <GoalsView />}
      {activeTab === 'resources' && <ResourcesView />}
      {activeTab === 'progress' && <ProgressView />}

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

      <ResourceModal
        isOpen={resourceModalOpen}
        onClose={() => setResourceModalOpen(false)}
        initialData={editingResource}
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

