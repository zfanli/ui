<template>
  <div class="app">
    <nav :class="{ open: showNav }">
      <header>
        <div class="home" @click="to('/')">
          <div class="title">UI Code Snippets</div>
          <div class="desc">The demonstration for ui parts.</div>
        </div>
        <div class="menu mdi mdi-menu" @click="showNav = !showNav"></div>
      </header>
      <section class="nav-group" v-for="(nav, idx) in links" :key="idx">
        <div class="subheader" v-if="!!nav.subheader">{{ nav.subheader }}</div>
        <div
          class="nav-item"
          v-for="item in nav.items"
          :key="item.name"
          @click="to(item.link)"
        >
          <i :class="['mdi', item.icon]"></i>
          <span>{{ item.name }}</span>
        </div>
      </section>
    </nav>

    <router-view class="content" />
  </div>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    showNav: true,
    links: {
      parts: {
        subheader: "Parts",
        items: [
          {
            name: "Album",
            link: "album",
            icon: "mdi-link",
          },
          {
            name: "Timeline",
            link: "timeline",
            icon: "mdi-link",
          },
          {
            name: "Loading: Animation",
            link: "loading",
            icon: "mdi-link",
          },
          {
            name: "Gallery: GSAP",
            link: "gallery",
            icon: "mdi-link",
          },
          {
            name: "Navigation: GSAP + SVG",
            link: "navigation",
            icon: "mdi-link",
          },
        ],
      },
      examples: {
        subheader: "Examples",
        items: [
          {
            name: "Progress: ScrollTrigger",
            link: "scrolling-progress",
            icon: "mdi-link",
          },
          {
            name: "Banner: GIF animation",
            link: "animation-demo",
            icon: "mdi-link",
          },
          {
            name: "Text Effect: Hover Transition",
            link: "text-effect-hover-transition",
            icon: "mdi-link",
          },
          {
            name: "Parallax: Scroll, GSAP",
            link: "parallax",
            icon: "mdi-link",
          },
          {
            name: "Parallax: Scroll, Pure CSS",
            link: "parallax-pure-css",
            icon: "mdi-link",
          },
          {
            name: "Parallax: Mouse Move",
            link: "mouse-move-parallax",
            icon: "mdi-link",
          },
          {
            name: "Markdown Editor",
            link: "markdown-editor",
            icon: "mdi-link",
          },
        ],
      },
    },
  }),
  watch: {
    showNav() {
      window.dispatchEvent(new Event("resize"));
    },
  },
  methods: {
    to(link) {
      this.$router.push(link);
    },
  },
};
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap.scss";

html {
  overflow: hidden !important;
}
html {
  overflow: auto !important;
}
</style>

<style lang="scss" scoped>
.app {
  min-height: 100vh;
  display: flex;

  nav {
    flex-shrink: 0;
    padding: 0.5rem;
    background-color: #ff4081;
    color: white;
    transform: translate3d(-100%, 0, 0);
    position: fixed;
    top: 0;
    z-index: 100;
    transition: all 0.25s ease-out;
    max-height: 100vh;
    height: 100vh;

    &.open {
      transform: translate3d(0, 0, 0);
      position: sticky;

      header .menu {
        transform: translate3d(0, 0, 0);
        color: #fff;
        background-color: transparent;
      }
    }

    header {
      display: flex;
      justify-content: flex-start;

      .home {
        padding-right: 0.5rem;
        flex-grow: 1;

        .title {
          font-size: 1.5rem;
          font-weight: bold;
        }
      }

      .menu {
        font-size: 1.5rem;
        cursor: pointer;
        transform: translate3d(2.5rem, -0.5rem, 0);
        color: #0009;
        transition: color 0.25s ease-out 0.25s;
        background-color: #fff6;
        justify-self: center;
        align-self: flex-start;
        line-height: 1;
        margin-top: 5px;

        &:hover::before {
          transform: rotate(-90deg);
        }

        &::before {
          transition: all 0.25s ease;
        }
      }
    }

    .nav-group {
      margin: 0.5rem 0;

      .subheader {
        font-weight: bold;
      }

      .nav-item {
        padding-left: 0.5rem;
        line-height: 1.5;
        cursor: pointer;
        text-shadow: 0 0 1px #0003;

        &:hover {
          text-shadow: 0 0 5px #000;
        }

        .mdi {
          margin-right: 1rem;
        }
      }
    }
  }

  .content {
    flex-shrink: 0;
    flex-grow: 1;
    min-height: 100vh;
  }
}
</style>
