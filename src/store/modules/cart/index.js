import cartMutations from "./mutations.js";
import cartActions from "./actions.js";
import cartGetters from "./getters.js";

const cartModule = {
  namespaced: true,
  state() {
    return {
      userCart: [],
    };
  },
  getters: cartGetters,
  actions: cartActions,
  mutations: cartMutations,
};

export default cartModule;
