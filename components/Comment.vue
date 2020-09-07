<template>
  <Fragment>
    <div class="date">
      {{ commentDate }} by {{ username }}
      <span v-if="role === 'Admin' || userId === user">(
        <a
          href="#"
          @click.prevent="openEdit"
        ><span>Edit</span></a>
        |
        <a
          href="#"
          @click.prevent="openDelete"
        ><span>Delete</span></a>
        )
      </span>
    </div>
    <div
      class="body"
      v-html="body"
    />
    <div
      class="delete-modal"
      v-if="deleteMode"
    >
      <h3>Do you wish to delete this comment?</h3>
      <button @click.prevent="deleteComment">Yes</button>
      <button @click.prevent="openDelete">No</button>
    </div>
    <div
      class="delete-modal"
      v-if="editMode"
    >
      <no-ssr>
        <mavon-editor
          v-model=editBody
          language="en"
        />
      </no-ssr>
      <button @click.prevent="editComment">Edit Comment</button>
      <button @click.prevent="cancelEdit">Cancel</button>
    </div>
  </Fragment>
</template>

<script>
import { Fragment } from "vue-fragment";
import { mapState } from "vuex";
import axios from "axios";
export default {
  name: "Comment",
  components: { Fragment },
  props: {
    commentDate: String,
    username: String,
    body: String,
    userId: String,
    commentId: String,
  },
  computed: {
    ...mapState(["user", "role"]),
  },
  data() {
    return {
      editBody: "",
      editMode: false,
      deleteMode: false,
    };
  },
  methods: {
    openDelete: function () {
      const deleteMode = !this.$data.deleteMode;
      this.deleteMode = deleteMode;
    },
    deleteComment: function () {
      const postId = this.$store.state.post._id;
      const { commentId } = this.$props;
      const { user } = this.$store.state;
      axios({
        method: "DELETE",
        url: `/api/comments/${commentId}`,
        data: {
          user,
          postId,
          token,
        },
      }).then(() => {
        this.deleteMode = false;
      });
    },
    openEdit: function () {
      const editMode = !this.$data.editMode;
      this.editMode = editMode;
      const { body } = this.$props;
      this.editBody = body;
    },
    cancelEdit: function () {
      this.editBody = null;
      this.editMode = false;
    },
  },
};
</script>
