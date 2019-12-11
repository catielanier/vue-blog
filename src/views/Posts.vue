<template>
  <section class="posts">
    <p v-if="posts.length === 0 && !this.loading">Sorry, but this blog is barren.</p>
    <p v-if="this.loading">Loading, please wait.</p>
    <div
      class="blog-post"
      v-for="post in posts"
      :key="post._id"
    >
      <div class="title">
        <h1>
          <router-link :to="{
            name: 'post',
            props: {
              id: post._id
            },
            params: {
              id: post._id
            }
          }">
            {{post.title}}
          </router-link>
        </h1>

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
      posts: [],
      loading: false
    };
  },
  async mounted() {
    this.loading = true;
    await axios.get("/api/posts").then(res => {
      const posts = res.data.data;
      posts.sort(function(x, y) {
        return y.postDate.localeCompare(x.postDate);
      });
      posts.forEach(post => {
        post.postDate = dateFormatter(post.postDate);
      });
      this.posts = posts;
      this.loading = false;
    });
  }
};
</script>

<style scoped>
.posts {
  text-align: left;
  max-width: 1240px;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 45px;
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
.comments-quantity {
  font-size: 0.85rem;
  font-weight: bold;
}
@media (max-width: 414px) {
  .posts {
    width: 95%;
  }
  h1 {
    margin-top: 10px;
    font-size: 1.8rem;
  }
  h2 {
    font-size: 1.5rem;
  }
}
</style>