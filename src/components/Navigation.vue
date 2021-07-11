<template>
  <div class="navigator-wrapper" ref="navigator">
    <nav class="menu" :style="colors">
      <input
        id="navigation-button"
        type="checkbox"
        class="menu-open"
        v-model="open"
      />
      <label class="menu-open-button" for="navigation-button">
        <span class="hamburger hamburger-1"></span>
        <span class="hamburger hamburger-2"></span>
        <span class="hamburger hamburger-3"></span>
      </label>

      <a
        v-for="item in items"
        :key="item.name"
        :href="item.link"
        class="menu-item"
      >
        {{ item.name }}
      </a>
    </nav>

    <!-- filters -->
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
        <filter id="shadowed-goo">
          <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
            result="goo"
          />
          <feGaussianBlur in="goo" stdDeviation="3" result="shadow" />
          <feColorMatrix
            in="shadow"
            mode="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2"
            result="shadow"
          />
          <feOffset in="shadow" dx="1" dy="1" result="shadow" />
          <feComposite in2="shadow" in="goo" result="goo" />
          <feComposite in2="goo" in="SourceGraphic" result="mix" />
        </filter>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
            result="goo"
          />
          <feComposite in2="goo" in="SourceGraphic" result="mix" />
        </filter>
      </defs>
    </svg>
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
  name: "Navigation",
  props: {
    items: {
      type: Array,
      default: () => [
        { name: "Item1", link: "#link1", color: "#e91e63" },
        { name: "Item2", link: "#link2", color: "#e91e63" },
        { name: "Item3", link: "#link3", color: "#e91e63" },
        { name: "Item4", link: "#link4", color: "#e91e63" },
        { name: "Item5", link: "#link5", color: "#e91e63" },
        { name: "Item6", link: "#link6", color: "#e91e63" },
      ],
    },
    menuColor: { type: String, default: "#e91e63" },
  },
  data: () => ({ open: false, isCenter: true }),
  computed: {
    colors() {
      const colors = {
        "--menu-color": this.menuColor,
      };
      this.items.forEach((item, i) => {
        colors["--item-color-" + (i + 1)] = item.color;
      });
      return colors;
    },
  },

  mounted() {
    const navigator = this.$refs.navigator,
      navScene = navigator.parentElement,
      left = 16,
      bottom = 16,
      duration = 0.5;

    ScrollTrigger.create({
      trigger: navigator,
      onEnter: () => {
        this.open = false;
        this.isCenter = false;
        const parentOffset = navScene.getBoundingClientRect();
        gsap.fromTo(
          navigator,
          {
            // origin x: `offset left` + `width of parent` / 2 - `half of nav width`
            left: parentOffset.left + parentOffset.width / 2 - 40,
            // origin y: `viewpoint height` - `nav height`
            bottom: window.innerHeight - 80,
            position: "fixed",
          },
          {
            left,
            bottom,
            position: "fixed",
            duration,
          }
        );
      },
      onLeaveBack: () => {
        this.open = false;
        this.isCenter = true;
        const parentOffset = navScene.getBoundingClientRect(),
          offset = navigator.getBoundingClientRect(),
          fromLeft =
            (parentOffset.width / 2 -
              40 +
              parentOffset.left -
              left -
              offset.left) *
            -1;

        gsap.fromTo(
          navigator,
          {
            // origin x: (`parent offset left` + `parent width` / 2 - `half of nav width`
            //            - `current nav offset left`) * -1
            left: fromLeft,
            bottom: (offset.bottom - 80) * -1,
            position: "relative",
          },
          {
            left: 0,
            bottom: 0,
            position: "relative",
            duration,
          }
        );
      },
    });
  },
  watch: {
    open(val) {
      if (!this.isCenter) {
        const navigator = this.$refs.navigator;
        gsap.to(navigator, {
          x: val ? 105 : 0,
          y: val ? -105 : 0,
          duration: 0.25,
        });
      }
    },
    isCenter(val) {
      const navigator = this.$refs.navigator;
      if (val) {
        gsap.to(navigator, {
          x: 0,
          y: 0,
          duration: 0.25,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@use "sass:math";

//config
$menu-items: 6+1;
$open-distance: 105px;
$opening-angle: math.$pi * 2;

%goo {
  filter: url("#shadowed-goo");
}

%ball {
  background-color: var(--menu-color);
  border-radius: 100%;
  width: 80px;
  height: 80px;
  position: absolute;
  color: white;
  text-align: center;
  line-height: 80px;
  transform: translate3d(0, 0, 0);
  transition: transform ease-out 200ms;
}

.menu-open {
  display: none;
}

.menu-item {
  @extend %ball;
  text-decoration: none;
}

.hamburger {
  $width: 25px;
  $height: 3px;
  width: $width;
  height: $height;
  background: white;
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -$width/2;
  margin-top: -$height/2;
  transition: transform 200ms;
}

$hamburger-spacing: 8px;

.hamburger-1 {
  transform: translate3d(0, -$hamburger-spacing, 0);
}
.hamburger-2 {
  transform: translate3d(0, 0, 0);
}
.hamburger-3 {
  transform: translate3d(0, $hamburger-spacing, 0);
}

.menu-open:checked + .menu-open-button {
  .hamburger-1 {
    transform: translate3d(0, 0, 0) rotate(45deg);
  }
  .hamburger-2 {
    transform: translate3d(0, 0, 0) scale(0.1, 1);
  }
  .hamburger-3 {
    transform: translate3d(0, 0, 0) rotate(-45deg);
  }
}

.navigator-wrapper {
  z-index: 10;
  width: 80px;
  height: 80px;

  .menu {
    $width: 380px;
    $height: 250px;
    @extend %goo;
    position: absolute;
    width: $width;
    height: $height;
    box-sizing: border-box;
    font-size: 20px;
    text-align: left;
    // transform: translate(50%, 0%);
  }
}

.menu-item {
  @for $i from 1 through $menu-items {
    &:nth-child(#{$i + 2}) {
      background-color: var(--item-color-#{$i});
      transition-duration: 180ms;

      &:hover {
        color: var(--item-color-#{$i});
        background: white;
      }
    }
  }
}

.menu-open-button {
  @extend %ball;
  z-index: 2;
  transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transition-duration: 400ms;
  transform: scale(1.1, 1.1) translate3d(0, 0, 0);
  cursor: pointer;
}

.menu-open-button:hover {
  transform: scale(1.2, 1.2) translate3d(0, 0, 0);
}

.menu-open:checked + .menu-open-button {
  transition-timing-function: linear;
  transition-duration: 200ms;
  transform: scale(0.8, 0.8) translate3d(0, 0, 0);
}

.menu-open:checked ~ .menu-item {
  transition-timing-function: cubic-bezier(0.935, 0, 0.34, 1.33);
  @for $i from 1 through $menu-items {
    // Start from top -> right -> bottom -> left
    // $angle: ((math.$pi - $opening-angle)/2)+
    //   (($opening-angle/($menu-items - 1)) * ($i - 1));

    // Start from left -> top -> right -> bottom
    $angle: ((math.$pi - $opening-angle))+
      (($opening-angle/($menu-items - 1)) * ($i - 1));

    &:nth-child(#{$i + 2}) {
      transition-duration: 80ms+ (100ms * $i);
      transform: translate3d(
        math.cos($angle) * $open-distance,
        math.sin($angle) * $open-distance,
        0
      );
    }
  }
}
</style>
