export default {
  userCart(state) {
    return state.userCart;
  },
  cartTotalPrice(state) {
    return state.totalPrice;
  },
  cartLength(state) {
    return state.userCart.length;
  },
};
