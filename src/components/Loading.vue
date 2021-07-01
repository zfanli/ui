<template>
  <div class="loading">
    <div class="loading-wrapper">
      <div ref="img" class="loading-animation"></div>
      <div ref="text" class="loading-text">
        <span v-for="(c, i) in 'LOADING...'.split('')" :key="c + i">
          {{ c }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import gsap from "gsap";

export default {
  name: "Loading",
  data: () => ({
    //
  }),
  mounted() {
    const chars = this.$refs.text.children;
    gsap.from(chars, {
      scale: 0.8,
      y: -10,
      color: "rgb(251, 202, 90)",
      duration: 0.25,
      repeat: -1,
      ease: "power1",
      stagger: {
        from: "start",
        each: 0.2,
        repeat: 1,
        yoyo: true,
      },
    });
  },
};
</script>

<style lang="scss" scoped>
.loading {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .loading-wrapper {
    height: 100px;
    width: 70px;
    overflow: hidden;
    user-select: none;

    .loading-animation {
      z-index: 100;
      height: 100%;
      width: 840px;
      position: relative;
      left: -70px;
      background-image: url(../assets/images/loading.png);
      animation: animate-loading 1s steps(9, end) infinite;
    }

    .loading-text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 4rem;
      font-family: "East Sea Dokdo", cursive;
      color: rgb(88, 219, 220);

      span {
        position: relative;
        display: inline-block;
      }
    }
  }
}

@keyframes animate-loading {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-630px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
