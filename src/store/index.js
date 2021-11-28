import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cardEntries: [
      { label: "Name", value: "name" },
      { label: "Day", value: "day_of_week" },
      { label: "My time", value: "timezoneTime", note: "myTimezone" },
      { label: "Coach's time", value: "time", note: "timezone" },
    ],
  },
  mutations: {},
  actions: {},
  modules: {},
});
