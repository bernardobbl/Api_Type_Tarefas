import dotenv from 'dotenv';
// Carregar variáveis de ambiente PRIMEIRO, antes de qualquer outra importação
dotenv.config();

import express from "express";
import router from "./routes/routes";
import { setupSwagger } from './swagger';

const app = express();
const PORT = 3000;

// Middleware para CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Middleware para interpretar JSON
app.use(express.json());

setupSwagger(app);

// Usar as rotas
app.use(router);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log("📚 Swagger em http://localhost:3000/api-docs");
});
