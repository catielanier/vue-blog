<template>
  <section class="user-settings">
    <h2>User Settings</h2>
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "edit-users",
  props: {
    user: String
  }
};
</script>