<template>
  <div class="home">
    <CoachList />
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  components: {
    CoachList: () => import("@/components/CoachList"),
  },
  data() {
    return {
      coachData: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    // init fetch data from api
    init() {
      axios
        .get(
          "https://raw.githubusercontent.com/suyogshiftcare/jsontest/main/available.json"
        )
        .then((res) => {
          this.coachData = res.data;
        });
    },
  },
};
</script>
