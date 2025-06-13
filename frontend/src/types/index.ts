/**
 * Represents a user in the task management system
 * @interface User
 * @property id - Unique identifier for the user
 * @property firstName - User's first name
 * @property lastName - User's last name
 * @property email - User's email address (used for authentication)
 * @property createdAt - ISO timestamp when user account was created
 * @property fullName - Computed full name combining first and last name
 */
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  fullName: string;
}

/**
 * Represents a task in the task management system
 * @interface Task
 * @property id - Unique identifier for the task
 * @property title - The task title/name
 * @property description - Optional detailed description of the task
 * @property category - Task category (Work, Personal, Other)
 * @property completed - Whether the task has been completed
 * @property createdAt - ISO timestamp when task was created
 * @property updatedAt - ISO timestamp when task was last modified
 */
export interface Task {
  id: number;
  title: string;
  description?: string;
  category: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Data transfer object for creating a new task
 * @interface CreateTaskDto
 * @property title - The task title/name (required)
 * @property description - Optional detailed description of the task
 * @property category - Task category (Work, Personal, Other)
 */
export interface CreateTaskDto {
  title: string;
  description?: string;
  category: string;
}

/**
 * Data transfer object for updating an existing task
 * @interface UpdateTaskDto
 * @property title - The updated task title/name
 * @property description - Optional updated description of the task
 * @property category - Updated task category (Work, Personal, Other)
 * @property completed - Updated completion status of the task
 */
export interface UpdateTaskDto {
  title: string;
  description?: string;
  category: string;
  completed: boolean;
}

/**
 * Data transfer object for user registration
 * @interface SignUpDto
 * @property firstName - User's first name
 * @property lastName - User's last name
 * @property email - User's email address (must be unique)
 * @property password - User's password (will be hashed before storage)
 */
export interface SignUpDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

/**
 * Data transfer object for user authentication
 * @interface SignInDto
 * @property email - User's email address
 * @property password - User's plain text password
 */
export interface SignInDto {
  email: string;
  password: string;
}

/**
 * Response object returned after successful authentication
 * @interface AuthResponse
 * @property token - JWT access token for authenticated requests
 * @property user - User information object
 */
export interface AuthResponse {
  token: string;
  user: User;
}

/**
 * Standardized error response from API endpoints
 * @interface ApiError
 * @property message - General error message
 * @property errors - Optional field-specific validation errors
 */
export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

/**
 * Available task categories as a readonly array
 * @constant TASK_CATEGORIES
 */
export const TASK_CATEGORIES = ['Work', 'Personal', 'Other'] as const;

/**
 * Type representing valid task category values
 * @type TaskCategory
 */
export type TaskCategory = typeof TASK_CATEGORIES[number];