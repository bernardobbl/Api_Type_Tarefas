export interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  categoryId?: number; // referencia a categoria
}
