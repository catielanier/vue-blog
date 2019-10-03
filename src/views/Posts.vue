<template>
  <section class="posts">
    <p v-if="posts.length === 0">Sorry, but this blog is barren.</p>
    <div
      class="blog-post"
      v-for="post in posts"
      :key="post._id"
    >
      <div class="title">
        <router-link :to="{
          name: 'post',
          params: {
            id: post._id
          }
        }">
          <h2>{{post.title}}</h2>
        </router-link>

      </div>
      <div class="date">
        {{post.postDate}}
      </div>
      <div
        class="body"
        v-html="post.body"
      />
      <div class="comments-quantity">
        {{post.comments.length}} comment<span v-if="post.comments.length !== 1">s</span>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import dateFormatter from "../services/dateFormatter";
export default {
  name: "posts",
  data() {
    return {
      posts: []
    };
  },
  async mounted() {
    await axios.get("/api/posts").then(res => {
      const posts = res.data.data;
      posts.forEach(post => {
        post.postDate = dateFormatter(post.postDate);
      });
      this.posts = posts;
    });
  }
};
</script>
