<template>
  <section class="post">
    <div class="title">
      <h1>{{post.title}}</h1>
    </div>
    <div class="date">
      {{post.postDate}} by {{post.user.username}}
    </div>
    <div
      class="body"
      v-html="post.body"
    />
    <div class="comments-quantity">
      {{post.comments.length}} comment<span v-if="post.comments.length !== 1">s</span>
    </div>
    <Comments
      :user="user"
      :comments="post.comments"
      :postId="id"
    />
  </section>
</template>

<script>
import axios from "axios";
import Comments from "../components/Comments.vue";
import dateFormatter from "../services/dateFormatter";
export default {
  name: "post",
  components: {
    Comments
  },
  props: {
    user: String,
    id: String
  },
  data() {
    return {
      post: {},
      postId: ""
    };
  },
  async mounted() {
    const id = location.href.replace(/(.+\w\/)(.+)/, "");
    await axios.get(`/api/posts/${id}`).then(res => {
      const post = res.data.data[0];
      post.postDate = dateFormatter(post.postDate);
      this.post = post;
      post.comments.forEach(comment => {
        comment.commentDate = dateFormatter(comment.commentDate);
      });
    });
  }
};
</script>

<style scoped>
.post {
  text-align: left;
  max-width: 1240px;
  width: 100%;
  margin: 0 auto;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Bebas Neue";
}
h1 {
  margin-bottom: 5px;
  padding-bottom: 0;
}
h1 a {
  text-decoration: none;
  color: #03396c;
  transition: 0.3s all ease-in-out;
  border: 0 #b3cde0;
}
h1 a:hover {
  border-bottom: 3px solid #b3cde0;
}
.date {
  font-size: 0.7rem;
  margin-bottom: 20px;
}
.body {
  margin-bottom: 20px;
}
</style>