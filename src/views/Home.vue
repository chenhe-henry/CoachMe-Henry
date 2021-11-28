<template>
  <div class="home">
    <CoachList />
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {
    CoachList: () => import("@/components/CoachList"),
  },
};
</script>
