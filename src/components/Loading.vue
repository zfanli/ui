<template>
  <div class="loading">
    <div class="loading-wrapper">
      <div ref="img" class="loading-animation"></div>
      <div ref="text" class="loading-text">
        <span v-for="(c, i) in 'LOADING...'.split('')" :key="c + i">
          {{ c }}
        </span>
      </div>
      <v-progress-linear
        class="progress"
        :value="progress"
        color="rgb(88, 219, 220)"
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
  data: () => ({
    progress: 0,
    anime: null,
    timer: null,
  }),
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

      this.timer = setInterval(() => {
        if (typeof this.progress === "string") {
          if (this.progress.indexOf(".") === -1) {
            this.progress += ".9";
          } else {
            this.progress += "9";
          }
        } else {
          this.progress += Math.ceil(Math.random() * 5) + 5;
          if (this.progress > 99) this.progress = "99";
        }
      }, 800);
    },
    end() {
      if (this.anime) {
        this.anime.kill();
      }
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.progress = 100;
    },
  },
  mounted() {
    this.start();
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
