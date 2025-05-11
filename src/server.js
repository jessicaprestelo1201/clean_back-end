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

// Middleware para logar requisições e respostas
app.use((req, res, next) => {
  console.log(`📥 Requisição recebida: ${req.method} ${req.url}`);
  console.log("Headers:", req.headers);

  // Verificar se o body existe antes de acessar
  if (req.body && Object.keys(req.body).length > 0) {
    console.log("Body:", req.body);
  } else {
    console.log("Body: (vazio ou não aplicável)");
  }

  // Capturar a resposta
  const originalSend = res.send;
  res.send = function (body) {
    console.log("📤 Resposta enviada:", body);
    originalSend.call(this, body);
  };

  next();
});

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