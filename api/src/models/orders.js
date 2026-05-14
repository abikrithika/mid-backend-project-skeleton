import db from "../db/db.js";

export async function getOrdersByUserId(userId) {
  return await db("orders")
    .where({ user_id: userId })
    .orderBy("created_at", "desc");
}

export async function getOrderByIdAndUser(orderId, userId) {
  const order = await db("orders")
    .where({ id: orderId, user_id: userId })
    .first();
  if (!order) return null;

  const items = await db("order_items")
    .join("event", "order_items.event_id", "event.id")
    .where({ order_id: orderId })
    .select("order_items.*", "event.title", "event.description");

  return { ...order, items };
}
