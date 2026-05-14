import { z } from "zod";
import {
  createCart,
  getActiveCartByUserId,
  getCartById,
  getCartItems,
  getCartItemByEventId,
  addCartItem,
  updateCartItemQuantity,
  getCartItemById,
  removeCartItem,
} from "#models/cart.js";

const addCartItemSchema = z.object({
  eventId: z.number().int().positive(),
  quantity: z.number().int().positive(),
});

const updateCartItemSchema = z.object({
  quantity: z.number().int().nonnegative(),
});

async function resolveCart(req) {
  const userId = req.user ? req.user.userId : null;
  const guestCartId = req.headers["x-cart-id"];

  let cart = null;

  if (userId) {
    cart = await getActiveCartByUserId(userId);
  } else if (guestCartId) {
    cart = await getCartById(guestCartId);
  }

  if (!cart) {
    cart = await createCart(userId);
  }
  return cart;
}

export async function getCart(req, res, next) {
  try {
    const cart = await resolveCart(req);
    const items = await getCartItems(cart.id);

    res.json({
      data: {
        cartId: cart.id,
        status: cart.status,
        items: items,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function addItemToCart(req, res, next) {
  try {
    const { eventId, quantity } = addCartItemSchema.parse(req.body);

    const cart = await resolveCart(req);
    const existingItem = await getCartItemByEventId(cart.id, eventId);

    let cartItem;
    if (existingItem) {
      cartItem = await updateCartItemQuantity(
        existingItem.id,
        existingItem.quantity + quantity,
      );
    } else {
      cartItem = await addCartItem(cart.id, eventId, quantity);
    }

    res.status(201).json({ data: cartItem });
  } catch (error) {
    next(error);
  }
}

export async function updateItemQuantity(req, res, next) {
  try {
    const itemId = parseInt(req.params.itemId, 10);
    const { quantity } = updateCartItemSchema.parse(req.body);

    const cart = await resolveCart(req);
    const item = await getCartItemById(itemId);

    if (!item || item.cart_id !== cart.id) {
      return res
        .status(404)
        .json({ error: { message: "Item not found in your cart." } });
    }

    if (quantity <= 0) {
      await removeCartItem(itemId);
      return res.json({ data: { message: "Item removed from cart." } });
    }

    const updatedItem = await updateCartItemQuantity(itemId, quantity);
    res.json({ data: updatedItem });
  } catch (error) {
    next(error);
  }
}
