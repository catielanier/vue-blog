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
        <Comment
          :commentDate="comment.commentDate"
          :username="comment.user.username"
          :body="comment.body"
          :userId="comment.user._id"
          :commentId="comment._id"
        />
      </div>
    </div>
    <div
      class="new-comment"
      v-if="user && role !== 'Banned'"
    >
      <NewComment />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Comment from "./Comment";
import NewComment from "./NewComment";
export default {
  name: "Comments",
  components: { Comment, NewComment },
  props: {
    comments: Array,
  },
  computed: {
    ...mapState(["user", "role"]),
  },
};
</script>

<style>
.comment-wrapper {
  max-width: 1240px;
  width: 95%;
  margin: 30px auto;
}
.comment {
  border-top: 1px dashed #c28485;
  border-bottom: 1px dashed #c28485;
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
  color: #f7a3b4;
}
.date a span {
  color: #303030;
  transition: 0.3s all ease-in-out;
}
.date a:hover span {
  color: #f7a3b4;
}
#edit button:first-of-type {
  background: #011f4b;
  border: 1px solid #011f4b;
  padding: 10px 15px;
  color: #c28485;
  margin-right: 10px;
  transition: all 0.3s ease-in-out;
}
#edit {
  margin-top: 20px;
}
#edit button:first-of-type:hover {
  background: #303030;
  color: #011f4b;
}
#edit button:last-of-type {
  background: #303030;
  border: 1px solid #011f4b;
  padding: 10px 15px;
  color: #011f4b;
  transition: all 0.3s ease-in-out;
}
#edit button:last-of-type:hover {
  background: #c28485;
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
