import { Request, Response } from "express";
import { taskService } from "../services/taskService";

// GET /tasks
export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await taskService.getTasks(req.query);
    res.status(200).json(tasks);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};


// POST /tasks
export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, priority, categoryId } = req.body;
    const newTask = await taskService.createTask({ title, priority, categoryId });
    res.status(201).json(newTask);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// PATCH /tasks/:id/complete
export const toggleComplete = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const updatedTask = await taskService.toggleComplete(id);
    res.status(200).json(updatedTask);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

// PUT /tasks/:id
export const updateTask = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const updated = await taskService.updateTask(id, req.body);
    res.status(200).json(updated);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

// DELETE /tasks/:id
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await taskService.deleteTask(id);
    res.status(204).send();
  } catch (error: any) {
    res.status(404).json({ message: error.message });
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
