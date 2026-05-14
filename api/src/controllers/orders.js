import { getOrdersByUserId, getOrderByIdAndUser } from "#models/orders.js";

export async function getUserOrders(req, res, next) {
  try {
    const userId = req.user.userId;
    const orders = await getOrdersByUserId(userId);
    res.json({ data: orders });
  } catch (error) {
    next(error);
  }
}

export async function getOrderDetails(req, res, next) {
  try {
    const userId = req.user.userId;
    const orderId = req.params.orderId;

    const order = await getOrderByIdAndUser(orderId, userId);
    if (!order) {
      return res.status(404).json({ error: { message: "Order not found" } });
    }
    res.json({ data: order });
  } catch (error) {
    next(error);
  }
}
