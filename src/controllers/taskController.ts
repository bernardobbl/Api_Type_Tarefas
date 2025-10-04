import { Request, Response } from "express";
import { Task } from "../models/Task";

let tasks: Task[] = [
  { id: 1, title: "Primeira tarefa", completed: false, priority: "medium" }
];

// GET /tasks
// GET /tasks (com filtros opcionais)
export const getTasks = (req: Request, res: Response) => {
  const { completed, priority, search } = req.query;

  let result = tasks;

  // filtro por concluído
  if (completed !== undefined) {
    const isCompleted = completed === "true"; // req.query vem como string
    result = result.filter(t => t.completed === isCompleted);
  }

  // filtro por prioridade
  if (priority) {
    result = result.filter(t => t.priority === priority);
  }

  // filtro por texto no título
  if (search) {
    const searchTerm = String(search).toLowerCase();
    result = result.filter(t => t.title.toLowerCase().includes(searchTerm));
  }

  res.json(result);
};


// POST /tasks
export const createTask = (req: Request, res: Response) => {
  const { title, priority } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Título é obrigatório" });
  }


  let nextTaskId = 1;
  const newTask: Task = {
    id: nextTaskId,
    title,
    completed: false,
    priority: priority || "medium"
  };

  nextTaskId++;

  tasks.push(newTask);
  res.status(201).json(newTask);
};

// PATCH /tasks/:id/complete
export const toggleComplete = (req: Request, res: Response) => {
  const task = tasks.find(t => t.id === Number(req.params.id));
  if (!task) {
    return res.status(404).json({ message: "Task não encontrada" });
  }

  task.completed = !task.completed;
  res.json(task);
};

// PUT /tasks/:id
export const updateTask = (req: Request, res: Response) => {
  const task = tasks.find(t => t.id === Number(req.params.id));
  if (!task) {
    return res.status(404).json({ message: "Task não encontrada" });
  }

  const { title, completed, priority } = req.body;
  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;
  if (priority !== undefined) task.priority = priority;

  res.json(task);
};

// DELETE /tasks/:id
export const deleteTask = (req: Request, res: Response) => {
  const taskDelete: number = parseInt(req.params.id);

  const index = tasks.findIndex(t => t.id === taskDelete);
  if(index === -1) {
    return res.status(404).json({message: "Tarefa não encontrada."});
  }

  tasks.splice(index,1);

  res.status(204).send();
};
