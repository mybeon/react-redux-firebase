const getCartId = () => {
  let cartId;
  cartId = localStorage.getItem("cartId");
  if (!cartId) {
    localStorage.setItem("cartId", Date.now().toString());
    cartId = localStorage.getItem("cartId");
  }
  return cartId;
};

export default getCartId;
