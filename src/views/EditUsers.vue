<template>
  <section class="user-settings">
    <h1>User Settings</h1>
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "edit-users",
  props: {
    user: String
  },
  data() {
    return {
      users: [],
      id: null,
      userRole: null
    };
  },
  beforeMount() {}
};
</script>

<style scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
.user-settings {
  text-align: left;
  max-width: 1240px;
  width: 100%;
  margin: 0 auto;
  position: relative;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Bebas Neue";
}
</style>
