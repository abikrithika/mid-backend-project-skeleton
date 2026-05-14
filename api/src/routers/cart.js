import { Router } from "express";
import {
  getCart,
  addItemToCart,
  updateItemQuantity,
} from "#controllers/cart.js";
import { extractUser } from "#middlewares/auth.js";

const router = Router();

router.get("/", extractUser, getCart);

router.post("/items", extractUser, addItemToCart);

router.put("/items/:itemId", extractUser, updateItemQuantity);

export default router;
