<template>
  <loading :progress="progress"></loading>
</template>

<script>
import Loading from "../components/Loading.vue";

export default {
  name: "LoadingDemo",
  components: { Loading },
  data: () => ({
    progress: 0,
  }),
  mounted() {
    this.timer = setInterval(() => {
      this.progress += Math.ceil(Math.random() * 5) + 5;
      this.progress = Math.min(100, this.progress);

      if (this.progress === 100) {
        clearTimeout(this.timer);
      }
    }, 800);
  },
};
</script>
