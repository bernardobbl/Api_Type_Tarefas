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
  if (!name || !String) {
    return res.status(400).json({ message: "Nome é obrigatório" });
  }

  const containsNumbers = /\d/.test(name);
  if(containsNumbers) {
    return res.status(400).json({ message: "O nome da categoria não pode conter números." });
  }

  const newCategory: Category = {
    id: categories.length + 1,
    name
  };

  categories.push(newCategory);
  res.status(201).json(newCategory);
};

export const updateCategory = (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);

    //Caso o usuário não forneça um número
    if(isNaN(id)) {
      return res.status(400).json({ message: "ID inválido" });
    };

    //Caso o usuário insira um ID que não existe
    const index = categories.findIndex(c => c.id === id);

    if(index === -1) {
      return res.status(404).json({message: "Categoria não encontrada"});
    };

    //Em caso de nome de categoria duplicado
    const {name: newName} = req.body;
    
    if(newName) { 
      const categoryExists = categories.some(c => c.name === newName && c.id !== id);

      if(categoryExists) {
        return res.status(409).json({message: "Este nome de categoria já existe!"})
      };
    };

    const atualizarDado = req.body;
    
    categories[index] = {...categories[index], ...atualizarDado};

    res.status(200).json({ message: "Categoria atualizada com sucesso!" });
    console.log(`A categoria ${categories[index]} foi atualizada!`);
};

export const deleteCategory = (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({message: "ID inválido."})
    }

    const index = categories.findIndex(c => c.id === id);
    if(index === -1) {
        return res.status(404).json({message: `Categoria não encontrada`});
    }

    categories.splice(index, 1);

    res.status(200).json({message: `Categoria ${id} deletada com sucesso`});
    console.log(`Categoria ${id} deletada.`);
}


