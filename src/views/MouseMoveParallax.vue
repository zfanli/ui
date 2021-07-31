<template>
  <div class="parallax-wrapper">
    <div class="stage" ref="stage">
      <div class="layer background">Background Layer</div>
      <div class="layer main-content">Main Content Here</div>
      <div class="layer other-content">Emm...anything else</div>
      <div class="layer foreground">Foreground Layer</div>
    </div>
    <div class="offset">
      <input type="range" v-model="offset" min="0" max="100" />
      <span>{{ offset }}</span>
      <small class="d-block">
        Adjust the degree of the effect by changing the value of the range
        above.
      </small>
      <small class="d-block"> *This effect is not for mobile device! </small>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    offset: 10,
  }),
  mounted() {
    window.addEventListener("mousemove", this.parallax);
    if (this.$tools.mobile)
      this.$refs.stage.style.transition = "transform .2s ease";
  },
  destroyed() {
    window.removeEventListener("mousemove", this.parallax);
  },
  methods: {
    parallax(e) {
      const { clientX, clientY } = e,
        { innerWidth, innerHeight } = window,
        // the offset result should be arranged between the range of [-offset, offset],
        // so we can use the half of the window size to settle the middle lines of the viewpoint as the
        // calculation base, we'll get a negative value of both axes if the cursor is moved to the top
        // side to the x axis middle line or moved to the left side to the y axis middle line
        offsetX = innerWidth / 2,
        offsetY = innerHeight / 2,
        // rotate the target base on the y axis means it'll be rotated in the horizontal direction,
        // so we use the x value of movements to calculate the result angles
        rotateY = -1 * ((clientX - offsetX) / offsetX) * this.offset + "deg",
        // and similarly we use the y value of movements to calculate the rotateX angles
        rotateX = ((clientY - offsetY) / offsetY) * this.offset + "deg";

      this.$refs.stage.style.transform = `rotateX(${rotateX}) rotateY(${rotateY}) rotateZ(0deg)`;
    },
  },
};
</script>

<style lang="scss" scoped>
.parallax-wrapper {
  height: 100vh;
  background: #fce4ec;
  perspective: 1000px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  .stage {
    background-color: #e0f2f180;
    width: 400px;
    height: 400px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transform: rotateZ(0deg);
    transform-style: preserve-3d;

    .layer {
      font-size: 2rem;
      color: white;
      text-shadow: 0 0 15px rgb(0 0 0 / 40%);

      &.background {
        transform: translate3d(0, 0, -200px);
        filter: blur(2px);
      }

      &.main-content {
        transform: translate3d(0, 0, 0);
      }

      &.other-content {
        transform: translate3d(250px, 0, 100px);
        filter: blur(1px);
      }

      &.foreground {
        transform: translate3d(0, 0, 250px);
        filter: blur(2px);
      }
    }
  }

  .offset {
    position: fixed;
    left: 50%;
    bottom: 0.5rem;
    transform: translateX(-50%);
    width: 100%;
    text-align: center;

    input {
      width: 400px;
      max-width: calc(100vw - 4rem);
    }
  }
}
</style>
