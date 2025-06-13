import React, { useState, useEffect } from 'react';
import { Task, CreateTaskDto, UpdateTaskDto, TASK_CATEGORIES } from '../../types';
import { apiService } from '../../services/api';
import { IoMdCheckmarkCircle, IoMdCheckmarkCircleOutline } from "react-icons/io";
import styles from '../dashboard/Dashboard.module.css';

/**
 * Props for the TaskForm component
 * @interface TaskFormProps
 * @property task - Optional task object for editing (null for creating new task)
 * @property onSuccess - Callback function called when task is successfully created/updated
 * @property onCancel - Callback function called when user cancels the form
 */
interface TaskFormProps {
  task?: Task | null;
  onSuccess: (task: Task) => void;
  onCancel: () => void;
}

/**
 * Form component for creating and editing tasks
 * Handles both create and update operations based on whether a task is provided
 * @param props - Component props
 * @param props.task - Optional task to edit (creates new task if not provided)
 * @param props.onSuccess - Called with the created/updated task on successful submission
 * @param props.onCancel - Called when user cancels the form
 * @returns JSX element representing the task form
 */
const TaskForm: React.FC<TaskFormProps> = ({ task, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Other',
    completed: false,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string>('');

  const isEditing = !!task;

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description || '',
        category: task.category,
        completed: task.completed,
      });
    }
  }, [task]);

  /**
   * Handles form input changes and updates the form state
   * Clears errors when user starts typing
   * @param e - Change event from form inputs
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
    
    if (errors) setErrors('');
  };

  /**
   * Handles form submission for creating or updating a task
   * Validates required fields and calls appropriate API method
   * @param e - Form submission event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      setErrors('Title is required');
      return;
    }

    setLoading(true);
    setErrors('');

    try {
      let result: Task;
      
      if (isEditing && task) {
        const updateData: UpdateTaskDto = {
          title: formData.title.trim(),
          description: formData.description.trim() || undefined,
          category: formData.category,
          completed: formData.completed,
        };
        result = await apiService.updateTask(task.id, updateData);
      } else {
        const createData: CreateTaskDto = {
          title: formData.title.trim(),
          description: formData.description.trim() || undefined,
          category: formData.category,
        };
        result = await apiService.createTask(createData);
      }
      
      onSuccess(result);
    } catch (error: any) {
      setErrors(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2>{isEditing ? 'Edit Task' : 'Create New Task'}</h2>

      {errors && <div className={styles.error}>{errors}</div>}

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="Enter task title"
              maxLength={255}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              disabled={loading}
              placeholder="Enter task description (optional)"
              rows={4}
              maxLength={1000}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              disabled={loading}
            >
              {TASK_CATEGORIES.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {isEditing && (
            <div className={styles.formGroup}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <button
                  type="button"
                  /**
                   * Toggles the task completion status
                   * Creates a synthetic event to reuse the handleChange logic
                   */
                  onClick={() => handleChange({ target: { name: 'completed', type: 'checkbox', checked: !formData.completed } } as any)}
                  disabled={loading}
                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                >
                  {formData.completed ? (
                    <IoMdCheckmarkCircle className={styles.checkmarkIcon} />
                  ) : (
                    <IoMdCheckmarkCircleOutline className={styles.checkmarkIcon} />
                  )}
                </button>
                Mark as completed
              </label>
            </div>
          )}

          <div className={styles.formActions}>
            <button type="button" onClick={onCancel} disabled={loading} className={styles.cancelButton}>
              Cancel
            </button>
            <button type="submit" disabled={loading} className={styles.submitButton}>
              {loading ? 'Saving...' : (isEditing ? 'Update Task' : 'Create Task')}
            </button>
          </div>
        </form>
    </>
  );
};

export default TaskForm;