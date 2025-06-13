import React, { useState } from 'react';
import { Task, TaskStatus, TASK_STATUSES, TASK_STATUS_LABELS, ensureTaskStatus } from '../../types';
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
  
  // Ensure task has status for backward compatibility
  const taskWithStatus = ensureTaskStatus(task);

  const handleToggleComplete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent card click
    try {
      setLoading(true);
      const newStatus = taskWithStatus.completed ? TASK_STATUSES.TODO : TASK_STATUSES.FINISHED;
      const updatedTask = await apiService.updateTask(taskWithStatus.id, {
        ...taskWithStatus,
        status: newStatus,
        completed: !taskWithStatus.completed,
      });
      onUpdate(updatedTask);
    } catch (error) {
      console.error('Failed to update task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: TaskStatus) => {
    try {
      setLoading(true);
      const updatedTask = await apiService.updateTask(taskWithStatus.id, {
        ...taskWithStatus,
        status: newStatus,
        completed: newStatus === TASK_STATUSES.FINISHED,
      });
      onUpdate(updatedTask);
    } catch (error) {
      console.error('Failed to update task status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(taskWithStatus);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      setLoading(true);
      await apiService.deleteTask(taskWithStatus.id);
      onDelete(taskWithStatus.id);
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
    <article className={`${styles.taskCard} ${taskWithStatus.completed ? styles.completed : ''}`}>
      <div className={styles.cardHeader}>
        <span className={`${styles.tag} ${styles[getCategoryClass(taskWithStatus.category)]}`}>
          {taskWithStatus.category}
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
      
      <h4 className={styles.taskTitle}>{taskWithStatus.title}</h4>
      
      {taskWithStatus.description && (
        <p className={styles.taskDescription}>{taskWithStatus.description}</p>
      )}
      
      {/* Status Buttons */}
      <div className={styles.statusButtons}>
        {Object.values(TASK_STATUSES).map((status) => (
          <button
            key={status}
            onClick={() => handleStatusChange(status)}
            disabled={loading}
            className={`${styles.statusButton} ${
              taskWithStatus.status === status ? styles.statusButtonActive : ''
            } ${styles[`status${status.charAt(0).toUpperCase()}${status.slice(1).replace('_', '')}`]}`}
            title={`Set status to ${TASK_STATUS_LABELS[status]}`}
          >
            {TASK_STATUS_LABELS[status]}
          </button>
        ))}
      </div>

      <div className={styles.cardFooter}>
        <div className={styles.cardMeta}>
          <button
            onClick={handleToggleComplete}
            disabled={loading}
            className={styles.checkmarkButton}
            title={taskWithStatus.completed ? 'Mark as incomplete' : 'Mark as complete'}
          >
            {taskWithStatus.completed ? (
              <IoMdCheckmarkCircle className={styles.checkmarkIcon} />
            ) : (
              <IoMdCheckmarkCircleOutline className={styles.checkmarkIcon} />
            )}
          </button>
          <div className={styles.dates}>
            <div>Created: {formatDate(taskWithStatus.createdAt)}</div>
            {taskWithStatus.updatedAt !== taskWithStatus.createdAt && (
              <div>Updated: {formatDate(taskWithStatus.updatedAt)}</div>
            )}
          </div>
        </div>
        
        <div className={styles.stats}>
          <span title="Task ID">#{taskWithStatus.id}</span>
        </div>
      </div>
    </article>
  );
};

export default TaskCard;