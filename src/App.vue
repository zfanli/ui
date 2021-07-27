<template>
  <v-app>
    <v-navigation-drawer app v-model="showNav">
      <v-list-item to="/">
        <v-list-item-content>
          <v-list-item-title class="text-h6">UI demos</v-list-item-title>
          <v-list-item-subtitle>
            The demonstration for ui parts.
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list
        v-for="(nav, idx) in links"
        :key="idx"
        :subheader="!!nav.subheader"
        nav
        dense
      >
        <v-subheader v-if="!!nav.subheader">{{ nav.subheader }}</v-subheader>
        <v-list-item v-for="item in nav.items" :key="item.name" :to="item.link">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-btn
        class="switcher"
        color="gray"
        small
        fab
        @click="showNav = !showNav"
      >
        <v-icon
          :style="`transform: ${showNav ? 'rotate(0deg)' : 'rotate(180deg)'};`"
        >
          mdi-chevron-left
        </v-icon>
      </v-btn>
      <router-view />
    </v-main>
  </v-app>
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
};
</script>

<style lang="scss">
html {
  overflow: hidden !important;
}
html {
  overflow: auto !important;
}
</style>

<style lang="scss" scoped>
.switcher {
  background-color: white;
  border-color: gray;
  transition: all 0.25s ease;
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  z-index: 1;
}
</style>
