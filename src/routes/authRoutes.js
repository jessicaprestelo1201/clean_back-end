import express from "express";
import AuthController from "../controllers/authController.js";
import UserController from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/perfil", authMiddleware, UserController.getProfile);

export default router;