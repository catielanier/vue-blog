<template>
  <section class="new-post">
    <h1>New Post</h1>
    <form class="new-post-form">
      <fieldset>
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
      </fieldset>
    </form>
  </section>
</template>

<script>
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
      postDate: null
    };
  }
};
</script>

<style>
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
</style>