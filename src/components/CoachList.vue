<template>
  <div>
    <div class="title">Available Coaches</div>
    <div class="coach-list">
      <div
        v-for="coach in coachSimpleData"
        :key="coach.name"
        @click="getCoach(coach)"
        class="coach_card card pointer"
      >
        <font-awesome-icon icon="user" class="mx-2" />
        <font-awesome-icon icon="calendar-alt" class="mx-2" />
        <div class="coach_card-name">
          {{ coach.name }}
        </div>
        <div class="coach_card-timezone">
          {{ coach.timezone }}
        </div>
        <div class="coach_card-availability">
          <el-col
            v-for="day in coach.availability"
            :key="day"
            :span="3"
            class="tag"
          >
            {{ convertDay(day) }}
          </el-col>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CoachList",
  props: {
    coachSimpleData: { type: Array, default: () => [] },
  },
  methods: {
    // emit selected coach's name/timezone info to parent
    getCoach(e) {
      this.$emit("getCoach", { name: e.name, timezone: e.timezone });
    },
    convertDay(day) {
      if (day === "Monday") {
        return "Mon";
      }
      if (day === "Tuesday") {
        return "Tue";
      }
      if (day === "Wednesday") {
        return "Wed";
      }
      if (day === "Thursday") {
        return "Thur";
      }
      if (day === "Friday") {
        return "Fri";
      }
      if (day === "Saturday") {
        return "Sat";
      }
      if (day === "Sunday") {
        return "Sun";
      }
    },
  },
};
</script>

<style scoped lang="scss">
.coach {
  &_card {
    transition: all 0.2s;
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    & > div {
      text-align: left;
    }
    &:hover {
      box-shadow: 2px 2px 10px #f4f4f4;
      transform: scale(1.1);
    }
    &-name {
      font-weight: bold;
      grid-column: 1/2;
      grid-row: 2/3;
    }
    &-timezone {
      grid-column: 1/2;
      grid-row: 3/-1;
    }
    &-availability {
      grid-column: 2/-1;
      grid-row: 2/-1;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 0.5rem;
    }
  }
  &-list {
    grid-gap: 2rem;
    display: grid;
    margin: 0 auto;
    padding: 4rem 0;
    border-radius: 10px;
    @media (min-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 1440px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}
</style>
