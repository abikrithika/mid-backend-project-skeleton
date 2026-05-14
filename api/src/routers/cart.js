import { Router } from "express";
import {
  getCart,
  addItemToCart,
  updateItemQuantity,
  deleteCartItem,
  processCheckout,
} from "#controllers/cart.js";
import { extractUser } from "#middlewares/auth.js";

const router = Router();

router.get("/", extractUser, getCart);
router.post("/items", extractUser, addItemToCart);
router.put("/items/:itemId", extractUser, updateItemQuantity);
router.delete("/items/:itemId", extractUser, deleteCartItem);
router.post("/checkout", extractUser, processCheckout);

export default router;
