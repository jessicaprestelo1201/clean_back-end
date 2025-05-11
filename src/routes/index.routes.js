import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

// Importação dos controladores
import UserController from "../controllers/userController.js";
import CommentController from "../controllers/commentController.js";
import LikeController from "../controllers/likeController.js";
import ProductController from "../controllers/productController.js";
import AvaliacaoController from "../controllers/avaliacaoController.js";

const router = express.Router();

// Rotas Públicas
router.use("/auth", (await import("./authRoutes.js")).default); // /auth/register, /auth/login

// Rotas de Usuário
router.post("/user/register", UserController.register);
router.post("/user/login", UserController.login);
router.get("/user", authMiddleware, UserController.getAllUsers);
router.get("/user/:id", authMiddleware, UserController.getUserById);
router.put("/user/update", authMiddleware, UserController.update);
router.delete("/user/delete", authMiddleware, UserController.delete);

// Rotas de Comentários
router.post("/comments", authMiddleware, CommentController.create);
router.get("/comments/product/:produtoId", CommentController.getByProduct);
router.delete("/comments/:id", authMiddleware, CommentController.delete);

// Rotas de Likes
router.post("/likes", authMiddleware, LikeController.likeProduct);
router.get("/likes/product/:produtoId", LikeController.getLikes);
router.delete("/likes/:id", authMiddleware, LikeController.unlike);

// Rotas de Produtos
router.post("/products", ProductController.create);
router.get("/products", ProductController.getAll);
router.get("/products/:id", ProductController.getById);

// Rotas de Avaliações
router.post("/avaliacoes", AvaliacaoController.create); // Criar avaliação
router.get("/avaliacoes", AvaliacaoController.getAll); // Listar todas as avaliações
router.get("/avaliacoes/:id", AvaliacaoController.getById); // Buscar avaliação por ID
router.put("/avaliacoes/:id", AvaliacaoController.update); // Atualizar avaliação
router.delete("/avaliacoes/:id", AvaliacaoController.delete); // Deletar avaliação
router.get("/avaliacoes/site", AvaliacaoController.getSiteReviews);

export default router;