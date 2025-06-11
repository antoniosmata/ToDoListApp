import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { AuthResponse, SignInDto, SignUpDto, Task, CreateTaskDto, UpdateTaskDto } from '../types';

class ApiService {
  private api: AxiosInstance;

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

  // Auth endpoints
  async signUp(data: SignUpDto): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await this.api.post('/auth/signup', data);
    return response.data;
  }

  async signIn(data: SignInDto): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await this.api.post('/auth/signin', data);
    return response.data;
  }

  async signOut(): Promise<void> {
    await this.api.post('/auth/signout');
  }

  // Task endpoints
  async getTasks(category?: string): Promise<Task[]> {
    const params = category ? { category } : {};
    const response: AxiosResponse<Task[]> = await this.api.get('/tasks', { params });
    return response.data;
  }

  async getTask(id: number): Promise<Task> {
    const response: AxiosResponse<Task> = await this.api.get(`/tasks/${id}`);
    return response.data;
  }

  async createTask(data: CreateTaskDto): Promise<Task> {
    const response: AxiosResponse<Task> = await this.api.post('/tasks', data);
    return response.data;
  }

  async updateTask(id: number, data: UpdateTaskDto): Promise<Task> {
    const response: AxiosResponse<Task> = await this.api.put(`/tasks/${id}`, data);
    return response.data;
  }

  async deleteTask(id: number): Promise<void> {
    await this.api.delete(`/tasks/${id}`);
  }
}

export const apiService = new ApiService();