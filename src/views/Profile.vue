<template>
  <section class="profile">
    <h1>Profile</h1>
    <form @submit.prevent="updateProfile" :disabled="this.loading">
      <fieldset :aria-busy="this.loading">
        <p v-if="this.error !== null" class="error">
          <span>Error:</span> {{ this.error }}
        </p>
        <p v-if="success">Profile successfully updated.</p>
        <label for="email">
          Username:
          <input
            type="text"
            name="username"
            placeholder="Email Address"
            v-model="username"
          />
        </label>
        <label for="email">
          Email Address:
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            v-model="email"
          />
        </label>
        <label for="oldPassword">
          Old Password (if you want to change your password):
          <input
            type="oldPassword"
            name="oldPassword"
            placeholder="Old Password"
            v-model="oldPassword"
          />
        </label>
        <label for="newPassword">
          New Password:
          <input
            type="newPassword"
            name="newPassword"
            placeholder="New Password"
            v-model="newPassword"
          />
        </label>
        <label for="verifyNewPassword">
          Verify New Password:
          <input
            type="verifyNewPassword"
            name="verifyNewPassword"
            placeholder="New Password"
            v-model="verifyNewPassword"
          />
        </label>
        <button type="submit">
          <font-awesome-icon :icon="['fas', 'user-edit']" /> Update Profile
        </button>
      </fieldset>
    </form>
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
  },
  async beforeMount() {
    const { user } = this.$props;
    await axios.get(`/api/users/${user}`).then(res => {
      const { email, username } = res.data.data;
      this.email = email;
      this.username = username;
    });
  },
  methods: {
    updateProfile: async function() {
      const {
        email,
        username,
        oldPassword,
        newPassword,
        verifyNewPassword
      } = this.$data;
      const { user } = this.$props;
      const token = await getToken();
      this.loading = true;
      this.error = null;
      this.success = false;
      if (oldPassword !== "") {
        if (newPassword === "") {
          this.loading = false;
          this.error = `Please provide a new password and verify it. (If you do not want to change your password, leave the old password blank.`;
        } else if (newPassword !== verifyNewPassword) {
          this.loading = false;
          this.error = "Your passwords do not match.";
        } else {
          await axios
            .put("/api/users/profile", {
              user,
              email,
              username,
              oldPassword,
              newPassword,
              token
            })
            .then(() => {
              this.loading = false;
              this.success = true;
            })
            .catch(err => {
              this.loading = false;
              this.error = err.message;
            });
        }
      } else {
        await axios
          .put("/api/users/profile", { user, email, username, token })
          .then(() => {
            this.loading = false;
            this.success = true;
          })
          .catch(err => {
            this.loading = false;
            this.error = err.message;
          });
      }
    }
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
</style>
