export default {
  async fetchInfluencerItems(context, payload) {
    const response = await fetch(
      `http://localhost:8080/api/v1/item-ops/items/${context.rootState.auth.username}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw Error("Internal server error");
    } else {
      const data = await response.json();
      context.commit("setInfluencerItems", data.items);
    }
  },

  async deleteItem(context, payload) {
    let endpointUrl = null;

    if (payload.itemType === "item") {
      endpointUrl = `http://localhost:8080/api/v1/item-ops/item/${payload.itemId}`;
    } else {
      const response = await fetch(
        `http://localhost:8080/api/v1/item-ops/item/${context.rootState.auth.username}/${payload.itemName}/extra?${payload.queryParams}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          alert("Item not found!");
          return;
        }
        // throw Error("Internal server error");
      } else {
        const data = await response.json();
        const itemGroupId = data.item.id;
        endpointUrl = `http://localhost:8080/api/v1/item-ops/item/extra/${itemGroupId}`;
      }
    }

    const response = await fetch(endpointUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + context.rootState.auth.token, //accessToken contain bearer value.
      },
    });

    if (!response.ok) {
      throw Error("Internal server error");
    } else {
      if (payload.itemType === "item") {
        context.commit("deleteInfluencerItem", payload.itemId);
      }
      alert("item deleted!");
      context.dispatch("fetchInfluencerItems");
    }
  },
};
