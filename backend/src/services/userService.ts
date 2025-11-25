import { prisma } from "../database/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUserData, updateUserData, userLoginData } from "../schemas/user.schema";

export const userService = {
    async createUser(data: createUserData) {
        const userExists = await prisma.user.findUnique({where: { email: data.email }});

        if (userExists) throw new Error("Usuário já cadastrado.");

        const hashedPassword = await bcrypt.hash(data.password, 10);

        return await prisma.user.create ({
            data: { name: data.name, email: data.email, password: hashedPassword},
        });
    },

    async getUsers() {
        return prisma.user.findMany({
            include: { task: true},
            orderBy: { createdAt: "desc" }
        });
    },

    async updateUser(id: number, data: updateUserData) {
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

    async login(credentials: userLoginData) {
        const user = await prisma.user.findUnique({
            where: { email: credentials.email },
        });

        if(!user || !(await bcrypt.compare(credentials.password, user.password))) {
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