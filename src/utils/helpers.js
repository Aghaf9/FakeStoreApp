export function money(value) {
  return `$${Number(value || 0).toFixed(2)}`;
}

export function getCartCount(cart) {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

export function getCartTotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function getNewOrderCount(orders) {
  return orders.filter((order) => order.status === "new").length;
}
