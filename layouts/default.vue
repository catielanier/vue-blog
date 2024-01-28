<template>
  <div>
    <Header />
    <Nuxt />
  </div>
</template>

<style>
body {
  font-family: "Arvo", serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  overflow-x: hidden;
  background: #fcccd3;
  color: #303030;
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
    #c28485 50%,
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
  border-bottom: 2px solid #f7a3b4;
  border-radius: 5px;
  margin-bottom: 20px;
  transition: all 0.3s ease-in-out;
  color: #303030;
  background: none;
}

input:focus {
  border-color: #c28485;
}

button[type="submit"] {
  font-family: "Comfortaa", serif;
  border: 0;
  border-radius: 5px;
  margin-top: 15px;
  background: #c28485;
  color: #fcccd3;
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: bold;
  padding: 20px 20px 15px;
  cursor: pointer;
}

.hvr-rotate {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: transform;
  transition-property: transform;
}
.hvr-rotate:hover,
.hvr-rotate:focus,
.hvr-rotate:active {
  -webkit-transform: rotate(4deg);
  transform: rotate(4deg);
}

@media (max-width: 414px) {
  fieldset {
    max-width: 414px;
    width: 95%;
    margin: 0 auto;
  }
  fieldset::before {
    width: 95%;
    margin: 0 auto;
  }
  input {
    width: 100%;
    margin: 0 auto;
  }
}
</style>

<script>
import Header from "../components/Header";
export default {
  components: {
    Header
  },
  metaInfo: {
    title: "Blog [Catie Lanier]",
    titleTemplate: "%s | Blog [Catie Lanier]"
  }
};
</script>
