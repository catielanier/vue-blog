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
        <button type="submit">Create Post</button>
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
form.new-post-form,
.new-post-form fieldset {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
}
.input-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
}
.editr {
  margin-bottom: 20px;
  border: 1px solid #011f4b;
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