<template>
  <section>
    <h3>Login</h3>
  </section>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      loading: false,
      success: false,
      error: ""
    };
  }
};
</script>