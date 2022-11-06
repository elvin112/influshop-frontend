export default {
  async fetchInfluencerItems(context, payload) {
    const response = await fetch(
      `http://localhost:8080/api/v1/item-ops/items/testInf1`,
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
      const data = response.json();
      console.log(data);
    }
  },
};
