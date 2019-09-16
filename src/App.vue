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

fieldset {
  border: 0;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  text-align: left;
}

fieldset::before {
  height: 10px;
  content: "";
  display: block;
  margin-bottom: 20px;
  background-image: linear-gradient(
    to right,
    #011f4b 0%,
    #325c7b 15%,
    #03396c 30%,
    #b3cde0 50%,
    #03396c 70%,
    #325c7b 85%,
    #011f4b 100%
  );
}

input {
  width: 100%;
  font-size: 0.8rem;
  padding: 10px 5px;
  border: 1px solid #011f4b;
  margin-bottom: 20px;
}

input:focus {
  border-color: #b3cde0;
}

button[type="submit"] {
  width: 100%;
  background: #011f4b;
  border: 1px solid #011f4b;
  padding: 10px 5px;
  color: #b3cde0;
  transition: all 0.3s ease-in-out;
}

button[type="submit"]:hover {
  background: #fff;
  color: #011f4b;
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