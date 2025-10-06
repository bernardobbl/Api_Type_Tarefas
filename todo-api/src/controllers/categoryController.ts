import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

// GET /categories - Buscar categorias com filtros avançados
export const getCategories = async (req: Request, res: Response) => {
  try {
    const { userId, includeArchived, sortBy, search } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "ID do usuário é obrigatório" });
    }

    // Construir filtros
    const where: any = {
      userId: parseInt(userId as string)
    };

    // Filtrar categorias arquivadas
    if (includeArchived !== 'true') {
      where.isArchived = false;
    }

    // Busca por nome
    if (search) {
      where.name = {
        contains: search as string,
        mode: 'insensitive'
      };
    }

    // Ordenação
    let orderBy: any = { sortOrder: 'asc' };
    if (sortBy === 'name') orderBy = { name: 'asc' };
    if (sortBy === 'created') orderBy = { createdAt: 'desc' };
    if (sortBy === 'tasks') orderBy = { tasks: { _count: 'desc' } };

    const categories = await prisma.category.findMany({
      where,
      include: {
        _count: {
          select: {
            tasks: {
              where: { completed: false } // Apenas tarefas pendentes
            }
          }
        }
      },
      orderBy
    });

    // Adicionar estatísticas
    const categoriesWithStats = await Promise.all(
      categories.map(async (category) => {
        const stats = await prisma.task.groupBy({
          by: ['completed'],
          where: { categoryId: category.id },
          _count: { completed: true }
        });

        const completedCount = stats.find(s => s.completed)?._count.completed || 0;
        const pendingCount = stats.find(s => !s.completed)?._count.completed || 0;

        return {
          ...category,
          stats: {
            total: completedCount + pendingCount,
            completed: completedCount,
            pending: pendingCount
          }
        };
      })
    );

    res.json(categoriesWithStats);
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// POST /categories - Criar categoria com validações avançadas
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { 
      name, 
      description, 
      color, 
      icon, 
      isDefault, 
      sortOrder, 
      userId 
    } = req.body;

    // Validações
    if (!name || name.trim().length === 0) {
    return res.status(400).json({ message: "Nome é obrigatório" });
  }

    if (!userId) {
      return res.status(400).json({ message: "ID do usuário é obrigatório" });
    }

    // Verificar se já existe categoria com mesmo nome
    const existingCategory = await prisma.category.findFirst({
      where: {
        name: { equals: name.trim(), mode: 'insensitive' },
        userId: parseInt(userId),
        isArchived: false
      }
    });

    if (existingCategory) {
      return res.status(409).json({ 
        message: "Já existe uma categoria com este nome" 
      });
    }

    // Se for categoria padrão, remover padrão das outras
    if (isDefault) {
      await prisma.category.updateMany({
        where: { userId: parseInt(userId) },
        data: { isDefault: false }
      });
    }

    // Obter próximo sortOrder se não especificado
    let finalSortOrder = sortOrder;
    if (finalSortOrder === undefined) {
      const maxOrder = await prisma.category.findFirst({
        where: { userId: parseInt(userId) },
        orderBy: { sortOrder: 'desc' },
        select: { sortOrder: true }
      });
      finalSortOrder = (maxOrder?.sortOrder || 0) + 1;
    }

    const newCategory = await prisma.category.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        color: color || "#3B82F6",
        icon: icon || null,
        isDefault: isDefault || false,
        sortOrder: finalSortOrder,
        userId: parseInt(userId)
      },
      include: {
        _count: {
          select: {
            tasks: true
          }
        }
      }
    });

    res.status(201).json({
      ...newCategory,
      stats: {
        total: 0,
        completed: 0,
        pending: 0
      }
    });
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// PUT /categories/:id - Atualizar categoria com validações avançadas
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = parseInt(req.params.id);
    const { 
      name, 
      description, 
      color, 
      icon, 
      isDefault, 
      sortOrder, 
      isArchived 
    } = req.body;

    const category = await prisma.category.findUnique({
      where: { id: categoryId }
    });

    if (!category) {
      return res.status(404).json({ message: "Categoria não encontrada" });
    }

    // Verificar nome duplicado se estiver alterando o nome
    if (name && name !== category.name) {
      const existingCategory = await prisma.category.findFirst({
        where: {
          name: { equals: name.trim(), mode: 'insensitive' },
          userId: category.userId,
          id: { not: categoryId },
          isArchived: false
        }
      });

      if (existingCategory) {
        return res.status(409).json({ 
          message: "Já existe uma categoria com este nome" 
        });
      }
    }

    // Se for categoria padrão, remover padrão das outras
    if (isDefault && !category.isDefault) {
      await prisma.category.updateMany({
        where: { 
          userId: category.userId,
          id: { not: categoryId }
        },
        data: { isDefault: false }
      });
    }

    const updatedCategory = await prisma.category.update({
      where: { id: categoryId },
      data: {
        ...(name !== undefined && { name: name.trim() }),
        ...(description !== undefined && { description: description?.trim() || null }),
        ...(color !== undefined && { color }),
        ...(icon !== undefined && { icon }),
        ...(isDefault !== undefined && { isDefault }),
        ...(sortOrder !== undefined && { sortOrder }),
        ...(isArchived !== undefined && { isArchived })
      },
      include: {
        _count: {
          select: {
            tasks: true
          }
        }
      }
    });

    // Calcular estatísticas
    const stats = await prisma.task.groupBy({
      by: ['completed'],
      where: { categoryId: categoryId },
      _count: { completed: true }
    });

    const completedCount = stats.find(s => s.completed)?._count.completed || 0;
    const pendingCount = stats.find(s => !s.completed)?._count.completed || 0;

    res.json({
      ...updatedCategory,
      stats: {
        total: completedCount + pendingCount,
        completed: completedCount,
        pending: pendingCount
      }
    });
  } catch (error) {
    console.error('Erro ao atualizar categoria:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// DELETE /categories/:id - Deletar categoria com opções avançadas
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = parseInt(req.params.id);
    const { moveTasksTo, force } = req.query;

    const category = await prisma.category.findUnique({
      where: { id: categoryId },
      include: {
        _count: {
          select: {
            tasks: true
          }
        }
      }
    });

    if (!category) {
      return res.status(404).json({ message: "Categoria não encontrada" });
    }

    // Se tem tarefas e não é forçado, verificar opções
    if (category._count.tasks > 0 && force !== 'true') {
      if (moveTasksTo) {
        // Mover tarefas para outra categoria
        const targetCategory = await prisma.category.findUnique({
          where: { id: parseInt(moveTasksTo as string) }
        });

        if (!targetCategory) {
          return res.status(400).json({ 
            message: "Categoria de destino não encontrada" 
          });
        }

        // Atualizar tarefas para nova categoria
        await prisma.task.updateMany({
          where: { categoryId: categoryId },
          data: { categoryId: parseInt(moveTasksTo as string) }
        });
      } else {
        return res.status(400).json({ 
          message: "Categoria possui tarefas. Use 'moveTasksTo' ou 'force=true'",
          taskCount: category._count.tasks
        });
      }
    }

    await prisma.category.delete({
      where: { id: categoryId }
    });

    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar categoria:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// PATCH /categories/:id/archive - Arquivar/desarquivar categoria
export const toggleArchiveCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = parseInt(req.params.id);

    const category = await prisma.category.findUnique({
      where: { id: categoryId }
    });

    if (!category) {
      return res.status(404).json({ message: "Categoria não encontrada" });
    }

    const updatedCategory = await prisma.category.update({
      where: { id: categoryId },
      data: { isArchived: !category.isArchived },
      include: {
        _count: {
          select: {
            tasks: true
          }
        }
      }
    });

    res.json(updatedCategory);
  } catch (error) {
    console.error('Erro ao arquivar categoria:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// PATCH /categories/:id/default - Definir como categoria padrão
export const setDefaultCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = parseInt(req.params.id);

    const category = await prisma.category.findUnique({
      where: { id: categoryId }
    });

    if (!category) {
      return res.status(404).json({ message: "Categoria não encontrada" });
    }

    // Remover padrão das outras categorias do usuário
    await prisma.category.updateMany({
      where: { 
        userId: category.userId,
        id: { not: categoryId }
      },
      data: { isDefault: false }
    });

    // Definir como padrão
    const updatedCategory = await prisma.category.update({
      where: { id: categoryId },
      data: { isDefault: true },
      include: {
        _count: {
          select: {
            tasks: true
          }
        }
      }
    });

    res.json(updatedCategory);
  } catch (error) {
    console.error('Erro ao definir categoria padrão:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// PATCH /categories/reorder - Reordenar categorias
export const reorderCategories = async (req: Request, res: Response) => {
  try {
    const { userId, categoryOrders } = req.body;

    if (!userId || !categoryOrders || !Array.isArray(categoryOrders)) {
      return res.status(400).json({ 
        message: "userId e categoryOrders são obrigatórios" 
      });
    }

    // Atualizar ordem das categorias
    await Promise.all(
      categoryOrders.map(({ id, sortOrder }: { id: number; sortOrder: number }) =>
        prisma.category.update({
          where: { id, userId: parseInt(userId) },
          data: { sortOrder }
        })
      )
    );

    res.json({ message: "Ordem das categorias atualizada com sucesso" });
  } catch (error) {
    console.error('Erro ao reordenar categorias:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// GET /categories/stats - Estatísticas das categorias
export const getCategoryStats = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "ID do usuário é obrigatório" });
    }

    const stats = await prisma.category.aggregate({
      where: { 
        userId: parseInt(userId as string),
        isArchived: false
      },
      _count: {
        id: true
      }
    });

    const taskStats = await prisma.task.groupBy({
      by: ['categoryId', 'completed'],
      where: {
        user: { id: parseInt(userId as string) },
        category: { isArchived: false }
      },
      _count: { completed: true }
    });

    const categoryStats = await prisma.category.findMany({
      where: { 
        userId: parseInt(userId as string),
        isArchived: false
      },
      include: {
        _count: {
          select: {
            tasks: {
              where: { completed: false }
            }
          }
        }
      }
    });

    res.json({
      totalCategories: stats._count.id,
      categoriesWithTasks: categoryStats.filter(c => c._count.tasks > 0).length,
      categories: categoryStats.map(cat => ({
        id: cat.id,
        name: cat.name,
        pendingTasks: cat._count.tasks
      }))
    });
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};
