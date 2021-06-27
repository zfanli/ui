<template>
  <div>
    <div class="container">
      <div class="scene">
        <div class="no-pic-left">{{ noLeft ? noLeft : "No picture left" }}</div>
        <div
          v-for="(c, i) in colors"
          :key="i"
          :class="`card elevation-${4 * (5 - z[i])} ${c} lighten-4`"
          :style="
            `transform: translate3d(-50%, ${-y[i]}%, ${z[i] * 2}px);` +
            `opacity: ${z[i] > 0 ? 0 : 1};` +
            `transition: all 0.3s ${tf};`
          "
          @click="curr = i"
        ></div>
      </div>
    </div>
    <div class="buttons">
      <v-btn elevation="2" icon @click="up">
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
      <v-btn elevation="2" icon @click="down">
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "Album",
  props: {
    noLeft: String,
  },
  data: () => ({
    curr: 4,
    colors: ["red", "purple", "deep-purple", "teal", "orange"],
    tf: "ease-in",
  }),
  computed: {
    z() {
      let res = [];
      for (let i = 0; i < 5; i++) {
        let zn = i - this.curr;
        if (zn > 0) zn *= 10;
        res.push(zn);
      }
      return res;
    },
    y() {
      let res = [],
        base = this.curr;
      for (let i = 4; i >= 0; i--) {
        let yn = (5 + base * 2) * 10;
        if (yn < 50) yn = -200;
        base--;
        res.push(yn);
      }
      return res;
    },
  },
  methods: {
    up() {
      this.tf = "ease-in";
      if (this.curr !== -1) this.curr--;
    },
    down() {
      this.tf = "ease-out";
      if (this.curr !== 4) this.curr++;
    },
  },
};
</script>

<style lang="scss">
html {
  overflow: hidden;
}

.container {
  max-height: 100vh;
  overflow: auto;
  perspective: 10px;
  transform-style: preserve-3d;
  position: relative;
  overflow: hidden;
}

.scene {
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.no-pic-left {
  // color: white;
  background-color: transparent;
  height: 100vh;
  width: 100%;
  text-align: center;
  line-height: 100vh;
  position: fixed;
}

.card {
  height: 30%;
  width: 40% !important;
  display: inline-block !important;
  transition: all 0.3s ease-in;
  position: absolute;
  left: 50%;
  top: 50%;
  opacity: 1;
}

$start-point: 1;
.card {
  &:nth-child(#{$start-point + 1}) {
    transform: translate3d(-50%, -90%, -4px);
  }
  &:nth-child(#{$start-point + 2}) {
    transform: translate3d(-50%, -80%, -3px);
  }
  &:nth-child(#{$start-point + 3}) {
    transform: translate3d(-50%, -70%, -2px);
  }
  &:nth-child(#{$start-point + 4}) {
    transform: translate3d(-50%, -60%, -1px);
  }
  &:nth-child(#{$start-point + 5}) {
    transform: translate3d(-50%, -50%, 0px);
  }
}

.buttons {
  position: fixed;
  right: 0;
  bottom: 0;
  padding: 1rem;
  display: flex;
  flex-direction: column;

  button {
    margin: 1rem;
    background-color: rgba(255, 255, 255, 0.3);
  }
}
</style>
