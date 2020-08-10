import axios from "axios";
import { setToken, removeToken } from "../services/tokenService";

export const state = () => ({
  loggingIn: false,
  errorMessage: null,
  user: null,
  role: null,
  showMenu: false
});

export const mutations = {
  loginStart(state) {
    state.loggingIn = true;
  },
  loginStop(state, errorMessage) {
    state.loggingIn = false;
    state.errorMessage = errorMessage;
  },
  updateUser(state, user) {
    state.user = user.id;
    state.role = user.role;
  },
  logout(state) {
    state.user = null;
    state.role = null;
  },
  updateMenu(state, bool) {
    state.showMenu = bool;
  }
};

export const actions = {
  doLogin({ commit }, loginData) {
    commit("loginStart");
    const { email, password } = loginData;
    axios
      .post("/api/users/login", { data: { email, password } })
      .then(res => {
        const { token, id, role } = res.data.data;
        setToken(token);
        localStorage.setItem("vueBlogId", id);
        commit("updateUser", { id, role });
        commit("loginStop", null);
      })
      .catch(_ => {
        commit("loginStop", "Invalid email or password");
        commit("updateUser", { id: null, role: null });
      });
  },
  doLogout({ commit }) {
    commit("updateUser", { id: null, role: null });
    removeToken();
    localStorage.removeItem("vueBlogId");
  },
  openMenu({ commit }) {
    commit("updateMenu", true);
  },
  closeMenu({ commit }) {
    commit("updateMenu", false);
  },
  async checkUser({ commit }) {
    const id = localStorage.getItem("vueBlogId");
    const res = await axios.get(`/api/users/${id}`);
    const { role } = res.data.data;
    commit("updateUser", { id, role });
  }
};
