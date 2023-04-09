<template>
  <div>
    <gallery :images="images"></gallery>
    <div class="scene"></div>
  </div>
</template>

<script>
export default {
  name: "GalleryDemo",
  data: () => {
    const images = [];
    for (let i = 1; i <= 36; i++) {
      images.push({
        src: require(`../assets/images/parallax/p${(i % 4) + 1}.jpg`),
        span: (i % 4) + 1,
      });
    }
    return { images };
  },
};
</script>

<style lang="scss" scoped>
.scene {
  height: 100vh;
}
</style>
