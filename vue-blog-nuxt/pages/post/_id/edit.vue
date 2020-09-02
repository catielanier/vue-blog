<template>
  <section class="new-post">
    <form class="new-post-form">
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
export default {
  name: "EditPost",
  data() {
    return {
      postDate: null,
      title: null,
      body: null,
      tags: null
    };
  },
  async beforeMount() {
    const { id } = this.$route.params;
    console.log("running");
    const res = await axios.get(`/api/posts/${id}`);
    const { postDate, title, body, tags } = res.data.data;
    this.postDate = postDate;
    this.title = title;
    this.body = body;
    this.tags = tags;
  }
};
</script>
