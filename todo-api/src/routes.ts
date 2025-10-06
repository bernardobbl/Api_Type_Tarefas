import { Router } from "express";
import { 
  getCategories, 
  createCategory, 
  updateCategory, 
  deleteCategory,
  toggleArchiveCategory,
  setDefaultCategory,
  reorderCategories,
  getCategoryStats
} from "./controllers/categoryController";
import { 
  getTasks, 
  createTask, 
  updateTask, 
  toggleComplete, 
  deleteTask 
} from "./controllers/taskController";

const router = Router();

// Tasks routes
router.get("/tasks", getTasks);
router.post("/tasks", createTask);
router.put("/tasks/:id", updateTask);
router.patch("/tasks/:id/complete", toggleComplete);
router.delete("/tasks/:id", deleteTask);

// Categories routes - CRUD básico
router.get("/categories", getCategories);
router.post("/categories", createCategory);
router.put("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory);

// Categories routes - Funcionalidades avançadas
router.patch("/categories/:id/archive", toggleArchiveCategory);
router.patch("/categories/:id/default", setDefaultCategory);
router.patch("/categories/reorder", reorderCategories);
router.get("/categories/stats", getCategoryStats);

export default router;
