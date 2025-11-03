import { Request, Response } from "express";
import { taskService } from "../services/taskService";

// GET /tasks
export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await taskService.getTasks(req.query);
    res.status(200).json(tasks);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(400).json({ message: errorMessage });
  }
};


// POST /tasks
export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, priority, categoryId } = req.body;
    const userId = req.userId;

    if(!userId) {
      return res.status(401).json({ message: "Usuário não autenticado." });
    }
    const newTask = await taskService.createTask({ title, priority, categoryId }, userId);
    res.status(201).json(newTask);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(400).json({ message: errorMessage });
  }
};

// PATCH /tasks/:id/complete
export const toggleComplete = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const updatedTask = await taskService.toggleComplete(id);
    res.status(200).json(updatedTask);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(404).json({ message: errorMessage });
  }
};

// PUT /tasks/:id
export const updateTask = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const updated = await taskService.updateTask(id, req.body);
    res.status(200).json(updated);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(404).json({ message: errorMessage });
  }
};

// DELETE /tasks/:id
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await taskService.deleteTask(id);
    res.status(204).send();
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(404).json({ message: errorMessage });
  }
};

// Export all controller functions as an object
export const taskController = {
  getTasks,
  createTask,
  toggleComplete,
  updateTask,
  deleteTask
};
