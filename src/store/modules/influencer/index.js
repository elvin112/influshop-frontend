import influencerMutations from "./mutations.js";
import influencerActions from "./actions.js";
import influencerGetters from "./getters.js";

const influencerModule = {
  namespaced: true,
  state() {
    return {
      influencerItems: [],
    };
  },
  getters: influencerGetters,
  actions: influencerActions,
  mutations: influencerMutations,
};

export default influencerModule;
