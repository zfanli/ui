<template>
  <div>
    <div class="album">
      <div class="scene">
        <div class="no-pic-left">{{ noLeft ? noLeft : "No picture left" }}</div>
        <div class="aspect-ratio-wrapper" v-for="(c, i) in colors" :key="i">
          <div
            :class="`card elevation-${4 * (5 + z[i])} ${c} lighten-4`"
            :style="style(i)"
            @click="click(i)"
          ></div>
        </div>
      </div>
    </div>
    <div class="buttons">
      <button class="icon" @click="up">
        <i class="mdi mdi-chevron-up"></i>
      </button>
      <button class="icon" @click="down">
        <i class="mdi mdi-chevron-down"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Album",
  props: {
    noLeft: String,
    duration: {
      type: Number,
      default: 0.25,
    },
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
    style(i) {
      return `transform: translate3d(-50%, ${-this.y[i]}%, ${this.z[i] * 2}px);
              opacity: ${this.z[i] > 0 ? 0 : 1};
              transition: all ${this.duration}s ${this.tf};`;
    },
    click(i) {
      const timer = setInterval(() => {
        if (this.curr === i) {
          clearInterval(timer);
        } else {
          this.curr--;
        }
      }, this.duration * 1000);
    },
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

<style lang="scss" scoped>
.album {
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

.aspect-ratio-wrapper {
  $start-point: 1;
  width: 40%;
  position: absolute;
  left: 50%;
  top: 50%;

  .card {
    // height: 30%;
    padding-bottom: 56.25%;
    width: 100% !important;
    display: inline-block !important;
    opacity: 1;

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
}

.buttons {
  position: fixed;
  right: 0;
  bottom: 0;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  font-size: 1rem;

  .icon {
    margin: 1rem;
    background-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 2px 10px 0 #0005;
    border-radius: 50%;
    width: 1.5em;
    height: 1.5em;
    background-color: #fff;
    transition: all 0.25s ease;

    &:hover {
      background-color: #0001;
    }
  }
}
</style>
