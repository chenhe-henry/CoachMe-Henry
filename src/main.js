import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import "@/styles/index.scss";
import moment from "moment-timezone";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import {
  faCalendarAlt,
  faClock,
  faMapMarkerAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

library.add(faCopyright, faClock, faMapMarkerAlt, faCalendarAlt, faUser);
Vue.config.productionTip = false;
Vue.prototype.$moment = moment;
Vue.component("font-awesome-icon", FontAwesomeIcon);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
