<template>
  <div class="home">
    <CoachList :coachSimpleData="coachSimpleData" @click="selectCoach" />
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
      coachSimpleData: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    selectCoach(e) {
      this.selectedCoach = e;
      console.log("e :>> ", e);
    },
    // restructure coach data based on filtered data
    getCoachInfo(obj) {
      let availablity = [];
      obj.forEach((e) => {
        availablity.push(e["day_of_week"]);
      });
      return {
        name: obj[0].name,
        timezone: obj[0].timezone,
        availablity: [...new Set(availablity)],
      };
    },
    formatData() {
      const coachArr = this.coachData.map((e) => e.name);
      let coaches = [...new Set(coachArr)];
      coaches.forEach((e) =>
        this.coachSimpleData.push(
          this.getCoachInfo(this.coachData.filter((el) => el.name === e))
        )
      );
    },
    // init fetch data from api
    init() {
      axios
        .get(
          "https://raw.githubusercontent.com/suyogshiftcare/jsontest/main/available.json"
        )
        .then((res) => {
          this.coachData = res.data;
        })
        .then(() => {
          this.formatData();
        });
    },
  },
};
</script>
