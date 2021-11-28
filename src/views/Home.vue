<template>
  <el-container class="home">
    <el-header>
      <span>Coach Me</span>
      <el-button type="info" @click="back" v-show="selectedCoach">
        Back To List
      </el-button>
    </el-header>
    <el-main>
      <CoachList
        :coachSimpleData="coachSimpleData"
        @click="selectCoach"
        v-show="!selectedCoach"
      />
      <TimeTable
        :selectedCoach="selectedCoach"
        :filteredData="filteredData"
        v-show="selectedCoach"
        @back="back"
      />
      <NextBooking
        v-if="!selectedCoach && bookInfo"
        :bookInfo="bookInfo"
        @open="open"
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
    selectCoach(e) {
      this.selectedCoach = e;
    },
    open(e) {
      this.selectedCoach = e;
    },
    back() {
      this.selectedCoach = null;
    },
    // restructure coach data based on filtered data
    getCoachInfo(obj) {
      let availability = [];
      obj.forEach((e) => {
        availability.push(e["day_of_week"]);
      });
      return {
        name: obj[0].name,
        timezone: obj[0].timezone,
        availability: [...new Set(availability)],
      };
    },
    // get simple coach data, pass to coach list,
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
<style lang="scss" scoped>
.home {
  min-height: 100vh;
}
</style>
