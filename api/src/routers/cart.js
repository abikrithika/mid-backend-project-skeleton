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

/**
 * @swagger
 * /api/cart/items/{itemId}:
 *   delete:
 *     summary: Remove an item from the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the cart item to remove
 *       - in: header
 *         name: x-cart-id
 *         schema:
 *           type: string
 *         required: false
 *         description: Guest cart ID (if not logged in)
 *     responses:
 *       200:
 *         description: Item removed successfully
 *       404:
 *         description: Item not found
 */

router.delete("/items/:itemId", extractUser, deleteCartItem);

/**
 * @swagger
 * /api/cart/checkout:
 *   post:
 *     summary: Checkout the current cart and create an order
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-cart-id
 *         schema:
 *           type: string
 *         required: false
 *         description: Guest cart ID (if not logged in)
 *     responses:
 *       201:
 *         description: Checkout successful, order created
 *       400:
 *         description: Cannot checkout an empty cart
 */

router.post("/checkout", extractUser, processCheckout);

export default router;
