<template>
  <section class="new-post">
    <form class="new-post-form" @submit.prevent="submitBody">
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
import { mapState, mapActions } from "vuex";
export default {
  name: "NewPost",
  computed: {
    ...mapState(["redirect"])
  },
  data() {
    return {
      title: "",
      body: "",
      postDate: "",
      headerImage: "",
      tags: ""
    };
  },
  head() {
    return {
      title: "New Post | Blog [Corey Lanier]"
    };
  },
  methods: {
    ...mapActions(["createPost", "checkUser"]),
    submitBody: function() {
      const { title, body, postDate, headerImage, tags } = this.$data;
      const { user } = this.$store.state;
      const arr = body.split("\n# ");
      const bodyPreview = arr[0];
      this.createPost({
        user,
        post: { title, body, postDate, headerImage, tags, bodyPreview }
      });
    }
  },
  beforeMount() {
    this.checkUser();
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
  border-color: #b3cde0;
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
