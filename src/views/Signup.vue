<template>
  <section>
    <h3>Sign-up</h3>
    <form
      @submit.prevent="doSignup"
      v-bind:disabled="this.loading"
    >
      <fieldset v-bind:aria-busy="this.loading">
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
          value="Sign-up"
        />
      </fieldset>
    </form>
  </section>
</template>

<script>
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
  }
};
</script>