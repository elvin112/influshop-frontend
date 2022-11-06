import { createStore } from "vuex";

import rootMutations from "./mutations.js";
import rootActions from "./actions.js";
import rootGetters from "./getters.js";

import authModule from "./modules/auth/index.js";
import influencerModule from "./modules/influencer/index.js";

const store = createStore({
  modules: {
    auth: authModule,
    influencer: influencerModule,
  },
  state() {
    return {};
  },
  getters: rootGetters,
  actions: rootActions,
  mutations: rootMutations,
});

export default store;
