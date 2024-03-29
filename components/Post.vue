<template>
  <Fragment>
    <div class="title">
      <h1 v-if="!singlePost">
        <nuxt-link :to="`/post/${id}`">
          <span>{{ title }}</span>
        </nuxt-link>
      </h1>
      <h1 v-if="singlePost">{{ title }}</h1>
    </div>
    <div class="date">
      {{ postDate }} by {{ username }}
      <span
        v-if="singlePost && (role === 'Admin' || userId === user)"
      >
        (
        <nuxt-link :to="`/post/${id}/edit`">
          <span>Edit</span>
        </nuxt-link>|
        <a href="#" @click.prevent="openDelete">
          <span>Delete</span>
        </a>
        )
      </span>
    </div>
    <div class="header-image">
      <img :src="headerImage" alt="Header" />
    </div>
    <vue-simple-markdown class="body" :source="body" />
    <div class="delete-modal" v-if="deleteMode">
      <h3>Do you wish to delete this post?</h3>
      <button @click.prevent="deletePost">Yes</button>
      <button @click.prevent="openDelete">No</button>
    </div>
  </Fragment>
</template>

<script>
import { Fragment } from "vue-fragment";
import { mapState, mapActions } from "vuex";
export default {
  name: "Post",
  components: {
    Fragment,
  },
  props: {
    id: String,
    headerImage: String,
    postDate: String,
    body: String,
    title: String,
    username: String,
    singlePost: Boolean,
    userId: String,
    tags: String | undefined,
  },
  computed: {
    ...mapState(["user", "role"]),
  },
  data() {
    return {
      deleteMode: false,
    };
  },
  head() {
    return {
      title: this.$props.singlePost
        ? `${this.$props.title} | Blog [Catie Lanier]`
        : null,
      meta: this.$props.singlePost
        ? [
            {
              hid: "twitter:card",
              name: "twitter:card",
              content: "summary",
            },
            {
              hid: "twitter:site",
              name: "twitter:site",
              content: "@clDOTjs",
            },
            {
              hid: "twitter:creator",
              name: "twitter:creator",
              content: "@clDOTjs",
            },
            {
              hid: "twitter:url",
              name: "twitter:url",
              content: `https://blog.coreylanier.com/post/${this.$props.id}`,
            },
            {
              hid: "twitter:image",
              name: "twitter:image",
              content: this.$props.headerImage,
            },
            {
              hid: "twitter:title",
              name: "twitter:title",
              content: this.$props.title,
            },
            {
              hid: "og:title",
              name: "og:title",
              content: this.$props.title,
            },
            {
              hid: "og:image",
              name: "og:image",
              content: this.$props.headerImage,
            },
            {
              hid: "keywords",
              name: "keywords",
              content: this.$props.tags,
            },
          ]
        : null,
    };
  },
  methods: {
    ...mapActions(["removePost"]),
    openDelete: function () {
      const deleteMode = !this.$data.deleteMode;
      this.deleteMode = deleteMode;
    },
    deletePost: function () {
      const { id, userId: user } = this.$props;
      axios({ method: "DELETE", url: `/api/posts/${id}`, data: { user } }).then(
        () => {
          router.push("/");
        }
      );
    },
  },
  destroyed() {
    if (this.$props.singlePost) {
      const { id } = this.$props;
      this.removePost(id);
    }
  },
};
</script>

<style>
.delete-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  border: 4px solid #c28485;
  background-color: #fcccd3;
  z-index: 5000;
  padding: 10px 15px 25px;
  box-shadow: 0 0 0 1920px rgba(0, 0, 0, 0.5);
}
.delete-modal button {
  font-family: "Comfortaa", serif;
  border: 0;
  border-radius: 5px;
  margin-top: 15px;
  background: #c28485;
  color: #fcccd3;
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: bold;
  padding: 20px 20px 15px;
  cursor: pointer;
}
h1 {
  font-family: "Comfortaa", sans-serif;
  font-size: 1.9rem;
}

.markdown-body {
  color: #303030 !important;
  font-family: "Arvo", serif !important;
  font-size: 1.2rem !important;
}

.markdown-body h2 {
  font-family: "Neuton", serif;
  font-size: 1.5em !important;
  border-bottom: 0 !important;
  margin: 0 !important;
  margin-bottom: -20px !important;
  padding: 0 !important;
}

.markdown-body pre {
  width: 95% !important;
  margin: 0 auto;
  border: 1px dashed #0757a3;
  color: #fcccd3;
}
</style>
