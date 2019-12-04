<template>
  <section class="user-settings">
    <h1>User Settings</h1>
    <vue-select label="username" :options="users" v-model="id"></vue-select>
    <div class="roles" v-if="id">
      <h2>Assign Role</h2>
      <input type="radio" v-model="id.role" value="Admin" id="admin" />
      <label for="admin">Admin</label>
      <input type="radio" v-model="id.role" value="Author" id="author" />
      <label for="author">Author</label>
      <input type="radio" v-model="id.role" value="User" id="user" />
      <label for="user">User</label>
      <h2>Ban User</h2>
      <input type="checkbox" v-model="id.banned" id="banned" />
      <label for="banned">Banned</label>
      <div>
        <button @click.prevent="editUser">Submit Changes</button>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { getToken } from "../services/tokenService";
export default {
  name: "edit-users",
  props: {
    user: String
  },
  data() {
    return {
      users: [],
      id: null,
      success: false,
      error: null
    };
  },
  async beforeMount() {
    await axios.get("/api/users").then(res => {
      const users = res.data.data;
      this.users = users;
    });
  },
  methods: {
    editUser: async function() {
      const { _id: id, role, banned } = this.$data.id;
      const { user } = this.$props;
      const token = await getToken();
      await axios
        .put(`/api/users/${id}`, { data: { role, banned, user, token } })
        .then(() => {
          this.success = true;
        })
        .catch(err => {
          this.error = err.message;
        });
    }
  }
};
</script>

<style scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
.user-settings {
  text-align: left;
  max-width: 1240px;
  width: 100%;
  margin: 0 auto;
  position: relative;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Bebas Neue";
}
input {
  width: auto;
  margin-right: 15px;
}
input:first-of-type,
#banned {
  margin-left: 15px;
}
label {
  margin-right: 25px;
}
</style>
