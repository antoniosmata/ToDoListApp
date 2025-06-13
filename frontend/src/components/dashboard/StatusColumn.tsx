import React from 'react';
import { Task } from '../../types';
import TaskCard from './TaskCard';
import styles from './Dashboard.module.css';

/**
 * Props for the StatusColumn component
 * @interface StatusColumnProps
 * @property title - Column title (e.g., "To Do", "In Progress", "Completed")
 * @property tasks - Array of tasks to display in this column
 * @property count - Number of tasks in this column
 * @property statusColor - CSS color value for the status indicator
 * @property onEdit - Callback when a task edit is requested
 * @property onDelete - Callback when a task is deleted
 * @property onUpdate - Callback when a task is updated
 */
interface StatusColumnProps {
  title: string;
  tasks: Task[];
  count: number;
  statusColor: string;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
  onUpdate: (task: Task) => void;
}

/**
 * Column component for displaying tasks grouped by status
 * Used in the column view of the task dashboard
 * @param props - Component props
 * @param props.title - Column header title
 * @param props.tasks - Tasks to display in this column
 * @param props.count - Task count for display
 * @param props.statusColor - Color for the status indicator
 * @param props.onEdit - Called when task edit is requested
 * @param props.onDelete - Called when task is deleted
 * @param props.onUpdate - Called when task is updated
 * @returns JSX element representing a status column
 */
const StatusColumn: React.FC<StatusColumnProps> = ({
  title,
  tasks,
  count,
  statusColor,
  onEdit,
  onDelete,
  onUpdate,
}) => {
  return (
    <div className={styles.statusColumn}>
      <h3>
        {title} <span className={styles.count}>{count}</span>
      </h3>
      <div 
        className={styles.statusIndicator} 
        style={{ '--status-color': statusColor } as React.CSSProperties}
      ></div>
      
      {tasks.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No tasks in this status</p>
        </div>
      ) : (
        <div className={styles.tasksGrid}>
          {tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusColumn;