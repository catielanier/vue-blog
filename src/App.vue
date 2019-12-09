<template>
  <div id="app">
    <Header
      :user="this.user"
      :signOut="signOut"
      :role="this.role"
      :showMenu="this.showMenu"
      :openMenu="openMenu"
      :closeMenu="closeMenu"
    />
    <main>
      <router-view
        :catchUser="catchUser"
        :user="this.user"
        :role="this.role"
      />
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
import axios from "axios";
import Header from "@/components/Header.vue";
import { removeToken } from "./services/tokenService";
export default {
  components: {
    Header
  },
  data() {
    return {
      user: null,
      role: null,
      showMenu: false
    };
  },
  beforeMount() {
    const user = localStorage.getItem("vueBlogId");
    this.user = user;
  },
  mounted() {
    this.checkPermission();
  },
  methods: {
    signOut: function() {
      removeToken();
      localStorage.removeItem("vueBlogId");
      this.user = null;
      this.role = null;
      this.closeMenu();
    },
    catchUser: function(id) {
      this.user = id;
      this.checkPermission();
    },
    checkPermission: async function() {
      const { user } = this.$data;
      if (!user) {
        this.role = null;
      } else {
        const userData = await axios.get(`/api/users/${user}`);
        const { role } = userData.data.data;
        this.role = role;
      }
    },
    openMenu: function() {
      if (this.$data.showMenu === false) {
        this.showMenu = true;
      } else {
        this.closeMenu();
      }
    },
    closeMenu: function() {
      this.showMenu = false;
    }
  }
};
</script>