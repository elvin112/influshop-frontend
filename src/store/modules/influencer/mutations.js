export default {
  setInfluencerItems(state, payload) {
    state.influencerItems = payload;
  },
  deleteInfluencerItem(state, payload) {
    state.influencerItems = state.influencerItems.filter(
      (item) => item.id !== payload
    );
  },
};
