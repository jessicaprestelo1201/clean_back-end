import express from "express";
import userRoutes from "./userRoutes.js";
import postRoutes from "./api/post.routes.js"; // Ajuste o caminho conforme necessário
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Rotas Públicas
router.use("/auth", userRoutes); // /auth/register, /auth/login

// Rotas de Usuário Protegidas
router.use("/user", authMiddleware, userRoutes); // /user/:id, /user/update, etc.

// Rotas de API (Posts)
router.use("/api", postRoutes); // /api/posts

export default router;