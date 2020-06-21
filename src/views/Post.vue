<template>
  <section class="post">
    <form id="edit" @submit.prevent="editPost">
      <div class="title">
        <h1 v-if="!this.edit">{{ post.title }}</h1>
        <input type="text" v-model="title" v-if="this.edit" />
      </div>
      <div class="date" v-if="!this.edit">
        {{ post.postDate }} by {{ post.user.username
        }}<span v-if="role === 'Admin' || post.user._id === user">
          ({{ post.reads }} view<span v-if="post.reads > 1 || post.reads === 0"
            >s</span
          >)</span
        >:
        <span v-if="role === 'Admin' || post.user._id === user"
          >(
          <a href="#" @click.prevent="showEditor(post.title, post.body)"
            ><span>Edit</span></a
          >
          |
          <a href="#" @click.prevent="deletePost"><span>Delete</span></a>
          )</span
        >
      </div>
      <div class="header-image">
        <img :src="post.headerImage" alt="Header" />
      </div>
      <div class="body" v-html="post.body" v-if="!this.edit" />
      <div class="body" v-if="this.edit">
        <wysiwyg v-model="body" />
        <button type="submit">
          Edit Post
        </button>
        <button @click.prevent="cancelEdit">
          Cancel
        </button>
      </div>
    </form>
    <div class="comments-quantity">
      {{ post.comments.length }} comment<span v-if="post.comments.length !== 1"
        >s</span
      >:
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
import { mapState } from "vuex";
import axios from "axios";
import Comments from "../components/Comments.vue";
import dateFormatter from "../services/dateFormatter";
import { getToken } from "../services/tokenService";
import router from "../router";
export default {
  name: "post",
  components: {
    Comments,
  },
  props: {
    id: String,
    description: String,
    postTitle: String,
    image: String,
  },
  computed: {
    ...mapState(["user", "role"]),
  },
  data() {
    return {
      post: {},
      edit: false,
      title: "",
      body: "",
      deleted: false,
      loading: false,
    };
  },
  async beforeMount() {
    const { id } = this.$props;
    await axios.put(`/api/posts/counter/${id}`);
    await axios.get(`/api/posts/${id}`).then((res) => {
      const post = res.data.data;
      post.postDate = dateFormatter(post.postDate);
      post.comments.forEach((comment) => {
        comment.commentDate = dateFormatter(comment.commentDate);
      });
      this.post = post;
    });
  },
  metaInfo() {
    return {
      title: this.post.title,
      meta: [
        {
          lang: "en",
        },
        {
          property: "og:title",
          content: this.title,
          template: (chunk) => `${chunk} | Blog [Corey Lanier]`,
          vmid: "og:title",
        },
        {
          property: "twitter:title",
          content: this.title,
          template: (chunk) => `${chunk} | Blog [Corey Lanier]`,
          vmid: "twitter:title",
        },
        {
          property: "image",
          content: this.image,
          vmid: "image",
        },
        {
          property: "og:image",
          content: this.image,
          vmid: "og:image",
        },
        {
          property: "twitter:image",
          content: this.image,
          vmid: "twitter:image",
        },
        {
          property: "description",
          content: this.description,
          vmid: "description",
        },
        {
          property: "og:description",
          content: this.description,
          vmid: "og:description",
        },
        {
          property: "twitter:description",
          content: this.description,
          vmid: "twitter:description",
        },
        {
          property: "og:url",
          content: `https://blog.coreylanier.com/${this.id}`,
          vmid: "og:url",
        },
        {
          property: "twitter:url",
          content: `https://blog.coreylanier.com/${this.id}`,
          vmid: "twitter:url",
        },
        {
          property: "twitter:card",
          content: "summary_large_image",
          vmid: "twitter:card",
        },
        {
          property: "twitter:site",
          content: "@JTMMissingPersn",
          vmid: "twitter:site",
        },
      ],
    };
  },
  methods: {
    deletePost: async function() {
      // TODO: Implement post deletion and reroute to '/'
      const { id } = this.$props;
      const { user } = this.$data;
      const res = await axios({
        method: "DELETE",
        url: `/api/posts/${id}`,
        data: {
          user,
        },
      });
      if (res) {
        router.push("/");
      }
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
        (comment) => comment._id === id
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
      const { title, body, user } = this.$data;
      const { id } = this.$props;
      const token = await getToken();
      const res = await axios({
        method: "PUT",
        url: `/api/posts/${id}`,
        data: {
          user,
          title,
          body,
          token,
        },
      });
      const { title: newTitle, body: newBody } = res.data.data;
      this.post.title = newTitle;
      this.post.body = newBody;
      this.edit = false;
      this.title = "";
      this.body = "";
    },
  },
};
</script>

<style scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
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
