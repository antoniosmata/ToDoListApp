import React, { useState } from 'react';
import { Task } from '../../types';
import { apiService } from '../../services/api';
import { IoMdCheckmarkCircleOutline, IoMdCheckmarkCircle } from "react-icons/io";
import { HiPencil } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import styles from './Dashboard.module.css';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
  onUpdate: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete, onUpdate }) => {
  const [loading, setLoading] = useState(false);

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