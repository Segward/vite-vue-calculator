import { createStore } from "vuex";
import axios from "axios";

const apiUrl = "http://localhost:3000/users";

export default createStore({
  state: {
    name: "",
    email: "",
    message: "",
  },
  mutations: {
    setName(state, name) {
      state.name = name;
    },
    setEmail(state, email) {
      state.email = email;
    },
    setMessage(state, message) {
      state.message = message;
    },
  },
  actions: {
    async saveUserData({ commit }, { name, email, message }) {
      commit("setName", name);
      commit("setEmail", email);
      commit("setMessage", message);
      const response = await axios.post(apiUrl, { name, email, message });
      return response;
    },
    async loadUserData({ commit }) {
      commit("setName", "");
      commit("setEmail", "");
      commit("setMessage", "");
    },
  },
  getters: {
    getName: (state) => state.name,
    getEmail: (state) => state.email,
    getMessage: (state) => state.message,
  },
});
