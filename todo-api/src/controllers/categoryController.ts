import { Request, Response } from "express";
import { Category } from "../models/Category";

let categories: Category[] = [
  { id: 1, name: "Estudos" },
  { id: 2, name: "Trabalho" },
  { id: 3, name: "Pessoal" }
];

export const getCategories = (req: Request, res: Response) => {
  res.json(categories);
};

export const createCategory = (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Nome é obrigatório" });
  }

  const newCategory: Category = {
    id: categories.length + 1,
    name
  };

  categories.push(newCategory);
  res.status(201).json(newCategory);
};
