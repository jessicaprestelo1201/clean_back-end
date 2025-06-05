import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

// Importação dos controladores
import UserController from "../controllers/userController.js";
import CommentController from "../controllers/commentController.js";
import LikeController from "../controllers/likeController.js";
import ProductController from "../controllers/productController.js";
import AvaliacaoController from "../controllers/avaliacaoController.js";
import ArticleController from "../controllers/articleController.js";
import authRoutes from "./authRoutes.js";

const router = express.Router();

// Rotas Públicas
router.use("/auth", authRoutes); // /auth/register, /auth/login

// Rotas de Usuário (apenas protegidas)
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
router.post("/avaliacoes", AvaliacaoController.create);
router.get("/avaliacoes", AvaliacaoController.getAll); 
router.get("/avaliacoes/:id", AvaliacaoController.getById); 
router.put("/avaliacoes/:id", AvaliacaoController.update); 
router.delete("/avaliacoes/:id", AvaliacaoController.delete); 
router.get("/avaliacoes/site", AvaliacaoController.getSiteReviews);

// Rotas de Artigos
router.post("/artigos", ArticleController.create);
router.get("/artigos", ArticleController.getAll);
router.get("/artigos/:id", ArticleController.getById);
router.put("/artigos/:id", ArticleController.update);
router.delete("/artigos/:id", ArticleController.delete);

export default router;