<template>
  <section class="post">
    <div class="title">
      <h1>{{post.title}}</h1>
    </div>
    <div class="date">
      {{post.postDate}} by {{post.user.username}}:
    </div>
    <div
      class="body"
      v-html="post.body"
    />
    <div
      class="delete"
      v-if="user === post.user._id || role === 'Admin'"
    >
      <button>
        <font-awesome-icon :icon="['fas', 'edit']" />
      </button>
      <button @click.prevent="deletePost">
        <font-awesome-icon :icon="['fas', 'trash']" />
      </button>
    </div>
    <div class="comments-quantity">
      {{post.comments.length}} comment<span v-if="post.comments.length !== 1">s</span>:
    </div>
    <Comments
      :user="user"
      :comments="post.comments"
      :postId="id"
      :role="role"
      :removeCommentFromBlog="removeCommentFromBlog"
      :addCommentToBlog="addCommentToBlog"
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
    id: String,
    role: String
  },
  data() {
    return {
      post: {}
    };
  },
  async mounted() {
    const { id } = this.$props;
    await axios.get(`/api/posts/${id}`).then(res => {
      const post = res.data.data;
      post.postDate = dateFormatter(post.postDate);
      post.comments.forEach(comment => {
        comment.commentDate = dateFormatter(comment.commentDate);
      });
      this.post = post;
    });
  },
  methods: {
    deletePost: async function() {
      console.log("Deleting post.");
    },
    removeCommentFromBlog: function(index) {
      this.post.comments.splice(index, 1);
    },
    addCommentToBlog: function(comment) {
      this.post.comments.push(comment);
    }
  }
};
</script>

<style scoped>
.post {
  text-align: left;
  max-width: 1240px;
  width: 100%;
  margin: 0 auto;
  position: relative;
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
.post > .delete {
  position: absolute;
  top: 0;
  right: 0;
}

.post > .delete button {
  font-size: 0.85rem;
  color: #b3cde0;
  background: #325c7b;
  border: 0;
  padding: 5px 8px;
}

.post > .delete button:first-of-type {
  margin-right: 5px;
}
</style>