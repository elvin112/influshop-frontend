export default {
  setUser(state, payload) {
    state.username = payload.userId;
    state.email = payload.email;
    state.token = payload.token;
    state.isInfluencer = payload.isInfluencer;
    state.didAutoLogout = false;
  },
  setAutoLogout(state) {
    state.didAutoLogout = true;
  },
};
