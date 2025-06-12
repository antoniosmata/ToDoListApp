import React, { useState } from 'react';
import { Task } from '../../types';
import { apiService } from '../../services/api';
import styles from './Dashboard.module.css';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
  onUpdate: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete, onUpdate }) => {
  const [loading, setLoading] = useState(false);

  const handleToggleComplete = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(task);
  };

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

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
            <svg className={styles.icon} viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className={styles.actionButton}
            title="Delete task"
          >
            <svg className={styles.icon} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 102 0v3a1 1 0 11-2 0V9zm4 0a1 1 0 10-2 0v3a1 1 0 102 0V9z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      <h4 className={styles.taskTitle}>{task.title}</h4>
      
      {task.description && (
        <p className={styles.taskDescription}>{task.description}</p>
      )}
      
      <div className={styles.cardFooter}>
        <div className={styles.cardMeta}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggleComplete}
            disabled={loading}
            className={styles.checkbox}
            title={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
          />
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