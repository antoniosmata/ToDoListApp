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
export interface Task {
  id: number;
  title: string;
  description?: string;
  category: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  category: string;
}

export interface UpdateTaskDto {
  title: string;
  description?: string;
  category: string;
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