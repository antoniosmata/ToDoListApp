import React, { useState, useEffect, useMemo } from 'react';
import { Task } from '../../types';
import { apiService } from '../../services/api';
import { FiPlusSquare, FiGrid } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';
import StatusColumn from './StatusColumn';
import TaskCard from './TaskCard';
import TaskForm from '../tasks/TaskForm';
import styles from './Dashboard.module.css';

const TaskDashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [activeView, setActiveView] = useState<'overview' | 'tasks'>('tasks');
  const [viewMode, setViewMode] = useState<'columns' | 'grid'>('columns');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await apiService.getTasks();
      setTasks(data);
      setError('');
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  // Filter and search tasks
  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(task => task.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(search) ||
        (task.description && task.description.toLowerCase().includes(search)) ||
        task.category.toLowerCase().includes(search)
      );
    }

    return filtered;
  }, [tasks, selectedCategory, searchTerm]);

  // Group tasks by status for column view
  const tasksByStatus = useMemo(() => {
    const yetToStart = filteredTasks.filter(task => !task.completed);
    const completed = filteredTasks.filter(task => task.completed);
    
    // For "In Progress", we could use tasks that are not completed and have been updated recently
    // For now, we'll use a simple split of incomplete tasks
    const inProgress = yetToStart.filter((_, index) => index % 3 === 0); // Every 3rd task as example
    const actualYetToStart = yetToStart.filter((_, index) => index % 3 !== 0);

    return {
      yetToStart: actualYetToStart,
      inProgress,
      completed
    };
  }, [filteredTasks]);

  const handleTaskCreated = (newTask: Task) => {
    setTasks(prev => [newTask, ...prev]);
    setShowForm(false);
  };

  const handleTaskUpdated = (updatedTask: Task) => {
    setTasks(prev => prev.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
    setEditingTask(null);
  };

  const handleTaskDeleted = (taskId: number) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  // Close sidebar when clicking outside on mobile
  const handleOverlayClick = () => {
    setSidebarOpen(false);
  };

  if (loading) {
    return (
      <div className={styles.dashboardContainer}>
        <div className={styles.loading}>
          <p>Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboardContainer}>
      {/* Mobile overlay */}
      <div 
        className={`${styles.sidebarOverlay} ${sidebarOpen ? styles.open : ''}`}
        onClick={handleOverlayClick}
      />
      
      <DashboardSidebar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        activeView={activeView}
        onViewChange={setActiveView}
        isOpen={sidebarOpen}
        onClose={handleSidebarClose}
      />

      <div className={styles.mainWrapper}>
        <DashboardHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddTask={handleAddTask}
          onSidebarToggle={handleSidebarToggle}
        />

        <main className={styles.mainContent}>
          {error && <div className={styles.error}>{error}</div>}

          {/* Tabs */}
          <div className={styles.tabs}>
            <button 
              className={`${styles.tabItem} ${activeView === 'tasks' ? styles.active : ''}`}
              onClick={() => setActiveView('tasks')}
            >
              Tasks
            </button>
            <div className={styles.tabsActions}>
              <button 
                className={styles.tabStyleActionLink}
                onClick={handleAddTask}
              >
                <FiPlusSquare className={styles.actionIcon} />
                Add Task
              </button>
              <button 
                className={styles.iconButton}
                onClick={() => setViewMode(viewMode === 'columns' ? 'grid' : 'columns')}
                title={`Switch to ${viewMode === 'columns' ? 'grid' : 'column'} view`}
              >
                {viewMode === 'columns' ? (
                  <FiGrid className={styles.icon} />
                ) : (
                  <GiHamburgerMenu className={styles.icon} />
                )}
              </button>
            </div>
          </div>

          {/* Main Content */}
          {filteredTasks.length === 0 ? (
            <div className={styles.emptyState}>
              <h3>No tasks found</h3>
              <p>
                {selectedCategory 
                  ? `No tasks found in ${selectedCategory} category.` 
                  : searchTerm 
                  ? `No tasks match "${searchTerm}".`
                  : 'No tasks yet. Create your first task to get started!'
                }
              </p>
              {!searchTerm && (
                <button onClick={handleAddTask} className={styles.actionLink}>
                  <FiPlusSquare className={styles.actionIcon} />
                  Create your first task
                </button>
              )}
            </div>
          ) : (
            <>
              {viewMode === 'columns' ? (
                <div className={styles.statusColumns}>
                  <StatusColumn
                    title="To do"
                    tasks={tasksByStatus.yetToStart}
                    count={tasksByStatus.yetToStart.length}
                    statusColor="var(--secondary-green)"
                    onEdit={handleEdit}
                    onDelete={handleTaskDeleted}
                    onUpdate={handleTaskUpdated}
                  />
                  <StatusColumn
                    title="In Progress"
                    tasks={tasksByStatus.inProgress}
                    count={tasksByStatus.inProgress.length}
                    statusColor="var(--secondary-purple)"
                    onEdit={handleEdit}
                    onDelete={handleTaskDeleted}
                    onUpdate={handleTaskUpdated}
                  />
                  <StatusColumn
                    title="Completed"
                    tasks={tasksByStatus.completed}
                    count={tasksByStatus.completed.length}
                    statusColor="var(--black-100)"
                    onEdit={handleEdit}
                    onDelete={handleTaskDeleted}
                    onUpdate={handleTaskUpdated}
                  />
                </div>
              ) : (
                <div className={styles.tasksGrid}>
                  {filteredTasks.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onEdit={handleEdit}
                      onDelete={handleTaskDeleted}
                      onUpdate={handleTaskUpdated}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </main>

        <footer className={styles.mainFooter}>
          <div className={styles.copyright}>© 2025 Leap</div>
          <div className={styles.footerLinks}>
            {/* <button onClick={(e) => e.preventDefault()}>About</button> */}
            <a href="https://www.linkedin.com/in/antoniosmata/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://github.com/antoniosmata/ToDoListApp" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </footer>
      </div>

      {/* Task Form Modal */}
      {showForm && (
        <div className={styles.formOverlay}>
          <div className={styles.formContainer}>
            <TaskForm
              task={editingTask}
              onSuccess={editingTask ? handleTaskUpdated : handleTaskCreated}
              onCancel={handleCancelForm}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDashboard;