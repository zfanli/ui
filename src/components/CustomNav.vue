<template>
  <nav
    class="nav-wrapper"
    :style="{
      opacity: show ? 1 : 0,
      transform: `translate(${show ? '0' : '-100%'}, -50%)`,
    }"
  >
    <a
      v-for="(item, i) in items"
      :key="item.name"
      :class="['nav-item', i === activeIndex ? 'active' : '']"
      :href="item.anchor"
      @click.prevent="scrollTo(item.anchor)"
    >
      <div class="item-name">{{ item.name }}</div>
      <div class="item-name-en">{{ item.en }}</div>
    </a>
  </nav>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [
        { name: "插画", en: "Illustration", anchor: "#illustration" },
        { name: "岩彩", en: "Mineral-Color", anchor: "#mineral" },
        { name: "水墨", en: "Wash Painting", anchor: "#ink-wash" },
        { name: "摄影", en: "Photography", anchor: "#photography" },
      ],
    },
    show: {
      type: Boolean,
      default: true,
    },
    active: {
      type: String,
      default: "插画",
    },
  },
  computed: {
    activeIndex() {
      return this.items.findIndex((a) => a.name === this.active);
    },
  },
  methods: {
    scrollTo(an) {
      const target = document.querySelector(an);
      window.scrollTo(0, target.offsetTop + 1);
    },
  },
};
</script>

<style lang="scss" scoped>
$font-color: rgb(240, 223, 183);
$line-color: rgb(98, 140, 126);

.nav-wrapper {
  position: fixed;
  width: 100px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: opacity 0.25s ease, transform 0.25s ease;

  &::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 0;
    height: 100%;
    border-left: 1px solid $line-color;
    z-index: -100;
  }

  .nav-item {
    height: 64px;
    width: 64px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: $font-color;
    position: relative;
    border-radius: 50%;
    background-color: rgb(0 0 0 / 35%);
    text-shadow: 0 0 5px black;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
      0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
    transition: all 0.25s ease;
    cursor: pointer;
    text-decoration: none;

    &.active {
      background-color: rgb(255 255 255 / 15%);
      color: white;
    }

    .item-name-en {
      font-size: 9px;
      white-space: nowrap;
    }

    @for $i from 1 through 4 {
      &:nth-child(#{$i})::before {
        background-position: -5px -#{64 * ($i - 1) + 4 * $i + 1}px;
      }
    }

    &:not(:first-child) {
      margin-top: 2rem;
    }

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      height: 63px;
      width: 63px;
      border-radius: 50%;
      background-image: url(../assets/images/nav-logo.png);
      background-size: 72px;
      z-index: -1;
    }

    &::after {
      content: "";
      position: absolute;
      top: 5px;
      left: 0;
      height: 63px;
      width: 63px;
      z-index: -10;
      border-radius: 50%;
      border: 1px solid $line-color;
    }
  }
}
</style>
