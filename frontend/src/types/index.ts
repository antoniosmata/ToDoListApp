// User types
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  fullName: string;
}

// Task types
export type TaskStatus = 'todo' | 'in_progress' | 'finished';

export interface Task {
  id: number;
  title: string;
  description?: string;
  category: string;
  status: TaskStatus;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  category: string;
  status?: TaskStatus;
}

export interface UpdateTaskDto {
  title: string;
  description?: string;
  category: string;
  status: TaskStatus;
  completed: boolean;
}

// Auth types
export interface SignUpDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// API Response types
export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

// Task categories
export const TASK_CATEGORIES = ['Work', 'Personal', 'Other'] as const;
export type TaskCategory = typeof TASK_CATEGORIES[number];

// Task status options
export const TASK_STATUSES = {
  TODO: 'todo' as const,
  IN_PROGRESS: 'in_progress' as const,
  FINISHED: 'finished' as const,
} as const;

export const TASK_STATUS_LABELS = {
  [TASK_STATUSES.TODO]: 'To Do',
  [TASK_STATUSES.IN_PROGRESS]: 'In Progress', 
  [TASK_STATUSES.FINISHED]: 'Finished',
} as const;

// Utility function to ensure tasks have a status (for backward compatibility)
export const ensureTaskStatus = (task: Task): Task => {
  if (!task.status) {
    return {
      ...task,
      status: task.completed ? TASK_STATUSES.FINISHED : TASK_STATUSES.TODO,
    };
  }
  return task;
};