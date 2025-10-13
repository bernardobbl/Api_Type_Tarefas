import { prisma } from "../database/prisma";
import { Priority } from "@prisma/client";

export const taskService = {
  // Busca todas as tasks
  async getTasks(filters: { completed?: string; priority?: string; search?: string }) {
      const { completed, priority, search } = filters;

      const where: any = {};

      if (completed !== undefined) {
        where.completed = completed === "true";
      }

      if (priority) {
        where.priority = priority.toUpperCase();
      }

      if (search) {
        where.title = { contains: search, mode: "insensitive" };
      }

      const tasks = await prisma.task.findMany({
        where,
        include: { category: true },
        orderBy: { createdAt: "desc" },
      });

      return tasks.map((t: any) => ({
        ...t,
        priority: t.priority.toLowerCase(),
      }));
    },

    // Cria uma nova task
  async createTask(data: { title: string; priority?: string; categoryId?: number }) {
      const { title, priority, categoryId } = data;

      if (!title) throw new Error("Título é obrigatório");

      return prisma.task.create({
        data: {
          title,
          priority: (priority?.toUpperCase() as Priority) || "MEDIUM",
          categoryId: categoryId || undefined,
          userId: 1, // Temporário - deve vir do contexto de autenticação
        },
      });
    },

  // Concluir tarefa
  async toggleComplete(id: number) {
      const task = await prisma.task.findUnique({ where: { id } });
      if (!task) throw new Error("Tarefa não encontrada");

      return prisma.task.update({
        where: { id },
        data: { completed: !task.completed },
      });
  },

  // Atualiza uma task
  async updateTask(
      id: number,
      data: { title?: string; completed?: boolean; priority?: string; categoryId?: number }
    ) {
      const task = await prisma.task.findUnique({ where: { id } });
      if (!task) throw new Error("Tarefa não encontrada");

      return prisma.task.update({
        where: { id },
        data: {
          title: data.title ?? task.title,
          completed: data.completed ?? task.completed,
          priority: (data.priority?.toUpperCase() as Priority) ?? task.priority,
          categoryId: data.categoryId ?? task.categoryId,
        },
      });
  },

  // Deleta uma task
  async deleteTask(id: number) {
      const task = await prisma.task.findUnique({ where: { id } });
      if (!task) throw new Error("Tarefa não encontrada");

      await prisma.task.delete({ where: { id } });
      return;
    }
};
