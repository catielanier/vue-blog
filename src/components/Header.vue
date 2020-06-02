<template>
  <header>
    <nav>
      <ul>
        <router-link to="/">
          <li>Home</li>
        </router-link>
        <router-link
          to="/login"
          v-if="!user"
        >
          <li>Login</li>
        </router-link>
        <router-link
          to="/sign-up"
          v-if="!user"
        >
          <li>Sign Up</li>
        </router-link>
        <router-link
          to="/new-post"
          v-if="role === 'Author' || role === 'Admin'"
        >
          <li>New Post</li>
        </router-link>
        <router-link
          v-if="user"
          to="/profile"
        >
          <li>Profile</li>
        </router-link>
        <router-link
          v-if="role === 'Admin'"
          to="/users"
        >
          <li>Edit Users</li>
        </router-link>
        <a
          v-if="user"
          href="#"
          @click.prevent="doLogout"
        >
          <li>Logout</li>
        </a>
      </ul>
    </nav>
    <div class="heading">
      <h1>Corey Lanier - Blog</h1>
    </div>
  </header>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState(["user", "role", "menu"])
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

@media (max-width: 414px) {
  .grid-container {
    display: grid;
    grid-template-columns: 1.5fr 5fr 1fr;
    grid-gap: 10px;
    align-items: center;
    position: relative;
  }
  .nav-buttons {
    display: none;
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