<template>
  <header>
    <div class="grid-container">
      <router-link to="/">
        <div class="logo">
          <img
            src="../assets/ltian.png"
            alt="l天"
          >
        </div>
      </router-link>
      <div>
        <h1>博客 | Blog</h1>
        <p>Corey Lanier</p>
      </div>
      <div class="nav-buttons">
        <router-link
          to="/login"
          v-if="!user"
        >
          <font-awesome-icon :icon="['fas', 'sign-in-alt']" /> Login
        </router-link>
        <router-link
          to="/new-post"
          v-if="role === 'Author' || role === 'Admin'"
        >
          <font-awesome-icon :icon="['fas', 'plus']" /> New Post
        </router-link>
        <router-link
          to="/sign-up"
          v-if="!user"
        >
          <font-awesome-icon :icon="['fas', 'user-plus']" /> Sign Up
        </router-link>
        <router-link
          v-if="user"
          to="/profile"
        >
          <font-awesome-icon :icon="['fas', 'user']" /> Profile
        </router-link>
        <router-link
          v-if="role === 'Admin'"
          to="/settings"
        >
          <font-awesome-icon :icon="['fas', 'cog']" /> Settings
        </router-link>
        <router-link
          v-if="role === 'Admin'"
          to="/users"
        >
          <font-awesome-icon :icon="['fas', 'users']" /> Edit Users
        </router-link>
        <button
          v-if="user"
          @click.prevent="signOut"
        >
          <font-awesome-icon :icon="['fas', 'sign-out-alt']" /> Logout
        </button>
      </div>
      <div class="mobile-menu">
        <a
          href="#"
          @click.prevent="openMenu"
        >
          <font-awesome-icon :icon="['fas', 'bars']" />
        </a>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    user: String,
    signOut: Function,
    role: String
  },
  data() {
    return {
      showMenu: false
    };
  },
  methods: {
    openMenu: function() {
      const showMenu = this.$data.showMenu;
      this.showMenu = !showMenu;
      console.log(this.$data.showMenu);
    }
  }
};
</script>

<style scoped>
header {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  text-align: left;
  background: #011f4b;
  color: #b3cde0;
}
.grid-container {
  display: grid;
  grid-template-columns: 1.3fr 3fr 4.5fr;
  grid-gap: 25px;
  align-items: center;
}

h1 {
  margin-top: 5px;
  margin-bottom: 10px;
}

.logo {
  padding: 15px;
  background: #b3cde0;
}

.nav-buttons {
  text-align: right;
  margin-right: 15px;
}

.nav-buttons a,
.nav-buttons button {
  display: inline-block;
  padding: 10px 15px;
  background: #b3cde0;
  color: #011f4b;
  text-decoration: none;
  border: 1px solid #b3cde0;
  transition: all 0.3s ease-in-out;
}

a:hover,
button:hover {
  background: #011f4b;
  color: #b3cde0;
}

a {
  margin-right: 10px;
}

img {
  width: 100%;
}

.mobile-menu {
  display: none;
}

@media (max-width: 414px) {
  .grid-container {
    display: grid;
    grid-template-columns: 1.5fr 5fr 1fr;
    grid-gap: 10px;
    align-items: center;
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
}
</style>