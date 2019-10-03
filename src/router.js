import Vue from "vue";
import Router from "vue-router";
import Posts from "./views/Posts.vue";
import Signup from "./views/Signup.vue";
import Login from "./views/Login.vue";
import NewPost from "./views/NewPost.vue";
import Post from "./views/Post.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/sign-up",
      name: "signup",
      component: Signup
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/",
      name: "posts",
      component: Posts
    },
    {
      path: "/new-post",
      name: "new-post",
      component: NewPost
    },
    {
      path: "/post/:id",
      name: "post",
      component: Post
    }
  ]
});
