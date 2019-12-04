<template>
  <section class="profile">
    <h1>Profile</h1>
  </section>
</template>

<script>
import axios from "axios";
import { getToken } from "../services/tokenService";
export default {
  name: "profile",
  props: {
    user: String
  },
  data() {
    return {
      email: "",
      username: "",
      oldPassword: "",
      newPassword: "",
      verifyNewPassword: "",
      loading: false,
      success: false,
      error: null
    };
  }
};
</script>

<style scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
.profile {
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
input {
  width: auto;
  margin-right: 15px;
}
input:first-of-type,
#banned {
  margin-left: 15px;
}
label {
  margin-right: 25px;
}
</style>
