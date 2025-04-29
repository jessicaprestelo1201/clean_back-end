import express from "express";

// Importar todas as Rotas
import userModel from "../models/userModel.js";
import authMiddleware from "../moddleware/authMiddleware.js";

const router = express.Router();

// Rotas Públicas
router.use("/auth", authRouter);

// Rotas Particulares/Protegidas
router.use(authMiddleware);
router.use("/user", userRouter);


export default router;