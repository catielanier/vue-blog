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
    <div class="new-comment">
      <h3>Write a comment:</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: String,
    comments: Array
  }
};
</script>