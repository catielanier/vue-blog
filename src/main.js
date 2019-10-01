import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faSignInAlt,
  faUserPlus,
  faSignOutAlt,
  faUser,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import { Datetime } from "vue-datetime";
import App from "./App.vue";
import router from "./router";
import store from "./store";

library.add(faSignInAlt, faUserPlus, faSignOutAlt, faUser, faPlus);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.component("datetime", Datetime);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
