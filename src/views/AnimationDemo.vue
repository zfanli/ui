<template>
  <div class="anime-demo">
    <div class="scene banner">
      <img
        v-for="(s, i) in src"
        :key="s"
        :src="s"
        alt="banner"
        :ref="`b${i}`"
      />
    </div>
  </div>
</template>
<script>
import gsap from "gsap";

export default {
  name: "AnimationDemo",
  data: () => {
    const src = [];
    for (let i = 1; i <= 9; i++) {
      src.push(require(`../assets/images/banner/b${i}.jpg`));
    }
    return {
      src,
    };
  },
  mounted() {
    // duration constant
    const duration = 0.25,
      delay = 0;
    // create a timeline and make it repeats infinitely
    const tl = gsap.timeline({ yoyo: true, repeat: -1 });
    // animate from the 2nd image to the last one in order
    for (let i = 1; i < 9; i++) {
      tl.to(this.$refs["b" + i], {
        opacity: 1,
        duration,
        delay,
      });
    }
    // make the 2nd image to the one before the last invisible
    for (let i = 1; i < 8; i++) {
      tl.set(this.$refs["b" + i], {
        opacity: 0,
      });
    }
    // animate the last one into invisible to make the state back to the initial
    tl.to(this.$refs.b8, { opacity: 0, duration, delay });
  },
};
</script>

<style lang="scss" scoped>
.anime-demo {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;

  .banner {
    position: relative;

    img {
      width: 100%;
      height: 100%;
      max-width: 100%;
      // max-height: 100vh;

      &:not(:first-child) {
        left: 0;
        opacity: 0;
        position: absolute;
      }
    }
  }
}
</style>
