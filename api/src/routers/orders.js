import express from "express";
import { getUserOrders, getOrderDetails } from "../controllers/orders.js";
import { authenticateToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", authenticateToken, getUserOrders);
router.get("/:orderId", authenticateToken, getOrderDetails);

export default router;
