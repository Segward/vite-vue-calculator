import { createStore } from "vuex";
import axios from "axios";

const apiUrl = "http://localhost:3000/users";

// json-server --watch db.json --port 3000

export default createStore({
  state: {
    name: "",
    email: "",
  },
  mutations: {
    setName(state, name) {
      state.name = name;
    },
    setEmail(state, email) {
      state.email = email;
    },
  },
  actions: {
    async saveUserData({ commit }, { name, email }) {
      commit("setName", name);
      commit("setEmail", email);
      await axios.post(apiUrl, { name, email });
    },
    async loadUserData({ commit }) {
      const response = await axios.get(apiUrl);
      if (response.data.length > 0) {
        commit("setName", response.data[0].name);
        commit("setEmail", response.data[0].email);
      }
    },
  },
  getters: {
    getName: (state) => state.name,
    getEmail: (state) => state.email,
  },
});
