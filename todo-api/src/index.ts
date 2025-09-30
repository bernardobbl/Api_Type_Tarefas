import express from "express";
import router from "./routes";

const app = express();
const PORT = 3000;

// Middleware para interpretar JSON
app.use(express.json());

// Usar as rotas
app.use(router);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
