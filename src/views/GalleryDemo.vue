<template>
  <div>
    <gallery :images="images"></gallery>
    <div class="scene"></div>
  </div>
</template>

<script>
import Gallery from "../components/Gallery.vue";

export default {
  name: "GalleryDemo",
  components: { Gallery },
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
