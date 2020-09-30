<template>
  <div class="post" v-if="post">
    <Post
      :id="post._id"
      :title="post.title"
      :headerImage="post.headerImage"
      :body="post.body"
      :postDate="post.postDate"
      :username="post.user.username"
      :singlePost="true"
      :userId="post.user._id"
      :tags="post.tags"
    />
    <div class="comments-quantity">
      {{ post.comments.length }} comment<span v-if="post.comments.length !== 1"
        >s</span
      >
    </div>
    <Comments :comments="post.comments" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { Post } from "../../../components/Post";
export default {
  name: "SinglePost",
  components: { Post },
  computed: {
    ...mapState(["post"])
  },
  data() {
    return {
      deleteMode: false
    };
  },
  methods: {
    ...mapActions(["getPost", "checkUser"])
  },
  async beforeMount() {
    const { id } = this.$route.params;
    await this.getPost(id);
    this.checkUser();
  }
};
</script>

<style>
.post {
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
h1 a,
.date a {
  text-decoration: underline;
  color: #0557a3;
}

h1 a span,
.date a span {
  color: #fff;
  transition: 0.3s all ease-in-out;
}
h1 a:hover span,
.date a:hover span {
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

#edit button[type="submit"] {
  width: auto;
  padding: 10px 15px;
  margin-right: 10px;
}

#edit button:last-of-type {
  background: #fff;
  border: 1px solid #011f4b;
  padding: 10px 15px;
  color: #011f4b;
  transition: all 0.3s ease-in-out;
}

#edit button:last-of-type:hover {
  background: #b3cde0;
}

#edit {
  margin-top: 15px;
}

.header-image img {
  width: 100%;
  margin-bottom: 20px;
}

@media (max-width: 414px) {
  .post {
    width: 95%;
    margin-bottom: 20px;
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
