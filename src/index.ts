import express from "express";
import router from "./routes/routes";
import { setupSwagger } from './swagger';

const app = express();
const PORT = 3000;

// Middleware para interpretar JSON
app.use(express.json());

setupSwagger(app);

// Usar as rotas
app.use(router);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log("📚 Swagger em http://localhost:3000/api-docs");
});
