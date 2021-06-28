<template>
  <v-app>
    <v-navigation-drawer app>
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
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
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
