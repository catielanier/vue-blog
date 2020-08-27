<template>
  <div class="posts" v-if="posts.length > 0">
    <div class="blog-post" v-for="post in posts" :key="post._id">
      <Post
        :id="post._id"
        :body="post.bodyPreview"
        :title="post.title"
        :username="post.user.username"
        :postDate="post.postDate"
        :singlePost="false"
        :headerImage="post.headerImage"
      />
      <div class="read-more">
        <nuxt-link :to="'/post/' + post._id">
          <span>Continue Reading</span>
        </nuxt-link>
      </div>
      <div class="comments-quantity">
        {{ post.comments.length }} comment
        <span v-if="post.comments.length !== 1">s</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Post from "../components/Post";
export default {
  name: "Posts",
  components: { Post },
  computed: {
    ...mapState(["posts"])
  },
  methods: {
    ...mapActions(["getPosts"])
  },
  beforeMount() {
    //preparing for pagination
    if (this.posts.length === 0) {
      this.getPosts();
    }
  }
};
</script>

<style>
.posts {
  text-align: left;
  max-width: 1280px;
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
  font-family: "Comfortaa";
}
h1 {
  margin-bottom: 5px;
  padding-bottom: 0;
  font-size: 1.9rem;
}
h1 a {
  text-decoration: underline;
  color: #0557a3;
}

h1 a span,
.read-more a span {
  color: #fff;
  transition: 0.3s all ease-in-out;
}
h1 a:hover span,
.read-more a:hover span {
  color: #0557a3;
}
p {
  font-size: 1.4rem;
}
.date {
  font-family: "Neuton", serif;
  font-size: 0.95rem;
  margin-bottom: 20px;
}
.body {
  margin-bottom: 20px;
  font-size: 1.2rem;
}
.body h2 {
  font-size: 1.3rem;
}
.comments-quantity {
  font-family: "Neuton", serif;
  font-size: 0.95rem;
  font-weight: bold;
}
.header-image img {
  width: 100%;
  margin-bottom: 20px;
}

.read-more a {
  font-family: "Neuton", serif;
  font-size: 1.5rem;
  color: #0557a3;
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
