import request from 'supertest';
import express from 'express';
import { getTasks, createTask } from '../../controllers/taskController';

// Mock the task service
jest.mock('../../services/taskService', () => ({
  taskService: {
    getTasks: jest.fn(),
    createTask: jest.fn(),
  },
}));

const app = express();
app.use(express.json());

// Middleware para simular autenticação nos testes
app.use((req, res, next) => {
  req.userId = 1; // Simula usuário autenticado
  next();
});

app.get('/api/tasks', getTasks);
app.post('/api/tasks', createTask);

describe('Task Controller', () => {
  describe('GET /api/tasks', () => {
    it('should return all tasks', async () => {
      const mockTasks = [
        { id: 1, title: 'Test Task 1', completed: false },
        { id: 2, title: 'Test Task 2', completed: true },
      ];

      const { taskService } = require('../../services/taskService');
      taskService.getTasks.mockResolvedValue(mockTasks);

      const response = await request(app)
        .get('/api/tasks')
        .expect(200);

      expect(response.body).toEqual(mockTasks);
      expect(taskService.getTasks).toHaveBeenCalledTimes(1);
    });

    it('should handle errors when getting tasks', async () => {
      const { taskService } = require('../../services/taskService');
      taskService.getTasks.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .get('/api/tasks')
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });
  });

  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const newTask = { title: 'New Task', priority: 'MEDIUM', categoryId: 1 };
      const createdTask = { id: 1, ...newTask, completed: false };

      const { taskService } = require('../../services/taskService');
      taskService.createTask.mockResolvedValue(createdTask);

      const response = await request(app)
        .post('/api/tasks')
        .send(newTask)
        .expect(201);

      expect(response.body).toEqual(createdTask);
      expect(taskService.createTask).toHaveBeenCalledWith(newTask, 1);
    });

    it('should validate required fields', async () => {
      const invalidTask = { description: 'Missing title' };
      
      // Mock service to throw error for missing title
      const { taskService } = require('../../services/taskService');
      taskService.createTask.mockRejectedValue(new Error('Título é obrigatório'));

      const response = await request(app)
        .post('/api/tasks')
        .send(invalidTask)
        .expect(400);

      expect(response.body).toHaveProperty('message');
      expect(taskService.createTask).toHaveBeenCalledWith(
        { title: undefined, priority: undefined, categoryId: undefined }, 
        1
      );
    });
  });
});
