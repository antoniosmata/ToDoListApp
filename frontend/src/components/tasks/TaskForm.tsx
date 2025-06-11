import React, { useState, useEffect } from 'react';
import { Task, CreateTaskDto, UpdateTaskDto, TASK_CATEGORIES } from '../../types';
import { apiService } from '../../services/api';

interface TaskFormProps {
  task?: Task | null;
  onSuccess: (task: Task) => void;
  onCancel: () => void;
}

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
    
    if (errors) setErrors('');
  };

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
    <div className="task-form-overlay">
      <div className="task-form-container">
        <h2>{isEditing ? 'Edit Task' : 'Create New Task'}</h2>

        {errors && <div className="error-message">{errors}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
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

          <div className="form-group">
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

          <div className="form-group">
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
            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="completed"
                  checked={formData.completed}
                  onChange={handleChange}
                  disabled={loading}
                />
                Mark as completed
              </label>
            </div>
          )}

          <div className="form-actions">
            <button type="button" onClick={onCancel} disabled={loading} className="cancel-button">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="submit-button">
              {loading ? 'Saving...' : (isEditing ? 'Update Task' : 'Create Task')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;