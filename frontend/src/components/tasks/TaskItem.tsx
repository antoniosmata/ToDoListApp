import React, { useState } from 'react';
import { Task } from '../../types';
import { apiService } from '../../services/api';

/**
 * Props for the TaskItem component
 * @interface TaskItemProps
 * @property task - Task object to display
 * @property onEdit - Callback function when task edit is requested
 * @property onDelete - Callback function when task is deleted
 * @property onUpdate - Callback function when task is updated
 */
interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
  onUpdate: (task: Task) => void;
}

/**
 * Individual task item component that displays task details and actions
 * Features completion toggle, edit/delete actions, and formatted display
 * Used within task lists to show individual task information
 * @param props - Component props
 * @param props.task - Task data to display
 * @param props.onEdit - Called when user wants to edit the task
 * @param props.onDelete - Called when task is successfully deleted
 * @param props.onUpdate - Called when task is successfully updated
 * @returns JSX element representing a single task item
 */
const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete, onUpdate }) => {
  const [loading, setLoading] = useState(false);

  /**
   * Toggles the completion status of the task
   * Updates the task via API and calls onUpdate with the result
   */
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

  /**
   * Handles task deletion with user confirmation
   * Shows confirmation dialog before proceeding with deletion
   */
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

  /**
   * Formats ISO date string to a readable format
   * @param dateString - ISO date string to format
   * @returns Formatted date string (e.g., "Jan 15, 2023")
   */
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