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
      try {
        const response = await axios.post(apiUrl, { name, email, message });
        return response;
      } catch (error) {
        console.error("Error saving user data:", error);
        throw error;
      }
    }
  },
  getters: {
    getName: (state) => state.name,
    getEmail: (state) => state.email,
    getMessage: (state) => state.message,
  },
});