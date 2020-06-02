<template>
  <div id="app">
    <Header />
    <main>
      <router-view />
    </main>
  </div>
</template>

<style>
@import "./assets/css/setup.css";
@import "./assets/css/fonts.css";
#app {
  font-family: "Arvo", serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  overflow-x: hidden;
  background: #252835;
  color: #fff;
}

h1 {
  font-family: "Comfortaa", sans-serif;
  font-size: 2.5rem;
}

h2,
h3,
h4,
h5,
h6 {
  font-family: "Neuton", serif;
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
  border: 0;
  border-bottom: 2px solid #0557a3;
  border-radius: 5px;
  margin-bottom: 20px;
  transition: all 0.3s ease-in-out;
  color: #fff;
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

@media (max-width: 414px) {
  fieldset {
    max-width: 414px;
    width: 95%;
    margin: 0 auto;
  }
  fieldset::before {
    width: 95%;
  }
  input {
    width: 95%;
  }
  button[type="submit"] {
    width: 95%;
  }
}
</style>

<script>
import { mapActions } from "vuex";
import Header from "@/components/Header.vue";
export default {
  components: {
    Header
  },
  beforeMount() {
    this.checkUser();
  },
  methods: {
    ...mapActions(["checkUser"])
  }
};
</script>
