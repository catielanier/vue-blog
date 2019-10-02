<template>
  <div class="home">
    <h2>Posts</h2>
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
