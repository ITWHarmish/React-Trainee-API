import { Router } from "express";
import {
	createProoduct,
	deleteProduct,
	getProoducts,
	updateProoduct,
} from "../controllers/productController";

const router = Router();

router.get("/get/products", getProoducts);
router.post("/create/product", createProoduct);
router.put("/update/product", updateProoduct);
router.delete("/delete/product/:id", deleteProduct);

export default router;
