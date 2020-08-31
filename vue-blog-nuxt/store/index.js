import axios from "axios";
import { setToken, removeToken, getToken } from "../services/tokenService";

export const state = () => ({
  loggingIn: false,
  errorMessage: null,
  user: null,
  role: null,
  showMenu: false,
  posts: [],
  post: null,
  redirect: null
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
  },
  setAllPosts(state, posts) {
    const { posts: currentPosts } = state;
    posts.forEach(post => {
      const datePosted = new Date(post.postDate);
      post.postDate = datePosted.toLocaleString("en-us", {
        dateStyle: "long",
        timeStyle: "short"
      });
    });
    const updatedPosts = [...currentPosts, ...posts];
    state.posts = updatedPosts;
  },
  setSinglePost(state, post) {
    const datePosted = new Date(post.postDate);
    post.postDate = datePosted.toLocaleString("en-us", {
      dateStyle: "long",
      timeStyle: "short"
    });
    post.comments.forEach(comment => {
      const dateCommented = new Date(comment.commentDate);
      comment.commentDate = dateCommented.toLocaleString("en-us", {
        dateStyle: "long",
        timeStyle: "short"
      });
    });
    state.post = post;
  },
  setRedirectId(state, id) {
    state.redirect = id;
  },
  clearPosts(state) {
    state.posts = [];
  },
  unsetLoginErrors(state) {
    state.loggingIn = false;
    state.errorMessage = null;
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
  },
  async getPosts({ commit }) {
    const res = await axios.get("/api/posts");
    commit("setAllPosts", res.data.data);
  },
  async getPost({ commit }, id) {
    const res = await axios.get(`/api/posts/${id}`);
    commit("setSinglePost", res.data.data);
  },
  async createPost({ commit }, data) {
    const { post, user } = data;
    const token = getToken();
    const res = await axios.post(`/api/posts/new`, {
      data: { user, post, token }
    });
    commit("clearPosts");
    this.getPosts();
    commit("setRedirectId", res.data.data._id);
  },
  resetLogin({ commit }) {
    commit("unsetLoginErrors");
  }
};
