<template>
  <section>
    <h3>Login</h3>
    <form @submit.prevent="loginSubmit" :disabled="loggingIn">
      <fieldset :aria-busy="loggingIn">
        <p v-if="errorMessage !== null" class="error">
          <span>Error:</span>
          {{ errorMessage }}
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
          <input type="password" name="password" placeholder="Password" v-model="password" />
        </label>
        <button type="submit" class="hvr-rotate">Login</button>
      </fieldset>
    </form>
  </section>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "login",
  computed: {
    ...mapState(["errorMessage", "loggingIn", "user"])
  },
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    ...mapActions(["doLogin", "resetLogin"]),
    loginSubmit: async function() {
      const { email, password } = this.$data;
      const loginData = { email, password };
      await this.doLogin(loginData);
    }
  },
  updated() {
    if (this.user) {
      this.$router.push("/");
    }
  },
  destroyed() {
    this.resetLogin();
  },
  metaInfo: {
    title: "Login"
  }
};
</script>

<style>
@media (max-width: 414px) {
  section {
    width: 95%;
    margin: 0 auto;
    padding-bottom: 50px;
  }
  h3 {
    font-size: 1.6rem;
  }
}
</style>
