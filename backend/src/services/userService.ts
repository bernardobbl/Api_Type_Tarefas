import { prisma } from "../database/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userService = {
    async createUser(name: string, email: string, password: string) {
        const userExists = await prisma.user.findUnique({where: { email }});
        if (userExists) throw new Error("Usuário já cadastrado.");

        const defaultEmail = email.trim().toLowerCase();

        const hashedPassword = await bcrypt.hash(password, 10);

        return await prisma.user.create ({
            data: { name, email: defaultEmail, password: hashedPassword},
        });
    },

    async getUsers() {
        return prisma.user.findMany({
            include: { task: true},
            orderBy: { createdAt: "desc" }
        });
    },

    async updateUser(id: number, data: { name?: string; email?: string }) {
        const userExists = await prisma.user.findUnique({
            where: { id },
        });

        if (!userExists) {
            throw new Error("Usuário não encontrado!");
        }

        return prisma.user.update({
            where: { id },
            data,
        });
    },

    async deleteUser(id: number) {
        const userExists = await prisma.user.findUnique({
            where: { id },
        });

        if(!userExists) {
            throw new Error("Usuário não encontrado!");
        }

        await prisma.user.delete({
            where: { id },
        });

        return;
    },

    async login(email: string, password: string) {
        const user = await prisma.user.findUnique({
            where: { email: email.toLowerCase() },
        });

        if(!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error("Dados inválidos.");
        }

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error("JWT_SECRET não está configurado. Verifique o arquivo .env");
        }

        const token = jwt.sign(
            { id: user.id },
            jwtSecret,
            { expiresIn: '12h' }
        );

        return token;
    }
}