import db from "#configs/database.js";

export async function getActiveCartByUserId(userId, { trx = db } = {}) {
  const row = await trx("cart")
    .where({ user_id: userId, status: "active" })
    .first();
  return row ?? null;
}

export async function createCart(userId = null, { trx = db } = {}) {
  const [newCart] = await trx("cart")
    .insert({ user_id: userId, status: "active" })
    .returning("*");
  return newCart;
}

export async function getCartItems(cartId, { trx = db } = {}) {
  return trx("cart_item")
    .join("event", "cart_item.event_id", "event.id")
    .where("cart_item.cart_id", cartId)
    .select(
      "cart_item.id as cartItemId",
      "cart_item.quantity",
      "event.id as eventId",
      "event.title",
      "event.price",
    );
}

export async function getCartItemByEventId(cartId, eventId, { trx = db } = {}) {
  const row = await trx("cart_item")
    .where({ cart_id: cartId, event_id: eventId })
    .first();
  return row ?? null;
}

export async function addCartItem(
  cartId,
  eventId,
  quantity,
  { trx = db } = {},
) {
  const [newItem] = await trx("cart_item")
    .insert({ cart_id: cartId, event_id: eventId, quantity })
    .returning("*");
  return newItem;
}

export async function updateCartItemQuantity(
  cartItemId,
  quantity,
  { trx = db } = {},
) {
  const [updatedItem] = await trx("cart_item")
    .where({ id: cartItemId })
    .update({ quantity })
    .returning("*");
  return updatedItem;
}


export async function getCartItemById(cartItemId, { trx = db } = {}) {
    const row = await trx("cart_item").where({ id: cartItemId }).first();
    return row ?? null;
}


export async function removeCartItem(cartItemId, { trx = db } = {}) {
    await trx("cart_item").where({ id: cartItemId }).del();
}