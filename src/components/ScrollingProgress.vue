<template>
  <div class="sp-container">
    <div id="first-stage" class="scene first-stage">
      <div>Scrolling down slowly,</div>
      <div>take a look at the bottom of the page,</div>
      <div>and be aware of</div>
      <div>the scrolling direction.</div>
      <v-icon class="scroll-down">mdi-arrow-expand-down</v-icon>
    </div>
    <div id="content" class="scene red lighten-5" ref="content">
      <div
        class="content-wrapper"
        ref="wrapper"
        :style="`transform: translateX(-${offset}px)`"
      >
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
    <div id="last-stage" class="scene last-stage">
      <div>the end.</div>
    </div>
  </div>
</template>
<script>
import { Controller, Scene } from "scrollmagic";

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
    // create the scroll magic controller
    this.controller = new Controller({
      // use a scroll bar of the custom container instead of a global scroll bar
      container: ".sp-container",
      globalSceneOptions: {
        triggerHook: "onLeave",
      },
    });

    // bind the first scene into the controller
    new Scene({
      triggerElement: "#first-stage",
      duration: "100%",
    })
      .setPin("#first-stage", { pushFollowers: false })
      // .setPin("#first-stage")
      .addTo(this.controller);

    // setup the content width after elements are mounted
    const { wrapper, content } = this.$refs;
    this.contentWidth =
      wrapper.clientWidth - content.clientWidth + this.stickyDuration;

    // bind the content scene into the controller
    new Scene({
      triggerElement: "#content",
      duration: this.contentWidth,
    })
      // .setPin("#content", { pushFollowers: false })
      .setPin("#content")
      .on("progress", (e) => {
        const offset = e.progress * this.contentWidth - this.stickyDuration;
        this.offset = Math.max(0, offset);
        this.progress = e.progress;
      })
      .addTo(this.controller);

    // bind the last scene into the controller
    new Scene({
      triggerElement: "#last-stage",
      duration: "100%",
    })
      // .setPin("#last-stage", { pushFollowers: false })
      // .setPin("#last-stage")
      .addTo(this.controller);
  },
};
</script>
<style lang="scss" scoped>
.sp-container {
  max-height: 100vh;
  overflow: auto;
}

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

#content {
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

  // .progress {
  // width: calc(100% - 2rem);
  // margin: 0 1rem 1rem 1rem;
  // }
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

