<template>
  <navigation class="nav" :items="items" :menuColor="menuColor"></navigation>
</template>

<script>
import Navigation from "../components/Navigation.vue";

export default {
  name: "NavigationDemo",
  components: { Navigation },
  data: () => ({
    items: [
      { name: "插画", link: "#illustration", color: "#e28869" },
      { name: "岩彩", link: "#mineral", color: "#77c4d1" },
      { name: "水墨", link: "#ink-wash", color: "#288994" },
      { name: "摄影", link: "#photography", color: "#ced177" },
      { name: "“我”", link: "#me", color: "#e2ad69" },
      { name: "首页", link: "#app", color: "#f8baa7" },
    ],
    menuColor: "#1f675a",
  }),
};
</script>

<style lang="scss" scoped>
.nav {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
</style>
