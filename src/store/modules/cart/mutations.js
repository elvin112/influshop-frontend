export default {
  setUserCart(state, payload) {
    state.userCart = payload.cartItems;
  },
  setTotalPrice(state, payload) {
    state.totalPrice = payload.totalPrice;
  },
};
