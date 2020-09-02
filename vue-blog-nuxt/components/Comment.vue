<template>
  <Fragment>
    <div class="date">{{commentDate}} by {{username}}</div>
    <div
      class="body"
      v-html="body"
    />
  </Fragment>
</template>

<script>
import { Fragment } from "vue-fragment";
export default {
  name: "Comment",
  components: { Fragment },
  props: {
    commentDate: String,
    username: String,
    body: String,
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
