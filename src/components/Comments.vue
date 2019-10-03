<template>
  <div class="comments">
    <div
      class="comment-wrapper"
      v-if="comments.length > 0"
    >
      <div
        class="comment"
        v-for="comment in comments"
        :key="comment._id"
      >
        <p>Comments</p>
      </div>
    </div>
    <div
      class="new-comment"
      v-if="this.user"
    >
      <h3>Write a comment:</h3>
      <form
        :disabled="this.loading"
        @submit.prevent="postComment"
      >
        <fieldset :aria-busy="this.loading">
          <wysiwyg
            v-model="body"
            placeholder="Type your comment here."
          />
          <button type="submit">Post Comment</button>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: String,
    comments: Array
  },
  data() {
    return {
      body: "",
      loading: false,
      success: false,
      error: null
    };
  },
  methods: {
    postComment: function() {
      console.log("posting comment");
    }
  }
};
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

.new-comment form {
  width: 40%;
}
</style>