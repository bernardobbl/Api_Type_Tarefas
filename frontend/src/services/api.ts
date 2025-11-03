import axios from 'axios';
import type { LoginCredentials, RegisterData, Task, Category, User } from '../types';

const API_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token nas requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para lidar com erros de autenticação
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  login: async (credentials: LoginCredentials) => {
    const response = await api.post('/login', credentials);
    return response.data;
  },
  register: async (data: RegisterData) => {
    const response = await api.post('/users', data);
    return response.data;
  },
};

// Tasks API
export const tasksApi = {
  getAll: async (query?: any) => {
    const response = await api.get('/tasks', { params: query });
    return response.data;
  },
  create: async (task: { title: string; priority?: string; categoryId?: number }) => {
    const response = await api.post('/tasks', task);
    return response.data;
  },
  update: async (id: number, task: Partial<Task>) => {
    const response = await api.put(`/tasks/${id}`, task);
    return response.data;
  },
  toggleComplete: async (id: number) => {
    const response = await api.patch(`/tasks/${id}/complete`);
    return response.data;
  },
  delete: async (id: number) => {
    await api.delete(`/tasks/${id}`);
  },
};

// Categories API
export const categoriesApi = {
  getAll: async () => {
    const response = await api.get('/categories');
    return response.data;
  },
  create: async (name: string) => {
    const response = await api.post('/categories', { name });
    return response.data;
  },
  update: async (id: number, name: string) => {
    const response = await api.put(`/categories/${id}`, { name });
    return response.data;
  },
  delete: async (id: number) => {
    await api.delete(`/categories/${id}`);
  },
};

// Users API
export const usersApi = {
  getAll: async () => {
    const response = await api.get('/users');
    return response.data;
  },
  update: async (id: number, data: Partial<User>) => {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  },
  delete: async (id: number) => {
    await api.delete(`/users/${id}`);
  },
};

