<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<style>
@import "./assets/css/setup.css";
@import "./assets/css/fonts.css";
#app {
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

h1 {
  font-family: "Bebas Neue";
  font-size: 2.5rem;
}
</style>

<script>
import Header from "@/components/Header.vue";
export default {
  components: {
    Header
  }
};
</script>