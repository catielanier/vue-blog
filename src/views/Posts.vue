<template>
  <div class="home">
    <p v-if="posts.length === 0">Sorry, but this blog is barren.</p>
    <div
      class="blog-post"
      v-for="post in posts"
      :key="post.id"
    >
      <div class="title">
        <h2>{{post.title}}</h2>
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
  </div>
</template>

<script>
import axios from "axios";
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
      this.posts = posts;
    });
  }
};
</script>
