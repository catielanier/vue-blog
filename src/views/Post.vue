<template>
  <section class="post">
    <form
      id="edit"
      @submit.prevent="editPost"
    >
      <div class="title">
        <h1 v-if="!this.edit">{{post.title}}</h1>
        <input
          type="text"
          v-model="title"
          v-if="this.edit"
        >
      </div>
      <div
        class="date"
        v-if="!this.edit"
      >
        {{post.postDate}} by {{post.user.username}}:
      </div>
      <div
        class="body"
        v-html="post.body"
        v-if="!this.edit"
      />
      <div
        class="body"
        v-if="this.edit"
      >
        <wysiwyg v-model="body" />
        <button type="submit">
          Edit Post
        </button>
        <button @click.prevent="cancelEdit">
          Cancel
        </button>
      </div>
    </form>
    <div
      class="delete"
      v-if="user === post.user._id || role === 'Admin'"
    >
      <button
        v-if="!this.edit"
        @click.prevent="showEditor(post.title, post.body)"
      >
        <font-awesome-icon :icon="['fas', 'edit']" />
      </button>
      <button
        v-if="!this.edit"
        @click.prevent="deletePost"
      >
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
      :changeCommentOnPost="changeCommentOnPost"
    />
  </section>
</template>

<script>
import axios from "axios";
import Comments from "../components/Comments.vue";
import dateFormatter from "../services/dateFormatter";
import { getToken } from "../services/tokenService";
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
      post: {},
      edit: false,
      title: "",
      body: "",
      deleted: false
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
      comment.commentDate = dateFormatter(comment.commentDate);
      this.post.comments.push(comment);
    },
    changeCommentOnPost: function(id, comment) {
      const index = this.$data.post.comments.findIndex(
        comment => comment._id === id
      );
      this.post.comments[index] = comment;
    },
    showEditor: function(title, body) {
      this.edit = true;
      this.title = title;
      this.body = body;
    },
    cancelEdit: function() {
      this.edit = false;
      this.title = "";
      this.body = "";
    },
    editPost: async function() {
      const { title, body } = this.$data;
      const { user, id } = this.$props;
      const token = await getToken();
      const res = await axios({
        method: "POST",
        url: `/api/posts/${id}`,
        data: {
          user,
          title,
          body,
          token
        }
      });
      const { title: newTitle, body: newBody } = this.data.data;
      this.post.title = newTitle;
      this.post.body = newBody;
      this.edit = false;
      this.title = "";
      this.body = "";
    }
  }
};
</script>

<style scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
.post {
  text-align: left;
  max-width: 1240px;
  width: 100%;
  margin: 0 auto;
  position: relative;
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
.post > .delete {
  position: absolute;
  top: 70px;
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