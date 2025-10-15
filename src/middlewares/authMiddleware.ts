import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            userId?: number;
        }
    }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: "Token não fornecido." });
    }

    const [, token] = authorization.split(" ");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        const { id } = decoded as { id: number };

        req.userId = id;

        return next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido ou expirado." });
    }
}