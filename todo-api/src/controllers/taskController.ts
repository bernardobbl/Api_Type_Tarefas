import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

// GET /tasks
// GET /tasks (com filtros opcionais)
export const getTasks = async (req: Request, res: Response) => {
  try {
    const { completed, priority, search, categoryId, userId } = req.query;

    // Construir filtros dinamicamente
    const where: any = {};

    // Filtro por usuário (obrigatório para segurança)
    if (userId) {
      where.userId = parseInt(userId as string);
    }

    // Filtro por concluído
    if (completed !== undefined) {
      where.completed = completed === "true";
    }

    // Filtro por prioridade
    if (priority) {
      where.priority = priority;
    }

    // Filtro por categoria
    if (categoryId) {
      where.categoryId = parseInt(categoryId as string);
    }

    // Filtro por texto no título
    if (search) {
      where.title = {
        contains: search as string,
        mode: 'insensitive'
      };
    }

    const tasks = await prisma.task.findMany({
      where,
      include: {
        category: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(tasks);
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};


// POST /tasks
export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, priority, categoryId, userId, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Título é obrigatório" });
    }

    if (!userId) {
      return res.status(400).json({ message: "ID do usuário é obrigatório" });
    }

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        priority: priority || "MEDIUM",
        categoryId: categoryId ? parseInt(categoryId) : null,
        userId: parseInt(userId),
        dueDate: dueDate ? new Date(dueDate) : null
      },
      include: {
        category: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    res.status(201).json(newTask);
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// PATCH /tasks/:id/complete
export const toggleComplete = async (req: Request, res: Response) => {
  try {
    const taskId = parseInt(req.params.id);
    
    const task = await prisma.task.findUnique({
      where: { id: taskId }
    });

    if (!task) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { completed: !task.completed },
      include: {
        category: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    res.json(updatedTask);
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// PUT /tasks/:id
export const updateTask = async (req: Request, res: Response) => {
  try {
    const taskId = parseInt(req.params.id);
    const { title, description, completed, priority, categoryId, dueDate } = req.body;

    const task = await prisma.task.findUnique({
      where: { id: taskId }
    });

    if (!task) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(completed !== undefined && { completed }),
        ...(priority !== undefined && { priority }),
        ...(categoryId !== undefined && { categoryId: categoryId ? parseInt(categoryId) : null }),
        ...(dueDate !== undefined && { dueDate: dueDate ? new Date(dueDate) : null })
      },
      include: {
        category: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    res.json(updatedTask);
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// DELETE /tasks/:id
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const taskId = parseInt(req.params.id);

    const task = await prisma.task.findUnique({
      where: { id: taskId }
    });

    if (!task) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }

    await prisma.task.delete({
      where: { id: taskId }
    });

    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar tarefa:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};
