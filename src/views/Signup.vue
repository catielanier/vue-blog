<template>
  <section>
    <h3>Sign-up</h3>
    <form
      @submit.prevent="doSignup"
      v-bind:disabled="this.loading"
    >
      <fieldset v-bind:aria-busy="this.loading">
        <p
          v-if="this.error !== null"
          class="error"
        >
          <span>Error:</span> {{this.error}}
        </p>
        <label for="username">
          Username:
          <input
            type="text"
            name="username"
            placeholder="Username"
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
        <label for="password">
          Password:
          <input
            type="password"
            name="password"
            placeholder="Password"
            v-model="password"
          />
        </label>
        <label for="verifyPassword">
          Verify Password:
          <input
            type="password"
            name="verifyPassword"
            placeholder="Verify Password"
            v-model="verifyPassword"
          />
        </label>
        <input
          type="submit"
          value="Complete Sign-up"
        />
      </fieldset>
    </form>
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "signup",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      verifyPassword: "",
      loading: false,
      success: false,
      error: null
    };
  },
  methods: {
    doSignup: async function() {
      this.loading = true;
      const { username, email, password, verifyPassword } = this.$data;
      if (password !== verifyPassword) {
        this.error = "Your passwords do not match.";
        this.loading = false;
        return;
      }
      try {
        const res = await axios.post("/api/users/signup", {
          data: {
            username,
            email,
            password
          }
        });
        const { token } = res.data.data;
        this.loading = false;
        this.success = true;
      } catch (e) {
        this.error = e;
        this.loading = false;
      }
    }
  }
};
</script>