import express from "express";
import { getUserOrders, getOrderDetails } from "../controllers/orders.js";
import { authenticateToken } from "../middlewares/auth.js";

const router = express.Router();

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders for the authenticated user
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of the user's orders
 *       401:
 *         description: Unauthorized (missing or invalid token)
 */


router.get("/", authenticateToken, getUserOrders);

/**
 * @swagger
 * /api/orders/{orderId}:
 *   get:
 *     summary: Get details of a specific order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the order to retrieve
 *     responses:
 *       200:
 *         description: Detailed order information including items
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Order not found
 */

router.get("/:orderId", authenticateToken, getOrderDetails);

export default router;
