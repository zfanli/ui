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
      :class="{
        'gallery-body': true,
        grid: true,
        'gallery-column': $vuetify.breakpoint.mobile,
        'gallery-row': !$vuetify.breakpoint.mobile,
      }"
    >
      <div
        v-for="(img, i) in displayImages"
        :key="i"
        :class="[
          'item',
          'span' + img.span,
          itemClass,
          curr === i ? 'viewer' : '',
        ]"
        @click="viewer(i)"
      >
        <img :src="img.src" alt="image" />
      </div>

      <div class="show-more" @click="showMore" v-if="shouldShowMore">
        {{ showAll ? "Show Less" : "Show More" }}
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

    <div class="gallery-viewer-button-panel" v-show="curr !== -1" ref="panel">
      <div class="gallery-viewer-previewer" ref="viewer">
        <img alt="image" @click="closeViewer" />
        <v-snackbar v-model="alert" :timeout="timeout" centered absolute>
          {{ info }}
        </v-snackbar>
      </div>

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
    defaultDisplayCount: {
      type: Number,
      default: 12,
    },
  },

  data: () => ({
    cellHeight: 0,
    cellWidth: 0,
    timeline: null,
    progress: 0,
    curr: -1,
    info: "",
    alert: false,
    timeout: 2000,
    showAll: false,
  }),

  computed: {
    displayImages() {
      if (this.showAll) return this.images;
      else return this.images.slice(0, this.defaultDisplayCount);
    },
    shouldShowMore() {
      // return this.images.length - this.defaultDisplayCount > 0
      return (
        this.images.length - this.defaultDisplayCount > 0 &&
        this.displayImages.length !== this.images.length
      );
    },
  },

  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize);

    const { panel } = this.$refs;

    panel.remove();
    document.body.append(panel);

    this.bindAnimation();
  },

  destroyed() {
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("scroll", this.disableScrolling);
  },

  methods: {
    onResize() {
      // resize the size of image wrappers
      const { clientHeight, clientWidth } = this.$refs.wrapper;
      this.cellHeight = this.$vuetify.breakpoint.mobile
        ? Math.ceil((clientWidth / 2) * 0.4)
        : Math.ceil(clientHeight / 4);
      this.cellWidth = this.$vuetify.breakpoint.mobile
        ? Math.ceil((clientWidth - 24) / 2)
        : Math.ceil(this.cellHeight * 0.45);

      setTimeout(() => {
        // resize the size of image themselves
        if (this.$refs.body.children) {
          for (let image of Array.from(this.$refs.body.children).filter((a) =>
            a.classList.contains("item")
          )) {
            if (image.children[0].complete) {
              this.setupImage({ target: image.children[0] });
            } else {
              image.children[0].onload = this.setupImage;
            }
          }
        }
      }, 0);
    },

    bindAnimation() {
      if (this.timeline) this.timeline.kill();
      const { wrapper, body } = this.$refs;
      const { mobile } = this.$vuetify.breakpoint;
      setTimeout(() => {
        const gap = body.clientWidth - wrapper.clientWidth;
        this.timeline = ScrollTrigger.create({
          animation: gsap.fromTo(
            body,
            { x: 0 },
            {
              x: mobile ? 0 : -gap,
            }
          ),
          trigger: wrapper,
          end: "+=" + (gap + 200),
          pin: !mobile,
          // pin: !mobile && gap !== 0,
          onUpdate: (e) => {
            this.progress = e.progress;
          },
        });
      }, 0);
    },

    showMore() {
      this.showAll = !this.showAll;
      this.onResize();
      setTimeout(() => {
        this.bindAnimation();
        window.dispatchEvent(new Event("resize"));
      }, 0);
    },

    setupImage({ target }) {
      const parentWidth = target.parentElement.clientWidth,
        parentHeight = target.parentElement.clientHeight;
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
      // window.addEventListener("wheel", this.disabling, { passive: false });
      // prevent scroll events
      window.addEventListener("scroll", this.disabling);

      // keep current viewed index of image
      this.curr = i;
      const target = this.$refs.body.children[this.curr];
      const image = target.children[0];
      const viewer = this.$refs.viewer;
      viewer.children[0].src = image.src;

      this.setupViewer();
    },

    setupViewer() {
      if (this.curr === -1) return;
      // prepare animation targets
      const target = this.$refs.body.children[this.curr];
      const viewer = this.$refs.viewer;
      const image = target.children[0];
      const { imageWidth, imageHeight } = this.calculate(image);
      const offset = target.getBoundingClientRect();

      this.viewerAnime = [
        gsap.fromTo(
          viewer,
          {
            width: offset.width,
            height: offset.height,
            top: offset.top,
            left: offset.left,
            opacity: 1,
          },
          {
            width: "100vw",
            height: "100vh",
            top: 0,
            left: 0,
            opacity: 1,
            duration: 0.25,
            ease: "none",
            // prevent flashing before image src updated
            delay: 0.1,
          }
        ),
        gsap.fromTo(
          viewer.children[0],
          {
            width: image.width,
            height: image.height,
          },
          {
            width: imageWidth,
            height: imageHeight,
            duration: 0.5,
            // ease: "none",
          },
          "-=0.25"
        ),
      ];
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
      if (next < 0 || next >= this.images.length) {
        this.info = "No more images there";
        this.alert = true;
        return;
      }
      const image = this.$refs.body.children[next].children[0];
      const { imageWidth, imageHeight } = this.calculate(image);
      const previewer = this.$refs.viewer.children[0];

      gsap.to(previewer, {
        width: imageWidth,
        height: imageHeight,
        duration: 0.25,
      });

      this.viewerAnime.pop();
      this.viewerAnime.push(
        gsap
          .to(previewer, {
            width: image.width,
            height: "auto",
          })
          .pause()
      );
      previewer.src = image.src;
      this.curr = next;
    },

    closeViewer() {
      // retrieve mouse wheel actions
      window.removeEventListener("wheel", this.disabling);
      // retrieve scroll events
      window.removeEventListener("scroll", this.disableScrolling);
      // reverse all animations to get back to the initial state
      for (let an of this.viewerAnime) an.reverse();

      gsap.to(this.$refs.viewer, {
        opacity: 0,
        delay: 0.25,
        duration: 0.25,
        onComplete: () => (this.curr = -1),
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~vuetify/src/styles/styles.sass";

.gallery-wrapper {
  min-height: 100vh;
  max-width: 100%;
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
    grid-template-columns: var(--cell-width) var(--cell-width);
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

    // disable hover styles on mobile devices due to the inconsistency of user experiences
    @media #{map-get($display-breakpoints, 'sm-and-down')} {
      &:hover {
        transform: none;
        box-shadow: none;
      }
    }
  }

  .gallery-body.grid {
    .show-more {
      align-self: center;
      grid-column-end: span 2;
      grid-row-end: span 2;
      font-size: 0.7rem;
      right: 0;
      text-align: center;
      justify-self: center;
      text-transform: uppercase;
      font-family: "Rock Salt", cursive;
      cursor: pointer;
      text-shadow: 0px 5px 5px rgb(0 0 0 / 20%), 0px 4px 5px rgb(0 0 0 / 14%),
        0px 1px 7px rgb(0 0 0 / 12%);
      transition: text-shadow 0.25s ease;
      width: 100px;
      padding: 0.5rem;
      color: white;
      font-weight: bold;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff4;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        z-index: -1;
      }

      &:hover {
        text-shadow: 0px 5px 5px rgb(0 0 0 / 20%), 0px 8px 10px rgb(0 0 0 / 14%),
          0px 3px 14px rgb(0 0 0 / 12%);
      }
    }
  }
}
</style>

<style lang="scss">
.gallery-viewer-button-panel {
  z-index: 20;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  overflow: hidden;

  .gallery-viewer-previewer {
    position: fixed;
    background-color: white;
    overflow: hidden;

    img {
      height: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
    }
  }

  .action-icon {
    // use important to fix up the override caused by vuetify icon component
    position: absolute !important;
    font-size: 2rem;
    cursor: pointer;
    color: white !important;
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
</style>
