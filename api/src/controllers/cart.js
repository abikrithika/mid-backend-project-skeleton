import {
  getActiveCartByUserId,
  createCart,
  getCartItems,
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
