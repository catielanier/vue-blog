<template>
  <section class="post">
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