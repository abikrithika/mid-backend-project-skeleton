import {
  getActiveCartByUserId,
  createCart,
  getCartItems,
  getCartItemByEventId,
  addCartItem,
  updateCartItemQuantity,
  getCartItemById,
  removeCartItem,
} from "#models/cart.js";

export async function getCart(req, res, next) {
  try {
    const userId = req.user ? req.user.userId : null;

    let cart = null;
    if (userId) {
      cart = await getActiveCartByUserId(userId);
    }

    if (!cart) {
      cart = await createCart(userId);
    }

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
    const { eventId, quantity } = req.body;
    const userId = req.user ? req.user.userId : null;

    let cart = null;
    if (userId) {
      cart = await getActiveCartByUserId(userId);
    }
    if (!cart) {
      cart = await createCart(userId);
    }

    const existingItem = await getCartItemByEventId(cart.id, eventId);

    let cartItem;
    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      cartItem = await updateCartItemQuantity(existingItem.id, newQuantity);
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
    const { itemId } = req.params;
    const { quantity } = req.body;
    const userId = req.user ? req.user.userId : null;

    let cart = null;
    if (userId) {
      cart = await getActiveCartByUserId(userId);
    }

    if (!cart) {
      return res
        .status(404)
        .json({ error: { message: "Active cart not found." } });
    }

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
