<template>
  <div>
    <div>
      <div class="title">{{ selectedCoachInfo }}</div>
      <div class="display">30 Minute Time Slots</div>
      <!-- select time zone -->
      <div class="rightAlign">
        <span><font-awesome-icon icon="map-marker-alt" class="mx-2" /></span>
        <label for="location"> Choose your location: </label>
        <el-select
          v-model="selectedLocation"
          :placeholder="selectedLocation"
          id="location"
        >
          <el-option
            v-for="city in cityOption"
            :key="city"
            :label="city"
            :value="city"
          />
        </el-select>
      </div>
      <!-- time slot list -->
      <div class="table-head">
        <div v-for="th in tableHead" :key="th">{{ th }}</div>
      </div>
      <div class="table-body">
        <div v-for="(th, index) in tableHead" :key="index">
          <div v-if="availability(th).length > 0">
            <div
              v-for="slot in getAvailability(availability(th))"
              :key="slot"
              class="time-slot"
              :class="{
                selectedSlot:
                  selectedTimeSlot &&
                  selectedTimeSlot.name === selectedCoach.name &&
                  selectedTimeSlot.time === slot &&
                  selectedTimeSlot['day_of_week'] === th,
              }"
              @click="bookCoach(availability(th)[0], slot, timeTZ(slot))"
            >
              {{ timeTZ(slot) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      title="Booking Details"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :before-close="closeDialog"
      v-if="bookingInfo"
    >
      <h1
        v-for="item in confirmationKeys"
        :key="item.label"
        class="booking-detail"
      >
        <div>{{ item.label }}:</div>
        <div>
          <span>{{ bookingInfo[item.value] }}</span>
          <span v-if="item.note">({{ bookingInfo[item.note] }})</span>
        </div>
      </h1>
      <span slot="footer" class="dialog-footer">
        <el-button type="warning" @click="cancelDialog">Cancel</el-button>
        <el-button type="danger" @click="confirmDialog">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    selectedCoach: { type: Object, default: () => {} },
    filteredData: { type: Array, default: () => [] },
  },
  data() {
    return {
      tableHead: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      bookingInfo: null,
      selectedTimeSlot: {},
      dialogVisible: false,
      confirmationKeys: [
        { label: "Name", value: "name" },
        { label: "Day", value: "day_of_week" },
        { label: "My time", value: "timezoneTime", note: "myTimezone" },
        { label: "Coach's time", value: "time", note: "timezone" },
      ],
      cityOption: [
        "Australia/Sydney",
        "Australia/Melbourne",
        "Australia/Brisbane",
        "Australia/Perth",
        "Australia/Adelaide",
        "Australia/Darwin",
        "Australia/Hobart",
        "Australia/Canberra",
      ],
      selectedLocation: "",
      availabilityStep: 30,
      messageDuration: 1500,
    };
  },
  computed: {
    availability() {
      return (day) => this.filteredData.filter((e) => e["day_of_week"] === day);
    },
    selectedCoachInfo() {
      return (
        this.selectedCoach &&
        ` ${this.selectedCoach.name} (${this.selectedCoach.timezone})`
      );
    },
  },
  watch: {
    bookingInfo() {
      this.selectedTimeSlot = JSON.parse(localStorage.getItem("TempBookInfo"));
      this.$emit("toggleBook", this.bookingInfo);
    },
    selectedCoach() {
      if (this.selectedCoach) {
        this.selectedLocation = this.selectedCoach.timezone;
        this.$moment.tz.setDefault(this.selectedCoach.timezone);
      }
    },
  },
  mounted() {
    this.bookingInfo = JSON.parse(localStorage.getItem("bookInfo"));
  },
  methods: {
    checkActiveSlot(done) {
      this.selectedTimeSlot = JSON.parse(localStorage.getItem("TempBookInfo"));
      done();
    },
    // change timezone
    timeTZ(time) {
      return this.$moment(time, "h:mm a")
        .clone()
        .tz(this.selectedLocation)
        .format("h:mm A");
    },
    // dialog control
    confirmDialog() {
      this.dialogVisible = false;
      localStorage.setItem("bookInfo", JSON.stringify(this.bookingInfo));
      this.$notify({
        title: "Congrats",
        type: "success",
        position: "bottom-right",
        duration: `${this.messageDuration}`,
      });
      setTimeout(() => {
        this.$emit("back");
      }, this.messageDuration);
    },
    cancelDialog() {
      this.dialogVisible = false;
      let previousSlot = localStorage.getItem("bookInfo");
      localStorage.setItem("TempBookInfo", previousSlot);
      this.selectedTimeSlot = JSON.parse(localStorage.getItem("TempBookInfo"));
    },
    closeDialog(done) {
      this.cancelDialog();
      done();
    },

    //

    bookCoach(e, time, timezoneTime) {
      let { name, timezone, day_of_week } = e;
      let bookInfo = {
        name,
        timezone,
        day_of_week,
        time,
        timezoneTime,
        myTimezone: this.selectedLocation,
      };
      this.bookingInfo = bookInfo;
      let previousSlot = JSON.parse(localStorage.getItem("bookInfo"));
      if (JSON.stringify(previousSlot) === JSON.stringify(this.bookingInfo)) {
        this.bookingInfo = null;
        localStorage.removeItem("bookInfo");
        localStorage.removeItem("TempBookInfo");
      } else {
        this.dialogVisible = true;
        localStorage.setItem("TempBookInfo", JSON.stringify(bookInfo));
      }
    },

    // get availability with 30 mins step
    getAvailability(arr) {
      let result = [];
      arr.forEach((e) => {
        let start = this.$moment(e["available_at"], "h:mma");
        let end = this.$moment(e["available_until"], "h:mma");
        while (start.isBefore(end)) {
          result.push(this.$moment(start, "h:mma").clone().format("h:mm A"));
          start = this.$moment(
            this.$moment(start, "h:mma")
              .clone()
              .add(this.availabilityStep, "minutes")
              .format("h:mma"),
            "h:mma"
          );
        }
      });
      return result;
    },
  },
};
</script>

<style lang="scss" scoped>
.table-head {
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  padding: 1rem 0;
  width: 80%;
  margin: 0 auto;
  & > * {
    flex-basis: 12%;
  }
}
.table-body {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 80%;
  margin: 0 auto;
  & > * {
    flex-basis: 12%;
  }
}
.dialog-footer {
  display: flex;
  justify-content: space-between;
}
.booking-detail {
  display: flex;
  flex-direction: column;

  padding: 1rem 0;
  & > div {
    margin-right: 0.5rem;
  }
  @media (min-width: 1024px) {
    flex-direction: row;
  }
}
</style>
