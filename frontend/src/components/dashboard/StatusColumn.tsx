import React from 'react';
import { Task } from '../../types';
import TaskCard from './TaskCard';
import styles from './Dashboard.module.css';

interface StatusColumnProps {
  title: string;
  tasks: Task[];
  count: number;
  statusColor: string;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
  onUpdate: (task: Task) => void;
}

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