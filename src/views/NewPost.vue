<template>
  <section class="new-post">
    <h1>New Post</h1>
    <form
      class="new-post-form"
      @submit.prevent="postBlog"
      :disabled="this.loading"
    >
      <fieldset :aria-busy="this.loading">
        <p v-if="success">Successfully posted.</p>
        <p v-if="error"><span>Error:</span> {{error}}</p>
        <div class="input-container">
          <div>
            <input
              type="text"
              v-model="title"
              name="title"
              placeholder="Title"
            />
          </div>
          <datetime
            v-model="postDate"
            name="postDate"
            placeholder="Post Date (Leave empty if right now)"
            type="datetime"
          />
        </div>
        <wysiwyg
          v-model="body"
          placeholder="Type your post here."
        />
        <button
          type="submit"
          class="hvr-rotate"
        >Create Post</button>
      </fieldset>
    </form>
  </section>
</template>

<script>
import axios from "axios";
import { getToken } from "../services/tokenService";
import "vue-datetime/dist/vue-datetime.css";
export default {
  name: "new-post",
  props: {
    user: String
  },
  data() {
    return {
      loading: false,
      title: "",
      body: "",
      postDate: null,
      error: null,
      success: false
    };
  },
  methods: {
    postBlog: async function() {
      const { title, body } = this.$data;
      const { user } = this.$props;
      const token = await getToken();
      const postDate = this.$data.postDate || Date.now();

      this.loading = true;

      const post = {
        title,
        body,
        postDate,
        user
      };

      const res = await axios({
        method: "POST",
        url: "/api/posts/new",
        data: {
          user,
          post,
          token
        }
      });
      this.loading = false;
      if (res) {
        this.success = true;
      }
    }
  }
};
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
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
  grid-gap: 10px;
}
input {
  background: none;
}
input::placeholder {
  color: #ddd;
}
.editr {
  margin-bottom: 20px;
  border: 0;
  border-radius: 5px;
  border-bottom: 2px solid #0557a3;
  transition: all 0.3s ease-in-out;
}

.editr:focus-within {
  border-color: #b3cde0;
}
.new-post-form button {
  margin-bottom: 40px;
}

@media (max-width: 414px) {
  .input-container {
    grid-template-columns: 1fr;
  }

  .editr {
    max-width: 414px !important;
    width: 95% !important;
  }
}
</style>