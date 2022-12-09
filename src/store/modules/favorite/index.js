import favoriteMutations from "./mutations.js";
import favoriteActions from "./actions.js";
import favoriteGetters from "./getters.js";

const favoriteModule = {
  namespaced: true,
  state() {
    return {
      userFavorites: [],
    };
  },
  getters: favoriteGetters,
  actions: favoriteActions,
  mutations: favoriteMutations,
};

export default favoriteModule;
