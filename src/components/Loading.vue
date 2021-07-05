<template>
  <div v-if="!disappear" class="loading" :style="{ opacity }">
    <div class="loading-wrapper">
      <div ref="img" class="loading-animation"></div>
      <div ref="text" class="loading-text">
        <span v-for="(c, i) in 'LOADING...'.split('')" :key="c + i">
          {{ c }}
        </span>
      </div>
      <v-progress-linear
        class="progress"
        color="rgb(88, 219, 220)"
        :value="progress"
        :max="max"
      >
        <strong class="progress-value">{{ progress }}%</strong>
      </v-progress-linear>
    </div>
  </div>
</template>

<script>
import gsap from "gsap";

export default {
  name: "Loading",
  props: {
    progress: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
  },
  data: () => ({
    anime: null,
    disappear: false,
    opacity: 1,
  }),
  watch: {
    progress(val) {
      if (val === this.max) {
        this.opacity = 0;
        setTimeout(() => (this.disappear = true), 1000);
      }
    },
  },
  methods: {
    start() {
      const chars = this.$refs.text.children;
      this.anime = gsap.from(chars, {
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
    end() {
      if (this.anime) {
        this.anime.kill();
      }
    },
  },
  mounted() {
    this.start();
  },
  destroyed() {
    this.end();
  },
};
</script>

<style lang="scss" scoped>
.loading {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease;
  position: absolute;
  top: 0;
  left: 0;
  background-color: white;

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
      transform: translate(-48%, -50%);
      font-size: 2rem;
      font-weight: bold;
      color: rgb(88, 219, 220);
      white-space: nowrap;

      span {
        position: relative;
        display: inline-block;
        padding: 0 5px;
      }
    }

    .progress {
      position: absolute;
      left: 50%;
      // width: 210px;
      transform: translate(-50%, -10px);
      overflow: unset;

      .progress-value {
        position: absolute;
        bottom: -25px;
        color: gray;
        font-size: 0.8rem;
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
