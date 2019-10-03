<template>
  <section class="post">
    <h2>Post</h2>
  </section>
</template>

<script>
import axios from "axios";
import dateFormatter from "../services/dateFormatter";
export default {
  name: "post",
  data() {
    return {
      post: null
    };
  },
  async mounted() {
    const id = location.href.replace(/(.+\w\/)(.+)/, "");
    await axios.get(`/api/posts/${id}`).then(res => {
      const post = res.data.data[0];
      post.postDate = dateFormatter(post.postDate);
      this.post = post;
    });
  }
};
</script>