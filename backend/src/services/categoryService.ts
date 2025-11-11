import { prisma } from "../database/prisma";
// import { Prisma } from "@prisma/client";

export const categoryService = {
  // Lista todas as categorias
  async getCategories() {
      return prisma.category.findMany({
        include: { tasks: true },
        orderBy: { id: "asc" },
      });
  },

  // Cria uma nova categoria
  async createCategory(name: string) {
      if (!name) throw new Error("Nome é obrigatório");

      const containsNumbers = /\d/.test(name);
      if (containsNumbers) throw new Error("O nome da categoria não pode conter números.");

      const exists = await prisma.category.findUnique({ where: { name } });
      if (exists) throw new Error("Esta categoria já existe.");

      return prisma.category.create({ data: { name } });
  },

  // Atualiza categoria
  async updateCategory(id: number, newName: string) {
      if (!newName) throw new Error("Nome é obrigatório");

      const category = await prisma.category.findUnique({ where: { id } });
      if (!category) throw new Error("Categoria não encontrada");

      const duplicate = await prisma.category.findUnique({ where: { name: newName } });
      if (duplicate && duplicate.id !== id) throw new Error("Este nome de categoria já existe!");

      return prisma.category.update({
        where: { id },
        data: { name: newName },
      });
  },

  // Deleta categoria
  async deleteCategory(id: number) {
      const category = await prisma.category.findUnique({ where: { id } });
      if (!category) throw new Error("Categoria não encontrada");

      await prisma.category.delete({ where: { id } });
      return;
    },
};
