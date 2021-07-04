<template>
  <div class="sp-container">
    <div ref="firstStage" class="scene first-stage">
      <div>Scroll down slowly,</div>
      <div>take a look at the bottom of the page,</div>
      <div>and be aware of</div>
      <div>the scrolling direction.</div>
      <v-icon class="scroll-down">mdi-arrow-expand-down</v-icon>
    </div>
    <div ref="content" class="scene red lighten-5 content">
      <div class="content-wrapper" ref="wrapper">
        <v-card
          class="card"
          v-for="n in 15"
          :key="n"
          color="yellow lighten-1"
          elevation="4"
        >
          {{ n }}
        </v-card>
      </div>

      <v-progress-linear
        class="progress"
        buffer-value="0"
        height="6"
        :color="progressBarColor"
        :value="progress * 100"
        stream
        bottom
        absolute
      ></v-progress-linear>
    </div>
    <div ref="lastStage" class="scene last-stage">
      <div>the end.</div>
    </div>
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
  name: "ScrollingProgress",
  props: {
    stickyDuration: {
      type: Number,
      default: 200,
    },
    progressBarColor: {
      type: String,
      default: "red",
    },
  },
  data: () => ({
    offset: 0,
    contentWidth: 0,
    progress: 0,
  }),
  mounted() {
    const { wrapper, content, firstStage, lastStage } = this.$refs;

    // setup the content width after elements are mounted
    this.contentWidth =
      wrapper.clientWidth - content.clientWidth + this.stickyDuration;

    gsap
      .timeline()
      .to(firstStage, {
        // duration: 1,
        scrollTrigger: {
          trigger: firstStage,
          pin: true,
          pinSpacing: false,
        },
      })
      .fromTo(
        wrapper,
        { x: 0 },
        {
          x: -this.contentWidth + this.stickyDuration,
          duration: this.contentWidth - this.stickyDuration,
          delay: 1,
          scrollTrigger: {
            trigger: content,
            pin: true,
            onUpdate: (e) => {
              const offset =
                e.progress * this.contentWidth - this.stickyDuration;
              this.offset = Math.max(0, offset);
              this.progress = e.progress;
            },
          },
        }
      )
      .to(lastStage, {
        scrollTrigger: {
          trigger: lastStage,
          pinSpacing: false,
          pin: true,
        },
      });
  },
};
</script>
<style lang="scss" scoped>
.scene {
  height: 100vh;
  width: 100%;
}

.last-stage,
.first-stage {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: rgba(0, 0, 0, 0.6);
  background-color: white;

  .scroll-down {
    font-size: 1rem;
    margin-top: 2rem;
    animation: float 6s ease-in-out infinite;
    border-radius: 50%;
  }
}

.content {
  overflow: hidden;
  position: relative;

  .content-wrapper {
    height: 100%;
    display: flex;
    align-items: center;
    width: fit-content;
    padding: 0 2rem;

    .card {
      margin: 1rem;
      width: 200px;
      height: 150px;
      text-align: center;
      line-height: 150px;
    }
  }
}

@keyframes float {
  0% {
    transform: translatey(0px);
  }
  50% {
    transform: translatey(-10px);
  }
  100% {
    transform: translatey(0px);
  }
}
</style>

