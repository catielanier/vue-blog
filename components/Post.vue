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
      <span v-if="singlePost && (role === 'Admin' || userId === user)"
        >(
        <nuxt-link :to="`/post/${id}/edit`"><span>Edit</span></nuxt-link>
        |
        <a href="#" @click.prevent="openDelete"><span>Delete</span></a>
        )</span
      >
    </div>
    <div class="header-image">
      <img :src="headerImage" alt="Header" />
    </div>
    <div class="body" v-html="body" />
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
    Fragment
  },
  props: {
    id: String,
    headerImage: String,
    postDate: String,
    body: String,
    title: String,
    username: String,
    singlePost: Boolean,
    userId: String
  },
  computed: {
    ...mapState(["user", "role"])
  },
  data() {
    return {
      deleteMode: false
    };
  },
  methods: {
    ...mapActions(["removePost"]),
    openDelete: function() {
      const deleteMode = !this.$data.deleteMode;
      this.deleteMode = deleteMode;
    },
    deletePost: function() {
      const { id, userId: user } = this.$props;
      axios({ method: "DELETE", url: `/api/posts/${id}`, data: { user } }).then(
        () => {
          router.push("/");
        }
      );
    }
  },
  destroyed() {
    if (this.$props.singlePost) {
      const { id } = this.$props;
      this.removePost(id);
    }
  }
};
</script>

<style>
.delete-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  border: 4px solid #b3cde0;
  background-color: #252835;
  z-index: 5000;
  padding: 10px 15px 25px;
  box-shadow: 0 0 0 1920px rgba(0, 0, 0, 0.5);
}
.delete-modal button {
  font-family: "Comfortaa", serif;
  border: 0;
  border-radius: 5px;
  margin-top: 15px;
  background: #b3cde0;
  color: #252835;
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: bold;
  padding: 20px 20px 15px;
  cursor: pointer;
}
</style>
