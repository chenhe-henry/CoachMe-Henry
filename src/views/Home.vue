<template>
  <el-container class="home">
    <el-header>
      <span class="pointer" @click="backToHome">
        <font-awesome-icon :icon="['fab', 'connectdevelop']" class="mx-2" />
        Coach Me
      </span>
      <el-button type="info" @click="backToHome" v-show="selectedCoach">
        Back To List
      </el-button>
    </el-header>
    <el-main>
      <CoachList
        :coachSimpleData="coachSimpleData"
        v-show="!selectedCoach"
        @getCoach="navToList"
      />
      <TimeTable
        :selectedCoach="selectedCoach"
        :filteredData="filteredData"
        v-show="selectedCoach"
        @back="backToHome"
      />
      <NextBooking
        v-if="!selectedCoach && bookInfo"
        :bookInfo="bookInfo"
        @navTo="navToList"
      />
    </el-main>
    <el-footer>
      <font-awesome-icon :icon="['far', 'copyright']" class="mx-2" />
      2021 Henry He, All Right Reserved.
    </el-footer>
  </el-container>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  components: {
    CoachList: () => import("@/components/CoachList"),
    TimeTable: () => import("@/components/TimeTable.vue"),
    NextBooking: () => import("@/components/NextBooking.vue"),
  },
  data() {
    return {
      selectedCoach: null,
      bookInfo: null,
      coachData: [],
      coachSimpleData: [],
    };
  },
  mounted() {
    this.init();
    this.bookInfo = JSON.parse(localStorage.getItem("bookInfo"));
  },
  watch: {
    selectedCoach() {
      this.bookInfo = JSON.parse(localStorage.getItem("bookInfo"));
    },
  },
  computed: {
    // filter coach data based on selected coach
    filteredData() {
      let result;
      if (this.selectedCoach) {
        result = this.coachData.filter(
          (el) => el.name === this.selectedCoach.name
        );
      }
      return result;
    },
  },
  methods: {
    navToList(coachInfo) {
      this.selectedCoach = coachInfo;
    },
    backToHome() {
      this.selectedCoach = null;
    },
    // restructure coach data based on filtered data
    getCoachInfo(filteredCoachData) {
      let availability = [];
      filteredCoachData.forEach((data) => {
        availability.push(data["day_of_week"]);
      });
      return {
        name: filteredCoachData[0].name,
        timezone: filteredCoachData[0].timezone,
        availability: [...new Set(availability)],
      };
    },
    // get simple coach data, pass to coach list,
    formatData() {
      const coachArr = this.coachData.map((data) => data.name);
      let coaches = [...new Set(coachArr)];
      coaches.forEach((coach) =>
        this.coachSimpleData.push(
          this.getCoachInfo(
            this.coachData.filter((data) => data.name === coach)
          )
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
<style lang="scss" scoped>
.home {
  min-height: 100vh;
}
</style>
