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
        <div
          class="date"
          v-if="!edit"
        >
          {{comment.commentDate}} by {{comment.user.username}}: <span v-if="role === 'Admin' || comment.user._id === user">( <a
              href="#"
              @click.prevent="showEditor(post.title, post.body)"
            ><span>Edit</span></a> | <a
              href="#"
              @click.prevent="deletePost"
            ><span>Delete</span></a> )</span>
        </div>
        <div
          class="body"
          v-html="comment.body"
          v-if="!edit && commentId !== comment._id"
        />
        <form
          @submit.prevent="editComment"
          v-if="edit && commentId === comment._id"
          id="edit"
        >
          <wysiwyg v-model="editBody" />
          <button
            v-if="edit && commentId === comment._id"
            @click.prevent="editComment"
            class="hvr-rotate"
          >Edit Comment</button>
          <button
            v-if="edit && commentId === comment._id"
            @click.prevent="cancelEdit"
          >Cancel</button>
        </form>
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
          <p v-if="this.success">Comment posted.</p>
          <wysiwyg
            v-model="body"
            placeholder="Type your comment here."
            name="new-comment"
          />
          <button
            type="submit"
            class="hvr-rotate"
          >Post Comment</button>
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
    postId: String,
    removeCommentFromBlog: Function,
    addCommentToBlog: Function,
    changeCommentOnPost: Function,
    role: String
  },
  data() {
    return {
      body: "",
      loading: false,
      success: false,
      error: null,
      edit: false,
      commentId: "",
      editBody: ""
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
        const newComment = res.data.data;
        await this.$props.addCommentToBlog(newComment);
        this.success = true;
        this.loading = false;
      }
    },
    openEditor: async function(id, body) {
      this.commentId = id;
      this.edit = true;
      this.editBody = body;
    },
    deleteComment: async function(commentId) {
      this.loading = true;
      const { user, postId } = this.$props;
      const token = await getToken();
      const res = await axios({
        method: "DELETE",
        url: `/api/comments/${commentId}`,
        data: {
          user,
          postId,
          token
        }
      });
      if (res) {
        const index = this.$props.comments.findIndex(
          comment => comment._id === commentId
        );
        await this.$props.removeCommentFromBlog(index);
        this.loading = false;
      }
    },
    cancelEdit: async function() {
      this.edit = false;
      this.editBody = "";
      this.commentId = "";
    },
    editComment: async function() {
      const { commentId: id, editBody: body } = this.$data;
      const { user } = this.$props;
      const token = await getToken();
      const res = await axios({
        method: "PUT",
        url: `/api/comments/${id}`,
        data: {
          user,
          body,
          token
        }
      });
      const comment = res.data.data;
      await this.$props.changeCommentOnPost(id, comment);
      this.edit = false;
      this.commentId = "";
      this.editBody = "";
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
  position: relative;
}

.comment .date {
  font-family: "Neuton", serif;
  font-size: 0.95rem;
  margin-bottom: 20px;
  margin-top: 5px;
}

.comment .body {
  font-size: 1.2rem;
  margin-left: 20px;
}

.new-comment form {
  width: 40%;
  margin-bottom: 40px;
}

.date a {
  text-decoration: underline;
  color: #0557a3;
}

.date a span {
  color: #fff;
  transition: 0.3s all ease-in-out;
}

.date a:hover span {
  color: #0557a3;
}

#edit button:first-of-type {
  background: #011f4b;
  border: 1px solid #011f4b;
  padding: 10px 15px;
  color: #b3cde0;
  margin-right: 10px;
  transition: all 0.3s ease-in-out;
}

#edit {
  margin-top: 20px;
}

#edit button:first-of-type:hover {
  background: #fff;
  color: #011f4b;
}

#edit button:last-of-type {
  background: #fff;
  border: 1px solid #011f4b;
  padding: 10px 15px;
  color: #011f4b;
  transition: all 0.3s ease-in-out;
}

#edit button:last-of-type:hover {
  background: #b3cde0;
}

@media (max-width: 414px) {
  .comments {
    width: 95%;
  }
  .new-comment form {
    max-width: 414px !important;
    width: 95%;
  }

  fieldset {
    width: 95% !important;
  }
}
</style>