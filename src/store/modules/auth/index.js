import authMutations from "./mutations.js";
import authActions from "./actions.js";
import authGetters from "./getters.js";

const authModule = {
  namespaced: true,
  state() {
    return {
      username: null,
      email: null,
      token: null,
      isInfluencer: null,
      didAutoLogout: false,
    };
  },
  getters: authGetters,
  actions: authActions,
  mutations: authMutations,
};

export default authModule;
