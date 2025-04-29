import express from "express";
import ProductController from "../controllers/productController.js";

const router = express.Router();

router.post("/", ProductController.create);
router.get("/", ProductController.getAll);
router.get("/:id", ProductController.getById);

export default router;