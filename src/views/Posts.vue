<template>
  <div class="home">
    <p v-if="posts.length === 0">Sorry, but this blog is barren.</p>
    <div
      class="blog-post"
      v-for="post in posts"
      :key="post.id"
    >
      <div class="title">
        <router-link :to="{
          name: 'post',
          params: {
            ...post.id
          }
        }">
          <h2>{{post.title}}</h2>
        </router-link>

      </div>
      <div class="date">
        {{post.postDate}}
      </div>
      <div
        class="body"
        v-html="post.body"
      />
      <div class="comments-quantity">
        {{post.comments.length}} comment<span v-if="post.comments.length !== 1">s</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "posts",
  data() {
    return {
      posts: []
    };
  },
  async mounted() {
    await axios.get("/api/posts").then(res => {
      const posts = res.data.data;
      posts.forEach(post => {
        const date = new Date(post.postDate);
        const month = date.getMonth();
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ];
        const days = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ];
        const day = date.getDay();
        const utcDate = date.getUTCDate();
        const year = date.getFullYear();
        const hour = date.getHours();
        const minute = date.getMinutes();

        if (hour >= 12) {
          const timeFormat = "PM";
          if (hour > 12) {
            const formattedHour = hour - 12;
            if (minute < 10) {
              const formattedMinute = `0${minute}`;
              post.postDate = `${days[day]}, ${months[month]} ${utcDate}, ${year}, ${formattedHour}:${formattedMinute} ${timeFormat}`;
            } else {
              post.postDate = `${days[day]}, ${months[month]} ${utcDate}, ${year}, ${formattedHour}:${minute} ${timeFormat}`;
            }
          } else if (hour === 12) {
            if (minute < 10) {
              const formattedMinute = `0${minute}`;
              post.postDate = `${days[day]}, ${months[month]} ${utcDate}, ${year}, ${hour}:${formattedMinute} ${timeFormat}`;
            } else {
              post.postDate = `${days[day]}, ${months[month]} ${utcDate}, ${year}, ${hour}:${minute} ${timeFormat}`;
            }
          }
        } else {
          const timeFormat = "AM";
          if (hour === 0) {
            const formattedHour = hour + 12;
            if (minute < 10) {
              const formattedMinute = `0${minute}`;
              post.postDate = `${days[day]}, ${months[month]} ${utcDate}, ${year}, ${formattedHour}:${formattedMinute} ${timeFormat}`;
            } else {
              post.postDate = `${days[day]}, ${months[month]} ${utcDate}, ${year}, ${formattedHour}:${minute} ${timeFormat}`;
            }
          }
          if (hour > 0) {
            if (minute < 10) {
              const formattedMinute = `0${minute}`;
              post.postDate = `${days[day]}, ${months[month]} ${utcDate}, ${year}, ${hour}:${formattedMinute} ${timeFormat}`;
            } else {
              post.postDate = `${days[day]}, ${months[month]} ${utcDate}, ${year}, ${hour}:${minute} ${timeFormat}`;
            }
          }
        }
      });
      this.posts = posts;
    });
  }
};
</script>
