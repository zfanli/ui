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
      <v-list nav dense>
        <v-list-item v-for="item in list" :key="item.name" :to="item.link">
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
        :style="`transform: ${
          showNav ? 'translateX(-50%)' : 'translateX(.5rem)'
        };`"
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
    list: [
      {
        name: "Album",
        link: "album",
        icon: "mdi-link",
      },
      {
        name: "Scrolling Progress",
        link: "scrolling-progress",
        icon: "mdi-link",
      },
    ],
  }),
};
</script>

<style lang="scss">
html {
  overflow: hidden !important;
}
</style>

<style lang="scss" scoped>
.switcher {
  background-color: white;
  border-color: gray;
  transition: all 0.25s ease;
  position: absolute;
  top: 0.5rem;
  left: 0;
  transform: translateX(-50%);
  z-index: 100;
}
</style>
