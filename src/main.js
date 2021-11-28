import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";

library.add(faCopyright);
Vue.config.productionTip = false;
Vue.component("font-awesome-icon", FontAwesomeIcon);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
