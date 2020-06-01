import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

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
    updateUser: (state, user) => {
      state.user = user;
    },
    logout: (state) => {
      state.user = null;
    },
  },
  actions: {},
});
