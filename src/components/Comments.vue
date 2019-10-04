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
        <div class="date">
          {{comment.commentDate}} by {{comment.user.username}}
        </div>
        <div
          class="body"
          v-html="comment.body"
        />
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
import axios from "axios";
import { getToken } from "../services/tokenService";
export default {
  props: {
    user: String,
    comments: Array,
    postId: String
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
    postComment: async function() {
      this.loading = true;
      const { body } = this.$data;
      const { postId, user } = this.$props;
      const token = await getToken();
      const comment = {
        user,
        body,
        commentDate: Date.now()
      };
      const res = await axios({
        method: "POST",
        url: "/api/comments/new",
        data: {
          user,
          comment,
          token,
          postId
        }
      });
      if (res) {
        this.success = true;
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

.comment-wrapper {
  max-width: 1240px;
  width: 95%;
  margin: 30px auto;
}

.comment {
  border-top: 1px dashed #b3cde0;
  border-bottom: 1px dashed #b3cde0;
  padding: 0 0 20px;
}

.comment .date {
  font-size: 0.7rem;
  margin-bottom: 20px;
}

.comment .body {
  margin-left: 20px;
}

.new-comment form {
  width: 40%;
  margin-bottom: 40px;
}
</style>