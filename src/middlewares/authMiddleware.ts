import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// eslint-disable-next-line @typescript-eslint/no-namespace
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
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            return res.status(500).json({ message: "JWT_SECRET não está configurado." });
        }

        const decoded = jwt.verify(token, jwtSecret);
        const { id } = decoded as { id: number };

        req.userId = id;

        return next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido ou expirado." });
    }
}