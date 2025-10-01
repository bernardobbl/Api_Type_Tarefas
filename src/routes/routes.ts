import { Router } from "express";
import { getCategories, createCategory, updateCategory, deleteCategory } from "../controllers/categoryController";
import { getTasks, createTask, updateTask, toggleComplete, deleteTask } from "../controllers/taskController";

const router = Router();

// tasks
router.get("/tasks", getTasks);
router.post("/tasks", createTask);
router.put("/tasks/:id", updateTask);
router.patch("/tasks/:id/complete", toggleComplete); // 👈 aqui ajustado

// categories
router.get("/categories", getCategories);
router.post("/categories", createCategory);
router.put("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory);

export default router;
