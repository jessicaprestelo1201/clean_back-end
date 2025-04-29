import express from "express";
import CommentController from "../controllers/commentController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, CommentController.create);
router.get("/product/:produtoId", CommentController.getByProduct);
router.delete("/:id", authMiddleware, CommentController.delete);

export default router;