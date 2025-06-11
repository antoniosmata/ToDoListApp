import React, { useState, useEffect } from 'react';
import { Task, TASK_CATEGORIES } from '../../types';
import { apiService } from '../../services/api';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    // Filter tasks based on selected category
    if (selectedCategory) {
      setFilteredTasks(tasks.filter(task => task.category === selectedCategory));
    } else {
      setFilteredTasks(tasks);
    }
  }, [tasks, selectedCategory]);

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

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading tasks...</p>
      </div>
    );
  }

  return (
    <div className="tasks-container">
      <div className="tasks-header">
        <h1>My Tasks</h1>
        <button 
          onClick={() => setShowForm(true)} 
          className="create-button"
          disabled={showForm}
        >
          + Create Task
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {/* Task Form */}
      {showForm && (
        <TaskForm
          task={editingTask}
          onSuccess={editingTask ? handleTaskUpdated : handleTaskCreated}
          onCancel={handleCancelForm}
        />
      )}

      {/* Filter Controls */}
      <div className="task-filters">
        <label htmlFor="category-filter">Filter by category:</label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          <option value="">All Categories</option>
          {TASK_CATEGORIES.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Tasks Display */}
      {filteredTasks.length === 0 ? (
        <div className="empty-state">
          <p>
            {selectedCategory 
              ? `No tasks found in ${selectedCategory} category.` 
              : 'No tasks yet. Create your first task to get started!'
            }
          </p>
        </div>
      ) : (
        <div className="tasks-grid">
          {filteredTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={handleEdit}
              onDelete={handleTaskDeleted}
              onUpdate={handleTaskUpdated}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;