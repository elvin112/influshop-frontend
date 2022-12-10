export default {
  async increaseQuantity(context, payload) {
    const response = await fetch(
      `http://localhost:8080/api/v1/e-commerce/add-to-cart`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + context.rootState.auth.token, //accessToken contain bearer value.
        },
        body: JSON.stringify({
          itemId: payload.id,
          quantity: payload.quantity + 1,
          isAddToCart: true,
        }),
      }
    );
    context.dispatch("fetchUserCart");
    return response;
  },
  async decreaseQuantity(context, payload) {
    if (payload.quantity === 1) {
      console.log("10:11");
      return context.dispatch("removeItem", payload);
    }
    const response = await fetch(
      `http://localhost:8080/api/v1/e-commerce/add-to-cart`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + context.rootState.auth.token, //accessToken contain bearer value.
        },
        body: JSON.stringify({
          itemId: payload.id,
          quantity: payload.quantity - 1,
          isAddToCart: true,
        }),
      }
    );
    context.dispatch("fetchUserCart");
    return response;
  },
  async fetchUserCart(context, payload) {
    const response = await fetch(
      `http://localhost:8080/api/v1/e-commerce/cart`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + context.rootState.auth.token, //accessToken contain bearer value.
        },
      }
    );

    if (!response.ok) {
      throw Error("Internal server error");
    } else {
      const data = await response.json();
      console.log(data);
      context.commit("setUserCart", data);
      context.commit("setTotalPrice", data);
    }
  },
  async addItemToCart(context, payload) {
    const response = await fetch(
      `http://localhost:8080/api/v1/e-commerce/add-to-cart`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + context.rootState.auth.token, //accessToken contain bearer value.
        },
        body: JSON.stringify(payload),
      }
    );
    context.dispatch("fetchUserCart");
    return response;
  },

  async removeItem(context, payload) {
    const response = await fetch(
      `http://localhost:8080/api/v1/e-commerce/add-to-cart`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + context.rootState.auth.token, //accessToken contain bearer value.
        },
        body: JSON.stringify({
          itemId: payload.id,
          quantity: payload.quantity,
          isAddToCart: false,
        }),
      }
    );
    context.dispatch("fetchUserCart");
    return response;
  },
};
