export default {
  async fetchUserFavorites(context, payload) {
    const response = await fetch(
      `http://localhost:8080/api/v1/e-commerce/favorite`,
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
      const formattedData = [];
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if (JSON.stringify(element) === "{}") {
          continue;
        }
        formattedData.push(element);
      }
      context.commit("setUserFavorites", formattedData);
    }
  },
  async addItemToFavorites(context, payload) {
    const response = await fetch(
      `http://localhost:8080/api/v1/e-commerce/add-to-favorite`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + context.rootState.auth.token, //accessToken contain bearer value.
        },
        body: JSON.stringify(payload),
      }
    );
    context.dispatch("fetchUserFavorites");
    return response;
  },

  async removeItem(context, payload) {
    const response = await fetch(
      `http://localhost:8080/api/v1/e-commerce/add-to-favorite`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + context.rootState.auth.token, //accessToken contain bearer value.
        },
        body: JSON.stringify({
          itemId: payload.id,
          isAddToFavorite: false,
        }),
      }
    );
    context.dispatch("fetchUserFavorites");
    return response;
  },
};
