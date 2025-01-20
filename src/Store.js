import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      contact: {
        name: "",
        email: "",
        message: "",
      },
    };
  },
  mutations: {
    update(state, payload) {
      state[payload.key] = payload.value;
    },
  },
  actions: {
    update({ commit }, payload) {
      commit("update", payload);
    },
  },
  getters: {
    contact(state) {
      return state.contact;
    },
  },
  setters: {
    contact(state, value) {
      state.contact = value;
    },
  },
});

export default store;
