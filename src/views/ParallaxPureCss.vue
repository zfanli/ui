<template>
  <div class="parallax-wrapper">
    <div class="parallax-intro">Parallax: Pure CSS</div>
    <div class="parallax-group parallax-group1">
      <div class="parallax-layer parallax-layer-back">Back Parallax Layer</div>
      <div class="parallax-layer parallax-layer-mid">Middle Parallax Layer</div>
    </div>
    <div class="parallax-group parallax-group2">
      <div class="parallax-layer parallax-layer-mid">Middle Parallax Layer</div>
      <div class="parallax-layer parallax-layer-front">
        Front Parallax Layer
      </div>
    </div>
    <div class="parallax-outro">The End</div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@mixin align-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.parallax-wrapper {
  font-size: 4em;
  color: white;
  perspective: 300px;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  // overflow: hidden;
  scroll-snap-type: y mandatory;

  &,
  * {
    margin: 0;
    padding: 0;
  }

  .parallax-intro {
    @include align-center();
    height: 100vh;
    background-color: tomato;
    position: relative;
    z-index: 30;
    scroll-snap-align: start;
  }

  .parallax-group {
    height: 100vh;
    position: relative;
    transform-style: preserve-3d;
    z-index: 20;
    scroll-snap-align: start;

    &.parallax-group1 {
      & > .parallax-layer:first-child {
        background-color: rgb(192, 44, 56);
      }
    }

    &.parallax-group2 {
      & > .parallax-layer:first-child {
        background-color: yellowgreen;
      }
    }

    .parallax-layer {
      @include align-center();
      position: absolute;
      inset: 0;

      &.parallax-layer-back {
        // scale: 1 + ((translated z * -1) / perspective)
        transform: translateZ(-300px) scale(2.1);
      }

      &.parallax-layer-front {
        // scale: 1 + ((translated z * -1) / perspective)
        transform: translateZ(210px) scale(0.4);
      }
    }
  }

  .parallax-outro {
    @include align-center();
    height: 100vh;
    background-color: teal;
    position: relative;
    z-index: 20;
    scroll-snap-align: start;
  }
}
</style>
