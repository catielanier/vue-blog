import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faSignInAlt,
  faUserPlus,
  faSignOutAlt,
  faUser,
  faPlus,
  faCog,
  faTrash,
  faEdit,
  faUsers
} from "@fortawesome/free-solid-svg-icons";
import { Datetime } from "vue-datetime";
import wysiwyg from "vue-wysiwyg";
import vSelect from "vue-select";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "vue-select/dist/vue-select.css";

library.add(
  faSignInAlt,
  faUserPlus,
  faSignOutAlt,
  faUser,
  faPlus,
  faCog,
  faTrash,
  faEdit,
  faUsers
);

Vue.use(wysiwyg, {
  image: {
    uploadURL: "/api/image",
    dropzoneOptions: {}
  }
});

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.component("datetime", Datetime);

Vue.component("vue-select", vSelect);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
