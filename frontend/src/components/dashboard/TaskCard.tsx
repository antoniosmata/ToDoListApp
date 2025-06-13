import React, { useState } from 'react';
import { Task } from '../../types';
import { apiService } from '../../services/api';
import { IoMdCheckmarkCircleOutline, IoMdCheckmarkCircle } from "react-icons/io";
import { HiPencil } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import styles from './Dashboard.module.css';

/**
 * Props for the TaskCard component
 * @interface TaskCardProps
 * @property task - The task object to display
 * @property onEdit - Callback function called when user clicks edit button
 * @property onDelete - Callback function called when task is successfully deleted
 * @property onUpdate - Callback function called when task is successfully updated
 */
interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
  onUpdate: (task: Task) => void;
}

/**
 * Card component that displays a single task with interactive controls
 * Shows task details, completion status, and provides edit/delete actions
 * @param props - Component props
 * @param props.task - Task object containing all task data
 * @param props.onEdit - Called when user clicks the edit button
 * @param props.onDelete - Called after successful task deletion
 * @param props.onUpdate - Called after successful task update
 * @returns JSX element representing the task card
 */
const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete, onUpdate }) => {
  const [loading, setLoading] = useState(false);

  /**
   * Toggles the completion status of the task
   * Updates the task via API and calls onUpdate with the result
   * @param e - Click event from the completion toggle button
   */
  const handleToggleComplete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent card click
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
   * Handles edit button click and prevents event bubbling
   * @param e - Click event from the edit button
   */
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(task);
  };

  /**
   * Handles task deletion with user confirmation
   * Shows confirmation dialog and deletes task via API
   * @param e - Click event from the delete button
   */
  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
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
   * @returns Formatted date string (e.g., "Jan 15")
   */
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  /**
   * Converts category name to CSS class name
   * Removes spaces and converts to lowercase for consistent styling
   * @param category - Task category name
   * @returns CSS class name for the category
   */
  const getCategoryClass = (category: string) => {
    return category.toLowerCase().replace(/\s+/g, '');
  };

  return (
    <article className={`${styles.taskCard} ${task.completed ? styles.completed : ''}`}>
      <div className={styles.cardHeader}>
        <span className={`${styles.tag} ${styles[getCategoryClass(task.category)]}`}>
          {task.category}
        </span>
        <div className={styles.taskActions}>
          <button
            onClick={handleEdit}
            disabled={loading}
            className={styles.actionButton}
            title="Edit task"
          >
            <HiPencil className={styles.icon} />
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className={styles.actionButton}
            title="Delete task"
          >
            <MdDelete className={styles.icon} />
          </button>
        </div>
      </div>
      
      <h4 className={styles.taskTitle}>{task.title}</h4>
      
      {task.description && (
        <p className={styles.taskDescription}>{task.description}</p>
      )}
      
      <div className={styles.cardFooter}>
        <div className={styles.cardMeta}>
          <button
            onClick={handleToggleComplete}
            disabled={loading}
            className={styles.checkmarkButton}
            title={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
          >
            {task.completed ? (
              <IoMdCheckmarkCircle className={styles.checkmarkIcon} />
            ) : (
              <IoMdCheckmarkCircleOutline className={styles.checkmarkIcon} />
            )}
          </button>
          <div className={styles.dates}>
            <div>Created: {formatDate(task.createdAt)}</div>
            {task.updatedAt !== task.createdAt && (
              <div>Updated: {formatDate(task.updatedAt)}</div>
            )}
          </div>
        </div>
        
        <div className={styles.stats}>
          <span title="Task ID">#{task.id}</span>
        </div>
      </div>
    </article>
  );
};

export default TaskCard;