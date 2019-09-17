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
        <router-link to="/login">
          <font-awesome-icon :icon="['fas', 'sign-in-alt']" /> Login
        </router-link>
        <router-link to="/sign-up">
          <font-awesome-icon :icon="['fas', 'user-plus']" /> Sign Up
        </router-link>
      </div>
    </div>
  </header>
</template>

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
  grid-template-columns: 1.3fr 6fr 1.7fr;
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

.nav-buttons a {
  display: inline-block;
  padding: 10px 15px;
  background: #b3cde0;
  color: #011f4b;
  text-decoration: none;
  border: 1px solid #b3cde0;
  transition: all 0.3s ease-in-out;
}

a:hover {
  background: #011f4b;
  color: #b3cde0;
}

a:first-of-type {
  margin-right: 10px;
}

img {
  width: 100%;
}
</style>