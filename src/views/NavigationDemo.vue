<template>
  <div>
    <div class="scene nav" ref="navScene">
      <navigation ref="nav" :items="items" :menuColor="menuColor"></navigation>
    </div>
    <div class="scene red lighten-4"></div>
    <div class="scene green lighten-4"></div>
  </div>
</template>

<script>
export default {
  name: "NavigationDemo",
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
  mounted() {
    //
  },
};
</script>

<style lang="scss" scoped>
.scene {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
</style>
