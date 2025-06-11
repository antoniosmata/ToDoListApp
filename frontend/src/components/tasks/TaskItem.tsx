import React, { useState } from 'react';
import { Task } from '../../types';
import { apiService } from '../../services/api';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
  onUpdate: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete, onUpdate }) => {
  const [loading, setLoading] = useState(false);

  const handleToggleComplete = async () => {
    try {
      setLoading(true);
      const updatedTask = await apiService.updateTask(task.id, {
        ...task,
        completed: !task.completed,
      });
      onUpdate(updatedTask);
    } catch (error) {
      console.error('Failed to update task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      setLoading(true);
      await apiService.deleteTask(task.id);
      onDelete(task.id);
    } catch (error) {
      console.error('Failed to delete task:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className={`task-card ${task.completed ? 'completed' : ''}`}>
      <div className="task-header">
        <div className="task-checkbox">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggleComplete}
            disabled={loading}
          />
        </div>
        <span className={`task-category category-${task.category.toLowerCase()}`}>
          {task.category}
        </span>
      </div>

      <div className="task-content">
        <h3 className="task-title">{task.title}</h3>
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
      </div>

      <div className="task-footer">
        <div className="task-dates">
          <small>Created: {formatDate(task.createdAt)}</small>
          {task.updatedAt !== task.createdAt && (
            <small>Updated: {formatDate(task.updatedAt)}</small>
          )}
        </div>

        <div className="task-actions">
          <button
            onClick={() => onEdit(task)}
            disabled={loading}
            className="edit-button"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="delete-button"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;