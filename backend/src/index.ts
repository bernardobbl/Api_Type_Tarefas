import dotenv from 'dotenv';
import path from 'path';
// Carregar variáveis de ambiente PRIMEIRO, antes de qualquer outra importação
// Procura o .env na raiz do projeto (um nível acima da pasta backend)
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import express from "express";
import router from "./routes/routes";
import { setupSwagger } from './swagger';

const app = express();
const PORT = process.env.PORT || 3000;

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
  // eslint-disable-next-line no-console
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  // eslint-disable-next-line no-console
  console.log("📚 Swagger em http://localhost:3000/api-docs");
});
