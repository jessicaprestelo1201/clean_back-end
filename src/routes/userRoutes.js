import express from "express";
import UserController from "../../controllers/UserController.js";
import authMiddleware from "../../middleware/authMiddleware.js";

const router = express.Router();

// Rotas públicas
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/", UserController.getAllUsers); 
router.get("/:id", UserController.getUserById); 

// Rotas protegidas
router.put("/update", authMiddleware, UserController.update);
router.delete("/delete", authMiddleware, UserController.delete);

export default router;