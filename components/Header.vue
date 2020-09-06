<template>
  <header>
    <nav>
      <ul>
        <router-link to="/">
          <li>Home</li>
        </router-link>
        <router-link to="/login" v-if="!user">
          <li>Login</li>
        </router-link>
        <router-link to="/sign-up" v-if="!user">
          <li>Sign Up</li>
        </router-link>
        <router-link to="/new-post" v-if="role === 'Author' || role === 'Admin'">
          <li>New Post</li>
        </router-link>
        <router-link v-if="user" to="/profile">
          <li>Profile</li>
        </router-link>
        <router-link v-if="role === 'Admin'" to="/users">
          <li>Edit Users</li>
        </router-link>
        <a v-if="user" href="#" @click.prevent="doLogout">
          <li>Logout</li>
        </a>
      </ul>
    </nav>
    <div class="heading">
      <h1>Corey Lanier - Blog</h1>
    </div>
    <div class="menu">
      <a href="#" @click.prevent="openMenu">
        <img src="../assets/menu.png" alt="Menu" />
      </a>
    </div>
    <div class="mobile-menu" v-if="showMenu">
      <div class="close-menu">
        <a href="#" @click.prevent="closeMenu">
          <img src="../assets/x.png" alt="Close Menu" />
        </a>
      </div>
      <div class="flex-container">
        <div>
          <router-link to="/">
            <span @click="closeMenu">Home</span>
          </router-link>
        </div>
        <div v-if="!user">
          <router-link to="/login">
            <span @click="closeMenu">Login</span>
          </router-link>
        </div>
        <div v-if="!user">
          <router-link to="/sign-up">
            <span @click="closeMenu">Sign Up</span>
          </router-link>
        </div>
        <div v-if="role === 'Author' || role === 'Admin'">
          <router-link to="/new-post">
            <span @click="closeMenu">New Post</span>
          </router-link>
        </div>
        <div v-if="user">
          <router-link to="/profile">
            <span @click="closeMenu">Profile</span>
          </router-link>
        </div>
        <div v-if="role === 'Admin'">
          <router-link to="/users">
            <span @click="closeMenu">Edit Users</span>
          </router-link>
        </div>
        <div v-if="user">
          <a href="#" @click.prevent="() => {doLogout(); closeMenu();}">Logout</a>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState(["user", "role", "showMenu"])
  },
  methods: {
    ...mapActions(["doLogout", "openMenu", "closeMenu"])
  }
};
</script>

<style scoped>
header {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  text-align: left;
}
nav {
  position: fixed;
  top: 20px;
  max-width: 1280px;
  width: 100%;
  z-index: 5;
}
ul {
  font-family: "Neuton", sans-serif;
  font-weight: 700;
  list-style: none;
  font-size: 1.5rem;
  display: flex;
  background: #b3cde0;
  justify-content: space-around;
  margin: 0;
  padding: 15px 0 20px;
  border-radius: 5px;
}
li {
  text-transform: capitalize;
}
a {
  color: #252835;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
}
a:hover {
  color: #fff;
}
.heading {
  margin-top: 8rem;
}

h1 {
  font-family: "Comfortaa", sans-serif;
  font-size: 3rem;
}

.menu {
  display: none;
  width: 45px;
  height: 45px;
  z-index: 5;
  background: #252835;
  border-radius: 5px;
}
.menu img {
  width: 100%;
}

.mobile-menu {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  right: -100%;
  transition: all 0.5s ease-in-out;
  z-index: 10;
  background: #b3cde0;
  display: block;
  top: 0;
  right: 0;
}

.mobile-menu a {
  color: #252835 !important;
}

.close-menu {
  width: 35px;
  height: 35px;
  position: relative;
  top: 15px;
  left: 15px;
}
.close-menu img {
  width: 100%;
}
.flex-container {
  display: flex;
  height: 90vh;
  width: 100%;
  font-family: "Neuton", serif;
  text-transform: capitalize;
  font-size: 1.4rem;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

@media (max-width: 414px) {
  header {
    width: 95%;
  }
  .heading {
    margin-top: 5rem;
    margin-bottom: 2rem;
  }
  nav {
    display: none;
  }
  .menu {
    display: block;
    position: fixed;
    top: 0px;
    left: 0px;
  }
  h1 {
    font-size: 1.9rem;
    margin: 0;
  }

  p {
    margin-top: 0;
    margin-bottom: 2.5px;
    font-size: 0.9rem;
  }

  .logo {
    padding: 2.5%;
  }

  .mobile-menu {
    display: block;
    font-size: 1.9rem;
  }

  .mobile-menu a {
    color: #b3cde0;
    text-decoration: none;
  }

  .hide-menu {
    display: none;
  }

  .show-menu {
    display: inline-block;
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 5;
  }
}
</style>
