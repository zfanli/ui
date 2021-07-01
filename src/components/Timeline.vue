<template>
  <div class="timeline-wrapper">
    <v-timeline class="timeline" align-top dense>
      <v-timeline-item style="height: 100vh">timeline item</v-timeline-item>
      <v-timeline-item>timeline item</v-timeline-item>
      <v-timeline-item>timeline item</v-timeline-item>
    </v-timeline>
  </div>
</template>

<script>
export default {
  name: "Timeline",
};
</script>

<style lang="scss" scoped>
.timeline-wrapper {
  height: 100vh;
  overflow: auto;
}
</style>
