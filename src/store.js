import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "./router";
import { setToken, getToken, removeToken } from "./services/tokenService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggingIn: false,
    errorMessage: null,
    user: null,
    role: null,
    showMenu: false,
  },
  mutations: {
    loginStart: (state) => {
      state.loggingIn = true;
    },
    loginStop: (state, errorMessage) => {
      state.loggingIn = false;
      state.errorMessage = errorMessage;
    },
    updateUser: (state, user, role) => {
      state.user = user;
      state.role = role;
    },
    logout: (state) => {
      state.user = null;
      state.role = null;
    },
    updateMenu: (state, status) => {
      state.showMenu = status;
    },
  },
  actions: {
    doLogin: ({ commit }, loginData) => {
      commit("loginStart");
      const { email, password } = loginData;
      axios({
        method: "POST",
        url: "/api/users/login",
        data: {
          email,
          password,
        },
      })
        .then((res) => {
          const { token, id, role } = res.data.data;
          setToken(token);
          localStorage.setItem("vueBlogId", id);
          commit("updateUser", user, role);
          commit("loginStop", null);
          router.push("/");
        })
        .catch((err) => {
          commit("loginStop", "Invalid email or password");
          commit("updateUser", null, null);
        });
    },
    doLogout: () => {
      commit("updateUser", null, null);
      removeToken();
    },
    openMenu: () => {
      commit("updateMenu", true);
    },
    closeMenu: () => {
      commit("updateMenu", false);
    },
  },
});
