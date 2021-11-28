<template>
  <div>
    <h1 class="booking-title">Your next booking is:</h1>
    <div class="card pointer booking-card" @click="open">
      <div>
        <div
          v-for="item in confirmationKeys"
          :key="item.label"
          class="booking-card__item"
        >
          {{ item.label }}: {{ bookInfo[item.value] }}
          <span v-if="item.note">({{ bookInfo[item.note] }})</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { bookInfo: { type: Object, default: () => {} } },
  data() {
    return {
      confirmationKeys: [
        { label: "Name", value: "name" },
        { label: "Day", value: "day_of_week" },
        { label: "My time", value: "timezoneTime", note: "myTimezone" },
        { label: "Coach's time", value: "time", note: "timezone" },
      ],
    };
  },
  methods: {
    open() {
      this.$emit("open", {
        name: this.bookInfo.name,
        timezone: this.bookInfo.timezone,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.booking {
  &-title {
    margin-bottom: 0.5rem;
  }
  &-card {
    padding: 4rem 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #36a2e0;
    color: #ffffff;
    font-weight: 600;
    text-align: left;
    transition: all 0.2s;
    &__item {
      margin: 0.5rem 0;
    }
    &:hover {
      transform: scale(1.1);
    }
  }
}
</style>
