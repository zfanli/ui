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
        :class="[
          'item',
          'span' + img.span,
          itemClass,
          curr === i ? 'viewer' : '',
        ]"
        @click="viewer(i)"
      >
        <img :src="img.src" alt="image" @load="setupImage" />
      </div>
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

    <div class="viewer-panel" v-show="curr !== -1">
      <v-icon class="action-icon closable" @click="closeViewer">
        mdi-close
      </v-icon>
      <v-icon class="action-icon prev" @click="showImage(-1)">
        mdi-chevron-double-left
      </v-icon>
      <v-icon class="action-icon next" @click="showImage(1)">
        mdi-chevron-double-right
      </v-icon>
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
    curr: -1,
    viewerTriggerImageBackup: null,
    viewerTriggerImage: null,
  }),

  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize);

    const { wrapper, body } = this.$refs;
    const { mobile } = this.$vuetify.breakpoint;

    setTimeout(() => {
      const gap = body.clientWidth - wrapper.clientWidth;
      this.timeline = gsap.timeline().fromTo(
        body,
        { x: 0 },
        {
          x: mobile ? 0 : -gap,
          scrollTrigger: {
            trigger: wrapper,
            end: "+=" + (gap + 200),
            pin: !mobile,
            // pin: !mobile && gap !== 0,
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
    window.removeEventListener("scroll", this.disableScrolling);
  },

  methods: {
    onResize() {
      const { clientHeight, clientWidth } = this.$refs.wrapper;
      this.cellHeight = this.$vuetify.breakpoint.mobile
        ? Math.ceil((clientWidth / 2) * 0.4)
        : Math.ceil(clientHeight / 4);
      this.cellWidth = Math.ceil(this.cellHeight * 0.45);
    },

    setupImage({ target }) {
      const parentWidth = parseInt(
          window.getComputedStyle(target.parentElement).width
        ),
        parentHeight = parseInt(
          window.getComputedStyle(target.parentElement).height
        );
      const imageRatio = target.width / target.height;
      const width = parentHeight * imageRatio;
      if (width < parentWidth) {
        gsap.set(target, {
          width: parentWidth,
          height: parentWidth / imageRatio,
        });
      }
    },

    disabling(e) {
      e.preventDefault();
    },

    viewer(i) {
      // ignore if image viewer is already displayed
      if (this.curr !== -1) return;

      // generate a scroll handler for prevent scrolling while the viewer is showing
      this.disableScrolling = (() => {
        const offset = window.pageYOffset;
        return () => window.scrollTo(0, offset);
      })();

      // disable mouse wheel actions
      window.addEventListener("wheel", this.disabling, { passive: false });
      // disable touch move actions on mobile devices
      window.addEventListener("touchmove", this.disabling, { passive: false });
      // prevent scroll events
      window.addEventListener("scroll", this.disableScrolling);

      // keep current viewed index of image
      this.curr = i;

      // prepare animation targets
      const target = this.$refs.body.children[i];
      const image = target.children[0];
      const { imageWidth, imageHeight } = this.calculate(image);
      const offset = target.getBoundingClientRect();

      this.viewerAnime = [
        gsap.to(target, {
          width: window.innerWidth,
          height: window.innerHeight,
          position: "relative",
          top: -offset.top,
          left: -offset.left,
          zIndex: 9999,
          duration: 0.25,
          ease: "none",
        }),
        gsap.to(
          image,
          {
            width: imageWidth,
            height: imageHeight,
            duration: 0.5,
            // ease: "none",
          },
          "-=0.25"
        ),
      ];

      this.viewerTriggerImageBackup = image.src;
      this.viewerTriggerImage = image;
    },

    calculate(image) {
      const imageRatio = image.width / image.height;
      let imageHeight = window.innerHeight - 50,
        imageWidth = imageHeight * imageRatio;

      if (imageWidth > window.innerWidth - 50) {
        imageWidth = window.innerWidth - 50;
        imageHeight = imageWidth / imageRatio;
      }

      return { imageWidth, imageHeight };
    },

    showImage(i) {
      const next = this.curr + i;
      if (next < 0 || next >= this.images.length) return;
      const image = this.$refs.body.children[next].children[0];
      const { imageWidth, imageHeight } = this.calculate(image);

      gsap.to(this.viewerTriggerImage, {
        width: imageWidth,
        height: imageHeight,
      });
      this.viewerTriggerImage.src = image.src;
      this.curr = next;
    },

    closeViewer() {
      this.curr = -1;
      // retrieve mouse wheel actions
      window.removeEventListener("wheel", this.disabling);
      // retrieve touch move actions
      window.removeEventListener("touchmove", this.disabling);
      // retrieve scroll events
      window.removeEventListener("scroll", this.disableScrolling);
      // reverse all animations to get back to the initial state
      for (let an of this.viewerAnime) an.reverse();
      // swap pictures if necessary
      if (this.viewerTriggerImage.src !== this.viewerTriggerImageBackup) {
        // do an opacity animation between 2 pictures
        gsap
          .timeline()
          .to(this.viewerTriggerImage, {
            opacity: 0,
            onComplete: () =>
              (this.viewerTriggerImage.src = this.viewerTriggerImageBackup),
          })
          .to(this.viewerTriggerImage, { opacity: 1 });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~vuetify/src/styles/styles.sass";

.gallery-wrapper {
  min-height: 100vh;
  max-width: 100%;
  // overflow: hidden;
  background-size: cover;
  background-position: center;
  position: relative;

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
    background-color: white;
    cursor: pointer;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    position: relative;
    overflow: hidden;

    img {
      height: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
    }

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%),
        0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
    }

    &.viewer {
      cursor: unset;

      &:hover {
        transform: none;
        box-shadow: none;
      }
    }

    // disable hover styles on mobile devices due to the inconsistency of user experiences
    @media #{map-get($display-breakpoints, 'sm-and-down')} {
      &:hover {
        transform: none;
        box-shadow: none;
      }
    }
  }

  .viewer-panel {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100vw;
    overflow: hidden;

    .action-icon {
      position: absolute;
      font-size: 2rem;
      cursor: pointer;
      color: white;
      text-shadow: 0 0 10px black;

      &.closable {
        right: 1.5rem;
        top: 1rem;
      }

      &.prev {
        top: 50%;
        left: 1.5rem;
      }

      &.next {
        top: 50%;
        right: 1.5rem;
      }
    }
  }
}
</style>
