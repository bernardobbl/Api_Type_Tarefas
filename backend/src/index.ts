import dotenv from 'dotenv';

// Carregar variáveis de ambiente PRIMEIRO, antes de qualquer outra importação
dotenv.config();

import express from "express";
import router from "./routes/routes";
import { setupSwagger } from './swagger';
import cors from "cors";

const app = express();
const PORT = 3000;

// CORS configurado corretamente
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// Middleware para interpretar JSON
app.use(express.json());

setupSwagger(app);

// Usar as rotas
app.use(router);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  // eslint-disable-next-line no-console
  console.log("📚 Swagger em http://localhost:3000/api-docs");
});
