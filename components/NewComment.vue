<template>
  <div class="new-comment">
    <h3>Write a comment:</h3>
    <form>
      <fieldset>
        <client-only>
          <mavon-editor
            v-model="body"
            language="en"
            placeholder="Your comment goes here..."
          />
        </client-only>
        <button type="submit" class="hvr-rotate" @click.prevent="submitBody">
          Post Comment
        </button>
      </fieldset>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { getToken } from "../services/tokenService";
export default {
  name: "NewComment",
  data() {
    return {
      body: ""
    };
  },
  methods: {
    ...mapActions(["postComment"]),
    submitBody: function() {
      const { _id: postId } = this.$store.state.post;
      const { user } = this.$store.state;
      const { body } = this.$data;
      const token = getToken();
      this.postComment({ postId, user, body, token });
    }
  }
};
</script>

<style>
.v-note-wrapper {
  margin-bottom: 20px;
  z-index: 2 !important;
}
</style>
