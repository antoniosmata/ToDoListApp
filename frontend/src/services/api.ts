import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { AuthResponse, SignInDto, SignUpDto, Task, CreateTaskDto, UpdateTaskDto } from '../types';

/**
 * Service class for handling all API communications
 * Manages authentication, task operations, and automatic token handling
 * @class ApiService
 */
class ApiService {
  private api: AxiosInstance;

  /**
   * Creates an instance of ApiService
   * Sets up axios instance with base configuration and interceptors
   */
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle auth errors
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Remove invalid token and redirect to login
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/signin';
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Registers a new user account
   * @param data - User registration data
   * @returns Promise resolving to authentication response with token and user info
   * @throws {AxiosError} When registration fails
   */
  async signUp(data: SignUpDto): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await this.api.post('/auth/signup', data);
    return response.data;
  }

  /**
   * Authenticates a user with email and password
   * @param data - User sign-in credentials
   * @returns Promise resolving to authentication response with token and user info
   * @throws {AxiosError} When authentication fails
   */
  async signIn(data: SignInDto): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await this.api.post('/auth/signin', data);
    return response.data;
  }

  /**
   * Signs out the current user
   * Calls the server to invalidate the session
   * @returns Promise that resolves when sign out is complete
   * @throws {AxiosError} When sign out request fails
   */
  async signOut(): Promise<void> {
    await this.api.post('/auth/signout');
  }

  /**
   * Retrieves all tasks for the authenticated user
   * @param category - Optional category filter
   * @returns Promise resolving to array of tasks
   * @throws {AxiosError} When request fails
   */
  async getTasks(category?: string): Promise<Task[]> {
    const params = category ? { category } : {};
    const response: AxiosResponse<Task[]> = await this.api.get('/tasks', { params });
    return response.data;
  }

  /**
   * Retrieves a specific task by ID
   * @param id - Task ID to retrieve
   * @returns Promise resolving to the task object
   * @throws {AxiosError} When task not found or request fails
   */
  async getTask(id: number): Promise<Task> {
    const response: AxiosResponse<Task> = await this.api.get(`/tasks/${id}`);
    return response.data;
  }

  /**
   * Creates a new task
   * @param data - Task creation data
   * @returns Promise resolving to the created task object
   * @throws {AxiosError} When creation fails or validation errors occur
   */
  async createTask(data: CreateTaskDto): Promise<Task> {
    const response: AxiosResponse<Task> = await this.api.post('/tasks', data);
    return response.data;
  }

  /**
   * Updates an existing task
   * @param id - Task ID to update
   * @param data - Updated task data
   * @returns Promise resolving to the updated task object
   * @throws {AxiosError} When update fails or task not found
   */
  async updateTask(id: number, data: UpdateTaskDto): Promise<Task> {
    const response: AxiosResponse<Task> = await this.api.put(`/tasks/${id}`, data);
    return response.data;
  }

  /**
   * Deletes a task by ID
   * @param id - Task ID to delete
   * @returns Promise that resolves when deletion is complete
   * @throws {AxiosError} When deletion fails or task not found
   */
  async deleteTask(id: number): Promise<void> {
    await this.api.delete(`/tasks/${id}`);
  }

  /**
   * Validates the current user session
   * @returns Promise resolving to session validation result
   * @returns Promise<{valid: boolean, serverStartTime?: string}>
   * @throws {AxiosError} When validation request fails (non-401 errors)
   */
  async validateSession(): Promise<{ valid: boolean; serverStartTime?: string }> {
    try {
      const response: AxiosResponse<{ valid: boolean; serverStartTime: string }> = await this.api.get('/auth/validate-session');
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        return { valid: false };
      }
      throw error;
    }
  }

  /**
   * Retrieves server health status and start time
   * @returns Promise resolving to server health information
   * @throws {AxiosError} When health check request fails
   */
  async getServerHealth(): Promise<{ serverStartTime: string; status: string }> {
    const response: AxiosResponse<{ serverStartTime: string; status: string }> = await this.api.get('/health');
    return response.data;
  }
}

/**
 * Singleton instance of ApiService for use throughout the application
 * @constant apiService
 */
export const apiService = new ApiService();