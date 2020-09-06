<template>
  <Fragment>
    <div class="date">{{commentDate}} by {{username}}
      <span v-if="role === 'Admin' || userId === user">(
        <nuxt-link :to="`/post/${id}/edit`"><span>Edit</span></nuxt-link>
        |
        <a
          href="#"
          @click.prevent="deleteComment"
        ><span>Delete</span></a>
        )
      </span>
    </div>
    <div
      class="body"
      v-html="body"
    />
  </Fragment>
</template>

<script>
import { Fragment } from "vue-fragment";
import { mapState } from "vuex";
export default {
  name: "Comment",
  components: { Fragment },
  props: {
    commentDate: String,
    username: String,
    body: String,
    userId: String,
  },
  computed: {
    ...mapState(["user", "role"]),
  },
  data() {
    return {
      commentId: null,
      editBody: "",
      editMode: false,
      deleteMode: false,
    };
  },
};
</script>
