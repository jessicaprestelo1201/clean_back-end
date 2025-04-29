import express from "express";
import LikeController from "../controllers/likeController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, LikeController.likeProduct);
router.get("/product/:produtoId", LikeController.getLikes);
router.delete("/:id", authMiddleware, LikeController.unlike);

export default router;