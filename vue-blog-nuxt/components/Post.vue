<template>
  <Fragment>
    <div class="title">
      <h1 v-if="!singlePost">
        <nuxt-link :to="`/post/${id}`">
          <span>{{ title }}</span>
        </nuxt-link>
      </h1>
      <h1 v-if="singlePost">{{ title }}</h1>
    </div>
    <div class="date">{{ postDate }} by {{ username }}</div>
    <div class="header-image">
      <img :src="headerImage" alt="Header" />
    </div>
    <div class="body" v-html="body" />
  </Fragment>
</template>

<script>
import { Fragment } from "vue-fragment";
export default {
  name: "Post",
  components: {
    Fragment
  },
  props: {
    id: String,
    headerImage: String,
    postDate: String,
    body: String,
    title: String,
    username: String,
    singlePost: Boolean
  }
};
</script>>
