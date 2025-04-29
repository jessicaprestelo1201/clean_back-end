import express from "express";
import UserController from "../controllers/userController.js";

const router = express.Router();

// Rotas públicas
router.post("/register", UserController.register);
router.post("/login", UserController.login);

// Rotas protegidas
router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);
router.put("/update", UserController.update);
router.delete("/delete", UserController.delete);

export default router;