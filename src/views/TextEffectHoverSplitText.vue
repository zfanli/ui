<template>
  <div class="wrapper">
    <div class="menu">
      <div v-for="item in menu" :key="item.name" class="menu-item">
        {{ item.name }}
        <span class="mask">{{ item.name }}</span>
        <span class="mask">
          <span>{{ item.name }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        { name: "Home" },
        { name: "About" },
        { name: "Work" },
        { name: "Contacts" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
$font-size: 4rem;
$font-color: #ff4081;
$perspective: 60rem;
$divide-height: 4px;
$divide-position: 49%;

.wrapper {
  background: linear-gradient(45deg, #263238, #37474f);
  perspective: $perspective;
  transform-style: preserve-3d;
  transform: perspective($perspective);
  display: flex;
  justify-content: center;
  align-items: center;

  .menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-transform: uppercase;
    text-align: center;

    .menu-item {
      cursor: pointer;
      color: transparent;
      position: relative;
      font-size: $font-size;
      font-weight: bold;

      &::before {
        content: "";
        display: block;
        position: absolute;
        top: $divide-position - 0.1;
        left: -10%;
        right: -10%;
        background-color: $font-color;
        height: $divide-height;
        border-radius: $divide-height;
        transform: scale(0);
        transition: all 0.8s cubic-bezier(0.15, 1, 0.4, 1);
        z-index: 1;
      }

      .mask {
        display: block;
        height: $divide-position;
        overflow: hidden;
        position: absolute;
        top: 0;
        color: $font-color;
        transition: all 0.8s cubic-bezier(0.15, 1, 0.4, 1);
      }

      .mask + .mask {
        top: $divide-position - 0.1;
        height: 100 - $divide-position + 0.1;

        span {
          display: block;
          transform: translateY(-$divide-position);
        }
      }

      &:hover {
        &::before {
          transform: scale(1);
        }

        .mask {
          color: white;
          transform: skew(12deg) translateX(4px);
        }

        .mask + .mask {
          transform: skew(12deg) translateX(-4px);
        }
      }
    }
  }
}
</style>
