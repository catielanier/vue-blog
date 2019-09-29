<template>
  <section>
    <h3>Login</h3>
    <form
      @submit.prevent="doLogin"
      v-bind:disabled="this.loading"
    >
      <fieldset v-bind:aria-busy="this.loading">
        <p
          v-if="this.error !== null"
          class="error"
        >
          <span>Error:</span> {{this.error}}
        </p>
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
        <button type="submit">
          <font-awesome-icon :icon="['fas', 'sign-in-alt']" /> Login
        </button>
      </fieldset>
    </form>
  </section>
</template>

<script>
import axios from "axios";
import { setToken } from "../services/tokenService";
export default {
  name: "login",
  props: {
    catchUser: Function
  },
  data() {
    return {
      email: "",
      password: "",
      loading: false,
      success: false,
      error: null
    };
  },
  methods: {
    doLogin: async function() {
      this.loading = true;
      const { email, password } = this.$data;
      try {
        const res = await axios.post("/api/users/login", {
          data: {
            email,
            password
          }
        });
        const { token, id } = res.data.data;
        await setToken(token);
        await this.$props.catchUser(id);
        localStorage.setItem("vueBlogId", id);
        this.loading = false;
        this.success = true;
        this.$router.push("/");
      } catch (e) {
        this.error = e;
        this.loading = false;
      }
    }
  }
};
</script>