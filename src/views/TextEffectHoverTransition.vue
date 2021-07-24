<template>
  <div class="body" ref="body">
    <div class="cursor"></div>
    <div class="circles">
      <div class="circle circle1"></div>
      <div class="circle circle2"></div>
      <div class="circle circle3"></div>
    </div>
    <div class="content">
      <div class="logo">Text Effect: <br />Hover Transition!</div>
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap";

export default {
  data: () => ({ offsetX: 0, offsetY: 0 }),
  mounted() {
    const offset = this.$refs.body.getBoundingClientRect();
    this.offsetX = offset.left;
    this.offsetY = offset.top;
    this.$refs.body.addEventListener("mousemove", this.mouseMove);
  },
  destroyed() {
    this.$refs.body.removeEventListener("mousemove", this.mouseMove);
  },
  methods: {
    mouseMove(event) {
      const { clientX, clientY } = event;
      const x = clientX - this.offsetX,
        y = clientY - this.offsetY;
      gsap.set(".cursor", { x, y });
      gsap.to(".circle", { x, y, stagger: -0.1 });
    },
  },
};
</script>

<style lang="scss" scoped>
.body {
  width: 100%;
  height: 100%;

  &,
  * {
    cursor: none;
  }

  .cursor {
    position: fixed;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #3f51b5;
    user-select: none;
    pointer-events: none;
    z-index: 10000;
  }

  .circles {
    position: relative;
    background-color: #0d47a1;
    overflow: hidden;
    width: 100%;
    height: 100%;

    .circle {
      position: absolute;
      border-radius: 50%;
      top: 0;
      left: 0;
      will-change: transform;

      $circles: (
        #0078ff: 460px,
        #00ecc2: 320px,
        #ffd75f: 200px,
      );

      @each $color, $size in $circles {
        &.circle#{index($circles, ($color $size))} {
          background-color: $color;
          width: $size;
          height: $size;
          margin: (-$size/2) 0 0 (-$size/2);
        }
      }
    }
  }

  .content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    mix-blend-mode: screen;
    background-color: white;

    .logo {
      font-weight: bolder;
      font-size: 8em;
      color: black;
    }
  }
}
</style>
