import express from "express";
import userRoutes from "./userRoutes.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Rotas Públicas
router.use("/auth", userRoutes); // /auth/login, /auth/register

// Rotas Protegidas
router.use("/user", authMiddleware, userRoutes); // /user/:id, /user/update, etc.

export default router;