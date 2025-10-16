import { Request, Response } from "express";
import { userService } from "../services/userService";

export const userController = {
    async createUser(req: Request, res: Response) {
        try {
            const { name, email, password } = req.body;

            if(!name || !email || !password) {
                return res.status(400).json({ message: "Nome, email e senha são obrigatórios." });
            }

            const newUser = await userService.createUser(name, email, password);
            return res.status(201).json({ 
                data: newUser,
                message: "Usuário criado com sucesso!" });
        } catch (error) {
            if (error instanceof Error) {
                if(error.message.includes("Email já cadastrado.")) {
                    return res.status(409).json({ message: error.message});
                }
                return res.status(500).json({message: error.message});
            }
        }
    },

    async getUsers(req: Request, res: Response) {
        try {
            const users = await userService.getUsers();
            return res.status(200).json({
                data: users,
                total: users.length,
            });
        } catch (error) {
            if (error instanceof Error){
                return res.status(500).json({ message: error.message });
            }
        }
    },

    async updateUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, email } = req.body;

            const updatedUser = await userService.updateUser(parseInt(id), { name, email });
            return res.status(200).json(updatedUser);
        } catch (error) {
            if(error instanceof Error) {
                if(error.message.includes("Usuáario não encontrado")) {
                    return res.status(404).json({ message: error.message });
                }
                return res.status(500).json({ message: error.message });
            }
        }
    },

    async deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await userService.deleteUser(parseInt(id));
            return res.status(204).send();
        } catch (error) {
            if (error instanceof Error) {
                if(error.message.includes("Usuáario não encontrado")) {
                    return res.status(404).json({ message: error.message });
                }
                return res.status(500).json({ message: error.message });
            }
        }
    },

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: "Email e senha são obrigatórios." });
            }

            const token = await userService.login(email, password);
            return res.status(200).json({ token });
        } catch (error) {
            if (error instanceof Error) {
                if(error.message.includes("Dados inválidos.")) {
                    return res.status(401).json({ message: error.message });
                }
                return res.status(500).json({ message: error.message });
            }
        }
    }
};