import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import express from "express";
import cors from "cors";
import router from "./routes/routes";
import { setupSwagger } from './swagger';

const app = express();
const PORT = process.env.PORT || 3000;

const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(cors({ 
  origin: CORS_ORIGIN,
  credentials: true,
}));

app.use(express.json());

setupSwagger(app);

app.use(router);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log("📚 Swagger em http://localhost:3000/api-docs");
});
