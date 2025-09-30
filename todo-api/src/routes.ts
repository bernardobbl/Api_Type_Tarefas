import { Router } from "express";
import { getCategories, createCategory } from "./controllers/categoryController";
import { getTasks, createTask, updateTask, toggleComplete, deleteTask } from "./controllers/taskController";

const router = Router();

// tasks
router.get("/tasks", getTasks);
router.post("/tasks", createTask);
router.put("/tasks/:id", updateTask);
router.patch("/tasks/:id/complete", toggleComplete); // 👈 aqui ajustado

// categories
router.get("/categories", getCategories);
router.post("/categories", createCategory);

export default router;
