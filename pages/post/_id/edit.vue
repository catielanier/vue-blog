<template>
  <section class="new-post" v-if="body !== null">
    <form class="new-post-form" @submit.prevent="submitPost">
      <fieldset>
        <div class="input-container">
          <div>
            <input
              type="text"
              v-model="title"
              name="title"
              placeholder="title"
            />
          </div>
          <div>
            <datetime
              v-model="postDate"
              type="datetime"
              name="postDate"
              placeholder="Post Date (Leave empty if right now)"
            />
          </div>
          <div>
            <input
              type="text"
              v-model="headerImage"
              placeholder="Header Image URL"
              name="headerImage"
            />
          </div>
          <div class="header-image-preview">
            <img :src="headerImage" v-if="headerImage !== ''" alt="Preview" />
          </div>
        </div>
        <no-ssr>
          <mavon-editor
            v-model="body"
            language="en"
            placeholder="Post body..."
          />
        </no-ssr>
        <input
          type="text"
          v-model="tags"
          placeholder="Post Metatags (Separate by commas)"
        />
        <button type="submit" class="hvr-rotate">Create Post</button>
      </fieldset>
    </form>
  </section>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
export default {
  name: "EditPost",
  data() {
    return {
      postDate: null,
      title: null,
      body: null,
      tags: null,
      headerImage: null
    };
  },
  async beforeMount() {
    this.checkUser();
    const { id } = this.$route.params;
    const res = await axios.get(`/api/posts/${id}`);
    const { postDate, title, body, tags, headerImage } = res.data.data;
    this.postDate = postDate;
    this.title = title;
    this.body = body;
    this.tags = tags;
    this.headerImage = headerImage;
  },
  head() {
    return {
      title: "Edit Post | Blog [Corey Lanier]"
    };
  },
  methods: {
    ...mapActions(["updatePost", "checkUser"]),
    submitPost: function() {
      const { postDate, title, body, tags, headerImage } = this.$data;
      const { user } = this.$store.state;
      const { id: postId } = this.$route.params;
      this.updatePost({
        postDate,
        title,
        body,
        tags,
        headerImage,
        user,
        postId
      });
    },
    submitRedirect: function() {
      const { redirect } = this.$store.state;
      if (redirect) {
        router.push(`/post/${redirect}`);
      }
    }
  }
};
</script>

<style>
.new-post {
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
  text-align: left;
}
h1 {
  font-family: "Neuton", serif;
}
form.new-post-form,
.new-post-form fieldset {
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
}
.input-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 25px;
  margin-bottom: 40px;
}
input {
  background: none;
}
input::placeholder {
  color: #ddd;
}
.v-note-wrapper {
  margin-bottom: 20px;
  z-index: 2 !important;
}
.editr:focus-within {
  border-color: #c28485;
}
.new-post-form button {
  margin-bottom: 40px;
}
.vdatetime-overlay {
  z-index: 2499;
}
.vdatetime-popup {
  z-index: 2500;
}
.header-image-preview img {
  width: 100%;
}
@media (max-width: 414px) {
  .new-post {
    width: 95%;
  }
  form.new-post-form,
  .new-post-form fieldset {
    width: 95%;
  }
  .input-container {
    width: 95%;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    margin-bottom: 15px;
  }
  input {
    width: 90% !important;
  }
}
</style>
