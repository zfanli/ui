<template>
  <div
    class="anime-demo"
    :style="{
      '--image-width': imageWidth + 'px',
      '--image-height': imageHeight + 'px',
      '--image-padding': imagePadding + 'px',
    }"
  >
    <div class="scene banner-wrapper" ref="bannerWrapper">
      <div class="banner" ref="imageWrapper">
        <div class="image-frame" v-for="n in 9" :key="n"></div>
      </div>

      <div class="logo" :style="`width: ${logoWidth}px;`">
        <div class="logo-text" :style="`font-size: ${imageWidth * 0.05}px;`">
          <p>KEANA</p>
          <p>BLOG</p>
        </div>
        <div class="bio">
          music, milk tea and moods <br />
          necessary stuffs for creativity
        </div>

        <div class="scroll-indicator">
          <v-icon class="scroll-icon">mdi-chevron-double-down</v-icon>
        </div>
      </div>
    </div>

    <div ref="main">
      <div id="illustration" class="scene red lighten-4"></div>
      <div id="mineral" class="scene yellow lighten-4"></div>
      <div id="ink-wash" class="scene blue lighten-4"></div>
      <div id="photography" class="scene purple lighten-4"></div>
    </div>

    <footer>this is a footer</footer>

    <custom-nav :show="showNav" :active="navActive"></custom-nav>
  </div>
</template>
<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { debounce } from "lodash";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.defaults({
  start: "top top",
  scrub: 1,
});

export default {
  name: "AnimationDemo",
  data: () => {
    return {
      imageWidth: 0,
      imageHeight: 0,
      imagePadding: 0,
      timeline: null,
      scrollTrigger: null,
      duration: 0.2,
      delay: 0,
      showNav: false,
      navActive: "",
    };
  },

  computed: {
    /**
     * Keep the aspect ratio of the logo area with the image width.
     */
    logoWidth() {
      const width = this.imageWidth * 0.3;
      return window.innerWidth < width ? window.innerWidth : width;
    },
  },

  mounted() {
    // Bind resize handler after elements mounted.
    this.onResize();
    window.addEventListener(
      "resize",
      debounce(this.onResize, 250, { tailing: true })
    );

    // Pause banner animation due to the performance issue,
    // only play the animation when it's inside the visible area.
    const { main } = this.$refs;
    ScrollTrigger.create({
      trigger: main,
      onEnter: () => {
        this.timeline.pause();
        this.showNav = true;
      },
      onLeaveBack: () => {
        this.timeline.resume();
        this.showNav = false;
      },
    });

    ScrollTrigger.create({
      trigger: "#illustration",
      onEnter: () => (this.navActive = "插画"),
      onEnterBack: () => (this.navActive = "插画"),
    });
    ScrollTrigger.create({
      trigger: "#mineral",
      onEnter: () => (this.navActive = "岩彩"),
      onEnterBack: () => (this.navActive = "岩彩"),
    });
    ScrollTrigger.create({
      trigger: "#ink-wash",
      onEnter: () => (this.navActive = "水墨"),
      onEnterBack: () => (this.navActive = "水墨"),
    });
    ScrollTrigger.create({
      trigger: "#photography",
      onEnter: () => (this.navActive = "摄影"),
      onEnterBack: () => (this.navActive = "摄影"),
    });
  },

  destroyed() {
    window.removeEventListener("resize", this.onResize);
  },

  methods: {
    /**
     * Start animation.
     */
    start() {
      const { bannerWrapper, imageWrapper } = this.$refs;
      const { duration, delay } = this;

      this.timeline = gsap
        .timeline()
        // mimic a gif but with transparency transition
        .fromTo(
          imageWrapper.children,
          { opacity: 0 },
          {
            opacity: 1,
            duration,
            delay,
            repeat: -1,
            yoyo: true,
            stagger: {
              each: duration,
            },
          }
        )
        // animate scroll behavior
        .fromTo(
          imageWrapper,
          { x: 0 },
          { id: "scrollAnimation", x: -1 * this.imagePadding }
        );

      this.scrollTrigger = ScrollTrigger.create({
        animation: this.timeline.getById("scrollAnimation"),
        trigger: bannerWrapper,
        start: "top top",
        end: "+=" + this.imagePadding,
        pin: true,
      });

      // Pause animation if banner is out of the current view.
      if (window.pageYOffset > imageWrapper.offsetHeight) {
        this.timeline.pause();
      }
    },

    /**
     * Kill the current animation to prepare for the next one.
     */
    clear() {
      this.timeline && this.timeline.kill();
      this.scrollTrigger && this.scrollTrigger.kill();
    },

    /**
     * Re-calculate the width and height of images and re-generate animation.
     */
    onResize() {
      // Re-calculate the width and height.
      const { clientHeight, clientWidth } = this.$refs.bannerWrapper;
      const { mobile } = this.$tools;
      const imageWidth =
          clientHeight / clientWidth <= 0.5626
            ? clientWidth
            : clientHeight * (16 / 9),
        imageHeight =
          clientHeight / clientWidth >= 0.5626
            ? clientHeight
            : clientWidth * (9 / 16) - 1,
        imagePadding = Math.max(0, imageWidth - clientWidth);

      // Check and skip animation re-generation if the width is not changed on mobile devices,
      // to prevent unnecessary re-generation on mobile devices triggered by hiding address bar.
      if (!mobile || imageWidth !== this.imageWidth) {
        this.imageWidth = imageWidth;
        this.imageHeight = imageHeight;
        this.imagePadding = imagePadding;
        // Kill current animation.
        this.clear();
        // Re-generate the animation.
        this.start();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.anime-demo {
  .scene {
    width: 100%;
    min-height: 100vh;
    overflow: hidden;
    position: relative;

    .banner {
      position: relative;
      height: 100vh;
      max-height: 100%;
      width: var(--image-width);
      overflow: hidden;
      background-image: url(../assets/images/banner/b1.jpg);
      background-size: 100%;

      .image-frame {
        background-size: 100%;
        max-height: 100%;
        right: 0;
        top: 0;
        position: absolute;
        width: var(--image-width);
        height: var(--image-height);
        opacity: 0;

        // generate image urls for all frames
        @for $i from 1 through 9 {
          $img-no: $i + 1;
          &:nth-child(#{$i}) {
            background-image: url(../assets/images/banner/b#{$img-no}.jpg);
          }
        }
      }
    }

    .logo {
      position: absolute;
      top: 0;
      right: 0;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;

      .logo-text {
        color: rgb(220, 185, 155);
        font-family: "Rock Salt", cursive;
        background-image: url(../assets/images/banner/jj.png);
        background-size: contain;
        background-position: 50%;
        text-shadow: 0 0 10px rgb(0 0 0 / 30%);
      }

      .bio {
        color: rgba(255, 255, 255, 0.3);
      }

      .scroll-indicator {
        margin-top: 1rem;
        color: rgba(255, 255, 255, 0.8);
        position: relative;

        .scroll-icon {
          color: inherit;
          animation: float 6s ease-in-out infinite;
          position: relative;
        }
      }
    }
  }
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>
