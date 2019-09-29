<template>
  <div id="app">
    <Header
      :user="this.user"
      :signOut="signOut"
    />
    <main>
      <router-view :catchUser="catchUser" />
    </main>
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
  color: #0b0f13;
}

h1 {
  font-family: "Bebas Neue";
  font-size: 2.5rem;
}

@keyframes loading {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 100% 100%;
  }
}

fieldset {
  border: 0;
  max-width: 480px;
  padding: 0;
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

fieldset[aria-busy="true"]::before {
  background-size: 50% auto;
  animation: loading 0.5s linear infinite;
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
import { removeToken } from "./services/tokenService";
export default {
  components: {
    Header
  },
  data() {
    return {
      user: null
    };
  },
  mounted() {
    const user = localStorage.getItem("vueBlogId");
    this.user = user;
  },
  methods: {
    signOut: function() {
      removeToken();
      localStorage.removeItem("vueBlogId");
      this.user = null;
    },
    catchUser: function(id) {
      this.user = id;
    }
  }
};
</script>