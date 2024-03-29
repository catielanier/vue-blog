<template>
  <div class="posts" v-if="posts.length > 0">
    <div class="blog-post" v-for="(post, index) in posts" :key="post._id">
      <Post
        :id="post._id"
        :body="post.bodyPreview"
        :title="post.title"
        :username="post.user.username"
        :postDate="post.postDate"
        :singlePost="false"
        :headerImage="post.headerImage"
        :userId="post.user._id"
      />
      <div class="read-more">
        <nuxt-link :to="'/post/' + post._id">
          <span>Continue Reading</span>
        </nuxt-link>
      </div>
      <div class="comments-quantity">
        {{ post.comments.length }} comment<span
          v-if="post.comments.length !== 1"
          >s</span
        >
      </div>
      <div v-if="index !== posts.length -1" class="divider">
        <div class="div-transparent" />
        <img src="../assets/monogram.png" alt="monogram">
      </div>
    </div>
    <div class="pagination-button" v-if="posts % 5 === 0">
      <button>View More Posts</button>
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
    ...mapState(["posts", "totalPages"]),
  },
  data() {
    return {
      page: 1,
    };
  },
  methods: {
    ...mapActions(["getPosts", "checkUser", "getNextPage"]),
    loadMorePosts: function () {
      const page = Math.ceil(this.posts.length / 5);
      if (page < this.totalPages) {
        getNextPage(page + 1);
      }
    },
  },
  beforeMount() {
    //preparing for pagination
    if (this.posts.length === 0) {
      this.getPosts();
    }
    this.checkUser();
  },
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
  color: #f7a3b4;
}

h1 a span,
.read-more a span {
  color: #303030;
  transition: 0.3s all ease-in-out;
}
h1 a:hover span,
.read-more a:hover span {
  color: #f7a3b4;
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
  color: #f7a3b4;
}

.divider {
		margin: 6rem 0;
		position: relative;
		height: 3.5rem;
	}

.div-transparent {
  content: " ";
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  width: 100%;
  height: 2px;
  background-image: linear-gradient(
    to right,
    transparent,
    rgb(194, 132, 133),
    transparent,
    rgb(194, 132, 133),
    transparent
  );
}
.divider img {
  height: 3.5rem;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
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
