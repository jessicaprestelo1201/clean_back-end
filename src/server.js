import express from "express";
import { config } from "dotenv";
import cors from "cors";

import routes from "./routes/index.routes.js";

config();

const port = process.env.PORT || 4000;

// Inicializa o Express
const app = express();
app.use(cors());
app.use(express.json());

// Configuração das rotas
app.use("/", routes);

// Iniciar o servidor HTTP (mais simples para desenvolvimento)
const server = app.listen(port, () => {
  console.log(`🟢 Servidor rodando em http://localhost:${port} 🟢`);
});

// Capturar encerramento do servidor
process.on("SIGINT", () => {
  console.log("🔴 Servidor encerrado pelo usuário.");
  server.close(() => {
    process.exit(0);
  });
});

// Capturar erros não tratados
process.on("uncaughtException", (err) => {
  console.error("❌ Erro não tratado:", err.message);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("❌ Promessa rejeitada sem tratamento:", reason);
  process.exit(1);
});