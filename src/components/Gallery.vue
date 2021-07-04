<template>
  <div
    class="gallery-wrapper"
    ref="wrapper"
    :style="{
      '--cell-height': cellHeight + 'px',
      '--cell-width': cellWidth + 'px',
    }"
  >
    <div
      ref="body"
      :class="[
        'gallery-body',
        'grid',
        $vuetify.breakpoint.mobile ? 'gallery-column' : 'gallery-row',
      ]"
    >
      <div
        v-for="(img, i) in images"
        :key="i"
        :class="['item', 'span' + img.span, itemClass]"
        :style="{ 'background-image': `url(${img.src})` }"
      ></div>
    </div>

    <v-progress-linear
      v-if="!$vuetify.breakpoint.mobile"
      class="progress"
      buffer-value="0"
      height="6"
      :color="progressColor"
      :value="progress * 100"
      stream
      bottom
      absolute
    ></v-progress-linear>
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
  name: "Gallery",
  props: {
    images: {
      type: Array,
      default: () => [],
    },
    itemClass: {
      type: String,
      default: "",
    },
    progressColor: {
      type: String,
      default: "red",
    },
  },
  data: () => ({
    cellHeight: 0,
    cellWidth: 0,
    timeline: null,
    progress: 0,
  }),
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize);

    const { wrapper, body } = this.$refs;
    const { mobile } = this.$vuetify.breakpoint;

    setTimeout(() => {
      this.timeline = gsap.timeline().fromTo(
        body,
        { x: 0 },
        {
          x: mobile ? 0 : wrapper.clientWidth - body.clientWidth,
          duration: body.clientWidth - wrapper.clientWidth,
          scrollTrigger: {
            trigger: wrapper,
            pin: !mobile,
            onUpdate: (e) => {
              this.progress = e.progress;
            },
          },
        }
      );
    }, 0);
  },
  destroyed() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    onResize() {
      const { clientHeight, clientWidth } = this.$refs.wrapper;
      this.cellHeight = this.$vuetify.breakpoint.mobile
        ? Math.ceil((clientWidth / 2) * 0.5625)
        : Math.ceil(clientHeight / 4);
      this.cellWidth = Math.ceil(this.cellHeight * 0.45);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~vuetify/src/styles/styles.sass";

.gallery-wrapper {
  min-height: 100vh;
  max-width: 100%;
  overflow: hidden;

  .gallery-body.grid.gallery-row {
    height: 100vh;
    max-height: 100%;
    width: fit-content;
    min-width: 100%;
    align-content: center;
    display: grid;
    grid-template-rows: var(--cell-height) var(--cell-height);
    grid-auto-columns: var(--cell-width);
    grid-auto-flow: column;
    gap: 0.5rem;
    padding: 0.5rem;

    .item {
      @for $i from 1 through 4 {
        // generate column span for desktop devices
        &.span#{$i} {
          grid-column-end: span #{$i};
        }
      }
    }
  }

  .gallery-body.grid.gallery-column {
    justify-content: center;
    align-content: center;
    width: 100%;
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: var(--cell-height);
    gap: 0.5rem;
    padding: 0.5rem;

    .item {
      // generate row span for mobile devices
      @for $i from 1 through 4 {
        &.span#{$i} {
          grid-row-end: span #{5 - $i};
        }
      }
    }
  }

  .item {
    background-color: lightpink;
    cursor: pointer;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    background-size: cover;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%),
        0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
    }

    // disable hover styles on mobile devices due to the inconsistency of user experiences
    @media #{map-get($display-breakpoints, 'sm-and-down')} {
      &:hover {
        transform: none;
        box-shadow: none;
      }
    }
  }
}
</style>
