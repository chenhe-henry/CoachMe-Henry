<template>
  <div class="coach-list">
    <div
      v-for="coach in coachSimpleData"
      :key="coach.name"
      @click.stop="getCoach(coach)"
      class="coach"
    >
      {{ coach.name }}
      {{ coach.timezone }}
      <div v-for="day in coach.availablity" :key="day">
        {{ convertDay(day) }}
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
  data() {
    return {};
  },

  methods: {
    // emit selected coach's name/timezone info to parent
    getCoach(e) {
      this.$emit("click", { name: e.name, timezone: e.timezone });
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
  cursor: pointer;
  padding: 2rem 1rem;
  border: 2px solid #c4c4c4;
  border-radius: 10px;
  width: 10vw;
  margin: 0 auto;
  transition: all 0.2s;
  &:hover {
    background: #d4d4d4;
    transform: scale(1.1);
  }
  &-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
    width: 50vw;
    margin: 0 auto;
    background: #f4f4f4;
    padding: 4rem 0;
    border-radius: 10px;
  }
}
</style>
