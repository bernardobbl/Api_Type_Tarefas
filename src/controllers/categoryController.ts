import { Request, Response } from "express";
import { categoryService } from "../services/categoryService";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoryService.getCategories();
    res.status(200).json(categories);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(400).json({message: errorMessage});
  }
};   

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const novaCategoria = await categoryService.createCategory(name);
    res.status(200).json(novaCategoria);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    res.status(400).json({message: errorMessage});
  }
};

export const updateCategory = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { name } = req.body;
      const categoriaAtualizada = await categoryService.updateCategory(id, name);
      res.status(200).json(categoriaAtualizada);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      res.status(400).json({message: errorMessage});
    }
};

export const deleteCategory = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      await categoryService.deleteCategory(id);
      res.status(204).send();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      res.status(400).json({message: errorMessage});
    }
};


