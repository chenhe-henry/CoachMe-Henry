<template>
  <div>
    <h1 class="booking-title">Your next booking is:</h1>
    <div class="card pointer booking-card" @click="navToList">
      <div>
        <div
          v-for="bookingResult in confirmationKeys"
          :key="bookingResult.label"
          class="booking-card__item"
        >
          {{ bookingResult.label }}: {{ bookInfo[bookingResult.value] }}
          <span v-if="bookingResult.note"
            >({{ bookInfo[bookingResult.note] }})</span
          >
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
      confirmationKeys: this.$store.state.cardEntries,
    };
  },
  methods: {
    navToList() {
      this.$emit("navTo", {
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
