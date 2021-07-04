<template>
  <div class="parallax-wrapper">
    <div v-for="n in 4" :key="n" :class="['scene', 'bg' + n]"></div>
  </div>
</template>

<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.defaults({
  start: "top top",
  scrub: 1,
});

export default {
  name: "Parallax",
  data: () => ({
    //
  }),
  mounted() {
    this.timeline = gsap.timeline();

    for (let i = 0; i < 4; i++) {
      this.timeline.to(".scene.bg" + (i + 1), {
        yPercent: -20,
        scrollTrigger: {
          trigger: ".scene.bg" + (i + 1),
          pin: true,
          pinSpacing: false,
          scrub: 0,
        },
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.parallax-wrapper {
  .scene {
    height: 100vh;
    width: 100%;
    background-size: cover;

    @for $i from 1 through 4 {
      &.bg#{$i} {
        background-image: url(../assets/images/parallax/p#{$i}.jpg);
      }
    }
  }
}
</style>
